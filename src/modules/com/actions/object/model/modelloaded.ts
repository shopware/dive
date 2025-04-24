export default interface MODEL_LOADED {
    DESCRIPTION: 'Is triggered when a model is loaded.';
    PAYLOAD: { id: string };
    RETURN: boolean;
}
