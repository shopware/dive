export default interface PLACE_ON_FLOOR {
    DESCRIPTION: 'Places an object on the floor.';
    PAYLOAD: {
        id: string;
    };
    RETURN: boolean;
}
