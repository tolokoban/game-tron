require("tfw.listeners",function(t,r,i){var n=function(){function r(){return n(i,arguments)}var i={en:{}},n=t("$").intl;return r.all=i,r}(),e=function(){this._list=[]};e.prototype.add=function(t,r){if("function"!=typeof t)return!1;this.remove(t);for(var i=0;i<this._list.length;i++)if(t===this._list[i])return!1;return this._list.push([t,r]),!0},e.prototype.remove=function(t,r){if("function"!=typeof t)return!1;for(var i=0;i<this._list.length;i++){var n=this._list[i];if(t===n[0]&&r===n[1])return this._list.splice(i,1),!0}return!1},e.prototype.clear=function(){this._list=[]},e.prototype.fire=function(){var t,r,i,n,e=Array.prototype.slice.call(arguments);for(t=0;t<this._list.length;t++)if(n=this._list[t],r=n[0],i=n[1],!1===r.apply(i,e))return!1;return!0},r.exports=e,r.exports._=n});
//# sourceMappingURL=tfw.listeners.js.map