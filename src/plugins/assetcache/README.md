# Asset Cache
Caches loaded assets and their promises.

## Features:
- No multiple loading of same assets.
- Is used internally, no extra steps needed for you.
- Global asset cache: is used across all instances and versions of DIVE, no multiple cache instances.
- Works with any file type that can be converted into an ArrayBuffer.

## Usage
### Create cache
```ts
import { AssetCache, Chunk } from '@shopware-ag/dive/assetcache';

const uri = 'https://my-shop.com/my-model.glb';

/**
 * Used as a generic type for the result of your chunk.
 * Rule of thumb: This type is what you expect after parsing the fetched array buffer in your custom parsing method. (see below `yourParseMethod`).
 */
type YourChunkType = Object3D; // just an example, can be anything

const yourParseMethod = (arrayBuffer: ArrayBuffer): YourChunkType => {
    /**
     * This method will be custom for you.
     * It has to take care of parsing your loaded array buffer to whatever data type you expect.
     * (for example GLTF)
     */
}

// create cache chunk
const chunk = AssetCache.create<YourChunkType>(uri, yourParseMethod);
chunk.fetch(); // <- fetch the array buffer from the uri, returns a promuise
```

### Read cache
```ts
import { AssetCache, Chunk } from '@shopware-ag/dive/assetcache';

const uri = 'https://my-shop.com/my-model.glb';

// find cache chunk
const exstingChunk = AssetCache.read(uri) as Chunk<Object3D>;
if (exstingChunk) {
    if (exstingChunk.result) {
        // if the chunk is already fetched, it returns it's result. (the result of your parse method)
        return exstingChunk.result;
    }
    // if the chunk has not finished fetching, it returns it's promise.
    return exstingChunk.promise;
}
```

### Write custom cache
```ts
import { AssetCache, Chunk } from '@shopware-ag/dive/assetcache';

const uri = 'https://my-shop.com/my-model.glb';

/**
 * Used as a generic type for the result of your chunk.
 * Rule of thumb: This type is what you expect after parsing the fetched array buffer in your custom parsing method. (see below `yourParseMethod`).
 */
type YourChunkType = Object3D; // just an example, can be anything

const yourParseMethod = (arrayBuffer: ArrayBuffer): YourChunkType => {
    /**
     * This method will be custom for you.
     * It has to take care of parsing your loaded array buffer to whatever data type you expect.
     * (for example GLTF)
     */
}

// set a custom key for a chunk
const customChunk = new Chunk<YourChunkType>(uri, yourParseMethod);
AssetCache.write('your-custom-key', customChunk);
customChunk.fetch(); // <- fetch the array buffer from the uri, returns a promise
```