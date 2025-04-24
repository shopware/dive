import { DIVEPerspectiveCamera } from '../camera/PerspectiveCamera.ts';
import { DIVERenderer, DIVERendererSettings } from '../renderer/Renderer.ts';
import { DIVEScene } from '../scene/Scene.ts';
import { type DIVETicker } from '../clock/Clock.ts';

export type DIVEPipelineStep = (deltaTime: number) => void;

export type DIVERenderPipelineSettings = {
    renderer: Partial<DIVERendererSettings>;
};

export const DIVERenderPipelineDefaultSettings: DIVERenderPipelineSettings = {
    renderer: {},
};

export class DIVERenderPipeline implements DIVETicker {
    private _preRenderSteps: DIVEPipelineStep[] = [];
    private _postRenderSteps: DIVEPipelineStep[] = [];

    constructor(
        private _renderer: DIVERenderer,
        private _scene: DIVEScene,
        private _camera: DIVEPerspectiveCamera,
    ) {}

    public get renderer(): DIVERenderer {
        return this._renderer;
    }

    public get scene(): DIVEScene {
        return this._scene;
    }

    public get camera(): DIVEPerspectiveCamera {
        return this._camera;
    }

    public addPreRenderStep(step: DIVEPipelineStep): void {
        this._preRenderSteps.push(step);
    }

    public removePreRenderStep(step: DIVEPipelineStep): void {
        const index = this._preRenderSteps.findIndex((s) => s === step);
        if (index !== -1) {
            this._preRenderSteps.splice(index, 1);
        }
    }

    public addPostRenderStep(step: DIVEPipelineStep): void {
        this._postRenderSteps.push(step);
    }

    public removePostRenderStep(step: DIVEPipelineStep): void {
        const index = this._postRenderSteps.findIndex((s) => s === step);
        if (index !== -1) {
            this._postRenderSteps.splice(index, 1);
        }
    }

    public tick(deltaTime: number): void {
        // Execute pre-render steps
        this._preRenderSteps.forEach((step) => step(deltaTime));

        // Render
        this._renderer.render(this._scene, this._camera);

        // Execute post-render steps
        this._postRenderSteps.forEach((step) => step(deltaTime));
    }

    public dispose(): void {
        this._postRenderSteps = [];
        this._preRenderSteps = [];
    }
}
