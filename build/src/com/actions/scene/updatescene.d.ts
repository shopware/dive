export default interface UPDATE_SCENE {
    DESCRIPTION: 'Updates global scene data.';
    PAYLOAD: {
        name?: string;
        backgroundColor?: string | number;
        gridEnabled?: boolean;
        floorEnabled?: boolean;
        floorColor?: string | number;
    };
    RETURN: boolean;
}
