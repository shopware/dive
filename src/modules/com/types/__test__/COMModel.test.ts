import { COMModel, isCOMModel } from '../COMModel';
import { COMEntity } from '../COMEntity';

describe('COMModel', () => {
    it('should be identified as a model by type guard', () => {
        // Arrange
        const model: COMModel = {
            id: 'test-model',
            name: 'Test Model',
            entityType: 'model',
            visible: true,
            parentId: null,
            uri: 'test.glb',
            position: { x: 0, y: 0, z: 0 },
            rotation: { x: 0, y: 0, z: 0 },
            scale: { x: 1, y: 1, z: 1 },
            loaded: false,
        };

        // Act & Assert
        expect(isCOMModel(model)).toBe(true);
    });

    it('should not identify non-model entities', () => {
        // Arrange
        const nonModel: COMEntity = {
            id: 'test-object',
            name: 'Test Object',
            entityType: 'primitive',
            visible: true,
            parentId: null,
            position: { x: 0, y: 0, z: 0 },
            rotation: { x: 0, y: 0, z: 0 },
            scale: { x: 1, y: 1, z: 1 },
            geometry: {
                name: 'cube',
                width: 1,
                height: 1,
                depth: 1,
            },
        };

        // Act & Assert
        expect(isCOMModel(nonModel)).toBe(false);
    });

    it('should have all required properties', () => {
        // Arrange
        const model: COMModel = {
            id: 'test-model',
            name: 'Test Model',
            entityType: 'model',
            visible: true,
            parentId: null,
            uri: 'test.glb',
            position: { x: 0, y: 0, z: 0 },
            rotation: { x: 0, y: 0, z: 0 },
            scale: { x: 1, y: 1, z: 1 },
            loaded: false,
        };

        // Act & Assert
        expect(model).toHaveProperty('id');
        expect(model).toHaveProperty('name');
        expect(model).toHaveProperty('entityType', 'model');
        expect(model).toHaveProperty('visible');
        expect(model).toHaveProperty('parentId');
        expect(model).toHaveProperty('uri');
        expect(model).toHaveProperty('position');
        expect(model).toHaveProperty('rotation');
        expect(model).toHaveProperty('scale');
        expect(model).toHaveProperty('loaded');
    });

    it('should have optional material property', () => {
        // Arrange
        const model: COMModel = {
            id: 'test-model',
            name: 'Test Model',
            entityType: 'model',
            visible: true,
            parentId: null,
            uri: 'test.glb',
            position: { x: 0, y: 0, z: 0 },
            rotation: { x: 0, y: 0, z: 0 },
            scale: { x: 1, y: 1, z: 1 },
            loaded: false,
            material: {
                color: '#ffffff',
                roughness: 0.5,
                metalness: 0.5,
            },
        };

        // Act & Assert
        expect(model).toHaveProperty('material');
        expect(model.material).toHaveProperty('color');
        expect(model.material).toHaveProperty('roughness');
        expect(model.material).toHaveProperty('metalness');
    });
});
