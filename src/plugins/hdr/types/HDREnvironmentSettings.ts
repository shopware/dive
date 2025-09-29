export type HDREnvironmentSettings = {
    /**
     * Whether to enable the image-based lighting.
     *
     * @default false
     */
    enabled?: boolean;
    /**
     * The URL of the HDR image.
     *
     * @default undefined
     */
    imageUrl?: string;
    /**
     * Whether to use the HDR image as a background image.
     *
     * @default false
     */
    useAsBackground?: boolean;
    /**
     * The intensity of the environment lighting.
     *
     * @default 1
     */
    globalEnvIntensity?: number;
    /**
     * The exposure of the HDR image.
     *
     * @default 1
     */
    exposure?: number;
    /**
     * The rotation of the HDR image in radians.
     *
     * @default 0
     */
    rotateY?: number;
    /**
     * Whether to replace the existing lights (can be restored via `restoreLights`).
     *
     * @default false
     */
    replaceLights?: boolean;
};
