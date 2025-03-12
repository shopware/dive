import { Object3D } from 'three';
import {
    USDZExporter,
    USDZExporterOptions,
} from 'three/examples/jsm/exporters/USDZExporter.js';

export type DIVEUSDZExporterOptions = USDZExporterOptions & {
    ar?: {
        anchoring: { type: 'plane' | 'image' | 'face' | 'none' }; // source: https://developer.apple.com/documentation/realitykit/preliminary-anchoring-type
        planeAnchoring: { alignment: 'horizontal' | 'vertical' | 'any' }; // source: https://developer.apple.com/documentation/realitykit/preliminary-planeanchoring-alignment
    };
};

export class DIVEUSDZExporter extends USDZExporter {
    public parse(
        scene: Object3D,
        options?: DIVEUSDZExporterOptions,
    ): Promise<Uint8Array> {
        return super.parse(scene, options);
    }
}
