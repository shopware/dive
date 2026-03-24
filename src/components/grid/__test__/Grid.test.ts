vi.mock('three', () => {
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
        copy(v: MockVector3) {
            this.x = v.x;
            this.y = v.y;
            this.z = v.z;
            return this;
        }
        clone() {
            return new MockVector3(this.x, this.y, this.z);
        }
    }

    class MockEuler {
        x = 0;
        y = 0;
        z = 0;
        set = vi.fn();
        copy = vi.fn();
    }

    class MockQuaternion {
        x = 0;
        y = 0;
        z = 0;
        w = 1;
        set = vi.fn();
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
            const idx = this.children.indexOf(child);
            if (idx !== -1) this.children.splice(idx, 1);
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

    class MockShaderMaterial {
        uniforms: Record<string, { value: any }>;
        vertexShader: string;
        fragmentShader: string;
        transparent: boolean;
        depthTest: boolean;
        depthWrite: boolean;
        side: number;

        constructor(params: any = {}) {
            this.uniforms = params.uniforms ?? {};
            this.vertexShader = params.vertexShader ?? '';
            this.fragmentShader = params.fragmentShader ?? '';
            this.transparent = params.transparent ?? false;
            this.depthTest = params.depthTest ?? true;
            this.depthWrite = params.depthWrite ?? true;
            this.side = params.side ?? 0;
        }
        dispose = vi.fn();
    }

    class MockMesh extends MockObject3D {
        isMesh = true;
        geometry: MockPlaneGeometry;
        material: MockShaderMaterial;

        constructor(geometry?: any, material?: any) {
            super();
            this.geometry = geometry ?? new MockPlaneGeometry();
            this.material = material ?? new MockShaderMaterial();
        }
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
        PlaneGeometry: MockPlaneGeometry,
        ShaderMaterial: MockShaderMaterial,
        Color: MockColor,
        PerspectiveCamera: MockPerspectiveCamera,
        DoubleSide: 2,
    };
});

import { DIVEGrid } from '../Grid.ts';
import { HELPER_LAYER_MASK } from '../../../constants/VisibilityLayerMask.ts';
import { Mesh, ShaderMaterial, PerspectiveCamera } from 'three';

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
        expect(mesh.material).toBeInstanceOf(ShaderMaterial);
        expect((mesh.material as ShaderMaterial).depthWrite).toBe(false);
        expect((mesh.material as ShaderMaterial).transparent).toBe(true);
        expect(mesh.layers.mask).toBe(HELPER_LAYER_MASK);
        expect(mesh.frustumCulled).toBe(false);
    });

    it('should accept custom settings', () => {
        const customGrid = new DIVEGrid({ gridSize: 2, majorLineEvery: 10 });
        const mesh = customGrid.children[0] as Mesh;
        const material = mesh.material as ShaderMaterial;
        expect(material.uniforms.uGridSize.value).toBe(2);
        expect(material.uniforms.uMajorLineEvery.value).toBe(10);
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
        const material = mesh.material as ShaderMaterial;
        expect(material.uniforms.uGridSize.value).toBe(3);
    });

    it('should update major line interval via setter', () => {
        grid.setMajorLineEvery(10);
        const mesh = grid.children[0] as Mesh;
        const material = mesh.material as ShaderMaterial;
        expect(material.uniforms.uMajorLineEvery.value).toBe(10);
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
        const materialDispose = vi.spyOn(
            mesh.material as ShaderMaterial,
            'dispose',
        );

        grid.dispose();

        expect(geometryDispose).toHaveBeenCalled();
        expect(materialDispose).toHaveBeenCalled();
    });
});
