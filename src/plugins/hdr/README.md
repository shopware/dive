# HDR

## Features:
-

## Usage
```ts
import { HDREnvironment } from '@shopware-ag/dive/hdr';

const hdr = new HDREnvironment();
hdr.setImageUrl('path/to/image.hdr');

// or via QuickView plugin
import { QuickView } from '@shopware-ag/dive/quickview';

const { dive, orbitcontroller, hdr } = await QuickView({url: 'path/to/model'});
hdr.enabled = false;
```