import { MathUtils } from 'three';

export default function radToDeg(radians: number): number {
    return (MathUtils.radToDeg(radians) + 360) % 360;
}
