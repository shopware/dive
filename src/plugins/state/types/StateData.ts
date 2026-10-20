import type { Vector3Like } from 'three/webgpu';
import {
    GroupSchema,
    LightSchema,
    ModelSchema,
    CameraSchema,
    PrimitiveSchema,
} from './index.ts';

/**
 * The image based light as the state stores it. Only URLs are stored, so a
 * light set from a texture is stored as `null`, and so is no light.
 */
export type StateImageBasedLight = {
    /** The image URL, or `null` for the bundled default HDR. */
    image: string | null;
    /** Rotation around Y in radians. */
    rotation: number;
    intensity: number;
} | null;

/**
 * The background as the state stores it: a colour as a hex string, an image
 * URL with its rotation, or `null` for transparent. A background set from a
 * texture is stored as `null`.
 */
export type StateBackground =
    | string
    | {
          image: string;
          /** Rotation around Y in radians. */
          rotation: number;
      }
    | null;

export type StateData = {
    // scene data
    name: string;
    /**
     * The colour when the background is a colour, otherwise `'transparent'`.
     * Ignored on load when `background` is given.
     *
     * @deprecated Use `background` instead.
     */
    backgroundColor: string;
    /**
     * What is shown behind the scene. Left out by states saved before it
     * existed, which then fall back to `backgroundColor`.
     */
    background?: StateBackground;
    /**
     * The image based light. Left out by states saved before it existed,
     * which then keep the scene's current light.
     */
    imageBasedLight?: StateImageBasedLight;
    floorEnabled: boolean;
    floorColor: string;

    // scene content
    spotmarks: object[];
    lights: LightSchema[];
    objects: ModelSchema[];
    cameras: CameraSchema[];
    primitives: PrimitiveSchema[];
    groups: GroupSchema[];

    // user data
    userCamera: {
        position: Vector3Like;
        target: Vector3Like;
    };
};
