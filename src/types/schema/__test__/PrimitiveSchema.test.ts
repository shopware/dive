import { describe, it, expect } from 'vitest';
import { isPrimitiveSchema } from '../PrimitiveSchema.ts';
import type { EntitySchema } from '../EntitySchema.ts';

describe('PrimitiveSchema', () => {
    describe('isPrimitiveSchema', () => {
        it('should return true for valid primitive schema with box geometry', () => {
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
                    width: 2,
                    height: 3,
                    depth: 4,
                },
            };

            expect(isPrimitiveSchema(primitiveEntity)).toBe(true);
        });

        it('should return true for primitive schema with sphere geometry', () => {
            const primitiveEntity: EntitySchema = {
                id: 'test-sphere',
                name: 'Test Sphere',
                entityType: 'primitive',
                visible: true,
                position: { x: 1, y: 2, z: 3 },
                rotation: { x: 0.1, y: 0.2, z: 0.3 },
                scale: { x: 0.5, y: 0.5, z: 0.5 },
                geometry: {
                    name: 'sphere',
                    width: 1,
                    height: 1,
                    depth: 1,
                },
            };

            expect(isPrimitiveSchema(primitiveEntity)).toBe(true);
        });

        it('should return true for primitive schema with material', () => {
            const primitiveEntity: EntitySchema = {
                id: 'test-primitive-with-material',
                name: 'Test Primitive with Material',
                entityType: 'primitive',
                visible: true,
                position: { x: 0, y: 0, z: 0 },
                rotation: { x: 0, y: 0, z: 0 },
                scale: { x: 1, y: 1, z: 1 },
                geometry: {
                    name: 'cylinder',
                    width: 1,
                    height: 2,
                    depth: 1,
                },
                material: {
                    color: '#ff0000',
                    roughness: 0.5,
                    metalness: 0.2,
                },
            };

            expect(isPrimitiveSchema(primitiveEntity)).toBe(true);
        });

        it('should return true for primitive schema with cone geometry', () => {
            const primitiveEntity: EntitySchema = {
                id: 'test-cone',
                name: 'Test Cone',
                entityType: 'primitive',
                visible: true,
                position: { x: -1, y: -2, z: -3 },
                rotation: { x: 0, y: 0, z: 0 },
                scale: { x: 2, y: 2, z: 2 },
                geometry: {
                    name: 'cone',
                    width: 1.5,
                    height: 3,
                    depth: 1.5,
                },
            };

            expect(isPrimitiveSchema(primitiveEntity)).toBe(true);
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

            expect(isPrimitiveSchema(modelEntity)).toBe(false);
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

            expect(isPrimitiveSchema(groupEntity)).toBe(false);
        });

        it('should return false for light schema', () => {
            const lightEntity: EntitySchema = {
                id: 'test-light',
                name: 'Test Light',
                entityType: 'light',
                visible: true,
                type: 'point',
                intensity: 1,
                color: '#ffffff',
                enabled: true,
                position: { x: 0, y: 0, z: 0 },
            };

            expect(isPrimitiveSchema(lightEntity)).toBe(false);
        });

        it('should return false for camera schema', () => {
            const cameraEntity: EntitySchema = {
                id: 'test-camera',
                name: 'Test CAMERA',
                entityType: 'camera',
                visible: true,
                position: { x: 0, y: 0, z: 5 },
                target: { x: 0, y: 0, z: 0 },
            };

            expect(isPrimitiveSchema(cameraEntity)).toBe(false);
        });
    });
});
