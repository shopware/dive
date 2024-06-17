import { PointLight, Color, SphereGeometry, MeshBasicMaterial, Mesh, FrontSide, Object3D } from 'three';
import DIVECommunication from '../com/Communication';
import { HELPER_LAYER_MASK, PRODUCT_LAYER_MASK } from '../constant/VisibilityLayerMask';
import { DIVEMoveable } from '../interface/Moveable';
import { DIVESelectable } from '../interface/Selectable';
import type { TransformControls } from 'three/examples/jsm/Addons.js';

/**
 * A basic point light.
 *
 * Can change the color, intensity, and visibility of the light.
 *
 * Can be moved and selected.
 *
 * @module
 */

export default class DIVEPointLight extends Object3D implements DIVESelectable, DIVEMoveable {
    public isMoveable: true = true;
    public isSelectable: true = true;
    public gizmo: TransformControls | null = null;

    private light: PointLight;
    private mesh: Mesh;

    constructor() {
        super();

        this.name = 'DIVEPointLight';

        this.light = new PointLight(0xffffff, 1);

        this.light.layers.mask = PRODUCT_LAYER_MASK;

        this.light.castShadow = true;
        this.light.shadow.mapSize.width = 512;
        this.light.shadow.mapSize.height = 512;
        this.add(this.light);

        const geoSize = 0.1;

        const geometry = new SphereGeometry(geoSize, geoSize * 320, geoSize * 320);

        const material = new MeshBasicMaterial({ color: this.light.color, transparent: true, opacity: 0.8, side: FrontSide });

        this.mesh = new Mesh(geometry, material);
        this.mesh.layers.mask = HELPER_LAYER_MASK;

        this.add(this.mesh);
    }

    public SetColor(color: Color): void {
        this.light.color = color;

        (this.mesh.material as MeshBasicMaterial).color = color;
    }

    public SetIntensity(intensity: number): void {
        this.light.intensity = intensity;

        (this.mesh.material as MeshBasicMaterial).opacity = intensity > 0.8 ? 0.8 : intensity * 0.8;
    }

    public SetEnabled(enabled: boolean): void {
        this.light.visible = enabled;
    }

    public onMove(): void {
        DIVECommunication.get(this.userData.id)?.PerformAction('UPDATE_OBJECT', { id: this.userData.id, position: this.position });
    }
}
