module.exports = {
  setupFiles: [
    "<rootDir>/tests/dotenv-config.js"
  ],
  testEnvironment: 'node',
  collectCoverageFrom: ['src/**/*.js', '!src/*.js'],
  moduleDirectories: [
    // look into node_modules dir first:
    "node_modules",
    // then look into this dir, which makes this dir the start of the absolute path (example import: `import { titleToSlug } from "src/utils"`)
    "src/",
  ],
};
