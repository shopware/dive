import { describe, it, expect } from 'vitest';
import { isGroupSchema } from '../GroupSchema.ts';
import type { EntitySchema } from '../EntitySchema.ts';

describe('GroupSchema', () => {
    describe('isGroupSchema', () => {
        it('should return true for valid group schema', () => {
            const groupEntity: EntitySchema = {
                id: 'test-group',
                name: 'Test Group',
                entityType: 'group',
                visible: true,
                position: { x: 0, y: 0, z: 0 },
                rotation: { x: 0, y: 0, z: 0 },
                scale: { x: 1, y: 1, z: 1 },
            };

            expect(isGroupSchema(groupEntity)).toBe(true);
        });

        it('should return true for group schema with linksVisible property', () => {
            const groupEntity: EntitySchema = {
                id: 'test-group',
                name: 'Test Group',
                entityType: 'group',
                visible: true,
                position: { x: 0, y: 0, z: 0 },
                rotation: { x: 0, y: 0, z: 0 },
                scale: { x: 1, y: 1, z: 1 },
                linksVisible: true,
            };

            expect(isGroupSchema(groupEntity)).toBe(true);
        });

        it('should return false for model schema', () => {
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

            expect(isGroupSchema(modelEntity)).toBe(false);
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

            expect(isGroupSchema(lightEntity)).toBe(false);
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

            expect(isGroupSchema(primitiveEntity)).toBe(false);
        });

        it('should return false for camera schema', () => {
            const cameraEntity: EntitySchema = {
                id: 'test-camera',
                name: 'Test CAMERA',
                entityType: 'camera',
                visible: true,
                position: { x: 0, y: 0, z: 0 },
                target: { x: 0, y: 0, z: -1 },
            };

            expect(isGroupSchema(cameraEntity)).toBe(false);
        });
    });
});
