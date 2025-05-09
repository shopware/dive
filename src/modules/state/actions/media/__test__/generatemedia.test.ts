import { GenerateMediaAction } from '../generatemedia.ts';
import { COMEntity } from '../../../types/index.ts';
import { Vector3 } from 'three';

const mockGenerateMedia = vi
    .fn()
    .mockResolvedValue('data:image/png;base64,test');
const mockGetMediaCreator = vi.fn().mockResolvedValue({
    generateMedia: mockGenerateMedia,
});

describe('GenerateMediaAction', () => {
    const mockRegistered = new Map<string, COMEntity>();

    it('should generate media from position and target', async () => {
        const action = new GenerateMediaAction(
            {
                position: new Vector3(1, 1, 1),
                target: new Vector3(0, 0, 0),
                width: 800,
                height: 600,
            },
            {
                getMediaCreator: mockGetMediaCreator,
                registered: mockRegistered,
            },
        );

        // Execute action
        const result = await action.execute();

        // Verify results
        expect(mockGetMediaCreator).toHaveBeenCalled();
        expect(mockGenerateMedia).toHaveBeenCalledWith(
            expect.objectContaining({ x: 1, y: 1, z: 1 }),
            expect.objectContaining({ x: 0, y: 0, z: 0 }),
            800,
            600,
        );
        expect(result).toBe('data:image/png;base64,test');
    });

    it('should generate media from POV', async () => {
        const testPOV: COMEntity = {
            id: 'test-pov',
            entityType: 'pov',
            position: new Vector3(1, 1, 1),
            target: new Vector3(0, 0, 0),
            rotation: { x: 0, y: 0, z: 0 },
            scale: { x: 1, y: 1, z: 1 },
            name: 'Test POV',
            visible: true,
        } as unknown as COMEntity;

        // Add the POV first
        mockRegistered.set(testPOV.id, testPOV);

        const action = new GenerateMediaAction(
            {
                id: 'test-pov',
                width: 800,
                height: 600,
            },
            {
                getMediaCreator: mockGetMediaCreator,
                registered: mockRegistered,
            },
        );

        // Execute action
        const result = await action.execute();

        // Verify results
        expect(mockGetMediaCreator).toHaveBeenCalled();
        expect(mockGenerateMedia).toHaveBeenCalledWith(
            expect.objectContaining({ x: 1, y: 1, z: 1 }),
            expect.objectContaining({ x: 0, y: 0, z: 0 }),
            800,
            600,
        );
        expect(result).toBe('data:image/png;base64,test');
    });

    it('should throw error if POV is not registered', async () => {
        const action = new GenerateMediaAction(
            {
                id: 'non-existent-pov',
                width: 800,
                height: 600,
            },
            {
                getMediaCreator: mockGetMediaCreator,
                registered: mockRegistered,
            },
        );

        // Execute action and expect error
        await expect(action.execute()).rejects.toThrow(
            'Object with id non-existent-pov not registered',
        );
    });

    it('should throw error if object is not a POV', async () => {
        const testObject: COMEntity = {
            id: 'test-object',
            entityType: 'model',
            position: new Vector3(1, 1, 1),
            target: new Vector3(0, 0, 0),
            rotation: { x: 0, y: 0, z: 0 },
            scale: { x: 1, y: 1, z: 1 },
            name: 'Test Object',
            visible: true,
        } as unknown as COMEntity;

        // Add the object first
        mockRegistered.set(testObject.id, testObject);

        const action = new GenerateMediaAction(
            {
                id: 'test-object',
                width: 800,
                height: 600,
            },
            {
                getMediaCreator: mockGetMediaCreator,
                registered: mockRegistered,
            },
        );

        // Execute action and expect error
        await expect(action.execute()).rejects.toThrow(
            'Object with id test-object is not a POV',
        );
    });
});
