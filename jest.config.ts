import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/tests/__configs__/jest-dom-setup.ts"],
  snapshotResolver: "<rootDir>/tests/__configs__/snapshot-resolver.ts",
  moduleNameMapper: {
    // mocks
    "\\.(css|scss)$": "jest-css-modules-proxy",
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "<rootDir>/tests/__configs__/file-mock.ts",
    // alias
    "@/(.*)": "<rootDir>/src/$1",
    "rlf-test-utils": "<rootDir>/tests/__utils__/index",
  },
  collectCoverageFrom: [
    "src/**",
    "!**/*.snap",
    "!src/*",
    "!src/menus/**",
    "!src/types/**",
    "!src/utils/index.ts",
  ],
};

export default config;
