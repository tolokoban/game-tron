"use strict";function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor))throw new TypeError("Cannot call a class as a function")}require("s1.tron.action.keyboard",function(require,module){function ensureKeysListenerIsAttached(){Context.isLoaded||(Context.isLoaded=!0,document.addEventListener("keydown",function(evt){if(!evt.repeat)switch(evt.key){case module.exports.RightKey:Context.rightPressed=!0,evt.preventDefault();break;case module.exports.LeftKey:Context.leftPressed=!0,evt.preventDefault();break;case module.exports.AccelKey:Context.accelPressed=!0,evt.preventDefault();break;default:}},!0),document.addEventListener("keyup",function(evt){switch(evt.key){case Context.RightKey:case Context.LeftKey:case Context.AccelKey:evt.preventDefault();break;default:}},!0))}"use strict",module.exports={create:function(args){return new Keyboard(args)},RightKey:"ArrowRight",LeftKey:"ArrowLeft",AccelKey:" "};var _require=require("common"),readonly=_require.readonly,Context={isLoaded:!1,rightPressed:!1,leftPressed:!1,accelPressed:!1},Keyboard=function Keyboard(){_classCallCheck(this,Keyboard),readonly(this,{actionRight:function actionRight(){var isPressed=Context.rightPressed;return Context.rightPressed=!1,isPressed},actionLeft:function actionLeft(){var isPressed=Context.leftPressed;return Context.leftPressed=!1,isPressed},actionAccel:function actionAccel(){var isPressed=Context.accelPressed;return Context.accelPressed=!1,isPressed}}),ensureKeysListenerIsAttached()};module.exports._=function _(){return""}});