# Module Reference

DIVE provides several specialized modules for different aspects of 3D content handling:

<!-- INSERT_MODULES -->
#### ARSystem

The AR module enables Augmented Reality features across different platforms:

```ts
import { ARSystem } from '@shopware-ag/dive/modules/ARSystem';

const arSystem = new ARSystem();

// Launch AR with options
await arSystem.launch('path/to/model.glb', {
    arPlacement: 'horizontal', // or 'vertical'
    arScale: 'auto' // or 'fixed'
});
```

Features:
- Platform-specific AR implementations (ARQuickLook for iOS, SceneViewer for Android)
- Automatic format conversion for AR compatibility
- Configurable placement and scaling options

#### AssetConverter

Converts between different 3D file formats:

```ts
import { AssetConverter } from '@shopware-ag/dive/modules/AssetConverter';

const assetConverter = new AssetConverter();
const usdzBuffer = await assetConverter.convert('input.glb').to('usdz');
```

#### AssetExporter

Exports 3D assets to various formats:

```ts
import { AssetExporter } from '@shopware-ag/dive/modules/AssetExporter';

const assetExporter = new AssetExporter();
const buffer = await assetExporter.export(model, 'glb');
```

#### AssetLoader

Handles loading of 3D assets in various formats:

```ts
import { AssetLoader } from '@shopware-ag/dive/modules/AssetLoader';

const assetLoader = new AssetLoader();
const model = await assetLoader.load('path/to/model.glb');
```

Supported formats:
- GLB/GLTF
- USDZ

#### MediaCreator

Provides tools for creating media content from the 3D scene:

```ts
import { MediaCreator } from '@shopware-ag/dive/modules/MediaCreator';

const mediaCreator = new MediaCreator(renderer, scene, controller);

// Generate a screenshot
const screenshot = await mediaCreator.GenerateMedia(
    { x: 0, y: 0, z: 0 }, // camera position
    { x: 0, y: 0, z: 0 }, // camera target
    1920, // width
    1080  // height
);
```

Features:
- High-quality screenshot generation
- Customizable camera position and target
- Configurable output resolution

#### SystemInfo

Provides information about the system's capabilities and performance:

```ts
import { SystemInfo } from '@shopware-ag/dive/modules/SystemInfo';

// Get system information
const system = SystemInfo.getSystem(); // Returns ESystem enum (IOS, ANDROID, etc.)

// Check AR capabilities
const supportsAR = SystemInfo.getSupportsAR();

// Check device type
const isMobile = SystemInfo.isMobile;
const isDesktop = SystemInfo.isDesktop;
```

Features:
- System detection (iOS, Android, Windows, etc.)
- WebXR support detection
- AR capability checking
- Device type detection
- SceneViewer support detection<!-- END_MODULES -->

Each module is designed to be used independently, allowing you to use only the functionality you
need. This helps keep your bundle size small and your application focused.
