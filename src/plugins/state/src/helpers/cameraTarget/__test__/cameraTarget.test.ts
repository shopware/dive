import { Vector3 } from 'three/webgpu';
import { DIVENode } from '@shopware-ag/dive';
import { aimCamera, readCameraTarget } from '../cameraTarget.ts';

const expectVec = (
    actual: Vector3,
    expected: { x: number; y: number; z: number },
): void => {
    expect(actual.x).toBeCloseTo(expected.x);
    expect(actual.y).toBeCloseTo(expected.y);
    expect(actual.z).toBeCloseTo(expected.z);
};

describe('plugins/state/cameraTarget', () => {
    let node: DIVENode;

    beforeEach(() => {
        node = new DIVENode();
        node.position.set(0, 0, 5);
    });

    it('should turn +Z towards the target', () => {
        aimCamera(node, { x: 0, y: 0, z: 0 });

        const forward = new Vector3(0, 0, 1).applyQuaternion(node.quaternion);
        expectVec(forward, { x: 0, y: 0, z: -1 });
    });

    it('should read back the target it was aimed at', () => {
        aimCamera(node, { x: 1, y: 2, z: 0 });

        expectVec(readCameraTarget(node), { x: 1, y: 2, z: 0 });
    });

    it('should move, turn and scale the target with the parent', () => {
        const group = new DIVENode();
        group.add(node);
        aimCamera(node, { x: 0, y: 0, z: 0 });

        group.position.set(10, 0, 0);
        group.rotation.set(0, Math.PI / 2, 0);
        group.scale.setScalar(2);

        // camera at 10 + 2 * 5 along the turned +Z, target at the group's origin
        expectVec(node.getWorldPosition(new Vector3()), { x: 20, y: 0, z: 0 });
        expectVec(readCameraTarget(node), { x: 10, y: 0, z: 0 });
    });

    it('should fall back to the node position when never aimed', () => {
        expectVec(readCameraTarget(node), { x: 0, y: 0, z: 5 });
    });
});
