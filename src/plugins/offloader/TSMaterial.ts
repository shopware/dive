import { ShaderMaterial, DoubleSide } from 'three';

const vertexShader = `
    attribute vec3 barycentric;

    varying vec3 vBarycentric;
    varying vec4 vColor;

    void main() {
        vBarycentric = barycentric;
        vColor = color;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
`;

const fragmentShader = `
    uniform float near;
    uniform float far;

    varying vec3 vBarycentric;
    varying vec4 vColor;

    void main() {
        float edgeFactor = min(min(vBarycentric.x, vBarycentric.y), vBarycentric.z);

        // Invert the alpha calculation and use the new uniforms
        float alpha = smoothstep(near, far, edgeFactor);

        // Discard fragments that are fully transparent
        if (alpha < 0.01) {
            discard;
        }

        gl_FragColor = vec4(vColor.rgb, vColor.a * alpha);
    }
`;

export class TSMaterial extends ShaderMaterial {
    constructor(parameters?: { near?: number; far?: number }) {
        super({
            vertexShader,
            fragmentShader,
            side: DoubleSide,
            vertexColors: true,
            depthWrite: true,
            alphaToCoverage: true,
            uniforms: {
                near: { value: parameters?.near ?? 0.0 },
                far: { value: parameters?.far ?? 0.0 },
            },
        });
    }
}
