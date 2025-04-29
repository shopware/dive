import { COMGroup, isCOMGroup } from '../COMGroup';
import { COMEntity } from '../COMEntity';

describe('COMGroup', () => {
    it('should be identified as a group by type guard', () => {
        // Arrange
        const group: COMGroup = {
            id: 'test-group',
            name: 'Test Group',
            entityType: 'group',
            visible: true,
            parentId: null,
            position: { x: 0, y: 0, z: 0 },
            rotation: { x: 0, y: 0, z: 0 },
            scale: { x: 1, y: 1, z: 1 },
        };

        // Act & Assert
        expect(isCOMGroup(group)).toBe(true);
    });

    it('should not identify non-group entities', () => {
        // Arrange
        const nonGroup: COMEntity = {
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
        expect(isCOMGroup(nonGroup)).toBe(false);
    });

    it('should have all required properties', () => {
        // Arrange
        const group: COMGroup = {
            id: 'test-group',
            name: 'Test Group',
            entityType: 'group',
            visible: true,
            parentId: null,
            position: { x: 0, y: 0, z: 0 },
            rotation: { x: 0, y: 0, z: 0 },
            scale: { x: 1, y: 1, z: 1 },
        };

        // Act & Assert
        expect(group).toHaveProperty('id');
        expect(group).toHaveProperty('name');
        expect(group).toHaveProperty('entityType', 'group');
        expect(group).toHaveProperty('visible');
        expect(group).toHaveProperty('parentId');
        expect(group).toHaveProperty('position');
        expect(group).toHaveProperty('rotation');
        expect(group).toHaveProperty('scale');
    });

    it('should have optional bbVisible property', () => {
        // Arrange
        const group: COMGroup = {
            id: 'test-group',
            name: 'Test Group',
            entityType: 'group',
            visible: true,
            parentId: null,
            position: { x: 0, y: 0, z: 0 },
            rotation: { x: 0, y: 0, z: 0 },
            scale: { x: 1, y: 1, z: 1 },
            bbVisible: true,
        };

        // Act & Assert
        expect(group).toHaveProperty('bbVisible', true);
    });
});
