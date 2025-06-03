#!/usr/bin/env ts-node

import fs from 'fs';
import path, { resolve } from 'path';
import { spawn } from 'child_process';
import logUpdate from 'log-update';

const ROOT_DIR = resolve(process.cwd());
const PLUGINS_DIR = path.join(ROOT_DIR, 'src/plugins');

// Find all plugin directories with a package.json
const pluginDirs: string[] = fs
    .readdirSync(PLUGINS_DIR)
    .map((name) => path.join(PLUGINS_DIR, name))
    .filter(
        (dir) =>
            fs.statSync(dir).isDirectory() &&
            fs.existsSync(path.join(dir, 'package.json')),
    );

type Status = 'pending' | 'success' | 'fail';
interface PluginStatus {
    dir: string;
    status: Status;
    error: string;
}

const statuses: PluginStatus[] = pluginDirs.map((dir) => ({
    dir,
    status: 'pending',
    error: '',
}));

function render(): void {
    logUpdate(
        statuses
            .map((s) => {
                if (s.status === 'pending')
                    return `⏳ Installing dependencies in ${s.dir} ...`;
                if (s.status === 'success')
                    return `✔️  Installed dependencies in ${s.dir}`;
                if (s.status === 'fail')
                    return `❌ Error installing dependencies in ${s.dir}\n${s.error}`;
                return '';
            })
            .join('\n'),
    );
}

render();

let finished = 0;

pluginDirs.forEach((dir, idx) => {
    const proc = spawn('yarn', ['install'], {
        cwd: dir,
        stdio: [
            'ignore',
            'pipe',
            'pipe',
        ],
    });
    let errorOutput = '';
    proc.stdout.on('data', () => {}); // ignore normal output
    proc.stderr.on('data', (data) => {
        errorOutput += data.toString();
    });
    proc.on('close', (code: number | null) => {
        if (code === 0) {
            statuses[idx].status = 'success';
        } else {
            statuses[idx].status = 'fail';
            statuses[idx].error = errorOutput.trim() || '(no error output)';
        }
        finished++;
        render();
        if (finished === pluginDirs.length) {
            logUpdate.done();
            console.log('\nAll plugin dependencies installed.');
        }
    });
});
