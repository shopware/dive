import {
    BufferAttribute,
    BufferGeometry,
    FileLoader,
    Loader,
    LoadingManager,
    Mesh,
} from 'three';
import { TSMaterial } from './TSMaterial.ts';

/**
 * Loads a COFF (Colored OFF) file with per-face RGBA colors.
 * Each face's color is duplicated per vertex.
 * Returns non-indexed geometry for use in Three.js.
 */
export class OFFLoader extends Loader {
    constructor(manager?: LoadingManager) {
        super(manager);
    }

    public load(
        url: string,
        onLoad: (mesh: Mesh) => void,
        onProgress?: (event: ProgressEvent) => void,
        onError?: (event: ErrorEvent) => void,
    ): void {
        const loader = new FileLoader(this.manager);
        loader.setPath(this.path);
        loader.setResponseType('text');
        loader.load(
            url,
            (text) => {
                try {
                    onLoad(this.parse(text as string));
                } catch (e) {
                    if (onError) {
                        onError(e as ErrorEvent);
                    } else {
                        console.error(e);
                    }
                    this.manager.itemError(url);
                }
            },
            onProgress,
            onError,
        );
    }

    public async loadAsync(
        url: string,
        onProgress?: (event: ProgressEvent) => void,
    ): Promise<Mesh> {
        const loader = new FileLoader(this.manager);
        loader.setPath(this.path);
        loader.setResponseType('text');

        const text = await loader.loadAsync(url, onProgress);

        return this.parse(text as string);
    }

    public parse(text: string): Mesh {
        const lines = text
            .trim()
            .split('\n')
            .filter((line) => line.length > 0 && !line.startsWith('#'));

        const header = lines[0].trim();
        if (header !== 'COFF') {
            throw new Error(
                `Unsupported file format: expected COFF but found "${header}"`,
            );
        }

        const [
            numVertices,
            numFaces,
        ] = lines[1].trim().split(/\s+/).map(Number);
        const vertexLines = lines.slice(2, 2 + numVertices);
        const faceLines = lines.slice(
            2 + numVertices,
            2 + numVertices + numFaces,
        );

        const vertexArray: [number, number, number][] = vertexLines.map(
            (line) => {
                const [
                    x,
                    y,
                    z,
                ] = line.trim().split(/\s+/).map(Number);
                return [
                    x,
                    y,
                    z,
                ];
            },
        );

        const positions: number[] = [];
        const colors: number[] = [];
        const barycentric: number[] = [];

        for (const line of faceLines) {
            const parts = line.trim().split(/\s+/);
            const faceVertexCount = parseInt(parts[0], 10);

            if (faceVertexCount !== 3) {
                throw new Error(
                    `Only triangles are supported. Found face with ${faceVertexCount} vertices.`,
                );
            }

            const [
                i1,
                i2,
                i3,
            ] = parts.slice(1, 4).map(Number);
            const [
                r,
                g,
                b,
                a,
            ] = parts.slice(4, 8).map((v) => parseInt(v, 10) / 255);

            for (const idx of [
                i1,
                i2,
                i3,
            ]) {
                const [
                    x,
                    y,
                    z,
                ] = vertexArray[idx];
                positions.push(x, y, z);
                colors.push(r, g, b, a);
            }

            barycentric.push(1, 0, 0, 0, 1, 0, 0, 0, 1);
        }

        console.log(`Loaded ${numVertices} vertices`);
        console.log(`Loaded ${numFaces} polygons`);

        const geometry = new BufferGeometry();
        geometry.setAttribute(
            'position',
            new BufferAttribute(new Float32Array(positions), 3),
        );
        geometry.setAttribute(
            'color',
            new BufferAttribute(new Float32Array(colors), 4),
        );
        geometry.setAttribute(
            'barycentric',
            new BufferAttribute(new Float32Array(barycentric), 3),
        );
        geometry.computeVertexNormals();

        const material = new TSMaterial({ near: 0.0, far: 0.0 });

        return new Mesh(geometry, material);
    }
}
