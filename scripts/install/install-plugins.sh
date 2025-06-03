#!/bin/bash

# Get the root directory of the project
ROOT_DIR=$(cd "$(dirname "${BASH_SOURCE[0]}")/../../" && pwd)

# Find all subdirectories in src/modules
MODULES_DIR="$ROOT_DIR/src/modules"

# Loop through each module directory and run yarn install
for module_path in "$MODULES_DIR"/*/
do
    if [ -d "$module_path" ] && [ -f "${module_path}package.json" ]; then
        echo "Installing dependencies in $module_path"
        (cd "$module_path" && yarn install)
    elif [ -d "$module_path" ]; then
        echo "No package.json found in $module_path. Skipping yarn install."
    fi
done

echo "All module dependencies installed."
