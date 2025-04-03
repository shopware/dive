export default interface ZOOM_CAMERA {
    DESCRIPTION: 'Zooms the camera in or out by a certain amount.';
    PAYLOAD: {
        direction: 'IN' | 'OUT';
        by: number;
    };
    RETURN: boolean;
}
