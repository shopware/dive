import { COMPrimitive, isCOMPrimitive } from '../COMPrimitive';
import { COMEntity } from '../COMEntity';

describe('COMPrimitive', () => {
    it('should be identified as a primitive by type guard', () => {
        // Arrange
        const primitive: COMPrimitive = {
            id: 'test-primitive',
            name: 'Test Primitive',
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
        expect(isCOMPrimitive(primitive)).toBe(true);
    });

    it('should not identify non-primitive entities', () => {
        // Arrange
        const nonPrimitive: COMEntity = {
            id: 'test-object',
            name: 'Test Object',
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
        expect(isCOMPrimitive(nonPrimitive)).toBe(false);
    });

    it('should have all required properties', () => {
        // Arrange
        const primitive: COMPrimitive = {
            id: 'test-primitive',
            name: 'Test Primitive',
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
        expect(primitive).toHaveProperty('id');
        expect(primitive).toHaveProperty('name');
        expect(primitive).toHaveProperty('entityType', 'primitive');
        expect(primitive).toHaveProperty('visible');
        expect(primitive).toHaveProperty('parentId');
        expect(primitive).toHaveProperty('position');
        expect(primitive).toHaveProperty('rotation');
        expect(primitive).toHaveProperty('scale');
        expect(primitive).toHaveProperty('geometry');
    });

    it('should have optional material property', () => {
        // Arrange
        const primitive: COMPrimitive = {
            id: 'test-primitive',
            name: 'Test Primitive',
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
            material: {
                color: '#ffffff',
                roughness: 0.5,
                metalness: 0.5,
            },
        };

        // Act & Assert
        expect(primitive).toHaveProperty('material');
        expect(primitive.material).toHaveProperty('color');
        expect(primitive.material).toHaveProperty('roughness');
        expect(primitive.material).toHaveProperty('metalness');
    });

    it('should support different geometry types', () => {
        // Arrange
        const cube: COMPrimitive = {
            id: 'cube',
            name: 'Cube',
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

        const sphere: COMPrimitive = {
            id: 'sphere',
            name: 'Sphere',
            entityType: 'primitive',
            visible: true,
            parentId: null,
            position: { x: 0, y: 0, z: 0 },
            rotation: { x: 0, y: 0, z: 0 },
            scale: { x: 1, y: 1, z: 1 },
            geometry: {
                name: 'sphere',
                width: 1,
                height: 1,
                depth: 1,
            },
        };

        const cylinder: COMPrimitive = {
            id: 'cylinder',
            name: 'Cylinder',
            entityType: 'primitive',
            visible: true,
            parentId: null,
            position: { x: 0, y: 0, z: 0 },
            rotation: { x: 0, y: 0, z: 0 },
            scale: { x: 1, y: 1, z: 1 },
            geometry: {
                name: 'cylinder',
                width: 1,
                height: 1,
                depth: 1,
            },
        };

        // Act & Assert
        expect(cube.geometry.name).toBe('cube');
        expect(sphere.geometry.name).toBe('sphere');
        expect(cylinder.geometry.name).toBe('cylinder');
    });
});
