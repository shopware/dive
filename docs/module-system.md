# Module System

DIVE uses a modern module system with support for both ESM and CommonJS formats. The package is
built using Vite and supports the following module formats:

- ESM (`.mjs` files)
- CommonJS (`.cjs` files)
- ts type definitions (`.d.ts` files)

The module system provides a type-safe way to register and access modules through a centralized
export point.

## Module Registration

The module system is configured through a centralized export point in `src/modules/index.ts`. To add
a new module to the system:

1. Define the module class
2. Add the module path to the `MODULE_PATHS` object in `src/modules/index.ts`
3. Declare the module in the global `ModuleClasses` interface

Example:

```ts
// 1. Define the module class
export class MyModule {
    constructor(dependency1: Type1, dependency2: Type2) {
        // ...
    }
}

// 2. Add to MODULE_PATHS in src/modules/index.ts
export const MODULE_PATHS = {
    // ... existing modules ...
    MyModule: './path/to/MyModule.ts',
};

// 3. Declare in ModuleClasses
declare global {
    interface ModuleClasses {
        MyModule: typeof MyModule;
    }
}
```

The module will be automatically registered when the application starts.

## Module Access

The `ModuleRegistry` is available through the modules subpath export. The `.get` method returns the module class, which you can then instantiate:

```ts
import { ModuleRegistry } from '@shopware-ag/dive/modules';

// Get the module class
const ModuleClass = await ModuleRegistry.get('MyModule');

// Create an instance of the module
const myModule = new ModuleClass();
```

You can also access the `ModuleRegistry` through a `DIVE` instance:

```ts
import { DIVE } from '@shopware-ag/dive';

const dive = new DIVE();
const ModuleClass = await dive.modules.get('MyModule');
const myModule = new ModuleClass();
```

## Type Safety

The module system provides full type safety:

- Module class types are inferred from the `ModuleClasses` interface
- The `get` method returns a properly typed Promise of the module class
- Module paths are type-checked against the `ModuleClasses` interface

## Module Exports

The module system is exported through the modules subpath in `package.json`:

```json
{
    "exports": {
        "./modules": {
            "types": "./build/src/modules/index.d.ts",
            "import": "./build/src/modules/index.mjs",
            "require": "./build/src/modules/index.cjs"
        }
    }
}
```

This allows you to import the `ModuleRegistry` and other module-related exports:

```ts
import { ModuleRegistry } from '@shopware-ag/dive/modules';
```

## Build Process

The build process is handled by Vite and can be triggered using:

```bash
yarn build        # One-time build
yarn dev          # Watch mode for development
```

The build process:

1. Compiles ts code
2. Generates type definitions
3. Creates both ESM and CommonJS versions of the code
4. Places all output in the `build/` directory

## Development Workflow

For local development, you can use the watch mode to automatically rebuild when files change:

```bash
yarn dev
```

This is particularly useful when working with the module system as it ensures your changes are
immediately reflected in the build output.
