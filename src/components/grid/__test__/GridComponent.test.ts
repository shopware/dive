vi.mock('@shopware-ag/dive/shader', () => {
    const GridNode = vi.fn(function (this: any, uniforms) {
        this.uniforms = uniforms;
        return this;
    });

    return {
        GridNode,
    };
});

vi.mock('three/webgpu', () => {
    class MockVector3 {
        x: number;
        y: number;
        z: number;

        constructor(x = 0, y = 0, z = 0) {
            this.x = x;
            this.y = y;
            this.z = z;
        }

        set(x: number, y: number, z: number) {
            this.x = x;
            this.y = y;
            this.z = z;
            return this;
        }
    }

    class MockEuler {
        x = 0;
        y = 0;
        z = 0;
    }

    class MockQuaternion {
        x = 0;
        y = 0;
        z = 0;
        w = 1;
    }

    class MockObject3D {
        isObject3D = true;
        name = '';
        visible = true;
        parent: MockObject3D | null = null;
        children: MockObject3D[] = [];
        position = new MockVector3();
        rotation = new MockEuler();
        quaternion = new MockQuaternion();
        scale = new MockVector3(1, 1, 1);
        layers = { mask: 0 };
        userData = {};
        renderOrder = 0;
        frustumCulled = true;
        onBeforeRender: (...args: any[]) => void = () => {};

        add(child: MockObject3D) {
            child.parent = this;
            this.children.push(child);
            return this;
        }

        remove(child: MockObject3D) {
            const index = this.children.indexOf(child);
            if (index !== -1) this.children.splice(index, 1);
            child.parent = null;
            return this;
        }

        dispatchEvent = vi.fn();
        updateMatrixWorld = vi.fn();
    }

    class MockPlaneGeometry {
        rotateX = vi.fn(() => this);
        dispose = vi.fn();
    }

    class MockMesh extends MockObject3D {
        isMesh = true;
        geometry: MockPlaneGeometry;
        material: any;

        constructor(geometry?: any, material?: any) {
            super();
            this.geometry = geometry ?? new MockPlaneGeometry();
            this.material = material;
        }
    }

    class MockMeshBasicNodeMaterial {
        outputNode: unknown = null;
        transparent: boolean;
        depthWrite: boolean;
        side: number;

        constructor(params: any = {}) {
            this.transparent = params.transparent ?? false;
            this.depthWrite = params.depthWrite ?? true;
            this.side = params.side ?? 0;
            this.outputNode = params.outputNode ?? null;
        }

        dispose = vi.fn();
    }

    class MockColor {
        r = 0;
        g = 0;
        b = 0;

        constructor(color?: string | number) {
            if (typeof color === 'string') {
                const hex = color.replace('#', '');
                this.r = parseInt(hex.substring(0, 2), 16) / 255;
                this.g = parseInt(hex.substring(2, 4), 16) / 255;
                this.b = parseInt(hex.substring(4, 6), 16) / 255;
            }
        }
    }

    /** DIVEComponent extends this, so the mock has to carry it. */
    class MockEventDispatcher {
        addEventListener = vi.fn();
        removeEventListener = vi.fn();
        hasEventListener = vi.fn();
        dispatchEvent = vi.fn();
    }

    class MockPerspectiveCamera extends MockObject3D {
        isPerspectiveCamera = true;
        fov = 50;
        near = 0.1;
        far = 2000;
    }

    return {
        EventDispatcher: MockEventDispatcher,
        Object3D: MockObject3D,
        Mesh: MockMesh,
        MeshBasicNodeMaterial: MockMeshBasicNodeMaterial,
        PlaneGeometry: MockPlaneGeometry,
        Color: MockColor,
        PerspectiveCamera: MockPerspectiveCamera,
        DoubleSide: 2,
    };
});

vi.mock('three/tsl', () => ({
    uniform: vi.fn((value) => ({ value })),
}));

import { GridNode } from '@shopware-ag/dive/shader';
import { GridComponent } from '../GridComponent.ts';
import { HELPER_LAYER_MASK } from '../../../constants/VisibilityLayerMask.ts';
import { Mesh, MeshBasicNodeMaterial, PerspectiveCamera } from 'three/webgpu';

let grid: GridComponent;

/** The uniforms the shader node was built with. */
const uniformsOf = (component: GridComponent) =>
    (component.mesh.material as any).outputNode.uniforms;

/** Renders once with a camera at the given position. */
const renderAt = (component: GridComponent, x: number, z: number) => {
    const camera = new PerspectiveCamera();
    camera.position.set(x, 10, z);

    component.mesh.onBeforeRender(
        null as any,
        null as any,
        camera,
        null as any,
        null as any,
        null as any,
    );
};

describe('dive/grid/GridComponent', () => {
    beforeEach(() => {
        // cleared before constructing, so call counts are about this component
        vi.clearAllMocks();
        grid = new GridComponent();
    });

    it('should brand and name itself', () => {
        expect(grid.isGridComponent).toBe(true);
        expect(grid.name).toBe('GridComponent');
    });

    it('should contribute the plane it draws on', () => {
        expect(grid.contributions).toEqual([grid.mesh]);
        expect(grid.mesh).toBeInstanceOf(Mesh);
        expect(grid.mesh.material).toBeInstanceOf(MeshBasicNodeMaterial as any);
        expect((grid.mesh.material as any).depthWrite).toBe(false);
        expect((grid.mesh.material as any).transparent).toBe(true);
        expect(GridNode).toHaveBeenCalledTimes(1);
        expect(grid.mesh.layers.mask).toBe(HELPER_LAYER_MASK);
        expect(grid.mesh.frustumCulled).toBe(false);
    });

    it('should be constructible with no arguments', () => {
        // the old class took a settings object and therefore threw on clone()
        expect(() => new GridComponent().clone()).not.toThrow();
    });

    it('should hide the mesh rather than a node', () => {
        // a component has no visible of its own, and hiding a node would take
        // whatever else it carries with it
        grid.setVisibility(false);
        expect(grid.visible).toBe(false);
        expect(grid.mesh.visible).toBe(false);

        grid.setVisibility(true);
        expect(grid.visible).toBe(true);
    });

    it('should update grid size via setter', () => {
        grid.setGridSize(3);

        expect(grid.gridSize).toBe(3);
        expect(uniformsOf(grid).uGridSize.value).toBe(3);
    });

    it('should update major line interval via setter', () => {
        grid.setMajorLineEvery(10);

        expect(grid.majorLineEvery).toBe(10);
        expect(uniformsOf(grid).uMajorLineEvery.value).toBe(10);
    });

    it('should snap position to camera in onBeforeRender', () => {
        renderAt(grid, 5.7, -3.2);

        expect(grid.mesh.position.x).toBe(6);
        expect(grid.mesh.position.z).toBe(-3);
    });

    it('should snap to custom grid size', () => {
        grid.setGridSize(5);

        renderAt(grid, 7, 13);

        expect(grid.mesh.position.x).toBe(5);
        expect(grid.mesh.position.z).toBe(15);
    });

    it('should carry its settings along to a clone', () => {
        grid.setGridSize(2).setMajorLineEvery(4).setVisibility(false);

        const copy = grid.clone();

        expect(copy.gridSize).toBe(2);
        expect(copy.majorLineEvery).toBe(4);
        expect(copy.visible).toBe(false);
        expect(copy.mesh).not.toBe(grid.mesh);
        expect(uniformsOf(copy).uGridSize.value).toBe(2);
    });

    it('should dispose geometry and material', () => {
        const geometry = vi.spyOn(grid.mesh.geometry, 'dispose');
        const material = vi.spyOn(grid.mesh.material as any, 'dispose');

        grid.dispose();

        expect(geometry).toHaveBeenCalled();
        expect(material).toHaveBeenCalled();
    });
});
