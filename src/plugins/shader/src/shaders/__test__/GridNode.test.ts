type MockTSLNode = {
    label: string;
    x: MockTSLNode;
    y: MockTSLNode;
    xz: MockTSLNode;
    div: ReturnType<typeof vi.fn>;
    sub: ReturnType<typeof vi.fn>;
    mul: ReturnType<typeof vi.fn>;
    length: ReturnType<typeof vi.fn>;
    lessThan: ReturnType<typeof vi.fn>;
    discard: ReturnType<typeof vi.fn>;
};

const mockState = vi.hoisted(() => {
    const describeNode = (value: unknown): string => {
        if (typeof value === 'number') return value.toString();
        return (value as { label?: string })?.label ?? 'unknown';
    };

    const createMockNode = (label: string, depth = 2): MockTSLNode => {
        const node = {
            label,
            x: null as unknown as MockTSLNode,
            y: null as unknown as MockTSLNode,
            xz: null as unknown as MockTSLNode,
            div: vi.fn((value: unknown) =>
                createMockNode(
                    `${label}.div(${describeNode(value)})`,
                    depth - 1,
                ),
            ),
            sub: vi.fn((value: unknown) =>
                createMockNode(
                    `${label}.sub(${describeNode(value)})`,
                    depth - 1,
                ),
            ),
            mul: vi.fn((value: unknown) =>
                createMockNode(
                    `${label}.mul(${describeNode(value)})`,
                    depth - 1,
                ),
            ),
            length: vi.fn(() => createMockNode(`${label}.length()`, depth - 1)),
            lessThan: vi.fn((value: unknown) =>
                createMockNode(
                    `${label}.lessThan(${describeNode(value)})`,
                    depth - 1,
                ),
            ),
            discard: vi.fn(),
        } as MockTSLNode;

        if (depth > 0) {
            node.x = createMockNode(`${label}.x`, depth - 1);
            node.y = createMockNode(`${label}.y`, depth - 1);
            node.xz = createMockNode(`${label}.xz`, depth - 1);
        } else {
            node.x = node;
            node.y = node;
            node.xz = node;
        }

        return node;
    };

    return {
        createMockNode,
        abs: vi.fn((value: unknown) =>
            createMockNode(`abs(${describeNode(value)})`),
        ),
        float: vi.fn((value: number) => createMockNode(`float(${value})`)),
        fract: vi.fn((value: unknown) =>
            createMockNode(`fract(${describeNode(value)})`),
        ),
        fwidth: vi.fn((value: unknown) =>
            createMockNode(`fwidth(${describeNode(value)})`),
        ),
        max: vi.fn((left: unknown, right: unknown) =>
            createMockNode(
                `max(${describeNode(left)}, ${describeNode(right)})`,
            ),
        ),
        min: vi.fn((left: unknown, right: unknown) =>
            createMockNode(
                `min(${describeNode(left)}, ${describeNode(right)})`,
            ),
        ),
        mix: vi.fn((colorA: unknown, colorB: unknown, factor: unknown) =>
            createMockNode(
                `mix(${describeNode(colorA)}, ${describeNode(colorB)}, ${describeNode(factor)})`,
            ),
        ),
        smoothstep: vi.fn((edge0: unknown, edge1: unknown, value: unknown) =>
            createMockNode(
                `smoothstep(${describeNode(edge0)}, ${describeNode(edge1)}, ${describeNode(value)})`,
            ),
        ),
        step: vi.fn((edge: unknown, value: unknown) =>
            createMockNode(
                `step(${describeNode(edge)}, ${describeNode(value)})`,
            ),
        ),
        vec4: vi.fn((color: unknown, alpha: unknown) =>
            createMockNode(
                `vec4(${describeNode(color)}, ${describeNode(alpha)})`,
            ),
        ),
        positionWorld: createMockNode('positionWorld'),
        cameraPosition: createMockNode('cameraPosition'),
    };
});

vi.mock('three/webgpu', () => {
    class MockNode {
        static instances: MockNode[] = [];
        name = '';

        constructor() {
            MockNode.instances.push(this);
        }
    }

    return {
        Node: MockNode,
    };
});

vi.mock('three/tsl', () => ({
    abs: mockState.abs,
    cameraPosition: mockState.cameraPosition,
    float: mockState.float,
    fract: mockState.fract,
    fwidth: mockState.fwidth,
    max: mockState.max,
    min: mockState.min,
    mix: mockState.mix,
    positionWorld: mockState.positionWorld,
    smoothstep: mockState.smoothstep,
    step: mockState.step,
    vec4: mockState.vec4,
}));

import { Node } from 'three/webgpu';
import { GridNode, type GridNodeUniforms } from '../GridNode.ts';

describe('shader/GridNode', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        (Node as any).instances = [];
    });

    it('should build a grid output node from the provided uniforms', () => {
        const rawUniforms = {
            uGridSize: mockState.createMockNode('uGridSize'),
            uMajorLineEvery: mockState.createMockNode('uMajorLineEvery'),
            uMinorLineColor: mockState.createMockNode('uMinorLineColor'),
            uMajorLineColor: mockState.createMockNode('uMajorLineColor'),
            uFadeDistance: mockState.createMockNode('uFadeDistance'),
        };
        const uniforms = rawUniforms as unknown as GridNodeUniforms;

        const result = new GridNode(uniforms);

        const gridNodeInstance = (Node as any).instances[0];
        const majorSize = rawUniforms.uGridSize.mul.mock.results[0].value;
        const minorAlpha =
            mockState.float.mock.results[0].value.sub.mock.results[0].value;
        const majorAlpha =
            mockState.float.mock.results[1].value.sub.mock.results[0].value;
        expect(gridNodeInstance.name).toBe('GridNode');

        expect(mockState.positionWorld.xz.div).toHaveBeenNthCalledWith(
            1,
            rawUniforms.uGridSize,
        );
        expect(rawUniforms.uGridSize.mul).toHaveBeenCalledWith(
            rawUniforms.uMajorLineEvery,
        );
        expect(mockState.positionWorld.xz.div).toHaveBeenNthCalledWith(
            2,
            majorSize,
        );
        expect(mockState.positionWorld.xz.sub).toHaveBeenCalledWith(
            mockState.cameraPosition.xz,
        );
        expect(rawUniforms.uFadeDistance.mul).toHaveBeenCalledWith(0.5);
        expect(mockState.smoothstep).toHaveBeenCalledWith(
            rawUniforms.uFadeDistance.mul.mock.results[0].value,
            rawUniforms.uFadeDistance,
            mockState.positionWorld.xz.sub.mock.results[0].value.length.mock
                .results[0].value,
        );

        const alpha =
            mockState.max.mock.results[0].value.mul.mock.results[0].value;
        const discardThreshold = mockState.float.mock.results.find(
            (_result, index) => mockState.float.mock.calls[index][0] === 0.001,
        )?.value;
        const discardCondition = alpha.lessThan.mock.results[0].value;

        expect(discardThreshold).toBeDefined();
        expect(alpha.lessThan).toHaveBeenCalledWith(discardThreshold);
        expect(discardCondition.discard).toHaveBeenCalled();
        expect(mockState.step).toHaveBeenCalledWith(minorAlpha, majorAlpha);
        expect(mockState.mix).toHaveBeenCalledWith(
            rawUniforms.uMinorLineColor,
            rawUniforms.uMajorLineColor,
            mockState.step.mock.results[0].value,
        );
        expect(mockState.vec4).toHaveBeenCalledWith(
            mockState.mix.mock.results[0].value,
            alpha,
        );
        expect(result).toBe(mockState.vec4.mock.results[0].value);
    });
});
