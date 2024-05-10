import { PointLight, Color, SphereGeometry, MeshBasicMaterial, Mesh, FrontSide } from 'three';
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

export default class DIVEPointLight extends PointLight implements DIVESelectable, DIVEMoveable {
    public isMoveable: true = true;
    public isSelectable: true = true;
    public gizmo: TransformControls | null = null;

    constructor() {
        super(0xffffff, 1);

        this.layers.mask = PRODUCT_LAYER_MASK;

        this.castShadow = true;
        this.shadow.mapSize.width = 512;
        this.shadow.mapSize.height = 512;

        const geoSize = 0.1;

        const geometry = new SphereGeometry(geoSize, geoSize * 320, geoSize * 320);

        const material = new MeshBasicMaterial({ color: this.color, transparent: true, opacity: 0.8, side: FrontSide });

        const mesh = new Mesh(geometry, material);
        mesh.layers.mask = HELPER_LAYER_MASK;

        this.add(mesh);
    }

    public SetColor(color: Color): void {
        this.color = color;

        ((this.children[0] as Mesh).material as MeshBasicMaterial).color = color;
    }

    public SetIntensity(intensity: number): void {
        this.intensity = intensity;

        ((this.children[0] as Mesh).material as MeshBasicMaterial).opacity = intensity > 0.8 ? 0.8 : intensity * 0.8;
    }

    public SetEnabled(enabled: boolean): void {
        this.visible = enabled;
    }

    public onMove(): void {
        DIVECommunication.get(this.userData.id)?.PerformAction('UPDATE_OBJECT', { id: this.userData.id, position: this.position });
    }
}
