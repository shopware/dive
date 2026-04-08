import { MathUtils } from 'three/webgpu';

export default function degToRad(degrees: number): number {
    return MathUtils.degToRad(degrees);
}
