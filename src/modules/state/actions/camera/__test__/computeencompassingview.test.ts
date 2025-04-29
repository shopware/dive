import { DIVEEngine } from '../../../../../engine';
import { DIVEScene } from '../../../../../engine/scene/Scene';
import { DIVEOrbitController } from '../../../../controller/orbit/OrbitController';
import { ComputeEncompassingViewAction } from '../computeencompassingview';
import { Vector3 } from 'three';

describe('ComputeEncompassingViewAction', () => {
    it('should compute encompassing view for a scene', async () => {
        // Mock dependencies
        const mockScene = {
            ComputeSceneBB: jest.fn().mockReturnValue({
                min: new Vector3(0, 0, 0),
                max: new Vector3(10, 10, 10),
            }),
        } as unknown as DIVEScene;

        const mockController = {
            ComputeEncompassingView: jest.fn().mockReturnValue({
                position: new Vector3(5, 5, 5),
                target: new Vector3(5, 5, 0),
            }),
        } as unknown as DIVEOrbitController;

        const mockEngine = {
            scene: mockScene,
        } as unknown as DIVEEngine;

        const action = new ComputeEncompassingViewAction(undefined, {
            engine: mockEngine,
            controller: mockController,
        });

        // Execute action
        const result = await action.execute();

        // Verify results
        expect(mockScene.ComputeSceneBB).toHaveBeenCalled();
        expect(mockController.ComputeEncompassingView).toHaveBeenCalledWith(
            expect.objectContaining({
                min: expect.objectContaining({ x: 0, y: 0, z: 0 }),
                max: expect.objectContaining({ x: 10, y: 10, z: 10 }),
            }),
        );
        expect(result).toEqual(
            expect.objectContaining({
                position: expect.objectContaining({ x: 5, y: 5, z: 5 }),
                target: expect.objectContaining({ x: 5, y: 5, z: 0 }),
            }),
        );
    });
});
