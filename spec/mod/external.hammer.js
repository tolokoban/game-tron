"use strict";function _typeof(obj){return _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(obj){return typeof obj}:function(obj){return obj&&"function"==typeof Symbol&&obj.constructor===Symbol&&obj!==Symbol.prototype?"symbol":typeof obj},_typeof(obj)}require("external.hammer",function(require,module){var _=function(){function _(){return X(D,arguments)}var D={en:{},fr:{}},X=require("$").intl;return _.all=D,_}();"use strict",function(window,document,exportName){function setTimeoutContext(fn,timeout,context){return setTimeout(bindFn(fn,context),timeout)}function invokeArrayArg(arg,fn,context){return!!Array.isArray(arg)&&(each(arg,context[fn],context),!0)}function each(obj,iterator,context){if(obj)if(obj.forEach)obj.forEach(iterator,context);else if(void 0!==obj.length)for(i=0;i<obj.length;)iterator.call(context,obj[i],i,obj),i++;else for(var i in obj)obj.hasOwnProperty(i)&&iterator.call(context,obj[i],i,obj)}function deprecate(method,name,message){return function(){var e=new Error("get-stack-trace"),stack=e&&e.stack?e.stack.replace(/^[^\(]+?[\n$]/gm,"").replace(/^\s+at\s+/gm,"").replace(/^Object.<anonymous>\s*\(/gm,"{anonymous}()@"):"Unknown Stack Trace",log=window.console&&(window.console.warn||window.console.log);return log&&log.call(window.console,"DEPRECATED METHOD: "+name+"\n"+message+" AT \n",stack),method.apply(this,arguments)}}function inherit(child,base,properties){var baseP=base.prototype,childP=child.prototype=Object.create(baseP);childP.constructor=child,childP._super=baseP,properties&&assign(childP,properties)}function bindFn(fn,context){return function(){return fn.apply(context,arguments)}}function boolOrFn(val,args){return"function"==_typeof(val)?val.apply(args?args[0]||void 0:void 0,args):val}function ifUndefined(val1,val2){return val1===void 0?val2:val1}function addEventListeners(target,types,handler){each(splitStr(types),function(type){target.addEventListener(type,handler,!1)})}function removeEventListeners(target,types,handler){each(splitStr(types),function(type){target.removeEventListener(type,handler,!1)})}function hasParent(node,parent){for(;node;){if(node==parent)return!0;node=node.parentNode}return!1}function inStr(str,find){return-1<str.indexOf(find)}function splitStr(str){return str.trim().split(/\s+/g)}function inArray(src,find,findByKey){if(src.indexOf&&!findByKey)return src.indexOf(find);for(var i=0;i<src.length;){if(findByKey&&src[i][findByKey]==find||!findByKey&&src[i]===find)return i;i++}return-1}function toArray(obj){return Array.prototype.slice.call(obj,0)}function uniqueArray(src,key,sort){for(var val,results=[],values=[],i=0;i<src.length;)val=key?src[i][key]:src[i],0>inArray(values,val)&&results.push(src[i]),values[i]=val,i++;return sort&&(key?results=results.sort(function(a,b){return a[key]>b[key]}):results=results.sort()),results}function prefixed(obj,property){for(var camelProp=property[0].toUpperCase()+property.slice(1),i=0;i<VENDOR_PREFIXES.length;){var prefix=VENDOR_PREFIXES[i],prop=prefix?prefix+camelProp:property;if(prop in obj)return prop;i++}return void 0}function uniqueId(){return _uniqueId++}function getWindowForElement(element){var doc=element.ownerDocument||element;return doc.defaultView||doc.parentWindow||window}function Input(manager,callback){var that=this;this.manager=manager,this.callback=callback,this.element=manager.element,this.target=manager.options.inputTarget,this.domHandler=function(ev){boolOrFn(manager.options.enable,[manager])&&that.handler(ev)},this.init()}function createInputInstance(manager){var Type,inputClass=manager.options.inputClass;return Type=inputClass?inputClass:SUPPORT_POINTER_EVENTS?PointerEventInput:SUPPORT_ONLY_TOUCH?TouchInput:SUPPORT_TOUCH?TouchMouseInput:MouseInput,new Type(manager,inputHandler)}function inputHandler(manager,eventType,input){var pointersLen=input.pointers.length,changedPointersLen=input.changedPointers.length,isFirst=eventType&1&&0==pointersLen-changedPointersLen;input.isFirst=!!isFirst,input.isFinal=!!(eventType&12&&0==pointersLen-changedPointersLen),isFirst&&(manager.session={}),input.eventType=eventType,computeInputData(manager,input),manager.emit("hammer.input",input),manager.recognize(input),manager.session.prevInput=input}function computeInputData(manager,input){var session=manager.session,pointers=input.pointers,pointersLength=pointers.length;session.firstInput||(session.firstInput=simpleCloneInputData(input)),1<pointersLength&&!session.firstMultiple?session.firstMultiple=simpleCloneInputData(input):1===pointersLength&&(session.firstMultiple=!1);var firstInput=session.firstInput,firstMultiple=session.firstMultiple,offsetCenter=firstMultiple?firstMultiple.center:firstInput.center,center=input.center=getCenter(pointers);input.timeStamp=now(),input.deltaTime=input.timeStamp-firstInput.timeStamp,input.angle=getAngle(offsetCenter,center),input.distance=getDistance(offsetCenter,center),computeDeltaXY(session,input),input.offsetDirection=getDirection(input.deltaX,input.deltaY);var overallVelocity=getVelocity(input.deltaTime,input.deltaX,input.deltaY);input.overallVelocityX=overallVelocity.x,input.overallVelocityY=overallVelocity.y,input.overallVelocity=abs(overallVelocity.x)>abs(overallVelocity.y)?overallVelocity.x:overallVelocity.y,input.scale=firstMultiple?getScale(firstMultiple.pointers,pointers):1,input.rotation=firstMultiple?getRotation(firstMultiple.pointers,pointers):0,input.maxPointers=session.prevInput?input.pointers.length>session.prevInput.maxPointers?input.pointers.length:session.prevInput.maxPointers:input.pointers.length,computeIntervalInputData(session,input);var target=manager.element;hasParent(input.srcEvent.target,target)&&(target=input.srcEvent.target),input.target=target}function computeDeltaXY(session,input){var center=input.center,offset=session.offsetDelta||{},prevDelta=session.prevDelta||{},prevInput=session.prevInput||{};(input.eventType===1||prevInput.eventType===4)&&(prevDelta=session.prevDelta={x:prevInput.deltaX||0,y:prevInput.deltaY||0},offset=session.offsetDelta={x:center.x,y:center.y}),input.deltaX=prevDelta.x+(center.x-offset.x),input.deltaY=prevDelta.y+(center.y-offset.y)}function computeIntervalInputData(session,input){var velocity,velocityX,velocityY,direction,last=session.lastInterval||input,deltaTime=input.timeStamp-last.timeStamp;if(input.eventType!==8&&(deltaTime>25||last.velocity===void 0)){var deltaX=input.deltaX-last.deltaX,deltaY=input.deltaY-last.deltaY,v=getVelocity(deltaTime,deltaX,deltaY);velocityX=v.x,velocityY=v.y,velocity=abs(v.x)>abs(v.y)?v.x:v.y,direction=getDirection(deltaX,deltaY),session.lastInterval=input}else velocity=last.velocity,velocityX=last.velocityX,velocityY=last.velocityY,direction=last.direction;input.velocity=velocity,input.velocityX=velocityX,input.velocityY=velocityY,input.direction=direction}function simpleCloneInputData(input){for(var pointers=[],i=0;i<input.pointers.length;)pointers[i]={clientX:round(input.pointers[i].clientX),clientY:round(input.pointers[i].clientY)},i++;return{timeStamp:now(),pointers:pointers,center:getCenter(pointers),deltaX:input.deltaX,deltaY:input.deltaY}}function getCenter(pointers){var pointersLength=pointers.length;if(1===pointersLength)return{x:round(pointers[0].clientX),y:round(pointers[0].clientY)};for(var x=0,y=0,i=0;i<pointersLength;)x+=pointers[i].clientX,y+=pointers[i].clientY,i++;return{x:round(x/pointersLength),y:round(y/pointersLength)}}function getVelocity(deltaTime,x,y){return{x:x/deltaTime||0,y:y/deltaTime||0}}function getDirection(x,y){return x===y?1:abs(x)>=abs(y)?0>x?2:4:0>y?8:16}function getDistance(p1,p2,props){props||(props=PROPS_XY);var x=p2[props[0]]-p1[props[0]],y=p2[props[1]]-p1[props[1]];return Math.sqrt(x*x+y*y)}function getAngle(p1,p2,props){props||(props=PROPS_XY);var x=p2[props[0]]-p1[props[0]],y=p2[props[1]]-p1[props[1]];return 180*Math.atan2(y,x)/Math.PI}function getRotation(start,end){return getAngle(end[1],end[0],PROPS_CLIENT_XY)+getAngle(start[1],start[0],PROPS_CLIENT_XY)}function getScale(start,end){return getDistance(end[0],end[1],PROPS_CLIENT_XY)/getDistance(start[0],start[1],PROPS_CLIENT_XY)}function MouseInput(){this.evEl="mousedown",this.evWin="mousemove mouseup",this.pressed=!1,Input.apply(this,arguments)}function PointerEventInput(){this.evEl=POINTER_ELEMENT_EVENTS,this.evWin=POINTER_WINDOW_EVENTS,Input.apply(this,arguments),this.store=this.manager.session.pointerEvents=[]}function SingleTouchInput(){this.evTarget="touchstart",this.evWin="touchstart touchmove touchend touchcancel",this.started=!1,Input.apply(this,arguments)}function normalizeSingleTouches(ev,type){var all=toArray(ev.touches),changed=toArray(ev.changedTouches);return 12&type&&(all=uniqueArray(all.concat(changed),"identifier",!0)),[all,changed]}function TouchInput(){this.evTarget="touchstart touchmove touchend touchcancel",this.targetIds={},Input.apply(this,arguments)}function getTouches(ev,type){var allTouches=toArray(ev.touches),targetIds=this.targetIds;if(3&type&&1===allTouches.length)return targetIds[allTouches[0].identifier]=!0,[allTouches,allTouches];var i,targetTouches,changedTouches=toArray(ev.changedTouches),changedTargetTouches=[],target=this.target;if(targetTouches=allTouches.filter(function(touch){return hasParent(touch.target,target)}),1===type)for(i=0;i<targetTouches.length;)targetIds[targetTouches[i].identifier]=!0,i++;for(i=0;i<changedTouches.length;)targetIds[changedTouches[i].identifier]&&changedTargetTouches.push(changedTouches[i]),12&type&&delete targetIds[changedTouches[i].identifier],i++;return changedTargetTouches.length?[uniqueArray(targetTouches.concat(changedTargetTouches),"identifier",!0),changedTargetTouches]:void 0}function TouchMouseInput(){Input.apply(this,arguments);var handler=bindFn(this.handler,this);this.touch=new TouchInput(this.manager,handler),this.mouse=new MouseInput(this.manager,handler),this.primaryTouch=null,this.lastTouches=[]}function recordTouches(eventType,eventData){eventType&1?(this.primaryTouch=eventData.changedPointers[0].identifier,setLastTouch.call(this,eventData)):eventType&12&&setLastTouch.call(this,eventData)}function setLastTouch(eventData){var touch=eventData.changedPointers[0];if(touch.identifier===this.primaryTouch){var lastTouch={x:touch.clientX,y:touch.clientY};this.lastTouches.push(lastTouch);var lts=this.lastTouches,removeLastTouch=function(){var i=lts.indexOf(lastTouch);-1<i&&lts.splice(i,1)};setTimeout(removeLastTouch,2500)}}function isSyntheticEvent(eventData){for(var x=eventData.srcEvent.clientX,y=eventData.srcEvent.clientY,i=0;i<this.lastTouches.length;i++){var t=this.lastTouches[i],dx=Math.abs(x-t.x),dy=Math.abs(y-t.y);if(dx<=25&&dy<=25)return!0}return!1}function TouchAction(manager,value){this.manager=manager,this.set(value)}function cleanTouchActions(actions){if(inStr(actions,"none"))return"none";var hasPanX=inStr(actions,"pan-x"),hasPanY=inStr(actions,"pan-y");return hasPanX&&hasPanY?"none":hasPanX||hasPanY?hasPanX?"pan-x":"pan-y":inStr(actions,"manipulation")?"manipulation":"auto"}function Recognizer(options){this.options=assign({},this.defaults,options||{}),this.id=uniqueId(),this.manager=null,this.options.enable=ifUndefined(this.options.enable,!0),this.state=1,this.simultaneous={},this.requireFail=[]}function stateStr(state){if(state&16)return"cancel";return 8&state?"end":4&state?"move":2&state?"start":""}function directionStr(direction){if(direction==16)return"down";return 8==direction?"up":2==direction?"left":4==direction?"right":""}function getRecognizerByNameIfManager(otherRecognizer,recognizer){var manager=recognizer.manager;return manager?manager.get(otherRecognizer):otherRecognizer}function AttrRecognizer(){Recognizer.apply(this,arguments)}function PanRecognizer(){AttrRecognizer.apply(this,arguments),this.pX=null,this.pY=null}function PinchRecognizer(){AttrRecognizer.apply(this,arguments)}function PressRecognizer(){Recognizer.apply(this,arguments),this._timer=null,this._input=null}function RotateRecognizer(){AttrRecognizer.apply(this,arguments)}function SwipeRecognizer(){AttrRecognizer.apply(this,arguments)}function TapRecognizer(){Recognizer.apply(this,arguments),this.pTime=!1,this.pCenter=!1,this._timer=null,this._input=null,this.count=0}function Hammer(element,options){return options=options||{},options.recognizers=ifUndefined(options.recognizers,Hammer.defaults.preset),new Manager(element,options)}function Manager(element,options){this.options=assign({},Hammer.defaults,options||{}),this.options.inputTarget=this.options.inputTarget||element,this.handlers={},this.session={},this.recognizers=[],this.oldCssProps={},this.element=element,this.input=createInputInstance(this),this.touchAction=new TouchAction(this,this.options.touchAction),toggleCssProps(this,!0),each(this.options.recognizers,function(item){var recognizer=this.add(new item[0](item[1]));item[2]&&recognizer.recognizeWith(item[2]),item[3]&&recognizer.requireFailure(item[3])},this)}function toggleCssProps(manager,add){var element=manager.element;if(element.style){var prop;each(manager.options.cssProps,function(value,name){prop=prefixed(element.style,name),add?(manager.oldCssProps[prop]=element.style[prop],element.style[prop]=value):element.style[prop]=manager.oldCssProps[prop]||""}),add||(manager.oldCssProps={})}}function triggerDomEvent(event,data){var gestureEvent=document.createEvent("Event");gestureEvent.initEvent(event,!0,!0),gestureEvent.gesture=data,data.target.dispatchEvent(gestureEvent)}var assign,VENDOR_PREFIXES=["","webkit","Moz","MS","ms","o"],TEST_ELEMENT=document.createElement("div"),round=Math.round,abs=Math.abs,now=Date.now;assign="function"==typeof Object.assign?Object.assign:function(target){if(void 0===target||null===target)throw new TypeError("Cannot convert undefined or null to object");for(var source,output=Object(target),index=1;index<arguments.length;index++)if(source=arguments[index],void 0!==source&&null!==source)for(var nextKey in source)source.hasOwnProperty(nextKey)&&(output[nextKey]=source[nextKey]);return output};var extend=deprecate(function(dest,src,merge){for(var keys=Object.keys(src),i=0;i<keys.length;)(!merge||merge&&void 0===dest[keys[i]])&&(dest[keys[i]]=src[keys[i]]),i++;return dest},"extend","Use `assign`."),merge=deprecate(function(dest,src){return extend(dest,src,!0)},"merge","Use `assign`."),_uniqueId=1,MOBILE_REGEX=/mobile|tablet|ip(ad|hone|od)|android/i,SUPPORT_TOUCH="ontouchstart"in window,SUPPORT_POINTER_EVENTS=prefixed(window,"PointerEvent")!==void 0,SUPPORT_ONLY_TOUCH=SUPPORT_TOUCH&&MOBILE_REGEX.test(navigator.userAgent),INPUT_TYPE_TOUCH="touch",INPUT_TYPE_MOUSE="mouse",INPUT_START=1,INPUT_MOVE=2,INPUT_END=4,INPUT_CANCEL=8,DIRECTION_NONE=1,DIRECTION_LEFT=2,DIRECTION_RIGHT=4,DIRECTION_UP=8,DIRECTION_DOWN=16,DIRECTION_HORIZONTAL=DIRECTION_LEFT|DIRECTION_RIGHT,DIRECTION_VERTICAL=DIRECTION_UP|DIRECTION_DOWN,DIRECTION_ALL=DIRECTION_HORIZONTAL|DIRECTION_VERTICAL,PROPS_XY=["x","y"],PROPS_CLIENT_XY=["clientX","clientY"];Input.prototype={handler:function handler(){},init:function init(){this.evEl&&addEventListeners(this.element,this.evEl,this.domHandler),this.evTarget&&addEventListeners(this.target,this.evTarget,this.domHandler),this.evWin&&addEventListeners(getWindowForElement(this.element),this.evWin,this.domHandler)},destroy:function destroy(){this.evEl&&removeEventListeners(this.element,this.evEl,this.domHandler),this.evTarget&&removeEventListeners(this.target,this.evTarget,this.domHandler),this.evWin&&removeEventListeners(getWindowForElement(this.element),this.evWin,this.domHandler)}};var MOUSE_INPUT_MAP={mousedown:INPUT_START,mousemove:INPUT_MOVE,mouseup:INPUT_END};inherit(MouseInput,Input,{handler:function(ev){var eventType=MOUSE_INPUT_MAP[ev.type];eventType&INPUT_START&&2!==ev.button&&(this.pressed=!0),eventType&INPUT_MOVE&&1!==ev.which&&(eventType=INPUT_END);this.pressed&&(eventType&INPUT_END&&(this.pressed=!1),this.callback(this.manager,eventType,{pointers:[ev],changedPointers:[ev],pointerType:INPUT_TYPE_MOUSE,srcEvent:ev}))}});var POINTER_INPUT_MAP={pointerdown:INPUT_START,pointermove:INPUT_MOVE,pointerup:INPUT_END,pointercancel:INPUT_CANCEL,pointerout:INPUT_CANCEL},IE10_POINTER_TYPE_ENUM={2:INPUT_TYPE_TOUCH,3:"pen",4:INPUT_TYPE_MOUSE,5:"kinect"},POINTER_ELEMENT_EVENTS="pointerdown",POINTER_WINDOW_EVENTS="pointermove pointerup pointercancel";window.MSPointerEvent&&!window.PointerEvent&&(POINTER_ELEMENT_EVENTS="MSPointerDown",POINTER_WINDOW_EVENTS="MSPointerMove MSPointerUp MSPointerCancel"),inherit(PointerEventInput,Input,{handler:function(ev){var store=this.store,removePointer=!1,eventTypeNormalized=ev.type.toLowerCase().replace("ms",""),eventType=POINTER_INPUT_MAP[eventTypeNormalized],pointerType=IE10_POINTER_TYPE_ENUM[ev.pointerType]||ev.pointerType,storeIndex=inArray(store,ev.pointerId,"pointerId");eventType&INPUT_START&&(2!==ev.button||pointerType==INPUT_TYPE_TOUCH)?0>storeIndex&&(store.push(ev),storeIndex=store.length-1):eventType&(INPUT_END|INPUT_CANCEL)&&(removePointer=!0);0>storeIndex||(store[storeIndex]=ev,this.callback(this.manager,eventType,{pointers:store,changedPointers:[ev],pointerType:pointerType,srcEvent:ev}),removePointer&&store.splice(storeIndex,1))}});var SINGLE_TOUCH_INPUT_MAP={touchstart:INPUT_START,touchmove:INPUT_MOVE,touchend:INPUT_END,touchcancel:INPUT_CANCEL};inherit(SingleTouchInput,Input,{handler:function(ev){var type=SINGLE_TOUCH_INPUT_MAP[ev.type];if(type===INPUT_START&&(this.started=!0),!!this.started){var touches=normalizeSingleTouches.call(this,ev,type);type&(INPUT_END|INPUT_CANCEL)&&0==touches[0].length-touches[1].length&&(this.started=!1),this.callback(this.manager,type,{pointers:touches[0],changedPointers:touches[1],pointerType:INPUT_TYPE_TOUCH,srcEvent:ev})}}});var TOUCH_INPUT_MAP={touchstart:INPUT_START,touchmove:INPUT_MOVE,touchend:INPUT_END,touchcancel:INPUT_CANCEL};inherit(TouchInput,Input,{handler:function(ev){var type=TOUCH_INPUT_MAP[ev.type],touches=getTouches.call(this,ev,type);touches&&this.callback(this.manager,type,{pointers:touches[0],changedPointers:touches[1],pointerType:INPUT_TYPE_TOUCH,srcEvent:ev})}});inherit(TouchMouseInput,Input,{handler:function(manager,inputEvent,inputData){var isTouch=inputData.pointerType==INPUT_TYPE_TOUCH,isMouse=inputData.pointerType==INPUT_TYPE_MOUSE;if(!(isMouse&&inputData.sourceCapabilities&&inputData.sourceCapabilities.firesTouchEvents)){if(isTouch)recordTouches.call(this,inputEvent,inputData);else if(isMouse&&isSyntheticEvent.call(this,inputData))return;this.callback(manager,inputEvent,inputData)}},destroy:function(){this.touch.destroy(),this.mouse.destroy()}});var PREFIXED_TOUCH_ACTION=prefixed(TEST_ELEMENT.style,"touchAction"),NATIVE_TOUCH_ACTION=PREFIXED_TOUCH_ACTION!==void 0,TOUCH_ACTION_COMPUTE="compute",TOUCH_ACTION_NONE="none",TOUCH_ACTION_PAN_X="pan-x",TOUCH_ACTION_PAN_Y="pan-y",TOUCH_ACTION_MAP=function(){if(!NATIVE_TOUCH_ACTION)return!1;var touchMap={},cssSupports=window.CSS&&window.CSS.supports;return["auto","manipulation","pan-y","pan-x","pan-x pan-y","none"].forEach(function(val){touchMap[val]=!cssSupports||window.CSS.supports("touch-action",val)}),touchMap}();TouchAction.prototype={set:function set(value){value==TOUCH_ACTION_COMPUTE&&(value=this.compute()),NATIVE_TOUCH_ACTION&&this.manager.element.style&&TOUCH_ACTION_MAP[value]&&(this.manager.element.style[PREFIXED_TOUCH_ACTION]=value),this.actions=value.toLowerCase().trim()},update:function update(){this.set(this.manager.options.touchAction)},compute:function compute(){var actions=[];return each(this.manager.recognizers,function(recognizer){boolOrFn(recognizer.options.enable,[recognizer])&&(actions=actions.concat(recognizer.getTouchAction()))}),cleanTouchActions(actions.join(" "))},preventDefaults:function preventDefaults(input){var srcEvent=input.srcEvent,direction=input.offsetDirection;if(this.manager.session.prevented)return void srcEvent.preventDefault();var actions=this.actions,hasNone=inStr(actions,TOUCH_ACTION_NONE)&&!TOUCH_ACTION_MAP[TOUCH_ACTION_NONE],hasPanY=inStr(actions,TOUCH_ACTION_PAN_Y)&&!TOUCH_ACTION_MAP[TOUCH_ACTION_PAN_Y],hasPanX=inStr(actions,TOUCH_ACTION_PAN_X)&&!TOUCH_ACTION_MAP[TOUCH_ACTION_PAN_X];if(hasNone){var isTapPointer=1===input.pointers.length,isTapMovement=2>input.distance,isTapTouchTime=250>input.deltaTime;if(isTapPointer&&isTapMovement&&isTapTouchTime)return}return hasPanX&&hasPanY?void 0:hasNone||hasPanY&&direction&DIRECTION_HORIZONTAL||hasPanX&&direction&DIRECTION_VERTICAL?this.preventSrc(srcEvent):void 0},preventSrc:function preventSrc(srcEvent){this.manager.session.prevented=!0,srcEvent.preventDefault()}};var STATE_BEGAN=2,STATE_CHANGED=4,STATE_ENDED=8,STATE_RECOGNIZED=STATE_ENDED,STATE_CANCELLED=16,STATE_FAILED=32;Recognizer.prototype={defaults:{},set:function set(options){return assign(this.options,options),this.manager&&this.manager.touchAction.update(),this},recognizeWith:function recognizeWith(otherRecognizer){if(invokeArrayArg(otherRecognizer,"recognizeWith",this))return this;var simultaneous=this.simultaneous;return otherRecognizer=getRecognizerByNameIfManager(otherRecognizer,this),simultaneous[otherRecognizer.id]||(simultaneous[otherRecognizer.id]=otherRecognizer,otherRecognizer.recognizeWith(this)),this},dropRecognizeWith:function dropRecognizeWith(otherRecognizer){return invokeArrayArg(otherRecognizer,"dropRecognizeWith",this)?this:(otherRecognizer=getRecognizerByNameIfManager(otherRecognizer,this),delete this.simultaneous[otherRecognizer.id],this)},requireFailure:function requireFailure(otherRecognizer){if(invokeArrayArg(otherRecognizer,"requireFailure",this))return this;var requireFail=this.requireFail;return otherRecognizer=getRecognizerByNameIfManager(otherRecognizer,this),-1===inArray(requireFail,otherRecognizer)&&(requireFail.push(otherRecognizer),otherRecognizer.requireFailure(this)),this},dropRequireFailure:function dropRequireFailure(otherRecognizer){if(invokeArrayArg(otherRecognizer,"dropRequireFailure",this))return this;otherRecognizer=getRecognizerByNameIfManager(otherRecognizer,this);var index=inArray(this.requireFail,otherRecognizer);return-1<index&&this.requireFail.splice(index,1),this},hasRequireFailures:function hasRequireFailures(){return 0<this.requireFail.length},canRecognizeWith:function canRecognizeWith(otherRecognizer){return!!this.simultaneous[otherRecognizer.id]},emit:function(input){function emit(event){self.manager.emit(event,input)}var self=this,state=this.state;state<STATE_ENDED&&emit(self.options.event+stateStr(state)),emit(self.options.event),input.additionalEvent&&emit(input.additionalEvent),state>=STATE_ENDED&&emit(self.options.event+stateStr(state))},tryEmit:function tryEmit(input){return this.canEmit()?this.emit(input):void(this.state=STATE_FAILED)},canEmit:function canEmit(){for(var i=0;i<this.requireFail.length;){if(!(this.requireFail[i].state&(STATE_FAILED|1)))return!1;i++}return!0},recognize:function recognize(inputData){var inputDataClone=assign({},inputData);return boolOrFn(this.options.enable,[this,inputDataClone])?void(this.state&(STATE_RECOGNIZED|STATE_CANCELLED|STATE_FAILED)&&(this.state=1),this.state=this.process(inputDataClone),this.state&(STATE_BEGAN|STATE_CHANGED|STATE_ENDED|STATE_CANCELLED)&&this.tryEmit(inputDataClone)):(this.reset(),void(this.state=STATE_FAILED))},process:function process(){},getTouchAction:function getTouchAction(){},reset:function reset(){}},inherit(AttrRecognizer,Recognizer,{defaults:{pointers:1},attrTest:function attrTest(input){var optionPointers=this.options.pointers;return 0===optionPointers||input.pointers.length===optionPointers},process:function process(input){var state=this.state,eventType=input.eventType,isRecognized=state&(STATE_BEGAN|STATE_CHANGED),isValid=this.attrTest(input);if(isRecognized&&(eventType&INPUT_CANCEL||!isValid))return state|STATE_CANCELLED;return isRecognized||isValid?eventType&INPUT_END?state|STATE_ENDED:state&STATE_BEGAN?state|STATE_CHANGED:STATE_BEGAN:STATE_FAILED}}),inherit(PanRecognizer,AttrRecognizer,{defaults:{event:"pan",threshold:10,pointers:1,direction:DIRECTION_ALL},getTouchAction:function getTouchAction(){var direction=this.options.direction,actions=[];return direction&DIRECTION_HORIZONTAL&&actions.push(TOUCH_ACTION_PAN_Y),direction&DIRECTION_VERTICAL&&actions.push(TOUCH_ACTION_PAN_X),actions},directionTest:function directionTest(input){var options=this.options,hasMoved=!0,distance=input.distance,direction=input.direction,x=input.deltaX,y=input.deltaY;return direction&options.direction||(options.direction&DIRECTION_HORIZONTAL?(direction=0===x?DIRECTION_NONE:0>x?DIRECTION_LEFT:DIRECTION_RIGHT,hasMoved=x!=this.pX,distance=Math.abs(input.deltaX)):(direction=0===y?DIRECTION_NONE:0>y?DIRECTION_UP:DIRECTION_DOWN,hasMoved=y!=this.pY,distance=Math.abs(input.deltaY))),input.direction=direction,hasMoved&&distance>options.threshold&&direction&options.direction},attrTest:function attrTest(input){return AttrRecognizer.prototype.attrTest.call(this,input)&&(this.state&STATE_BEGAN||!(this.state&STATE_BEGAN)&&this.directionTest(input))},emit:function emit(input){this.pX=input.deltaX,this.pY=input.deltaY;var direction=directionStr(input.direction);direction&&(input.additionalEvent=this.options.event+direction),this._super.emit.call(this,input)}}),inherit(PinchRecognizer,AttrRecognizer,{defaults:{event:"pinch",threshold:0,pointers:2},getTouchAction:function getTouchAction(){return[TOUCH_ACTION_NONE]},attrTest:function attrTest(input){return this._super.attrTest.call(this,input)&&(Math.abs(input.scale-1)>this.options.threshold||this.state&STATE_BEGAN)},emit:function emit(input){if(1!==input.scale){var inOut=1>input.scale?"in":"out";input.additionalEvent=this.options.event+inOut}this._super.emit.call(this,input)}}),inherit(PressRecognizer,Recognizer,{defaults:{event:"press",pointers:1,time:251,threshold:9},getTouchAction:function getTouchAction(){return["auto"]},process:function process(input){var options=this.options,validPointers=input.pointers.length===options.pointers,validMovement=input.distance<options.threshold,validTime=input.deltaTime>options.time;if(this._input=input,!validMovement||!validPointers||input.eventType&(INPUT_END|INPUT_CANCEL)&&!validTime)this.reset();else if(input.eventType&INPUT_START)this.reset(),this._timer=setTimeoutContext(function(){this.state=STATE_RECOGNIZED,this.tryEmit()},options.time,this);else if(input.eventType&INPUT_END)return STATE_RECOGNIZED;return STATE_FAILED},reset:function reset(){clearTimeout(this._timer)},emit:function emit(input){this.state!==STATE_RECOGNIZED||(input&&input.eventType&INPUT_END?this.manager.emit(this.options.event+"up",input):(this._input.timeStamp=now(),this.manager.emit(this.options.event,this._input)))}}),inherit(RotateRecognizer,AttrRecognizer,{defaults:{event:"rotate",threshold:0,pointers:2},getTouchAction:function getTouchAction(){return[TOUCH_ACTION_NONE]},attrTest:function attrTest(input){return this._super.attrTest.call(this,input)&&(Math.abs(input.rotation)>this.options.threshold||this.state&STATE_BEGAN)}}),inherit(SwipeRecognizer,AttrRecognizer,{defaults:{event:"swipe",threshold:10,velocity:.3,direction:DIRECTION_HORIZONTAL|DIRECTION_VERTICAL,pointers:1},getTouchAction:function getTouchAction(){return PanRecognizer.prototype.getTouchAction.call(this)},attrTest:function attrTest(input){var velocity,direction=this.options.direction;return direction&(DIRECTION_HORIZONTAL|DIRECTION_VERTICAL)?velocity=input.overallVelocity:direction&DIRECTION_HORIZONTAL?velocity=input.overallVelocityX:direction&DIRECTION_VERTICAL&&(velocity=input.overallVelocityY),this._super.attrTest.call(this,input)&&direction&input.offsetDirection&&input.distance>this.options.threshold&&input.maxPointers==this.options.pointers&&abs(velocity)>this.options.velocity&&input.eventType&INPUT_END},emit:function emit(input){var direction=directionStr(input.offsetDirection);direction&&this.manager.emit(this.options.event+direction,input),this.manager.emit(this.options.event,input)}}),inherit(TapRecognizer,Recognizer,{defaults:{event:"tap",pointers:1,taps:1,interval:300,time:250,threshold:9,posThreshold:10},getTouchAction:function getTouchAction(){return["manipulation"]},process:function process(input){var options=this.options,validPointers=input.pointers.length===options.pointers,validMovement=input.distance<options.threshold,validTouchTime=input.deltaTime<options.time;if(this.reset(),input.eventType&INPUT_START&&0===this.count)return this.failTimeout();if(validMovement&&validTouchTime&&validPointers){if(input.eventType!=INPUT_END)return this.failTimeout();var validInterval=!this.pTime||input.timeStamp-this.pTime<options.interval,validMultiTap=!this.pCenter||getDistance(this.pCenter,input.center)<options.posThreshold;this.pTime=input.timeStamp,this.pCenter=input.center,validMultiTap&&validInterval?this.count+=1:this.count=1,this._input=input;var tapCount=this.count%options.taps;if(0==tapCount)return this.hasRequireFailures()?(this._timer=setTimeoutContext(function(){this.state=STATE_RECOGNIZED,this.tryEmit()},options.interval,this),STATE_BEGAN):STATE_RECOGNIZED}return STATE_FAILED},failTimeout:function failTimeout(){return this._timer=setTimeoutContext(function(){this.state=STATE_FAILED},this.options.interval,this),STATE_FAILED},reset:function reset(){clearTimeout(this._timer)},emit:function emit(){this.state==STATE_RECOGNIZED&&(this._input.tapCount=this.count,this.manager.emit(this.options.event,this._input))}}),Hammer.VERSION="2.0.8",Hammer.defaults={domEvents:!1,touchAction:TOUCH_ACTION_COMPUTE,enable:!0,inputTarget:null,inputClass:null,preset:[[RotateRecognizer,{enable:!1}],[PinchRecognizer,{enable:!1},["rotate"]],[SwipeRecognizer,{direction:DIRECTION_HORIZONTAL}],[PanRecognizer,{direction:DIRECTION_HORIZONTAL},["swipe"]],[TapRecognizer],[TapRecognizer,{event:"doubletap",taps:2},["tap"]],[PressRecognizer]],cssProps:{userSelect:"none",touchSelect:"none",touchCallout:"none",contentZooming:"none",userDrag:"none",tapHighlightColor:"rgba(0,0,0,0)"}};var FORCED_STOP=2;Manager.prototype={set:function set(options){return assign(this.options,options),options.touchAction&&this.touchAction.update(),options.inputTarget&&(this.input.destroy(),this.input.target=options.inputTarget,this.input.init()),this},stop:function stop(force){this.session.stopped=force?FORCED_STOP:1},recognize:function recognize(inputData){var session=this.session;if(!session.stopped){this.touchAction.preventDefaults(inputData);var recognizer,recognizers=this.recognizers,curRecognizer=session.curRecognizer;(!curRecognizer||curRecognizer&&curRecognizer.state&STATE_RECOGNIZED)&&(curRecognizer=session.curRecognizer=null);for(var i=0;i<recognizers.length;)recognizer=recognizers[i],session.stopped!==FORCED_STOP&&(!curRecognizer||recognizer==curRecognizer||recognizer.canRecognizeWith(curRecognizer))?recognizer.recognize(inputData):recognizer.reset(),!curRecognizer&&recognizer.state&(STATE_BEGAN|STATE_CHANGED|STATE_ENDED)&&(curRecognizer=session.curRecognizer=recognizer),i++}},get:function get(recognizer){if(recognizer instanceof Recognizer)return recognizer;for(var recognizers=this.recognizers,i=0;i<recognizers.length;i++)if(recognizers[i].options.event==recognizer)return recognizers[i];return null},add:function add(recognizer){if(invokeArrayArg(recognizer,"add",this))return this;var existing=this.get(recognizer.options.event);return existing&&this.remove(existing),this.recognizers.push(recognizer),recognizer.manager=this,this.touchAction.update(),recognizer},remove:function remove(recognizer){if(invokeArrayArg(recognizer,"remove",this))return this;if(recognizer=this.get(recognizer),recognizer){var recognizers=this.recognizers,index=inArray(recognizers,recognizer);-1!==index&&(recognizers.splice(index,1),this.touchAction.update())}return this},on:function on(events,handler){if(void 0!==events&&void 0!==handler){var handlers=this.handlers;return each(splitStr(events),function(event){handlers[event]=handlers[event]||[],handlers[event].push(handler)}),this}},off:function off(events,handler){if(void 0!==events){var handlers=this.handlers;return each(splitStr(events),function(event){handler?handlers[event]&&handlers[event].splice(inArray(handlers[event],handler),1):delete handlers[event]}),this}},emit:function emit(event,data){this.options.domEvents&&triggerDomEvent(event,data);var handlers=this.handlers[event]&&this.handlers[event].slice();if(handlers&&handlers.length){data.type=event,data.preventDefault=function(){data.srcEvent.preventDefault()};for(var i=0;i<handlers.length;)handlers[i](data),i++}},destroy:function destroy(){this.element&&toggleCssProps(this,!1),this.handlers={},this.session={},this.input.destroy(),this.element=null}},assign(Hammer,{INPUT_START:INPUT_START,INPUT_MOVE:INPUT_MOVE,INPUT_END:INPUT_END,INPUT_CANCEL:INPUT_CANCEL,STATE_POSSIBLE:1,STATE_BEGAN:STATE_BEGAN,STATE_CHANGED:STATE_CHANGED,STATE_ENDED:STATE_ENDED,STATE_RECOGNIZED:STATE_RECOGNIZED,STATE_CANCELLED:STATE_CANCELLED,STATE_FAILED:STATE_FAILED,DIRECTION_NONE:DIRECTION_NONE,DIRECTION_LEFT:DIRECTION_LEFT,DIRECTION_RIGHT:DIRECTION_RIGHT,DIRECTION_UP:DIRECTION_UP,DIRECTION_DOWN:DIRECTION_DOWN,DIRECTION_HORIZONTAL:DIRECTION_HORIZONTAL,DIRECTION_VERTICAL:DIRECTION_VERTICAL,DIRECTION_ALL:DIRECTION_ALL,Manager:Manager,Input:Input,TouchAction:TouchAction,TouchInput:TouchInput,MouseInput:MouseInput,PointerEventInput:PointerEventInput,TouchMouseInput:TouchMouseInput,SingleTouchInput:SingleTouchInput,Recognizer:Recognizer,AttrRecognizer:AttrRecognizer,Tap:TapRecognizer,Pan:PanRecognizer,Swipe:SwipeRecognizer,Pinch:PinchRecognizer,Rotate:RotateRecognizer,Press:PressRecognizer,on:addEventListeners,off:removeEventListeners,each:each,merge:merge,extend:extend,assign:assign,inherit:inherit,bindFn:bindFn,prefixed:prefixed});var freeGlobal="undefined"==typeof window?"undefined"==typeof self?{}:self:window;freeGlobal.Hammer=Hammer,"function"==typeof define&&define.amd?define(function(){return Hammer}):"undefined"!=typeof module&&module.exports?module.exports=Hammer:window[exportName]=Hammer}(window,document,"Hammer"),module.exports=Hammer,module.exports._=_});