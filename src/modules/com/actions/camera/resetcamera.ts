export default interface RESET_CAMERA {
    DESCRIPTION: 'Reset the camera to its initial position and rotation.';
    PAYLOAD: { duration: number };
    RETURN: boolean;
}
