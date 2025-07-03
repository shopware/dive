import { describe, it, expect } from 'vitest';
import { isLightSchema } from '../LightSchema.ts';
import type { EntitySchema } from '../EntitySchema.ts';

describe('LightSchema', () => {
    describe('isLightSchema', () => {
        it('should return true for ambient light schema', () => {
            const ambientLightEntity: EntitySchema = {
                id: 'test-ambient-light',
                name: 'Test Ambient Light',
                entityType: 'light',
                visible: true,
                type: 'ambient',
                intensity: 0.5,
                color: '#ffffff',
                enabled: true,
            };

            expect(isLightSchema(ambientLightEntity)).toBe(true);
        });

        it('should return true for point light schema', () => {
            const pointLightEntity: EntitySchema = {
                id: 'test-point-light',
                name: 'Test Point Light',
                entityType: 'light',
                visible: true,
                type: 'point',
                intensity: 1.0,
                color: 0xffffff,
                enabled: true,
                position: { x: 0, y: 5, z: 0 },
            };

            expect(isLightSchema(pointLightEntity)).toBe(true);
        });

        it('should return true for scene light schema', () => {
            const sceneLightEntity: EntitySchema = {
                id: 'test-scene-light',
                name: 'Test Scene Light',
                entityType: 'light',
                visible: true,
                type: 'scene',
                intensity: 2.0,
                color: '#ffddaa',
                enabled: false,
                rotation: { x: 0, y: 0, z: 0 },
            };

            expect(isLightSchema(sceneLightEntity)).toBe(true);
        });

        it('should return true for light with both position and rotation', () => {
            const lightEntity: EntitySchema = {
                id: 'test-light',
                name: 'Test Light',
                entityType: 'light',
                visible: true,
                type: 'point',
                intensity: 1.5,
                color: '#ff0000',
                enabled: true,
                position: { x: 1, y: 2, z: 3 },
                rotation: { x: 0.1, y: 0.2, z: 0.3 },
            };

            expect(isLightSchema(lightEntity)).toBe(true);
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

            expect(isLightSchema(modelEntity)).toBe(false);
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

            expect(isLightSchema(groupEntity)).toBe(false);
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
                    name: 'sphere',
                    width: 1,
                    height: 1,
                    depth: 1,
                },
            };

            expect(isLightSchema(primitiveEntity)).toBe(false);
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

            expect(isLightSchema(povEntity)).toBe(false);
        });
    });
});
