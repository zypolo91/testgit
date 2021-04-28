module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  verbose: true,
  roots: ["<rootDir>/tests/"],
  testURL: "http://localhost/",
  globals: {
    "ts-jest": {
      tsconfig: "tsconfig.json",
      isolatedModules: true,
    },
  },
  coveragePathIgnorePatterns: ["/node_modules/", "/tests/helpers/"],
  coverageDirectory: "./coverage/",
  collectCoverage: true,
};
