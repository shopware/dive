import { DIVEGLTFIO } from "./gltf/GLTFIO";

import { type DIVESceneFileType } from "../types";
import { type DIVEScene } from "../scene/Scene";

export class DIVEIO {

    private _scene: DIVEScene;

    private _gltfIO: DIVEGLTFIO;

    constructor(scene: DIVEScene) {

        this._scene = scene;

        this._gltfIO = new DIVEGLTFIO();

    }

    public Import<FileType extends keyof DIVESceneFileType>(type: FileType, url: string): Promise<DIVESceneFileType[FileType] | null> {

        return this._importFromURL(type, url)

            .catch((error) => {

                console.error(error);

                return null;

            });

    }

    public Export<FileType extends keyof DIVESceneFileType>(type: FileType): Promise<string | null> {

        return this._exportToURL(type)

            .catch((error) => {

                console.error(error);

                return null;

            });

    }

    private _importFromURL<FileType extends keyof DIVESceneFileType>(type: FileType, url: string): Promise<DIVESceneFileType[FileType]> {

        switch (type) {

            case 'glb': {

                return this._gltfIO.Import(url);

            }

            default: {

                return Promise.reject('Unsupported file type: ' + type);

            }

        }
    }

    private _exportToURL<FileType extends keyof DIVESceneFileType>(type: FileType): Promise<string> {

        switch (type) {

            case 'glb': {

                return new Promise((resolve, reject) => {

                    this._gltfIO.Export(this._scene, true, true)

                        .then((data) => {

                            resolve(this._createBlobURL(data))

                        })

                        .catch((error) => {

                            reject(error);

                        });
                });

            }

            default: {

                return Promise.reject('Unsupported file type: ' + type);

            }

        }
    }

    private _createBlobURL(data: ArrayBuffer): string {

        return URL.createObjectURL(new Blob([data]));

    }

}