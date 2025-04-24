export default jest.fn(function () {
    this.layers = { mask: 0 };
    this.position = {
        x: 0,
        y: 0,
        z: 0,
        set: jest.fn((_x: number, _y: number, _z: number) => {
            this.position.x = _x;
            this.position.y = _y;
            this.position.z = _z;
        }),
    };
    return this;
});
