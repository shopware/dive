export default interface SET_GIZMO_MODE {
    DESCRIPTION: 'Sets the gizmo\'s mode.';
    PAYLOAD: { mode: 'translate' | 'rotate' | 'scale' };
    RETURN: boolean;
}
