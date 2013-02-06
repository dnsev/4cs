// ==UserScript==
// @name        4chan Media Player
// @version     1.10.3.3
// @namespace   dnsev
// @description 4chan Media Player :: Sounds, Youtube, and Vimeo playback
// @grant       GM_xmlhttpRequest
// @grant       GM_info
// @grant       GM_getValue
// @grant       GM_setValue
// @include     http://boards.4chan.org/*
// @include     https://boards.4chan.org/*
// @include     http://archive.foolz.us/*
// @include     https://archive.foolz.us/*
// @include     http://dnsev.github.com/4cs/*
// @icon        data:image/gif;base64,R0lGODlhEAAQAKECAAAAAGbMM////////yH5BAEKAAIALAAAAAAQABAAAAIllI+pB70KQgAPNUmroDHX7Gie95AkpCUn1ISlhKVR/MEre6dLAQA7
// @updateURL   https://raw.github.com/dnsev/4cs/master/web/4cs.user.js
// @downloadURL https://raw.github.com/dnsev/4cs/master/web/4cs.user.js
// ==/UserScript==
// For license information, check the individual files
(function(e,t){"use strict";function n(e){var t=e.length,n=st.type(e);return st.isWindow(e)?!1:1===e.nodeType&&t?!0:"array"===n||"function"!==n&&(0===t||"number"==typeof t&&t>0&&t-1 in e)}function r(e){var t=Tt[e]={};return st.each(e.match(lt)||[],function(e,n){t[n]=!0}),t}function i(e,n,r,i){if(st.acceptData(e)){var o,a,s=st.expando,u="string"==typeof n,l=e.nodeType,c=l?st.cache:e,f=l?e[s]:e[s]&&s;if(f&&c[f]&&(i||c[f].data)||!u||r!==t)return f||(l?e[s]=f=K.pop()||st.guid++:f=s),c[f]||(c[f]={},l||(c[f].toJSON=st.noop)),("object"==typeof n||"function"==typeof n)&&(i?c[f]=st.extend(c[f],n):c[f].data=st.extend(c[f].data,n)),o=c[f],i||(o.data||(o.data={}),o=o.data),r!==t&&(o[st.camelCase(n)]=r),u?(a=o[n],null==a&&(a=o[st.camelCase(n)])):a=o,a}}function o(e,t,n){if(st.acceptData(e)){var r,i,o,a=e.nodeType,u=a?st.cache:e,l=a?e[st.expando]:st.expando;if(u[l]){if(t&&(r=n?u[l]:u[l].data)){st.isArray(t)?t=t.concat(st.map(t,st.camelCase)):t in r?t=[t]:(t=st.camelCase(t),t=t in r?[t]:t.split(" "));for(i=0,o=t.length;o>i;i++)delete r[t[i]];if(!(n?s:st.isEmptyObject)(r))return}(n||(delete u[l].data,s(u[l])))&&(a?st.cleanData([e],!0):st.support.deleteExpando||u!=u.window?delete u[l]:u[l]=null)}}}function a(e,n,r){if(r===t&&1===e.nodeType){var i="data-"+n.replace(Nt,"-$1").toLowerCase();if(r=e.getAttribute(i),"string"==typeof r){try{r="true"===r?!0:"false"===r?!1:"null"===r?null:+r+""===r?+r:wt.test(r)?st.parseJSON(r):r}catch(o){}st.data(e,n,r)}else r=t}return r}function s(e){var t;for(t in e)if(("data"!==t||!st.isEmptyObject(e[t]))&&"toJSON"!==t)return!1;return!0}function u(){return!0}function l(){return!1}function c(e,t){do e=e[t];while(e&&1!==e.nodeType);return e}function f(e,t,n){if(t=t||0,st.isFunction(t))return st.grep(e,function(e,r){var i=!!t.call(e,r,e);return i===n});if(t.nodeType)return st.grep(e,function(e){return e===t===n});if("string"==typeof t){var r=st.grep(e,function(e){return 1===e.nodeType});if(Wt.test(t))return st.filter(t,r,!n);t=st.filter(t,r)}return st.grep(e,function(e){return st.inArray(e,t)>=0===n})}function p(e){var t=zt.split("|"),n=e.createDocumentFragment();if(n.createElement)for(;t.length;)n.createElement(t.pop());return n}function d(e,t){return e.getElementsByTagName(t)[0]||e.appendChild(e.ownerDocument.createElement(t))}function h(e){var t=e.getAttributeNode("type");return e.type=(t&&t.specified)+"/"+e.type,e}function g(e){var t=nn.exec(e.type);return t?e.type=t[1]:e.removeAttribute("type"),e}function m(e,t){for(var n,r=0;null!=(n=e[r]);r++)st._data(n,"globalEval",!t||st._data(t[r],"globalEval"))}function y(e,t){if(1===t.nodeType&&st.hasData(e)){var n,r,i,o=st._data(e),a=st._data(t,o),s=o.events;if(s){delete a.handle,a.events={};for(n in s)for(r=0,i=s[n].length;i>r;r++)st.event.add(t,n,s[n][r])}a.data&&(a.data=st.extend({},a.data))}}function v(e,t){var n,r,i;if(1===t.nodeType){if(n=t.nodeName.toLowerCase(),!st.support.noCloneEvent&&t[st.expando]){r=st._data(t);for(i in r.events)st.removeEvent(t,i,r.handle);t.removeAttribute(st.expando)}"script"===n&&t.text!==e.text?(h(t).text=e.text,g(t)):"object"===n?(t.parentNode&&(t.outerHTML=e.outerHTML),st.support.html5Clone&&e.innerHTML&&!st.trim(t.innerHTML)&&(t.innerHTML=e.innerHTML)):"input"===n&&Zt.test(e.type)?(t.defaultChecked=t.checked=e.checked,t.value!==e.value&&(t.value=e.value)):"option"===n?t.defaultSelected=t.selected=e.defaultSelected:("input"===n||"textarea"===n)&&(t.defaultValue=e.defaultValue)}}function b(e,n){var r,i,o=0,a=e.getElementsByTagName!==t?e.getElementsByTagName(n||"*"):e.querySelectorAll!==t?e.querySelectorAll(n||"*"):t;if(!a)for(a=[],r=e.childNodes||e;null!=(i=r[o]);o++)!n||st.nodeName(i,n)?a.push(i):st.merge(a,b(i,n));return n===t||n&&st.nodeName(e,n)?st.merge([e],a):a}function x(e){Zt.test(e.type)&&(e.defaultChecked=e.checked)}function T(e,t){if(t in e)return t;for(var n=t.charAt(0).toUpperCase()+t.slice(1),r=t,i=Nn.length;i--;)if(t=Nn[i]+n,t in e)return t;return r}function w(e,t){return e=t||e,"none"===st.css(e,"display")||!st.contains(e.ownerDocument,e)}function N(e,t){for(var n,r=[],i=0,o=e.length;o>i;i++)n=e[i],n.style&&(r[i]=st._data(n,"olddisplay"),t?(r[i]||"none"!==n.style.display||(n.style.display=""),""===n.style.display&&w(n)&&(r[i]=st._data(n,"olddisplay",S(n.nodeName)))):r[i]||w(n)||st._data(n,"olddisplay",st.css(n,"display")));for(i=0;o>i;i++)n=e[i],n.style&&(t&&"none"!==n.style.display&&""!==n.style.display||(n.style.display=t?r[i]||"":"none"));return e}function C(e,t,n){var r=mn.exec(t);return r?Math.max(0,r[1]-(n||0))+(r[2]||"px"):t}function k(e,t,n,r,i){for(var o=n===(r?"border":"content")?4:"width"===t?1:0,a=0;4>o;o+=2)"margin"===n&&(a+=st.css(e,n+wn[o],!0,i)),r?("content"===n&&(a-=st.css(e,"padding"+wn[o],!0,i)),"margin"!==n&&(a-=st.css(e,"border"+wn[o]+"Width",!0,i))):(a+=st.css(e,"padding"+wn[o],!0,i),"padding"!==n&&(a+=st.css(e,"border"+wn[o]+"Width",!0,i)));return a}function E(e,t,n){var r=!0,i="width"===t?e.offsetWidth:e.offsetHeight,o=ln(e),a=st.support.boxSizing&&"border-box"===st.css(e,"boxSizing",!1,o);if(0>=i||null==i){if(i=un(e,t,o),(0>i||null==i)&&(i=e.style[t]),yn.test(i))return i;r=a&&(st.support.boxSizingReliable||i===e.style[t]),i=parseFloat(i)||0}return i+k(e,t,n||(a?"border":"content"),r,o)+"px"}function S(e){var t=V,n=bn[e];return n||(n=A(e,t),"none"!==n&&n||(cn=(cn||st("<iframe frameborder='0' width='0' height='0'/>").css("cssText","display:block !important")).appendTo(t.documentElement),t=(cn[0].contentWindow||cn[0].contentDocument).document,t.write("<!doctype html><html><body>"),t.close(),n=A(e,t),cn.detach()),bn[e]=n),n}function A(e,t){var n=st(t.createElement(e)).appendTo(t.body),r=st.css(n[0],"display");return n.remove(),r}function j(e,t,n,r){var i;if(st.isArray(t))st.each(t,function(t,i){n||kn.test(e)?r(e,i):j(e+"["+("object"==typeof i?t:"")+"]",i,n,r)});else if(n||"object"!==st.type(t))r(e,t);else for(i in t)j(e+"["+i+"]",t[i],n,r)}function D(e){return function(t,n){"string"!=typeof t&&(n=t,t="*");var r,i=0,o=t.toLowerCase().match(lt)||[];if(st.isFunction(n))for(;r=o[i++];)"+"===r[0]?(r=r.slice(1)||"*",(e[r]=e[r]||[]).unshift(n)):(e[r]=e[r]||[]).push(n)}}function L(e,n,r,i){function o(u){var l;return a[u]=!0,st.each(e[u]||[],function(e,u){var c=u(n,r,i);return"string"!=typeof c||s||a[c]?s?!(l=c):t:(n.dataTypes.unshift(c),o(c),!1)}),l}var a={},s=e===$n;return o(n.dataTypes[0])||!a["*"]&&o("*")}function H(e,n){var r,i,o=st.ajaxSettings.flatOptions||{};for(r in n)n[r]!==t&&((o[r]?e:i||(i={}))[r]=n[r]);return i&&st.extend(!0,e,i),e}function M(e,n,r){var i,o,a,s,u=e.contents,l=e.dataTypes,c=e.responseFields;for(o in c)o in r&&(n[c[o]]=r[o]);for(;"*"===l[0];)l.shift(),i===t&&(i=e.mimeType||n.getResponseHeader("Content-Type"));if(i)for(o in u)if(u[o]&&u[o].test(i)){l.unshift(o);break}if(l[0]in r)a=l[0];else{for(o in r){if(!l[0]||e.converters[o+" "+l[0]]){a=o;break}s||(s=o)}a=a||s}return a?(a!==l[0]&&l.unshift(a),r[a]):t}function q(e,t){var n,r,i,o,a={},s=0,u=e.dataTypes.slice(),l=u[0];if(e.dataFilter&&(t=e.dataFilter(t,e.dataType)),u[1])for(n in e.converters)a[n.toLowerCase()]=e.converters[n];for(;i=u[++s];)if("*"!==i){if("*"!==l&&l!==i){if(n=a[l+" "+i]||a["* "+i],!n)for(r in a)if(o=r.split(" "),o[1]===i&&(n=a[l+" "+o[0]]||a["* "+o[0]])){n===!0?n=a[r]:a[r]!==!0&&(i=o[0],u.splice(s--,0,i));break}if(n!==!0)if(n&&e["throws"])t=n(t);else try{t=n(t)}catch(c){return{state:"parsererror",error:n?c:"No conversion from "+l+" to "+i}}}l=i}return{state:"success",data:t}}function _(){try{return new e.XMLHttpRequest}catch(t){}}function F(){try{return new e.ActiveXObject("Microsoft.XMLHTTP")}catch(t){}}function O(){return setTimeout(function(){Qn=t}),Qn=st.now()}function B(e,t){st.each(t,function(t,n){for(var r=(rr[t]||[]).concat(rr["*"]),i=0,o=r.length;o>i;i++)if(r[i].call(e,t,n))return})}function P(e,t,n){var r,i,o=0,a=nr.length,s=st.Deferred().always(function(){delete u.elem}),u=function(){if(i)return!1;for(var t=Qn||O(),n=Math.max(0,l.startTime+l.duration-t),r=n/l.duration||0,o=1-r,a=0,u=l.tweens.length;u>a;a++)l.tweens[a].run(o);return s.notifyWith(e,[l,o,n]),1>o&&u?n:(s.resolveWith(e,[l]),!1)},l=s.promise({elem:e,props:st.extend({},t),opts:st.extend(!0,{specialEasing:{}},n),originalProperties:t,originalOptions:n,startTime:Qn||O(),duration:n.duration,tweens:[],createTween:function(t,n){var r=st.Tween(e,l.opts,t,n,l.opts.specialEasing[t]||l.opts.easing);return l.tweens.push(r),r},stop:function(t){var n=0,r=t?l.tweens.length:0;if(i)return this;for(i=!0;r>n;n++)l.tweens[n].run(1);return t?s.resolveWith(e,[l,t]):s.rejectWith(e,[l,t]),this}}),c=l.props;for(R(c,l.opts.specialEasing);a>o;o++)if(r=nr[o].call(l,e,c,l.opts))return r;return B(l,c),st.isFunction(l.opts.start)&&l.opts.start.call(e,l),st.fx.timer(st.extend(u,{elem:e,anim:l,queue:l.opts.queue})),l.progress(l.opts.progress).done(l.opts.done,l.opts.complete).fail(l.opts.fail).always(l.opts.always)}function R(e,t){var n,r,i,o,a;for(n in e)if(r=st.camelCase(n),i=t[r],o=e[n],st.isArray(o)&&(i=o[1],o=e[n]=o[0]),n!==r&&(e[r]=o,delete e[n]),a=st.cssHooks[r],a&&"expand"in a){o=a.expand(o),delete e[r];for(n in o)n in e||(e[n]=o[n],t[n]=i)}else t[r]=i}function W(e,t,n){var r,i,o,a,s,u,l,c,f,p=this,d=e.style,h={},g=[],m=e.nodeType&&w(e);n.queue||(c=st._queueHooks(e,"fx"),null==c.unqueued&&(c.unqueued=0,f=c.empty.fire,c.empty.fire=function(){c.unqueued||f()}),c.unqueued++,p.always(function(){p.always(function(){c.unqueued--,st.queue(e,"fx").length||c.empty.fire()})})),1===e.nodeType&&("height"in t||"width"in t)&&(n.overflow=[d.overflow,d.overflowX,d.overflowY],"inline"===st.css(e,"display")&&"none"===st.css(e,"float")&&(st.support.inlineBlockNeedsLayout&&"inline"!==S(e.nodeName)?d.zoom=1:d.display="inline-block")),n.overflow&&(d.overflow="hidden",st.support.shrinkWrapBlocks||p.done(function(){d.overflow=n.overflow[0],d.overflowX=n.overflow[1],d.overflowY=n.overflow[2]}));for(r in t)if(o=t[r],Zn.exec(o)){if(delete t[r],u=u||"toggle"===o,o===(m?"hide":"show"))continue;g.push(r)}if(a=g.length){s=st._data(e,"fxshow")||st._data(e,"fxshow",{}),"hidden"in s&&(m=s.hidden),u&&(s.hidden=!m),m?st(e).show():p.done(function(){st(e).hide()}),p.done(function(){var t;st._removeData(e,"fxshow");for(t in h)st.style(e,t,h[t])});for(r=0;a>r;r++)i=g[r],l=p.createTween(i,m?s[i]:0),h[i]=s[i]||st.style(e,i),i in s||(s[i]=l.start,m&&(l.end=l.start,l.start="width"===i||"height"===i?1:0))}}function $(e,t,n,r,i){return new $.prototype.init(e,t,n,r,i)}function I(e,t){var n,r={height:e},i=0;for(t=t?1:0;4>i;i+=2-t)n=wn[i],r["margin"+n]=r["padding"+n]=e;return t&&(r.opacity=r.width=e),r}function z(e){return st.isWindow(e)?e:9===e.nodeType?e.defaultView||e.parentWindow:!1}var X,U,V=e.document,Y=e.location,J=e.jQuery,G=e.$,Q={},K=[],Z="1.9.0",et=K.concat,tt=K.push,nt=K.slice,rt=K.indexOf,it=Q.toString,ot=Q.hasOwnProperty,at=Z.trim,st=function(e,t){return new st.fn.init(e,t,X)},ut=/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,lt=/\S+/g,ct=/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,ft=/^(?:(<[\w\W]+>)[^>]*|#([\w-]*))$/,pt=/^<(\w+)\s*\/?>(?:<\/\1>|)$/,dt=/^[\],:{}\s]*$/,ht=/(?:^|:|,)(?:\s*\[)+/g,gt=/\\(?:["\\\/bfnrt]|u[\da-fA-F]{4})/g,mt=/"[^"\\\r\n]*"|true|false|null|-?(?:\d+\.|)\d+(?:[eE][+-]?\d+|)/g,yt=/^-ms-/,vt=/-([\da-z])/gi,bt=function(e,t){return t.toUpperCase()},xt=function(){V.addEventListener?(V.removeEventListener("DOMContentLoaded",xt,!1),st.ready()):"complete"===V.readyState&&(V.detachEvent("onreadystatechange",xt),st.ready())};st.fn=st.prototype={jquery:Z,constructor:st,init:function(e,n,r){var i,o;if(!e)return this;if("string"==typeof e){if(i="<"===e.charAt(0)&&">"===e.charAt(e.length-1)&&e.length>=3?[null,e,null]:ft.exec(e),!i||!i[1]&&n)return!n||n.jquery?(n||r).find(e):this.constructor(n).find(e);if(i[1]){if(n=n instanceof st?n[0]:n,st.merge(this,st.parseHTML(i[1],n&&n.nodeType?n.ownerDocument||n:V,!0)),pt.test(i[1])&&st.isPlainObject(n))for(i in n)st.isFunction(this[i])?this[i](n[i]):this.attr(i,n[i]);return this}if(o=V.getElementById(i[2]),o&&o.parentNode){if(o.id!==i[2])return r.find(e);this.length=1,this[0]=o}return this.context=V,this.selector=e,this}return e.nodeType?(this.context=this[0]=e,this.length=1,this):st.isFunction(e)?r.ready(e):(e.selector!==t&&(this.selector=e.selector,this.context=e.context),st.makeArray(e,this))},selector:"",length:0,size:function(){return this.length},toArray:function(){return nt.call(this)},get:function(e){return null==e?this.toArray():0>e?this[this.length+e]:this[e]},pushStack:function(e){var t=st.merge(this.constructor(),e);return t.prevObject=this,t.context=this.context,t},each:function(e,t){return st.each(this,e,t)},ready:function(e){return st.ready.promise().done(e),this},slice:function(){return this.pushStack(nt.apply(this,arguments))},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},eq:function(e){var t=this.length,n=+e+(0>e?t:0);return this.pushStack(n>=0&&t>n?[this[n]]:[])},map:function(e){return this.pushStack(st.map(this,function(t,n){return e.call(t,n,t)}))},end:function(){return this.prevObject||this.constructor(null)},push:tt,sort:[].sort,splice:[].splice},st.fn.init.prototype=st.fn,st.extend=st.fn.extend=function(){var e,n,r,i,o,a,s=arguments[0]||{},u=1,l=arguments.length,c=!1;for("boolean"==typeof s&&(c=s,s=arguments[1]||{},u=2),"object"==typeof s||st.isFunction(s)||(s={}),l===u&&(s=this,--u);l>u;u++)if(null!=(e=arguments[u]))for(n in e)r=s[n],i=e[n],s!==i&&(c&&i&&(st.isPlainObject(i)||(o=st.isArray(i)))?(o?(o=!1,a=r&&st.isArray(r)?r:[]):a=r&&st.isPlainObject(r)?r:{},s[n]=st.extend(c,a,i)):i!==t&&(s[n]=i));return s},st.extend({noConflict:function(t){return e.$===st&&(e.$=G),t&&e.jQuery===st&&(e.jQuery=J),st},isReady:!1,readyWait:1,holdReady:function(e){e?st.readyWait++:st.ready(!0)},ready:function(e){if(e===!0?!--st.readyWait:!st.isReady){if(!V.body)return setTimeout(st.ready);st.isReady=!0,e!==!0&&--st.readyWait>0||(U.resolveWith(V,[st]),st.fn.trigger&&st(V).trigger("ready").off("ready"))}},isFunction:function(e){return"function"===st.type(e)},isArray:Array.isArray||function(e){return"array"===st.type(e)},isWindow:function(e){return null!=e&&e==e.window},isNumeric:function(e){return!isNaN(parseFloat(e))&&isFinite(e)},type:function(e){return null==e?e+"":"object"==typeof e||"function"==typeof e?Q[it.call(e)]||"object":typeof e},isPlainObject:function(e){if(!e||"object"!==st.type(e)||e.nodeType||st.isWindow(e))return!1;try{if(e.constructor&&!ot.call(e,"constructor")&&!ot.call(e.constructor.prototype,"isPrototypeOf"))return!1}catch(n){return!1}var r;for(r in e);return r===t||ot.call(e,r)},isEmptyObject:function(e){var t;for(t in e)return!1;return!0},error:function(e){throw Error(e)},parseHTML:function(e,t,n){if(!e||"string"!=typeof e)return null;"boolean"==typeof t&&(n=t,t=!1),t=t||V;var r=pt.exec(e),i=!n&&[];return r?[t.createElement(r[1])]:(r=st.buildFragment([e],t,i),i&&st(i).remove(),st.merge([],r.childNodes))},parseJSON:function(n){return e.JSON&&e.JSON.parse?e.JSON.parse(n):null===n?n:"string"==typeof n&&(n=st.trim(n),n&&dt.test(n.replace(gt,"@").replace(mt,"]").replace(ht,"")))?Function("return "+n)():(st.error("Invalid JSON: "+n),t)},parseXML:function(n){var r,i;if(!n||"string"!=typeof n)return null;try{e.DOMParser?(i=new DOMParser,r=i.parseFromString(n,"text/xml")):(r=new ActiveXObject("Microsoft.XMLDOM"),r.async="false",r.loadXML(n))}catch(o){r=t}return r&&r.documentElement&&!r.getElementsByTagName("parsererror").length||st.error("Invalid XML: "+n),r},noop:function(){},globalEval:function(t){t&&st.trim(t)&&(e.execScript||function(t){e.eval.call(e,t)})(t)},camelCase:function(e){return e.replace(yt,"ms-").replace(vt,bt)},nodeName:function(e,t){return e.nodeName&&e.nodeName.toLowerCase()===t.toLowerCase()},each:function(e,t,r){var i,o=0,a=e.length,s=n(e);if(r){if(s)for(;a>o&&(i=t.apply(e[o],r),i!==!1);o++);else for(o in e)if(i=t.apply(e[o],r),i===!1)break}else if(s)for(;a>o&&(i=t.call(e[o],o,e[o]),i!==!1);o++);else for(o in e)if(i=t.call(e[o],o,e[o]),i===!1)break;return e},trim:at&&!at.call("\ufeff\u00a0")?function(e){return null==e?"":at.call(e)}:function(e){return null==e?"":(e+"").replace(ct,"")},makeArray:function(e,t){var r=t||[];return null!=e&&(n(Object(e))?st.merge(r,"string"==typeof e?[e]:e):tt.call(r,e)),r},inArray:function(e,t,n){var r;if(t){if(rt)return rt.call(t,e,n);for(r=t.length,n=n?0>n?Math.max(0,r+n):n:0;r>n;n++)if(n in t&&t[n]===e)return n}return-1},merge:function(e,n){var r=n.length,i=e.length,o=0;if("number"==typeof r)for(;r>o;o++)e[i++]=n[o];else for(;n[o]!==t;)e[i++]=n[o++];return e.length=i,e},grep:function(e,t,n){var r,i=[],o=0,a=e.length;for(n=!!n;a>o;o++)r=!!t(e[o],o),n!==r&&i.push(e[o]);return i},map:function(e,t,r){var i,o=0,a=e.length,s=n(e),u=[];if(s)for(;a>o;o++)i=t(e[o],o,r),null!=i&&(u[u.length]=i);else for(o in e)i=t(e[o],o,r),null!=i&&(u[u.length]=i);return et.apply([],u)},guid:1,proxy:function(e,n){var r,i,o;return"string"==typeof n&&(r=e[n],n=e,e=r),st.isFunction(e)?(i=nt.call(arguments,2),o=function(){return e.apply(n||this,i.concat(nt.call(arguments)))},o.guid=e.guid=e.guid||st.guid++,o):t},access:function(e,n,r,i,o,a,s){var u=0,l=e.length,c=null==r;if("object"===st.type(r)){o=!0;for(u in r)st.access(e,n,u,r[u],!0,a,s)}else if(i!==t&&(o=!0,st.isFunction(i)||(s=!0),c&&(s?(n.call(e,i),n=null):(c=n,n=function(e,t,n){return c.call(st(e),n)})),n))for(;l>u;u++)n(e[u],r,s?i:i.call(e[u],u,n(e[u],r)));return o?e:c?n.call(e):l?n(e[0],r):a},now:function(){return(new Date).getTime()}}),st.ready.promise=function(t){if(!U)if(U=st.Deferred(),"complete"===V.readyState)setTimeout(st.ready);else if(V.addEventListener)V.addEventListener("DOMContentLoaded",xt,!1),e.addEventListener("load",st.ready,!1);else{V.attachEvent("onreadystatechange",xt),e.attachEvent("onload",st.ready);var n=!1;try{n=null==e.frameElement&&V.documentElement}catch(r){}n&&n.doScroll&&function i(){if(!st.isReady){try{n.doScroll("left")}catch(e){return setTimeout(i,50)}st.ready()}}()}return U.promise(t)},st.each("Boolean Number String Function Array Date RegExp Object Error".split(" "),function(e,t){Q["[object "+t+"]"]=t.toLowerCase()}),X=st(V);var Tt={};st.Callbacks=function(e){e="string"==typeof e?Tt[e]||r(e):st.extend({},e);var n,i,o,a,s,u,l=[],c=!e.once&&[],f=function(t){for(n=e.memory&&t,i=!0,u=a||0,a=0,s=l.length,o=!0;l&&s>u;u++)if(l[u].apply(t[0],t[1])===!1&&e.stopOnFalse){n=!1;break}o=!1,l&&(c?c.length&&f(c.shift()):n?l=[]:p.disable())},p={add:function(){if(l){var t=l.length;(function r(t){st.each(t,function(t,n){var i=st.type(n);"function"===i?e.unique&&p.has(n)||l.push(n):n&&n.length&&"string"!==i&&r(n)})})(arguments),o?s=l.length:n&&(a=t,f(n))}return this},remove:function(){return l&&st.each(arguments,function(e,t){for(var n;(n=st.inArray(t,l,n))>-1;)l.splice(n,1),o&&(s>=n&&s--,u>=n&&u--)}),this},has:function(e){return st.inArray(e,l)>-1},empty:function(){return l=[],this},disable:function(){return l=c=n=t,this},disabled:function(){return!l},lock:function(){return c=t,n||p.disable(),this},locked:function(){return!c},fireWith:function(e,t){return t=t||[],t=[e,t.slice?t.slice():t],!l||i&&!c||(o?c.push(t):f(t)),this},fire:function(){return p.fireWith(this,arguments),this},fired:function(){return!!i}};return p},st.extend({Deferred:function(e){var t=[["resolve","done",st.Callbacks("once memory"),"resolved"],["reject","fail",st.Callbacks("once memory"),"rejected"],["notify","progress",st.Callbacks("memory")]],n="pending",r={state:function(){return n},always:function(){return i.done(arguments).fail(arguments),this},then:function(){var e=arguments;return st.Deferred(function(n){st.each(t,function(t,o){var a=o[0],s=st.isFunction(e[t])&&e[t];i[o[1]](function(){var e=s&&s.apply(this,arguments);e&&st.isFunction(e.promise)?e.promise().done(n.resolve).fail(n.reject).progress(n.notify):n[a+"With"](this===r?n.promise():this,s?[e]:arguments)})}),e=null}).promise()},promise:function(e){return null!=e?st.extend(e,r):r}},i={};return r.pipe=r.then,st.each(t,function(e,o){var a=o[2],s=o[3];r[o[1]]=a.add,s&&a.add(function(){n=s},t[1^e][2].disable,t[2][2].lock),i[o[0]]=function(){return i[o[0]+"With"](this===i?r:this,arguments),this},i[o[0]+"With"]=a.fireWith}),r.promise(i),e&&e.call(i,i),i},when:function(e){var t,n,r,i=0,o=nt.call(arguments),a=o.length,s=1!==a||e&&st.isFunction(e.promise)?a:0,u=1===s?e:st.Deferred(),l=function(e,n,r){return function(i){n[e]=this,r[e]=arguments.length>1?nt.call(arguments):i,r===t?u.notifyWith(n,r):--s||u.resolveWith(n,r)}};if(a>1)for(t=Array(a),n=Array(a),r=Array(a);a>i;i++)o[i]&&st.isFunction(o[i].promise)?o[i].promise().done(l(i,r,o)).fail(u.reject).progress(l(i,n,t)):--s;return s||u.resolveWith(r,o),u.promise()}}),st.support=function(){var n,r,i,o,a,s,u,l,c,f,p=V.createElement("div");if(p.setAttribute("className","t"),p.innerHTML="  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>",r=p.getElementsByTagName("*"),i=p.getElementsByTagName("a")[0],!r||!i||!r.length)return{};o=V.createElement("select"),a=o.appendChild(V.createElement("option")),s=p.getElementsByTagName("input")[0],i.style.cssText="top:1px;float:left;opacity:.5",n={getSetAttribute:"t"!==p.className,leadingWhitespace:3===p.firstChild.nodeType,tbody:!p.getElementsByTagName("tbody").length,htmlSerialize:!!p.getElementsByTagName("link").length,style:/top/.test(i.getAttribute("style")),hrefNormalized:"/a"===i.getAttribute("href"),opacity:/^0.5/.test(i.style.opacity),cssFloat:!!i.style.cssFloat,checkOn:!!s.value,optSelected:a.selected,enctype:!!V.createElement("form").enctype,html5Clone:"<:nav></:nav>"!==V.createElement("nav").cloneNode(!0).outerHTML,boxModel:"CSS1Compat"===V.compatMode,deleteExpando:!0,noCloneEvent:!0,inlineBlockNeedsLayout:!1,shrinkWrapBlocks:!1,reliableMarginRight:!0,boxSizingReliable:!0,pixelPosition:!1},s.checked=!0,n.noCloneChecked=s.cloneNode(!0).checked,o.disabled=!0,n.optDisabled=!a.disabled;try{delete p.test}catch(d){n.deleteExpando=!1}s=V.createElement("input"),s.setAttribute("value",""),n.input=""===s.getAttribute("value"),s.value="t",s.setAttribute("type","radio"),n.radioValue="t"===s.value,s.setAttribute("checked","t"),s.setAttribute("name","t"),u=V.createDocumentFragment(),u.appendChild(s),n.appendChecked=s.checked,n.checkClone=u.cloneNode(!0).cloneNode(!0).lastChild.checked,p.attachEvent&&(p.attachEvent("onclick",function(){n.noCloneEvent=!1}),p.cloneNode(!0).click());for(f in{submit:!0,change:!0,focusin:!0})p.setAttribute(l="on"+f,"t"),n[f+"Bubbles"]=l in e||p.attributes[l].expando===!1;return p.style.backgroundClip="content-box",p.cloneNode(!0).style.backgroundClip="",n.clearCloneStyle="content-box"===p.style.backgroundClip,st(function(){var r,i,o,a="padding:0;margin:0;border:0;display:block;box-sizing:content-box;-moz-box-sizing:content-box;-webkit-box-sizing:content-box;",s=V.getElementsByTagName("body")[0];s&&(r=V.createElement("div"),r.style.cssText="border:0;width:0;height:0;position:absolute;top:0;left:-9999px;margin-top:1px",s.appendChild(r).appendChild(p),p.innerHTML="<table><tr><td></td><td>t</td></tr></table>",o=p.getElementsByTagName("td"),o[0].style.cssText="padding:0;margin:0;border:0;display:none",c=0===o[0].offsetHeight,o[0].style.display="",o[1].style.display="none",n.reliableHiddenOffsets=c&&0===o[0].offsetHeight,p.innerHTML="",p.style.cssText="box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%;",n.boxSizing=4===p.offsetWidth,n.doesNotIncludeMarginInBodyOffset=1!==s.offsetTop,e.getComputedStyle&&(n.pixelPosition="1%"!==(e.getComputedStyle(p,null)||{}).top,n.boxSizingReliable="4px"===(e.getComputedStyle(p,null)||{width:"4px"}).width,i=p.appendChild(V.createElement("div")),i.style.cssText=p.style.cssText=a,i.style.marginRight=i.style.width="0",p.style.width="1px",n.reliableMarginRight=!parseFloat((e.getComputedStyle(i,null)||{}).marginRight)),p.style.zoom!==t&&(p.innerHTML="",p.style.cssText=a+"width:1px;padding:1px;display:inline;zoom:1",n.inlineBlockNeedsLayout=3===p.offsetWidth,p.style.display="block",p.innerHTML="<div></div>",p.firstChild.style.width="5px",n.shrinkWrapBlocks=3!==p.offsetWidth,s.style.zoom=1),s.removeChild(r),r=p=o=i=null)}),r=o=u=a=i=s=null,n}();var wt=/(?:\{[\s\S]*\}|\[[\s\S]*\])$/,Nt=/([A-Z])/g;st.extend({cache:{},expando:"jQuery"+(Z+Math.random()).replace(/\D/g,""),noData:{embed:!0,object:"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",applet:!0},hasData:function(e){return e=e.nodeType?st.cache[e[st.expando]]:e[st.expando],!!e&&!s(e)},data:function(e,t,n){return i(e,t,n,!1)},removeData:function(e,t){return o(e,t,!1)},_data:function(e,t,n){return i(e,t,n,!0)},_removeData:function(e,t){return o(e,t,!0)},acceptData:function(e){var t=e.nodeName&&st.noData[e.nodeName.toLowerCase()];return!t||t!==!0&&e.getAttribute("classid")===t}}),st.fn.extend({data:function(e,n){var r,i,o=this[0],s=0,u=null;if(e===t){if(this.length&&(u=st.data(o),1===o.nodeType&&!st._data(o,"parsedAttrs"))){for(r=o.attributes;r.length>s;s++)i=r[s].name,i.indexOf("data-")||(i=st.camelCase(i.substring(5)),a(o,i,u[i]));st._data(o,"parsedAttrs",!0)}return u}return"object"==typeof e?this.each(function(){st.data(this,e)}):st.access(this,function(n){return n===t?o?a(o,e,st.data(o,e)):null:(this.each(function(){st.data(this,e,n)}),t)},null,n,arguments.length>1,null,!0)},removeData:function(e){return this.each(function(){st.removeData(this,e)})}}),st.extend({queue:function(e,n,r){var i;return e?(n=(n||"fx")+"queue",i=st._data(e,n),r&&(!i||st.isArray(r)?i=st._data(e,n,st.makeArray(r)):i.push(r)),i||[]):t},dequeue:function(e,t){t=t||"fx";var n=st.queue(e,t),r=n.length,i=n.shift(),o=st._queueHooks(e,t),a=function(){st.dequeue(e,t)};"inprogress"===i&&(i=n.shift(),r--),o.cur=i,i&&("fx"===t&&n.unshift("inprogress"),delete o.stop,i.call(e,a,o)),!r&&o&&o.empty.fire()},_queueHooks:function(e,t){var n=t+"queueHooks";return st._data(e,n)||st._data(e,n,{empty:st.Callbacks("once memory").add(function(){st._removeData(e,t+"queue"),st._removeData(e,n)})})}}),st.fn.extend({queue:function(e,n){var r=2;return"string"!=typeof e&&(n=e,e="fx",r--),r>arguments.length?st.queue(this[0],e):n===t?this:this.each(function(){var t=st.queue(this,e,n);st._queueHooks(this,e),"fx"===e&&"inprogress"!==t[0]&&st.dequeue(this,e)})},dequeue:function(e){return this.each(function(){st.dequeue(this,e)})},delay:function(e,t){return e=st.fx?st.fx.speeds[e]||e:e,t=t||"fx",this.queue(t,function(t,n){var r=setTimeout(t,e);n.stop=function(){clearTimeout(r)}})},clearQueue:function(e){return this.queue(e||"fx",[])},promise:function(e,n){var r,i=1,o=st.Deferred(),a=this,s=this.length,u=function(){--i||o.resolveWith(a,[a])};for("string"!=typeof e&&(n=e,e=t),e=e||"fx";s--;)r=st._data(a[s],e+"queueHooks"),r&&r.empty&&(i++,r.empty.add(u));return u(),o.promise(n)}});var Ct,kt,Et=/[\t\r\n]/g,St=/\r/g,At=/^(?:input|select|textarea|button|object)$/i,jt=/^(?:a|area)$/i,Dt=/^(?:checked|selected|autofocus|autoplay|async|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped)$/i,Lt=/^(?:checked|selected)$/i,Ht=st.support.getSetAttribute,Mt=st.support.input;st.fn.extend({attr:function(e,t){return st.access(this,st.attr,e,t,arguments.length>1)},removeAttr:function(e){return this.each(function(){st.removeAttr(this,e)})},prop:function(e,t){return st.access(this,st.prop,e,t,arguments.length>1)},removeProp:function(e){return e=st.propFix[e]||e,this.each(function(){try{this[e]=t,delete this[e]}catch(n){}})},addClass:function(e){var t,n,r,i,o,a=0,s=this.length,u="string"==typeof e&&e;if(st.isFunction(e))return this.each(function(t){st(this).addClass(e.call(this,t,this.className))});if(u)for(t=(e||"").match(lt)||[];s>a;a++)if(n=this[a],r=1===n.nodeType&&(n.className?(" "+n.className+" ").replace(Et," "):" ")){for(o=0;i=t[o++];)0>r.indexOf(" "+i+" ")&&(r+=i+" ");n.className=st.trim(r)}return this},removeClass:function(e){var t,n,r,i,o,a=0,s=this.length,u=0===arguments.length||"string"==typeof e&&e;if(st.isFunction(e))return this.each(function(t){st(this).removeClass(e.call(this,t,this.className))});if(u)for(t=(e||"").match(lt)||[];s>a;a++)if(n=this[a],r=1===n.nodeType&&(n.className?(" "+n.className+" ").replace(Et," "):"")){for(o=0;i=t[o++];)for(;r.indexOf(" "+i+" ")>=0;)r=r.replace(" "+i+" "," ");n.className=e?st.trim(r):""}return this},toggleClass:function(e,t){var n=typeof e,r="boolean"==typeof t;return st.isFunction(e)?this.each(function(n){st(this).toggleClass(e.call(this,n,this.className,t),t)}):this.each(function(){if("string"===n)for(var i,o=0,a=st(this),s=t,u=e.match(lt)||[];i=u[o++];)s=r?s:!a.hasClass(i),a[s?"addClass":"removeClass"](i);else("undefined"===n||"boolean"===n)&&(this.className&&st._data(this,"__className__",this.className),this.className=this.className||e===!1?"":st._data(this,"__className__")||"")})},hasClass:function(e){for(var t=" "+e+" ",n=0,r=this.length;r>n;n++)if(1===this[n].nodeType&&(" "+this[n].className+" ").replace(Et," ").indexOf(t)>=0)return!0;return!1},val:function(e){var n,r,i,o=this[0];{if(arguments.length)return i=st.isFunction(e),this.each(function(r){var o,a=st(this);1===this.nodeType&&(o=i?e.call(this,r,a.val()):e,null==o?o="":"number"==typeof o?o+="":st.isArray(o)&&(o=st.map(o,function(e){return null==e?"":e+""})),n=st.valHooks[this.type]||st.valHooks[this.nodeName.toLowerCase()],n&&"set"in n&&n.set(this,o,"value")!==t||(this.value=o))});if(o)return n=st.valHooks[o.type]||st.valHooks[o.nodeName.toLowerCase()],n&&"get"in n&&(r=n.get(o,"value"))!==t?r:(r=o.value,"string"==typeof r?r.replace(St,""):null==r?"":r)}}}),st.extend({valHooks:{option:{get:function(e){var t=e.attributes.value;return!t||t.specified?e.value:e.text}},select:{get:function(e){for(var t,n,r=e.options,i=e.selectedIndex,o="select-one"===e.type||0>i,a=o?null:[],s=o?i+1:r.length,u=0>i?s:o?i:0;s>u;u++)if(n=r[u],!(!n.selected&&u!==i||(st.support.optDisabled?n.disabled:null!==n.getAttribute("disabled"))||n.parentNode.disabled&&st.nodeName(n.parentNode,"optgroup"))){if(t=st(n).val(),o)return t;a.push(t)}return a},set:function(e,t){var n=st.makeArray(t);return st(e).find("option").each(function(){this.selected=st.inArray(st(this).val(),n)>=0}),n.length||(e.selectedIndex=-1),n}}},attr:function(e,n,r){var i,o,a,s=e.nodeType;if(e&&3!==s&&8!==s&&2!==s)return e.getAttribute===t?st.prop(e,n,r):(a=1!==s||!st.isXMLDoc(e),a&&(n=n.toLowerCase(),o=st.attrHooks[n]||(Dt.test(n)?kt:Ct)),r===t?o&&a&&"get"in o&&null!==(i=o.get(e,n))?i:(e.getAttribute!==t&&(i=e.getAttribute(n)),null==i?t:i):null!==r?o&&a&&"set"in o&&(i=o.set(e,r,n))!==t?i:(e.setAttribute(n,r+""),r):(st.removeAttr(e,n),t))},removeAttr:function(e,t){var n,r,i=0,o=t&&t.match(lt);if(o&&1===e.nodeType)for(;n=o[i++];)r=st.propFix[n]||n,Dt.test(n)?!Ht&&Lt.test(n)?e[st.camelCase("default-"+n)]=e[r]=!1:e[r]=!1:st.attr(e,n,""),e.removeAttribute(Ht?n:r)},attrHooks:{type:{set:function(e,t){if(!st.support.radioValue&&"radio"===t&&st.nodeName(e,"input")){var n=e.value;return e.setAttribute("type",t),n&&(e.value=n),t}}}},propFix:{tabindex:"tabIndex",readonly:"readOnly","for":"htmlFor","class":"className",maxlength:"maxLength",cellspacing:"cellSpacing",cellpadding:"cellPadding",rowspan:"rowSpan",colspan:"colSpan",usemap:"useMap",frameborder:"frameBorder",contenteditable:"contentEditable"},prop:function(e,n,r){var i,o,a,s=e.nodeType;if(e&&3!==s&&8!==s&&2!==s)return a=1!==s||!st.isXMLDoc(e),a&&(n=st.propFix[n]||n,o=st.propHooks[n]),r!==t?o&&"set"in o&&(i=o.set(e,r,n))!==t?i:e[n]=r:o&&"get"in o&&null!==(i=o.get(e,n))?i:e[n]},propHooks:{tabIndex:{get:function(e){var n=e.getAttributeNode("tabindex");return n&&n.specified?parseInt(n.value,10):At.test(e.nodeName)||jt.test(e.nodeName)&&e.href?0:t}}}}),kt={get:function(e,n){var r=st.prop(e,n),i="boolean"==typeof r&&e.getAttribute(n),o="boolean"==typeof r?Mt&&Ht?null!=i:Lt.test(n)?e[st.camelCase("default-"+n)]:!!i:e.getAttributeNode(n);return o&&o.value!==!1?n.toLowerCase():t},set:function(e,t,n){return t===!1?st.removeAttr(e,n):Mt&&Ht||!Lt.test(n)?e.setAttribute(!Ht&&st.propFix[n]||n,n):e[st.camelCase("default-"+n)]=e[n]=!0,n}},Mt&&Ht||(st.attrHooks.value={get:function(e,n){var r=e.getAttributeNode(n);return st.nodeName(e,"input")?e.defaultValue:r&&r.specified?r.value:t
},set:function(e,n,r){return st.nodeName(e,"input")?(e.defaultValue=n,t):Ct&&Ct.set(e,n,r)}}),Ht||(Ct=st.valHooks.button={get:function(e,n){var r=e.getAttributeNode(n);return r&&("id"===n||"name"===n||"coords"===n?""!==r.value:r.specified)?r.value:t},set:function(e,n,r){var i=e.getAttributeNode(r);return i||e.setAttributeNode(i=e.ownerDocument.createAttribute(r)),i.value=n+="","value"===r||n===e.getAttribute(r)?n:t}},st.attrHooks.contenteditable={get:Ct.get,set:function(e,t,n){Ct.set(e,""===t?!1:t,n)}},st.each(["width","height"],function(e,n){st.attrHooks[n]=st.extend(st.attrHooks[n],{set:function(e,r){return""===r?(e.setAttribute(n,"auto"),r):t}})})),st.support.hrefNormalized||(st.each(["href","src","width","height"],function(e,n){st.attrHooks[n]=st.extend(st.attrHooks[n],{get:function(e){var r=e.getAttribute(n,2);return null==r?t:r}})}),st.each(["href","src"],function(e,t){st.propHooks[t]={get:function(e){return e.getAttribute(t,4)}}})),st.support.style||(st.attrHooks.style={get:function(e){return e.style.cssText||t},set:function(e,t){return e.style.cssText=t+""}}),st.support.optSelected||(st.propHooks.selected=st.extend(st.propHooks.selected,{get:function(e){var t=e.parentNode;return t&&(t.selectedIndex,t.parentNode&&t.parentNode.selectedIndex),null}})),st.support.enctype||(st.propFix.enctype="encoding"),st.support.checkOn||st.each(["radio","checkbox"],function(){st.valHooks[this]={get:function(e){return null===e.getAttribute("value")?"on":e.value}}}),st.each(["radio","checkbox"],function(){st.valHooks[this]=st.extend(st.valHooks[this],{set:function(e,n){return st.isArray(n)?e.checked=st.inArray(st(e).val(),n)>=0:t}})});var qt=/^(?:input|select|textarea)$/i,_t=/^key/,Ft=/^(?:mouse|contextmenu)|click/,Ot=/^(?:focusinfocus|focusoutblur)$/,Bt=/^([^.]*)(?:\.(.+)|)$/;st.event={global:{},add:function(e,n,r,i,o){var a,s,u,l,c,f,p,d,h,g,m,y=3!==e.nodeType&&8!==e.nodeType&&st._data(e);if(y){for(r.handler&&(a=r,r=a.handler,o=a.selector),r.guid||(r.guid=st.guid++),(l=y.events)||(l=y.events={}),(s=y.handle)||(s=y.handle=function(e){return st===t||e&&st.event.triggered===e.type?t:st.event.dispatch.apply(s.elem,arguments)},s.elem=e),n=(n||"").match(lt)||[""],c=n.length;c--;)u=Bt.exec(n[c])||[],h=m=u[1],g=(u[2]||"").split(".").sort(),p=st.event.special[h]||{},h=(o?p.delegateType:p.bindType)||h,p=st.event.special[h]||{},f=st.extend({type:h,origType:m,data:i,handler:r,guid:r.guid,selector:o,needsContext:o&&st.expr.match.needsContext.test(o),namespace:g.join(".")},a),(d=l[h])||(d=l[h]=[],d.delegateCount=0,p.setup&&p.setup.call(e,i,g,s)!==!1||(e.addEventListener?e.addEventListener(h,s,!1):e.attachEvent&&e.attachEvent("on"+h,s))),p.add&&(p.add.call(e,f),f.handler.guid||(f.handler.guid=r.guid)),o?d.splice(d.delegateCount++,0,f):d.push(f),st.event.global[h]=!0;e=null}},remove:function(e,t,n,r,i){var o,a,s,u,l,c,f,p,d,h,g,m=st.hasData(e)&&st._data(e);if(m&&(u=m.events)){for(t=(t||"").match(lt)||[""],l=t.length;l--;)if(s=Bt.exec(t[l])||[],d=g=s[1],h=(s[2]||"").split(".").sort(),d){for(f=st.event.special[d]||{},d=(r?f.delegateType:f.bindType)||d,p=u[d]||[],s=s[2]&&RegExp("(^|\\.)"+h.join("\\.(?:.*\\.|)")+"(\\.|$)"),a=o=p.length;o--;)c=p[o],!i&&g!==c.origType||n&&n.guid!==c.guid||s&&!s.test(c.namespace)||r&&r!==c.selector&&("**"!==r||!c.selector)||(p.splice(o,1),c.selector&&p.delegateCount--,f.remove&&f.remove.call(e,c));a&&!p.length&&(f.teardown&&f.teardown.call(e,h,m.handle)!==!1||st.removeEvent(e,d,m.handle),delete u[d])}else for(d in u)st.event.remove(e,d+t[l],n,r,!0);st.isEmptyObject(u)&&(delete m.handle,st._removeData(e,"events"))}},trigger:function(n,r,i,o){var a,s,u,l,c,f,p,d=[i||V],h=n.type||n,g=n.namespace?n.namespace.split("."):[];if(s=u=i=i||V,3!==i.nodeType&&8!==i.nodeType&&!Ot.test(h+st.event.triggered)&&(h.indexOf(".")>=0&&(g=h.split("."),h=g.shift(),g.sort()),c=0>h.indexOf(":")&&"on"+h,n=n[st.expando]?n:new st.Event(h,"object"==typeof n&&n),n.isTrigger=!0,n.namespace=g.join("."),n.namespace_re=n.namespace?RegExp("(^|\\.)"+g.join("\\.(?:.*\\.|)")+"(\\.|$)"):null,n.result=t,n.target||(n.target=i),r=null==r?[n]:st.makeArray(r,[n]),p=st.event.special[h]||{},o||!p.trigger||p.trigger.apply(i,r)!==!1)){if(!o&&!p.noBubble&&!st.isWindow(i)){for(l=p.delegateType||h,Ot.test(l+h)||(s=s.parentNode);s;s=s.parentNode)d.push(s),u=s;u===(i.ownerDocument||V)&&d.push(u.defaultView||u.parentWindow||e)}for(a=0;(s=d[a++])&&!n.isPropagationStopped();)n.type=a>1?l:p.bindType||h,f=(st._data(s,"events")||{})[n.type]&&st._data(s,"handle"),f&&f.apply(s,r),f=c&&s[c],f&&st.acceptData(s)&&f.apply&&f.apply(s,r)===!1&&n.preventDefault();if(n.type=h,!(o||n.isDefaultPrevented()||p._default&&p._default.apply(i.ownerDocument,r)!==!1||"click"===h&&st.nodeName(i,"a")||!st.acceptData(i)||!c||!i[h]||st.isWindow(i))){u=i[c],u&&(i[c]=null),st.event.triggered=h;try{i[h]()}catch(m){}st.event.triggered=t,u&&(i[c]=u)}return n.result}},dispatch:function(e){e=st.event.fix(e);var n,r,i,o,a,s=[],u=nt.call(arguments),l=(st._data(this,"events")||{})[e.type]||[],c=st.event.special[e.type]||{};if(u[0]=e,e.delegateTarget=this,!c.preDispatch||c.preDispatch.call(this,e)!==!1){for(s=st.event.handlers.call(this,e,l),n=0;(o=s[n++])&&!e.isPropagationStopped();)for(e.currentTarget=o.elem,r=0;(a=o.handlers[r++])&&!e.isImmediatePropagationStopped();)(!e.namespace_re||e.namespace_re.test(a.namespace))&&(e.handleObj=a,e.data=a.data,i=((st.event.special[a.origType]||{}).handle||a.handler).apply(o.elem,u),i!==t&&(e.result=i)===!1&&(e.preventDefault(),e.stopPropagation()));return c.postDispatch&&c.postDispatch.call(this,e),e.result}},handlers:function(e,n){var r,i,o,a,s=[],u=n.delegateCount,l=e.target;if(u&&l.nodeType&&(!e.button||"click"!==e.type))for(;l!=this;l=l.parentNode||this)if(l.disabled!==!0||"click"!==e.type){for(i=[],r=0;u>r;r++)a=n[r],o=a.selector+" ",i[o]===t&&(i[o]=a.needsContext?st(o,this).index(l)>=0:st.find(o,this,null,[l]).length),i[o]&&i.push(a);i.length&&s.push({elem:l,handlers:i})}return n.length>u&&s.push({elem:this,handlers:n.slice(u)}),s},fix:function(e){if(e[st.expando])return e;var t,n,r=e,i=st.event.fixHooks[e.type]||{},o=i.props?this.props.concat(i.props):this.props;for(e=new st.Event(r),t=o.length;t--;)n=o[t],e[n]=r[n];return e.target||(e.target=r.srcElement||V),3===e.target.nodeType&&(e.target=e.target.parentNode),e.metaKey=!!e.metaKey,i.filter?i.filter(e,r):e},props:"altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),fixHooks:{},keyHooks:{props:"char charCode key keyCode".split(" "),filter:function(e,t){return null==e.which&&(e.which=null!=t.charCode?t.charCode:t.keyCode),e}},mouseHooks:{props:"button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),filter:function(e,n){var r,i,o,a=n.button,s=n.fromElement;return null==e.pageX&&null!=n.clientX&&(r=e.target.ownerDocument||V,i=r.documentElement,o=r.body,e.pageX=n.clientX+(i&&i.scrollLeft||o&&o.scrollLeft||0)-(i&&i.clientLeft||o&&o.clientLeft||0),e.pageY=n.clientY+(i&&i.scrollTop||o&&o.scrollTop||0)-(i&&i.clientTop||o&&o.clientTop||0)),!e.relatedTarget&&s&&(e.relatedTarget=s===e.target?n.toElement:s),e.which||a===t||(e.which=1&a?1:2&a?3:4&a?2:0),e}},special:{load:{noBubble:!0},click:{trigger:function(){return st.nodeName(this,"input")&&"checkbox"===this.type&&this.click?(this.click(),!1):t}},focus:{trigger:function(){if(this!==V.activeElement&&this.focus)try{return this.focus(),!1}catch(e){}},delegateType:"focusin"},blur:{trigger:function(){return this===V.activeElement&&this.blur?(this.blur(),!1):t},delegateType:"focusout"},beforeunload:{postDispatch:function(e){e.result!==t&&(e.originalEvent.returnValue=e.result)}}},simulate:function(e,t,n,r){var i=st.extend(new st.Event,n,{type:e,isSimulated:!0,originalEvent:{}});r?st.event.trigger(i,null,t):st.event.dispatch.call(t,i),i.isDefaultPrevented()&&n.preventDefault()}},st.removeEvent=V.removeEventListener?function(e,t,n){e.removeEventListener&&e.removeEventListener(t,n,!1)}:function(e,n,r){var i="on"+n;e.detachEvent&&(e[i]===t&&(e[i]=null),e.detachEvent(i,r))},st.Event=function(e,n){return this instanceof st.Event?(e&&e.type?(this.originalEvent=e,this.type=e.type,this.isDefaultPrevented=e.defaultPrevented||e.returnValue===!1||e.getPreventDefault&&e.getPreventDefault()?u:l):this.type=e,n&&st.extend(this,n),this.timeStamp=e&&e.timeStamp||st.now(),this[st.expando]=!0,t):new st.Event(e,n)},st.Event.prototype={isDefaultPrevented:l,isPropagationStopped:l,isImmediatePropagationStopped:l,preventDefault:function(){var e=this.originalEvent;this.isDefaultPrevented=u,e&&(e.preventDefault?e.preventDefault():e.returnValue=!1)},stopPropagation:function(){var e=this.originalEvent;this.isPropagationStopped=u,e&&(e.stopPropagation&&e.stopPropagation(),e.cancelBubble=!0)},stopImmediatePropagation:function(){this.isImmediatePropagationStopped=u,this.stopPropagation()}},st.each({mouseenter:"mouseover",mouseleave:"mouseout"},function(e,t){st.event.special[e]={delegateType:t,bindType:t,handle:function(e){var n,r=this,i=e.relatedTarget,o=e.handleObj;return(!i||i!==r&&!st.contains(r,i))&&(e.type=o.origType,n=o.handler.apply(this,arguments),e.type=t),n}}}),st.support.submitBubbles||(st.event.special.submit={setup:function(){return st.nodeName(this,"form")?!1:(st.event.add(this,"click._submit keypress._submit",function(e){var n=e.target,r=st.nodeName(n,"input")||st.nodeName(n,"button")?n.form:t;r&&!st._data(r,"submitBubbles")&&(st.event.add(r,"submit._submit",function(e){e._submit_bubble=!0}),st._data(r,"submitBubbles",!0))}),t)},postDispatch:function(e){e._submit_bubble&&(delete e._submit_bubble,this.parentNode&&!e.isTrigger&&st.event.simulate("submit",this.parentNode,e,!0))},teardown:function(){return st.nodeName(this,"form")?!1:(st.event.remove(this,"._submit"),t)}}),st.support.changeBubbles||(st.event.special.change={setup:function(){return qt.test(this.nodeName)?(("checkbox"===this.type||"radio"===this.type)&&(st.event.add(this,"propertychange._change",function(e){"checked"===e.originalEvent.propertyName&&(this._just_changed=!0)}),st.event.add(this,"click._change",function(e){this._just_changed&&!e.isTrigger&&(this._just_changed=!1),st.event.simulate("change",this,e,!0)})),!1):(st.event.add(this,"beforeactivate._change",function(e){var t=e.target;qt.test(t.nodeName)&&!st._data(t,"changeBubbles")&&(st.event.add(t,"change._change",function(e){!this.parentNode||e.isSimulated||e.isTrigger||st.event.simulate("change",this.parentNode,e,!0)}),st._data(t,"changeBubbles",!0))}),t)},handle:function(e){var n=e.target;return this!==n||e.isSimulated||e.isTrigger||"radio"!==n.type&&"checkbox"!==n.type?e.handleObj.handler.apply(this,arguments):t},teardown:function(){return st.event.remove(this,"._change"),!qt.test(this.nodeName)}}),st.support.focusinBubbles||st.each({focus:"focusin",blur:"focusout"},function(e,t){var n=0,r=function(e){st.event.simulate(t,e.target,st.event.fix(e),!0)};st.event.special[t]={setup:function(){0===n++&&V.addEventListener(e,r,!0)},teardown:function(){0===--n&&V.removeEventListener(e,r,!0)}}}),st.fn.extend({on:function(e,n,r,i,o){var a,s;if("object"==typeof e){"string"!=typeof n&&(r=r||n,n=t);for(s in e)this.on(s,n,r,e[s],o);return this}if(null==r&&null==i?(i=n,r=n=t):null==i&&("string"==typeof n?(i=r,r=t):(i=r,r=n,n=t)),i===!1)i=l;else if(!i)return this;return 1===o&&(a=i,i=function(e){return st().off(e),a.apply(this,arguments)},i.guid=a.guid||(a.guid=st.guid++)),this.each(function(){st.event.add(this,e,i,r,n)})},one:function(e,t,n,r){return this.on(e,t,n,r,1)},off:function(e,n,r){var i,o;if(e&&e.preventDefault&&e.handleObj)return i=e.handleObj,st(e.delegateTarget).off(i.namespace?i.origType+"."+i.namespace:i.origType,i.selector,i.handler),this;if("object"==typeof e){for(o in e)this.off(o,n,e[o]);return this}return(n===!1||"function"==typeof n)&&(r=n,n=t),r===!1&&(r=l),this.each(function(){st.event.remove(this,e,r,n)})},bind:function(e,t,n){return this.on(e,null,t,n)},unbind:function(e,t){return this.off(e,null,t)},delegate:function(e,t,n,r){return this.on(t,e,n,r)},undelegate:function(e,t,n){return 1===arguments.length?this.off(e,"**"):this.off(t,e||"**",n)},trigger:function(e,t){return this.each(function(){st.event.trigger(e,t,this)})},triggerHandler:function(e,n){var r=this[0];return r?st.event.trigger(e,n,r,!0):t},hover:function(e,t){return this.mouseenter(e).mouseleave(t||e)}}),st.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "),function(e,t){st.fn[t]=function(e,n){return arguments.length>0?this.on(t,null,e,n):this.trigger(t)},_t.test(t)&&(st.event.fixHooks[t]=st.event.keyHooks),Ft.test(t)&&(st.event.fixHooks[t]=st.event.mouseHooks)}),function(e,t){function n(e){return ht.test(e+"")}function r(){var e,t=[];return e=function(n,r){return t.push(n+=" ")>C.cacheLength&&delete e[t.shift()],e[n]=r}}function i(e){return e[P]=!0,e}function o(e){var t=L.createElement("div");try{return e(t)}catch(n){return!1}finally{t=null}}function a(e,t,n,r){var i,o,a,s,u,l,c,d,h,g;if((t?t.ownerDocument||t:R)!==L&&D(t),t=t||L,n=n||[],!e||"string"!=typeof e)return n;if(1!==(s=t.nodeType)&&9!==s)return[];if(!M&&!r){if(i=gt.exec(e))if(a=i[1]){if(9===s){if(o=t.getElementById(a),!o||!o.parentNode)return n;if(o.id===a)return n.push(o),n}else if(t.ownerDocument&&(o=t.ownerDocument.getElementById(a))&&O(t,o)&&o.id===a)return n.push(o),n}else{if(i[2])return Q.apply(n,K.call(t.getElementsByTagName(e),0)),n;if((a=i[3])&&W.getByClassName&&t.getElementsByClassName)return Q.apply(n,K.call(t.getElementsByClassName(a),0)),n}if(W.qsa&&!q.test(e)){if(c=!0,d=P,h=t,g=9===s&&e,1===s&&"object"!==t.nodeName.toLowerCase()){for(l=f(e),(c=t.getAttribute("id"))?d=c.replace(vt,"\\$&"):t.setAttribute("id",d),d="[id='"+d+"'] ",u=l.length;u--;)l[u]=d+p(l[u]);h=dt.test(e)&&t.parentNode||t,g=l.join(",")}if(g)try{return Q.apply(n,K.call(h.querySelectorAll(g),0)),n}catch(m){}finally{c||t.removeAttribute("id")}}}return x(e.replace(at,"$1"),t,n,r)}function s(e,t){for(var n=e&&t&&e.nextSibling;n;n=n.nextSibling)if(n===t)return-1;return e?1:-1}function u(e){return function(t){var n=t.nodeName.toLowerCase();return"input"===n&&t.type===e}}function l(e){return function(t){var n=t.nodeName.toLowerCase();return("input"===n||"button"===n)&&t.type===e}}function c(e){return i(function(t){return t=+t,i(function(n,r){for(var i,o=e([],n.length,t),a=o.length;a--;)n[i=o[a]]&&(n[i]=!(r[i]=n[i]))})})}function f(e,t){var n,r,i,o,s,u,l,c=X[e+" "];if(c)return t?0:c.slice(0);for(s=e,u=[],l=C.preFilter;s;){(!n||(r=ut.exec(s)))&&(r&&(s=s.slice(r[0].length)||s),u.push(i=[])),n=!1,(r=lt.exec(s))&&(n=r.shift(),i.push({value:n,type:r[0].replace(at," ")}),s=s.slice(n.length));for(o in C.filter)!(r=pt[o].exec(s))||l[o]&&!(r=l[o](r))||(n=r.shift(),i.push({value:n,type:o,matches:r}),s=s.slice(n.length));if(!n)break}return t?s.length:s?a.error(e):X(e,u).slice(0)}function p(e){for(var t=0,n=e.length,r="";n>t;t++)r+=e[t].value;return r}function d(e,t,n){var r=t.dir,i=n&&"parentNode"===t.dir,o=I++;return t.first?function(t,n,o){for(;t=t[r];)if(1===t.nodeType||i)return e(t,n,o)}:function(t,n,a){var s,u,l,c=$+" "+o;if(a){for(;t=t[r];)if((1===t.nodeType||i)&&e(t,n,a))return!0}else for(;t=t[r];)if(1===t.nodeType||i)if(l=t[P]||(t[P]={}),(u=l[r])&&u[0]===c){if((s=u[1])===!0||s===N)return s===!0}else if(u=l[r]=[c],u[1]=e(t,n,a)||N,u[1]===!0)return!0}}function h(e){return e.length>1?function(t,n,r){for(var i=e.length;i--;)if(!e[i](t,n,r))return!1;return!0}:e[0]}function g(e,t,n,r,i){for(var o,a=[],s=0,u=e.length,l=null!=t;u>s;s++)(o=e[s])&&(!n||n(o,r,i))&&(a.push(o),l&&t.push(s));return a}function m(e,t,n,r,o,a){return r&&!r[P]&&(r=m(r)),o&&!o[P]&&(o=m(o,a)),i(function(i,a,s,u){var l,c,f,p=[],d=[],h=a.length,m=i||b(t||"*",s.nodeType?[s]:s,[]),y=!e||!i&&t?m:g(m,p,e,s,u),v=n?o||(i?e:h||r)?[]:a:y;if(n&&n(y,v,s,u),r)for(l=g(v,d),r(l,[],s,u),c=l.length;c--;)(f=l[c])&&(v[d[c]]=!(y[d[c]]=f));if(i){if(o||e){if(o){for(l=[],c=v.length;c--;)(f=v[c])&&l.push(y[c]=f);o(null,v=[],l,u)}for(c=v.length;c--;)(f=v[c])&&(l=o?Z.call(i,f):p[c])>-1&&(i[l]=!(a[l]=f))}}else v=g(v===a?v.splice(h,v.length):v),o?o(null,a,v,u):Q.apply(a,v)})}function y(e){for(var t,n,r,i=e.length,o=C.relative[e[0].type],a=o||C.relative[" "],s=o?1:0,u=d(function(e){return e===t},a,!0),l=d(function(e){return Z.call(t,e)>-1},a,!0),c=[function(e,n,r){return!o&&(r||n!==j)||((t=n).nodeType?u(e,n,r):l(e,n,r))}];i>s;s++)if(n=C.relative[e[s].type])c=[d(h(c),n)];else{if(n=C.filter[e[s].type].apply(null,e[s].matches),n[P]){for(r=++s;i>r&&!C.relative[e[r].type];r++);return m(s>1&&h(c),s>1&&p(e.slice(0,s-1)).replace(at,"$1"),n,r>s&&y(e.slice(s,r)),i>r&&y(e=e.slice(r)),i>r&&p(e))}c.push(n)}return h(c)}function v(e,t){var n=0,r=t.length>0,o=e.length>0,s=function(i,s,u,l,c){var f,p,d,h=[],m=0,y="0",v=i&&[],b=null!=c,x=j,T=i||o&&C.find.TAG("*",c&&s.parentNode||s),w=$+=null==x?1:Math.E;for(b&&(j=s!==L&&s,N=n);null!=(f=T[y]);y++){if(o&&f){for(p=0;d=e[p];p++)if(d(f,s,u)){l.push(f);break}b&&($=w,N=++n)}r&&((f=!d&&f)&&m--,i&&v.push(f))}if(m+=y,r&&y!==m){for(p=0;d=t[p];p++)d(v,h,s,u);if(i){if(m>0)for(;y--;)v[y]||h[y]||(h[y]=G.call(l));h=g(h)}Q.apply(l,h),b&&!i&&h.length>0&&m+t.length>1&&a.uniqueSort(l)}return b&&($=w,j=x),v};return r?i(s):s}function b(e,t,n){for(var r=0,i=t.length;i>r;r++)a(e,t[r],n);return n}function x(e,t,n,r){var i,o,a,s,u,l=f(e);if(!r&&1===l.length){if(o=l[0]=l[0].slice(0),o.length>2&&"ID"===(a=o[0]).type&&9===t.nodeType&&!M&&C.relative[o[1].type]){if(t=C.find.ID(a.matches[0].replace(xt,Tt),t)[0],!t)return n;e=e.slice(o.shift().value.length)}for(i=pt.needsContext.test(e)?-1:o.length-1;i>=0&&(a=o[i],!C.relative[s=a.type]);i--)if((u=C.find[s])&&(r=u(a.matches[0].replace(xt,Tt),dt.test(o[0].type)&&t.parentNode||t))){if(o.splice(i,1),e=r.length&&p(o),!e)return Q.apply(n,K.call(r,0)),n;break}}return S(e,l)(r,t,M,n,dt.test(e)),n}function T(){}var w,N,C,k,E,S,A,j,D,L,H,M,q,_,F,O,B,P="sizzle"+-new Date,R=e.document,W={},$=0,I=0,z=r(),X=r(),U=r(),V=typeof t,Y=1<<31,J=[],G=J.pop,Q=J.push,K=J.slice,Z=J.indexOf||function(e){for(var t=0,n=this.length;n>t;t++)if(this[t]===e)return t;return-1},et="[\\x20\\t\\r\\n\\f]",tt="(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",nt=tt.replace("w","w#"),rt="([*^$|!~]?=)",it="\\["+et+"*("+tt+")"+et+"*(?:"+rt+et+"*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|("+nt+")|)|)"+et+"*\\]",ot=":("+tt+")(?:\\(((['\"])((?:\\\\.|[^\\\\])*?)\\3|((?:\\\\.|[^\\\\()[\\]]|"+it.replace(3,8)+")*)|.*)\\)|)",at=RegExp("^"+et+"+|((?:^|[^\\\\])(?:\\\\.)*)"+et+"+$","g"),ut=RegExp("^"+et+"*,"+et+"*"),lt=RegExp("^"+et+"*([\\x20\\t\\r\\n\\f>+~])"+et+"*"),ct=RegExp(ot),ft=RegExp("^"+nt+"$"),pt={ID:RegExp("^#("+tt+")"),CLASS:RegExp("^\\.("+tt+")"),NAME:RegExp("^\\[name=['\"]?("+tt+")['\"]?\\]"),TAG:RegExp("^("+tt.replace("w","w*")+")"),ATTR:RegExp("^"+it),PSEUDO:RegExp("^"+ot),CHILD:RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\("+et+"*(even|odd|(([+-]|)(\\d*)n|)"+et+"*(?:([+-]|)"+et+"*(\\d+)|))"+et+"*\\)|)","i"),needsContext:RegExp("^"+et+"*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\("+et+"*((?:-\\d)?\\d*)"+et+"*\\)|)(?=[^-]|$)","i")},dt=/[\x20\t\r\n\f]*[+~]/,ht=/\{\s*\[native code\]\s*\}/,gt=/^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,mt=/^(?:input|select|textarea|button)$/i,yt=/^h\d$/i,vt=/'|\\/g,bt=/\=[\x20\t\r\n\f]*([^'"\]]*)[\x20\t\r\n\f]*\]/g,xt=/\\([\da-fA-F]{1,6}[\x20\t\r\n\f]?|.)/g,Tt=function(e,t){var n="0x"+t-65536;return n!==n?t:0>n?String.fromCharCode(n+65536):String.fromCharCode(55296|n>>10,56320|1023&n)};try{K.call(H.childNodes,0)[0].nodeType}catch(wt){K=function(e){for(var t,n=[];t=this[e];e++)n.push(t);return n}}E=a.isXML=function(e){var t=e&&(e.ownerDocument||e).documentElement;return t?"HTML"!==t.nodeName:!1},D=a.setDocument=function(e){var r=e?e.ownerDocument||e:R;return r!==L&&9===r.nodeType&&r.documentElement?(L=r,H=r.documentElement,M=E(r),W.tagNameNoComments=o(function(e){return e.appendChild(r.createComment("")),!e.getElementsByTagName("*").length}),W.attributes=o(function(e){e.innerHTML="<select></select>";var t=typeof e.lastChild.getAttribute("multiple");return"boolean"!==t&&"string"!==t}),W.getByClassName=o(function(e){return e.innerHTML="<div class='hidden e'></div><div class='hidden'></div>",e.getElementsByClassName&&e.getElementsByClassName("e").length?(e.lastChild.className="e",2===e.getElementsByClassName("e").length):!1}),W.getByName=o(function(e){e.id=P+0,e.innerHTML="<a name='"+P+"'></a><div name='"+P+"'></div>",H.insertBefore(e,H.firstChild);var t=r.getElementsByName&&r.getElementsByName(P).length===2+r.getElementsByName(P+0).length;return W.getIdNotName=!r.getElementById(P),H.removeChild(e),t}),C.attrHandle=o(function(e){return e.innerHTML="<a href='#'></a>",e.firstChild&&typeof e.firstChild.getAttribute!==V&&"#"===e.firstChild.getAttribute("href")})?{}:{href:function(e){return e.getAttribute("href",2)},type:function(e){return e.getAttribute("type")}},W.getIdNotName?(C.find.ID=function(e,t){if(typeof t.getElementById!==V&&!M){var n=t.getElementById(e);return n&&n.parentNode?[n]:[]}},C.filter.ID=function(e){var t=e.replace(xt,Tt);return function(e){return e.getAttribute("id")===t}}):(C.find.ID=function(e,n){if(typeof n.getElementById!==V&&!M){var r=n.getElementById(e);return r?r.id===e||typeof r.getAttributeNode!==V&&r.getAttributeNode("id").value===e?[r]:t:[]}},C.filter.ID=function(e){var t=e.replace(xt,Tt);return function(e){var n=typeof e.getAttributeNode!==V&&e.getAttributeNode("id");return n&&n.value===t}}),C.find.TAG=W.tagNameNoComments?function(e,n){return typeof n.getElementsByTagName!==V?n.getElementsByTagName(e):t}:function(e,t){var n,r=[],i=0,o=t.getElementsByTagName(e);if("*"===e){for(;n=o[i];i++)1===n.nodeType&&r.push(n);return r}return o},C.find.NAME=W.getByName&&function(e,n){return typeof n.getElementsByName!==V?n.getElementsByName(name):t},C.find.CLASS=W.getByClassName&&function(e,n){return typeof n.getElementsByClassName===V||M?t:n.getElementsByClassName(e)},_=[],q=[":focus"],(W.qsa=n(r.querySelectorAll))&&(o(function(e){e.innerHTML="<select><option selected=''></option></select>",e.querySelectorAll("[selected]").length||q.push("\\["+et+"*(?:checked|disabled|ismap|multiple|readonly|selected|value)"),e.querySelectorAll(":checked").length||q.push(":checked")}),o(function(e){e.innerHTML="<input type='hidden' i=''/>",e.querySelectorAll("[i^='']").length&&q.push("[*^$]="+et+"*(?:\"\"|'')"),e.querySelectorAll(":enabled").length||q.push(":enabled",":disabled"),e.querySelectorAll("*,:x"),q.push(",.*:")})),(W.matchesSelector=n(F=H.matchesSelector||H.mozMatchesSelector||H.webkitMatchesSelector||H.oMatchesSelector||H.msMatchesSelector))&&o(function(e){W.disconnectedMatch=F.call(e,"div"),F.call(e,"[s!='']:x"),_.push("!=",ot)}),q=RegExp(q.join("|")),_=RegExp(_.join("|")),O=n(H.contains)||H.compareDocumentPosition?function(e,t){var n=9===e.nodeType?e.documentElement:e,r=t&&t.parentNode;return e===r||!(!r||1!==r.nodeType||!(n.contains?n.contains(r):e.compareDocumentPosition&&16&e.compareDocumentPosition(r)))}:function(e,t){if(t)for(;t=t.parentNode;)if(t===e)return!0;return!1},B=H.compareDocumentPosition?function(e,t){var n;return e===t?(A=!0,0):(n=t.compareDocumentPosition&&e.compareDocumentPosition&&e.compareDocumentPosition(t))?1&n||e.parentNode&&11===e.parentNode.nodeType?e===r||O(R,e)?-1:t===r||O(R,t)?1:0:4&n?-1:1:e.compareDocumentPosition?-1:1}:function(e,t){var n,i=0,o=e.parentNode,a=t.parentNode,u=[e],l=[t];if(e===t)return A=!0,0;if(e.sourceIndex&&t.sourceIndex)return(~t.sourceIndex||Y)-(O(R,e)&&~e.sourceIndex||Y);if(!o||!a)return e===r?-1:t===r?1:o?-1:a?1:0;if(o===a)return s(e,t);for(n=e;n=n.parentNode;)u.unshift(n);for(n=t;n=n.parentNode;)l.unshift(n);for(;u[i]===l[i];)i++;return i?s(u[i],l[i]):u[i]===R?-1:l[i]===R?1:0},A=!1,[0,0].sort(B),W.detectDuplicates=A,L):L},a.matches=function(e,t){return a(e,null,null,t)},a.matchesSelector=function(e,t){if((e.ownerDocument||e)!==L&&D(e),t=t.replace(bt,"='$1']"),!(!W.matchesSelector||M||_&&_.test(t)||q.test(t)))try{var n=F.call(e,t);if(n||W.disconnectedMatch||e.document&&11!==e.document.nodeType)return n}catch(r){}return a(t,L,null,[e]).length>0},a.contains=function(e,t){return(e.ownerDocument||e)!==L&&D(e),O(e,t)},a.attr=function(e,t){var n;return(e.ownerDocument||e)!==L&&D(e),M||(t=t.toLowerCase()),(n=C.attrHandle[t])?n(e):M||W.attributes?e.getAttribute(t):((n=e.getAttributeNode(t))||e.getAttribute(t))&&e[t]===!0?t:n&&n.specified?n.value:null},a.error=function(e){throw Error("Syntax error, unrecognized expression: "+e)},a.uniqueSort=function(e){var t,n=[],r=1,i=0;if(A=!W.detectDuplicates,e.sort(B),A){for(;t=e[r];r++)t===e[r-1]&&(i=n.push(r));for(;i--;)e.splice(n[i],1)}return e},k=a.getText=function(e){var t,n="",r=0,i=e.nodeType;if(i){if(1===i||9===i||11===i){if("string"==typeof e.textContent)return e.textContent;for(e=e.firstChild;e;e=e.nextSibling)n+=k(e)}else if(3===i||4===i)return e.nodeValue}else for(;t=e[r];r++)n+=k(t);return n},C=a.selectors={cacheLength:50,createPseudo:i,match:pt,find:{},relative:{">":{dir:"parentNode",first:!0}," ":{dir:"parentNode"},"+":{dir:"previousSibling",first:!0},"~":{dir:"previousSibling"}},preFilter:{ATTR:function(e){return e[1]=e[1].replace(xt,Tt),e[3]=(e[4]||e[5]||"").replace(xt,Tt),"~="===e[2]&&(e[3]=" "+e[3]+" "),e.slice(0,4)},CHILD:function(e){return e[1]=e[1].toLowerCase(),"nth"===e[1].slice(0,3)?(e[3]||a.error(e[0]),e[4]=+(e[4]?e[5]+(e[6]||1):2*("even"===e[3]||"odd"===e[3])),e[5]=+(e[7]+e[8]||"odd"===e[3])):e[3]&&a.error(e[0]),e},PSEUDO:function(e){var t,n=!e[5]&&e[2];return pt.CHILD.test(e[0])?null:(e[4]?e[2]=e[4]:n&&ct.test(n)&&(t=f(n,!0))&&(t=n.indexOf(")",n.length-t)-n.length)&&(e[0]=e[0].slice(0,t),e[2]=n.slice(0,t)),e.slice(0,3))}},filter:{TAG:function(e){return"*"===e?function(){return!0}:(e=e.replace(xt,Tt).toLowerCase(),function(t){return t.nodeName&&t.nodeName.toLowerCase()===e})},CLASS:function(e){var t=z[e+" "];return t||(t=RegExp("(^|"+et+")"+e+"("+et+"|$)"))&&z(e,function(e){return t.test(e.className||typeof e.getAttribute!==V&&e.getAttribute("class")||"")})},ATTR:function(e,t,n){return function(r){var i=a.attr(r,e);return null==i?"!="===t:t?(i+="","="===t?i===n:"!="===t?i!==n:"^="===t?n&&0===i.indexOf(n):"*="===t?n&&i.indexOf(n)>-1:"$="===t?n&&i.substr(i.length-n.length)===n:"~="===t?(" "+i+" ").indexOf(n)>-1:"|="===t?i===n||i.substr(0,n.length+1)===n+"-":!1):!0}},CHILD:function(e,t,n,r,i){var o="nth"!==e.slice(0,3),a="last"!==e.slice(-4),s="of-type"===t;return 1===r&&0===i?function(e){return!!e.parentNode}:function(t,n,u){var l,c,f,p,d,h,g=o!==a?"nextSibling":"previousSibling",m=t.parentNode,y=s&&t.nodeName.toLowerCase(),v=!u&&!s;if(m){if(o){for(;g;){for(f=t;f=f[g];)if(s?f.nodeName.toLowerCase()===y:1===f.nodeType)return!1;h=g="only"===e&&!h&&"nextSibling"}return!0}if(h=[a?m.firstChild:m.lastChild],a&&v){for(c=m[P]||(m[P]={}),l=c[e]||[],d=l[0]===$&&l[1],p=l[0]===$&&l[2],f=d&&m.childNodes[d];f=++d&&f&&f[g]||(p=d=0)||h.pop();)if(1===f.nodeType&&++p&&f===t){c[e]=[$,d,p];break}}else if(v&&(l=(t[P]||(t[P]={}))[e])&&l[0]===$)p=l[1];else for(;(f=++d&&f&&f[g]||(p=d=0)||h.pop())&&((s?f.nodeName.toLowerCase()!==y:1!==f.nodeType)||!++p||(v&&((f[P]||(f[P]={}))[e]=[$,p]),f!==t)););return p-=i,p===r||0===p%r&&p/r>=0}}},PSEUDO:function(e,t){var n,r=C.pseudos[e]||C.setFilters[e.toLowerCase()]||a.error("unsupported pseudo: "+e);return r[P]?r(t):r.length>1?(n=[e,e,"",t],C.setFilters.hasOwnProperty(e.toLowerCase())?i(function(e,n){for(var i,o=r(e,t),a=o.length;a--;)i=Z.call(e,o[a]),e[i]=!(n[i]=o[a])}):function(e){return r(e,0,n)}):r}},pseudos:{not:i(function(e){var t=[],n=[],r=S(e.replace(at,"$1"));return r[P]?i(function(e,t,n,i){for(var o,a=r(e,null,i,[]),s=e.length;s--;)(o=a[s])&&(e[s]=!(t[s]=o))}):function(e,i,o){return t[0]=e,r(t,null,o,n),!n.pop()}}),has:i(function(e){return function(t){return a(e,t).length>0}}),contains:i(function(e){return function(t){return(t.textContent||t.innerText||k(t)).indexOf(e)>-1}}),lang:i(function(e){return ft.test(e||"")||a.error("unsupported lang: "+e),e=e.replace(xt,Tt).toLowerCase(),function(t){var n;do if(n=M?t.getAttribute("xml:lang")||t.getAttribute("lang"):t.lang)return n=n.toLowerCase(),n===e||0===n.indexOf(e+"-");while((t=t.parentNode)&&1===t.nodeType);return!1}}),target:function(t){var n=e.location&&e.location.hash;return n&&n.slice(1)===t.id},root:function(e){return e===H},focus:function(e){return e===L.activeElement&&(!L.hasFocus||L.hasFocus())&&!!(e.type||e.href||~e.tabIndex)},enabled:function(e){return e.disabled===!1},disabled:function(e){return e.disabled===!0},checked:function(e){var t=e.nodeName.toLowerCase();return"input"===t&&!!e.checked||"option"===t&&!!e.selected},selected:function(e){return e.parentNode&&e.parentNode.selectedIndex,e.selected===!0},empty:function(e){for(e=e.firstChild;e;e=e.nextSibling)if(e.nodeName>"@"||3===e.nodeType||4===e.nodeType)return!1;return!0},parent:function(e){return!C.pseudos.empty(e)},header:function(e){return yt.test(e.nodeName)},input:function(e){return mt.test(e.nodeName)},button:function(e){var t=e.nodeName.toLowerCase();return"input"===t&&"button"===e.type||"button"===t},text:function(e){var t;return"input"===e.nodeName.toLowerCase()&&"text"===e.type&&(null==(t=e.getAttribute("type"))||t.toLowerCase()===e.type)},first:c(function(){return[0]}),last:c(function(e,t){return[t-1]}),eq:c(function(e,t,n){return[0>n?n+t:n]}),even:c(function(e,t){for(var n=0;t>n;n+=2)e.push(n);return e}),odd:c(function(e,t){for(var n=1;t>n;n+=2)e.push(n);return e}),lt:c(function(e,t,n){for(var r=0>n?n+t:n;--r>=0;)e.push(r);return e}),gt:c(function(e,t,n){for(var r=0>n?n+t:n;t>++r;)e.push(r);return e})}};for(w in{radio:!0,checkbox:!0,file:!0,password:!0,image:!0})C.pseudos[w]=u(w);for(w in{submit:!0,reset:!0})C.pseudos[w]=l(w);S=a.compile=function(e,t){var n,r=[],i=[],o=U[e+" "];if(!o){for(t||(t=f(e)),n=t.length;n--;)o=y(t[n]),o[P]?r.push(o):i.push(o);o=U(e,v(i,r))}return o},C.pseudos.nth=C.pseudos.eq,C.filters=T.prototype=C.pseudos,C.setFilters=new T,D(),a.attr=st.attr,st.find=a,st.expr=a.selectors,st.expr[":"]=st.expr.pseudos,st.unique=a.uniqueSort,st.text=a.getText,st.isXMLDoc=a.isXML,st.contains=a.contains}(e);var Pt=/Until$/,Rt=/^(?:parents|prev(?:Until|All))/,Wt=/^.[^:#\[\.,]*$/,$t=st.expr.match.needsContext,It={children:!0,contents:!0,next:!0,prev:!0};st.fn.extend({find:function(e){var t,n,r;if("string"!=typeof e)return r=this,this.pushStack(st(e).filter(function(){for(t=0;r.length>t;t++)if(st.contains(r[t],this))return!0}));for(n=[],t=0;this.length>t;t++)st.find(e,this[t],n);return n=this.pushStack(st.unique(n)),n.selector=(this.selector?this.selector+" ":"")+e,n},has:function(e){var t,n=st(e,this),r=n.length;return this.filter(function(){for(t=0;r>t;t++)if(st.contains(this,n[t]))return!0})},not:function(e){return this.pushStack(f(this,e,!1))},filter:function(e){return this.pushStack(f(this,e,!0))},is:function(e){return!!e&&("string"==typeof e?$t.test(e)?st(e,this.context).index(this[0])>=0:st.filter(e,this).length>0:this.filter(e).length>0)},closest:function(e,t){for(var n,r=0,i=this.length,o=[],a=$t.test(e)||"string"!=typeof e?st(e,t||this.context):0;i>r;r++)for(n=this[r];n&&n.ownerDocument&&n!==t&&11!==n.nodeType;){if(a?a.index(n)>-1:st.find.matchesSelector(n,e)){o.push(n);break}n=n.parentNode}return this.pushStack(o.length>1?st.unique(o):o)},index:function(e){return e?"string"==typeof e?st.inArray(this[0],st(e)):st.inArray(e.jquery?e[0]:e,this):this[0]&&this[0].parentNode?this.first().prevAll().length:-1},add:function(e,t){var n="string"==typeof e?st(e,t):st.makeArray(e&&e.nodeType?[e]:e),r=st.merge(this.get(),n);return this.pushStack(st.unique(r))},addBack:function(e){return this.add(null==e?this.prevObject:this.prevObject.filter(e))}}),st.fn.andSelf=st.fn.addBack,st.each({parent:function(e){var t=e.parentNode;return t&&11!==t.nodeType?t:null},parents:function(e){return st.dir(e,"parentNode")},parentsUntil:function(e,t,n){return st.dir(e,"parentNode",n)},next:function(e){return c(e,"nextSibling")},prev:function(e){return c(e,"previousSibling")
},nextAll:function(e){return st.dir(e,"nextSibling")},prevAll:function(e){return st.dir(e,"previousSibling")},nextUntil:function(e,t,n){return st.dir(e,"nextSibling",n)},prevUntil:function(e,t,n){return st.dir(e,"previousSibling",n)},siblings:function(e){return st.sibling((e.parentNode||{}).firstChild,e)},children:function(e){return st.sibling(e.firstChild)},contents:function(e){return st.nodeName(e,"iframe")?e.contentDocument||e.contentWindow.document:st.merge([],e.childNodes)}},function(e,t){st.fn[e]=function(n,r){var i=st.map(this,t,n);return Pt.test(e)||(r=n),r&&"string"==typeof r&&(i=st.filter(r,i)),i=this.length>1&&!It[e]?st.unique(i):i,this.length>1&&Rt.test(e)&&(i=i.reverse()),this.pushStack(i)}}),st.extend({filter:function(e,t,n){return n&&(e=":not("+e+")"),1===t.length?st.find.matchesSelector(t[0],e)?[t[0]]:[]:st.find.matches(e,t)},dir:function(e,n,r){for(var i=[],o=e[n];o&&9!==o.nodeType&&(r===t||1!==o.nodeType||!st(o).is(r));)1===o.nodeType&&i.push(o),o=o[n];return i},sibling:function(e,t){for(var n=[];e;e=e.nextSibling)1===e.nodeType&&e!==t&&n.push(e);return n}});var zt="abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",Xt=/ jQuery\d+="(?:null|\d+)"/g,Ut=RegExp("<(?:"+zt+")[\\s/>]","i"),Vt=/^\s+/,Yt=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,Jt=/<([\w:]+)/,Gt=/<tbody/i,Qt=/<|&#?\w+;/,Kt=/<(?:script|style|link)/i,Zt=/^(?:checkbox|radio)$/i,en=/checked\s*(?:[^=]|=\s*.checked.)/i,tn=/^$|\/(?:java|ecma)script/i,nn=/^true\/(.*)/,rn=/^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,on={option:[1,"<select multiple='multiple'>","</select>"],legend:[1,"<fieldset>","</fieldset>"],area:[1,"<map>","</map>"],param:[1,"<object>","</object>"],thead:[1,"<table>","</table>"],tr:[2,"<table><tbody>","</tbody></table>"],col:[2,"<table><tbody></tbody><colgroup>","</colgroup></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],_default:st.support.htmlSerialize?[0,"",""]:[1,"X<div>","</div>"]},an=p(V),sn=an.appendChild(V.createElement("div"));on.optgroup=on.option,on.tbody=on.tfoot=on.colgroup=on.caption=on.thead,on.th=on.td,st.fn.extend({text:function(e){return st.access(this,function(e){return e===t?st.text(this):this.empty().append((this[0]&&this[0].ownerDocument||V).createTextNode(e))},null,e,arguments.length)},wrapAll:function(e){if(st.isFunction(e))return this.each(function(t){st(this).wrapAll(e.call(this,t))});if(this[0]){var t=st(e,this[0].ownerDocument).eq(0).clone(!0);this[0].parentNode&&t.insertBefore(this[0]),t.map(function(){for(var e=this;e.firstChild&&1===e.firstChild.nodeType;)e=e.firstChild;return e}).append(this)}return this},wrapInner:function(e){return st.isFunction(e)?this.each(function(t){st(this).wrapInner(e.call(this,t))}):this.each(function(){var t=st(this),n=t.contents();n.length?n.wrapAll(e):t.append(e)})},wrap:function(e){var t=st.isFunction(e);return this.each(function(n){st(this).wrapAll(t?e.call(this,n):e)})},unwrap:function(){return this.parent().each(function(){st.nodeName(this,"body")||st(this).replaceWith(this.childNodes)}).end()},append:function(){return this.domManip(arguments,!0,function(e){(1===this.nodeType||11===this.nodeType||9===this.nodeType)&&this.appendChild(e)})},prepend:function(){return this.domManip(arguments,!0,function(e){(1===this.nodeType||11===this.nodeType||9===this.nodeType)&&this.insertBefore(e,this.firstChild)})},before:function(){return this.domManip(arguments,!1,function(e){this.parentNode&&this.parentNode.insertBefore(e,this)})},after:function(){return this.domManip(arguments,!1,function(e){this.parentNode&&this.parentNode.insertBefore(e,this.nextSibling)})},remove:function(e,t){for(var n,r=0;null!=(n=this[r]);r++)(!e||st.filter(e,[n]).length>0)&&(t||1!==n.nodeType||st.cleanData(b(n)),n.parentNode&&(t&&st.contains(n.ownerDocument,n)&&m(b(n,"script")),n.parentNode.removeChild(n)));return this},empty:function(){for(var e,t=0;null!=(e=this[t]);t++){for(1===e.nodeType&&st.cleanData(b(e,!1));e.firstChild;)e.removeChild(e.firstChild);e.options&&st.nodeName(e,"select")&&(e.options.length=0)}return this},clone:function(e,t){return e=null==e?!1:e,t=null==t?e:t,this.map(function(){return st.clone(this,e,t)})},html:function(e){return st.access(this,function(e){var n=this[0]||{},r=0,i=this.length;if(e===t)return 1===n.nodeType?n.innerHTML.replace(Xt,""):t;if(!("string"!=typeof e||Kt.test(e)||!st.support.htmlSerialize&&Ut.test(e)||!st.support.leadingWhitespace&&Vt.test(e)||on[(Jt.exec(e)||["",""])[1].toLowerCase()])){e=e.replace(Yt,"<$1></$2>");try{for(;i>r;r++)n=this[r]||{},1===n.nodeType&&(st.cleanData(b(n,!1)),n.innerHTML=e);n=0}catch(o){}}n&&this.empty().append(e)},null,e,arguments.length)},replaceWith:function(e){var t=st.isFunction(e);return t||"string"==typeof e||(e=st(e).not(this).detach()),this.domManip([e],!0,function(e){var t=this.nextSibling,n=this.parentNode;(n&&1===this.nodeType||11===this.nodeType)&&(st(this).remove(),t?t.parentNode.insertBefore(e,t):n.appendChild(e))})},detach:function(e){return this.remove(e,!0)},domManip:function(e,n,r){e=et.apply([],e);var i,o,a,s,u,l,c=0,f=this.length,p=this,m=f-1,y=e[0],v=st.isFunction(y);if(v||!(1>=f||"string"!=typeof y||st.support.checkClone)&&en.test(y))return this.each(function(i){var o=p.eq(i);v&&(e[0]=y.call(this,i,n?o.html():t)),o.domManip(e,n,r)});if(f&&(i=st.buildFragment(e,this[0].ownerDocument,!1,this),o=i.firstChild,1===i.childNodes.length&&(i=o),o)){for(n=n&&st.nodeName(o,"tr"),a=st.map(b(i,"script"),h),s=a.length;f>c;c++)u=i,c!==m&&(u=st.clone(u,!0,!0),s&&st.merge(a,b(u,"script"))),r.call(n&&st.nodeName(this[c],"table")?d(this[c],"tbody"):this[c],u,c);if(s)for(l=a[a.length-1].ownerDocument,st.map(a,g),c=0;s>c;c++)u=a[c],tn.test(u.type||"")&&!st._data(u,"globalEval")&&st.contains(l,u)&&(u.src?st.ajax({url:u.src,type:"GET",dataType:"script",async:!1,global:!1,"throws":!0}):st.globalEval((u.text||u.textContent||u.innerHTML||"").replace(rn,"")));i=o=null}return this}}),st.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(e,t){st.fn[e]=function(e){for(var n,r=0,i=[],o=st(e),a=o.length-1;a>=r;r++)n=r===a?this:this.clone(!0),st(o[r])[t](n),tt.apply(i,n.get());return this.pushStack(i)}}),st.extend({clone:function(e,t,n){var r,i,o,a,s,u=st.contains(e.ownerDocument,e);if(st.support.html5Clone||st.isXMLDoc(e)||!Ut.test("<"+e.nodeName+">")?s=e.cloneNode(!0):(sn.innerHTML=e.outerHTML,sn.removeChild(s=sn.firstChild)),!(st.support.noCloneEvent&&st.support.noCloneChecked||1!==e.nodeType&&11!==e.nodeType||st.isXMLDoc(e)))for(r=b(s),i=b(e),a=0;null!=(o=i[a]);++a)r[a]&&v(o,r[a]);if(t)if(n)for(i=i||b(e),r=r||b(s),a=0;null!=(o=i[a]);a++)y(o,r[a]);else y(e,s);return r=b(s,"script"),r.length>0&&m(r,!u&&b(e,"script")),r=i=o=null,s},buildFragment:function(e,t,n,r){for(var i,o,a,s,u,l,c,f=e.length,d=p(t),h=[],g=0;f>g;g++)if(o=e[g],o||0===o)if("object"===st.type(o))st.merge(h,o.nodeType?[o]:o);else if(Qt.test(o)){for(s=s||d.appendChild(t.createElement("div")),a=(Jt.exec(o)||["",""])[1].toLowerCase(),u=on[a]||on._default,s.innerHTML=u[1]+o.replace(Yt,"<$1></$2>")+u[2],c=u[0];c--;)s=s.lastChild;if(!st.support.leadingWhitespace&&Vt.test(o)&&h.push(t.createTextNode(Vt.exec(o)[0])),!st.support.tbody)for(o="table"!==a||Gt.test(o)?"<table>"!==u[1]||Gt.test(o)?0:s:s.firstChild,c=o&&o.childNodes.length;c--;)st.nodeName(l=o.childNodes[c],"tbody")&&!l.childNodes.length&&o.removeChild(l);for(st.merge(h,s.childNodes),s.textContent="";s.firstChild;)s.removeChild(s.firstChild);s=d.lastChild}else h.push(t.createTextNode(o));for(s&&d.removeChild(s),st.support.appendChecked||st.grep(b(h,"input"),x),g=0;o=h[g++];)if((!r||-1===st.inArray(o,r))&&(i=st.contains(o.ownerDocument,o),s=b(d.appendChild(o),"script"),i&&m(s),n))for(c=0;o=s[c++];)tn.test(o.type||"")&&n.push(o);return s=null,d},cleanData:function(e,n){for(var r,i,o,a,s=0,u=st.expando,l=st.cache,c=st.support.deleteExpando,f=st.event.special;null!=(o=e[s]);s++)if((n||st.acceptData(o))&&(i=o[u],r=i&&l[i])){if(r.events)for(a in r.events)f[a]?st.event.remove(o,a):st.removeEvent(o,a,r.handle);l[i]&&(delete l[i],c?delete o[u]:o.removeAttribute!==t?o.removeAttribute(u):o[u]=null,K.push(i))}}});var un,ln,cn,fn=/alpha\([^)]*\)/i,pn=/opacity\s*=\s*([^)]*)/,dn=/^(top|right|bottom|left)$/,hn=/^(none|table(?!-c[ea]).+)/,gn=/^margin/,mn=RegExp("^("+ut+")(.*)$","i"),yn=RegExp("^("+ut+")(?!px)[a-z%]+$","i"),vn=RegExp("^([+-])=("+ut+")","i"),bn={BODY:"block"},xn={position:"absolute",visibility:"hidden",display:"block"},Tn={letterSpacing:0,fontWeight:400},wn=["Top","Right","Bottom","Left"],Nn=["Webkit","O","Moz","ms"];st.fn.extend({css:function(e,n){return st.access(this,function(e,n,r){var i,o,a={},s=0;if(st.isArray(n)){for(i=ln(e),o=n.length;o>s;s++)a[n[s]]=st.css(e,n[s],!1,i);return a}return r!==t?st.style(e,n,r):st.css(e,n)},e,n,arguments.length>1)},show:function(){return N(this,!0)},hide:function(){return N(this)},toggle:function(e){var t="boolean"==typeof e;return this.each(function(){(t?e:w(this))?st(this).show():st(this).hide()})}}),st.extend({cssHooks:{opacity:{get:function(e,t){if(t){var n=un(e,"opacity");return""===n?"1":n}}}},cssNumber:{columnCount:!0,fillOpacity:!0,fontWeight:!0,lineHeight:!0,opacity:!0,orphans:!0,widows:!0,zIndex:!0,zoom:!0},cssProps:{"float":st.support.cssFloat?"cssFloat":"styleFloat"},style:function(e,n,r,i){if(e&&3!==e.nodeType&&8!==e.nodeType&&e.style){var o,a,s,u=st.camelCase(n),l=e.style;if(n=st.cssProps[u]||(st.cssProps[u]=T(l,u)),s=st.cssHooks[n]||st.cssHooks[u],r===t)return s&&"get"in s&&(o=s.get(e,!1,i))!==t?o:l[n];if(a=typeof r,"string"===a&&(o=vn.exec(r))&&(r=(o[1]+1)*o[2]+parseFloat(st.css(e,n)),a="number"),!(null==r||"number"===a&&isNaN(r)||("number"!==a||st.cssNumber[u]||(r+="px"),st.support.clearCloneStyle||""!==r||0!==n.indexOf("background")||(l[n]="inherit"),s&&"set"in s&&(r=s.set(e,r,i))===t)))try{l[n]=r}catch(c){}}},css:function(e,n,r,i){var o,a,s,u=st.camelCase(n);return n=st.cssProps[u]||(st.cssProps[u]=T(e.style,u)),s=st.cssHooks[n]||st.cssHooks[u],s&&"get"in s&&(o=s.get(e,!0,r)),o===t&&(o=un(e,n,i)),"normal"===o&&n in Tn&&(o=Tn[n]),r?(a=parseFloat(o),r===!0||st.isNumeric(a)?a||0:o):o},swap:function(e,t,n,r){var i,o,a={};for(o in t)a[o]=e.style[o],e.style[o]=t[o];i=n.apply(e,r||[]);for(o in t)e.style[o]=a[o];return i}}),e.getComputedStyle?(ln=function(t){return e.getComputedStyle(t,null)},un=function(e,n,r){var i,o,a,s=r||ln(e),u=s?s.getPropertyValue(n)||s[n]:t,l=e.style;return s&&(""!==u||st.contains(e.ownerDocument,e)||(u=st.style(e,n)),yn.test(u)&&gn.test(n)&&(i=l.width,o=l.minWidth,a=l.maxWidth,l.minWidth=l.maxWidth=l.width=u,u=s.width,l.width=i,l.minWidth=o,l.maxWidth=a)),u}):V.documentElement.currentStyle&&(ln=function(e){return e.currentStyle},un=function(e,n,r){var i,o,a,s=r||ln(e),u=s?s[n]:t,l=e.style;return null==u&&l&&l[n]&&(u=l[n]),yn.test(u)&&!dn.test(n)&&(i=l.left,o=e.runtimeStyle,a=o&&o.left,a&&(o.left=e.currentStyle.left),l.left="fontSize"===n?"1em":u,u=l.pixelLeft+"px",l.left=i,a&&(o.left=a)),""===u?"auto":u}),st.each(["height","width"],function(e,n){st.cssHooks[n]={get:function(e,r,i){return r?0===e.offsetWidth&&hn.test(st.css(e,"display"))?st.swap(e,xn,function(){return E(e,n,i)}):E(e,n,i):t},set:function(e,t,r){var i=r&&ln(e);return C(e,t,r?k(e,n,r,st.support.boxSizing&&"border-box"===st.css(e,"boxSizing",!1,i),i):0)}}}),st.support.opacity||(st.cssHooks.opacity={get:function(e,t){return pn.test((t&&e.currentStyle?e.currentStyle.filter:e.style.filter)||"")?.01*parseFloat(RegExp.$1)+"":t?"1":""},set:function(e,t){var n=e.style,r=e.currentStyle,i=st.isNumeric(t)?"alpha(opacity="+100*t+")":"",o=r&&r.filter||n.filter||"";n.zoom=1,(t>=1||""===t)&&""===st.trim(o.replace(fn,""))&&n.removeAttribute&&(n.removeAttribute("filter"),""===t||r&&!r.filter)||(n.filter=fn.test(o)?o.replace(fn,i):o+" "+i)}}),st(function(){st.support.reliableMarginRight||(st.cssHooks.marginRight={get:function(e,n){return n?st.swap(e,{display:"inline-block"},un,[e,"marginRight"]):t}}),!st.support.pixelPosition&&st.fn.position&&st.each(["top","left"],function(e,n){st.cssHooks[n]={get:function(e,r){return r?(r=un(e,n),yn.test(r)?st(e).position()[n]+"px":r):t}}})}),st.expr&&st.expr.filters&&(st.expr.filters.hidden=function(e){return 0===e.offsetWidth&&0===e.offsetHeight||!st.support.reliableHiddenOffsets&&"none"===(e.style&&e.style.display||st.css(e,"display"))},st.expr.filters.visible=function(e){return!st.expr.filters.hidden(e)}),st.each({margin:"",padding:"",border:"Width"},function(e,t){st.cssHooks[e+t]={expand:function(n){for(var r=0,i={},o="string"==typeof n?n.split(" "):[n];4>r;r++)i[e+wn[r]+t]=o[r]||o[r-2]||o[0];return i}},gn.test(e)||(st.cssHooks[e+t].set=C)});var Cn=/%20/g,kn=/\[\]$/,En=/\r?\n/g,Sn=/^(?:submit|button|image|reset)$/i,An=/^(?:input|select|textarea|keygen)/i;st.fn.extend({serialize:function(){return st.param(this.serializeArray())},serializeArray:function(){return this.map(function(){var e=st.prop(this,"elements");return e?st.makeArray(e):this}).filter(function(){var e=this.type;return this.name&&!st(this).is(":disabled")&&An.test(this.nodeName)&&!Sn.test(e)&&(this.checked||!Zt.test(e))}).map(function(e,t){var n=st(this).val();return null==n?null:st.isArray(n)?st.map(n,function(e){return{name:t.name,value:e.replace(En,"\r\n")}}):{name:t.name,value:n.replace(En,"\r\n")}}).get()}}),st.param=function(e,n){var r,i=[],o=function(e,t){t=st.isFunction(t)?t():null==t?"":t,i[i.length]=encodeURIComponent(e)+"="+encodeURIComponent(t)};if(n===t&&(n=st.ajaxSettings&&st.ajaxSettings.traditional),st.isArray(e)||e.jquery&&!st.isPlainObject(e))st.each(e,function(){o(this.name,this.value)});else for(r in e)j(r,e[r],n,o);return i.join("&").replace(Cn,"+")};var jn,Dn,Ln=st.now(),Hn=/\?/,Mn=/#.*$/,qn=/([?&])_=[^&]*/,_n=/^(.*?):[ \t]*([^\r\n]*)\r?$/gm,Fn=/^(?:about|app|app-storage|.+-extension|file|res|widget):$/,On=/^(?:GET|HEAD)$/,Bn=/^\/\//,Pn=/^([\w.+-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/,Rn=st.fn.load,Wn={},$n={},In="*/".concat("*");try{Dn=Y.href}catch(zn){Dn=V.createElement("a"),Dn.href="",Dn=Dn.href}jn=Pn.exec(Dn.toLowerCase())||[],st.fn.load=function(e,n,r){if("string"!=typeof e&&Rn)return Rn.apply(this,arguments);var i,o,a,s=this,u=e.indexOf(" ");return u>=0&&(i=e.slice(u,e.length),e=e.slice(0,u)),st.isFunction(n)?(r=n,n=t):n&&"object"==typeof n&&(o="POST"),s.length>0&&st.ajax({url:e,type:o,dataType:"html",data:n}).done(function(e){a=arguments,s.html(i?st("<div>").append(st.parseHTML(e)).find(i):e)}).complete(r&&function(e,t){s.each(r,a||[e.responseText,t,e])}),this},st.each(["ajaxStart","ajaxStop","ajaxComplete","ajaxError","ajaxSuccess","ajaxSend"],function(e,t){st.fn[t]=function(e){return this.on(t,e)}}),st.each(["get","post"],function(e,n){st[n]=function(e,r,i,o){return st.isFunction(r)&&(o=o||i,i=r,r=t),st.ajax({url:e,type:n,dataType:o,data:r,success:i})}}),st.extend({active:0,lastModified:{},etag:{},ajaxSettings:{url:Dn,type:"GET",isLocal:Fn.test(jn[1]),global:!0,processData:!0,async:!0,contentType:"application/x-www-form-urlencoded; charset=UTF-8",accepts:{"*":In,text:"text/plain",html:"text/html",xml:"application/xml, text/xml",json:"application/json, text/javascript"},contents:{xml:/xml/,html:/html/,json:/json/},responseFields:{xml:"responseXML",text:"responseText"},converters:{"* text":e.String,"text html":!0,"text json":st.parseJSON,"text xml":st.parseXML},flatOptions:{url:!0,context:!0}},ajaxSetup:function(e,t){return t?H(H(e,st.ajaxSettings),t):H(st.ajaxSettings,e)},ajaxPrefilter:D(Wn),ajaxTransport:D($n),ajax:function(e,n){function r(e,n,r,s){var l,f,v,b,T,N=n;2!==x&&(x=2,u&&clearTimeout(u),i=t,a=s||"",w.readyState=e>0?4:0,r&&(b=M(p,w,r)),e>=200&&300>e||304===e?(p.ifModified&&(T=w.getResponseHeader("Last-Modified"),T&&(st.lastModified[o]=T),T=w.getResponseHeader("etag"),T&&(st.etag[o]=T)),304===e?(l=!0,N="notmodified"):(l=q(p,b),N=l.state,f=l.data,v=l.error,l=!v)):(v=N,(e||!N)&&(N="error",0>e&&(e=0))),w.status=e,w.statusText=(n||N)+"",l?g.resolveWith(d,[f,N,w]):g.rejectWith(d,[w,N,v]),w.statusCode(y),y=t,c&&h.trigger(l?"ajaxSuccess":"ajaxError",[w,p,l?f:v]),m.fireWith(d,[w,N]),c&&(h.trigger("ajaxComplete",[w,p]),--st.active||st.event.trigger("ajaxStop")))}"object"==typeof e&&(n=e,e=t),n=n||{};var i,o,a,s,u,l,c,f,p=st.ajaxSetup({},n),d=p.context||p,h=p.context&&(d.nodeType||d.jquery)?st(d):st.event,g=st.Deferred(),m=st.Callbacks("once memory"),y=p.statusCode||{},v={},b={},x=0,T="canceled",w={readyState:0,getResponseHeader:function(e){var t;if(2===x){if(!s)for(s={};t=_n.exec(a);)s[t[1].toLowerCase()]=t[2];t=s[e.toLowerCase()]}return null==t?null:t},getAllResponseHeaders:function(){return 2===x?a:null},setRequestHeader:function(e,t){var n=e.toLowerCase();return x||(e=b[n]=b[n]||e,v[e]=t),this},overrideMimeType:function(e){return x||(p.mimeType=e),this},statusCode:function(e){var t;if(e)if(2>x)for(t in e)y[t]=[y[t],e[t]];else w.always(e[w.status]);return this},abort:function(e){var t=e||T;return i&&i.abort(t),r(0,t),this}};if(g.promise(w).complete=m.add,w.success=w.done,w.error=w.fail,p.url=((e||p.url||Dn)+"").replace(Mn,"").replace(Bn,jn[1]+"//"),p.type=n.method||n.type||p.method||p.type,p.dataTypes=st.trim(p.dataType||"*").toLowerCase().match(lt)||[""],null==p.crossDomain&&(l=Pn.exec(p.url.toLowerCase()),p.crossDomain=!(!l||l[1]===jn[1]&&l[2]===jn[2]&&(l[3]||("http:"===l[1]?80:443))==(jn[3]||("http:"===jn[1]?80:443)))),p.data&&p.processData&&"string"!=typeof p.data&&(p.data=st.param(p.data,p.traditional)),L(Wn,p,n,w),2===x)return w;c=p.global,c&&0===st.active++&&st.event.trigger("ajaxStart"),p.type=p.type.toUpperCase(),p.hasContent=!On.test(p.type),o=p.url,p.hasContent||(p.data&&(o=p.url+=(Hn.test(o)?"&":"?")+p.data,delete p.data),p.cache===!1&&(p.url=qn.test(o)?o.replace(qn,"$1_="+Ln++):o+(Hn.test(o)?"&":"?")+"_="+Ln++)),p.ifModified&&(st.lastModified[o]&&w.setRequestHeader("If-Modified-Since",st.lastModified[o]),st.etag[o]&&w.setRequestHeader("If-None-Match",st.etag[o])),(p.data&&p.hasContent&&p.contentType!==!1||n.contentType)&&w.setRequestHeader("Content-Type",p.contentType),w.setRequestHeader("Accept",p.dataTypes[0]&&p.accepts[p.dataTypes[0]]?p.accepts[p.dataTypes[0]]+("*"!==p.dataTypes[0]?", "+In+"; q=0.01":""):p.accepts["*"]);for(f in p.headers)w.setRequestHeader(f,p.headers[f]);if(p.beforeSend&&(p.beforeSend.call(d,w,p)===!1||2===x))return w.abort();T="abort";for(f in{success:1,error:1,complete:1})w[f](p[f]);if(i=L($n,p,n,w)){w.readyState=1,c&&h.trigger("ajaxSend",[w,p]),p.async&&p.timeout>0&&(u=setTimeout(function(){w.abort("timeout")},p.timeout));try{x=1,i.send(v,r)}catch(N){if(!(2>x))throw N;r(-1,N)}}else r(-1,"No Transport");return w},getScript:function(e,n){return st.get(e,t,n,"script")},getJSON:function(e,t,n){return st.get(e,t,n,"json")}}),st.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/(?:java|ecma)script/},converters:{"text script":function(e){return st.globalEval(e),e}}}),st.ajaxPrefilter("script",function(e){e.cache===t&&(e.cache=!1),e.crossDomain&&(e.type="GET",e.global=!1)}),st.ajaxTransport("script",function(e){if(e.crossDomain){var n,r=V.head||st("head")[0]||V.documentElement;return{send:function(t,i){n=V.createElement("script"),n.async=!0,e.scriptCharset&&(n.charset=e.scriptCharset),n.src=e.url,n.onload=n.onreadystatechange=function(e,t){(t||!n.readyState||/loaded|complete/.test(n.readyState))&&(n.onload=n.onreadystatechange=null,n.parentNode&&n.parentNode.removeChild(n),n=null,t||i(200,"success"))},r.insertBefore(n,r.firstChild)},abort:function(){n&&n.onload(t,!0)}}}});var Xn=[],Un=/(=)\?(?=&|$)|\?\?/;st.ajaxSetup({jsonp:"callback",jsonpCallback:function(){var e=Xn.pop()||st.expando+"_"+Ln++;return this[e]=!0,e}}),st.ajaxPrefilter("json jsonp",function(n,r,i){var o,a,s,u=n.jsonp!==!1&&(Un.test(n.url)?"url":"string"==typeof n.data&&!(n.contentType||"").indexOf("application/x-www-form-urlencoded")&&Un.test(n.data)&&"data");return u||"jsonp"===n.dataTypes[0]?(o=n.jsonpCallback=st.isFunction(n.jsonpCallback)?n.jsonpCallback():n.jsonpCallback,u?n[u]=n[u].replace(Un,"$1"+o):n.jsonp!==!1&&(n.url+=(Hn.test(n.url)?"&":"?")+n.jsonp+"="+o),n.converters["script json"]=function(){return s||st.error(o+" was not called"),s[0]},n.dataTypes[0]="json",a=e[o],e[o]=function(){s=arguments},i.always(function(){e[o]=a,n[o]&&(n.jsonpCallback=r.jsonpCallback,Xn.push(o)),s&&st.isFunction(a)&&a(s[0]),s=a=t}),"script"):t});var Vn,Yn,Jn=0,Gn=e.ActiveXObject&&function(){var e;for(e in Vn)Vn[e](t,!0)};st.ajaxSettings.xhr=e.ActiveXObject?function(){return!this.isLocal&&_()||F()}:_,Yn=st.ajaxSettings.xhr(),st.support.cors=!!Yn&&"withCredentials"in Yn,Yn=st.support.ajax=!!Yn,Yn&&st.ajaxTransport(function(n){if(!n.crossDomain||st.support.cors){var r;return{send:function(i,o){var a,s,u=n.xhr();if(n.username?u.open(n.type,n.url,n.async,n.username,n.password):u.open(n.type,n.url,n.async),n.xhrFields)for(s in n.xhrFields)u[s]=n.xhrFields[s];n.mimeType&&u.overrideMimeType&&u.overrideMimeType(n.mimeType),n.crossDomain||i["X-Requested-With"]||(i["X-Requested-With"]="XMLHttpRequest");try{for(s in i)u.setRequestHeader(s,i[s])}catch(l){}u.send(n.hasContent&&n.data||null),r=function(e,i){var s,l,c,f,p;try{if(r&&(i||4===u.readyState))if(r=t,a&&(u.onreadystatechange=st.noop,Gn&&delete Vn[a]),i)4!==u.readyState&&u.abort();else{f={},s=u.status,p=u.responseXML,c=u.getAllResponseHeaders(),p&&p.documentElement&&(f.xml=p),"string"==typeof u.responseText&&(f.text=u.responseText);try{l=u.statusText}catch(d){l=""}s||!n.isLocal||n.crossDomain?1223===s&&(s=204):s=f.text?200:404}}catch(h){i||o(-1,h)}f&&o(s,l,f,c)},n.async?4===u.readyState?setTimeout(r):(a=++Jn,Gn&&(Vn||(Vn={},st(e).unload(Gn)),Vn[a]=r),u.onreadystatechange=r):r()},abort:function(){r&&r(t,!0)}}}});var Qn,Kn,Zn=/^(?:toggle|show|hide)$/,er=RegExp("^(?:([+-])=|)("+ut+")([a-z%]*)$","i"),tr=/queueHooks$/,nr=[W],rr={"*":[function(e,t){var n,r,i=this.createTween(e,t),o=er.exec(t),a=i.cur(),s=+a||0,u=1,l=20;if(o){if(n=+o[2],r=o[3]||(st.cssNumber[e]?"":"px"),"px"!==r&&s){s=st.css(i.elem,e,!0)||n||1;do u=u||".5",s/=u,st.style(i.elem,e,s+r);while(u!==(u=i.cur()/a)&&1!==u&&--l)}i.unit=r,i.start=s,i.end=o[1]?s+(o[1]+1)*n:n}return i}]};st.Animation=st.extend(P,{tweener:function(e,t){st.isFunction(e)?(t=e,e=["*"]):e=e.split(" ");for(var n,r=0,i=e.length;i>r;r++)n=e[r],rr[n]=rr[n]||[],rr[n].unshift(t)},prefilter:function(e,t){t?nr.unshift(e):nr.push(e)}}),st.Tween=$,$.prototype={constructor:$,init:function(e,t,n,r,i,o){this.elem=e,this.prop=n,this.easing=i||"swing",this.options=t,this.start=this.now=this.cur(),this.end=r,this.unit=o||(st.cssNumber[n]?"":"px")},cur:function(){var e=$.propHooks[this.prop];return e&&e.get?e.get(this):$.propHooks._default.get(this)},run:function(e){var t,n=$.propHooks[this.prop];return this.pos=t=this.options.duration?st.easing[this.easing](e,this.options.duration*e,0,1,this.options.duration):e,this.now=(this.end-this.start)*t+this.start,this.options.step&&this.options.step.call(this.elem,this.now,this),n&&n.set?n.set(this):$.propHooks._default.set(this),this}},$.prototype.init.prototype=$.prototype,$.propHooks={_default:{get:function(e){var t;return null==e.elem[e.prop]||e.elem.style&&null!=e.elem.style[e.prop]?(t=st.css(e.elem,e.prop,"auto"),t&&"auto"!==t?t:0):e.elem[e.prop]},set:function(e){st.fx.step[e.prop]?st.fx.step[e.prop](e):e.elem.style&&(null!=e.elem.style[st.cssProps[e.prop]]||st.cssHooks[e.prop])?st.style(e.elem,e.prop,e.now+e.unit):e.elem[e.prop]=e.now}}},$.propHooks.scrollTop=$.propHooks.scrollLeft={set:function(e){e.elem.nodeType&&e.elem.parentNode&&(e.elem[e.prop]=e.now)}},st.each(["toggle","show","hide"],function(e,t){var n=st.fn[t];st.fn[t]=function(e,r,i){return null==e||"boolean"==typeof e?n.apply(this,arguments):this.animate(I(t,!0),e,r,i)}}),st.fn.extend({fadeTo:function(e,t,n,r){return this.filter(w).css("opacity",0).show().end().animate({opacity:t},e,n,r)},animate:function(e,t,n,r){var i=st.isEmptyObject(e),o=st.speed(t,n,r),a=function(){var t=P(this,st.extend({},e),o);a.finish=function(){t.stop(!0)},(i||st._data(this,"finish"))&&t.stop(!0)};return a.finish=a,i||o.queue===!1?this.each(a):this.queue(o.queue,a)},stop:function(e,n,r){var i=function(e){var t=e.stop;delete e.stop,t(r)};return"string"!=typeof e&&(r=n,n=e,e=t),n&&e!==!1&&this.queue(e||"fx",[]),this.each(function(){var t=!0,n=null!=e&&e+"queueHooks",o=st.timers,a=st._data(this);if(n)a[n]&&a[n].stop&&i(a[n]);else for(n in a)a[n]&&a[n].stop&&tr.test(n)&&i(a[n]);for(n=o.length;n--;)o[n].elem!==this||null!=e&&o[n].queue!==e||(o[n].anim.stop(r),t=!1,o.splice(n,1));(t||!r)&&st.dequeue(this,e)})},finish:function(e){return e!==!1&&(e=e||"fx"),this.each(function(){var t,n=st._data(this),r=n[e+"queue"],i=n[e+"queueHooks"],o=st.timers,a=r?r.length:0;for(n.finish=!0,st.queue(this,e,[]),i&&i.cur&&i.cur.finish&&i.cur.finish.call(this),t=o.length;t--;)o[t].elem===this&&o[t].queue===e&&(o[t].anim.stop(!0),o.splice(t,1));for(t=0;a>t;t++)r[t]&&r[t].finish&&r[t].finish.call(this);delete n.finish})}}),st.each({slideDown:I("show"),slideUp:I("hide"),slideToggle:I("toggle"),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(e,t){st.fn[e]=function(e,n,r){return this.animate(t,e,n,r)}}),st.speed=function(e,t,n){var r=e&&"object"==typeof e?st.extend({},e):{complete:n||!n&&t||st.isFunction(e)&&e,duration:e,easing:n&&t||t&&!st.isFunction(t)&&t};return r.duration=st.fx.off?0:"number"==typeof r.duration?r.duration:r.duration in st.fx.speeds?st.fx.speeds[r.duration]:st.fx.speeds._default,(null==r.queue||r.queue===!0)&&(r.queue="fx"),r.old=r.complete,r.complete=function(){st.isFunction(r.old)&&r.old.call(this),r.queue&&st.dequeue(this,r.queue)},r},st.easing={linear:function(e){return e},swing:function(e){return.5-Math.cos(e*Math.PI)/2}},st.timers=[],st.fx=$.prototype.init,st.fx.tick=function(){var e,n=st.timers,r=0;for(Qn=st.now();n.length>r;r++)e=n[r],e()||n[r]!==e||n.splice(r--,1);n.length||st.fx.stop(),Qn=t},st.fx.timer=function(e){e()&&st.timers.push(e)&&st.fx.start()},st.fx.interval=13,st.fx.start=function(){Kn||(Kn=setInterval(st.fx.tick,st.fx.interval))},st.fx.stop=function(){clearInterval(Kn),Kn=null},st.fx.speeds={slow:600,fast:200,_default:400},st.fx.step={},st.expr&&st.expr.filters&&(st.expr.filters.animated=function(e){return st.grep(st.timers,function(t){return e===t.elem}).length}),st.fn.offset=function(e){if(arguments.length)return e===t?this:this.each(function(t){st.offset.setOffset(this,e,t)});var n,r,i={top:0,left:0},o=this[0],a=o&&o.ownerDocument;if(a)return n=a.documentElement,st.contains(n,o)?(o.getBoundingClientRect!==t&&(i=o.getBoundingClientRect()),r=z(a),{top:i.top+(r.pageYOffset||n.scrollTop)-(n.clientTop||0),left:i.left+(r.pageXOffset||n.scrollLeft)-(n.clientLeft||0)}):i},st.offset={setOffset:function(e,t,n){var r=st.css(e,"position");"static"===r&&(e.style.position="relative");var i,o,a=st(e),s=a.offset(),u=st.css(e,"top"),l=st.css(e,"left"),c=("absolute"===r||"fixed"===r)&&st.inArray("auto",[u,l])>-1,f={},p={};c?(p=a.position(),i=p.top,o=p.left):(i=parseFloat(u)||0,o=parseFloat(l)||0),st.isFunction(t)&&(t=t.call(e,n,s)),null!=t.top&&(f.top=t.top-s.top+i),null!=t.left&&(f.left=t.left-s.left+o),"using"in t?t.using.call(e,f):a.css(f)}},st.fn.extend({position:function(){if(this[0]){var e,t,n={top:0,left:0},r=this[0];return"fixed"===st.css(r,"position")?t=r.getBoundingClientRect():(e=this.offsetParent(),t=this.offset(),st.nodeName(e[0],"html")||(n=e.offset()),n.top+=st.css(e[0],"borderTopWidth",!0),n.left+=st.css(e[0],"borderLeftWidth",!0)),{top:t.top-n.top-st.css(r,"marginTop",!0),left:t.left-n.left-st.css(r,"marginLeft",!0)}}},offsetParent:function(){return this.map(function(){for(var e=this.offsetParent||V.documentElement;e&&!st.nodeName(e,"html")&&"static"===st.css(e,"position");)e=e.offsetParent;return e||V.documentElement})}}),st.each({scrollLeft:"pageXOffset",scrollTop:"pageYOffset"},function(e,n){var r=/Y/.test(n);st.fn[e]=function(i){return st.access(this,function(e,i,o){var a=z(e);return o===t?a?n in a?a[n]:a.document.documentElement[i]:e[i]:(a?a.scrollTo(r?st(a).scrollLeft():o,r?o:st(a).scrollTop()):e[i]=o,t)},e,i,arguments.length,null)}}),st.each({Height:"height",Width:"width"},function(e,n){st.each({padding:"inner"+e,content:n,"":"outer"+e},function(r,i){st.fn[i]=function(i,o){var a=arguments.length&&(r||"boolean"!=typeof i),s=r||(i===!0||o===!0?"margin":"border");return st.access(this,function(n,r,i){var o;return st.isWindow(n)?n.document.documentElement["client"+e]:9===n.nodeType?(o=n.documentElement,Math.max(n.body["scroll"+e],o["scroll"+e],n.body["offset"+e],o["offset"+e],o["client"+e])):i===t?st.css(n,r,s):st.style(n,r,i,s)},n,a?i:t,a,null)}})}),e.jQuery=e.$=st,"function"==typeof define&&define.amd&&define.amd.jQuery&&define("jquery",[],function(){return st})})(window);

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
Loop.prototype={
	constructor:Loop,
	for_lt:function(i,limiter,incr,data,body,done){
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
	},
	for_le:function(i,limiter,incr,data,body,done){
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
	},
	for_gt:function(i,limiter,incr,data,body,done){
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
	},
	for_ge:function(i,limiter,incr,data,body,done){
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
	},
	forever:function(data,body,done){
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
	},
	Break:function(){
		this.special=1;
		return undefined;
	},
	Continue:function(){
		this.special=2;
		return undefined;
	},
	loop:function(){
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
	},
	stop:function(){
		if(this.timer!==null){
			clearTimeout(this.timer);
			this.timer=null;
		}
		this.loops=new Array();
	}
};

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
DataImage.prototype={
	constructor:DataImage,
	get_pixel:function(x,y,c){
		return this.pixels[(x+y*this.width)*this.color_depth+c];
	}
};
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
DataImageReader.prototype={
	constructor:DataImageReader,
	decode_title:function(title){
		return title;
	},
	unpack:function(){
		try{
			return this.__unpack();
		}
		catch(e){
			return"Error extracting data; image file likely doesn't contain data";
		}
	},
	unpack_slow:function(callback){
		try{
			this.__unpack_slow(callback);
		}
		catch(e){
			callback("Error extracting data; image file likely doesn't contain data");
		}
	},
	unpack_names:function(){
		try{
			var r=this.__unpack_start();
			this.hashmasking=false;
			this.hashmask_value=null;
			return r;
		}
		catch(e){
			return"Error extracting data; image file likely doesn't contain data";
		}
	},
	__unpack_start:function(){
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
	},
	__unpack:function(){
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
	},
	__unpack_slow:function(callback){
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
	},
	next_pixel_component:function(count){
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
	},
	__extract_data:function(byte_length){
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
	},
	__extract_data_slow:function(byte_length,loop,done_callback){
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
	},
	__data_to_int:function(data){
		var val=0;
		for(var i=0;i<data.length;++i){
			val=(val<<8)+data[i];
		}
		return val;
	},
	__data_to_string:function(data){
		var val="";
		for(var i=0;i<data.length;++i){
			val+=String.fromCharCode(data[i]);
		}
		return val;
	},
	__read_pixel:function(value_mask){
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
	},
	__complete_pixel:function(){
		if(this.bit_count>0){
			this.bit_count=0;
			this.bit_value=0;
		}
	},
	__init_hashmask:function(){
		this.hashmasking=true;
		this.hashmask_length=32*8;
		this.hashmask_index=0;
		this.hashmask_value=new Uint8Array(this.hashmask_length/8);
		for(var i=0;i<this.hashmask_length/8;++i){
			this.hashmask_value[i]=(1<<((i%8)+1))-1;
		}
		this.__calculate_hashmask();
		this.hashmask_index=0;
	},
	__calculate_hashmask:function(){
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
	},
	__update_hashmask:function(value,bits){
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
	},
	__decode_hashmask:function(value,bits){
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
};

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
		".MPContainerMain":{
			"border-radius":"{exp:bg_outer_border_radius,*,border_scale}px",
			"padding":"{exp:bg_outer_size,*,padding_scale}px",
			"background":"transparent",
			"font-family":"{main_font}",
			"font-size":"{exp:font_size,*,font_scale}px",
			"position":"fixed",
			"color":"{hex:color_standard}",
			"z-index":"10000"
		},
		".MPContainerMainBorders":{
			"background":"{rgba:bg_outer_color}"
		},
		".MPContainer":{
			"position":"relative"
		},
		".MPTitleBarContainer":{
			"position":"relative",
			"background":"{rgba:bg_color_dark}",
			"text-align":"center",
			"cursor":"move",
			"border-top-left-radius":"{exp:bg_inner_border_radius,*,border_scale}px",
			"border-top-right-radius":"{exp:bg_inner_border_radius,*,border_scale}px"
		},
		".MPTitleContainer":{
			"display":"block",
			"padding":"{exp:1,*,padding_scale}px 0px {exp:1,*,padding_scale}px 0px",
			"overflow":"hidden"
		},
		".MPTitle":{
			"display":"inline",
			"white-space":"nowrap",
			"font-weight":"bold",
			"color":"{hex:color_special_1} !important",
			"text-shadow":"{exp:1,*,font_scale}px {exp:1,*,font_scale}px 1px {hex:color_highlight_light}"
		},
		".MPMainButtonsLeft":{
			"position":"absolute",
			"left":"0",
			"top":"0",
			"display":"inline-block",
			"height":"100%",
			"overflow":"hidden"
		},
		".MPMainButtonsRight":{
			"position":"absolute",
			"right":"0",
			"top":"0",
			"display":"inline-block",
			"height":"100%",
			"overflow":"hidden"
		},
		".MPMainButtonLeft, a.MPMainButtonLeft":{
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
		".MPMainButtonLeft:hover":{
			"opacity":"1.0",
			"text-decoration":"none !important",
			"color":"{hex:color_light} !important",
			"background":"{rgba:bg_color_darker}"
		},
		".MPMainButtonLeft:active":{
			"opacity":"1.0",
			"text-decoration":"none !important",
			"color":"{hex:color_special_2} !important",
			"background":"{rgba:bg_color_darker}"
		},
		".MPMainButtonRight, a.MPMainButtonRight":{
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
		".MPMainButtonRight:hover":{
			"opacity":"1.0",
			"text-decoration":"none !important",
			"color":"{hex:color_light} !important",
			"background":"{rgba:bg_color_darker}"
		},
		".MPMainButtonRight:active":{
			"opacity":"1.0",
			"text-decoration":"none !important",
			"color":"{hex:color_special_2} !important",
			"background":"{rgba:bg_color_darker}"
		},
		".MPMainButtonGeneric, a.MPMainButtonGeneric":{
			"display":"inline-block",
			"padding":"{exp:1,*,padding_scale}px",
			"text-decoration":"none !important",
			"cursor":"pointer",
			"height":"100%",
			"opacity":"0.0",
			"color":"{hex:color_disabled} !important",
			"background":"transparent"
		},
		".MPMainButtonGeneric:hover":{
			"opacity":"1.0",
			"text-decoration":"none !important",
			"color":"{hex:color_light} !important",
			"background":"{rgba:bg_color_darker}"
		},
		".MPMainButtonGeneric:active":{
			"opacity":"1.0",
			"text-decoration":"none !important",
			"color":"{hex:color_special_2} !important",
			"background":"{rgba:bg_color_darker}"
		},
		".MPContentContainer":{
			"background":"{rgba:bg_color_light}",
			"text-align":"center",
			"position":"relative"
		},
		".MPTopContainer":{
			"position":"relative",
		},
		".MPVolumeContainer":{
			"position":"absolute",
			"left":"0",
			"top":"0",
			"height":"100%",
			"opacity":"0.0",
			"background":"transparent"
		},
		".MPVolumeContainerActive":{
			"opacity":"1.0 !important"
		},
		".MPContainerMain:hover .MPVolumeContainer":{
			"opacity":"0.5"
		},
		".MPContainerMain:hover .MPTopContainer:hover .MPVolumeContainer":{
			"opacity":"1.0"
		},
		".MPVolumeContainerActive .MPVolumeContainer":{
			"opacity":"1.0 !important"
		},
		".MPVolumeContainerActive .MPVolumeContainer:hover":{
			"opacity":"1.0 !important"
		},
		".MPVolumeBarContainer":{
			"position":"relative",
			"width":"{exp:16,*,font_scale}px",
			"height":"100%",
			"display":"inline-block",
			"vertical-align":"top",
			"cursor":"pointer",
			"background":"{rgba:bg_color_lightest}"
		},
		".MPVolumeBar":{
			"position":"absolute",
			"bottom":"0",
			"width":"100%",
			"cursor":"pointer"
		},
		".MPVolumeLabelContainer":{
			"text-align":"left",
			"display":"inline-block",
			"cursor":"default",
			"padding":"0px {exp:2,*,padding_scale}px 0px {exp:2,*,padding_scale}px",
			"text-shadow":"{exp:1,*,font_scale}px {exp:1,*,font_scale}px 1px {hex:color_highlight_light}"
		},
		".MPVolumeLabel":{
			"display":"block",
			"color":"{hex:color_standard} !important",
		},
		".MPVolumeValue":{
			"display":"block",
			"font-size":"{exp:font_size_small,*,font_scale}px",
			"color":"{hex:color_standard} !important",
		},
		".MPPlaylistIndexContainer":{
			"position":"absolute",
			"right":"0",
			"top":"0",
			"cursor":"default",
			"opacity":"0.0",
			"padding":"{exp:2,*,padding_scale}px",
		},
		".MPPlaylistIndexContainerActive":{
			"opacity":"1.0 !important"
		},
		".MPContainerMain:hover .MPPlaylistIndexContainer":{
			"opacity":"0.5"
		},
		".MPContainerMain:hover .MPTopContainer:hover .MPPlaylistIndexContainer":{
			"opacity":"1.0"
		},
		".MPPlaylistIndexContainerInner":{
			"padding":"{exp:2,*,padding_scale}px",
			"border-radius":"{exp:2,*,padding_scale}px",
			"background":"{rgba:bg_color_lightest}",
		},
		".MPPlaylistIndexText1":{
			"color":"{hex:color_standard} !important",
			"display":"inline-block"
		},
		".MPPlaylistIndexText2":{
			"color":"{hex:color_standard} !important",
			"display":"inline-block",
			"padding":"0px {exp:2,*,padding_scale}px 0px {exp:2,*,padding_scale}px",
		},
		".MPPlaylistIndexText3":{
			"color":"{hex:color_standard} !important",
			"display":"inline-block"
		},
		".MPControlContainer":{
			"width":"100%",
			"padding-top":"{exp:2,*,padding_scale}px",
			"text-align":"center",
			"position":"absolute",
			"bottom":"0",
			"opacity":"0.0"
		},
		".MPContainerMain:hover .MPControlContainer":{
			"opacity":"1.0"
		},
		".MPControlContainerInner":{
			"padding":"{exp:4,*,padding_scale}px {exp:6,*,padding_scale}px {exp:2,*,padding_scale}px {exp:6,*,padding_scale}px",
			"display":"inline-block",
			"border-top-left-radius":"{exp:border_radius_normal,*,border_scale}px",
			"border-top-right-radius":"{exp:border_radius_normal,*,border_scale}px",
			"background":"{rgba:bg_color_lightest,0.5}"
		},
		".MPTopContainer:hover .MPControlContainerInner":{
			"background":"{rgba:bg_color_lightest}"
		},
		".MPControlLink, a.MPControlLink":{
			"padding":"{exp:1,*,padding_scale}px {exp:2,*,padding_scale}px {exp:1,*,padding_scale}px {exp:2,*,padding_scale}px",
			"font-family":"{controls_font} !important",
			"font-size":"{exp:font_size_controls,*,font_scale}px",
			"font-weight":"bold !important",
			"text-decoration":"none !important",
			"display":"inline-block",
			"border-radius":"{exp:border_radius_small,*,border_scale}px",
			"cursor":"pointer",
			"color":"{hex:color_standard} !important",
			"background":"transparent"
		},
		".MPControlLink:hover, a.MPControlLink:hover":{
			"text-decoration":"none !important",
			"color":"{hex:color_standard} !important",
			"background":"{rgba:bg_color_light}"
		},
		".MPControlLink:active, a.MPControlLink:active":{
			"text-decoration":"none !important",
			"color":"{hex:color_special_2} !important",
			"background":"{rgba:bg_color_dark}"
		},
		".MPControlLinkDisabled, .MPControlLinkDisabled:hover, .MPControlLinkDisabled:active":{
			"color":"{hex:color_disabled} !important",
			"background":"transparent !important",
			"cursor":"default !important"
		},
		".MPControlLinkSeparator":{
			"display":"inline-block",
			"width":"{exp:2,*,padding_scale}px"
		},
		".MPControlLinkSvgContainer":{
			"padding":"{exp:1,*,padding_scale}px {exp:2,*,padding_scale}px {exp:1,*,padding_scale}px {exp:2,*,padding_scale}px",
			"border-radius":"{exp:border_radius_small,*,border_scale}px",
			"background":"transparent",
			"display":"inline-block",
			"cursor":"pointer"
		},
		".MPControlLinkSvgContainer:hover":{
			"background":"{rgba:bg_color_light}"
		},
		".MPControlLinkSvgContainer:active":{
			"background":"{rgba:bg_color_dark}"
		},
		".MPControlLinkSvg":{
			"width":"{exp:14,*,font_scale}px",
			"height":"{exp:14,*,font_scale}px"
		},
		".MPControlLinkSvgMainGroup":{
		},
		".MPControlLinkSvgShapeColor":{
			"fill":"{rgb:color_standard}",
			"fill-opacity":"0.5",
			"stroke":"none"
		},
		".MPTopContainer:hover .MPControlLinkSvgShapeColor":{
			"fill-opacity":"1.0 !important"
		},
		".MPTopContainer:hover .MPControlLinkDisabled .MPControlLinkSvgShapeColor":{
			"fill-opacity":"0.5 !important"
		},
		".MPControlLinkSvgContainer:hover .MPControlLinkSvgShapeColor":{
			"fill":"{rgb:color_standard}",
		},
		".MPControlLinkSvgContainer:active .MPControlLinkSvgShapeColor":{
			"fill":"{rgb:color_special_2}",
		},
		".MPVideoContainer":{
			"display":"block",
			"position":"absolute",
			"left":"0",
			"top":"0",
			"width":"100%",
			"height":"100%",
			"overflow":"hidden"
		},
		".MPVideoContainerMask":{
			"display":"block",
			"position":"absolute",
			"left":"0",
			"top":"0",
			"width":"100%",
			"height":"100%"
		},
		".MPSeekContainerTop":{
			"position":"relative",
			"height":"{exp:1,*,border_scale}px",
			"background":"{rgba:bg_color_dark}",
			"font-size":"0px"
		},
		".MPSeekContainerBottom":{
			"height":"{exp:1,*,border_scale}px",
			"background":"{rgba:bg_color_dark}"
		},
		".MPSeekContainer":{
			"position":"relative",
			"border":"0px"
		},
		".MPSeekTimeContainer":{
			"position":"relative",
			"padding":"{exp:1,*,padding_scale}px 0px {exp:1,*,padding_scale}px 0px",
			"text-align":"center"
		},
		".MPSeekTime":{
			"color":"{hex:color_standard} !important",
			"display":"inline-block",
			"text-shadow":"{exp:1,*,font_scale}px {exp:1,*,font_scale}px 1px {hex:color_highlight_light}",
		},
		".MPSeekTimeLeft":{
			"position":"absolute",
			"left":"0",
			"padding-left":"{exp:1,*,padding_scale}px",
			"display":"inline-block",
			"color":"{hex:color_disabled} !important"
		},
		".MPSeekTimeRight":{
			"position":"absolute",
			"right":"0",
			"padding-right":"{exp:1,*,padding_scale}px",
			"display":"inline-block",
			"color":"{hex:color_disabled} !important"
		},
		".MPSeekBarContainer":{
			"position":"absolute",
			"left":"0",
			"top":"0",
			"width":"100%",
			"height":"100%",
			"text-align":"left",
			"overflow":"hidden",
			"cursor":"default"
		},
		".MPSeekBarMover":{
			"width":"0px",
			"height":"100%",
			"display":"inline-block",
			"background":"{rgba:bg_color_darkest,0.125}",
			"cursor":"default"
		},
		".MPSeekBar":{
			"width":"{exp:8,*,font_scale}px",
			"height":"100%",
			"display":"inline-block",
			"background":"{rgba:bg_color_darkest,0.75}",
			"cursor":"pointer"
		},
		".MPSeekBarActive":{
			"background":"{rgba:color_special_2,0.75} !important"
		},
		".MPLoadPercentBarContainer":{
			"position":"absolute",
			"left":"0",
			"top":"0",
			"width":"100%",
			"height":"100%",
			"text-align":"left",
			"overflow":"hidden",
			"cursor":"default",
		},
		".MPLoadPercentBarMover":{
			"width":"0px",
			"height":"100%",
			"display":"inline-block",
			"background":"transparent",
			"cursor":"default"
		},
		".MPLoadPercentBar":{
			"width":"0px",
			"height":"100%",
			"display":"inline-block",
			"background":"{rgba:bg_color_darkest,0.5}",
			"cursor":"default"
		},
		".MPImageContainerMain":{
			"padding":"{exp:2,*,padding_scale}px 0px {exp:2,*,padding_scale}px 0px",
			"width":"100%",
			"text-align":"center",
			"position":"relative"
		},
		".MPImageContainer":{
			"display":"block",
			"width":"100%",
			"overflow":"hidden",
			"position":"relative"
		},
		".MPImage":{},
		".MPNoImage":{
			"display":"inline-block",
			"background":"{rgba:bg_color_lightest}",
			"color":"{hex:color_disabled}",
			"cursor":"default"
		},
		".MPNoImageText":{
			"display":"none"
		},
		".MPPlaylistContainer":{
			"cursor":"default",
			"overflow-x":"hidden",
			"overflow-y":"auto"
		},
		".MPPlaylistItem":{
			"position":"relative",
			"display":"block",
			"text-align":"left",
			"overflow":"hidden",
			"white-space":"nowrap",
			"cursor":"pointer"
		},
		".MPPlaylistItem:hover, .MPPlaylistItem:active":{
			"background":"{rgba:bg_color_lightest}"
		},
		".MPPlaylistItemActive":{},
		".MPPlaylistControlsContainer":{
			"position":"absolute",
			"right":"0",
			"top":"0",
			"display":"block",
			"cursor":"default"
		},
		".MPPlaylistItemInfo":{
			"position":"absolute",
			"right":"0",
			"top":"0",
			"white-space":"nowrap",
			"color":"{hex:color_light} !important",
			"display":"block",
			"cursor":"default",
			"padding":"{exp:1,*,padding_scale}px {exp:2,*,padding_scale}px {exp:1,*,padding_scale}px 0px",
			"background":"{rgba:bg_color_light}",
		},
		".MPPlaylistItem:hover .MPPlaylistItemInfo":{
			"background":"{rgba:bg_color_lightest}",
		},
		".MPPlaylistControls":{
			"opacity":"0.0",
			"text-decoration":"none !important",
			"background":"transparent",
			"display":"inline-block",
			"color":"{hex:color_standard} !important",
			"padding":"{exp:1,*,padding_scale}px 0px {exp:1,*,padding_scale}px 0px"
		},
		".MPPlaylistItem:hover .MPPlaylistControls":{
			"background":"{rgba:bg_color_lightest}",
			"text-decoration":"none !important",
			"opacity":"0.25"
		},
		".MPPlaylistItem:hover .MPPlaylistControls:hover, .MPPlaylistControls:active":{
			"background":"{rgba:bg_color_lightest}",
			"text-decoration":"none !important",
			"opacity":"1.0"
		},
		".MPPlaylistControlLink, a.MPPlaylistControlLink, .MPPlaylistControlLink:visited, a.MPPlaylistControlLink:visited":{
			"display":"inline-block",
			"padding":"0px {exp:2,*,padding_scale}px 0px {exp:2,*,padding_scale}px",
			"width":"{exp:12,*,font_scale}px",
			"text-align":"center",
			"cursor":"pointer",
			"border-radius":"{exp:border_radius_small,*,border_scale}px",
			"text-decoration":"none",
			"color":"{hex:color_disabled} !important",
			"background":"transparent"
		},
		".MPPlaylistControls:hover .MPPlaylistControlLink, .MPPlaylistControls:hover a.MPPlaylistControlLink":{
			"text-decoration":"none !important",
			"background":"{rgba:bg_color_light} !important"
		},
		".MPPlaylistControls:hover .MPPlaylistControlLink:hover, .MPPlaylistControls:hover a.MPPlaylistControlLink:hover":{
			"text-decoration":"none !important",
			"color":"{hex:color_standard} !important",
			"background":"{rgba:bg_color_dark}"
		},
		".MPPlaylistControls:hover .MPPlaylistControlLink:active, .MPPlaylistControls:hover a.MPPlaylistControlLink:active":{
			"text-decoration":"none !important",
			"color":"{hex:color_special_2} !important",
			"background":"{rgba:bg_color_dark}"
		},
		".MPPlaylistControlLinkSeparator":{
			"display":"inline-block",
			"padding":"0px 0px 0px {exp:1,*,padding_scale}px",
			"cursor":"default"
		},
		".MPPlaylistSoundName":{
			"color":"{hex:color_standard} !important",
			"padding":"{exp:1,*,padding_scale}px 0px {exp:1,*,padding_scale}px {exp:2,*,padding_scale}px"
		},
		".MPPlaylistItemActive .MPPlaylistSoundName":{
			"color":"{hex:color_special_2} !important",
			"text-shadow":"{exp:1,*,font_scale}px {exp:1,*,font_scale}px 1px {hex:color_highlight_light}"
		},
		".MPHelpContainer":{
			"position":"absolute",
			"left":"0",
			"top":"0",
			"width":"100%",
			"height":"100%",
			"background":"{rgba:bg_color_light}"
		},
		".MPHelpContainerInner0":{
			"position":"relative",
			"width":"100%",
			"height":"100%",
		},
		".MPHelpContainerInner1":{
			"position":"absolute",
			"left":"0",
			"top":"0",
			"right":"0",
			"bottom":"0",
			"overflow-x":"hidden",
			"overflow-y":"auto",
		},
		".MPHelpLabelDiv":{
			"display":"block",
			"width":"100%",
			"text-align":"left",
			"font-weight":"bold",
			"color":"{hex:color_standard} !important",
			"padding":"{exp:4,*,padding_scale}px {exp:2,*,padding_scale}px 0px {exp:2,*,padding_scale}px"
		},
		".MPHelpTextDiv":{
			"display":"block",
			"width":"100%",
			"text-align":"left",
			"color":"{hex:color_standard} !important",
			"padding":"{exp:2,*,padding_scale}px {exp:4,*,padding_scale}px 0px {exp:4,*,padding_scale}px"
		},
		".MPHelpSectionDiv":{
			"display":"block",
			"width":"100%",
			"text-align":"left",
			"color":"{hex:color_standard} !important",
			"padding-top":"{exp:2,*,padding_scale}px"
		},
		".MPHelpLinkDiv":{
			"background":"{rgba:bg_color_light}",
			"display":"block",
			"width":"100%",
			"position":"absolute",
			"bottom":"0",
			"left":"0"
		},
		".MPHelpTextLink, a.MPHelpTextLink":{
			"display":"inline-block",
			"width":"50%",
			"text-align":"center",
			"cursor":"pointer",
			"text-decoration":"none",
			"color":"{hex:color_standard} !important"
		},
		".MPHelpTextLink:hover, a.MPHelpTextLink:hover":{
			"text-decoration":"underline",
			"color":"{hex:color_standard} !important"
		},
		".MPHelpTextLink:active, a.MPHelpTextLink:active":{
			"text-decoration":"underline",
			"color":"{hex:color_special_2} !important"
		},
		".MPHelpModeNonLink":{
			"padding-left":"{exp:4.0,*,padding_scale}px"
		},
		".MPHelpModeLink, a.MPHelpModeLink":{
			"display":"inline-block",
			"width":"100%",
			"text-align":"left",
			"cursor":"pointer",
			"text-decoration":"none",
			"color":"{hex:color_standard} !important",
			"padding-left":"{exp:4.0,*,padding_scale}px"
		},
		".MPHelpModeLink:hover, a.MPHelpModeLink:hover":{
			"text-decoration":"underline",
			"color":"{hex:color_standard} !important"
		},
		".MPHelpModeLink:active, a.MPHelpModeLink:active":{
			"text-decoration":"underline",
			"color":"{hex:color_special_2} !important"
		},
		".MPHelpColorInputDiv0":{
			"width":"28%",
			"display":"inline-block",
			"position":"relative"
		},
		".MPHelpColorLabelText":{
			"display":"block",
			"width":"100%",
			"text-align":"right",
			"font-style":"italic",
			"color":"{hex:color_standard} !important",
			"vertical-align":"middle"
		},
		".MPHelpColorLabelDisplay":{
			"display":"block",
			"width":"{exp:4,*,padding_scale}px",
			"height":"100%",
			"position":"absolute",
			"left	":"0",
			"top":"0"
		},
		".MPHelpColorInputDiv1":{
			"width":"18%",
			"display":"inline-block"
		},
		".MPHelpColorInputDiv1Full":{
			"width":"72%",
			"display":"inline-block"
		},
		".MPHelpColorInputDiv2":{
			"padding-right":"{exp:2,*,padding_scale}px"
		},
		".MPHelpColorInputDiv2b":{
			"padding-right":"{exp:2,*,padding_scale}px"
		},
		".MPHelpColorInputDiv3":{
			"border":"{exp:1,*,border_scale}px solid {hex:bg_color_dark}",
			"padding":"{exp:2,*,padding_scale}px",
			"background":"{rgba:bg_color_lightest}"
		},
		".MPHelpColorInput[type=\"text\"], .MPHelpColorInput[type=\"text\"]:hover, .MPHelpColorInput[type=\"text\"]:active, .MPHelpColorInput[type=\"text\"]:focus, input.MPHelpColorInput[type=\"text\"], input.MPHelpColorInput[type=\"text\"]:hover, input.MPHelpColorInput[type=\"text\"]:active, input.MPHelpColorInput[type=\"text\"]:focus":{
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
		".MPFooterBarContainer":{
			"position":"relative",
			"background":"{rgba:bg_color_light}",
			"text-align":"center",
			"height":"{exp:bg_inner_border_radius,*,border_scale}px",
			"border-bottom-left-radius":"{exp:bg_inner_border_radius,*,border_scale}px",
			"border-bottom-right-radius":"{exp:bg_inner_border_radius,*,border_scale}px"
		},
		".MPDownloadsContainer":{
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
		".MPDownloadsLabel":{
			"display":"block",
			"width":"100%",
			"text-align":"left",
			"font-weight":"bold",
			"color":"{hex:color_standard} !important",
			"padding":"{exp:4,*,padding_scale}px {exp:2,*,padding_scale}px 0px {exp:2,*,padding_scale}px"
		},
		".MPDownloadsContent":{
			"display":"block",
			"width":"100%",
			"text-align":"left",
			"color":"{hex:color_standard} !important",
			"padding":"{exp:2,*,padding_scale}px {exp:4,*,padding_scale}px 0px {exp:4,*,padding_scale}px"
		},
		".MPDownloadsContent div":{
			"color":"{hex:color_standard} !important",
		},
		".MPDownloadsLink, a.MPDownloadsLink, .MPDownloadsLink:visited, a.MPDownloadsLink:visited":{
			"cursor":"pointer",
			"text-decoration":"underline !important",
			"color":"{hex:color_standard} !important",
		},
		".MPDownloadsLink:hover, a.MPDownloadsLink:hover":{
			"color":"{hex:color_special_2} !important"
		},
		".MPDownloadsLink:active, a.MPDownloadsLink:active":{
			"color":"{hex:color_special_2} !important"
		},
		".MPDownloadsContentReady":{
			"padding-top":"{exp:6,*,padding_scale}px",
		},
		".MPAlertContainer":{
			"width":"100%",
			"height":"100%",
			"background":"{rgba:bg_color_lightest,0.75} !important",
			"position":"absolute",
			"left":"0",
			"top":"0",
			"border-radius":"{exp:bg_inner_border_radius,*,border_scale}px",
			"display":"block"
		},
		".MPAlertContentContainer":{
			"position":"relative",
			"top":"50%",
			"text-align":"center",
			"font-size":"{exp:40,*,font_scale}px !important",
			"color":"{hex:color_standard} !important",
			"margin-top":"{exp:-40,*,font_scale}px !important"
		},
		".MPFirstRunContainer":{
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
		".MPFirstRunLabel":{
			"display":"block",
			"text-align":"left",
			"font-weight":"bold",
			"color":"{hex:color_standard} !important",
			"padding":"{exp:4,*,padding_scale}px {exp:2,*,padding_scale}px 0px {exp:2,*,padding_scale}px"
		},
		".MPFirstRunTextContainer":{
			"display":"block",
			"text-align":"left",
			"color":"{hex:color_standard} !important",
			"padding":"{exp:4,*,padding_scale}px {exp:2,*,padding_scale}px 0px {exp:4,*,padding_scale}px"
		},
		".MPFirstRunTextContainer div":{
			"color":"{hex:color_standard} !important",
		},
		".MPFirstRunLink, a.MPFirstRunLink, .MPFirstRunLink:visited, a.MPFirstRunLink:visited":{
			"cursor":"pointer",
			"text-decoration":"underline !important",
			"color":"{hex:color_standard} !important",
		},
		".MPFirstRunLink:hover, a.MPFirstRunLink:hover":{
			"color":"{hex:color_special_2} !important"
		},
		".MPFirstRunLink:active, a.MPFirstRunLink:active":{
			"color":"{hex:color_special_2} !important"
		},
		".MPFirstRunExitLink":{
			"display":"block",
			"text-align":"center",
			"padding":"{exp:4,*,padding_scale}px {exp:2,*,padding_scale}px 0px {exp:2,*,padding_scale}px"
		},
		".MPResizingSizeOff":{
			"width":"{exp:bg_outer_size,*,padding_scale}px",
			"height":"{exp:bg_outer_size,*,padding_scale}px",
		},
		".MPResizingSizeAvailable":{
			"width":"{exp:bg_outer_size,*,padding_scale,*,2}px",
			"height":"{exp:bg_outer_size,*,padding_scale,*,2}px",
		},
		".MPResizingContainerFull":{
			"position":"absolute",
			"left":"-{exp:bg_outer_size,*,padding_scale}px",
			"top":"-{exp:bg_outer_size,*,padding_scale}px",
			"right":"-{exp:bg_outer_size,*,padding_scale}px",
			"bottom":"-{exp:bg_outer_size,*,padding_scale}px",
			"left":"-16px","top":"-16px","right":"-16px","bottom":"-16px",
			"border-radius":"{exp:bg_outer_border_radius,*,border_scale}px",
			"background":"{rgba:bg_outer_color}"
		},
		".MPResizingContainerInner":{
			"position":"relative",
			"width":"100%",
			"height":"100%"
		},
		".MPResizingContainerControl":{
			"overflow":"hidden",
			"position":"absolute"
		},
		".MPResizingContainerTopLeft":{
			"left":"0",
			"width":"16px",
			"top":"0",
			"height":"16px",
			"cursor":"nw-resize"
		},
		".MPResizingContainerTop":{
			"left":"16px",
			"right":"16px",
			"top":"0",
			"height":"16px",
			"cursor":"n-resize"
		},
		".MPResizingContainerTopRight":{
			"right":"0",
			"width":"16px",
			"top":"0",
			"height":"16px",
			"cursor":"ne-resize"
		},
		".MPResizingContainerLeft":{
			"left":"0",
			"width":"16px",
			"top":"16px",
			"bottom":"16px",
			"cursor":"w-resize"
		},
		".MPResizingContainerRight":{
			"right":"0",
			"width":"16px",
			"top":"16px",
			"bottom":"16px",
			"cursor":"e-resize"
		},
		".MPResizingContainerBottomLeft":{
			"left":"0",
			"width":"16px",
			"bottom":"0",
			"height":"16px",
			"cursor":"sw-resize"
		},
		".MPResizingContainerBottom":{
			"left":"16px",
			"right":"16px",
			"bottom":"0",
			"height":"16px",
			"cursor":"s-resize"
		},
		".MPResizingContainerBottomRight":{
			"right":"0",
			"width":"16px",
			"bottom":"0",
			"height":"16px",
			"cursor":"se-resize"
		},
		".MPResizingContainerTextContainerOuter":{
			"position":"relative",
			"width":"100%",
			"height":"100%"
		},
		".MPResizingContainerTextContainerInner":{
			"position":"absolute",
			"left":"0",
			"top":"50%",
			"width":"100%",
			"height":"100%",
			"margin-top":"-{exp:font_size_controls,*,font_scale,/,2}px",
		},
		".MPResizingContainerTextContainer":{
			"width":"100%",
			"height":"100%",
			"text-align":"center",
			"cursor":"inherit"
		},
		".MPResizingContainerText":{
			"font-family":"{controls_font}",
			"font-size":"{exp:font_size_controls,*,font_scale}px",
			"font-weight":"bold",
			"color":"{hex:color_standard}",
			"text-shadow":"{exp:1,*,font_scale}px {exp:1,*,font_scale}px 1px {hex:color_highlight_light}"
		}
	};
}
MediaPlayerCSS.prototype={
	constructor:MediaPlayerCSS,
	create_stylesheet:function(){
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
	},
	parse_out_values:function(value){
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
					if(match2.length>0&&(match2[0]=="\""||match2[0]=="'")){
						indices.push(match2.substr(1,match2.length-2));
					}
					else{
						indices.push(parseInt(match2));
					}
					return"";
				});
				if(values[v].length>0&&(values[v].charCodeAt(0)&0xDF)>="A".charCodeAt(0)&&(values[v].charCodeAt(0)&0xDF)<="Z".charCodeAt(0)){
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
	},
	load_preset:function(preset_name){
		this.preset=preset_name.replace(/[^a-zA-Z_]/g,"").toLowerCase();
		if(!(this.preset in this.css_color_presets)){
			for(var key in this.css_color_presets){
				this.preset=key;
				break;
			}
		}
		if(typeof(this.on_theme_change_callback)=="function")this.on_theme_change_callback(this.on_theme_change_callback_data);
	},
	get_volume_colors:function(){
		return this.css_color_presets[this.preset].volume_colors;
	},
	get_value:function(is_color,name){
		var indices=new Array();
		name=name.replace(/\[.+?\]/g,function(match){
			match=match.substr(1,match.length-2);
			if(match.length>0&&(match[0]=="\""||match[0]=="'")){
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
	},
	create_custom:function(){
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
	},
	modify_value:function(is_color,name,value,component_index){
		if(this.preset!="custom"){
			this.create_custom();
			this.load_preset("custom");
		}
		var indices=new Array();
		name=name.replace(/\[.+?\]/g,function(match){
			match=match.substr(1,match.length-2);
			if(match.length>0&&(match[0]=="\""||match[0]=="'")){
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
	},
	save:function(){
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
	},
	load:function(data){
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
};
function MediaPlayer(css,load_callbacks,drag_callback,settings_callback,destruct_callback,additional_options){
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
	this.drag_callback=drag_callback;
	this.settings_callback=settings_callback;
	this.destruct_callback=destruct_callback;
	this.use_svg=true;
	this.scale_factor=1.0;
	this.ytvideo_player=null;
	this.ytvideo_qualities=["default","small","medium","large","hd720","hd1080","highres"];
	this.ytvideo_quality_index=0;
	this.ytvideo_unsafe=this.is_chrome;
	this.ytvideo_html5=true;
	this.vimeovideo_player=null;
	this.vimeovideo_player_paused=true;
	this.vimeovideo_unsafe=this.is_chrome;
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
	this.playlist_play_on_load=2;
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
	this.playlist_loop=false;
	this.playlist_randomize=false;
	this.playlist_scrollto_onload=true;
	this.playlist_index_timer=null;
	this.current_image_width=0;
	this.current_image_height=0;
	this.current_media=null;
	this.nullify();
	this.additional_options=additional_options;
	for(var i=0;i<this.additional_options.length;++i){
		this.additional_options[i].media_player=this;
	}
	this.batch_download_blob=null;
	this.batch_download_blob_url="";
	this.css=css;
	this.css.on_theme_change_callback=this.update_player_theme_name;
	this.css.on_theme_change_callback_data={media_player:this};
	$("head").append((this.head_css=this.E("style").html(this.css.create_stylesheet())));
}
MediaPlayer.prototype={
	constructor:MediaPlayer,
	destructor:function(){
		if(typeof(this.destruct_callback)=="function")this.destruct_callback(this);
		this.destruct_callback=null;
		this.destroy();
		if(this.head_css!==null)this.head_css.remove();
		this.head_css=null;
	},
	save:function(){
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
	},
	load:function(data){
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
	},
	create:function(){
		if(this.created)this.destroy();
		$(window)
		.on("resize."+this.namespace,{media_player:this},this.on_window_resize);
		$(document)
		.on("mouseup."+this.namespace,{media_player:this},this.on_document_mouseup)
		.on("mousemove."+this.namespace,{media_player:this},this.on_document_mousemove);
		var help_custom_div=null;
		this.title_buttons=new Array();
		this.help_container=[null,null,null];
		this.help_container_inner1=[null,null,null];
		this.help_container_footer=[null,null,null];
		this.player_theme_value_updaters=new Array();
		this.resizing_controls=new Array();
		this.resizing_texts=new Array();
		$("body").append(
			(this.mp_container_main=this.D("MPContainerMain","MPContainerMainBorders"))
			.width(this.player_width*this.scale_factor)
			.css({"right":this.position_offset[0],"bottom":this.position_offset[1]})
			.on("dragover."+this.namespace,{media_player:this},this.on_container_dragover)
			.on("dragenter."+this.namespace,{media_player:this},this.on_container_dragenter)
			.on("dragexit."+this.namespace,{media_player:this},this.on_container_dragexit)
			.on("drop."+this.namespace,{media_player:this},this.on_container_drop)
			.on("mouseover."+this.namespace,{media_player:this},this.on_main_container_mouseover)
			.on("mouseout."+this.namespace,{media_player:this},this.on_main_container_mouseout)
			.append(
				(this.mp_container=this.D("MPContainer"))
				.append(
					(this.resizing_container=this.D("MPResizingContainerFull"))
					.css("display","none")
					.append(
						this.D("MPResizingContainerInner")
						.append(
							(this.resizing_controls[0]=this.D("MPResizingContainerTopLeft","MPResizingContainerControl"))
							.on("mousedown."+this.namespace,{media_player:this,sides:[0,3]},this.on_resizer_mousedown)
							.append(
								(this.resizing_texts[0]=this.D("MPResizingContainerTextContainer","MPResizingContainerText"))
								.html("&#x2196;")
							)
						)
						.append(
							(this.resizing_controls[1]=this.D("MPResizingContainerTop","MPResizingContainerControl"))
							.on("mousedown."+this.namespace,{media_player:this,sides:[0,null]},this.on_resizer_mousedown)
							.append(
								(this.resizing_texts[1]=this.D("MPResizingContainerTextContainer","MPResizingContainerText"))
								.html("&#x2191;")
							)
						)
						.append(
							(this.resizing_controls[2]=this.D("MPResizingContainerTopRight","MPResizingContainerControl"))
							.on("mousedown."+this.namespace,{media_player:this,sides:[0,1]},this.on_resizer_mousedown)
							.append(
								(this.resizing_texts[2]=this.D("MPResizingContainerTextContainer","MPResizingContainerText"))
								.html("&#x2197;")
							)
						)
						.append(
							(this.resizing_controls[3]=this.D("MPResizingContainerLeft","MPResizingContainerControl"))
							.on("mousedown."+this.namespace,{media_player:this,sides:[null,3]},this.on_resizer_mousedown)
							.append(
								this.D("MPResizingContainerTextContainerOuter")
								.append(
									(this.resizing_texts[3]=this.D("MPResizingContainerTextContainerInner","MPResizingContainerTextContainer","MPResizingContainerText"))
									.html("&#x2190;")
								)
							)
						)
						.append(
							(this.resizing_controls[4]=this.D("MPResizingContainerRight","MPResizingContainerControl"))
							.on("mousedown."+this.namespace,{media_player:this,sides:[null,1]},this.on_resizer_mousedown)
							.append(
								this.D("MPResizingContainerTextContainerOuter")
								.append(
									(this.resizing_texts[4]=this.D("MPResizingContainerTextContainerInner","MPResizingContainerTextContainer","MPResizingContainerText"))
									.html("&#x2192;")
								)
							)
						)
						.append(
							(this.resizing_controls[5]=this.D("MPResizingContainerBottomLeft","MPResizingContainerControl"))
							.on("mousedown."+this.namespace,{media_player:this,sides:[2,3]},this.on_resizer_mousedown)
							.append(
								(this.resizing_texts[5]=this.D("MPResizingContainerTextContainer","MPResizingContainerText"))
								.html("&#x2199;")
							)
						)
						.append(
							(this.resizing_controls[6]=this.D("MPResizingContainerBottom","MPResizingContainerControl"))
							.on("mousedown."+this.namespace,{media_player:this,sides:[2,null]},this.on_resizer_mousedown)
							.append(
								(this.resizing_texts[6]=this.D("MPResizingContainerTextContainer","MPResizingContainerText"))
								.html("&#x2193;")
							)
						)
						.append(
							(this.resizing_controls[7]=this.D("MPResizingContainerBottomRight","MPResizingContainerControl"))
							.on("mousedown."+this.namespace,{media_player:this,sides:[2,1]},this.on_resizer_mousedown)
							.append(
								(this.resizing_texts[7]=this.D("MPResizingContainerTextContainer","MPResizingContainerText"))
								.html("&#x2198;")
							)
						)
					)
				)
				.append(
					this.D("MPTitleBarContainer")
					.on("mousedown."+this.namespace,{media_player:this},this.on_titlebar_mousedown)
					.append(
						this.D("MPTitleContainer")
						.append(
							(this.title=this.D("MPTitle"))
							.html(this.title_default)
						)
					)
					.append(
						this.D("MPMainButtonsLeft")
						.append(
							(this.title_buttons[0]=this.E("a","MPMainButtonLeft"))
							.html("[S]")
						)
						.append(
							(this.title_buttons[1]=this.E("a","MPMainButtonGeneric"))
							.html("[D]")
						)
						.append(
							(this.title_buttons[2]=this.E("a","MPMainButtonGeneric"))
							.html("[?]")
						)
					)
					.append(
						this.D("MPMainButtonsRight")
						.append(
							(this.title_buttons[3]=this.E("a","MPMainButtonGeneric"))
							.html("[&#x2012;]")
						)
						.append(
							(this.title_buttons[4]=this.E("a","MPMainButtonRight"))
							.html("[&times;]")
						)
					)
				)
				.append(
					(this.content_container=this.D("MPContentContainer"))
					.append(
						(this.top_container=this.D("MPTopContainer"))
						.append(
							this.D("MPImageContainerMain")
							.append(
								(this.image_container=this.D("MPImageContainer"))
								.height(this.image_height_max*this.scale_factor)
								.append(
									(this.no_image=this.D("MPNoImage"))
									.append(
										this.D("MPNoImageText")
										.html("[no media]")
									)
								)
								.append(
									(this.image=this.E("img","MPImage"))
									.attr("title","")
									.attr("alt","")
									.css("display","none")
									.on("load."+this.namespace,{media_player:this},this.on_image_load)
									.on("mousedown",this.cancel_event)
								)
							)
							.append(
								(this.video_container=this.D("MPVideoContainer"))
							)
							.append(
								(this.video_mask=this.D("MPVideoContainerMask"))
								.on("mousedown",{media_player:this},this.on_image_resize_mousedown)
							)
							.append(
								this.D("MPControlContainer")
								.append(
									(this.playback_control_container=this.D("MPControlContainerInner"))
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
							(this.playlist_index_container=this.D("MPPlaylistIndexContainer"))
							.on("mousedown",this.cancel_event)
							.append(
								this.D("MPPlaylistIndexContainerInner")
								.append(
									(this.playlist_index_text1=this.D("MPPlaylistIndexText1"))
									.html("-")
								)
								.append(
									this.D("MPPlaylistIndexText2")
									.html("/")
								)
								.append(
									(this.playlist_index_text2=this.D("MPPlaylistIndexText3"))
									.html("-")
								)
							)
						)
						.append(
							(this.volume_container=this.D("MPVolumeContainer"))
							.append(
								(this.volume_bar_container=this.D("MPVolumeBarContainer"))
								.on("mousedown."+this.namespace,{media_player:this},this.on_volumebar_mousedown)
								.append(
									(this.volume_bar=this.D("MPVolumeBar"))
								)
							)
							.append(
								this.D("MPVolumeLabelContainer")
								.append(
									(this.D("MPVolumeLabel").html("Vol"))
								)
								.append(
									(this.volume_label=this.D("MPVolumeValue").html("100%"))
								)
							)
						)
					)
					.append(
						this.D("MPSeekContainerTop")
						.append(
							(this.load_percent_bar_container=this.D("MPLoadPercentBarContainer"))
							.on("mousedown."+this.namespace,this.cancel_event)
							.append(
								(this.load_percent_bar_mover=this.D("MPLoadPercentBarMover"))
								.on("mousedown."+this.namespace,this.cancel_event)
							)
							.append(
								(this.load_percent_bar=this.D("MPLoadPercentBar"))
								.on("mousedown."+this.namespace,this.cancel_event)
							)
						)
					)
					.append(
						this.D("MPSeekContainer")
						.append(
							this.D("MPSeekTimeContainer")
							.append(
								(this.seek_time_start_label=this.D("MPSeekTimeLeft"))
								.html("0:00")
							)
							.append(
								(this.seek_time_end_label=this.D("MPSeekTimeRight"))
								.html("0:00")
							)
							.append(
								(this.seek_time_current_label=this.D("MPSeekTime"))
								.html("0:00")
							)
						)
						.append(
							(this.seek_bar_container=this.D("MPSeekBarContainer"))
							.on("mousedown."+this.namespace,{media_player:this},this.on_seekbar_container_mousedown)
							.append(
								(this.seek_bar_mover=this.D("MPSeekBarMover"))
							)
							.append(
								(this.seek_bar=this.D("MPSeekBar"))
								.on("mousedown."+this.namespace,{media_player:this},this.on_seekbar_mousedown)
							)
						)
					)
					.append(
						this.D("MPSeekContainerBottom")
					)
					.append(
						(this.playlist_container=this.D("MPPlaylistContainer"))
						.height(this.playlist_height*this.scale_factor)
						.on("mousedown",this.cancel_event)
					)
					.append(
						(this.help_container[0]=this.D("MPHelpContainer"))
						.css("display","none")
						.append(
							this.D("MPHelpContainerInner0")
							.append(
								(this.help_container_inner1[0]=this.D("MPHelpContainerInner1"))
								.append(
									this.D("MPHelpLabelDiv")
									.html("Playlist Settings")
								)
								.append(
									this.D("MPHelpSectionDiv")
									.append(
										this.D("MPHelpColorInputDiv0")
										.append(
											this.D("MPHelpColorInputDiv2b")
											.append(
												this.D("MPHelpColorLabelText")
												.html("Mode")
											)
										)
									)
									.append(
										this.D("MPHelpColorInputDiv1Full")
										.append(
											this.D("MPHelpColorInputDiv2")
											.append(
												this.E("a","MPHelpModeLink")
												.html(this.playlist_randomize?"Randomize":(this.playlist_loop?"Loop":"Play Once"))
												.on("click."+this.namespace,{media_player:this},this.on_playlist_mode_change)
												.on("mousedown",this.cancel_event)
											)
										)
									)
								)
								.append(
									this.D("MPHelpSectionDiv")
									.append(
										this.D("MPHelpColorInputDiv0")
										.append(
											this.D("MPHelpColorInputDiv2b")
											.append(
												this.D("MPHelpColorLabelText")
												.html("On Load")
											)
										)
									)
									.append(
										this.D("MPHelpColorInputDiv1Full")
										.append(
											this.D("MPHelpColorInputDiv2")
											.append(
												this.E("a","MPHelpModeLink")
												.html(this.playlist_play_on_load_settings[this.playlist_play_on_load])
												.on("click."+this.namespace,{media_player:this},this.on_playlist_onload_change)
												.on("mousedown",this.cancel_event)
											)
										)
									)
								)
								.append(
									this.D("MPHelpSectionDiv")
									.append(
										this.D("MPHelpColorInputDiv0")
										.append(
											this.D("MPHelpColorInputDiv2b")
											.append(
												this.D("MPHelpColorLabelText")
											)
										)
									)
									.append(
										this.D("MPHelpColorInputDiv1Full")
										.append(
											this.D("MPHelpColorInputDiv2")
											.append(
												this.E("a","MPHelpModeLink")
												.html(this.playlist_scrollto_onload?"Scroll to in playlist":"Don't scroll playlist")
												.on("click."+this.namespace,{media_player:this},this.on_playlist_scrollto_change)
												.on("mousedown",this.cancel_event)
											)
										)
									)
								)
								.append(
									this.D("MPHelpSectionDiv")
									.append(
										this.D("MPHelpColorInputDiv0")
										.append(
											this.D("MPHelpColorInputDiv2b")
											.append(
												this.D("MPHelpColorLabelText")
												.html("YT Quality")
											)
										)
									)
									.append(
										this.D("MPHelpColorInputDiv1Full")
										.append(
											this.D("MPHelpColorInputDiv2")
											.append(
												this.E("a","MPHelpModeLink")
												.html(this.ytvideo_qualities[this.ytvideo_quality_index])
												.on("click."+this.namespace,{media_player:this},this.on_ytquality_change)
												.on("mousedown",this.cancel_event)
											)
										)
									)
								)
								.append(
									this.D("MPHelpLabelDiv")
									.html("Player Settings")
								)
								.append(
									(help_custom_div=this.D("MPHelpSectionDiv"))
									.append(
										this.D("MPHelpColorInputDiv0")
										.append(
											this.D("MPHelpColorInputDiv2b")
											.append(
												this.D("MPHelpColorLabelText")
												.html("Theme")
											)
										)
									)
									.append(
										this.D("MPHelpColorInputDiv1Full")
										.append(
											this.D("MPHelpColorInputDiv2")
											.append(
												(this.player_theme_name=this.E("a","MPHelpModeLink"))
												.on("click."+this.namespace,{media_player:this},this.on_player_theme_change)
												.on("mousedown",this.cancel_event)
											)
										)
									)
									.append(
										this.D("MPHelpColorInputDiv0")
										.append(
											this.D("MPHelpColorInputDiv2b")
											.append(
												this.D("MPHelpColorLabelText")
												.html("Player Graphics")
											)
										)
									)
									.append(
										this.D("MPHelpColorInputDiv1Full")
										.append(
											this.D("MPHelpColorInputDiv2")
											.append(
												this.E("a","MPHelpModeLink")
												.on("click."+this.namespace,{media_player:this},this.on_player_use_svg_update)
												.on("mousedown",this.cancel_event)
												.html(this.use_svg?"Allowed":"Disallowed")
											)
										)
									)
								)
								.append(
									this.D("MPHelpLabelDiv")
									.html("Scaling Settings")
								)
								.append(this.generate_value_editor("Padding","padding_scale",this.css.css_size_presets[this.css.preset].padding_scale,false))
								.append(this.generate_value_editor("Text","font_scale",this.css.css_size_presets[this.css.preset].font_scale,false))
								.append(this.generate_value_editor("Borders","border_scale",this.css.css_size_presets[this.css.preset].border_scale,false))
								.append(this.generate_value_editor("Window","@scale_factor",this.scale_factor,false))
							)
							.append(
								(this.help_container_footer[0]=this.D("MPHelpLinkDiv"))
								.append(
									this.D("MPHelpLabelDiv")
									.html("More Settings")
								)
								.append(
									this.D("MPHelpSectionDiv")
									.append(
										this.E("A","MPHelpTextLink")
										.html("Color Settings")
										.on("click."+this.namespace,{media_player:this,help_page:1},this.on_helppage_goto)
									)
									.append(
										this.E("A","MPHelpTextLink")
										.html("Other Settings")
										.on("click."+this.namespace,{media_player:this,help_page:2},this.on_helppage_goto)
									)
								)
							)
						)
					)
					.append(
						(this.help_container[1]=this.D("MPHelpContainer"))
						.css("display","none")
						.append(
							this.D("MPHelpContainerInner0")
							.append(
								(this.help_container_inner1[1]=this.D("MPHelpContainerInner1"))
								.append(this.D("MPHelpLabelDiv").html("Background Colors"))
								.append(this.generate_color_editor("Outline","bg_outer_color",this.css.css_color_presets[this.css.preset].bg_outer_color))
								.append(this.generate_color_editor("Lightest","bg_color_lightest",this.css.css_color_presets[this.css.preset].bg_color_lightest))
								.append(this.generate_color_editor("Light","bg_color_light",this.css.css_color_presets[this.css.preset].bg_color_light))
								.append(this.generate_color_editor("Medium","bg_color_dark",this.css.css_color_presets[this.css.preset].bg_color_dark))
								.append(this.generate_color_editor("Dark","bg_color_darker",this.css.css_color_presets[this.css.preset].bg_color_darker))
								.append(this.generate_color_editor("Darkest","bg_color_darkest",this.css.css_color_presets[this.css.preset].bg_color_darkest))
								.append(this.D("MPHelpLabelDiv").html("Text Colors"))
								.append(this.generate_color_editor("Default","color_standard",this.css.css_color_presets[this.css.preset].color_standard))
								.append(this.generate_color_editor("Disabled","color_disabled",this.css.css_color_presets[this.css.preset].color_disabled))
								.append(this.generate_color_editor("Light","color_light",this.css.css_color_presets[this.css.preset].color_light))
								.append(this.generate_color_editor("Special 1","color_special_1",this.css.css_color_presets[this.css.preset].color_special_1))
								.append(this.generate_color_editor("Special 2","color_special_2",this.css.css_color_presets[this.css.preset].color_special_2))
								.append(this.generate_color_editor("Highlight","color_highlight_light",this.css.css_color_presets[this.css.preset].color_highlight_light))
								.append(this.D("MPHelpLabelDiv").html("Other Colors"))
								.append(this.generate_color_editor("Volume","volume_colors[0]",this.css.css_color_presets[this.css.preset].volume_colors[0]))
							)
						)
					)
					.append(
						(this.help_container[2]=this.D("MPHelpContainer"))
						.css("display","none")
						.append(
							this.D("MPHelpContainerInner0")
							.append(
								(this.help_container_inner1[2]=this.D("MPHelpContainerInner1"))
								.append(this.D("MPHelpLabelDiv").html("Borders"))
								.append(this.generate_value_editor("Outer","bg_outer_size",this.css.css_size_presets[this.css.preset].bg_outer_size,false))
								.append(this.D("MPHelpLabelDiv").html("Border Radii"))
								.append(this.generate_value_editor("Outer","bg_outer_border_radius",this.css.css_size_presets[this.css.preset].bg_outer_border_radius,false))
								.append(this.generate_value_editor("Inner","bg_inner_border_radius",this.css.css_size_presets[this.css.preset].bg_inner_border_radius,false))
								.append(this.generate_value_editor("Major","border_radius_normal",this.css.css_size_presets[this.css.preset].border_radius_normal,false))
								.append(this.generate_value_editor("Minor","border_radius_small",this.css.css_size_presets[this.css.preset].border_radius_small,false))
								.append(this.D("MPHelpLabelDiv").html("Fonts"))
								.append(this.generate_value_editor("Font","main_font",this.css.css_size_presets[this.css.preset].main_font,true))
								.append(this.generate_value_editor("Controls","controls_font",this.css.css_size_presets[this.css.preset].controls_font,true))
								.append(this.D("MPHelpLabelDiv").html("Font Sizes"))
								.append(this.generate_value_editor("Default","font_size",this.css.css_size_presets[this.css.preset].font_size,false))
								.append(this.generate_value_editor("Small","font_size_small",this.css.css_size_presets[this.css.preset].font_size_small,false))
								.append(this.generate_value_editor("Controls","font_size_controls",this.css.css_size_presets[this.css.preset].font_size_controls,false))
							)
						)
					)
					.append(
						(this.downloads_container=this.D("MPDownloadsContainer"))
						.css("display","none")
						.append(
							this.D("MPDownloadsLabel")
							.html("Download Content")
						)
						.append(
							this.D("MPDownloadsContent")
							.append(
								this.D()
								.append(
									this.D()
									.html("Generate download link for:")
								)
								.append(
									this.D()
									.append("- ")
									.append(
										this.E("a","MPDownloadsLink")
										.attr("href","#")
										.html("All loaded sounds")
										.on("click."+this.namespace,{media_player:this,type:"sounds"},this.on_downloads_generate_click)
									)
								)
								.append(
									this.D()
									.append("- ")
									.append(
										this.E("a","MPDownloadsLink")
										.attr("href","#")
										.html("All loaded images")
										.on("click."+this.namespace,{media_player:this,type:"images2"},this.on_downloads_generate_click)
									)
									.append(" (using original filenames)")
								)
								.append(
									this.D()
									.append("- ")
									.append(
										this.E("a","MPDownloadsLink")
										.attr("href","#")
										.html("All loaded images")
										.on("click."+this.namespace,{media_player:this,type:"images"},this.on_downloads_generate_click)
									)
									.append(" (using server filenames)")
								)
							)
							.append(
								(this.downloads_ready_container=this.D("MPDownloadsContentReady"))
								.css("display","none")
								.append("Click ")
								.append(
									(this.downloads_link=this.E("a","MPDownloadsLink"))
									.attr("href","#")
									.html("here")
									.on("click."+this.namespace,{media_player:this},this.on_downloads_link_click)
								)
								.append(
									(this.downloads_about=this.E("span"))
								)
							)
						)
					)
					.append(
						(this.first_run_container=this.D("MPFirstRunContainer"))
						.append(
							this.D("MPFirstRunLabel")
							.html("Info")
						)
						.append(
							this.D("MPFirstRunTextContainer")
							.append(
								"This player can play embedded sound files in images "+
								"as well as Youtube videos. Scroll to the "
							)
							.append(
								this.E("a","MPFirstRunLink")
								.attr("href","#")
								.html("bottom")
							)
							.on("click."+this.namespace,{media_player:this},function(event){
								event.data.media_player.first_run_container.scrollTop(
									(event.data.media_player.first_run_container[0].scrollHeight||0)
									-event.data.media_player.first_run_container.outerHeight()
								);
								return false;
							})
							.append(
								" for a link to exit this page."
							)
						)
						.append(
							this.D("MPFirstRunLabel")
							.html("Player")
						)
						.append(
							this.D("MPFirstRunTextContainer")
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
							this.D("MPFirstRunLabel")
							.html("Playlist")
						)
						.append(
							this.D("MPFirstRunTextContainer")
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
							this.D("MPFirstRunLabel")
							.html("Customization")
						)
						.append(
							this.D("MPFirstRunTextContainer")
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
							this.D("MPFirstRunLabel")
							.html("Broken?")
						)
						.append(
							this.D("MPFirstRunTextContainer")
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
							this.D("MPFirstRunLabel")
							.html("Done")
						)
						.append(
							this.E("a","MPFirstRunExitLink","MPFirstRunLink")
							.attr("href","#")
							.on("click."+this.namespace,{media_player:this},this.on_firstrun_page_exit_click)
							.html("Exit Page")
						)
					)
				)
				.append(
					(this.footer_container=this.D("MPFooterBarContainer"))
				)
				.append(
					(this.alert_container=this.D("MPAlertContainer"))
					.css("display","none")
					.append(
						(this.D("MPAlertContentContainer")
						.html("Drop Files<br />Here"))
					)
					.on("click",{},function(event){
						$(this).css("display","none");
					})
				)
			)
		);
		this.create_playback_controls();
		if(this.additional_options.length>0){
			var section_label_references=[help_custom_div,help_custom_div];
			var section_default="Other Settings";
			var sections={};
			var default_set=false;
			for(var i=0;i<this.additional_options.length;++i){
				var s=("section"in this.additional_options[i]?this.additional_options[i]["section"]:section_default);
				var reference;
				if(!(s in sections)){
					section_label_references[(s==section_default?0:1)].after(
						(reference=this.D("MPHelpLabelDiv"))
						.html(s)
					);
					reference.after(
						(sections[s]=this.D())
					);
					if(s==section_default){
						default_set=true;
						section_label_references[0]=sections[s];
					}
					else{
						section_label_references[1]=sections[s];
						if(!default_set)section_label_references[0]=sections[s];
					}
				}
				reference=sections[s];
				var v_id=0;
				if("values"in this.additional_options[i]&&"current"in this.additional_options[i]){
					for(var j=0;j<this.additional_options[i]["values"].length;++j){
						if(this.additional_options[i]["current"]==this.additional_options[i]["values"][j]){
							v_id=j;
							break;
						}
					}
				}
				var content=null;
				if("descr"in this.additional_options[i]){
					(content=this.E("a","MPHelpModeLink"))
					.html(this.additional_options[i]["descr"][v_id])
					.on("click."+this.namespace,{media_player:this,custom_data:this.additional_options[i]},this.on_custom_option_click)
					.on("mousedown",this.cancel_event);
				}
				else if("html"in this.additional_options[i]){
					content=this.D("MPHelpModeNonLink").html(this.additional_options[i]["html"]);
				}
				reference.append(
					(sections[s]=this.D("MPHelpSectionDiv"))
					.append(
						this.D("MPHelpColorInputDiv0")
						.append(
							this.D("MPHelpColorInputDiv2b")
							.append(
								this.D("MPHelpColorLabelText")
								.html(this.additional_options[i]["label"])
							)
						)
					)
					.append(
						this.D("MPHelpColorInputDiv1Full")
						.append(
							this.D("MPHelpColorInputDiv2")
							.append(content)
						)
					)
				);
			}
		}
		if(!this.first_run){
			this.first_run_container.css("display","none");
		}
		for(var i=0;i<this.title_buttons.length;++i){
			this.title_buttons[i].on("mousedown",this.cancel_event);
			this.title_buttons[i].on("click."+this.namespace,{media_player:this,control_id:i},this.on_main_control_click);
		}
		for(var i=0;i<this.resizing_texts.length;++i){
			this.resizing_texts[i].css("display","none");
		}
		this.update_player_theme_name({media_player:this});
		this.set_volume(this.volume);
		this.audio[0].volume=this.volume;
		this.reposition();
		this.created=true;
	},
	destroy:function(){
		while(this.playlist.length>0){
			this.remove(0);
		}
		if(this.mp_container_main!=null)this.mp_container_main.remove();
		$(window)
		.off("resize."+this.namespace);
		$(document)
		.off("mouseup."+this.namespace)
		.off("mousemove."+this.namespace);
		this.nullify();
		this.created=false;
	},
	focus:function(){
		var open=false;
		this.playlist_container.css("display",(open?"none":""));
		this.top_container.css("display",(open?"none":""));
		this.downloads_container.css("display","none");
		for(var i=0;i<this.help_container.length;++i){
			this.help_container[i].css("display","none");
		}
		this.reposition();
	},
	play:function(){
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
			else if(this.current_media.type=="vimeo-video"){
				if(this.vimeovideo_player!=null){
					if(this.vimeovideo_unsafe){
						_unsafe_exec(function(data){
							data.media_player.vimeovideo_player.api_call("play");
						},{media_player:this});
					}
					else{
						try{
							this.vimeovideo_player.api_call("play");
						}
						catch(e){}
					}
				}
			}
			else{
				console.log(this.current_media.type);
			}
		}
		this.update_playing_status();
	},
	pause:function(){
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
			else if(this.current_media.type=="vimeo-video"){
				if(this.vimeovideo_player!=null){
					if(this.vimeovideo_unsafe){
						_unsafe_exec(function(data){
							data.media_player.vimeovideo_player.api_call("pause");
						},{media_player:this});
					}
					else{
						try{
							this.vimeovideo_player.api_call("pause");
						}
						catch(e){}
					}
				}
			}
			else{
				console.log(this.current_media.type);
			}
		}
		this.update_playing_status();
	},
	is_paused:function(){
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
			else if(this.current_media.type=="vimeo-video"){
				if(this.vimeovideo_player!=null){
					if(this.vimeovideo_unsafe){
						_unsafe_exec(function(data){
							data.media_player.vimeovideo_player.api_call("paused",function(value){
								data.media_player.vimeovideo_player_paused=value;
							});
						},{media_player:this});
					}
					else{
						var self=this;
						try{
							this.vimeovideo_player.api_call("paused",function(value){
								self.vimeovideo_player_paused=value;
							});
						}
						catch(e){}
					}
					return this.vimeovideo_player_paused;
				}
			}
			else{
				console.log(this.current_media.type);
			}
		}
		return true;
	},
	get_position:function(seconds){
		if(this.current_media!==null){
			return this.current_media.position;
		}
		return 0.0;
	},
	seek_to:function(seconds,dont_seek_in_media,dragging){
		if(this.current_media!==null){
			if(seconds!==null){
				if(seconds<0.0)seconds=0.0;
				else if(seconds>this.current_media.duration)seconds=this.current_media.duration;
				this.current_media.position=seconds;
			}
			if(this.current_media.duration!=0.0){
				this.seek_time_current_label.html(this.duration_to_string(this.current_media.position));
				this.seek_bar_mover.width((this.current_media.position/this.current_media.duration)*(this.seek_bar_container.outerWidth()-this.seek_bar.outerWidth()));
			}
			if(!dont_seek_in_media){
				if(this.current_media.type=="image-audio"){
					if(seconds!==null){
						if(seconds<0.0)seconds=0.0;
						else if(seconds>this.current_media.duration)seconds=this.current_media.duration;
						this.current_media.position=seconds;
					}
					this.audio[0].currentTime=this.current_media.position;
				}
				else if(this.current_media.type=="youtube-video"){
					if(this.ytvideo_player!=null){
						if(this.ytvideo_unsafe){
							_unsafe_exec(function(data){
								if(data.media_player.ytvideo_player.seekTo)data.media_player.ytvideo_player.seekTo(data.media_player.current_media.position,data.arg2);
							},{media_player:this,arg2:(dragging?false:true)});
						}
						else{
							if(this.ytvideo_player.seekTo)this.ytvideo_player.seekTo(this.current_media.position,dragging?false:true);
						}
					}
				}
				else if(this.current_media.type=="vimeo-video"){
					if(this.vimeovideo_player!=null){
						if(this.vimeovideo_unsafe){
							_unsafe_exec(function(data){
								data.media_player.vimeovideo_player.api_call("seekTo",data.media_player.current_media.position);
							},{media_player:this});
						}
						else{
							try{
								this.vimeovideo_player.api_call("seekTo",this.current_media.position);
							}
							catch(e){}
						}
					}
				}
				else{
					console.log(this.current_media.type);
				}
			}
		}
	},
	get_volume:function(){
		return this.volume;
	},
	set_volume:function(volume){
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
			else if(this.current_media.type=="vimeo-video"){
				if(this.vimeovideo_player!=null){
					if(this.vimeovideo_unsafe){
						_unsafe_exec(function(data){
							data.media_player.vimeovideo_player.api_call("setVolume",data.media_player.volume);
						},{media_player:this});
					}
					else{
						try{
							this.vimeovideo_player.api_call("setVolume",this.volume);
						}
						catch(e){}
					}
				}
			}
			else{
				console.log(this.current_media.type);
			}
		}
	},
	get_duration:function(duration){
		if(this.current_media!==null){
			return this.current_media.duration;
		}
		return 0.0;
	},
	set_duration:function(duration){
		var length_str=this.duration_to_string(duration);
		if(this.current_media!==null){
			this.current_media.duration=duration;
			this.current_media.info_container.html(length_str);
		}
		this.seek_time_end_label.html(length_str);
	},
	deselect:function(old_type){
		if(this.current_media!==null){
			this.unC(this.current_media.playlist_item,"MPPlaylistItemActive");
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
					this.ytvideo_player=null;
					this.video_container.html("");
				}
				else if(this.current_media.type=="vimeo-video"){
					this.vimeovideo_player.destructor();
					this.vimeovideo_player=null;
					this.vimeovideo_player_paused=true;
					this.video_container.html("");
				}
				else{
					console.log(this.current_media.type);
				}
				for(var i=0;i<this.playback_controls.length;++i){
					for(var j=0;j<this.playback_controls[i].length;++j){
						this.C(this.playback_controls[i][j],"MPControlLinkDisabled");
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
	},
	stop:function(){
		if(this.current_media!==null){
			if(!this.is_paused())this.pause();
			this.seek_to(0.0);
			this.update_playing_status();
		}
	},
	start:function(index){
		this.deselect(this.playlist[index].type);
		for(var i=0;i<this.playback_controls.length;++i){
			for(var j=0;j<this.playback_controls[i].length;++j){
				this.unC(this.playback_controls[i][j],"MPControlLinkDisabled");
			}
		}
		this.current_media=this.playlist[index];
		this.C(this.current_media.playlist_item,"MPPlaylistItemActive");
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
		else if(this.current_media.type=="vimeo-video"){
			this.title.html(this.current_media.title);
			if(this.vimeovideo_player!==null){
				this.vimeovideo_player.destructor();
				this.vimeovideo_player=null;
			}
			if(this.vimeovideo_player==null){
				this.vimeovideo_player_paused=true;
				var fn=function(data){
					var events={
						"ready":function(){data.self.set_volume(data.self.get_volume());},
						"loadProgress":function(event){data.self.on_vimeovideo_load_progress(event,data.self.vimeovideo_player);},
						"playProgress":function(event){data.self.on_vimeovideo_play_progress(event,data.self.vimeovideo_player);},
						"play":function(event){data.self.on_vimeovideo_play({},data.self.vimeovideo_player);},
						"pause":function(event){data.self.on_vimeovideo_pause({},data.self.vimeovideo_player);},
						"finish":function(event){data.self.on_vimeovideo_finish({},data.self.vimeovideo_player);},
						"seek":function(event){data.self.on_vimeovideo_seek(event,data.self.vimeovideo_player);}
					};
					var iframe;
					data.self.video_container.html(
						(iframe=data.self.E("iframe"))
						.attr("frameborder","0")
						.attr("width",data.size[0])
						.attr("height",data.size[1])
						.attr("src",
							"//player.vimeo.com/video/"+(data.self.current_media.vid_id)+"?api=1"+
							"&title=0&byline=0&portrait=0&autoplay=1"+(data.self.current_media.start==0?"":"&t="+data.self.current_media.start)
						)
					);
					data.self.vimeovideo_player=new data.VimeoManager(iframe[0]);
					for(var e in events){
						data.self.vimeovideo_player.add_event(e,events[e]);
					}
				};
				var params={
					size:[this.video_container.outerWidth(),this.video_container.outerHeight()],
					self:this,
					"VimeoManager":VimeoManager
				}
				if(this.vimeovideo_unsafe){
					try{
						_unsafe_exec(fn,params);
					}
					catch(e){
						console.log("vimeovideo_unsafe");
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
	},
	scroll_to:function(index){
		var a,b;
		if(
			(a=this.playlist[index].playlist_item.offset().top)<(b=this.playlist_container.offset().top)||
			(a=this.playlist[index].playlist_item.offset().top+this.playlist[index].playlist_item.outerHeight())>(b=this.playlist_container.offset().top+this.playlist_container.outerHeight())
		){
			this.playlist_container.scrollTop(this.playlist_container.scrollTop()+(a-b));
		}
	},
	next:function(follow_policy){
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
	},
	previous:function(){
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
	},
	set_loaded:function(offset,percent){
		if(this.current_media!==null){
			if(offset!==undefined){
				if(offset<0.0)offset=0.0;
				else if(offset>1.0)offset=1.0;
				this.current_media.loaded_offset=offset;
				if(percent===undefined)percent=this.get_loaded_percent();
			}
			else{
				offset=this.get_loaded_offset();
			}
			if(percent!==undefined){
				if(percent<0.0)percent=0.0;
				else if(percent>1.0-offset)percent=1.0-offset;
				this.current_media.loaded_percent=percent;
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
	},
	get_loaded_offset:function(){
		if(this.current_media!==null){
			return this.current_media.loaded_offset;
		}
		return 0.0;
	},
	get_loaded_percent:function(){
		if(this.current_media!==null){
			return this.current_media.loaded_percent;
		}
		return 0.0;
	},
	remove:function(index){
		if(this.current_media!=null&&this.current_media.index==index)this.deselect();
		if(this.playlist[index].type=="image-audio"){
			if(this.playlist[index].temp_audio){
				this.playlist[index].temp_audio[0].pause();
				this.playlist[index].temp_audio.removeAttr("src").remove();
				this.playlist[index].temp_audio=null;
			}
			(window.webkitURL||window.URL).revokeObjectURL(this.playlist[index].audio_blob_url);
			if(this.playlist[index].image_blob_url!=null){
				(window.webkitURL||window.URL).revokeObjectURL(this.playlist[index].image_blob_url);
			}
		}
		else if(this.playlist[index].type=="youtube-video"||this.playlist[index].type=="vimeo-video"){
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
	},
	is_maximized:function(){
		return(this.playlist_container.css("display")!="none");
	},
	maximize:function(){
		this.playlist_container.css("display","");
		this.top_container.css("display","");
		this.downloads_container.css("display","none");
		for(var i=0;i<this.help_container.length;++i){
			this.help_container[i].css("display","none");
		}
		this.title_buttons[this.title_buttons.length-2].html("[&#x2012;]");
		this.reposition();
	},
	minimize:function(){
		this.playlist_container.css("display","none");
		this.top_container.css("display","none");
		this.downloads_container.css("display","none");
		for(var i=0;i<this.help_container.length;++i){
			this.help_container[i].css("display","none");
		}
		this.title_buttons[this.title_buttons.length-2].html("[+]");
		this.reposition();
	},
	nullify:function(){
		this.mp_container_main=null;
		this.mp_container=null;
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
		this.help_container_inner1=null;
		this.help_container_footer=null;
		this.content_container=null;
		this.top_container=null;
		this.footer_container=null;
		this.playback_control_container=null;
		this.player_theme_name=null;
		this.video_container=null;
		this.video_mask=null;
		this.ytvideo_player=null;
		if(this.vimeovideo_player!==null){
			this.vimeovideo_player.destructor();
			this.vimeovideo_player=null;
		}
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
		this.downloads_container=null;
		this.downloads_ready_container=null;
		this.downloads_link=null;
		this.downloads_about=null;
		this.title_buttons=null;
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
	},
	create_playback_controls:function(){
		this.playback_control_container.html("");
		this.playback_controls=[[null],[null],[null,null],[null],[null]];
		this.playback_controls_svg=null;
		if(this.use_svg){
			this.playback_controls_svg=[[null],[null],[null,null],[null],[null]]
			for(var i=0;i<this.playback_controls.length;++i){
				if(i>0)this.playback_control_container.append(this.D("MPControlLinkSeparator"));
				for(var j=0;j<this.playback_controls[i].length;++j){
					this.playback_control_container.append(
						(this.playback_controls[i][j]=this.D("MPControlLinkSvgContainer","MPControlLinkDisabled"))
					);
					if(j>0)this.playback_controls[i][j].css("display","none");
					var svg_finder;
					this.playback_controls[i][j].append((svg_finder=this.D("MPControlLinkSvg")));
					var w=svg_finder.outerWidth();
					var h=svg_finder.outerHeight();
					svg_finder.svg();
					this.playback_controls_svg[i][j]=svg_finder.svg("get");
					var html_svg=$(svg_finder.contents()[0]);
					html_svg.attr("width",w);
					html_svg.attr("height",h);
					var g=this.playback_controls_svg[i][j].group({
						"class":"MPControlLinkSvgMainGroup",
						"transform":"scale("+w+","+h+")"
					});
					if(i==0){
						this.playback_controls_svg[i][j].rect(g,
							0.125,0.0,0.25,1.0,
							{"class":"MPControlLinkSvgShapeColor"}
						);
						this.playback_controls_svg[i][j].polygon(g,
							[[0.875,0.0],[0.875,1.0],[0.375,0.5]],
							{"class":"MPControlLinkSvgShapeColor"}
						);
					}
					else if(i==1){
						this.playback_controls_svg[i][j].polygon(g,
							[[0.5,0.0],[0.5,1.0],[0.125,0.5]],
							{"class":"MPControlLinkSvgShapeColor"}
						);
						this.playback_controls_svg[i][j].polygon(g,
							[[0.875,0.0],[0.875,1.0],[0.5,0.5]],
							{"class":"MPControlLinkSvgShapeColor"}
						);
					}
					else if(i==2){
						if(j==1){
							this.playback_controls_svg[i][j].rect(g,
								0.125,0.0,0.25,1.0,
								{"class":"MPControlLinkSvgShapeColor"}
							);
							this.playback_controls_svg[i][j].rect(g,
								0.625,0.0,0.25,1.0,
								{"class":"MPControlLinkSvgShapeColor"}
							);
						}
						else{
							this.playback_controls_svg[i][j].polygon(g,
								[[0.25,0.0],[0.25,1.0],[0.75,0.5]],
								{"class":"MPControlLinkSvgShapeColor"}
							);
						}
					}
					else if(i==3){
						this.playback_controls_svg[i][j].polygon(g,
							[[0.125,0.0],[0.125,1.0],[0.5,0.5]],
							{"class":"MPControlLinkSvgShapeColor"}
						);
						this.playback_controls_svg[i][j].polygon(g,
							[[0.5,0.0],[0.5,1.0],[0.875,0.5]],
							{"class":"MPControlLinkSvgShapeColor"}
						);
					}
					else{
						this.playback_controls_svg[i][j].rect(g,
							0.625,0.0,0.25,1.0,
							{"class":"MPControlLinkSvgShapeColor"}
						);
						this.playback_controls_svg[i][j].polygon(g,
							[[0.125,0.0],[0.125,1.0],[0.625,0.5]],
							{"class":"MPControlLinkSvgShapeColor"}
						);
					}
				}
			}
		}
		else{
			this.playback_controls_svg=null;
			var control_texts=[["|&lt;"],["&lt;&lt"],["&gt;","||"],["&gt;&gt;"],["&gt;|"]];
			for(var i=0;i<this.playback_controls.length;++i){
				if(i>0)this.playback_control_container.append(this.D("MPControlLinkSeparator"));
				for(var j=0;j<this.playback_controls[i].length;++j){
					this.playback_control_container.append(
						(this.playback_controls[i][j]=this.E("a","MPControlLink","MPControlLinkDisabled"))
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
	},
	get_audio_duration:function(audio){
		try{
			var d=(isFinite(audio.duration)?audio.duration:audio.buffered.end(0));
			return isFinite(d)?d:0;
		}
		catch(e){
			console.log(e);
		}
		return 0;
	},
	regen_stylesheet:function(){
		this.head_css.html(this.css.create_stylesheet());
		var vol_col=this.get_volume_color(this.volume);
		this.volume_bar.css("background","rgb("+vol_col[0]+","+vol_col[1]+","+vol_col[2]+")");
	},
	update_index_display:function(index,count,activate){
		this.playlist_index_text1.html(count==0?"-":(index>=0?(index+1).toString():"-"));
		this.playlist_index_text2.html(count==0?"-":count.toString());
		if(!activate)return;
		this.playlist_index_container.addClass("MPPlaylistIndexContainerActive");
		if(this.playlist_index_timer!==null){
			clearTimeout(this.playlist_index_timer);
			this.playlist_index_timer=null;
		}
		var self=this;
		this.playlist_index_timer=setTimeout(function(){
			self.playlist_index_timer=null;
			self.playlist_index_container.removeClass("MPPlaylistIndexContainerActive");
		},1000);
	},
	get_volume_color:function(percent){
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
	},
	reposition:function(left,top){
		if(left!=undefined){
			this.position_offset[0]=$(window).outerWidth()-(left+this.mp_container_main.outerWidth());
		}
		if(top!=undefined){
			this.position_offset[1]=$(window).outerHeight()-(top+this.mp_container_main.outerHeight());
		}
		var v;
		if(this.position_offset[0]>(v=$(window).outerWidth()-this.mp_container_main.outerWidth()))this.position_offset[0]=v;
		if(this.position_offset[1]>(v=$(window).outerHeight()-this.mp_container_main.outerHeight()))this.position_offset[1]=v;
		if(this.position_offset[0]<0)this.position_offset[0]=0;
		if(this.position_offset[1]<0)this.position_offset[1]=0;
		this.mp_container_main.css({"right":this.position_offset[0],"bottom":this.position_offset[1]});
	},
	resize_to:function(width,height,is_left,is_top){
		var current_size=[this.mp_container_main.outerWidth(),this.mp_container_main.outerHeight()];
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
			this.mp_container_main.outerWidth(width);
			if(!is_left){
				this.position_offset[0]-=(width-current_size[0]);
			}
		}
		this.mp_container_main.css({"right":this.position_offset[0],"bottom":this.position_offset[1]});
		this.update_image_scale();
		this.set_loaded();
		this.seek_to(null,true);
	},
	update_playing_status:function(){
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
	},
	update_scale_factor:function(scale_factor){
		this.scale_factor=scale_factor;
		this.mp_container_main.outerWidth(this.player_width*this.scale_factor);
		this.playlist_container.outerHeight(this.playlist_height*this.scale_factor);
		this.image_container.outerHeight(this.image_height*this.scale_factor);
		this.update_image_scale();
	},
	update_image_scale:function(){
		var xs=(this.image_container.outerWidth()/this.current_image_width);
		var ys=(this.image_height*this.scale_factor/this.current_image_height);
		if(ys<xs)xs=ys;
		ys=Math.floor(this.current_image_height*xs);
		xs=Math.floor(this.current_image_width*xs);
		this.image.width(xs);
		this.image.height(ys);
		if(this.ytvideo_player!=null&&this.ytvideo_player.setSize){
			this.ytvideo_player.setSize(this.video_container.outerWidth(),this.video_container.outerHeight());
		}
		else if(this.vimeovideo_player!=null){
			this.vimeovideo_player.iframe
			.attr("width",this.video_container.outerWidth())
			.attr("height",this.video_container.outerHeight());
		}
	},
	resize_image_container:function(height){
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
	},
	update_player_theme_name:function(data){
		data.media_player.player_theme_name.html(data.media_player.css.css_color_presets[data.media_player.css.preset]["@name"]||data.media_player.css.preset);
	},
	E:function(elem){
		var e=$(document.createElement(elem));
		for(var i=1;i<arguments.length;++i)this.C(e,arguments[i]);
		return e;
	},
	D:function(){
		var e=$(document.createElement("div"));
		for(var i=0;i<arguments.length;++i)this.C(e,arguments[i]);
		return e;
	},
	C:function(elem,cls){
		elem.addClass(cls+this.css.css_suffix);
	},
	unC:function(elem,cls){
		elem.removeClass(cls+this.css.css_suffix);
	},
	text_to_html:function(str){
		return str.replace(/&/g,"&amp;")
			.replace(/>/g,"&gt;")
			.replace(/</g,"&lt;")
			.replace(/"/g,"&quot;");
	},
	duration_to_string:function(position){
		var seconds_in=Math.round(position);
		var minutes_in=Math.floor(seconds_in/60);
		var hours_in=Math.floor(minutes_in/60);
		seconds_in=Math.floor(seconds_in-minutes_in*60);
		minutes_in=Math.floor(minutes_in-hours_in*60);
		var s=(hours_in>0?hours_in+":":"")+
			(hours_in>0?(minutes_in>=10?minutes_in:"0"+minutes_in):minutes_in)+
			":"+(seconds_in>=10?seconds_in:"0"+seconds_in);
		return s;
	},
	youtube_time_to_number:function(str){
		var time=0;
		while(str.length>0){
			var match=/([0-9]+)([smh]|$)/.exec(str);
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
	},
	string_to_uint8array:function(str){
		var array=new Uint8Array(new ArrayBuffer(str.length));
		for(var i=0;i<str.length;++i){
			array[i]=str.charCodeAt(i);
		}
		return array;
	},
	arraybuffer_to_uint8array:function(buffer){
		return new Uint8Array(buffer);
	},
	generate_color_editor:function(label,identifier,value){
		var color_edit;
		var help_input=[null,null,null,null];
		var e=this.D("MPHelpSectionDiv")
			.append(
				this.D("MPHelpColorInputDiv0")
				.append(
					this.D("MPHelpColorInputDiv2b")
					.append(
						(color_edit=this.D("MPHelpColorLabelDisplay"))
					)
					.append(
						this.D("MPHelpColorLabelText")
						.html(label)
					)
				)
			)
			.append(
				this.D("MPHelpColorInputDiv1")
				.append(
					this.D("MPHelpColorInputDiv2")
					.attr("title","Red : [0,255]")
					.append(
						this.D("MPHelpColorInputDiv3")
						.append(
							(help_input[0]=this.E("input","MPHelpColorInput"))
							.attr("type","text")
						)
					)
				)
			)
			.append(
				this.D("MPHelpColorInputDiv1")
				.append(
					this.D("MPHelpColorInputDiv2")
					.attr("title","Green : [0,255]")
					.append(
						this.D("MPHelpColorInputDiv3")
						.append(
							(help_input[1]=this.E("input","MPHelpColorInput"))
							.attr("type","text")
						)
					)
				)
			)
			.append(
				this.D("MPHelpColorInputDiv1")
				.append(
					this.D("MPHelpColorInputDiv2")
					.attr("title","Blue : [0,255]")
					.append(
						this.D("MPHelpColorInputDiv3")
						.append(
							(help_input[2]=this.E("input","MPHelpColorInput"))
							.attr("type","text")
						)
					)
				)
			)
			.append(
				this.D("MPHelpColorInputDiv1")
				.append(
					this.D("MPHelpColorInputDiv2")
					.attr("title","Alpha : [0.0,1.0]")
					.append(
						this.D("MPHelpColorInputDiv3")
						.append(
							(help_input[3]=this.E("input","MPHelpColorInput"))
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
	},
	generate_value_editor:function(label,identifier,value,is_string){
		var help_input;
		var e=this.D("MPHelpSectionDiv")
			.append(
				this.D("MPHelpColorInputDiv0")
				.append(
					this.D("MPHelpColorInputDiv2b")
					.append(
						this.D("MPHelpColorLabelText")
						.html(label)
					)
				)
			)
			.append(
				this.D("MPHelpColorInputDiv1Full")
				.append(
					this.D("MPHelpColorInputDiv2")
					.append(
						this.D("MPHelpColorInputDiv3")
						.append(
							(help_input=this.E("input","MPHelpColorInput"))
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
	},
	update_value_fields:function(){
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
	},
	xml_find_nodes_by_name:function(xml,name){
		var nodes=[],n2;
		for(var n=0;n<xml.childNodes.length;++n){
			if(xml.childNodes[n].nodeName!="#text"){
				if(xml.childNodes[n].nodeName==name)nodes.push(xml.childNodes[n]);
				n2=this.xml_find_nodes_by_name(xml.childNodes[n],name);
				if(n2.length>0)nodes=nodes.concat(n2);
			}
		}
		return nodes;
	},
	ajax_get:function(url,return_as_string,callback_data,progress_callback,done_callback){
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
	},
	add_to_playlist:function(title,tag,flagged,url,sound_index,raw_data,image_src,playlist_data){
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
			"loaded_percent":1.0,
			"image_url":null,
			"image_blob":null,
			"image_blob_url":null,
			"image_name":((playlist_data?playlist_data.image_name:null)||url.split("/").pop()),
			"audio_blob":null,
			"audio_blob_url":null,
		};
		playlist_item.audio_blob=new Blob([raw_data],{type:"audio/ogg"});
		playlist_item.audio_blob_url=(window.webkitURL||window.URL).createObjectURL(playlist_item.audio_blob);
		if(typeof(image_src)==typeof("")){
			playlist_item.image_url=image_src;
			playlist_item.image_blob=null;
			playlist_item.image_blob_url=null;
		}
		else{
			var ext=url.split(".").pop().toLowerCase();
			var mime="image/jpeg"
			if(ext=="png")mime="image/png";
			else if(ext=="gif")mime="image/gif";
			playlist_item.image_blob=new Blob([image_src],{type:mime});
			playlist_item.image_blob_url=(window.webkitURL||window.URL).createObjectURL(playlist_item.image_blob);
			playlist_item.image_url=playlist_item.image_blob_url;
		}
		this.playlist_container.append(
			(playlist_item.playlist_item=this.D("MPPlaylistItem"))
			.on("click."+this.namespace,{media_player:this,playlist_item:playlist_item},this.on_playlist_item_click)
			.on("mousedown",this.cancel_event)
			.attr("title",tag!=MediaPlayer.ALL_SOUNDS?tag:"")
			.append(
				this.D("MPPlaylistSoundName")
				.text(playlist_item.title)
			)
			.append(
				(playlist_item.info_container=this.D("MPPlaylistItemInfo"))
				.html(this.duration_to_string(playlist_item.duration))
			)
			.append(
				this.D("MPPlaylistControlsContainer")
				.on("mousedown",this.cancel_event)
				.append(
					this.D("MPPlaylistControls")
					.on("click",this.cancel_event)
					.append(
						(playlist_item.controls[0]=this.E("a","MPPlaylistControlLink"))
						.html("&times;")
						.attr("title","Delete")
					)
					.append(
						this.D("MPPlaylistControlLinkSeparator")
					)
					.append(
						(playlist_item.controls[1]=this.E("a","MPPlaylistControlLink"))
						.html("&uarr;")
						.attr("title","Move up")
					)
					.append(
						this.D("MPPlaylistControlLinkSeparator")
					)
					.append(
						(playlist_item.controls[2]=this.E("a","MPPlaylistControlLink"))
						.html("&darr;")
						.attr("title","Move down")
					)
					.append(
						this.D("MPPlaylistControlLinkSeparator")
					)
					.append(
						(playlist_item.controls[3]=this.E("a","MPPlaylistControlLink"))
						.html("S")
						.attr("title","Save...")
						.attr("href",playlist_item.audio_blob_url)
					)
					.append(
						this.D("MPPlaylistControlLinkSeparator")
					)
					.append(
						(playlist_item.controls[4]=this.E("a","MPPlaylistControlLink"))
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
	},
	add_to_playlist_ytvideo:function(original_url,vid_id,tag,flagged,info_xml,playlist_data){
		var cache_key="youtubevideo_cache";
		var title="Unknown Title";
		var duration=0.0;
		if(cache_key in playlist_data){
			if("title"in playlist_data[cache_key])title=playlist_data[cache_key]["title"];
			if("duration"in playlist_data[cache_key])duration=playlist_data[cache_key]["duration"];
			delete playlist_data[cache_key];
		}
		else{
			var d=this.xml_find_nodes_by_name(info_xml,"yt:duration");
			if(d.length>0){
				duration=d[0].getAttribute("seconds");
				duration=parseFloat(duration);
				duration=(isFinite(duration)?duration:0.0);
			}
			try{
				title=this.text_to_html($(this.xml_find_nodes_by_name(info_xml,"title")).text());
			}
			catch(e){
				console.log(e);
			}
		}
		var start=/[\!\#\?\&]t=[0-9smh]+/.exec(original_url);
		if(start!=null){
			start=this.youtube_time_to_number(start[0].substr(3,start[0].length-3));
		}
		else{
			start=0.0;
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
			(playlist_item.playlist_item=this.D("MPPlaylistItem"))
			.on("click."+this.namespace,{media_player:this,playlist_item:playlist_item},this.on_playlist_item_click)
			.on("mousedown",this.cancel_event)
			.append(
				this.D("MPPlaylistSoundName")
				.html(playlist_item.title)
			)
			.append(
				(playlist_item.info_container=this.D("MPPlaylistItemInfo"))
				.html(this.duration_to_string(playlist_item.duration))
			)
			.append(
				this.D("MPPlaylistControlsContainer")
				.on("mousedown",this.cancel_event)
				.append(
					this.D("MPPlaylistControls")
					.on("click",this.cancel_event)
					.append(
						(playlist_item.controls[0]=this.E("a","MPPlaylistControlLink"))
						.html("&times;")
						.attr("title","Delete")
					)
					.append(
						this.D("MPPlaylistControlLinkSeparator")
					)
					.append(
						(playlist_item.controls[1]=this.E("a","MPPlaylistControlLink"))
						.html("&uarr;")
						.attr("title","Move up")
					)
					.append(
						this.D("MPPlaylistControlLinkSeparator")
					)
					.append(
						(playlist_item.controls[2]=this.E("a","MPPlaylistControlLink"))
						.html("&darr;")
						.attr("title","Move down")
					)
					.append(
						this.D("MPPlaylistControlLinkSeparator")
					)
					.append(
						(playlist_item.controls[3]=this.E("a","MPPlaylistControlLink"))
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
	},
	add_to_playlist_vimeovideo:function(original_url,vid_id,tag,flagged,info_xml,playlist_data){
		var cache_key="vimeovideo_cache";
		var title="Unknown Title";
		var duration=0.0;
		if(cache_key in playlist_data){
			if("title"in playlist_data[cache_key])title=playlist_data[cache_key]["title"];
			if("duration"in playlist_data[cache_key])duration=playlist_data[cache_key]["duration"];
			delete playlist_data[cache_key];
		}
		else{
			var d=this.xml_find_nodes_by_name(info_xml,"duration");
			if(d.length>0){
				duration=$(d[0]).text();
				duration=parseFloat(duration);
				duration=isFinite(duration)?duration:0.0;
			}
			try{
				title=this.text_to_html($(this.xml_find_nodes_by_name(info_xml,"title")).text());
			}
			catch(e){
				console.log(e);
			}
		}
		var start=/[\!\#\?\&]t=[0-9smh]+/.exec(original_url);
		if(start!=null){
			start=this.youtube_time_to_number(start[0].substr(3,start[0].length-3));
		}
		else{
			start=0.0;
		}
		var playlist_item={
			"type":"vimeo-video",
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
			(playlist_item.playlist_item=this.D("MPPlaylistItem"))
			.on("click."+this.namespace,{media_player:this,playlist_item:playlist_item},this.on_playlist_item_click)
			.on("mousedown",this.cancel_event)
			.append(
				this.D("MPPlaylistSoundName")
				.html(playlist_item.title)
			)
			.append(
				(playlist_item.info_container=this.D("MPPlaylistItemInfo"))
				.html(this.duration_to_string(playlist_item.duration))
			)
			.append(
				this.D("MPPlaylistControlsContainer")
				.on("mousedown",this.cancel_event)
				.append(
					this.D("MPPlaylistControls")
					.on("click",this.cancel_event)
					.append(
						(playlist_item.controls[0]=this.E("a","MPPlaylistControlLink"))
						.html("&times;")
						.attr("title","Delete")
					)
					.append(
						this.D("MPPlaylistControlLinkSeparator")
					)
					.append(
						(playlist_item.controls[1]=this.E("a","MPPlaylistControlLink"))
						.html("&uarr;")
						.attr("title","Move up")
					)
					.append(
						this.D("MPPlaylistControlLinkSeparator")
					)
					.append(
						(playlist_item.controls[2]=this.E("a","MPPlaylistControlLink"))
						.html("&darr;")
						.attr("title","Move down")
					)
					.append(
						this.D("MPPlaylistControlLinkSeparator")
					)
					.append(
						(playlist_item.controls[3]=this.E("a","MPPlaylistControlLink"))
						.html("V")
						.attr("title","Vimeo Link")
						.attr("href","//vimeo.com/"+playlist_item.vid_id+(playlist_item.start==0.0?"":("?t="+Math.floor(playlist_item.start))))
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
	},
	attempt_load:function(url_or_file,load_tag,playlist_data,callback_data,progress_callback,done_callback,status_callback){
		if(typeof(url_or_file)==typeof("")){
			if(this.url_get_youtube_video_id(url_or_file)){
				this.attempt_load_ytvideo_video(url_or_file,load_tag,playlist_data,callback_data,progress_callback,done_callback,status_callback);
				return;
			}
			if(this.url_get_vimeo_video_id(url_or_file)){
				this.attempt_load_vimeo_video(url_or_file,load_tag,playlist_data,callback_data,progress_callback,done_callback,status_callback);
				return;
			}
			var media_player=this;
			var dcb=function(okay,callback_data,response){
				if(typeof(done_callback)=="function")done_callback(okay,callback_data);
				if(okay){
					media_player.attempt_load_raw(false,url_or_file,load_tag,playlist_data,response,0,function(status,files){
						if(typeof(status_callback)=="function")status_callback(status,callback_data,files);
					});
				}
			};
			this.ajax_get(url_or_file,false,callback_data,progress_callback,dcb);
		}
		else{
			var reader=new FileReader();
			var self=this;
			reader.onload=function(){
				var ui8_data=new Uint8Array(this.result);
				self.attempt_load_raw(true,url_or_file.name,load_tag,playlist_data,ui8_data,0,function(status,files){
					if(typeof(status_callback)=="function")status_callback(status,callback_data,files);
				});
			}
			reader.readAsArrayBuffer(url_or_file);
		}
	},
	attempt_load_raw:function(is_local,url_or_filename,load_tag,playlist_data,raw_ui8_data,callback_id,done_callback){
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
						self.add_to_playlist(
							r[j]["title"],
							load_tag,
							r[j]["flagged"],
							url_or_filename,
							r[j]["index"],
							r[j]["data"],
							(is_local?raw_ui8_data:url_or_filename),
							playlist_data
						);
					}
				}
				if(typeof(done_callback)=="function")done_callback(true,available);
			}
			else{
				self.attempt_load_raw(is_local,url_or_filename,load_tag,playlist_data,raw_ui8_data,callback_id+1,done_callback);
			}
		});
	},
	attempt_load_ytvideo_video:function(url,load_tag,playlist_data,callback_data,progress_callback,done_callback,status_callback){
		var vid_id=this.url_get_youtube_video_id(url);
		if(vid_id===null){
			if(typeof(done_callback)=="function")done_callback(false,callback_data);
			return;
		}
		if("youtubevideo_cache"in playlist_data){
			if(typeof(done_callback)=="function")done_callback(true,callback_data);
			var xml=null;
			var status=this.add_to_playlist_ytvideo(url,vid_id,null,false,xml,playlist_data);
			if(typeof(status_callback)=="function")status_callback(status,callback_data,xml);
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
					var status=self.add_to_playlist_ytvideo(url,vid_id,null,false,xml,playlist_data);
					if(typeof(status_callback)=="function")status_callback(status,callback_data,xml);
				}
				else{
				}
			}
		);
	},
	attempt_load_vimeo_video:function(url,load_tag,playlist_data,callback_data,progress_callback,done_callback,status_callback){
		var vid_id=this.url_get_vimeo_video_id(url);
		if(vid_id===null){
			if(typeof(done_callback)=="function")done_callback(false,callback_data);
			return;
		}
		if("vimeovideo_cache"in playlist_data){
			if(typeof(done_callback)=="function")done_callback(true,callback_data);
			var xml=null;
			var status=this.add_to_playlist_vimeovideo(url,vid_id,null,false,xml,playlist_data);
			if(typeof(status_callback)=="function")status_callback(status,callback_data,xml);
			return;
		}
		var self=this;
		var info_url="//vimeo.com/api/v2/video/"+vid_id+".xml";
		this.ajax_get(
			info_url,
			true,
			callback_data,
			progress_callback,
			function(okay,data,response){
				if(typeof(done_callback)=="function")done_callback(okay,callback_data);
				if(okay){
					var xml=$.parseXML(response);
					var status=self.add_to_playlist_vimeovideo(url,vid_id,null,false,xml,playlist_data);
					if(typeof(status_callback)=="function")status_callback(status,callback_data,xml);
				}
				else{
				}
			}
		);
	},
	url_get_youtube_video_id:function(url){
		var youtube_url=[
			/(?:https?:\/\/)?(?:www\.)?youtube.com\/watch\?(?:\S+?)?v=([a-zA-Z0-9_-]{11})(?:[^\s<>]*)/i,
			/(?:https?:\/\/)?(?:www\.)?y2u.be\/([a-zA-Z0-9_-]{11})(?:[^\s<]*)/i,
			/(?:https?:\/\/)?(?:www\.)?youtu.be\/([a-zA-Z0-9_-]{11})(?:[^\s<]*)/i
		];
		for(var i=0;i<youtube_url.length;++i){
			var match;
			if((match=youtube_url[i].exec(url))!==null){
				return match[1];
			}
		}
		return null;
	},
	url_get_vimeo_video_id:function(url){
		var vimeo_url=[
			/(?:https?:\/\/)?(?:www\.)?(?:player\.)?vimeo.com\/(?:video\/)?([0-9]+)(?:[^\s<>]*)/i
		];
		for(var i=0;i<vimeo_url.length;++i){
			var match;
			if((match=vimeo_url[i].exec(url))!==null){
				return match[1];
			}
		}
		return null;
	},
	merge_value_towards:function(value,target,incr){
		return(value<target)?
			((target-value<incr)?target:value+incr):
			((value-target<incr)?target:value-incr);
	},
	downloads_generate_image_list:function(files,about,gen_function,use_original,index){
		if(index>=this.playlist.length){
			gen_function(files,about);
			return;
		}
		if(this.playlist[index].type!="image-audio"){
			this.downloads_generate_image_list(files,about,gen_function,use_original,index+1);
			return;
		}
		var image_url=this.playlist[index].image_url;
		for(var j=0;j<files.length;++j){
			if(files[j][2]==image_url){
				this.downloads_generate_image_list(files,about,gen_function,use_original,index+1);
				return;
			}
		}
		var fn=(use_original?this.playlist[index].image_name:this.playlist[index].url.split("/").pop()).split(".");
		var ext="."+fn.pop();
		fn=fn.join(".")
		try{
			fn=this.normalize_filename(unescape(encodeURIComponent(fn)));
		}
		catch(e){
			console.log(e);
		}
		var n=1;
		var name=fn+ext;
		for(var j=0;j<files.length;++j){
			if(name==files[j][0]){
				name=fn+" ("+(++n)+")"+ext;
				j=-1;
				continue;
			}
		}
		fn=name;
		if(this.playlist[index].image_blob!==null){
			files.push([fn,this.playlist[index].image_blob,image_url]);
			this.downloads_generate_image_list(files,about,gen_function,use_original,index+1);
		}
		else{
			var self=this;
			this.ajax_get(this.playlist[index].image_url,false,null,null,function(okay,data,response){
				if(okay){
					files.push([fn,response,image_url]);
					self.downloads_generate_image_list(files,about,gen_function,use_original,index+1);
				}
			});
		}
	},
	downloads_generate_link:function(files,zip_writer,about,index){
		if(index>=files.length){
			zip_writer.write_end();
			if(this.batch_download_blob!==null){
				(window.webkitURL||window.URL).revokeObjectURL(this.batch_download_blob_url);
			}
			this.batch_download_blob=null;
			this.batch_download_blob=new Blob([zip_writer.buffer],{type:"application/zip"});
			this.batch_download_blob_url=(window.webkitURL||window.URL).createObjectURL(this.batch_download_blob);
			this.downloads_ready_container.css("display","");
			this.downloads_about.html(about(files));
			this.downloads_link.attr("href",this.batch_download_blob_url);
			return;
		}
		if(files[index][1]instanceof Uint8Array){
			zip_writer.write_file(files[index][0],files[index][1]);
			this.downloads_generate_link(files,zip_writer,about,index+1);
		}
		else{
			var self=this;
			var reader=new FileReader();
			reader.onload=function(){
				var ui8_data=new Uint8Array(this.result);
				zip_writer.write_file(files[index][0],ui8_data);
				self.downloads_generate_link(files,zip_writer,about,index+1);
			};
			reader.readAsArrayBuffer(files[index][1]);
		}
	},
	normalize_filename:function(fname){
		var disallowed="<>:\"/\\|?*\0";
		for(var i=0;i<disallowed.length;++i){
			fname=fname.replace(new RegExp("\\"+disallowed[i],"gi"),"_");
		}
		return fname;
	},
	on_custom_option_click:function(event){
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
	},
	on_ytvideo_ready:function(event,media_player){
		event.target.unMute();
		event.target.setVolume(media_player.get_volume()*100.0);
		event.target.setPlaybackQuality(media_player.ytvideo_qualities[media_player.ytvideo_quality_index]);
		media_player.play();
	},
	on_ytvideo_time_update:function(playlist_item,media_player){
		if(media_player.ytvideo_player!=null){
			if(media_player.ytvideo_player.getCurrentTime){
				media_player.seek_to(media_player.ytvideo_player.getCurrentTime(),true);
			}
			if(media_player.ytvideo_player.getVideoLoadedFraction){
				media_player.set_loaded(media_player.get_loaded_offset(),media_player.ytvideo_player.getVideoLoadedFraction());
			}
		}
	},
	on_ytvideo_state_change:function(event,media_player){
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
	},
	on_ytvideo_playback_quality_change:function(event,media_player){
	},
	on_ytvideo_playback_rate_change:function(event,media_player){
	},
	on_ytvideo_error:function(event,media_player){
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
	},
	on_ytvideo_api_change:function(event,media_player){
	},
	on_vimeovideo_load_progress:function(data,video_player){
		this.set_loaded(this.get_loaded_offset(),parseFloat(data.percent));
	},
	on_vimeovideo_play_progress:function(data,video_player){
		this.seek_to(parseFloat(data.seconds),true);
	},
	on_vimeovideo_play:function(data,video_player){
		this.vimeovideo_player_paused=false;
		this.update_playing_status();
	},
	on_vimeovideo_pause:function(data,video_player){
		this.vimeovideo_player_paused=true;
		this.update_playing_status();
	},
	on_vimeovideo_finish:function(data,video_player){
		this.vimeovideo_player_paused=true;
		this.update_playing_status();
		this.next(true);
	},
	on_vimeovideo_seek:function(data,video_player){
		if(!this.seek_dragging&&!this.seek_exacting){
			this.seek_to(parseFloat(data.seconds),true);
		}
	},
	on_audio_play:function(event){
		event.data.media_player.update_playing_status();
	},
	on_audio_pause:function(event){
		event.data.media_player.update_playing_status();
	},
	on_audio_ended:function(event){
		if(!event.data.media_player.seek_exacting&&!event.data.media_player.seek_dragging){
			event.data.media_player.update_playing_status();
			event.data.media_player.next(true);
		}
	},
	on_audio_timeupdate:function(event){
		event.data.media_player.seek_to(this.currentTime,true);
	},
	on_audio_durationchange:function(event){
		var duration=event.data.media_player.get_audio_duration(event.data.media_player.audio[0]);
		event.data.media_player.set_duration(duration);
		event.data.media_player.seek_to(null,true);
	},
	on_temp_audio_durationchange:function(event){
		var duration=event.data.media_player.get_audio_duration(event.data.playlist_item.temp_audio[0]);
		event.data.playlist_item.duration=duration;
		event.data.playlist_item.temp_audio[0].pause();
		event.data.playlist_item.temp_audio.removeAttr("src").remove();
		event.data.playlist_item.temp_audio=null;
		var length_str=event.data.media_player.duration_to_string(duration);
		event.data.playlist_item.info_container.html(length_str);
	},
	on_main_container_mouseover:function(event){
		event.data.media_player.resize_container_hovered=true;
		event.data.media_player.on_resize_mouse_update(null,null);
	},
	on_main_container_mouseout:function(event){
		event.data.media_player.resize_container_hovered=false;
		event.data.media_player.on_resize_mouse_update(null,null);
	},
	on_timer_resize_open:function(){
		this.resize_timers[0]=null;
		this.resize_should_close=false;
		var d;
		$("body").append(d=this.D("MPResizingSizeOff"));
		this.resize_sizes[0]=d.outerWidth();
		d.remove();
		$("body").append(d=this.D("MPResizingSizeAvailable"));
		this.resize_sizes[1]=d.outerWidth();
		d.remove();
		$("body").append(d=this.D("MPResizingContainerText").html("I"));
		this.resize_sizes[2]=d.outerHeight();
		d.remove();
		if(this.resize_sizes[1]>this.resize_sizes[2])this.resize_sizes[1]=this.resize_sizes[2];
		this.resize_side_sizes_target=[this.resize_sizes[1],this.resize_sizes[1],this.resize_sizes[1],this.resize_sizes[1]];
		this.resize_side_sizes_needed=true;
		this.on_resize_mouse_update(null,null);
		if(this.resize_timers[2]===null){
			this.resize_side_sizes=[this.resize_sizes[0],this.resize_sizes[0],this.resize_sizes[0],this.resize_sizes[0]];
			this.mp_container_main.removeClass("MPContainerMainBorders");
			this.resizing_container.css("display","");
			var self=this;
			this.on_interval_resize_update();
			this.resize_timers[2]=setInterval(function(){
				self.on_interval_resize_update();
			},Math.floor(this.resize_wait_times[2]*1000));
		}
	},
	on_timer_resize_close:function(){
		this.resize_timers[1]=null;
		this.resize_should_close=true;
		this.resize_side_sizes_needed=true;
		this.resize_side_sizes_target=[this.resize_sizes[0],this.resize_sizes[0],this.resize_sizes[0],this.resize_sizes[0]];
		for(var i=0;i<this.resizing_texts.length;++i){
			this.resizing_texts[i].css("display","none");
		}
	},
	on_interval_resize_update:function(){
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
			this.mp_container_main.addClass("MPContainerMainBorders");
			this.resizing_container.css("display","none");
			return;
		}
	},
	on_resize_mouse_update:function(rel_x,rel_y){
		if(rel_x!==null)this.resize_mouse_offset[0]=rel_x;
		else rel_x=this.resize_mouse_offset[0];
		if(rel_y!==null)this.resize_mouse_offset[1]=rel_y;
		else rel_y=this.resize_mouse_offset[1];
		var size=[this.mp_container.outerWidth(),this.mp_container.outerHeight()];
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
	},
	on_resizer_mousedown:function(event){
		if(event.which==1){
			if(event.data.media_player.playlist_container.css("display")!="none"){
				event.data.media_player.resizing=true;
				event.data.media_player.resizing_sides=event.data.sides;
				event.data.media_player.mouse_offset={
					"left":(event.pageX-$(document).scrollLeft()),
					"top":(event.pageY-$(document).scrollTop())
				};
				event.data.media_player.resizing_base_size={
					"width":event.data.media_player.mp_container_main.outerWidth(),
					"height":event.data.media_player.mp_container_main.outerHeight()
				};
			}
			return false;
		}
		return true;
	},
	on_titlebar_mousedown:function(event){
		if(event.which==1){
			event.data.media_player.moving=true;
			event.data.media_player.mouse_offset=event.data.media_player.mp_container_main.offset();
			event.data.media_player.mouse_offset.left-=event.pageX;
			event.data.media_player.mouse_offset.top-=event.pageY;
			return false;
		}
		return true;
	},
	on_volumebar_mousedown:function(event){
		if(event.which==1){
			event.data.media_player.volume_changing=true;
			event.data.media_player.C(event.data.media_player.volume_container,"MPVolumeContainerActive");
			var volume=1.0-((event.pageY)-event.data.media_player.volume_bar_container.offset().top)/event.data.media_player.volume_bar_container.outerHeight();
			event.data.media_player.set_volume(volume);
			return false;
		}
		return true;
	},
	on_seekbar_mousedown:function(event){
		if(event.which==1){
			event.data.media_player.C(event.data.media_player.seek_bar,"MPSeekBarActive");
			event.data.media_player.seek_dragging=true;
			if((event.data.media_player.seek_was_playing=!event.data.media_player.is_paused())){
				event.data.media_player.pause();
			}
			event.data.media_player.mouse_offset=event.data.media_player.seek_bar.offset();
			event.data.media_player.mouse_offset.left-=event.pageX;
			event.data.media_player.mouse_offset.top-=event.pageY;
			return false;
		}
		return true;
	},
	on_seekbar_container_mousedown:function(event){
		if(event.which==1){
			event.data.media_player.C(event.data.media_player.seek_bar,"MPSeekBarActive");
			event.data.media_player.seek_exacting=true;
			if((event.data.media_player.seek_was_playing=!event.data.media_player.is_paused())){
				event.data.media_player.pause();
			}
			var offset=(event.pageX-event.data.media_player.seek_bar_container.offset().left)-event.data.media_player.seek_bar.outerWidth()/2.0;
			var max_offset=event.data.media_player.seek_bar_container.outerWidth()-event.data.media_player.seek_bar.outerWidth();
			if(max_offset>0.0)offset=offset/max_offset*event.data.media_player.get_duration();
			event.data.media_player.seek_to(offset);
			return false;
		}
		return true;
	},
	on_image_resize_mousedown:function(event){
		if(event.which==1){
			event.data.media_player.resizing_image=true;
			event.data.media_player.mouse_offset=event.data.media_player.mp_container_main.offset();
			event.data.media_player.mouse_offset.left-=event.pageX;
			event.data.media_player.mouse_offset.top-=event.pageY-(event.data.media_player.image_height*event.data.media_player.scale_factor);
			event.data.media_player.mouse_moved=false;
			return false;
		}
		return true;
	},
	on_document_mouseup:function(event){
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
			event.data.media_player.unC(event.data.media_player.volume_container,"MPVolumeContainerActive");
		}
		else if(event.data.media_player.seek_dragging){
			event.data.media_player.seek_dragging=false;
			event.data.media_player.unC(event.data.media_player.seek_bar,"MPSeekBarActive");
			event.data.media_player.seek_to(null,false,false);
			if(event.data.media_player.seek_was_playing){
				event.data.media_player.play();
			}
		}
		else if(event.data.media_player.seek_exacting){
			event.data.media_player.seek_exacting=false;
			event.data.media_player.unC(event.data.media_player.seek_bar,"MPSeekBarActive");
			event.data.media_player.seek_to(null,false,false);
			if(event.data.media_player.seek_was_playing){
				event.data.media_player.play();
			}
		}
		return true;
	},
	on_document_mousemove:function(event){
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
			var size=event.data.media_player.mp_container_main.offset();
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
			var rel=event.data.media_player.mp_container.offset();
			rel.left-=event.pageX;
			rel.top-=event.pageY;
			event.data.media_player.on_resize_mouse_update(-rel.left,-rel.top);
		}
		return true;
	},
	on_window_resize:function(event){
		event.data.media_player.reposition();
	},
	on_image_load:function(event){
		var attr=$(this).attr("src");
		if(typeof(attr)!=="undefined"&&attr!==false){
			event.data.media_player.current_image_width=this.width;
			event.data.media_player.current_image_height=this.height;
			event.data.media_player.update_image_scale();
			$(this).css("display","");
		}
	},
	on_playlist_mode_change:function(event){
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
	},
	on_playlist_onload_change:function(event){
		var v=(event.data.media_player.playlist_play_on_load+1)%event.data.media_player.playlist_play_on_load_settings.length;
		event.data.media_player.playlist_play_on_load=v;
		$(this).html(event.data.media_player.playlist_play_on_load_settings[event.data.media_player.playlist_play_on_load]);
		if(typeof(event.data.media_player.settings_callback)=="function")event.data.media_player.settings_callback(event.data.media_player);
	},
	on_playlist_scrollto_change:function(event){
		event.data.media_player.playlist_scrollto_onload=!event.data.media_player.playlist_scrollto_onload;
		$(this).html(event.data.media_player.playlist_scrollto_onload?"Scroll to in playlist":"Don't scroll playlist");
		if(typeof(event.data.media_player.settings_callback)=="function")event.data.media_player.settings_callback(event.data.media_player);
	},
	on_ytquality_change:function(event){
		event.data.media_player.ytvideo_quality_index=(event.data.media_player.ytvideo_quality_index+1)%event.data.media_player.ytvideo_qualities.length;
		if(event.data.media_player.ytvideo_player!=null&&event.data.media_player.ytvideo_player.setPlaybackQuality){
			event.data.media_player.ytvideo_player.setPlaybackQuality(event.data.media_player.ytvideo_qualities[event.data.media_player.ytvideo_quality_index]);
		}
		$(this).html(event.data.media_player.ytvideo_qualities[event.data.media_player.ytvideo_quality_index]);
		if(typeof(event.data.media_player.settings_callback)=="function")event.data.media_player.settings_callback(event.data.media_player);
	},
	on_player_theme_change:function(event){
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
	},
	on_player_use_svg_update:function(event){
		event.data.media_player.use_svg=!event.data.media_player.use_svg;
		$(this).html(event.data.media_player.use_svg?"Allowed":"Disallowed");
		event.data.media_player.create_playback_controls();
		if(typeof(event.data.media_player.settings_callback)=="function")event.data.media_player.settings_callback(event.data.media_player);
	},
	on_playback_control_click:function(event){
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
	},
	on_main_control_click:function(event){
		switch(event.data.control_id){
			case 2:
			{
				if(!event.data.media_player.is_maximized()){
					event.data.media_player.maximize();
				}
				event.data.media_player.first_run_container.css("display","");
				for(var i=0;i<event.data.media_player.help_container.length;++i){
					event.data.media_player.help_container[i].css("display","none");
				}
				event.data.media_player.downloads_container.css("display","none");
				event.data.media_player.first_run_container.scrollTop(0);
			}
			break;
			case 0:
			{
				if(!event.data.media_player.is_maximized()){
					event.data.media_player.maximize();
				}
				if(event.data.media_player.first_run_container.css("display")=="none"){
					var open=false;
					for(var i=0;i<event.data.media_player.help_container.length;++i){
						if(event.data.media_player.help_container[i].css("display")!="none"){
							open=true;
							break;
						}
					}
					event.data.media_player.downloads_container.css("display","none");
					if(open){
						for(var i=0;i<event.data.media_player.help_container.length;++i){
							event.data.media_player.help_container[i].css("display","none");
						}
					}
					else{
						event.data.media_player.help_container[0].css("display","");
						if(
							event.data.media_player.help_container_footer[0]&&
							event.data.media_player.help_container_inner1[0]
						){
							event.data.media_player.help_container_inner1[0].css(
								"bottom",(event.data.media_player.help_container_footer[0].height())+"px"
							);
						}
					}
				}
			}
			break;
			case 1:
			{
				if(!event.data.media_player.is_maximized()){
					event.data.media_player.maximize();
				}
				var open=(event.data.media_player.downloads_container.css("display")=="none");
				for(var i=0;i<event.data.media_player.help_container.length;++i){
					event.data.media_player.help_container[i].css("display","none");
				}
				event.data.media_player.downloads_container.css("display",open?"":"none");
			}
			break;
			case 3:
			{
				if(event.data.media_player.is_maximized()){
					event.data.media_player.minimize();
				}
				else{
					event.data.media_player.maximize();
				}
			}
			break;
			case 4:
			{
				event.data.media_player.destructor();
			}
			break;
		}
	},
	on_helppage_goto:function(event){
		for(var i=0;i<event.data.media_player.help_container.length;++i){
			event.data.media_player.help_container[i].css("display",(event.data.help_page==i?"":"none"));
		}
	},
	on_firstrun_page_exit_click:function(event){
		event.data.media_player.first_run_container.css("display","none");
		event.data.media_player.first_run=false;
		if(typeof(event.data.media_player.settings_callback)=="function")event.data.media_player.settings_callback(event.data.media_player);
		return false;
	},
	on_playlist_item_click:function(event){
		event.data.media_player.start(event.data.playlist_item.index);
	},
	on_playlist_control_click:function(event){
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
				if(event.which==1){
					if(event.data.playlist_item.type=="image-audio"){
						prompt(
							"Right click and save as, or open in a new tab and save.\n"+
							"(Be sure to save as .ogg)",
							$(this).attr("href")
						);
					}
					else if(event.data.playlist_item.type=="youtube-video"||event.data.playlist_item.type=="vimeo-video"){
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
				if(event.which==1){
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
	},
	on_settings_color_change:function(event){
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
	},
	on_settings_value_change:function(event){
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
	},
	on_container_drop:function(event){
		event.data.media_player.alert_container.css("display","none");
		event.data.media_player.downloads_container.css("display","none");
		for(var i=0;i<event.data.media_player.help_container.length;++i){
			event.data.media_player.help_container[i].css("display","none")
		}
		if(event.originalEvent.dataTransfer.files.length>0){
			for(var i=0;i<event.originalEvent.dataTransfer.files.length;++i){
				event.data.media_player.attempt_load(
					event.originalEvent.dataTransfer.files[i],
					MediaPlayer.ALL_SOUNDS,
					null,null,null,null,null
				);
			}
		}
		else{
			var data={
				text:event.originalEvent.dataTransfer.getData("text/plain"),
				callback_data:null,
				progress_callback:null,
				done_callback:null,
				status_callback:null,
			};
			event.data.media_player.drag_callback(data);
			if(data.text){
				event.data.media_player.attempt_load(
					data.text,
					MediaPlayer.ALL_SOUNDS,
					{},
					data.callback_data,
					data.progress_callback,
					data.done_callback,
					data.status_callback
				);
			}
		}
		return false;
	},
	on_container_dragover:function(event){
		event.originalEvent.dataTransfer.dropEffect="move";
		return false;
	},
	on_container_dragenter:function(event){
		event.data.media_player.alert_container.css("display","");
		return false;
	},
	on_container_dragexit:function(event){
		event.data.media_player.alert_container.css("display","none");
		return false;
	},
	on_downloads_generate_click:function(event){
		var mp=event.data.media_player;
		if(mp.batch_download_blob!==null){
			(window.webkitURL||window.URL).revokeObjectURL(mp.batch_download_blob_url);
		}
		mp.batch_download_blob=null;
		mp.downloads_ready_container.css("display","none");
		var gen_function=function(files,about){
			var total_length=0;
			var comment="";
			for(var i=0;i<files.length;++i){
				total_length+=30+files[i][0].length+(files[i][1].size||files[i][1].length||0);
				total_length+=46+files[i][0].length;
			}
			total_length+=22+comment.length;
			var buffer=null;
			try{
				buffer=new Uint8Array(new ArrayBuffer(total_length));
			}
			catch(e){
				console.log(e);
				return false;
			}
			var zw=new ZipWriter(buffer,comment);
			mp.downloads_generate_link(files,zw,about,0);
		};
		var files=[];
		var about="";
		if(event.data.type=="sounds"){
			for(var i=0;i<mp.playlist.length;++i){
				if(mp.playlist[i].type=="image-audio"){
					var fn=mp.playlist[i].title;
					var ext=".ogg";
					try{
						fn=mp.normalize_filename(unescape(encodeURIComponent(fn)));
					}
					catch(e){
						console.log(e);
					}
					var n=1;
					var name=fn+ext;
					for(var j=0;j<files.length;++j){
						if(name==files[j][0]){
							name=fn+" ("+(++n)+")"+ext;
							j=-1;
							continue;
						}
					}
					fn=name;
					files.push([fn,mp.playlist[i].audio_blob]);
				}
			}
			about=function(files){
				return" to download "+files.length+" sound"+(files.length==1?"":"s")+" (save as .zip)";
			};
			gen_function(files,about);
		}
		else{
			about=function(files){
				return" to download "+files.length+" image"+(files.length==1?"":"s")+" (save as .zip)";
			};
			mp.downloads_generate_image_list(files,about,gen_function,(event.data.type=="images2"),0);
		}
		return false;
	},
	on_downloads_link_click:function(event){
		if(event.which==1){
			prompt(
				"Right click and save as, middle click, or visit the URL below.\n"+
				"(Be sure to save as .zip)",
				event.data.media_player.batch_download_blob_url
			);
			return false;
		}
		return true;
	},
	cancel_event:function(event){
		return false;
	}
};
MediaPlayer.ALL_SOUNDS=true;
function ZipWriter(buffer,comment){
	this.buffer=buffer;
	this.comment=comment||"";
	this.date=new Date();
	this.pos=0;
	this.offsets=new Array();
	this.crc32s=new Array();
	this.sizes=new Array();
	this.fnames=new Array();
};
ZipWriter.prototype={
	constructor:ZipWriter,
	date_convert:function(date){
		var mod_time=(Math.floor(date.getSeconds()/2)|(date.getMinutes()<<5)|(date.getHours()<<11));
		var mod_date=((date.getDate())|((date.getMonth()+1)<<5)|((date.getFullYear()-1980)<<9));
		return[mod_time,mod_date];
	},
	write_end:function(){
		var date=this.date_convert(this.date);
		var cd_pos=this.pos;
		for(var i=0;i<this.fnames.length;++i){
			this.write_data(0x02014b50,4);
			this.write_data(20,2);
			this.write_data(20,2);
			this.write_data(0,2);
			this.write_data(0,2);
			this.write_data(date[0],2);
			this.write_data(date[1],2);
			this.write_data(this.crc32s[i],4);
			this.write_data(this.sizes[i],4);
			this.write_data(this.sizes[i],4);
			this.write_data(this.fnames[i].length,2);
			this.write_data(0,2);
			this.write_data(0,2);
			this.write_data(0,2);
			this.write_data(0,2);
			this.write_data(32,4);
			this.write_data(this.offsets[i],4);
			this.write_data(this.fnames[i]);
		}
		var cd_end_pos=this.pos;
		this.write_data(0x06054b50,4);
		this.write_data(0,2);
		this.write_data(0,2);
		this.write_data(this.fnames.length,2);
		this.write_data(this.fnames.length,2);
		this.write_data(cd_end_pos-cd_pos,4);
		this.write_data(cd_pos,4);
		this.write_data(this.comment.length,2);
		this.write_data(this.comment);
	},
	write_file:function(filename,filedata){
		var crc=this.crc32(filedata);
		this.offsets.push(this.pos);
		this.crc32s.push(crc);
		this.sizes.push(filedata.length);
		this.fnames.push(filename);
		var date=this.date_convert(this.date);
		this.write_data(0x04034b50,4);
		this.write_data(20,2);
		this.write_data(0,2);
		this.write_data(0,2);
		this.write_data(date[0],2);
		this.write_data(date[1],2);
		this.write_data(crc,4);
		this.write_data(filedata.length,4);
		this.write_data(filedata.length,4);
		this.write_data(filename.length,2);
		this.write_data(0,2);
		this.write_data(filename);
		this.write_data(filedata);
	},
	write_data:function(data,bytes){
		if(typeof(data)===typeof(0)){
			data=data&0xFFFFFFFF;
			for(var i=0;i<bytes;++i){
				this.buffer[this.pos]=data&0xFF;
				++this.pos;
				data=data>>>8;
			}
		}
		else if(typeof(data)===typeof("")){
			for(var i=0;i<data.length;++i){
				this.buffer[this.pos]=data.charCodeAt(i);
				++this.pos;
			}
		}
		else{
			for(var i=0;i<data.length;++i){
				this.buffer[this.pos]=data[i];
				++this.pos;
			}
		}
	},
	crc32:function(value){
		var table="00000000 77073096 EE0E612C 990951BA 076DC419 706AF48F E963A535 9E6495A3 0EDB8832 79DCB8A4 E0D5E91E 97D2D988 09B64C2B 7EB17CBD E7B82D07 90BF1D91 1DB71064 6AB020F2 F3B97148 84BE41DE 1ADAD47D 6DDDE4EB F4D4B551 83D385C7 136C9856 646BA8C0 FD62F97A 8A65C9EC 14015C4F 63066CD9 FA0F3D63 8D080DF5 3B6E20C8 4C69105E D56041E4 A2677172 3C03E4D1 4B04D447 D20D85FD A50AB56B 35B5A8FA 42B2986C DBBBC9D6 ACBCF940 32D86CE3 45DF5C75 DCD60DCF ABD13D59 26D930AC 51DE003A C8D75180 BFD06116 21B4F4B5 56B3C423 CFBA9599 B8BDA50F 2802B89E 5F058808 C60CD9B2 B10BE924 2F6F7C87 58684C11 C1611DAB B6662D3D 76DC4190 01DB7106 98D220BC EFD5102A 71B18589 06B6B51F 9FBFE4A5 E8B8D433 7807C9A2 0F00F934 9609A88E E10E9818 7F6A0DBB 086D3D2D 91646C97 E6635C01 6B6B51F4 1C6C6162 856530D8 F262004E 6C0695ED 1B01A57B 8208F4C1 F50FC457 65B0D9C6 12B7E950 8BBEB8EA FCB9887C 62DD1DDF 15DA2D49 8CD37CF3 FBD44C65 4DB26158 3AB551CE A3BC0074 D4BB30E2 4ADFA541 3DD895D7 A4D1C46D D3D6F4FB 4369E96A 346ED9FC AD678846 DA60B8D0 44042D73 33031DE5 AA0A4C5F DD0D7CC9 5005713C 270241AA BE0B1010 C90C2086 5768B525 206F85B3 B966D409 CE61E49F 5EDEF90E 29D9C998 B0D09822 C7D7A8B4 59B33D17 2EB40D81 B7BD5C3B C0BA6CAD EDB88320 9ABFB3B6 03B6E20C 74B1D29A EAD54739 9DD277AF 04DB2615 73DC1683 E3630B12 94643B84 0D6D6A3E 7A6A5AA8 E40ECF0B 9309FF9D 0A00AE27 7D079EB1 F00F9344 8708A3D2 1E01F268 6906C2FE F762575D 806567CB 196C3671 6E6B06E7 FED41B76 89D32BE0 10DA7A5A 67DD4ACC F9B9DF6F 8EBEEFF9 17B7BE43 60B08ED5 D6D6A3E8 A1D1937E 38D8C2C4 4FDFF252 D1BB67F1 A6BC5767 3FB506DD 48B2364B D80D2BDA AF0A1B4C 36034AF6 41047A60 DF60EFC3 A867DF55 316E8EEF 4669BE79 CB61B38C BC66831A 256FD2A0 5268E236 CC0C7795 BB0B4703 220216B9 5505262F C5BA3BBE B2BD0B28 2BB45A92 5CB36A04 C2D7FFA7 B5D0CF31 2CD99E8B 5BDEAE1D 9B64C2B0 EC63F226 756AA39C 026D930A 9C0906A9 EB0E363F 72076785 05005713 95BF4A82 E2B87A14 7BB12BAE 0CB61B38 92D28E9B E5D5BE0D 7CDCEFB7 0BDBDF21 86D3D2D4 F1D4E242 68DDB3F8 1FDA836E 81BE16CD F6B9265B 6FB077E1 18B74777 88085AE6 FF0F6A70 66063BCA 11010B5C 8F659EFF F862AE69 616BFFD3 166CCF45 A00AE278 D70DD2EE 4E048354 3903B3C2 A7672661 D06016F7 4969474D 3E6E77DB AED16A4A D9D65ADC 40DF0B66 37D83BF0 A9BCAE53 DEBB9EC5 47B2CF7F 30B5FFE9 BDBDF21C CABAC28A 53B39330 24B4A3A6 BAD03605 CDD70693 54DE5729 23D967BF B3667A2E C4614AB8 5D681B02 2A6F2B94 B40BBE37 C30C8EA1 5A05DF1B 2D02EF8D";
		var crc=0;
		var y;
		var t=[];
		for(var i=0;i<table.length;i+=9){
			t.push(0^("0x"+table.substr(i,8)));
		}
		crc=crc^(-1);
		var iMax=value.length;
		for(var i=0;i<iMax;++i){
			y=(crc^value[i])&0xFF;
			crc=(crc>>>8)^t[((crc^value[i])&0xFF)];
		}
		return(crc^(-1))>>>0;
	}
};
function VimeoManager(iframe){
	var self=this;
	this.iframe=iframe;
	this.is_ready=false;
	this.ready_called=false;
	this.url=this.iframe.getAttribute("src").split("?")[0].split("#")[0];
	if(this.url.substr(0,2)=="//")this.url=window.location.protocol+this.url;
	var url_parts=this.url.split("/");
	this.domain="";
	for(var i=0;i<url_parts.length;){
		this.domain+=url_parts[i];
		if(++i>=3)break;
		this.domain+="/";
	}
	this.on_message_received=function(event){
		if(event.origin!=self.domain)return false;
		self.handle_event(JSON.parse(event.data));
	};
	this.events={};
	this.callbacks={};
	if(window.addEventListener){
		window.addEventListener("message",this.on_message_received,false);
	}
	else{
		window.attachEvent("onmessage",this.on_message_received,false);
	}
}
VimeoManager.prototype={
	constructor:VimeoManager,
	destructor:function(){
		if(window.addEventListener){
			window.removeEventListener("message",this.on_message_received,false);
		}
		else{
			window.detachEvent("onmessage",this.on_message_received,false);
		}
	},
	api_call:function(action,value){
		var data={"method":action};
		if(value){
			if(value instanceof Function){
				this.callbacks[action]=value;
			}
			else{
				data.value=value;
			}
		}
		this.iframe.contentWindow.postMessage(JSON.stringify(data),this.url);
	},
	add_event:function(name,callback){
		this.events[name]=callback;
		if(this.is_ready){
			if(name=="ready"&&!this.ready_called){
				this.ready_called=true;
				this.events[name].call(this,{});
			}
			this.api_call("addEventListener",name);
		}
	},
	handle_event:function(data){
		if(data.method){
			if(data.method in this.callbacks){
				this.callbacks[data.method].call(this,data.value);
				delete this.callbacks[data.method];
			}
			return;
		}
		if(data.event=="ready"){
			this.is_ready=true;
			this.ready_called=(data.event in this.events);
			for(var e in this.events){
				this.api_call("addEventListener",e);
			}
		}
		if(data.event in this.events){
			this.events[data.event].call(this,data.data);
		}
	}
};

if(/http\:\/\/dnsev\.github\.com\/4cs\//.exec(window.location.href+"")){
	$(document).ready(function(){
		if(unsafeWindow&&unsafeWindow.version_check){
			var version="";
			try{
				version=GM_info.script.version;
			}
			catch(e){
				try{
					version=GM_getMetadata("version").toString();
				}
				catch(e){
					version=null;
				}
			}
			if(version!==null){
				unsafeWindow.version_check(version);
			}
		}
	});
	return;
}
window.$.prototype.exists=function(){
	return(this.length>0);
}
if(!GM_getValue||(GM_getValue.toString&&GM_getValue.toString().indexOf("not supported")>=0)){
	GM_getValue=function(key,def){
		return localStorage.getItem(key)||def;
	};
	GM_setValue=function(key,value){
		return localStorage.setItem(key,value);
	};
	GM_deleteValue=function(key){
		return localStorage.removeItem(key);
	};
}
var is_archive=((document.location+"").indexOf("boards.4chan.org")<0);
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
function string_remove_tags(str){
	return str.replace(/<[^>]*>?/g,"");
}
function dom_replace(tag,check_callback,replace_callback){
	var c=tag.contents();
	var sub_tags=[new Array()];
	var check,t;
	var f,found=false;
	var i=0;
	for(var j=0;j<c.length;++j){
		t=$(c[j]);
		check=check_callback(t,sub_tags[i]);
		if(check<=1&&sub_tags[i].length>0){
			sub_tags.push(new Array());
			++i;
		}
		if(check>=1){
			f=false;
			if(
				t.prop("tagName")===undefined||
				t.contents().length<=0||
				!(f=dom_replace(t,check_callback,replace_callback))
			){
				sub_tags[i].push(t);
			}
			else if(!found&&f){
				found=true;
			}
		}
	}
	for(i=0;i<sub_tags.length&&sub_tags[i].length>0;++i){
		found=(replace_callback(sub_tags[i])||found);
	}
	return found;
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
				for(s=0;s<magic_strings_ui8.length;++s){
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
						break;
					}
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
				tag=(tag&&tag!==true?tag:"?");
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
				sound_index+=1;
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
					for(s=0;s<magic_strings_ui8.length;++s){
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
							break;
						}
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
					for(s=0;s<magic_strings_ui8.length;++s){
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
							break;
						}
					}
				}
				if(found){
					tag_pos=i;
					k=1;
					tag="[Name Unknown]";
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
					sounds[1].push(tag+".ogg");
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
	if(sound_magic_string_index!=0){
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
function ThreadManager(){
	this.posts={};
	var self=this;
	if(is_archive){
		$(".thread")
		.each(function(index){
			if($(this).attr("id")){
				if(index==0){
					self.parse_post($(this));
				}
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
ThreadManager.prototype={
	constructor:ThreadManager,
	on_dom_mutation:function(target){
		if(target.hasClass("postContainer")||target.hasClass("post")){
			this.parse_post(target);
		}
	},
	parse_post:function(container){
		var post_id=(container.attr("id")||"0").replace(/(\w+_)?[^0-9]/g,"");
		var redo=(post_id in this.posts);
		var image=container.find(is_archive?".thread_image_link":".fileThumb");
		var post=container.find(is_archive?".text":".postMessage");
		image=(image.length>0?(image.attr("href")||""):null);
		if(is_archive&&image!==null){
			var match;
			if((match=/\/(\w+)\/redirect\/(.+)/.exec(image))!==null){
				image="//images.4chan.org/"+match[1]+"/src/"+match[2];
			}
		}
		var image_name=null;
		if(image!==null){
			if(is_archive){
				var ft=container.find(".post_file");
				if(ft.length>0){
					var c;
					if((c=$(ft[0]).find(".post_file_filename"))&&c.length>0){
						image_name=c.attr("title");
					}
					else{
						c=$(ft[0]).contents();
						if(c.length>2){
							image_name=$(c[2]).text();
							if(image_name){
								image_name=image_name.trim();
								image_name=image_name.substr(0,image_name.length-1);
							}
						}
						else{
							image_name=$(c[0]).text();
							if(image_name)image_name=image_name.split(",").splice(2).join(",").trim();
						}
					}
				}
			}
			else{
				var ft=container.find(".fileText");
				if(!(image_name=ft.attr("data-filename"))){
					image_name=ft.find("span");
					if(image_name.length>0){
						image_name=$(image_name[image_name.length-1]).attr("title");
					}
				}
			}
			if(!image_name){
				image_name=image.split("/").pop();
			}
		}
		var post_data_copy={
			"container":container,
			"image_url":image,
			"image_name":image_name,
			"post":(post.length>0?$(post[0]):null)
		};
		if(!redo){
			this.posts[post_id]=post_data_copy;
		}
		inline_manager.parse_post(this.posts[post_id],redo,post_data_copy);
		if(script.settings["inline"]["url_replace"]){
			inline_manager.parse_post_for_urls(this.posts[post_id],redo,post_data_copy);
		}
	},
	post:function(index){
		index+="";
		return(index in this.posts?this.posts[index]:null);
	}
}
var thread_manager=null;
function SettingsManager(){
	var self=this;
	$("head")
	.append(
		E("style")
		.html(
			".MPMenu{display:block !important;position:absolute;left:0;top:0;box-shadow:0px 0px 2px 2px rgba(0,0,0,0.25);z-index:10001;margin:0px !important;padding:2px !important;}\n"+
			".MPMenuClosed{display:none !important;}\n"+
			"a.MPMenuItem,a.MPMenuItem:link,a.MPMenuItem:visited{display:block !important;padding:2px !important;text-decoration:none !important;}"+
			".MPMenuItem + .MPMenuItem{margin-top:1px;}\n"+
			".MPSettingsContainerOuter{position:fixed;left:0;top:0;right:0;bottom:0;z-index:10001;background:rgba(0,0,0,0.25);}\n"+
			".MPSettingsClosed{display:none !important;}\n"+
			".MPSettingsContainerInner{position:relative;width:100%;height:100%;}\n"+
			"div.MPSettingsBox{display:block !important;position:absolute !important;left:25%;top:15%;right:25%;bottom:15%;border:0px !important;box-shadow:0px 0px 2px 2px rgba(0,0,0,0.25);border-radius:6px !important;padding:0px !important;margin:0px !important;overflow:hidden;}\n"+
			"div.MPSettingsTitleContainer{position:relative;z-index:1;padding:4px !important;}\n"+
			"div.MPSettingsTitle{position:relative;display:inline-block !important;font-size:2em !important;vertical-align:top !important;font-weight:bold;}\n"+
			"div.MPSettingsTitleVersion{padding-left:4px !important;display:inline-block !important;vertical-align:top !important;font-style:italic;}\n"+
			"a.MPSettingsTitleUpdate{position:absolute;right:4px;top:4px;vertical-align:top !important;}\n"+
			"div.MPSettingsContainer{overflow-x:hidden;overflow-y:auto;margin:4px !important;left:0;top:0;right:0;bottom:0;position:absolute;}\n"+
			".MPSettingsSingleLabel{font-size:1.25em !important;font-weight:bold;padding:2px 2px 2px 0px !important;}\n"+
			".MPSettingsSingleContainer + .MPSettingsSingleLabel{margin-top:4px;}\n"+
			".MPSettingsSingleContainer{border:1px solid rgba(0,0,0,0.125);padding:1px !important;border-radius:2px;}\n"+
			".MPSettingsSingleItem{padding:2px !important;position:relative;background:rgba(0,0,0,0.03125);}\n"+
			".MPSettingsSingleItem.MPSettingsSingleItemEven{background:rgba(0,0,0,0.0625) !important;}\n"+
			".MPSettingsSingleItem + .MPSettingsSingleItem{margin-top:1px !important;}\n"+
			".MPSettingsSingleItemValue{float:right;}\n"+
			".MPSettingsSingleItemValueAfter{clear:both;}\n"+
			".MPSettingsSingleItemLabel{}\n"+
			".MPSettingsSingleItemDescription{font-size:0.8em !important;opacity:0.5 !important;}\n"+
			"input.MPSettingsTextbox[type=text]{padding:2px !important;margin:0px !important;background:rgba(0,0,0,0.03125) !important;border:1px solid rgba(0,0,0,0.125) !important;color:inherit !important;}\n"+
			".MPSettingsTextboxContainer{position:relative;}\n"+
			".MPSettingsTextboxLinkContainer{position:absolute;right:2px;top:2px;}\n"
		)
	);
	this.menu_order=true;
	$("body").append(
		(this.menu_list=E("div"))
		.addClass("MPMenu MPMenuClosed")
		.addClass(is_archive?"post_wrapper":"reply")
		.append(
			E("a")
			.addClass("MPMenuItem")
			.attr("href","#")
			.html("Open Player")
			.on("click",{item:0},function(event){
				return self.on_menu_item_click($(this),event);
			})
		)
		.append(
			E("a")
			.addClass("MPMenuItem")
			.attr("href","#")
			.html("Reload Player")
			.on("click",{item:1},function(event){
				return self.on_menu_item_click($(this),event);
			})
		)
		.append(
			E("a")
			.addClass("MPMenuItem")
			.attr("href","#")
			.html("Settings")
			.on("click",{item:2},function(event){
				return self.on_menu_item_click($(this),event);
			})
		)
		.append(
			E("a")
			.addClass("MPMenuItem")
			.attr("href","http://dnsev.github.com/4cs/")
			.attr("target","_blank")
			.html("Homepage")
			.on("click",{item:3},function(event){
				return self.on_menu_item_click($(this),event);
			})
		)
	);
	$(document)
	.on("scroll",{},function(event){
		self.menu_close();
	})
	.on("click",{},function(event){
		self.menu_close();
	});
	var script_name="Userscript";
	var version="";
	try{
		script_name=GM_info.script.name;
		version=GM_info.script.version;
	}
	catch(e){
		try{
			script_name=GM_getMetadata("name").toString();
			version=GM_getMetadata("version").toString();
		}
		catch(e){}
	}
	$("body").append(
		(this.settings_container=E("div"))
		.addClass("MPSettingsContainerOuter MPSettingsClosed")
		.on("click",{},function(event){
			self.settings_close();
		})
		.append(
			E("div")
			.addClass("MPSettingsContainerInner")
			.append(
				E("div")
				.addClass("MPSettingsBox")
				.addClass(is_archive?"post_wrapper":"reply")
				.on("click",{},function(event){
					return false;
				})
				.append(
					(this.settings_region_title=E("div"))
					.addClass("MPSettingsTitleContainer")
					.append(
						E("div")
						.addClass("MPSettingsTitle")
						.html(script_name)
					)
					.append(
						E("div")
						.addClass("MPSettingsTitleVersion")
						.html(version)
					)
					.append(
						(this.settings_update_link=E("a"))
						.addClass("MPSettingsTitleUpdate")
						.css("display","none")
						.attr("href","http://dnsev.github.com/4cs/")
						.attr("target","_blank")
						.html("An update is available!")
						.on("click",function(event){
							if(event.which==1){
								script.on_update_click(event);
								return false;
							}
							return true;
						})
					)
				)
				.append(
					(this.settings_region=E("div"))
					.addClass("MPSettingsContainer")
				)
			)
		)
	);
	this.section_default="Other Settings";
	this.sections={};
}
SettingsManager.prototype={
	constructor:SettingsManager,
	on_menu_item_click:function(link,event){
		if(event.which!=1)return true;
		switch(event.data.item){
			case 0:
			{
				media_player_manager.open_player(true);
				this.menu_close();
			}
			return false;
			case 1:
			{
				media_player_manager.open_player(false);
				script.settings_save();
				this.menu_close();
			}
			return false;
			case 2:
			{
				this.settings_open();
				this.menu_close();
			}
			return false;
			default:
			{
				this.menu_close();
			}
			return true;
		}
	},
	menu_arrange_order:function(order){
		if(order!==this.menu_order){
			this.menu_order=order;
			var items=this.menu_list.find(".MPMenuItem");
			for(var i=0;i<items.length;++i){
				$(items[i]).parent().prepend(items[i]);
			}
		}
	},
	menu_open:function(parent){
		this.menu_list.removeClass("MPMenuClosed");
		this.menu_arrange_order(InlineManager.prototype.position_relative(parent,this.menu_list,[0,2],[false,true])[1]);
	},
	menu_close:function(){
		this.menu_list.addClass("MPMenuClosed");
	},
	settings_open:function(){
		this.settings_container.removeClass("MPSettingsClosed");
		this.settings_region.css("top",this.settings_region_title.outerHeight()+"px");
		this.settings_region.scrollTop(0);
	},
	settings_close:function(){
		this.settings_container.addClass("MPSettingsClosed");
	},
	setting_add:function(data){
		var section=data.section||this.section_default;
		if(!(section in this.sections)){
			var c,s;
			(c=E("div"))
			.addClass("MPSettingsSingleLabel")
			.html(section);
			if(this.section_default in this.sections){
				this.sections[this.section_default][0].before(c);
			}
			else{
				this.settings_region.append(c);
			}
			c.after(
				(s=E("div"))
				.addClass("MPSettingsSingleContainer")
			);
			this.sections[section]=[c,s,0];
		}
		var container=this.sections[section][1];
		var value="";
		if("values"in data){
			var i;
			for(i=0;i<data.values.length;++i){
				if(data.current==data.values[i])break;
			}
			(value=E("a"))
			.attr("href","#")
			.on("click",{values:data.values,descr:data.descr,current:i%data.values.length,change:data.change},function(event){
				if(event.which==1){
					event.data.current=(event.data.current+1)%event.data.values.length;
					$(this).html(event.data.descr[event.data.current]);
					event.data.change(event.data.values[event.data.current]);
					return false;
				}
				return true;
			});
			value.html(data.descr[i%data.values.length]);
		}
		else if("html"in data){
			value=data.html;
		}
		var label;
		container.append(
			E("div")
			.addClass("MPSettingsSingleItem"+(this.sections[section][2]%2==1?"":" MPSettingsSingleItemEven"))
			.append(
				E("div")
				.addClass("MPSettingsSingleItemValue")
				.html(
					value
				)
			)
			.append(
				(label=E("div"))
				.addClass("MPSettingsSingleItemLabel")
				.html(data.label)
			)
			.append(
				E("div")
				.addClass("MPSettingsSingleItemValueAfter")
			)
		);
		if(data.description){
			label.after(
				E("div")
				.addClass("MPSettingsSingleItemDescription")
				.html(data.description)
			);
		}
		++this.sections[section][2];
	},
};
function InlineManager(){
	$("head")
	.append(
		E("style")
		.html(
			"a.MPLoadLink,a.MPLoadLink:visited{color: inherit;}\n"+
			".MPImageSearchingTextContainer{}\n"+
			".MPImageSearchingText{}\n"+
			".MPLoadLinkTop{}\n"+
			".MPLoadLinkTopFile{}\n"+
			".MPLoadAllLink{}\n"+
			".MPReplacedURL{}\n"+
			".MPIconedURLText{vertical-align:middle;}\n"+
			".MPIconedURLTextNotFound{font-style:italic;}\n"+
			".MPURLIcon{display:inline-block;width:20px;height:16px;vertical-align:middle;background-repeat:no-repeat;background-position:top left;background-size:16px 16px;}\n"+
			".MPURLIconVimeo{background-image:url(//vimeo.com/favicon.ico);}\n"+
			".MPURLIconYoutube{background-image:url(//youtube.com/favicon.ico);}\n"+
			".MPReplacedURLContainer{display:inline;position:relative;}\n"+
			".MPVideoInfo{display:none !important;}\n"+
			".MPVideoInfoDisplay{z-index:1;text-align:center;padding:8px !important;display:block;position:absolute;left:0;top:100%;box-shadow:0px 0px 2px 2px rgba(0,0,0,0.25);border-radius:4px;}\n"+
			".MPVideoInfoDisplayHidden{display:none !important}\n"+
			".MPVideoInfoDisplayContainer{}\n"+
			".MPVideoInfoDisplayTitle{text-align:left;margin-bottom:2px;}\n"+
			".MPVideoInfoDisplayTitleStart{opacity:0.5 !important;}\n"+
			".MPVideoInfoDisplayTitleViews{float:right;}\n"+
			".MPVideoInfoDisplayTitleEnd{clear:both;}\n"+
			".MPVideoInfoDisplayRatingBg{position:relative;z-index:1;background:#b41414;height:2px;width:100%;opacity:1.0 !important;overflow:hidden;}\n"+
			".MPVideoInfoDisplayRatingGood{background:#60b410;height:2px;}\n"+
			".MPVideoInfoDisplayContent{white-space:nowrap;}\n"+
			".MPVideoInfoDisplayPreview{display:inline-block;vertical-align:top !important;}\n"+
			".MPVideoInfoDisplayThumbnailContainerOuter{border-width:0px 2px 2px 2px;border-style:solid;border-color:rgba(0,0,0,0.25);}\n"+
			".MPVideoInfoDisplayThumbnailContainerOuterTop{border-width:2px !important;}\n"+
			".MPVideoInfoDisplayThumbnailContainer{background:#000;display:block;width:100%;white-space:nowrap !important;line-height:0px;overflow:hidden;}\n"+
			".MPVideoInfoDisplayThumbnail{display:inline-block;}\n"+
			".MPVideoInfoDisplayThumbnailFirst{display:block;}\n"+
			".MPVideoInfoDisplayDescription{display:inline-block;overflow:hidden;text-align:left;vertical-align:top !important;}\n"+
			".MPVideoInfoDisplayDescriptionInner{padding-left:2px;white-space:normal !important;}\n"+
			".MPVideoInfoDisplayDescriptionInner p{padding:0px !important;margin:0px !important;}\n"+
			".MPVideoInfoDisplayDescriptionInner p + p{margin-top:0.375em !important;}\n"
		)
	);
	var self=this;
	var pre,post,reload_span,settings_span;
	if(is_archive){
		$(".letters").append((settings_span=E("span")));
		pre=" [ ";
		post=" ]";
	}
	else{
		$("#navtopright").prepend((settings_span=E("span")));
		pre="[";
		post="] ";
	}
	this.settings_manager=new SettingsManager();
	settings_span
	.append(T(pre))
	.append(
		(this.nav_link=E("a"))
		.html("Media Player")
		.attr("href","http://dnsev.github.com/4cs/")
		.attr("target","_blank")
		.on("click",function(event){
			return self.on_menu_link_click($(this),event);
		})
	)
	.append(T(post));
	var threads=$(".thread");
	if(threads.length>0){
		$(threads[0]).before(
			E("div")
			.append(T("[ "))
			.append(
				(sound_auto_checker.link=E("a"))
				.attr("href","#")
				.html("Detect Sounds")
				.on("click",{},this.on_detect_all_in_thread_click)
			)
			.append(T(" / "))
			.append(
				(sound_auto_loader.link=E("a"))
				.attr("href","#")
				.html("Load All Sounds")
				.on("click",{},this.on_load_all_in_thread_click)
			)
			.append(T(" ]"))
		);
	}
}
InlineManager.prototype={
	constructor:InlineManager,
	parse_post:function(post_data,redo,post_data_copy){
		if(post_data.image_url!=null){
			var self=this;
			if(redo){
				post_data_copy.post.find(".MPLoadLink").each(function(index){
					var tag_id=parseInt($(this).attr("_sp_tag_id"));
					$(this)
					.html(post_data.sounds[tag_id])
					.off("click")
					.on("click",{"post_data":post_data,"tag_id":tag_id,"manager":self},self.on_link_click);
				});
				post_data_copy.container.find(".MPLoadAllLink").each(function(index){
					$(this)
					.attr("href","#")
					.html(post_data.sounds.load_all_text)
					.on("click",{"post_data":post_data,"manager":self},self.on_load_all_click);
				});
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
					"about_list_container_inner":null,
					"about_list_container_toggler":null,
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
					this.replace_tags
				);
				post_data.post.find(".MPLoadLink").each(function(index){
					var tag_id=post_data.sounds.post_tags.length;
					post_data.sounds.post_tags.push($(this).html());
					$(this)
					.attr("href","#")
					.attr("_sp_tag_id",tag_id)
					.on("click",{"post_data":post_data,"tag_id":tag_id,"manager":self},self.on_link_click);
				});
				if(is_archive){
					var file_size_label=post_data.container.find(".post_file_controls").find("a");
					file_size_label=$(file_size_label[0]);
					file_size_label.before((post_data.sounds.load_all_link=E("a")).addClass("MPLoadAllLink btnr parent"));
				}
				else{
					var file_size_label=post_data.container.find(".fileText");
					file_size_label.after((post_data.sounds.load_all_link=E("a")).addClass("MPLoadAllLink"));
					file_size_label.after(T(" "));
				}
				post_data.sounds.load_all_link
				.attr("href","#")
				.html(post_data.sounds.load_all_text)
				.on("click",{"post_data":post_data,"manager":self},self.on_load_all_click);
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
					.addClass("MPImageSearchingTextContainer")
					.css("display",(sound_auto_checker.enabled?"":"none"))
					.html("...")
					.append(
						(post_data.sounds.auto_check.search_status=E("span"))
						.addClass("MPImageSearchingText")
					)
				);
				sound_auto_loader.add_to_queue(post_data);
				sound_auto_checker.add_to_queue(post_data);
			}
		}
	},
	parse_post_for_urls:function(post_data,redo,post_data_copy){
		var self=this;
		if(redo){
			post_data_copy.post.find(".MPReplacedURL").each(function(index){
				var video_type=$(this).attr("mp_video_type")||null;
				var video_id=$(this).attr("mp_video_id")||null;
				var cache_title,cache_duration,video_cache=null;
				if(
					(cache_title=$(this).attr("mp_video_cache_title")||null)!==null&&
					(cache_duration=$(this).attr("mp_video_cache_duration")||null)!==null
				){
					video_cache={
						"title":cache_title,
						"duration":(parseFloat(cache_duration)||0.0)
					};
				}
				var href=$(this).attr("mp_original_url");
				$(this)
				.off("click")
				.on("click",{"post_data":post_data,"video_type":video_type,"video_id":video_id,"video_cache":video_cache,"url":href},self.on_url_click);
				if(video_type!==null){
					if(script.settings["inline"]["video_preview"]){
						var hover_data={};
						$(this)
						.on("mouseover",hover_data,self.on_video_url_mouseover)
						.on("mouseout",hover_data,self.on_video_url_mouseout);
					}
				}
			});
		}
		else{
			var links_found=false;
			if(script.settings["inline"]["url_hijack"]){
				post_data.post.find("a").each(function(index){
					var href=html_to_text(string_remove_tags($(this).html()));
					if(href==$(this).attr("href")){
						$(this).addClass("MPReplacedURL");
						links_found=true;
					}
				});
			}
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
							(name=="s")
						)return(script.settings["inline"]["url_replace_smart"]?2:1);
						if(name=="wbr")return 2;
					}
					return 0;
				},
				this.replace_urls
			)||links_found;
			if(links_found){
				post_data.post.find(".MPReplacedURL").each(function(index){
					var temp=E("span").addClass("MPReplacedURLContainer");
					$(this).after(temp);
					temp.append($(this));
					var href=html_to_text(string_remove_tags($(this).html()));
					if(href.indexOf(":")<0)href="//"+href;
					var video_type=null;
					var video_id=null;
					var icon_class="";
					var api_url="";
					var temp_prefix="";
					var xml_parse=null;
					var xml_vid_info=null;
					if((video_id=MediaPlayer.prototype.url_get_youtube_video_id(href))!==null){
						video_type="youtube";
						temp_prefix="Youtube: ";
						icon_class="MPURLIconYoutube";
						api_url="//gdata.youtube.com/feeds/api/videos/"+video_id;
						xml_parse=self.parse_xml_youtube;
					}
					else if((video_id=MediaPlayer.prototype.url_get_vimeo_video_id(href))!==null){
						video_type="vimeo";
						temp_prefix="Vimeo: ";
						icon_class="MPURLIconVimeo";
						api_url="//vimeo.com/api/v2/video/"+video_id+".xml";
						xml_parse=self.parse_xml_vimeo;
					}
					if(video_type!==null){
						$(this)
						.attr("mp_video_type",video_type)
						.attr("mp_video_id",video_id)
						.html(
							$(document.createElement("div")).addClass("MPURLIcon "+icon_class)
						)
						.append(
							E("span").addClass("MPIconedURLText").html(temp_prefix+video_id)
						);
						ajax_get(
							api_url,
							true,
							{"link":$(this)},
							null,
							function(okay,data,response){
								if(okay){
									var results=self.parse_xml_init();
									var xml=$.parseXML(response);
									xml_parse(xml,results);
									data.link.find(".MPIconedURLText").html(results.title);
									data.link
									.attr("mp_video_cache_title",results.title)
									.attr("mp_video_cache_duration",results.duration.toString())
									.off("click")
									.on("click",{
										"post_data":post_data,
										"video_type":video_type,
										"video_id":video_id,
										"video_cache":{
											"title":results.title,
											"duration":results.duration
										},
										"url":href
									},self.on_url_click);
									if(script.settings["inline"]["video_preview"]){
										results.start=/[\!\#\?\&]t=[0-9smh]+/.exec(href);
										results.start=(results.start?MediaPlayer.prototype.youtube_time_to_number(results.start[0].substr(3,results.start[0].length-3)):0.0);
										var hover_data={};
										data.link
										.after(
											self.attributeify(
												E("span").addClass("MPVideoInfo"),
												results
											)
										)
										.on("mouseover",hover_data,self.on_video_url_mouseover)
										.on("mouseout",hover_data,self.on_video_url_mouseout);
									}
								}
								else{
									data.link.find(".MPIconedURLText")
									.addClass("MPIconedURLTextNotFound")
									.html(temp_prefix+"Video not found");
								}
							}
						);
					}
					$(this)
					.attr("href",href)
					.attr("target","_blank")
					.attr("mp_original_url",href)
					.on("click",{"post_data":post_data,"video_type":video_type,"video_id":video_id,"video_cache":null,"url":href},self.on_url_click);
				});
			}
		}
	},
	parse_xml_init:function(){
		return{
			title:"Unknown Title",
			description:"",
			duration:0.0,
			thumbnails:[],
			views:0,
			rating:1.0,
			raters:0,
		};
	},
	parse_xml_youtube:function(xml,results){
		var elem=xml_find_nodes_by_name(xml,"yt:duration");
		if(elem.length>0){
			results.duration=elem[0].getAttribute("seconds");
			results.duration=parseFloat(results.duration);
			results.duration=(isFinite(results.duration)?results.duration:0.0);
		}
		elem=xml_find_nodes_by_name(xml,"title");
		if(elem.length>0){
			results.title=text_to_html($(elem[0]).text());
		}
		elem=xml_find_nodes_by_name(xml,"content");
		if(elem.length>0){
			results.description=text_to_html($(elem[0]).text());
		}
		elem=xml_find_nodes_by_name(xml,"media:thumbnail");
		for(var i=0;i<elem.length;++i){
			results.thumbnails.push({
				"url":elem[i].getAttribute("url"),
				"width":parseInt(elem[i].getAttribute("width")),
				"height":parseInt(elem[i].getAttribute("height"))
			});
		}
		elem=xml_find_nodes_by_name(xml,"yt:statistics");
		if(elem.length>0){
			results.views=parseInt(elem[0].getAttribute("viewCount"));
		}
		elem=xml_find_nodes_by_name(xml,"gd:rating");
		if(elem.length>0){
			var m=parseFloat(elem[0].getAttribute("min"));
			results.raters=parseInt(elem[0].getAttribute("numRaters"))||0;
			results.rating=((parseFloat(elem[0].getAttribute("average"))-m)/(elem[0].getAttribute("max")-m))||0;
		}
	},
	parse_xml_vimeo:function(xml,results){
		var elem=xml_find_nodes_by_name(xml,"duration");
		if(elem.length>0){
			results.duration=$(elem[0]).text();
			results.duration=parseFloat(results.duration);
			results.duration=isFinite(results.duration)?results.duration:0.0;
		}
		elem=xml_find_nodes_by_name(xml,"title");
		if(elem.length>0){
			results.title=text_to_html($(elem[0]).text());
		}
		elem=xml_find_nodes_by_name(xml,"description");
		if(elem.length>0){
			results.description=text_to_html($(elem[0]).text().replace(/\<br\s*\/?\>/g,"\n"));
		}
		var w=xml_find_nodes_by_name(xml,"width");
		var h=xml_find_nodes_by_name(xml,"height");
		w=(w.length>0?parseInt($(w[0]).text()):1);
		h=(h.length>0?parseInt($(h[0]).text()):1);
		elem=xml_find_nodes_by_name(xml,"thumbnail_large");
		if(elem.length>0){
			results.thumbnails.push({
				"url":$(elem[0]).text(),
				"width":w,
				"height":h
			});
		}
		elem=xml_find_nodes_by_name(xml,"stats_number_of_plays");
		if(elem.length>0){
			results.views=parseInt($(elem[0]).text());
		}
	},
	attributeify:function(element,attributes,prefix){
		prefix=prefix||"";
		for(var key in attributes){
			element.attr(key,JSON.stringify(attributes[key]));
		}
		return element;
	},
	commaify_number:function(number){
		return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",");
	},
	update_about_image:function(post_data){
		post_data.sounds.about_container.css("display","");
		var sound_count=0;
		var file_count=post_data.sounds.sound_names.length;
		var display_count=0;
		var container=post_data.sounds.about_list_container;
		container.html("");
		for(var sound=true;;sound=false){
			for(var i=0;i<post_data.sounds.sound_names.length;++i){
				var is_sound=(post_data.sounds.sound_names[i].split(".").pop().toLowerCase()=="ogg");
				if(sound==is_sound){
					if(display_count++==2&&file_count>3){
						container.append(
							(container=post_data.sounds.about_list_container_inner=E("div"))
							.css("display","none")
						)
						.append(
							(post_data.sounds.about_list_container_toggler=E("a"))
							.attr("href","#")
							.css("font-style","italic")
						);
						var label="And "+file_count+" more...";
						var hide="Hide "+file_count+" files";
						post_data.sounds.about_list_container_toggler
						.html(label)
						.on(
							"click",{"container":container,"label":label,"hide":hide},function(event){
								if(container.css("display")=="none"){
									container.css("display","");
									$(this).html(hide);
								}
								else{
									container.css("display","none");
									$(this).html(label);
								}
								return false;
							}
						);
					}
					if(sound){
						if(is_sound)++sound_count;
						container.append(
							E("div")
							.append(T("- "))
							.append(
								E("a")
								.attr("href","#")
								.addClass("MPLoadLinkTop")
								.html(text_to_html(post_data.sounds.sound_names[i].substr(0,post_data.sounds.sound_names[i].length-4)))
								.on("click",{"post_data":post_data,"sound_id":i},this.on_link_top_click)
							)
						);
					}
					else{
						container.append(
							E("div")
							.append(T("- "))
							.append(
								E("span")
								.addClass("MPLoadLinkTopFile")
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
	},
	activate_load_all_link:function(link,post_data,done_callback){
		link=link||post_data.sounds.load_all_link;
		var load_str="loading";
		link.html(load_str);
		var self=this;
		post_data.sounds.loaded=true;
		media_player_manager.open_player(true);
		media_player_manager.media_player.attempt_load(
			post_data.image_url,
			MediaPlayer.ALL_SOUNDS,
			{"image_name":post_data.image_name},
			{
				"link":link,
				"post_data":post_data,
				"load_str":load_str
			},
			function(event,data){
				var progress=Math.floor((event.loaded/event.total)*100);
				data.link.html(data.load_str+" ("+progress+")");
			},
			function(okay,data){
				data.link.html(
					data.post_data.sounds.load_all_text+(okay?"":" (ajax&nbsp;error)")
				);
				if(!okay){
					if(typeof(done_callback)=="function")done_callback(false,data.post_data);
				}
			},
			function(status,data,all_files){
				if(all_files!==null&&data.post_data.sounds.sound_names.length==0&&all_files.length>0){
					data.post_data.sounds.sound_names=all_files;
					self.update_about_image(data.post_data);
				}
				if(typeof(done_callback)=="function")done_callback(false,data.post_data);
			}
		);
		return false;
	},
	replace_urls:function(tags){
		var full_text="";
		var in_url=false;
		var any_found=false;
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
				full_text+=$("<div>").append(tags[i].clone()).html();
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
	},
	replace_tags:function(tags){
		var sounds_found=false;
		var new_text=text_to_html(tags[0].text()).replace(/\[.+?\]/g,function(match){
			sounds_found=true;
			return"[<a class=\"MPLoadLink\">"+match.substr(1,match.length-2)+"</a>]";
		});
		if(sounds_found){
			if(tags[0].prop("tagName")){
				tags[0].html(new_text);
			}
			else{
				tags[0].after(new_text).remove();
			}
			return true;
		}
		return false;
	},
	enable_update:function(url){
		this.settings_update_link
		.css("display","")
		.attr("href",url);
		if(!is_archive){
			this.nav_link.addClass("quotelink");
		}
	},
	position_relative:function(parent,obj,offset,flippable){
		offset=offset||[0,0];
		flippable=flippable||[true,true];
		var scroll=[$(document).scrollLeft(),$(document).scrollTop()];
		var win_size=[$(window).width(),$(window).height()];
		var obj_size=[obj.outerWidth(),obj.outerHeight()];
		var par_size=[parent.width(),parent.height()];
		var off=parent.offset();
		var pos=[0,0],pos_label=["left","top"],pos2;
		var ret=[true,true];
		off=[off.left,off.top];
		if(
			(pos[1]=off[1]+offset[1]+par_size[1])+obj_size[1]-scroll[1]>win_size[1]&&
			(pos2=off[1]-offset[1]-obj_size[1])>scroll[1]&&
			flippable[1]
		){
			pos[1]=pos2;
			ret[1]=false;
		}
		if(
			(pos[0]=(off[0]+offset[0]))+obj_size[0]/2>win_size[0]/2&&
			flippable[0]
		){
			obj.css("left","auto");
			pos_label[0]="right";
			pos[0]=win_size[0]-(off[0]+par_size[0]);
			ret[0]=false;
		}
		obj.css(pos_label[0],pos[0]+"px");
		obj.css(pos_label[1],pos[1]+"px");
		return ret;
	},
	on_content_drag:function(data){
		var url_lower=data.text.split("#")[0];
		if(url_lower.substr(0,2)=="//")url_lower=window.location.protocol+url_lower;
		else if(url_lower.indexOf(":")<0)url_lower=window.location.protocol+"//"+url_lower;
		if(url_lower){
			for(var post_id in thread_manager.posts){
				if(thread_manager.posts[post_id].image_url){
					var u=thread_manager.posts[post_id].image_url.split("#")[0];
					if(u.substr(0,2)=="//")u=window.location.protocol+u;
					else if(u.indexOf(":")<0)u=window.location.protocol+"//"+u;
					if(url_lower==u){
						this.activate_load_all_link(null,thread_manager.posts[post_id]);
						data.text="";
						return false;
					}
				}
			}
		}
		return true;
	},
	on_url_click:function(event){
		if(event.which==1){
			if(event.data.video_type){
				media_player_manager.open_player(true);
				var fn;
				var cache;
				if(event.data.video_type==="youtube"){
					fn=media_player_manager.media_player.attempt_load_ytvideo_video;
					cache="youtubevideo_cache";
				}
				else{
					fn=media_player_manager.media_player.attempt_load_vimeo_video;
					cache="vimeovideo_cache";
				}
				var pl_data={};
				if(event.data.video_cache)pl_data[cache]=event.data.video_cache;
				fn.call(
					media_player_manager.media_player,
					event.data.url,
					null,
					pl_data,
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
		return true;
	},
	on_link_click:function(event){
		var load_str="loading...";
		$(this).html(load_str);
		var self=event.data.manager;
		event.data.post_data.sounds.loaded=true;
		media_player_manager.open_player(true);
		media_player_manager.media_player.attempt_load(
			event.data.post_data.image_url,
			event.data.post_data.sounds.post_tags[event.data.tag_id],
			{"image_name":event.data.post_data.image_name},
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
					self.update_about_image(data.post_data);
				}
			}
		);
		return false;
	},
	on_link_top_click:function(event){
		var load_str="loading...";
		$(this).html(load_str);
		var tag=event.data.post_data.sounds.sound_names[event.data.sound_id];
		if(tag.substr(tag.length-4,4).toLowerCase()==".ogg"){
			tag=tag.substr(0,tag.length-4);
		}
		var self=this;
		event.data.post_data.sounds.loaded=true;
		media_player_manager.open_player(true);
		media_player_manager.media_player.attempt_load(
			event.data.post_data.image_url,
			tag,
			{"image_name":event.data.post_data.image_name},
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
					self.update_about_image(data.post_data);
				}
			}
		);
		return false;
	},
	on_load_all_click:function(event){
		event.data.manager.activate_load_all_link($(this),event.data.post_data);
		return false;
	},
	on_detect_all_in_thread_click:function(event){
		if(sound_auto_checker.enabled){
			sound_auto_checker.disable();
		}
		else{
			sound_auto_checker.enable();
		}
		return false;
	},
	on_load_all_in_thread_click:function(event){
		if(sound_auto_loader.enabled){
			sound_auto_loader.disable();
		}
		else{
			sound_auto_loader.enable();
		}
		return false;
	},
	on_menu_link_click:function(link,event){
		if(event.which==1){
			this.settings_manager.menu_open(link.parent());
			return false;
		}
		return true;
	},
	on_video_url_descr_open_timeout:function(event){
		event.data.description_timeout=null;
		var desc=event.data.display_container.find(".MPVideoInfoDisplayDescription");
		if(script.settings["inline"]["video_preview_animate_description"]>0){
			desc.animate({
				"width":script.settings["inline"]["video_preview_image_space"]
			},{
				duration:script.settings["inline"]["video_preview_animate_description"]*1000,
			});
		}
		else{
			desc.css("width",script.settings["inline"]["video_preview_image_space"]+"px");
		}
	},
	on_video_url_timeout:function(event){
		event.data.timeout=null;
		if(!event.data.display_container){
			var container;
			var max_size=script.settings["inline"]["video_preview_image_space"];
			$("body").append(
				(event.data.display_container=E("div"))
				.css("opacity","0")
				.addClass("MPVideoInfoDisplay")
				.addClass(is_archive?"post_wrapper":"reply")
				.append(
					(container=E("div"))
					.addClass("MPVideoInfoDisplayContainer")
				)
			);
			var info;
			if(!(info=$(this).parent().find(".MPVideoInfo")).length>0)return;
			var c,value=parseInt(info.attr("duration"))||0;
			container.append(
				(c=E("div"))
				.addClass("MPVideoInfoDisplayTitle")
				.html("Duration: "+MediaPlayer.prototype.duration_to_string(value))
			);
			value=parseInt(info.attr("start"))||0;
			if(value>0){
				c.append(
					E("span")
					.addClass("MPVideoInfoDisplayTitleStart")
					.html(" @"+MediaPlayer.prototype.duration_to_string(value))
				);
			}
			value=parseInt(info.attr("views"));
			c.prepend(
				E("div")
				.addClass("MPVideoInfoDisplayTitleViews")
				.html(
					InlineManager.prototype.commaify_number(value)+" view"+(value===1?"":"s")
				)
			)
			.append(E("div").addClass("MPVideoInfoDisplayTitleEnd"));
			var content_container,preview_container;
			container.append(
				(content_container=E("div"))
				.addClass("MPVideoInfoDisplayContent")
				.append(
					(preview_container=E("div"))
					.addClass("MPVideoInfoDisplayPreview")
				)
			);
			var raters=parseInt(info.attr("raters"))||0;
			var ex_class="";
			if(raters>0){
				preview_container.append(
					E("div")
					.addClass("MPVideoInfoDisplayRatingBg")
					.append(
						E("div")
						.addClass("MPVideoInfoDisplayRatingGood")
						.css("width",((parseFloat(info.attr("rating"))||0)*100)+"%")
					)
				);
			}
			else{
				ex_class=" MPVideoInfoDisplayThumbnailContainerOuterTop";
			}
			var thumbs=JSON.parse(info.attr("thumbnails"));
			if(thumbs.length>0){
				var w=thumbs[0].width;
				var h=thumbs[0].height;
				var scale=Math.min(max_size/w,max_size/h);
				w*=scale;
				h*=scale;
				var h_space=max_size-h;
				var thumb_container;
				preview_container.append(
					E("div")
					.addClass("MPVideoInfoDisplayThumbnailContainerOuter"+ex_class)
					.append(
						(thumb_container=E("div"))
						.addClass("MPVideoInfoDisplayThumbnailContainer")
					)
				);
				for(var i=0;true;){
					thumb_container.append(
						E("div")
						.addClass("MPVideoInfoDisplayThumbnail"+(i==0?"First":""))
						.css({
							"width":w+"px",
							"height":h+"px",
							"background-size":w+"px "+h+"px",
							"background-image":"url("+thumbs[i].url+")"
						})
					);
					if(++i>=thumbs.length)break;
					w=thumbs[i].width;
					h=thumbs[i].height;
					scale=h_space/h;
					w*=scale;
					h*=scale;
				}
			}
			var height=content_container.outerHeight();
			var descr=JSON.parse(info.attr("description")).replace(/\n/g,"</p><p>");
			if(descr.length>0){
				content_container.append(
					E("div")
					.addClass("MPVideoInfoDisplayDescription")
					.css({
						"width":0+"px",
						"height":height+"px",
						"font-size":script.settings["inline"]["video_preview_description_font_size"]+"em",
						"line-height":"normal"
					})
					.append(
						E("div")
						.addClass("MPVideoInfoDisplayDescriptionInner")
						.css("width",max_size+"px")
						.html("<p>"+descr+"</p>")
					)
				);
			}
			event.data.display_container.css("opacity","");
		}
		if(event.data.display_container){
			var desc=event.data.display_container.find(".MPVideoInfoDisplayDescription");
			if(desc.length>0){
				desc.css("width","0px").stop(true,true);
			}
			event.data.display_container.stop(true);
			if(script.settings["inline"]["video_preview_animate_open"]>0){
				event.data.display_container
				.css("opacity",0.0)
				.animate({
					"opacity":1.0
				},{
					duration:script.settings["inline"]["video_preview_animate_open"]*1000,
					complete:function(){$(this).css("opacity","");}
				});
			}
			else{
				event.data.display_container.css("opacity","");
			}
			event.data.display_container.removeClass("MPVideoInfoDisplayHidden");
			if(desc.length>0&&script.settings["inline"]["video_preview_description_timeout"]>=0){
				var self=this;
				event.data.description_timeout=setTimeout(function(){
					InlineManager.prototype.on_video_url_descr_open_timeout.call(self,event);
				},script.settings["inline"]["video_preview_description_timeout"]*1000);
			}
			InlineManager.prototype.position_relative($(this),event.data.display_container,[0,2]);
		}
	},
	on_video_url_mouseover:function(event){
		if(script.settings["inline"]["video_preview"]){
			var self=this;
			if(!event.data.timeout&&event.data.timeout!==0){
				event.data.timeout=setTimeout(function(){
					InlineManager.prototype.on_video_url_timeout.call(self,event);
				},script.settings["inline"]["video_preview_timeout"]*1000);
			}
		}
	},
	on_video_url_mouseout:function(event){
		if(event.data.timeout||event.data.timeout===0){
			clearTimeout(event.data.timeout);
			event.data.timeout=null;
		}
		if(event.data.description_timeout||event.data.description_timeout===0){
			clearTimeout(event.data.description_timeout);
			event.data.description_timeout=null;
		}
		if(event.data.display_container){
			event.data.display_container.stop(true);
			if(script.settings["inline"]["video_preview_animate_close"]>0){
				event.data.display_container
				.animate({
					"opacity":0.0
				},{
					duration:script.settings["inline"]["video_preview_animate_close"]*1000,
					complete:function(){$(this).css("opacity","").addClass("MPVideoInfoDisplayHidden");}
				});
			}
			else{
				event.data.display_container.addClass("MPVideoInfoDisplayHidden");
			}
		}
	},
};
var inline_manager=null;
function SoundAutoLoader(){
	this.looping=false;
	this.timer=null;
	this.delay=500;
	this.queue=new Array();
	this.serial=true;
	this.enabled=false;
	this.link=null;
}
SoundAutoLoader.prototype={
	constructor:SoundAutoLoader,
	add_to_queue:function(post_data){
		post_data.loaded=true;
		this.queue.push(post_data);
		this.loop();
	},
	enable:function(){
		if(!this.enabled){
			this.link.removeAttr("href");
			this.link.html("Loading All Sounds");
			this.enabled=true;
			this.loop();
		}
	},
	disable:function(){
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
	},
	loop:function(){
		if(!this.enabled||this.looping)return;
		this.looping=true;
		this.loop_next();
	},
	loop_next:function(){
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
	},
	load_single:function(post_data){
		var self=this;
		inline_manager.activate_load_all_link(null,post_data,function(okay,post_data){
			self.load_single_done();
		});
	},
	load_single_done:function(){
		var self=this;
		this.timer=setTimeout(function(){
			self.timer=null;
			self.loop_next();
		},this.delay);
	}
};
var sound_auto_loader=null;
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
SoundAutoChecker.prototype={
	constructor:SoundAutoChecker,
	add_to_queue:function(post_data){
		post_data.loaded=true;
		this.queue.push(post_data);
		this.loop();
	},
	enable:function(){
		if(!this.enabled){
			for(var i=0;i<this.queue.length;++i){
				this.queue[i].sounds.auto_check.search_span.css("display","");
			}
			this.link.removeAttr("href");
			this.link.html("Detecting Sounds");
			this.enabled=true;
			this.loop();
		}
	},
	disable:function(){
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
	},
	loop:function(){
		if(!this.enabled||this.looping)return;
		this.looping=true;
		this.loop_next();
	},
	loop_next:function(){
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
	},
	load_single:function(post_data){
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
	},
	load_single_callbacks:function(post_data,callback_id,response){
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
						inline_manager.update_about_image(post_data);
						post_data.sounds.auto_check.search_span.css("display","none");
						self.load_single_done();
					}
				}
			);
		}
	},
	load_single_done:function(){
		var self=this;
		this.timer=setTimeout(function(){
			self.timer=null;
			self.loop_next();
		},this.delay);
	}
};
var sound_auto_checker=null;
function HotkeyListener(){
	this.keycode_names={
		8:"BACKSPACE",
		9:"TAB",
		13:"ENTER",
		18:"ESCAPE",
		20:"CAPS LOCK",
		32:"MPACE",
		33:"PAGE UP",
		34:"PAGE DOWN",
		35:"END",
		36:"HOME",
		37:"LEFT",
		38:"UP",
		39:"RIGHT",
		40:"DOWN",
		112:"F1",
		113:"F2",
		114:"F3",
		115:"F4",
		116:"F5",
		117:"F6",
		118:"F7",
		119:"F8",
		120:"F9",
		121:"F10",
		122:"F11",
		123:"F12",
		173:"-",
		192:"`",
		219:"[",
		220:"\\",
		221:"]",
		222:"'",
		188:"<",
		190:">",
		191:"/",
	};
	this.hotkeys=[
		["player_open",this.on_player_open,"Open Player"],
		["player_close",this.on_player_close,"Close Player"],
		["player_minmax",this.on_player_minmax,"Min/Max Player"],
		["playlist_play",this.on_playlist_play,"Play/Pause"],
		["playlist_next",this.on_playlist_next,"Next"],
		["playlist_previous",this.on_playlist_previous,"Previous"],
		["volume_up",this.on_volume_up,"Volume Up"],
		["volume_down",this.on_volume_down,"Volume Down"],
	];
	$(window)
	.off("keydown.HotkeyListener")
	.on("keydown.HotkeyListener",{self:this},function(event){
		if(!(event.which>=16&&event.which<=18)){
			var flags=(event.shiftKey?1:0)|(event.ctrlKey?2:0)|(event.altKey?4:0);
			var t=$(document.activeElement).prop("tagName").toLowerCase();
			if(t!=="input"&&t!=="textarea"){
				for(var i=0;i<event.data.self.hotkeys.length;++i){
					var k=event.data.self.hotkeys[i][0];
					if(
						script.settings["hotkeys"][k][0]!=0&&
						script.settings["hotkeys"][k][0]==event.which&&
						script.settings["hotkeys"][k][1]==flags
					){
						event.data.self.hotkeys[i][1].call(event.data.self);
						return false;
					}
				}
			}
		}
		return true;
	});
}
HotkeyListener.prototype={
	constructor:HotkeyListener,
	settings_update:function(){
		for(var i=0;i<this.hotkeys.length;++i){
			script.settings["hotkeys"][this.hotkeys[i][0]]=[0,0];
		}
	},
	key_to_string:function(keycode,modifiers){
		var str="";
		if((modifiers&1)!=0)str+="Shift";
		if((modifiers&2)!=0)str+=(str.length>0?" + ":"")+"Ctrl";
		if((modifiers&4)!=0)str+=(str.length>0?" + ":"")+"Alt";
		if(keycode!=0)str+=(str.length>0?" + ":"")+(
			keycode in this.keycode_names?
			this.keycode_names[keycode]:
			(keycode>=127||keycode<32?keycode:String.fromCharCode(keycode))
		);
		return str;
	},
	create_hotkey_setting:function(hotkey_label,hotkey_name){
		var hotkey_settings={
			"section":"Hotkeys",
			"label":hotkey_label,
			"html":null,
			"html_input":null,
			"html_input_clear":null,
			"value":"",
			"value_code":script.settings["hotkeys"][hotkey_name][0],
			"value_modifiers":script.settings["hotkeys"][hotkey_name][1],
			"value_modifiers_current":0,
			"update_value":null,
			"listener":this
		};
		hotkey_settings.update_value=function(hotkey_settings){
			hotkey_settings.value=hotkey_settings.listener.key_to_string(
				hotkey_settings.value_code,hotkey_settings.value_modifiers
			);
			hotkey_settings.html_input.val(hotkey_settings.value);
		};
		(hotkey_settings.html=E("div"))
		.append(
			E("div")
			.addClass("MPSettingsTextboxContainer")
			.append(
				(hotkey_settings.html_input=E("input"))
				.addClass("MPSettingsTextbox")
				.attr("type","text")
				.val(hotkey_settings.value)
			)
			.append(
				E("div")
				.addClass("MPSettingsTextboxLinkContainer")
				.append(
					(hotkey_settings.html_input_clear=E("a"))
					.attr("href","#")
					.html("Clear")
				)
			)
		);
		hotkey_settings.update_value(hotkey_settings);
		hotkey_settings.html_input_clear.on("click",{"hotkey_settings":hotkey_settings,"hotkey_name":hotkey_name},function(event){
			event.data.hotkey_settings.value_code=0;
			event.data.hotkey_settings.value_modifiers=0;
			event.data.hotkey_settings.value_modifiers_current=0;
			event.data.hotkey_settings.update_value(event.data.hotkey_settings);
			script.settings["hotkeys"][event.data.hotkey_name][0]=event.data.hotkey_settings.value_code;
			script.settings["hotkeys"][event.data.hotkey_name][1]=event.data.hotkey_settings.value_modifiers;
			script.settings_save();
			return false;
		});
		hotkey_settings.html_input.on("keydown",{"hotkey_settings":hotkey_settings,"hotkey_name":hotkey_name},function(event){
			event.data.hotkey_settings.value_modifiers_current=(event.shiftKey?1:0)|(event.ctrlKey?2:0)|(event.altKey?4:0);
			event.data.hotkey_settings.value_modifiers=event.data.hotkey_settings.value_modifiers_current;
			if(event.which>=16&&event.which<=18){
				event.data.hotkey_settings.value_code=0;
			}
			else{
				event.data.hotkey_settings.value_code=event.which;
			}
			event.data.hotkey_settings.update_value(event.data.hotkey_settings);
			return false;
		})
		.on("keyup",{"hotkey_settings":hotkey_settings,"hotkey_name":hotkey_name},function(event){
			if(event.which>=16&&event.which<=18){
				var v=1<<(event.which-16);
				event.data.hotkey_settings.value_modifiers_current&=~v;
				event.data.hotkey_settings.update_value(event.data.hotkey_settings);
			}
			return false;
		})
		.on("blur",{"hotkey_settings":hotkey_settings,"hotkey_name":hotkey_name},function(event){
			if(event.data.hotkey_settings.value_code==0){
				event.data.hotkey_settings.value_modifiers=0;
			}
			event.data.hotkey_settings.update_value(event.data.hotkey_settings);
			script.settings["hotkeys"][event.data.hotkey_name][0]=event.data.hotkey_settings.value_code;
			script.settings["hotkeys"][event.data.hotkey_name][1]=event.data.hotkey_settings.value_modifiers;
			script.settings_save();
		})
		.on("focus",{"hotkey_settings":hotkey_settings,"hotkey_name":hotkey_name},function(event){
			event.data.hotkey_settings.value_modifiers_current=0;
		});
		return hotkey_settings;
	},
	on_player_open:function(){
		media_player_manager.open_player(true);
	},
	on_player_close:function(){
		if(media_player_manager.media_player!==null){
			media_player_manager.media_player.destructor();
			media_player_manager.media_player=null;
		}
	},
	on_player_minmax:function(){
		if(media_player_manager.media_player!==null){
			if(media_player_manager.media_player.is_maximized()){
				media_player_manager.media_player.minimize();
			}
			else{
				media_player_manager.media_player.maximize();
			}
		}
	},
	on_playlist_play:function(){
		if(media_player_manager.media_player!==null){
			if(media_player_manager.media_player.is_paused()){
				media_player_manager.media_player.play();
			}
			else{
				media_player_manager.media_player.pause();
			}
		}
	},
	on_playlist_next:function(){
		if(media_player_manager.media_player!==null){
			media_player_manager.media_player.next(false);
		}
	},
	on_playlist_previous:function(){
		if(media_player_manager.media_player!==null){
			media_player_manager.media_player.previous();
		}
	},
	on_volume_up:function(){
		if(media_player_manager.media_player!==null){
			media_player_manager.media_player.set_volume(media_player_manager.media_player.get_volume()+0.05);
		}
	},
	on_volume_down:function(){
		if(media_player_manager.media_player!==null){
			media_player_manager.media_player.set_volume(media_player_manager.media_player.get_volume()-0.05);
		}
	}
};
var hotkey_listener=null;
function MediaPlayerManager(){
	this.media_player=null;
	this.css_color_presets={
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
	this.css_size_presets={
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
}
MediaPlayerManager.prototype={
	constructor:MediaPlayerManager,
	media_player_destruct_callback:function(media_player){
		script.settings_save();
		this.media_player=null;
	},
	open_player:function(load_settings){
		if(this.media_player!=null){
			this.media_player.focus();
			return this.media_player;
		}
		var media_player_css=new MediaPlayerCSS("yotsubab",this.css_color_presets,this.css_size_presets);
		if(load_settings)media_player_css.load(script.settings["style"]);
		var extra_options=[];
		var self=this;
		this.media_player=new MediaPlayer(
			media_player_css,
			[png_load_callback,image_load_callback],
			function(data){inline_manager.on_content_drag(data);},
			function(media_player){script.settings_save();},
			function(media_player){self.media_player_destruct_callback(media_player);},
			extra_options
		);
		if(load_settings)this.media_player.load(script.settings["player"]);
		this.media_player.create();
		return this.media_player;
	}
};
var media_player_manager=null;
function Script(){
	this.settings_loaded=false;
	this.settings={
		"player":{},
		"style":{},
		"script":{
			"last_update":0,
			"update_found":false,
			"update_version":"",
			"current_version":"",
			"update_message":""
		},
		"hotkeys":{},
		"inline":{
			"url_replace":true,
			"url_replace_smart":false,
			"url_hijack":true,
			"video_preview":true,
			"video_preview_timeout":0.5,
			"video_preview_image_space":240,
			"video_preview_description_font_size":0.8,
			"video_preview_description_timeout":0.5,
			"video_preview_animate_open":0.375,
			"video_preview_animate_close":0.375,
			"video_preview_animate_description":0.375,
		}
	};
	this.storage_name="4cs";
	this.update_version_url="http://dnsev.github.com/4cs/changelog.txt";
	this.update_url="https://raw.github.com/dnsev/4cs/master/web/4cs.dev.user.js";
	try{
		this.update_url=GM_getMetadata("downloadURL").toString();
	}
	catch(e){
		try{
			var m=/\/\/\s*@downloadURL\s+(.+)/.exec(GM_info.scriptMetaStr);
			if(m){
				this.update_url=m[1].trim();
			}
		}
		catch(e){
			this.update_url="https://raw.github.com/dnsev/4cs/master/web/4cs.user.js";
		}
	}
}
Script.prototype={
	constructor:Script,
	settings_save:function(){
		if(media_player_manager.media_player!=null){
			this.settings["player"]=media_player_manager.media_player.save();
			this.settings["style"]=media_player_manager.media_player.css.save();
		}
		try{
			GM_setValue(this.storage_name,JSON.stringify(this.settings));
		}
		catch(e){
			console.log(e);
		}
	},
	settings_load:function(){
		if(!this.settings_loaded){
			this.settings_loaded=true;
			try{
				var s=GM_getValue(this.storage_name);
				if(s){
					s=JSON.parse(s);
					for(var key in this.settings){
						if(key in s){
							var len=0;
							for(var key2 in this.settings[key]){
								++len;
								if(key2 in s[key])this.settings[key][key2]=s[key][key2];
							}
							if(len==0){
								this.settings[key]=s[key];
							}
						}
					}
				}
			}
			catch(e){
				console.log(e);
			}
		}
	},
	update_check_interval:function(time){
		var time_update;
		var version="";
		try{
			version=GM_info.script.version;
		}
		catch(e){
			try{
				version=GM_getMetadata("version").toString();
			}
			catch(e){
				version=null;
			}
		}
		if(
			version!==null&&(
				(time_update=((new Date()).getTime()-this.settings["script"]["last_update"]>=time))||
				(time_update=(version!=this.settings["script"]["current_version"]))||
				this.settings["script"]["update_found"]
			)
		){
			this.settings["script"]["current_version"]=version;
			this.update_check(time_update);
		}
	},
	update_check:function(ajax){
		var self=this;
		var fn=function(){
			inline_manager.enable_update(self.update_url);
		};
		if(ajax){
			ajax_get(
				this.update_version_url,
				true,
				{},
				null,
				function(okay,data,response){
					if(okay){
						var version;
						try{
							version=GM_info.script.version;
						}
						catch(e){
							try{
								version=GM_getMetadata("version").toString();
							}
							catch(e){
								version=null;
							}
						}
						if(version!==null){
							var log=self.parse_change_log(response);
							self.settings["script"]["update_version"]=log[0][0].toString();
							self.settings["script"]["last_update"]=(new Date()).getTime();
							self.settings["script"]["update_message"]="";
							self.settings["script"]["update_found"]=false;
							var current_version_split=version.toString().split(".");
							var new_version_split=self.settings["script"]["update_version"].split(".");
							var len=(new_version_split.length>current_version_split.length?new_version_split.length:current_version_split.length);
							for(var i=0;i<len;++i){
								if(
									(i<new_version_split.length?(parseInt(new_version_split[i])||0):0)>
									(i<current_version_split.length?(parseInt(current_version_split[i])||0):0)
								){
									var version_count=0;
									for(var k=0;k<log.length;++k){
										new_version_split=log[k][0].split(".");
										len=(new_version_split.length>current_version_split.length?new_version_split.length:current_version_split.length);
										for(i=0;i<len;++i){
											if(
												(i<new_version_split.length?(parseInt(new_version_split[i])||0):0)>
												(i<current_version_split.length?(parseInt(current_version_split[i])||0):0)
											){
												if(++version_count>5){
													self.settings["script"]["update_message"]+="...\n";
													i=len;
													break;
												}
												self.settings["script"]["update_message"]+=log[k][0]+"\n";
												for(i=1;i<log[k].length;++i){
													self.settings["script"]["update_message"]+="- "+log[k][i]+"\n";
												}
												i=-1;
												break;
											}
										}
										if(i>=len)break;
									}
									fn();
									self.settings["script"]["update_found"]=true;
									break;
								}
								else if(
									(i<new_version_split.length?(parseInt(new_version_split[i])||0):0)<
									(i<current_version_split.length?(parseInt(current_version_split[i])||0):0)
								){
									break;
								}
							}
							self.settings_save();
						}
					}
				}
			);
		}
		else{
			fn();
		}
	},
	parse_change_log:function(data){
		data=data.replace(/\r\n/g,"\n").split("\n\n");
		var log=[];
		for(var i=0;i<data.length;++i){
			data[i]=data[i].trim();
			if(data[i].length==0)continue;
			log.push([]);
			data[i]=data[i].split("\n");
			for(var j=0;j<data[i].length;++j){
				if(j==0){
					log[log.length-1].push(data[i][j]);
				}
				else{
					if(data[i][j][0]=="-"){
						log[log.length-1].push(data[i][j].substr(1).trim());
					}
					else{
						log[log.length-1][log[log.length-1].length-1]+="\n"+(data[i][j].substr(1).trim());
					}
				}
			}
		}
		return log;
	},
	on_update_click:function(event){
		if(event.which==1){
			var scr_name="";
			var scr_version="";
			try{
				scr_name=GM_info.script.name;
				scr_version=GM_info.script.version;
			}
			catch(e){
				scr_name="userscript.js";
				scr_version=GM_getMetadata("version").toString();
			}
			var s="An update is available to \""+scr_name+"\":\n\n"+
				"Current version: "+scr_version+"\n"+
				"Update Version: "+this.settings["script"]["update_version"]+"\n\n"+
				"Changes:\n"+this.settings["script"]["update_message"]+"\n\n"+
				"Middle click the link or copy and paste the following url:               ";
			prompt(s,this.update_url);
			return false;
		}
		return true;
	},
	setup_options:function(inline_manager){
		var extra_options=[
			{
				"section":"Link Replacement",
				"current":script.settings["inline"]["url_replace"],
				"label":"URL Replacing",
				"description":"Replace URLs in posts",
				"values":[true,false],
				"descr":["Enabled","Disabled"],
				"change":function(value){
					script.settings["inline"]["url_replace"]=value;
					script.settings_save();
				}
			},
			{
				"section":"Link Replacement",
				"current":script.settings["inline"]["url_replace_smart"],
				"label":"Extended URLs",
				"description":"Attempt to replace urls through spoilers",
				"values":[true,false],
				"descr":["Enabled","Disabled"],
				"change":function(value){
					script.settings["inline"]["url_replace_smart"]=value;
					script.settings_save();
				}
			},
			{
				"section":"Link Replacement",
				"current":script.settings["inline"]["url_hijack"],
				"label":"URL Hijacking",
				"description":"Take over URLs replaced by other scripts",
				"values":[true,false],
				"descr":["Enabled","Disabled"],
				"change":function(value){
					script.settings["inline"]["url_hijack"]=value;
					script.settings_save();
				}
			},
			{
				"section":"Video Links",
				"current":script.settings["inline"]["video_preview"],
				"label":"Hover Preview",
				"description":"When enabled, hovering a video link will display a preview image",
				"values":[true,false],
				"descr":["Enabled","Disabled"],
				"change":function(value){
					script.settings["inline"]["video_preview"]=value;
					script.settings_save();
				}
			},
			{
				"section":"Video Links",
				"current":script.settings["inline"]["video_preview_timeout"],
				"label":"Hover Time",
				"description":"How long you have to hover a link for the preview to appear",
				"values":[2.0,1.5,1.0,0.75,0.5,0.25,0.125,0.0],
				"descr":["2 seconds","1.5 seconds","1 second","0.75 seconds","0.5 seconds","0.25 seconds","0.125 seconds","instant"],
				"change":function(value){
					script.settings["inline"]["video_preview_timeout"]=value;
					script.settings_save();
				}
			},
			{
				"section":"Video Links",
				"current":script.settings["inline"]["video_preview_image_space"],
				"label":"Preview Size",
				"description":"Size to use for the preview image",
				"values":[480,320,240,120],
				"descr":["Huge (480px)","Large (320px)","Normal (240px)","Small (120px)"],
				"change":function(value){
					script.settings["inline"]["video_preview_image_space"]=value;
					script.settings_save();
				}
			},
			{
				"section":"Video Links",
				"current":script.settings["inline"]["video_preview_description_timeout"],
				"label":"Description Display",
				"description":"Time to wait to display the video description",
				"values":[5.0,4.0,3.0,2.0,1.0,0.75,0.5,0.375,0.25,0.125,0.0,-1],
				"descr":["5 seconds","4 seconds","3 seconds","2 seconds","1 second","0.75 seconds","0.5 seconds","0.375 seconds","0.25 seconds","0.125 seconds","instant","off"],
				"change":function(value){
					script.settings["inline"]["video_preview_description_timeout"]=value;
					script.settings_save();
				}
			},
			{
				"section":"Video Links",
				"current":script.settings["inline"]["video_preview_description_font_size"],
				"label":"Description Font Size",
				"description":"The scaling of the description text's font size",
				"values":[1.0,0.9,0.8,0.7,0.6,0.5],
				"descr":["normal","90%","80%","70%","60%","50%"],
				"change":function(value){
					script.settings["inline"]["video_preview_description_font_size"]=value;
					script.settings_save();
				}
			},
			{
				"section":"Video Links",
				"current":script.settings["inline"]["video_preview_animate_description"],
				"label":"Description Animation",
				"description":"Display the opening animation for the video description",
				"values":[1.0,0.75,0.5,0.375,0.25,0.125,0.0],
				"descr":["1 second","0.75 seconds","0.5 seconds","0.375 seconds","0.25 seconds","0.125 seconds","instant"],
				"change":function(value){
					script.settings["inline"]["video_preview_animate_description"]=value;
					script.settings_save();
				}
			},
			{
				"section":"Video Links",
				"current":script.settings["inline"]["video_preview_animate_open"],
				"label":"Opening Animation",
				"description":"Fade the preview window open",
				"values":[1.0,0.75,0.5,0.375,0.25,0.125,0.0],
				"descr":["1 second","0.75 seconds","0.5 seconds","0.375 seconds","0.25 seconds","0.125 seconds","instant"],
				"change":function(value){
					script.settings["inline"]["video_preview_animate_open"]=value;
					script.settings_save();
				}
			},
			{
				"section":"Video Links",
				"current":script.settings["inline"]["video_preview_animate_close"],
				"label":"Closing Animation",
				"description":"Fade the preview window closed",
				"values":[1.0,0.75,0.5,0.375,0.25,0.125,0.0],
				"descr":["1 second","0.75 seconds","0.5 seconds","0.375 seconds","0.25 seconds","0.125 seconds","instant"],
				"change":function(value){
					script.settings["inline"]["video_preview_animate_close"]=value;
					script.settings_save();
				}
			},
		];
		for(var i=0;i<hotkey_listener.hotkeys.length;++i){
			extra_options.push(
				hotkey_listener.create_hotkey_setting(hotkey_listener.hotkeys[i][2],
				hotkey_listener.hotkeys[i][0])
			);
		}
		for(var i=0;i<extra_options.length;++i){
			inline_manager.settings_manager.setting_add(extra_options[i]);
		}
	}
};
var script=null;
$(document).ready(function(){
	script=new Script();
	hotkey_listener=new HotkeyListener();
	hotkey_listener.settings_update();
	script.settings_load();
	media_player_manager=new MediaPlayerManager();
	sound_auto_loader=new SoundAutoLoader();
	sound_auto_checker=new SoundAutoChecker();
	inline_manager=new InlineManager();
	thread_manager=new ThreadManager();
	script.setup_options(inline_manager);
	window._unsafe_exec=function(){
		if(window._unsafe!==undefined){
			window._unsafe_return=window[window._unsafe.func].call(window,window._unsafe.data);
			window._unsafe.tag.parentNode.removeChild(window._unsafe.tag);
			window[window._unsafe.func]=undefined;
			window._unsafe=undefined;
		}
	}
	var tag=document.createElement("script");
	tag.innerHTML="window._unsafe_exec = "+window._unsafe_exec.toString()+";";
	document.body.appendChild(tag);
	window._unsafe_exec=function(exec_function,data){
		var tag=document.createElement("script");
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
	script.update_check_interval(1000*60*60*24);
});
