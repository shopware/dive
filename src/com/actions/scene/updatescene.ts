export default interface UPDATE_SCENE {
    'PAYLOAD': {
        name?: string,
        backgroundColor?: string | number,
        gridEnabled?: boolean,
        floorEnabled?: boolean,
        floorColor?: string | number
    },
    'RETURN': boolean,
};