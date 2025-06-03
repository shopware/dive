# System Info
Provides information about the system's capabilities and performance.

## Features:
- System detection (iOS, Android, Windows, etc.)
- WebXR support detection
- AR capability checking
- Device type detection
- SceneViewer and AR Quick Look support detection

## Usage
```ts
import { SystemInfo, ESystem } from '@shopware-ag/dive/systeminfo';

// Get system information
const system: ESystem = SystemInfo.getSystem(); // (IOS, ANDROID, etc.)

// Check AR capabilities
const supportsAR = SystemInfo.getSupportsAR();

// Check device type
const isMobile = SystemInfo.isMobile;
const isDesktop = SystemInfo.isDesktop;
```