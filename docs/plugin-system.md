# Plugin System

DIVE features a robust and modern plugin system that allows for easy extension of its core functionalities. The system is built on standard TypeScript and Node.js module resolution, providing a type-safe and scalable architecture.

## Plugin Architecture

The plugin system is designed as a collection of modules located in the `src/plugins` directory. Each subdirectory within `src/plugins` represents a distinct plugin, such as `orbitcontroller` or `orientationdisplay`.

This modular approach has several advantages:

-   **Separation of Concerns:** Each plugin is self-contained, making the codebase easier to understand, maintain, and test.
-   **Scalability:** New features can be added as new plugins without modifying the core system.
-   **Type Safety:** The entire system is built with TypeScript, ensuring that plugins and their interactions with the core system are fully type-safe.

## Plugin Usage

All plugins are exposed as subpaths of the main `@shopware-ag/dive` package. This is configured through the `exports` field in the project's `package.json`.

This mechanism allows for a unified way of importing plugins, whether you are working within the DIVE codebase itself (internal use) or consuming it as a library in your own project (external use).

### Example

To use a plugin, you can directly import it from its subpath:

```ts
import { DIVE } from '@shopware-ag/dive';
import { OrbitController } from '@shopware-ag/dive/orbitcontroller';
import { OrientationDisplay } from '@shopware-ag/dive/orientationdisplay';

const dive = new DIVE();

// The DIVE class itself uses plugins internally for its default setup
const controller = new OrbitController(dive.engine.camera, dive.canvas);
const orientation = new OrientationDisplay(dive.engine.renderer, dive.engine.scene, dive.engine.camera);
```

As you can see, using a plugin is as simple as importing it and instantiating its classes.

## Creating a Plugin

Creating a new plugin involves the following steps:

1.  **Create a Plugin Directory:** Add a new subdirectory inside `src/plugins`. For example, `src/plugins/my-new-plugin`.

2.  **Develop the Plugin:** Write your plugin's logic in TypeScript within its directory. It's a good practice to have an `index.ts` file that exports the public API of your plugin. Each plugin should also have its own `package.json`.

3.  **Expose the Plugin:** To make the plugin accessible, you need to add it to the `exports` map in the root `package.json` file. This makes it available as a subpath import.

    ```json
    // package.json
    {
      "exports": {
        // ... existing exports
        "./my-new-plugin": {
          "types": "./build/plugins/my-new-plugin/index.d.ts",
          "import": "./build/plugins/my-new-plugin/index.mjs",
          "require": "./build/plugins/my-new-plugin/index.cjs"
        }
      }
    }
    ```

4.  **Build:** Run the build process to generate the necessary JavaScript and type definition files in the `build` directory.

This system ensures that new plugins are seamlessly integrated into the DIVE framework and are immediately available to all consumers in a consistent and type-safe manner.
