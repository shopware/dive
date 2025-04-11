import { Actions } from '../com/actions';
import { type DIVEScene } from '../scene/Scene';
import { Modules } from './Module';

// Example 1: Get singleton instance (for internal use)
Modules.getInstance('ARSystem').then((arSystem) => {
    arSystem.launch('https://dive.com/model.glb');
});

const action = new Actions.TestAction1('glb', {
    scene: {} as unknown as DIVEScene,
});
action.execute();
