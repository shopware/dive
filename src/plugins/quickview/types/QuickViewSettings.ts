import { DIVESettings } from '@shopware-ag/dive';
import { HDREnvironmentSettings } from '@shopware-ag/dive/hdr';

export type QuickViewSettings = DIVESettings & {
    lightIntensity: number;
    /**
     * HDR settings.
     */
    hdr: HDREnvironmentSettings;
};
