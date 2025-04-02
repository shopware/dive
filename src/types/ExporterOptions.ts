import { GLTFExporterOptions as THREEGLTFExporterOptions } from 'three/examples/jsm/exporters/GLTFExporter';
import { USDZExporterOptions as THREEUSDZExporterOptions } from 'three/examples/jsm/exporters/USDZExporter';
import { type FileType, type FileTypeOptions } from './FileTypes';

export type USDZExporterOptions = THREEUSDZExporterOptions & {
    ar?: {
        anchoring: { type: 'plane' | 'image' | 'face' | 'none' }; // source: https://developer.apple.com/documentation/realitykit/preliminary-anchoring-type
        planeAnchoring: { alignment: 'horizontal' | 'vertical' | 'any' }; // source: https://developer.apple.com/documentation/realitykit/preliminary-planeanchoring-alignment
    };
};

export type GLTFExporterOptions = THREEGLTFExporterOptions;

export type ExportOptions<T extends FileType> = FileTypeOptions<T>;
