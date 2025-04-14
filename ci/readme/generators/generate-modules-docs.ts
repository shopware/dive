import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { glob } from 'glob';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

interface ModuleDoc {
    name: string;
    description: string;
    example: string;
    features?: string[];
    supportedFormats?: string[];
}

/**
 * Extracts module documentation from a file
 */
function extractModuleDoc(filePath: string): ModuleDoc | null {
    const content = readFileSync(filePath, 'utf-8');

    // Find the @module documentation block
    const moduleMatch = content.match(
        /\/\*\*\s*\n\s*\*\s*@module\s+([^\n]+)\s*\n([\s\S]*?)\s*\*\//,
    );
    if (!moduleMatch) return null;

    const [
        ,
        name,
        docContent,
    ] = moduleMatch;

    // Clean up the content by removing * from the start of lines but preserving indentation
    const cleanContent = docContent
        .split('\n')
        .map((line) => {
            // Remove * from the start but keep the rest of the whitespace
            const match = line.match(/^\s*\*\s?(.*)$/);
            return match ? match[1] : line;
        })
        .join('\n')
        .trim();

    // Extract description (text before the first code block)
    const description = cleanContent.split('```')[0].trim();

    // Extract code example
    const codeMatch = cleanContent.match(/```ts\n([\s\S]*?)```/);
    const codeExample = codeMatch
        ? codeMatch[1]
              .split('\n')
              .map((line) => {
                  if (!line) return ''; // Empty line
                  if (line.startsWith('import ')) return line; // Import statements have no indentation
                  return line.replace(/^\s/, ''); // Remove only the first space
              })
              .join('\n')
              .trim()
        : '';

    // Extract features
    const featuresMatch = cleanContent.match(
        /Features:\s*\n([\s\S]*?)(?:\n\n|$)/,
    );
    const features = featuresMatch
        ? featuresMatch[1]
              .split('\n')
              .map((line) => line.replace(/^-\s*/, '').trim())
              .filter(Boolean)
        : undefined;

    // Extract supported formats
    const formatsMatch = cleanContent.match(
        /Supported formats:\s*\n([\s\S]*?)(?:\n\n|$)/,
    );
    const supportedFormats = formatsMatch
        ? formatsMatch[1]
              .split('\n')
              .map((line) => line.replace(/^-\s*/, '').trim())
              .filter(Boolean)
        : undefined;

    return {
        name,
        description,
        example: codeExample,
        features,
        supportedFormats,
    };
}

/**
 * Generates markdown documentation for a module
 */
function generateModuleMarkdown(doc: ModuleDoc): string {
    let markdown = `#### ${doc.name}\n\n`;
    markdown += `${doc.description}\n\n`;

    if (doc.example) {
        markdown += '```ts\n';
        markdown += doc.example;
        markdown += '\n```\n\n';
    }

    if (doc.supportedFormats) {
        markdown += 'Supported formats:\n\n';
        doc.supportedFormats.forEach((format) => {
            // Remove any existing dash and trim before adding our own
            const cleanFeature = format.replace(/^-\s*/, '').trim();
            markdown += `- ${cleanFeature}\n`;
        });
        markdown += '\n';
    }

    if (doc.features) {
        markdown += 'Features:\n\n';
        doc.features.forEach((feature) => {
            // Remove any existing dash and trim before adding our own
            const cleanFeature = feature.replace(/^-\s*/, '').trim();
            markdown += `- ${cleanFeature}\n`;
        });
        markdown += '\n';
    }

    return markdown;
}

/**
 * Main function to generate module documentation
 */
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
        .filter((doc): doc is ModuleDoc => doc !== null)
        .sort((a, b) => a.name.localeCompare(b.name));

    // Generate the complete documentation
    let documentation = '';
    moduleDocs.forEach((doc) => {
        documentation += generateModuleMarkdown(doc);
    });

    // Read the README file
    const readmePath = join(__dirname, '../../../README.md');
    let readme = readFileSync(readmePath, 'utf-8');

    // Check if we need to add markers
    if (!readme.includes('<!-- INSERT_MODULES -->')) {
        // Find the Modules section
        const modulesSection = '### Modules\n';
        const modulesSectionIndex = readme.indexOf(modulesSection);
        if (modulesSectionIndex === -1) {
            throw new Error('Could not find Modules section in README.md');
        }

        // Find the next section after Modules
        const nextSectionMatch = readme
            .slice(modulesSectionIndex + modulesSection.length)
            .match(/\n### [^\n]+/);
        if (
            !nextSectionMatch ||
            typeof nextSectionMatch.index === 'undefined'
        ) {
            throw new Error(
                'Could not find next section after Modules in README.md',
            );
        }

        const nextSectionIndex =
            modulesSectionIndex +
            modulesSection.length +
            nextSectionMatch.index;

        // Insert markers around the existing modules content
        const before = readme.slice(0, nextSectionIndex);
        const after = readme.slice(nextSectionIndex);

        readme = before + documentation + after;
    } else {
        // Replace content between existing markers
        readme = readme.replace(
            /(<!-- INSERT_MODULES -->)([\s\S]*?)/,
            `${documentation}`,
        );
    }

    // Write the updated README back
    writeFileSync(readmePath, readme);

    console.log('Module documentation generated successfully!');
}

// Run the script
generateModulesDocumentation().catch(console.error);
