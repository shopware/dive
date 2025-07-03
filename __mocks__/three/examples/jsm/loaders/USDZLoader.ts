import { Object3D } from 'three';

export class USDZLoader {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    loadAsync(uri: string): Promise<Object3D> {
        return Promise.resolve(new Object3D());
    }
}
