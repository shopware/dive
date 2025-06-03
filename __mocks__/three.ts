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

export const Vector2 = vi.fn(function (this: any) {
    this.copy = vi.fn();
    this.distanceTo = vi.fn();
    this.set = vi.fn();
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
    this.subVectors = vi.fn();
    return this;
});

export const Vector4 = vi.fn(function (this: any) {
    return this;
});

export const Object3D = vi.fn(function (this: any) {
    this.clear = vi.fn();
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
    this.position = new THREEVector3();
    this.rotation = new Euler();
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
    this.rotateX = vi.fn();
    this.clone = vi.fn(() => {
        return this;
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
    };
    this.rotateX = vi.fn();
    this.material = new MeshStandardMaterial();
    this.castShadow = true;
    this.receiveShadow = true;
    this.layers = {
        mask: 0,
    };
    this.updateWorldMatrix = vi.fn();
    this.traverse = vi.fn();
    this.removeFromParent = vi.fn();
    this.localToWorld = vi.fn((vec3: THREEVector3) => {
        return vec3;
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

export const MeshStandardMaterial = vi.fn(function (this: any) {
    this.color = new Color();
    this.roughness = 1;
    this.roughnessMap = undefined;
    this.metalness = 0;
    this.metalnessMap = undefined;
    return this;
});

export const Color = THREEColor;

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
    this.position = {
        set: vi.fn(),
    };
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
    this.position = {
        set: vi.fn(),
    };
    this.add = vi.fn();
    this.removeFromParent = vi.fn();
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
    return this;
});

export const SphereGeometry = vi.fn(function (this: any) {
    return this;
});

export const MeshBasicMaterial = vi.fn(function (this: any) {
    this.opacity = 1.0;
    this.color = new Color();
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
    return this;
});

export const BoxGeometry = vi.fn(function (this: any) {
    this.translate = vi.fn();
    return this;
});

export const ConeGeometry = vi.fn(function (this: any) {
    this.rotateY = vi.fn();
    this.translate = vi.fn();
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
