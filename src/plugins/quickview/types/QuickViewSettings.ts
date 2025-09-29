import { DIVESettings, type HDREnvironmentSettings } from '@shopware-ag/dive';

export type QuickViewSettings = DIVESettings & {
    lightIntensity: number;
    /**
     * HDR settings.
     */
    hdr: HDREnvironmentSettings;
};
