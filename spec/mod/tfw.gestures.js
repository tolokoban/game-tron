"use strict";function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor))throw new TypeError("Cannot call a class as a function")}function _defineProperties(target,props){for(var descriptor,i=0;i<props.length;i++)descriptor=props[i],descriptor.enumerable=descriptor.enumerable||!1,descriptor.configurable=!0,"value"in descriptor&&(descriptor.writable=!0),Object.defineProperty(target,descriptor.key,descriptor)}function _createClass(Constructor,protoProps,staticProps){return protoProps&&_defineProperties(Constructor.prototype,protoProps),staticProps&&_defineProperties(Constructor,staticProps),Constructor}require("tfw.gestures",function(require,module){function handlerWithChainOfResponsability(eventName,evt){for(var responsible,chain=this._events[eventName].chain,i=0;i<chain.length;i++)if(responsible=chain[i],!0===responsible(evt))return}function doRegister(event,responsible){var hammerEvent=getEventNameForPrefix(event,"hammer.");hammerEvent&&!this._hammer&&(this._hammer=new Hammer(this.$,{domEvents:!0}),this._hammer.domEvents=!0);var eventDef=this._events[event];if(!eventDef){var handler=handlerWithChainOfResponsability.bind(this,event);eventDef={chain:[],handler:handler},hammerEvent?this._hammer.on(hammerEvent,handler):this.$.addEventListener(event,handler),this._events[event]=eventDef}eventDef.chain.push(responsible)}function ensureValidGestureNameAndSlot(name,slot){if("string"!=typeof name)throw Error("[Gestures.on] `name` must be a string: "+JSON(name)+"!");if(-1===SUPPORTED_EVENTS.indexOf(name))throw Error("Unknown gesture's name `"+name+"`!\nAvailable names are: "+SUPPORTED_EVENTS.join(", ")+".");if("function"!=typeof slot)throw Error("Gesture `"+name+"` must have a function as slot!")}function ensureDom(dom){if(dom instanceof Node)return dom;if(void 0===dom||null===dom)throw Error("Not a valid DOM element!",dom);if(dom.$ instanceof Node)return dom.$;if(dom.element instanceof Node)return dom.element;if("string"==typeof dom){var elem=document.getElementById(dom);return elem||console.error("There is no DOM element with this ID: `"+dom+"`"),elem}return"function"==typeof dom.element?dom.element():dom}function setHammerXY(elem,evt){var x,y;x=evt.center.x,y=evt.center.y;var rect=elem.getBoundingClientRect();evt.x=x-rect.left,evt.y=y-rect.top}function setXY(elem,evt){var x,y;x=evt.clientX,y=evt.clientY;var rect=elem.getBoundingClientRect();return{x:x-rect.left,y:y-rect.top}}function setHammerVxVy(elem,evt){evt.vx=evt.x-this._dragX,evt.vy=evt.y-this._dragY,evt.x0=evt.x-evt.deltaX,evt.y0=evt.y-evt.deltaY,this._dragX=evt.x,this._dragY=evt.y}function getButtons(hammerEvent){if(!hammerEvent||!hammerEvent.srcEvent)return 0;var buttons=hammerEvent.srcEvent.buttons;return"number"==typeof buttons?buttons:0}function getEventNameForPrefix(text,prefix){return text.substr(0,prefix.length)==prefix?text.substr(prefix.length):null}var _=function(){function _(){return X(D,arguments)}var D={en:{},fr:{}},X=require("$").intl;return _.all=D,_}();"use strict",module.exports=function(element_){var element=ensureDom(element_);return element[SYMBOL]||(element[SYMBOL]=new Gesture(element)),element[SYMBOL]};var HANDLERS={tap:function(register,slot){var that=this;register("hammer.tap",function(evt){return!(1!==evt.tapCount)&&(setHammerXY(that.$,evt),slot({x:evt.x,y:evt.y,target:evt.target,preventDefault:evt.preventDefault.bind(evt)}),!0)})},doubletap:function(register,slot){var that=this;register("hammer.tap",function(evt){return!(2!==evt.tapCount)&&(setHammerXY(that.$,evt),slot({x:evt.x,y:evt.y,target:evt.target,preventDefault:evt.preventDefault.bind(evt)}),!0)})},drag:function(register,slot,args){var that=this;register("hammer.pan",function(evt){if(evt.isFinal)return!1;setHammerXY(that.$,evt),"undefined"==typeof that._dragX&&(that._dragX=evt.x,that._dragY=evt.y,that._dragStart=!0),setHammerVxVy.call(that,that.$,evt);var domEvt=evt.srcEvent;return slot({x:evt.x,y:evt.y,x0:evt.x0,y0:evt.y0,vx:evt.vx,vy:evt.vy,sx:evt.velocityX,sy:evt.velocityY,event:evt,target:evt.target,buttons:getButtons(evt),preventDefault:domEvt.preventDefault.bind(domEvt),stopPropagation:domEvt.stopImmediatePropagation.bind(domEvt)},args),!0})},dragstart:function(register,slot){var that=this;register("hammer.panstart",function(evt){console.log("START"),setHammerXY.call(that,that.$,evt);var domEvt=evt.srcEvent;return slot({x:evt.x,y:evt.y,target:evt.target,preventDefault:domEvt.preventDefault.bind(domEvt),stopPropagation:domEvt.stopImmediatePropagation.bind(domEvt)}),!0})},dragend:function(register,slot){var that=this;register("hammer.panend",function(evt){setHammerXY(that.$,evt),setHammerVxVy.call(that,that.$,evt);var domEvt=evt.srcEvent;return slot({x:evt.x,y:evt.y,x0:evt.x0,y0:evt.y0,target:evt.target,preventDefault:domEvt.preventDefault.bind(domEvt),stopPropagation:domEvt.stopImmediatePropagation.bind(domEvt)}),delete that._dragX,delete that._dragY,!0})},move:function(register,slot){var that=this;register("mousemove",function(evt){var newEvt=setXY(that.$,evt);newEvt.preventDefault=evt.preventDefault.bind(evt),newEvt.stopPropagation=evt.stopPropagation.bind(evt),newEvt.event=evt,slot(newEvt)})},down:function(register,slot){var that=this;register("touchstart",function(evt){if(!evt.changedTouches||1>evt.changedTouches.length)return!1;var touch=evt.changedTouches[0],rect=that.$.getBoundingClientRect();try{slot({x:touch.clientX-rect.left,y:touch.clientY-rect.top,preventDefault:evt.preventDefault.bind(evt),stopPropagation:evt.stopPropagation.bind(evt)})}catch(ex){console.error(ex)}return!0}),register("mousedown",function(evt){var now=Date.now();if(350>now-that._touchstart)return evt.preventDefault(),evt.stopPropagation(),!1;var rect=that.$.getBoundingClientRect();try{slot({x:evt.clientX-rect.left,y:evt.clientY-rect.top,preventDefault:evt.preventDefault.bind(evt),stopPropagation:evt.stopPropagation.bind(evt)})}catch(ex){console.error(ex)}return that._touchstart=0,!0})},up:function(register,slot){var that=this;register("touchend",function(evt){if(!evt.changedTouches||1>evt.changedTouches.length)return!1;var touch=evt.changedTouches[0],rect=that.$.getBoundingClientRect();try{slot({x:touch.clientX-rect.left,y:touch.clientY-rect.top,preventDefault:evt.preventDefault.bind(evt),stopPropagation:evt.stopPropagation.bind(evt)})}catch(ex){console.error(ex)}return that._touchstart=Date.now(),!0}),register("mouseup",function(evt){if(0<that._touchstart)return evt.preventDefault(),evt.stopPropagation(),!1;var rect=that.$.getBoundingClientRect();try{slot({x:evt.clientX-rect.left,y:evt.clientY-rect.top,preventDefault:evt.preventDefault.bind(evt),stopPropagation:evt.stopPropagation.bind(evt)})}catch(ex){console.error(ex)}return that._touchstart=0,!0})},wheel:function(register,slot){var that=this;register(WHEEL_EVENT,function(evt){var newEvt=setXY(that.$,evt);newEvt.delta=evt.deltaY,"number"!=typeof newEvt.delta&&(newEvt.delta=-evt.wheelDelta),newEvt.preventDefault=evt.preventDefault.bind(evt),newEvt.stopPropagation=evt.stopPropagation.bind(evt),slot(newEvt)})}},SYMBOL=Symbol("__tfw.gestures__"),WHEEL_EVENT=function(){return"onwheel"in document.createElement("div")?"wheel":"undefined"==typeof document.onmousewheel?"DOMMouseScroll":"mousewheel"}(),SUPPORTED_EVENTS=Object.keys(HANDLERS),Hammer=require("external.hammer"),Gesture=function(){function Gesture(element){_classCallCheck(this,Gesture),Object.defineProperty(this,"$",{writable:!1,value:element,configurable:!1}),this._events={},this._touchstart=0}return _createClass(Gesture,[{key:"on",value:function on(arg1,arg2,arg3){var syntax1="function"==typeof arg1,name=syntax1?"tap":arg1,slot=syntax1?arg1:arg2,args=syntax1?arg2:arg3;try{return ensureValidGestureNameAndSlot(name,slot),HANDLERS[name].call(this,doRegister.bind(this),slot,args),this}catch(ex){throw console.error("[Gesture.on( name, slot, args )]"),console.error("   name",name),console.error("   slot",slot),console.error("   args",args),console.error("   ERROR",ex),Error(ex)}}}]),Gesture}();module.exports._=_});