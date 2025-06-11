import { describe, it, expect, vi, beforeEach } from 'vitest';
import { SetCameraLockedAction } from '../lockcamera.ts';
import { type OrbitController } from '@shopware-ag/dive/orbitcontroller';

const mockController = {
    enabled: true,
} as unknown as OrbitController;

describe('modules/state/actions/camera/lockcamera', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        mockController.enabled = true; // Reset to default state
    });

    it('should lock the camera (disable controller) when payload is false', () => {
        const action = new SetCameraLockedAction(false, {
            controller: mockController,
        });

        // Execute action
        action.execute();

        // Verify results - when camera is "locked", controller should be disabled
        expect(mockController.enabled).toBe(false);
    });

    it('should unlock the camera (enable controller) when payload is true', () => {
        const action = new SetCameraLockedAction(true, {
            controller: mockController,
        });

        // Execute action
        action.execute();

        // Verify results - when camera is "unlocked", controller should be enabled
        expect(mockController.enabled).toBe(true);
    });

    it('should handle multiple consecutive lock/unlock operations', () => {
        // Lock the camera
        const lockAction = new SetCameraLockedAction(false, {
            controller: mockController,
        });
        lockAction.execute();
        expect(mockController.enabled).toBe(false);

        // Unlock the camera
        const unlockAction = new SetCameraLockedAction(true, {
            controller: mockController,
        });
        unlockAction.execute();
        expect(mockController.enabled).toBe(true);

        // Lock again
        const lockAgainAction = new SetCameraLockedAction(false, {
            controller: mockController,
        });
        lockAgainAction.execute();
        expect(mockController.enabled).toBe(false);
    });
});
