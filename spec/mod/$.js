"use strict";require("$",function(require,module,exports){function processArguments(txt,params){var output=txt;if(1<params.length){for(var c,newTxt="",lastIdx=0,i=0;i<txt.length;i++)if(c=txt.charAt(i),"$"===c){newTxt+=txt.substring(lastIdx,i),i++;var pos=txt.charCodeAt(i)-48;newTxt+=0>pos||pos>=params.length?"$".concat(txt.charAt(i)):params[pos],lastIdx=i+1}else"\\"===c&&(newTxt+=txt.substring(lastIdx,i),i++,newTxt+=txt.charAt(i),lastIdx=i+1);newTxt+=txt.substr(lastIdx),output=newTxt}return output}exports.config={name:"\"game-tron\"",description:"\"Step by step making-of tron like game.\"",author:"\"tolokoban\"",version:"\"0.0.4\"",major:"0",minor:"0",revision:"4",date:"2019-02-04T15:32:10.810Z",consts:{}},"use strict";exports.lang=function(_lang){var language=_lang;return"undefined"==typeof language&&(window.localStorage&&(language=window.localStorage.getItem("Language")),!language&&(language=window.navigator.language,!language&&(language=window.navigator.browserLanguage,!language&&(language="fr"))),language=language.substr(0,2).toLowerCase()),window.localStorage&&window.localStorage.setItem("Language",language),language},exports.intl=function(words,params){var dic=words[exports.lang()],k=params[0],defLang=Object.keys(words)[0];if(!defLang)return k;if(!dic&&(dic=words[defLang],!dic))return k;var txt=dic[k];return txt||(dic=words[defLang],txt=dic[k]),txt?processArguments(txt,params):k}});