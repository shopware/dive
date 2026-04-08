vi.mock('@shopware-ag/dive/shader', () => {
    return {
        DIVEShaderLib: {
            grid: vi.fn((uniforms) => ({ uniforms })),
        },
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

    class MockPerspectiveCamera extends MockObject3D {
        isPerspectiveCamera = true;
        fov = 50;
        near = 0.1;
        far = 2000;
    }

    return {
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

import { DIVEShaderLib } from '@shopware-ag/dive/shader';
import { DIVEGrid } from '../Grid.ts';
import { HELPER_LAYER_MASK } from '../../../constants/VisibilityLayerMask.ts';
import { Mesh, MeshBasicNodeMaterial, PerspectiveCamera } from 'three/webgpu';

let grid: DIVEGrid;

describe('dive/grid/DIVEGrid', () => {
    beforeEach(() => {
        grid = new DIVEGrid();
    });

    it('should instantiate', () => {
        expect(grid).toBeDefined();
        expect(grid.name).toBe('Grid');
        expect(grid.children.length).toBe(1);

        const mesh = grid.children[0] as Mesh;
        expect(mesh).toBeInstanceOf(Mesh);
        expect(mesh.material).toBeInstanceOf(MeshBasicNodeMaterial as any);
        expect((mesh.material as any).depthWrite).toBe(false);
        expect((mesh.material as any).transparent).toBe(true);
        expect(DIVEShaderLib.grid).toHaveBeenCalledTimes(1);
        expect(mesh.layers.mask).toBe(HELPER_LAYER_MASK);
        expect(mesh.frustumCulled).toBe(false);
    });

    it('should accept custom settings', () => {
        const customGrid = new DIVEGrid({ gridSize: 2, majorLineEvery: 10 });
        const mesh = customGrid.children[0] as Mesh;
        const uniforms = (mesh.material as any).outputNode.uniforms;
        expect(uniforms.uGridSize.value).toBe(2);
        expect(uniforms.uMajorLineEvery.value).toBe(10);
    });

    it('should set visibility', () => {
        grid.setVisibility(false);
        expect(grid.visible).toBe(false);
        grid.setVisibility(true);
        expect(grid.visible).toBe(true);
    });

    it('should update grid size via setter', () => {
        grid.setGridSize(3);
        const mesh = grid.children[0] as Mesh;
        const uniforms = (mesh.material as any).outputNode.uniforms;
        expect(uniforms.uGridSize.value).toBe(3);
    });

    it('should update major line interval via setter', () => {
        grid.setMajorLineEvery(10);
        const mesh = grid.children[0] as Mesh;
        const uniforms = (mesh.material as any).outputNode.uniforms;
        expect(uniforms.uMajorLineEvery.value).toBe(10);
    });

    it('should snap position to camera in onBeforeRender', () => {
        const mesh = grid.children[0] as Mesh;
        const camera = new PerspectiveCamera();
        camera.position.set(5.7, 10, -3.2);

        mesh.onBeforeRender(
            null as any,
            null as any,
            camera,
            null as any,
            null as any,
            null as any,
        );

        expect(mesh.position.x).toBe(6);
        expect(mesh.position.z).toBe(-3);
    });

    it('should snap to custom grid size', () => {
        const customGrid = new DIVEGrid({ gridSize: 5 });
        const mesh = customGrid.children[0] as Mesh;
        const camera = new PerspectiveCamera();
        camera.position.set(7, 10, 13);

        mesh.onBeforeRender(
            null as any,
            null as any,
            camera,
            null as any,
            null as any,
            null as any,
        );

        expect(mesh.position.x).toBe(5);
        expect(mesh.position.z).toBe(15);
    });

    it('should dispose geometry and material', () => {
        const mesh = grid.children[0] as Mesh;
        const geometryDispose = vi.spyOn(mesh.geometry, 'dispose');
        const materialDispose = vi.spyOn(mesh.material as any, 'dispose');

        grid.dispose();

        expect(geometryDispose).toHaveBeenCalled();
        expect(materialDispose).toHaveBeenCalled();
    });
});
