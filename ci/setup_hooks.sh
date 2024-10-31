#!/bin/bash

# Copy the pre-commit hook to the .git/hooks directory
cp ci/hooks/pre-commit .git/hooks/pre-commit
chmod +x .git/hooks/pre-commit

echo "Pre-commit hook installed."