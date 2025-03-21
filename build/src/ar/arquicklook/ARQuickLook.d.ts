import { DIVEScene } from '../../scene/Scene';
import { DIVEAROptions } from '../AR';
export declare class DIVEARQuickLook {
    static Launch(scene: DIVEScene, options?: DIVEAROptions): Promise<void>;
    private static launchARQuickLook;
    private static findARQuickLookSrc;
}
