"use strict";

/** @module $ */
require('$', function (require, module, exports) {
  exports.config = {
    "name": "\"game-tron\"",
    "description": "\"Step by step making-of tron like game.\"",
    "author": "\"tolokoban\"",
    "version": "\"0.0.1\"",
    "major": "0",
    "minor": "0",
    "revision": "1",
    "date": "2018-12-29T12:51:37.603Z",
    "consts": {}
  };
  "use strict";

  var ZERO_CHAR_CODE = '0'.charCodeAt(0);

  exports.lang = function lang(_lang) {
    var language = _lang;

    if (typeof language === 'undefined') {
      if (window.localStorage) {
        language = window.localStorage.getItem("Language");
      }

      if (!language) {
        language = window.navigator.language;

        if (!language) {
          language = window.navigator.browserLanguage;

          if (!language) {
            language = "fr";
          }
        }
      }

      language = language.substr(0, 2).toLowerCase();
    }

    if (window.localStorage) {
      window.localStorage.setItem("Language", language);
    }

    return language;
  };

  exports.intl = function intl(words, params) {
    var dic = words[exports.lang()];
    var k = params[0],
        defLang = Object.keys(words)[0];
    if (!defLang) return k;

    if (!dic) {
      dic = words[defLang];

      if (!dic) {
        return k;
      }
    }

    var txt = dic[k];

    if (!txt) {
      dic = words[defLang];
      txt = dic[k];
    }

    if (!txt) return k;
    return processArguments(txt, params);
  };
  /**
   * @param {string} txt - Text with place holders like `$1`, `$2`, etc.
   * @param {array} params - Params for place holders replacement.
   * @return {string} The text with place holders replaces by params.
   */


  function processArguments(txt, params) {
    var output = txt;

    if (params.length > 1) {
      var newTxt = "",
          lastIdx = 0;

      for (var i = 0; i < txt.length; i++) {
        var c = txt.charAt(i);

        if (c === '$') {
          newTxt += txt.substring(lastIdx, i);
          i++;
          var pos = txt.charCodeAt(i) - ZERO_CHAR_CODE;

          if (pos < 0 || pos >= params.length) {
            newTxt += "$".concat(txt.charAt(i));
          } else {
            newTxt += params[pos];
          }

          lastIdx = i + 1;
        } else if (c === '\\') {
          newTxt += txt.substring(lastIdx, i);
          i++;
          newTxt += txt.charAt(i);
          lastIdx = i + 1;
        }
      }

      newTxt += txt.substr(lastIdx);
      output = newTxt;
    }

    return output;
  }
});
//# sourceMappingURL=$.js.map