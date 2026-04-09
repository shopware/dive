import { UpdateSceneAction } from '../updatescene.ts';
import { DIVE, DIVEScene } from '@shopware-ag/dive';
import { Color, MeshStandardMaterial } from 'three/webgpu';

describe('UpdateSceneAction', () => {
    it('should update scene properties', async () => {
        // Mock dependencies
        const mockGrid = {
            setVisibility: vi.fn(),
            visible: true,
        };

        const mockFloor = {
            setVisibility: vi.fn(),
            setColor: vi.fn(),
            visible: true,
            material: new MeshStandardMaterial({ color: new Color('#ffffff') }),
        };

        const mockScene = {
            name: 'Test Scene',
            background: new Color('#000000'),
            setBackground: vi.fn(),
            grid: mockGrid,
            root: {
                floor: mockFloor,
            },
        } as unknown as DIVEScene;

        const mockEngine = {
            scene: mockScene,
        } as unknown as DIVE;

        const action = new UpdateSceneAction(
            {
                name: 'Updated Scene',
                backgroundColor: '#ff0000',
                gridEnabled: false,
                floorEnabled: false,
                floorColor: '#00ff00',
            },
            {
                engine: mockEngine,
            },
        );

        // Execute action
        await action.execute();

        // Verify results
        expect(mockScene.name).toBe('Updated Scene');
        expect(mockScene.setBackground).toHaveBeenCalledWith('#ff0000');
        expect(mockGrid.setVisibility).toHaveBeenCalledWith(false);
        expect(mockFloor.setVisibility).toHaveBeenCalledWith(false);
        expect(mockFloor.setColor).toHaveBeenCalledWith('#00ff00');
    });

    it('should update only specified properties', async () => {
        // Mock dependencies
        const mockGrid = {
            setVisibility: vi.fn(),
            visible: true,
        };

        const mockFloor = {
            setVisibility: vi.fn(),
            setColor: vi.fn(),
            visible: true,
            material: new MeshStandardMaterial({ color: new Color('#ffffff') }),
        };

        const mockScene = {
            name: 'Test Scene',
            background: new Color('#000000'),
            setBackground: vi.fn(),
            grid: mockGrid,
            root: {
                floor: mockFloor,
            },
        } as unknown as DIVEScene;

        const mockEngine = {
            scene: mockScene,
        } as unknown as DIVE;

        const action = new UpdateSceneAction(
            {
                name: 'Updated Scene',
            },
            {
                engine: mockEngine,
            },
        );

        // Execute action
        await action.execute();

        // Verify results
        expect(mockScene.name).toBe('Updated Scene');
        expect(mockScene.setBackground).not.toHaveBeenCalled();
        expect(mockGrid.setVisibility).not.toHaveBeenCalled();
        expect(mockFloor.setVisibility).not.toHaveBeenCalled();
        expect(mockFloor.setColor).not.toHaveBeenCalled();
    });
});
