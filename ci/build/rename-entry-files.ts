import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const buildDir = path.join(__dirname, '../../build');

interface FileRename {
    from: string;
    to: string;
}

// Files to rename
const filesToRename: FileRename[] = [
    { from: 'index.cjs', to: 'dive.cjs' },
    { from: 'index.mjs', to: 'dive.mjs' },
    { from: 'index.d.ts', to: 'dive.d.ts' },
];

// Rename files
for (const { from, to } of filesToRename) {
    const fromPath = path.join(buildDir, from);
    const toPath = path.join(buildDir, to);

    if (fs.existsSync(fromPath)) {
        fs.renameSync(fromPath, toPath);
        console.log(`Renamed ${from} to ${to}`);
    } else {
        console.warn(`Warning: ${from} not found in build directory`);
    }
}

// Update package.json
const packageJsonPath = path.join(__dirname, '../../package.json');
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8')) as {
    main: string;
    module: string;
    types: string;
};

packageJson.main = 'build/dive.cjs';
packageJson.module = 'build/dive.mjs';
packageJson.types = 'build/dive.d.ts';

fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 4));
console.log('Updated package.json with new entry points');
