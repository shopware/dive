import { describe, it, expect } from 'vitest';
import { isCameraSchema } from '../CameraSchema.ts';
import type { EntitySchema } from '../EntitySchema.ts';

describe('CameraSchema', () => {
    describe('isCameraSchema', () => {
        it('should return true for valid camera schema', () => {
            const cameraEntity: EntitySchema = {
                id: 'test-camera',
                name: 'Test Camera',
                entityType: 'camera',
                visible: true,
                position: { x: 0, y: 0, z: 5 },
                target: { x: 0, y: 0, z: 0 },
            };

            expect(isCameraSchema(cameraEntity)).toBe(true);
        });

        it('should return true for camera schema with locked property', () => {
            const cameraEntity: EntitySchema = {
                id: 'test-camera-locked',
                name: 'Test Locked Camera',
                entityType: 'camera',
                visible: true,
                position: { x: 10, y: 5, z: 10 },
                target: { x: 0, y: 0, z: 0 },
                locked: true,
            };

            expect(isCameraSchema(cameraEntity)).toBe(true);
        });

        it('should return true for camera schema with unlocked property', () => {
            const cameraEntity: EntitySchema = {
                id: 'test-camera-unlocked',
                name: 'Test Unlocked Camera',
                entityType: 'camera',
                visible: false,
                position: { x: -5, y: 2, z: 8 },
                target: { x: 1, y: 1, z: 1 },
                locked: false,
            };

            expect(isCameraSchema(cameraEntity)).toBe(true);
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

            expect(isCameraSchema(modelEntity)).toBe(false);
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

            expect(isCameraSchema(groupEntity)).toBe(false);
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

            expect(isCameraSchema(lightEntity)).toBe(false);
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
                    name: 'cube',
                    width: 1,
                    height: 1,
                    depth: 1,
                },
            };

            expect(isCameraSchema(primitiveEntity)).toBe(false);
        });
    });
});
