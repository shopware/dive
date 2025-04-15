import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { glob } from 'glob';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const INSERT_MARKER = '<!-- INSERT_MODULES -->';
const END_MARKER = '<!-- END_MODULES -->';

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

async function generateModulesDocumentation(): Promise<void> {
    // Find all module files
    const moduleFiles = await glob('src/modules/**/*.ts', {
        ignore: [
            '**/__test__/**',
            '**/_system/**',
        ],
        cwd: join(__dirname, '../..'), // Set the working directory to the project root
    });

    // Extract documentation from each module file
    const moduleDocs = moduleFiles
        .map((file) => extractModuleDoc(join(__dirname, '../..', file)))
        .filter((doc): doc is { name: string; content: string } => doc !== null)
        .map(({ name, content }) => ({ name, content }));

    const moduleReferencePath = join(__dirname, '../module-reference.md');
    let moduleReferenceFile = readFileSync(moduleReferencePath, 'utf-8');

    const completeModuleDocs = moduleDocs
        .sort((a, b) => a.name.localeCompare(b.name))
        .map(({ name, content }) => `#### ${name}\n\n${content}`)
        .join('\n\n');

    // Replace content between existing markers
    moduleReferenceFile = moduleReferenceFile.replace(
        new RegExp(`${INSERT_MARKER}[\\s\\S]*?${END_MARKER}`, 'g'),
        `${INSERT_MARKER}\n${completeModuleDocs}${END_MARKER}`,
    );

    writeFileSync(moduleReferencePath, moduleReferenceFile);

    console.log('Module documentation generated successfully!');
}

// Run the script
generateModulesDocumentation().catch(console.error);
