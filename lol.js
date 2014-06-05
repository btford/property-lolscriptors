// i regret nothing
module.exports = function patch () {
  var _defineProperty = Object.defineProperty;
  var _getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

  Object.defineProperty = function (obj, prop, desc) {
    if (isUnconfigurable(obj, prop)) {
      throw new TypeError('Cannot assign to read only property \'' + prop + '\' of ' + obj);
    }
    return rewriteDescriptor(obj, prop, desc);
  };

  Object.getOwnPropertyDescriptor = function (obj, prop) {
    var desc = _getOwnPropertyDescriptor(obj, prop);
    if (isUnconfigurable(obj, prop)) {
      desc.configurable = false;
    }
    return desc;
  };

  Object._redefineProperty = function (obj, prop, desc) {
    return rewriteDescriptor(obj, prop, desc);
  };
};

function isUnconfigurable (obj, prop) {
  return obj && obj.__unconfigurables && obj.__unconfigurables[prop];
}

function rewriteDescriptor (obj, prop, desc) {
  if (!desc.configurable) {
    desc.configurable = true;
    if (!obj.__unconfigurables) {
      _defineProperty(obj, '__unconfigurables', {
        value: {}
      });
    }
    obj.__unconfigurables[prop] = true;
  }
  return _defineProperty(obj, prop, desc);
}
