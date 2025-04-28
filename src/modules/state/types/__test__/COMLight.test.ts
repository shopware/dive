import { COMLight, isCOMLight } from '../COMLight';
import { COMEntity } from '../COMEntity';

describe('COMLight', () => {
    it('should be identified as a light by type guard', () => {
        // Arrange
        const light: COMLight = {
            id: 'test-light',
            name: 'Test Light',
            entityType: 'light',
            visible: true,
            parentId: null,
            type: 'point',
            intensity: 1,
            color: '#ffffff',
            enabled: true,
            position: { x: 0, y: 0, z: 0 },
            rotation: { x: 0, y: 0, z: 0 },
        };

        // Act & Assert
        expect(isCOMLight(light)).toBe(true);
    });

    it('should not identify non-light entities', () => {
        // Arrange
        const nonLight: COMEntity = {
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
        expect(isCOMLight(nonLight)).toBe(false);
    });

    it('should have all required properties', () => {
        // Arrange
        const light: COMLight = {
            id: 'test-light',
            name: 'Test Light',
            entityType: 'light',
            visible: true,
            parentId: null,
            type: 'point',
            intensity: 1,
            color: '#ffffff',
            enabled: true,
        };

        // Act & Assert
        expect(light).toHaveProperty('id');
        expect(light).toHaveProperty('name');
        expect(light).toHaveProperty('entityType', 'light');
        expect(light).toHaveProperty('visible');
        expect(light).toHaveProperty('parentId');
        expect(light).toHaveProperty('type');
        expect(light).toHaveProperty('intensity');
        expect(light).toHaveProperty('color');
        expect(light).toHaveProperty('enabled');
    });

    it('should have optional position and rotation properties', () => {
        // Arrange
        const light: COMLight = {
            id: 'test-light',
            name: 'Test Light',
            entityType: 'light',
            visible: true,
            parentId: null,
            type: 'point',
            intensity: 1,
            color: '#ffffff',
            enabled: true,
            position: { x: 0, y: 0, z: 0 },
            rotation: { x: 0, y: 0, z: 0 },
        };

        // Act & Assert
        expect(light).toHaveProperty('position');
        expect(light).toHaveProperty('rotation');
    });

    it('should support different light types', () => {
        // Arrange
        const ambientLight: COMLight = {
            id: 'ambient-light',
            name: 'Ambient Light',
            entityType: 'light',
            visible: true,
            parentId: null,
            type: 'ambient',
            intensity: 1,
            color: '#ffffff',
            enabled: true,
        };

        const pointLight: COMLight = {
            id: 'point-light',
            name: 'Point Light',
            entityType: 'light',
            visible: true,
            parentId: null,
            type: 'point',
            intensity: 1,
            color: '#ffffff',
            enabled: true,
            position: { x: 0, y: 0, z: 0 },
        };

        const sceneLight: COMLight = {
            id: 'scene-light',
            name: 'Scene Light',
            entityType: 'light',
            visible: true,
            parentId: null,
            type: 'scene',
            intensity: 1,
            color: '#ffffff',
            enabled: true,
        };

        // Act & Assert
        expect(ambientLight.type).toBe('ambient');
        expect(pointLight.type).toBe('point');
        expect(sceneLight.type).toBe('scene');
    });
});
