import { Vector3Like } from 'three';
import { MediaGenerationResolution } from './MediaGenerationResolution.ts';
export type MediaGenerationByPosition = {
    resolution: MediaGenerationResolution;
    position: Vector3Like;
    target: Vector3Like;
};
