import { MathUtils } from 'three/webgpu';

export default function radToDeg(radians: number): number {
    return (MathUtils.radToDeg(radians) + 360) % 360;
}
