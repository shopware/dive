import { DIVEDefaultSettings } from '@shopware-ag/dive';
import { type QuickViewSettings } from '../types/index.ts';

export const QuickViewDefaultSettings: Required<QuickViewSettings> = {
    ...DIVEDefaultSettings,
    lightIntensity: 1,
};
