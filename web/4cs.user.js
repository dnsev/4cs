// ==UserScript==
// @name        4chan Media Player
// @version     1.4
// @namespace   dnsev
// @description 4chan Media Player
// @grant       GM_xmlhttpRequest
// @grant       GM_info
// @include     http://boards.4chan.org/*
// @include     https://boards.4chan.org/*
// @include     http://archive.foolz.us/*
// @include     https://archive.foolz.us/*
// @updateURL   https://raw.github.com/dnsev/4cs/master/web/4cs.user.js
// @downloadURL https://raw.github.com/dnsev/4cs/master/web/4cs.user.js
// ==/UserScript==
// For license information, check the individual files
(function(e,t){function _(e){var t=M[e]={};return v.each(e.split(y),function(e,n){t[n]=!0}),t}function H(e,n,r){if(r===t&&e.nodeType===1){var i="data-"+n.replace(P,"-$1").toLowerCase();r=e.getAttribute(i);if(typeof r=="string"){try{r=r==="true"?!0:r==="false"?!1:r==="null"?null:+r+""===r?+r:D.test(r)?v.parseJSON(r):r}catch(s){}v.data(e,n,r)}else r=t}return r}function B(e){var t;for(t in e){if(t==="data"&&v.isEmptyObject(e[t]))continue;if(t!=="toJSON")return!1}return!0}function et(){return!1}function tt(){return!0}function ut(e){return!e||!e.parentNode||e.parentNode.nodeType===11}function at(e,t){do e=e[t];while(e&&e.nodeType!==1);return e}function ft(e,t,n){t=t||0;if(v.isFunction(t))return v.grep(e,function(e,r){var i=!!t.call(e,r,e);return i===n});if(t.nodeType)return v.grep(e,function(e,r){return e===t===n});if(typeof t=="string"){var r=v.grep(e,function(e){return e.nodeType===1});if(it.test(t))return v.filter(t,r,!n);t=v.filter(t,r)}return v.grep(e,function(e,r){return v.inArray(e,t)>=0===n})}function lt(e){var t=ct.split("|"),n=e.createDocumentFragment();if(n.createElement)while(t.length)n.createElement(t.pop());return n}function Lt(e,t){return e.getElementsByTagName(t)[0]||e.appendChild(e.ownerDocument.createElement(t))}function At(e,t){if(t.nodeType!==1||!v.hasData(e))return;var n,r,i,s=v._data(e),o=v._data(t,s),u=s.events;if(u){delete o.handle,o.events={};for(n in u)for(r=0,i=u[n].length;r<i;r++)v.event.add(t,n,u[n][r])}o.data&&(o.data=v.extend({},o.data))}function Ot(e,t){var n;if(t.nodeType!==1)return;t.clearAttributes&&t.clearAttributes(),t.mergeAttributes&&t.mergeAttributes(e),n=t.nodeName.toLowerCase(),n==="object"?(t.parentNode&&(t.outerHTML=e.outerHTML),v.support.html5Clone&&e.innerHTML&&!v.trim(t.innerHTML)&&(t.innerHTML=e.innerHTML)):n==="input"&&Et.test(e.type)?(t.defaultChecked=t.checked=e.checked,t.value!==e.value&&(t.value=e.value)):n==="option"?t.selected=e.defaultSelected:n==="input"||n==="textarea"?t.defaultValue=e.defaultValue:n==="script"&&t.text!==e.text&&(t.text=e.text),t.removeAttribute(v.expando)}function Mt(e){return typeof e.getElementsByTagName!="undefined"?e.getElementsByTagName("*"):typeof e.querySelectorAll!="undefined"?e.querySelectorAll("*"):[]}function _t(e){Et.test(e.type)&&(e.defaultChecked=e.checked)}function Qt(e,t){if(t in e)return t;var n=t.charAt(0).toUpperCase()+t.slice(1),r=t,i=Jt.length;while(i--){t=Jt[i]+n;if(t in e)return t}return r}function Gt(e,t){return e=t||e,v.css(e,"display")==="none"||!v.contains(e.ownerDocument,e)}function Yt(e,t){var n,r,i=[],s=0,o=e.length;for(;s<o;s++){n=e[s];if(!n.style)continue;i[s]=v._data(n,"olddisplay"),t?(!i[s]&&n.style.display==="none"&&(n.style.display=""),n.style.display===""&&Gt(n)&&(i[s]=v._data(n,"olddisplay",nn(n.nodeName)))):(r=Dt(n,"display"),!i[s]&&r!=="none"&&v._data(n,"olddisplay",r))}for(s=0;s<o;s++){n=e[s];if(!n.style)continue;if(!t||n.style.display==="none"||n.style.display==="")n.style.display=t?i[s]||"":"none"}return e}function Zt(e,t,n){var r=Rt.exec(t);return r?Math.max(0,r[1]-(n||0))+(r[2]||"px"):t}function en(e,t,n,r){var i=n===(r?"border":"content")?4:t==="width"?1:0,s=0;for(;i<4;i+=2)n==="margin"&&(s+=v.css(e,n+$t[i],!0)),r?(n==="content"&&(s-=parseFloat(Dt(e,"padding"+$t[i]))||0),n!=="margin"&&(s-=parseFloat(Dt(e,"border"+$t[i]+"Width"))||0)):(s+=parseFloat(Dt(e,"padding"+$t[i]))||0,n!=="padding"&&(s+=parseFloat(Dt(e,"border"+$t[i]+"Width"))||0));return s}function tn(e,t,n){var r=t==="width"?e.offsetWidth:e.offsetHeight,i=!0,s=v.support.boxSizing&&v.css(e,"boxSizing")==="border-box";if(r<=0||r==null){r=Dt(e,t);if(r<0||r==null)r=e.style[t];if(Ut.test(r))return r;i=s&&(v.support.boxSizingReliable||r===e.style[t]),r=parseFloat(r)||0}return r+en(e,t,n||(s?"border":"content"),i)+"px"}function nn(e){if(Wt[e])return Wt[e];var t=v("<"+e+">").appendTo(i.body),n=t.css("display");t.remove();if(n==="none"||n===""){Pt=i.body.appendChild(Pt||v.extend(i.createElement("iframe"),{frameBorder:0,width:0,height:0}));if(!Ht||!Pt.createElement)Ht=(Pt.contentWindow||Pt.contentDocument).document,Ht.write("<!doctype html><html><body>"),Ht.close();t=Ht.body.appendChild(Ht.createElement(e)),n=Dt(t,"display"),i.body.removeChild(Pt)}return Wt[e]=n,n}function fn(e,t,n,r){var i;if(v.isArray(t))v.each(t,function(t,i){n||sn.test(e)?r(e,i):fn(e+"["+(typeof i=="object"?t:"")+"]",i,n,r)});else if(!n&&v.type(t)==="object")for(i in t)fn(e+"["+i+"]",t[i],n,r);else r(e,t)}function Cn(e){return function(t,n){typeof t!="string"&&(n=t,t="*");var r,i,s,o=t.toLowerCase().split(y),u=0,a=o.length;if(v.isFunction(n))for(;u<a;u++)r=o[u],s=/^\+/.test(r),s&&(r=r.substr(1)||"*"),i=e[r]=e[r]||[],i[s?"unshift":"push"](n)}}function kn(e,n,r,i,s,o){s=s||n.dataTypes[0],o=o||{},o[s]=!0;var u,a=e[s],f=0,l=a?a.length:0,c=e===Sn;for(;f<l&&(c||!u);f++)u=a[f](n,r,i),typeof u=="string"&&(!c||o[u]?u=t:(n.dataTypes.unshift(u),u=kn(e,n,r,i,u,o)));return(c||!u)&&!o["*"]&&(u=kn(e,n,r,i,"*",o)),u}function Ln(e,n){var r,i,s=v.ajaxSettings.flatOptions||{};for(r in n)n[r]!==t&&((s[r]?e:i||(i={}))[r]=n[r]);i&&v.extend(!0,e,i)}function An(e,n,r){var i,s,o,u,a=e.contents,f=e.dataTypes,l=e.responseFields;for(s in l)s in r&&(n[l[s]]=r[s]);while(f[0]==="*")f.shift(),i===t&&(i=e.mimeType||n.getResponseHeader("content-type"));if(i)for(s in a)if(a[s]&&a[s].test(i)){f.unshift(s);break}if(f[0]in r)o=f[0];else{for(s in r){if(!f[0]||e.converters[s+" "+f[0]]){o=s;break}u||(u=s)}o=o||u}if(o)return o!==f[0]&&f.unshift(o),r[o]}function On(e,t){var n,r,i,s,o=e.dataTypes.slice(),u=o[0],a={},f=0;e.dataFilter&&(t=e.dataFilter(t,e.dataType));if(o[1])for(n in e.converters)a[n.toLowerCase()]=e.converters[n];for(;i=o[++f];)if(i!=="*"){if(u!=="*"&&u!==i){n=a[u+" "+i]||a["* "+i];if(!n)for(r in a){s=r.split(" ");if(s[1]===i){n=a[u+" "+s[0]]||a["* "+s[0]];if(n){n===!0?n=a[r]:a[r]!==!0&&(i=s[0],o.splice(f--,0,i));break}}}if(n!==!0)if(n&&e["throws"])t=n(t);else try{t=n(t)}catch(l){return{state:"parsererror",error:n?l:"No conversion from "+u+" to "+i}}}u=i}return{state:"success",data:t}}function Fn(){try{return new e.XMLHttpRequest}catch(t){}}function In(){try{return new e.ActiveXObject("Microsoft.XMLHTTP")}catch(t){}}function $n(){return setTimeout(function(){qn=t},0),qn=v.now()}function Jn(e,t){v.each(t,function(t,n){var r=(Vn[t]||[]).concat(Vn["*"]),i=0,s=r.length;for(;i<s;i++)if(r[i].call(e,t,n))return})}function Kn(e,t,n){var r,i=0,s=0,o=Xn.length,u=v.Deferred().always(function(){delete a.elem}),a=function(){var t=qn||$n(),n=Math.max(0,f.startTime+f.duration-t),r=n/f.duration||0,i=1-r,s=0,o=f.tweens.length;for(;s<o;s++)f.tweens[s].run(i);return u.notifyWith(e,[f,i,n]),i<1&&o?n:(u.resolveWith(e,[f]),!1)},f=u.promise({elem:e,props:v.extend({},t),opts:v.extend(!0,{specialEasing:{}},n),originalProperties:t,originalOptions:n,startTime:qn||$n(),duration:n.duration,tweens:[],createTween:function(t,n,r){var i=v.Tween(e,f.opts,t,n,f.opts.specialEasing[t]||f.opts.easing);return f.tweens.push(i),i},stop:function(t){var n=0,r=t?f.tweens.length:0;for(;n<r;n++)f.tweens[n].run(1);return t?u.resolveWith(e,[f,t]):u.rejectWith(e,[f,t]),this}}),l=f.props;Qn(l,f.opts.specialEasing);for(;i<o;i++){r=Xn[i].call(f,e,l,f.opts);if(r)return r}return Jn(f,l),v.isFunction(f.opts.start)&&f.opts.start.call(e,f),v.fx.timer(v.extend(a,{anim:f,queue:f.opts.queue,elem:e})),f.progress(f.opts.progress).done(f.opts.done,f.opts.complete).fail(f.opts.fail).always(f.opts.always)}function Qn(e,t){var n,r,i,s,o;for(n in e){r=v.camelCase(n),i=t[r],s=e[n],v.isArray(s)&&(i=s[1],s=e[n]=s[0]),n!==r&&(e[r]=s,delete e[n]),o=v.cssHooks[r];if(o&&"expand"in o){s=o.expand(s),delete e[r];for(n in s)n in e||(e[n]=s[n],t[n]=i)}else t[r]=i}}function Gn(e,t,n){var r,i,s,o,u,a,f,l,c,h=this,p=e.style,d={},m=[],g=e.nodeType&&Gt(e);n.queue||(l=v._queueHooks(e,"fx"),l.unqueued==null&&(l.unqueued=0,c=l.empty.fire,l.empty.fire=function(){l.unqueued||c()}),l.unqueued++,h.always(function(){h.always(function(){l.unqueued--,v.queue(e,"fx").length||l.empty.fire()})})),e.nodeType===1&&("height"in t||"width"in t)&&(n.overflow=[p.overflow,p.overflowX,p.overflowY],v.css(e,"display")==="inline"&&v.css(e,"float")==="none"&&(!v.support.inlineBlockNeedsLayout||nn(e.nodeName)==="inline"?p.display="inline-block":p.zoom=1)),n.overflow&&(p.overflow="hidden",v.support.shrinkWrapBlocks||h.done(function(){p.overflow=n.overflow[0],p.overflowX=n.overflow[1],p.overflowY=n.overflow[2]}));for(r in t){s=t[r];if(Un.exec(s)){delete t[r],a=a||s==="toggle";if(s===(g?"hide":"show"))continue;m.push(r)}}o=m.length;if(o){u=v._data(e,"fxshow")||v._data(e,"fxshow",{}),"hidden"in u&&(g=u.hidden),a&&(u.hidden=!g),g?v(e).show():h.done(function(){v(e).hide()}),h.done(function(){var t;v.removeData(e,"fxshow",!0);for(t in d)v.style(e,t,d[t])});for(r=0;r<o;r++)i=m[r],f=h.createTween(i,g?u[i]:0),d[i]=u[i]||v.style(e,i),i in u||(u[i]=f.start,g&&(f.end=f.start,f.start=i==="width"||i==="height"?1:0))}}function Yn(e,t,n,r,i){return new Yn.prototype.init(e,t,n,r,i)}function Zn(e,t){var n,r={height:e},i=0;t=t?1:0;for(;i<4;i+=2-t)n=$t[i],r["margin"+n]=r["padding"+n]=e;return t&&(r.opacity=r.width=e),r}function tr(e){return v.isWindow(e)?e:e.nodeType===9?e.defaultView||e.parentWindow:!1}var n,r,i=e.document,s=e.location,o=e.navigator,u=e.jQuery,a=e.$,f=Array.prototype.push,l=Array.prototype.slice,c=Array.prototype.indexOf,h=Object.prototype.toString,p=Object.prototype.hasOwnProperty,d=String.prototype.trim,v=function(e,t){return new v.fn.init(e,t,n)},m=/[\-+]?(?:\d*\.|)\d+(?:[eE][\-+]?\d+|)/.source,g=/\S/,y=/\s+/,b=/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,w=/^(?:[^#<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/,E=/^<(\w+)\s*\/?>(?:<\/\1>|)$/,S=/^[\],:{}\s]*$/,x=/(?:^|:|,)(?:\s*\[)+/g,T=/\\(?:["\\\/bfnrt]|u[\da-fA-F]{4})/g,N=/"[^"\\\r\n]*"|true|false|null|-?(?:\d\d*\.|)\d+(?:[eE][\-+]?\d+|)/g,C=/^-ms-/,k=/-([\da-z])/gi,L=function(e,t){return(t+"").toUpperCase()},A=function(){i.addEventListener?(i.removeEventListener("DOMContentLoaded",A,!1),v.ready()):i.readyState==="complete"&&(i.detachEvent("onreadystatechange",A),v.ready())},O={};v.fn=v.prototype={constructor:v,init:function(e,n,r){var s,o,u,a;if(!e)return this;if(e.nodeType)return this.context=this[0]=e,this.length=1,this;if(typeof e=="string"){e.charAt(0)==="<"&&e.charAt(e.length-1)===">"&&e.length>=3?s=[null,e,null]:s=w.exec(e);if(s&&(s[1]||!n)){if(s[1])return n=n instanceof v?n[0]:n,a=n&&n.nodeType?n.ownerDocument||n:i,e=v.parseHTML(s[1],a,!0),E.test(s[1])&&v.isPlainObject(n)&&this.attr.call(e,n,!0),v.merge(this,e);o=i.getElementById(s[2]);if(o&&o.parentNode){if(o.id!==s[2])return r.find(e);this.length=1,this[0]=o}return this.context=i,this.selector=e,this}return!n||n.jquery?(n||r).find(e):this.constructor(n).find(e)}return v.isFunction(e)?r.ready(e):(e.selector!==t&&(this.selector=e.selector,this.context=e.context),v.makeArray(e,this))},selector:"",jquery:"1.8.3",length:0,size:function(){return this.length},toArray:function(){return l.call(this)},get:function(e){return e==null?this.toArray():e<0?this[this.length+e]:this[e]},pushStack:function(e,t,n){var r=v.merge(this.constructor(),e);return r.prevObject=this,r.context=this.context,t==="find"?r.selector=this.selector+(this.selector?" ":"")+n:t&&(r.selector=this.selector+"."+t+"("+n+")"),r},each:function(e,t){return v.each(this,e,t)},ready:function(e){return v.ready.promise().done(e),this},eq:function(e){return e=+e,e===-1?this.slice(e):this.slice(e,e+1)},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},slice:function(){return this.pushStack(l.apply(this,arguments),"slice",l.call(arguments).join(","))},map:function(e){return this.pushStack(v.map(this,function(t,n){return e.call(t,n,t)}))},end:function(){return this.prevObject||this.constructor(null)},push:f,sort:[].sort,splice:[].splice},v.fn.init.prototype=v.fn,v.extend=v.fn.extend=function(){var e,n,r,i,s,o,u=arguments[0]||{},a=1,f=arguments.length,l=!1;typeof u=="boolean"&&(l=u,u=arguments[1]||{},a=2),typeof u!="object"&&!v.isFunction(u)&&(u={}),f===a&&(u=this,--a);for(;a<f;a++)if((e=arguments[a])!=null)for(n in e){r=u[n],i=e[n];if(u===i)continue;l&&i&&(v.isPlainObject(i)||(s=v.isArray(i)))?(s?(s=!1,o=r&&v.isArray(r)?r:[]):o=r&&v.isPlainObject(r)?r:{},u[n]=v.extend(l,o,i)):i!==t&&(u[n]=i)}return u},v.extend({noConflict:function(t){return e.$===v&&(e.$=a),t&&e.jQuery===v&&(e.jQuery=u),v},isReady:!1,readyWait:1,holdReady:function(e){e?v.readyWait++:v.ready(!0)},ready:function(e){if(e===!0?--v.readyWait:v.isReady)return;if(!i.body)return setTimeout(v.ready,1);v.isReady=!0;if(e!==!0&&--v.readyWait>0)return;r.resolveWith(i,[v]),v.fn.trigger&&v(i).trigger("ready").off("ready")},isFunction:function(e){return v.type(e)==="function"},isArray:Array.isArray||function(e){return v.type(e)==="array"},isWindow:function(e){return e!=null&&e==e.window},isNumeric:function(e){return!isNaN(parseFloat(e))&&isFinite(e)},type:function(e){return e==null?String(e):O[h.call(e)]||"object"},isPlainObject:function(e){if(!e||v.type(e)!=="object"||e.nodeType||v.isWindow(e))return!1;try{if(e.constructor&&!p.call(e,"constructor")&&!p.call(e.constructor.prototype,"isPrototypeOf"))return!1}catch(n){return!1}var r;for(r in e);return r===t||p.call(e,r)},isEmptyObject:function(e){var t;for(t in e)return!1;return!0},error:function(e){throw new Error(e)},parseHTML:function(e,t,n){var r;return!e||typeof e!="string"?null:(typeof t=="boolean"&&(n=t,t=0),t=t||i,(r=E.exec(e))?[t.createElement(r[1])]:(r=v.buildFragment([e],t,n?null:[]),v.merge([],(r.cacheable?v.clone(r.fragment):r.fragment).childNodes)))},parseJSON:function(t){if(!t||typeof t!="string")return null;t=v.trim(t);if(e.JSON&&e.JSON.parse)return e.JSON.parse(t);if(S.test(t.replace(T,"@").replace(N,"]").replace(x,"")))return(new Function("return "+t))();v.error("Invalid JSON: "+t)},parseXML:function(n){var r,i;if(!n||typeof n!="string")return null;try{e.DOMParser?(i=new DOMParser,r=i.parseFromString(n,"text/xml")):(r=new ActiveXObject("Microsoft.XMLDOM"),r.async="false",r.loadXML(n))}catch(s){r=t}return(!r||!r.documentElement||r.getElementsByTagName("parsererror").length)&&v.error("Invalid XML: "+n),r},noop:function(){},globalEval:function(t){t&&g.test(t)&&(e.execScript||function(t){e.eval.call(e,t)})(t)},camelCase:function(e){return e.replace(C,"ms-").replace(k,L)},nodeName:function(e,t){return e.nodeName&&e.nodeName.toLowerCase()===t.toLowerCase()},each:function(e,n,r){var i,s=0,o=e.length,u=o===t||v.isFunction(e);if(r){if(u){for(i in e)if(n.apply(e[i],r)===!1)break}else for(;s<o;)if(n.apply(e[s++],r)===!1)break}else if(u){for(i in e)if(n.call(e[i],i,e[i])===!1)break}else for(;s<o;)if(n.call(e[s],s,e[s++])===!1)break;return e},trim:d&&!d.call("\ufeff\u00a0")?function(e){return e==null?"":d.call(e)}:function(e){return e==null?"":(e+"").replace(b,"")},makeArray:function(e,t){var n,r=t||[];return e!=null&&(n=v.type(e),e.length==null||n==="string"||n==="function"||n==="regexp"||v.isWindow(e)?f.call(r,e):v.merge(r,e)),r},inArray:function(e,t,n){var r;if(t){if(c)return c.call(t,e,n);r=t.length,n=n?n<0?Math.max(0,r+n):n:0;for(;n<r;n++)if(n in t&&t[n]===e)return n}return-1},merge:function(e,n){var r=n.length,i=e.length,s=0;if(typeof r=="number")for(;s<r;s++)e[i++]=n[s];else while(n[s]!==t)e[i++]=n[s++];return e.length=i,e},grep:function(e,t,n){var r,i=[],s=0,o=e.length;n=!!n;for(;s<o;s++)r=!!t(e[s],s),n!==r&&i.push(e[s]);return i},map:function(e,n,r){var i,s,o=[],u=0,a=e.length,f=e instanceof v||a!==t&&typeof a=="number"&&(a>0&&e[0]&&e[a-1]||a===0||v.isArray(e));if(f)for(;u<a;u++)i=n(e[u],u,r),i!=null&&(o[o.length]=i);else for(s in e)i=n(e[s],s,r),i!=null&&(o[o.length]=i);return o.concat.apply([],o)},guid:1,proxy:function(e,n){var r,i,s;return typeof n=="string"&&(r=e[n],n=e,e=r),v.isFunction(e)?(i=l.call(arguments,2),s=function(){return e.apply(n,i.concat(l.call(arguments)))},s.guid=e.guid=e.guid||v.guid++,s):t},access:function(e,n,r,i,s,o,u){var a,f=r==null,l=0,c=e.length;if(r&&typeof r=="object"){for(l in r)v.access(e,n,l,r[l],1,o,i);s=1}else if(i!==t){a=u===t&&v.isFunction(i),f&&(a?(a=n,n=function(e,t,n){return a.call(v(e),n)}):(n.call(e,i),n=null));if(n)for(;l<c;l++)n(e[l],r,a?i.call(e[l],l,n(e[l],r)):i,u);s=1}return s?e:f?n.call(e):c?n(e[0],r):o},now:function(){return(new Date).getTime()}}),v.ready.promise=function(t){if(!r){r=v.Deferred();if(i.readyState==="complete")setTimeout(v.ready,1);else if(i.addEventListener)i.addEventListener("DOMContentLoaded",A,!1),e.addEventListener("load",v.ready,!1);else{i.attachEvent("onreadystatechange",A),e.attachEvent("onload",v.ready);var n=!1;try{n=e.frameElement==null&&i.documentElement}catch(s){}n&&n.doScroll&&function o(){if(!v.isReady){try{n.doScroll("left")}catch(e){return setTimeout(o,50)}v.ready()}}()}}return r.promise(t)},v.each("Boolean Number String Function Array Date RegExp Object".split(" "),function(e,t){O["[object "+t+"]"]=t.toLowerCase()}),n=v(i);var M={};v.Callbacks=function(e){e=typeof e=="string"?M[e]||_(e):v.extend({},e);var n,r,i,s,o,u,a=[],f=!e.once&&[],l=function(t){n=e.memory&&t,r=!0,u=s||0,s=0,o=a.length,i=!0;for(;a&&u<o;u++)if(a[u].apply(t[0],t[1])===!1&&e.stopOnFalse){n=!1;break}i=!1,a&&(f?f.length&&l(f.shift()):n?a=[]:c.disable())},c={add:function(){if(a){var t=a.length;(function r(t){v.each(t,function(t,n){var i=v.type(n);i==="function"?(!e.unique||!c.has(n))&&a.push(n):n&&n.length&&i!=="string"&&r(n)})})(arguments),i?o=a.length:n&&(s=t,l(n))}return this},remove:function(){return a&&v.each(arguments,function(e,t){var n;while((n=v.inArray(t,a,n))>-1)a.splice(n,1),i&&(n<=o&&o--,n<=u&&u--)}),this},has:function(e){return v.inArray(e,a)>-1},empty:function(){return a=[],this},disable:function(){return a=f=n=t,this},disabled:function(){return!a},lock:function(){return f=t,n||c.disable(),this},locked:function(){return!f},fireWith:function(e,t){return t=t||[],t=[e,t.slice?t.slice():t],a&&(!r||f)&&(i?f.push(t):l(t)),this},fire:function(){return c.fireWith(this,arguments),this},fired:function(){return!!r}};return c},v.extend({Deferred:function(e){var t=[["resolve","done",v.Callbacks("once memory"),"resolved"],["reject","fail",v.Callbacks("once memory"),"rejected"],["notify","progress",v.Callbacks("memory")]],n="pending",r={state:function(){return n},always:function(){return i.done(arguments).fail(arguments),this},then:function(){var e=arguments;return v.Deferred(function(n){v.each(t,function(t,r){var s=r[0],o=e[t];i[r[1]](v.isFunction(o)?function(){var e=o.apply(this,arguments);e&&v.isFunction(e.promise)?e.promise().done(n.resolve).fail(n.reject).progress(n.notify):n[s+"With"](this===i?n:this,[e])}:n[s])}),e=null}).promise()},promise:function(e){return e!=null?v.extend(e,r):r}},i={};return r.pipe=r.then,v.each(t,function(e,s){var o=s[2],u=s[3];r[s[1]]=o.add,u&&o.add(function(){n=u},t[e^1][2].disable,t[2][2].lock),i[s[0]]=o.fire,i[s[0]+"With"]=o.fireWith}),r.promise(i),e&&e.call(i,i),i},when:function(e){var t=0,n=l.call(arguments),r=n.length,i=r!==1||e&&v.isFunction(e.promise)?r:0,s=i===1?e:v.Deferred(),o=function(e,t,n){return function(r){t[e]=this,n[e]=arguments.length>1?l.call(arguments):r,n===u?s.notifyWith(t,n):--i||s.resolveWith(t,n)}},u,a,f;if(r>1){u=new Array(r),a=new Array(r),f=new Array(r);for(;t<r;t++)n[t]&&v.isFunction(n[t].promise)?n[t].promise().done(o(t,f,n)).fail(s.reject).progress(o(t,a,u)):--i}return i||s.resolveWith(f,n),s.promise()}}),v.support=function(){var t,n,r,s,o,u,a,f,l,c,h,p=i.createElement("div");p.setAttribute("className","t"),p.innerHTML="  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>",n=p.getElementsByTagName("*"),r=p.getElementsByTagName("a")[0];if(!n||!r||!n.length)return{};s=i.createElement("select"),o=s.appendChild(i.createElement("option")),u=p.getElementsByTagName("input")[0],r.style.cssText="top:1px;float:left;opacity:.5",t={leadingWhitespace:p.firstChild.nodeType===3,tbody:!p.getElementsByTagName("tbody").length,htmlSerialize:!!p.getElementsByTagName("link").length,style:/top/.test(r.getAttribute("style")),hrefNormalized:r.getAttribute("href")==="/a",opacity:/^0.5/.test(r.style.opacity),cssFloat:!!r.style.cssFloat,checkOn:u.value==="on",optSelected:o.selected,getSetAttribute:p.className!=="t",enctype:!!i.createElement("form").enctype,html5Clone:i.createElement("nav").cloneNode(!0).outerHTML!=="<:nav></:nav>",boxModel:i.compatMode==="CSS1Compat",submitBubbles:!0,changeBubbles:!0,focusinBubbles:!1,deleteExpando:!0,noCloneEvent:!0,inlineBlockNeedsLayout:!1,shrinkWrapBlocks:!1,reliableMarginRight:!0,boxSizingReliable:!0,pixelPosition:!1},u.checked=!0,t.noCloneChecked=u.cloneNode(!0).checked,s.disabled=!0,t.optDisabled=!o.disabled;try{delete p.test}catch(d){t.deleteExpando=!1}!p.addEventListener&&p.attachEvent&&p.fireEvent&&(p.attachEvent("onclick",h=function(){t.noCloneEvent=!1}),p.cloneNode(!0).fireEvent("onclick"),p.detachEvent("onclick",h)),u=i.createElement("input"),u.value="t",u.setAttribute("type","radio"),t.radioValue=u.value==="t",u.setAttribute("checked","checked"),u.setAttribute("name","t"),p.appendChild(u),a=i.createDocumentFragment(),a.appendChild(p.lastChild),t.checkClone=a.cloneNode(!0).cloneNode(!0).lastChild.checked,t.appendChecked=u.checked,a.removeChild(u),a.appendChild(p);if(p.attachEvent)for(l in{submit:!0,change:!0,focusin:!0})f="on"+l,c=f in p,c||(p.setAttribute(f,"return;"),c=typeof p[f]=="function"),t[l+"Bubbles"]=c;return v(function(){var n,r,s,o,u="padding:0;margin:0;border:0;display:block;overflow:hidden;",a=i.getElementsByTagName("body")[0];if(!a)return;n=i.createElement("div"),n.style.cssText="visibility:hidden;border:0;width:0;height:0;position:static;top:0;margin-top:1px",a.insertBefore(n,a.firstChild),r=i.createElement("div"),n.appendChild(r),r.innerHTML="<table><tr><td></td><td>t</td></tr></table>",s=r.getElementsByTagName("td"),s[0].style.cssText="padding:0;margin:0;border:0;display:none",c=s[0].offsetHeight===0,s[0].style.display="",s[1].style.display="none",t.reliableHiddenOffsets=c&&s[0].offsetHeight===0,r.innerHTML="",r.style.cssText="box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%;",t.boxSizing=r.offsetWidth===4,t.doesNotIncludeMarginInBodyOffset=a.offsetTop!==1,e.getComputedStyle&&(t.pixelPosition=(e.getComputedStyle(r,null)||{}).top!=="1%",t.boxSizingReliable=(e.getComputedStyle(r,null)||{width:"4px"}).width==="4px",o=i.createElement("div"),o.style.cssText=r.style.cssText=u,o.style.marginRight=o.style.width="0",r.style.width="1px",r.appendChild(o),t.reliableMarginRight=!parseFloat((e.getComputedStyle(o,null)||{}).marginRight)),typeof r.style.zoom!="undefined"&&(r.innerHTML="",r.style.cssText=u+"width:1px;padding:1px;display:inline;zoom:1",t.inlineBlockNeedsLayout=r.offsetWidth===3,r.style.display="block",r.style.overflow="visible",r.innerHTML="<div></div>",r.firstChild.style.width="5px",t.shrinkWrapBlocks=r.offsetWidth!==3,n.style.zoom=1),a.removeChild(n),n=r=s=o=null}),a.removeChild(p),n=r=s=o=u=a=p=null,t}();var D=/(?:\{[\s\S]*\}|\[[\s\S]*\])$/,P=/([A-Z])/g;v.extend({cache:{},deletedIds:[],uuid:0,expando:"jQuery"+(v.fn.jquery+Math.random()).replace(/\D/g,""),noData:{embed:!0,object:"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",applet:!0},hasData:function(e){return e=e.nodeType?v.cache[e[v.expando]]:e[v.expando],!!e&&!B(e)},data:function(e,n,r,i){if(!v.acceptData(e))return;var s,o,u=v.expando,a=typeof n=="string",f=e.nodeType,l=f?v.cache:e,c=f?e[u]:e[u]&&u;if((!c||!l[c]||!i&&!l[c].data)&&a&&r===t)return;c||(f?e[u]=c=v.deletedIds.pop()||v.guid++:c=u),l[c]||(l[c]={},f||(l[c].toJSON=v.noop));if(typeof n=="object"||typeof n=="function")i?l[c]=v.extend(l[c],n):l[c].data=v.extend(l[c].data,n);return s=l[c],i||(s.data||(s.data={}),s=s.data),r!==t&&(s[v.camelCase(n)]=r),a?(o=s[n],o==null&&(o=s[v.camelCase(n)])):o=s,o},removeData:function(e,t,n){if(!v.acceptData(e))return;var r,i,s,o=e.nodeType,u=o?v.cache:e,a=o?e[v.expando]:v.expando;if(!u[a])return;if(t){r=n?u[a]:u[a].data;if(r){v.isArray(t)||(t in r?t=[t]:(t=v.camelCase(t),t in r?t=[t]:t=t.split(" ")));for(i=0,s=t.length;i<s;i++)delete r[t[i]];if(!(n?B:v.isEmptyObject)(r))return}}if(!n){delete u[a].data;if(!B(u[a]))return}o?v.cleanData([e],!0):v.support.deleteExpando||u!=u.window?delete u[a]:u[a]=null},_data:function(e,t,n){return v.data(e,t,n,!0)},acceptData:function(e){var t=e.nodeName&&v.noData[e.nodeName.toLowerCase()];return!t||t!==!0&&e.getAttribute("classid")===t}}),v.fn.extend({data:function(e,n){var r,i,s,o,u,a=this[0],f=0,l=null;if(e===t){if(this.length){l=v.data(a);if(a.nodeType===1&&!v._data(a,"parsedAttrs")){s=a.attributes;for(u=s.length;f<u;f++)o=s[f].name,o.indexOf("data-")||(o=v.camelCase(o.substring(5)),H(a,o,l[o]));v._data(a,"parsedAttrs",!0)}}return l}return typeof e=="object"?this.each(function(){v.data(this,e)}):(r=e.split(".",2),r[1]=r[1]?"."+r[1]:"",i=r[1]+"!",v.access(this,function(n){if(n===t)return l=this.triggerHandler("getData"+i,[r[0]]),l===t&&a&&(l=v.data(a,e),l=H(a,e,l)),l===t&&r[1]?this.data(r[0]):l;r[1]=n,this.each(function(){var t=v(this);t.triggerHandler("setData"+i,r),v.data(this,e,n),t.triggerHandler("changeData"+i,r)})},null,n,arguments.length>1,null,!1))},removeData:function(e){return this.each(function(){v.removeData(this,e)})}}),v.extend({queue:function(e,t,n){var r;if(e)return t=(t||"fx")+"queue",r=v._data(e,t),n&&(!r||v.isArray(n)?r=v._data(e,t,v.makeArray(n)):r.push(n)),r||[]},dequeue:function(e,t){t=t||"fx";var n=v.queue(e,t),r=n.length,i=n.shift(),s=v._queueHooks(e,t),o=function(){v.dequeue(e,t)};i==="inprogress"&&(i=n.shift(),r--),i&&(t==="fx"&&n.unshift("inprogress"),delete s.stop,i.call(e,o,s)),!r&&s&&s.empty.fire()},_queueHooks:function(e,t){var n=t+"queueHooks";return v._data(e,n)||v._data(e,n,{empty:v.Callbacks("once memory").add(function(){v.removeData(e,t+"queue",!0),v.removeData(e,n,!0)})})}}),v.fn.extend({queue:function(e,n){var r=2;return typeof e!="string"&&(n=e,e="fx",r--),arguments.length<r?v.queue(this[0],e):n===t?this:this.each(function(){var t=v.queue(this,e,n);v._queueHooks(this,e),e==="fx"&&t[0]!=="inprogress"&&v.dequeue(this,e)})},dequeue:function(e){return this.each(function(){v.dequeue(this,e)})},delay:function(e,t){return e=v.fx?v.fx.speeds[e]||e:e,t=t||"fx",this.queue(t,function(t,n){var r=setTimeout(t,e);n.stop=function(){clearTimeout(r)}})},clearQueue:function(e){return this.queue(e||"fx",[])},promise:function(e,n){var r,i=1,s=v.Deferred(),o=this,u=this.length,a=function(){--i||s.resolveWith(o,[o])};typeof e!="string"&&(n=e,e=t),e=e||"fx";while(u--)r=v._data(o[u],e+"queueHooks"),r&&r.empty&&(i++,r.empty.add(a));return a(),s.promise(n)}});var j,F,I,q=/[\t\r\n]/g,R=/\r/g,U=/^(?:button|input)$/i,z=/^(?:button|input|object|select|textarea)$/i,W=/^a(?:rea|)$/i,X=/^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i,V=v.support.getSetAttribute;v.fn.extend({attr:function(e,t){return v.access(this,v.attr,e,t,arguments.length>1)},removeAttr:function(e){return this.each(function(){v.removeAttr(this,e)})},prop:function(e,t){return v.access(this,v.prop,e,t,arguments.length>1)},removeProp:function(e){return e=v.propFix[e]||e,this.each(function(){try{this[e]=t,delete this[e]}catch(n){}})},addClass:function(e){var t,n,r,i,s,o,u;if(v.isFunction(e))return this.each(function(t){v(this).addClass(e.call(this,t,this.className))});if(e&&typeof e=="string"){t=e.split(y);for(n=0,r=this.length;n<r;n++){i=this[n];if(i.nodeType===1)if(!i.className&&t.length===1)i.className=e;else{s=" "+i.className+" ";for(o=0,u=t.length;o<u;o++)s.indexOf(" "+t[o]+" ")<0&&(s+=t[o]+" ");i.className=v.trim(s)}}}return this},removeClass:function(e){var n,r,i,s,o,u,a;if(v.isFunction(e))return this.each(function(t){v(this).removeClass(e.call(this,t,this.className))});if(e&&typeof e=="string"||e===t){n=(e||"").split(y);for(u=0,a=this.length;u<a;u++){i=this[u];if(i.nodeType===1&&i.className){r=(" "+i.className+" ").replace(q," ");for(s=0,o=n.length;s<o;s++)while(r.indexOf(" "+n[s]+" ")>=0)r=r.replace(" "+n[s]+" "," ");i.className=e?v.trim(r):""}}}return this},toggleClass:function(e,t){var n=typeof e,r=typeof t=="boolean";return v.isFunction(e)?this.each(function(n){v(this).toggleClass(e.call(this,n,this.className,t),t)}):this.each(function(){if(n==="string"){var i,s=0,o=v(this),u=t,a=e.split(y);while(i=a[s++])u=r?u:!o.hasClass(i),o[u?"addClass":"removeClass"](i)}else if(n==="undefined"||n==="boolean")this.className&&v._data(this,"__className__",this.className),this.className=this.className||e===!1?"":v._data(this,"__className__")||""})},hasClass:function(e){var t=" "+e+" ",n=0,r=this.length;for(;n<r;n++)if(this[n].nodeType===1&&(" "+this[n].className+" ").replace(q," ").indexOf(t)>=0)return!0;return!1},val:function(e){var n,r,i,s=this[0];if(!arguments.length){if(s)return n=v.valHooks[s.type]||v.valHooks[s.nodeName.toLowerCase()],n&&"get"in n&&(r=n.get(s,"value"))!==t?r:(r=s.value,typeof r=="string"?r.replace(R,""):r==null?"":r);return}return i=v.isFunction(e),this.each(function(r){var s,o=v(this);if(this.nodeType!==1)return;i?s=e.call(this,r,o.val()):s=e,s==null?s="":typeof s=="number"?s+="":v.isArray(s)&&(s=v.map(s,function(e){return e==null?"":e+""})),n=v.valHooks[this.type]||v.valHooks[this.nodeName.toLowerCase()];if(!n||!("set"in n)||n.set(this,s,"value")===t)this.value=s})}}),v.extend({valHooks:{option:{get:function(e){var t=e.attributes.value;return!t||t.specified?e.value:e.text}},select:{get:function(e){var t,n,r=e.options,i=e.selectedIndex,s=e.type==="select-one"||i<0,o=s?null:[],u=s?i+1:r.length,a=i<0?u:s?i:0;for(;a<u;a++){n=r[a];if((n.selected||a===i)&&(v.support.optDisabled?!n.disabled:n.getAttribute("disabled")===null)&&(!n.parentNode.disabled||!v.nodeName(n.parentNode,"optgroup"))){t=v(n).val();if(s)return t;o.push(t)}}return o},set:function(e,t){var n=v.makeArray(t);return v(e).find("option").each(function(){this.selected=v.inArray(v(this).val(),n)>=0}),n.length||(e.selectedIndex=-1),n}}},attrFn:{},attr:function(e,n,r,i){var s,o,u,a=e.nodeType;if(!e||a===3||a===8||a===2)return;if(i&&v.isFunction(v.fn[n]))return v(e)[n](r);if(typeof e.getAttribute=="undefined")return v.prop(e,n,r);u=a!==1||!v.isXMLDoc(e),u&&(n=n.toLowerCase(),o=v.attrHooks[n]||(X.test(n)?F:j));if(r!==t){if(r===null){v.removeAttr(e,n);return}return o&&"set"in o&&u&&(s=o.set(e,r,n))!==t?s:(e.setAttribute(n,r+""),r)}return o&&"get"in o&&u&&(s=o.get(e,n))!==null?s:(s=e.getAttribute(n),s===null?t:s)},removeAttr:function(e,t){var n,r,i,s,o=0;if(t&&e.nodeType===1){r=t.split(y);for(;o<r.length;o++)i=r[o],i&&(n=v.propFix[i]||i,s=X.test(i),s||v.attr(e,i,""),e.removeAttribute(V?i:n),s&&n in e&&(e[n]=!1))}},attrHooks:{type:{set:function(e,t){if(U.test(e.nodeName)&&e.parentNode)v.error("type property can't be changed");else if(!v.support.radioValue&&t==="radio"&&v.nodeName(e,"input")){var n=e.value;return e.setAttribute("type",t),n&&(e.value=n),t}}},value:{get:function(e,t){return j&&v.nodeName(e,"button")?j.get(e,t):t in e?e.value:null},set:function(e,t,n){if(j&&v.nodeName(e,"button"))return j.set(e,t,n);e.value=t}}},propFix:{tabindex:"tabIndex",readonly:"readOnly","for":"htmlFor","class":"className",maxlength:"maxLength",cellspacing:"cellSpacing",cellpadding:"cellPadding",rowspan:"rowSpan",colspan:"colSpan",usemap:"useMap",frameborder:"frameBorder",contenteditable:"contentEditable"},prop:function(e,n,r){var i,s,o,u=e.nodeType;if(!e||u===3||u===8||u===2)return;return o=u!==1||!v.isXMLDoc(e),o&&(n=v.propFix[n]||n,s=v.propHooks[n]),r!==t?s&&"set"in s&&(i=s.set(e,r,n))!==t?i:e[n]=r:s&&"get"in s&&(i=s.get(e,n))!==null?i:e[n]},propHooks:{tabIndex:{get:function(e){var n=e.getAttributeNode("tabindex");return n&&n.specified?parseInt(n.value,10):z.test(e.nodeName)||W.test(e.nodeName)&&e.href?0:t}}}}),F={get:function(e,n){var r,i=v.prop(e,n);return i===!0||typeof i!="boolean"&&(r=e.getAttributeNode(n))&&r.nodeValue!==!1?n.toLowerCase():t},set:function(e,t,n){var r;return t===!1?v.removeAttr(e,n):(r=v.propFix[n]||n,r in e&&(e[r]=!0),e.setAttribute(n,n.toLowerCase())),n}},V||(I={name:!0,id:!0,coords:!0},j=v.valHooks.button={get:function(e,n){var r;return r=e.getAttributeNode(n),r&&(I[n]?r.value!=="":r.specified)?r.value:t},set:function(e,t,n){var r=e.getAttributeNode(n);return r||(r=i.createAttribute(n),e.setAttributeNode(r)),r.value=t+""}},v.each(["width","height"],function(e,t){v.attrHooks[t]=v.extend(v.attrHooks[t],{set:function(e,n){if(n==="")return e.setAttribute(t,"auto"),n}})}),v.attrHooks.contenteditable={get:j.get,set:function(e,t,n){t===""&&(t="false"),j.set(e,t,n)}}),v.support.hrefNormalized||v.each(["href","src","width","height"],function(e,n){v.attrHooks[n]=v.extend(v.attrHooks[n],{get:function(e){var r=e.getAttribute(n,2);return r===null?t:r}})}),v.support.style||(v.attrHooks.style={get:function(e){return e.style.cssText.toLowerCase()||t},set:function(e,t){return e.style.cssText=t+""}}),v.support.optSelected||(v.propHooks.selected=v.extend(v.propHooks.selected,{get:function(e){var t=e.parentNode;return t&&(t.selectedIndex,t.parentNode&&t.parentNode.selectedIndex),null}})),v.support.enctype||(v.propFix.enctype="encoding"),v.support.checkOn||v.each(["radio","checkbox"],function(){v.valHooks[this]={get:function(e){return e.getAttribute("value")===null?"on":e.value}}}),v.each(["radio","checkbox"],function(){v.valHooks[this]=v.extend(v.valHooks[this],{set:function(e,t){if(v.isArray(t))return e.checked=v.inArray(v(e).val(),t)>=0}})});var $=/^(?:textarea|input|select)$/i,J=/^([^\.]*|)(?:\.(.+)|)$/,K=/(?:^|\s)hover(\.\S+|)\b/,Q=/^key/,G=/^(?:mouse|contextmenu)|click/,Y=/^(?:focusinfocus|focusoutblur)$/,Z=function(e){return v.event.special.hover?e:e.replace(K,"mouseenter$1 mouseleave$1")};v.event={add:function(e,n,r,i,s){var o,u,a,f,l,c,h,p,d,m,g;if(e.nodeType===3||e.nodeType===8||!n||!r||!(o=v._data(e)))return;r.handler&&(d=r,r=d.handler,s=d.selector),r.guid||(r.guid=v.guid++),a=o.events,a||(o.events=a={}),u=o.handle,u||(o.handle=u=function(e){return typeof v=="undefined"||!!e&&v.event.triggered===e.type?t:v.event.dispatch.apply(u.elem,arguments)},u.elem=e),n=v.trim(Z(n)).split(" ");for(f=0;f<n.length;f++){l=J.exec(n[f])||[],c=l[1],h=(l[2]||"").split(".").sort(),g=v.event.special[c]||{},c=(s?g.delegateType:g.bindType)||c,g=v.event.special[c]||{},p=v.extend({type:c,origType:l[1],data:i,handler:r,guid:r.guid,selector:s,needsContext:s&&v.expr.match.needsContext.test(s),namespace:h.join(".")},d),m=a[c];if(!m){m=a[c]=[],m.delegateCount=0;if(!g.setup||g.setup.call(e,i,h,u)===!1)e.addEventListener?e.addEventListener(c,u,!1):e.attachEvent&&e.attachEvent("on"+c,u)}g.add&&(g.add.call(e,p),p.handler.guid||(p.handler.guid=r.guid)),s?m.splice(m.delegateCount++,0,p):m.push(p),v.event.global[c]=!0}e=null},global:{},remove:function(e,t,n,r,i){var s,o,u,a,f,l,c,h,p,d,m,g=v.hasData(e)&&v._data(e);if(!g||!(h=g.events))return;t=v.trim(Z(t||"")).split(" ");for(s=0;s<t.length;s++){o=J.exec(t[s])||[],u=a=o[1],f=o[2];if(!u){for(u in h)v.event.remove(e,u+t[s],n,r,!0);continue}p=v.event.special[u]||{},u=(r?p.delegateType:p.bindType)||u,d=h[u]||[],l=d.length,f=f?new RegExp("(^|\\.)"+f.split(".").sort().join("\\.(?:.*\\.|)")+"(\\.|$)"):null;for(c=0;c<d.length;c++)m=d[c],(i||a===m.origType)&&(!n||n.guid===m.guid)&&(!f||f.test(m.namespace))&&(!r||r===m.selector||r==="**"&&m.selector)&&(d.splice(c--,1),m.selector&&d.delegateCount--,p.remove&&p.remove.call(e,m));d.length===0&&l!==d.length&&((!p.teardown||p.teardown.call(e,f,g.handle)===!1)&&v.removeEvent(e,u,g.handle),delete h[u])}v.isEmptyObject(h)&&(delete g.handle,v.removeData(e,"events",!0))},customEvent:{getData:!0,setData:!0,changeData:!0},trigger:function(n,r,s,o){if(!s||s.nodeType!==3&&s.nodeType!==8){var u,a,f,l,c,h,p,d,m,g,y=n.type||n,b=[];if(Y.test(y+v.event.triggered))return;y.indexOf("!")>=0&&(y=y.slice(0,-1),a=!0),y.indexOf(".")>=0&&(b=y.split("."),y=b.shift(),b.sort());if((!s||v.event.customEvent[y])&&!v.event.global[y])return;n=typeof n=="object"?n[v.expando]?n:new v.Event(y,n):new v.Event(y),n.type=y,n.isTrigger=!0,n.exclusive=a,n.namespace=b.join("."),n.namespace_re=n.namespace?new RegExp("(^|\\.)"+b.join("\\.(?:.*\\.|)")+"(\\.|$)"):null,h=y.indexOf(":")<0?"on"+y:"";if(!s){u=v.cache;for(f in u)u[f].events&&u[f].events[y]&&v.event.trigger(n,r,u[f].handle.elem,!0);return}n.result=t,n.target||(n.target=s),r=r!=null?v.makeArray(r):[],r.unshift(n),p=v.event.special[y]||{};if(p.trigger&&p.trigger.apply(s,r)===!1)return;m=[[s,p.bindType||y]];if(!o&&!p.noBubble&&!v.isWindow(s)){g=p.delegateType||y,l=Y.test(g+y)?s:s.parentNode;for(c=s;l;l=l.parentNode)m.push([l,g]),c=l;c===(s.ownerDocument||i)&&m.push([c.defaultView||c.parentWindow||e,g])}for(f=0;f<m.length&&!n.isPropagationStopped();f++)l=m[f][0],n.type=m[f][1],d=(v._data(l,"events")||{})[n.type]&&v._data(l,"handle"),d&&d.apply(l,r),d=h&&l[h],d&&v.acceptData(l)&&d.apply&&d.apply(l,r)===!1&&n.preventDefault();return n.type=y,!o&&!n.isDefaultPrevented()&&(!p._default||p._default.apply(s.ownerDocument,r)===!1)&&(y!=="click"||!v.nodeName(s,"a"))&&v.acceptData(s)&&h&&s[y]&&(y!=="focus"&&y!=="blur"||n.target.offsetWidth!==0)&&!v.isWindow(s)&&(c=s[h],c&&(s[h]=null),v.event.triggered=y,s[y](),v.event.triggered=t,c&&(s[h]=c)),n.result}return},dispatch:function(n){n=v.event.fix(n||e.event);var r,i,s,o,u,a,f,c,h,p,d=(v._data(this,"events")||{})[n.type]||[],m=d.delegateCount,g=l.call(arguments),y=!n.exclusive&&!n.namespace,b=v.event.special[n.type]||{},w=[];g[0]=n,n.delegateTarget=this;if(b.preDispatch&&b.preDispatch.call(this,n)===!1)return;if(m&&(!n.button||n.type!=="click"))for(s=n.target;s!=this;s=s.parentNode||this)if(s.disabled!==!0||n.type!=="click"){u={},f=[];for(r=0;r<m;r++)c=d[r],h=c.selector,u[h]===t&&(u[h]=c.needsContext?v(h,this).index(s)>=0:v.find(h,this,null,[s]).length),u[h]&&f.push(c);f.length&&w.push({elem:s,matches:f})}d.length>m&&w.push({elem:this,matches:d.slice(m)});for(r=0;r<w.length&&!n.isPropagationStopped();r++){a=w[r],n.currentTarget=a.elem;for(i=0;i<a.matches.length&&!n.isImmediatePropagationStopped();i++){c=a.matches[i];if(y||!n.namespace&&!c.namespace||n.namespace_re&&n.namespace_re.test(c.namespace))n.data=c.data,n.handleObj=c,o=((v.event.special[c.origType]||{}).handle||c.handler).apply(a.elem,g),o!==t&&(n.result=o,o===!1&&(n.preventDefault(),n.stopPropagation()))}}return b.postDispatch&&b.postDispatch.call(this,n),n.result},props:"attrChange attrName relatedNode srcElement altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),fixHooks:{},keyHooks:{props:"char charCode key keyCode".split(" "),filter:function(e,t){return e.which==null&&(e.which=t.charCode!=null?t.charCode:t.keyCode),e}},mouseHooks:{props:"button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),filter:function(e,n){var r,s,o,u=n.button,a=n.fromElement;return e.pageX==null&&n.clientX!=null&&(r=e.target.ownerDocument||i,s=r.documentElement,o=r.body,e.pageX=n.clientX+(s&&s.scrollLeft||o&&o.scrollLeft||0)-(s&&s.clientLeft||o&&o.clientLeft||0),e.pageY=n.clientY+(s&&s.scrollTop||o&&o.scrollTop||0)-(s&&s.clientTop||o&&o.clientTop||0)),!e.relatedTarget&&a&&(e.relatedTarget=a===e.target?n.toElement:a),!e.which&&u!==t&&(e.which=u&1?1:u&2?3:u&4?2:0),e}},fix:function(e){if(e[v.expando])return e;var t,n,r=e,s=v.event.fixHooks[e.type]||{},o=s.props?this.props.concat(s.props):this.props;e=v.Event(r);for(t=o.length;t;)n=o[--t],e[n]=r[n];return e.target||(e.target=r.srcElement||i),e.target.nodeType===3&&(e.target=e.target.parentNode),e.metaKey=!!e.metaKey,s.filter?s.filter(e,r):e},special:{load:{noBubble:!0},focus:{delegateType:"focusin"},blur:{delegateType:"focusout"},beforeunload:{setup:function(e,t,n){v.isWindow(this)&&(this.onbeforeunload=n)},teardown:function(e,t){this.onbeforeunload===t&&(this.onbeforeunload=null)}}},simulate:function(e,t,n,r){var i=v.extend(new v.Event,n,{type:e,isSimulated:!0,originalEvent:{}});r?v.event.trigger(i,null,t):v.event.dispatch.call(t,i),i.isDefaultPrevented()&&n.preventDefault()}},v.event.handle=v.event.dispatch,v.removeEvent=i.removeEventListener?function(e,t,n){e.removeEventListener&&e.removeEventListener(t,n,!1)}:function(e,t,n){var r="on"+t;e.detachEvent&&(typeof e[r]=="undefined"&&(e[r]=null),e.detachEvent(r,n))},v.Event=function(e,t){if(!(this instanceof v.Event))return new v.Event(e,t);e&&e.type?(this.originalEvent=e,this.type=e.type,this.isDefaultPrevented=e.defaultPrevented||e.returnValue===!1||e.getPreventDefault&&e.getPreventDefault()?tt:et):this.type=e,t&&v.extend(this,t),this.timeStamp=e&&e.timeStamp||v.now(),this[v.expando]=!0},v.Event.prototype={preventDefault:function(){this.isDefaultPrevented=tt;var e=this.originalEvent;if(!e)return;e.preventDefault?e.preventDefault():e.returnValue=!1},stopPropagation:function(){this.isPropagationStopped=tt;var e=this.originalEvent;if(!e)return;e.stopPropagation&&e.stopPropagation(),e.cancelBubble=!0},stopImmediatePropagation:function(){this.isImmediatePropagationStopped=tt,this.stopPropagation()},isDefaultPrevented:et,isPropagationStopped:et,isImmediatePropagationStopped:et},v.each({mouseenter:"mouseover",mouseleave:"mouseout"},function(e,t){v.event.special[e]={delegateType:t,bindType:t,handle:function(e){var n,r=this,i=e.relatedTarget,s=e.handleObj,o=s.selector;if(!i||i!==r&&!v.contains(r,i))e.type=s.origType,n=s.handler.apply(this,arguments),e.type=t;return n}}}),v.support.submitBubbles||(v.event.special.submit={setup:function(){if(v.nodeName(this,"form"))return!1;v.event.add(this,"click._submit keypress._submit",function(e){var n=e.target,r=v.nodeName(n,"input")||v.nodeName(n,"button")?n.form:t;r&&!v._data(r,"_submit_attached")&&(v.event.add(r,"submit._submit",function(e){e._submit_bubble=!0}),v._data(r,"_submit_attached",!0))})},postDispatch:function(e){e._submit_bubble&&(delete e._submit_bubble,this.parentNode&&!e.isTrigger&&v.event.simulate("submit",this.parentNode,e,!0))},teardown:function(){if(v.nodeName(this,"form"))return!1;v.event.remove(this,"._submit")}}),v.support.changeBubbles||(v.event.special.change={setup:function(){if($.test(this.nodeName)){if(this.type==="checkbox"||this.type==="radio")v.event.add(this,"propertychange._change",function(e){e.originalEvent.propertyName==="checked"&&(this._just_changed=!0)}),v.event.add(this,"click._change",function(e){this._just_changed&&!e.isTrigger&&(this._just_changed=!1),v.event.simulate("change",this,e,!0)});return!1}v.event.add(this,"beforeactivate._change",function(e){var t=e.target;$.test(t.nodeName)&&!v._data(t,"_change_attached")&&(v.event.add(t,"change._change",function(e){this.parentNode&&!e.isSimulated&&!e.isTrigger&&v.event.simulate("change",this.parentNode,e,!0)}),v._data(t,"_change_attached",!0))})},handle:function(e){var t=e.target;if(this!==t||e.isSimulated||e.isTrigger||t.type!=="radio"&&t.type!=="checkbox")return e.handleObj.handler.apply(this,arguments)},teardown:function(){return v.event.remove(this,"._change"),!$.test(this.nodeName)}}),v.support.focusinBubbles||v.each({focus:"focusin",blur:"focusout"},function(e,t){var n=0,r=function(e){v.event.simulate(t,e.target,v.event.fix(e),!0)};v.event.special[t]={setup:function(){n++===0&&i.addEventListener(e,r,!0)},teardown:function(){--n===0&&i.removeEventListener(e,r,!0)}}}),v.fn.extend({on:function(e,n,r,i,s){var o,u;if(typeof e=="object"){typeof n!="string"&&(r=r||n,n=t);for(u in e)this.on(u,n,r,e[u],s);return this}r==null&&i==null?(i=n,r=n=t):i==null&&(typeof n=="string"?(i=r,r=t):(i=r,r=n,n=t));if(i===!1)i=et;else if(!i)return this;return s===1&&(o=i,i=function(e){return v().off(e),o.apply(this,arguments)},i.guid=o.guid||(o.guid=v.guid++)),this.each(function(){v.event.add(this,e,i,r,n)})},one:function(e,t,n,r){return this.on(e,t,n,r,1)},off:function(e,n,r){var i,s;if(e&&e.preventDefault&&e.handleObj)return i=e.handleObj,v(e.delegateTarget).off(i.namespace?i.origType+"."+i.namespace:i.origType,i.selector,i.handler),this;if(typeof e=="object"){for(s in e)this.off(s,n,e[s]);return this}if(n===!1||typeof n=="function")r=n,n=t;return r===!1&&(r=et),this.each(function(){v.event.remove(this,e,r,n)})},bind:function(e,t,n){return this.on(e,null,t,n)},unbind:function(e,t){return this.off(e,null,t)},live:function(e,t,n){return v(this.context).on(e,this.selector,t,n),this},die:function(e,t){return v(this.context).off(e,this.selector||"**",t),this},delegate:function(e,t,n,r){return this.on(t,e,n,r)},undelegate:function(e,t,n){return arguments.length===1?this.off(e,"**"):this.off(t,e||"**",n)},trigger:function(e,t){return this.each(function(){v.event.trigger(e,t,this)})},triggerHandler:function(e,t){if(this[0])return v.event.trigger(e,t,this[0],!0)},toggle:function(e){var t=arguments,n=e.guid||v.guid++,r=0,i=function(n){var i=(v._data(this,"lastToggle"+e.guid)||0)%r;return v._data(this,"lastToggle"+e.guid,i+1),n.preventDefault(),t[i].apply(this,arguments)||!1};i.guid=n;while(r<t.length)t[r++].guid=n;return this.click(i)},hover:function(e,t){return this.mouseenter(e).mouseleave(t||e)}}),v.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "),function(e,t){v.fn[t]=function(e,n){return n==null&&(n=e,e=null),arguments.length>0?this.on(t,null,e,n):this.trigger(t)},Q.test(t)&&(v.event.fixHooks[t]=v.event.keyHooks),G.test(t)&&(v.event.fixHooks[t]=v.event.mouseHooks)}),function(e,t){function nt(e,t,n,r){n=n||[],t=t||g;var i,s,a,f,l=t.nodeType;if(!e||typeof e!="string")return n;if(l!==1&&l!==9)return[];a=o(t);if(!a&&!r)if(i=R.exec(e))if(f=i[1]){if(l===9){s=t.getElementById(f);if(!s||!s.parentNode)return n;if(s.id===f)return n.push(s),n}else if(t.ownerDocument&&(s=t.ownerDocument.getElementById(f))&&u(t,s)&&s.id===f)return n.push(s),n}else{if(i[2])return S.apply(n,x.call(t.getElementsByTagName(e),0)),n;if((f=i[3])&&Z&&t.getElementsByClassName)return S.apply(n,x.call(t.getElementsByClassName(f),0)),n}return vt(e.replace(j,"$1"),t,n,r,a)}function rt(e){return function(t){var n=t.nodeName.toLowerCase();return n==="input"&&t.type===e}}function it(e){return function(t){var n=t.nodeName.toLowerCase();return(n==="input"||n==="button")&&t.type===e}}function st(e){return N(function(t){return t=+t,N(function(n,r){var i,s=e([],n.length,t),o=s.length;while(o--)n[i=s[o]]&&(n[i]=!(r[i]=n[i]))})})}function ot(e,t,n){if(e===t)return n;var r=e.nextSibling;while(r){if(r===t)return-1;r=r.nextSibling}return 1}function ut(e,t){var n,r,s,o,u,a,f,l=L[d][e+" "];if(l)return t?0:l.slice(0);u=e,a=[],f=i.preFilter;while(u){if(!n||(r=F.exec(u)))r&&(u=u.slice(r[0].length)||u),a.push(s=[]);n=!1;if(r=I.exec(u))s.push(n=new m(r.shift())),u=u.slice(n.length),n.type=r[0].replace(j," ");for(o in i.filter)(r=J[o].exec(u))&&(!f[o]||(r=f[o](r)))&&(s.push(n=new m(r.shift())),u=u.slice(n.length),n.type=o,n.matches=r);if(!n)break}return t?u.length:u?nt.error(e):L(e,a).slice(0)}function at(e,t,r){var i=t.dir,s=r&&t.dir==="parentNode",o=w++;return t.first?function(t,n,r){while(t=t[i])if(s||t.nodeType===1)return e(t,n,r)}:function(t,r,u){if(!u){var a,f=b+" "+o+" ",l=f+n;while(t=t[i])if(s||t.nodeType===1){if((a=t[d])===l)return t.sizset;if(typeof a=="string"&&a.indexOf(f)===0){if(t.sizset)return t}else{t[d]=l;if(e(t,r,u))return t.sizset=!0,t;t.sizset=!1}}}else while(t=t[i])if(s||t.nodeType===1)if(e(t,r,u))return t}}function ft(e){return e.length>1?function(t,n,r){var i=e.length;while(i--)if(!e[i](t,n,r))return!1;return!0}:e[0]}function lt(e,t,n,r,i){var s,o=[],u=0,a=e.length,f=t!=null;for(;u<a;u++)if(s=e[u])if(!n||n(s,r,i))o.push(s),f&&t.push(u);return o}function ct(e,t,n,r,i,s){return r&&!r[d]&&(r=ct(r)),i&&!i[d]&&(i=ct(i,s)),N(function(s,o,u,a){var f,l,c,h=[],p=[],d=o.length,v=s||dt(t||"*",u.nodeType?[u]:u,[]),m=e&&(s||!t)?lt(v,h,e,u,a):v,g=n?i||(s?e:d||r)?[]:o:m;n&&n(m,g,u,a);if(r){f=lt(g,p),r(f,[],u,a),l=f.length;while(l--)if(c=f[l])g[p[l]]=!(m[p[l]]=c)}if(s){if(i||e){if(i){f=[],l=g.length;while(l--)(c=g[l])&&f.push(m[l]=c);i(null,g=[],f,a)}l=g.length;while(l--)(c=g[l])&&(f=i?T.call(s,c):h[l])>-1&&(s[f]=!(o[f]=c))}}else g=lt(g===o?g.splice(d,g.length):g),i?i(null,o,g,a):S.apply(o,g)})}function ht(e){var t,n,r,s=e.length,o=i.relative[e[0].type],u=o||i.relative[" "],a=o?1:0,f=at(function(e){return e===t},u,!0),l=at(function(e){return T.call(t,e)>-1},u,!0),h=[function(e,n,r){return!o&&(r||n!==c)||((t=n).nodeType?f(e,n,r):l(e,n,r))}];for(;a<s;a++)if(n=i.relative[e[a].type])h=[at(ft(h),n)];else{n=i.filter[e[a].type].apply(null,e[a].matches);if(n[d]){r=++a;for(;r<s;r++)if(i.relative[e[r].type])break;return ct(a>1&&ft(h),a>1&&e.slice(0,a-1).join("").replace(j,"$1"),n,a<r&&ht(e.slice(a,r)),r<s&&ht(e=e.slice(r)),r<s&&e.join(""))}h.push(n)}return ft(h)}function pt(e,t){var r=t.length>0,s=e.length>0,o=function(u,a,f,l,h){var p,d,v,m=[],y=0,w="0",x=u&&[],T=h!=null,N=c,C=u||s&&i.find.TAG("*",h&&a.parentNode||a),k=b+=N==null?1:Math.E;T&&(c=a!==g&&a,n=o.el);for(;(p=C[w])!=null;w++){if(s&&p){for(d=0;v=e[d];d++)if(v(p,a,f)){l.push(p);break}T&&(b=k,n=++o.el)}r&&((p=!v&&p)&&y--,u&&x.push(p))}y+=w;if(r&&w!==y){for(d=0;v=t[d];d++)v(x,m,a,f);if(u){if(y>0)while(w--)!x[w]&&!m[w]&&(m[w]=E.call(l));m=lt(m)}S.apply(l,m),T&&!u&&m.length>0&&y+t.length>1&&nt.uniqueSort(l)}return T&&(b=k,c=N),x};return o.el=0,r?N(o):o}function dt(e,t,n){var r=0,i=t.length;for(;r<i;r++)nt(e,t[r],n);return n}function vt(e,t,n,r,s){var o,u,f,l,c,h=ut(e),p=h.length;if(!r&&h.length===1){u=h[0]=h[0].slice(0);if(u.length>2&&(f=u[0]).type==="ID"&&t.nodeType===9&&!s&&i.relative[u[1].type]){t=i.find.ID(f.matches[0].replace($,""),t,s)[0];if(!t)return n;e=e.slice(u.shift().length)}for(o=J.POS.test(e)?-1:u.length-1;o>=0;o--){f=u[o];if(i.relative[l=f.type])break;if(c=i.find[l])if(r=c(f.matches[0].replace($,""),z.test(u[0].type)&&t.parentNode||t,s)){u.splice(o,1),e=r.length&&u.join("");if(!e)return S.apply(n,x.call(r,0)),n;break}}}return a(e,h)(r,t,s,n,z.test(e)),n}function mt(){}var n,r,i,s,o,u,a,f,l,c,h=!0,p="undefined",d=("sizcache"+Math.random()).replace(".",""),m=String,g=e.document,y=g.documentElement,b=0,w=0,E=[].pop,S=[].push,x=[].slice,T=[].indexOf||function(e){var t=0,n=this.length;for(;t<n;t++)if(this[t]===e)return t;return-1},N=function(e,t){return e[d]=t==null||t,e},C=function(){var e={},t=[];return N(function(n,r){return t.push(n)>i.cacheLength&&delete e[t.shift()],e[n+" "]=r},e)},k=C(),L=C(),A=C(),O="[\\x20\\t\\r\\n\\f]",M="(?:\\\\.|[-\\w]|[^\\x00-\\xa0])+",_=M.replace("w","w#"),D="([*^$|!~]?=)",P="\\["+O+"*("+M+")"+O+"*(?:"+D+O+"*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|("+_+")|)|)"+O+"*\\]",H=":("+M+")(?:\\((?:(['\"])((?:\\\\.|[^\\\\])*?)\\2|([^()[\\]]*|(?:(?:"+P+")|[^:]|\\\\.)*|.*))\\)|)",B=":(even|odd|eq|gt|lt|nth|first|last)(?:\\("+O+"*((?:-\\d)?\\d*)"+O+"*\\)|)(?=[^-]|$)",j=new RegExp("^"+O+"+|((?:^|[^\\\\])(?:\\\\.)*)"+O+"+$","g"),F=new RegExp("^"+O+"*,"+O+"*"),I=new RegExp("^"+O+"*([\\x20\\t\\r\\n\\f>+~])"+O+"*"),q=new RegExp(H),R=/^(?:#([\w\-]+)|(\w+)|\.([\w\-]+))$/,U=/^:not/,z=/[\x20\t\r\n\f]*[+~]/,W=/:not\($/,X=/h\d/i,V=/input|select|textarea|button/i,$=/\\(?!\\)/g,J={ID:new RegExp("^#("+M+")"),CLASS:new RegExp("^\\.("+M+")"),NAME:new RegExp("^\\[name=['\"]?("+M+")['\"]?\\]"),TAG:new RegExp("^("+M.replace("w","w*")+")"),ATTR:new RegExp("^"+P),PSEUDO:new RegExp("^"+H),POS:new RegExp(B,"i"),CHILD:new RegExp("^:(only|nth|first|last)-child(?:\\("+O+"*(even|odd|(([+-]|)(\\d*)n|)"+O+"*(?:([+-]|)"+O+"*(\\d+)|))"+O+"*\\)|)","i"),needsContext:new RegExp("^"+O+"*[>+~]|"+B,"i")},K=function(e){var t=g.createElement("div");try{return e(t)}catch(n){return!1}finally{t=null}},Q=K(function(e){return e.appendChild(g.createComment("")),!e.getElementsByTagName("*").length}),G=K(function(e){return e.innerHTML="<a href='#'></a>",e.firstChild&&typeof e.firstChild.getAttribute!==p&&e.firstChild.getAttribute("href")==="#"}),Y=K(function(e){e.innerHTML="<select></select>";var t=typeof e.lastChild.getAttribute("multiple");return t!=="boolean"&&t!=="string"}),Z=K(function(e){return e.innerHTML="<div class='hidden e'></div><div class='hidden'></div>",!e.getElementsByClassName||!e.getElementsByClassName("e").length?!1:(e.lastChild.className="e",e.getElementsByClassName("e").length===2)}),et=K(function(e){e.id=d+0,e.innerHTML="<a name='"+d+"'></a><div name='"+d+"'></div>",y.insertBefore(e,y.firstChild);var t=g.getElementsByName&&g.getElementsByName(d).length===2+g.getElementsByName(d+0).length;return r=!g.getElementById(d),y.removeChild(e),t});try{x.call(y.childNodes,0)[0].nodeType}catch(tt){x=function(e){var t,n=[];for(;t=this[e];e++)n.push(t);return n}}nt.matches=function(e,t){return nt(e,null,null,t)},nt.matchesSelector=function(e,t){return nt(t,null,null,[e]).length>0},s=nt.getText=function(e){var t,n="",r=0,i=e.nodeType;if(i){if(i===1||i===9||i===11){if(typeof e.textContent=="string")return e.textContent;for(e=e.firstChild;e;e=e.nextSibling)n+=s(e)}else if(i===3||i===4)return e.nodeValue}else for(;t=e[r];r++)n+=s(t);return n},o=nt.isXML=function(e){var t=e&&(e.ownerDocument||e).documentElement;return t?t.nodeName!=="HTML":!1},u=nt.contains=y.contains?function(e,t){var n=e.nodeType===9?e.documentElement:e,r=t&&t.parentNode;return e===r||!!(r&&r.nodeType===1&&n.contains&&n.contains(r))}:y.compareDocumentPosition?function(e,t){return t&&!!(e.compareDocumentPosition(t)&16)}:function(e,t){while(t=t.parentNode)if(t===e)return!0;return!1},nt.attr=function(e,t){var n,r=o(e);return r||(t=t.toLowerCase()),(n=i.attrHandle[t])?n(e):r||Y?e.getAttribute(t):(n=e.getAttributeNode(t),n?typeof e[t]=="boolean"?e[t]?t:null:n.specified?n.value:null:null)},i=nt.selectors={cacheLength:50,createPseudo:N,match:J,attrHandle:G?{}:{href:function(e){return e.getAttribute("href",2)},type:function(e){return e.getAttribute("type")}},find:{ID:r?function(e,t,n){if(typeof t.getElementById!==p&&!n){var r=t.getElementById(e);return r&&r.parentNode?[r]:[]}}:function(e,n,r){if(typeof n.getElementById!==p&&!r){var i=n.getElementById(e);return i?i.id===e||typeof i.getAttributeNode!==p&&i.getAttributeNode("id").value===e?[i]:t:[]}},TAG:Q?function(e,t){if(typeof t.getElementsByTagName!==p)return t.getElementsByTagName(e)}:function(e,t){var n=t.getElementsByTagName(e);if(e==="*"){var r,i=[],s=0;for(;r=n[s];s++)r.nodeType===1&&i.push(r);return i}return n},NAME:et&&function(e,t){if(typeof t.getElementsByName!==p)return t.getElementsByName(name)},CLASS:Z&&function(e,t,n){if(typeof t.getElementsByClassName!==p&&!n)return t.getElementsByClassName(e)}},relative:{">":{dir:"parentNode",first:!0}," ":{dir:"parentNode"},"+":{dir:"previousSibling",first:!0},"~":{dir:"previousSibling"}},preFilter:{ATTR:function(e){return e[1]=e[1].replace($,""),e[3]=(e[4]||e[5]||"").replace($,""),e[2]==="~="&&(e[3]=" "+e[3]+" "),e.slice(0,4)},CHILD:function(e){return e[1]=e[1].toLowerCase(),e[1]==="nth"?(e[2]||nt.error(e[0]),e[3]=+(e[3]?e[4]+(e[5]||1):2*(e[2]==="even"||e[2]==="odd")),e[4]=+(e[6]+e[7]||e[2]==="odd")):e[2]&&nt.error(e[0]),e},PSEUDO:function(e){var t,n;if(J.CHILD.test(e[0]))return null;if(e[3])e[2]=e[3];else if(t=e[4])q.test(t)&&(n=ut(t,!0))&&(n=t.indexOf(")",t.length-n)-t.length)&&(t=t.slice(0,n),e[0]=e[0].slice(0,n)),e[2]=t;return e.slice(0,3)}},filter:{ID:r?function(e){return e=e.replace($,""),function(t){return t.getAttribute("id")===e}}:function(e){return e=e.replace($,""),function(t){var n=typeof t.getAttributeNode!==p&&t.getAttributeNode("id");return n&&n.value===e}},TAG:function(e){return e==="*"?function(){return!0}:(e=e.replace($,"").toLowerCase(),function(t){return t.nodeName&&t.nodeName.toLowerCase()===e})},CLASS:function(e){var t=k[d][e+" "];return t||(t=new RegExp("(^|"+O+")"+e+"("+O+"|$)"))&&k(e,function(e){return t.test(e.className||typeof e.getAttribute!==p&&e.getAttribute("class")||"")})},ATTR:function(e,t,n){return function(r,i){var s=nt.attr(r,e);return s==null?t==="!=":t?(s+="",t==="="?s===n:t==="!="?s!==n:t==="^="?n&&s.indexOf(n)===0:t==="*="?n&&s.indexOf(n)>-1:t==="$="?n&&s.substr(s.length-n.length)===n:t==="~="?(" "+s+" ").indexOf(n)>-1:t==="|="?s===n||s.substr(0,n.length+1)===n+"-":!1):!0}},CHILD:function(e,t,n,r){return e==="nth"?function(e){var t,i,s=e.parentNode;if(n===1&&r===0)return!0;if(s){i=0;for(t=s.firstChild;t;t=t.nextSibling)if(t.nodeType===1){i++;if(e===t)break}}return i-=r,i===n||i%n===0&&i/n>=0}:function(t){var n=t;switch(e){case"only":case"first":while(n=n.previousSibling)if(n.nodeType===1)return!1;if(e==="first")return!0;n=t;case"last":while(n=n.nextSibling)if(n.nodeType===1)return!1;return!0}}},PSEUDO:function(e,t){var n,r=i.pseudos[e]||i.setFilters[e.toLowerCase()]||nt.error("unsupported pseudo: "+e);return r[d]?r(t):r.length>1?(n=[e,e,"",t],i.setFilters.hasOwnProperty(e.toLowerCase())?N(function(e,n){var i,s=r(e,t),o=s.length;while(o--)i=T.call(e,s[o]),e[i]=!(n[i]=s[o])}):function(e){return r(e,0,n)}):r}},pseudos:{not:N(function(e){var t=[],n=[],r=a(e.replace(j,"$1"));return r[d]?N(function(e,t,n,i){var s,o=r(e,null,i,[]),u=e.length;while(u--)if(s=o[u])e[u]=!(t[u]=s)}):function(e,i,s){return t[0]=e,r(t,null,s,n),!n.pop()}}),has:N(function(e){return function(t){return nt(e,t).length>0}}),contains:N(function(e){return function(t){return(t.textContent||t.innerText||s(t)).indexOf(e)>-1}}),enabled:function(e){return e.disabled===!1},disabled:function(e){return e.disabled===!0},checked:function(e){var t=e.nodeName.toLowerCase();return t==="input"&&!!e.checked||t==="option"&&!!e.selected},selected:function(e){return e.parentNode&&e.parentNode.selectedIndex,e.selected===!0},parent:function(e){return!i.pseudos.empty(e)},empty:function(e){var t;e=e.firstChild;while(e){if(e.nodeName>"@"||(t=e.nodeType)===3||t===4)return!1;e=e.nextSibling}return!0},header:function(e){return X.test(e.nodeName)},text:function(e){var t,n;return e.nodeName.toLowerCase()==="input"&&(t=e.type)==="text"&&((n=e.getAttribute("type"))==null||n.toLowerCase()===t)},radio:rt("radio"),checkbox:rt("checkbox"),file:rt("file"),password:rt("password"),image:rt("image"),submit:it("submit"),reset:it("reset"),button:function(e){var t=e.nodeName.toLowerCase();return t==="input"&&e.type==="button"||t==="button"},input:function(e){return V.test(e.nodeName)},focus:function(e){var t=e.ownerDocument;return e===t.activeElement&&(!t.hasFocus||t.hasFocus())&&!!(e.type||e.href||~e.tabIndex)},active:function(e){return e===e.ownerDocument.activeElement},first:st(function(){return[0]}),last:st(function(e,t){return[t-1]}),eq:st(function(e,t,n){return[n<0?n+t:n]}),even:st(function(e,t){for(var n=0;n<t;n+=2)e.push(n);return e}),odd:st(function(e,t){for(var n=1;n<t;n+=2)e.push(n);return e}),lt:st(function(e,t,n){for(var r=n<0?n+t:n;--r>=0;)e.push(r);return e}),gt:st(function(e,t,n){for(var r=n<0?n+t:n;++r<t;)e.push(r);return e})}},f=y.compareDocumentPosition?function(e,t){return e===t?(l=!0,0):(!e.compareDocumentPosition||!t.compareDocumentPosition?e.compareDocumentPosition:e.compareDocumentPosition(t)&4)?-1:1}:function(e,t){if(e===t)return l=!0,0;if(e.sourceIndex&&t.sourceIndex)return e.sourceIndex-t.sourceIndex;var n,r,i=[],s=[],o=e.parentNode,u=t.parentNode,a=o;if(o===u)return ot(e,t);if(!o)return-1;if(!u)return 1;while(a)i.unshift(a),a=a.parentNode;a=u;while(a)s.unshift(a),a=a.parentNode;n=i.length,r=s.length;for(var f=0;f<n&&f<r;f++)if(i[f]!==s[f])return ot(i[f],s[f]);return f===n?ot(e,s[f],-1):ot(i[f],t,1)},[0,0].sort(f),h=!l,nt.uniqueSort=function(e){var t,n=[],r=1,i=0;l=h,e.sort(f);if(l){for(;t=e[r];r++)t===e[r-1]&&(i=n.push(r));while(i--)e.splice(n[i],1)}return e},nt.error=function(e){throw new Error("Syntax error, unrecognized expression: "+e)},a=nt.compile=function(e,t){var n,r=[],i=[],s=A[d][e+" "];if(!s){t||(t=ut(e)),n=t.length;while(n--)s=ht(t[n]),s[d]?r.push(s):i.push(s);s=A(e,pt(i,r))}return s},g.querySelectorAll&&function(){var e,t=vt,n=/'|\\/g,r=/\=[\x20\t\r\n\f]*([^'"\]]*)[\x20\t\r\n\f]*\]/g,i=[":focus"],s=[":active"],u=y.matchesSelector||y.mozMatchesSelector||y.webkitMatchesSelector||y.oMatchesSelector||y.msMatchesSelector;K(function(e){e.innerHTML="<select><option selected=''></option></select>",e.querySelectorAll("[selected]").length||i.push("\\["+O+"*(?:checked|disabled|ismap|multiple|readonly|selected|value)"),e.querySelectorAll(":checked").length||i.push(":checked")}),K(function(e){e.innerHTML="<p test=''></p>",e.querySelectorAll("[test^='']").length&&i.push("[*^$]="+O+"*(?:\"\"|'')"),e.innerHTML="<input type='hidden'/>",e.querySelectorAll(":enabled").length||i.push(":enabled",":disabled")}),i=new RegExp(i.join("|")),vt=function(e,r,s,o,u){if(!o&&!u&&!i.test(e)){var a,f,l=!0,c=d,h=r,p=r.nodeType===9&&e;if(r.nodeType===1&&r.nodeName.toLowerCase()!=="object"){a=ut(e),(l=r.getAttribute("id"))?c=l.replace(n,"\\$&"):r.setAttribute("id",c),c="[id='"+c+"'] ",f=a.length;while(f--)a[f]=c+a[f].join("");h=z.test(e)&&r.parentNode||r,p=a.join(",")}if(p)try{return S.apply(s,x.call(h.querySelectorAll(p),0)),s}catch(v){}finally{l||r.removeAttribute("id")}}return t(e,r,s,o,u)},u&&(K(function(t){e=u.call(t,"div");try{u.call(t,"[test!='']:sizzle"),s.push("!=",H)}catch(n){}}),s=new RegExp(s.join("|")),nt.matchesSelector=function(t,n){n=n.replace(r,"='$1']");if(!o(t)&&!s.test(n)&&!i.test(n))try{var a=u.call(t,n);if(a||e||t.document&&t.document.nodeType!==11)return a}catch(f){}return nt(n,null,null,[t]).length>0})}(),i.pseudos.nth=i.pseudos.eq,i.filters=mt.prototype=i.pseudos,i.setFilters=new mt,nt.attr=v.attr,v.find=nt,v.expr=nt.selectors,v.expr[":"]=v.expr.pseudos,v.unique=nt.uniqueSort,v.text=nt.getText,v.isXMLDoc=nt.isXML,v.contains=nt.contains}(e);var nt=/Until$/,rt=/^(?:parents|prev(?:Until|All))/,it=/^.[^:#\[\.,]*$/,st=v.expr.match.needsContext,ot={children:!0,contents:!0,next:!0,prev:!0};v.fn.extend({find:function(e){var t,n,r,i,s,o,u=this;if(typeof e!="string")return v(e).filter(function(){for(t=0,n=u.length;t<n;t++)if(v.contains(u[t],this))return!0});o=this.pushStack("","find",e);for(t=0,n=this.length;t<n;t++){r=o.length,v.find(e,this[t],o);if(t>0)for(i=r;i<o.length;i++)for(s=0;s<r;s++)if(o[s]===o[i]){o.splice(i--,1);break}}return o},has:function(e){var t,n=v(e,this),r=n.length;return this.filter(function(){for(t=0;t<r;t++)if(v.contains(this,n[t]))return!0})},not:function(e){return this.pushStack(ft(this,e,!1),"not",e)},filter:function(e){return this.pushStack(ft(this,e,!0),"filter",e)},is:function(e){return!!e&&(typeof e=="string"?st.test(e)?v(e,this.context).index(this[0])>=0:v.filter(e,this).length>0:this.filter(e).length>0)},closest:function(e,t){var n,r=0,i=this.length,s=[],o=st.test(e)||typeof e!="string"?v(e,t||this.context):0;for(;r<i;r++){n=this[r];while(n&&n.ownerDocument&&n!==t&&n.nodeType!==11){if(o?o.index(n)>-1:v.find.matchesSelector(n,e)){s.push(n);break}n=n.parentNode}}return s=s.length>1?v.unique(s):s,this.pushStack(s,"closest",e)},index:function(e){return e?typeof e=="string"?v.inArray(this[0],v(e)):v.inArray(e.jquery?e[0]:e,this):this[0]&&this[0].parentNode?this.prevAll().length:-1},add:function(e,t){var n=typeof e=="string"?v(e,t):v.makeArray(e&&e.nodeType?[e]:e),r=v.merge(this.get(),n);return this.pushStack(ut(n[0])||ut(r[0])?r:v.unique(r))},addBack:function(e){return this.add(e==null?this.prevObject:this.prevObject.filter(e))}}),v.fn.andSelf=v.fn.addBack,v.each({parent:function(e){var t=e.parentNode;return t&&t.nodeType!==11?t:null},parents:function(e){return v.dir(e,"parentNode")},parentsUntil:function(e,t,n){return v.dir(e,"parentNode",n)},next:function(e){return at(e,"nextSibling")},prev:function(e){return at(e,"previousSibling")},nextAll:function(e){return v.dir(e,"nextSibling")},prevAll:function(e){return v.dir(e,"previousSibling")},nextUntil:function(e,t,n){return v.dir(e,"nextSibling",n)},prevUntil:function(e,t,n){return v.dir(e,"previousSibling",n)},siblings:function(e){return v.sibling((e.parentNode||{}).firstChild,e)},children:function(e){return v.sibling(e.firstChild)},contents:function(e){return v.nodeName(e,"iframe")?e.contentDocument||e.contentWindow.document:v.merge([],e.childNodes)}},function(e,t){v.fn[e]=function(n,r){var i=v.map(this,t,n);return nt.test(e)||(r=n),r&&typeof r=="string"&&(i=v.filter(r,i)),i=this.length>1&&!ot[e]?v.unique(i):i,this.length>1&&rt.test(e)&&(i=i.reverse()),this.pushStack(i,e,l.call(arguments).join(","))}}),v.extend({filter:function(e,t,n){return n&&(e=":not("+e+")"),t.length===1?v.find.matchesSelector(t[0],e)?[t[0]]:[]:v.find.matches(e,t)},dir:function(e,n,r){var i=[],s=e[n];while(s&&s.nodeType!==9&&(r===t||s.nodeType!==1||!v(s).is(r)))s.nodeType===1&&i.push(s),s=s[n];return i},sibling:function(e,t){var n=[];for(;e;e=e.nextSibling)e.nodeType===1&&e!==t&&n.push(e);return n}});var ct="abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",ht=/ jQuery\d+="(?:null|\d+)"/g,pt=/^\s+/,dt=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,vt=/<([\w:]+)/,mt=/<tbody/i,gt=/<|&#?\w+;/,yt=/<(?:script|style|link)/i,bt=/<(?:script|object|embed|option|style)/i,wt=new RegExp("<(?:"+ct+")[\\s/>]","i"),Et=/^(?:checkbox|radio)$/,St=/checked\s*(?:[^=]|=\s*.checked.)/i,xt=/\/(java|ecma)script/i,Tt=/^\s*<!(?:\[CDATA\[|\-\-)|[\]\-]{2}>\s*$/g,Nt={option:[1,"<select multiple='multiple'>","</select>"],legend:[1,"<fieldset>","</fieldset>"],thead:[1,"<table>","</table>"],tr:[2,"<table><tbody>","</tbody></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],col:[2,"<table><tbody></tbody><colgroup>","</colgroup></table>"],area:[1,"<map>","</map>"],_default:[0,"",""]},Ct=lt(i),kt=Ct.appendChild(i.createElement("div"));Nt.optgroup=Nt.option,Nt.tbody=Nt.tfoot=Nt.colgroup=Nt.caption=Nt.thead,Nt.th=Nt.td,v.support.htmlSerialize||(Nt._default=[1,"X<div>","</div>"]),v.fn.extend({text:function(e){return v.access(this,function(e){return e===t?v.text(this):this.empty().append((this[0]&&this[0].ownerDocument||i).createTextNode(e))},null,e,arguments.length)},wrapAll:function(e){if(v.isFunction(e))return this.each(function(t){v(this).wrapAll(e.call(this,t))});if(this[0]){var t=v(e,this[0].ownerDocument).eq(0).clone(!0);this[0].parentNode&&t.insertBefore(this[0]),t.map(function(){var e=this;while(e.firstChild&&e.firstChild.nodeType===1)e=e.firstChild;return e}).append(this)}return this},wrapInner:function(e){return v.isFunction(e)?this.each(function(t){v(this).wrapInner(e.call(this,t))}):this.each(function(){var t=v(this),n=t.contents();n.length?n.wrapAll(e):t.append(e)})},wrap:function(e){var t=v.isFunction(e);return this.each(function(n){v(this).wrapAll(t?e.call(this,n):e)})},unwrap:function(){return this.parent().each(function(){v.nodeName(this,"body")||v(this).replaceWith(this.childNodes)}).end()},append:function(){return this.domManip(arguments,!0,function(e){(this.nodeType===1||this.nodeType===11)&&this.appendChild(e)})},prepend:function(){return this.domManip(arguments,!0,function(e){(this.nodeType===1||this.nodeType===11)&&this.insertBefore(e,this.firstChild)})},before:function(){if(!ut(this[0]))return this.domManip(arguments,!1,function(e){this.parentNode.insertBefore(e,this)});if(arguments.length){var e=v.clean(arguments);return this.pushStack(v.merge(e,this),"before",this.selector)}},after:function(){if(!ut(this[0]))return this.domManip(arguments,!1,function(e){this.parentNode.insertBefore(e,this.nextSibling)});if(arguments.length){var e=v.clean(arguments);return this.pushStack(v.merge(this,e),"after",this.selector)}},remove:function(e,t){var n,r=0;for(;(n=this[r])!=null;r++)if(!e||v.filter(e,[n]).length)!t&&n.nodeType===1&&(v.cleanData(n.getElementsByTagName("*")),v.cleanData([n])),n.parentNode&&n.parentNode.removeChild(n);return this},empty:function(){var e,t=0;for(;(e=this[t])!=null;t++){e.nodeType===1&&v.cleanData(e.getElementsByTagName("*"));while(e.firstChild)e.removeChild(e.firstChild)}return this},clone:function(e,t){return e=e==null?!1:e,t=t==null?e:t,this.map(function(){return v.clone(this,e,t)})},html:function(e){return v.access(this,function(e){var n=this[0]||{},r=0,i=this.length;if(e===t)return n.nodeType===1?n.innerHTML.replace(ht,""):t;if(typeof e=="string"&&!yt.test(e)&&(v.support.htmlSerialize||!wt.test(e))&&(v.support.leadingWhitespace||!pt.test(e))&&!Nt[(vt.exec(e)||["",""])[1].toLowerCase()]){e=e.replace(dt,"<$1></$2>");try{for(;r<i;r++)n=this[r]||{},n.nodeType===1&&(v.cleanData(n.getElementsByTagName("*")),n.innerHTML=e);n=0}catch(s){}}n&&this.empty().append(e)},null,e,arguments.length)},replaceWith:function(e){return ut(this[0])?this.length?this.pushStack(v(v.isFunction(e)?e():e),"replaceWith",e):this:v.isFunction(e)?this.each(function(t){var n=v(this),r=n.html();n.replaceWith(e.call(this,t,r))}):(typeof e!="string"&&(e=v(e).detach()),this.each(function(){var t=this.nextSibling,n=this.parentNode;v(this).remove(),t?v(t).before(e):v(n).append(e)}))},detach:function(e){return this.remove(e,!0)},domManip:function(e,n,r){e=[].concat.apply([],e);var i,s,o,u,a=0,f=e[0],l=[],c=this.length;if(!v.support.checkClone&&c>1&&typeof f=="string"&&St.test(f))return this.each(function(){v(this).domManip(e,n,r)});if(v.isFunction(f))return this.each(function(i){var s=v(this);e[0]=f.call(this,i,n?s.html():t),s.domManip(e,n,r)});if(this[0]){i=v.buildFragment(e,this,l),o=i.fragment,s=o.firstChild,o.childNodes.length===1&&(o=s);if(s){n=n&&v.nodeName(s,"tr");for(u=i.cacheable||c-1;a<c;a++)r.call(n&&v.nodeName(this[a],"table")?Lt(this[a],"tbody"):this[a],a===u?o:v.clone(o,!0,!0))}o=s=null,l.length&&v.each(l,function(e,t){t.src?v.ajax?v.ajax({url:t.src,type:"GET",dataType:"script",async:!1,global:!1,"throws":!0}):v.error("no ajax"):v.globalEval((t.text||t.textContent||t.innerHTML||"").replace(Tt,"")),t.parentNode&&t.parentNode.removeChild(t)})}return this}}),v.buildFragment=function(e,n,r){var s,o,u,a=e[0];return n=n||i,n=!n.nodeType&&n[0]||n,n=n.ownerDocument||n,e.length===1&&typeof a=="string"&&a.length<512&&n===i&&a.charAt(0)==="<"&&!bt.test(a)&&(v.support.checkClone||!St.test(a))&&(v.support.html5Clone||!wt.test(a))&&(o=!0,s=v.fragments[a],u=s!==t),s||(s=n.createDocumentFragment(),v.clean(e,n,s,r),o&&(v.fragments[a]=u&&s)),{fragment:s,cacheable:o}},v.fragments={},v.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(e,t){v.fn[e]=function(n){var r,i=0,s=[],o=v(n),u=o.length,a=this.length===1&&this[0].parentNode;if((a==null||a&&a.nodeType===11&&a.childNodes.length===1)&&u===1)return o[t](this[0]),this;for(;i<u;i++)r=(i>0?this.clone(!0):this).get(),v(o[i])[t](r),s=s.concat(r);return this.pushStack(s,e,o.selector)}}),v.extend({clone:function(e,t,n){var r,i,s,o;v.support.html5Clone||v.isXMLDoc(e)||!wt.test("<"+e.nodeName+">")?o=e.cloneNode(!0):(kt.innerHTML=e.outerHTML,kt.removeChild(o=kt.firstChild));if((!v.support.noCloneEvent||!v.support.noCloneChecked)&&(e.nodeType===1||e.nodeType===11)&&!v.isXMLDoc(e)){Ot(e,o),r=Mt(e),i=Mt(o);for(s=0;r[s];++s)i[s]&&Ot(r[s],i[s])}if(t){At(e,o);if(n){r=Mt(e),i=Mt(o);for(s=0;r[s];++s)At(r[s],i[s])}}return r=i=null,o},clean:function(e,t,n,r){var s,o,u,a,f,l,c,h,p,d,m,g,y=t===i&&Ct,b=[];if(!t||typeof t.createDocumentFragment=="undefined")t=i;for(s=0;(u=e[s])!=null;s++){typeof u=="number"&&(u+="");if(!u)continue;if(typeof u=="string")if(!gt.test(u))u=t.createTextNode(u);else{y=y||lt(t),c=t.createElement("div"),y.appendChild(c),u=u.replace(dt,"<$1></$2>"),a=(vt.exec(u)||["",""])[1].toLowerCase(),f=Nt[a]||Nt._default,l=f[0],c.innerHTML=f[1]+u+f[2];while(l--)c=c.lastChild;if(!v.support.tbody){h=mt.test(u),p=a==="table"&&!h?c.firstChild&&c.firstChild.childNodes:f[1]==="<table>"&&!h?c.childNodes:[];for(o=p.length-1;o>=0;--o)v.nodeName(p[o],"tbody")&&!p[o].childNodes.length&&p[o].parentNode.removeChild(p[o])}!v.support.leadingWhitespace&&pt.test(u)&&c.insertBefore(t.createTextNode(pt.exec(u)[0]),c.firstChild),u=c.childNodes,c.parentNode.removeChild(c)}u.nodeType?b.push(u):v.merge(b,u)}c&&(u=c=y=null);if(!v.support.appendChecked)for(s=0;(u=b[s])!=null;s++)v.nodeName(u,"input")?_t(u):typeof u.getElementsByTagName!="undefined"&&v.grep(u.getElementsByTagName("input"),_t);if(n){m=function(e){if(!e.type||xt.test(e.type))return r?r.push(e.parentNode?e.parentNode.removeChild(e):e):n.appendChild(e)};for(s=0;(u=b[s])!=null;s++)if(!v.nodeName(u,"script")||!m(u))n.appendChild(u),typeof u.getElementsByTagName!="undefined"&&(g=v.grep(v.merge([],u.getElementsByTagName("script")),m),b.splice.apply(b,[s+1,0].concat(g)),s+=g.length)}return b},cleanData:function(e,t){var n,r,i,s,o=0,u=v.expando,a=v.cache,f=v.support.deleteExpando,l=v.event.special;for(;(i=e[o])!=null;o++)if(t||v.acceptData(i)){r=i[u],n=r&&a[r];if(n){if(n.events)for(s in n.events)l[s]?v.event.remove(i,s):v.removeEvent(i,s,n.handle);a[r]&&(delete a[r],f?delete i[u]:i.removeAttribute?i.removeAttribute(u):i[u]=null,v.deletedIds.push(r))}}}}),function(){var e,t;v.uaMatch=function(e){e=e.toLowerCase();var t=/(chrome)[ \/]([\w.]+)/.exec(e)||/(webkit)[ \/]([\w.]+)/.exec(e)||/(opera)(?:.*version|)[ \/]([\w.]+)/.exec(e)||/(msie) ([\w.]+)/.exec(e)||e.indexOf("compatible")<0&&/(mozilla)(?:.*? rv:([\w.]+)|)/.exec(e)||[];return{browser:t[1]||"",version:t[2]||"0"}},e=v.uaMatch(o.userAgent),t={},e.browser&&(t[e.browser]=!0,t.version=e.version),t.chrome?t.webkit=!0:t.webkit&&(t.safari=!0),v.browser=t,v.sub=function(){function e(t,n){return new e.fn.init(t,n)}v.extend(!0,e,this),e.superclass=this,e.fn=e.prototype=this(),e.fn.constructor=e,e.sub=this.sub,e.fn.init=function(r,i){return i&&i instanceof v&&!(i instanceof e)&&(i=e(i)),v.fn.init.call(this,r,i,t)},e.fn.init.prototype=e.fn;var t=e(i);return e}}();var Dt,Pt,Ht,Bt=/alpha\([^)]*\)/i,jt=/opacity=([^)]*)/,Ft=/^(top|right|bottom|left)$/,It=/^(none|table(?!-c[ea]).+)/,qt=/^margin/,Rt=new RegExp("^("+m+")(.*)$","i"),Ut=new RegExp("^("+m+")(?!px)[a-z%]+$","i"),zt=new RegExp("^([-+])=("+m+")","i"),Wt={BODY:"block"},Xt={position:"absolute",visibility:"hidden",display:"block"},Vt={letterSpacing:0,fontWeight:400},$t=["Top","Right","Bottom","Left"],Jt=["Webkit","O","Moz","ms"],Kt=v.fn.toggle;v.fn.extend({css:function(e,n){return v.access(this,function(e,n,r){return r!==t?v.style(e,n,r):v.css(e,n)},e,n,arguments.length>1)},show:function(){return Yt(this,!0)},hide:function(){return Yt(this)},toggle:function(e,t){var n=typeof e=="boolean";return v.isFunction(e)&&v.isFunction(t)?Kt.apply(this,arguments):this.each(function(){(n?e:Gt(this))?v(this).show():v(this).hide()})}}),v.extend({cssHooks:{opacity:{get:function(e,t){if(t){var n=Dt(e,"opacity");return n===""?"1":n}}}},cssNumber:{fillOpacity:!0,fontWeight:!0,lineHeight:!0,opacity:!0,orphans:!0,widows:!0,zIndex:!0,zoom:!0},cssProps:{"float":v.support.cssFloat?"cssFloat":"styleFloat"},style:function(e,n,r,i){if(!e||e.nodeType===3||e.nodeType===8||!e.style)return;var s,o,u,a=v.camelCase(n),f=e.style;n=v.cssProps[a]||(v.cssProps[a]=Qt(f,a)),u=v.cssHooks[n]||v.cssHooks[a];if(r===t)return u&&"get"in u&&(s=u.get(e,!1,i))!==t?s:f[n];o=typeof r,o==="string"&&(s=zt.exec(r))&&(r=(s[1]+1)*s[2]+parseFloat(v.css(e,n)),o="number");if(r==null||o==="number"&&isNaN(r))return;o==="number"&&!v.cssNumber[a]&&(r+="px");if(!u||!("set"in u)||(r=u.set(e,r,i))!==t)try{f[n]=r}catch(l){}},css:function(e,n,r,i){var s,o,u,a=v.camelCase(n);return n=v.cssProps[a]||(v.cssProps[a]=Qt(e.style,a)),u=v.cssHooks[n]||v.cssHooks[a],u&&"get"in u&&(s=u.get(e,!0,i)),s===t&&(s=Dt(e,n)),s==="normal"&&n in Vt&&(s=Vt[n]),r||i!==t?(o=parseFloat(s),r||v.isNumeric(o)?o||0:s):s},swap:function(e,t,n){var r,i,s={};for(i in t)s[i]=e.style[i],e.style[i]=t[i];r=n.call(e);for(i in t)e.style[i]=s[i];return r}}),e.getComputedStyle?Dt=function(t,n){var r,i,s,o,u=e.getComputedStyle(t,null),a=t.style;return u&&(r=u.getPropertyValue(n)||u[n],r===""&&!v.contains(t.ownerDocument,t)&&(r=v.style(t,n)),Ut.test(r)&&qt.test(n)&&(i=a.width,s=a.minWidth,o=a.maxWidth,a.minWidth=a.maxWidth=a.width=r,r=u.width,a.width=i,a.minWidth=s,a.maxWidth=o)),r}:i.documentElement.currentStyle&&(Dt=function(e,t){var n,r,i=e.currentStyle&&e.currentStyle[t],s=e.style;return i==null&&s&&s[t]&&(i=s[t]),Ut.test(i)&&!Ft.test(t)&&(n=s.left,r=e.runtimeStyle&&e.runtimeStyle.left,r&&(e.runtimeStyle.left=e.currentStyle.left),s.left=t==="fontSize"?"1em":i,i=s.pixelLeft+"px",s.left=n,r&&(e.runtimeStyle.left=r)),i===""?"auto":i}),v.each(["height","width"],function(e,t){v.cssHooks[t]={get:function(e,n,r){if(n)return e.offsetWidth===0&&It.test(Dt(e,"display"))?v.swap(e,Xt,function(){return tn(e,t,r)}):tn(e,t,r)},set:function(e,n,r){return Zt(e,n,r?en(e,t,r,v.support.boxSizing&&v.css(e,"boxSizing")==="border-box"):0)}}}),v.support.opacity||(v.cssHooks.opacity={get:function(e,t){return jt.test((t&&e.currentStyle?e.currentStyle.filter:e.style.filter)||"")?.01*parseFloat(RegExp.$1)+"":t?"1":""},set:function(e,t){var n=e.style,r=e.currentStyle,i=v.isNumeric(t)?"alpha(opacity="+t*100+")":"",s=r&&r.filter||n.filter||"";n.zoom=1;if(t>=1&&v.trim(s.replace(Bt,""))===""&&n.removeAttribute){n.removeAttribute("filter");if(r&&!r.filter)return}n.filter=Bt.test(s)?s.replace(Bt,i):s+" "+i}}),v(function(){v.support.reliableMarginRight||(v.cssHooks.marginRight={get:function(e,t){return v.swap(e,{display:"inline-block"},function(){if(t)return Dt(e,"marginRight")})}}),!v.support.pixelPosition&&v.fn.position&&v.each(["top","left"],function(e,t){v.cssHooks[t]={get:function(e,n){if(n){var r=Dt(e,t);return Ut.test(r)?v(e).position()[t]+"px":r}}}})}),v.expr&&v.expr.filters&&(v.expr.filters.hidden=function(e){return e.offsetWidth===0&&e.offsetHeight===0||!v.support.reliableHiddenOffsets&&(e.style&&e.style.display||Dt(e,"display"))==="none"},v.expr.filters.visible=function(e){return!v.expr.filters.hidden(e)}),v.each({margin:"",padding:"",border:"Width"},function(e,t){v.cssHooks[e+t]={expand:function(n){var r,i=typeof n=="string"?n.split(" "):[n],s={};for(r=0;r<4;r++)s[e+$t[r]+t]=i[r]||i[r-2]||i[0];return s}},qt.test(e)||(v.cssHooks[e+t].set=Zt)});var rn=/%20/g,sn=/\[\]$/,on=/\r?\n/g,un=/^(?:color|date|datetime|datetime-local|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i,an=/^(?:select|textarea)/i;v.fn.extend({serialize:function(){return v.param(this.serializeArray())},serializeArray:function(){return this.map(function(){return this.elements?v.makeArray(this.elements):this}).filter(function(){return this.name&&!this.disabled&&(this.checked||an.test(this.nodeName)||un.test(this.type))}).map(function(e,t){var n=v(this).val();return n==null?null:v.isArray(n)?v.map(n,function(e,n){return{name:t.name,value:e.replace(on,"\r\n")}}):{name:t.name,value:n.replace(on,"\r\n")}}).get()}}),v.param=function(e,n){var r,i=[],s=function(e,t){t=v.isFunction(t)?t():t==null?"":t,i[i.length]=encodeURIComponent(e)+"="+encodeURIComponent(t)};n===t&&(n=v.ajaxSettings&&v.ajaxSettings.traditional);if(v.isArray(e)||e.jquery&&!v.isPlainObject(e))v.each(e,function(){s(this.name,this.value)});else for(r in e)fn(r,e[r],n,s);return i.join("&").replace(rn,"+")};var ln,cn,hn=/#.*$/,pn=/^(.*?):[ \t]*([^\r\n]*)\r?$/mg,dn=/^(?:about|app|app\-storage|.+\-extension|file|res|widget):$/,vn=/^(?:GET|HEAD)$/,mn=/^\/\//,gn=/\?/,yn=/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,bn=/([?&])_=[^&]*/,wn=/^([\w\+\.\-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/,En=v.fn.load,Sn={},xn={},Tn=["*/"]+["*"];try{cn=s.href}catch(Nn){cn=i.createElement("a"),cn.href="",cn=cn.href}ln=wn.exec(cn.toLowerCase())||[],v.fn.load=function(e,n,r){if(typeof e!="string"&&En)return En.apply(this,arguments);if(!this.length)return this;var i,s,o,u=this,a=e.indexOf(" ");return a>=0&&(i=e.slice(a,e.length),e=e.slice(0,a)),v.isFunction(n)?(r=n,n=t):n&&typeof n=="object"&&(s="POST"),v.ajax({url:e,type:s,dataType:"html",data:n,complete:function(e,t){r&&u.each(r,o||[e.responseText,t,e])}}).done(function(e){o=arguments,u.html(i?v("<div>").append(e.replace(yn,"")).find(i):e)}),this},v.each("ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split(" "),function(e,t){v.fn[t]=function(e){return this.on(t,e)}}),v.each(["get","post"],function(e,n){v[n]=function(e,r,i,s){return v.isFunction(r)&&(s=s||i,i=r,r=t),v.ajax({type:n,url:e,data:r,success:i,dataType:s})}}),v.extend({getScript:function(e,n){return v.get(e,t,n,"script")},getJSON:function(e,t,n){return v.get(e,t,n,"json")},ajaxSetup:function(e,t){return t?Ln(e,v.ajaxSettings):(t=e,e=v.ajaxSettings),Ln(e,t),e},ajaxSettings:{url:cn,isLocal:dn.test(ln[1]),global:!0,type:"GET",contentType:"application/x-www-form-urlencoded; charset=UTF-8",processData:!0,async:!0,accepts:{xml:"application/xml, text/xml",html:"text/html",text:"text/plain",json:"application/json, text/javascript","*":Tn},contents:{xml:/xml/,html:/html/,json:/json/},responseFields:{xml:"responseXML",text:"responseText"},converters:{"* text":e.String,"text html":!0,"text json":v.parseJSON,"text xml":v.parseXML},flatOptions:{context:!0,url:!0}},ajaxPrefilter:Cn(Sn),ajaxTransport:Cn(xn),ajax:function(e,n){function T(e,n,s,a){var l,y,b,w,S,T=n;if(E===2)return;E=2,u&&clearTimeout(u),o=t,i=a||"",x.readyState=e>0?4:0,s&&(w=An(c,x,s));if(e>=200&&e<300||e===304)c.ifModified&&(S=x.getResponseHeader("Last-Modified"),S&&(v.lastModified[r]=S),S=x.getResponseHeader("Etag"),S&&(v.etag[r]=S)),e===304?(T="notmodified",l=!0):(l=On(c,w),T=l.state,y=l.data,b=l.error,l=!b);else{b=T;if(!T||e)T="error",e<0&&(e=0)}x.status=e,x.statusText=(n||T)+"",l?d.resolveWith(h,[y,T,x]):d.rejectWith(h,[x,T,b]),x.statusCode(g),g=t,f&&p.trigger("ajax"+(l?"Success":"Error"),[x,c,l?y:b]),m.fireWith(h,[x,T]),f&&(p.trigger("ajaxComplete",[x,c]),--v.active||v.event.trigger("ajaxStop"))}typeof e=="object"&&(n=e,e=t),n=n||{};var r,i,s,o,u,a,f,l,c=v.ajaxSetup({},n),h=c.context||c,p=h!==c&&(h.nodeType||h instanceof v)?v(h):v.event,d=v.Deferred(),m=v.Callbacks("once memory"),g=c.statusCode||{},b={},w={},E=0,S="canceled",x={readyState:0,setRequestHeader:function(e,t){if(!E){var n=e.toLowerCase();e=w[n]=w[n]||e,b[e]=t}return this},getAllResponseHeaders:function(){return E===2?i:null},getResponseHeader:function(e){var n;if(E===2){if(!s){s={};while(n=pn.exec(i))s[n[1].toLowerCase()]=n[2]}n=s[e.toLowerCase()]}return n===t?null:n},overrideMimeType:function(e){return E||(c.mimeType=e),this},abort:function(e){return e=e||S,o&&o.abort(e),T(0,e),this}};d.promise(x),x.success=x.done,x.error=x.fail,x.complete=m.add,x.statusCode=function(e){if(e){var t;if(E<2)for(t in e)g[t]=[g[t],e[t]];else t=e[x.status],x.always(t)}return this},c.url=((e||c.url)+"").replace(hn,"").replace(mn,ln[1]+"//"),c.dataTypes=v.trim(c.dataType||"*").toLowerCase().split(y),c.crossDomain==null&&(a=wn.exec(c.url.toLowerCase()),c.crossDomain=!(!a||a[1]===ln[1]&&a[2]===ln[2]&&(a[3]||(a[1]==="http:"?80:443))==(ln[3]||(ln[1]==="http:"?80:443)))),c.data&&c.processData&&typeof c.data!="string"&&(c.data=v.param(c.data,c.traditional)),kn(Sn,c,n,x);if(E===2)return x;f=c.global,c.type=c.type.toUpperCase(),c.hasContent=!vn.test(c.type),f&&v.active++===0&&v.event.trigger("ajaxStart");if(!c.hasContent){c.data&&(c.url+=(gn.test(c.url)?"&":"?")+c.data,delete c.data),r=c.url;if(c.cache===!1){var N=v.now(),C=c.url.replace(bn,"$1_="+N);c.url=C+(C===c.url?(gn.test(c.url)?"&":"?")+"_="+N:"")}}(c.data&&c.hasContent&&c.contentType!==!1||n.contentType)&&x.setRequestHeader("Content-Type",c.contentType),c.ifModified&&(r=r||c.url,v.lastModified[r]&&x.setRequestHeader("If-Modified-Since",v.lastModified[r]),v.etag[r]&&x.setRequestHeader("If-None-Match",v.etag[r])),x.setRequestHeader("Accept",c.dataTypes[0]&&c.accepts[c.dataTypes[0]]?c.accepts[c.dataTypes[0]]+(c.dataTypes[0]!=="*"?", "+Tn+"; q=0.01":""):c.accepts["*"]);for(l in c.headers)x.setRequestHeader(l,c.headers[l]);if(!c.beforeSend||c.beforeSend.call(h,x,c)!==!1&&E!==2){S="abort";for(l in{success:1,error:1,complete:1})x[l](c[l]);o=kn(xn,c,n,x);if(!o)T(-1,"No Transport");else{x.readyState=1,f&&p.trigger("ajaxSend",[x,c]),c.async&&c.timeout>0&&(u=setTimeout(function(){x.abort("timeout")},c.timeout));try{E=1,o.send(b,T)}catch(k){if(!(E<2))throw k;T(-1,k)}}return x}return x.abort()},active:0,lastModified:{},etag:{}});var Mn=[],_n=/\?/,Dn=/(=)\?(?=&|$)|\?\?/,Pn=v.now();v.ajaxSetup({jsonp:"callback",jsonpCallback:function(){var e=Mn.pop()||v.expando+"_"+Pn++;return this[e]=!0,e}}),v.ajaxPrefilter("json jsonp",function(n,r,i){var s,o,u,a=n.data,f=n.url,l=n.jsonp!==!1,c=l&&Dn.test(f),h=l&&!c&&typeof a=="string"&&!(n.contentType||"").indexOf("application/x-www-form-urlencoded")&&Dn.test(a);if(n.dataTypes[0]==="jsonp"||c||h)return s=n.jsonpCallback=v.isFunction(n.jsonpCallback)?n.jsonpCallback():n.jsonpCallback,o=e[s],c?n.url=f.replace(Dn,"$1"+s):h?n.data=a.replace(Dn,"$1"+s):l&&(n.url+=(_n.test(f)?"&":"?")+n.jsonp+"="+s),n.converters["script json"]=function(){return u||v.error(s+" was not called"),u[0]},n.dataTypes[0]="json",e[s]=function(){u=arguments},i.always(function(){e[s]=o,n[s]&&(n.jsonpCallback=r.jsonpCallback,Mn.push(s)),u&&v.isFunction(o)&&o(u[0]),u=o=t}),"script"}),v.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/javascript|ecmascript/},converters:{"text script":function(e){return v.globalEval(e),e}}}),v.ajaxPrefilter("script",function(e){e.cache===t&&(e.cache=!1),e.crossDomain&&(e.type="GET",e.global=!1)}),v.ajaxTransport("script",function(e){if(e.crossDomain){var n,r=i.head||i.getElementsByTagName("head")[0]||i.documentElement;return{send:function(s,o){n=i.createElement("script"),n.async="async",e.scriptCharset&&(n.charset=e.scriptCharset),n.src=e.url,n.onload=n.onreadystatechange=function(e,i){if(i||!n.readyState||/loaded|complete/.test(n.readyState))n.onload=n.onreadystatechange=null,r&&n.parentNode&&r.removeChild(n),n=t,i||o(200,"success")},r.insertBefore(n,r.firstChild)},abort:function(){n&&n.onload(0,1)}}}});var Hn,Bn=e.ActiveXObject?function(){for(var e in Hn)Hn[e](0,1)}:!1,jn=0;v.ajaxSettings.xhr=e.ActiveXObject?function(){return!this.isLocal&&Fn()||In()}:Fn,function(e){v.extend(v.support,{ajax:!!e,cors:!!e&&"withCredentials"in e})}(v.ajaxSettings.xhr()),v.support.ajax&&v.ajaxTransport(function(n){if(!n.crossDomain||v.support.cors){var r;return{send:function(i,s){var o,u,a=n.xhr();n.username?a.open(n.type,n.url,n.async,n.username,n.password):a.open(n.type,n.url,n.async);if(n.xhrFields)for(u in n.xhrFields)a[u]=n.xhrFields[u];n.mimeType&&a.overrideMimeType&&a.overrideMimeType(n.mimeType),!n.crossDomain&&!i["X-Requested-With"]&&(i["X-Requested-With"]="XMLHttpRequest");try{for(u in i)a.setRequestHeader(u,i[u])}catch(f){}a.send(n.hasContent&&n.data||null),r=function(e,i){var u,f,l,c,h;try{if(r&&(i||a.readyState===4)){r=t,o&&(a.onreadystatechange=v.noop,Bn&&delete Hn[o]);if(i)a.readyState!==4&&a.abort();else{u=a.status,l=a.getAllResponseHeaders(),c={},h=a.responseXML,h&&h.documentElement&&(c.xml=h);try{c.text=a.responseText}catch(p){}try{f=a.statusText}catch(p){f=""}!u&&n.isLocal&&!n.crossDomain?u=c.text?200:404:u===1223&&(u=204)}}}catch(d){i||s(-1,d)}c&&s(u,f,c,l)},n.async?a.readyState===4?setTimeout(r,0):(o=++jn,Bn&&(Hn||(Hn={},v(e).unload(Bn)),Hn[o]=r),a.onreadystatechange=r):r()},abort:function(){r&&r(0,1)}}}});var qn,Rn,Un=/^(?:toggle|show|hide)$/,zn=new RegExp("^(?:([-+])=|)("+m+")([a-z%]*)$","i"),Wn=/queueHooks$/,Xn=[Gn],Vn={"*":[function(e,t){var n,r,i=this.createTween(e,t),s=zn.exec(t),o=i.cur(),u=+o||0,a=1,f=20;if(s){n=+s[2],r=s[3]||(v.cssNumber[e]?"":"px");if(r!=="px"&&u){u=v.css(i.elem,e,!0)||n||1;do a=a||".5",u/=a,v.style(i.elem,e,u+r);while(a!==(a=i.cur()/o)&&a!==1&&--f)}i.unit=r,i.start=u,i.end=s[1]?u+(s[1]+1)*n:n}return i}]};v.Animation=v.extend(Kn,{tweener:function(e,t){v.isFunction(e)?(t=e,e=["*"]):e=e.split(" ");var n,r=0,i=e.length;for(;r<i;r++)n=e[r],Vn[n]=Vn[n]||[],Vn[n].unshift(t)},prefilter:function(e,t){t?Xn.unshift(e):Xn.push(e)}}),v.Tween=Yn,Yn.prototype={constructor:Yn,init:function(e,t,n,r,i,s){this.elem=e,this.prop=n,this.easing=i||"swing",this.options=t,this.start=this.now=this.cur(),this.end=r,this.unit=s||(v.cssNumber[n]?"":"px")},cur:function(){var e=Yn.propHooks[this.prop];return e&&e.get?e.get(this):Yn.propHooks._default.get(this)},run:function(e){var t,n=Yn.propHooks[this.prop];return this.options.duration?this.pos=t=v.easing[this.easing](e,this.options.duration*e,0,1,this.options.duration):this.pos=t=e,this.now=(this.end-this.start)*t+this.start,this.options.step&&this.options.step.call(this.elem,this.now,this),n&&n.set?n.set(this):Yn.propHooks._default.set(this),this}},Yn.prototype.init.prototype=Yn.prototype,Yn.propHooks={_default:{get:function(e){var t;return e.elem[e.prop]==null||!!e.elem.style&&e.elem.style[e.prop]!=null?(t=v.css(e.elem,e.prop,!1,""),!t||t==="auto"?0:t):e.elem[e.prop]},set:function(e){v.fx.step[e.prop]?v.fx.step[e.prop](e):e.elem.style&&(e.elem.style[v.cssProps[e.prop]]!=null||v.cssHooks[e.prop])?v.style(e.elem,e.prop,e.now+e.unit):e.elem[e.prop]=e.now}}},Yn.propHooks.scrollTop=Yn.propHooks.scrollLeft={set:function(e){e.elem.nodeType&&e.elem.parentNode&&(e.elem[e.prop]=e.now)}},v.each(["toggle","show","hide"],function(e,t){var n=v.fn[t];v.fn[t]=function(r,i,s){return r==null||typeof r=="boolean"||!e&&v.isFunction(r)&&v.isFunction(i)?n.apply(this,arguments):this.animate(Zn(t,!0),r,i,s)}}),v.fn.extend({fadeTo:function(e,t,n,r){return this.filter(Gt).css("opacity",0).show().end().animate({opacity:t},e,n,r)},animate:function(e,t,n,r){var i=v.isEmptyObject(e),s=v.speed(t,n,r),o=function(){var t=Kn(this,v.extend({},e),s);i&&t.stop(!0)};return i||s.queue===!1?this.each(o):this.queue(s.queue,o)},stop:function(e,n,r){var i=function(e){var t=e.stop;delete e.stop,t(r)};return typeof e!="string"&&(r=n,n=e,e=t),n&&e!==!1&&this.queue(e||"fx",[]),this.each(function(){var t=!0,n=e!=null&&e+"queueHooks",s=v.timers,o=v._data(this);if(n)o[n]&&o[n].stop&&i(o[n]);else for(n in o)o[n]&&o[n].stop&&Wn.test(n)&&i(o[n]);for(n=s.length;n--;)s[n].elem===this&&(e==null||s[n].queue===e)&&(s[n].anim.stop(r),t=!1,s.splice(n,1));(t||!r)&&v.dequeue(this,e)})}}),v.each({slideDown:Zn("show"),slideUp:Zn("hide"),slideToggle:Zn("toggle"),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(e,t){v.fn[e]=function(e,n,r){return this.animate(t,e,n,r)}}),v.speed=function(e,t,n){var r=e&&typeof e=="object"?v.extend({},e):{complete:n||!n&&t||v.isFunction(e)&&e,duration:e,easing:n&&t||t&&!v.isFunction(t)&&t};r.duration=v.fx.off?0:typeof r.duration=="number"?r.duration:r.duration in v.fx.speeds?v.fx.speeds[r.duration]:v.fx.speeds._default;if(r.queue==null||r.queue===!0)r.queue="fx";return r.old=r.complete,r.complete=function(){v.isFunction(r.old)&&r.old.call(this),r.queue&&v.dequeue(this,r.queue)},r},v.easing={linear:function(e){return e},swing:function(e){return.5-Math.cos(e*Math.PI)/2}},v.timers=[],v.fx=Yn.prototype.init,v.fx.tick=function(){var e,n=v.timers,r=0;qn=v.now();for(;r<n.length;r++)e=n[r],!e()&&n[r]===e&&n.splice(r--,1);n.length||v.fx.stop(),qn=t},v.fx.timer=function(e){e()&&v.timers.push(e)&&!Rn&&(Rn=setInterval(v.fx.tick,v.fx.interval))},v.fx.interval=13,v.fx.stop=function(){clearInterval(Rn),Rn=null},v.fx.speeds={slow:600,fast:200,_default:400},v.fx.step={},v.expr&&v.expr.filters&&(v.expr.filters.animated=function(e){return v.grep(v.timers,function(t){return e===t.elem}).length});var er=/^(?:body|html)$/i;v.fn.offset=function(e){if(arguments.length)return e===t?this:this.each(function(t){v.offset.setOffset(this,e,t)});var n,r,i,s,o,u,a,f={top:0,left:0},l=this[0],c=l&&l.ownerDocument;if(!c)return;return(r=c.body)===l?v.offset.bodyOffset(l):(n=c.documentElement,v.contains(n,l)?(typeof l.getBoundingClientRect!="undefined"&&(f=l.getBoundingClientRect()),i=tr(c),s=n.clientTop||r.clientTop||0,o=n.clientLeft||r.clientLeft||0,u=i.pageYOffset||n.scrollTop,a=i.pageXOffset||n.scrollLeft,{top:f.top+u-s,left:f.left+a-o}):f)},v.offset={bodyOffset:function(e){var t=e.offsetTop,n=e.offsetLeft;return v.support.doesNotIncludeMarginInBodyOffset&&(t+=parseFloat(v.css(e,"marginTop"))||0,n+=parseFloat(v.css(e,"marginLeft"))||0),{top:t,left:n}},setOffset:function(e,t,n){var r=v.css(e,"position");r==="static"&&(e.style.position="relative");var i=v(e),s=i.offset(),o=v.css(e,"top"),u=v.css(e,"left"),a=(r==="absolute"||r==="fixed")&&v.inArray("auto",[o,u])>-1,f={},l={},c,h;a?(l=i.position(),c=l.top,h=l.left):(c=parseFloat(o)||0,h=parseFloat(u)||0),v.isFunction(t)&&(t=t.call(e,n,s)),t.top!=null&&(f.top=t.top-s.top+c),t.left!=null&&(f.left=t.left-s.left+h),"using"in t?t.using.call(e,f):i.css(f)}},v.fn.extend({position:function(){if(!this[0])return;var e=this[0],t=this.offsetParent(),n=this.offset(),r=er.test(t[0].nodeName)?{top:0,left:0}:t.offset();return n.top-=parseFloat(v.css(e,"marginTop"))||0,n.left-=parseFloat(v.css(e,"marginLeft"))||0,r.top+=parseFloat(v.css(t[0],"borderTopWidth"))||0,r.left+=parseFloat(v.css(t[0],"borderLeftWidth"))||0,{top:n.top-r.top,left:n.left-r.left}},offsetParent:function(){return this.map(function(){var e=this.offsetParent||i.body;while(e&&!er.test(e.nodeName)&&v.css(e,"position")==="static")e=e.offsetParent;return e||i.body})}}),v.each({scrollLeft:"pageXOffset",scrollTop:"pageYOffset"},function(e,n){var r=/Y/.test(n);v.fn[e]=function(i){return v.access(this,function(e,i,s){var o=tr(e);if(s===t)return o?n in o?o[n]:o.document.documentElement[i]:e[i];o?o.scrollTo(r?v(o).scrollLeft():s,r?s:v(o).scrollTop()):e[i]=s},e,i,arguments.length,null)}}),v.each({Height:"height",Width:"width"},function(e,n){v.each({padding:"inner"+e,content:n,"":"outer"+e},function(r,i){v.fn[i]=function(i,s){var o=arguments.length&&(r||typeof i!="boolean"),u=r||(i===!0||s===!0?"margin":"border");return v.access(this,function(n,r,i){var s;return v.isWindow(n)?n.document.documentElement["client"+e]:n.nodeType===9?(s=n.documentElement,Math.max(n.body["scroll"+e],s["scroll"+e],n.body["offset"+e],s["offset"+e],s["client"+e])):i===t?v.css(n,r,i,u):v.style(n,r,i,u)},n,o?i:t,o,null)}})}),e.jQuery=e.$=v,typeof define=="function"&&define.amd&&define.amd.jQuery&&define("jquery",[],function(){return v})})(window);
eval(function(p,a,c,k,e,r){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('(9($){9 2k(){7.1X=[];7.1Y=[];7.2l=[];7.2l[\'\']={2Z:\'4d 4e\',30:\'4f 1r 4g 4h 4i 2m\'};7.2n=7.2l[\'\'];7.31=1e 4j().4k();7.2o=32(\'4l.4m\')}9 32(a){1s{u!!(4n.2p&&1e 2p(a))}1t(e){u 1L}}8 q=\'4o\';$.I(2k.W,{1C:\'4p\',1u:\'2q://2r.33.34/4q/D\',1j:\'2q://2r.33.34/4r/2s\',35:2t,1M:{4s:\'36\',4t:\'1Z\',4u:\'4v-2u\',4w:\'2u-4x\',2v:\'37-19\',4y:\'37-38\',4z:\'1D-39\',4A:\'1D-39-4B\',4C:\'1D-2w\',4D:\'4E-2u\',4F:\'4G-4H\',4I:\'3a-21\',4J:\'3a-38\',4K:\'3b-1D\',4L:\'3b-21\',4M:\'1v-4N\',4O:\'1v-3c\',4P:\'1v-3c-4Q\',4R:\'1v-4S\',4T:\'1v-1N\',4U:\'1v-4V\',4W:\'1v-4X\',4Y:\'3d-3e-4Z\',50:\'3d-3e-51\',52:\'22-3f-x\',53:\'22-3g-x\',54:\'23-2w\',55:\'56-3h\',57:\'58-1D\',59:\'1O-5a\',5b:\'1O-5c\',5d:\'1O-5e\',3i:\'2x-1D\',3j:\'2x-21\',5f:\'3k-3l\',5g:\'3k-3m\',5h:\'1w-5i\',5j:\'1w-5k\',5l:\'1w-5m\',5n:\'1w-5o\',5p:\'1w-5q\',5r:\'1w-21\',5s:\'1w-O\',5t:\'15-5u\',5v:\'15-5w\',5x:\'15-2w\',5y:\'3n-3l\',5z:\'3n-3m\',5A:\'24-3f-y\',5B:\'24-3g-y\',5C:\'5D-3h\',5E:\'5F-5G\'},3o:9(a,b){8 c=(a.25==7.1u?a:P);8 a=(c?P:a);w($(a||c).2y(7.1C)){u}w(13 b==\'1f\'){b={26:b}}Y w(13 b==\'9\'){b={1m:b}}$(a||c).5H(7.1C);1s{w(!c){c=27.2z(7.1u,\'D\');c.1x(\'2A\',\'1.1\');w(a.2B>0){c.1x(\'O\',a.2B)}w(a.2C>0){c.1x(\'U\',a.2C)}a.11(c)}7.2D(a,c,b||{})}1t(e){w($.1r.28){w(!a.E){a.E=\'D\'+(7.31++)}7.1X[a.E]=b;a.3p=\'<5I 1y="23/D+2E" O="3q%" \'+\'U="3q%" 5J="\'+(b.5K||\'\')+\'5L.D" \'+\'5M="2q://2r.5N.5O/D/5P/5Q/5R.5S"/>\'}Y{a.3p=\'<p 36="5T">\'+7.2n.30+\'</p>\'}}},3r:9(){14(8 i=0;i<27.2F.R;i++){8 a=27.2F[i].3s;w(!$(a).2y($.D.1C)||$.2G(a,q)){5U}8 b=P;1s{b=27.2F[i].5V()}1t(e){5W($.D.3r,5X);u}b=(b?b.1P:P);w(b){$.D.2D(a,b)}}},2D:9(a,b,c){8 c=c||7.1X[a.E];7.1X[a?a.E:\'\']=P;8 d=1e 7.35(b,a);$.2G(a||b,q,d);1s{w(c.26){d.3t(c.26,c)}w(c.F){d.1Q(c.F)}w(c.1m&&!c.26){c.1m.1R(a||b,[d])}}1t(e){5Y(e)}},5Z:9(a){a=(13 a==\'1f\'?$(a)[0]:(a.1E?a[0]:a));u $.2G(a,q)},60:9(a){8 b=$(a);w(!b.2y(7.1C)){u}b.61(7.1C);w(a.25!=7.1u){b.62()}$.63(a,q)},64:9(a,b){7.1Y.3u([a,b])},65:9(a){u(a.1F==1&&a.25==$.D.1u)}});9 2t(a,b){7.N=a;7.1z=b;14(8 i=0;i<$.D.1Y.R;i++){8 c=$.D.1Y[i];7[c[0]]=1e c[1](7)}}$.I(2t.W,{66:9(){u(7.1z?7.1z.2B:7.N.O)},67:9(){u(7.1z?7.1z.2C:7.N.U)},68:9(){u 7.N},1Q:9(a,b,c){w(!a.12){c=b;b=a;a=7.N}w(c){14(8 i=a.1g.R-1;i>=0;i--){8 d=a.1g.29(i);w(!(d.12==\'69\'||d.12==\'2A\'||d.12.1G(0,5)==\'2H\')){a.1g.6a(d.12)}}}14(8 e 1Z b){a.1x($.D.1M[e]||e,b[e])}u 7},3v:9(a){u 7.N.17.3v(a)},6b:9(a,b){w(a){14(8 c 1Z b){w(b[c]==P){a.6c($.D.1M[c]||c)}Y{a.1x($.D.1M[c]||c,b[c])}}}u 7},J:9(b,c,d){c.3w(0,0,\'B\');c.3w(c.R,0,\'F\');8 e={};8 f=0;w(b[0]!=P&&b[0].1E){b[0]=b[0][0]}w(b[0]!=P&&!(13 b[0]==\'1S\'&&b[0].12)){e[\'B\']=P;f=1}14(8 i=0;i<b.R;i++){e[c[i+f]]=b[i]}w(d){$.2a(d,9(i,a){w(13 e[a]==\'1S\'){e.F=e[a];e[a]=P}})}u e},3x:9(a,b,c){8 d=7.J(G,[\'15\']);8 e=7.K(d.B,\'3x\',d.F||{});e.11(7.N.17.1h(d.15));u e},6d:9(a,b,c){8 d=7.J(G,[\'15\']);8 e=7.K(d.B,\'6e\',d.F||{});e.11(7.N.17.1h(d.15));u e},3y:9(a,b,c){8 d=7.J(G,[\'E\'],[\'E\']);u 7.K(d.B,\'3y\',$.I((d.E?{E:d.E}:{}),d.F||{}))},3z:9(a,b,c,d,e,f,g){8 h=7.J(G,[\'E\',\'1i\',\'1n\',\'O\',\'U\']);u 7.K(h.B,\'3z\',$.I({E:h.E,2I:h.1i+\' \'+h.1n+\' \'+h.O+\' \'+h.U},h.F||{}))},1O:9(a,b,c,d,e,f,g,h){8 i=7.J(G,[\'E\',\'2J\',\'2K\',\'3A\',\'3B\',\'2b\'],[\'2b\']);u 7.K(i.B,\'1O\',$.I({E:i.E,2J:i.2J,2K:i.2K,6f:i.3A,6g:i.3B,2b:i.2b||\'6h\'},i.F||{}))},1N:9(a,b,c){8 d=7.J(G,[\'2L\']);8 e=7.K(d.B,\'1N\',$.I({1y:\'15/3C\'},d.F||{}));e.11(7.N.17.1h(d.2L));w($.1r.6i){$(\'6j\').6k(\'<1N 1y="15/3C">\'+d.2L+\'</1N>\')}u e},1H:9(a,b,c,d){8 e=7.J(G,[\'1H\',\'1y\'],[\'1y\']);8 f=7.K(e.B,\'1H\',$.I({1y:e.1y||\'15/6l\'},e.F||{}));f.11(7.N.17.1h(e.1H));w(!$.1r.6m){$.3D(e.1H)}u f},3E:9(a,b,c,d,e,f,g,h){8 i=7.J(G,[\'E\',\'2c\',\'1i\',\'1n\',\'1I\',\'1J\'],[\'1i\']);8 j=$.I({E:i.E},(i.1i!=P?{1i:i.1i,1n:i.1n,1I:i.1I,1J:i.1J}:{}));u 7.2M(i.B,\'3E\',$.I(j,i.F||{}),i.2c)},3F:9(a,b,c,d,e,r,f,g,h){8 i=7.J(G,[\'E\',\'2c\',\'1c\',\'1k\',\'r\',\'2N\',\'2O\'],[\'1c\']);8 j=$.I({E:i.E},(i.1c!=P?{1c:i.1c,1k:i.1k,r:i.r,2N:i.2N,2O:i.2O}:{}));u 7.2M(i.B,\'3F\',$.I(j,i.F||{}),i.2c)},2M:9(a,b,c,d){8 e=7.K(a,b,c);14(8 i=0;i<d.R;i++){8 f=d[i];7.K(e,\'2x\',$.I({6n:f[0],3i:f[1]},(f[2]!=P?{3j:f[2]}:{})))}u e},3G:9(a,b,x,y,c,d,e,f,g,h,i){8 j=7.J(G,[\'E\',\'x\',\'y\',\'O\',\'U\',\'1o\',\'2d\',\'2e\',\'2f\'],[\'1o\']);8 k=$.I({E:j.E,x:j.x,y:j.y,O:j.O,U:j.U},(j.1o!=P?{2I:j.1o+\' \'+j.2d+\' \'+j.2e+\' \'+j.2f}:{}));u 7.K(j.B,\'3G\',$.I(k,j.F||{}))},2v:9(a,b,c,d){8 e=7.J(G,[\'E\',\'2g\']);e.2g=e.2g||\'6o\';u 7.K(e.B,\'2v\',$.I({E:e.E,6p:e.2g},e.F||{}))},3H:9(a,b,x,y,c,d,e){8 f=7.J(G,[\'E\',\'x\',\'y\',\'O\',\'U\']);u 7.K(f.B,\'3H\',$.I({E:f.E,x:f.x,y:f.y,O:f.O,U:f.U},f.F||{}))},6q:9(){u 1e X()},6r:9(){u 1e 2P()},D:9(a,x,y,b,c,d,e,f,g,h){8 i=7.J(G,[\'x\',\'y\',\'O\',\'U\',\'1o\',\'2d\',\'2e\',\'2f\'],[\'1o\']);8 j=$.I({x:i.x,y:i.y,O:i.O,U:i.U},(i.1o!=P?{2I:i.1o+\' \'+i.2d+\' \'+i.2e+\' \'+i.2f}:{}));u 7.K(i.B,\'D\',$.I(j,i.F||{}))},6s:9(a,b,c){8 d=7.J(G,[\'E\'],[\'E\']);u 7.K(d.B,\'g\',$.I({E:d.E},d.F||{}))},3I:9(a,x,y,b,c,d,e){8 f=7.J(G,[\'x\',\'y\',\'O\',\'U\',\'1p\']);w(13 f.x==\'1f\'){f.1p=f.x;f.F=f.y;f.x=f.y=f.O=f.U=P}8 g=7.K(f.B,\'3I\',$.I({x:f.x,y:f.y,O:f.O,U:f.U},f.F||{}));g.1A($.D.1j,\'1l\',f.1p);u g},6t:9(a,b,c){8 d=7.J(G,[\'1p\']);8 e=7.K(d.B,\'a\',d.F);e.1A($.D.1j,\'1l\',d.1p);u e},23:9(a,x,y,b,c,d,e){8 f=7.J(G,[\'x\',\'y\',\'O\',\'U\',\'1p\']);8 g=7.K(f.B,\'23\',$.I({x:f.x,y:f.y,O:f.O,U:f.U},f.F||{}));g.1A($.D.1j,\'1l\',f.1p);u g},19:9(a,b,c){8 d=7.J(G,[\'19\']);u 7.K(d.B,\'19\',$.I({d:(d.19.19?d.19.19():d.19)},d.F||{}))},3J:9(a,x,y,b,c,d,e,f){8 g=7.J(G,[\'x\',\'y\',\'O\',\'U\',\'1q\',\'1K\'],[\'1q\']);u 7.K(g.B,\'3J\',$.I({x:g.x,y:g.y,O:g.O,U:g.U},(g.1q?{1q:g.1q,1K:g.1K}:{}),g.F||{}))},3K:9(a,b,c,r,d){8 e=7.J(G,[\'1c\',\'1k\',\'r\']);u 7.K(e.B,\'3K\',$.I({1c:e.1c,1k:e.1k,r:e.r},e.F||{}))},3L:9(a,b,c,d,e,f){8 g=7.J(G,[\'1c\',\'1k\',\'1q\',\'1K\']);u 7.K(g.B,\'3L\',$.I({1c:g.1c,1k:g.1k,1q:g.1q,1K:g.1K},g.F||{}))},2h:9(a,b,c,d,e,f){8 g=7.J(G,[\'1i\',\'1n\',\'1I\',\'1J\']);u 7.K(g.B,\'2h\',$.I({1i:g.1i,1n:g.1n,1I:g.1I,1J:g.1J},g.F||{}))},3M:9(a,b,c){8 d=7.J(G,[\'1T\']);u 7.2Q(d.B,\'3M\',d.1T,d.F)},3N:9(a,b,c){8 d=7.J(G,[\'1T\']);u 7.2Q(d.B,\'3N\',d.1T,d.F)},2Q:9(a,b,c,d){8 e=\'\';14(8 i=0;i<c.R;i++){e+=c[i].1U()+\' \'}u 7.K(a,b,$.I({1T:$.2i(e)},d||{}))},15:9(a,x,y,b,c){8 d=7.J(G,[\'x\',\'y\',\'1V\']);w(13 d.x==\'1f\'&&G.R<4){d.1V=d.x;d.F=d.y;d.x=d.y=P}u 7.2R(d.B,\'15\',d.1V,$.I({x:(d.x&&18(d.x)?d.x.1U(\' \'):d.x),y:(d.y&&18(d.y)?d.y.1U(\' \'):d.y)},d.F||{}))},2S:9(a,b,c,d){8 e=7.J(G,[\'19\',\'1V\']);8 f=7.2R(e.B,\'6u\',e.1V,e.F||{});f.1A($.D.1j,\'1l\',e.19);u f},2R:9(a,b,c,d){8 e=7.K(a,b,d);w(13 c==\'1f\'){e.11(e.17.1h(c))}Y{14(8 i=0;i<c.1b.R;i++){8 f=c.1b[i];w(f[0]==\'3O\'){8 g=7.K(e,f[0],f[2]);g.11(e.17.1h(f[1]));e.11(g)}Y w(f[0]==\'3P\'){8 g=7.K(e,f[0],f[2]);g.1A($.D.1j,\'1l\',f[1]);e.11(g)}Y w(f[0]==\'2S\'){8 h=$.I({},f[2]);h.1l=P;8 g=7.K(e,f[0],h);g.1A($.D.1j,\'1l\',f[2].1l);g.11(e.17.1h(f[1]));e.11(g)}Y{e.11(e.17.1h(f[1]))}}}u e},6v:9(a,b,c){8 d=7.J(G,[\'3Q\']);u 7.K(d.B,d.3Q,d.F||{})},K:9(a,b,c){a=a||7.N;8 d=7.N.17.2z($.D.1u,b);14(8 b 1Z c){8 e=c[b];w(e!=P&&e!=P&&(13 e!=\'1f\'||e!=\'\')){d.1x($.D.1M[b]||b,e)}}a.11(d);u d},3R:9(b,c){8 d=7.J((G.R==1?[P,b]:G),[\'1a\']);8 f=7;d.B=d.B||7.N;d.1a=(d.1a.1E?d.1a:$(d.1a));1s{w($.D.2o){3S\'3T 3U\';}d.B.11(d.1a.6w(2T))}1t(e){d.1a.2a(9(){8 a=f.2j(7);w(a){d.B.11(a)}})}u 7},6x:9(b,c){8 d=7;8 e=7.J((G.R==1?[P,b]:G),[\'1a\']);e.B=e.B||7.N;e.1a=(e.1a.1E?e.1a:$(e.1a));8 f=[];e.1a.2a(9(){8 a=d.2j(7);w(a){a.E=\'\';e.B.11(a);f.3u(a)}});u f},2j:9(a){8 b=P;w(a.1F==1){b=7.N.17.2z($.D.1u,7.2U(a.12));14(8 i=0;i<a.1g.R;i++){8 c=a.1g.29(i);w(c.12!=\'2H\'&&c.16){w(c.6y==\'2s\'){b.1A($.D.1j,c.6z||c.6A,c.16)}Y{b.1x(7.2U(c.12),c.16)}}}14(8 i=0;i<a.2V.R;i++){8 d=7.2j(a.2V[i]);w(d){b.11(d)}}}Y w(a.1F==3){w($.2i(a.16)){b=7.N.17.1h(a.16)}}Y w(a.1F==4){w($.2i(a.16)){1s{b=7.N.17.6B(a.16)}1t(e){b=7.N.17.1h(a.16.2W(/&/g,\'&6C;\').2W(/</g,\'&6D;\').2W(/>/g,\'&6E;\'))}}}u b},2U:9(a){a=(a.1G(0,1)>=\'A\'&&a.1G(0,1)<=\'Z\'?a.6F():a);u(a.1G(0,4)==\'D:\'?a.1G(4):a)},3t:9(j,k){k=(13 k==\'6G\'?{3V:k}:(13 k==\'9\'?{1m:k}:(13 k==\'1f\'?{B:k}:(13 k==\'1S\'&&k.12?{B:k}:(13 k==\'1S\'&&k.1E?{B:k}:k||{})))));w(!k.B&&!k.3V){7.3W(1L)}8 l=[7.N.3X(\'O\'),7.N.3X(\'U\')];8 m=7;8 n=9(a){a=$.D.2n.2Z+\': \'+a;w(k.1m){k.1m.1R(m.1z||m.N,[m,a])}Y{m.15(P,10,20,a)}};8 o=9(a){8 b=1e 2p(\'6H.6I\');b.6J=1L;b.6K=1L;b.6L=1L;b.6M(a);w(b.3Y.6N!=0){n(b.3Y.6O);u P}u b};8 p=9(a){w(!a){u}w(a.1P.12!=\'D\'){8 b=a.3Z(\'6P\');8 c=(b.R?b[0].3Z(\'6Q\'):[]);n(!b.R?\'???\':(c.R?c[0]:b[0]).1W.16);u}8 d=(k.B?$(k.B)[0]:m.N);8 f={};14(8 i=0;i<a.1P.1g.R;i++){8 g=a.1P.1g.29(i);w(!(g.12==\'2A\'||g.12.1G(0,5)==\'2H\')){f[g.12]=g.16}}m.1Q(d,f,!k.B);8 h=a.1P.2V;14(8 i=0;i<h.R;i++){1s{w($.D.2o){3S\'3T 3U\';}d.11(m.N.17.6R(h[i],2T));w(h[i].12==\'1H\'){$.3D(h[i].6S)}}1t(e){m.3R(d,h[i])}}w(!k.6T){m.1Q(d,{O:l[0],U:l[1]})}w(k.1m){k.1m.1R(m.1z||m.N,[m])}};w(j.2X(\'<D\')){p($.1r.28?o(j):1e 6U().6V(j,\'15/2E\'))}Y{$.6W({6X:j,6Y:($.1r.28?\'15\':\'2E\'),6Z:9(a){p($.1r.28?o(a):a)},70:9(a,b,c){n(b+(c?\' \'+c.71:\'\'))}})}u 7},72:9(a){a=(a.1E?a[0]:a);a.3s.40(a);u 7},3W:9(a){w(a){7.1Q({},2T)}41(7.N.1W){7.N.40(7.N.1W)}u 7},73:9(a){a=a||7.N;u(13 42==\'74\'?7.2Y(a):1e 42().75(a))},2Y:9(a){8 b=\'\';w(!a){u b}w(a.1F==3){b=a.16}Y w(a.1F==4){b=\'<![76[\'+a.16+\']]>\'}Y{b=\'<\'+a.12;w(a.1g){14(8 i=0;i<a.1g.R;i++){8 c=a.1g.29(i);w(!($.2i(c.16)==\'\'||c.16.2X(/^\\[1S/)||c.16.2X(/^9/))){b+=\' \'+(c.25==$.D.1j?\'2s:\':\'\')+c.12+\'="\'+c.16+\'"\'}}}w(a.1W){b+=\'>\';8 d=a.1W;41(d){b+=7.2Y(d);d=d.77}b+=\'</\'+a.12+\'>\'}Y{b+=\'/>\'}}u b}});9 X(){7.1d=\'\'}$.I(X.W,{43:9(){7.1d=\'\';u 7},44:9(x,y,a){a=(18(x)?y:a);u 7.1B((a?\'m\':\'M\'),x,y)},2h:9(x,y,a){a=(18(x)?y:a);u 7.1B((a?\'l\':\'L\'),x,y)},22:9(x,a){7.1d+=(a?\'h\':\'H\')+(18(x)?x.1U(\' \'):x);u 7},24:9(y,a){7.1d+=(a?\'v\':\'V\')+(18(y)?y.1U(\' \'):y);u 7},45:9(a,b,c,d,x,y,e){e=(18(a)?b:e);u 7.1B((e?\'c\':\'C\'),a,b,c,d,x,y)},46:9(a,b,x,y,c){c=(18(a)?b:c);u 7.1B((c?\'s\':\'S\'),a,b,x,y)},47:9(a,b,x,y,c){c=(18(a)?b:c);u 7.1B((c?\'q\':\'Q\'),a,b,x,y)},48:9(x,y,a){a=(18(x)?y:a);u 7.1B((a?\'t\':\'T\'),x,y)},1B:9(a,b,c,d,e,f,g){w(18(b)){14(8 i=0;i<b.R;i++){8 h=b[i];7.1d+=(i==0?a:\' \')+h[0]+\',\'+h[1]+(h.R<4?\'\':\' \'+h[2]+\',\'+h[3]+(h.R<6?\'\':\' \'+h[4]+\',\'+h[5]))}}Y{7.1d+=a+b+\',\'+c+(d==P?\'\':\' \'+d+\',\'+e+(f==P?\'\':\' \'+f+\',\'+g))}u 7},49:9(a,b,c,d,e,x,y,f){f=(18(a)?b:f);7.1d+=(f?\'a\':\'A\');w(18(a)){14(8 i=0;i<a.R;i++){8 g=a[i];7.1d+=(i==0?\'\':\' \')+g[0]+\',\'+g[1]+\' \'+g[2]+\' \'+(g[3]?\'1\':\'0\')+\',\'+(g[4]?\'1\':\'0\')+\' \'+g[5]+\',\'+g[6]}}Y{7.1d+=a+\',\'+b+\' \'+c+\' \'+(d?\'1\':\'0\')+\',\'+(e?\'1\':\'0\')+\' \'+x+\',\'+y}u 7},78:9(){7.1d+=\'z\';u 7},19:9(){u 7.1d}});X.W.79=X.W.44;X.W.7a=X.W.2h;X.W.7b=X.W.22;X.W.7c=X.W.24;X.W.7d=X.W.45;X.W.7e=X.W.46;X.W.7f=X.W.47;X.W.7g=X.W.48;X.W.7h=X.W.49;9 2P(){7.1b=[]}$.I(2P.W,{43:9(){7.1b=[];u 7},1f:9(a){7.1b[7.1b.R]=[\'15\',a];u 7},7i:9(a,b){7.1b[7.1b.R]=[\'3O\',a,b];u 7},1p:9(a,b){7.1b[7.1b.R]=[\'3P\',a,b];u 7},19:9(a,b,c){7.1b[7.1b.R]=[\'2S\',b,$.I({1l:a},c||{})];u 7}});$.7j.D=9(a){8 b=4a.W.7k.7l(G,1);w(13 a==\'1f\'&&a==\'7m\'){u $.D[\'4b\'+a+\'2m\'].1R($.D,[7[0]].4c(b))}u 7.2a(9(){w(13 a==\'1f\'){$.D[\'4b\'+a+\'2m\'].1R($.D,[7].4c(b))}Y{$.D.3o(7,a||{})}})};9 18(a){u(a&&a.7n==4a)}$.D=1e 2k()})(7o);',62,459,'|||||||this|var|function|||||||||||||||||||||return||if|||||parent||svg|id|settings|arguments||extend|_args|_makeNode|||_svg|width|null||length|||height||prototype|SVGPath|else|||appendChild|nodeName|typeof|for|text|nodeValue|ownerDocument|isArray|path|node|_parts|cx|_path|new|string|attributes|createTextNode|x1|xlinkNS|cy|href|onLoad|y1|vx|ref|rx|browser|try|catch|svgNS|font|stroke|setAttribute|type|_container|setAttributeNS|_coords|markerClassName|color|jquery|nodeType|substring|script|x2|y2|ry|false|_attrNames|style|marker|documentElement|configure|apply|object|points|join|value|firstChild|_settings|_extensions|in||opacity|horiz|image|vert|namespaceURI|loadURL|document|msie|item|each|orient|stops|vy|vwidth|vheight|units|line|trim|_cloneAsSVG|SVGManager|regional|SVG|local|_renesis|ActiveXObject|http|www|xlink|SVGWrapper|baseline|clipPath|rendering|stop|hasClass|createElementNS|version|clientWidth|clientHeight|_afterLoad|xml|embeds|data|xmlns|viewBox|refX|refY|styles|_gradient|fx|fy|SVGText|_poly|_text|textpath|true|_checkName|childNodes|replace|match|_toSVG|errorLoadingText|notSupportedText|_uuid|detectActiveX|w3|org|_wrapperClass|class|clip|rule|interpolation|fill|flood|size|glyph|orientation|adv|origin|spacing|stopColor|stopOpacity|strikethrough|position|thickness|underline|_attachSVG|innerHTML|100|_registerSVG|parentNode|load|push|getElementById|splice|title|defs|symbol|mWidth|mHeight|css|globalEval|linearGradient|radialGradient|pattern|mask|use|rect|circle|ellipse|polyline|polygon|tspan|tref|name|add|throw|Force|traversal|addTo|clear|getAttribute|parseError|getElementsByTagName|removeChild|while|XMLSerializer|reset|move|curveC|smoothC|curveQ|smoothQ|arc|Array|_|concat|Error|loading|This|does|not|support|Date|getTime|RenesisX|RenesisCtrl|window|svgwrapper|hasSVG|2000|1999|class_|in_|alignmentBaseline|alignment|baselineShift|shift|clipRule|colorInterpolation|colorInterpolationFilters|filters|colorRendering|dominantBaseline|dominant|enableBackground|enable|background|fillOpacity|fillRule|floodColor|floodOpacity|fontFamily|family|fontSize|fontSizeAdjust|adjust|fontStretch|stretch|fontStyle|fontVariant|variant|fontWeight|weight|glyphOrientationHorizontal|horizontal|glyphOrientationVertical|vertical|horizAdvX|horizOriginX|imageRendering|letterSpacing|letter|lightingColor|lighting|markerEnd|end|markerMid|mid|markerStart|start|strikethroughPosition|strikethroughThickness|strokeDashArray|dasharray|strokeDashOffset|dashoffset|strokeLineCap|linecap|strokeLineJoin|linejoin|strokeMiterLimit|miterlimit|strokeOpacity|strokeWidth|textAnchor|anchor|textDecoration|decoration|textRendering|underlinePosition|underlineThickness|vertAdvY|vertOriginY|wordSpacing|word|writingMode|writing|mode|addClass|embed|src|initPath|blank|pluginspage|adobe|com|viewer|install|main|html|svg_error|continue|getSVGDocument|setTimeout|250|alert|_getSVG|_destroySVG|removeClass|empty|removeData|addExtension|isSVGElem|_width|_height|root|onload|removeNamedItem|change|removeAttribute|describe|desc|markerWidth|markerHeight|auto|opera|head|append|javascript|mozilla|offset|userSpaceOnUse|clipPathUnits|createPath|createText|group|link|textPath|other|cloneNode|clone|prefix|localName|baseName|createCDATASection|amp|lt|gt|toLowerCase|boolean|Microsoft|XMLDOM|validateOnParse|resolveExternals|async|loadXML|errorCode|reason|parsererror|div|importNode|textContent|changeSize|DOMParser|parseFromString|ajax|url|dataType|success|error|message|remove|toSVG|undefined|serializeToString|CDATA|nextSibling|close|moveTo|lineTo|horizTo|vertTo|curveCTo|smoothCTo|curveQTo|smoothQTo|arcTo|span|fn|slice|call|get|constructor|jQuery'.split('|'),0,{}))
var DecodeStream=(function(){
	function constructor(){
		this.pos=0;
		this.bufferLength=0;
		this.eof=false;
		this.buffer=null;
	}
	constructor.prototype={
		ensureBuffer:function decodestream_ensureBuffer(requested){
			var buffer=this.buffer;
			var current=buffer?buffer.byteLength:0;
			if(requested<current)
				return buffer;
			var size=512;
			while(size<requested)
				size<<=1;
			var buffer2=new Uint8Array(size);
			for(var i=0;i<current;++i)
				buffer2[i]=buffer[i];
			return this.buffer=buffer2;
		},
		getByte:function decodestream_getByte(){
			var pos=this.pos;
			while(this.bufferLength<=pos){
				if(this.eof)
					return null;
				this.readBlock();
			}
			return this.buffer[this.pos++];
		},
		getBytes:function decodestream_getBytes(length){
			var pos=this.pos;
			if(length){
				this.ensureBuffer(pos+length);
				var end=pos+length;
				while(!this.eof&&this.bufferLength<end)
					this.readBlock();
				var bufEnd=this.bufferLength;
				if(end>bufEnd)
					end=bufEnd;
			}else{
				while(!this.eof)
					this.readBlock();
				var end=this.bufferLength;
			}
			this.pos=end;
			return this.buffer.subarray(pos,end);
		},
		lookChar:function decodestream_lookChar(){
			var pos=this.pos;
			while(this.bufferLength<=pos){
				if(this.eof)
					return null;
				this.readBlock();
			}
			return String.fromCharCode(this.buffer[this.pos]);
		},
		getChar:function decodestream_getChar(){
			var pos=this.pos;
			while(this.bufferLength<=pos){
				if(this.eof)
					return null;
				this.readBlock();
			}
			return String.fromCharCode(this.buffer[this.pos++]);
		},
		makeSubStream:function decodestream_makeSubstream(start,length,dict){
			var end=start+length;
			while(this.bufferLength<=end&&!this.eof)
				this.readBlock();
			return new Stream(this.buffer,start,length,dict);
		},
		skip:function decodestream_skip(n){
			if(!n)
				n=1;
			this.pos+=n;
		},
		reset:function decodestream_reset(){
			this.pos=0;
		}
	};
	return constructor;
})();
var FlateStream=(function(){
	var codeLenCodeMap=new Uint32Array([
		16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15
	]);
	var lengthDecode=new Uint32Array([
		0x00003,0x00004,0x00005,0x00006,0x00007,0x00008,0x00009,0x0000a,
		0x1000b,0x1000d,0x1000f,0x10011,0x20013,0x20017,0x2001b,0x2001f,
		0x30023,0x3002b,0x30033,0x3003b,0x40043,0x40053,0x40063,0x40073,
		0x50083,0x500a3,0x500c3,0x500e3,0x00102,0x00102,0x00102
	]);
	var distDecode=new Uint32Array([
		0x00001,0x00002,0x00003,0x00004,0x10005,0x10007,0x20009,0x2000d,
		0x30011,0x30019,0x40021,0x40031,0x50041,0x50061,0x60081,0x600c1,
		0x70101,0x70181,0x80201,0x80301,0x90401,0x90601,0xa0801,0xa0c01,
		0xb1001,0xb1801,0xc2001,0xc3001,0xd4001,0xd6001
	]);
	var fixedLitCodeTab=[new Uint32Array([
		0x70100,0x80050,0x80010,0x80118,0x70110,0x80070,0x80030,0x900c0,
		0x70108,0x80060,0x80020,0x900a0,0x80000,0x80080,0x80040,0x900e0,
		0x70104,0x80058,0x80018,0x90090,0x70114,0x80078,0x80038,0x900d0,
		0x7010c,0x80068,0x80028,0x900b0,0x80008,0x80088,0x80048,0x900f0,
		0x70102,0x80054,0x80014,0x8011c,0x70112,0x80074,0x80034,0x900c8,
		0x7010a,0x80064,0x80024,0x900a8,0x80004,0x80084,0x80044,0x900e8,
		0x70106,0x8005c,0x8001c,0x90098,0x70116,0x8007c,0x8003c,0x900d8,
		0x7010e,0x8006c,0x8002c,0x900b8,0x8000c,0x8008c,0x8004c,0x900f8,
		0x70101,0x80052,0x80012,0x8011a,0x70111,0x80072,0x80032,0x900c4,
		0x70109,0x80062,0x80022,0x900a4,0x80002,0x80082,0x80042,0x900e4,
		0x70105,0x8005a,0x8001a,0x90094,0x70115,0x8007a,0x8003a,0x900d4,
		0x7010d,0x8006a,0x8002a,0x900b4,0x8000a,0x8008a,0x8004a,0x900f4,
		0x70103,0x80056,0x80016,0x8011e,0x70113,0x80076,0x80036,0x900cc,
		0x7010b,0x80066,0x80026,0x900ac,0x80006,0x80086,0x80046,0x900ec,
		0x70107,0x8005e,0x8001e,0x9009c,0x70117,0x8007e,0x8003e,0x900dc,
		0x7010f,0x8006e,0x8002e,0x900bc,0x8000e,0x8008e,0x8004e,0x900fc,
		0x70100,0x80051,0x80011,0x80119,0x70110,0x80071,0x80031,0x900c2,
		0x70108,0x80061,0x80021,0x900a2,0x80001,0x80081,0x80041,0x900e2,
		0x70104,0x80059,0x80019,0x90092,0x70114,0x80079,0x80039,0x900d2,
		0x7010c,0x80069,0x80029,0x900b2,0x80009,0x80089,0x80049,0x900f2,
		0x70102,0x80055,0x80015,0x8011d,0x70112,0x80075,0x80035,0x900ca,
		0x7010a,0x80065,0x80025,0x900aa,0x80005,0x80085,0x80045,0x900ea,
		0x70106,0x8005d,0x8001d,0x9009a,0x70116,0x8007d,0x8003d,0x900da,
		0x7010e,0x8006d,0x8002d,0x900ba,0x8000d,0x8008d,0x8004d,0x900fa,
		0x70101,0x80053,0x80013,0x8011b,0x70111,0x80073,0x80033,0x900c6,
		0x70109,0x80063,0x80023,0x900a6,0x80003,0x80083,0x80043,0x900e6,
		0x70105,0x8005b,0x8001b,0x90096,0x70115,0x8007b,0x8003b,0x900d6,
		0x7010d,0x8006b,0x8002b,0x900b6,0x8000b,0x8008b,0x8004b,0x900f6,
		0x70103,0x80057,0x80017,0x8011f,0x70113,0x80077,0x80037,0x900ce,
		0x7010b,0x80067,0x80027,0x900ae,0x80007,0x80087,0x80047,0x900ee,
		0x70107,0x8005f,0x8001f,0x9009e,0x70117,0x8007f,0x8003f,0x900de,
		0x7010f,0x8006f,0x8002f,0x900be,0x8000f,0x8008f,0x8004f,0x900fe,
		0x70100,0x80050,0x80010,0x80118,0x70110,0x80070,0x80030,0x900c1,
		0x70108,0x80060,0x80020,0x900a1,0x80000,0x80080,0x80040,0x900e1,
		0x70104,0x80058,0x80018,0x90091,0x70114,0x80078,0x80038,0x900d1,
		0x7010c,0x80068,0x80028,0x900b1,0x80008,0x80088,0x80048,0x900f1,
		0x70102,0x80054,0x80014,0x8011c,0x70112,0x80074,0x80034,0x900c9,
		0x7010a,0x80064,0x80024,0x900a9,0x80004,0x80084,0x80044,0x900e9,
		0x70106,0x8005c,0x8001c,0x90099,0x70116,0x8007c,0x8003c,0x900d9,
		0x7010e,0x8006c,0x8002c,0x900b9,0x8000c,0x8008c,0x8004c,0x900f9,
		0x70101,0x80052,0x80012,0x8011a,0x70111,0x80072,0x80032,0x900c5,
		0x70109,0x80062,0x80022,0x900a5,0x80002,0x80082,0x80042,0x900e5,
		0x70105,0x8005a,0x8001a,0x90095,0x70115,0x8007a,0x8003a,0x900d5,
		0x7010d,0x8006a,0x8002a,0x900b5,0x8000a,0x8008a,0x8004a,0x900f5,
		0x70103,0x80056,0x80016,0x8011e,0x70113,0x80076,0x80036,0x900cd,
		0x7010b,0x80066,0x80026,0x900ad,0x80006,0x80086,0x80046,0x900ed,
		0x70107,0x8005e,0x8001e,0x9009d,0x70117,0x8007e,0x8003e,0x900dd,
		0x7010f,0x8006e,0x8002e,0x900bd,0x8000e,0x8008e,0x8004e,0x900fd,
		0x70100,0x80051,0x80011,0x80119,0x70110,0x80071,0x80031,0x900c3,
		0x70108,0x80061,0x80021,0x900a3,0x80001,0x80081,0x80041,0x900e3,
		0x70104,0x80059,0x80019,0x90093,0x70114,0x80079,0x80039,0x900d3,
		0x7010c,0x80069,0x80029,0x900b3,0x80009,0x80089,0x80049,0x900f3,
		0x70102,0x80055,0x80015,0x8011d,0x70112,0x80075,0x80035,0x900cb,
		0x7010a,0x80065,0x80025,0x900ab,0x80005,0x80085,0x80045,0x900eb,
		0x70106,0x8005d,0x8001d,0x9009b,0x70116,0x8007d,0x8003d,0x900db,
		0x7010e,0x8006d,0x8002d,0x900bb,0x8000d,0x8008d,0x8004d,0x900fb,
		0x70101,0x80053,0x80013,0x8011b,0x70111,0x80073,0x80033,0x900c7,
		0x70109,0x80063,0x80023,0x900a7,0x80003,0x80083,0x80043,0x900e7,
		0x70105,0x8005b,0x8001b,0x90097,0x70115,0x8007b,0x8003b,0x900d7,
		0x7010d,0x8006b,0x8002b,0x900b7,0x8000b,0x8008b,0x8004b,0x900f7,
		0x70103,0x80057,0x80017,0x8011f,0x70113,0x80077,0x80037,0x900cf,
		0x7010b,0x80067,0x80027,0x900af,0x80007,0x80087,0x80047,0x900ef,
		0x70107,0x8005f,0x8001f,0x9009f,0x70117,0x8007f,0x8003f,0x900df,
		0x7010f,0x8006f,0x8002f,0x900bf,0x8000f,0x8008f,0x8004f,0x900ff
	]),9];
	var fixedDistCodeTab=[new Uint32Array([
		0x50000,0x50010,0x50008,0x50018,0x50004,0x50014,0x5000c,0x5001c,
		0x50002,0x50012,0x5000a,0x5001a,0x50006,0x50016,0x5000e,0x00000,
		0x50001,0x50011,0x50009,0x50019,0x50005,0x50015,0x5000d,0x5001d,
		0x50003,0x50013,0x5000b,0x5001b,0x50007,0x50017,0x5000f,0x00000
	]),5];
	function error(e){
			throw new Error(e)
	}
	function constructor(bytes){
		var bytesPos=0;
		var cmf=bytes[bytesPos++];
		var flg=bytes[bytesPos++];
		if(cmf==-1||flg==-1)
			error('Invalid header in flate stream');
		if((cmf&0x0f)!=0x08)
			error('Unknown compression method in flate stream');
		if((((cmf<<8)+flg)%31)!=0)
			error('Bad FCHECK in flate stream');
		if(flg&0x20)
			error('FDICT bit set in flate stream');
		this.bytes=bytes;
		this.bytesPos=bytesPos;
		this.codeSize=0;
		this.codeBuf=0;
		DecodeStream.call(this);
	}
	constructor.prototype=Object.create(DecodeStream.prototype);
	constructor.prototype.getBits=function(bits){
		var codeSize=this.codeSize;
		var codeBuf=this.codeBuf;
		var bytes=this.bytes;
		var bytesPos=this.bytesPos;
		var b;
		while(codeSize<bits){
			if(typeof(b=bytes[bytesPos++])=='undefined')
				error('Bad encoding in flate stream');
			codeBuf|=b<<codeSize;
			codeSize+=8;
		}
		b=codeBuf&((1<<bits)-1);
		this.codeBuf=codeBuf>>bits;
		this.codeSize=codeSize-=bits;
		this.bytesPos=bytesPos;
		return b;
	};
	constructor.prototype.getCode=function(table){
		var codes=table[0];
		var maxLen=table[1];
		var codeSize=this.codeSize;
		var codeBuf=this.codeBuf;
		var bytes=this.bytes;
		var bytesPos=this.bytesPos;
		while(codeSize<maxLen){
			var b;
			if(typeof(b=bytes[bytesPos++])=='undefined')
				error('Bad encoding in flate stream');
			codeBuf|=(b<<codeSize);
			codeSize+=8;
		}
		var code=codes[codeBuf&((1<<maxLen)-1)];
		var codeLen=code>>16;
		var codeVal=code&0xffff;
		if(codeSize==0||codeSize<codeLen||codeLen==0)
			error('Bad encoding in flate stream');
		this.codeBuf=(codeBuf>>codeLen);
		this.codeSize=(codeSize-codeLen);
		this.bytesPos=bytesPos;
		return codeVal;
	};
	constructor.prototype.generateHuffmanTable=function(lengths){
		var n=lengths.length;
		var maxLen=0;
		for(var i=0;i<n;++i){
			if(lengths[i]>maxLen)
				maxLen=lengths[i];
		}
		var size=1<<maxLen;
		var codes=new Uint32Array(size);
		for(var len=1,code=0,skip=2;
				 len<=maxLen;
				 ++len,code<<=1,skip<<=1){
			for(var val=0;val<n;++val){
				if(lengths[val]==len){
					var code2=0;
					var t=code;
					for(var i=0;i<len;++i){
						code2=(code2<<1)|(t&1);
						t>>=1;
					}
					for(var i=code2;i<size;i+=skip)
						codes[i]=(len<<16)|val;
					++code;
				}
			}
		}
		return[codes,maxLen];
	};
	constructor.prototype.readBlock=function(){
		function repeat(stream,array,len,offset,what){
			var repeat=stream.getBits(len)+offset;
			while(repeat-->0)
				array[i++]=what;
		}
		var hdr=this.getBits(3);
		if(hdr&1)
			this.eof=true;
		hdr>>=1;
		if(hdr==0){
			var bytes=this.bytes;
			var bytesPos=this.bytesPos;
			var b;
			if(typeof(b=bytes[bytesPos++])=='undefined')
				error('Bad block header in flate stream');
			var blockLen=b;
			if(typeof(b=bytes[bytesPos++])=='undefined')
				error('Bad block header in flate stream');
			blockLen|=(b<<8);
			if(typeof(b=bytes[bytesPos++])=='undefined')
				error('Bad block header in flate stream');
			var check=b;
			if(typeof(b=bytes[bytesPos++])=='undefined')
				error('Bad block header in flate stream');
			check|=(b<<8);
			if(check!=(~blockLen&0xffff))
				error('Bad uncompressed block length in flate stream');
			this.codeBuf=0;
			this.codeSize=0;
			var bufferLength=this.bufferLength;
			var buffer=this.ensureBuffer(bufferLength+blockLen);
			var end=bufferLength+blockLen;
			this.bufferLength=end;
			for(var n=bufferLength;n<end;++n){
				if(typeof(b=bytes[bytesPos++])=='undefined'){
					this.eof=true;
					break;
				}
				buffer[n]=b;
			}
			this.bytesPos=bytesPos;
			return;
		}
		var litCodeTable;
		var distCodeTable;
		if(hdr==1){
			litCodeTable=fixedLitCodeTab;
			distCodeTable=fixedDistCodeTab;
		}else if(hdr==2){
			var numLitCodes=this.getBits(5)+257;
			var numDistCodes=this.getBits(5)+1;
			var numCodeLenCodes=this.getBits(4)+4;
			var codeLenCodeLengths=Array(codeLenCodeMap.length);
			var i=0;
			while(i<numCodeLenCodes)
				codeLenCodeLengths[codeLenCodeMap[i++]]=this.getBits(3);
			var codeLenCodeTab=this.generateHuffmanTable(codeLenCodeLengths);
			var len=0;
			var i=0;
			var codes=numLitCodes+numDistCodes;
			var codeLengths=new Array(codes);
			while(i<codes){
				var code=this.getCode(codeLenCodeTab);
				if(code==16){
					repeat(this,codeLengths,2,3,len);
				}else if(code==17){
					repeat(this,codeLengths,3,3,len=0);
				}else if(code==18){
					repeat(this,codeLengths,7,11,len=0);
				}else{
					codeLengths[i++]=len=code;
				}
			}
			litCodeTable=
				this.generateHuffmanTable(codeLengths.slice(0,numLitCodes));
			distCodeTable=
				this.generateHuffmanTable(codeLengths.slice(numLitCodes,codes));
		}else{
			error('Unknown block type in flate stream');
		}
		var buffer=this.buffer;
		var limit=buffer?buffer.length:0;
		var pos=this.bufferLength;
		while(true){
			var code1=this.getCode(litCodeTable);
			if(code1<256){
				if(pos+1>=limit){
					buffer=this.ensureBuffer(pos+1);
					limit=buffer.length;
				}
				buffer[pos++]=code1;
				continue;
			}
			if(code1==256){
				this.bufferLength=pos;
				return;
			}
			code1-=257;
			code1=lengthDecode[code1];
			var code2=code1>>16;
			if(code2>0)
				code2=this.getBits(code2);
			var len=(code1&0xffff)+code2;
			code1=this.getCode(distCodeTable);
			code1=distDecode[code1];
			code2=code1>>16;
			if(code2>0)
				code2=this.getBits(code2);
			var dist=(code1&0xffff)+code2;
			if(pos+len>=limit){
				buffer=this.ensureBuffer(pos+len);
				limit=buffer.length;
			}
			for(var k=0;k<len;++k,++pos)
				buffer[pos]=buffer[pos-dist];
		}
	};
	return constructor;
})();
(function(){
	var PNG;
	PNG=(function(){
		var APNG_BLEND_OP_OVER,APNG_BLEND_OP_SOURCE,APNG_DISPOSE_OP_BACKGROUND,APNG_DISPOSE_OP_NONE,APNG_DISPOSE_OP_PREVIOUS,makeImage,scratchCanvas,scratchCtx;
		PNG.load=function(url,canvas,callback){
			var xhr,
				_this=this;
			if(typeof canvas==='function'){
				callback=canvas;
			}
			xhr=new XMLHttpRequest;
			xhr.open("GET",url,true);
			xhr.responseType="arraybuffer";
			xhr.onload=function(){
				var data,png;
				data=new Uint8Array(xhr.response||xhr.mozResponseArrayBuffer);
				png=new PNG(data);
				if(typeof(canvas!=null?canvas.getContext:void 0)==='function'){
					png.render(canvas);
				}
				return typeof callback==="function"?callback(png):void 0;
			};
			return xhr.send(null);
		};
		APNG_DISPOSE_OP_NONE=0;
		APNG_DISPOSE_OP_BACKGROUND=1;
		APNG_DISPOSE_OP_PREVIOUS=2;
		APNG_BLEND_OP_SOURCE=0;
		APNG_BLEND_OP_OVER=1;
		function PNG(data,slow,slow_callback){
			if(slow)this.initSlow(data,slow_callback);
			else this.init(data);
		}
		PNG.prototype.init=function(data){
			var chunkSize,colors,delayDen,delayNum,frame,i,index,key,section,short,text,_i,_j,_ref;
			this.data=data;
			this.pos=8;
			this.palette=[];
			this.imgData=[];
			this.transparency={};
			this.animation=null;
			this.text={};
			frame=null;
			while(true){
				chunkSize=this.readUInt32();
				section=((function(){
					var _i,_results;
					_results=[];
					for(i=_i=0;_i<4;i=++_i){
						_results.push(String.fromCharCode(this.data[this.pos++]));
					}
					return _results;
				}).call(this)).join('');
				switch(section){
					case'IHDR':
						this.width=this.readUInt32();
						this.height=this.readUInt32();
						this.bits=this.data[this.pos++];
						this.colorType=this.data[this.pos++];
						this.compressionMethod=this.data[this.pos++];
						this.filterMethod=this.data[this.pos++];
						this.interlaceMethod=this.data[this.pos++];
						break;
					case'acTL':
						this.animation={
							numFrames:this.readUInt32(),
							numPlays:this.readUInt32()||Infinity,
							frames:[]
						};
						break;
					case'PLTE':
						this.palette=this.read(chunkSize);
						break;
					case'fcTL':
						if(frame){
							this.animation.frames.push(frame);
						}
						this.pos+=4;
						frame={
							width:this.readUInt32(),
							height:this.readUInt32(),
							xOffset:this.readUInt32(),
							yOffset:this.readUInt32()
						};
						delayNum=this.readUInt16();
						delayDen=this.readUInt16()||100;
						frame.delay=1000*delayNum/delayDen;
						frame.disposeOp=this.data[this.pos++];
						frame.blendOp=this.data[this.pos++];
						frame.data=[];
						break;
					case'IDAT':
					case'fdAT':
						if(section==='fdAT'){
							this.pos+=4;
							chunkSize-=4;
						}
						data=(frame!=null?frame.data:void 0)||this.imgData;
						for(i=_i=0;0<=chunkSize?_i<chunkSize:_i>chunkSize;i=0<=chunkSize?++_i:--_i){
							data.push(this.data[this.pos++]);
						}
						break;
					case'tRNS':
						this.transparency={};
						switch(this.colorType){
							case 3:
								this.transparency.indexed=this.read(chunkSize);
								short=255-this.transparency.indexed.length;
								if(short>0){
									for(i=_j=0;0<=short?_j<short:_j>short;i=0<=short?++_j:--_j){
										this.transparency.indexed.push(255);
									}
								}
								break;
							case 0:
								this.transparency.grayscale=this.read(chunkSize)[0];
								break;
							case 2:
								this.transparency.rgb=this.read(chunkSize);
						}
						break;
					case'tEXt':
						text=this.read(chunkSize);
						index=text.indexOf(0);
						key=String.fromCharCode.apply(String,text.slice(0,index));
						this.text[key]=String.fromCharCode.apply(String,text.slice(index+1));
						break;
					case'IEND':
						if(frame){
							this.animation.frames.push(frame);
						}
						this.colors=(function(){
							switch(this.colorType){
								case 0:
								case 3:
								case 4:
									return 1;
								case 2:
								case 6:
									return 3;
							}
						}).call(this);
						this.hasAlphaChannel=(_ref=this.colorType)===4||_ref===6;
						colors=this.colors+(this.hasAlphaChannel?1:0);
						this.pixelBitlength=this.bits*colors;
						this.colorSpace=(function(){
							switch(this.colors){
								case 1:
									return'DeviceGray';
								case 3:
									return'DeviceRGB';
							}
						}).call(this);
						this.imgData=new Uint8Array(this.imgData);
						return;
					default:
						this.pos+=chunkSize;
				}
				this.pos+=4;
				if(this.pos>this.data.length){
					throw new Error("Incomplete or corrupt PNG file");
				}
			}
			return;
		}
		PNG.prototype.initSlow=function(data,slow_callback){
			try{
				var loop=new Loop();
				loop.steps=1024*64;
			}
			catch(e){
				return this.init(data);
			}
			var chunkSize,colors,delayDen,delayNum,frame,i,index,key,section,short,text,_i,_j,_ref;
			this.data=data;
			this.pos=8;
			this.palette=[];
			this.imgData=[];
			this.transparency={};
			this.animation=null;
			this.text={};
			frame=null;
			var self=this;
			loop.forever(
				{},
				function(unused,data,loop){
					chunkSize=self.readUInt32();
					section=((function(){
						var _i,_results;
						_results=[];
						for(i=_i=0;_i<4;i=++_i){
							_results.push(String.fromCharCode(self.data[self.pos++]));
						}
						return _results;
					}).call(self)).join('');
					switch(section){
						case'IHDR':
							self.width=self.readUInt32();
							self.height=self.readUInt32();
							self.bits=self.data[self.pos++];
							self.colorType=self.data[self.pos++];
							self.compressionMethod=self.data[self.pos++];
							self.filterMethod=self.data[self.pos++];
							self.interlaceMethod=self.data[self.pos++];
							break;
						case'acTL':
							self.animation={
								numFrames:self.readUInt32(),
								numPlays:self.readUInt32()||Infinity,
								frames:[]
							};
							break;
						case'PLTE':
							self.palette=self.read(chunkSize);
							break;
						case'fcTL':
							if(frame){
								self.animation.frames.push(frame);
							}
							self.pos+=4;
							frame={
								width:self.readUInt32(),
								height:self.readUInt32(),
								xOffset:self.readUInt32(),
								yOffset:self.readUInt32()
							};
							delayNum=self.readUInt16();
							delayDen=self.readUInt16()||100;
							frame.delay=1000*delayNum/delayDen;
							frame.disposeOp=self.data[self.pos++];
							frame.blendOp=self.data[self.pos++];
							frame.data=[];
							break;
						case'IDAT':
						case'fdAT':
							if(section==='fdAT'){
								self.pos+=4;
								chunkSize-=4;
							}
							data=(frame!=null?frame.data:void 0)||self.imgData;
							for(i=_i=0;0<=chunkSize?_i<chunkSize:_i>chunkSize;i=0<=chunkSize?++_i:--_i){
								data.push(self.data[self.pos++]);
							}
							break;
						case'tRNS':
							self.transparency={};
							switch(self.colorType){
								case 3:
									self.transparency.indexed=self.read(chunkSize);
									short=255-self.transparency.indexed.length;
									if(short>0){
										for(i=_j=0;0<=short?_j<short:_j>short;i=0<=short?++_j:--_j){
											self.transparency.indexed.push(255);
										}
									}
									break;
								case 0:
									self.transparency.grayscale=self.read(chunkSize)[0];
									break;
								case 2:
									self.transparency.rgb=self.read(chunkSize);
							}
							break;
						case'tEXt':
							text=self.read(chunkSize);
							index=text.indexOf(0);
							key=String.fromCharCode.apply(String,text.slice(0,index));
							self.text[key]=String.fromCharCode.apply(String,text.slice(index+1));
							break;
						case'IEND':
							if(frame){
								self.animation.frames.push(frame);
							}
							self.colors=(function(){
								switch(self.colorType){
									case 0:
									case 3:
									case 4:
										return 1;
									case 2:
									case 6:
										return 3;
								}
							}).call(self);
							self.hasAlphaChannel=(_ref=self.colorType)===4||_ref===6;
							colors=self.colors+(self.hasAlphaChannel?1:0);
							self.pixelBitlength=self.bits*colors;
							self.colorSpace=(function(){
								switch(self.colors){
									case 1:
										return'DeviceGray';
									case 3:
										return'DeviceRGB';
								}
							}).call(self);
							self.imgData=new Uint8Array(self.imgData);
							return loop.Break();
						default:
							self.pos+=chunkSize;
					}
					self.pos+=4;
					if(self.pos>self.data.length){
						throw new Error("Incomplete or corrupt PNG file");
					}
				},
				function(unused,data,loop){
					try{
						slow_callback(self);
					}
					catch(e){}
				}
			);
		}
		PNG.prototype.read=function(bytes){
			var i,_i,_results;
			_results=[];
			for(i=_i=0;0<=bytes?_i<bytes:_i>bytes;i=0<=bytes?++_i:--_i){
				_results.push(this.data[this.pos++]);
			}
			return _results;
		};
		PNG.prototype.readUInt32=function(){
			var b1,b2,b3,b4;
			b1=this.data[this.pos++]<<24;
			b2=this.data[this.pos++]<<16;
			b3=this.data[this.pos++]<<8;
			b4=this.data[this.pos++];
			return b1|b2|b3|b4;
		};
		PNG.prototype.readUInt16=function(){
			var b1,b2;
			b1=this.data[this.pos++]<<8;
			b2=this.data[this.pos++];
			return b1|b2;
		};
		PNG.prototype.decodePixels=function(data){
			var byte,c,col,i,left,length,p,pa,paeth,pb,pc,pixelBytes,pixels,pos,row,scanlineLength,upper,upperLeft,_i,_j,_k,_l,_m;
			if(data==null){
				data=this.imgData;
			}
			if(data.length===0){
				return new Uint8Array(0);
			}
			data=new FlateStream(data);
			data=data.getBytes();
			pixelBytes=this.pixelBitlength/8;
			scanlineLength=pixelBytes*this.width;
			pixels=new Uint8Array(scanlineLength*this.height);
			length=data.length;
			row=0;
			pos=0;
			c=0;
			while(pos<length){
				switch(data[pos++]){
					case 0:
						for(i=_i=0;_i<scanlineLength;i=_i+=1){
							pixels[c++]=data[pos++];
						}
						break;
					case 1:
						for(i=_j=0;_j<scanlineLength;i=_j+=1){
							byte=data[pos++];
							left=i<pixelBytes?0:pixels[c-pixelBytes];
							pixels[c++]=(byte+left)%256;
						}
						break;
					case 2:
						for(i=_k=0;_k<scanlineLength;i=_k+=1){
							byte=data[pos++];
							col=(i-(i%pixelBytes))/pixelBytes;
							upper=row&&pixels[(row-1)*scanlineLength+col*pixelBytes+(i%pixelBytes)];
							pixels[c++]=(upper+byte)%256;
						}
						break;
					case 3:
						for(i=_l=0;_l<scanlineLength;i=_l+=1){
							byte=data[pos++];
							col=(i-(i%pixelBytes))/pixelBytes;
							left=i<pixelBytes?0:pixels[c-pixelBytes];
							upper=row&&pixels[(row-1)*scanlineLength+col*pixelBytes+(i%pixelBytes)];
							pixels[c++]=(byte+Math.floor((left+upper)/2))%256;
						}
						break;
					case 4:
						for(i=_m=0;_m<scanlineLength;i=_m+=1){
							byte=data[pos++];
							col=(i-(i%pixelBytes))/pixelBytes;
							left=i<pixelBytes?0:pixels[c-pixelBytes];
							if(row===0){
								upper=upperLeft=0;
							}else{
								upper=pixels[(row-1)*scanlineLength+col*pixelBytes+(i%pixelBytes)];
								upperLeft=col&&pixels[(row-1)*scanlineLength+(col-1)*pixelBytes+(i%pixelBytes)];
							}
							p=left+upper-upperLeft;
							pa=Math.abs(p-left);
							pb=Math.abs(p-upper);
							pc=Math.abs(p-upperLeft);
							if(pa<=pb&&pa<=pc){
								paeth=left;
							}else if(pb<=pc){
								paeth=upper;
							}else{
								paeth=upperLeft;
							}
							pixels[c++]=(byte+paeth)%256;
						}
						break;
					default:
						throw new Error("Invalid filter algorithm: "+data[pos-1]);
				}
				row++;
			}
			return pixels;
		};
		PNG.prototype.decodePixelsSlow=function(data,done_callback){
			try{
				var loop=new Loop();
				loop.steps=1024*64;
			}
			catch(e){
				return this.decodePixels(data);
			}
			var byte,c,col,i,left,length,p,pa,paeth,pb,pc,pixelBytes,pixels,pos,row,scanlineLength,upper,upperLeft,_i,_j,_k,_l,_m;
			if(data==null){
				data=this.imgData;
			}
			if(data.length===0){
				return new Uint8Array(0);
			}
			data=new FlateStream(data);
			data=data.getBytes();
			pixelBytes=this.pixelBitlength/8;
			scanlineLength=pixelBytes*this.width;
			pixels=new Uint8Array(scanlineLength*this.height);
			length=data.length;
			row=0;
			pos=0;
			c=0;
			var self=this;
			loop.for_lt(
				pos,length,0,
				{},
				function(pos,_data,loop){
					switch(data[pos++]){
						case 0:
							for(i=_i=0;_i<scanlineLength;i=_i+=1){
								pixels[c++]=data[pos++];
							}
						break;
						case 1:
							for(i=_j=0;_j<scanlineLength;i=_j+=1){
								byte=data[pos++];
								left=i<pixelBytes?0:pixels[c-pixelBytes];
								pixels[c++]=(byte+left)%256;
							}
						break;
						case 2:
							for(i=_k=0;_k<scanlineLength;i=_k+=1){
								byte=data[pos++];
								col=(i-(i%pixelBytes))/pixelBytes;
								upper=row&&pixels[(row-1)*scanlineLength+col*pixelBytes+(i%pixelBytes)];
								pixels[c++]=(upper+byte)%256;
							}
						break;
						case 3:
							for(i=_l=0;_l<scanlineLength;i=_l+=1){
								byte=data[pos++];
								col=(i-(i%pixelBytes))/pixelBytes;
								left=i<pixelBytes?0:pixels[c-pixelBytes];
								upper=row&&pixels[(row-1)*scanlineLength+col*pixelBytes+(i%pixelBytes)];
								pixels[c++]=(byte+Math.floor((left+upper)/2))%256;
							}
						break;
						case 4:
							for(i=_m=0;_m<scanlineLength;i=_m+=1){
								byte=data[pos++];
								col=(i-(i%pixelBytes))/pixelBytes;
								left=i<pixelBytes?0:pixels[c-pixelBytes];
								if(row===0){
									upper=upperLeft=0;
								}else{
									upper=pixels[(row-1)*scanlineLength+col*pixelBytes+(i%pixelBytes)];
									upperLeft=col&&pixels[(row-1)*scanlineLength+(col-1)*pixelBytes+(i%pixelBytes)];
								}
								p=left+upper-upperLeft;
								pa=Math.abs(p-left);
								pb=Math.abs(p-upper);
								pc=Math.abs(p-upperLeft);
								if(pa<=pb&&pa<=pc){
									paeth=left;
								}else if(pb<=pc){
									paeth=upper;
								}else{
									paeth=upperLeft;
								}
								pixels[c++]=(byte+paeth)%256;
							}
						break;
						default:
							throw new Error("Invalid filter algorithm: "+data[pos-1]);
					}
					row++;
					return pos;
				},
				function(pos,_data,loop){
					try{
						done_callback(self,pixels);
					}
					catch(e){}
				}
			);
		};
		PNG.prototype.decodePalette=function(){
			var c,i,length,palette,pos,ret,transparency,_i,_ref,_ref1;
			palette=this.palette;
			transparency=this.transparency.indexed||[];
			ret=new Uint8Array((transparency.length||0)+palette.length);
			pos=0;
			length=palette.length;
			c=0;
			for(i=_i=0,_ref=palette.length;_i<_ref;i=_i+=3){
				ret[pos++]=palette[i];
				ret[pos++]=palette[i+1];
				ret[pos++]=palette[i+2];
				ret[pos++]=(_ref1=transparency[c++])!=null?_ref1:255;
			}
			return ret;
		};
		PNG.prototype.copyToImageData=function(imageData,pixels){
			var alpha,colors,data,i,input,j,k,length,palette,v,_ref;
			colors=this.colors;
			palette=null;
			alpha=this.hasAlphaChannel;
			if(this.palette.length){
				palette=(_ref=this._decodedPalette)!=null?_ref:this._decodedPalette=this.decodePalette();
				colors=4;
				alpha=true;
			}
			data=imageData.data;
			length=data.length;
			input=palette||pixels;
			i=j=0;
			if(colors===1){
				while(i<length){
					k=palette?pixels[i/4]*4:j;
					v=input[k++];
					data[i++]=v;
					data[i++]=v;
					data[i++]=v;
					data[i++]=alpha?input[k++]:255;
					j=k;
				}
			}else{
				while(i<length){
					k=palette?pixels[i/4]*4:j;
					data[i++]=input[k++];
					data[i++]=input[k++];
					data[i++]=input[k++];
					data[i++]=alpha?input[k++]:255;
					j=k;
				}
			}
		};
		PNG.prototype.decode=function(){
			var ret;
			ret=new Uint8Array(this.width*this.height*4);
			this.copyToImageData(ret,this.decodePixels());
			return ret;
		};
		scratchCanvas=document.createElement('canvas');
		scratchCtx=scratchCanvas.getContext('2d');
		makeImage=function(imageData){
			var img;
			scratchCtx.width=imageData.width;
			scratchCtx.height=imageData.height;
			scratchCtx.clearRect(0,0,imageData.width,imageData.height);
			scratchCtx.putImageData(imageData,0,0);
			img=new Image;
			img.src=scratchCanvas.toDataURL();
			return img;
		};
		PNG.prototype.decodeFrames=function(ctx){
			var frame,i,imageData,pixels,_i,_len,_ref,_results;
			if(!this.animation){
				return;
			}
			_ref=this.animation.frames;
			_results=[];
			for(i=_i=0,_len=_ref.length;_i<_len;i=++_i){
				frame=_ref[i];
				imageData=ctx.createImageData(frame.width,frame.height);
				pixels=this.decodePixels(new Uint8Array(frame.data));
				this.copyToImageData(imageData,pixels);
				frame.imageData=imageData;
				_results.push(frame.image=makeImage(imageData));
			}
			return _results;
		};
		PNG.prototype.renderFrame=function(ctx,number){
			var frame,frames,prev;
			frames=this.animation.frames;
			frame=frames[number];
			prev=frames[number-1];
			if(number===0){
				ctx.clearRect(0,0,this.width,this.height);
			}
			if((prev!=null?prev.disposeOp:void 0)===APNG_DISPOSE_OP_BACKGROUND){
				ctx.clearRect(prev.xOffset,prev.yOffset,prev.width,prev.height);
			}else if((prev!=null?prev.disposeOp:void 0)===APNG_DISPOSE_OP_PREVIOUS){
				ctx.putImageData(prev.imageData,prev.xOffset,prev.yOffset);
			}
			if(frame.blendOp===APNG_BLEND_OP_SOURCE){
				ctx.clearRect(frame.xOffset,frame.yOffset,frame.width,frame.height);
			}
			return ctx.drawImage(frame.image,frame.xOffset,frame.yOffset);
		};
		PNG.prototype.animate=function(ctx){
			var doFrame,frameNumber,frames,numFrames,numPlays,_ref,
				_this=this;
			frameNumber=0;
			_ref=this.animation,numFrames=_ref.numFrames,frames=_ref.frames,numPlays=_ref.numPlays;
			return(doFrame=function(){
				var f,frame;
				f=frameNumber++%numFrames;
				frame=frames[f];
				_this.renderFrame(ctx,f);
				if(numFrames>1&&frameNumber/numFrames<numPlays){
					return _this.animation._timeout=setTimeout(doFrame,frame.delay);
				}
			})();
		};
		PNG.prototype.stopAnimation=function(){
			var _ref;
			return clearTimeout((_ref=this.animation)!=null?_ref._timeout:void 0);
		};
		PNG.prototype.render=function(canvas){
			var ctx,data;
			if(canvas._png){
				canvas._png.stopAnimation();
			}
			canvas._png=this;
			canvas.width=this.width;
			canvas.height=this.height;
			ctx=canvas.getContext("2d");
			if(this.animation){
				this.decodeFrames(ctx);
				return this.animate(ctx);
			}else{
				data=ctx.createImageData(this.width,this.height);
				this.copyToImageData(data,this.decodePixels());
				return ctx.putImageData(data,0,0);
			}
		};
		return PNG;
	})();
	window.PNG=PNG;
}).call(this);
function Loop(){
	this.loops=new Array();
	this.timer=null;
	this.timeout=100;
	this.steps=100;
	this.special=0;
}
Loop.prototype.for_lt=function(i,limiter,incr,data,body,done){
	this.loops.push(
		{
			"compare":function(i,limit){return i<limit;},
			"step_limiter":function(i,limit){return(i>limit?limit:i);},
			"i":i,
			"i_incr":incr,
			"limiter":limiter,
			"data":data,
			"body":body,
			"done":done,
			"decrement":false
		}
	);
	this.loop();
}
Loop.prototype.for_le=function(i,limiter,incr,data,body,done){
	this.loops.push(
		{
			"compare":function(i,limit){return i<=limit;},
			"step_limiter":function(i,limit){return(i>limit?limit:i);},
			"i":i,
			"i_incr":incr,
			"limiter":limiter,
			"data":data,
			"body":body,
			"done":done,
			"decrement":false
		}
	);
	this.loop();
}
Loop.prototype.for_gt=function(i,limiter,incr,data,body,done){
	this.loops.push(
		{
			"compare":function(i,limit){return i>limit;},
			"step_limiter":function(i,limit){return(i<limit?limit:i);},
			"i":i,
			"i_incr":incr,
			"limiter":limiter,
			"data":data,
			"body":body,
			"done":done,
			"decrement":false
		}
	);
	this.loop();
}
Loop.prototype.for_ge=function(i,limiter,incr,data,body,done){
	this.loops.push(
		{
			"compare":function(i,limit){return i>=limit;},
			"step_limiter":function(i,limit){return(i<limit?limit:i);},
			"i":i,
			"i_incr":incr,
			"limiter":limiter,
			"data":data,
			"body":body,
			"done":done,
			"decrement":false
		}
	);
	this.loop();
}
Loop.prototype.forever=function(data,body,done){
	this.loops.push(
		{
			"compare":function(i,limit){return true;},
			"step_limiter":function(i,limit){return 0;},
			"i":0,
			"i_incr":0,
			"limiter":0,
			"data":data,
			"body":body,
			"done":done,
			"decrement":false
		}
	);
	this.loop();
}
Loop.prototype.Break=function(){
	this.special=1;
	return undefined;
}
Loop.prototype.Continue=function(){
	this.special=2;
	return undefined;
}
Loop.prototype.loop=function(){
	this.timer=null;
	var ll=this.loops.length;
	var loop=this.loops[ll-1];
	var i_max=loop.step_limiter(loop.i+this.steps,loop.limiter);
	var j;
	var typeof_number=typeof(1.0);
	while(loop.compare(loop.i,i_max)){
		j=loop.body(loop.i,loop.data,this);
		loop.i=(typeof(j)===typeof_number?j:loop.i)+loop.i_incr;
		if(this.loops.length>ll){
			this.loops[this.loops.length-1].decrement=true;
			return;
		}
		if(this.special==1){
			break;
		}
		if(this.special==2){
			this.special=0;
		}
	}
	if(loop.i<loop.limiter&&this.special!=1){
		var self=this;
		this.timer=setTimeout(function(){self.loop();},this.timeout);
	}
	else{
		this.special=0;
		loop.done(loop.i,loop.data,this);
		if(this.loops.pop().decrement){
			var self=this;
			this.timer=setTimeout(function(){self.loop();},this.timeout);
		}
	}
}
Loop.prototype.stop=function(){
	if(this.timer!==null){
		clearTimeout(this.timer);
		this.timer=null;
	}
	this.loops=new Array();
}
function DataImage(source_location,callback_data,load_callback,slow){
	this.load_callback=load_callback;
	this.width=0;
	this.height=0;
	this.color_depth=0;
	this.pixels=null;
	this.image=null;
	this.error=false;
	var self=this;
	try{
		if(typeof(source_location)==typeof("")){
			PNG.load(source_location,null,function(png){
				self.image=png;
				self.pixels=png.decodePixels();
				self.width=self.image.width;
				self.height=self.image.height;
				self.color_depth=(png.hasAlphaChannel?4:3);
				if(typeof(self.load_callback)=="function")self.load_callback(self,callback_data);
			});
		}
		else{
			if(slow){
				png=new PNG(source_location,true,function(png){
					png.decodePixelsSlow(null,function(png,pixels){
						self.image=png;
						self.pixels=pixels;
						self.width=self.image.width;
						self.height=self.image.height;
						self.color_depth=(png.hasAlphaChannel?4:3);
						if(typeof(self.load_callback)=="function")self.load_callback(self,callback_data);
					});
				});
			}
			else{
				var png=new PNG(source_location);
				self.image=png;
				self.pixels=png.decodePixels();
				self.width=self.image.width;
				self.height=self.image.height;
				self.color_depth=(png.hasAlphaChannel?4:3);
				if(typeof(self.load_callback)=="function")self.load_callback(self,callback_data);
			}
		}
	}
	catch(e){
		this.error=true;
		console.log(e);
	}
}
DataImage.prototype.get_pixel=function(x,y,c){
	return this.pixels[(x+y*this.width)*this.color_depth+c];
}
function DataImageReader(image){
	this.image=image;
	this.bitmask=0;
	this.value_mask=0;
	this.pixel_mask=0xFF;
	this.x=0;
	this.y=0;
	this.c=0;
	this.bit_value=0;
	this.bit_count=0;
	this.pixel_pos=0;
	this.scatter_pos=0;
	this.scatter_range=0;
	this.scatter_full_range=0;
	this.scatter=false;
	this.channels=0;
	this.hashmasking=false;
	this.hashmask_length=0;
	this.hashmask_index=0;
	this.hashmask_value=null;
}
DataImageReader.prototype.decode_title=function(title){
	return title;
}
DataImageReader.prototype.unpack=function(){
	try{
		return this.__unpack();
	}
	catch(e){
		return"Error extracting data; image file likely doesn't contain data";
	}
}
DataImageReader.prototype.unpack_slow=function(callback){
	try{
		this.__unpack_slow(callback);
	}
	catch(e){
		callback("Error extracting data; image file likely doesn't contain data");
	}
}
DataImageReader.prototype.unpack_names=function(){
	try{
		var r=this.__unpack_start();
		this.hashmasking=false;
		this.hashmask_value=null;
		return r;
	}
	catch(e){
		return"Error extracting data; image file likely doesn't contain data";
	}
}
DataImageReader.prototype.__unpack_start=function(){
	this.x=0;
	this.y=0;
	this.c=0;
	this.bit_value=0;
	this.bit_count=0;
	this.pixel_pos=0;
	this.scatter_pos=0;
	this.scatter_range=0;
	this.scatter_full_range=0;
	this.scatter=false;
	this.channels=3;
	this.hashmasking=false;
	this.hashmask_length=0;
	this.hashmask_index=0;
	this.hashmask_value=null;
	this.bitmask=1+this.__read_pixel(0x07);
	this.value_mask=(1<<this.bitmask)-1;
	this.pixel_mask=0xFF-this.value_mask;
	var flags=this.__read_pixel(0x07);
	if((flags&4)!=0)this.channels=4;
	var metadata=false;
	if((flags&1)!=0){
		var flags2=this.__data_to_int(this.__extract_data(1));
		if((flags2&2)!=0)metadata=true;
		if((flags2&4)!=0){
			this.__complete_pixel();
			this.__init_hashmask();
		}
	}
	if((flags&2)!=0){
		this.scatter_range=this.__data_to_int(this.__extract_data(4));
		this.__complete_pixel();
		if(this.scatter_range>0){
			this.scatter_pos=0;
			this.scatter_full_range=((this.image.width*this.image.height*this.channels)-this.pixel_pos-1);
			this.scatter=true;
		}
	}
	var size_limit;
	if(metadata){
		var meta_length=this.__data_to_int(this.__extract_data(2));
		size_limit=Math.ceil(((((this.image.width*(this.image.height-this.y)-this.x)*this.channels)-this.c)*this.bitmask)/8);
		if(meta_length<0||meta_length>size_limit){
			throw"Data overflow";
		}
		var meta=this.__extract_data(meta_length);
	}
	var file_count=this.__data_to_int(this.__extract_data(2));
	var filename_lengths=new Array();
	var file_sizes=new Array();
	var v;
	var total_size=0;
	for(var i=0;i<file_count;++i){
		v=this.__data_to_int(this.__extract_data(2));
		filename_lengths.push(v);
		total_size+=v;
		if(v<0||total_size<0)throw"Data overflow";
		v=this.__data_to_int(this.__extract_data(4));
		file_sizes.push(v);
		total_size+=v;
		if(v<0||total_size<0)throw"Data overflow";
		size_limit=Math.ceil(((((this.image.width*(this.image.height-this.y)-this.x)*this.channels)-this.c)*this.bitmask)/8);
		if(total_size>size_limit)throw"Data overflow";
	}
	var filenames=new Array();
	for(var i=0;i<file_count;++i){
		var fn=this.__data_to_string(this.__extract_data(filename_lengths[i]));
		filenames.push(this.decode_title(fn));
	}
	return[file_count,filenames,file_sizes];
}
DataImageReader.prototype.__unpack=function(){
	var d=this.__unpack_start();
	var file_count=d[0];
	var filenames=d[1];
	var file_sizes=d[2];
	var sources=new Array();
	for(var i=0;i<file_count;++i){
		var src=this.__extract_data(file_sizes[i]);
		sources.push(src);
	}
	this.hashmasking=false;
	this.hashmask_value=null;
	return[filenames,sources];
}
DataImageReader.prototype.__unpack_slow=function(callback){
	try{
		var loop=new Loop();
		loop.steps=1024*64;
	}
	catch(e){
		return this.__unpack(callback);
	}
	var d=this.__unpack_start();
	var file_count=d[0];
	var filenames=d[1];
	var file_sizes=d[2];
	var self=this;
	var sources=new Array();
	loop.for_lt(
		0,file_count,1,
		{},
		function(i,data,loop){
			self.__extract_data_slow(
				file_sizes[i],
				loop,
				function(src){
					sources.push(src);
				}
			);
		},
		function(i,data,loop){
			self.hashmasking=false;
			self.hashmask_value=null;
			callback([filenames,sources]);
		}
	);
}
DataImageReader.prototype.next_pixel_component=function(count){
	while(count>0){
		count-=1;
		this.c=(this.c+1)%this.channels;
		if(this.c==0){
			this.x=(this.x+1)%this.image.width;
			if(this.x==0){
				this.y=(this.y+1)%this.image.height;
				if(this.y==0){
					throw"Pixel overflow";
				}
			}
		}
	}
}
DataImageReader.prototype.__extract_data=function(byte_length){
	var src=new Uint8Array(byte_length);
	var j=0;
	for(var i=this.bit_count;i<byte_length*8;i+=this.bitmask){
		this.bit_value=this.bit_value|(this.__read_pixel(this.value_mask)<<this.bit_count);
		this.bit_count+=this.bitmask;
		while(this.bit_count>=8){
			src[j]=(this.bit_value&0xFF);
			j+=1;
			this.bit_value=this.bit_value>>8;
			this.bit_count-=8;
		}
	}
	if(j!=byte_length){
		throw"Length mismatch";
	}
	return src;
}
DataImageReader.prototype.__extract_data_slow=function(byte_length,loop,done_callback){
	var src=new Uint8Array(byte_length);
	var j=0;
	var self=this;
	loop.for_lt(
		this.bit_count,byte_length*8,this.bitmask,
		{},
		function(i,data,loop){
			self.bit_value=self.bit_value|(self.__read_pixel(self.value_mask)<<self.bit_count);
			self.bit_count+=self.bitmask;
			while(self.bit_count>=8){
				src[j]=(self.bit_value&0xFF);
				j+=1;
				self.bit_value=self.bit_value>>8;
				self.bit_count-=8;
			}
		},
		function(i,data,loop){
			if(j!=byte_length){
				throw"Length mismatch (got: "+j+"; expected: "+byte_length+")";
			}
			done_callback(src);
		}
	);
}
DataImageReader.prototype.__data_to_int=function(data){
	var val=0;
	for(var i=0;i<data.length;++i){
		val=(val<<8)+data[i];
	}
	return val;
}
DataImageReader.prototype.__data_to_string=function(data){
	var val="";
	for(var i=0;i<data.length;++i){
		val+=String.fromCharCode(data[i]);
	}
	return val;
}
DataImageReader.prototype.__read_pixel=function(value_mask){
	var value=(this.image.get_pixel(this.x,this.y,this.c)&value_mask);
	if(this.hashmasking){
		value=this.__decode_hashmask(value,this.bitmask);
	}
	if(this.scatter){
		this.scatter_pos+=1;
		var v=((Math.floor(this.scatter_pos*this.scatter_full_range/this.scatter_range)-Math.floor((this.scatter_pos-1)*this.scatter_full_range/this.scatter_range)));
		this.pixel_pos+=v;
		this.next_pixel_component(v);
	}
	else{
		this.pixel_pos+=1;
		this.next_pixel_component(1);
	}
	return value;
}
DataImageReader.prototype.__complete_pixel=function(){
	if(this.bit_count>0){
		this.bit_count=0;
		this.bit_value=0;
	}
}
DataImageReader.prototype.__init_hashmask=function(){
	this.hashmasking=true;
	this.hashmask_length=32*8;
	this.hashmask_index=0;
	this.hashmask_value=new Uint8Array(this.hashmask_length/8);
	for(var i=0;i<this.hashmask_length/8;++i){
		this.hashmask_value[i]=(1<<((i%8)+1))-1;
	}
	this.__calculate_hashmask();
	this.hashmask_index=0;
}
DataImageReader.prototype.__calculate_hashmask=function(){
	var x=0;
	var y=0;
	var c=0;
	var w=this.image.width;
	var h=this.image.height;
	var cc=this.channels;
	this.__update_hashmask(this.image.get_pixel(x,y,c)>>3,5);
	if((c=(c+1)%cc)==0&&(x=(x+1)%w)==0&&(y=(y+1)%h)==0)return;
	this.__update_hashmask(this.image.get_pixel(x,y,c)>>3,5);
	if((c=(c+1)%cc)==0&&(x=(x+1)%w)==0&&(y=(y+1)%h)==0)return;
	if(this.bitmask!=8){
		while(true){
			this.__update_hashmask(this.image.get_pixel(x,y,c)>>this.bitmask,8-this.bitmask);
			if((c=(c+1)%cc)==0&&(x=(x+1)%w)==0&&(y=(y+1)%h)==0)return;
		}
	}
}
DataImageReader.prototype.__update_hashmask=function(value,bits){
	var b;
	while(true){
		b=8-(this.hashmask_index%8);
		if(bits<=b){
			this.hashmask_value[Math.floor(this.hashmask_index/8)]^=(value)<<(this.hashmask_index%8);
			this.hashmask_index=(this.hashmask_index+bits)%(this.hashmask_length);
			return;
		}
		else{
			this.hashmask_value[Math.floor(this.hashmask_index/8)]^=(value&((1<<b)-1))<<(this.hashmask_index%8);
			this.hashmask_index=(this.hashmask_index+b)%(this.hashmask_length);
			bits-=b;
			value>>=b;
		}
	}
}
DataImageReader.prototype.__decode_hashmask=function(value,bits){
	var b;
	var off=0;
	while(true){
		b=8-(this.hashmask_index%8);
		if(bits<=b){
			value^=(this.hashmask_value[Math.floor(this.hashmask_index/8)]&((1<<bits)-1))<<off;
			this.hashmask_index=(this.hashmask_index+bits)%(this.hashmask_length);
			return value;
		}
		else{
			value^=(this.hashmask_value[Math.floor(this.hashmask_index/8)]&((1<<b)-1))<<off;
			this.hashmask_index=(this.hashmask_index+b)%(this.hashmask_length);
			bits-=b;
			off+=b;
		}
	}
}
function MediaPlayerCSS(preset,css_color_presets,css_size_presets){
	this.preset=preset;
	this.css_color_presets=css_color_presets;
	this.css_size_presets=css_size_presets;
	this.on_theme_change_callback=null;
	this.on_theme_change_callback_data=null;
	this.create_custom();
	this.load_preset(preset);
	this.css_suffix="";
	this.css={
		".SPContainerMain":{
			"border-radius":"{exp:bg_outer_border_radius,*,border_scale}px",
			"padding":"{exp:bg_outer_size,*,padding_scale}px",
			"background":"transparent",
			"font-family":"{main_font}",
			"font-size":"{exp:font_size,*,font_scale}px",
			"position":"fixed",
			"color":"{hex:color_standard}",
			"z-index":"1000000"
		},
		".SPContainerMainBorders":{
			"background":"{rgba:bg_outer_color}"
		},
		".SPContainer":{
			"position":"relative"
		},
		".SPTitleBarContainer":{
			"position":"relative",
			"background":"{rgba:bg_color_dark}",
			"text-align":"center",
			"cursor":"move",
			"border-top-left-radius":"{exp:bg_inner_border_radius,*,border_scale}px",
			"border-top-right-radius":"{exp:bg_inner_border_radius,*,border_scale}px"
		},
		".SPTitleContainer":{
			"display":"block",
			"padding":"{exp:1,*,padding_scale}px 0px {exp:1,*,padding_scale}px 0px",
			"overflow":"hidden"
		},
		".SPTitle":{
			"display":"inline",
			"white-space":"nowrap",
			"font-weight":"bold",
			"color":"{hex:color_special_1}",
			"text-shadow":"{exp:1,*,font_scale}px {exp:1,*,font_scale}px 1px {hex:color_highlight_light}"
		},
		".SPMainButtonsLeft":{
			"position":"absolute",
			"left":"0",
			"top":"0",
			"display":"inline-block",
			"height":"100%",
			"overflow":"hidden"
		},
		".SPMainButtonsRight":{
			"position":"absolute",
			"right":"0",
			"top":"0",
			"display":"inline-block",
			"height":"100%",
			"overflow":"hidden"
		},
		".SPMainButtonLeft":{
			"display":"inline-block",
			"padding":"{exp:1,*,padding_scale}px",
			"border-top-left-radius":"{exp:bg_inner_border_radius,*,border_scale}px",
			"text-decoration":"none !important",
			"cursor":"pointer",
			"height":"100%",
			"opacity":"0.0",
			"color":"{hex:color_disabled} !important",
			"background":"transparent"
		},
		".SPMainButtonLeft:hover":{
			"opacity":"1.0",
			"text-decoration":"none !important",
			"color":"{hex:color_light} !important",
			"background":"{rgba:bg_color_darker}"
		},
		".SPMainButtonLeft:active":{
			"opacity":"1.0",
			"text-decoration":"none !important",
			"color":"{hex:color_special_2} !important",
			"background":"{rgba:bg_color_darker}"
		},
		".SPMainButtonRight":{
			"display":"inline-block",
			"padding":"{exp:1,*,padding_scale}px",
			"border-top-right-radius":"{exp:bg_inner_border_radius,*,border_scale}px",
			"text-decoration":"none !important",
			"cursor":"pointer",
			"height":"100%",
			"opacity":"0.0",
			"color":"{hex:color_disabled} !important",
			"background":"transparent"
		},
		".SPMainButtonRight:hover":{
			"opacity":"1.0",
			"text-decoration":"none !important",
			"color":"{hex:color_light} !important",
			"background":"{rgba:bg_color_darker}"
		},
		".SPMainButtonRight:active":{
			"opacity":"1.0",
			"text-decoration":"none !important",
			"color":"{hex:color_special_2} !important",
			"background":"{rgba:bg_color_darker}"
		},
		".SPMainButtonGeneric":{
			"display":"inline-block",
			"padding":"{exp:1,*,padding_scale}px",
			"text-decoration":"none !important",
			"cursor":"pointer",
			"height":"100%",
			"opacity":"0.0",
			"color":"{hex:color_disabled} !important",
			"background":"transparent"
		},
		".SPMainButtonGeneric:hover":{
			"opacity":"1.0",
			"text-decoration":"none !important",
			"color":"{hex:color_light} !important",
			"background":"{rgba:bg_color_darker}"
		},
		".SPMainButtonGeneric:active":{
			"opacity":"1.0",
			"text-decoration":"none !important",
			"color":"{hex:color_special_2} !important",
			"background":"{rgba:bg_color_darker}"
		},
		".SPContentContainer":{
			"background":"{rgba:bg_color_light}",
			"text-align":"center",
			"position":"relative"
		},
		".SPTopContainer":{
			"position":"relative"
		},
		".SPVolumeContainer":{
			"position":"absolute",
			"left":"0",
			"top":"0",
			"height":"100%",
			"opacity":"0.0",
			"background":"transparent"
		},
		".SPVolumeContainerActive":{
			"opacity":"1.0 !important"
		},
		".SPContainerMain:hover .SPVolumeContainer":{
			"opacity":"0.5"
		},
		".SPContainerMain:hover .SPTopContainer:hover .SPVolumeContainer":{
			"opacity":"1.0"
		},
		".SPVolumeContainerActive .SPVolumeContainer":{
			"opacity":"1.0 !important"
		},
		".SPVolumeContainerActive .SPVolumeContainer:hover":{
			"opacity":"1.0 !important"
		},
		".SPVolumeBarContainer":{
			"position":"relative",
			"width":"{exp:16,*,font_scale}px",
			"height":"100%",
			"display":"inline-block",
			"vertical-align":"top",
			"cursor":"pointer",
			"background":"{rgba:bg_color_lightest}"
		},
		".SPVolumeBar":{
			"position":"absolute",
			"bottom":"0",
			"width":"100%",
			"cursor":"pointer"
		},
		".SPVolumeLabelContainer":{
			"text-align":"left",
			"display":"inline-block",
			"cursor":"default",
			"padding":"0px {exp:2,*,padding_scale}px 0px {exp:2,*,padding_scale}px",
			"text-shadow":"{exp:1,*,font_scale}px {exp:1,*,font_scale}px 1px {hex:color_highlight_light}"
		},
		".SPVolumeLabel":{
			"display":"block"
		},
		".SPVolumeValue":{
			"display":"block",
			"font-size":"{exp:font_size_small,*,font_scale}px"
		},
		".SPPlaylistIndexContainer":{
			"position":"absolute",
			"right":"0",
			"top":"0",
			"cursor":"default",
			"opacity":"0.0",
			"padding":"{exp:2,*,padding_scale}px"
		},
		".SPPlaylistIndexContainerActive":{
			"opacity":"1.0 !important"
		},
		".SPContainerMain:hover .SPPlaylistIndexContainer":{
			"opacity":"0.5"
		},
		".SPContainerMain:hover .SPTopContainer:hover .SPPlaylistIndexContainer":{
			"opacity":"1.0"
		},
		".SPPlaylistIndexContainerInner":{
			"padding":"{exp:2,*,padding_scale}px",
			"border-radius":"{exp:2,*,padding_scale}px",
			"background":"{rgba:bg_color_lightest}"
		},
		".SPPlaylistIndexText1":{
			"display":"inline-block"
		},
		".SPPlaylistIndexText2":{
			"display":"inline-block",
			"padding":"0px {exp:2,*,padding_scale}px 0px {exp:2,*,padding_scale}px",
		},
		".SPPlaylistIndexText3":{
			"display":"inline-block"
		},
		".SPControlContainer":{
			"width":"100%",
			"padding-top":"{exp:2,*,padding_scale}px",
			"text-align":"center",
			"position":"absolute",
			"bottom":"0",
			"opacity":"0.0"
		},
		".SPContainerMain:hover .SPControlContainer":{
			"opacity":"1.0"
		},
		".SPControlContainerInner":{
			"padding":"{exp:4,*,padding_scale}px {exp:6,*,padding_scale}px {exp:2,*,padding_scale}px {exp:6,*,padding_scale}px",
			"display":"inline-block",
			"border-top-left-radius":"{exp:border_radius_normal,*,border_scale}px",
			"border-top-right-radius":"{exp:border_radius_normal,*,border_scale}px",
			"background":"{rgba:bg_color_lightest,0.5}"
		},
		".SPTopContainer:hover .SPControlContainerInner":{
			"background":"{rgba:bg_color_lightest}"
		},
		".SPControlLink":{
			"padding":"{exp:1,*,padding_scale}px {exp:2,*,padding_scale}px {exp:1,*,padding_scale}px {exp:2,*,padding_scale}px",
			"font-family":"{controls_font}",
			"font-size":"{exp:font_size_controls,*,font_scale}px",
			"font-weight":"bold",
			"text-decoration":"none !important",
			"display":"inline-block",
			"border-radius":"{exp:border_radius_small,*,border_scale}px",
			"cursor":"pointer",
			"color":"{hex:color_standard}",
			"background":"transparent"
		},
		".SPControlLink:hover":{
			"text-decoration":"none !important",
			"color":"{hex:color_standard}",
			"background":"{rgba:bg_color_light}"
		},
		".SPControlLink:active":{
			"text-decoration":"none !important",
			"color":"{hex:color_special_2}",
			"background":"{rgba:bg_color_dark}"
		},
		".SPControlLinkDisabled, .SPControlLinkDisabled:hover, .SPControlLinkDisabled:active":{
			"color":"{hex:color_disabled} !important",
			"background":"transparent !important",
			"cursor":"default !important"
		},
		".SPControlLinkSeparator":{
			"display":"inline-block",
			"width":"{exp:2,*,padding_scale}px"
		},
		".SPControlLinkSvgContainer":{
			"padding":"{exp:1,*,padding_scale}px {exp:2,*,padding_scale}px {exp:1,*,padding_scale}px {exp:2,*,padding_scale}px",
			"border-radius":"{exp:border_radius_small,*,border_scale}px",
			"background":"transparent",
			"display":"inline-block",
			"cursor":"pointer"
		},
		".SPControlLinkSvgContainer:hover":{
			"background":"{rgba:bg_color_light}"
		},
		".SPControlLinkSvgContainer:active":{
			"background":"{rgba:bg_color_dark}"
		},
		".SPControlLinkSvg":{
			"width":"{exp:14,*,font_scale}px",
			"height":"{exp:14,*,font_scale}px"
		},
		".SPControlLinkSvgMainGroup":{
		},
		".SPControlLinkSvgShapeColor":{
			"fill":"{rgb:color_standard}",
			"fill-opacity":"0.5",
			"stroke":"none"
		},
		".SPTopContainer:hover .SPControlLinkSvgShapeColor":{
			"fill-opacity":"1.0 !important"
		},
		".SPTopContainer:hover .SPControlLinkDisabled .SPControlLinkSvgShapeColor":{
			"fill-opacity":"0.5 !important"
		},
		".SPControlLinkSvgContainer:hover .SPControlLinkSvgShapeColor":{
			"fill":"{rgb:color_standard}",
		},
		".SPControlLinkSvgContainer:active .SPControlLinkSvgShapeColor":{
			"fill":"{rgb:color_special_2}",
		},
		".SPVideoContainer":{
			"display":"block",
			"position":"absolute",
			"left":"0",
			"top":"0",
			"width":"100%",
			"height":"100%",
			"overflow":"hidden"
		},
		".SPVideoContainerMask":{
			"display":"block",
			"position":"absolute",
			"left":"0",
			"top":"0",
			"width":"100%",
			"height":"100%"
		},
		".SPSeekContainerTop":{
			"position":"relative",
			"height":"{exp:1,*,border_scale}px",
			"background":"{rgba:bg_color_dark}",
			"font-size":"0px"
		},
		".SPSeekContainerBottom":{
			"height":"{exp:1,*,border_scale}px",
			"background":"{rgba:bg_color_dark}"
		},
		".SPSeekContainer":{
			"position":"relative",
			"border":"0px"
		},
		".SPSeekTimeContainer":{
			"position":"relative",
			"padding":"{exp:1,*,padding_scale}px 0px {exp:1,*,padding_scale}px 0px",
			"text-align":"center"
		},
		".SPSeekTime":{
			"color":"{hex:color_standard}",
			"display":"inline-block",
			"text-shadow":"{exp:1,*,font_scale}px {exp:1,*,font_scale}px 1px {hex:color_highlight_light}",
		},
		".SPSeekTimeLeft":{
			"position":"absolute",
			"left":"0",
			"padding-left":"{exp:1,*,padding_scale}px",
			"display":"inline-block",
			"color":"{hex:color_disabled}"
		},
		".SPSeekTimeRight":{
			"position":"absolute",
			"right":"0",
			"padding-right":"{exp:1,*,padding_scale}px",
			"display":"inline-block",
			"color":"{hex:color_disabled}"
		},
		".SPSeekBarContainer":{
			"position":"absolute",
			"left":"0",
			"top":"0",
			"width":"100%",
			"height":"100%",
			"text-align":"left",
			"overflow":"hidden",
			"cursor":"default"
		},
		".SPSeekBarMover":{
			"width":"0px",
			"height":"100%",
			"display":"inline-block",
			"background":"{rgba:bg_color_darkest,0.125}",
			"cursor":"default"
		},
		".SPSeekBar":{
			"width":"{exp:8,*,font_scale}px",
			"height":"100%",
			"display":"inline-block",
			"background":"{rgba:bg_color_darkest,0.75}",
			"cursor":"pointer"
		},
		".SPSeekBarActive":{
			"background":"{rgba:color_special_2,0.75} !important"
		},
		".SPLoadPercentBarContainer":{
			"position":"absolute",
			"left":"0",
			"top":"0",
			"width":"100%",
			"height":"100%",
			"text-align":"left",
			"overflow":"hidden",
			"cursor":"default",
		},
		".SPLoadPercentBarMover":{
			"width":"0px",
			"height":"100%",
			"display":"inline-block",
			"background":"transparent",
			"cursor":"default"
		},
		".SPLoadPercentBar":{
			"width":"0px",
			"height":"100%",
			"display":"inline-block",
			"background":"{rgba:bg_color_darkest,0.5}",
			"cursor":"default"
		},
		".SPImageContainerMain":{
			"padding":"{exp:2,*,padding_scale}px 0px {exp:2,*,padding_scale}px 0px",
			"width":"100%",
			"text-align":"center",
			"position":"relative"
		},
		".SPImageContainer":{
			"display":"block",
			"width":"100%",
			"overflow":"hidden",
			"position":"relative"
		},
		".SPImage":{},
		".SPNoImage":{
			"display":"inline-block",
			"background":"{rgba:bg_color_lightest}",
			"color":"{hex:color_disabled}",
			"cursor":"default"
		},
		".SPNoImageText":{
			"display":"none"
		},
		".SPPlaylistContainer":{
			"cursor":"default",
			"overflow-x":"hidden",
			"overflow-y":"auto"
		},
		".SPPlaylistItem":{
			"position":"relative",
			"display":"block",
			"text-align":"left",
			"overflow":"hidden",
			"white-space":"nowrap",
			"cursor":"pointer"
		},
		".SPPlaylistItem:hover, .SPPlaylistItem:active":{
			"background":"{rgba:bg_color_lightest}"
		},
		".SPPlaylistItemActive":{},
		".SPPlaylistControlsContainer":{
			"position":"absolute",
			"right":"0",
			"top":"0",
			"display":"block",
			"cursor":"default"
		},
		".SPPlaylistItemInfo":{
			"position":"absolute",
			"right":"0",
			"top":"0",
			"white-space":"nowrap",
			"color":"{hex:color_light}",
			"display":"block",
			"cursor":"default",
			"padding":"{exp:1,*,padding_scale}px {exp:2,*,padding_scale}px {exp:1,*,padding_scale}px 0px",
			"background":"{rgba:bg_color_light}",
		},
		".SPPlaylistItem:hover .SPPlaylistItemInfo":{
			"background":"{rgba:bg_color_lightest}",
		},
		".SPPlaylistControls":{
			"opacity":"0.0",
			"text-decoration":"none !important",
			"background":"transparent",
			"display":"inline-block",
			"color":"{hex:color_standard} !important",
			"padding":"{exp:1,*,padding_scale}px 0px {exp:1,*,padding_scale}px 0px"
		},
		".SPPlaylistItem:hover .SPPlaylistControls":{
			"background":"{rgba:bg_color_lightest}",
			"text-decoration":"none !important",
			"opacity":"0.25"
		},
		".SPPlaylistItem:hover .SPPlaylistControls:hover, .SPPlaylistControls:active":{
			"background":"{rgba:bg_color_lightest}",
			"text-decoration":"none !important",
			"opacity":"1.0"
		},
		".SPPlaylistControlLink":{
			"display":"inline-block",
			"padding":"0px {exp:2,*,padding_scale}px 0px {exp:2,*,padding_scale}px",
			"width":"{exp:12,*,font_scale}px",
			"text-align":"center",
			"cursor":"pointer",
			"border-radius":"{exp:border_radius_small,*,border_scale}px",
			"text-decoration":"none",
			"color":"{hex:color_disabled}",
			"background":"transparent"
		},
		".SPPlaylistControls:hover .SPPlaylistControlLink, .SPPlaylistControlLink:visited":{
			"text-decoration":"none !important",
			"background":"{rgba:bg_color_light} !important"
		},
		".SPPlaylistControls:hover .SPPlaylistControlLink:hover":{
			"text-decoration":"none !important",
			"color":"{hex:color_standard} !important",
			"background":"{rgba:bg_color_dark}"
		},
		".SPPlaylistControls:hover .SPPlaylistControlLink:active":{
			"text-decoration":"none !important",
			"color":"{hex:color_special_2} !important",
			"background":"{rgba:bg_color_dark}"
		},
		".SPPlaylistControlLinkSeparator":{
			"display":"inline-block",
			"padding":"0px 0px 0px {exp:1,*,padding_scale}px",
			"cursor":"default"
		},
		".SPPlaylistSoundName":{
			"color":"{hex:color_standard}",
			"padding":"{exp:1,*,padding_scale}px 0px {exp:1,*,padding_scale}px {exp:2,*,padding_scale}px"
		},
		".SPPlaylistItemActive .SPPlaylistSoundName":{
			"color":"{hex:color_special_2} !important",
			"text-shadow":"{exp:1,*,font_scale}px {exp:1,*,font_scale}px 1px {hex:color_highlight_light}"
		},
		".SPHelpContainer":{
			"position":"absolute",
			"left":"0",
			"top":"0",
			"width":"100%",
			"height":"100%",
			"overflow-x":"hidden",
			"overflow-y":"auto",
			"background":"{rgba:bg_color_light}"
		},
		".SPHelpLabelDiv":{
			"display":"block",
			"width":"100%",
			"text-align":"left",
			"font-weight":"bold",
			"padding":"{exp:4,*,padding_scale}px {exp:2,*,padding_scale}px 0px {exp:2,*,padding_scale}px"
		},
		".SPHelpTextDiv":{
			"display":"block",
			"width":"100%",
			"text-align":"left",
			"padding":"{exp:2,*,padding_scale}px {exp:4,*,padding_scale}px 0px {exp:4,*,padding_scale}px"
		},
		".SPHelpSectionDiv":{
			"display":"block",
			"width":"100%",
			"text-align":"left",
			"padding-top":"{exp:2,*,padding_scale}px"
		},
		".SPHelpLinkDiv":{
			"background":"{rgba:bg_color_light}",
			"display":"block",
			"width":"100%",
			"position":"absolute",
			"bottom":"0",
			"left":"0"
		},
		".SPHelpTextLink":{
			"display":"inline-block",
			"width":"50%",
			"text-align":"center",
			"cursor":"pointer",
			"text-decoration":"none",
			"color":"{hex:color_standard} !important"
		},
		".SPHelpTextLink:hover":{
			"text-decoration":"underline",
			"color":"{hex:color_standard} !important"
		},
		".SPHelpTextLink:active":{
			"text-decoration":"underline",
			"color":"{hex:color_special_2} !important"
		},
		".SPHelpModeLink":{
			"display":"inline-block",
			"width":"100%",
			"text-align":"left",
			"cursor":"pointer",
			"text-decoration":"none",
			"color":"{hex:color_standard} !important",
			"padding-left":"{exp:4.0,*,padding_scale}px"
		},
		".SPHelpModeLink:hover":{
			"text-decoration":"underline",
			"color":"{hex:color_standard} !important"
		},
		".SPHelpModeLink:active":{
			"text-decoration":"underline",
			"color":"{hex:color_special_2} !important"
		},
		".SPHelpColorInputDiv0":{
			"width":"28%",
			"display":"inline-block",
			"position":"relative"
		},
		".SPHelpColorLabelText":{
			"display":"block",
			"width":"100%",
			"text-align":"right",
			"font-style":"italic",
			"vertical-align":"middle"
		},
		".SPHelpColorLabelDisplay":{
			"display":"block",
			"width":"{exp:4,*,padding_scale}px",
			"height":"100%",
			"position":"absolute",
			"left	":"0",
			"top":"0"
		},
		".SPHelpColorInputDiv1":{
			"width":"18%",
			"display":"inline-block"
		},
		".SPHelpColorInputDiv1Full":{
			"width":"72%",
			"display":"inline-block"
		},
		".SPHelpColorInputDiv2":{
			"padding-right":"{exp:2,*,padding_scale}px"
		},
		".SPHelpColorInputDiv2b":{
			"padding-right":"{exp:2,*,padding_scale}px"
		},
		".SPHelpColorInputDiv3":{
			"border":"{exp:1,*,border_scale}px solid {hex:bg_color_dark}",
			"padding":"{exp:2,*,padding_scale}px",
			"background":"{rgba:bg_color_lightest}"
		},
		".SPHelpColorInput, .SPHelpColorInput:hover, .SPHelpColorInput:active, .SPHelpColorInput:focus, input.SPHelpColorInput[type=\"text\"], input.SPHelpColorInput[type=\"text\"]:focus":{
			"width":"100% !important",
			"display":"inline-block !important",
			"padding":"0px !important",
			"margin":"0px !important",
			"font-size":"{exp:font_size,*,font_scale}px !important",
			"color":"{hex:color_standard} !important",
			"background":"{rgba:bg_color_lightest} !important",
			"text-align":"left !important",
			"font-family":"{main_font} !important",
			"border":"0px hidden !important"
		},
		".SPFooterBarContainer":{
			"position":"relative",
			"background":"{rgba:bg_color_light}",
			"text-align":"center",
			"height":"{exp:bg_inner_border_radius,*,border_scale}px",
			"border-bottom-left-radius":"{exp:bg_inner_border_radius,*,border_scale}px",
			"border-bottom-right-radius":"{exp:bg_inner_border_radius,*,border_scale}px"
		},
		".SPAlertContainer":{
			"width":"100%",
			"height":"100%",
			"background":"{rgba:bg_color_lightest,0.75}",
			"position":"absolute",
			"left":"0",
			"top":"0",
			"border-radius":"{exp:bg_inner_border_radius,*,border_scale}px",
			"display":"block"
		},
		".SPAlertContentContainer":{
			"position":"relative",
			"top":"50%",
			"text-align":"center",
			"font-size":"{exp:40,*,font_scale}px",
			"margin-top":"{exp:-40,*,font_scale}px"
		},
		".SPFirstRunContainer":{
			"position":"absolute",
			"left":"0",
			"top":"0",
			"width":"100%",
			"height":"100%",
			"overflow-x":"hidden",
			"overflow-y":"auto",
			"display":"block",
			"background":"{rgba:bg_color_light}"
		},
		".SPFirstRunLabel":{
			"display":"block",
			"text-align":"left",
			"font-weight":"bold",
			"padding":"{exp:4,*,padding_scale}px {exp:2,*,padding_scale}px 0px {exp:2,*,padding_scale}px"
		},
		".SPFirstRunTextContainer":{
			"display":"block",
			"text-align":"left",
			"padding":"{exp:4,*,padding_scale}px {exp:2,*,padding_scale}px 0px {exp:4,*,padding_scale}px"
		},
		".SPFirstRunExitLink":{
			"display":"block",
			"text-align":"center",
			"padding":"{exp:4,*,padding_scale}px {exp:2,*,padding_scale}px 0px {exp:2,*,padding_scale}px"
		},
		".SPResizingSizeOff":{
			"width":"{exp:bg_outer_size,*,padding_scale}px",
			"height":"{exp:bg_outer_size,*,padding_scale}px",
		},
		".SPResizingSizeAvailable":{
			"width":"{exp:bg_outer_size,*,padding_scale,*,2}px",
			"height":"{exp:bg_outer_size,*,padding_scale,*,2}px",
		},
		".SPResizingContainerFull":{
			"position":"absolute",
			"left":"-{exp:bg_outer_size,*,padding_scale}px",
			"top":"-{exp:bg_outer_size,*,padding_scale}px",
			"right":"-{exp:bg_outer_size,*,padding_scale}px",
			"bottom":"-{exp:bg_outer_size,*,padding_scale}px",
			"left":"-16px","top":"-16px","right":"-16px","bottom":"-16px",
			"border-radius":"{exp:bg_outer_border_radius,*,border_scale}px",
			"background":"{rgba:bg_outer_color}"
		},
		".SPResizingContainerInner":{
			"position":"relative",
			"width":"100%",
			"height":"100%"
		},
		".SPResizingContainerControl":{
			"overflow":"hidden",
			"position":"absolute"
		},
		".SPResizingContainerTopLeft":{
			"left":"0",
			"width":"16px",
			"top":"0",
			"height":"16px",
			"cursor":"nw-resize"
		},
		".SPResizingContainerTop":{
			"left":"16px",
			"right":"16px",
			"top":"0",
			"height":"16px",
			"cursor":"n-resize"
		},
		".SPResizingContainerTopRight":{
			"right":"0",
			"width":"16px",
			"top":"0",
			"height":"16px",
			"cursor":"ne-resize"
		},
		".SPResizingContainerLeft":{
			"left":"0",
			"width":"16px",
			"top":"16px",
			"bottom":"16px",
			"cursor":"w-resize"
		},
		".SPResizingContainerRight":{
			"right":"0",
			"width":"16px",
			"top":"16px",
			"bottom":"16px",
			"cursor":"e-resize"
		},
		".SPResizingContainerBottomLeft":{
			"left":"0",
			"width":"16px",
			"bottom":"0",
			"height":"16px",
			"cursor":"sw-resize"
		},
		".SPResizingContainerBottom":{
			"left":"16px",
			"right":"16px",
			"bottom":"0",
			"height":"16px",
			"cursor":"s-resize"
		},
		".SPResizingContainerBottomRight":{
			"right":"0",
			"width":"16px",
			"bottom":"0",
			"height":"16px",
			"cursor":"se-resize"
		},
		".SPResizingContainerTextContainerOuter":{
			"position":"relative",
			"width":"100%",
			"height":"100%"
		},
		".SPResizingContainerTextContainerInner":{
			"position":"absolute",
			"left":"0",
			"top":"50%",
			"width":"100%",
			"height":"100%",
			"margin-top":"-{exp:font_size_controls,*,font_scale,/,2}px",
		},
		".SPResizingContainerTextContainer":{
			"width":"100%",
			"height":"100%",
			"text-align":"center",
			"cursor":"inherit"
		},
		".SPResizingContainerText":{
			"font-family":"{controls_font}",
			"font-size":"{exp:font_size_controls,*,font_scale}px",
			"font-weight":"bold",
			"color":"{hex:color_standard}",
			"text-shadow":"{exp:1,*,font_scale}px {exp:1,*,font_scale}px 1px {hex:color_highlight_light}"
		}
	};
}
MediaPlayerCSS.prototype.create_stylesheet=function(){
	var stylesheet="";
	var key,style,css_key,css_value;
	for(key in this.css){
		stylesheet+=key+"{";
		style=this.css[key];
		for(css_key in style){
			css_value=this.parse_out_values(style[css_key]);
			stylesheet+=css_key+this.css_suffix+":"+css_value+";";
		}
		stylesheet+="}";
	}
	return stylesheet;
}
MediaPlayerCSS.prototype.parse_out_values=function(value){
	var css=this;
	var a,i,v,values,indices;
	value=value.replace(/\{.+?\}/g,function(match){
		match=match.substr(1,match.length-2);
		format_mode=0;
		match=match.replace(/.+?:/g,function(match2){
			match2=match2.toLowerCase();
			if(match2=="hex:")format_mode=1;
			else if(match2=="rgb:")format_mode=2;
			else if(match2=="rgba:")format_mode=3;
			else if(match2=="exp:")format_mode=4;
			else if(match2=="iexp:")format_mode=5;
			return"";
		});
		values=match.split(",");
		translated=new Array();
		for(v=0;v<values.length;++v){
			indices=new Array();
			values[v]=values[v].replace(/\[.+?\]/g,function(match2){
				match2=match2.substr(1,match2.length-2);
				if(match2.length>0&&(match2[0]=='"'||match2[0]=="'")){
					indices.push(match2.substr(1,match2.length-2));
				}
				else{
					indices.push(parseInt(match2));
				}
				return"";
			});
			if(values[v].length>0&&(values[v].charCodeAt(0)&0xDF)>='A'.charCodeAt(0)&&(values[v].charCodeAt(0)&0xDF)<='Z'.charCodeAt(0)){
				if(values[v]in css.css_color_presets[css.preset]){
					values[v]=css.css_color_presets[css.preset][values[v]];
				}
				else if(values[v]in css.css_size_presets[css.preset]){
					values[v]=css.css_size_presets[css.preset][values[v]];
				}
				else{
					return"";
				}
				for(i=0;i<indices.length;++i){
					values[v]=values[v][indices[i]];
				}
				translated[v]=true;
			}
			else{
				values[v]=values[v];
				translated[v]=false;
			}
		}
		try{
			switch(format_mode){
				case 1:
				{
					v=(translated[0]?values[0]:parseFloat(values[0]));
					v=(v[0]<<16)|(v[1]<<8)|(v[2]);
					v=v.toString(16);
					while(v.length<6)v="0"+v;
					v="#"+v;
				}
				return v;
				case 2:
				case 3:
				{
					if(values.length==2){
						a=(translated[1]?values[1]:parseFloat(values[1]));
					}
					else{
						a=values[0][3];
					}
					v=(translated[0]?values[0]:parseFloat(values[0]));
					if(a>=1.0||format_mode==2){
						v="rgb("+v[0]+","+v[1]+","+v[2]+")";
					}
					else{
						v="rgba("+v[0]+","+v[1]+","+v[2]+","+a+")";
					}
				}
				return v;
				case 4:
				case 5:
				{
					v=0.0;
					op="+";
					for(i=0;i<values.length;++i){
						a=(translated[i]?values[i]:parseFloat(values[i]));
						if(op=="+")v+=a;
						else if(op=="-")v-=a;
						else if(op=="*")v*=a;
						else if(op=="/")v/=a;
						else if(op=="%")v%=a;
						if(++i<values.length)op=values[i].trim();
					}
					if(format_mode==4)v=Math.round(v);
					else v=Math.round(v*100.0)/100.0;
				}
				return v;
				default:
				{
					v=(translated[0]?values[0]:parseFloat(values[0]));
				}
				return v;
			}
		}
		catch(e){
			return"";
		}
	});
	return value;
}
MediaPlayerCSS.prototype.load_preset=function(preset_name){
	this.preset=preset_name.replace(/[^a-zA-Z_]/g,"").toLowerCase();
	if(!(this.preset in this.css_color_presets)){
		for(var key in this.css_color_presets){
			this.preset=key;
			break;
		}
	}
	if(typeof(this.on_theme_change_callback)=="function")this.on_theme_change_callback(this.on_theme_change_callback_data);
}
MediaPlayerCSS.prototype.get_volume_colors=function(){
	return this.css_color_presets[this.preset].volume_colors;
}
MediaPlayerCSS.prototype.get_value=function(is_color,name){
	var indices=new Array();
	name=name.replace(/\[.+?\]/g,function(match){
		match=match.substr(1,match.length-2);
		if(match.length>0&&(match[0]=='"'||match[0]=="'")){
			indices.push(match.substr(1,match.length-2));
		}
		else{
			indices.push(parseInt(match));
		}
		return"";
	});
	try{
		var v="";
		if(is_color){
			if(name in this.css_color_presets[this.preset]){
				v=this.css_color_presets[this.preset][name];
			}
		}
		else{
			if(name in this.css_size_presets[this.preset]){
				v=this.css_size_presets[this.preset][name];
			}
		}
		for(var i=0;i<indices.length;++i){
			v=v[indices[i]];
		}
		return v;
	}
	catch(e){
		return"";
	}
}
MediaPlayerCSS.prototype.create_custom=function(){
	var preset="custom";
	this.css_color_presets[preset]={"@name":"Custom"};
	this.css_size_presets[preset]={"@name":"Custom"};
	for(var key in this.css_color_presets[this.preset]){
		if(key[0]!="@"){
			this.css_color_presets[preset][key]=this.css_color_presets[this.preset][key];
		}
	}
	for(var key in this.css_size_presets[this.preset]){
		if(key[0]!="@"){
			this.css_size_presets[preset][key]=this.css_size_presets[this.preset][key];
		}
	}
}
MediaPlayerCSS.prototype.modify_value=function(is_color,name,value,component_index){
	if(this.preset!="custom"){
		this.create_custom();
		this.load_preset("custom");
	}
	var indices=new Array();
	name=name.replace(/\[.+?\]/g,function(match){
		match=match.substr(1,match.length-2);
		if(match.length>0&&(match[0]=='"'||match[0]=="'")){
			indices.push(match.substr(1,match.length-2));
		}
		else{
			indices.push(parseInt(match));
		}
		return"";
	});
	indices.splice(0,0,name);
	if(is_color)indices.push(component_index);
	var v=(is_color?this.css_color_presets[this.preset]:this.css_size_presets[this.preset]);
	for(var i=0;i<indices.length-1;++i){
		v=v[indices[i]];
	}
	v[indices[indices.length-1]]=value;
}
MediaPlayerCSS.prototype.save=function(){
	var data={"key":this.preset,"color":{},"size":{}};
	if("custom"in this.css_color_presets){
		for(var key in this.css_color_presets["custom"]){
			data["color"][key]=this.css_color_presets["custom"][key];
		}
	}
	if("custom"in this.css_size_presets){
		for(var key in this.css_size_presets["custom"]){
			data["size"][key]=this.css_size_presets["custom"][key];
		}
	}
	return data;
}
MediaPlayerCSS.prototype.load=function(data){
	if("color"in data||"size"in data){
		this.css_color_presets["custom"]={"@name":"Custom"};
		this.css_size_presets["custom"]={"@name":"Custom"};
	}
	if("color"in data){
		for(var key in data["color"]){
			this.css_color_presets["custom"][key]=data["color"][key];
		}
	}
	if("size"in data){
		for(var key in data["size"]){
			this.css_size_presets["custom"][key]=data["size"][key];
		}
	}
	if("key"in data){
		this.load_preset(data["key"]);
	}
}
function MediaPlayer(css,load_callbacks,settings_callback,destruct_callback,additional_options){
	this.created=false;
	this.namespace="media_player";
	this.identifier="";
	this.is_chrome=((navigator.userAgent+"").indexOf(" Chrome/")>=0);
	this.title_default="Media Player";
	this.first_run=true;
	this.load_callbacks=[];
	if(load_callbacks){
		for(var i=0;i<load_callbacks.length;++i){
			this.load_callbacks.push(load_callbacks[i]);
		}
	}
	this.settings_callback=settings_callback;
	this.destruct_callback=destruct_callback;
	this.use_svg=this.is_chrome;
	this.scale_factor=1.0;
	this.ytvideo_player=null;
	this.ytvideo_qualities=["default","small","medium","large","hd720","hd1080","highres"];
	this.ytvideo_quality_index=0;
	this.ytvideo_unsafe=this.is_chrome;
	this.ytvideo_html5=true;
	this.image_height_min=64;
	this.image_height_max=225;
	this.image_height_default=this.image_height_max;
	this.image_height=this.image_height_default;
	this.moving=false;
	this.resizing_image=false;
	this.position_offset=[0,0];
	this.player_width_default=400;
	this.player_width=this.player_width_default;
	this.playlist_height_default=34;
	this.playlist_height=this.playlist_height_default;
	this.player_width_min=64;
	this.playlist_height_min=0;
	this.playlist_play_on_load=1;
	this.playlist_play_on_load_settings=["Don't Play","Play if empty playlist","Play if at end of playlist","Play if paused","Always play"];
	this.mouse_offset=null;
	this.mouse_moved=false;
	this.resizing=false;
	this.resizing_sides=[];
	this.resizing_base_size={width:0,height:0};
	this.resize_sides=[false,false,false,false];
	this.resize_sizes=[0.0,0.0,0.0];
	this.resize_side_sizes=[0.0,0.0,0.0,0.0];
	this.resize_side_sizes_target=[0.0,0.0,0.0,0.0];
	this.resize_side_sizes_needed=false;
	this.resize_wait_times=[0.25,0.5,0.05];
	this.resize_timers=[null,null,null];
	this.resize_distance=[4.0,4.0];
	this.resize_side_speed=32.0;
	this.resize_container_hovered=false;
	this.resize_container_border_hovered=false;
	this.resize_should_close=false;
	this.resize_mouse_offset=[0.0,0.0];
	this.volume=0.5;
	this.volume_changing=false;
	this.seek_was_playing=false;
	this.seek_exacting=false;
	this.seek_dragging=false;
	this.playlist=[];
	this.playlist_loop=true;
	this.playlist_randomize=false;
	this.playlist_scrollto_onload=true;
	this.playlist_index_timer=null;
	this.current_image_width=0;
	this.current_image_height=0;
	this.current_media=null;
	this.nullify();
	this.additional_options=additional_options;
	this.css=css;
	this.css.on_theme_change_callback=this.update_player_theme_name;
	this.css.on_theme_change_callback_data={media_player:this};
	$("head").append((this.head_css=this.E("style").html(this.css.create_stylesheet())));
}
MediaPlayer.prototype.destructor=function(){
	if(typeof(this.destruct_callback)=="function")this.destruct_callback(this);
	this.destruct_callback=null;
	this.destroy();
	if(this.head_css!==null)this.head_css.remove();
	this.head_css=null;
}
MediaPlayer.ALL_SOUNDS=true;
MediaPlayer.prototype.save=function(){
	var data={
		"volume":this.volume,
		"playlist_height":this.playlist_height,
		"player_width":this.player_width,
		"image_height":this.image_height,
		"image_height_max":this.image_height_max,
		"scale_factor":this.scale_factor,
		"playlist_loop":this.playlist_loop,
		"playlist_randomize":this.playlist_randomize,
		"playlist_play_on_load":this.playlist_play_on_load,
		"playlist_scrollto_onload":this.playlist_scrollto_onload,
		"position_offset":[this.position_offset[0],this.position_offset[1]],
		"ytvideo_quality_index":this.ytvideo_quality_index,
		"first_run":this.first_run,
		"use_svg":this.use_svg
	};
	return data;
}
MediaPlayer.prototype.load=function(data){
	if("volume"in data)this.volume=data["volume"];
	if("playlist_loop"in data)this.playlist_loop=data["playlist_loop"];
	if("playlist_randomize"in data)this.playlist_randomize=data["playlist_randomize"];
	if("playlist_play_on_load"in data)this.playlist_play_on_load=data["playlist_play_on_load"];
	if("scale_factor"in data)this.scale_factor=data["scale_factor"];
	if("player_width"in data)this.player_width=data["player_width"];
	if("image_height"in data)this.image_height=data["image_height"];
	if("playlist_height"in data)this.playlist_height=data["playlist_height"];
	if("image_height_max"in data)this.image_height_max=data["image_height_max"];
	if("ytvideo_quality_index"in data)this.ytvideo_quality_index=data["ytvideo_quality_index"];
	if("first_run"in data)this.first_run=data["first_run"];
	if("use_svg"in data)this.use_svg=data["use_svg"];
	if("playlist_scrollto_onload"in data)this.playlist_scrollto_onload=data["playlist_scrollto_onload"];
	if("position_offset"in data){
		this.position_offset[0]=data["position_offset"][0];
		this.position_offset[1]=data["position_offset"][1];
	}
}
MediaPlayer.prototype.create=function(){
	if(this.created)this.destroy();
	$(window)
	.on("resize."+this.namespace,{media_player:this},this.on_window_resize);
	$(document)
	.on("mouseup."+this.namespace,{media_player:this},this.on_document_mouseup)
	.on("mousemove."+this.namespace,{media_player:this},this.on_document_mousemove);
	var help_custom_div=null;
	var title_buttons=new Array();
	this.help_container=[null,null,null];
	this.player_theme_value_updaters=new Array();
	this.resizing_controls=new Array();
	this.resizing_texts=new Array();
	$("body").append(
		(this.sp_container_main=this.D("SPContainerMain","SPContainerMainBorders"))
		.width(this.player_width*this.scale_factor)
		.css({"right":this.position_offset[0],"bottom":this.position_offset[1]})
		.on("dragover."+this.namespace,{media_player:this},this.on_container_dragover)
		.on("dragenter."+this.namespace,{media_player:this},this.on_container_dragenter)
		.on("dragexit."+this.namespace,{media_player:this},this.on_container_dragexit)
		.on("drop."+this.namespace,{media_player:this},this.on_container_drop)
		.on("mouseover."+this.namespace,{media_player:this},this.on_main_container_mouseover)
		.on("mouseout."+this.namespace,{media_player:this},this.on_main_container_mouseout)
		.append(
			(this.sp_container=this.D("SPContainer"))
			.append(
				(this.resizing_container=this.D("SPResizingContainerFull"))
				.css("display","none")
				.append(
					this.D("SPResizingContainerInner")
					.append(
						(this.resizing_controls[0]=this.D("SPResizingContainerTopLeft","SPResizingContainerControl"))
						.on("mousedown."+this.namespace,{media_player:this,sides:[0,3]},this.on_resizer_mousedown)
						.append(
							(this.resizing_texts[0]=this.D("SPResizingContainerTextContainer","SPResizingContainerText"))
							.html("&#x2196;")
						)
					)
					.append(
						(this.resizing_controls[1]=this.D("SPResizingContainerTop","SPResizingContainerControl"))
						.on("mousedown."+this.namespace,{media_player:this,sides:[0,null]},this.on_resizer_mousedown)
						.append(
							(this.resizing_texts[1]=this.D("SPResizingContainerTextContainer","SPResizingContainerText"))
							.html("&#x2191;")
						)
					)
					.append(
						(this.resizing_controls[2]=this.D("SPResizingContainerTopRight","SPResizingContainerControl"))
						.on("mousedown."+this.namespace,{media_player:this,sides:[0,1]},this.on_resizer_mousedown)
						.append(
							(this.resizing_texts[2]=this.D("SPResizingContainerTextContainer","SPResizingContainerText"))
							.html("&#x2197;")
						)
					)
					.append(
						(this.resizing_controls[3]=this.D("SPResizingContainerLeft","SPResizingContainerControl"))
						.on("mousedown."+this.namespace,{media_player:this,sides:[null,3]},this.on_resizer_mousedown)
						.append(
							this.D("SPResizingContainerTextContainerOuter")
							.append(
								(this.resizing_texts[3]=this.D("SPResizingContainerTextContainerInner","SPResizingContainerTextContainer","SPResizingContainerText"))
								.html("&#x2190;")
							)
						)
					)
					.append(
						(this.resizing_controls[4]=this.D("SPResizingContainerRight","SPResizingContainerControl"))
						.on("mousedown."+this.namespace,{media_player:this,sides:[null,1]},this.on_resizer_mousedown)
						.append(
							this.D("SPResizingContainerTextContainerOuter")
							.append(
								(this.resizing_texts[4]=this.D("SPResizingContainerTextContainerInner","SPResizingContainerTextContainer","SPResizingContainerText"))
								.html("&#x2192;")
							)
						)
					)
					.append(
						(this.resizing_controls[5]=this.D("SPResizingContainerBottomLeft","SPResizingContainerControl"))
						.on("mousedown."+this.namespace,{media_player:this,sides:[2,3]},this.on_resizer_mousedown)
						.append(
							(this.resizing_texts[5]=this.D("SPResizingContainerTextContainer","SPResizingContainerText"))
							.html("&#x2199;")
						)
					)
					.append(
						(this.resizing_controls[6]=this.D("SPResizingContainerBottom","SPResizingContainerControl"))
						.on("mousedown."+this.namespace,{media_player:this,sides:[2,null]},this.on_resizer_mousedown)
						.append(
							(this.resizing_texts[6]=this.D("SPResizingContainerTextContainer","SPResizingContainerText"))
							.html("&#x2193;")
						)
					)
					.append(
						(this.resizing_controls[7]=this.D("SPResizingContainerBottomRight","SPResizingContainerControl"))
						.on("mousedown."+this.namespace,{media_player:this,sides:[2,1]},this.on_resizer_mousedown)
						.append(
							(this.resizing_texts[7]=this.D("SPResizingContainerTextContainer","SPResizingContainerText"))
							.html("&#x2198;")
						)
					)
				)
			)
			.append(
				this.D("SPTitleBarContainer")
				.on("mousedown."+this.namespace,{media_player:this},this.on_titlebar_mousedown)
				.append(
					this.D("SPTitleContainer")
					.append(
						(this.title=this.D("SPTitle"))
						.html(this.title_default)
					)
				)
				.append(
					this.D("SPMainButtonsLeft")
					.append(
						(title_buttons[0]=this.E("a","SPMainButtonLeft"))
						.html("[S]")
					)
					.append(
						(title_buttons[1]=this.E("a","SPMainButtonGeneric"))
						.html("[?]")
					)
				)
				.append(
					this.D("SPMainButtonsRight")
					.append(
						(title_buttons[2]=this.E("a","SPMainButtonGeneric"))
						.html("[&#x2012;]")
					)
					.append(
						(title_buttons[3]=this.E("a","SPMainButtonRight"))
						.html("[&times;]")
					)
				)
			)
			.append(
				(this.content_container=this.D("SPContentContainer"))
				.append(
					(this.top_container=this.D("SPTopContainer"))
					.append(
						this.D("SPImageContainerMain")
						.append(
							(this.image_container=this.D("SPImageContainer"))
							.height(this.image_height_max*this.scale_factor)
							.append(
								(this.no_image=this.D("SPNoImage"))
								.append(
									this.D("SPNoImageText")
									.html("[no media]")
								)
							)
							.append(
								(this.image=this.E("img","SPImage"))
								.attr("title","")
								.attr("alt","")
								.css("display","none")
								.on("load."+this.namespace,{media_player:this},this.on_image_load)
								.on("mousedown",this.cancel_event)
							)
						)
						.append(
							(this.video_container=this.D("SPVideoContainer"))
						)
						.append(
							(this.video_mask=this.D("SPVideoContainerMask"))
							.on("mousedown",{media_player:this},this.on_image_resize_mousedown)
						)
						.append(
							this.D("SPControlContainer")
							.append(
								(this.playback_control_container=this.D("SPControlContainerInner"))
							)
						)
					)
					.append(
						(this.audio=this.E("audio"))
						.css("display","none")
						.on("play."+this.namespace,{media_player:this},this.on_audio_play)
						.on("pause."+this.namespace,{media_player:this},this.on_audio_pause)
						.on("ended."+this.namespace,{media_player:this},this.on_audio_ended)
						.on("timeupdate."+this.namespace,{media_player:this},this.on_audio_timeupdate)
						.on("durationchange."+this.namespace,{media_player:this},this.on_audio_durationchange)
					)
					.append(
						(this.playlist_index_container=this.D("SPPlaylistIndexContainer"))
						.on("mousedown",this.cancel_event)
						.append(
							this.D("SPPlaylistIndexContainerInner")
							.append(
								(this.playlist_index_text1=this.D("SPPlaylistIndexText1"))
								.html("-")
							)
							.append(
								this.D("SPPlaylistIndexText2")
								.html("/")
							)
							.append(
								(this.playlist_index_text2=this.D("SPPlaylistIndexText3"))
								.html("-")
							)
						)
					)
					.append(
						(this.volume_container=this.D("SPVolumeContainer"))
						.append(
							(this.volume_bar_container=this.D("SPVolumeBarContainer"))
							.on("mousedown."+this.namespace,{media_player:this},this.on_volumebar_mousedown)
							.append(
								(this.volume_bar=this.D("SPVolumeBar"))
							)
						)
						.append(
							this.D("SPVolumeLabelContainer")
							.append(
								(this.D("SPVolumeLabel").html("Vol"))
							)
							.append(
								(this.volume_label=this.D("SPVolumeValue").html("100%"))
							)
						)
					)
				)
				.append(
					this.D("SPSeekContainerTop")
					.append(
						(this.load_percent_bar_container=this.D("SPLoadPercentBarContainer"))
						.on("mousedown."+this.namespace,this.cancel_event)
						.append(
							(this.load_percent_bar_mover=this.D("SPLoadPercentBarMover"))
							.on("mousedown."+this.namespace,this.cancel_event)
						)
						.append(
							(this.load_percent_bar=this.D("SPLoadPercentBar"))
							.on("mousedown."+this.namespace,this.cancel_event)
						)
					)
				)
				.append(
					this.D("SPSeekContainer")
					.append(
						this.D("SPSeekTimeContainer")
						.append(
							(this.seek_time_start_label=this.D("SPSeekTimeLeft"))
							.html("0:00")
						)
						.append(
							(this.seek_time_end_label=this.D("SPSeekTimeRight"))
							.html("0:00")
						)
						.append(
							(this.seek_time_current_label=this.D("SPSeekTime"))
							.html("0:00")
						)
					)
					.append(
						(this.seek_bar_container=this.D("SPSeekBarContainer"))
						.on("mousedown."+this.namespace,{media_player:this},this.on_seekbar_container_mousedown)
						.append(
							(this.seek_bar_mover=this.D("SPSeekBarMover"))
						)
						.append(
							(this.seek_bar=this.D("SPSeekBar"))
							.on("mousedown."+this.namespace,{media_player:this},this.on_seekbar_mousedown)
						)
					)
				)
				.append(
					this.D("SPSeekContainerBottom")
				)
				.append(
					(this.playlist_container=this.D("SPPlaylistContainer"))
					.height(this.playlist_height*this.scale_factor)
					.on("mousedown",this.cancel_event)
				)
				.append(
					(this.help_container[0]=this.D("SPHelpContainer"))
					.css("display","none")
					.append(
						this.D("SPHelpLabelDiv")
						.html("Playlist Settings")
					)
					.append(
						this.D("SPHelpSectionDiv")
						.append(
							this.D("SPHelpColorInputDiv0")
							.append(
								this.D("SPHelpColorInputDiv2b")
								.append(
									this.D("SPHelpColorLabelText")
									.html("Mode")
								)
							)
						)
						.append(
							this.D("SPHelpColorInputDiv1Full")
							.append(
								this.D("SPHelpColorInputDiv2")
								.append(
									this.E("a","SPHelpModeLink")
									.html(this.playlist_randomize?"Randomize":(this.playlist_loop?"Loop":"Play Once"))
									.on("click."+this.namespace,{media_player:this},this.on_playlist_mode_change)
									.on("mousedown",this.cancel_event)
								)
							)
						)
					)
					.append(
						this.D("SPHelpSectionDiv")
						.append(
							this.D("SPHelpColorInputDiv0")
							.append(
								this.D("SPHelpColorInputDiv2b")
								.append(
									this.D("SPHelpColorLabelText")
									.html("On Load")
								)
							)
						)
						.append(
							this.D("SPHelpColorInputDiv1Full")
							.append(
								this.D("SPHelpColorInputDiv2")
								.append(
									this.E("a","SPHelpModeLink")
									.html(this.playlist_play_on_load_settings[this.playlist_play_on_load])
									.on("click."+this.namespace,{media_player:this},this.on_playlist_onload_change)
									.on("mousedown",this.cancel_event)
								)
							)
						)
					)
					.append(
						this.D("SPHelpSectionDiv")
						.append(
							this.D("SPHelpColorInputDiv0")
							.append(
								this.D("SPHelpColorInputDiv2b")
								.append(
									this.D("SPHelpColorLabelText")
								)
							)
						)
						.append(
							this.D("SPHelpColorInputDiv1Full")
							.append(
								this.D("SPHelpColorInputDiv2")
								.append(
									this.E("a","SPHelpModeLink")
									.html(this.playlist_scrollto_onload?"Scroll to in playlist":"Don't scroll playlist")
									.on("click."+this.namespace,{media_player:this},this.on_playlist_scrollto_change)
									.on("mousedown",this.cancel_event)
								)
							)
						)
					)
					.append(
						this.D("SPHelpSectionDiv")
						.append(
							this.D("SPHelpColorInputDiv0")
							.append(
								this.D("SPHelpColorInputDiv2b")
								.append(
									this.D("SPHelpColorLabelText")
									.html("YT Quality")
								)
							)
						)
						.append(
							this.D("SPHelpColorInputDiv1Full")
							.append(
								this.D("SPHelpColorInputDiv2")
								.append(
									this.E("a","SPHelpModeLink")
									.html(this.ytvideo_qualities[this.ytvideo_quality_index])
									.on("click."+this.namespace,{media_player:this},this.on_ytquality_change)
									.on("mousedown",this.cancel_event)
								)
							)
						)
					)
					.append(
						this.D("SPHelpLabelDiv")
						.html("Player Settings")
					)
					.append(
						(help_custom_div=this.D("SPHelpSectionDiv"))
						.append(
							this.D("SPHelpColorInputDiv0")
							.append(
								this.D("SPHelpColorInputDiv2b")
								.append(
									this.D("SPHelpColorLabelText")
									.html("Theme")
								)
							)
						)
						.append(
							this.D("SPHelpColorInputDiv1Full")
							.append(
								this.D("SPHelpColorInputDiv2")
								.append(
									(this.player_theme_name=this.E("a","SPHelpModeLink"))
									.on("click."+this.namespace,{media_player:this},this.on_player_theme_change)
									.on("mousedown",this.cancel_event)
								)
							)
						)
						.append(
							this.D("SPHelpColorInputDiv0")
							.append(
								this.D("SPHelpColorInputDiv2b")
								.append(
									this.D("SPHelpColorLabelText")
									.html("Player Graphics")
								)
							)
						)
						.append(
							this.D("SPHelpColorInputDiv1Full")
							.append(
								this.D("SPHelpColorInputDiv2")
								.append(
									this.E("a","SPHelpModeLink")
									.on("click."+this.namespace,{media_player:this},this.on_player_use_svg_update)
									.on("mousedown",this.cancel_event)
									.html(this.use_svg?"Allowed":"Disallowed")
								)
							)
						)
					)
					.append(
						this.D("SPHelpLabelDiv")
						.html("Scaling Settings")
					)
					.append(this.generate_value_editor("Padding","padding_scale",this.css.css_size_presets[this.css.preset].padding_scale,false))
					.append(this.generate_value_editor("Text","font_scale",this.css.css_size_presets[this.css.preset].font_scale,false))
					.append(this.generate_value_editor("Borders","border_scale",this.css.css_size_presets[this.css.preset].border_scale,false))
					.append(this.generate_value_editor("Window","@scale_factor",this.scale_factor,false))
					.append(
						this.D("SPHelpLinkDiv")
						.append(
							this.D("SPHelpLabelDiv")
							.html("More Settings")
						)
						.append(
							this.D("SPHelpSectionDiv")
							.append(
								this.E("A","SPHelpTextLink")
								.html("Color Settings")
								.on("click."+this.namespace,{media_player:this,help_page:1},this.on_helppage_goto)
							)
							.append(
								this.E("A","SPHelpTextLink")
								.html("Other Settings")
								.on("click."+this.namespace,{media_player:this,help_page:2},this.on_helppage_goto)
							)
						)
					)
				)
				.append(
					(this.help_container[1]=this.D("SPHelpContainer"))
					.css("display","none")
					.append(this.D("SPHelpLabelDiv").html("Background Colors"))
					.append(this.generate_color_editor("Outline","bg_outer_color",this.css.css_color_presets[this.css.preset].bg_outer_color))
					.append(this.generate_color_editor("Lightest","bg_color_lightest",this.css.css_color_presets[this.css.preset].bg_color_lightest))
					.append(this.generate_color_editor("Light","bg_color_light",this.css.css_color_presets[this.css.preset].bg_color_light))
					.append(this.generate_color_editor("Medium","bg_color_dark",this.css.css_color_presets[this.css.preset].bg_color_dark))
					.append(this.generate_color_editor("Dark","bg_color_darker",this.css.css_color_presets[this.css.preset].bg_color_darker))
					.append(this.generate_color_editor("Darkest","bg_color_darkest",this.css.css_color_presets[this.css.preset].bg_color_darkest))
					.append(this.D("SPHelpLabelDiv").html("Text Colors"))
					.append(this.generate_color_editor("Default","color_standard",this.css.css_color_presets[this.css.preset].color_standard))
					.append(this.generate_color_editor("Disabled","color_disabled",this.css.css_color_presets[this.css.preset].color_disabled))
					.append(this.generate_color_editor("Light","color_light",this.css.css_color_presets[this.css.preset].color_light))
					.append(this.generate_color_editor("Special 1","color_special_1",this.css.css_color_presets[this.css.preset].color_special_1))
					.append(this.generate_color_editor("Special 2","color_special_2",this.css.css_color_presets[this.css.preset].color_special_2))
					.append(this.generate_color_editor("Highlight","color_highlight_light",this.css.css_color_presets[this.css.preset].color_highlight_light))
					.append(this.D("SPHelpLabelDiv").html("Other Colors"))
					.append(this.generate_color_editor("Volume","volume_colors[0]",this.css.css_color_presets[this.css.preset].volume_colors[0]))
				)
				.append(
					(this.help_container[2]=this.D("SPHelpContainer"))
					.css("display","none")
					.append(this.D("SPHelpLabelDiv").html("Borders"))
					.append(this.generate_value_editor("Outer","bg_outer_size",this.css.css_size_presets[this.css.preset].bg_outer_size,false))
					.append(this.D("SPHelpLabelDiv").html("Border Radii"))
					.append(this.generate_value_editor("Outer","bg_outer_border_radius",this.css.css_size_presets[this.css.preset].bg_outer_border_radius,false))
					.append(this.generate_value_editor("Inner","bg_inner_border_radius",this.css.css_size_presets[this.css.preset].bg_inner_border_radius,false))
					.append(this.generate_value_editor("Major","border_radius_normal",this.css.css_size_presets[this.css.preset].border_radius_normal,false))
					.append(this.generate_value_editor("Minor","border_radius_small",this.css.css_size_presets[this.css.preset].border_radius_small,false))
					.append(this.D("SPHelpLabelDiv").html("Fonts"))
					.append(this.generate_value_editor("Font","main_font",this.css.css_size_presets[this.css.preset].main_font,true))
					.append(this.generate_value_editor("Controls","controls_font",this.css.css_size_presets[this.css.preset].controls_font,true))
					.append(this.D("SPHelpLabelDiv").html("Font Sizes"))
					.append(this.generate_value_editor("Default","font_size",this.css.css_size_presets[this.css.preset].font_size,false))
					.append(this.generate_value_editor("Small","font_size_small",this.css.css_size_presets[this.css.preset].font_size_small,false))
					.append(this.generate_value_editor("Controls","font_size_controls",this.css.css_size_presets[this.css.preset].font_size_controls,false))
				)
				.append(
					(this.first_run_container=this.D("SPFirstRunContainer"))
					.append(
						this.D("SPFirstRunLabel")
						.html("Info")
					)
					.append(
						this.D("SPFirstRunTextContainer")
						.append(
							"This player can play embedded sound files in images "+
							"as well as Youtube videos. Scroll to the "
						)
						.append(
							this.E("a")
							.attr("href","#")
							.html("bottom")
						)
						.on("click."+this.namespace,{media_player:this},function(event){
							event.data.media_player.first_run_container.scrollTop(
								event.data.media_player.first_run_container.outerHeight()
								-(event.data.media_player.first_run_container.attr("scrollHeight")||0)
							);
							return false;
						})
						.append(
							" for a link to exit this page."
						)
					)
					.append(
						this.D("SPFirstRunLabel")
						.html("Player")
					)
					.append(
						this.D("SPFirstRunTextContainer")
						.append(
							this.D()
							.css("padding-bottom","0.5em")
							.html("To move, click and drag on the title bar.")
						)
						.append(
							this.D()
							.css("padding-bottom","0.5em")
							.html("To resize, click and drag any edge.")
						)
						.append(
							this.D()
							.css("padding-bottom","0.5em")
							.html("To resize the image/video, click and drag it.")
						)
						.append(
							this.D()
							.html("There are additional (hidden) buttons on the right "+
							"and left sides of the title bar.")
						)
					)
					.append(
						this.D("SPFirstRunLabel")
						.html("Playlist")
					)
					.append(
						this.D("SPFirstRunTextContainer")
						.append(
							this.D()
							.css("padding-bottom","0.5em")
							.html(
								"You can add media to the player by either "+
								"clicking on inline media URLs/[tags], or "+
								"clicking and dragging images/urls into the player "+
								"from your browser or computer."
							)
						)
						.append(
							this.D()
							.html(
								"Once the media has been loaded, it will appear in "+
								"the playlist. To remove, change order, or save the source, "+
								"hover over the right side of the playlist item for controls."
							)
						)
					)
					.append(
						this.D("SPFirstRunLabel")
						.html("Customization")
					)
					.append(
						this.D("SPFirstRunTextContainer")
						.append(
							this.D()
							.css("padding-bottom","0.5em")
							.html(
								"There are 3 settings tabs available for customizing the "+
								"player. Access them by clicking [S] in the top left."
							)
						)
						.append(
							this.D()
							.html(
								"For simplicity, there are 4 preset stylesheets that you "+
								"can switch between. If you edit the settings, it will be "+
								"saved as a new custom stylesheet."
							)
						)
					)
					.append(
						this.D("SPFirstRunLabel")
						.html("Broken?")
					)
					.append(
						this.D("SPFirstRunTextContainer")
						.append(
							this.D()
							.css("padding-bottom","0.5em")
							.html(
								"If you mess up some customization settings such that "+
								"your player isn't properly useable anymore, close the player, "+
								"then click the \"Reload\" link next to the [ Media Player ] "+
								"link at the top of the page."
							)
						)
						.append(
							this.D()
							.html(
								"(By default this option is hidden; hover over the right bracket "+
								"to make it appear.)"
							)
						)
					)
					.append(
						this.D("SPFirstRunLabel")
						.html("Done")
					)
					.append(
						this.E("a","SPFirstRunExitLink")
						.attr("href","#")
						.on("click."+this.namespace,{media_player:this},this.on_firstrun_page_exit_click)
						.html("Exit Page")
					)
				)
			)
			.append(
				(this.footer_container=this.D("SPFooterBarContainer"))
			)
			.append(
				(this.alert_container=this.D("SPAlertContainer"))
				.css("display","none")
				.append(
					(this.D("SPAlertContentContainer")
					.html("Drop Files<br />Here"))
				)
			)
		)
	);
	this.createPlaybackControls();
	if(this.additional_options.length>0){
		var next_div;
		help_custom_div.after(
			(next_div=this.D("SPHelpLabelDiv"))
			.html("Other Settings")
		);
		help_custom_div=next_div;
		for(var i=0;i<this.additional_options.length;++i){
			var v_id=0;
			for(var j=0;j<this.additional_options[i]["values"].length;++j){
				if(this.additional_options[i]["current"]==this.additional_options[i]["values"][j]){
					v_id=j;
					break;
				}
			}
			help_custom_div.after(
				(next_div=this.D("SPHelpSectionDiv"))
				.append(
					this.D("SPHelpColorInputDiv0")
					.append(
						this.D("SPHelpColorInputDiv2b")
						.append(
							this.D("SPHelpColorLabelText")
							.html(this.additional_options[i]["label"])
						)
					)
				)
				.append(
					this.D("SPHelpColorInputDiv1Full")
					.append(
						this.D("SPHelpColorInputDiv2")
						.append(
							this.E("a","SPHelpModeLink")
							.html(this.additional_options[i]["descr"][v_id])
							.on("click."+this.namespace,{media_player:this,custom_data:this.additional_options[i]},this.on_custom_option_click)
							.on("mousedown",this.cancel_event)
						)
					)
				)
			);
			help_custom_div=next_div;
		}
	}
	if(!this.first_run){
		this.first_run_container.css("display","none");
	}
	for(var i=0;i<title_buttons.length;++i){
		title_buttons[i].on("mousedown",this.cancel_event);
		title_buttons[i].on("click."+this.namespace,{media_player:this,control_id:i},this.on_main_control_click);
	}
	for(var i=0;i<this.resizing_texts.length;++i){
		this.resizing_texts[i].css("display","none");
	}
	this.update_player_theme_name({media_player:this});
	this.set_volume(this.volume);
	this.audio[0].volume=this.volume;
	this.reposition();
	this.created=true;
}
MediaPlayer.prototype.destroy=function(){
	while(this.playlist.length>0){
		this.remove(0);
	}
	if(this.sp_container_main!=null)this.sp_container_main.remove();
	$(window)
	.off("resize."+this.namespace);
	$(document)
	.off("mouseup."+this.namespace)
	.off("mousemove."+this.namespace);
	this.nullify();
	this.created=false;
}
MediaPlayer.prototype.focus=function(){
	var open=false;
	this.playlist_container.css("display",(open?"none":""));
	this.top_container.css("display",(open?"none":""));
	for(var i=0;i<this.help_container.length;++i){
		this.help_container[i].css("display","none");
	}
	this.reposition();
}
MediaPlayer.prototype.on_custom_option_click=function(event){
	var v_id=0;
	for(var j=0;j<event.data.custom_data["values"].length;++j){
		if(event.data.custom_data["current"]==event.data.custom_data["values"][j]){
			v_id=j;
			break;
		}
	}
	v_id=(v_id+1)%event.data.custom_data["values"].length;
	$(this).html(event.data.custom_data["descr"][v_id]);
	event.data.custom_data["current"]=event.data.custom_data["values"][v_id];
	event.data.custom_data["change"](event.data.custom_data["values"][v_id]);
}
MediaPlayer.prototype.play=function(){
	if(this.current_media!==null){
		if(this.current_media.type=="image-audio"){
			this.audio[0].play();
		}
		else if(this.current_media.type=="youtube-video"){
			if(this.ytvideo_player!=null){
				if(this.ytvideo_unsafe){
					_unsafe_exec(function(data){
						if(data.media_player.ytvideo_player.playVideo)data.media_player.ytvideo_player.playVideo();
					},{media_player:this});
				}
				else{
					if(this.ytvideo_player.playVideo)this.ytvideo_player.playVideo();
				}
			}
			if(this.current_media.progress_timer===null){
				var self=this;
				var playlist_item=this.current_media;
				this.current_media.progress_timer=setInterval(function(){
					self.on_ytvideo_time_update(playlist_item,self);
				},500);
			}
		}
		else{
			console.log(this.current_media.type);
		}
	}
	this.update_playing_status();
}
MediaPlayer.prototype.pause=function(){
	if(this.current_media!==null){
		if(this.current_media.type=="image-audio"){
			this.audio[0].pause();
		}
		else if(this.current_media.type=="youtube-video"){
			if(this.ytvideo_player!=null){
				if(this.ytvideo_unsafe){
					_unsafe_exec(function(data){
						if(data.media_player.ytvideo_player.pauseVideo)data.media_player.ytvideo_player.pauseVideo();
					},{media_player:this});
				}
				else{
					if(this.ytvideo_player.pauseVideo)this.ytvideo_player.pauseVideo();
				}
			}
			if(this.current_media.progress_timer!==null){
				clearInterval(this.current_media.progress_timer);
				this.current_media.progress_timer=null;
			}
			this.on_ytvideo_time_update(this.current_media,this);
		}
		else{
			console.log(this.current_media.type);
		}
	}
	this.update_playing_status();
}
MediaPlayer.prototype.is_paused=function(){
	if(this.current_media!==null){
		if(this.current_media.type=="image-audio"){
			return this.audio[0].paused;
		}
		else if(this.current_media.type=="youtube-video"){
			if(this.ytvideo_player!=null){
				if(this.ytvideo_unsafe){
					return _unsafe_exec(function(data){
						return(
							data.media_player.ytvideo_player.getPlayerState&&
							(data.media_player.ytvideo_player.getPlayerState()!=window.YT.PlayerState.BUFFERING&&
							data.media_player.ytvideo_player.getPlayerState()!=window.YT.PlayerState.PLAYING)
						);
					},{media_player:this})||false;
				}
				else{
					return(
						this.ytvideo_player.getPlayerState&&
						(this.ytvideo_player.getPlayerState()!=unsafeWindow.YT.PlayerState.BUFFERING&&
						this.ytvideo_player.getPlayerState()!=unsafeWindow.YT.PlayerState.PLAYING)
					);
				}
			}
		}
		else{
			console.log(this.current_media.type);
		}
	}
	return true;
}
MediaPlayer.prototype.get_position=function(seconds){
	if(this.current_media!==null){
		if(this.current_media.type=="image-audio"||this.current_media.type=="youtube-video"){
			return this.current_media.position;
		}
		else{
			console.log(this.current_media.type);
		}
	}
	return 0.0;
}
MediaPlayer.prototype.seek_to=function(seconds,dont_seek_in_media,dragging){
	if(this.current_media!==null){
		if(this.current_media.type=="image-audio"){
			if(seconds!==null){
				if(seconds<0.0)seconds=0.0;
				else if(seconds>this.current_media.duration)seconds=this.current_media.duration;
				this.current_media.position=seconds;
			}
			if(!dont_seek_in_media){
				this.audio[0].currentTime=this.current_media.position;
			}
			if(this.current_media.duration!=0.0){
				this.seek_time_current_label.html(this.duration_to_string(this.current_media.position));
				this.seek_bar_mover.width((this.current_media.position/this.current_media.duration)*(this.seek_bar_container.outerWidth()-this.seek_bar.outerWidth()));
			}
		}
		else if(this.current_media.type=="youtube-video"){
			if(seconds!==null){
				if(seconds<0.0)seconds=0.0;
				else if(seconds>this.current_media.duration)seconds=this.current_media.duration;
				this.current_media.position=seconds;
			}
			if(!dont_seek_in_media&&this.ytvideo_player!=null){
				if(this.ytvideo_unsafe){
					_unsafe_exec(function(data){
						if(data.media_player.ytvideo_player.seekTo)data.media_player.ytvideo_player.seekTo(data.media_player.current_media.position,data.arg2);
					},{media_player:this,arg2:(dragging?false:true)});
				}
				else{
					if(this.ytvideo_player.seekTo)this.ytvideo_player.seekTo(this.current_media.position,dragging?false:true);
				}
			}
			if(this.current_media.duration!=0.0){
				this.seek_time_current_label.html(this.duration_to_string(this.current_media.position));
				this.seek_bar_mover.width((this.current_media.position/this.current_media.duration)*(this.seek_bar_container.outerWidth()-this.seek_bar.outerWidth()));
			}
		}
		else{
			console.log(this.current_media.type);
		}
	}
}
MediaPlayer.prototype.get_volume=function(){
	return this.volume;
}
MediaPlayer.prototype.set_volume=function(volume){
	if(volume<0.0)volume=0.0;
	else if(volume>1.0)volume=1.0;
	this.volume=volume;
	var vol_str,vol_col;
	vol_str=Math.round(this.volume*100)+"%";
	vol_col=this.get_volume_color(this.volume);
	this.volume_label.html(vol_str);
	this.volume_bar.css("height",vol_str);
	this.volume_bar.css("background","rgb("+vol_col[0]+","+vol_col[1]+","+vol_col[2]+")");
	if(this.current_media!==null){
		if(this.current_media.type=="image-audio"){
			this.audio[0].volume=this.volume;
		}
		else if(this.current_media.type=="youtube-video"){
			if(this.ytvideo_player!=null){
				if(this.ytvideo_unsafe){
					_unsafe_exec(function(data){
						if(data.media_player.ytvideo_player.setVolume)data.media_player.ytvideo_player.setVolume(data.vol);
					},{media_player:this,vol:this.volume*100.0});
				}
				else{
					if(this.ytvideo_player.setVolume)this.ytvideo_player.setVolume(this.volume*100.0);
				}
			}
		}
		else{
			console.log(this.current_media.type);
		}
	}
}
MediaPlayer.prototype.get_duration=function(duration){
	if(this.current_media!==null){
		if(this.current_media.type=="image-audio"||this.current_media.type=="youtube-video"){
			return this.current_media.duration;
		}
		else{
			console.log(this.current_media.type);
		}
	}
}
MediaPlayer.prototype.set_duration=function(duration){
	var length_str=this.duration_to_string(duration);
	if(this.current_media!==null){
		if(this.current_media.type=="image-audio"||this.current_media.type=="youtube-video"){
			this.current_media.duration=duration;
			this.current_media.info_container.html(length_str);
		}
		else{
			console.log(this.current_media.type);
		}
	}
	this.seek_time_end_label.html(length_str);
}
MediaPlayer.prototype.deselect=function(old_type){
	if(this.current_media!==null){
		this.unC(this.current_media.playlist_item,"SPPlaylistItemActive");
		if(this.current_media.type=="youtube-video"){
			if(this.current_media.progress_timer!==null){
				clearInterval(this.current_media.progress_timer);
				this.current_media.progress_timer=null;
			}
		}
		if(this.current_media.type!==old_type){
			this.stop();
			if(this.current_media.type=="image-audio"){
				this.image.css("display","none");
				this.image.removeAttr("src");
				this.no_image.css("display","");
				this.current_image_width=0;
				this.current_image_height=0;
				this.title.html(this.title_default);
			}
			else if(this.current_media.type=="youtube-video"){
				this.video_container.html("");
				this.ytvideo_player=null;
			}
			else{
				console.log(this.current_media.type);
			}
			for(var i=0;i<this.playback_controls.length;++i){
				for(var j=0;j<this.playback_controls[i].length;++j){
					this.C(this.playback_controls[i][j],"SPControlLinkDisabled");
				}
			}
			this.seek_time_current_label.html(this.duration_to_string(0.0));
			this.seek_time_end_label.html(this.duration_to_string(0.0));
			this.current_media=null;
			this.set_loaded();
			this.title.html(this.title_default);
			this.update_index_display(-1,this.playlist.length,true);
		}
	}
}
MediaPlayer.prototype.stop=function(){
	if(this.current_media!==null){
		if(this.current_media.type=="image-audio"||this.current_media.type=="youtube-video"){
			if(!this.is_paused())this.pause();
			this.seek_to(0.0);
		}
		else{
			console.log(this.current_media.type);
		}
		this.update_playing_status();
	}
}
MediaPlayer.prototype.start=function(index){
	this.deselect(this.playlist[index].type);
	for(var i=0;i<this.playback_controls.length;++i){
		for(var j=0;j<this.playback_controls[i].length;++j){
			this.unC(this.playback_controls[i][j],"SPControlLinkDisabled");
		}
	}
	this.current_media=this.playlist[index];
	this.C(this.current_media.playlist_item,"SPPlaylistItemActive");
	this.seek_time_current_label.html(this.duration_to_string(this.current_media.position));
	this.seek_time_end_label.html(this.duration_to_string(this.current_media.duration));
	this.scroll_to(index);
	if(this.current_media.type=="image-audio"){
		this.title.html(this.current_media.title);
		this.audio.attr("src",this.current_media.audio_blob_url);
		this.audio[0].play();
		this.current_media.position=0.0;
		this.seek_to(this.current_media.position,true);
		this.set_loaded();
		this.no_image.css("display","none");
		this.image.css("display","none");
		this.image.removeAttr("src");
		this.image.attr("src",this.current_media.image_url);
	}
	else if(this.current_media.type=="youtube-video"){
		this.title.html(this.current_media.title);
		if(this.ytvideo_player!=null&&this.ytvideo_html5){
			var params={
				mediaContentUrl:"http://www.youtube.com/v/"+this.current_media.vid_id+"?version=3",
				startSeconds:this.current_media.start,
				suggestedQuality:this.ytvideo_qualities[this.ytvideo_quality_index]
			};
			var okay=false;
			if(this.ytvideo_unsafe){
				okay=_unsafe_exec(function(data){
					if(data.media_player.ytvideo_player.cueVideoByUrl){
						data.media_player.ytvideo_player.cueVideoByUrl(data.params);
						return true;
					}
					return false;
				},{media_player:this,"params":params});
			}
			else{
				if(this.ytvideo_player.cueVideoByUrl){
					okay=true;
					this.ytvideo_player.cueVideoByUrl(params);
				}
			}
			if(okay)this.play();
			else this.ytvideo_player=null;
		}
		else{
			this.ytvideo_player=null;
		}
		if(this.ytvideo_player==null){
			var fn=function(data){
				try{
					var events={
						"onReady":function(event){data.media_player.on_ytvideo_ready(event,data.media_player);},
						"onStateChange":function(event){data.media_player.on_ytvideo_state_change(event,data.media_player);},
						"onPlaybackQualityChange":function(event){data.media_player.on_ytvideo_playback_quality_change(event,data.media_player);},
						"onPlaybackRateChange":function(event){data.media_player.on_ytvideo_playback_rate_change(event,data.media_player);},
						"onError":function(event){data.media_player.on_ytvideo_error(event,data.media_player);},
						"onApiChange":function(event){data.media_player.on_ytvideo_api_change(event,data.media_player);}
					};
					var playerVars={
						controls:0,
						showinfo:0,
						modestbranding:1,
						html5:1,
						disablekb:1,
						enablejsapi:1,
						rel:0,
						showinfo:0,
						origin:window.location.href.toString(),
						start:data.media_player.current_media.start,
						iv_load_policy:3,
						loop:0
					};
					data.media_player.ytvideo_player=new data.Player(
						data.vid_container,
						{
							width:data.size[0],
							height:data.size[1],
							videoId:data.media_player.current_media.vid_id,
							"playerVars":playerVars,
							"events":events
						}
					);
					data.media_player.ytvideo_player.media_player=data.media_player;
				}
				catch(e){
					data.media_player.ytvideo_player=null;
					console.log(e);
				}
			}
			var vid_container;
			var div_id="MediaPlayer_LFfiowjdiofjagh8fwe";
			this.video_container.html((vid_container=this.D().attr("id",div_id)));
			var params={
				"media_player":this,
				"size":[this.video_container.outerWidth(),this.video_container.outerHeight()],
				"div_id":div_id,
				"vid_container":vid_container[0],
				"Player":unsafeWindow.YT.Player
			};
			this.ytvideo_html5=true;
			if(this.ytvideo_unsafe){
				try{
					_unsafe_exec(fn,params);
				}
				catch(e){
					console.log("ytvideo_unsafe");
					console.log(e);
				}
			}
			else{
				fn(params);
			}
		}
		this.current_media.position=0.0;
		this.seek_to(this.current_media.position,true);
		this.set_loaded(0.0,0.0);
	}
	else{
		console.log(this.current_media.type);
	}
	this.update_index_display(index,this.playlist.length,true);
}
MediaPlayer.prototype.scroll_to=function(index){
	var a,b;
	if(
		(a=this.playlist[index].playlist_item.offset().top)<(b=this.playlist_container.offset().top)||
		(a=this.playlist[index].playlist_item.offset().top+this.playlist[index].playlist_item.outerHeight())>(b=this.playlist_container.offset().top+this.playlist_container.outerHeight())
	){
		this.playlist_container.scrollTop(this.playlist_container.scrollTop()+(a-b));
	}
}
MediaPlayer.prototype.next=function(follow_policy){
	if(this.playlist_randomize&&follow_policy){
		var i=0;
		if(this.playlist.length>1){
			i=Math.floor(Math.random()*(this.playlist.length-1));
		}
		if(i==this.current_media.index){
			i=(i+1)%this.playlist.length;
		}
		this.start(i);
	}
	else if(!follow_policy||this.playlist_loop||this.current_media.index<this.playlist.length-1){
		this.start((this.current_media.index+1)%this.playlist.length);
	}
}
MediaPlayer.prototype.previous=function(){
	if(this.playlist_randomize){
		var i=0;
		if(this.playlist.length>1){
			i=Math.floor(Math.random()*(this.playlist.length-1));
		}
		if(i==this.current_media.index){
			i=(i+1)%this.playlist.length;
		}
		this.start(i);
	}
	else{
		this.start((this.current_media.index-1+this.playlist.length)%this.playlist.length);
	}
}
MediaPlayer.prototype.set_loaded=function(offset,percent){
	if(this.current_media!==null){
		if(offset!==undefined){
			if(offset<0.0)offset=0.0;
			else if(offset>1.0)offset=1.0;
			if(this.current_media.type=="image-audio"||this.current_media.type=="youtube-video"){
				this.current_media.loaded_offset=offset;
			}
			else{
				console.log(this.current_media);
			}
			if(percent===undefined)percent=this.get_loaded_percent();
		}
		else{
			offset=this.get_loaded_offset();
		}
		if(percent!==undefined){
			if(percent<0.0)percent=0.0;
			else if(percent>1.0-offset)percent=1.0-offset;
			if(this.current_media.type=="image-audio"||this.current_media.type=="youtube-video"){
				this.current_media.loaded_percent=percent;
			}
			else{
				console.log(this.current_media);
			}
		}
		else{
			percent=this.get_loaded_percent();
		}
	}
	else{
		percent=0.0;
		offset=0.0;
	}
	var w=this.load_percent_bar_container.outerWidth();
	this.load_percent_bar_mover.width(offset*w);
	this.load_percent_bar.width(percent*w);
}
MediaPlayer.prototype.get_loaded_offset=function(){
	if(this.current_media!==null){
		if(this.current_media.type=="image-audio"||this.current_media.type=="youtube-video"){
			return this.current_media.loaded_offset;
		}
		else{
			console.log(this.current_media);
		}
	}
	return 0.0;
}
MediaPlayer.prototype.get_loaded_percent=function(){
	if(this.current_media!==null){
		if(this.current_media.type=="image-audio"||this.current_media.type=="youtube-video"){
			return this.current_media.loaded_percent;
		}
		else{
			console.log(this.current_media);
		}
	}
	return 0.0;
}
MediaPlayer.prototype.remove=function(index){
	if(this.current_media!=null&&this.current_media.index==index)this.deselect();
	if(this.playlist[index].type=="image-audio"){
		if(this.playlist[index].temp_audio){
			this.playlist[index].temp_audio[0].pause();
			this.playlist[index].temp_audio.removeAttr("src").remove();
			this.playlist[index].temp_audio=null;
		}
		(window.webkitURL||window.URL).revokeObjectURL(this.playlist[index].audio_blob_url);
		if(this.playlist[index].image_url_blob!=null){
			(window.webkitURL||window.URL).revokeObjectURL(this.playlist[index].image_url_blob);
		}
	}
	else if(this.playlist[index].type=="youtube-video"){
	}
	else{
		console.log(this.playlist[index].type);
	}
	this.playlist[index].playlist_item.remove();
	this.playlist.splice(index,1);
	for(var i=0;i<this.playlist.length;++i){
		this.playlist[i].index=i;
	}
	this.update_index_display((this.current_media!=null?this.current_media.index:-1),this.playlist.length,true);
}
MediaPlayer.prototype.nullify=function(){
	this.sp_container_main=null;
	this.sp_container=null;
	this.alert_container=null;
	this.title=null;
	this.image_container=null;
	this.image=null;
	this.no_image=null;
	this.audio=null;
	this.volume_bar=null;
	this.volume_label=null;
	this.volume_container=null;
	this.volume_bar_container=null;
	this.seek_time_start_label=null;
	this.seek_time_end_label=null;
	this.seek_time_current_label=null;
	this.seek_bar_container=null;
	this.seek_bar_mover=null;
	this.seek_bar=null;
	this.playlist_container=null;
	this.playback_controls=null;
	this.playback_controls_svg=null;
	this.help_container=null;
	this.content_container=null;
	this.top_container=null;
	this.footer_container=null;
	this.playback_control_container=null;
	this.player_theme_name=null;
	this.video_container=null;
	this.video_mask=null;
	this.ytvideo_player=null;
	this.load_percent_bar_container=null;
	this.load_percent_bar_mover=null;
	this.load_percent_bar=null;
	this.resizing_container=null;
	this.resizing_controls=null;
	this.resizing_texts=null;
	this.first_run_container=null;
	this.playlist_index_container=null;
	this.playlist_index_text1=null;
	this.playlist_index_text2=null;
	if(this.playlist_index_timer!==null){
		clearTimeout(this.playlist_index_timer);
		this.playlist_index_timer=null;
	}
	for(var i=0;i<this.resize_timers.length;++i){
		if(this.resize_timers[i]!==null){
			if(i==2){
				clearInterval(this.resize_timers[i]);
			}
			else{
				clearTimeout(this.resize_timers[i]);
			}
			this.resize_timers[i]=null;
		}
	}
	this.player_theme_value_updaters=null;
}
MediaPlayer.prototype.createPlaybackControls=function(){
	this.playback_control_container.html("");
	this.playback_controls=[[null],[null],[null,null],[null],[null]];
	this.playback_controls_svg=null;
	if(this.use_svg){
		this.playback_controls_svg=[[null],[null],[null,null],[null],[null]]
		for(var i=0;i<this.playback_controls.length;++i){
			if(i>0)this.playback_control_container.append(this.D("SPControlLinkSeparator"));
			for(var j=0;j<this.playback_controls[i].length;++j){
				this.playback_control_container.append(
					(this.playback_controls[i][j]=this.D("SPControlLinkSvgContainer","SPControlLinkDisabled"))
				);
				if(j>0)this.playback_controls[i][j].css("display","none");
				var svg_finder;
				this.playback_controls[i][j].append((svg_finder=this.D("SPControlLinkSvg")));
				var w=svg_finder.outerWidth();
				var h=svg_finder.outerHeight();
				svg_finder.svg();
				this.playback_controls_svg[i][j]=svg_finder.svg("get");
				var html_svg=$(svg_finder.contents()[0]);
				html_svg.attr("width",w);
				html_svg.attr("height",h);
				var g=this.playback_controls_svg[i][j].group({
					"class":"SPControlLinkSvgMainGroup",
					"transform":"scale("+w+","+h+")"
				});
				if(i==0){
					this.playback_controls_svg[i][j].rect(g,
						0.125,0.0,0.25,1.0,
						{"class":"SPControlLinkSvgShapeColor"}
					);
					this.playback_controls_svg[i][j].polygon(g,
						[[0.875,0.0],[0.875,1.0],[0.375,0.5]],
						{"class":"SPControlLinkSvgShapeColor"}
					);
				}
				else if(i==1){
					this.playback_controls_svg[i][j].polygon(g,
						[[0.5,0.0],[0.5,1.0],[0.125,0.5]],
						{"class":"SPControlLinkSvgShapeColor"}
					);
					this.playback_controls_svg[i][j].polygon(g,
						[[0.875,0.0],[0.875,1.0],[0.5,0.5]],
						{"class":"SPControlLinkSvgShapeColor"}
					);
				}
				else if(i==2){
					if(j==1){
						this.playback_controls_svg[i][j].rect(g,
							0.125,0.0,0.25,1.0,
							{"class":"SPControlLinkSvgShapeColor"}
						);
						this.playback_controls_svg[i][j].rect(g,
							0.625,0.0,0.25,1.0,
							{"class":"SPControlLinkSvgShapeColor"}
						);
					}
					else{
						this.playback_controls_svg[i][j].polygon(g,
							[[0.25,0.0],[0.25,1.0],[0.75,0.5]],
							{"class":"SPControlLinkSvgShapeColor"}
						);
					}
				}
				else if(i==3){
					this.playback_controls_svg[i][j].polygon(g,
						[[0.125,0.0],[0.125,1.0],[0.5,0.5]],
						{"class":"SPControlLinkSvgShapeColor"}
					);
					this.playback_controls_svg[i][j].polygon(g,
						[[0.5,0.0],[0.5,1.0],[0.875,0.5]],
						{"class":"SPControlLinkSvgShapeColor"}
					);
				}
				else{
					this.playback_controls_svg[i][j].rect(g,
						0.625,0.0,0.25,1.0,
						{"class":"SPControlLinkSvgShapeColor"}
					);
					this.playback_controls_svg[i][j].polygon(g,
						[[0.125,0.0],[0.125,1.0],[0.625,0.5]],
						{"class":"SPControlLinkSvgShapeColor"}
					);
				}
			}
		}
	}
	else{
		this.playback_controls_svg=null;
		var control_texts=[["|&lt;"],["&lt;&lt"],["&gt;","||"],["&gt;&gt;"],["&gt;|"]];
		for(var i=0;i<this.playback_controls.length;++i){
			if(i>0)this.playback_control_container.append(this.D("SPControlLinkSeparator"));
			for(var j=0;j<this.playback_controls[i].length;++j){
				this.playback_control_container.append(
					(this.playback_controls[i][j]=this.E("a","SPControlLink","SPControlLinkDisabled"))
					.html(control_texts[i][j])
				);
				if(j>0)this.playback_controls[i][j].css("display","none");
			}
		}
	}
	for(var i=0;i<this.playback_controls.length;++i){
		for(var j=0;j<this.playback_controls[i].length;++j){
			this.playback_controls[i][j].on("click."+this.namespace,{control_id:i,control_id2:j,media_player:this},this.on_playback_control_click);
			this.playback_controls[i][j].on("mousedown",this.cancel_event);
		}
	}
}
MediaPlayer.prototype.get_audio_duration=function(audio){
	try{
		var d=(isFinite(audio.duration)?audio.duration:audio.buffered.end(0));
		return isFinite(d)?d:0;
	}
	catch(e){
		console.log(e);
	}
	return 0;
}
MediaPlayer.prototype.regen_stylesheet=function(){
	this.head_css.html(this.css.create_stylesheet());
	var vol_col=this.get_volume_color(this.volume);
	this.volume_bar.css("background","rgb("+vol_col[0]+","+vol_col[1]+","+vol_col[2]+")");
}
MediaPlayer.prototype.update_index_display=function(index,count,activate){
	this.playlist_index_text1.html(count==0?"-":(index>=0?(index+1).toString():"-"));
	this.playlist_index_text2.html(count==0?"-":count.toString());
	if(!activate)return;
	this.playlist_index_container.addClass("SPPlaylistIndexContainerActive");
	if(this.playlist_index_timer!==null){
		clearTimeout(this.playlist_index_timer);
		this.playlist_index_timer=null;
	}
	var self=this;
	this.playlist_index_timer=setTimeout(function(){
		self.playlist_index_timer=null;
		self.playlist_index_container.removeClass("SPPlaylistIndexContainerActive");
	},1000);
}
MediaPlayer.prototype.get_volume_color=function(percent){
	if(this.css.get_volume_colors().length<=1)return this.css.get_volume_colors()[0];
	percent*=(this.css.get_volume_colors().length-1);
	var i=Math.min((this.css.get_volume_colors().length-2),Math.floor(percent));
	percent-=i;
	var inv=1.0-percent;
	return[
		Math.round(this.css.get_volume_colors()[i][0]*inv+this.css.get_volume_colors()[i+1][0]*percent),
		Math.round(this.css.get_volume_colors()[i][1]*inv+this.css.get_volume_colors()[i+1][1]*percent),
		Math.round(this.css.get_volume_colors()[i][2]*inv+this.css.get_volume_colors()[i+1][2]*percent)
	];
}
MediaPlayer.prototype.reposition=function(left,top){
	if(left!=undefined){
		this.position_offset[0]=$(window).outerWidth()-(left+this.sp_container_main.outerWidth());
	}
	if(top!=undefined){
		this.position_offset[1]=$(window).outerHeight()-(top+this.sp_container_main.outerHeight());
	}
	var v;
	if(this.position_offset[0]>(v=$(window).outerWidth()-this.sp_container_main.outerWidth()))this.position_offset[0]=v;
	if(this.position_offset[1]>(v=$(window).outerHeight()-this.sp_container_main.outerHeight()))this.position_offset[1]=v;
	if(this.position_offset[0]<0)this.position_offset[0]=0;
	if(this.position_offset[1]<0)this.position_offset[1]=0;
	this.sp_container_main.css({"right":this.position_offset[0],"bottom":this.position_offset[1]});
}
MediaPlayer.prototype.resize_to=function(width,height,is_left,is_top){
	var current_size=[this.sp_container_main.outerWidth(),this.sp_container_main.outerHeight()];
	if(height!==null){
		var playlist_size=[this.playlist_container.outerWidth(),this.playlist_container.outerHeight()];
		var image_size=[this.image_container.outerWidth(),this.image_container.outerHeight()];
		var non_height=current_size[1]-playlist_size[1]-image_size[1];
		var playlist_height_target=height-(non_height+this.image_height_max*this.scale_factor);
		if(playlist_height_target<this.playlist_height_min*this.scale_factor){
			playlist_height_target=this.playlist_height_min*this.scale_factor;
		}
		var image_height_target=height-(non_height);
		if(image_height_target>this.image_height_max*this.scale_factor){
			image_height_target=this.image_height_max*this.scale_factor
		}
		if(image_height_target<this.image_height_min*this.scale_factor){
			image_height_target=this.image_height_min*this.scale_factor;
		}
		this.playlist_container.outerHeight(playlist_height_target);
		this.image_container.outerHeight(image_height_target);
		this.playlist_height=playlist_height_target/this.scale_factor;
		this.image_height=image_height_target/this.scale_factor;
		if(!is_top){
			this.position_offset[1]-=(playlist_height_target-playlist_size[1])+(image_height_target-image_size[1]);
		}
	}
	if(width!==null){
		if(width<this.player_width_min*this.scale_factor){
			width=this.player_width_min*this.scale_factor;
		}
		this.player_width=width/this.scale_factor;
		this.sp_container_main.outerWidth(width);
		if(!is_left){
			this.position_offset[0]-=(width-current_size[0]);
		}
	}
	this.sp_container_main.css({"right":this.position_offset[0],"bottom":this.position_offset[1]});
	this.update_image_scale();
	this.set_loaded();
	this.seek_to(null,true);
}
MediaPlayer.prototype.update_playing_status=function(){
	if(!this.seek_exacting&&!this.seek_dragging){
		if(this.is_paused()){
			this.playback_controls[2][0].css("display","");
			this.playback_controls[2][1].css("display","none");
		}
		else{
			this.playback_controls[2][0].css("display","none");
			this.playback_controls[2][1].css("display","");
		}
	}
}
MediaPlayer.prototype.update_scale_factor=function(scale_factor){
	this.scale_factor=scale_factor;
	this.sp_container_main.outerWidth(this.player_width*this.scale_factor);
	this.playlist_container.outerHeight(this.playlist_height*this.scale_factor);
	this.image_container.outerHeight(this.image_height*this.scale_factor);
	this.update_image_scale();
}
MediaPlayer.prototype.update_image_scale=function(){
	var xs=(this.image_container.outerWidth()/this.current_image_width);
	var ys=(this.image_height*this.scale_factor/this.current_image_height);
	if(ys<xs)xs=ys;
	ys=Math.floor(this.current_image_height*xs);
	xs=Math.floor(this.current_image_width*xs);
	this.image.width(xs);
	this.image.height(ys);
	if(this.ytvideo_player!=null&&this.ytvideo_player.setSize){
		var size=[this.video_container.outerWidth(),this.video_container.outerHeight()];
		this.ytvideo_player.setSize(size[0],size[1]);
	}
}
MediaPlayer.prototype.resize_image_container=function(height){
	var image_height_target=height/this.scale_factor;
	if(image_height_target<this.image_height_min)image_height_target=this.image_height_min;
	var playlist_height_target=this.playlist_height-(image_height_target-this.image_height);
	if(playlist_height_target<0){
		image_height_target+=playlist_height_target;
		playlist_height_target=0;
	}
	var update_max=(this.image_height==this.image_height_max||image_height_target>=this.image_height_max);
	this.image_height=image_height_target;
	this.playlist_height=playlist_height_target;
	this.image_height_max=this.image_height;
	this.playlist_container.outerHeight(this.playlist_height*this.scale_factor);
	this.image_container.outerHeight(this.image_height*this.scale_factor);
	this.update_image_scale();
}
MediaPlayer.prototype.update_player_theme_name=function(data){
	data.media_player.player_theme_name.html(data.media_player.css.css_color_presets[data.media_player.css.preset]["@name"]||data.media_player.css.preset);
}
MediaPlayer.prototype.E=function(elem){
	var e=$(document.createElement(elem));
	for(var i=1;i<arguments.length;++i)this.C(e,arguments[i]);
	return e;
}
MediaPlayer.prototype.D=function(){
	var e=$(document.createElement("div"));
	for(var i=0;i<arguments.length;++i)this.C(e,arguments[i]);
	return e;
}
MediaPlayer.prototype.C=function(elem,cls){
	elem.addClass(cls+this.css.css_suffix);
}
MediaPlayer.prototype.unC=function(elem,cls){
	elem.removeClass(cls+this.css.css_suffix);
}
MediaPlayer.prototype.duration_to_string=function(position){
	var seconds_in=Math.round(position);
	var minutes_in=Math.floor(seconds_in/60);
	seconds_in=Math.floor(seconds_in-minutes_in*60);
	var s=minutes_in+":"+(seconds_in>=10?seconds_in:"0"+seconds_in);
	return s;
}
MediaPlayer.prototype.youtube_time_to_number=function(str){
	var time=0;
	while(str.length>0){
		var match=/([0-9]+)([smh$])/.exec(str);
		if(match!=null){
			if(match[2]=="h")time+=parseInt(match[1])*60*60;
			else if(match[2]=="m")time+=parseInt(match[1])*60;
			else time+=parseInt(match[1]);
			str=str.substr(match.index+match[0].length,str.length-(match.index+match[0].length));
		}
		else{
			break;
		}
	}
	return time;
}
MediaPlayer.prototype.string_to_uint8array=function(str){
	var array=new Uint8Array(new ArrayBuffer(str.length));
	for(var i=0;i<str.length;++i){
		array[i]=str.charCodeAt(i);
	}
	return array;
}
MediaPlayer.prototype.arraybuffer_to_uint8array=function(buffer){
	return new Uint8Array(buffer);
}
MediaPlayer.prototype.generate_color_editor=function(label,identifier,value){
	var color_edit;
	var help_input=[null,null,null,null];
	var e=this.D("SPHelpSectionDiv")
		.append(
			this.D("SPHelpColorInputDiv0")
			.append(
				this.D("SPHelpColorInputDiv2b")
				.append(
					(color_edit=this.D("SPHelpColorLabelDisplay"))
				)
				.append(
					this.D("SPHelpColorLabelText")
					.html(label)
				)
			)
		)
		.append(
			this.D("SPHelpColorInputDiv1")
			.append(
				this.D("SPHelpColorInputDiv2")
				.attr("title","Red : [0,255]")
				.append(
					this.D("SPHelpColorInputDiv3")
					.append(
						(help_input[0]=this.E("input","SPHelpColorInput"))
						.attr("type","text")
					)
				)
			)
		)
		.append(
			this.D("SPHelpColorInputDiv1")
			.append(
				this.D("SPHelpColorInputDiv2")
				.attr("title","Green : [0,255]")
				.append(
					this.D("SPHelpColorInputDiv3")
					.append(
						(help_input[1]=this.E("input","SPHelpColorInput"))
						.attr("type","text")
					)
				)
			)
		)
		.append(
			this.D("SPHelpColorInputDiv1")
			.append(
				this.D("SPHelpColorInputDiv2")
				.attr("title","Blue : [0,255]")
				.append(
					this.D("SPHelpColorInputDiv3")
					.append(
						(help_input[2]=this.E("input","SPHelpColorInput"))
						.attr("type","text")
					)
				)
			)
		)
		.append(
			this.D("SPHelpColorInputDiv1")
			.append(
				this.D("SPHelpColorInputDiv2")
				.attr("title","Alpha : [0.0,1.0]")
				.append(
					this.D("SPHelpColorInputDiv3")
					.append(
						(help_input[3]=this.E("input","SPHelpColorInput"))
						.attr("type","text")
					)
				)
			)
		)
	for(var i=0;i<help_input.length;++i){
		help_input[i].val(value[i]);
		help_input[i].on("change."+this.namespace,{media_player:this,color_id:identifier,component:i,color_display:color_edit},this.on_settings_color_change);
	}
	if(value[3]>=1.0){
		color_edit.css("background","rgb("+value[0]+","+value[1]+","+value[2]+")");
	}
	else{
		color_edit.css("background","rgba("+value[0]+","+value[1]+","+value[2]+","+value[3]+")");
	}
	this.player_theme_value_updaters.push([
		true,identifier,help_input[0],help_input[1],help_input[2],help_input[3],color_edit
	]);
	return e;
}
MediaPlayer.prototype.generate_value_editor=function(label,identifier,value,is_string){
	var help_input;
	var e=this.D("SPHelpSectionDiv")
		.append(
			this.D("SPHelpColorInputDiv0")
			.append(
				this.D("SPHelpColorInputDiv2b")
				.append(
					this.D("SPHelpColorLabelText")
					.html(label)
				)
			)
		)
		.append(
			this.D("SPHelpColorInputDiv1Full")
			.append(
				this.D("SPHelpColorInputDiv2")
				.append(
					this.D("SPHelpColorInputDiv3")
					.append(
						(help_input=this.E("input","SPHelpColorInput"))
						.attr("type","text")
						.val(value)
						.on("change."+this.namespace,{media_player:this,value_id:identifier,"is_string":is_string},this.on_settings_value_change)
					)
				)
			)
		)
	if(identifier[0]!="@"){
		this.player_theme_value_updaters.push([
			false,identifier,help_input
		]);
	}
	return e;
}
MediaPlayer.prototype.update_value_fields=function(){
	for(var i in this.player_theme_value_updaters){
		if(this.player_theme_value_updaters[i][0]){
			for(var j=0;j<4;++j){
				this.player_theme_value_updaters[i][2+j].val(this.css.get_value(true,this.player_theme_value_updaters[i][1])[j]);
			}
		}
		else{
			this.player_theme_value_updaters[i][2].val(this.css.get_value(false,this.player_theme_value_updaters[i][1]));
		}
	}
}
MediaPlayer.prototype.add_to_playlist=function(title,tag,flagged,url,sound_index,raw_data,image_src){
	var playlist_item={
		"type":"image-audio",
		"title":title,
		"tag":tag,
		"flagged":flagged,
		"url":url,
		"sound_index":sound_index,
		"index":this.playlist.length,
		"duration":0.0,
		"position":0.0,
		"controls":[null,null,null,null,null],
		"loaded_offset":0.0,
		"loaded_percent":1.0
	};
	var blob=new Blob([raw_data],{type:"audio/ogg"});
	playlist_item.audio_blob_url=(window.webkitURL||window.URL).createObjectURL(blob);
	if(typeof(image_src)==typeof("")){
		playlist_item.image_url=image_src;
		playlist_item.image_url_blob=null;
	}
	else{
		var ext=url.split(".").pop().toLowerCase();
		var mime="image/jpeg"
		if(ext=="png")mime="image/png";
		else if(ext=="gif")mime="image/gif";
		blob=new Blob([image_src],{type:mime});
		playlist_item.image_url_blob=(window.webkitURL||window.URL).createObjectURL(blob);
		playlist_item.image_url=playlist_item.image_url_blob;
	}
	this.playlist_container.append(
		(playlist_item.playlist_item=this.D("SPPlaylistItem"))
		.on("click."+this.namespace,{media_player:this,playlist_item:playlist_item},this.on_playlist_item_click)
		.on("mousedown",this.cancel_event)
		.attr("title",tag!=MediaPlayer.ALL_SOUNDS?tag:"")
		.append(
			this.D("SPPlaylistSoundName")
			.text(playlist_item.title)
		)
		.append(
			(playlist_item.info_container=this.D("SPPlaylistItemInfo"))
			.html(this.duration_to_string(playlist_item.duration))
		)
		.append(
			this.D("SPPlaylistControlsContainer")
			.on("mousedown",this.cancel_event)
			.append(
				this.D("SPPlaylistControls")
				.on("click",this.cancel_event)
				.append(
					(playlist_item.controls[0]=this.E("a","SPPlaylistControlLink"))
					.html("&times;")
					.attr("title","Delete")
				)
				.append(
					this.D("SPPlaylistControlLinkSeparator")
				)
				.append(
					(playlist_item.controls[1]=this.E("a","SPPlaylistControlLink"))
					.html("&uarr;")
					.attr("title","Move up")
				)
				.append(
					this.D("SPPlaylistControlLinkSeparator")
				)
				.append(
					(playlist_item.controls[2]=this.E("a","SPPlaylistControlLink"))
					.html("&darr;")
					.attr("title","Move down")
				)
				.append(
					this.D("SPPlaylistControlLinkSeparator")
				)
				.append(
					(playlist_item.controls[3]=this.E("a","SPPlaylistControlLink"))
					.html("S")
					.attr("title","Save...")
					.attr("href",playlist_item.audio_blob_url)
				)
				.append(
					this.D("SPPlaylistControlLinkSeparator")
				)
				.append(
					(playlist_item.controls[4]=this.E("a","SPPlaylistControlLink"))
					.html("I")
					.attr("title","Image...")
					.attr("href",playlist_item.image_url)
				)
			)
		)
	);
	for(var i=0;i<playlist_item.controls.length;++i){
		playlist_item.controls[i].on("click."+this.namespace,{control_id:i,media_player:this,playlist_item:playlist_item},this.on_playlist_control_click);
		playlist_item.controls[i].on("mousedown",this.cancel_event);
	}
	playlist_item.temp_audio=this.E("audio")
		.css("display","none")
		.attr("src",playlist_item.audio_blob_url)
		.on(
			"durationchange."+this.namespace,
			{"media_player":this,"playlist_item":playlist_item},
			this.on_temp_audio_durationchange
		);
	playlist_item.temp_audio[0].volume=0.0;
	playlist_item.temp_audio[0].play();
	this.playlist.push(playlist_item);
	if(this.playlist_scrollto_onload){
		this.scroll_to(this.playlist.length-1);
	}
	this.update_index_display((this.current_media!=null?this.current_media.index:-1),this.playlist.length,true);
	if(!this.first_run){
		if(
			(this.playlist_play_on_load==1&&this.playlist.length==1)||
			(this.playlist_play_on_load==2&&
				(this.current_media==null||(
					this.current_media.index==this.playlist.length-2&&
					this.current_media.position>=this.current_media.duration-1.0&&
					this.is_paused()
				))
			)||
			(this.playlist_play_on_load==3&&this.is_paused())||
			(this.playlist_play_on_load==4)
		){
			this.start(this.playlist.length-1);
		}
	}
}
MediaPlayer.prototype.add_to_playlist_ytvideo=function(original_url,vid_id,tag,flagged,info_xml){
	var duration=xml_find_nodes_by_name(info_xml,"yt:duration");
	if(duration.length>0){
		duration=duration[0].getAttribute("seconds");
		duration=parseFloat(duration);
		duration=isFinite(duration)?duration:0.0;
	}
	else{
		duration=0.0;
	}
	var start=/[\!\#\?\&]t=[0-9smh]+/.exec(original_url);
	if(start!=null){
		start=this.youtube_time_to_number(start[0].substr(3,start[0].length-3));
	}
	else{
		start=0.0;
	}
	var title;
	try{
		title=$(xml_find_nodes_by_name(info_xml,"title")).text();
	}
	catch(e){
		console.log(e);
		title="Unknown Title";
	}
	var playlist_item={
		"type":"youtube-video",
		"title":title,
		"original_url":original_url,
		"tag":tag,
		"flagged":flagged,
		"vid_id":vid_id,
		"duration":duration,
		"start":start,
		"position":0.0,
		"index":this.playlist.length,
		"controls":[null,null,null,null],
		"progress_timer":null,
		"loaded_offset":0.0,
		"loaded_percent":0.0
	};
	this.playlist_container.append(
		(playlist_item.playlist_item=this.D("SPPlaylistItem"))
		.on("click."+this.namespace,{media_player:this,playlist_item:playlist_item},this.on_playlist_item_click)
		.on("mousedown",this.cancel_event)
		.append(
			this.D("SPPlaylistSoundName")
			.text(playlist_item.title)
		)
		.append(
			(playlist_item.info_container=this.D("SPPlaylistItemInfo"))
			.html(this.duration_to_string(playlist_item.duration))
		)
		.append(
			this.D("SPPlaylistControlsContainer")
			.on("mousedown",this.cancel_event)
			.append(
				this.D("SPPlaylistControls")
				.on("click",this.cancel_event)
				.append(
					(playlist_item.controls[0]=this.E("a","SPPlaylistControlLink"))
					.html("&times;")
					.attr("title","Delete")
				)
				.append(
					this.D("SPPlaylistControlLinkSeparator")
				)
				.append(
					(playlist_item.controls[1]=this.E("a","SPPlaylistControlLink"))
					.html("&uarr;")
					.attr("title","Move up")
				)
				.append(
					this.D("SPPlaylistControlLinkSeparator")
				)
				.append(
					(playlist_item.controls[2]=this.E("a","SPPlaylistControlLink"))
					.html("&darr;")
					.attr("title","Move down")
				)
				.append(
					this.D("SPPlaylistControlLinkSeparator")
				)
				.append(
					(playlist_item.controls[3]=this.E("a","SPPlaylistControlLink"))
					.html("Y")
					.attr("title","Youtube Link")
					.attr("href","//www.youtube.com/watch?v="+playlist_item.vid_id+(playlist_item.start==0.0?"":("&t="+Math.floor(playlist_item.start)+"s")))
				)
			)
		)
	);
	for(var i=0;i<playlist_item.controls.length;++i){
		playlist_item.controls[i].on("click."+this.namespace,{control_id:i,media_player:this,playlist_item:playlist_item},this.on_playlist_control_click);
		playlist_item.controls[i].on("mousedown",this.cancel_event);
	}
	this.playlist.push(playlist_item);
	if(this.playlist_scrollto_onload){
		this.scroll_to(this.playlist.length-1);
	}
	this.update_index_display((this.current_media!=null?this.current_media.index:-1),this.playlist.length,true);
	if(!this.first_run){
		if(
			(this.playlist_play_on_load==1&&this.playlist.length==1)||
			(this.playlist_play_on_load==2&&
				(this.current_media==null||(
					this.current_media.index==this.playlist.length-2&&
					this.current_media.position>=this.current_media.duration-1.0&&
					this.is_paused()
				))
			)||
			(this.playlist_play_on_load==3&&this.is_paused())||
			(this.playlist_play_on_load==4)
		){
			this.start(this.playlist.length-1);
		}
	}
}
MediaPlayer.prototype.ajax_get=function(url,return_as_string,callback_data,progress_callback,done_callback){
	var media_player=this;
	if(this.is_chrome){
		var xhr=new XMLHttpRequest();
		xhr.open("GET",url,true);
		if(!return_as_string)xhr.overrideMimeType("text/plain; charset=x-user-defined");
		xhr.responseType=(return_as_string?"text":"arraybuffer");
		xhr.onload=function(event){
			if(typeof(done_callback)=="function"){
				if(this.status==200){
					done_callback(
						true,
						callback_data,
						(return_as_string?this.response:media_player.arraybuffer_to_uint8array(this.response))
					);
				}
				else{
					done_callback(false,callback_data,null);
				}
			}
		};
		if(typeof(progress_callback)=="function"){
			xhr.onprogress=function(event){
				progress_callback(event,callback_data);
			};
		}
		xhr.send();
	}
	else{
		var arg={
			method:"GET",
			url:url,
			onload:function(event){
				if(typeof(done_callback)=="function"){
					if(event.status==200){
						done_callback(
							true,
							callback_data,
							(return_as_string?event.responseText:media_player.string_to_uint8array(event.responseText))
						);
					}
					else{
						done_callback(false,callback_data,null);
					}
				}
			}
		};
		if(!return_as_string)arg.overrideMimeType="text/plain; charset=x-user-defined";
		if(typeof(progress_callback)=="function"){
			arg.onprogress=function(event){
				progress_callback(event,callback_data);
			};
		}
		GM_xmlhttpRequest(arg);
	}
}
MediaPlayer.prototype.attempt_load=function(url_or_file,load_tag,callback_data,progress_callback,done_callback,status_callback){
	if(typeof(url_or_file)==typeof("")){
		if(this.url_get_youtube_video_id(url_or_file)){
			this.attempt_load_video(url_or_file,load_tag,callback_data,progress_callback,done_callback,status_callback);
			return;
		}
		var media_player=this;
		var dcb=function(okay,callback_data,response){
			if(typeof(done_callback)=="function")done_callback(okay,callback_data);
			if(okay){
				media_player.attempt_load_raw(false,url_or_file,load_tag,response,0,function(status,files){
					if(typeof(status_callback)=="function")status_callback(status,callback_data,files);
				});
			}
		};
		this.ajax_get(url_or_file,false,callback_data,progress_callback,dcb);
	}
	else{
		var reader=new FileReader();
		reader.file=url_or_file;
		reader.load_tag=load_tag;
		reader.media_player=this;
		reader.onload=function(){
			var ui8_data=new Uint8Array(this.result);
			this.media_player.attempt_load_raw(true,this.file.name,this.load_tag,ui8_data,0,function(status,files){
				if(typeof(status_callback)=="function")status_callback(status,callback_data,files);
			});
		}
		reader.readAsArrayBuffer(url_or_file);
	}
}
MediaPlayer.prototype.attempt_load_raw=function(is_local,url_or_filename,load_tag,raw_ui8_data,callback_id,done_callback){
	callback_id=callback_id||0;
	if(callback_id>=this.load_callbacks.length){
		if(typeof(done_callback)=="function")done_callback(false,null);
		return;
	}
	var self=this;
	this.load_callbacks[callback_id](url_or_filename,load_tag,raw_ui8_data,function(r){
		if(r!=null){
			var available=r[0];
			r=r[1];
			if(r!=null){
				for(var j=0;j<r.length;++j){
					self.add_to_playlist(r[j]["title"],load_tag,r[j]["flagged"],url_or_filename,r[j]["index"],r[j]["data"],(is_local?raw_ui8_data:url_or_filename));
				}
			}
			if(typeof(done_callback)=="function")done_callback(true,available);
		}
		else{
			self.attempt_load_raw(is_local,url_or_filename,load_tag,raw_ui8_data,callback_id+1,done_callback);
		}
	});
}
MediaPlayer.prototype.attempt_load_video=function(url,load_tag,callback_data,progress_callback,done_callback,status_callback){
	var vid_id=this.url_get_youtube_video_id(url);
	if(vid_id===null){
		if(typeof(done_callback)=="function")done_callback(false,callback_data);
		return;
	}
	var self=this;
	var info_url="//gdata.youtube.com/feeds/api/videos/"+vid_id;
	this.ajax_get(
		info_url,
		true,
		callback_data,
		progress_callback,
		function(okay,data,response){
			if(typeof(done_callback)=="function")done_callback(okay,callback_data);
			if(okay){
				var xml=$.parseXML(response);
				var status=self.add_to_playlist_ytvideo(url,vid_id,null,false,xml);
				if(typeof(status_callback)=="function")status_callback(status,callback_data,xml);
			}
			else{
			}
		}
	);
}
MediaPlayer.prototype.url_get_youtube_video_id=function(url){
	var youtube_url=new Array();
	youtube_url[0]=/(?:https?:\/\/)?(?:www\.)?youtube.com\/watch\?(?:\S+?)?v=([a-zA-Z0-9_-]{11})(?:[^\s<>]*)/i;
	youtube_url[1]=/(?:https?:\/\/)?(?:www\.)?y2u.be\/([a-zA-Z0-9_-]{11})(?:[^\s<]*)/i;
	youtube_url[2]=/(?:https?:\/\/)?(?:www\.)?youtu.be\/([a-zA-Z0-9_-]{11})(?:[^\s<]*)/i;
	var vid_id=null;
	for(var i=0;i<youtube_url.length;++i){
		var match;
		if((match=youtube_url[i].exec(url))!==null){
			vid_id=match[1];
			break;
		}
	}
	return vid_id;
}
MediaPlayer.prototype.on_ytvideo_time_update=function(playlist_item,media_player){
	if(media_player.ytvideo_player!=null){
		if(media_player.ytvideo_player.getCurrentTime){
			media_player.seek_to(media_player.ytvideo_player.getCurrentTime(),true);
		}
		if(media_player.ytvideo_player.getVideoLoadedFraction){
			media_player.set_loaded(media_player.get_loaded_offset(),media_player.ytvideo_player.getVideoLoadedFraction());
		}
	}
}
MediaPlayer.prototype.on_ytvideo_ready=function(event,media_player){
	event.target.unMute();
	event.target.setVolume(media_player.get_volume()*100.0);
	event.target.setPlaybackQuality(media_player.ytvideo_qualities[media_player.ytvideo_quality_index]);
	media_player.play();
};
MediaPlayer.prototype.on_ytvideo_state_change=function(event,media_player){
	switch(event.data){
		case unsafeWindow.YT.PlayerState.ENDED:
			media_player.update_playing_status();
			media_player.next(true);
		break;
		case unsafeWindow.YT.PlayerState.PLAYING:
			media_player.update_playing_status();
		break;
		case unsafeWindow.YT.PlayerState.PAUSED:
			media_player.update_playing_status();
		break;
		case unsafeWindow.YT.PlayerState.BUFFERING:
			media_player.update_playing_status();
		break;
		case unsafeWindow.YT.PlayerState.CUED:
		break;
	}
};
MediaPlayer.prototype.on_ytvideo_playback_quality_change=function(event,media_player){
};
MediaPlayer.prototype.on_ytvideo_playback_rate_change=function(event,media_player){
};
MediaPlayer.prototype.on_ytvideo_error=function(event,media_player){
	switch(event.data){
		case 2:
		break;
		case 5:
			media_player.ytvideo_html5=false;
		break;
		case 100:
		break;
		case 101:
		case 105:
		break;
	}
};
MediaPlayer.prototype.on_ytvideo_api_change=function(event,media_player){
};
MediaPlayer.prototype.on_main_container_mouseover=function(event){
	event.data.media_player.resize_container_hovered=true;
	event.data.media_player.on_resize_mouse_update(null,null);
}
MediaPlayer.prototype.on_main_container_mouseout=function(event){
	event.data.media_player.resize_container_hovered=false;
	event.data.media_player.on_resize_mouse_update(null,null);
}
MediaPlayer.prototype.on_timer_resize_open=function(){
	this.resize_timers[0]=null;
	this.resize_should_close=false;
	var d;
	$("body").append(d=this.D("SPResizingSizeOff"));
	this.resize_sizes[0]=d.outerWidth();
	d.remove();
	$("body").append(d=this.D("SPResizingSizeAvailable"));
	this.resize_sizes[1]=d.outerWidth();
	d.remove();
	$("body").append(d=this.D("SPResizingContainerText").html("I"));
	this.resize_sizes[2]=d.outerHeight();
	d.remove();
	if(this.resize_sizes[1]>this.resize_sizes[2])this.resize_sizes[1]=this.resize_sizes[2];
	this.resize_side_sizes_target=[this.resize_sizes[1],this.resize_sizes[1],this.resize_sizes[1],this.resize_sizes[1]];
	this.resize_side_sizes_needed=true;
	this.on_resize_mouse_update(null,null);
	if(this.resize_timers[2]===null){
		this.resize_side_sizes=[this.resize_sizes[0],this.resize_sizes[0],this.resize_sizes[0],this.resize_sizes[0]];
		this.sp_container_main.removeClass("SPContainerMainBorders");
		this.resizing_container.css("display","");
		var self=this;
		this.on_interval_resize_update();
		this.resize_timers[2]=setInterval(function(){
			self.on_interval_resize_update();
		},Math.floor(this.resize_wait_times[2]*1000));
	}
}
MediaPlayer.prototype.on_timer_resize_close=function(){
	this.resize_timers[1]=null;
	this.resize_should_close=true;
	this.resize_side_sizes_needed=true;
	this.resize_side_sizes_target=[this.resize_sizes[0],this.resize_sizes[0],this.resize_sizes[0],this.resize_sizes[0]];
	for(var i=0;i<this.resizing_texts.length;++i){
		this.resizing_texts[i].css("display","none");
	}
}
MediaPlayer.prototype.on_interval_resize_update=function(){
	if(this.resize_side_sizes_needed){
		this.resize_side_sizes_needed=false;
		for(var i=0;i<this.resize_side_sizes.length;++i){
			this.resize_side_sizes[i]=this.merge_value_towards(
				this.resize_side_sizes[i],
				this.resize_side_sizes_target[i],
				this.resize_side_speed*this.resize_wait_times[2]
			);
			this.resize_side_sizes_needed=(this.resize_side_sizes_needed||(this.resize_side_sizes[i]!=this.resize_side_sizes_target[i]));
		}
		var css=[
			this.resize_side_sizes[0]+"px",
			this.resize_side_sizes[1]+"px",
			this.resize_side_sizes[2]+"px",
			this.resize_side_sizes[3]+"px"
		];
		this.resizing_container.css({"top":"-"+css[0],"right":"-"+css[1],"bottom":"-"+css[2],"left":"-"+css[3]});
		this.resizing_controls[0].css({"width":css[3],"height":css[0]});
		this.resizing_controls[1].css({"height":css[0],"left":css[3],"right":css[1]});
		this.resizing_controls[2].css({"width":css[1],"height":css[0]});
		this.resizing_controls[3].css({"width":css[3],"top":css[0],"bottom":css[2]});
		this.resizing_controls[4].css({"width":css[1],"top":css[0],"bottom":css[2]});
		this.resizing_controls[5].css({"width":css[3],"height":css[2]});
		this.resizing_controls[6].css({"height":css[2],"left":css[3],"right":css[1]});
		this.resizing_controls[7].css({"width":css[1],"height":css[2]});
	}
	else if(this.resize_should_close){
		clearTimeout(this.resize_timers[2]);
		this.resize_timers[2]=null;
		this.resize_container_border_hovered=false;
		this.sp_container_main.addClass("SPContainerMainBorders");
		this.resizing_container.css("display","none");
		return;
	}
}
MediaPlayer.prototype.on_resize_mouse_update=function(rel_x,rel_y){
	if(rel_x!==null)this.resize_mouse_offset[0]=rel_x;
	else rel_x=this.resize_mouse_offset[0];
	if(rel_y!==null)this.resize_mouse_offset[1]=rel_y;
	else rel_y=this.resize_mouse_offset[1];
	var size=[this.sp_container.outerWidth(),this.sp_container.outerHeight()];
	var should_open=this.resizing;
	if(this.resize_container_hovered&&!this.resizing){
		should_open=(
			rel_x<=this.resize_distance[0]||
			rel_y<=this.resize_distance[0]||
			rel_x>=size[0]-this.resize_distance[0]||
			rel_y>=size[1]-this.resize_distance[0]
		);
		if(this.resize_timers[2]!==null){
			this.resize_side_sizes_needed=true;
			var open=[
				(rel_y<=this.resize_distance[1]),
				(rel_x>=size[0]-this.resize_distance[1]),
				(rel_y>=size[1]-this.resize_distance[1]),
				(rel_x<=this.resize_distance[1])
			];
			for(var i=0;i<4;++i){
				this.resize_side_sizes_target[i]=this.resize_sizes[open[i]?2:1];
			}
			this.resizing_texts[0].css("display",(open[0]&&open[3])?"":"none");
			this.resizing_texts[1].css("display",(open[0])?"":"none");
			this.resizing_texts[2].css("display",(open[0]&&open[1])?"":"none");
			this.resizing_texts[3].css("display",(open[3])?"":"none");
			this.resizing_texts[4].css("display",(open[1])?"":"none");
			this.resizing_texts[5].css("display",(open[2]&&open[3])?"":"none");
			this.resizing_texts[6].css("display",(open[2])?"":"none");
			this.resizing_texts[7].css("display",(open[2]&&open[1])?"":"none");
		}
	}
	if(should_open!=this.resize_container_border_hovered){
		this.resize_container_border_hovered=should_open;
		for(var i=0;i<2;++i){
			if(this.resize_timers[i]!==null){
				clearTimeout(this.resize_timers[i]);
				this.resize_timers[i]=null;
			}
		}
		var self=this;
		if(should_open){
			if(this.resize_timers[2]===null){
				this.resize_timers[0]=setTimeout(function(){
					self.on_timer_resize_open();
				},Math.floor(this.resize_wait_times[0]*1000));
			}
			else{
				self.on_timer_resize_open();
			}
		}
		else if(this.resize_timers[2]!==null){
			this.resize_timers[1]=setTimeout(function(){
				self.on_timer_resize_close();
			},Math.floor(this.resize_wait_times[1]*1000));
		}
	}
}
MediaPlayer.prototype.on_resizer_mousedown=function(event){
	if(event.data.media_player.playlist_container.css("display")!="none"){
		event.data.media_player.resizing=true;
		event.data.media_player.resizing_sides=event.data.sides;
		event.data.media_player.mouse_offset={
			"left":(event.pageX-$(document).scrollLeft()),
			"top":(event.pageY-$(document).scrollTop())
		};
		event.data.media_player.resizing_base_size={
			"width":event.data.media_player.sp_container_main.outerWidth(),
			"height":event.data.media_player.sp_container_main.outerHeight()
		};
	}
	return false;
}
MediaPlayer.prototype.merge_value_towards=function(value,target,incr){
	return(value<target)?
		((target-value<incr)?target:value+incr):
		((value-target<incr)?target:value-incr);
}
MediaPlayer.prototype.on_titlebar_mousedown=function(event){
	event.data.media_player.moving=true;
	event.data.media_player.mouse_offset=event.data.media_player.sp_container_main.offset();
	event.data.media_player.mouse_offset.left-=event.pageX;
	event.data.media_player.mouse_offset.top-=event.pageY;
	event.preventDefault();
	return false;
}
MediaPlayer.prototype.on_volumebar_mousedown=function(event){
	event.data.media_player.volume_changing=true;
	event.data.media_player.C(event.data.media_player.volume_container,"SPVolumeContainerActive");
	var volume=1.0-((event.pageY)-event.data.media_player.volume_bar_container.offset().top)/event.data.media_player.volume_bar_container.outerHeight();
	event.data.media_player.set_volume(volume);
	event.preventDefault();
	return false;
}
MediaPlayer.prototype.on_seekbar_mousedown=function(event){
	event.data.media_player.C(event.data.media_player.seek_bar,"SPSeekBarActive");
	event.data.media_player.seek_dragging=true;
	if((event.data.media_player.seek_was_playing=!event.data.media_player.is_paused())){
		event.data.media_player.pause();
	}
	event.data.media_player.mouse_offset=event.data.media_player.seek_bar.offset();
	event.data.media_player.mouse_offset.left-=event.pageX;
	event.data.media_player.mouse_offset.top-=event.pageY;
	event.preventDefault();
	return false;
}
MediaPlayer.prototype.on_seekbar_container_mousedown=function(event){
	event.data.media_player.C(event.data.media_player.seek_bar,"SPSeekBarActive");
	event.data.media_player.seek_exacting=true;
	if((event.data.media_player.seek_was_playing=!event.data.media_player.is_paused())){
		event.data.media_player.pause();
	}
	var offset=(event.pageX-event.data.media_player.seek_bar_container.offset().left)-event.data.media_player.seek_bar.outerWidth()/2.0;
	var max_offset=event.data.media_player.seek_bar_container.outerWidth()-event.data.media_player.seek_bar.outerWidth();
	if(max_offset>0.0)offset=offset/max_offset*event.data.media_player.get_duration();
	event.data.media_player.seek_to(offset);
	event.preventDefault();
	return false;
}
MediaPlayer.prototype.on_image_resize_mousedown=function(event){
	event.data.media_player.resizing_image=true;
	event.data.media_player.mouse_offset=event.data.media_player.sp_container_main.offset();
	event.data.media_player.mouse_offset.left-=event.pageX;
	event.data.media_player.mouse_offset.top-=event.pageY-(event.data.media_player.image_height*event.data.media_player.scale_factor);
	event.data.media_player.mouse_moved=false;
	event.preventDefault();
	return false;
}
MediaPlayer.prototype.on_document_mouseup=function(event){
	if(event.data.media_player.moving){
		event.data.media_player.moving=false;
		if(typeof(event.data.media_player.settings_callback)=="function")event.data.media_player.settings_callback(event.data.media_player);
	}
	else if(event.data.media_player.resizing){
		event.data.media_player.resizing=false;
		event.data.media_player.on_resize_mouse_update(null,null);
		event.data.media_player.reposition();
		if(typeof(event.data.media_player.settings_callback)=="function")event.data.media_player.settings_callback(event.data.media_player);
	}
	else if(event.data.media_player.resizing_image){
		event.data.media_player.resizing_image=false;
		if(event.data.media_player.mouse_moved){
			if(typeof(event.data.media_player.settings_callback)=="function")event.data.media_player.settings_callback(event.data.media_player);
		}
		else{
			if(event.data.media_player.is_paused()){
				event.data.media_player.play();
			}
			else{
				event.data.media_player.pause();
			}
		}
	}
	else if(event.data.media_player.volume_changing){
		event.data.media_player.volume_changing=false;
		event.data.media_player.unC(event.data.media_player.volume_container,"SPVolumeContainerActive");
	}
	else if(event.data.media_player.seek_dragging){
		event.data.media_player.seek_dragging=false;
		event.data.media_player.unC(event.data.media_player.seek_bar,"SPSeekBarActive");
		event.data.media_player.seek_to(null,false,false);
		if(event.data.media_player.seek_was_playing){
			event.data.media_player.play();
		}
	}
	else if(event.data.media_player.seek_exacting){
		event.data.media_player.seek_exacting=false;
		event.data.media_player.unC(event.data.media_player.seek_bar,"SPSeekBarActive");
		event.data.media_player.seek_to(null,false,false);
		if(event.data.media_player.seek_was_playing){
			event.data.media_player.play();
		}
	}
	return true;
}
MediaPlayer.prototype.on_document_mousemove=function(event){
	if(event.data.media_player.moving){
		var left=(event.pageX-$(document).scrollLeft())+event.data.media_player.mouse_offset.left;
		var top=(event.pageY-$(document).scrollTop())+event.data.media_player.mouse_offset.top;
		event.data.media_player.reposition(left,top);
	}
	else if(event.data.media_player.resizing){
		var size={width:null,height:null};
		var is_top,is_left;
		if((is_top=(event.data.media_player.resizing_sides[0]===0))){
			size.height=event.data.media_player.mouse_offset.top
				-(event.pageY-$(document).scrollTop())
				+event.data.media_player.resizing_base_size.height;
		}
		else if(event.data.media_player.resizing_sides[0]===2){
			size.height=(event.pageY-$(document).scrollTop())
				-event.data.media_player.mouse_offset.top
				+event.data.media_player.resizing_base_size.height;
		}
		if((is_left=(event.data.media_player.resizing_sides[1]===3))){
			size.width=event.data.media_player.mouse_offset.left
				-(event.pageX-$(document).scrollLeft())
				+event.data.media_player.resizing_base_size.width;
		}
		else if(event.data.media_player.resizing_sides[1]===1){
			size.width=(event.pageX-$(document).scrollLeft())
				-event.data.media_player.mouse_offset.left
				+event.data.media_player.resizing_base_size.width;
		}
		event.data.media_player.resize_to(size.width,size.height,is_left,is_top);
	}
	else if(event.data.media_player.resizing_image){
		var size=event.data.media_player.sp_container_main.offset();
		size.left=(event.pageX-size.left)+event.data.media_player.mouse_offset.left;
		size.top=(event.pageY-size.top)+event.data.media_player.mouse_offset.top;
		event.data.media_player.resize_image_container(size.top);
		event.data.media_player.mouse_moved=true;
	}
	else if(event.data.media_player.volume_changing){
		var volume=1.0-((event.pageY)-event.data.media_player.volume_bar_container.offset().top)/event.data.media_player.volume_bar_container.outerHeight();
		event.data.media_player.set_volume(volume);
		if(typeof(event.data.media_player.settings_callback)=="function")event.data.media_player.settings_callback(event.data.media_player);
	}
	else if(event.data.media_player.seek_dragging){
		var offset=((event.pageX)-event.data.media_player.seek_bar_container.offset().left)+event.data.media_player.mouse_offset.left;
		var max_offset=event.data.media_player.seek_bar_container.outerWidth()-event.data.media_player.seek_bar.outerWidth();
		if(max_offset>0.0)offset=offset/max_offset*event.data.media_player.get_duration();
		event.data.media_player.seek_to(offset,false,true);
	}
	else if(event.data.media_player.seek_exacting){
		var offset=((event.pageX)-event.data.media_player.seek_bar_container.offset().left)-event.data.media_player.seek_bar.outerWidth()/2.0;
		var max_offset=event.data.media_player.seek_bar_container.outerWidth()-event.data.media_player.seek_bar.outerWidth();
		if(max_offset>0.0)offset=offset/max_offset*event.data.media_player.get_duration();
		event.data.media_player.seek_to(offset,false,true);
	}
	if(event.data.media_player.resize_container_hovered){
		var rel=event.data.media_player.sp_container.offset();
		rel.left-=event.pageX;
		rel.top-=event.pageY;
		event.data.media_player.on_resize_mouse_update(-rel.left,-rel.top);
	}
	return true;
}
MediaPlayer.prototype.on_window_resize=function(event){
	event.data.media_player.reposition();
}
MediaPlayer.prototype.on_audio_play=function(event){
	event.data.media_player.update_playing_status();
}
MediaPlayer.prototype.on_audio_pause=function(event){
	event.data.media_player.update_playing_status();
}
MediaPlayer.prototype.on_audio_ended=function(event){
	if(!event.data.media_player.seek_exacting&&!event.data.media_player.seek_dragging){
		event.data.media_player.update_playing_status();
		event.data.media_player.next(true);
	}
}
MediaPlayer.prototype.on_audio_timeupdate=function(event){
	event.data.media_player.seek_to(this.currentTime,true);
}
MediaPlayer.prototype.on_audio_durationchange=function(event){
	var duration=event.data.media_player.get_audio_duration(event.data.media_player.audio[0]);
	event.data.media_player.set_duration(duration);
	event.data.media_player.seek_to(null,true);
}
MediaPlayer.prototype.on_temp_audio_durationchange=function(event){
	var duration=event.data.media_player.get_audio_duration(event.data.playlist_item.temp_audio[0]);
	event.data.playlist_item.duration=duration;
	event.data.playlist_item.temp_audio[0].pause();
	event.data.playlist_item.temp_audio.removeAttr("src").remove();
	event.data.playlist_item.temp_audio=null;
	var length_str=event.data.media_player.duration_to_string(duration);
	event.data.playlist_item.info_container.html(length_str);
}
MediaPlayer.prototype.on_image_load=function(event){
	var attr=$(this).attr("src");
	if(typeof(attr)!=="undefined"&&attr!==false){
		event.data.media_player.current_image_width=this.width;
		event.data.media_player.current_image_height=this.height;
		event.data.media_player.update_image_scale();
		$(this).css("display","");
	}
}
MediaPlayer.prototype.on_playlist_mode_change=function(event){
	if(event.data.media_player.playlist_randomize){
		event.data.media_player.playlist_randomize=false;
		event.data.media_player.playlist_loop=false;
	}
	else if(event.data.media_player.playlist_loop){
		event.data.media_player.playlist_randomize=true;
	}
	else{
		event.data.media_player.playlist_loop=true;
	}
	$(this).html(event.data.media_player.playlist_randomize?"Randomize":(event.data.media_player.playlist_loop?"Loop":"Play Once"));
	if(typeof(event.data.media_player.settings_callback)=="function")event.data.media_player.settings_callback(event.data.media_player);
}
MediaPlayer.prototype.on_playlist_onload_change=function(event){
	var v=(event.data.media_player.playlist_play_on_load+1)%event.data.media_player.playlist_play_on_load_settings.length;
	event.data.media_player.playlist_play_on_load=v;
	$(this).html(event.data.media_player.playlist_play_on_load_settings[event.data.media_player.playlist_play_on_load]);
	if(typeof(event.data.media_player.settings_callback)=="function")event.data.media_player.settings_callback(event.data.media_player);
}
MediaPlayer.prototype.on_playlist_scrollto_change=function(event){
	event.data.media_player.playlist_scrollto_onload=!event.data.media_player.playlist_scrollto_onload;
	$(this).html(event.data.media_player.playlist_scrollto_onload?"Scroll to in playlist":"Don't scroll playlist");
	if(typeof(event.data.media_player.settings_callback)=="function")event.data.media_player.settings_callback(event.data.media_player);
}
MediaPlayer.prototype.on_ytquality_change=function(event){
	event.data.media_player.ytvideo_quality_index=(event.data.media_player.ytvideo_quality_index+1)%event.data.media_player.ytvideo_qualities.length;
	if(event.data.media_player.ytvideo_player!=null&&event.data.media_player.ytvideo_player.setPlaybackQuality){
		event.data.media_player.ytvideo_player.setPlaybackQuality(event.data.media_player.ytvideo_qualities[event.data.media_player.ytvideo_quality_index]);
	}
	$(this).html(event.data.media_player.ytvideo_qualities[event.data.media_player.ytvideo_quality_index]);
	if(typeof(event.data.media_player.settings_callback)=="function")event.data.media_player.settings_callback(event.data.media_player);
}
MediaPlayer.prototype.on_player_theme_change=function(event){
	var first=null;
	var find=false;
	for(var theme in event.data.media_player.css.css_color_presets){
		if(theme=="default")continue;
		if(first===null)first=theme;
		if(theme==event.data.media_player.css.preset&&!find)find=true;
		else if(find){
			find=null;
			event.data.media_player.css.load_preset(theme);
			break;
		}
	}
	if(find!==null){
		event.data.media_player.css.load_preset(first);
	}
	event.data.media_player.update_value_fields();
	event.data.media_player.regen_stylesheet();
	event.data.media_player.update_player_theme_name({media_player:event.data.media_player});
	if(typeof(event.data.media_player.settings_callback)=="function")event.data.media_player.settings_callback(event.data.media_player);
}
MediaPlayer.prototype.on_player_use_svg_update=function(event){
	event.data.media_player.use_svg=!event.data.media_player.use_svg;
	$(this).html(event.data.media_player.use_svg?"Allowed":"Disallowed");
	event.data.media_player.createPlaybackControls();
	if(typeof(event.data.media_player.settings_callback)=="function")event.data.media_player.settings_callback(event.data.media_player);
}
MediaPlayer.prototype.on_playback_control_click=function(event){
	if(event.data.media_player.current_media!=null){
		var time_offset=5.0;
		switch(event.data.control_id){
			case 0:
			{
				if(event.data.media_player.get_position()-time_offset<0.0)event.data.media_player.previous();
				else event.data.media_player.seek_to(0.0);
			}
			break;
			case 1:
			{
				var t=event.data.media_player.get_position()-time_offset;
				if(t<0.0)event.data.media_player.previous();
				else event.data.media_player.seek_to(t);
			}
			break;
			case 2:
			{
				if(event.data.media_player.is_paused()){
					event.data.media_player.play();
				}
				else{
					event.data.media_player.pause();
				}
			}
			break;
			case 3:
			{
				event.data.media_player.seek_to(event.data.media_player.get_position()+time_offset);
			}
			break;
			case 4:
			{
				event.data.media_player.next();
			}
			break;
		}
	}
}
MediaPlayer.prototype.on_main_control_click=function(event){
	switch(event.data.control_id){
		case 1:
		{
			event.data.media_player.first_run_container.css("display","");
			for(var i=0;i<event.data.media_player.help_container.length;++i){
				event.data.media_player.help_container[i].css("display","none");
			}
		}
		break;
		case 0:
		{
			if(event.data.media_player.first_run_container.css("display")=="none"){
				var open=false;
				for(var i=0;i<event.data.media_player.help_container.length;++i){
					if(event.data.media_player.help_container[i].css("display")!="none"){
						open=true;
						break;
					}
				}
				if(open){
					for(var i=0;i<event.data.media_player.help_container.length;++i){
						event.data.media_player.help_container[i].css("display","none");
					}
				}
				else{
					event.data.media_player.help_container[0].css("display","");
				}
			}
		}
		break;
		case 2:
		{
			var open=(event.data.media_player.playlist_container.css("display")!="none");
			event.data.media_player.playlist_container.css("display",(open?"none":""));
			event.data.media_player.top_container.css("display",(open?"none":""));
			for(var i=0;i<event.data.media_player.help_container.length;++i){
				event.data.media_player.help_container[i].css("display","none");
			}
			$(this).html(open?"[+]":"[&#x2012;]");
			event.data.media_player.reposition();
		}
		break;
		case 3:
		{
			event.data.media_player.destructor();
		}
		break;
	}
}
MediaPlayer.prototype.on_helppage_goto=function(event){
	for(var i=0;i<event.data.media_player.help_container.length;++i){
		event.data.media_player.help_container[i].css("display",(event.data.help_page==i?"":"none"));
	}
}
MediaPlayer.prototype.on_firstrun_page_exit_click=function(event){
	event.data.media_player.first_run_container.css("display","none");
	event.data.media_player.first_run=false;
	if(typeof(event.data.media_player.settings_callback)=="function")event.data.media_player.settings_callback(event.data.media_player);
	return false;
}
MediaPlayer.prototype.on_playlist_item_click=function(event){
	event.data.media_player.start(event.data.playlist_item.index);
}
MediaPlayer.prototype.on_playlist_control_click=function(event){
	switch(event.data.control_id){
		case 0:
		{
			event.data.media_player.remove(event.data.playlist_item.index);
		}
		return false;
		case 1:
		{
			var i=event.data.playlist_item.index;
			if(i>0){
				var i1=event.data.media_player.playlist[i-1];
				var i2=event.data.media_player.playlist[i];
				i1.playlist_item.before(i2.playlist_item);
				event.data.media_player.playlist[i]=i1;
				event.data.media_player.playlist[i-1]=i2;
				i1.index=i;
				i2.index=i-1;
			}
		}
		break;
		case 2:
		{
			var i=event.data.playlist_item.index;
			if(i<event.data.media_player.playlist.length-1){
				var i1=event.data.media_player.playlist[i];
				var i2=event.data.media_player.playlist[i+1];
				i1.playlist_item.before(i2.playlist_item);
				event.data.media_player.playlist[i+1]=i1;
				event.data.media_player.playlist[i]=i2;
				i1.index=i+1;
				i2.index=i;
			}
		}
		break;
		case 3:
		{
			if(!event.originalEvent.which||event.originalEvent.which==1){
				if(event.data.playlist_item.type=="image-audio"){
					alert("Right click and save as, or open in a new tab.");
				}
				else if(event.data.playlist_item.type=="youtube-video"){
					prompt("Right click/middle click to open. Original:",event.data.playlist_item.original_url);
				}
				else{
					console.log(event.data.playlist_item.type);
				}
			}
			else{
				return true;
			}
		}
		return false;
		case 4:
		{
			if(!event.originalEvent.which||event.originalEvent.which==1){
				if(event.data.playlist_item.type=="image-audio"){
					alert("Right click and save as, or open in a new tab.");
				}
				else{
					console.log(event.data.playlist_item.type);
				}
			}
			else{
				return true;
			}
		}
		return false;
	}
	return true;
}
MediaPlayer.prototype.on_settings_color_change=function(event){
	var value=0;
	try{
		if(event.data.component<3){
			value=parseInt($(this).val());
			if(value!=value)value=0;
			else if(value<0)value=0;
			else if(value>255)value=255;
		}
		else{
			value=parseFloat($(this).val());
			if(value!=value)value=0.0;
			else if(value<0.0)value=0.0;
			else if(value>1.0)value=1.0;
		}
	}
	catch(e){
	}
	$(this).val(value);
	event.data.media_player.css.modify_value(true,event.data.color_id,value,event.data.component);
	value=event.data.media_player.css.get_value(true,event.data.color_id);
	if(value[3]>=1.0){
		event.data.color_display.css("background","rgb("+value[0]+","+value[1]+","+value[2]+")");
	}
	else{
		event.data.color_display.css("background","rgba("+value[0]+","+value[1]+","+value[2]+","+value[3]+")");
	}
	if(/volume_colors/.test(event.data.color_id)){
		event.data.media_player.set_volume(event.data.media_player.volume);
	}
	else{
		event.data.media_player.regen_stylesheet();
	}
	if(typeof(event.data.media_player.settings_callback)=="function")event.data.media_player.settings_callback(event.data.media_player);
}
MediaPlayer.prototype.on_settings_value_change=function(event){
	var value=$(this).val();
	if(!event.data.is_string){
		value=parseFloat(value);
		if(value!=value)value=0.0;
		$(this).val(value);
	}
	if(event.data.value_id[0]=="@"){
		var name=event.data.value_id.substr(1,event.data.value_id.length-1);
		if(name=="scale_factor"){
			if(value<=0.25)value=0.25;
			if(value>=4.0)value=4.0;
			$(this).val(value);
			event.data.media_player.update_scale_factor(value);
		}
	}
	else{
		event.data.media_player.css.modify_value(false,event.data.value_id,value);
	}
	event.data.media_player.regen_stylesheet();
	event.data.media_player.reposition();
	if(typeof(event.data.media_player.settings_callback)=="function")event.data.media_player.settings_callback(event.data.media_player);
}
MediaPlayer.prototype.on_container_drop=function(event){
	event.data.media_player.alert_container.css("display","none");
	for(var i=0;i<event.data.media_player.help_container.length;++i){
		event.data.media_player.help_container[i].css("display","none")
	}
	if(event.originalEvent.dataTransfer.files.length>0){
		for(var i=0;i<event.originalEvent.dataTransfer.files.length;++i){
			event.data.media_player.attempt_load(event.originalEvent.dataTransfer.files[i],MediaPlayer.ALL_SOUNDS);
		}
	}
	else{
		event.data.media_player.attempt_load(event.originalEvent.dataTransfer.getData("text/plain"),MediaPlayer.ALL_SOUNDS);
	}
	event.preventDefault();
	event.stopPropagation();
	return false;
}
MediaPlayer.prototype.on_container_dragover=function(event){
	event.originalEvent.dataTransfer.dropEffect="move";
	event.preventDefault();
	event.stopPropagation();
	return false;
}
MediaPlayer.prototype.on_container_dragenter=function(event){
	event.data.media_player.alert_container.css("display","");
	event.preventDefault();
	event.stopPropagation();
	return false;
}
MediaPlayer.prototype.on_container_dragexit=function(event){
	event.data.media_player.alert_container.css("display","none");
	event.preventDefault();
	event.stopPropagation();
	return false;
}
MediaPlayer.prototype.cancel_event=function(event){
	event.preventDefault();
	event.stopPropagation();
	return false;
}
window.$.prototype.exists=function(){
	return(this.length>0);
}
function string_to_uint8array(str){
	var array=new Uint8Array(new ArrayBuffer(str.length));
	for(var i=0;i<str.length;++i){
		array[i]=str.charCodeAt(i);
	}
	return array;
}
function arraybuffer_to_uint8array(buffer){
	return new Uint8Array(buffer);
}
function is_chrome(){
	return((navigator.userAgent+"").indexOf(" Chrome/")>=0);
}
function ajax_get(url,return_as_string,callback_data,progress_callback,done_callback){
	if(is_chrome()){
		var xhr=new XMLHttpRequest();
		xhr.open("GET",url,true);
		if(!return_as_string)xhr.overrideMimeType("text/plain; charset=x-user-defined");
		xhr.responseType=(return_as_string?"text":"arraybuffer");
		xhr.onload=function(event){
			if(typeof(done_callback)=="function"){
				if(this.status==200){
					done_callback(
						true,
						callback_data,
						(return_as_string?this.response:arraybuffer_to_uint8array(this.response))
					);
				}
				else{
					done_callback(false,callback_data,null);
				}
			}
		};
		if(typeof(progress_callback)=="function"){
			xhr.onprogress=function(event){
				progress_callback(event,callback_data);
			};
		}
		xhr.send();
	}
	else{
		var arg={
			method:"GET",
			url:url,
			onload:function(event){
				if(typeof(done_callback)=="function"){
					if(event.status==200){
						done_callback(
							true,
							callback_data,
							(return_as_string?event.responseText:string_to_uint8array(event.responseText))
						);
					}
					else{
						done_callback(false,callback_data,null);
					}
				}
			}
		};
		if(!return_as_string)arg.overrideMimeType="text/plain; charset=x-user-defined";
		if(typeof(progress_callback)=="function"){
			arg.onprogress=function(event){
				progress_callback(event,callback_data);
			};
		}
		GM_xmlhttpRequest(arg);
	}
}
function xml_find_nodes_by_name(xml,name){
	var nodes=[],n2;
	for(var n=0;n<xml.childNodes.length;++n){
		if(xml.childNodes[n].nodeName!="#text"){
			if(xml.childNodes[n].nodeName==name)nodes.push(xml.childNodes[n]);
			n2=xml_find_nodes_by_name(xml.childNodes[n],name);
			if(n2.length>0)nodes=nodes.concat(n2);
		}
	}
	return nodes;
}
function E(elem){
	return jQuery(document.createElement(elem));
}
function T(text){
	return jQuery(document.createTextNode(text));
}
function text_to_html(str){
	return str.replace(/&/g,"&amp;")
		.replace(/>/g,"&gt;")
		.replace(/</g,"&lt;")
		.replace(/"/g,"&quot;");
}
function html_to_text(str){
	return str.replace(/&amp;/g,"&")
		.replace(/&gt;/g,">")
		.replace(/&lt;/g,"<")
		.replace(/&quot;/g,"\"");
}
function image_load_callback(url_or_filename,load_tag,raw_ui8_data,done_callback){
	var ext=url_or_filename.split(".").pop().toLowerCase();
	if(ext!="png"&&ext!="gif"&&ext!="jpg"&&ext!="jpeg"){
		done_callback(null);
		return;
	}
	var has_footer=true;
	var footer="4SPF";
	for(var i=0;i<footer.length;++i){
		if(raw_ui8_data[raw_ui8_data.length-footer.length+i]!=footer.charCodeAt(i)){
			has_footer=false;
			break;
		}
	}
	var sounds=[];
	if(has_footer){
		alert("Footer sound");
	}
	else{
		var magic_strings=["OggS\x00\x02","moot\x00\x02","Krni\x00\x02","79\x06\x08\x00\x02"];
		var magic_strings_ui8=[string_to_uint8array(magic_strings[0]),string_to_uint8array(magic_strings[1]),string_to_uint8array(magic_strings[2]),string_to_uint8array(magic_strings[3])];
		var magic_strings_fix_size=4;
		var len,s,i,j,k,found,tag,temp_tag,data,id;
		var sound_index=0;
		var sound_start_offset=-1;
		var sound_magic_string_index=-1;
		var sound_masked_state=null;
		var sound_masked_mask=null;
		var unmask_state=0,mask,unmask_state_temp,mask_temp,masked;
		var tag_start=0,tag_start2=0,tag_state,tag_mask,tag_pos,tag_indicators=["[".charCodeAt(0),"]".charCodeAt(0)];
		var tag_max_length=100;
		var imax=raw_ui8_data.length-magic_strings_ui8[0].length;
		var ms,t1;
		for(i=0;i<imax;++i){
			unmask_state=(1664525*unmask_state+1013904223)&0xFFFFFFFF;
			mask=unmask_state>>>24;
			unmask_state+=(t1=(raw_ui8_data[i]^mask));
			if(t1==tag_indicators[0]){
				tag_start=i;
				tag_state=unmask_state;
				tag_mask=mask;
			}
			if(raw_ui8_data[i]==tag_indicators[0])tag_start2=i;
			found=false;
			masked=false;
			for(s=0;s<magic_strings_ui8.length;++s){
				ms=magic_strings_ui8[s];
				for(j=0;j<ms.length;++j){
					if(raw_ui8_data[i+j]!=ms[j])break;
				}
				if(j==ms.length){
					found=true;
					break;
				}
				if(found)break;
			}
			if(!found){
				s=0;
				ms=magic_strings_ui8[s];
				unmask_state_temp=unmask_state;
				mask_temp=mask;
				for(j=0;true;){
					if((raw_ui8_data[i+j]^mask_temp)!=ms[j])break;
					if(++j>=ms.length)break;
					unmask_state_temp=(1664525*unmask_state_temp+1013904223)&0xFFFFFFFF;
					mask_temp=unmask_state_temp>>>24;
					unmask_state_temp+=(raw_ui8_data[i+j]^mask_temp);
				}
				if(j==ms.length){
					found=true;
					masked=true;
				}
			}
			if(found){
				tag_pos=i;
				k=1;
				tag=load_tag||"[Name Unknown]";
				if(masked){
					if(i-tag_start<tag_max_length){
						temp_tag="";
						for(j=tag_start+1;j<i;++j){
							tag_state=(1664525*tag_state+1013904223)&0xFFFFFFFF;
							tag_mask=tag_state>>>24;
							tag_state+=(raw_ui8_data[j]^tag_mask);
							if((raw_ui8_data[j]^tag_mask)==tag_indicators[1])break;
							temp_tag+=String.fromCharCode(raw_ui8_data[j]^tag_mask);
						}
						if(j<i){
							tag=temp_tag;
							tag_pos=tag_start;
						}
					}
				}
				else{
					if(i-tag_start2<tag_max_length){
						temp_tag="";
						for(j=tag_start2+1;j<i;++j){
							if(raw_ui8_data[j]==tag_indicators[1])break;
							temp_tag+=String.fromCharCode(raw_ui8_data[j]);
						}
						if(j<i){
							tag=temp_tag;
							tag_pos=tag_start;
						}
					}
				}
				tag=tag||"?";
				if(sounds.length>0){
					image_load_callback_complete_sound(
						sounds,
						raw_ui8_data,
						sound_start_offset,
						tag_pos,
						sound_masked_state,
						sound_masked_mask,
						sound_magic_string_index,
						magic_strings_fix_size,
						magic_strings_ui8
					);
				}
				sounds.push({
					"title":tag,
					"flagged":(load_tag!=MediaPlayer.ALL_SOUNDS&&load_tag.toLowerCase()!=tag.toLowerCase()),
					"index":sound_index,
					"data":null
				});
				sound_start_offset=i;
				sound_magic_string_index=s;
				sound_masked_state=(masked?unmask_state:null);
				sound_masked_mask=(masked?mask:null);
			}
		}
		if(sounds.length>0){
			image_load_callback_complete_sound(
				sounds,
				raw_ui8_data,
				sound_start_offset,
				raw_ui8_data.length,
				sound_masked_state,
				sound_masked_mask,
				sound_magic_string_index,
				magic_strings_fix_size,
				magic_strings_ui8
			);
		}
		s=0;
		for(i=0;i<sounds.length;++i){
			if(sounds[i].data.length>magic_strings_ui8[s].length){
				for(j=0;j<magic_strings_ui8[s].length;++j){
					sounds[i].data[j]=magic_strings_ui8[s][j];
				}
			}
		}
	}
	if(sounds.length==0){
		done_callback(null);
		return;
	}
	var sound_names=[];
	for(var i=0;i<sounds.length;++i)sound_names.push(sounds[i]["title"]+".ogg");
	if(load_tag!==MediaPlayer.ALL_SOUNDS){
		var found=null;
		for(var i=0;i<sounds.length;++i){
			if(sounds[i]["title"]==load_tag){
				found=i;
				break;
			}
		}
		if(found===null){
			for(var i=0;i<sounds.length;++i){
				if(sounds[i]["title"].toLowerCase()==load_tag.toLowerCase()){
					found=i;
					break;
				}
			}
			if(found===null){
				found=0;
			}
		}
		sounds=[sounds[found]];
	}
	done_callback([sound_names,sounds]);
}
function image_load_callback_slow(url_or_filename,load_tag,raw_ui8_data,done_callback){
	try{
		var loop=new Loop();
		loop.steps=1024*64;
	}
	catch(e){
		console.log(e);
		return image_load_callback(url_or_filename,load_tag,raw_ui8_data,done_callback);
	}
	var ext=url_or_filename.split(".").pop().toLowerCase();
	if(ext!="png"&&ext!="gif"&&ext!="jpg"&&ext!="jpeg"){
		done_callback(null);
		return;
	}
	var has_footer=true;
	var footer="4SPF";
	for(var i=0;i<footer.length;++i){
		if(raw_ui8_data[raw_ui8_data.length-footer.length+i]!=footer.charCodeAt(i)){
			has_footer=false;
			break;
		}
	}
	var sounds=[];
	var on_complete=function(){
		if(sounds.length==0){
			done_callback(null);
			return;
		}
		var sound_names=[];
		for(var i=0;i<sounds.length;++i)sound_names.push(sounds[i]["title"]+".ogg");
		if(load_tag!==MediaPlayer.ALL_SOUNDS){
			var found=null;
			for(var i=0;i<sounds.length;++i){
				if(sounds[i]["title"]==load_tag){
					found=i;
					break;
				}
			}
			if(found===null){
				for(var i=0;i<sounds.length;++i){
					if(sounds[i]["title"].toLowerCase()==load_tag.toLowerCase()){
						found=i;
						break;
					}
				}
				if(found===null){
					found=0;
				}
			}
			sounds=[sounds[found]];
		}
		done_callback([sound_names,sounds]);
	};
	if(has_footer){
		alert("Footer sound");
	}
	else{
		var magic_strings=["OggS\x00\x02","moot\x00\x02","Krni\x00\x02"];
		var magic_strings_ui8=[string_to_uint8array(magic_strings[0]),string_to_uint8array(magic_strings[1]),string_to_uint8array(magic_strings[2])];
		var magic_strings_fix_size=4;
		var len,s,i,j,k,found,tag,temp_tag,data,id;
		var sound_index=0;
		var sound_start_offset=-1;
		var sound_magic_string_index=-1;
		var sound_masked_state=null;
		var sound_masked_mask=null;
		var unmask_state=0,mask,unmask_state_temp,mask_temp,masked;
		var tag_start=0,tag_start2=0,tag_state,tag_mask,tag_pos,tag_indicators=["[".charCodeAt(0),"]".charCodeAt(0)];
		var tag_max_length=100;
		var imax=raw_ui8_data.length-magic_strings_ui8[0].length;
		var ms,t1;
		loop.for_lt(
			0,imax,1,
			{},
			function(i,data,loop){
				unmask_state=(1664525*unmask_state+1013904223)&0xFFFFFFFF;
				mask=unmask_state>>>24;
				unmask_state+=(t1=(raw_ui8_data[i]^mask));
				if(t1==tag_indicators[0]){
					tag_start=i;
					tag_state=unmask_state;
					tag_mask=mask;
				}
				if(raw_ui8_data[i]==tag_indicators[0])tag_start2=i;
				found=false;
				masked=false;
				for(s=0;s<magic_strings_ui8.length;++s){
					ms=magic_strings_ui8[s];
					for(j=0;j<ms.length;++j){
						if(raw_ui8_data[i+j]!=ms[j])break;
					}
					if(j==ms.length){
						found=true;
						break;
					}
					if(found)break;
				}
				if(!found){
					s=0;
					ms=magic_strings_ui8[s];
					unmask_state_temp=unmask_state;
					mask_temp=mask;
					for(j=0;true;){
						if((raw_ui8_data[i+j]^mask_temp)!=ms[j])break;
						if(++j>=ms.length)break;
						unmask_state_temp=(1664525*unmask_state_temp+1013904223)&0xFFFFFFFF;
						mask_temp=unmask_state_temp>>>24;
						unmask_state_temp+=(raw_ui8_data[i+j]^mask_temp);
					}
					if(j==ms.length){
						found=true;
						masked=true;
					}
				}
				if(found){
					tag_pos=i;
					k=1;
					tag=load_tag||"[Name Unknown]";
					if(masked){
						if(i-tag_start<tag_max_length){
							temp_tag="";
							for(j=tag_start+1;j<i;++j){
								tag_state=(1664525*tag_state+1013904223)&0xFFFFFFFF;
								tag_mask=tag_state>>>24;
								tag_state+=(raw_ui8_data[j]^tag_mask);
								if((raw_ui8_data[j]^tag_mask)==tag_indicators[1])break;
								temp_tag+=String.fromCharCode(raw_ui8_data[j]^tag_mask);
							}
							if(j<i){
								tag=temp_tag;
								tag_pos=tag_start;
							}
						}
					}
					else{
						if(i-tag_start2<tag_max_length){
							temp_tag="";
							for(j=tag_start2+1;j<i;++j){
								if(raw_ui8_data[j]==tag_indicators[1])break;
								temp_tag+=String.fromCharCode(raw_ui8_data[j]);
							}
							if(j<i){
								tag=temp_tag;
								tag_pos=tag_start;
							}
						}
					}
					tag=tag||"?";
					if(sounds.length>0){
						image_load_callback_complete_sound(
							sounds,
							raw_ui8_data,
							sound_start_offset,
							tag_pos,
							sound_masked_state,
							sound_masked_mask,
							sound_magic_string_index,
							magic_strings_fix_size,
							magic_strings_ui8
						);
					}
					sounds.push({
						"title":tag,
						"flagged":(load_tag!=MediaPlayer.ALL_SOUNDS&&load_tag.toLowerCase()!=tag.toLowerCase()),
						"index":sound_index,
						"data":null
					});
					sound_start_offset=i;
					sound_magic_string_index=s;
					sound_masked_state=(masked?unmask_state:null);
					sound_masked_mask=(masked?mask:null);
				}
				return i;
			},
			function(i,data,loop){
				if(sounds.length>0){
					image_load_callback_complete_sound(
						sounds,
						raw_ui8_data,
						sound_start_offset,
						raw_ui8_data.length,
						sound_masked_state,
						sound_masked_mask,
						sound_magic_string_index,
						magic_strings_fix_size,
						magic_strings_ui8
					);
				}
				s=0;
				for(i=0;i<sounds.length;++i){
					if(sounds[i].data.length>magic_strings_ui8[s].length){
						for(j=0;j<magic_strings_ui8[s].length;++j){
							sounds[i].data[j]=magic_strings_ui8[s][j];
						}
					}
				}
				on_complete();
			}
		);
	}
}
function image_check_callback(url_or_filename,raw_ui8_data,callback_data,done_callback){
	var ext=url_or_filename.split(".").pop().toLowerCase();
	if(ext!="png"&&ext!="gif"&&ext!="jpg"&&ext!="jpeg"){
		done_callback(null);
		return;
	}
	var has_footer=true;
	var footer="4SPF";
	for(var i=0;i<footer.length;++i){
		if(raw_ui8_data[raw_ui8_data.length-footer.length+i]!=footer.charCodeAt(i)){
			has_footer=false;
			break;
		}
	}
	if(has_footer){
		done_callback(null,done_callback);
	}
	else{
		var sounds=[0,[],[]];
		var magic_strings=["OggS\x00\x02","moot\x00\x02","Krni\x00\x02"];
		var magic_strings_ui8=[string_to_uint8array(magic_strings[0]),string_to_uint8array(magic_strings[1]),string_to_uint8array(magic_strings[2])];
		var magic_strings_fix_size=4;
		var len,s,i,j,k,found,tag,temp_tag,data,id;
		var unmask_state=0,mask,unmask_state_temp,mask_temp,masked;
		var tag_start=0,tag_start2=0,tag_state,tag_mask,tag_pos,tag_indicators=["[".charCodeAt(0),"]".charCodeAt(0)];
		var tag_max_length=100;
		var imax=raw_ui8_data.length-magic_strings_ui8[0].length;
		var ms,t1;
		var loop=new Loop();
		loop.steps=1024*64;
		loop.for_lt(
			0,imax,1,
			{},
			function(i,data,loop){
				unmask_state=(1664525*unmask_state+1013904223)&0xFFFFFFFF;
				mask=unmask_state>>>24;
				unmask_state+=(t1=(raw_ui8_data[i]^mask));
				if(t1==tag_indicators[0]){
					tag_start=i;
					tag_state=unmask_state;
					tag_mask=mask;
				}
				if(raw_ui8_data[i]==tag_indicators[0])tag_start2=i;
				found=false;
				masked=false;
				for(s=0;s<magic_strings_ui8.length;++s){
					ms=magic_strings_ui8[s];
					for(j=0;j<ms.length;++j){
						if(raw_ui8_data[i+j]!=ms[j])break;
					}
					if(j==ms.length){
						found=true;
						break;
					}
					if(found)break;
				}
				if(!found){
					s=0;
					ms=magic_strings_ui8[s];
					unmask_state_temp=unmask_state;
					mask_temp=mask;
					for(j=0;true;){
						if((raw_ui8_data[i+j]^mask_temp)!=ms[j])break;
						if(++j>=ms.length)break;
						unmask_state_temp=(1664525*unmask_state_temp+1013904223)&0xFFFFFFFF;
						mask_temp=unmask_state_temp>>>24;
						unmask_state_temp+=(raw_ui8_data[i+j]^mask_temp);
					}
					if(j==ms.length){
						found=true;
						masked=true;
					}
				}
				if(found){
					tag_pos=i;
					k=1;
					tag=load_tag||"[Name Unknown]";
					if(masked){
						if(i-tag_start<tag_max_length){
							temp_tag="";
							for(j=tag_start+1;j<i;++j){
								tag_state=(1664525*tag_state+1013904223)&0xFFFFFFFF;
								tag_mask=tag_state>>>24;
								tag_state+=(raw_ui8_data[j]^tag_mask);
								if((raw_ui8_data[j]^tag_mask)==tag_indicators[1])break;
								temp_tag+=String.fromCharCode(raw_ui8_data[j]^tag_mask);
							}
							if(j<i){
								tag=temp_tag;
								tag_pos=tag_start;
							}
						}
					}
					else{
						if(i-tag_start2<tag_max_length){
							temp_tag="";
							for(j=tag_start2+1;j<i;++j){
								if(raw_ui8_data[j]==tag_indicators[1])break;
								temp_tag+=String.fromCharCode(raw_ui8_data[j]);
							}
							if(j<i){
								tag=temp_tag;
								tag_pos=tag_start;
							}
						}
					}
					tag=tag||"?";
					if(sounds[0]>0){
						sounds[2][sounds[2].length-1]+=i;
					}
					++sounds[0];
					sounds[1].push(tag);
					sounds[2].push(-i);
				}
				return i;
			},
			function(i,data,loop){
				if(sounds[0]>0){
					sounds[2][sounds[2].length-1]+=raw_ui8_data.length;
				}
				else{
					sounds=null;
				}
				done_callback(sounds,callback_data);
			}
		);
	}
}
function image_load_callback_complete_sound(sounds,raw_ui8_data,sound_start_offset,sound_end_offset,sound_masked_state,sound_masked_mask,sound_magic_string_index,magic_strings_fix_size,magic_strings_ui8){
	var id=sounds.length-1;
	sounds[id].data=raw_ui8_data.subarray(sound_start_offset,sound_end_offset);
	var i,j,k;
	if(sound_masked_state!==null){
		for(i=0;true;){
			sounds[id].data[i]=(sounds[id].data[i]^sound_masked_mask);
			if(++i>=sounds[id].data.length)break;
			sound_masked_state=(1664525*sound_masked_state+1013904223)&0xFFFFFFFF;
			sound_masked_mask=sound_masked_state>>>24;
			sound_masked_state+=(sounds[id].data[i]^sound_masked_mask);
		}
	}
	else if(sound_magic_string_index!=0){
		var len=sounds[id].data.length-magic_strings_fix_size;
		for(j=0;j<len;++j){
			for(k=0;k<magic_strings_fix_size;++k){
				if(sounds[id].data[j+k]!=magic_strings_ui8[sound_magic_string_index][k])break;
			}
			if(k==magic_strings_fix_size){
				for(k=0;k<magic_strings_fix_size;++k){
					sounds[id].data[j+k]=magic_strings_ui8[0][k];
				}
				j+=magic_strings_fix_size-1;
			}
		}
	}
}
function png_load_callback(url_or_filename,load_tag,raw_ui8_data,done_callback){
	if(url_or_filename.split(".").pop().toLowerCase()!="png"){
		done_callback(null);
		return;
	}
	var img=new DataImage(raw_ui8_data);
	var reader=new DataImageReader(img);
	var r=reader.unpack();
	if(typeof(r)==typeof("")){
		done_callback(null);
		return;
	}
	done_callback(png_load_callback_find_correct(r,load_tag));
}
function png_load_callback_slow(url_or_filename,load_tag,raw_ui8_data,done_callback){
	if(url_or_filename.split(".").pop().toLowerCase()!="png"){
		done_callback(null);
		return;
	}
	var img=new DataImage(
		raw_ui8_data,
		{},
		function(img,data){
			var reader=new DataImageReader(img);
			reader.unpack_slow(function(r){
				if(typeof(r)==typeof("")){
					done_callback(null);
				}
				else{
					done_callback(png_load_callback_find_correct(r,load_tag));
				}
			});
		},
		true
	);
}
function png_check_callback(url_or_filename,raw_ui8_data,callback_data,done_callback){
	if(url_or_filename.split(".").pop().toLowerCase()!="png"){
		done_callback(null,callback_data);
		return;
	}
	try{
		var img=new DataImage(
			raw_ui8_data,
			{},
			function(img,data){
				var reader=new DataImageReader(img);
				var about=reader.unpack_names();
				if(typeof(about)!==typeof("")&&about[0]>0){
					done_callback(about,callback_data);
				}
				else{
					done_callback(null,callback_data);
				}
			},
			true
		);
	}
	catch(e){
		console.log(e);
		done_callback(null,callback_data);
	}
}
function png_load_callback_find_correct(r,load_tag){
	if(r[0].length==0){
		return null;
	}
	var sound_names=[];
	for(var i=0;i<r[0].length;++i)sound_names.push(r[0][i]);
	var ret=[];
	var found=false;
	var earliest=-1;
	var earliest_name="";
	for(var i=0;i<r[0].length;++i){
		var filename=r[0][i].split(".");
		var ext=filename.pop();
		filename=filename.join(".");
		if(ext.toLowerCase()=="ogg"){
			if(load_tag===MediaPlayer.ALL_SOUNDS){
				ret.push({
					"title":filename,
					"flagged":false,
					"index":i,
					"data":r[1][i]
				});
				found=true;
			}
			else{
				if(filename.toLowerCase()==load_tag.toLowerCase()){
					ret.push({
						"title":filename,
						"flagged":false,
						"index":i,
						"data":r[1][i]
					});
					found=true;
					break;
				}
				if(earliest<0){
					earliest=i;
					earliest_name=filename;
				}
			}
		}
	}
	if(!found){
		if(earliest>=0){
			ret.push({
				"title":earliest_name,
				"flagged":true,
				"index":earliest,
				"data":r[1][earliest]
			});
		}
		else{
			return[sound_names,null];
		}
	}
	return[sound_names,ret];
}
var is_archive=((document.location+"").indexOf("boards.4chan.org")<0);
var thread_manager=null;
function ThreadManager(){
	this.posts={};
	var self=this;
	if(is_archive){
		$(".thread")
		.each(function(index){
			if(index==0){
				self.parse_post($(this));
			}
		});
	}
	$(is_archive?".post":".postContainer")
	.each(function(index){
		self.parse_post($(this));
	});
	var MutationObserver=(window.MutationObserver||window.WebKitMutationObserver);
	if(MutationObserver){
		try{
			var mo=new MutationObserver(function(records){
				for(var i=0;i<records.length;++i){
					if(records[i].type=="childList"&&records[i].addedNodes){
						for(var j=0;j<records[i].addedNodes.length;++j){
							self.on_dom_mutation($(records[i].addedNodes[j]));
						}
					}
				}
			});
			mo.observe(
				$(is_archive?"#main":".board")[0],
				{
					"childList":true,
					"subtree":true,
					"characterData":true
				}
			);
		}
		catch(e){
			console.log(e);
			MutationObserver=null;
		}
	}
	if(!MutationObserver){
		$($(is_archive?"#main":".board")[0]).on("DOMNodeInserted",function(event){
			self.on_dom_mutation($(event.target));
			return true;
		});
	}
}
ThreadManager.prototype.on_dom_mutation=function(target){
	if(target.hasClass("inline")||target.hasClass("postContainer")){
		this.parse_post(target);
	}
	else if(target.hasClass("backlinkHr")){
		this.parse_post(target.parent().parent());
	}
}
ThreadManager.prototype.parse_post=function(container){
	var post_id=(container.attr("id")||"0").replace(/(\w+_)?[^0-9]/g,"");
	var redo=(post_id in this.posts);
	var image=container.find(is_archive?".thread_image_link":".fileThumb");
	var post=container.find(is_archive?".text":".postMessage");
	image=(image.length>0?image.attr("href"):null);
	if(is_archive&&image!==null){
		var match;
		if((match=/\/(\w+)\/redirect\/(.+)/.exec(image))!==null){
			image="//images.4chan.org/"+match[1]+"/src/"+match[2];
		}
	}
	var post_data_copy={
		"container":container,
		"image_url":image,
		"post":(post.length>0?$(post[0]):null)
	};
	if(!redo){
		this.posts[post_id]=post_data_copy;
	}
	inline_post_parse(this.posts[post_id],redo,post_data_copy);
	if(script_settings["inline"]["url_replace"])inline_post_parse_for_urls(this.posts[post_id],redo,post_data_copy);
}
ThreadManager.prototype.post=function(index){
	index+="";
	return(index in this.posts?this.posts[index]:null);
}
var inline_update_span=null;
var inline_update_link=null;
function inline_setup(){
	$=jQuery;
	var reload,reload_span,end;
	if(!is_archive){
		$("#navtopright").prepend(reload=E("span"));
		$("#navtopright").prepend(E("a").html("Media Player").attr("href","#").on("click",function(event){open_player(true);return false;}));
		$("#navtopright").prepend(T("["));
		end="] ";
	}
	else{
		$(".letters").append(T(" [ "));
		$(".letters").append(E("a").html("Media Player").attr("href","#").on("click",function(event){open_player(true);return false;}));
		$(".letters").append(reload=E("span"));
		end=" ]";
	}
	reload.before(inline_update_span=E("span").css("display","none"));
	inline_update_span.append(T(" / "));
	inline_update_span.append(
		(inline_update_link=E("a"))
		.html("Update")
		.attr("href","#")
		.on("click",function(event){return script_update(event);})
	);
	reload.append(reload_span=E("span").css("display","none"));
	reload_span.append(T(" / "));
	reload_span.append(E("a").html("Reload").attr("href","#").on("click",function(event){open_player(false);settings_save();return false;}));
	reload.append(T(end));
	reload.on("mouseover",{"reload_span":reload_span},function(event){
		reload_span.css("display","");
	});
	reload.on("mouseout",{"reload_span":reload_span},function(event){
		reload_span.css("display","none");
	});
	var threads=$(".thread");
	if(threads.length>0){
		$(threads[0]).before(
			E("div")
			.append(T("[ "))
			.append(
				(sound_auto_checker.link=E("a"))
				.attr("href","#")
				.html("Detect Sounds")
				.on("click",{},inline_detect_all_in_thread)
			)
			.append(T(" / "))
			.append(
				(sound_auto_loader.link=E("a"))
				.attr("href","#")
				.html("Load All Sounds")
				.on("click",{},inline_load_all_in_thread)
			)
			.append(T(" ]"))
		);
	}
}
function inline_post_parse(post_data,redo,post_data_copy){
	if(post_data.image_url!=null){
		if(redo){
			post_data_copy.post.find(".SPLoadLink").each(function(index){
				var tag_id=parseInt($(this).attr("_sp_tag_id"));
				$(this)
				.html(post_data.sounds[tag_id])
				.off("click")
				.on("click",{"post_data":post_data,"tag_id":tag_id},inline_link_click);
			});
			post_data_copy.sounds.load_all_link
			.html(post_data.sounds.load_all_text)
			.on("click",{"post_data":post_data},inline_load_all);
		}
		else{
			post_data.sounds={
				"post_tags":[],
				"load_all_link":null,
				"load_all_text":"sounds",
				"sound_names":[],
				"loaded":false,
				"about_container":null,
				"about_count_label":null,
				"about_list_container":null,
				"auto_check":{
					"search_span":null,
					"search_status":null
				}
			};
			var sounds_found=dom_replace(
				post_data.post,
				function(tag,old_tags){
					var name=tag.prop("tagName");
					if(name===undefined)return 2;
					name=name.toLowerCase();
					if(is_archive){
						if(
							(name=="span"&&tag.hasClass("greentext"))||
							(name=="span"&&tag.hasClass("spoiler"))
						)return 1;
					}
					else{
						if(
							(name=="span"&&tag.hasClass("quote"))||
							name=="s"
						)return 1;
					}
					return 0;
				},
				inline_replace_tags
			);
			post_data.post.find(".SPLoadLink").each(function(index){
				var tag_id=post_data.sounds.post_tags.length;
				post_data.sounds.post_tags.push($(this).html());
				$(this)
				.attr("href","#")
				.attr("_sp_tag_id",tag_id)
				.on("click",{"post_data":post_data,"tag_id":tag_id},inline_link_click);
			});
			if(is_archive){
				var file_size_label=post_data.container.find(".post_file_controls").find("a");
				file_size_label=$(file_size_label[0]);
				file_size_label.before((post_data.sounds.load_all_link=E("a")).addClass("SPLoadAllLink btnr parent"));
			}
			else{
				var file_size_label=post_data.container.find(".fileText");
				file_size_label.after((post_data.sounds.load_all_link=E("a")).addClass("SPLoadAllLink"));
				file_size_label.after(T(" "));
			}
			post_data.sounds.load_all_link
			.attr("href","#")
			.html(post_data.sounds.load_all_text)
			.on("click",{"post_data":post_data},inline_load_all);
			post_data.post
			.before(
				(post_data.sounds.about_container=E("div"))
				.css("font-size","10px")
				.css("padding-top","10px")
				.css("display","none")
				.append(
					(post_data.sounds.about_count_label=E("div"))
				)
				.append(
					(post_data.sounds.about_list_container=E("div"))
				)
			);
			post_data.sounds.load_all_link
			.after(
				(post_data.sounds.auto_check.search_span=E("span"))
				.addClass("SPImageSearchingTextContainer")
				.css("display",(sound_auto_checker.enabled?"":"none"))
				.html("...")
				.append(
					(post_data.sounds.auto_check.search_status=E("span"))
					.addClass("SPImageSearchingText")
				)
			);
			sound_auto_loader.add_to_queue(post_data);
			sound_auto_checker.add_to_queue(post_data);
		}
	}
}
function inline_link_click(event){
	var load_str="loading...";
	$(this).html(load_str);
	event.data.post_data.sounds.loaded=true;
	open_player(true);
	media_player_instance.attempt_load(
		event.data.post_data.image_url,
		event.data.post_data.sounds.post_tags[event.data.tag_id],
		{
			"object":$(this),
			"post_data":event.data.post_data,
			"tag_id":event.data.tag_id,
			"load_str":load_str
		},
		function(event,data){
			var progress=Math.floor((event.loaded/event.total)*100);
			data.object.html(data.load_str+" ("+progress+")");
		},
		function(okay,data){
			data.object.html(data.post_data.sounds.post_tags[data.tag_id]+(okay?"":" (ajax&nbsp;error)"));
		},
		function(status,data,all_files){
			if(all_files!==null&&data.post_data.sounds.sound_names.length==0&&all_files.length>0){
				data.post_data.sounds.sound_names=all_files;
				inline_update_about_image(data.post_data);
			}
		}
	);
	return false;
}
function inline_link_top_click(event){
	var load_str="loading...";
	$(this).html(load_str);
	var tag=event.data.post_data.sounds.sound_names[event.data.sound_id];
	if(tag.substr(tag.length-4,4).toLowerCase()==".ogg"){
		tag=tag.substr(0,tag.length-4);
	}
	event.data.post_data.sounds.loaded=true;
	open_player(true);
	media_player_instance.attempt_load(
		event.data.post_data.image_url,
		tag,
		{
			"object":$(this),
			"post_data":event.data.post_data,
			"sound_id":event.data.sound_id,
			"load_str":load_str,
			"tag":tag
		},
		function(event,data){
			var progress=Math.floor((event.loaded/event.total)*100);
			data.object.html(data.load_str+" ("+progress+")");
		},
		function(okay,data){
			data.object.html(data.tag+(okay?"":" (ajax&nbsp;error)"));
		},
		function(status,data,all_files){
			if(all_files!==null&&data.post_data.sounds.sound_names.length==0&&all_files.length>0){
				data.post_data.sounds.sound_names=all_files;
				inline_update_about_image(data.post_data);
			}
		}
	);
	return false;
}
function inline_load_all(event){
	inline_activate_load_all_link(event.data.post_data);
	return false;
}
function inline_detect_all_in_thread(event){
	if(sound_auto_checker.enabled){
		sound_auto_checker.disable();
	}
	else{
		sound_auto_checker.enable();
	}
	return false;
}
function inline_load_all_in_thread(event){
	if(sound_auto_loader.enabled){
		sound_auto_loader.disable();
	}
	else{
		sound_auto_loader.enable();
	}
	return false;
}
function inline_replace_tags(tags){
	var sounds_found=false;
	var new_text=text_to_html(tags[0].text()).replace(/\[.+?\]/g,function(match){
		sounds_found=true;
		return"[<a class=\"SPLoadLink\">"+match.substr(1,match.length-2)+"</a>]";
	});
	if(sounds_found){
		tags[0].after(new_text).remove();
		return true;
	}
	return false;
}
function inline_update_about_image(post_data){
	post_data.sounds.about_container.css("display","");
	var sound_count=0;
	var file_count=post_data.sounds.sound_names.length;
	post_data.sounds.about_list_container.html("");
	for(var sound=true;;sound=false){
		for(var i=0;i<post_data.sounds.sound_names.length;++i){
			var is_sound=(post_data.sounds.sound_names[i].split(".").pop().toLowerCase()=="ogg");
			if(sound==is_sound){
				if(sound){
					if(is_sound)++sound_count;
					post_data.sounds.about_list_container
					.append(
						E("div")
						.append(T("- "))
						.append(
							E("a")
							.attr("href","#")
							.addClass("SPLoadLinkTop")
							.html(text_to_html(post_data.sounds.sound_names[i].substr(0,post_data.sounds.sound_names[i].length-4)))
							.on("click",{"post_data":post_data,"sound_id":i},inline_link_top_click)
						)
					);
				}
				else{
					post_data.sounds.about_list_container
					.append(
						E("div")
						.append(T("- "))
						.append(
							E("span")
							.addClass("SPLoadLinkTopFile")
							.html(text_to_html(post_data.sounds.sound_names[i]))
						)
					);
				}
			}
		}
		if(!sound)break;
	}
	var str="";
	if(sound_count>0){
		str+=sound_count+" Sound"+(sound_count==1?"":"s")+" Found";
	}
	if(file_count>sound_count){
		str+=(str.length==0?"":" / ")+file_count+" File"+(file_count==1?"":"s")+" Found";
	}
	post_data.sounds.about_count_label.html(str);
}
function inline_activate_load_all_link(post_data,done_callback){
	var load_str="loading";
	post_data.sounds.load_all_link.html(load_str);
	post_data.sounds.loaded=true;
	open_player(true);
	media_player_instance.attempt_load(
		post_data.image_url,
		MediaPlayer.ALL_SOUNDS,
		{
			"object":post_data.sounds.load_all_link,
			"post_data":post_data,
			"load_str":load_str
		},
		function(event,data){
			var progress=Math.floor((event.loaded/event.total)*100);
			data.object.html(data.load_str+" ("+progress+")");
		},
		function(okay,data){
			data.object.html(
				data.post_data.sounds.load_all_text+(okay?"":" (ajax&nbsp;error)")
			);
			if(!okay){
				if(typeof(done_callback)=="function")done_callback(false,data.post_data);
			}
		},
		function(status,data,all_files){
			if(all_files!==null&&data.post_data.sounds.sound_names.length==0&&all_files.length>0){
				data.post_data.sounds.sound_names=all_files;
				inline_update_about_image(data.post_data);
			}
			if(typeof(done_callback)=="function")done_callback(false,data.post_data);
		}
	);
	return false;
}
function inline_post_parse_for_urls(post_data,redo,post_data_copy){
	if(redo){
		post_data_copy.post.find(".MPReplacedURL").each(function(index){
			var vid_id=$(this).attr("_mp_vid_id");
			vid_id=vid_id||null;
			var href=$(this).attr("_mp_original_url");
			$(this)
			.off("click")
			.on("click",{"post_data":post_data,"vid_id":vid_id,"url":href},on_inline_url_click);
		});
	}
	else{
		var links_found=dom_replace(
			post_data.post,
			function(tag,old_tags){
				var name=tag.prop("tagName");
				if(name===undefined)return 2;
				name=name.toLowerCase();
				if(is_archive){
					if(
						(name=="span"&&tag.hasClass("greentext"))||
						(name=="span"&&tag.hasClass("spoiler"))
					)return 1;
				}
				else{
					if(
						(name=="span"&&tag.hasClass("quote"))||
						name=="s"
					)return 1;
					if(name=="wbr")return 2;
				}
				return 0;
			},
			inline_replace_urls
		);
		if(links_found){
			post_data.post.find(".MPReplacedURL").each(function(index){
				var href=html_to_text(string_remove_tags($(this).html()));
				if(href.indexOf(":")<0)href="//"+href;
				var vid_id=MediaPlayer.prototype.url_get_youtube_video_id(href);
				$(this)
				.attr("href",href)
				.attr("_mp_original_url",href)
				.on("click",{"post_data":post_data,"vid_id":vid_id,"url":href},on_inline_url_click);
				if(vid_id!==null){
					$(this)
					.attr("_mp_vid_id",vid_id)
					.html(
						$(document.createElement("img"))
						.attr("src","//youtube.com/favicon.ico")
						.attr("alt","")
						.attr("title","")
						.css({"vertical-align":"middle"})
					)
					.append(
						E("span")
						.css({"padding-left":"8px"})
						.html("Youtube: "+vid_id)
					);
					ajax_get(
						"//gdata.youtube.com/feeds/api/videos/"+vid_id,true,{a:$(this)},null,
						function(okay,data,response){
							if(okay){
								var xml=$.parseXML(response);
								var title;
								try{
									title=$(xml_find_nodes_by_name(xml,"title")).text();
								}
								catch(e){
									console.log(e);
									title="Unknown Title";
								}
								data.a.find("span").html(title);
							}
							else{
								data.a.find("span").html("Video not found").css("font-style","italic");
							}
						}
					);
				}
			});
		}
	}
}
function inline_replace_urls(tags){
	var full_text="";
	var in_url=false;
	var any_found=true;
	var length_add;
	var link_str=["<a class=\"MPReplacedURL\">","</a>"];
	for(var i=0;i<tags.length;++i){
		if(tags[i].prop("tagName")===undefined){
			var text=text_to_html(tags[i].text());
			var start=0;
			if(in_url){
				in_url=false;
				text=text.replace(/^(?:[^\s]*)/im,function(match,offset){
					in_url=(text.length==offset+match.length);
					return match+(in_url?"":link_str[1]);
				});
			}
			if(!in_url){
				length_add=0;
				text=text.replace(/(?:(?:\w+):\/\/|www\.)(?:[^\s]+)/im,function(match,offset){
					any_found=true;
					in_url=(offset+match.length==text.length+length_add);
					length_add+=(link_str[0].length+(in_url?0:link_str[1].length));
					return link_str[0]+match+(in_url?"":link_str[1]);
				});
			}
			full_text+=text;
		}
		else{
			full_text+=$('<div>').append(tags[i].clone()).html();
		}
	}
	if(in_url){
		in_url=false;
		full_text+=link_str[1];
	}
	if(any_found){
		tags[0].before(full_text);
		for(var i=0;i<tags.length;++i)tags[i].remove();
	}
	return any_found;
}
function on_inline_url_click(event){
	if(event.data.vid_id!==null){
		open_player(true);
		media_player_instance.attempt_load_video(
			event.data.url,
			null,
			{"post_data":event.data.post_data,"link":$(this)},
			function(event,data){
			},
			function(okay,data){
			},
			function(status,data,xml_info){
			}
		);
	}
	return false;
}
function string_remove_tags(str){
	return str.replace(/<[^>]*>?/g,"");
}
function dom_replace(tag,check_callback,replace_callback){
	var c=tag.contents();
	var sub_tags=[new Array()];
	var check,t;
	var i=0;
	for(var j=0;j<c.length;++j){
		t=$(c[j]);
		check=check_callback(t,sub_tags[i]);
		if(check<=1&&sub_tags[i].length>0){
			sub_tags.push(new Array());
			++i;
		}
		if(check>=1){
			sub_tags[i].push(t);
			if(t.prop("tagName")!==undefined&&t.contents().length>0){
				dom_replace(t,check_callback,replace_callback);
			}
		}
	}
	var found=false;
	for(i=0;i<sub_tags.length&&sub_tags[i].length>0;++i){
		found=(replace_callback(sub_tags[i])||found);
	}
	return found;
}
function SoundAutoLoader(){
	this.looping=false;
	this.timer=null;
	this.delay=500;
	this.queue=new Array();
	this.serial=true;
	this.enabled=false;
	this.link=null;
}
SoundAutoLoader.prototype.add_to_queue=function(post_data){
	post_data.loaded=true;
	this.queue.push(post_data);
	this.loop();
}
SoundAutoLoader.prototype.enable=function(){
	if(!this.enabled){
		this.link.removeAttr("href");
		this.link.html("Loading All Sounds");
		this.enabled=true;
		this.loop();
	}
}
SoundAutoLoader.prototype.disable=function(){
	if(this.enabled){
		this.link.attr("href","#");
		this.link.html("Load All Sounds");
		this.enabled=false;
		this.looping=false;
		if(this.timer!=null){
			clearTimeout(this.timer);
			this.timer=null;
		}
	}
}
SoundAutoLoader.prototype.loop=function(){
	if(!this.enabled||this.looping)return;
	this.looping=true;
	this.loop_next();
}
SoundAutoLoader.prototype.loop_next=function(){
	if(!this.enabled)return;
	this.looping=(this.queue.length>0);
	if(!this.looping){
		this.disable();
		return;
	}
	while(this.queue.length>0){
		this.load_single(this.queue.shift());
		if(this.serial)break;
	}
}
SoundAutoLoader.prototype.load_single=function(post_data){
	var self=this;
	inline_activate_load_all_link(post_data,function(okay,post_data){
		self.load_single_done();
	});
}
SoundAutoLoader.prototype.load_single_done=function(){
	var self=this;
	this.timer=setTimeout(function(){
		self.timer=null;
		self.loop_next();
	},this.delay);
}
var sound_auto_loader=new SoundAutoLoader();
function SoundAutoChecker(){
	this.looping=false;
	this.timer=null;
	this.delay=500;
	this.queue=new Array();
	this.serial=true;
	this.enabled=false;
	this.link=null;
	this.callbacks=[image_check_callback,png_check_callback];
}
SoundAutoChecker.prototype.add_to_queue=function(post_data){
	post_data.loaded=true;
	this.queue.push(post_data);
	this.loop();
}
SoundAutoChecker.prototype.enable=function(){
	if(!this.enabled){
		for(var i=0;i<this.queue.length;++i){
			this.queue[i].sounds.auto_check.search_span.css("display","");
		}
		this.link.removeAttr("href");
		this.link.html("Detecting Sounds");
		this.enabled=true;
		this.loop();
	}
}
SoundAutoChecker.prototype.disable=function(){
	if(this.enabled){
		for(var i=0;i<this.queue.length;++i){
			this.queue[i].sounds.auto_check.search_span.css("display","none");
		}
		this.link.attr("href","#");
		this.link.html("Detect Sounds");
		this.enabled=false;
		this.looping=false;
		if(this.timer!=null){
			clearTimeout(this.timer);
			this.timer=null;
		}
	}
}
SoundAutoChecker.prototype.loop=function(){
	if(!this.enabled||this.looping)return;
	this.looping=true;
	this.loop_next();
}
SoundAutoChecker.prototype.loop_next=function(){
	if(!this.enabled)return;
	this.looping=(this.queue.length>0);
	var loaded=false;
	while(this.queue.length>0){
		var post_data=this.queue.shift();
		if(post_data.sounds.sound_names.length==0){
			loaded=true;
			this.load_single(post_data);
			if(this.serial)break;
		}
		else{
			post_data.sounds.auto_check.search_span.css("display","none");
		}
	}
	this.looping=!loaded;
}
SoundAutoChecker.prototype.load_single=function(post_data){
	var self=this;
	ajax_get(
		post_data.image_url,
		false,
		post_data,
		function(event,post_data){},
		function(okay,post_data,response){
			var callback_id=(okay?0:self.callbacks.length);
			self.load_single_callbacks(post_data,callback_id,response);
		}
	);
}
SoundAutoChecker.prototype.load_single_callbacks=function(post_data,callback_id,response){
	if(callback_id>=this.callbacks.length){
		post_data.sounds.auto_check.search_span.css("display","none");
		this.load_single_done();
	}
	else{
		var self=this;
		this.callbacks[callback_id](
			post_data.image_url,
			response,
			post_data,
			function(image_data,post_data){
				if(image_data==null||image_data[1].length<=0){
					self.load_single_callbacks(post_data,callback_id+1,response);
				}
				else{
					post_data.sounds.sound_names=image_data[1];
					inline_update_about_image(post_data);
					post_data.sounds.auto_check.search_span.css("display","none");
					self.load_single_done();
				}
			}
		);
	}
}
SoundAutoChecker.prototype.load_single_done=function(){
	var self=this;
	this.timer=setTimeout(function(){
		self.timer=null;
		self.loop_next();
	},this.delay);
}
var sound_auto_checker=new SoundAutoChecker();
var media_player_instance=null;
var media_player_css=null;
var media_player_css_color_presets={
	"yotsubab":{
		"@name":"Yotsuba B",
		"bg_outer_color":[0,0,0,0.25],
		"bg_color_lightest":[255,255,255,1.0],
		"bg_color_light":[238,242,255,1.0],
		"bg_color_dark":[214,218,240,1.0],
		"bg_color_darker":[183,197,217,1.0],
		"bg_color_darkest":[0,0,0,1.0],
		"color_special_1":[52,52,92,1.0],
		"color_special_2":[221,0,0,1.0],
		"color_standard":[0,0,0,1.0],
		"color_disabled":[120,124,128,1.0],
		"color_light":[120,124,128,1.0],
		"color_highlight_light":[255,255,255,1.0],
		"volume_colors":[[52,52,92,1.0]]
	},
	"photon":{
		"@name":"Photon",
		"bg_outer_color":[51,51,51,0.25],
		"bg_color_lightest":[255,255,255,1.0],
		"bg_color_light":[238,238,238,1.0],
		"bg_color_dark":[221,221,221,1.0],
		"bg_color_darker":[204,204,204,1.0],
		"bg_color_darkest":[0,0,0,1.0],
		"color_special_1":[0,74,153,1.0],
		"color_special_2":[255,102,0,1.0],
		"color_standard":[51,51,51,1.0],
		"color_disabled":[128,128,128,1.0],
		"color_light":[128,128,128,1.0],
		"color_highlight_light":[255,255,255,1.0],
		"volume_colors":[[255,102,0,1.0]]
	},
	"tomorrow":{
		"@name":"Tomorrow",
		"bg_outer_color":[197,200,198,0.25],
		"bg_color_lightest":[0,0,0,1.0],
		"bg_color_light":[29,31,33,1.0],
		"bg_color_dark":[40,42,46,1.0],
		"bg_color_darker":[54,56,60,1.0],
		"bg_color_darkest":[255,255,255,1.0],
		"color_special_1":[197,200,198,1.0],
		"color_special_2":[129,162,190,1.0],
		"color_standard":[197,200,198,1.0],
		"color_disabled":[125,128,126,1.0],
		"color_light":[125,128,126,1.0],
		"color_highlight_light":[0,0,0,1.0],
		"volume_colors":[[129,162,190,1.0]]
	},
	"foolz":{
		"@name":"Foolz",
		"bg_outer_color":[0,0,0,0.25],
		"bg_color_lightest":[255,255,255,1.0],
		"bg_color_light":[238,248,240,1.0],
		"bg_color_dark":[214,240,218,1.0],
		"bg_color_darker":[183,217,197,1.0],
		"bg_color_darkest":[0,0,0,1.0],
		"color_special_1":[17,119,67,1.0],
		"color_special_2":[0,85,128,1.0],
		"color_standard":[54,64,65,1.0],
		"color_disabled":[120,128,124,1.0],
		"color_light":[120,128,124,1.0],
		"color_highlight_light":[255,255,255,1.0],
		"volume_colors":[[17,119,67,1.0]]
	}
};
var media_player_css_size_presets={
	"yotsubab":{
		"@name":"Yotsuba B",
		"bg_outer_size":2,
		"bg_outer_border_radius":6,
		"bg_inner_border_radius":4,
		"border_radius_normal":4,
		"border_radius_small":2,
		"main_font":"arial,helvetica,sans-serif",
		"controls_font":"Verdana",
		"font_size":12,
		"font_size_small":8,
		"font_size_controls":12,
		"padding_scale":1.0,
		"font_scale":1.0,
		"border_scale":1.0
	},
	"photon":{
		"@name":"Photon",
		"bg_outer_size":2,
		"bg_outer_border_radius":6,
		"bg_inner_border_radius":4,
		"border_radius_normal":4,
		"border_radius_small":2,
		"main_font":"arial,helvetica,sans-serif",
		"controls_font":"Verdana",
		"font_size":12,
		"font_size_small":8,
		"font_size_controls":12,
		"padding_scale":1.0,
		"font_scale":1.0,
		"border_scale":1.0
	},
	"tomorrow":{
		"@name":"Tomorrow",
		"bg_outer_size":2,
		"bg_outer_border_radius":6,
		"bg_inner_border_radius":4,
		"border_radius_normal":4,
		"border_radius_small":2,
		"main_font":"arial,helvetica,sans-serif",
		"controls_font":"Verdana",
		"font_size":12,
		"font_size_small":8,
		"font_size_controls":12,
		"padding_scale":1.0,
		"font_scale":1.0,
		"border_scale":1.0
	},
	"foolz":{
		"@name":"Foolz",
		"bg_outer_size":2,
		"bg_outer_border_radius":6,
		"bg_inner_border_radius":4,
		"border_radius_normal":4,
		"border_radius_small":2,
		"main_font":"arial,helvetica,sans-serif",
		"controls_font":"Verdana",
		"font_size":12,
		"font_size_small":8,
		"font_size_controls":12,
		"padding_scale":1.0,
		"font_scale":1.0,
		"border_scale":1.0
	}
};
function media_player_destruct_callback(sound_player){
	settings_save();
	media_player_instance=null;
	media_player_css=null;
}
function open_player(load_settings){
	if(media_player_instance!=null){
		media_player_instance.focus();
		return media_player_instance;
	}
	media_player_css=new MediaPlayerCSS("yotsubab",media_player_css_color_presets,media_player_css_size_presets);
	if(load_settings)media_player_css.load(script_settings["style"]);
	media_player_instance=new MediaPlayer(
		media_player_css,
		[png_load_callback,image_load_callback],
		function(media_player){settings_save();},
		media_player_destruct_callback,
		[
			{
				"current":script_settings["inline"]["url_replace"],
				"label":"URL Replacing",
				"values":[true,false],
				"descr":["Enabled","Disabled"],
				"change":function(value){
					script_settings["inline"]["url_replace"]=value;
					settings_save();
				}
			}
		]
	);
	if(load_settings)media_player_instance.load(script_settings["player"]);
	media_player_instance.create();
	return media_player_instance;
}
var script_settings_loaded=false;
var script_settings={
	"player":{},
	"style":{},
	"script":{
		"sub_version":0,
		"last_update":0,
		"update_found":false,
		"update_url":"",
		"update_version":"",
		"current_version":"",
		"update_message":""
	},
	"inline":{
		"url_replace":true
	}
};
function settings_save(){
	if(media_player_instance!=null){
		script_settings["player"]=media_player_instance.save();
		script_settings["style"]=media_player_instance.css.save();
	}
	try{
		localStorage.setItem("4cs",JSON.stringify(script_settings));
	}
	catch(e){
		console.log(e);
	}
}
function settings_load(){
	if(!script_settings_loaded){
		script_settings_loaded=true;
		try{
			var s=localStorage.getItem("4cs");
			if(s){
				s=JSON.parse(s);
				for(var key in script_settings){
					if(key in s)script_settings[key]=s[key];
				}
			}
		}
		catch(e){
			console.log(e);
		}
	}
}
var script_update_version_url="https://raw.github.com/dnsev/4cs/master/web/version.txt";
function script_update(event){
	if(!event.originalEvent.which||event.originalEvent.which==1){
		var scr={};
		try{
			scr=GM_info.script;
		}
		catch(e){
			console.log(e);
		}
		var s="An update is available to \""+scr.name+"\".\n\n"+
			"Current version: "+scr.version+"\n"+
			"Update Version: "+script_settings["script"]["update_version"]+"\n\n"+
			"About: "+script_settings["script"]["update_message"]+"\n\n"+
			"Middle click the link or copy and paste the following url:               ";
		prompt(s,script_settings["script"]["update_url"]);
		return false;
	}
	return true;
}
function script_update_check(ajax){
	var fn=function(){
		inline_update_span.css("display","");
		inline_update_link.html("UPDATE");
		inline_update_link.attr("href",script_settings["script"]["update_url"]);
	};
	if(ajax){
		ajax_get(
			"https://raw.github.com/dnsev/4cs/master/web/version.txt",
			true,
			{},
			null,
			function(okay,data,response){
				if(okay){
					try{
						var s=JSON.parse(response);
						script_settings["script"]["update_url"]=s[is_chrome()?"update_url_gc":"update_url_ff"];
						script_settings["script"]["update_version"]=s["version"].toString();
						script_settings["script"]["last_update"]=(new Date()).getTime();
						script_settings["script"]["update_message"]=(s["message"]||"").toString();
						if(script_settings["script"]["update_version"]!==GM_info.script.version){
							fn();
							script_settings["script"]["update_found"]=true;
						}
						else{
							script_settings["script"]["update_found"]=false;
						}
						settings_save();
					}
					catch(e){
						console.log(e);
					}
				}
			}
		);
	}
	else{
		fn();
	}
}
jQuery(document).ready(function(){
	settings_load();
	window._unsafe_exec=function(){
		if(window._unsafe!==undefined){
			window._unsafe_return=window[window._unsafe.func].call(window,window._unsafe.data);
			window._unsafe.tag.parentNode.removeChild(window._unsafe.tag);
			window[window._unsafe.func]=undefined;
			window._unsafe=undefined;
		}
	}
	tag=document.createElement('script');
	tag.innerHTML="window._unsafe_exec = "+window._unsafe_exec.toString()+";";
	document.body.appendChild(tag);
	window._unsafe_exec=function(exec_function,data){
		var tag=document.createElement('script');
		var _unsafe={
			"tag":tag,
			"func":"_unsafe_f049fwjef0rghr09",
			"data":data
		};
		tag.innerHTML="window."+_unsafe.func+" = "+exec_function.toString()+"; window._unsafe_exec();";
		unsafeWindow._unsafe=_unsafe;
		document.body.appendChild(tag);
		var r=unsafeWindow._unsafe_return;
		unsafeWindow._unsafe_return=undefined;
		return r;
	}
	$.getScript("//www.youtube.com/iframe_api",function(script,status,jqXHR){});
	inline_setup();
	thread_manager=new ThreadManager();
	var time_update;
	var version="";
	try{
		version=GM_info.script.version;
	}
	catch(e){
		console.log(e);
	}
	if(
		(time_update=((new Date()).getTime()-script_settings["script"]["last_update"]>=1000*60*60*24))||
		(time_update=(version!=script_settings["script"]["current_version"]))||
		script_settings["script"]["update_found"]
	){
		script_settings["script"]["current_version"]=version;
		script_update_check(time_update);
	}
});
