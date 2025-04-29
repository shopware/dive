import { UpdateSceneAction } from '../updatescene';
import { DIVEEngine } from '../../../../../engine';
import { DIVEScene } from '../../../../../engine/scene/Scene';
import { Color, MeshStandardMaterial } from 'three';

describe('UpdateSceneAction', () => {
    it('should update scene properties', async () => {
        // Mock dependencies
        const mockGrid = {
            SetVisibility: jest.fn(),
            visible: true,
        };

        const mockFloor = {
            SetVisibility: jest.fn(),
            SetColor: jest.fn(),
            visible: true,
            material: new MeshStandardMaterial({ color: new Color('#ffffff') }),
        };

        const mockScene = {
            name: 'Test Scene',
            background: new Color('#000000'),
            SetBackground: jest.fn(),
            Grid: mockGrid,
            Root: {
                floor: mockFloor,
            },
        } as unknown as DIVEScene;

        const mockEngine = {
            scene: mockScene,
        } as unknown as DIVEEngine;

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
        expect(mockScene.SetBackground).toHaveBeenCalledWith('#ff0000');
        expect(mockGrid.SetVisibility).toHaveBeenCalledWith(false);
        expect(mockFloor.SetVisibility).toHaveBeenCalledWith(false);
        expect(mockFloor.SetColor).toHaveBeenCalledWith('#00ff00');
    });

    it('should update only specified properties', async () => {
        // Mock dependencies
        const mockGrid = {
            SetVisibility: jest.fn(),
            visible: true,
        };

        const mockFloor = {
            SetVisibility: jest.fn(),
            SetColor: jest.fn(),
            visible: true,
            material: new MeshStandardMaterial({ color: new Color('#ffffff') }),
        };

        const mockScene = {
            name: 'Test Scene',
            background: new Color('#000000'),
            SetBackground: jest.fn(),
            Grid: mockGrid,
            Root: {
                floor: mockFloor,
            },
        } as unknown as DIVEScene;

        const mockEngine = {
            scene: mockScene,
        } as unknown as DIVEEngine;

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
        expect(mockScene.SetBackground).not.toHaveBeenCalled();
        expect(mockGrid.SetVisibility).not.toHaveBeenCalled();
        expect(mockFloor.SetVisibility).not.toHaveBeenCalled();
        expect(mockFloor.SetColor).not.toHaveBeenCalled();
    });
});
