"use strict";

/** @module common */
require('common', function (require, module, exports) {
  var _ = function _() {
    return '';
  };

  "use strict";

  module.exports = {
    readonly: readonly
  };
  /**
   * Ajouter une ou plusieurs propriétés en lecture seule à un objet.
   *
   * @param {object} target - Objet auquel on veut ajouter une propriété.
   * @param {string} name - Nom de la propriété ou dictionnaires de noms/valeurs.
   * @param {any|function} value - Valeur de la propriété. Si c'est une fonction,
   * elle sera évaluée à chaque fois que la propriété sera lue.
   * @return {undefined}
   */

  function readonly(target, name, value) {
    if (typeof name !== 'string') {
      Object.keys(name).forEach(function (key) {
        readonly(target, key, name[key]);
      });
      return;
    }

    if (typeof value === 'function') {
      Object.defineProperty(target, name, {
        get: value,
        set: function set() {
          /* Ecriture interdite. */
        },
        configurable: false,
        enumerable: true
      });
    } else {
      Object.defineProperty(target, name, {
        value: value,
        writable: false,
        configurable: false,
        enumerable: true
      });
    }
  }

  module.exports._ = _;
});
//# sourceMappingURL=common.js.map