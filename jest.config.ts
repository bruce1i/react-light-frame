import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/test/__setups__/jest-dom-setup.ts"],
  moduleNameMapper: {
    // mocks
    "\\.(css|scss)$": "<rootDir>/test/__mocks__/style-mock.ts",
    // alias
    "@/(.*)": "<rootDir>/src/$1",
  },
};

export default config;
