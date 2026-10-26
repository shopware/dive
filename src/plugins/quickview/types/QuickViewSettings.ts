import { DIVESettings } from '@shopware-ag/dive';

export type QuickViewSettings = DIVESettings & {
    /**
     * Whether a model loaded from a URI gets a baked contact shadow under it.
     * It stays on the model across loads and can be reached through
     * `quickView.model.getComponent(SoftShadowComponent)`. Scene state gets
     * none: it describes a scene QuickView did not compose.
     *
     * @default false
     */
    softShadow: boolean;
};
