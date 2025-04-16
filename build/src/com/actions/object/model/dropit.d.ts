export default interface DROP_IT {
    DESCRIPTION: 'Places an object on top of an underlying object or the floor.';
    PAYLOAD: {
        id: string;
    };
    RETURN: boolean;
}
