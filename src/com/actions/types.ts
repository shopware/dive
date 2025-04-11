import { type DIVEScene } from '../../scene/Scene';
import { type DIVERenderer } from '../../renderer/Renderer';
import type DIVEOrbitControls from '../../controls/OrbitControls';
import type DIVEToolbox from '../../toolbox/Toolbox';
import { type DIVEMediaCreator } from '../../mediacreator/MediaCreator';
import { type DIVEIO } from '../../io/IO';
import { type DIVEAR } from '../../ar/AR';
import { Action } from './action';

export interface ActionDependencies {
    scene: DIVEScene;
    renderer: DIVERenderer;
    controls: DIVEOrbitControls;
    toolbox: DIVEToolbox;
    mediaCreator: DIVEMediaCreator;
    io: DIVEIO;
    ar: DIVEAR;
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
