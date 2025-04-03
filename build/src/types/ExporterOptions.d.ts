import { GLTFExporterOptions as THREEGLTFExporterOptions } from 'three/examples/jsm/exporters/GLTFExporter';
import { USDZExporterOptions as THREEUSDZExporterOptions } from 'three/examples/jsm/exporters/USDZExporter';
import { FileType, FileTypeOptions } from './FileTypes';
export type USDZExporterOptions = THREEUSDZExporterOptions & {
    ar?: {
        anchoring: {
            type: 'plane' | 'image' | 'face' | 'none';
        };
        planeAnchoring: {
            alignment: 'horizontal' | 'vertical' | 'any';
        };
    };
};
export type GLTFExporterOptions = THREEGLTFExporterOptions;
export type ExportOptions<T extends FileType> = FileTypeOptions<T>;
