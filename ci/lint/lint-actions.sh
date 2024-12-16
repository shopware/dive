#!/usr/bin/env bash

# Define the path to the folder you want to check
FOLDER_TO_CHECK="src/com/actions"

echo -e "Checking if Actions have changed..."

if git diff --cached --name-only | grep -q "^$FOLDER_TO_CHECK/"; then
    echo -e "Actions have changed! Linting action interfaces..."

    yarn lint:actions:transpile > /dev/null
    LINT_OUTPUT=$(yarn lint:actions:check 2>&1)

    if [ $? -ne 0 ]; then
        echo -e "\nACTION LINTING FAILED\n"
        echo "$LINT_OUTPUT"
        echo -e "\nPlease go to listed files and fix them before comitting."
        yarn lint:actions:cleanup > /dev/null
        exit 1
    fi
    yarn lint:actions:cleanup > /dev/null
    echo -e "All interfaces contain the required properties."
else
    echo -e "No changes in Actions. Skipping linting."
fi

exit 0