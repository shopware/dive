export default interface SET_BACKGROUND {
    DESCRIPTION: 'Set the background color of the scene.';
    PAYLOAD: { color: string | number };
    RETURN: boolean;
}
