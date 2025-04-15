# Module System

DIVE uses a modern module system with support for both ESM and CommonJS formats. The package is
built using Vite and supports the following module formats:

- ESM (`.mjs` files)
- CommonJS (`.cjs` files)
- TypeScript type definitions (`.d.ts` files)

The module system provides a type-safe way to register and access modules using a factory pattern
for dependency injection.

## Module Registration

To register a module, you need to:

1. Define the module class
2. Declare the module in the global `ModuleClasses` interface
3. Register the module using `Modules.register()`

Example:

```typescript
// 1. Define the module class
export class MyModule {
    constructor(dependency1: Type1, dependency2: Type2) {
        // ...
    }
}

// 2. Declare in ModuleClasses
declare global {
    interface ModuleClasses {
        MyModule: typeof MyModule;
    }
}

// 3. Register the module in src/modules/index.ts
Modules.register('MyModule');
```

## Factory Pattern

Modules can be instantiated with dependencies using factory functions:

```typescript
// Set up factory for a module
Modules.factorize('MyModule', (ModuleClass) => {
    return new ModuleClass(dependency1, dependency2);
});

// Later, get the module instance
const myModule = await Modules.get('MyModule');
```

The factory function receives the module class as a parameter and returns an instance of the module.
TypeScript ensures that the constructor parameters match the module's requirements.

## Type Safety

The module system provides full type safety:

- Module class types are inferred from the `ModuleClasses` interface
- Constructor parameters are properly typed
- Factory functions are type-checked to ensure they return the correct instance type
- The `get` method returns a properly typed Promise of the module instance

## Module Exports

The package exports are configured in `package.json` to support both direct imports and
module-specific imports:

```json
{
    "exports": {
        ".": {
            "types": "./build/index.d.ts",
            "import": "./build/index.mjs",
            "require": "./build/index.cjs"
        },
        "./modules/*": {
            "types": "./build/src/modules/*.d.ts",
            "import": "./build/src/modules/*.mjs",
            "require": "./build/src/modules/*.cjs"
        }
    }
}
```

## Build Process

The build process is handled by Vite and can be triggered using:

```bash
yarn build        # One-time build
yarn dev          # Watch mode for development
```

The build process:

1. Compiles TypeScript code
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
