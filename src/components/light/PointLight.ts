import {
    PointLight,
    Color,
    SphereGeometry,
    MeshBasicMaterial,
    Mesh,
    FrontSide,
    Object3D,
} from 'three';
import { getModule } from '../../modules/ModuleRegistry.ts';
import {
    PRODUCT_LAYER_MASK,
    UI_LAYER_MASK,
} from '../../constants/VisibilityLayerMask.ts';
import { DIVEMovable } from '../../interfaces/Movable.ts';
import { DIVESelectable } from '../../interfaces/Selectable.ts';
import type { TransformControls } from 'three/examples/jsm/controls/TransformControls.ts';

/**
 * A basic point light.
 *
 * Can change the color, intensity, and visibility of the light.
 *
 * Can be moved and selected.
 *
 * @module
 */

export class DIVEPointLight
    extends Object3D
    implements DIVESelectable, DIVEMovable
{
    readonly isDIVELight: true = true;
    readonly isDIVEPointLight: true = true;
    readonly isMovable: true = true;
    readonly isSelectable: true = true;

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

        const geometry = new SphereGeometry(
            geoSize,
            geoSize * 320,
            geoSize * 320,
        );

        const material = new MeshBasicMaterial({
            color: this.light.color,
            transparent: true,
            opacity: 0.8,
            side: FrontSide,
        });

        this.mesh = new Mesh(geometry, material);
        this.mesh.layers.mask = UI_LAYER_MASK;

        this.add(this.mesh);
    }

    public setColor(color: Color): void {
        this.light.color = color;

        (this.mesh.material as MeshBasicMaterial).color = color;
    }

    public setIntensity(intensity: number): void {
        this.light.intensity = intensity;

        (this.mesh.material as MeshBasicMaterial).opacity =
            intensity > 0.8 ? 0.8 : intensity * 0.8;
    }

    public setEnabled(enabled: boolean): void {
        this.light.visible = enabled;
    }

    public onMove(): void {
        getModule('State').then((State) => {
            State.get(this.userData.id)?.performAction('UPDATE_OBJECT', {
                id: this.userData.id,
                position: this.position,
            });
        });
    }

    public onSelect(): void {
        getModule('State').then((State) => {
            State.get(this.userData.id)?.performAction('SELECT_OBJECT', {
                id: this.userData.id,
            });
        });
    }

    public onDeselect(): void {
        getModule('State').then((State) => {
            State.get(this.userData.id)?.performAction('DESELECT_OBJECT', {
                id: this.userData.id,
            });
        });
    }
}
