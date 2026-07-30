import { GenerateMediaAction } from '../generatemedia.ts';
import { type EntitySchema } from '@shopware-ag/dive';
import { Vector3 } from 'three/webgpu';
import {
    type MediaGenerationById,
    type MediaGenerationByPosition,
} from '@shopware-ag/dive/mediacreator';

const mockGenerateMedia = vi
    .fn()
    .mockResolvedValue('data:image/png;base64,test');
const mockGetMediaCreator = vi.fn().mockResolvedValue({
    generateMedia: mockGenerateMedia,
});

describe('GenerateMediaAction', () => {
    const mockRegistered = new Map<string, EntitySchema>();

    it('should generate media from position and target', async () => {
        const action = new GenerateMediaAction(
            {
                position: new Vector3(1, 1, 1),
                target: new Vector3(0, 0, 0),
                resolution: {
                    width: 800,
                    height: 600,
                },
            } as MediaGenerationByPosition,
            {
                getMediaCreator: mockGetMediaCreator,
                registered: mockRegistered,
            },
        );

        // Execute action
        const result = await action.execute();

        // Verify results
        expect(mockGetMediaCreator).toHaveBeenCalled();
        expect(mockGenerateMedia).toHaveBeenCalledWith({
            position: expect.objectContaining({ x: 1, y: 1, z: 1 }),
            target: expect.objectContaining({ x: 0, y: 0, z: 0 }),
            resolution: {
                width: 800,
                height: 600,
            },
        });
        expect(result).toBe('data:image/png;base64,test');
    });

    it('should generate media from CAMERA', async () => {
        const testCAMERA: EntitySchema = {
            id: 'test-camera',
            entityType: 'camera',
            position: new Vector3(1, 1, 1),
            target: new Vector3(0, 0, 0),
            rotation: { x: 0, y: 0, z: 0 },
            scale: { x: 1, y: 1, z: 1 },
            name: 'Test CAMERA',
            visible: true,
        } as unknown as EntitySchema;

        // Add the CAMERA first
        mockRegistered.set(testCAMERA.id, testCAMERA);

        const action = new GenerateMediaAction(
            {
                id: 'test-camera',
                resolution: {
                    width: 800,
                    height: 600,
                },
            } as MediaGenerationById,
            {
                getMediaCreator: mockGetMediaCreator,
                registered: mockRegistered,
            },
        );

        // Execute action
        const result = await action.execute();

        // Verify results
        expect(mockGetMediaCreator).toHaveBeenCalled();
        expect(mockGenerateMedia).toHaveBeenCalledWith({
            position: expect.objectContaining({ x: 1, y: 1, z: 1 }),
            target: expect.objectContaining({ x: 0, y: 0, z: 0 }),
            resolution: {
                width: 800,
                height: 600,
            },
        });
        expect(result).toBe('data:image/png;base64,test');
    });

    it('should throw error if CAMERA is not registered', async () => {
        const action = new GenerateMediaAction(
            {
                id: 'non-existent-camera',
                resolution: {
                    width: 800,
                    height: 600,
                },
            } as MediaGenerationById,
            {
                getMediaCreator: mockGetMediaCreator,
                registered: mockRegistered,
            },
        );

        // Execute action and expect error
        await expect(action.execute()).rejects.toThrow(
            'Object with id non-existent-camera not registered',
        );
    });

    it('should throw error if object is not a CAMERA', async () => {
        const testObject: EntitySchema = {
            id: 'test-object',
            entityType: 'model',
            position: new Vector3(1, 1, 1),
            target: new Vector3(0, 0, 0),
            rotation: { x: 0, y: 0, z: 0 },
            scale: { x: 1, y: 1, z: 1 },
            name: 'Test Object',
            visible: true,
        } as unknown as EntitySchema;

        // Add the object first
        mockRegistered.set(testObject.id, testObject);

        const action = new GenerateMediaAction(
            {
                id: 'test-object',
                resolution: {
                    width: 800,
                    height: 600,
                },
            } as MediaGenerationById,
            {
                getMediaCreator: mockGetMediaCreator,
                registered: mockRegistered,
            },
        );

        // Execute action and expect error
        await expect(action.execute()).rejects.toThrow(
            'Object with id test-object is not a CAMERA',
        );
    });
});
