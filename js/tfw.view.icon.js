"use strict";

/** @module tfw.view.icon */
require('tfw.view.icon', function (require, module, exports) {
  var _ = function () {
    var D = {
      "en": {},
      "fr": {}
    },
        X = require("$").intl;

    function _() {
      return X(D, arguments);
    }

    _.all = D;
    return _;
  }();

  "use strict";

  require("polyfill.object.values");

  var $ = require("dom"),
      Icons = require("tfw.icons"); // Code behind to use in the XJS.


  var CODE_BEHIND = {
    onContentChanged: onContentChanged,
    onPen0Changed: function onPen0Changed(v) {
      updatePen.call(this, 0, v);
    },
    onPen1Changed: function onPen1Changed(v) {
      updatePen.call(this, 1, v);
    },
    onPen2Changed: function onPen2Changed(v) {
      updatePen.call(this, 2, v);
    },
    onPen3Changed: function onPen3Changed(v) {
      updatePen.call(this, 3, v);
    },
    onPen4Changed: function onPen4Changed(v) {
      updatePen.call(this, 4, v);
    },
    onPen5Changed: function onPen5Changed(v) {
      updatePen.call(this, 5, v);
    },
    onPen6Changed: function onPen6Changed(v) {
      updatePen.call(this, 6, v);
    },
    onPen7Changed: function onPen7Changed(v) {
      updatePen.call(this, 7, v);
    }
  };
  /**
   * Create SVG icon from `content`
   *
   * @this ViewXJS
   * @param   {object|string} contentStringOrObject - Can be an icon name or a SVG description.
   * @returns {undefined}
   */

  function onContentChanged(contentStringOrObject) {
    try {
      var isString = typeof contentStringOrObject === 'string',
          content = isString ? Icons.iconsBook[contentStringOrObject] : contentStringOrObject;
      this._content = createSvgFromDefinition.call(this, content);
      if (!this._content) return;
      $.clear(this, this._content.svgRootGroup); // Update pens' colors.

      var _arr = [0, 1, 2, 3, 4, 5, 6, 7];

      for (var _i = 0; _i < _arr.length; _i++) {
        var penIndex = _arr[_i];
        updatePen.call(this, penIndex, this["pen".concat(penIndex)]);
      }

      this.$.style.display = "";
    } catch (ex) {
      this.$.style.display = "none";
      if (this.content !== '') this.content = '';
    }
  } // Special colors.
  // 0 is black,  1 is white, P  is primary, S is secondary,  L is light
  // and D is dark.


  var FILL_COLORS_TO_CLASSES = {
    '0': "thm-svg-fill0",
    '1': "thm-svg-fill1",
    P: "thm-svg-fill-P",
    PL: "thm-svg-fill-PL",
    PD: "thm-svg-fill-PD",
    S: "thm-svg-fill-S",
    SL: "thm-svg-fill-SL",
    SD: "thm-svg-fill-SD"
  },
      STROKE_COLORS_TO_CLASSES = {
    '0': "thm-svg-stroke0",
    '1': "thm-svg-stroke1",
    P: "thm-svg-stroke-P",
    PL: "thm-svg-stroke-PL",
    PD: "thm-svg-stroke-PD",
    S: "thm-svg-stroke-S",
    SL: "thm-svg-stroke-SL",
    SD: "thm-svg-stroke-SD"
  };

  function createSvgFromDefinition(def) {
    var svgParent = $.svg('g', {
      'stroke-width': 6,
      fill: "none",
      'stroke-linecap': 'round',
      'stroke-linejoin': 'round'
    }); // Store elements with special colors  in order to update them later
    // if needed. We can have up to 8 colors numbered from 0 to 7.

    var elementsToFillPerColor = [[], [], [], [], [], [], [], []];
    var elementsToStrokePerColor = [[], [], [], [], [], [], [], []];
    var svgRootGroup = addChild(this.$, elementsToFillPerColor, elementsToStrokePerColor, def);
    if (!svgRootGroup) return null;
    $.att(svgRootGroup, {
      'stroke-width': 6,
      fill: "none",
      'stroke-linecap': 'round',
      'stroke-linejoin': 'round'
    });
    return {
      svgRootGroup: svgRootGroup,
      elementsToFillPerColor: elementsToFillPerColor,
      elementsToStrokePerColor: elementsToStrokePerColor
    };
  }
  /**
   * @param {Node} parent - SVG element into append elements created from `def`.
   * @param {string} def - Text to add to the `parent`.
   * @param {array} def - SVG node to add to `parent`.
   * @param {string} def[0] - Tag name of then SVG node to add to `parent`.
   * @param {array} def[>0] - Definition of the children.
   * @param {object} def[>0] - Attributes of the element.
   */


  function addChild(parent, elementsToFillPerColor, elementsToStrokePerColor, def) {
    if (typeof def === 'string') return $.add(parent, def);
    if (!checkDefinitionSyntax(def)) return null;
    var elementName = def[0];
    var element = $.svg(elementName);
    def.forEach(function (childItem, index) {
      if (index === 0) return;

      if (Array.isArray(childItem)) {
        childItem.forEach(addChild.bind(null, element, elementsToFillPerColor, elementsToStrokePerColor));
      } else {
        setAttributesAndRegisterElementsWithSpecialColors(element, elementsToFillPerColor, elementsToStrokePerColor, childItem);
      }
    });
    $.add(parent, element);
    return element;
  }

  function setAttributesAndRegisterElementsWithSpecialColors(node, elementsToFillPerColor, elementsToStrokePerColor, attribs) {
    var attName, attValue, valueAsIndex, elementsPerColor;

    for (attName in attribs) {
      attValue = attribs[attName];

      if (attName === 'fill' || attName === 'stroke') {
        valueAsIndex = parseInt(attValue);

        if (isNaN(valueAsIndex)) {
          // Straigth attribute.
          $.att(node, attName, attValue);
        } else {
          elementsPerColor = attName === 'fill' ? elementsToFillPerColor : elementsToStrokePerColor;
          valueAsIndex = clamp(valueAsIndex, 0, elementsPerColor.length - 1);
          elementsPerColor[valueAsIndex].push(node);
        }
      } else {
        $.att(node, attName, attValue);
      }
    }
  }

  function checkDefinitionSyntax(def) {
    if (typeof def === 'undefined') return false;

    if (!Array.isArray(def)) {
      throw "Definition of SVG elements must be arrays!\n" + JSON.stringify(def);
    }

    var svgElementTagName = def[0];
    if (typeof svgElementTagName !== 'string') throw "The first item of a SVG element must be a string!\n" + svgElementTagName;
    return true;
  }
  /**
   * Update the color of a pen.
   *
   * @this ViewXJS
   * @param   {integer} penIndex - The index of the pen.
   * @param   {string} penColor - The new color of this pen.
   * @returns {undefined}
   */


  function updatePen(penIndex) {
    var penColor = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "0";
    if (!this._content) return;
    var elementsToFill = this._content.elementsToFillPerColor[penIndex];
    if (!Array.isArray(elementsToFill)) elementsToFill = [];
    var elementsToStroke = this._content.elementsToStrokePerColor[penIndex];
    if (!Array.isArray(elementsToStroke)) elementsToStroke = [];
    updateColor(elementsToFill, elementsToStroke, penColor);
  }

  function updateColor(elementsToFill, elementsToStroke, color) {
    updateColorForType("fill", elementsToFill, FILL_COLORS_TO_CLASSES, color);
    updateColorForType("stroke", elementsToStroke, STROKE_COLORS_TO_CLASSES, color);
  }

  function updateColorForType(attName, elements, classes, color) {
    var className = classes[color];
    elements.forEach(function (element) {
      Object.values(classes).forEach(function (classNameToRemove) {
        $.removeClass(element, classNameToRemove);
      });
    });

    if (typeof className === 'undefined') {
      elements.forEach(function (element) {
        $.att(element, attName, color);
      });
    } else {
      elements.forEach(function (element) {
        $.addClass(element, className);
        $.removeAtt(element, attName);
      });
    }
  }

  function clamp(value, min, max) {
    if (value < min) return min;
    if (value > max) return max;
    return value;
  } //===============================
  // XJS:View autogenerated code.


  try {
    module.exports = function () {
      //--------------------
      // Dependent modules.
      var $ = require('dom');

      var PM = require('tfw.binding.property-manager');

      var Tag = require('tfw.view').Tag;

      var Link = require('tfw.binding.link');

      var View = require('tfw.view');

      ;

      var Converters = require('tfw.binding.converters'); //-------------------------------------------------------
      // Check if needed functions are defined in code behind.


      View.ensureCodeBehind(CODE_BEHIND, "onContentChanged", "onPen0Changed", "onPen1Changed", "onPen2Changed", "onPen3Changed", "onPen4Changed", "onPen6Changed", "onPen7Changed"); //-------------------
      // Global functions.

      function defVal(args, attName, attValue) {
        return args[attName] === undefined ? attValue : args[attName];
      }

      ;

      function addClassIfFalse(element, className, value) {
        if (value) $.removeClass(element, className);else $.addClass(element, className);
      }

      ;
      ;

      function addClassIfTrue(element, className, value) {
        if (value) $.addClass(element, className);else $.removeClass(element, className);
      }

      ;
      ; //-------------------
      // Global variables.

      var conv_boolean = Converters.get('boolean');
      var conv_unit = Converters.get('unit');
      var conv_string = Converters.get('string'); //-------------------
      // Class definition.

      var ViewClass = function ViewClass(args) {
        try {
          if (typeof args === 'undefined') args = {};
          this.$elements = {};
          var that = this;
          var pm = PM(this); //--------------------
          // Create attributes.

          pm.create("visible", {
            cast: conv_boolean
          });
          pm.create("content");
          pm.create("size", {
            cast: conv_unit
          });
          pm.create("animate", {
            cast: conv_boolean
          });
          pm.create("flipH", {
            cast: conv_boolean
          });
          pm.create("flipV", {
            cast: conv_boolean
          });
          pm.create("pen0", {
            cast: conv_string
          });
          pm.create("pen1", {
            cast: conv_string
          });
          pm.create("pen2", {
            cast: conv_string
          });
          pm.create("pen3", {
            cast: conv_string
          });
          pm.create("pen4", {
            cast: conv_string
          });
          pm.create("pen5", {
            cast: conv_string
          });
          pm.create("pen6", {
            cast: conv_string
          });
          pm.create("pen7", {
            cast: conv_string
          }); //------------------
          // Create elements.

          var e_ = new Tag('SVG', ["class", "width", "height", "viewBox", "preserveAspectRatio"]); //-----------------------
          // Declare root element.

          Object.defineProperty(this, '$', {
            value: e_.$,
            writable: false,
            enumerable: false,
            configurable: false
          }); //-------
          // Links

          new Link({
            A: {
              obj: that,
              name: 'visible'
            },
            B: {
              action: function action(v) {
                addClassIfFalse(e_, "hide", v);
              }
            },
            name: "visible > undefined"
          });
          new Link({
            A: {
              obj: that,
              name: 'animate'
            },
            B: {
              action: function action(v) {
                addClassIfTrue(e_, "animate", v);
              }
            },
            name: "animate > undefined"
          });
          new Link({
            A: {
              obj: that,
              name: 'flipH'
            },
            B: {
              action: function action(v) {
                addClassIfTrue(e_, "flipH", v);
              }
            },
            name: "flip-h > undefined"
          });
          new Link({
            A: {
              obj: that,
              name: 'flipV'
            },
            B: {
              action: function action(v) {
                addClassIfTrue(e_, "flipV", v);
              }
            },
            name: "flip-v > undefined"
          }); //-----------------------
          // On attribute changed.

          pm.on("content", function (v) {
            try {
              CODE_BEHIND.onContentChanged.call(that, v);
            } catch (ex) {
              console.error('Exception in function behind "onContentChanged" of module "mod/tfw.view.icon.js" for attribute "content"!');
              console.error(ex);
            }
          });
          pm.on("pen0", function (v) {
            try {
              CODE_BEHIND.onPen0Changed.call(that, v);
            } catch (ex) {
              console.error('Exception in function behind "onPen0Changed" of module "mod/tfw.view.icon.js" for attribute "pen0"!');
              console.error(ex);
            }
          });
          pm.on("pen1", function (v) {
            try {
              CODE_BEHIND.onPen1Changed.call(that, v);
            } catch (ex) {
              console.error('Exception in function behind "onPen1Changed" of module "mod/tfw.view.icon.js" for attribute "pen1"!');
              console.error(ex);
            }
          });
          pm.on("pen2", function (v) {
            try {
              CODE_BEHIND.onPen2Changed.call(that, v);
            } catch (ex) {
              console.error('Exception in function behind "onPen2Changed" of module "mod/tfw.view.icon.js" for attribute "pen2"!');
              console.error(ex);
            }
          });
          pm.on("pen3", function (v) {
            try {
              CODE_BEHIND.onPen3Changed.call(that, v);
            } catch (ex) {
              console.error('Exception in function behind "onPen3Changed" of module "mod/tfw.view.icon.js" for attribute "pen3"!');
              console.error(ex);
            }
          });
          pm.on("pen4", function (v) {
            try {
              CODE_BEHIND.onPen3Changed.call(that, v);
            } catch (ex) {
              console.error('Exception in function behind "onPen3Changed" of module "mod/tfw.view.icon.js" for attribute "pen4"!');
              console.error(ex);
            }
          });
          pm.on("pen5", function (v) {
            try {
              CODE_BEHIND.onPen4Changed.call(that, v);
            } catch (ex) {
              console.error('Exception in function behind "onPen4Changed" of module "mod/tfw.view.icon.js" for attribute "pen5"!');
              console.error(ex);
            }
          });
          pm.on("pen6", function (v) {
            try {
              CODE_BEHIND.onPen6Changed.call(that, v);
            } catch (ex) {
              console.error('Exception in function behind "onPen6Changed" of module "mod/tfw.view.icon.js" for attribute "pen6"!');
              console.error(ex);
            }
          });
          pm.on("pen7", function (v) {
            try {
              CODE_BEHIND.onPen7Changed.call(that, v);
            } catch (ex) {
              console.error('Exception in function behind "onPen7Changed" of module "mod/tfw.view.icon.js" for attribute "pen7"!');
              console.error(ex);
            }
          });
          pm.on("size", function (v) {
            e_.$.style["width"] = v;
          });
          pm.on("size", function (v) {
            e_.$.style["height"] = v;
          }); //----------------------
          // Initialize elements.

          e_.class = "tfw-view-icon";
          e_.width = "100%";
          e_.height = "100%";
          e_.viewBox = "-65 -65 130 130";
          e_.preserveAspectRatio = "xMidYMid meet"; //------------------------
          // Initialize attributes.

          pm.set("visible", defVal(args, "visible", true));
          pm.set("content", defVal(args, "content", ""));
          pm.set("size", defVal(args, "size", 28));
          pm.set("animate", defVal(args, "animate", false));
          pm.set("flipH", defVal(args, "flipH", false));
          pm.set("flipV", defVal(args, "flipV", false));
          pm.set("pen0", defVal(args, "pen0", 0));
          pm.set("pen1", defVal(args, "pen1", 1));
          pm.set("pen2", defVal(args, "pen2", "P"));
          pm.set("pen3", defVal(args, "pen3", "PD"));
          pm.set("pen4", defVal(args, "pen4", "PL"));
          pm.set("pen5", defVal(args, "pen5", "S"));
          pm.set("pen6", defVal(args, "pen6", "SD"));
          pm.set("pen7", defVal(args, "pen7", "SL"));
          pm.fire("visible");
          pm.fire("content");
          pm.fire("size");
          pm.fire("animate");
          pm.fire("flipH");
          pm.fire("flipV");
          pm.fire("pen0");
          pm.fire("pen1");
          pm.fire("pen2");
          pm.fire("pen3");
          pm.fire("pen4");
          pm.fire("pen5");
          pm.fire("pen6");
          pm.fire("pen7");
          $.addClass(this, 'view', 'custom');
        } catch (ex) {
          console.error('mod/tfw.view.icon.js', ex);
          throw Error('Instantiation error in XJS of "mod/tfw.view.icon.js":\n' + ex);
        }
      };

      return ViewClass;
    }();
  } catch (ex) {
    throw Error('Definition error in XJS of "mod/tfw.view.icon.js"\n' + ex);
  }

  module.exports._ = _;
});
//# sourceMappingURL=tfw.view.icon.js.map