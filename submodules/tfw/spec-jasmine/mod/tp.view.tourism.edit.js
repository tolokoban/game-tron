require("tp.view.tourism.edit",function(e,t,i){var n=function(){function t(){return n(i,arguments)}var i={en:{altitude:"Altitude",duration:"Duration",level:"Difficulty"},fr:{altitude:"Altitude",duration:"Durée",level:"Difficulté"}},n=e("$").intl;return t.all=i,t}();try{t.exports=function(){function t(e,t,i){return void 0===e[t]?i:e[t]}var i=e("dom"),a=e("tfw.binding.property-manager"),l=e("tfw.view").Tag,o=e("tfw.binding.link"),r=e("tfw.binding.converters"),s=e("tfw.view.textbox"),u=e("tfw.view.checkbox"),b=e("tfw.view.language"),d=r.get("boolean"),v=r.get("multilang");return function(e){try{void 0===e&&(e={}),this.$elements={};var r=this,w=a(this);w.create("durationVisible",{cast:d}),w.create("duration",{cast:v}),w.create("levelVisible",{cast:d}),w.create("level",{cast:v}),w.create("altitudeVisible",{cast:d}),w.create("altitude",{cast:v});var m=new l("DIV",["class"]),c=new l("DIV"),j=new l("DIV"),V=new u({content:n("level")});i.add(j,V);var f=new l("DIV"),A=new s;this.$elements.levelText=A;var h=new b;i.add(f,A,h),i.add(c,j,f);var B=new l("DIV"),D=new l("DIV"),p=new u({content:n("duration")});i.add(D,p);var g=new l("DIV"),x=new s;this.$elements.durationText=x;var I=new b;i.add(g,x,I),i.add(B,D,g);var $=new l("DIV"),T=new l("DIV"),y=new u({content:n("altitude")});i.add(T,y);var k=new l("DIV"),E=new s;this.$elements.altitudeText=E;var J=new b;i.add(k,E,J),i.add($,T,k),i.add(m,c,B,$),Object.defineProperty(this,"$",{value:m.$,writable:!1,enumerable:!1,configurable:!1}),new o({A:{obj:r,name:"levelVisible"},B:{obj:V,name:"value"}}),new o({A:{obj:r,name:"levelVisible",open:!1},B:{obj:A,name:"focus"}}),new o({A:{obj:r,name:"levelVisible"},B:{obj:A,name:"visible"}}),new o({A:{obj:r,name:"level"},B:{obj:h,name:"value"}}),new o({A:{obj:r.$elements.levelText,name:"value"},B:{obj:h,name:"current"}}),new o({A:{obj:r,name:"levelVisible"},B:{obj:h,name:"visible"}}),new o({A:{obj:r,name:"durationVisible"},B:{obj:p,name:"value"}}),new o({A:{obj:r,name:"durationVisible",open:!1},B:{obj:x,name:"focus"}}),new o({A:{obj:r,name:"durationVisible"},B:{obj:x,name:"visible"}}),new o({A:{obj:r,name:"duration"},B:{obj:I,name:"value"}}),new o({A:{obj:r.$elements.durationText,name:"value"},B:{obj:I,name:"current"}}),new o({A:{obj:r,name:"durationVisible"},B:{obj:I,name:"visible"}}),new o({A:{obj:r,name:"altitudeVisible"},B:{obj:y,name:"value"}}),new o({A:{obj:r,name:"altitudeVisible",open:!1},B:{obj:E,name:"focus"}}),new o({A:{obj:r,name:"altitudeVisible"},B:{obj:E,name:"visible"}}),new o({A:{obj:r,name:"altitude"},B:{obj:J,name:"value"}}),new o({A:{obj:r.$elements.altitudeText,name:"value"},B:{obj:J,name:"current"}}),new o({A:{obj:r,name:"altitudeVisible"},B:{obj:J,name:"visible"}}),m.class="tp-view-tourism-edit",this.durationVisible=t(e,"durationVisible",!1),this.duration=t(e,"duration",{}),this.levelVisible=t(e,"levelVisible",!1),this.level=t(e,"level",{}),this.altitudeVisible=t(e,"altitudeVisible",!1),this.altitude=t(e,"altitude",{}),i.addClass(this,"view","custom")}catch(e){throw console.error("mod/tp.view.tourism.edit.js",e),Error('Instantiation error in XJS of "mod/tp.view.tourism.edit.js":\n'+e)}}}()}catch(e){throw Error('Definition error in XJS of "mod/tp.view.tourism.edit.js"\n'+e)}t.exports._=n});
//# sourceMappingURL=tp.view.tourism.edit.js.map