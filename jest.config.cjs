module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    coverageThreshold: {
        global: {
            branches: 98,
            functions: 98,
            lines: 98,
            statements: 98,
        },
    },
};
