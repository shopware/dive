import { type Vector3Like } from 'three';
import { type MediaGenerationResolution } from './MediaGenerationResolution.ts';

export type MediaGenerationByPosition = {
    resolution: MediaGenerationResolution;
    position: Vector3Like;
    target: Vector3Like;
};
