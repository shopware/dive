# Testing and Quality Assurance

## Unit Tests

All relevant files are covered by Jest tests. If you find any file that has not been covered yet,
feel free to add unit tests accordingly.

If there are any modules that have to be mocked (like `three`) you can create a given file in the
`__mocks__` folder in project root. Jest manages to mock modules with a given file with the modules
name as a file name (for example `three.ts`). Every export will be part of the modules mock. You
don't need to mock the module in your test anymore, you only extend the module mock.

If you have any other things from a module to import, you can simply create a folder structure and
place the mock file at the end of your structure. To understand better please take a look at the
`__mocks__` folder for yourself.

## Code Formatting

DIVE uses Prettier as a preconfigured formatter.
