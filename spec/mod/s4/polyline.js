"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/** @module s4/polyline */
require('s4/polyline', function (require, module, exports) {
  var _ = function _() {
    return '';
  };

  "use strict";

  var _require = require("common"),
      readonly = _require.readonly;

  var IDX_X00 = 0,
      IDX_Y00 = 1,
      IDX_Z00 = 2,
      IDX_U00 = 3,
      IDX_X01 = 4,
      IDX_Y01 = 5,
      IDX_Z01 = 6,
      IDX_U01 = 7,
      IDX_X10 = 8,
      IDX_Y10 = 9,
      IDX_Z10 = 10,
      IDX_U10 = 11,
      IDX_X11 = 12,
      IDX_Y11 = 13,
      IDX_Z11 = 14,
      IDX_U11 = 15,
      // Taille en mémoire d'un segment.
  BLOCK_SIZE = 16,
      // Nombre maximal de segments. Si on ajoute un 129ème segment, le plus ancien est supprimé.
  DEFAULT_CAPACITY = 128;

  var Polyline =
  /*#__PURE__*/
  function () {
    /**
     * @param {float} x - Abscisse du premier point.
     * @param {float} y - Ordonnée du premier point.
     * @param {int} capacity - Nombre maximal de points.
     */
    function Polyline(x, y) {
      var capacity = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : DEFAULT_CAPACITY;

      _classCallCheck(this, Polyline);

      var arr = new Float32Array(capacity * BLOCK_SIZE);
      var that = this;
      arr[IDX_X00] = x;
      arr[IDX_Y00] = y;
      arr[IDX_Z00] = 0;
      arr[IDX_U00] = 0;
      arr[IDX_X01] = x;
      arr[IDX_Y01] = y;
      arr[IDX_Z01] = 1;
      arr[IDX_U01] = 0;
      arr[IDX_X10] = x;
      arr[IDX_Y10] = y;
      arr[IDX_Z10] = 0;
      arr[IDX_U10] = 0;
      arr[IDX_X11] = x;
      arr[IDX_Y11] = y;
      arr[IDX_Z11] = 1;
      arr[IDX_U11] = 0;
      this._arr = arr;
      this._start = 0;
      this._length = BLOCK_SIZE;
      this._capacity = arr.length;
      readonly(this, {
        data: function data() {
          return _arr;
        },
        length: function length() {
          // Diviser par deux.
          return that._length;
        },
        firstX: function firstX() {
          return that._arr[that._start + IDX_X00];
        },
        firstY: function firstY() {
          return that._arr[that._start + IDX_Y00];
        },
        lastX: function lastX() {
          var idx = that._length - BLOCK_SIZE + that._start;
          return that._arr[(idx + IDX_X00) % that._capacity];
        },
        lastY: function lastY() {
          var idx = that._length - BLOCK_SIZE + that._start;
          return that._arr[(idx + IDX_Y00) % that._capacity];
        }
      });
    }
    /**
     * @param {function} callback - Fonction appelée pour chaque point de la fin d'un segment.
     * Les argument passés à la `callback` sont `(x, y)`.
     */


    _createClass(Polyline, [{
      key: "foreachTail",
      value: function foreachTail(callback) {
        var arr = this._arr,
            cap = this._capacity,
            len = this._length;

        for (var k = 0; k < len; k += BLOCK_SIZE) {
          var index = (k + this._start) % cap;
          callback(arr[index + IDX_X10], arr[index + IDX_Y10]);
        }
      }
      /**
       * Déplace le point libre du dernier pan de mur.
       * @param {float} dx - Valeur à ajouter à l'abscisse.
       * @param {float} dy - Valeur à ajouter à l'ordonnée.
       */

    }, {
      key: "move",
      value: function move(dx, dy) {
        var len = this._length - BLOCK_SIZE,
            index = (this._start + len) % this._capacity;
        this._arr[index + IDX_X10] += dx;
        this._arr[index + IDX_X11] = this._arr[index + IDX_X10];
        this._arr[index + IDX_Y10] += dy;
        this._arr[index + IDX_Y11] = this._arr[index + IDX_Y10];
        var segmentLength = Math.max(this._arr[index + IDX_X10] - this._arr[index + IDX_X00], this._arr[index + IDX_Y10] - this._arr[index + IDX_Y00]);
        this._arr[index + IDX_Z10] = 0;
        this._arr[index + IDX_Z11] = 0;
        this._arr[index + IDX_U10] = this._arr[index + IDX_U00] + segmentLength;
        this._arr[index + IDX_U11] = this._arr[index + IDX_U10];
      }
      /**
       * Ajoute un nouveau segment de mur.
       * Pour commencer, il aura une taille nulle.
       */

    }, {
      key: "add",
      value: function add() {
        var len = this._length - BLOCK_SIZE,
            index = (this._start + len) % this._capacity,
            arr = this._arr,
            x = arr[index + IDX_X10],
            y = arr[index + IDX_Y10],
            u = arr[index + IDX_U10];
        var nextIndex;

        if (len < this._capacity) {
          nextIndex = (index + BLOCK_SIZE) % this._capacity;
          this._length += BLOCK_SIZE;
        } else {
          // Le buffer est plein, on écrase le plus ancien point.
          nextIndex = this._start;
          this._start = (this._start + BLOCK_SIZE) % this._capacity;
        }

        arr[nextIndex + IDX_X00] = arr[nextIndex + IDX_X10] = x;
        arr[nextIndex + IDX_Y00] = arr[nextIndex + IDX_Y10] = y;
        arr[nextIndex + IDX_U00] = arr[nextIndex + IDX_U10] = u;
        arr[nextIndex + IDX_Z00] = arr[nextIndex + IDX_Z10] = 0;
        arr[nextIndex + IDX_Z01] = arr[nextIndex + IDX_Z11] = 1;
      }
    }, {
      key: "collide",
      value: function collide(x0, y0, x1, y1) {
        if (x0 === x1) return collideVertical.call(this, x0, y0, y1);
        return collideHorizontal.call(this, y0, x0, x1);
      }
    }]);

    return Polyline;
  }();

  module.exports = Polyline;
  /**
   * On recherche une collision entre un segment vertical et au moins un des murs horizontaux.
   * @this Polyline
   */

  function collideVertical(x, _y0, _y1) {
    if (_y0 === _y1) {
      // L'objet qui veut tester la collision est immobile.
      return false;
    }

    var arr = this._arr,
        cap = this._capacity,
        offset = startsWithHorizontalSegment(this) ? 0 : BLOCK_SIZE,
        y0 = Math.min(_y0, _y1),
        y1 = Math.max(_y0, _y1);

    for (var k = offset; k < this._length; k += BLOCK_SIZE + BLOCK_SIZE) {
      // On ne teste que les segments horizonzaux de murs.
      var idx = (k + this._start) % cap,
          xx0 = arr[idx + IDX_X00],
          xx1 = arr[idx + IDX_X10],
          // Inutile de lire Y  pour les deux extrémités du segment : ce  sont les mêmes pour un
      // segment horizontal.
      yy = arr[idx + IDX_Y00];

      if (xx0 === xx1) {
        // Ce mur est réduit à un point. On peut donc arrêter les tests.
        break;
      }

      var xMin = Math.min(xx0, xx1),
          xMax = Math.max(xx0, xx1);
      if (x <= xMin || x >= xMax) continue;
      if (yy < y0 || yy > y1) continue;
      return true;
    }

    return false;
  }
  /**
   * On recherche une collision entre un segment horizontal et au moins un des murs verticaux.
   * @this Polyline
   */


  function collideHorizontal(y, _x0, _x1) {
    if (_x0 === _x1) {
      // L'objet qui veut tester la collision est immobile.
      return false;
    }

    var arr = this._arr,
        cap = this._capacity,
        offset = startsWithHorizontalSegment(this) ? BLOCK_SIZE : 0,
        x0 = Math.min(_x0, _x1),
        x1 = Math.max(_x0, _x1);

    for (var k = offset; k < this._length; k += BLOCK_SIZE + BLOCK_SIZE) {
      // On ne teste que les segments horizonzaux de murs.
      var idx = (k + this._start) % cap,
          yy0 = arr[idx + IDX_Y00],
          yy1 = arr[idx + IDX_Y10],
          // Inutile de lire X  pour les deux extrémités du segment : ce  sont les mêmes pour un
      // segment vertical.
      xx = arr[idx + IDX_X00];

      if (yy0 === yy1) {
        // Ce mur est réduit à un point. On peut donc arrêter les tests.
        break;
      }

      var yMin = Math.min(yy0, yy1),
          yMax = Math.max(yy0, yy1);
      if (y <= yMin || y >= yMax) continue;
      if (xx < x0 || xx > x1) continue;
      return true;
    }

    return false;
  }

  function startsWithHorizontalSegment(polyline) {
    var idx = polyline._start,
        arr = polyline._arr;
    return arr[idx + IDX_X00] !== arr[idx + IDX_X10];
  }

  module.exports._ = _;
});