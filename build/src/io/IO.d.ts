import { DIVESceneFileType } from '../types';
import { DIVEScene } from '../scene/Scene';
export declare class DIVEIO {
    private _scene;
    private _gltfIO;
    constructor(scene: DIVEScene);
    Import<FileType extends keyof DIVESceneFileType>(type: FileType, url: string): Promise<DIVESceneFileType[FileType] | null>;
    Export<FileType extends keyof DIVESceneFileType>(type: FileType): Promise<string | null>;
    private _createBlobURL;
}
