# Module System

DIVE uses a modern module system that supports both internal and external module access patterns. The system is built using TypeScript and provides type-safe module registration and access.

## Module Types

The module system supports two main types of modules:

1. **Internal Modules** - Used within the DIVE core system
2. **External Modules** - Exposed to consumers of the DIVE library

## Module Registration

All modules must be registered in the global `ModuleClasses` interface. This provides type safety and enables the module system to track available modules.

Example:

```ts
// Write documentation starting with @module "module name"
/**
 * @module MyModule
 *
 * Does magical things.
 *
 * ```ts
 * import { MyModule } from '@shopware-ag/dive/modules/MyModule';
 *
 * const magic = new MyModule().doMagic();
 * ```
 *
 * Features:
 * - does magic
 */

// Define the module class
export class MyModule {
    constructor(param1: Type1, param2: Type2) {
        // ...
    }
}

// Extend global interface by module class
declare global {
    interface ModuleClasses {
        MyModule: typeof MyModule;
    }
}
```

## Internal Module Access

Internal modules are accessed using the `ModuleImporter` class, which handles dynamic importing and caching of module classes.

```ts
import { ModuleImporter } from '@shopware-ag/dive/modules';

// Create an importer for a specific module
const importer = new ModuleImporter<'MyModule'>('src/modules/my/module.ts');

// Get the module class
const ModuleClass = await importer.import();

// Or create a singleton instance directly
const instance = await importer.instantiate(param1, param2);
```

The `ModuleImporter` provides:
- Dynamic module loading
- Module class caching
- Type-safe module instantiation
- Error handling for failed imports

## External Module Access

External modules are accessed through direct imports from the modules subpath:

```ts
import { MyModule } from '@shopware-ag/dive/modules/MyModule';

// Create an instance
const instance = new MyModule(param1, param2);
```

## Type Safety

The module system provides full type safety through:
- TypeScript interfaces for module registration
- Type-safe module instantiation
- Type checking for module paths and imports
- Type inference for module instances

## Build Process

The module system is built using Vite and supports:
- ESM (`.mjs` files)
- CommonJS (`.cjs` files)
- TypeScript type definitions (`.d.ts` files)

Build commands:
```bash
yarn build        # One-time build
yarn dev          # Watch mode for development
```

## Development Workflow

For local development:
1. Use `yarn dev` for automatic rebuilding
2. Register new modules in the `ModuleClasses` interface
3. Implement module classes with proper TypeScript types
4. Export modules through the modules subpath in `package.json`
