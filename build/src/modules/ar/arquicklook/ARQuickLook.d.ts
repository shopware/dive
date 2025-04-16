import { ARSystemOptions } from '../ARSystem';
export declare class ARQuickLook {
    private converter;
    launch(uri: string, options?: ARSystemOptions): Promise<void>;
    private convertToUSDZ;
    private launchARQuickLook;
}
