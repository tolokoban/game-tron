"use strict"

module.exports = { readonly };

function readonly(target, name, value) {
  Object.defineProperty( target, name, {
    value,
    writable: false,
    configurable: false,
    enumerable: true
  });
}
