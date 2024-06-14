// SOURCE: https://github.com/phips28/gh-action-bump-version

import { execSync, spawn } from 'child_process';
import { EOL } from 'os';

import pkgjson from '../package.json' with { type: "json" };

const current = pkgjson.version.toString();

const major = current.split('.')[0];
const minor = current.split('.')[1];
const patch = current.split('.')[2];

process.env.MJR_VERSION = major;
process.env.MNR_VERSION = minor;
process.env.PAT_VERSION = patch;

function parseNpmVersionOutput(output) {
    const npmVersionStr = output.trim().split(EOL).pop();
    return npmVersionStr.replace(/^v/, '');
}

function runInWorkspace(command, args) {
    return new Promise((resolve, reject) => {
        const child = spawn(command, args);
        let isDone = false;
        const errorMessages = [];
        child.on('error', (error) => {
            if (!isDone) {
                isDone = true;
                reject(error);
            }
        });
        child.stderr.on('data', (chunk) => errorMessages.push(chunk));
        child.on('exit', (code) => {
            if (!isDone) {
                if (code === 0) {
                    resolve();
                } else {
                    reject(`${errorMessages.join('')}${EOL}${command} exited with code ${code}`);
                }
            }
        });
    });
}

await runInWorkspace('npm', ['version', '--allow-same-version=true', '--git-tag-version=false', current]);

let newVersion = parseNpmVersionOutput(execSync(`npm version --git-tag-version=false ${major}.${minor}.${(Number.parseFloat(patch)+1).toString()}`).toString());
console.log('newVersion:', newVersion);

await runInWorkspace('git', ['tag', `v${newVersion}`, '-a', `-m "Rollout: Version ${newVersion}"`]);
