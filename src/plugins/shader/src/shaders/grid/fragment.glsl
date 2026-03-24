uniform float uGridSize;
uniform float uMajorLineEvery;
uniform vec3 uMinorLineColor;
uniform vec3 uMajorLineColor;
uniform float uFadeDistance;

varying vec3 vWorldPosition;

void main() {
    vec2 coord = vWorldPosition.xz;

    // Minor grid
    vec2 minorCoord = coord / uGridSize;
    vec2 minorGrid = abs(fract(minorCoord - 0.5) - 0.5) / fwidth(minorCoord);
    float lineMinor = min(minorGrid.x, minorGrid.y);

    // Major grid
    float majorSize = uGridSize * uMajorLineEvery;
    vec2 majorCoord = coord / majorSize;
    vec2 majorGrid = abs(fract(majorCoord - 0.5) - 0.5) / fwidth(majorCoord);
    float lineMajor = min(majorGrid.x, majorGrid.y);

    // Line alpha: minor = 1px, major = 2px wide
    float minorAlpha = 1.0 - min(lineMinor, 1.0);
    float majorAlpha = 1.0 - min(lineMajor / 2.0, 1.0);

    float alpha = max(minorAlpha, majorAlpha);
    vec3 color = mix(uMinorLineColor, uMajorLineColor, step(minorAlpha, majorAlpha));

    // Radial fade from camera
    float dist = length(vWorldPosition.xz - cameraPosition.xz);
    alpha *= 1.0 - smoothstep(uFadeDistance * 0.5, uFadeDistance, dist);

    if (alpha < 0.001) discard;

    gl_FragColor = vec4(color, alpha);
}