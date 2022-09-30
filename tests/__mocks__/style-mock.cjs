const proxy = new Proxy(
  {},
  {
    get: function getter(target, key) {
      switch (key) {
        case "__esModule":
          return true;
        case "default":
          return proxy;
        default:
          return key;
      }
    },
  },
);

// eslint-disable-next-line no-undef
module.exports = proxy;
