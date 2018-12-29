"use strict";

/** @module tfw.view.button */
require('tfw.view.button', function (require, module, exports) {
  var _ = function () {
    var D = {
      "en": {
        "cancel": "Cancel",
        "close": "Close",
        "delete": "Delete",
        "edit": "Edit",
        "gotit": "Got it",
        "no": "No",
        "ok": "OK",
        "save": "Save",
        "yes": "Yes"
      },
      "fr": {
        "cancel": "Annuler",
        "close": "Fermer",
        "delete": "Supprimer",
        "edit": "Editer",
        "gotit": "J'ai compris",
        "no": "Non",
        "ok": "Valider",
        "save": "Sauver",
        "yes": "Oui"
      }
    },
        X = require("$").intl;

    function _() {
      return X(D, arguments);
    }

    _.all = D;
    return _;
  }();

  "use strict";

  var CODE_BEHIND = {
    getClasses: getClasses,
    getClassesForText: getClassesForText,
    onWidthChanged: onWidthChanged,
    onSmallChanged: onSmallChanged,
    onEnabledChanged: onEnabledChanged,
    onKeyUp: onKeyUp,
    on: on,
    fire: fire,
    init: init
  };

  var $ = require("dom"),
      PM = require("tfw.binding.property-manager"),
      Touchable = require("tfw.touchable");
  /**
   * Set a event listener to the button.
   * @this tfw.view.button
   * @param {function} slot - function to call when the button is tapped.
   * @returns {this} Set the function to call at any tap.
   */


  function on(slot) {
    PM(this).on("action", slot);
    return this;
  }
  /**
   * @this ViewXJS
   * @param {number} v - New width.
   * @returns {undefined}
   */


  function onWidthChanged(v) {
    if (this.wide) {
      delete this.$.style.width;
    } else {
      this.$.style.width = v;
    }
  }
  /**
   * Fire the tap event.
   * @this tfw.view.button
   * @param {any} tag - If defined, set `this.tag` to it.
   * @returns {this} Set the function to call at any tap.
   */


  function fire(tag) {
    if (typeof tag !== 'undefined') this.tag = tag;

    if (this.href.length > 0) {
      if (this.target.length > 0) {
        window.open(this.href, this.target);
      } else {
        window.location = this.href;
      }
    } else {
      this.action = this.tag;
    }
  }
  /**
   * @this tfw.view.button
   * @returns {array} Array of classes to set for the text.
   */


  function getClassesForText() {
    if (!this.flat) return [];

    switch (this.type) {
      case 'primary':
        return ['thm-fgP'];

      case 'secondary':
        return ['thm-fgS'];

      default:
        return [];
    }
  }
  /**
   * @this tfw.view.button
   * @returns {array} Array of classes to set for the button.
   */


  function getClasses() {
    var classes = [],
        background = {
      'default': 'thm-bg3',
      'primary': 'thm-bgP',
      'secondary': 'thm-bgS'
    },
        foreground = {
      'primary': 'thm-fgP',
      'secondary': 'thm-fgS'
    };
    if (this.pressed) classes.push("pressed");

    if (this.flat) {
      classes.push(foreground[this.type]);
    } else {
      classes.push(background[this.type]);

      if (this.pressed) {
        classes.push("thm-ele4");
      } else {
        classes.push("thm-ele2");
      }
    }

    return classes.filter(function (cls) {
      return typeof cls === 'string';
    });
  }

  function onSmallChanged(isSmall) {
    this.$elements.icon.size = isSmall ? 20 : 28;
  }

  function onKeyUp(evt) {
    if (evt.keyCode != 32 && evt.keyCode != 13) return;
    evt.preventDefault();
    evt.stopPropagation();
    fire.call(this);
    this.pressed = false;
  }

  function init() {
    var that = this;
    this._touchable = new Touchable(this.$);

    this._touchable.tap.add(function () {
      fire.call(that);
    });

    this._touchable.enabled = this.enabled;
  }
  /**
   * Add/remove the disabled attribute to the BUTTON element.
   *
   * @this ViewXJS
   * @returns {undefined}
   */


  function onEnabledChanged() {
    var enabled = this.enabled && !this.wait;
    if (this._touchable) this._touchable.enabled = enabled;

    if (enabled) {
      $.removeAtt(this, "disabled");
    } else {
      $.att(this, {
        disabled: true
      });
    }
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

      var Converters = require('tfw.binding.converters');

      var TfwViewIcon = require('tfw.view.icon'); //-------------------------------------------------------
      // Check if needed functions are defined in code behind.


      View.ensureCodeBehind(CODE_BEHIND, "onEnabledChanged", "onWidthChanged", "onSmallChanged", "on", "fire", "init", "onKeyUp"); //-------------------
      // Global functions.

      function defVal(args, attName, attValue) {
        return args[attName] === undefined ? attValue : args[attName];
      }

      ;

      function addClassIfTrue(element, className, value) {
        if (value) $.addClass(element, className);else $.removeClass(element, className);
      }

      ;
      ;

      function addClassIfFalse(element, className, value) {
        if (value) $.removeClass(element, className);else $.addClass(element, className);
      }

      ;
      ; //-------------------
      // Global variables.

      var conv_string = Converters.get('string');
      var conv_boolean = Converters.get('boolean');
      var conv_enum = Converters.get('enum');
      var conv_unit = Converters.get('unit');
      var conv_isEmpty = Converters.get('isEmpty'); //-------------------
      // Class definition.

      var ViewClass = function ViewClass(args) {
        try {
          if (typeof args === 'undefined') args = {};
          this.$elements = {};
          var that = this;
          var pm = PM(this); //--------------------
          // Create attributes.

          pm.createAction("action");
          pm.create("tag", {
            cast: conv_string
          });
          pm.create("icon", {
            cast: conv_string
          });
          pm.create("text", {
            cast: conv_string
          });
          pm.create("href", {
            cast: conv_string
          });
          pm.create("target", {
            cast: conv_string
          });
          pm.create("pressed", {
            cast: conv_boolean
          });
          pm.create("flat", {
            cast: conv_boolean
          });
          pm.create("type", {
            cast: conv_enum(["primary", "default", "secondary"]),
            init: "primary"
          });
          pm.create("enabled", {
            cast: conv_boolean
          });
          pm.create("inverted", {
            cast: conv_boolean
          });
          pm.create("visible", {
            cast: conv_boolean
          });
          pm.create("wide", {
            cast: conv_boolean
          });
          pm.create("width", {
            cast: conv_unit
          });
          pm.create("responsive", {
            cast: conv_boolean
          });
          pm.create("small", {
            cast: conv_boolean
          });
          pm.create("wait", {
            cast: conv_boolean
          });
          pm.create("focus", {
            cast: conv_boolean
          }); //------------------
          // Create elements.

          var e_ = new Tag('BUTTON', ["focus", "class"]);
          var e_0 = new Tag('DIV', ["class"]);
          var e_icon = new TfwViewIcon();
          this.$elements.icon = e_icon;
          $.add(e_0, e_icon);
          var e_text = new Tag('DIV', ["class"]);
          this.$elements.text = e_text;
          $.add(e_, e_0, e_text); //-----------------------
          // Declare root element.

          Object.defineProperty(this, '$', {
            value: e_.$,
            writable: false,
            enumerable: false,
            configurable: false
          }); //---------
          // Events.

          View.events(e_, {
            "keyup": CODE_BEHIND.onKeyUp.bind(this),
            "down": function down(v) {
              that.pressed = true;
            },
            "up": function up(v) {
              that.pressed = false;
            }
          }); //-------
          // Links

          new Link({
            A: {
              obj: that,
              name: 'focus'
            },
            B: {
              obj: e_,
              name: 'focus'
            },
            name: "focus > e_/focus"
          });
          new Link({
            A: {
              obj: that,
              name: 'flat'
            },
            B: {
              action: function action(v) {
                addClassIfTrue(e_, "flat", v);
              }
            },
            name: "flat > undefined"
          });
          new Link({
            A: {
              obj: that,
              name: 'wait'
            },
            B: {
              action: function action(v) {
                addClassIfTrue(e_, "wait", v);
              }
            },
            name: "wait > undefined"
          });
          new Link({
            A: {
              obj: that,
              name: 'flat'
            },
            B: {
              action: function action(v) {
                e_.applyClass(CODE_BEHIND.getClasses.call(that, v, "flat"), 0);
              }
            },
            name: "flat > undefined"
          });
          new Link({
            A: {
              obj: that,
              name: 'type'
            },
            B: {
              action: function action(v) {
                e_.applyClass(CODE_BEHIND.getClasses.call(that, v, "type"), 0);
              }
            },
            name: "type > undefined"
          });
          new Link({
            A: {
              obj: that,
              name: 'pressed'
            },
            B: {
              action: function action(v) {
                e_.applyClass(CODE_BEHIND.getClasses.call(that, v, "pressed"), 0);
              }
            },
            name: "pressed > undefined"
          });
          new Link({
            A: {
              obj: that,
              name: 'inverted'
            },
            B: {
              action: function action(v) {
                addClassIfTrue(e_, "inverted", v);
              }
            },
            name: "inverted > undefined"
          });
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
              name: 'wide'
            },
            B: {
              action: function action(v) {
                addClassIfTrue(e_, "wide", v);
              }
            },
            name: "wide > undefined"
          });
          new Link({
            A: {
              obj: that,
              name: 'responsive'
            },
            B: {
              action: function action(v) {
                addClassIfTrue(e_, "responsive", v);
              }
            },
            name: "responsive > undefined"
          });
          new Link({
            A: {
              obj: that,
              name: 'small'
            },
            B: {
              action: function action(v) {
                addClassIfTrue(e_, "small", v);
              }
            },
            name: "small > undefined"
          });
          new Link({
            A: {
              obj: that,
              name: 'enabled'
            },
            B: {
              action: function action(v) {
                addClassIfFalse(e_, "disabled", v);
              }
            },
            name: "enabled > undefined"
          });
          new Link({
            A: {
              obj: that,
              name: 'icon'
            },
            B: {
              obj: e_icon,
              name: 'content'
            },
            name: "icon > e_icon/content"
          });
          new Link({
            A: {
              obj: that,
              name: 'wait'
            },
            B: {
              obj: e_icon,
              name: 'animate'
            },
            name: "wait > e_icon/animate"
          });
          new Link({
            A: {
              obj: that,
              name: 'flat'
            },
            B: {
              action: function action(v) {
                e_text.applyClass(CODE_BEHIND.getClassesForText.call(that, v, "flat"), 0);
              }
            },
            name: "flat > undefined"
          });
          new Link({
            A: {
              obj: that,
              name: 'type'
            },
            B: {
              action: function action(v) {
                e_text.applyClass(CODE_BEHIND.getClassesForText.call(that, v, "type"), 0);
              }
            },
            name: "type > undefined"
          });
          new Link({
            A: {
              obj: that,
              name: 'text'
            },
            B: {
              action: function action(v) {
                addClassIfTrue(e_text, "hide", v);
              },
              converter: conv_isEmpty
            },
            name: "text > undefined"
          }); //-----------------------
          // On attribute changed.

          pm.on("enabled", function (v) {
            try {
              CODE_BEHIND.onEnabledChanged.call(that, v);
            } catch (ex) {
              console.error('Exception in function behind "onEnabledChanged" of module "mod/tfw.view.button.js" for attribute "enabled"!');
              console.error(ex);
            }
          });
          pm.on("width", function (v) {
            try {
              CODE_BEHIND.onWidthChanged.call(that, v);
            } catch (ex) {
              console.error('Exception in function behind "onWidthChanged" of module "mod/tfw.view.button.js" for attribute "width"!');
              console.error(ex);
            }
          });
          pm.on("small", function (v) {
            try {
              CODE_BEHIND.onSmallChanged.call(that, v);
            } catch (ex) {
              console.error('Exception in function behind "onSmallChanged" of module "mod/tfw.view.button.js" for attribute "small"!');
              console.error(ex);
            }
          });
          pm.on("wait", function (v) {
            try {
              CODE_BEHIND.onEnabledChanged.call(that, v);
            } catch (ex) {
              console.error('Exception in function behind "onEnabledChanged" of module "mod/tfw.view.button.js" for attribute "wait"!');
              console.error(ex);
            }
          });
          pm.on('text', function (v) {
            $.clear(e_text, v);
          }); //----------------------
          // Initialize elements.

          e_.class = "tfw-view-button";
          e_0.class = "icon";
          e_text.class = "text thm-fg"; //------------------------
          // Initialize attributes.

          pm.set("tag", defVal(args, "tag", "ACTION"));
          pm.set("icon", defVal(args, "icon", ""));
          pm.set("text", defVal(args, "text", "Click me!"));
          pm.set("href", defVal(args, "href", ""));
          pm.set("target", defVal(args, "target", ""));
          pm.set("pressed", defVal(args, "pressed", false));
          pm.set("flat", defVal(args, "flat", false));
          pm.set("type", defVal(args, "type", "primary"));
          pm.set("enabled", defVal(args, "enabled", true));
          pm.set("inverted", defVal(args, "inverted", false));
          pm.set("visible", defVal(args, "visible", true));
          pm.set("wide", defVal(args, "wide", false));
          pm.set("width", defVal(args, "width", "auto"));
          pm.set("responsive", defVal(args, "responsive", false));
          pm.set("small", defVal(args, "small", false));
          pm.set("wait", defVal(args, "wait", false));
          pm.set("focus", defVal(args, "focus", false));
          pm.fire("tag");
          pm.fire("icon");
          pm.fire("text");
          pm.fire("href");
          pm.fire("target");
          pm.fire("pressed");
          pm.fire("flat");
          pm.fire("type");
          pm.fire("enabled");
          pm.fire("inverted");
          pm.fire("visible");
          pm.fire("wide");
          pm.fire("width");
          pm.fire("responsive");
          pm.fire("small");
          pm.fire("wait");
          pm.fire("focus"); // Initialization.

          CODE_BEHIND.init.call(this);
          $.addClass(this, 'view', 'custom');
        } catch (ex) {
          console.error('mod/tfw.view.button.js', ex);
          throw Error('Instantiation error in XJS of "mod/tfw.view.button.js":\n' + ex);
        }
      }; //------------------
      // Static members..


      ViewClass.prototype.on = CODE_BEHIND.on;
      ViewClass.prototype.fire = CODE_BEHIND.fire;
      return ViewClass;
    }();
  } catch (ex) {
    throw Error('Definition error in XJS of "mod/tfw.view.button.js"\n' + ex);
  }

  module.exports._ = _;
});