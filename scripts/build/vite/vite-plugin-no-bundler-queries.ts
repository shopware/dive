import { Plugin } from 'vite';

/**
 * Fails the build when a published chunk still imports something with a
 * query (`?raw`, `?url`, ...). Only Vite resolves those; webpack and others
 * would need a hand-written rule for every consumer.
 */
export default function noBundlerQueriesPlugin(): Plugin {
    return {
        name: 'no-bundler-queries',
        apply: 'build',
        generateBundle(_, bundle) {
            const offenders: string[] = [];

            for (const output of Object.values(bundle)) {
                if (output.type !== 'chunk') continue;

                for (const id of [
                    ...output.imports,
                    ...output.dynamicImports,
                ]) {
                    if (id.includes('?')) {
                        offenders.push(`${output.fileName} -> ${id}`);
                    }
                }
            }

            if (offenders.length > 0) {
                this.error(
                    'Published chunks must not import with bundler queries:\n' +
                        offenders.map((o) => `  ${o}`).join('\n'),
                );
            }
        },
    };
}
