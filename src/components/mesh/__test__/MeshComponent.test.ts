import { Mesh } from 'three/webgpu';
import { MeshComponent } from '../MeshComponent.ts';
import { FloorComponent } from '../floor/FloorComponent.ts';
import { ModelComponent } from '../model/ModelComponent.ts';
import { PrimitiveComponent } from '../primitive/PrimitiveComponent.ts';
import { DIVENode } from '../../node/Node.ts';

/**
 * Every mesh component, so the base's contract is checked against each one rather
 * than against a stand-in -- the base is abstract and cannot be instantiated.
 *
 * `withContent` gives each one a mesh the way it actually gets one, which is the
 * whole reason these are separate classes.
 */
const meshes = [
    {
        name: 'model',
        make: () => new ModelComponent(),
        withContent: (component: MeshComponent) => {
            const mesh = new Mesh();
            (component as ModelComponent).setFromGLTF(mesh);
        },
    },
    {
        name: 'primitive',
        make: () => new PrimitiveComponent(),
        withContent: (component: MeshComponent) =>
            (component as PrimitiveComponent).setGeometry({
                name: 'cube',
                width: 1,
                height: 1,
                depth: 1,
            }),
    },
    {
        name: 'floor',
        make: () => new FloorComponent(),
        // a floor is its plane from the moment it exists
        withContent: () => undefined,
    },
];

describe('dive/mesh/MeshComponent', () => {
    meshes.forEach(({ name, make, withContent }) => {
        describe(name, () => {
            it('should be a mesh component', () => {
                const component = make();

                expect(component).toBeInstanceOf(MeshComponent);
                expect(component.isMeshComponent).toBe(true);
                expect(component.isDIVEComponent).toBe(true);
            });

            it('should be findable through the abstract base', () => {
                /**
                 * what lets one code path apply a material to a model, a
                 * primitive and the floor alike
                 */
                const node = new DIVENode();
                const component = node.addComponent(make());

                expect(node.getComponent(MeshComponent)).toBe(component);
            });

            it('should be constructible with no arguments', () => {
                // clone() calls new this.constructor()
                expect(() => make().clone()).not.toThrow();
            });

            it('should give a clone its own content, not a second copy', () => {
                /**
                 * Object3D.copy used to add a clone of the source child on top of the
                 * constructor's, leaving a _mesh that pointed at the empty one
                 */
                const source = make();
                withContent(source);

                const copy = source.clone();

                copy.contributions.forEach((object) =>
                    expect(source.contributions).not.toContain(object),
                );
            });

            it('should have a material after setMaterial', () => {
                const component = make();

                component.setMaterial({ color: 0xff0000 });

                expect(component.material?.color.getHexString()).toBe('ff0000');
            });

            it('should apply every supported property', () => {
                const component = make();
                const map = {} as never;

                component.setMaterial({
                    vertexColors: true,
                    color: 0x00ff00,
                    map,
                    normalMap: map,
                    roughness: 0.25,
                    metalness: 0.5,
                });

                expect(component.material?.vertexColors).toBe(true);
                expect(component.material?.map).toBe(map);
                expect(component.material?.normalMap).toBe(map);
                expect(component.material?.roughness).toBe(0.25);
                expect(component.material?.metalness).toBe(0.5);
            });

            it('should neutralise roughness and metalness when maps are set', () => {
                // a map takes over from the scalar, so the scalar has to be 1
                const component = make();
                const map = {} as never;

                component.setMaterial({
                    roughness: 0.1,
                    roughnessMap: map,
                    metalness: 0.1,
                    metalnessMap: map,
                });

                expect(component.material?.roughness).toBe(1);
                expect(component.material?.metalness).toBe(1);
            });

            it('should keep the scalar when the map is null', () => {
                const component = make();

                component.setMaterial({
                    roughness: 0.3,
                    roughnessMap: null,
                    metalness: 0.3,
                    metalnessMap: null,
                });

                expect(component.material?.roughness).toBe(0.3);
                expect(component.material?.metalness).toBe(0.3);
            });

            it('should put the material on the mesh it owns', () => {
                const component = make();
                withContent(component);

                component.setMaterial({ color: 0x0000ff });

                expect(component.mesh?.material).toBe(component.material);
            });

            it('should dispose its material', () => {
                const component = make();
                component.setMaterial({ color: 0xffffff });
                const dispose = vi.spyOn(component.material!, 'dispose');

                component.dispose();

                expect(dispose).toHaveBeenCalled();
            });
        });
    });
});
