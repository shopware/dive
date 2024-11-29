import { Object3D } from "three";
import { type DIVEScene } from "../../scene/Scene";
import { USDZExporter } from "three/examples/jsm/exporters/USDZExporter";

export class DIVEARQuickLook {
    private static _usdzExporter: USDZExporter = new USDZExporter();

    public static Launch(scene: DIVEScene): Promise<void> {
        // create node to build usdz from
        const quickLookScene = new Object3D();

        // extract models from scene
        quickLookScene.add(...this.extractModels(scene));

        // launch ARQuickLook
        return this.launchARFromNode(quickLookScene);
    }

    private static extractModels(scene: DIVEScene): Object3D[] {
        // extract models
        return scene.Root.ModelRoot.children;
    }

    private static launchARFromNode(node: Object3D): Promise<void> {
        // bundle USDZ
        return this._usdzExporter
            .parse(node, { quickLookCompatible: true })
            .then((usdz: Uint8Array) => {
                // create blob
                const blob = new Blob([usdz], { type: 'model/vnd.usdz+zip' });
                const url = URL.createObjectURL(blob);

                // launch ARQuickLook
                const a = document.createElement('a');
                a.innerHTML = '<picture></picture>'; // This is actually needed so the viewer opens instantly
                a.rel = 'ar';
                a.href = url;
                a.download = 'scene.usdz';
                a.click();
            });
    }
}