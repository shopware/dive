import { DIVEAmbientLight } from '../../components/light/AmbientLight.ts';
import { DIVEPointLight } from '../../components/light/PointLight.ts';
import { DIVESceneLight } from '../../components/light/SceneLight.ts';
export type DIVELight = DIVEAmbientLight | DIVEPointLight | DIVESceneLight;
