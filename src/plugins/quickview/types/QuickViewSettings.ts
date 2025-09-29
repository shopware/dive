import { DIVESettings, type IBLEnvironmentOptions } from '@shopware-ag/dive';

export type QuickViewSettings = DIVESettings & {
    lightIntensity: number;
    hdr: IBLEnvironmentOptions;
};
