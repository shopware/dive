import { DIVERenderPipeline } from '../RenderPipeline.ts';
import { DIVERenderer } from '../../renderer/Renderer.ts';
import { DIVEScene } from '../../scene/Scene.ts';
import { DIVEPerspectiveCamera } from '../../camera/PerspectiveCamera.ts';

jest.mock('../../renderer/Renderer.ts', () => {
    return {
        DIVERenderer: jest.fn(function () {
            this.render = jest.fn();
        }),
    };
});

jest.mock('../../scene/Scene.ts', () => {
    return {
        DIVEScene: jest.fn(function () {}),
    };
});

jest.mock('../../camera/PerspectiveCamera.ts', () => {
    return {
        DIVEPerspectiveCamera: jest.fn(function () {}),
    };
});

describe('DIVERenderPipeline', () => {
    let pipeline: DIVERenderPipeline;
    let renderer: DIVERenderer;
    let scene: DIVEScene;
    let camera: DIVEPerspectiveCamera;

    beforeEach(() => {
        jest.clearAllMocks();
        renderer = new DIVERenderer();
        scene = new DIVEScene();
        camera = new DIVEPerspectiveCamera();
        pipeline = new DIVERenderPipeline(renderer, scene, camera);
    });

    it('should instantiate with components', () => {
        expect(pipeline).toBeDefined();
        expect(pipeline.renderer).toBe(renderer);
        expect(pipeline.scene).toBe(scene);
        expect(pipeline.camera).toBe(camera);
    });

    it('should add pre-render step', () => {
        const step = jest.fn();
        pipeline.addPreRenderStep(step);
        expect(pipeline['_preRenderSteps']).toContain(step);
    });

    it('should remove pre-render step', () => {
        const step = jest.fn();
        pipeline.addPreRenderStep(step);
        pipeline.removePreRenderStep(step);
        expect(pipeline['_preRenderSteps']).not.toContain(step);
    });

    it('should add post-render step', () => {
        const step = jest.fn();
        pipeline.addPostRenderStep(step);
        expect(pipeline['_postRenderSteps']).toContain(step);
    });

    it('should remove post-render step', () => {
        const step = jest.fn();
        pipeline.addPostRenderStep(step);
        pipeline.removePostRenderStep(step);
        expect(pipeline['_postRenderSteps']).not.toContain(step);
    });

    it('should execute pre-render, render, and post-render steps', () => {
        const preStep = jest.fn();
        const postStep = jest.fn();
        pipeline.addPreRenderStep(preStep);
        pipeline.addPostRenderStep(postStep);

        const deltaTime = 0.016;
        pipeline.tick(deltaTime);

        expect(preStep).toHaveBeenCalledWith(deltaTime);
        expect(renderer.render).toHaveBeenCalledWith(scene, camera);
        expect(postStep).toHaveBeenCalledWith(deltaTime);
    });

    it('should dispose all steps', () => {
        const preStep = jest.fn();
        const postStep = jest.fn();
        pipeline.addPreRenderStep(preStep);
        pipeline.addPostRenderStep(postStep);

        pipeline.dispose();

        expect(pipeline['_preRenderSteps']).toHaveLength(0);
        expect(pipeline['_postRenderSteps']).toHaveLength(0);
    });
});
