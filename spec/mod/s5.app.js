"use strict";require("s5.app",function(require,module,exports){function createBoundaries(){var w=0<arguments.length&&void 0!==arguments[0]?arguments[0]:60,h=1<arguments.length&&void 0!==arguments[1]?arguments[1]:60,polyline=new Polyline(-(w/2),5-h/2);return polyline.move(0,h-11),polyline.add(),polyline.move(5,0),polyline.add(),polyline.move(0,5),polyline.add(),polyline.move(w-11,0),polyline.add(),polyline.move(0,-5),polyline.add(),polyline.move(5,0),polyline.add(),polyline.move(0,11-h),polyline.add(),polyline.move(-5,0),polyline.add(),polyline.move(0,-5),polyline.add(),polyline.move(11-w,0),polyline.add(),polyline.move(0,5),polyline.add(),polyline.move(-5,0),[polyline]}var Dom=require("dom"),Car=require("s5.car"),Action=require("s5.tron.action"),Polyline=require("s5.polyline"),CarWall=require("s5.painter.car-wall"),Resize=require("webgl.resize"),Camera=require("webgl.camera");exports.start=function(){function anim(time){window.requestAnimationFrame(anim),framesCount++,15<framesCount&&(framesCount=0,fps.textContent="".concat(Math.floor(.5+16e3/(time-lastTime))," FPS"),lastTime=time),Resize(gl,1)&&(camera.aspect=gl.drawingBufferWidth/gl.drawingBufferHeight);var lat=.35+.3*Math.abs(Math.cos(9e-5*time));camera.orbit(player.polyline.lastX,player.polyline.lastY,0,50,lat,1e-4*time),boundaryPainter.paint(camera.matrix);for(var car,_i2=0;_i2<cars.length;_i2++)car=cars[_i2],car.isDead||car.painter.paint(camera.matrix);for(var _car,_i3=0;_i3<cars.length;_i3++)if(_car=cars[_i3],!_car.isDead){var x0=_car.polyline.lastX,y0=_car.polyline.lastY;_car.move(time);for(var obstacle,x1=_car.polyline.lastX,y1=_car.polyline.lastY,_i4=0;_i4<cars.length;_i4++)if(obstacle=cars[_i4],!obstacle.isDead&&obstacle.polyline.collide(x0,y0,x1,y1)){_car.isDead=!0,console.log("DEAD!");break}if(!_car.isDead){var _iteratorNormalCompletion=!0,_didIteratorError=!1,_iteratorError=void 0;try{for(var _step,boundary,_iterator=boundaries[Symbol.iterator]();!(_iteratorNormalCompletion=(_step=_iterator.next()).done);_iteratorNormalCompletion=!0)if(boundary=_step.value,boundary.collide(x0,y0,x1,y1)){_car.isDead=!0,console.log("DEAD in boundary!");break}}catch(err){_didIteratorError=!0,_iteratorError=err}finally{try{_iteratorNormalCompletion||null==_iterator.return||_iterator.return()}finally{if(_didIteratorError)throw _iteratorError}}}}}var canvas=Dom("canvas"),gl=canvas.getContext("webgl",{}),camera=new Camera,player=new Car({action:Action.create({type:"keyboard"}),x:-25,y:0,dir:1,color:new Float32Array([1,1,0])}),ennemy1=new Car({action:Action.create({type:"ai",targets:[player]}),reaction:10,x:25,y:7,dir:3,color:new Float32Array([0,1,1])}),ennemy2=new Car({action:Action.create({type:"ai",targets:[player]}),reaction:20,x:0,y:-24,dir:2,color:new Float32Array([1,0,1])}),ennemy3=new Car({action:Action.create({type:"ai",targets:[player]}),reaction:30,x:6,y:-24,dir:0,color:new Float32Array([1,.5,.25])}),cars=[player,ennemy1,ennemy2,ennemy3],boundaries=createBoundaries(),boundaryPainter=new CarWall(gl,boundaries[0],new Float32Array([.3,.3,.3]));cars.forEach(function(car){car.painter=new CarWall(gl,car.polyline,car.color)});for(var ennemy,_arr=[ennemy1,ennemy2,ennemy3],_i=0;_i<_arr.length;_i++)ennemy=_arr[_i],ennemy.action.car=ennemy,ennemy.action.cars=cars,ennemy.action.boundaries=boundaries;gl.clearColor(.3,.3,.3,1);var lastTime=0,framesCount=0,fps=document.getElementById("FPS");gl.enable(gl.DEPTH_TEST),gl.depthFunc(gl.LESS),window.requestAnimationFrame(anim)},module.exports._=function _(){return""}});