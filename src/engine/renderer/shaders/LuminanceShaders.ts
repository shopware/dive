export const LuminanceShader = {
    vertexShader: `
        varying vec2 vUv;

        void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
    `,
    fragmentShader: `
        uniform sampler2D tDiffuse;
        varying vec2 vUv;

        void main() {
            vec4 texel = texture2D(tDiffuse, vUv);
            float l = dot(texel.rgb, vec3(0.2126, 0.7152, 0.0722));
            gl_FragColor = vec4(l, 0.0, 0.0, 1.0);
        }
    `,
};

export const DownsampleShader = {
    vertexShader: `
        varying vec2 vUv;

        void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
    `,
    fragmentShader: `
        uniform sampler2D tDiffuse;
        uniform vec2 texelSize;
        varying vec2 vUv;

        void main() {
            vec4 sum = vec4(0.0);
            sum += texture2D(tDiffuse, vUv + vec2(-texelSize.x, -texelSize.y));
            sum += texture2D(tDiffuse, vUv + vec2(texelSize.x, -texelSize.y));
            sum += texture2D(tDiffuse, vUv + vec2(-texelSize.x, texelSize.y));
            sum += texture2D(tDiffuse, vUv + vec2(texelSize.x, texelSize.y));
            gl_FragColor = sum / 4.0;
        }
    `,
};
