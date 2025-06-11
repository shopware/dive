import { describe, it, expect } from 'vitest';
import { isModelSchema } from '../ModelSchema.ts';
import type { EntitySchema } from '../EntitySchema.ts';

describe('ModelSchema', () => {
    describe('isModelSchema', () => {
        it('should return true for valid model schema', () => {
            const modelEntity: EntitySchema = {
                id: 'test-model',
                name: 'Test Model',
                entityType: 'model',
                visible: true,
                uri: 'test-model.glb',
                position: { x: 0, y: 0, z: 0 },
                rotation: { x: 0, y: 0, z: 0 },
                scale: { x: 1, y: 1, z: 1 },
                loaded: false,
            };

            expect(isModelSchema(modelEntity)).toBe(true);
        });

        it('should return false for group schema', () => {
            const groupEntity: EntitySchema = {
                id: 'test-group',
                name: 'Test Group',
                entityType: 'group',
                visible: true,
                position: { x: 0, y: 0, z: 0 },
                rotation: { x: 0, y: 0, z: 0 },
                scale: { x: 1, y: 1, z: 1 },
            };

            expect(isModelSchema(groupEntity)).toBe(false);
        });

        it('should return false for light schema', () => {
            const lightEntity: EntitySchema = {
                id: 'test-light',
                name: 'Test Light',
                entityType: 'light',
                visible: true,
                type: 'ambient',
                intensity: 1,
                color: '#ffffff',
                enabled: true,
            };

            expect(isModelSchema(lightEntity)).toBe(false);
        });

        it('should return false for primitive schema', () => {
            const primitiveEntity: EntitySchema = {
                id: 'test-primitive',
                name: 'Test Primitive',
                entityType: 'primitive',
                visible: true,
                position: { x: 0, y: 0, z: 0 },
                rotation: { x: 0, y: 0, z: 0 },
                scale: { x: 1, y: 1, z: 1 },
                geometry: {
                    name: 'box',
                    width: 1,
                    height: 1,
                    depth: 1,
                },
            };

            expect(isModelSchema(primitiveEntity)).toBe(false);
        });

        it('should return false for pov schema', () => {
            const povEntity: EntitySchema = {
                id: 'test-pov',
                name: 'Test POV',
                entityType: 'pov',
                visible: true,
                position: { x: 0, y: 0, z: 0 },
                target: { x: 0, y: 0, z: -1 },
            };

            expect(isModelSchema(povEntity)).toBe(false);
        });
    });
});
