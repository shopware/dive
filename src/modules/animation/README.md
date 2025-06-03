
# Animation System
Leverages the workload for Animations in DIVE.

## Usage
```ts
import { Vector3 } from 'three';
import { DIVEModel } from '@shopware-ag/dive';
import { AnimationSystem } from '@shopware-ag/dive/animation';

const obj = new DIVEModel();
obj.position.set(0, 0, 0);

const onUpdate = (object: Vector3, elapsed: number): void => {
    console.log('updated animation', object, elapsed);
};

const onComplete = (object: Vector3): void => {
    console.log('completed animation', object);
};

const animationSystem = new AnimationSystem();
animationSystem.animate(obj.position, new Vector3(1, 1, 1), 1000, {
    onUpdate,
    onComplete,
});
```
