import { Object3D } from 'three';
import { USDZExporter, USDZExporterOptions } from 'three/examples/jsm/exporters/USDZExporter';
export type DIVEUSDZExporterOptions = USDZExporterOptions & {
    ar?: {
        anchoring: {
            type: 'plane' | 'image' | 'face' | 'none';
        };
        planeAnchoring: {
            alignment: 'horizontal' | 'vertical' | 'any';
        };
    };
};
export declare class DIVEUSDZExporter extends USDZExporter {
    parse(scene: Object3D, options?: DIVEUSDZExporterOptions): Promise<Uint8Array>;
}
