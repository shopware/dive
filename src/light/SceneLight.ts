import { PRODUCT_LAYER_MASK } from "../constant/VisibilityLayerMask.ts";
import { Color, DirectionalLight, HemisphereLight, Object3D } from "three";

export default class DIVESceneLight extends Object3D {

    private hemiLight: HemisphereLight;
    private dirLight: DirectionalLight;

    constructor() {
        super();

        this.name = "SceneLight";

        this.hemiLight = new HemisphereLight(0xffffff, 0xffffff, 2);
        this.hemiLight.layers.mask = PRODUCT_LAYER_MASK;
        this.hemiLight.position.set(0, 50, 0);
        this.add(this.hemiLight);

        this.dirLight = new DirectionalLight(0xffffff, 3);
        this.dirLight.layers.mask = PRODUCT_LAYER_MASK;
        this.dirLight.position.set(1, 1.75, 1);
        this.dirLight.position.multiplyScalar(30);
        this.dirLight.castShadow = true;

        this.dirLight.shadow.mapSize.width = 2048;
        this.dirLight.shadow.mapSize.height = 2048;

        const d = 5;

        this.dirLight.shadow.camera.left = - d;
        this.dirLight.shadow.camera.right = d;
        this.dirLight.shadow.camera.top = d;
        this.dirLight.shadow.camera.bottom = - d;

        this.dirLight.shadow.camera.far = 3500;
        this.add(this.dirLight);
    }

    public SetColor(color: Color): void {
        this.hemiLight.color = color;
        this.dirLight.color = color;
    }

    public SetIntensity(intensity: number): void {
        this.hemiLight.intensity = intensity * 2;
        this.dirLight.intensity = intensity * 3;
    }

    public SetEnabled(enabled: boolean): void {
        this.visible = enabled;
    }
}