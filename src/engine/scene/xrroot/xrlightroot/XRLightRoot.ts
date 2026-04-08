import { XREstimatedLight } from 'three/examples/jsm/webxr/XREstimatedLight.ts';
import { Object3D } from 'three/webgpu';
import { type DIVEScene } from '../../Scene.ts';
import { DIVERoot } from '../../../../components/root/Root.ts';

export class DIVEXRLightRoot extends Object3D {
    private _scene: DIVEScene;

    private _xrLight: XREstimatedLight | null;
    private _lightRoot: DIVERoot;
    private _warnedUnsupported = false;

    constructor(scene: DIVEScene) {
        super();
        this.name = 'XRLightRoot';

        this._scene = scene;

        // placeholder for XR light
        this._xrLight = null;

        // add scene
        this._lightRoot = new DIVERoot();
        this._lightRoot.updateSceneObject({
            id: 'XRSceneLight',
            entityType: 'light',
            name: 'XRSceneLight',
            type: 'scene',
            color: 0xffffff,
            intensity: 1,
            enabled: true,
            visible: true,
        });
        this.add(this._lightRoot);
    }

    public initLightEstimation(): void {
        if (!this._warnedUnsupported) {
            console.warn(
                'DIVEXRLightRoot.initLightEstimation: XREstimatedLight is not supported with WebGPURenderer yet. Falling back to the scene light.',
            );
            this._warnedUnsupported = true;
        }
    }

    public disposeLightEstimation(): void {
        if (!this._xrLight) return;

        this._xrLight.removeEventListener('estimationstart', () => {
            this.onEstimationStart();
        });
        this._xrLight.removeEventListener('estimationend', () => {
            this.onEstimationEnd();
        });
    }

    private onEstimationStart(): void {
        this._lightRoot.visible = false;

        if (!this._xrLight) return;

        if (this._xrLight.environment) {
            this._scene.environment = this._xrLight.environment;
        }
    }

    private onEstimationEnd(): void {
        this._lightRoot.visible = true;
        this._scene.environment = null;

        if (!this._xrLight) return;
    }
}
