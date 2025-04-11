import { DIVEGLTFIO } from './gltf/GLTFIO';

import { type DIVESceneFileType } from '../types';
import { type DIVEScene } from '../scene/Scene';
import { Modules } from '../module/Module';

export class DIVEIO {
    private _scene: DIVEScene;

    private _gltfIO: DIVEGLTFIO;

    constructor(scene: DIVEScene) {
        this._scene = scene;

        this._gltfIO = new DIVEGLTFIO();
    }

    public Import<FileType extends keyof DIVESceneFileType>(
        type: FileType,
        url: string,
    ): Promise<DIVESceneFileType[FileType] | null> {
        switch (type) {
            case 'glb': {
                return this._gltfIO.Import(url).catch((error) => {
                    console.error(error);
                    return null;
                });
            }

            default: {
                console.error('DIVEIO.Import: Unsupported file type: ' + type);
                return Promise.reject();
            }
        }
    }

    public Export<FileType extends keyof DIVESceneFileType>(
        type: FileType,
    ): Promise<string | null> {
        switch (type) {
            case 'glb': {
                return this._gltfIO
                    .Export(this._scene, true, true)
                    .then((data) => {
                        return this._createBlobURL(data);
                    })
                    .catch((error) => {
                        console.error(error);
                        return null;
                    });
            }

            default: {
                console.error('DIVEIO.Export: Unsupported file type: ' + type);
                return Promise.reject();
            }
        }
    }

    private _createBlobURL(data: ArrayBuffer): string {
        return URL.createObjectURL(new Blob([data]));
    }
}

declare global {
    interface ModuleClasses {
        DIVEIO: DIVEIO;
    }
}

Modules.register('DIVEIO', 'src/io/IO.ts');
