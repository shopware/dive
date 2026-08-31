import { Color, Object3D } from 'three/webgpu';
import { DIVEComponent } from '../../component/Component.ts';
import { DIVENode } from '../../node/Node.ts';
import { DIVEScene, DIVESceneDefaultSettings } from '../Scene.ts';

const mock_GetSceneObject = vi.fn();
const mock_ComputeSceneBB = vi.fn();

let mock_FloorSetVisibility: ReturnType<typeof vi.fn>;

vi.mock('../root/Root', () => {
    return {
        DIVERoot: vi.fn(function (this: any) {
            this.isObject3D = true;
            this.parent = null;
            this.dispatchEvent = vi.fn();
            // real Object3Ds, so the dispose pass below can walk them
            this.children = [];
            this.traverse = vi.fn((callback: (object: unknown) => void) =>
                callback(this),
            );
            this.dispose = vi.fn();
            this.getSceneObject = mock_GetSceneObject;
            this.computeSceneBB = mock_ComputeSceneBB;
            this.removeFromParent = vi.fn();
            mock_FloorSetVisibility = vi.fn();
            this.floor = {
                setVisibility: mock_FloorSetVisibility,
            };
            return this;
        }),
    };
});

vi.mock('../../renderer/Renderer', () => {
    return {
        DIVERenderPipeline: vi.fn(function (this: any) {}),
    };
});

let scene: DIVEScene;

describe('DIVEScene', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        scene = new DIVEScene();
    });

    it('should instantiate with correct properties', () => {
        expect(scene).toBeDefined();
        expect(scene.root).toBeDefined();
        expect(scene.grid).toBeDefined();
        expect(scene.background).toBe(null);
    });

    it('should add root and grid to scene', () => {
        // the grid sits on its own node, so what the scene holds is that node
        expect(scene.children).toContain(scene.root);
        expect(scene.children).toContain(scene.grid.owner);
    });

    it('should set background color', () => {
        const color = new Color(0x000000);
        scene.setBackground(0x000000);
        expect((scene.background as Color).getHex()).toBe(color.getHex());
    });

    it('should delegate computeSceneBB to root', () => {
        scene.computeSceneBB();
        expect(mock_ComputeSceneBB).toHaveBeenCalledTimes(1);
    });

    describe('default settings (no parameters)', () => {
        it('should use transparent background by default', () => {
            expect(scene.background).toBeNull();
        });

        it('should hide the floor by default', () => {
            expect(mock_FloorSetVisibility).toHaveBeenCalledWith(false);
        });

        it('should not create the grid by default', () => {
            expect(
                scene.children.some((child) => child.name === 'DIVEGrid'),
            ).toBe(false);
        });

        it('should have correct default settings exported', () => {
            expect(DIVESceneDefaultSettings).toEqual({
                displayFloor: false,
                displayGrid: false,
                gridSize: 1,
                gridMajorLineEvery: 5,
                backgroundColor: 'transparent',
            });
        });
    });

    describe('custom settings', () => {
        it('should show the floor when displayFloor is true', () => {
            const customScene = new DIVEScene({ displayFloor: true });
            expect(mock_FloorSetVisibility).toHaveBeenCalledWith(true);
            expect(customScene.root).toBeDefined();
        });

        it('should show the grid when displayGrid is true', () => {
            const customScene = new DIVEScene({ displayGrid: true });

            expect(customScene.grid.visible).toBe(true);
            expect(customScene.children).toContain(customScene.grid.owner);
        });

        it('should set a custom background color from a number', () => {
            const customScene = new DIVEScene({
                backgroundColor: 0xff0000,
            });
            expect(customScene.background).toBeInstanceOf(Color);
            expect((customScene.background as Color).getHex()).toBe(0xff0000);
        });

        it('should set a custom background color from a string', () => {
            const customScene = new DIVEScene({
                backgroundColor: '#00ff00',
            });
            expect(customScene.background).toBeInstanceOf(Color);
            expect((customScene.background as Color).getHex()).toBe(0x00ff00);
        });

        it('should accept all settings at once', () => {
            const customScene = new DIVEScene({
                displayFloor: true,
                displayGrid: true,
                backgroundColor: 0x0000ff,
            });
            expect(mock_FloorSetVisibility).toHaveBeenCalledWith(true);
            expect(customScene.grid.visible).toBe(true);
            expect(customScene.background).toBeInstanceOf(Color);
            expect((customScene.background as Color).getHex()).toBe(0x0000ff);
        });

        it('should use defaults for omitted partial settings', () => {
            const customScene = new DIVEScene({ displayFloor: true });
            // floor is explicitly set
            expect(mock_FloorSetVisibility).toHaveBeenCalledWith(true);
            // grid is not created when displayGrid defaults to false
            expect(
                customScene.children.some((child) => child.name === 'DIVEGrid'),
            ).toBe(false);
            // background falls back to default (transparent -> null)
            expect(customScene.background).toBeNull();
        });
    });

    describe('setBackground', () => {
        it('should set background to null for "transparent"', () => {
            scene.setBackground(0xff0000);
            expect(scene.background).not.toBeNull();

            scene.setBackground('transparent');
            expect(scene.background).toBeNull();
        });

        it('should set background from a hex number', () => {
            scene.setBackground(0xabcdef);
            expect(scene.background).toBeInstanceOf(Color);
            expect((scene.background as Color).getHex()).toBe(0xabcdef);
        });

        it('should set background from a CSS color string', () => {
            scene.setBackground('#ff00ff');
            expect(scene.background).toBeInstanceOf(Color);
            expect((scene.background as Color).getHex()).toBe(0xff00ff);
        });

        it('should set background from a Color instance', () => {
            const color = new Color(0x123456);
            scene.setBackground(color);
            expect(scene.background).toBe(color);
        });
    });

    describe('dispose', () => {
        it('should dispose every component in the scene', () => {
            /**
             * three frees a geometry, material or texture when its own dispose fires,
             * and Renderer.dispose only drops its bookkeeping
             */
            const node = new DIVENode();
            const component = node.addComponent(
                new (class extends DIVEComponent {})(),
            );
            const disposed = vi.spyOn(component, 'dispose');
            scene.add(node);

            scene.dispose();

            expect(disposed).toHaveBeenCalled();
        });

        it('should dispose a component sitting deeper in the tree', () => {
            /**
             * reached through the nodes, not by looking for components in the
             * graph: a component is not in the graph, only what it contributed is
             */
            const deep = new DIVENode();
            const component = deep.addComponent(
                new (class extends DIVEComponent {})(),
            );
            const disposed = vi.spyOn(component, 'dispose');
            const branch = new DIVENode();
            branch.add(deep);
            scene.add(branch);

            scene.dispose();

            expect(disposed).toHaveBeenCalled();
        });

        it('should dispose the grid', () => {
            const disposed = vi.spyOn(scene.grid, 'dispose');

            scene.dispose();

            expect(disposed).toHaveBeenCalled();
        });

        it('should remove root and grid from scene', () => {
            const gridNode = scene.grid.owner;
            expect(scene.children).toContain(scene.root);
            expect(scene.children).toContain(gridNode);

            scene.dispose();

            expect(scene.children).not.toContain(scene.root);
            expect(scene.children).not.toContain(gridNode);
        });
    });
});
