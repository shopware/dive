import {
    Mesh,
    MeshBasicNodeMaterial,
    SphereGeometry,
    Vector3,
} from 'three/webgpu';
import { BACKGROUND_LAYER_MASK } from '../../constants/VisibilityLayerMask.ts';
import { DIVEComponent } from '../../engine/component/Component.ts';
import { TextureAsset } from '../../engine/asset/texture/TextureAsset.ts';

/** @experimental See {@link GroundProjectionComponent}. */
export type DIVEGroundProjectionSettings = {
    /**
     * How far above the ground the camera that took the image was, in meters.
     * A larger value magnifies the ground part of the image.
     *
     * @default 1.5
     */
    height: number;
    /**
     * The radius of the dome, in meters. The viewing camera has to stay inside,
     * and its far plane has to reach the dome.
     *
     * @default 50
     */
    radius: number;
};

/** @experimental See {@link GroundProjectionComponent}. */
export const DIVEGroundProjectionDefaultSettings: DIVEGroundProjectionSettings =
    {
        height: 1.5,
        radius: 50,
    };

/** Rings of the dome; twice as many segments go around it. */
const RESOLUTION = 128;

const _vertex = new Vector3();

/**
 * An equirectangular image put on a dome with a flat floor.
 *
 * A background at infinity has no ground a model could stand on: its floor
 * slides along under the model as the camera moves. Projecting the lower half
 * of the image onto a plane gives it one, so a product lit by an HDR image also
 * appears to stand in it. The floor lies at the owner's origin.
 *
 * The dome is unlit and writes no depth, so whatever lies on its floor -- such
 * as a {@link SoftShadowComponent} -- is drawn on top of it. It sits on
 * {@link BACKGROUND_LAYER_MASK}, which keeps it out of bounds, exports, picking
 * and shadow bakes.
 *
 * The image is taken by URL and shared with every other user of that URL,
 * such as the scene's image based light, so it is loaded once.
 * {@link dispose} gives it back.
 *
 * @experimental The projection has only been checked on a few HDR images; its
 * API and defaults may change without a major release.
 *
 * @module
 */
export class GroundProjectionComponent extends DIVEComponent {
    readonly isGroundProjectionComponent: true = true;

    private _mesh: Mesh<SphereGeometry, MeshBasicNodeMaterial>;
    private _height: number = DIVEGroundProjectionDefaultSettings.height;
    private _radius: number = DIVEGroundProjectionDefaultSettings.radius;
    private _image: string | null = null;
    private _texture = new TextureAsset(() => this._showImage());

    constructor() {
        super();

        this.name = 'GroundProjectionComponent';

        this._mesh = new Mesh(
            this._buildGeometry(),
            new MeshBasicNodeMaterial({ depthWrite: false }),
        );
        this._mesh.name = 'GroundProjection';
        this._mesh.layers.mask = BACKGROUND_LAYER_MASK;
        this._mesh.position.y = this._height;

        // the background, drawn before everything that stands in it
        this._mesh.renderOrder = -1;

        this.contribute(this._mesh);
    }

    /** The dome the image is drawn on. */
    public get mesh(): Mesh<SphereGeometry, MeshBasicNodeMaterial> {
        return this._mesh;
    }

    /**
     * The URL of the image asked for, `null` for none. A new one shows up here
     * at once, before it has loaded.
     */
    public get image(): string | null {
        return this._image;
    }

    /** How far above the ground the image was taken, in meters. */
    public get height(): number {
        return this._height;
    }

    /** The radius of the dome, in meters. */
    public get radius(): number {
        return this._radius;
    }

    /** Whether the dome is drawn. */
    public get visible(): boolean {
        return this._mesh.visible;
    }

    /**
     * Puts an equirectangular image on the dome. The previous one stays until
     * the new one has loaded.
     *
     * @param url - The URL of the image, or `null` for a white dome.
     * @returns Resolves once the image is in place.
     */
    public async setImage(url: string | null): Promise<this> {
        this._image = url;

        if (url === null) {
            this._texture.clear();
        } else {
            await this._texture.request(url);
        }

        return this;
    }

    /**
     * @param height - How far above the ground the image was taken, in meters.
     */
    public setHeight(height: number): this {
        return this.applySettings({ height });
    }

    /**
     * @param radius - The radius of the dome, in meters.
     */
    public setRadius(radius: number): this {
        return this.applySettings({ radius });
    }

    /**
     * Takes on whatever the settings carry and rebuilds the dome once.
     *
     * @param settings - Height and radius.
     */
    public applySettings(
        settings: Partial<DIVEGroundProjectionSettings>,
    ): this {
        const height = settings.height ?? this._height;
        const radius = settings.radius ?? this._radius;

        if (!(height > 0) || !(radius > 0)) {
            throw new Error(
                'GroundProjectionComponent: height and radius must be positive.',
            );
        }

        if (height === this._height && radius === this._radius) return this;

        this._height = height;
        this._radius = radius;

        this._mesh.geometry.dispose();
        this._mesh.geometry = this._buildGeometry();
        this._mesh.position.y = height;

        return this;
    }

    /**
     * @param visible - Whether the dome is drawn.
     */
    public setVisibility(visible: boolean): this {
        this._mesh.visible = visible;

        return this;
    }

    /** Frees the dome and gives back its image. */
    public dispose(): void {
        this._texture.dispose();
        this._mesh.geometry.dispose();
        this._mesh.material.dispose();
    }

    /**
     * Requests the source's image again, which shares its texture. To wait
     * for it, await `setImage(copy.image)`.
     *
     * @param source - The component to copy from.
     */
    public copy(source: this): this {
        super.copy(source);

        this.applySettings({ height: source.height, radius: source.radius });
        this.setVisibility(source.visible);
        this.setImage(source.image).catch((error: unknown) => {
            // nobody awaits a copy, so this is the only report
            console.error('GroundProjectionComponent: image failed', error);
        });

        return this;
    }

    /** puts the loaded image on the dome */
    private _showImage(): void {
        this._mesh.material.map = this._texture.value;
        this._mesh.material.needsUpdate = true;
    }

    /**
     * A sphere whose lower half is pulled flat onto a floor.
     *
     * Every vertex keeps its direction from the centre, so the image still
     * reads as seen from where it was taken; only its distance changes. Below a
     * blend band the vertex lands on the plane `height` under the centre, and
     * the band smooths the crease between floor and wall. Mirrored along Z,
     * which also turns the faces inward, to match the sky the renderer
     * captures the image based light from.
     */
    private _buildGeometry(): SphereGeometry {
        const geometry = new SphereGeometry(
            this._radius,
            2 * RESOLUTION,
            RESOLUTION,
        );
        geometry.scale(1, 1, -1);

        const position = geometry.getAttribute('position');
        const blend = (-this._height * 3) / 2;

        for (let i = 0; i < position.count; i++) {
            _vertex.fromBufferAttribute(position, i);
            if (_vertex.y >= 0) continue;

            const factor =
                _vertex.y < blend
                    ? -this._height / _vertex.y
                    : 1 - (_vertex.y * _vertex.y) / (3 * blend * blend);

            _vertex.multiplyScalar(factor);
            position.setXYZ(i, _vertex.x, _vertex.y, _vertex.z);
        }

        position.needsUpdate = true;
        geometry.computeBoundingSphere();

        return geometry;
    }
}
