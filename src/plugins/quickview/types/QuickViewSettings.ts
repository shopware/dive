import { DIVESettings } from '@shopware-ag/dive';

export type QuickViewSettings = DIVESettings;

/**
 * What to do around a model swap, beyond loading it.
 *
 * Both default to `true`, because that is what a viewer wants: a model that
 * stands on the ground and fills the view. Turn one off where the caller has its
 * own answer -- a configurator that keeps the camera where the user put it, or a
 * scene where the model is meant to float.
 */
export type QuickViewLoadSettings = {
    /** Drop the model onto whatever is below it. @default true */
    dropToFloor: boolean;
    /** Frame the model once it is loaded. @default true */
    focus: boolean;
};
