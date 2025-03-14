import { DIVEScene } from '../../scene/Scene';
import { DIVEAROptions } from '../AR';
export declare class DIVEARQuickLook {
    private static _usdzExporter;
    static Launch(scene: DIVEScene, options?: DIVEAROptions): Promise<void>;
    private static extractModels;
    private static launchARFromNode;
}
