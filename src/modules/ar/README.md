
# AR System
Activates native AR capabilities on mobile devices with one function call.

## Features:
- Parameter for AR placement:
    - `horizontal`: Object will be placed on floors/horizontal planes
    - `vertical`: Object will be placed on walls/vertical planes
    - there is no `both` option yet
- Parameter for scaling:
    - `auto`: User can scale in native environement
    - `fixed`: Scaling deactivated
- Takes care of converting to USDZ for AR Quick Look (iOS) automatically.
- Catches if launched on desktop system.


## Usage
```ts
import { DIVEModel } from '@shopware-ag/dive';
import { ARSystem } from '@shopware-ag/dive/ar';

const arSystem = new ARSystem();
arSystem.launch('my-model.glb', {
    arPlacement: 'horizontal' | 'vertical',
    arScale: 'auto' | 'fixed'
});
```
