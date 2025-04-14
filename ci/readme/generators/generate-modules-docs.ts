import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { glob } from 'glob';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

interface ModuleDoc {
    name: string;
    content: string;
}

/**
 * Extracts module documentation from a file
 */
function extractModuleDoc(filePath: string): ModuleDoc | null {
    const fileContent = readFileSync(filePath, 'utf-8');

    // Find the @module documentation block
    const moduleMatch = fileContent.match(
        /\/\*\*\s*\n\s*\*\s*@module\s+([^\n]+)\s*\n([\s\S]*?)\s*\*\//,
    );
    if (!moduleMatch) return null;

    const [
        ,
        name,
        docContent,
    ] = moduleMatch;

    // Clean up the content by removing * from the start of lines but preserving indentation
    const content = docContent
        .split('\n')
        .map((line) => {
            // Remove * from the start but keep the rest of the whitespace
            const match = line.match(/^\s*\*\s?(.*)$/);
            return match ? match[1] : line;
        })
        .join('\n')
        .trim();

    return { name, content };
}

async function generateModulesDocumentation() {
    // Find all module files
    const moduleFiles = await glob('src/modules/**/*.ts', {
        ignore: [
            '**/__test__/**',
            '**/_system/**',
        ],
        cwd: join(__dirname, '../../..'), // Set the working directory to the project root
    });

    // Extract documentation from each module file
    const moduleDocs = moduleFiles
        .map((file) => extractModuleDoc(join(__dirname, '../../..', file)))
        .filter((doc): doc is { name: string; content: string } => doc !== null)
        .map(({ name, content }) => ({ name, content }));

    // Read the README file
    const readmePath = join(__dirname, '../../../README.md');
    let readme = readFileSync(readmePath, 'utf-8');

    const completeModuleDocs = moduleDocs
        .sort((a, b) => a.name.localeCompare(b.name))
        .map(({ name, content }) => `#### ${name}\n\n${content}`)
        .join('\n\n');

    // Replace content between existing markers
    readme = readme.replace(
        /(<!-- INSERT_MODULES -->)([\s\S]*?)/,
        `${completeModuleDocs}`,
    );

    // Write the updated README back
    writeFileSync(readmePath, readme);

    console.log('Module documentation generated successfully!');
}

// Run the script
generateModulesDocumentation().catch(console.error);
