"use strict";function addListener(t,n){window.addEventListener?window.addEventListener(t,n,!1):window.attachEvent("on"+t,n)}!function(t){const n="node://".length,e={},r={},o="function"==typeof window.require?window.require:null,i=function(a,s){if("node://"===a.substr(0,n)){if(!o)throw Error("[require] NodeJS is not available to load module "+a.substr(n));return o(a.substr(n))}if("function"==typeof s)return r[a]=s,s;const u=r[a];if(void 0===u){const c=new Error("Required module is missing: "+a);throw console.error(c.stack),c}var d=e[a];if(void 0===d){d={exports:{}};const f=d.exports;u.call(t,i,d,f),e[a]=d.exports,d=d.exports}return d};t.APP={},t.require=i}(this),addListener("DOMContentLoaded",function(){document.body.parentNode.$data={},APP=require("s1/app"),setTimeout(function(){"function"==typeof APP.start&&APP.start()})}),require("$",function(t,n,e){function r(t,n){var e=t;if(1<n.length){for(var r,o="",i=0,a=0;a<t.length;a++)if("$"===(r=t.charAt(a))){o+=t.substring(i,a),a++;var s=t.charCodeAt(a)-48;o+=0>s||s>=n.length?"$".concat(t.charAt(a)):n[s],i=a+1}else"\\"===r&&(o+=t.substring(i,a),a++,o+=t.charAt(a),i=a+1);o+=t.substr(i),e=o}return e}e.config={name:'"game-tron"',description:'"Step by step making-of tron like game."',author:'"tolokoban"',version:'"0.0.3"',major:"0",minor:"0",revision:"3",date:"2019-02-04T14:01:57.641Z",consts:{}},e.lang=function(t){var n=t;return void 0===n&&(window.localStorage&&(n=window.localStorage.getItem("Language")),!n&&!(n=window.navigator.language)&&!(n=window.navigator.browserLanguage)&&(n="fr"),n=n.substr(0,2).toLowerCase()),window.localStorage&&window.localStorage.setItem("Language",n),n},e.intl=function(t,n){var o=t[e.lang()],i=n[0],a=Object.keys(t)[0];if(!a)return i;if(!o&&!(o=t[a]))return i;var s=o[i];return s||(o=t[a],s=o[i]),s?r(s,n):i}}),require("s1/app",function(t,n){n.exports._=function(){return""}});
//# sourceMappingURL=s1.html.map