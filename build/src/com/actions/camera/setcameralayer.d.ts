export default interface SET_CAMERA_LAYER {
    DESCRIPTION: 'Sets the camera layer to a certain layer.';
    PAYLOAD: {
        layer: 'LIVE' | 'EDITOR';
    };
    RETURN: boolean;
}
