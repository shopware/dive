export default jest.fn(() => {
    return {
        isObject3D: true,
        parent: null,
        dispatchEvent: jest.fn(),
        layers: {
            mask: 0,
        },
        position: {
            set: jest.fn(),
        },
        removeFromParent: jest.fn(),
    };
});
