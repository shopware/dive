# Shopware Integration

Don't forget to include DIVE in your `webpack.config.js`:

```js
const path = require('path');

module.exports = () => {
    return {
        // Other configurations...
        resolve: {
            extensions: [
                '.ts',
                '.cjs',
                '.js',
            ],
            alias: {
                three: path.resolve(__dirname, 'path/to/node_modules/three'),
                '@shopware-ag/dive': path.resolve(
                    __dirname,
                    'path/to/node_modules/@shopware-ag/dive',
                ),
            },
        },
        module: {
            rules: [
                // Other rules...
                {
                    test: /\.(js|ts)$/,
                    loader: 'swc-loader',
                    include: [
                        path.resolve(__dirname, 'path/to/node_modules/three'),
                        path.resolve(
                            __dirname,
                            'path/to/node_modules/@shopware-ag/dive',
                        ),
                    ],
                    options: {
                        jsc: {
                            parser: {
                                syntax: 'typescript',
                            },
                            target: 'es2022',
                        },
                    },
                },
                // Other rules...
            ],
        },
    };
};
```
