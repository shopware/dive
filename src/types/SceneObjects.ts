import { DIVEGroup } from '../components/group/Group.ts';
import { DIVEAmbientLight } from '../components/light/AmbientLight.ts';
import { DIVEPointLight } from '../components/light/PointLight.ts';
import { DIVESceneLight } from '../components/light/SceneLight.ts';
import { DIVEModel } from '../components/model/Model.ts';
import { DIVEPrimitive } from '../components/primitive/Primitive.ts';

import { EntityTypeSchema } from '@shopware-ag/dive';

export type DIVESceneObject<T extends EntityTypeSchema | void = void> =
    T extends 'model'
        ? DIVEModel
        : T extends 'group'
          ? DIVEGroup
          : T extends 'primitive'
            ? DIVEPrimitive
            : T extends 'light'
              ? DIVELight
              : DIVEModel | DIVEGroup | DIVEPrimitive | DIVELight;

export type DIVELight = DIVEAmbientLight | DIVEPointLight | DIVESceneLight;
