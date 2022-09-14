const env = {
  API_DEMO: "https://www.demo.com",
};

if (process.env.NODE_ENV !== "production") {
  // Only runs in development and will be stripped in production builds.
  env.API_DEMO = "https://www.test-demo.com";
}

export default env;
