# Testing and Quality Assurance

## Unit Tests

All relevant files are covered by Vitest tests. If you find any file that has not been covered
yet, feel free to add unit tests accordingly.

Use local mocks in each test file (`vi.mock(...)`) when a dependency needs to be isolated.
Prefer direct file-local mocks and prototype spies over shared mock helper modules.

## Code Formatting

DIVE uses Prettier as a preconfigured formatter.
