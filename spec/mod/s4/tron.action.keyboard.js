"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/** @module s4/tron.action.keyboard */
require('s4/tron.action.keyboard', function (require, module, exports) {
  var _ = function _() {
    return '';
  };

  "use strict";

  module.exports = {
    create: create,
    RightKey: "ArrowRight",
    LeftKey: "ArrowLeft",
    AccelKey: " "
  };

  var _require = require("common"),
      readonly = _require.readonly;

  var Context = {
    isLoaded: false,
    rightPressed: false,
    leftPressed: false,
    accelPressed: false
  };

  var Keyboard =
  /*#__PURE__*/
  function () {
    function Keyboard() {
      _classCallCheck(this, Keyboard);

      readonly(this, {
        actionRight: function actionRight() {
          var isPressed = Context.rightPressed; // Quand une touche a été enfoncée, on la considère virtuellement
          // enfoncée tant qu'on n'a pas lu son état. Ensuite, même si elle
          // est physiquement toujours enfoncée, on la considère relâchées.

          Context.rightPressed = false;
          return isPressed;
        },
        actionLeft: function actionLeft() {
          var isPressed = Context.leftPressed;
          Context.leftPressed = false;
          return isPressed;
        },
        actionAccel: function actionAccel() {
          var isPressed = Context.accelPressed;
          Context.accelPressed = false;
          return isPressed;
        }
      });
      ensureKeysListenerIsAttached();
    }
    /**
     * Cette méthode est appellée  sur toutes les actions à chaque frame, mais  pour cette action il
     * n'y a rien à faire.
     */


    _createClass(Keyboard, [{
      key: "process",
      value: function process() {
        /* eslint class-methods-use-this: 0 */
        // Il n'y a rien à faire de particulier à chaque frame.
      }
    }]);

    return Keyboard;
  }();
  /**
   * @param {any} args - Arguments spécifiques aux actions à observer.
   * @return {Keyboard} Un objet gérant les actions provenant du clavier.
   */


  function create(args) {
    return new Keyboard(args);
  }
  /**
   * Si besoin, ajouter un Listener pour les touches du clavier.
   * @return {undefined}
   */


  function ensureKeysListenerIsAttached() {
    if (Context.isLoaded) return;
    Context.isLoaded = true;
    document.addEventListener("keydown", function (evt) {
      // Quand on garde une touche enfoncée, on peut activer le mode répétition
      // qui envoie plusieurs événements "keydown" consécutifs pour la même touche.
      // Si on ne tient pas compte de cela, on risque de tourner plusieurs fois à
      // angle droit simplement parce qu'on n'a pas relâché la touche.
      if (evt.repeat) return;

      switch (evt.key) {
        case module.exports.RightKey:
          Context.rightPressed = true;
          evt.preventDefault();
          break;

        case module.exports.LeftKey:
          Context.leftPressed = true;
          evt.preventDefault();
          break;

        case module.exports.AccelKey:
          Context.accelPressed = true;
          evt.preventDefault();
          break;

        default: // Rien à faire pour les autres touches.

      }
    }, true);
    document.addEventListener("keyup", function (evt) {
      switch (evt.key) {
        case Context.RightKey:
        case Context.LeftKey:
        case Context.AccelKey:
          evt.preventDefault();
          break;

        default: // Rien à faire pour les autres touches.

      }
    }, true);
  }

  module.exports._ = _;
});