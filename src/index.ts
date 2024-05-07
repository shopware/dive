import { Vector4 } from "three";
import { update as updateTween } from "@tweenjs/tween.js";
import DIVEScene from "./scene/Scene.ts";
import DIVEPerspectiveCamera from "./camera/PerspectiveCamera.ts";
import DIVERenderer from "./renderer/Renderer.ts";
import DIVEMediaCreator from "./mediacreator/MediaCreator.ts";
import DIVEToolBox from "./toolbox/ToolBox.ts";
import DIVECommunication from "./com/Communication.ts";
import DIVEAxisCamera from "./axiscamera/AxisCamera.ts";
import DIVEOrbitControls from "./controls/OrbitControls.ts";
import { DIVEMath } from './math/index.ts';
import DIVEGrid from "./grid/Grid.ts";

export const initSwSceneEditor = (): { canvasElement: HTMLCanvasElement, com: DIVECommunication, resizing: { enableResize: () => void, disableResize: () => void, setRendererSize: (_width: number, _height: number) => void } } => {
    const renderer = new DIVERenderer();
    const scene = new DIVEScene();
    const cam = new DIVEPerspectiveCamera(80, 1);
    const controls = new DIVEOrbitControls(cam, renderer);
    const mediaCreator = new DIVEMediaCreator(renderer, scene, controls);
    const toolbox = new DIVEToolBox(scene, controls);

    const com = new DIVECommunication(scene, controls, toolbox, mediaCreator);

    scene.add(new DIVEGrid());

    // generate env map (for later)
    // const pmremGenerator = new PMREMGenerator(renderer);
    //scene.environment = pmremGenerator.fromScene( scene ).texture;

    // start running the render loop
    renderer.AddPreRenderCallback(() => {
        updateTween();
    });

    // resize observer
    let width = 0;
    let height = 0;
    let resizing = true;

    /**
     * TEMPORARY SOLUTION - Properly disable resizing
     */
    function disableResize() {
        controls.enabled = false;
        resizing = false;
        cam.SetCameraLayer('LIVE');
        renderer.PauseRenderer();
    }

    function enableResize() {
        resizing = true;
        renderer.setPixelRatio(window.devicePixelRatio);
        cam.SetCameraLayer('EDITOR');
        renderer.ResumeRenderer();
        controls.enabled = true;
    }

    function setRendererSize(_width: number, _height: number) {
        disableResize();
        // resize renderer
        renderer.setSize(_width, _height);
        renderer.setPixelRatio(1);
        renderer.domElement.style.width = 'unset';
        renderer.domElement.style.height = 'unset';

        // resize camera
        cam.aspect = _width / _height;
        cam.updateProjectionMatrix();

        renderer.ForceRendering();

        width = _width;
        height = _height;
    }

    const onResize = () => {
        // check if it should resize
        if (!resizing) return;

        // check if the canvas is mounted
        const canvasWrapper = renderer.domElement.parentElement;
        if (!canvasWrapper) return;

        const { clientWidth, clientHeight } = canvasWrapper;
        if (clientWidth === width && clientHeight === height) return;

        // resize renderer
        renderer.setSize(clientWidth, clientHeight);

        // resize camera
        cam.aspect = clientWidth / clientHeight;
        cam.updateProjectionMatrix();

        width = clientWidth;
        height = clientHeight;
    }
    renderer.AddPreRenderCallback(() => {
        onResize()
    });

    const axesDisplay = new DIVEAxisCamera();
    scene.add(axesDisplay);
    const restoreViewport = new Vector4();

    renderer.AddPostRenderCallback(() => {
        const restoreBackground = scene.background;
        scene.background = null;

        renderer.getViewport(restoreViewport);
        renderer.setViewport(0, 0, 150, 150);
        renderer.autoClear = false;

        axesDisplay.SetFromCameraMatrix(cam.matrix);

        renderer.render(scene, axesDisplay);

        renderer.setViewport(restoreViewport);
        renderer.autoClear = true;

        scene.background = restoreBackground;
    });

    renderer.StartRenderer(scene, cam);

    return { canvasElement: renderer.domElement, com, resizing: { enableResize, disableResize, setRendererSize } };
}

export { DIVEScene, DIVEPerspectiveCamera, DIVERenderer, DIVEOrbitControls, DIVEMediaCreator, DIVEToolBox, DIVECommunication, DIVEAxisCamera, DIVEMath }
