import { type DIVEScene } from '../../../engine/scene/Scene';
import { type DIVERenderer } from '../../../engine/renderer/Renderer';
import { type DIVEOrbitController } from '../../controller/orbit/OrbitController';
import { type DIVEToolbox } from '../../toolbox/Toolbox';
import { Action } from './action';

export interface ActionDependencies {
    scene: DIVEScene;
    renderer: DIVERenderer;
    controls: DIVEOrbitController;
    toolbox: DIVEToolbox;
    mediaCreator: import('../../../modules/mediacreator/MediaCreator').MediaCreator;
}

export interface ActionDefinition<P = unknown, R = unknown> {
    DESCRIPTION: string;
    PAYLOAD: P;
    RETURN: R;
}

export type ActionClass<P = unknown, R = unknown> = new (
    payload: P,
    dependencies: ActionDependencies,
) => Action<P, R>;
