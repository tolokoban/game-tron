"use strict";function addListener(n,t){window.addEventListener?window.addEventListener(n,t,!1):window.attachEvent("on"+n,t)}!function(n){const t="node://".length,e={},o={},r="function"==typeof window.require?window.require:null,i=function(a,s){if("node://"===a.substr(0,t)){if(!r)throw Error("[require] NodeJS is not available to load module "+a.substr(t));return r(a.substr(t))}if("function"==typeof s)return o[a]=s,s;const u=o[a];if(void 0===u){const d=new Error("Required module is missing: "+a);throw console.error(d.stack),d}var c=e[a];if(void 0===c){c={exports:{}};const l=c.exports;u.call(n,i,c,l),e[a]=c.exports,c=c.exports}return c};n.APP={},n.require=i}(this),addListener("DOMContentLoaded",function(){document.body.parentNode.$data={}}),require("$",function(n,t,e){function o(n,t){var e=n;if(1<t.length){for(var o,r="",i=0,a=0;a<n.length;a++)if("$"===(o=n.charAt(a))){r+=n.substring(i,a),a++;var s=n.charCodeAt(a)-48;r+=0>s||s>=t.length?"$".concat(n.charAt(a)):t[s],i=a+1}else"\\"===o&&(r+=n.substring(i,a),a++,r+=n.charAt(a),i=a+1);r+=n.substr(i),e=r}return e}e.config={name:'"game-tron"',description:'"Step by step making-of tron like game."',author:'"tolokoban"',version:'"0.0.2"',major:"0",minor:"0",revision:"2",date:"2019-02-04T13:58:31.756Z",consts:{}},e.lang=function(n){var t=n;return void 0===t&&(window.localStorage&&(t=window.localStorage.getItem("Language")),!t&&!(t=window.navigator.language)&&!(t=window.navigator.browserLanguage)&&(t="fr"),t=t.substr(0,2).toLowerCase()),window.localStorage&&window.localStorage.setItem("Language",t),t},e.intl=function(n,t){var r=n[e.lang()],i=t[0],a=Object.keys(n)[0];if(!a)return i;if(!r&&!(r=n[a]))return i;var s=r[i];return s||(r=n[a],s=r[i]),s?o(s,t):i}});
//# sourceMappingURL=index.html.map