import { DIVEAROptions } from '../../../ar/AR';
export default interface LAUNCH_AR {
    DESCRIPTION: 'Launches AR mode in native capabilities. (iOS: AR Quick Look, Android: Google Scene Viewer)';
    PAYLOAD?: DIVEAROptions;
    RETURN: Promise<void>;
}
