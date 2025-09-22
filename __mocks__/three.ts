/**
 * By having this file in the __mocks__ folder, Jest will use this file instead of the actual three.js library.
 */

import {
    Vector3 as THREEVector3,
    type Object3D as THREEObject3D,
    // Box3,
    // MeshStandardMaterial as THREEMeshStandardMaterial,
    Color as THREEColor,
    MathUtils as THREEMathUtils,
} from 'three';

export const Vector2 = vi.fn(function (this: any, x = 0, y = 0) {
    this.x = x;
    this.y = y;
    this.copy = vi.fn((v) => {
        this.x = v.x;
        this.y = v.y;
        return this;
    });
    this.distanceTo = vi.fn(() => 0);
    this.set = vi.fn((x, y) => {
        this.x = x;
        this.y = y;
        return this;
    });
    this.subVectors = vi.fn((a, b) => {
        this.x = a.x - b.x;
        this.y = a.y - b.y;
        return this;
    });
    this.multiplyScalar = vi.fn((s) => {
        this.x *= s;
        this.y *= s;
        return this;
    });
    return this;
});

export const Vector3 = vi.fn(function (
    this: any,
    x: number = 0,
    y: number = 0,
    z: number = 0,
) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.copy = vi.fn((vec3: THREEVector3) => {
        this.x = vec3.x;
        this.y = vec3.y;
        this.z = vec3.z;
        return this;
    });
    this.set = vi.fn((x: number, y: number, z: number) => {
        this.x = x;
        this.y = y;
        this.z = z;
        return this;
    });
    this.multiply = vi.fn((vec3: THREEVector3) => {
        this.x *= vec3.x;
        this.y *= vec3.y;
        this.z *= vec3.z;
        return this;
    });
    this.clone = vi.fn(() => {
        return new Vector3(this.x, this.y, this.z);
    });
    this.cross = THREEVector3.prototype.cross;
    this.dot = THREEVector3.prototype.dot;
    this.applyQuaternion = vi.fn(() => {
        return this;
    });
    this.crossVectors = THREEVector3.prototype.crossVectors;
    this.setY = vi.fn((y: number) => {
        this.y = y;
        return this;
    });
    this.add = vi.fn((vec3: THREEVector3) => {
        this.x += vec3.x;
        this.y += vec3.y;
        this.z += vec3.z;
        return this;
    });
    this.sub = vi.fn((vec3: THREEVector3) => {
        this.x -= vec3.x;
        this.y -= vec3.y;
        this.z -= vec3.z;
        return this;
    });
    this.projectOnVector = vi.fn((_vec3: THREEVector3) => {
        return this;
    });
    this.subVectors = vi.fn((a, b) => {
        this.x = a.x - b.x;
        this.y = a.y - b.y;
        this.z = a.z - b.z;
        return this;
    });
    this.normalize = vi.fn(() => this);
    this.distanceTo = vi.fn(() => 0);
    this.distanceToSquared = vi.fn(() => 0);
    this.length = vi.fn(() => 0);
    this.multiplyScalar = vi.fn(() => this);
    this.addScaledVector = vi.fn(() => this);
    this.setFromSpherical = vi.fn(() => this);
    this.setFromMatrixColumn = vi.fn(() => this);
    return this;
});

export const Vector4 = vi.fn(function (this: any) {
    return this;
});

export const Quaternion = vi.fn(function (this: any) {
    this.x = 0;
    this.y = 0;
    this.z = 0;
    this.w = 1;
    this.set = vi.fn();
    this.multiplyQuaternions = vi.fn();
    this.multiplyScalar = vi.fn();
    this.setFromEuler = vi.fn();
    this.setFromAxisAngle = vi.fn();
    this.setFromUnitVectors = vi.fn(() => {
        return this;
    });
    this.setFromRotationMatrix = vi.fn();
    this.invert = vi.fn(() => {
        return this;
    });
    this.clone = vi.fn(() => {
        const newQuat = new Quaternion();
        newQuat.x = this.x;
        newQuat.y = this.y;
        newQuat.z = this.z;
        newQuat.w = this.w;
        return newQuat;
    });
    this.dot = vi.fn(() => 0);
    this.copy = vi.fn((q) => {
        this.x = q.x;
        this.y = q.y;
        this.z = q.z;
        this.w = q.w;
        return this;
    });
    return this;
});

export const Object3D = vi.fn(function (this: any) {
    this.clear = vi.fn();
    this.color = {};
    this.intensity = 0;
    this.layers = {
        mask: 0,
    };
    this.lookAt = vi.fn();
    this.shadow = {
        radius: 0,
        mapSize: { width: 0, height: 0 },
        bias: 0,
        camera: {
            near: 0,
            far: 0,
            fov: 0,
        },
    };
    this.add = vi.fn((obj: THREEObject3D) => {
        this.children.push(obj);
        return this;
    });
    this.attach = vi.fn((obj: THREEObject3D) => {
        this.children.push(obj);
        return this;
    });
    this.remove = vi.fn((obj: THREEObject3D) => {
        const index = this.children.indexOf(obj);
        if (index !== -1) {
            this.children.splice(index, 1);
        }
        return this;
    });
    this.sub = vi.fn();
    this.children = [];
    this.userData = {};
    this.position = new Vector3();
    this.rotation = new Euler();
    this.quaternion = new Quaternion();
    this.up = new Vector3(0, 1, 0);
    this.scale = {
        x: 1,
        y: 1,
        z: 1,
        set: vi.fn(),
    };
    this.localToWorld = vi.fn((vec3: THREEVector3) => {
        return vec3;
    });
    this.traverse = vi.fn((callback) => {
        callback(this);
        this.children.forEach((child: THREEObject3D) => {
            callback(child);
        });
    });
    this.getWorldPosition = vi.fn(() => {
        return this.position.clone();
    });
    this.translateX = vi.fn();
    this.translateY = vi.fn();
    this.translateZ = vi.fn();
    this.rotateX = vi.fn();
    this.rotateY = vi.fn();
    this.rotateZ = vi.fn();

    // Mock getter properties for handles
    Object.defineProperty(this, 'forwardVector', {
        get: vi.fn(() => {
            // Simulate the actual calculation based on axis
            if (this.axis === 'x') return new THREEVector3(1, 0, 0);
            if (this.axis === 'y') return new THREEVector3(0, 1, 0);
            return new THREEVector3(0, 0, 1);
        }),
        configurable: true,
    });
    Object.defineProperty(this, 'rightVector', {
        get: vi.fn(() => {
            if (this.axis === 'x') return new THREEVector3(0, 1, 0);
            if (this.axis === 'y') return new THREEVector3(0, 0, 1);
            return new THREEVector3(1, 0, 0);
        }),
        configurable: true,
    });
    Object.defineProperty(this, 'upVector', {
        get: vi.fn(() => {
            if (this.axis === 'x') return new THREEVector3(0, 0, 1);
            if (this.axis === 'y') return new THREEVector3(1, 0, 0);
            return new THREEVector3(0, 1, 0);
        }),
        configurable: true,
    });

    this.clone = vi.fn(() => {
        // Create a new Object3D instance with the same properties
        const cloned = new Object3D();
        // Copy over key properties that tests might check
        if (this.position) {
            cloned.position = {
                ...this.position,
                equals: vi.fn((_other) => true), // Mock equals to return true for tests
            };
        }
        if (this.rotation) {
            cloned.rotation = {
                ...this.rotation,
                equals: vi.fn((_other) => true),
            };
        }
        if (this.scale) {
            cloned.scale = {
                ...this.scale,
                equals: vi.fn((_other) => true),
            };
        }
        return cloned;
    });
    this.isObject3D = true;
    this.name = '';
    this.parent = null;
    this.dispatchEvent = vi.fn();
    this.updateMatrixWorld = vi.fn();
    this.applyMatrix4 = vi.fn();
    this.updateWorldMatrix = vi.fn();
    return this;
});

export const Group = vi.fn(function (this: any) {
    this.isGroup = true;
    return this;
});

export const Scene = vi.fn(function (this: any) {
    this.add = vi.fn((obj: THREEObject3D) => {
        this.children.push(obj);
        return this;
    });
    this.remove = vi.fn((obj: THREEObject3D) => {
        const index = this.children.indexOf(obj);
        if (index !== -1) {
            this.children.splice(index, 1);
        }
        return this;
    });
    this.children = [];
    this.background = new Color();
    return this;
});

export const Mesh = vi.fn(function (this: any) {
    this.isMesh = true;
    this.geometry = {
        computeBoundingBox: vi.fn(),
        boundingBox: new Box3(),
        clone: vi.fn(() => this.geometry),
        applyMatrix4: vi.fn(),
        applyQuaternion: vi.fn(),
    };
    this.rotateX = vi.fn();
    this.rotateY = vi.fn();
    this.rotateZ = vi.fn();
    this.material = new MeshStandardMaterial();
    this.castShadow = true;
    this.receiveShadow = true;
    this.layers = {
        mask: 0,
    };
    this.position = new Vector3();
    this.rotation = new Euler();
    this.scale = new Vector3();
    this.translateY = vi.fn();
    this.updateWorldMatrix = vi.fn();
    this.traverse = vi.fn();
    this.removeFromParent = vi.fn();
    this.getWorldQuaternion = vi.fn(() => {
        return new Quaternion();
    });
    this.localToWorld = vi.fn((vec3: THREEVector3) => {
        return vec3;
    });
    this.visible = false;
    this.children = [];
    this.add = vi.fn((child: any) => {
        this.children.push(child);
        return this;
    });
    return this;
});

export const Box3 = vi.fn(function (this: any) {
    this.min = new THREEVector3(Infinity, Infinity, Infinity);
    this.max = new THREEVector3(-Infinity, -Infinity, -Infinity);
    this.getCenter = vi.fn(() => {
        return new THREEVector3(0, 0, 0);
    });
    this.expandByObject = vi.fn();
    this.makeEmpty = vi.fn();
    this.getSize = vi.fn(() => new Vector3());
    this.setFromObject = vi.fn();
    this.getBoundingSphere = vi.fn((target: any) => {
        if (target) {
            target.center = new THREEVector3(0, 0, 0);
            target.radius = 1;
        }
        return target;
    });
    this.union = vi.fn();
    return this;
});

export const RaycasterIntersectObjectMock = vi.fn();
export const Raycaster = vi.fn(function (this: any) {
    this.intersectObjects = RaycasterIntersectObjectMock;
    this.layers = {
        mask: 0,
    };
    this.setFromCamera = vi.fn();
    return this;
});

export const MeshStandardMaterial = vi.fn(function (
    this: any,
    parameters: any = {},
) {
    let colorInstance = new Color();
    if (parameters.color !== undefined) {
        colorInstance.set(parameters.color);
    }
    let colorProxy = new Proxy(colorInstance, {
        set(target, prop, value) {
            if (
                prop === 'set' &&
                (typeof value === 'number' || typeof value === 'string')
            ) {
                target.set(value);
                return true;
            }
            target[prop] = value;
            return true;
        },
    });
    Object.defineProperty(this, 'color', {
        get() {
            return colorProxy;
        },
        set(value) {
            if (typeof value === 'number' || typeof value === 'string') {
                colorProxy.set(value);
            } else if (value && typeof value.getHex === 'function') {
                colorProxy = value;
            }
        },
        configurable: true,
        enumerable: true,
    });
    this.roughness = 1;
    this.roughnessMap = undefined;
    this.metalness = 0;
    this.metalnessMap = undefined;
    return this;
});

export const Color = vi.fn(function (this: any, color?: any) {
    let r = 0,
        g = 0,
        b = 0;
    const self = this;
    Object.defineProperty(this, 'r', {
        get() {
            return r;
        },
        set(val) {
            r = val;
        },
        configurable: true,
        enumerable: true,
    });
    Object.defineProperty(this, 'g', {
        get() {
            return g;
        },
        set(val) {
            g = val;
        },
        configurable: true,
        enumerable: true,
    });
    Object.defineProperty(this, 'b', {
        get() {
            return b;
        },
        set(val) {
            b = val;
        },
        configurable: true,
        enumerable: true,
    });
    this.clone = vi.fn(() => {
        const cloned = new (Color as any)();
        cloned.r = self.r;
        cloned.g = self.g;
        cloned.b = self.b;
        return cloned;
    });
    this.set = vi.fn((colorValue: any) => {
        if (typeof colorValue === 'number') {
            r = ((colorValue >> 16) & 255) / 255;
            g = ((colorValue >> 8) & 255) / 255;
            b = (colorValue & 255) / 255;
        } else if (typeof colorValue === 'string') {
            const hex = colorValue.replace('#', '');
            r = parseInt(hex.substr(0, 2), 16) / 255;
            g = parseInt(hex.substr(2, 2), 16) / 255;
            b = parseInt(hex.substr(4, 2), 16) / 255;
        } else if (
            colorValue &&
            typeof colorValue.r === 'number' &&
            typeof colorValue.g === 'number' &&
            typeof colorValue.b === 'number'
        ) {
            r = colorValue.r;
            g = colorValue.g;
            b = colorValue.b;
        }
        return self;
    });
    this.copy = vi.fn((colorValue: any) => {
        r = colorValue.r;
        g = colorValue.g;
        b = colorValue.b;
        return self;
    });
    this.multiplyScalar = vi.fn((scalar: number) => {
        r *= scalar;
        g *= scalar;
        b *= scalar;
        return self;
    });
    this.getHex = vi.fn(() => {
        const rr = Math.round(r * 255);
        const gg = Math.round(g * 255);
        const bb = Math.round(b * 255);
        return (rr << 16) | (gg << 8) | bb;
    });
    this.getHexString = vi.fn(() => {
        const rr = Math.round(r * 255);
        const gg = Math.round(g * 255);
        const bb = Math.round(b * 255);
        return (
            rr.toString(16).padStart(2, '0') +
            gg.toString(16).padStart(2, '0') +
            bb.toString(16).padStart(2, '0')
        );
    });
    if (color !== undefined) {
        this.set(color);
    }
    // Custom setter for the instance itself
    return new Proxy(this, {
        set(target, prop, value) {
            if (
                prop === 'set' &&
                (typeof value === 'number' || typeof value === 'string')
            ) {
                self.set(value);
                return true;
            }
            target[prop] = value;
            return true;
        },
    });
});

export const WebGLRendererRenderMock = vi.fn();
export const WebGLRendererSetSizeMock = vi.fn();
export const WebGLRenderer = vi.fn(function (this: any) {
    this.domElement = {
        clientWidth: 800,
        clientHeight: 600,
        style: {
            position: 'absolute',
        },
    };
    this.domElement.parentElement = this.domElement;
    this.debug = {
        checkShaderErrors: true,
    };
    this.setSize = WebGLRendererSetSizeMock;
    this.setPixelRatio = vi.fn();
    this.render = WebGLRendererRenderMock;
    this.setAnimationLoop = vi.fn();
    this.shadowMap = {
        enabled: false,
    };
    this.dispose = vi.fn();
    return this;
});

export const MathUtils = {
    ...THREEMathUtils,
    generateUUID: (): string => {
        return 'test_uuid';
    },
    degToRad: vi.fn(),
    radToDeg: vi.fn(),
};

export const Euler = vi.fn(function (this: any) {
    this.set = vi.fn();
    this.copy = vi.fn();
    return this;
});

export const Matrix4 = vi.fn(function (this: any) {
    this.extractRotation = vi.fn(() => {
        return this;
    });
    this.invert = vi.fn(() => {
        return this;
    });
    // prettier-multiline-arrays-next-line-pattern: 4
    this.elements = [
        1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 1, 0,
        0, 0, 0, 1,
    ];
    return this;
});

export const PerspectiveCamera = vi.fn(function (
    this: any,
    fov?: number,
    aspect?: number,
    near?: number,
    far?: number,
) {
    this.isObject3D = true;
    this.parent = null;
    this.dispatchEvent = vi.fn();
    this.layers = {
        mask: 0,
    };
    this.position = new Vector3();
    this.quaternion = new Quaternion();
    this.up = new Vector3(0, 1, 0);
    this.zoom = 1;
    this.add = vi.fn();
    this.updateProjectionMatrix = vi.fn();
    this.aspect = aspect;
    this.fov = fov;
    this.near = near;
    this.far = far;
    return this;
});

export const OrthographicCamera = vi.fn(function (this: any) {
    this.isObject3D = true;
    this.parent = null;
    this.dispatchEvent = vi.fn();
    this.layers = {
        mask: 0,
    };
    this.position = new Vector3();
    this.quaternion = new Quaternion();
    this.up = new Vector3(0, 1, 0);
    this.zoom = 1;
    this.add = vi.fn();
    this.removeFromParent = vi.fn();
    this.updateProjectionMatrix = vi.fn();
    this.right = 1;
    this.left = -1;
    this.top = 1;
    this.bottom = -1;
    return this;
});

export const AxesHelper = vi.fn(function (this: any) {
    this.isObject3D = true;
    this.parent = null;
    this.dispatchEvent = vi.fn();
    this.layers = {
        mask: 0,
    };
    this.position = {
        set: vi.fn(),
    };
    this.add = vi.fn((obj: THREEObject3D) => {
        this.children.push(obj);
        return this;
    });
    this.children = [];
    this.removeFromParent = vi.fn();
    this.material = {
        depthTest: false,
    };
    this.setColors = vi.fn();
    this.rotation = {
        setFromRotationMatrix: vi.fn(),
    };
    return this;
});

export const AmbientLight = vi.fn(function (this: any) {
    this.color = {};
    this.intensity = 0;
    this.layers = {
        mask: 0,
    };
    this.removeFromParent = vi.fn();
    return this;
});

export const PointLight = vi.fn(function (this: any) {
    this.visible = true;
    this.color = {};
    this.intensity = 0;
    this.layers = {
        mask: 0,
    };
    this.shadow = {
        radius: 0,
        mapSize: { width: 0, height: 0 },
        bias: 0,
        camera: {
            near: 0,
            far: 0,
            fov: 0,
        },
    };
    this.add = vi.fn();
    this.children = [
        {
            material: {
                color: {},
            },
        },
    ];
    return this;
});

export const PlaneGeometry = vi.fn(function (this: any) {
    this.scale = vi.fn();
    this.rotateX = vi.fn();
    this.computeVertexNormals = vi.fn();
    this.computeBoundingBox = vi.fn();
    this.computeBoundingSphere = vi.fn();
    return this;
});

export const SphereGeometry = vi.fn(function (this: any) {
    this.translate = vi.fn();
    this.computeVertexNormals = vi.fn();
    this.computeBoundingBox = vi.fn();
    this.computeBoundingSphere = vi.fn();
    return this;
});

export const TorusGeometry = vi.fn(function (this: any) {
    this.computeVertexNormals = vi.fn();
    this.computeBoundingBox = vi.fn();
    this.computeBoundingSphere = vi.fn();
    return this;
});

export const MeshBasicMaterial = vi.fn(function (
    this: any,
    parameters: any = {},
) {
    this.opacity = 1.0;
    this.color = new Color();
    if (parameters.color !== undefined) {
        this.color.set(parameters.color);
    }
    this.wireframe = parameters.wireframe || false;
    this.clone = vi.fn(() => this);
    return this;
});

export const HemisphereLight = vi.fn(function (this: any) {
    this.visible = true;
    this.layers = {
        mask: 0,
    };
    this.position = {
        set: vi.fn(),
    };
    this.removeFromParent = vi.fn();
    return this;
});

export const DirectionalLight = vi.fn(function (this: any) {
    this.visible = true;
    this.layers = {
        mask: 0,
    };
    this.position = {
        set: vi.fn(),
        multiplyScalar: vi.fn(),
    };
    this.shadow = {
        radius: 0,
        mapSize: { width: 0, height: 0 },
        bias: 0,
        camera: {
            near: 0,
            far: 0,
            fov: 0,
        },
    };
    this.removeFromParent = vi.fn();
    return this;
});

export const BufferGeometry = vi.fn(function (this: any) {
    this.setAttribute = vi.fn();
    this.setIndex = vi.fn();
    this.translate = vi.fn();
    this.computeVertexNormals = vi.fn();
    this.computeBoundingBox = vi.fn();
    this.computeBoundingSphere = vi.fn();
    this.setFromPoints = vi.fn();
    return this;
});

export const BufferAttribute = vi.fn(function (this: any) {
    return this;
});

export const CylinderGeometry = vi.fn(function (this: any) {
    this.translate = vi.fn();
    this.computeVertexNormals = vi.fn();
    this.computeBoundingBox = vi.fn();
    this.computeBoundingSphere = vi.fn();
    return this;
});

export const BoxGeometry = vi.fn(function (this: any) {
    this.translate = vi.fn();
    this.computeVertexNormals = vi.fn();
    this.computeBoundingBox = vi.fn();
    this.computeBoundingSphere = vi.fn();
    return this;
});

export const ConeGeometry = vi.fn(function (this: any) {
    this.rotateY = vi.fn();
    this.translate = vi.fn();
    this.computeVertexNormals = vi.fn();
    this.computeBoundingBox = vi.fn();
    this.computeBoundingSphere = vi.fn();
    return this;
});

export const Float32BufferAttribute = vi.fn(function (this: any) {
    return this;
});

export const Uint32BufferAttribute = vi.fn(function (this: any) {
    return this;
});

export const GridHelper = vi.fn(function (this: any) {
    const obj = new Object3D();
    obj.material = new MeshStandardMaterial();
    return obj;
});

export const LineDashedMaterial = vi.fn(function (this: any) {
    return new MeshStandardMaterial();
});

export const Line = vi.fn(function (this: any) {
    this.geometry = new BufferGeometry();
    this.computeLineDistances = vi.fn();
    return this;
});

export const Sphere = vi.fn(function (this: any) {
    this.radius = 1;
    return this;
});

export const EventDispatcher = vi.fn(function (this: any) {
    this.dispatchEvent = vi.fn();
    return this;
});

export const Vector3Like = vi.fn(function (this: any) {
    this.x = 0;
    this.y = 0;
    this.z = 0;
    return this;
});

export const Box3Helper = vi.fn(function (this: any) {
    this.isObject3D = true;
    this.parent = null;
    this.dispatchEvent = vi.fn();
    this.layers = {
        mask: 0,
    };
    this.visible = false;
    this.children = [];
    this.add = vi.fn((child: any) => {
        this.children.push(child);
        return this;
    });
    this.removeFromParent = vi.fn();
    return this;
});

export enum MOUSE {
    LEFT = 0,
    MIDDLE = 1,
    RIGHT = 2,
    ROTATE = 0,
    DOLLY = 1,
    PAN = 2,
}

export enum TOUCH {
    ROTATE = 0,
    PAN = 1,
    DOLLY_PAN = 2,
    DOLLY_ROTATE = 3,
}

export const Spherical = vi.fn(function (this: any) {
    this.radius = 1;
    this.phi = 0;
    this.theta = 0;
    this.setFromVector3 = vi.fn(() => this);
    this.makeSafe = vi.fn(() => this);
    this.set = vi.fn(() => this);
    this.copy = vi.fn(() => this);
    return this;
});
