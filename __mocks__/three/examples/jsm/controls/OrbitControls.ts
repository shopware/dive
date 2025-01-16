export const OrbitControls = jest.fn(function () {
    this.enableDamping = true;
    this.dampingFactor = 0.25;
    this.enableZoom = true;
    this.enablePan = true;
    this.minPolarAngle = 0;
    this.maxPolarAngle = Math.PI;
    this.minDistance = 0;
    this.maxDistance = Infinity;
    this.rotateSpeed = 0.5;
    this.panSpeed = 0.5;
    this.zoomSpeed = 0.5;
    this.keyPanSpeed = 0.5;
    this.screenSpacePanning = true;
    this.autoRotate = false;
    this.autoRotateSpeed = 2.0;
    this.enableKeys = true;
    this.keys = {
        LEFT: 37,
        UP: 38,
        RIGHT: 39,
        BOTTOM: 40,
    };
    this.mouseButtons = {
        LEFT: 0,
        MIDDLE: 1,
        RIGHT: 2,
    };
    this.update = jest.fn();
    this.dispose = jest.fn();
    this.getDistance = jest.fn();
    this.target = {
        clone: jest.fn(),
        set: jest.fn(),
        copy: jest.fn(),
    };
    return this;
});
