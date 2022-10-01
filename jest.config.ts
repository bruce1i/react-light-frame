import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/tests/__setups__/jest-dom-setup.ts"],
  snapshotResolver: "<rootDir>/tests/__others__/snapshot-resolver.ts",
  moduleNameMapper: {
    // mocks
    "\\.(css|scss)$": "<rootDir>/tests/__mocks__/style-mock.cjs",
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "<rootDir>/tests/__mocks__/file-mock.ts",
    // alias
    "@/(.*)": "<rootDir>/src/$1",
  },
};

export default config;
