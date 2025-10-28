#!/usr/bin/env node

/**
 * Watch and Deploy Script for Dive Development
 *
 * Watches for changes in src/ and automatically rebuilds and deploys via yalc
 */

import { watch } from 'chokidar';
import { exec } from 'child_process';
import { promisify } from 'util';
import path from 'path';
import { fileURLToPath } from 'url';

const execAsync = promisify(exec);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const WATCH_PATTERNS = [
    'src/**/*.ts',
    'src/**/*.js',
    'src/**/*.json'
];

const IGNORE_PATTERNS = [
    '**/node_modules/**',
    '**/build/**',
    '**/*.test.ts',
    '**/*.spec.ts',
    '**/__test__/**'
];

const YALC_ARGS = process.argv[2] || '';
const DEBOUNCE_DELAY = 1000; // 1 second debounce

// Colors for console output
const colors = {
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    magenta: '\x1b[35m',
    cyan: '\x1b[36m',
    reset: '\x1b[0m'
};

let isBuilding = false;
let buildTimeout = null;
let yalcChecked = false; // Track if yalc was already checked

function log(message, color = 'reset') {
    const timestamp = new Date().toLocaleTimeString();
    console.log(`${colors[color]}[${timestamp}] ${message}${colors.reset}`);
}

// Check if yalc is installed at startup
async function checkYalcInstalled() {
    if (yalcChecked) return true;

    try {
        await execAsync('which yalc');
        yalcChecked = true;
        return true;
    } catch (error) {
        return false;
    }
}

async function buildAndDeploy() {
    if (isBuilding) {
        log('⏳ Build already in progress, cancelling and restarting...', 'yellow');
        // Kill the current build process
        if (currentBuildProcess) {
            currentBuildProcess.kill('SIGTERM');
            currentBuildProcess = null;
        }
        // Wait a moment for the process to terminate
        await new Promise(resolve => setTimeout(resolve, 100));
    }

    isBuilding = true;
    let currentBuildProcess = null;

    try {
        log('🔨 Starting build and deploy...', 'blue');

        // Run the build command
        const buildPromise = execAsync('yarn build:dev');
        currentBuildProcess = buildPromise.child;
        const { stdout, stderr } = await buildPromise;

        if (stderr && !stderr.includes('warning')) {
            log(`⚠️  Build warnings: ${stderr}`, 'yellow');
        }

        // Run yalc push
        log('📦 Publishing to yalc...', 'blue');
        const yalcPromise = execAsync(`yalc push ${YALC_ARGS}`);
        currentBuildProcess = yalcPromise.child;
        await yalcPromise;

        log('✅ Build and deploy completed successfully!', 'green');

    } catch (error) {
        // Check if the error is due to process termination (cancellation)
        if (error.signal === 'SIGTERM' || error.code === 'SIGTERM') {
            log('🛑 Build cancelled, restarting with latest changes...', 'cyan');
            return; // Don't log as error, just restart
        }

        log(`❌ Build failed: ${error.message}`, 'red');
        if (error.stdout) {
            log(`Build output: ${error.stdout}`, 'red');
        }
        if (error.stderr) {
            log(`Build errors: ${error.stderr}`, 'red');
        }
    } finally {
        isBuilding = false;
        currentBuildProcess = null;
    }
}

function debouncedBuild() {
    if (buildTimeout) {
        clearTimeout(buildTimeout);
    }

    buildTimeout = setTimeout(() => {
        buildAndDeploy();
    }, DEBOUNCE_DELAY);
}

async function main() {
    // Check yalc at startup
    if (!await checkYalcInstalled()) {
        log('', 'reset');
        log('⚠️  WARNING: yalc is not installed!', 'yellow');
        log('', 'reset');
        log('To use yarn dev, please install yalc globally:', 'yellow');
        log('  npm install -g yalc', 'cyan');
        log('  or', 'yellow');
        log('  yarn global add yalc', 'cyan');
        log('', 'reset');
        log('The watcher will continue, but deployments will fail.', 'yellow');
        log('Press Ctrl+C to exit.', 'yellow');
        log('', 'reset');
    }

    log('🚀 Starting Dive Watch and Deploy', 'cyan');
    log(`📁 Watching: ${WATCH_PATTERNS.join(', ')}`, 'blue');
    log(`🚫 Ignoring: ${IGNORE_PATTERNS.join(', ')}`, 'blue');
    if (YALC_ARGS) {
        log(`🎯 Yalc args: ${YALC_ARGS}`, 'blue');
    }
    log('', 'reset');

    // Initial build
    buildAndDeploy();

    // Set up file watcher
    const watcher = watch(WATCH_PATTERNS, {
        ignored: IGNORE_PATTERNS,
        persistent: true,
        ignoreInitial: true
    });

    watcher
        .on('add', (path) => {
            log(`📄 File added: ${path}`, 'magenta');
            debouncedBuild();
        })
        .on('change', (path) => {
            log(`📝 File changed: ${path}`, 'magenta');
            debouncedBuild();
        })
        .on('unlink', (path) => {
            log(`🗑️  File removed: ${path}`, 'magenta');
            debouncedBuild();
        })
        .on('error', (error) => {
            log(`❌ Watcher error: ${error}`, 'red');
        });

    // Handle graceful shutdown
    process.on('SIGINT', () => {
        log('👋 Shutting down watcher...', 'yellow');
        watcher.close();
        if (buildTimeout) {
            clearTimeout(buildTimeout);
        }
        process.exit(0);
    });

    log('👀 Watching for changes... (Press Ctrl+C to stop)', 'green');
}

main();
