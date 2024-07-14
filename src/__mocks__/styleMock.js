export default new Proxy(
  {},
  {
    get: function getter(target, key) {
      return key
    },
  }
)
