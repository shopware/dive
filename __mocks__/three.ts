import {
    Vector3 as THREEVector3,
    type Object3D as THREEObject3D,
    // Box3,
    // MeshStandardMaterial as THREEMeshStandardMaterial,
    // Color as THREEColor,
    MathUtils as THREEMathUtils,
} from 'three';

export const Vector2 = jest.fn(function () {
    this.copy = jest.fn();
    this.distanceTo = jest.fn();
    this.set = jest.fn();
    return this;
});

export const Vector3 = jest.fn(function (
    x: number = 0,
    y: number = 0,
    z: number = 0,
) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.copy = jest.fn((vec3: THREEVector3) => {
        this.x = vec3.x;
        this.y = vec3.y;
        this.z = vec3.z;
        return this;
    });
    this.set = jest.fn((x: number, y: number, z: number) => {
        this.x = x;
        this.y = y;
        this.z = z;
        return this;
    });
    this.multiply = jest.fn((vec3: THREEVector3) => {
        this.x *= vec3.x;
        this.y *= vec3.y;
        this.z *= vec3.z;
        return this;
    });
    this.clone = jest.fn(() => {
        return new Vector3(this.x, this.y, this.z);
    });
    this.cross = THREEVector3.prototype.cross;
    this.dot = THREEVector3.prototype.dot;
    this.crossVectors = THREEVector3.prototype.crossVectors;
    this.setY = jest.fn((y: number) => {
        this.y = y;
        return this;
    });
    this.add = jest.fn((vec3: THREEVector3) => {
        this.x += vec3.x;
        this.y += vec3.y;
        this.z += vec3.z;
        return this;
    });
    this.sub = jest.fn((vec3: THREEVector3) => {
        this.x -= vec3.x;
        this.y -= vec3.y;
        this.z -= vec3.z;
        return this;
    });
    this.subVectors = jest.fn();
    return this;
});

export const Vector4 = jest.fn(function () {
    return this;
});

export const Object3D = jest.fn(function () {
    this.clear = jest.fn();
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
    this.add = jest.fn((obj: THREEObject3D) => {
        this.children.push(obj);
        return this;
    });
    // this.attach = jest.fn();
    this.remove = jest.fn((obj: THREEObject3D) => {
        const index = this.children.indexOf(obj);
        if (index !== -1) {
            this.children.splice(index, 1);
        }
        return this;
    });
    this.sub = jest.fn();
    this.children = [];
    this.userData = {};
    this.position = new THREEVector3();
    this.rotation = new Euler();
    this.scale = {
        x: 1,
        y: 1,
        z: 1,
        set: jest.fn(),
    };
    this.localToWorld = jest.fn((vec3: THREEVector3) => {
        return vec3;
    });
    this.traverse = jest.fn((callback) => {
        callback(this);
        this.children.forEach((child: THREEObject3D) => {
            callback(child);
        });
    });
    this.getWorldPosition = jest.fn(() => {
        return this.position.clone();
    });
    this.rotateX = jest.fn();
    return this;
});

export const Scene = jest.fn(function () {
    this.add = jest.fn();
    this.background = new Color();
    return this;
});

export const Mesh = jest.fn(function () {
    this.isMesh = true;
    this.geometry = {
        computeBoundingBox: jest.fn(),
        boundingBox: new Box3(),
    };
    this.rotateX = jest.fn();
    this.material = new MeshStandardMaterial();
    this.castShadow = true;
    this.receiveShadow = true;
    this.layers = {
        mask: 0,
    };
    this.updateWorldMatrix = jest.fn();
    this.traverse = jest.fn();
    this.removeFromParent = jest.fn();
    this.localToWorld = jest.fn((vec3: THREEVector3) => {
        return vec3;
    });
    return this;
});

export const Box3 = jest.fn(function () {
    this.min = new THREEVector3(Infinity, Infinity, Infinity);
    this.max = new THREEVector3(-Infinity, -Infinity, -Infinity);
    this.getCenter = jest.fn(() => {
        return new THREEVector3(0, 0, 0);
    });
    this.expandByObject = jest.fn();
    this.makeEmpty = jest.fn();
    this.getSize = jest.fn(() => new Vector3());
    this.setFromObject = jest.fn();
    return this;
});

export const RaycasterIntersectObjectMock = jest.fn();
export const Raycaster = jest.fn(function () {
    this.intersectObjects = RaycasterIntersectObjectMock;
    this.layers = {
        mask: 0,
    };
    this.setFromCamera = jest.fn();
    return this;
});

export const MeshStandardMaterial = jest.fn(function () {
    this.color = new Color();
    this.roughness = 1;
    this.roughnessMap = undefined;
    this.metalness = 0;
    this.metalnessMap = undefined;
    return this;
});

export const Color = jest.fn(function () {
    this.set = jest.fn();
    this.getHex = jest.fn();
    return this;
});

export const WebGLRendererRenderMock = jest.fn();
export const WebGLRendererSetSizeMock = jest.fn();
export const WebGLRenderer = jest.fn(function () {
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
    this.setPixelRatio = jest.fn();
    this.render = WebGLRendererRenderMock;
    this.setAnimationLoop = jest.fn();
    this.shadowMap = {
        enabled: false,
    };
    this.dispose = jest.fn();
    return this;
});

export const MathUtils = {
    ...THREEMathUtils,
    generateUUID: (): string => {
        return 'test_uuid';
    },
    degToRad: jest.fn(),
    radToDeg: jest.fn(),
};

export const Euler = jest.fn(function () {
    this.set = jest.fn();
    return this;
});

export const Matrix4 = jest.fn(function () {
    this.extractRotation = jest.fn(() => {
        return this;
    });
    this.invert = jest.fn(() => {
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

export const PerspectiveCamera = jest.fn(function () {
    this.isObject3D = true;
    this.parent = null;
    this.dispatchEvent = jest.fn();
    this.layers = {
        mask: 0,
    };
    this.position = {
        set: jest.fn(),
    };
    this.add = jest.fn();
    this.updateProjectionMatrix = jest.fn();
    return this;
});

export const OrthographicCamera = jest.fn(function () {
    this.isObject3D = true;
    this.parent = null;
    this.dispatchEvent = jest.fn();
    this.layers = {
        mask: 0,
    };
    this.position = {
        set: jest.fn(),
    };
    this.add = jest.fn();
    return this;
});

export const AxesHelper = jest.fn(function () {
    this.isObject3D = true;
    this.parent = null;
    this.dispatchEvent = jest.fn();
    this.layers = {
        mask: 0,
    };
    this.position = {
        set: jest.fn(),
    };
    this.add = jest.fn();
    this.material = {
        depthTest: false,
    };
    this.setColors = jest.fn();
    this.rotation = {
        setFromRotationMatrix: jest.fn(),
    };
    return this;
});

export const AmbientLight = jest.fn(function () {
    this.color = {};
    this.intensity = 0;
    this.layers = {
        mask: 0,
    };
    this.removeFromParent = jest.fn();
    return this;
});

export const PointLight = jest.fn(function () {
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
    this.add = jest.fn();
    this.children = [
        {
            material: {
                color: {},
            },
        },
    ];
    return this;
});

export const PlaneGeometry = jest.fn(function () {
    return this;
});

export const SphereGeometry = jest.fn(function () {
    return this;
});

export const MeshBasicMaterial = jest.fn(function () {
    this.opacity = 1.0;
    this.color = new Color();
    return this;
});

export const HemisphereLight = jest.fn(function () {
    this.visible = true;
    this.layers = {
        mask: 0,
    };
    this.position = {
        set: jest.fn(),
    };
    this.removeFromParent = jest.fn();
    return this;
});

export const DirectionalLight = jest.fn(function () {
    this.visible = true;
    this.layers = {
        mask: 0,
    };
    this.position = {
        set: jest.fn(),
        multiplyScalar: jest.fn(),
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
    this.removeFromParent = jest.fn();
    return this;
});

export const BufferGeometry = jest.fn(function () {
    this.setAttribute = jest.fn();
    this.setIndex = jest.fn();
    this.translate = jest.fn();
    this.computeVertexNormals = jest.fn();
    this.computeBoundingBox = jest.fn();
    this.computeBoundingSphere = jest.fn();
    this.setFromPoints = jest.fn();
    return this;
});

export const BufferAttribute = jest.fn(function () {
    return this;
});

export const CylinderGeometry = jest.fn(function () {
    this.translate = jest.fn();
    return this;
});

export const BoxGeometry = jest.fn(function () {
    this.translate = jest.fn();
    return this;
});

export const ConeGeometry = jest.fn(function () {
    this.rotateY = jest.fn();
    this.translate = jest.fn();
    return this;
});

export const Float32BufferAttribute = jest.fn(function () {
    return this;
});

export const Uint32BufferAttribute = jest.fn(function () {
    return this;
});

export const GridHelper = jest.fn(function () {
    const obj = new Object3D();
    obj.material = new MeshStandardMaterial();
    return obj;
});

export const LineDashedMaterial = jest.fn(function () {
    return new MeshStandardMaterial();
});

export const Line = jest.fn(function () {
    this.geometry = new BufferGeometry();
    this.computeLineDistances = jest.fn();
    return this;
});
