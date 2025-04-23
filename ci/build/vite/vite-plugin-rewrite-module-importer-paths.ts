import { parse, Node } from 'acorn';
import { simple as walk } from 'acorn-walk';
import MagicString from 'magic-string';
import path from 'path';
import type { Plugin } from 'vite';

// Basic configuration (adjust as needed)
const projectRoot = process.cwd();
const buildDir = path.resolve(projectRoot, 'build'); // Make sure this matches vite config outDir

export default function rewriteModuleImporterPathsPlugin(): Plugin {
    return {
        name: 'rewrite-module-importer-paths',

        // Use renderChunk hook. Vite infers types for parameters usually,
        // but we can add `any` if linting requires explicit types.
        renderChunk(code: string, chunk: any, options: any) {
            // Determine the expected extension based on the output format for *this chunk*
            const outputExtension = options?.format === 'cjs' ? '.cjs' : '.mjs';

            let ast: Node;
            try {
                ast = parse(code, {
                    ecmaVersion: 'latest',
                    sourceType: 'module',
                    locations: true,
                });
            } catch (e: unknown) {
                const message = e instanceof Error ? e.message : String(e);
                console.warn(
                    `[Module Rewrite] Failed to parse chunk ${chunk?.fileName ?? 'unknown'} for module importer rewrite: ${message}. Skipping rewrite for this chunk.`,
                );
                return null;
            }

            const magicString = new MagicString(code);
            let hasChanges = false;

            // Use optional chaining for chunk properties
            const chunkDir = path.resolve(
                buildDir,
                path.dirname(chunk?.fileName ?? ''),
            );

            walk(ast, {
                NewExpression: (node: any) => {
                    if (
                        node.callee.type === 'Identifier' &&
                        node.callee.name === 'ModuleImporter' &&
                        node.arguments.length === 1 &&
                        node.arguments[0].type === 'Literal'
                    ) {
                        const literalNode = node.arguments[0];
                        // *** Check if the literal value is a string before proceeding ***
                        if (typeof literalNode.value !== 'string') {
                            return; // Skip if the argument is not a string literal
                        }
                        const originalSourceRelativePath: string =
                            literalNode.value;

                        // --- Calculate target path based on *known build structure* ---
                        let targetPathRelativeSrc: string | undefined;
                        // *** Use string methods ONLY after checking type ***
                        if (originalSourceRelativePath.startsWith('../')) {
                            const firstSlashIndex =
                                originalSourceRelativePath.indexOf('/');
                            if (firstSlashIndex !== -1) {
                                targetPathRelativeSrc =
                                    originalSourceRelativePath.substring(
                                        firstSlashIndex + 1,
                                    );
                            } else {
                                targetPathRelativeSrc =
                                    originalSourceRelativePath;
                                console.warn(
                                    `[Module Rewrite] Unusual '../' path without subdir: ${originalSourceRelativePath} in chunk ${chunk?.fileName ?? 'unknown'}. Assuming relative to src.`,
                                );
                            }
                        } else if (
                            originalSourceRelativePath.startsWith('./')
                        ) {
                            console.warn(
                                `[Module Rewrite] Ambiguous './' path found: ${originalSourceRelativePath} in chunk ${chunk?.fileName ?? 'unknown'}. Assuming relative to src root. Rewrite might be incorrect.`,
                            );
                            targetPathRelativeSrc =
                                originalSourceRelativePath.substring(2);
                        } else if (
                            path.isAbsolute(originalSourceRelativePath)
                        ) {
                            console.warn(
                                `[Module Rewrite] Absolute path found: ${originalSourceRelativePath} in chunk ${chunk?.fileName ?? 'unknown'}. Skipping rewrite for this path.`,
                            );
                            return; // Skip absolute paths
                        } else {
                            targetPathRelativeSrc = originalSourceRelativePath;
                        }

                        if (typeof targetPathRelativeSrc !== 'string') {
                            console.warn(
                                `[Module Rewrite] Could not determine target path relative to src for ${originalSourceRelativePath} in chunk ${chunk?.fileName ?? 'unknown'}. Skipping.`,
                            );
                            return;
                        }

                        const targetBuildPathBase = path
                            .resolve(buildDir, targetPathRelativeSrc)
                            .replace(/\.ts$/, '');
                        const targetBuildPathFinal = `${targetBuildPathBase}${outputExtension}`;

                        let runtimeRelativePath = path.relative(
                            chunkDir,
                            targetBuildPathFinal,
                        );

                        if (
                            !runtimeRelativePath.startsWith('.') &&
                            !path.isAbsolute(runtimeRelativePath)
                        ) {
                            runtimeRelativePath = './' + runtimeRelativePath;
                        }
                        runtimeRelativePath = runtimeRelativePath.replace(
                            /\\/g,
                            '/',
                        );

                        console.log(
                            `[Module Rewrite] Rewriting "${originalSourceRelativePath}" to "${runtimeRelativePath}" in chunk ${chunk?.fileName ?? 'unknown'}`,
                        );
                        magicString.overwrite(
                            literalNode.start + 1,
                            literalNode.end - 1,
                            runtimeRelativePath,
                        );
                        hasChanges = true;
                    }
                },
            });

            if (!hasChanges) {
                return null;
            }

            return {
                code: magicString.toString(),
                map: magicString.generateMap({
                    source: chunk?.fileName ?? 'unknown.js', // Provide a fallback source name
                    includeContent: true,
                    hires: true,
                }),
            };
        },
    };
}
