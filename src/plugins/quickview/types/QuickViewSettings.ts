import { DIVESettings, type HDREnvironmentOptions } from '@shopware-ag/dive';

export type QuickViewSettings = DIVESettings & {
    lightIntensity: number;
    /**
     * HDR settings.
     */
    hdr: HDREnvironmentOptions;
};
