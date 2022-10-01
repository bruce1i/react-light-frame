export default {
  // resolves from test to snapshot path
  resolveSnapshotPath: (testPath, extName) => testPath + extName,

  // resolves from snapshot to test path
  resolveTestPath: (snapshotPath, extName) => snapshotPath.slice(0, -extName.length),

  // Example test path, used for preflight consistency check of the implementation above
  testPathForConsistencyCheck: "some/example.test.js",
};
