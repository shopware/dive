module.exports = {
    preset: "ts-jest",
    testEnvironment: "jsdom",
    coverageThreshold: {
        global: {
          branches: 90,
          functions: 80,
          lines: 90,
          statements: 80,
        },
    },
};