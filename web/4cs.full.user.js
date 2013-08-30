// ==UserScript==
// @name        4chan Media Player
// @version     4.7.3
// @namespace   dnsev
// @description Youtube, Vimeo, Soundcloud, Videncode, and Sounds playback + Sound uploading support
// @grant       GM_xmlhttpRequest
// @grant       GM_info
// @grant       GM_getValue
// @grant       GM_setValue
// @grant       GM_deleteValue
// @include     *://boards.4chan.org/*
// @include     *://archive.foolz.us/*
// @include     *://loveisover.me/*
// @include     *://boards.38chan.net/*
// @include     http://dnsev.github.io/4cs/*
// @icon        data:image/gif;base64,R0lGODlhEAAQAKECAAAAAGbMM////////yH5BAEKAAIALAAAAAAQABAAAAIllI+pB70KQgAPNUmroDHX7Gie95AkpCUn1ISlhKVR/MEre6dLAQA7
// @updateURL   https://raw.github.com/dnsev/4cs/master/web/4cs.full.meta.js
// @downloadURL https://raw.github.com/dnsev/4cs/master/web/4cs.full.user.js
// ==/UserScript==


////////////////////////////////////////////////////////////////////////////////
//{ jquery.js
////////////////////////////////////////////////////////////////////////////////
/*! jQuery v2.0.0 | (c) 2005, 2013 jQuery Foundation, Inc. | jquery.org/license
//@ sourceMappingURL=jquery.min.map
*/
(function(e,undefined){var t,n,r=typeof undefined,i=e.location,o=e.document,s=o.documentElement,a=e.jQuery,u=e.$,l={},c=[],f="2.0.0",p=c.concat,h=c.push,d=c.slice,g=c.indexOf,m=l.toString,y=l.hasOwnProperty,v=f.trim,x=function(e,n){return new x.fn.init(e,n,t)},b=/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,w=/\S+/g,T=/^(?:(<[\w\W]+>)[^>]*|#([\w-]*))$/,C=/^<(\w+)\s*\/?>(?:<\/\1>|)$/,k=/^-ms-/,N=/-([\da-z])/gi,E=function(e,t){return t.toUpperCase()},S=function(){o.removeEventListener("DOMContentLoaded",S,!1),e.removeEventListener("load",S,!1),x.ready()};x.fn=x.prototype={jquery:f,constructor:x,init:function(e,t,n){var r,i;if(!e)return this;if("string"==typeof e){if(r="<"===e.charAt(0)&&">"===e.charAt(e.length-1)&&e.length>=3?[null,e,null]:T.exec(e),!r||!r[1]&&t)return!t||t.jquery?(t||n).find(e):this.constructor(t).find(e);if(r[1]){if(t=t instanceof x?t[0]:t,x.merge(this,x.parseHTML(r[1],t&&t.nodeType?t.ownerDocument||t:o,!0)),C.test(r[1])&&x.isPlainObject(t))for(r in t)x.isFunction(this[r])?this[r](t[r]):this.attr(r,t[r]);return this}return i=o.getElementById(r[2]),i&&i.parentNode&&(this.length=1,this[0]=i),this.context=o,this.selector=e,this}return e.nodeType?(this.context=this[0]=e,this.length=1,this):x.isFunction(e)?n.ready(e):(e.selector!==undefined&&(this.selector=e.selector,this.context=e.context),x.makeArray(e,this))},selector:"",length:0,toArray:function(){return d.call(this)},get:function(e){return null==e?this.toArray():0>e?this[this.length+e]:this[e]},pushStack:function(e){var t=x.merge(this.constructor(),e);return t.prevObject=this,t.context=this.context,t},each:function(e,t){return x.each(this,e,t)},ready:function(e){return x.ready.promise().done(e),this},slice:function(){return this.pushStack(d.apply(this,arguments))},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},eq:function(e){var t=this.length,n=+e+(0>e?t:0);return this.pushStack(n>=0&&t>n?[this[n]]:[])},map:function(e){return this.pushStack(x.map(this,function(t,n){return e.call(t,n,t)}))},end:function(){return this.prevObject||this.constructor(null)},push:h,sort:[].sort,splice:[].splice},x.fn.init.prototype=x.fn,x.extend=x.fn.extend=function(){var e,t,n,r,i,o,s=arguments[0]||{},a=1,u=arguments.length,l=!1;for("boolean"==typeof s&&(l=s,s=arguments[1]||{},a=2),"object"==typeof s||x.isFunction(s)||(s={}),u===a&&(s=this,--a);u>a;a++)if(null!=(e=arguments[a]))for(t in e)n=s[t],r=e[t],s!==r&&(l&&r&&(x.isPlainObject(r)||(i=x.isArray(r)))?(i?(i=!1,o=n&&x.isArray(n)?n:[]):o=n&&x.isPlainObject(n)?n:{},s[t]=x.extend(l,o,r)):r!==undefined&&(s[t]=r));return s},x.extend({expando:"jQuery"+(f+Math.random()).replace(/\D/g,""),noConflict:function(t){return e.$===x&&(e.$=u),t&&e.jQuery===x&&(e.jQuery=a),x},isReady:!1,readyWait:1,holdReady:function(e){e?x.readyWait++:x.ready(!0)},ready:function(e){(e===!0?--x.readyWait:x.isReady)||(x.isReady=!0,e!==!0&&--x.readyWait>0||(n.resolveWith(o,[x]),x.fn.trigger&&x(o).trigger("ready").off("ready")))},isFunction:function(e){return"function"===x.type(e)},isArray:Array.isArray,isWindow:function(e){return null!=e&&e===e.window},isNumeric:function(e){return!isNaN(parseFloat(e))&&isFinite(e)},type:function(e){return null==e?e+"":"object"==typeof e||"function"==typeof e?l[m.call(e)]||"object":typeof e},isPlainObject:function(e){if("object"!==x.type(e)||e.nodeType||x.isWindow(e))return!1;try{if(e.constructor&&!y.call(e.constructor.prototype,"isPrototypeOf"))return!1}catch(t){return!1}return!0},isEmptyObject:function(e){var t;for(t in e)return!1;return!0},error:function(e){throw Error(e)},parseHTML:function(e,t,n){if(!e||"string"!=typeof e)return null;"boolean"==typeof t&&(n=t,t=!1),t=t||o;var r=C.exec(e),i=!n&&[];return r?[t.createElement(r[1])]:(r=x.buildFragment([e],t,i),i&&x(i).remove(),x.merge([],r.childNodes))},parseJSON:JSON.parse,parseXML:function(e){var t,n;if(!e||"string"!=typeof e)return null;try{n=new DOMParser,t=n.parseFromString(e,"text/xml")}catch(r){t=undefined}return(!t||t.getElementsByTagName("parsererror").length)&&x.error("Invalid XML: "+e),t},noop:function(){},globalEval:function(e){var t,n=eval;e=x.trim(e),e&&(1===e.indexOf("use strict")?(t=o.createElement("script"),t.text=e,o.head.appendChild(t).parentNode.removeChild(t)):n(e))},camelCase:function(e){return e.replace(k,"ms-").replace(N,E)},nodeName:function(e,t){return e.nodeName&&e.nodeName.toLowerCase()===t.toLowerCase()},each:function(e,t,n){var r,i=0,o=e.length,s=j(e);if(n){if(s){for(;o>i;i++)if(r=t.apply(e[i],n),r===!1)break}else for(i in e)if(r=t.apply(e[i],n),r===!1)break}else if(s){for(;o>i;i++)if(r=t.call(e[i],i,e[i]),r===!1)break}else for(i in e)if(r=t.call(e[i],i,e[i]),r===!1)break;return e},trim:function(e){return null==e?"":v.call(e)},makeArray:function(e,t){var n=t||[];return null!=e&&(j(Object(e))?x.merge(n,"string"==typeof e?[e]:e):h.call(n,e)),n},inArray:function(e,t,n){return null==t?-1:g.call(t,e,n)},merge:function(e,t){var n=t.length,r=e.length,i=0;if("number"==typeof n)for(;n>i;i++)e[r++]=t[i];else while(t[i]!==undefined)e[r++]=t[i++];return e.length=r,e},grep:function(e,t,n){var r,i=[],o=0,s=e.length;for(n=!!n;s>o;o++)r=!!t(e[o],o),n!==r&&i.push(e[o]);return i},map:function(e,t,n){var r,i=0,o=e.length,s=j(e),a=[];if(s)for(;o>i;i++)r=t(e[i],i,n),null!=r&&(a[a.length]=r);else for(i in e)r=t(e[i],i,n),null!=r&&(a[a.length]=r);return p.apply([],a)},guid:1,proxy:function(e,t){var n,r,i;return"string"==typeof t&&(n=e[t],t=e,e=n),x.isFunction(e)?(r=d.call(arguments,2),i=function(){return e.apply(t||this,r.concat(d.call(arguments)))},i.guid=e.guid=e.guid||x.guid++,i):undefined},access:function(e,t,n,r,i,o,s){var a=0,u=e.length,l=null==n;if("object"===x.type(n)){i=!0;for(a in n)x.access(e,t,a,n[a],!0,o,s)}else if(r!==undefined&&(i=!0,x.isFunction(r)||(s=!0),l&&(s?(t.call(e,r),t=null):(l=t,t=function(e,t,n){return l.call(x(e),n)})),t))for(;u>a;a++)t(e[a],n,s?r:r.call(e[a],a,t(e[a],n)));return i?e:l?t.call(e):u?t(e[0],n):o},now:Date.now,swap:function(e,t,n,r){var i,o,s={};for(o in t)s[o]=e.style[o],e.style[o]=t[o];i=n.apply(e,r||[]);for(o in t)e.style[o]=s[o];return i}}),x.ready.promise=function(t){return n||(n=x.Deferred(),"complete"===o.readyState?setTimeout(x.ready):(o.addEventListener("DOMContentLoaded",S,!1),e.addEventListener("load",S,!1))),n.promise(t)},x.each("Boolean Number String Function Array Date RegExp Object Error".split(" "),function(e,t){l["[object "+t+"]"]=t.toLowerCase()});function j(e){var t=e.length,n=x.type(e);return x.isWindow(e)?!1:1===e.nodeType&&t?!0:"array"===n||"function"!==n&&(0===t||"number"==typeof t&&t>0&&t-1 in e)}t=x(o),function(e,undefined){var t,n,r,i,o,s,a,u,l,c,f,p,h,d,g,m,y="sizzle"+-new Date,v=e.document,b={},w=0,T=0,C=ot(),k=ot(),N=ot(),E=!1,S=function(){return 0},j=typeof undefined,D=1<<31,A=[],L=A.pop,q=A.push,H=A.push,O=A.slice,F=A.indexOf||function(e){var t=0,n=this.length;for(;n>t;t++)if(this[t]===e)return t;return-1},P="checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",R="[\\x20\\t\\r\\n\\f]",M="(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",W=M.replace("w","w#"),$="\\["+R+"*("+M+")"+R+"*(?:([*^$|!~]?=)"+R+"*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|("+W+")|)|)"+R+"*\\]",B=":("+M+")(?:\\(((['\"])((?:\\\\.|[^\\\\])*?)\\3|((?:\\\\.|[^\\\\()[\\]]|"+$.replace(3,8)+")*)|.*)\\)|)",I=RegExp("^"+R+"+|((?:^|[^\\\\])(?:\\\\.)*)"+R+"+$","g"),z=RegExp("^"+R+"*,"+R+"*"),_=RegExp("^"+R+"*([>+~]|"+R+")"+R+"*"),X=RegExp(R+"*[+~]"),U=RegExp("="+R+"*([^\\]'\"]*)"+R+"*\\]","g"),Y=RegExp(B),V=RegExp("^"+W+"$"),G={ID:RegExp("^#("+M+")"),CLASS:RegExp("^\\.("+M+")"),TAG:RegExp("^("+M.replace("w","w*")+")"),ATTR:RegExp("^"+$),PSEUDO:RegExp("^"+B),CHILD:RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\("+R+"*(even|odd|(([+-]|)(\\d*)n|)"+R+"*(?:([+-]|)"+R+"*(\\d+)|))"+R+"*\\)|)","i"),"boolean":RegExp("^(?:"+P+")$","i"),needsContext:RegExp("^"+R+"*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\("+R+"*((?:-\\d)?\\d*)"+R+"*\\)|)(?=[^-]|$)","i")},J=/^[^{]+\{\s*\[native \w/,Q=/^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,K=/^(?:input|select|textarea|button)$/i,Z=/^h\d$/i,et=/'|\\/g,tt=/\\([\da-fA-F]{1,6}[\x20\t\r\n\f]?|.)/g,nt=function(e,t){var n="0x"+t-65536;return n!==n?t:0>n?String.fromCharCode(n+65536):String.fromCharCode(55296|n>>10,56320|1023&n)};try{H.apply(A=O.call(v.childNodes),v.childNodes),A[v.childNodes.length].nodeType}catch(rt){H={apply:A.length?function(e,t){q.apply(e,O.call(t))}:function(e,t){var n=e.length,r=0;while(e[n++]=t[r++]);e.length=n-1}}}function it(e){return J.test(e+"")}function ot(){var e,t=[];return e=function(n,i){return t.push(n+=" ")>r.cacheLength&&delete e[t.shift()],e[n]=i}}function st(e){return e[y]=!0,e}function at(e){var t=c.createElement("div");try{return!!e(t)}catch(n){return!1}finally{t.parentNode&&t.parentNode.removeChild(t),t=null}}function ut(e,t,n,r){var i,o,s,a,u,f,d,g,x,w;if((t?t.ownerDocument||t:v)!==c&&l(t),t=t||c,n=n||[],!e||"string"!=typeof e)return n;if(1!==(a=t.nodeType)&&9!==a)return[];if(p&&!r){if(i=Q.exec(e))if(s=i[1]){if(9===a){if(o=t.getElementById(s),!o||!o.parentNode)return n;if(o.id===s)return n.push(o),n}else if(t.ownerDocument&&(o=t.ownerDocument.getElementById(s))&&m(t,o)&&o.id===s)return n.push(o),n}else{if(i[2])return H.apply(n,t.getElementsByTagName(e)),n;if((s=i[3])&&b.getElementsByClassName&&t.getElementsByClassName)return H.apply(n,t.getElementsByClassName(s)),n}if(b.qsa&&(!h||!h.test(e))){if(g=d=y,x=t,w=9===a&&e,1===a&&"object"!==t.nodeName.toLowerCase()){f=gt(e),(d=t.getAttribute("id"))?g=d.replace(et,"\\$&"):t.setAttribute("id",g),g="[id='"+g+"'] ",u=f.length;while(u--)f[u]=g+mt(f[u]);x=X.test(e)&&t.parentNode||t,w=f.join(",")}if(w)try{return H.apply(n,x.querySelectorAll(w)),n}catch(T){}finally{d||t.removeAttribute("id")}}}return kt(e.replace(I,"$1"),t,n,r)}o=ut.isXML=function(e){var t=e&&(e.ownerDocument||e).documentElement;return t?"HTML"!==t.nodeName:!1},l=ut.setDocument=function(e){var t=e?e.ownerDocument||e:v;return t!==c&&9===t.nodeType&&t.documentElement?(c=t,f=t.documentElement,p=!o(t),b.getElementsByTagName=at(function(e){return e.appendChild(t.createComment("")),!e.getElementsByTagName("*").length}),b.attributes=at(function(e){return e.className="i",!e.getAttribute("className")}),b.getElementsByClassName=at(function(e){return e.innerHTML="<div class='a'></div><div class='a i'></div>",e.firstChild.className="i",2===e.getElementsByClassName("i").length}),b.sortDetached=at(function(e){return 1&e.compareDocumentPosition(c.createElement("div"))}),b.getById=at(function(e){return f.appendChild(e).id=y,!t.getElementsByName||!t.getElementsByName(y).length}),b.getById?(r.find.ID=function(e,t){if(typeof t.getElementById!==j&&p){var n=t.getElementById(e);return n&&n.parentNode?[n]:[]}},r.filter.ID=function(e){var t=e.replace(tt,nt);return function(e){return e.getAttribute("id")===t}}):(r.find.ID=function(e,t){if(typeof t.getElementById!==j&&p){var n=t.getElementById(e);return n?n.id===e||typeof n.getAttributeNode!==j&&n.getAttributeNode("id").value===e?[n]:undefined:[]}},r.filter.ID=function(e){var t=e.replace(tt,nt);return function(e){var n=typeof e.getAttributeNode!==j&&e.getAttributeNode("id");return n&&n.value===t}}),r.find.TAG=b.getElementsByTagName?function(e,t){return typeof t.getElementsByTagName!==j?t.getElementsByTagName(e):undefined}:function(e,t){var n,r=[],i=0,o=t.getElementsByTagName(e);if("*"===e){while(n=o[i++])1===n.nodeType&&r.push(n);return r}return o},r.find.CLASS=b.getElementsByClassName&&function(e,t){return typeof t.getElementsByClassName!==j&&p?t.getElementsByClassName(e):undefined},d=[],h=[],(b.qsa=it(t.querySelectorAll))&&(at(function(e){e.innerHTML="<select><option selected=''></option></select>",e.querySelectorAll("[selected]").length||h.push("\\["+R+"*(?:value|"+P+")"),e.querySelectorAll(":checked").length||h.push(":checked")}),at(function(e){var t=c.createElement("input");t.setAttribute("type","hidden"),e.appendChild(t).setAttribute("t",""),e.querySelectorAll("[t^='']").length&&h.push("[*^$]="+R+"*(?:''|\"\")"),e.querySelectorAll(":enabled").length||h.push(":enabled",":disabled"),e.querySelectorAll("*,:x"),h.push(",.*:")})),(b.matchesSelector=it(g=f.webkitMatchesSelector||f.mozMatchesSelector||f.oMatchesSelector||f.msMatchesSelector))&&at(function(e){b.disconnectedMatch=g.call(e,"div"),g.call(e,"[s!='']:x"),d.push("!=",B)}),h=h.length&&RegExp(h.join("|")),d=d.length&&RegExp(d.join("|")),m=it(f.contains)||f.compareDocumentPosition?function(e,t){var n=9===e.nodeType?e.documentElement:e,r=t&&t.parentNode;return e===r||!(!r||1!==r.nodeType||!(n.contains?n.contains(r):e.compareDocumentPosition&&16&e.compareDocumentPosition(r)))}:function(e,t){if(t)while(t=t.parentNode)if(t===e)return!0;return!1},S=f.compareDocumentPosition?function(e,n){if(e===n)return E=!0,0;var r=n.compareDocumentPosition&&e.compareDocumentPosition&&e.compareDocumentPosition(n);return r?1&r||!b.sortDetached&&n.compareDocumentPosition(e)===r?e===t||m(v,e)?-1:n===t||m(v,n)?1:u?F.call(u,e)-F.call(u,n):0:4&r?-1:1:e.compareDocumentPosition?-1:1}:function(e,n){var r,i=0,o=e.parentNode,s=n.parentNode,a=[e],l=[n];if(e===n)return E=!0,0;if(!o||!s)return e===t?-1:n===t?1:o?-1:s?1:u?F.call(u,e)-F.call(u,n):0;if(o===s)return lt(e,n);r=e;while(r=r.parentNode)a.unshift(r);r=n;while(r=r.parentNode)l.unshift(r);while(a[i]===l[i])i++;return i?lt(a[i],l[i]):a[i]===v?-1:l[i]===v?1:0},c):c},ut.matches=function(e,t){return ut(e,null,null,t)},ut.matchesSelector=function(e,t){if((e.ownerDocument||e)!==c&&l(e),t=t.replace(U,"='$1']"),!(!b.matchesSelector||!p||d&&d.test(t)||h&&h.test(t)))try{var n=g.call(e,t);if(n||b.disconnectedMatch||e.document&&11!==e.document.nodeType)return n}catch(r){}return ut(t,c,null,[e]).length>0},ut.contains=function(e,t){return(e.ownerDocument||e)!==c&&l(e),m(e,t)},ut.attr=function(e,t){(e.ownerDocument||e)!==c&&l(e);var n=r.attrHandle[t.toLowerCase()],i=n&&n(e,t,!p);return i===undefined?b.attributes||!p?e.getAttribute(t):(i=e.getAttributeNode(t))&&i.specified?i.value:null:i},ut.error=function(e){throw Error("Syntax error, unrecognized expression: "+e)},ut.uniqueSort=function(e){var t,n=[],r=0,i=0;if(E=!b.detectDuplicates,u=!b.sortStable&&e.slice(0),e.sort(S),E){while(t=e[i++])t===e[i]&&(r=n.push(i));while(r--)e.splice(n[r],1)}return e};function lt(e,t){var n=t&&e,r=n&&(~t.sourceIndex||D)-(~e.sourceIndex||D);if(r)return r;if(n)while(n=n.nextSibling)if(n===t)return-1;return e?1:-1}function ct(e,t,n){var r;return n?undefined:(r=e.getAttributeNode(t))&&r.specified?r.value:e[t]===!0?t.toLowerCase():null}function ft(e,t,n){var r;return n?undefined:r=e.getAttribute(t,"type"===t.toLowerCase()?1:2)}function pt(e){return function(t){var n=t.nodeName.toLowerCase();return"input"===n&&t.type===e}}function ht(e){return function(t){var n=t.nodeName.toLowerCase();return("input"===n||"button"===n)&&t.type===e}}function dt(e){return st(function(t){return t=+t,st(function(n,r){var i,o=e([],n.length,t),s=o.length;while(s--)n[i=o[s]]&&(n[i]=!(r[i]=n[i]))})})}i=ut.getText=function(e){var t,n="",r=0,o=e.nodeType;if(o){if(1===o||9===o||11===o){if("string"==typeof e.textContent)return e.textContent;for(e=e.firstChild;e;e=e.nextSibling)n+=i(e)}else if(3===o||4===o)return e.nodeValue}else for(;t=e[r];r++)n+=i(t);return n},r=ut.selectors={cacheLength:50,createPseudo:st,match:G,attrHandle:{},find:{},relative:{">":{dir:"parentNode",first:!0}," ":{dir:"parentNode"},"+":{dir:"previousSibling",first:!0},"~":{dir:"previousSibling"}},preFilter:{ATTR:function(e){return e[1]=e[1].replace(tt,nt),e[3]=(e[4]||e[5]||"").replace(tt,nt),"~="===e[2]&&(e[3]=" "+e[3]+" "),e.slice(0,4)},CHILD:function(e){return e[1]=e[1].toLowerCase(),"nth"===e[1].slice(0,3)?(e[3]||ut.error(e[0]),e[4]=+(e[4]?e[5]+(e[6]||1):2*("even"===e[3]||"odd"===e[3])),e[5]=+(e[7]+e[8]||"odd"===e[3])):e[3]&&ut.error(e[0]),e},PSEUDO:function(e){var t,n=!e[5]&&e[2];return G.CHILD.test(e[0])?null:(e[4]?e[2]=e[4]:n&&Y.test(n)&&(t=gt(n,!0))&&(t=n.indexOf(")",n.length-t)-n.length)&&(e[0]=e[0].slice(0,t),e[2]=n.slice(0,t)),e.slice(0,3))}},filter:{TAG:function(e){var t=e.replace(tt,nt).toLowerCase();return"*"===e?function(){return!0}:function(e){return e.nodeName&&e.nodeName.toLowerCase()===t}},CLASS:function(e){var t=C[e+" "];return t||(t=RegExp("(^|"+R+")"+e+"("+R+"|$)"))&&C(e,function(e){return t.test("string"==typeof e.className&&e.className||typeof e.getAttribute!==j&&e.getAttribute("class")||"")})},ATTR:function(e,t,n){return function(r){var i=ut.attr(r,e);return null==i?"!="===t:t?(i+="","="===t?i===n:"!="===t?i!==n:"^="===t?n&&0===i.indexOf(n):"*="===t?n&&i.indexOf(n)>-1:"$="===t?n&&i.slice(-n.length)===n:"~="===t?(" "+i+" ").indexOf(n)>-1:"|="===t?i===n||i.slice(0,n.length+1)===n+"-":!1):!0}},CHILD:function(e,t,n,r,i){var o="nth"!==e.slice(0,3),s="last"!==e.slice(-4),a="of-type"===t;return 1===r&&0===i?function(e){return!!e.parentNode}:function(t,n,u){var l,c,f,p,h,d,g=o!==s?"nextSibling":"previousSibling",m=t.parentNode,v=a&&t.nodeName.toLowerCase(),x=!u&&!a;if(m){if(o){while(g){f=t;while(f=f[g])if(a?f.nodeName.toLowerCase()===v:1===f.nodeType)return!1;d=g="only"===e&&!d&&"nextSibling"}return!0}if(d=[s?m.firstChild:m.lastChild],s&&x){c=m[y]||(m[y]={}),l=c[e]||[],h=l[0]===w&&l[1],p=l[0]===w&&l[2],f=h&&m.childNodes[h];while(f=++h&&f&&f[g]||(p=h=0)||d.pop())if(1===f.nodeType&&++p&&f===t){c[e]=[w,h,p];break}}else if(x&&(l=(t[y]||(t[y]={}))[e])&&l[0]===w)p=l[1];else while(f=++h&&f&&f[g]||(p=h=0)||d.pop())if((a?f.nodeName.toLowerCase()===v:1===f.nodeType)&&++p&&(x&&((f[y]||(f[y]={}))[e]=[w,p]),f===t))break;return p-=i,p===r||0===p%r&&p/r>=0}}},PSEUDO:function(e,t){var n,i=r.pseudos[e]||r.setFilters[e.toLowerCase()]||ut.error("unsupported pseudo: "+e);return i[y]?i(t):i.length>1?(n=[e,e,"",t],r.setFilters.hasOwnProperty(e.toLowerCase())?st(function(e,n){var r,o=i(e,t),s=o.length;while(s--)r=F.call(e,o[s]),e[r]=!(n[r]=o[s])}):function(e){return i(e,0,n)}):i}},pseudos:{not:st(function(e){var t=[],n=[],r=s(e.replace(I,"$1"));return r[y]?st(function(e,t,n,i){var o,s=r(e,null,i,[]),a=e.length;while(a--)(o=s[a])&&(e[a]=!(t[a]=o))}):function(e,i,o){return t[0]=e,r(t,null,o,n),!n.pop()}}),has:st(function(e){return function(t){return ut(e,t).length>0}}),contains:st(function(e){return function(t){return(t.textContent||t.innerText||i(t)).indexOf(e)>-1}}),lang:st(function(e){return V.test(e||"")||ut.error("unsupported lang: "+e),e=e.replace(tt,nt).toLowerCase(),function(t){var n;do if(n=p?t.lang:t.getAttribute("xml:lang")||t.getAttribute("lang"))return n=n.toLowerCase(),n===e||0===n.indexOf(e+"-");while((t=t.parentNode)&&1===t.nodeType);return!1}}),target:function(t){var n=e.location&&e.location.hash;return n&&n.slice(1)===t.id},root:function(e){return e===f},focus:function(e){return e===c.activeElement&&(!c.hasFocus||c.hasFocus())&&!!(e.type||e.href||~e.tabIndex)},enabled:function(e){return e.disabled===!1},disabled:function(e){return e.disabled===!0},checked:function(e){var t=e.nodeName.toLowerCase();return"input"===t&&!!e.checked||"option"===t&&!!e.selected},selected:function(e){return e.parentNode&&e.parentNode.selectedIndex,e.selected===!0},empty:function(e){for(e=e.firstChild;e;e=e.nextSibling)if(e.nodeName>"@"||3===e.nodeType||4===e.nodeType)return!1;return!0},parent:function(e){return!r.pseudos.empty(e)},header:function(e){return Z.test(e.nodeName)},input:function(e){return K.test(e.nodeName)},button:function(e){var t=e.nodeName.toLowerCase();return"input"===t&&"button"===e.type||"button"===t},text:function(e){var t;return"input"===e.nodeName.toLowerCase()&&"text"===e.type&&(null==(t=e.getAttribute("type"))||t.toLowerCase()===e.type)},first:dt(function(){return[0]}),last:dt(function(e,t){return[t-1]}),eq:dt(function(e,t,n){return[0>n?n+t:n]}),even:dt(function(e,t){var n=0;for(;t>n;n+=2)e.push(n);return e}),odd:dt(function(e,t){var n=1;for(;t>n;n+=2)e.push(n);return e}),lt:dt(function(e,t,n){var r=0>n?n+t:n;for(;--r>=0;)e.push(r);return e}),gt:dt(function(e,t,n){var r=0>n?n+t:n;for(;t>++r;)e.push(r);return e})}};for(t in{radio:!0,checkbox:!0,file:!0,password:!0,image:!0})r.pseudos[t]=pt(t);for(t in{submit:!0,reset:!0})r.pseudos[t]=ht(t);function gt(e,t){var n,i,o,s,a,u,l,c=k[e+" "];if(c)return t?0:c.slice(0);a=e,u=[],l=r.preFilter;while(a){(!n||(i=z.exec(a)))&&(i&&(a=a.slice(i[0].length)||a),u.push(o=[])),n=!1,(i=_.exec(a))&&(n=i.shift(),o.push({value:n,type:i[0].replace(I," ")}),a=a.slice(n.length));for(s in r.filter)!(i=G[s].exec(a))||l[s]&&!(i=l[s](i))||(n=i.shift(),o.push({value:n,type:s,matches:i}),a=a.slice(n.length));if(!n)break}return t?a.length:a?ut.error(e):k(e,u).slice(0)}function mt(e){var t=0,n=e.length,r="";for(;n>t;t++)r+=e[t].value;return r}function yt(e,t,r){var i=t.dir,o=r&&"parentNode"===i,s=T++;return t.first?function(t,n,r){while(t=t[i])if(1===t.nodeType||o)return e(t,n,r)}:function(t,r,a){var u,l,c,f=w+" "+s;if(a){while(t=t[i])if((1===t.nodeType||o)&&e(t,r,a))return!0}else while(t=t[i])if(1===t.nodeType||o)if(c=t[y]||(t[y]={}),(l=c[i])&&l[0]===f){if((u=l[1])===!0||u===n)return u===!0}else if(l=c[i]=[f],l[1]=e(t,r,a)||n,l[1]===!0)return!0}}function vt(e){return e.length>1?function(t,n,r){var i=e.length;while(i--)if(!e[i](t,n,r))return!1;return!0}:e[0]}function xt(e,t,n,r,i){var o,s=[],a=0,u=e.length,l=null!=t;for(;u>a;a++)(o=e[a])&&(!n||n(o,r,i))&&(s.push(o),l&&t.push(a));return s}function bt(e,t,n,r,i,o){return r&&!r[y]&&(r=bt(r)),i&&!i[y]&&(i=bt(i,o)),st(function(o,s,a,u){var l,c,f,p=[],h=[],d=s.length,g=o||Ct(t||"*",a.nodeType?[a]:a,[]),m=!e||!o&&t?g:xt(g,p,e,a,u),y=n?i||(o?e:d||r)?[]:s:m;if(n&&n(m,y,a,u),r){l=xt(y,h),r(l,[],a,u),c=l.length;while(c--)(f=l[c])&&(y[h[c]]=!(m[h[c]]=f))}if(o){if(i||e){if(i){l=[],c=y.length;while(c--)(f=y[c])&&l.push(m[c]=f);i(null,y=[],l,u)}c=y.length;while(c--)(f=y[c])&&(l=i?F.call(o,f):p[c])>-1&&(o[l]=!(s[l]=f))}}else y=xt(y===s?y.splice(d,y.length):y),i?i(null,s,y,u):H.apply(s,y)})}function wt(e){var t,n,i,o=e.length,s=r.relative[e[0].type],u=s||r.relative[" "],l=s?1:0,c=yt(function(e){return e===t},u,!0),f=yt(function(e){return F.call(t,e)>-1},u,!0),p=[function(e,n,r){return!s&&(r||n!==a)||((t=n).nodeType?c(e,n,r):f(e,n,r))}];for(;o>l;l++)if(n=r.relative[e[l].type])p=[yt(vt(p),n)];else{if(n=r.filter[e[l].type].apply(null,e[l].matches),n[y]){for(i=++l;o>i;i++)if(r.relative[e[i].type])break;return bt(l>1&&vt(p),l>1&&mt(e.slice(0,l-1)).replace(I,"$1"),n,i>l&&wt(e.slice(l,i)),o>i&&wt(e=e.slice(i)),o>i&&mt(e))}p.push(n)}return vt(p)}function Tt(e,t){var i=0,o=t.length>0,s=e.length>0,u=function(u,l,f,p,h){var d,g,m,y=[],v=0,x="0",b=u&&[],T=null!=h,C=a,k=u||s&&r.find.TAG("*",h&&l.parentNode||l),N=w+=null==C?1:Math.random()||.1;for(T&&(a=l!==c&&l,n=i);null!=(d=k[x]);x++){if(s&&d){g=0;while(m=e[g++])if(m(d,l,f)){p.push(d);break}T&&(w=N,n=++i)}o&&((d=!m&&d)&&v--,u&&b.push(d))}if(v+=x,o&&x!==v){g=0;while(m=t[g++])m(b,y,l,f);if(u){if(v>0)while(x--)b[x]||y[x]||(y[x]=L.call(p));y=xt(y)}H.apply(p,y),T&&!u&&y.length>0&&v+t.length>1&&ut.uniqueSort(p)}return T&&(w=N,a=C),b};return o?st(u):u}s=ut.compile=function(e,t){var n,r=[],i=[],o=N[e+" "];if(!o){t||(t=gt(e)),n=t.length;while(n--)o=wt(t[n]),o[y]?r.push(o):i.push(o);o=N(e,Tt(i,r))}return o};function Ct(e,t,n){var r=0,i=t.length;for(;i>r;r++)ut(e,t[r],n);return n}function kt(e,t,n,i){var o,a,u,l,c,f=gt(e);if(!i&&1===f.length){if(a=f[0]=f[0].slice(0),a.length>2&&"ID"===(u=a[0]).type&&9===t.nodeType&&p&&r.relative[a[1].type]){if(t=(r.find.ID(u.matches[0].replace(tt,nt),t)||[])[0],!t)return n;e=e.slice(a.shift().value.length)}o=G.needsContext.test(e)?0:a.length;while(o--){if(u=a[o],r.relative[l=u.type])break;if((c=r.find[l])&&(i=c(u.matches[0].replace(tt,nt),X.test(a[0].type)&&t.parentNode||t))){if(a.splice(o,1),e=i.length&&mt(a),!e)return H.apply(n,i),n;break}}}return s(e,f)(i,t,!p,n,X.test(e)),n}r.pseudos.nth=r.pseudos.eq;function Nt(){}Nt.prototype=r.filters=r.pseudos,r.setFilters=new Nt,b.sortStable=y.split("").sort(S).join("")===y,l(),[0,0].sort(S),b.detectDuplicates=E,at(function(e){if(e.innerHTML="<a href='#'></a>","#"!==e.firstChild.getAttribute("href")){var t="type|href|height|width".split("|"),n=t.length;while(n--)r.attrHandle[t[n]]=ft}}),at(function(e){if(null!=e.getAttribute("disabled")){var t=P.split("|"),n=t.length;while(n--)r.attrHandle[t[n]]=ct}}),x.find=ut,x.expr=ut.selectors,x.expr[":"]=x.expr.pseudos,x.unique=ut.uniqueSort,x.text=ut.getText,x.isXMLDoc=ut.isXML,x.contains=ut.contains}(e);var D={};function A(e){var t=D[e]={};return x.each(e.match(w)||[],function(e,n){t[n]=!0}),t}x.Callbacks=function(e){e="string"==typeof e?D[e]||A(e):x.extend({},e);var t,n,r,i,o,s,a=[],u=!e.once&&[],l=function(f){for(t=e.memory&&f,n=!0,s=i||0,i=0,o=a.length,r=!0;a&&o>s;s++)if(a[s].apply(f[0],f[1])===!1&&e.stopOnFalse){t=!1;break}r=!1,a&&(u?u.length&&l(u.shift()):t?a=[]:c.disable())},c={add:function(){if(a){var n=a.length;(function s(t){x.each(t,function(t,n){var r=x.type(n);"function"===r?e.unique&&c.has(n)||a.push(n):n&&n.length&&"string"!==r&&s(n)})})(arguments),r?o=a.length:t&&(i=n,l(t))}return this},remove:function(){return a&&x.each(arguments,function(e,t){var n;while((n=x.inArray(t,a,n))>-1)a.splice(n,1),r&&(o>=n&&o--,s>=n&&s--)}),this},has:function(e){return e?x.inArray(e,a)>-1:!(!a||!a.length)},empty:function(){return a=[],o=0,this},disable:function(){return a=u=t=undefined,this},disabled:function(){return!a},lock:function(){return u=undefined,t||c.disable(),this},locked:function(){return!u},fireWith:function(e,t){return t=t||[],t=[e,t.slice?t.slice():t],!a||n&&!u||(r?u.push(t):l(t)),this},fire:function(){return c.fireWith(this,arguments),this},fired:function(){return!!n}};return c},x.extend({Deferred:function(e){var t=[["resolve","done",x.Callbacks("once memory"),"resolved"],["reject","fail",x.Callbacks("once memory"),"rejected"],["notify","progress",x.Callbacks("memory")]],n="pending",r={state:function(){return n},always:function(){return i.done(arguments).fail(arguments),this},then:function(){var e=arguments;return x.Deferred(function(n){x.each(t,function(t,o){var s=o[0],a=x.isFunction(e[t])&&e[t];i[o[1]](function(){var e=a&&a.apply(this,arguments);e&&x.isFunction(e.promise)?e.promise().done(n.resolve).fail(n.reject).progress(n.notify):n[s+"With"](this===r?n.promise():this,a?[e]:arguments)})}),e=null}).promise()},promise:function(e){return null!=e?x.extend(e,r):r}},i={};return r.pipe=r.then,x.each(t,function(e,o){var s=o[2],a=o[3];r[o[1]]=s.add,a&&s.add(function(){n=a},t[1^e][2].disable,t[2][2].lock),i[o[0]]=function(){return i[o[0]+"With"](this===i?r:this,arguments),this},i[o[0]+"With"]=s.fireWith}),r.promise(i),e&&e.call(i,i),i},when:function(e){var t=0,n=d.call(arguments),r=n.length,i=1!==r||e&&x.isFunction(e.promise)?r:0,o=1===i?e:x.Deferred(),s=function(e,t,n){return function(r){t[e]=this,n[e]=arguments.length>1?d.call(arguments):r,n===a?o.notifyWith(t,n):--i||o.resolveWith(t,n)}},a,u,l;if(r>1)for(a=Array(r),u=Array(r),l=Array(r);r>t;t++)n[t]&&x.isFunction(n[t].promise)?n[t].promise().done(s(t,l,n)).fail(o.reject).progress(s(t,u,a)):--i;return i||o.resolveWith(l,n),o.promise()}}),x.support=function(t){var n=o.createElement("input"),r=o.createDocumentFragment(),i=o.createElement("div"),s=o.createElement("select"),a=s.appendChild(o.createElement("option"));return n.type?(n.type="checkbox",t.checkOn=""!==n.value,t.optSelected=a.selected,t.reliableMarginRight=!0,t.boxSizingReliable=!0,t.pixelPosition=!1,n.checked=!0,t.noCloneChecked=n.cloneNode(!0).checked,s.disabled=!0,t.optDisabled=!a.disabled,n=o.createElement("input"),n.value="t",n.type="radio",t.radioValue="t"===n.value,n.setAttribute("checked","t"),n.setAttribute("name","t"),r.appendChild(n),t.checkClone=r.cloneNode(!0).cloneNode(!0).lastChild.checked,t.focusinBubbles="onfocusin"in e,i.style.backgroundClip="content-box",i.cloneNode(!0).style.backgroundClip="",t.clearCloneStyle="content-box"===i.style.backgroundClip,x(function(){var n,r,s="padding:0;margin:0;border:0;display:block;-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box",a=o.getElementsByTagName("body")[0];a&&(n=o.createElement("div"),n.style.cssText="border:0;width:0;height:0;position:absolute;top:0;left:-9999px;margin-top:1px",a.appendChild(n).appendChild(i),i.innerHTML="",i.style.cssText="-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%",x.swap(a,null!=a.style.zoom?{zoom:1}:{},function(){t.boxSizing=4===i.offsetWidth}),e.getComputedStyle&&(t.pixelPosition="1%"!==(e.getComputedStyle(i,null)||{}).top,t.boxSizingReliable="4px"===(e.getComputedStyle(i,null)||{width:"4px"}).width,r=i.appendChild(o.createElement("div")),r.style.cssText=i.style.cssText=s,r.style.marginRight=r.style.width="0",i.style.width="1px",t.reliableMarginRight=!parseFloat((e.getComputedStyle(r,null)||{}).marginRight)),a.removeChild(n))}),t):t}({});var L,q,H=/(?:\{[\s\S]*\}|\[[\s\S]*\])$/,O=/([A-Z])/g;function F(){Object.defineProperty(this.cache={},0,{get:function(){return{}}}),this.expando=x.expando+Math.random()}F.uid=1,F.accepts=function(e){return e.nodeType?1===e.nodeType||9===e.nodeType:!0},F.prototype={key:function(e){if(!F.accepts(e))return 0;var t={},n=e[this.expando];if(!n){n=F.uid++;try{t[this.expando]={value:n},Object.defineProperties(e,t)}catch(r){t[this.expando]=n,x.extend(e,t)}}return this.cache[n]||(this.cache[n]={}),n},set:function(e,t,n){var r,i=this.key(e),o=this.cache[i];if("string"==typeof t)o[t]=n;else if(x.isEmptyObject(o))this.cache[i]=t;else for(r in t)o[r]=t[r]},get:function(e,t){var n=this.cache[this.key(e)];return t===undefined?n:n[t]},access:function(e,t,n){return t===undefined||t&&"string"==typeof t&&n===undefined?this.get(e,t):(this.set(e,t,n),n!==undefined?n:t)},remove:function(e,t){var n,r,i=this.key(e),o=this.cache[i];if(t===undefined)this.cache[i]={};else{x.isArray(t)?r=t.concat(t.map(x.camelCase)):t in o?r=[t]:(r=x.camelCase(t),r=r in o?[r]:r.match(w)||[]),n=r.length;while(n--)delete o[r[n]]}},hasData:function(e){return!x.isEmptyObject(this.cache[e[this.expando]]||{})},discard:function(e){delete this.cache[this.key(e)]}},L=new F,q=new F,x.extend({acceptData:F.accepts,hasData:function(e){return L.hasData(e)||q.hasData(e)},data:function(e,t,n){return L.access(e,t,n)},removeData:function(e,t){L.remove(e,t)},_data:function(e,t,n){return q.access(e,t,n)},_removeData:function(e,t){q.remove(e,t)}}),x.fn.extend({data:function(e,t){var n,r,i=this[0],o=0,s=null;if(e===undefined){if(this.length&&(s=L.get(i),1===i.nodeType&&!q.get(i,"hasDataAttrs"))){for(n=i.attributes;n.length>o;o++)r=n[o].name,0===r.indexOf("data-")&&(r=x.camelCase(r.substring(5)),P(i,r,s[r]));q.set(i,"hasDataAttrs",!0)}return s}return"object"==typeof e?this.each(function(){L.set(this,e)}):x.access(this,function(t){var n,r=x.camelCase(e);if(i&&t===undefined){if(n=L.get(i,e),n!==undefined)return n;if(n=L.get(i,r),n!==undefined)return n;if(n=P(i,r,undefined),n!==undefined)return n}else this.each(function(){var n=L.get(this,r);L.set(this,r,t),-1!==e.indexOf("-")&&n!==undefined&&L.set(this,e,t)})},null,t,arguments.length>1,null,!0)},removeData:function(e){return this.each(function(){L.remove(this,e)})}});function P(e,t,n){var r;if(n===undefined&&1===e.nodeType)if(r="data-"+t.replace(O,"-$1").toLowerCase(),n=e.getAttribute(r),"string"==typeof n){try{n="true"===n?!0:"false"===n?!1:"null"===n?null:+n+""===n?+n:H.test(n)?JSON.parse(n):n}catch(i){}L.set(e,t,n)}else n=undefined;return n}x.extend({queue:function(e,t,n){var r;return e?(t=(t||"fx")+"queue",r=q.get(e,t),n&&(!r||x.isArray(n)?r=q.access(e,t,x.makeArray(n)):r.push(n)),r||[]):undefined},dequeue:function(e,t){t=t||"fx";var n=x.queue(e,t),r=n.length,i=n.shift(),o=x._queueHooks(e,t),s=function(){x.dequeue(e,t)};"inprogress"===i&&(i=n.shift(),r--),o.cur=i,i&&("fx"===t&&n.unshift("inprogress"),delete o.stop,i.call(e,s,o)),!r&&o&&o.empty.fire()},_queueHooks:function(e,t){var n=t+"queueHooks";return q.get(e,n)||q.access(e,n,{empty:x.Callbacks("once memory").add(function(){q.remove(e,[t+"queue",n])})})}}),x.fn.extend({queue:function(e,t){var n=2;return"string"!=typeof e&&(t=e,e="fx",n--),n>arguments.length?x.queue(this[0],e):t===undefined?this:this.each(function(){var n=x.queue(this,e,t);
x._queueHooks(this,e),"fx"===e&&"inprogress"!==n[0]&&x.dequeue(this,e)})},dequeue:function(e){return this.each(function(){x.dequeue(this,e)})},delay:function(e,t){return e=x.fx?x.fx.speeds[e]||e:e,t=t||"fx",this.queue(t,function(t,n){var r=setTimeout(t,e);n.stop=function(){clearTimeout(r)}})},clearQueue:function(e){return this.queue(e||"fx",[])},promise:function(e,t){var n,r=1,i=x.Deferred(),o=this,s=this.length,a=function(){--r||i.resolveWith(o,[o])};"string"!=typeof e&&(t=e,e=undefined),e=e||"fx";while(s--)n=q.get(o[s],e+"queueHooks"),n&&n.empty&&(r++,n.empty.add(a));return a(),i.promise(t)}});var R,M,W=/[\t\r\n]/g,$=/\r/g,B=/^(?:input|select|textarea|button)$/i;x.fn.extend({attr:function(e,t){return x.access(this,x.attr,e,t,arguments.length>1)},removeAttr:function(e){return this.each(function(){x.removeAttr(this,e)})},prop:function(e,t){return x.access(this,x.prop,e,t,arguments.length>1)},removeProp:function(e){return this.each(function(){delete this[x.propFix[e]||e]})},addClass:function(e){var t,n,r,i,o,s=0,a=this.length,u="string"==typeof e&&e;if(x.isFunction(e))return this.each(function(t){x(this).addClass(e.call(this,t,this.className))});if(u)for(t=(e||"").match(w)||[];a>s;s++)if(n=this[s],r=1===n.nodeType&&(n.className?(" "+n.className+" ").replace(W," "):" ")){o=0;while(i=t[o++])0>r.indexOf(" "+i+" ")&&(r+=i+" ");n.className=x.trim(r)}return this},removeClass:function(e){var t,n,r,i,o,s=0,a=this.length,u=0===arguments.length||"string"==typeof e&&e;if(x.isFunction(e))return this.each(function(t){x(this).removeClass(e.call(this,t,this.className))});if(u)for(t=(e||"").match(w)||[];a>s;s++)if(n=this[s],r=1===n.nodeType&&(n.className?(" "+n.className+" ").replace(W," "):"")){o=0;while(i=t[o++])while(r.indexOf(" "+i+" ")>=0)r=r.replace(" "+i+" "," ");n.className=e?x.trim(r):""}return this},toggleClass:function(e,t){var n=typeof e,i="boolean"==typeof t;return x.isFunction(e)?this.each(function(n){x(this).toggleClass(e.call(this,n,this.className,t),t)}):this.each(function(){if("string"===n){var o,s=0,a=x(this),u=t,l=e.match(w)||[];while(o=l[s++])u=i?u:!a.hasClass(o),a[u?"addClass":"removeClass"](o)}else(n===r||"boolean"===n)&&(this.className&&q.set(this,"__className__",this.className),this.className=this.className||e===!1?"":q.get(this,"__className__")||"")})},hasClass:function(e){var t=" "+e+" ",n=0,r=this.length;for(;r>n;n++)if(1===this[n].nodeType&&(" "+this[n].className+" ").replace(W," ").indexOf(t)>=0)return!0;return!1},val:function(e){var t,n,r,i=this[0];{if(arguments.length)return r=x.isFunction(e),this.each(function(n){var i,o=x(this);1===this.nodeType&&(i=r?e.call(this,n,o.val()):e,null==i?i="":"number"==typeof i?i+="":x.isArray(i)&&(i=x.map(i,function(e){return null==e?"":e+""})),t=x.valHooks[this.type]||x.valHooks[this.nodeName.toLowerCase()],t&&"set"in t&&t.set(this,i,"value")!==undefined||(this.value=i))});if(i)return t=x.valHooks[i.type]||x.valHooks[i.nodeName.toLowerCase()],t&&"get"in t&&(n=t.get(i,"value"))!==undefined?n:(n=i.value,"string"==typeof n?n.replace($,""):null==n?"":n)}}}),x.extend({valHooks:{option:{get:function(e){var t=e.attributes.value;return!t||t.specified?e.value:e.text}},select:{get:function(e){var t,n,r=e.options,i=e.selectedIndex,o="select-one"===e.type||0>i,s=o?null:[],a=o?i+1:r.length,u=0>i?a:o?i:0;for(;a>u;u++)if(n=r[u],!(!n.selected&&u!==i||(x.support.optDisabled?n.disabled:null!==n.getAttribute("disabled"))||n.parentNode.disabled&&x.nodeName(n.parentNode,"optgroup"))){if(t=x(n).val(),o)return t;s.push(t)}return s},set:function(e,t){var n,r,i=e.options,o=x.makeArray(t),s=i.length;while(s--)r=i[s],(r.selected=x.inArray(x(r).val(),o)>=0)&&(n=!0);return n||(e.selectedIndex=-1),o}}},attr:function(e,t,n){var i,o,s=e.nodeType;if(e&&3!==s&&8!==s&&2!==s)return typeof e.getAttribute===r?x.prop(e,t,n):(1===s&&x.isXMLDoc(e)||(t=t.toLowerCase(),i=x.attrHooks[t]||(x.expr.match.boolean.test(t)?M:R)),n===undefined?i&&"get"in i&&null!==(o=i.get(e,t))?o:(o=x.find.attr(e,t),null==o?undefined:o):null!==n?i&&"set"in i&&(o=i.set(e,n,t))!==undefined?o:(e.setAttribute(t,n+""),n):(x.removeAttr(e,t),undefined))},removeAttr:function(e,t){var n,r,i=0,o=t&&t.match(w);if(o&&1===e.nodeType)while(n=o[i++])r=x.propFix[n]||n,x.expr.match.boolean.test(n)&&(e[r]=!1),e.removeAttribute(n)},attrHooks:{type:{set:function(e,t){if(!x.support.radioValue&&"radio"===t&&x.nodeName(e,"input")){var n=e.value;return e.setAttribute("type",t),n&&(e.value=n),t}}}},propFix:{"for":"htmlFor","class":"className"},prop:function(e,t,n){var r,i,o,s=e.nodeType;if(e&&3!==s&&8!==s&&2!==s)return o=1!==s||!x.isXMLDoc(e),o&&(t=x.propFix[t]||t,i=x.propHooks[t]),n!==undefined?i&&"set"in i&&(r=i.set(e,n,t))!==undefined?r:e[t]=n:i&&"get"in i&&null!==(r=i.get(e,t))?r:e[t]},propHooks:{tabIndex:{get:function(e){return e.hasAttribute("tabindex")||B.test(e.nodeName)||e.href?e.tabIndex:-1}}}}),M={set:function(e,t,n){return t===!1?x.removeAttr(e,n):e.setAttribute(n,n),n}},x.each(x.expr.match.boolean.source.match(/\w+/g),function(e,t){var n=x.expr.attrHandle[t]||x.find.attr;x.expr.attrHandle[t]=function(e,t,r){var i=x.expr.attrHandle[t],o=r?undefined:(x.expr.attrHandle[t]=undefined)!=n(e,t,r)?t.toLowerCase():null;return x.expr.attrHandle[t]=i,o}}),x.support.optSelected||(x.propHooks.selected={get:function(e){var t=e.parentNode;return t&&t.parentNode&&t.parentNode.selectedIndex,null}}),x.each(["tabIndex","readOnly","maxLength","cellSpacing","cellPadding","rowSpan","colSpan","useMap","frameBorder","contentEditable"],function(){x.propFix[this.toLowerCase()]=this}),x.each(["radio","checkbox"],function(){x.valHooks[this]={set:function(e,t){return x.isArray(t)?e.checked=x.inArray(x(e).val(),t)>=0:undefined}},x.support.checkOn||(x.valHooks[this].get=function(e){return null===e.getAttribute("value")?"on":e.value})});var I=/^key/,z=/^(?:mouse|contextmenu)|click/,_=/^(?:focusinfocus|focusoutblur)$/,X=/^([^.]*)(?:\.(.+)|)$/;function U(){return!0}function Y(){return!1}function V(){try{return o.activeElement}catch(e){}}x.event={global:{},add:function(e,t,n,i,o){var s,a,u,l,c,f,p,h,d,g,m,y=q.get(e);if(y){n.handler&&(s=n,n=s.handler,o=s.selector),n.guid||(n.guid=x.guid++),(l=y.events)||(l=y.events={}),(a=y.handle)||(a=y.handle=function(e){return typeof x===r||e&&x.event.triggered===e.type?undefined:x.event.dispatch.apply(a.elem,arguments)},a.elem=e),t=(t||"").match(w)||[""],c=t.length;while(c--)u=X.exec(t[c])||[],d=m=u[1],g=(u[2]||"").split(".").sort(),d&&(p=x.event.special[d]||{},d=(o?p.delegateType:p.bindType)||d,p=x.event.special[d]||{},f=x.extend({type:d,origType:m,data:i,handler:n,guid:n.guid,selector:o,needsContext:o&&x.expr.match.needsContext.test(o),namespace:g.join(".")},s),(h=l[d])||(h=l[d]=[],h.delegateCount=0,p.setup&&p.setup.call(e,i,g,a)!==!1||e.addEventListener&&e.addEventListener(d,a,!1)),p.add&&(p.add.call(e,f),f.handler.guid||(f.handler.guid=n.guid)),o?h.splice(h.delegateCount++,0,f):h.push(f),x.event.global[d]=!0);e=null}},remove:function(e,t,n,r,i){var o,s,a,u,l,c,f,p,h,d,g,m=q.hasData(e)&&q.get(e);if(m&&(u=m.events)){t=(t||"").match(w)||[""],l=t.length;while(l--)if(a=X.exec(t[l])||[],h=g=a[1],d=(a[2]||"").split(".").sort(),h){f=x.event.special[h]||{},h=(r?f.delegateType:f.bindType)||h,p=u[h]||[],a=a[2]&&RegExp("(^|\\.)"+d.join("\\.(?:.*\\.|)")+"(\\.|$)"),s=o=p.length;while(o--)c=p[o],!i&&g!==c.origType||n&&n.guid!==c.guid||a&&!a.test(c.namespace)||r&&r!==c.selector&&("**"!==r||!c.selector)||(p.splice(o,1),c.selector&&p.delegateCount--,f.remove&&f.remove.call(e,c));s&&!p.length&&(f.teardown&&f.teardown.call(e,d,m.handle)!==!1||x.removeEvent(e,h,m.handle),delete u[h])}else for(h in u)x.event.remove(e,h+t[l],n,r,!0);x.isEmptyObject(u)&&(delete m.handle,q.remove(e,"events"))}},trigger:function(t,n,r,i){var s,a,u,l,c,f,p,h=[r||o],d=y.call(t,"type")?t.type:t,g=y.call(t,"namespace")?t.namespace.split("."):[];if(a=u=r=r||o,3!==r.nodeType&&8!==r.nodeType&&!_.test(d+x.event.triggered)&&(d.indexOf(".")>=0&&(g=d.split("."),d=g.shift(),g.sort()),c=0>d.indexOf(":")&&"on"+d,t=t[x.expando]?t:new x.Event(d,"object"==typeof t&&t),t.isTrigger=i?2:3,t.namespace=g.join("."),t.namespace_re=t.namespace?RegExp("(^|\\.)"+g.join("\\.(?:.*\\.|)")+"(\\.|$)"):null,t.result=undefined,t.target||(t.target=r),n=null==n?[t]:x.makeArray(n,[t]),p=x.event.special[d]||{},i||!p.trigger||p.trigger.apply(r,n)!==!1)){if(!i&&!p.noBubble&&!x.isWindow(r)){for(l=p.delegateType||d,_.test(l+d)||(a=a.parentNode);a;a=a.parentNode)h.push(a),u=a;u===(r.ownerDocument||o)&&h.push(u.defaultView||u.parentWindow||e)}s=0;while((a=h[s++])&&!t.isPropagationStopped())t.type=s>1?l:p.bindType||d,f=(q.get(a,"events")||{})[t.type]&&q.get(a,"handle"),f&&f.apply(a,n),f=c&&a[c],f&&x.acceptData(a)&&f.apply&&f.apply(a,n)===!1&&t.preventDefault();return t.type=d,i||t.isDefaultPrevented()||p._default&&p._default.apply(h.pop(),n)!==!1||!x.acceptData(r)||c&&x.isFunction(r[d])&&!x.isWindow(r)&&(u=r[c],u&&(r[c]=null),x.event.triggered=d,r[d](),x.event.triggered=undefined,u&&(r[c]=u)),t.result}},dispatch:function(e){e=x.event.fix(e);var t,n,r,i,o,s=[],a=d.call(arguments),u=(q.get(this,"events")||{})[e.type]||[],l=x.event.special[e.type]||{};if(a[0]=e,e.delegateTarget=this,!l.preDispatch||l.preDispatch.call(this,e)!==!1){s=x.event.handlers.call(this,e,u),t=0;while((i=s[t++])&&!e.isPropagationStopped()){e.currentTarget=i.elem,n=0;while((o=i.handlers[n++])&&!e.isImmediatePropagationStopped())(!e.namespace_re||e.namespace_re.test(o.namespace))&&(e.handleObj=o,e.data=o.data,r=((x.event.special[o.origType]||{}).handle||o.handler).apply(i.elem,a),r!==undefined&&(e.result=r)===!1&&(e.preventDefault(),e.stopPropagation()))}return l.postDispatch&&l.postDispatch.call(this,e),e.result}},handlers:function(e,t){var n,r,i,o,s=[],a=t.delegateCount,u=e.target;if(a&&u.nodeType&&(!e.button||"click"!==e.type))for(;u!==this;u=u.parentNode||this)if(u.disabled!==!0||"click"!==e.type){for(r=[],n=0;a>n;n++)o=t[n],i=o.selector+" ",r[i]===undefined&&(r[i]=o.needsContext?x(i,this).index(u)>=0:x.find(i,this,null,[u]).length),r[i]&&r.push(o);r.length&&s.push({elem:u,handlers:r})}return t.length>a&&s.push({elem:this,handlers:t.slice(a)}),s},props:"altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),fixHooks:{},keyHooks:{props:"char charCode key keyCode".split(" "),filter:function(e,t){return null==e.which&&(e.which=null!=t.charCode?t.charCode:t.keyCode),e}},mouseHooks:{props:"button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement".split(" "),filter:function(e,t){var n,r,i,s=t.button;return null==e.pageX&&null!=t.clientX&&(n=e.target.ownerDocument||o,r=n.documentElement,i=n.body,e.pageX=t.clientX+(r&&r.scrollLeft||i&&i.scrollLeft||0)-(r&&r.clientLeft||i&&i.clientLeft||0),e.pageY=t.clientY+(r&&r.scrollTop||i&&i.scrollTop||0)-(r&&r.clientTop||i&&i.clientTop||0)),e.which||s===undefined||(e.which=1&s?1:2&s?3:4&s?2:0),e}},fix:function(e){if(e[x.expando])return e;var t,n,r,i=e.type,o=e,s=this.fixHooks[i];s||(this.fixHooks[i]=s=z.test(i)?this.mouseHooks:I.test(i)?this.keyHooks:{}),r=s.props?this.props.concat(s.props):this.props,e=new x.Event(o),t=r.length;while(t--)n=r[t],e[n]=o[n];return 3===e.target.nodeType&&(e.target=e.target.parentNode),s.filter?s.filter(e,o):e},special:{load:{noBubble:!0},focus:{trigger:function(){return this!==V()&&this.focus?(this.focus(),!1):undefined},delegateType:"focusin"},blur:{trigger:function(){return this===V()&&this.blur?(this.blur(),!1):undefined},delegateType:"focusout"},click:{trigger:function(){return"checkbox"===this.type&&this.click&&x.nodeName(this,"input")?(this.click(),!1):undefined},_default:function(e){return x.nodeName(e.target,"a")}},beforeunload:{postDispatch:function(e){e.result!==undefined&&(e.originalEvent.returnValue=e.result)}}},simulate:function(e,t,n,r){var i=x.extend(new x.Event,n,{type:e,isSimulated:!0,originalEvent:{}});r?x.event.trigger(i,null,t):x.event.dispatch.call(t,i),i.isDefaultPrevented()&&n.preventDefault()}},x.removeEvent=function(e,t,n){e.removeEventListener&&e.removeEventListener(t,n,!1)},x.Event=function(e,t){return this instanceof x.Event?(e&&e.type?(this.originalEvent=e,this.type=e.type,this.isDefaultPrevented=e.defaultPrevented||e.getPreventDefault&&e.getPreventDefault()?U:Y):this.type=e,t&&x.extend(this,t),this.timeStamp=e&&e.timeStamp||x.now(),this[x.expando]=!0,undefined):new x.Event(e,t)},x.Event.prototype={isDefaultPrevented:Y,isPropagationStopped:Y,isImmediatePropagationStopped:Y,preventDefault:function(){var e=this.originalEvent;this.isDefaultPrevented=U,e&&e.preventDefault&&e.preventDefault()},stopPropagation:function(){var e=this.originalEvent;this.isPropagationStopped=U,e&&e.stopPropagation&&e.stopPropagation()},stopImmediatePropagation:function(){this.isImmediatePropagationStopped=U,this.stopPropagation()}},x.each({mouseenter:"mouseover",mouseleave:"mouseout"},function(e,t){x.event.special[e]={delegateType:t,bindType:t,handle:function(e){var n,r=this,i=e.relatedTarget,o=e.handleObj;return(!i||i!==r&&!x.contains(r,i))&&(e.type=o.origType,n=o.handler.apply(this,arguments),e.type=t),n}}}),x.support.focusinBubbles||x.each({focus:"focusin",blur:"focusout"},function(e,t){var n=0,r=function(e){x.event.simulate(t,e.target,x.event.fix(e),!0)};x.event.special[t]={setup:function(){0===n++&&o.addEventListener(e,r,!0)},teardown:function(){0===--n&&o.removeEventListener(e,r,!0)}}}),x.fn.extend({on:function(e,t,n,r,i){var o,s;if("object"==typeof e){"string"!=typeof t&&(n=n||t,t=undefined);for(s in e)this.on(s,t,n,e[s],i);return this}if(null==n&&null==r?(r=t,n=t=undefined):null==r&&("string"==typeof t?(r=n,n=undefined):(r=n,n=t,t=undefined)),r===!1)r=Y;else if(!r)return this;return 1===i&&(o=r,r=function(e){return x().off(e),o.apply(this,arguments)},r.guid=o.guid||(o.guid=x.guid++)),this.each(function(){x.event.add(this,e,r,n,t)})},one:function(e,t,n,r){return this.on(e,t,n,r,1)},off:function(e,t,n){var r,i;if(e&&e.preventDefault&&e.handleObj)return r=e.handleObj,x(e.delegateTarget).off(r.namespace?r.origType+"."+r.namespace:r.origType,r.selector,r.handler),this;if("object"==typeof e){for(i in e)this.off(i,t,e[i]);return this}return(t===!1||"function"==typeof t)&&(n=t,t=undefined),n===!1&&(n=Y),this.each(function(){x.event.remove(this,e,n,t)})},trigger:function(e,t){return this.each(function(){x.event.trigger(e,t,this)})},triggerHandler:function(e,t){var n=this[0];return n?x.event.trigger(e,t,n,!0):undefined}});var G=/^.[^:#\[\.,]*$/,J=x.expr.match.needsContext,Q={children:!0,contents:!0,next:!0,prev:!0};x.fn.extend({find:function(e){var t,n,r,i=this.length;if("string"!=typeof e)return t=this,this.pushStack(x(e).filter(function(){for(r=0;i>r;r++)if(x.contains(t[r],this))return!0}));for(n=[],r=0;i>r;r++)x.find(e,this[r],n);return n=this.pushStack(i>1?x.unique(n):n),n.selector=(this.selector?this.selector+" ":"")+e,n},has:function(e){var t=x(e,this),n=t.length;return this.filter(function(){var e=0;for(;n>e;e++)if(x.contains(this,t[e]))return!0})},not:function(e){return this.pushStack(Z(this,e||[],!0))},filter:function(e){return this.pushStack(Z(this,e||[],!1))},is:function(e){return!!e&&("string"==typeof e?J.test(e)?x(e,this.context).index(this[0])>=0:x.filter(e,this).length>0:this.filter(e).length>0)},closest:function(e,t){var n,r=0,i=this.length,o=[],s=J.test(e)||"string"!=typeof e?x(e,t||this.context):0;for(;i>r;r++)for(n=this[r];n&&n!==t;n=n.parentNode)if(11>n.nodeType&&(s?s.index(n)>-1:1===n.nodeType&&x.find.matchesSelector(n,e))){n=o.push(n);break}return this.pushStack(o.length>1?x.unique(o):o)},index:function(e){return e?"string"==typeof e?g.call(x(e),this[0]):g.call(this,e.jquery?e[0]:e):this[0]&&this[0].parentNode?this.first().prevAll().length:-1},add:function(e,t){var n="string"==typeof e?x(e,t):x.makeArray(e&&e.nodeType?[e]:e),r=x.merge(this.get(),n);return this.pushStack(x.unique(r))},addBack:function(e){return this.add(null==e?this.prevObject:this.prevObject.filter(e))}});function K(e,t){while((e=e[t])&&1!==e.nodeType);return e}x.each({parent:function(e){var t=e.parentNode;return t&&11!==t.nodeType?t:null},parents:function(e){return x.dir(e,"parentNode")},parentsUntil:function(e,t,n){return x.dir(e,"parentNode",n)},next:function(e){return K(e,"nextSibling")},prev:function(e){return K(e,"previousSibling")},nextAll:function(e){return x.dir(e,"nextSibling")},prevAll:function(e){return x.dir(e,"previousSibling")},nextUntil:function(e,t,n){return x.dir(e,"nextSibling",n)},prevUntil:function(e,t,n){return x.dir(e,"previousSibling",n)},siblings:function(e){return x.sibling((e.parentNode||{}).firstChild,e)},children:function(e){return x.sibling(e.firstChild)},contents:function(e){return x.nodeName(e,"iframe")?e.contentDocument||e.contentWindow.document:x.merge([],e.childNodes)}},function(e,t){x.fn[e]=function(n,r){var i=x.map(this,t,n);return"Until"!==e.slice(-5)&&(r=n),r&&"string"==typeof r&&(i=x.filter(r,i)),this.length>1&&(Q[e]||x.unique(i),"p"===e[0]&&i.reverse()),this.pushStack(i)}}),x.extend({filter:function(e,t,n){var r=t[0];return n&&(e=":not("+e+")"),1===t.length&&1===r.nodeType?x.find.matchesSelector(r,e)?[r]:[]:x.find.matches(e,x.grep(t,function(e){return 1===e.nodeType}))},dir:function(e,t,n){var r=[],i=n!==undefined;while((e=e[t])&&9!==e.nodeType)if(1===e.nodeType){if(i&&x(e).is(n))break;r.push(e)}return r},sibling:function(e,t){var n=[];for(;e;e=e.nextSibling)1===e.nodeType&&e!==t&&n.push(e);return n}});function Z(e,t,n){if(x.isFunction(t))return x.grep(e,function(e,r){return!!t.call(e,r,e)!==n});if(t.nodeType)return x.grep(e,function(e){return e===t!==n});if("string"==typeof t){if(G.test(t))return x.filter(t,e,n);t=x.filter(t,e)}return x.grep(e,function(e){return g.call(t,e)>=0!==n})}var et=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,tt=/<([\w:]+)/,nt=/<|&#?\w+;/,rt=/<(?:script|style|link)/i,it=/^(?:checkbox|radio)$/i,ot=/checked\s*(?:[^=]|=\s*.checked.)/i,st=/^$|\/(?:java|ecma)script/i,at=/^true\/(.*)/,ut=/^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,lt={option:[1,"<select multiple='multiple'>","</select>"],thead:[1,"<table>","</table>"],tr:[2,"<table><tbody>","</tbody></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],_default:[0,"",""]};lt.optgroup=lt.option,lt.tbody=lt.tfoot=lt.colgroup=lt.caption=lt.col=lt.thead,lt.th=lt.td,x.fn.extend({text:function(e){return x.access(this,function(e){return e===undefined?x.text(this):this.empty().append((this[0]&&this[0].ownerDocument||o).createTextNode(e))},null,e,arguments.length)},append:function(){return this.domManip(arguments,function(e){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var t=ct(this,e);t.appendChild(e)}})},prepend:function(){return this.domManip(arguments,function(e){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var t=ct(this,e);t.insertBefore(e,t.firstChild)}})},before:function(){return this.domManip(arguments,function(e){this.parentNode&&this.parentNode.insertBefore(e,this)})},after:function(){return this.domManip(arguments,function(e){this.parentNode&&this.parentNode.insertBefore(e,this.nextSibling)})},remove:function(e,t){var n,r=e?x.filter(e,this):this,i=0;for(;null!=(n=r[i]);i++)t||1!==n.nodeType||x.cleanData(gt(n)),n.parentNode&&(t&&x.contains(n.ownerDocument,n)&&ht(gt(n,"script")),n.parentNode.removeChild(n));return this},empty:function(){var e,t=0;for(;null!=(e=this[t]);t++)1===e.nodeType&&(x.cleanData(gt(e,!1)),e.textContent="");return this},clone:function(e,t){return e=null==e?!1:e,t=null==t?e:t,this.map(function(){return x.clone(this,e,t)})},html:function(e){return x.access(this,function(e){var t=this[0]||{},n=0,r=this.length;if(e===undefined&&1===t.nodeType)return t.innerHTML;if("string"==typeof e&&!rt.test(e)&&!lt[(tt.exec(e)||["",""])[1].toLowerCase()]){e=e.replace(et,"<$1></$2>");try{for(;r>n;n++)t=this[n]||{},1===t.nodeType&&(x.cleanData(gt(t,!1)),t.innerHTML=e);t=0}catch(i){}}t&&this.empty().append(e)},null,e,arguments.length)},replaceWith:function(){var e=x.map(this,function(e){return[e.nextSibling,e.parentNode]}),t=0;return this.domManip(arguments,function(n){var r=e[t++],i=e[t++];i&&(x(this).remove(),i.insertBefore(n,r))},!0),t?this:this.remove()},detach:function(e){return this.remove(e,!0)},domManip:function(e,t,n){e=p.apply([],e);var r,i,o,s,a,u,l=0,c=this.length,f=this,h=c-1,d=e[0],g=x.isFunction(d);if(g||!(1>=c||"string"!=typeof d||x.support.checkClone)&&ot.test(d))return this.each(function(r){var i=f.eq(r);g&&(e[0]=d.call(this,r,i.html())),i.domManip(e,t,n)});if(c&&(r=x.buildFragment(e,this[0].ownerDocument,!1,!n&&this),i=r.firstChild,1===r.childNodes.length&&(r=i),i)){for(o=x.map(gt(r,"script"),ft),s=o.length;c>l;l++)a=r,l!==h&&(a=x.clone(a,!0,!0),s&&x.merge(o,gt(a,"script"))),t.call(this[l],a,l);if(s)for(u=o[o.length-1].ownerDocument,x.map(o,pt),l=0;s>l;l++)a=o[l],st.test(a.type||"")&&!q.access(a,"globalEval")&&x.contains(u,a)&&(a.src?x._evalUrl(a.src):x.globalEval(a.textContent.replace(ut,"")))}return this}}),x.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(e,t){x.fn[e]=function(e){var n,r=[],i=x(e),o=i.length-1,s=0;for(;o>=s;s++)n=s===o?this:this.clone(!0),x(i[s])[t](n),h.apply(r,n.get());return this.pushStack(r)}}),x.extend({clone:function(e,t,n){var r,i,o,s,a=e.cloneNode(!0),u=x.contains(e.ownerDocument,e);if(!(x.support.noCloneChecked||1!==e.nodeType&&11!==e.nodeType||x.isXMLDoc(e)))for(s=gt(a),o=gt(e),r=0,i=o.length;i>r;r++)mt(o[r],s[r]);if(t)if(n)for(o=o||gt(e),s=s||gt(a),r=0,i=o.length;i>r;r++)dt(o[r],s[r]);else dt(e,a);return s=gt(a,"script"),s.length>0&&ht(s,!u&&gt(e,"script")),a},buildFragment:function(e,t,n,r){var i,o,s,a,u,l,c=0,f=e.length,p=t.createDocumentFragment(),h=[];for(;f>c;c++)if(i=e[c],i||0===i)if("object"===x.type(i))x.merge(h,i.nodeType?[i]:i);else if(nt.test(i)){o=o||p.appendChild(t.createElement("div")),s=(tt.exec(i)||["",""])[1].toLowerCase(),a=lt[s]||lt._default,o.innerHTML=a[1]+i.replace(et,"<$1></$2>")+a[2],l=a[0];while(l--)o=o.firstChild;x.merge(h,o.childNodes),o=p.firstChild,o.textContent=""}else h.push(t.createTextNode(i));p.textContent="",c=0;while(i=h[c++])if((!r||-1===x.inArray(i,r))&&(u=x.contains(i.ownerDocument,i),o=gt(p.appendChild(i),"script"),u&&ht(o),n)){l=0;while(i=o[l++])st.test(i.type||"")&&n.push(i)}return p},cleanData:function(e){var t,n,r,i=e.length,o=0,s=x.event.special;for(;i>o;o++){if(n=e[o],x.acceptData(n)&&(t=q.access(n)))for(r in t.events)s[r]?x.event.remove(n,r):x.removeEvent(n,r,t.handle);L.discard(n),q.discard(n)}},_evalUrl:function(e){return x.ajax({url:e,type:"GET",dataType:"text",async:!1,global:!1,success:x.globalEval})}});function ct(e,t){return x.nodeName(e,"table")&&x.nodeName(1===t.nodeType?t:t.firstChild,"tr")?e.getElementsByTagName("tbody")[0]||e.appendChild(e.ownerDocument.createElement("tbody")):e}function ft(e){return e.type=(null!==e.getAttribute("type"))+"/"+e.type,e}function pt(e){var t=at.exec(e.type);return t?e.type=t[1]:e.removeAttribute("type"),e}function ht(e,t){var n=e.length,r=0;for(;n>r;r++)q.set(e[r],"globalEval",!t||q.get(t[r],"globalEval"))}function dt(e,t){var n,r,i,o,s,a,u,l;if(1===t.nodeType){if(q.hasData(e)&&(o=q.access(e),s=x.extend({},o),l=o.events,q.set(t,s),l)){delete s.handle,s.events={};for(i in l)for(n=0,r=l[i].length;r>n;n++)x.event.add(t,i,l[i][n])}L.hasData(e)&&(a=L.access(e),u=x.extend({},a),L.set(t,u))}}function gt(e,t){var n=e.getElementsByTagName?e.getElementsByTagName(t||"*"):e.querySelectorAll?e.querySelectorAll(t||"*"):[];return t===undefined||t&&x.nodeName(e,t)?x.merge([e],n):n}function mt(e,t){var n=t.nodeName.toLowerCase();"input"===n&&it.test(e.type)?t.checked=e.checked:("input"===n||"textarea"===n)&&(t.defaultValue=e.defaultValue)}x.fn.extend({wrapAll:function(e){var t;return x.isFunction(e)?this.each(function(t){x(this).wrapAll(e.call(this,t))}):(this[0]&&(t=x(e,this[0].ownerDocument).eq(0).clone(!0),this[0].parentNode&&t.insertBefore(this[0]),t.map(function(){var e=this;while(e.firstElementChild)e=e.firstElementChild;return e}).append(this)),this)},wrapInner:function(e){return x.isFunction(e)?this.each(function(t){x(this).wrapInner(e.call(this,t))}):this.each(function(){var t=x(this),n=t.contents();n.length?n.wrapAll(e):t.append(e)})},wrap:function(e){var t=x.isFunction(e);return this.each(function(n){x(this).wrapAll(t?e.call(this,n):e)})},unwrap:function(){return this.parent().each(function(){x.nodeName(this,"body")||x(this).replaceWith(this.childNodes)}).end()}});var yt,vt,xt=/^(none|table(?!-c[ea]).+)/,bt=/^margin/,wt=RegExp("^("+b+")(.*)$","i"),Tt=RegExp("^("+b+")(?!px)[a-z%]+$","i"),Ct=RegExp("^([+-])=("+b+")","i"),kt={BODY:"block"},Nt={position:"absolute",visibility:"hidden",display:"block"},Et={letterSpacing:0,fontWeight:400},St=["Top","Right","Bottom","Left"],jt=["Webkit","O","Moz","ms"];function Dt(e,t){if(t in e)return t;var n=t.charAt(0).toUpperCase()+t.slice(1),r=t,i=jt.length;while(i--)if(t=jt[i]+n,t in e)return t;return r}function At(e,t){return e=t||e,"none"===x.css(e,"display")||!x.contains(e.ownerDocument,e)}function Lt(t){return e.getComputedStyle(t,null)}function qt(e,t){var n,r,i,o=[],s=0,a=e.length;for(;a>s;s++)r=e[s],r.style&&(o[s]=q.get(r,"olddisplay"),n=r.style.display,t?(o[s]||"none"!==n||(r.style.display=""),""===r.style.display&&At(r)&&(o[s]=q.access(r,"olddisplay",Pt(r.nodeName)))):o[s]||(i=At(r),(n&&"none"!==n||!i)&&q.set(r,"olddisplay",i?n:x.css(r,"display"))));for(s=0;a>s;s++)r=e[s],r.style&&(t&&"none"!==r.style.display&&""!==r.style.display||(r.style.display=t?o[s]||"":"none"));return e}x.fn.extend({css:function(e,t){return x.access(this,function(e,t,n){var r,i,o={},s=0;if(x.isArray(t)){for(r=Lt(e),i=t.length;i>s;s++)o[t[s]]=x.css(e,t[s],!1,r);return o}return n!==undefined?x.style(e,t,n):x.css(e,t)},e,t,arguments.length>1)},show:function(){return qt(this,!0)},hide:function(){return qt(this)},toggle:function(e){var t="boolean"==typeof e;return this.each(function(){(t?e:At(this))?x(this).show():x(this).hide()})}}),x.extend({cssHooks:{opacity:{get:function(e,t){if(t){var n=yt(e,"opacity");return""===n?"1":n}}}},cssNumber:{columnCount:!0,fillOpacity:!0,fontWeight:!0,lineHeight:!0,opacity:!0,orphans:!0,widows:!0,zIndex:!0,zoom:!0},cssProps:{"float":"cssFloat"},style:function(e,t,n,r){if(e&&3!==e.nodeType&&8!==e.nodeType&&e.style){var i,o,s,a=x.camelCase(t),u=e.style;return t=x.cssProps[a]||(x.cssProps[a]=Dt(u,a)),s=x.cssHooks[t]||x.cssHooks[a],n===undefined?s&&"get"in s&&(i=s.get(e,!1,r))!==undefined?i:u[t]:(o=typeof n,"string"===o&&(i=Ct.exec(n))&&(n=(i[1]+1)*i[2]+parseFloat(x.css(e,t)),o="number"),null==n||"number"===o&&isNaN(n)||("number"!==o||x.cssNumber[a]||(n+="px"),x.support.clearCloneStyle||""!==n||0!==t.indexOf("background")||(u[t]="inherit"),s&&"set"in s&&(n=s.set(e,n,r))===undefined||(u[t]=n)),undefined)}},css:function(e,t,n,r){var i,o,s,a=x.camelCase(t);return t=x.cssProps[a]||(x.cssProps[a]=Dt(e.style,a)),s=x.cssHooks[t]||x.cssHooks[a],s&&"get"in s&&(i=s.get(e,!0,n)),i===undefined&&(i=yt(e,t,r)),"normal"===i&&t in Et&&(i=Et[t]),""===n||n?(o=parseFloat(i),n===!0||x.isNumeric(o)?o||0:i):i}}),yt=function(e,t,n){var r,i,o,s=n||Lt(e),a=s?s.getPropertyValue(t)||s[t]:undefined,u=e.style;return s&&(""!==a||x.contains(e.ownerDocument,e)||(a=x.style(e,t)),Tt.test(a)&&bt.test(t)&&(r=u.width,i=u.minWidth,o=u.maxWidth,u.minWidth=u.maxWidth=u.width=a,a=s.width,u.width=r,u.minWidth=i,u.maxWidth=o)),a};function Ht(e,t,n){var r=wt.exec(t);return r?Math.max(0,r[1]-(n||0))+(r[2]||"px"):t}function Ot(e,t,n,r,i){var o=n===(r?"border":"content")?4:"width"===t?1:0,s=0;for(;4>o;o+=2)"margin"===n&&(s+=x.css(e,n+St[o],!0,i)),r?("content"===n&&(s-=x.css(e,"padding"+St[o],!0,i)),"margin"!==n&&(s-=x.css(e,"border"+St[o]+"Width",!0,i))):(s+=x.css(e,"padding"+St[o],!0,i),"padding"!==n&&(s+=x.css(e,"border"+St[o]+"Width",!0,i)));return s}function Ft(e,t,n){var r=!0,i="width"===t?e.offsetWidth:e.offsetHeight,o=Lt(e),s=x.support.boxSizing&&"border-box"===x.css(e,"boxSizing",!1,o);if(0>=i||null==i){if(i=yt(e,t,o),(0>i||null==i)&&(i=e.style[t]),Tt.test(i))return i;r=s&&(x.support.boxSizingReliable||i===e.style[t]),i=parseFloat(i)||0}return i+Ot(e,t,n||(s?"border":"content"),r,o)+"px"}function Pt(e){var t=o,n=kt[e];return n||(n=Rt(e,t),"none"!==n&&n||(vt=(vt||x("<iframe frameborder='0' width='0' height='0'/>").css("cssText","display:block !important")).appendTo(t.documentElement),t=(vt[0].contentWindow||vt[0].contentDocument).document,t.write("<!doctype html><html><body>"),t.close(),n=Rt(e,t),vt.detach()),kt[e]=n),n}function Rt(e,t){var n=x(t.createElement(e)).appendTo(t.body),r=x.css(n[0],"display");return n.remove(),r}x.each(["height","width"],function(e,t){x.cssHooks[t]={get:function(e,n,r){return n?0===e.offsetWidth&&xt.test(x.css(e,"display"))?x.swap(e,Nt,function(){return Ft(e,t,r)}):Ft(e,t,r):undefined},set:function(e,n,r){var i=r&&Lt(e);return Ht(e,n,r?Ot(e,t,r,x.support.boxSizing&&"border-box"===x.css(e,"boxSizing",!1,i),i):0)}}}),x(function(){x.support.reliableMarginRight||(x.cssHooks.marginRight={get:function(e,t){return t?x.swap(e,{display:"inline-block"},yt,[e,"marginRight"]):undefined}}),!x.support.pixelPosition&&x.fn.position&&x.each(["top","left"],function(e,t){x.cssHooks[t]={get:function(e,n){return n?(n=yt(e,t),Tt.test(n)?x(e).position()[t]+"px":n):undefined}}})}),x.expr&&x.expr.filters&&(x.expr.filters.hidden=function(e){return 0>=e.offsetWidth&&0>=e.offsetHeight},x.expr.filters.visible=function(e){return!x.expr.filters.hidden(e)}),x.each({margin:"",padding:"",border:"Width"},function(e,t){x.cssHooks[e+t]={expand:function(n){var r=0,i={},o="string"==typeof n?n.split(" "):[n];for(;4>r;r++)i[e+St[r]+t]=o[r]||o[r-2]||o[0];return i}},bt.test(e)||(x.cssHooks[e+t].set=Ht)});var Mt=/%20/g,Wt=/\[\]$/,$t=/\r?\n/g,Bt=/^(?:submit|button|image|reset|file)$/i,It=/^(?:input|select|textarea|keygen)/i;x.fn.extend({serialize:function(){return x.param(this.serializeArray())},serializeArray:function(){return this.map(function(){var e=x.prop(this,"elements");return e?x.makeArray(e):this}).filter(function(){var e=this.type;return this.name&&!x(this).is(":disabled")&&It.test(this.nodeName)&&!Bt.test(e)&&(this.checked||!it.test(e))}).map(function(e,t){var n=x(this).val();return null==n?null:x.isArray(n)?x.map(n,function(e){return{name:t.name,value:e.replace($t,"\r\n")}}):{name:t.name,value:n.replace($t,"\r\n")}}).get()}}),x.param=function(e,t){var n,r=[],i=function(e,t){t=x.isFunction(t)?t():null==t?"":t,r[r.length]=encodeURIComponent(e)+"="+encodeURIComponent(t)};if(t===undefined&&(t=x.ajaxSettings&&x.ajaxSettings.traditional),x.isArray(e)||e.jquery&&!x.isPlainObject(e))x.each(e,function(){i(this.name,this.value)});else for(n in e)zt(n,e[n],t,i);return r.join("&").replace(Mt,"+")};function zt(e,t,n,r){var i;if(x.isArray(t))x.each(t,function(t,i){n||Wt.test(e)?r(e,i):zt(e+"["+("object"==typeof i?t:"")+"]",i,n,r)});else if(n||"object"!==x.type(t))r(e,t);else for(i in t)zt(e+"["+i+"]",t[i],n,r)}x.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "),function(e,t){x.fn[t]=function(e,n){return arguments.length>0?this.on(t,null,e,n):this.trigger(t)}}),x.fn.extend({hover:function(e,t){return this.mouseenter(e).mouseleave(t||e)},bind:function(e,t,n){return this.on(e,null,t,n)},unbind:function(e,t){return this.off(e,null,t)},delegate:function(e,t,n,r){return this.on(t,e,n,r)},undelegate:function(e,t,n){return 1===arguments.length?this.off(e,"**"):this.off(t,e||"**",n)}});var _t,Xt,Ut=x.now(),Yt=/\?/,Vt=/#.*$/,Gt=/([?&])_=[^&]*/,Jt=/^(.*?):[ \t]*([^\r\n]*)$/gm,Qt=/^(?:about|app|app-storage|.+-extension|file|res|widget):$/,Kt=/^(?:GET|HEAD)$/,Zt=/^\/\//,en=/^([\w.+-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/,tn=x.fn.load,nn={},rn={},on="*/".concat("*");try{Xt=i.href}catch(sn){Xt=o.createElement("a"),Xt.href="",Xt=Xt.href}_t=en.exec(Xt.toLowerCase())||[];function an(e){return function(t,n){"string"!=typeof t&&(n=t,t="*");var r,i=0,o=t.toLowerCase().match(w)||[];
if(x.isFunction(n))while(r=o[i++])"+"===r[0]?(r=r.slice(1)||"*",(e[r]=e[r]||[]).unshift(n)):(e[r]=e[r]||[]).push(n)}}function un(e,t,n,r){var i={},o=e===rn;function s(a){var u;return i[a]=!0,x.each(e[a]||[],function(e,a){var l=a(t,n,r);return"string"!=typeof l||o||i[l]?o?!(u=l):undefined:(t.dataTypes.unshift(l),s(l),!1)}),u}return s(t.dataTypes[0])||!i["*"]&&s("*")}function ln(e,t){var n,r,i=x.ajaxSettings.flatOptions||{};for(n in t)t[n]!==undefined&&((i[n]?e:r||(r={}))[n]=t[n]);return r&&x.extend(!0,e,r),e}x.fn.load=function(e,t,n){if("string"!=typeof e&&tn)return tn.apply(this,arguments);var r,i,o,s=this,a=e.indexOf(" ");return a>=0&&(r=e.slice(a),e=e.slice(0,a)),x.isFunction(t)?(n=t,t=undefined):t&&"object"==typeof t&&(i="POST"),s.length>0&&x.ajax({url:e,type:i,dataType:"html",data:t}).done(function(e){o=arguments,s.html(r?x("<div>").append(x.parseHTML(e)).find(r):e)}).complete(n&&function(e,t){s.each(n,o||[e.responseText,t,e])}),this},x.each(["ajaxStart","ajaxStop","ajaxComplete","ajaxError","ajaxSuccess","ajaxSend"],function(e,t){x.fn[t]=function(e){return this.on(t,e)}}),x.extend({active:0,lastModified:{},etag:{},ajaxSettings:{url:Xt,type:"GET",isLocal:Qt.test(_t[1]),global:!0,processData:!0,async:!0,contentType:"application/x-www-form-urlencoded; charset=UTF-8",accepts:{"*":on,text:"text/plain",html:"text/html",xml:"application/xml, text/xml",json:"application/json, text/javascript"},contents:{xml:/xml/,html:/html/,json:/json/},responseFields:{xml:"responseXML",text:"responseText",json:"responseJSON"},converters:{"* text":String,"text html":!0,"text json":x.parseJSON,"text xml":x.parseXML},flatOptions:{url:!0,context:!0}},ajaxSetup:function(e,t){return t?ln(ln(e,x.ajaxSettings),t):ln(x.ajaxSettings,e)},ajaxPrefilter:an(nn),ajaxTransport:an(rn),ajax:function(e,t){"object"==typeof e&&(t=e,e=undefined),t=t||{};var n,r,i,o,s,a,u,l,c=x.ajaxSetup({},t),f=c.context||c,p=c.context&&(f.nodeType||f.jquery)?x(f):x.event,h=x.Deferred(),d=x.Callbacks("once memory"),g=c.statusCode||{},m={},y={},v=0,b="canceled",T={readyState:0,getResponseHeader:function(e){var t;if(2===v){if(!o){o={};while(t=Jt.exec(i))o[t[1].toLowerCase()]=t[2]}t=o[e.toLowerCase()]}return null==t?null:t},getAllResponseHeaders:function(){return 2===v?i:null},setRequestHeader:function(e,t){var n=e.toLowerCase();return v||(e=y[n]=y[n]||e,m[e]=t),this},overrideMimeType:function(e){return v||(c.mimeType=e),this},statusCode:function(e){var t;if(e)if(2>v)for(t in e)g[t]=[g[t],e[t]];else T.always(e[T.status]);return this},abort:function(e){var t=e||b;return n&&n.abort(t),k(0,t),this}};if(h.promise(T).complete=d.add,T.success=T.done,T.error=T.fail,c.url=((e||c.url||Xt)+"").replace(Vt,"").replace(Zt,_t[1]+"//"),c.type=t.method||t.type||c.method||c.type,c.dataTypes=x.trim(c.dataType||"*").toLowerCase().match(w)||[""],null==c.crossDomain&&(a=en.exec(c.url.toLowerCase()),c.crossDomain=!(!a||a[1]===_t[1]&&a[2]===_t[2]&&(a[3]||("http:"===a[1]?"80":"443"))===(_t[3]||("http:"===_t[1]?"80":"443")))),c.data&&c.processData&&"string"!=typeof c.data&&(c.data=x.param(c.data,c.traditional)),un(nn,c,t,T),2===v)return T;u=c.global,u&&0===x.active++&&x.event.trigger("ajaxStart"),c.type=c.type.toUpperCase(),c.hasContent=!Kt.test(c.type),r=c.url,c.hasContent||(c.data&&(r=c.url+=(Yt.test(r)?"&":"?")+c.data,delete c.data),c.cache===!1&&(c.url=Gt.test(r)?r.replace(Gt,"$1_="+Ut++):r+(Yt.test(r)?"&":"?")+"_="+Ut++)),c.ifModified&&(x.lastModified[r]&&T.setRequestHeader("If-Modified-Since",x.lastModified[r]),x.etag[r]&&T.setRequestHeader("If-None-Match",x.etag[r])),(c.data&&c.hasContent&&c.contentType!==!1||t.contentType)&&T.setRequestHeader("Content-Type",c.contentType),T.setRequestHeader("Accept",c.dataTypes[0]&&c.accepts[c.dataTypes[0]]?c.accepts[c.dataTypes[0]]+("*"!==c.dataTypes[0]?", "+on+"; q=0.01":""):c.accepts["*"]);for(l in c.headers)T.setRequestHeader(l,c.headers[l]);if(c.beforeSend&&(c.beforeSend.call(f,T,c)===!1||2===v))return T.abort();b="abort";for(l in{success:1,error:1,complete:1})T[l](c[l]);if(n=un(rn,c,t,T)){T.readyState=1,u&&p.trigger("ajaxSend",[T,c]),c.async&&c.timeout>0&&(s=setTimeout(function(){T.abort("timeout")},c.timeout));try{v=1,n.send(m,k)}catch(C){if(!(2>v))throw C;k(-1,C)}}else k(-1,"No Transport");function k(e,t,o,a){var l,m,y,b,w,C=t;2!==v&&(v=2,s&&clearTimeout(s),n=undefined,i=a||"",T.readyState=e>0?4:0,l=e>=200&&300>e||304===e,o&&(b=cn(c,T,o)),b=fn(c,b,T,l),l?(c.ifModified&&(w=T.getResponseHeader("Last-Modified"),w&&(x.lastModified[r]=w),w=T.getResponseHeader("etag"),w&&(x.etag[r]=w)),204===e?C="nocontent":304===e?C="notmodified":(C=b.state,m=b.data,y=b.error,l=!y)):(y=C,(e||!C)&&(C="error",0>e&&(e=0))),T.status=e,T.statusText=(t||C)+"",l?h.resolveWith(f,[m,C,T]):h.rejectWith(f,[T,C,y]),T.statusCode(g),g=undefined,u&&p.trigger(l?"ajaxSuccess":"ajaxError",[T,c,l?m:y]),d.fireWith(f,[T,C]),u&&(p.trigger("ajaxComplete",[T,c]),--x.active||x.event.trigger("ajaxStop")))}return T},getJSON:function(e,t,n){return x.get(e,t,n,"json")},getScript:function(e,t){return x.get(e,undefined,t,"script")}}),x.each(["get","post"],function(e,t){x[t]=function(e,n,r,i){return x.isFunction(n)&&(i=i||r,r=n,n=undefined),x.ajax({url:e,type:t,dataType:i,data:n,success:r})}});function cn(e,t,n){var r,i,o,s,a=e.contents,u=e.dataTypes;while("*"===u[0])u.shift(),r===undefined&&(r=e.mimeType||t.getResponseHeader("Content-Type"));if(r)for(i in a)if(a[i]&&a[i].test(r)){u.unshift(i);break}if(u[0]in n)o=u[0];else{for(i in n){if(!u[0]||e.converters[i+" "+u[0]]){o=i;break}s||(s=i)}o=o||s}return o?(o!==u[0]&&u.unshift(o),n[o]):undefined}function fn(e,t,n,r){var i,o,s,a,u,l={},c=e.dataTypes.slice();if(c[1])for(s in e.converters)l[s.toLowerCase()]=e.converters[s];o=c.shift();while(o)if(e.responseFields[o]&&(n[e.responseFields[o]]=t),!u&&r&&e.dataFilter&&(t=e.dataFilter(t,e.dataType)),u=o,o=c.shift())if("*"===o)o=u;else if("*"!==u&&u!==o){if(s=l[u+" "+o]||l["* "+o],!s)for(i in l)if(a=i.split(" "),a[1]===o&&(s=l[u+" "+a[0]]||l["* "+a[0]])){s===!0?s=l[i]:l[i]!==!0&&(o=a[0],c.unshift(a[1]));break}if(s!==!0)if(s&&e["throws"])t=s(t);else try{t=s(t)}catch(f){return{state:"parsererror",error:s?f:"No conversion from "+u+" to "+o}}}return{state:"success",data:t}}x.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/(?:java|ecma)script/},converters:{"text script":function(e){return x.globalEval(e),e}}}),x.ajaxPrefilter("script",function(e){e.cache===undefined&&(e.cache=!1),e.crossDomain&&(e.type="GET")}),x.ajaxTransport("script",function(e){if(e.crossDomain){var t,n;return{send:function(r,i){t=x("<script>").prop({async:!0,charset:e.scriptCharset,src:e.url}).on("load error",n=function(e){t.remove(),n=null,e&&i("error"===e.type?404:200,e.type)}),o.head.appendChild(t[0])},abort:function(){n&&n()}}}});var pn=[],hn=/(=)\?(?=&|$)|\?\?/;x.ajaxSetup({jsonp:"callback",jsonpCallback:function(){var e=pn.pop()||x.expando+"_"+Ut++;return this[e]=!0,e}}),x.ajaxPrefilter("json jsonp",function(t,n,r){var i,o,s,a=t.jsonp!==!1&&(hn.test(t.url)?"url":"string"==typeof t.data&&!(t.contentType||"").indexOf("application/x-www-form-urlencoded")&&hn.test(t.data)&&"data");return a||"jsonp"===t.dataTypes[0]?(i=t.jsonpCallback=x.isFunction(t.jsonpCallback)?t.jsonpCallback():t.jsonpCallback,a?t[a]=t[a].replace(hn,"$1"+i):t.jsonp!==!1&&(t.url+=(Yt.test(t.url)?"&":"?")+t.jsonp+"="+i),t.converters["script json"]=function(){return s||x.error(i+" was not called"),s[0]},t.dataTypes[0]="json",o=e[i],e[i]=function(){s=arguments},r.always(function(){e[i]=o,t[i]&&(t.jsonpCallback=n.jsonpCallback,pn.push(i)),s&&x.isFunction(o)&&o(s[0]),s=o=undefined}),"script"):undefined}),x.ajaxSettings.xhr=function(){try{return new XMLHttpRequest}catch(e){}};var dn=x.ajaxSettings.xhr(),gn={0:200,1223:204},mn=0,yn={};e.ActiveXObject&&x(e).on("unload",function(){for(var e in yn)yn[e]();yn=undefined}),x.support.cors=!!dn&&"withCredentials"in dn,x.support.ajax=dn=!!dn,x.ajaxTransport(function(e){var t;return x.support.cors||dn&&!e.crossDomain?{send:function(n,r){var i,o,s=e.xhr();if(s.open(e.type,e.url,e.async,e.username,e.password),e.xhrFields)for(i in e.xhrFields)s[i]=e.xhrFields[i];e.mimeType&&s.overrideMimeType&&s.overrideMimeType(e.mimeType),e.crossDomain||n["X-Requested-With"]||(n["X-Requested-With"]="XMLHttpRequest");for(i in n)s.setRequestHeader(i,n[i]);t=function(e){return function(){t&&(delete yn[o],t=s.onload=s.onerror=null,"abort"===e?s.abort():"error"===e?r(s.status||404,s.statusText):r(gn[s.status]||s.status,s.statusText,"string"==typeof s.responseText?{text:s.responseText}:undefined,s.getAllResponseHeaders()))}},s.onload=t(),s.onerror=t("error"),t=yn[o=mn++]=t("abort"),s.send(e.hasContent&&e.data||null)},abort:function(){t&&t()}}:undefined});var vn,xn,bn=/^(?:toggle|show|hide)$/,wn=RegExp("^(?:([+-])=|)("+b+")([a-z%]*)$","i"),Tn=/queueHooks$/,Cn=[Dn],kn={"*":[function(e,t){var n,r,i=this.createTween(e,t),o=wn.exec(t),s=i.cur(),a=+s||0,u=1,l=20;if(o){if(n=+o[2],r=o[3]||(x.cssNumber[e]?"":"px"),"px"!==r&&a){a=x.css(i.elem,e,!0)||n||1;do u=u||".5",a/=u,x.style(i.elem,e,a+r);while(u!==(u=i.cur()/s)&&1!==u&&--l)}i.unit=r,i.start=a,i.end=o[1]?a+(o[1]+1)*n:n}return i}]};function Nn(){return setTimeout(function(){vn=undefined}),vn=x.now()}function En(e,t){x.each(t,function(t,n){var r=(kn[t]||[]).concat(kn["*"]),i=0,o=r.length;for(;o>i;i++)if(r[i].call(e,t,n))return})}function Sn(e,t,n){var r,i,o=0,s=Cn.length,a=x.Deferred().always(function(){delete u.elem}),u=function(){if(i)return!1;var t=vn||Nn(),n=Math.max(0,l.startTime+l.duration-t),r=n/l.duration||0,o=1-r,s=0,u=l.tweens.length;for(;u>s;s++)l.tweens[s].run(o);return a.notifyWith(e,[l,o,n]),1>o&&u?n:(a.resolveWith(e,[l]),!1)},l=a.promise({elem:e,props:x.extend({},t),opts:x.extend(!0,{specialEasing:{}},n),originalProperties:t,originalOptions:n,startTime:vn||Nn(),duration:n.duration,tweens:[],createTween:function(t,n){var r=x.Tween(e,l.opts,t,n,l.opts.specialEasing[t]||l.opts.easing);return l.tweens.push(r),r},stop:function(t){var n=0,r=t?l.tweens.length:0;if(i)return this;for(i=!0;r>n;n++)l.tweens[n].run(1);return t?a.resolveWith(e,[l,t]):a.rejectWith(e,[l,t]),this}}),c=l.props;for(jn(c,l.opts.specialEasing);s>o;o++)if(r=Cn[o].call(l,e,c,l.opts))return r;return En(l,c),x.isFunction(l.opts.start)&&l.opts.start.call(e,l),x.fx.timer(x.extend(u,{elem:e,anim:l,queue:l.opts.queue})),l.progress(l.opts.progress).done(l.opts.done,l.opts.complete).fail(l.opts.fail).always(l.opts.always)}function jn(e,t){var n,r,i,o,s;for(n in e)if(r=x.camelCase(n),i=t[r],o=e[n],x.isArray(o)&&(i=o[1],o=e[n]=o[0]),n!==r&&(e[r]=o,delete e[n]),s=x.cssHooks[r],s&&"expand"in s){o=s.expand(o),delete e[r];for(n in o)n in e||(e[n]=o[n],t[n]=i)}else t[r]=i}x.Animation=x.extend(Sn,{tweener:function(e,t){x.isFunction(e)?(t=e,e=["*"]):e=e.split(" ");var n,r=0,i=e.length;for(;i>r;r++)n=e[r],kn[n]=kn[n]||[],kn[n].unshift(t)},prefilter:function(e,t){t?Cn.unshift(e):Cn.push(e)}});function Dn(e,t,n){var r,i,o,s,a,u,l,c,f,p=this,h=e.style,d={},g=[],m=e.nodeType&&At(e);n.queue||(c=x._queueHooks(e,"fx"),null==c.unqueued&&(c.unqueued=0,f=c.empty.fire,c.empty.fire=function(){c.unqueued||f()}),c.unqueued++,p.always(function(){p.always(function(){c.unqueued--,x.queue(e,"fx").length||c.empty.fire()})})),1===e.nodeType&&("height"in t||"width"in t)&&(n.overflow=[h.overflow,h.overflowX,h.overflowY],"inline"===x.css(e,"display")&&"none"===x.css(e,"float")&&(h.display="inline-block")),n.overflow&&(h.overflow="hidden",p.always(function(){h.overflow=n.overflow[0],h.overflowX=n.overflow[1],h.overflowY=n.overflow[2]})),a=q.get(e,"fxshow");for(r in t)if(o=t[r],bn.exec(o)){if(delete t[r],u=u||"toggle"===o,o===(m?"hide":"show")){if("show"!==o||a===undefined||a[r]===undefined)continue;m=!0}g.push(r)}if(s=g.length){a=q.get(e,"fxshow")||q.access(e,"fxshow",{}),"hidden"in a&&(m=a.hidden),u&&(a.hidden=!m),m?x(e).show():p.done(function(){x(e).hide()}),p.done(function(){var t;q.remove(e,"fxshow");for(t in d)x.style(e,t,d[t])});for(r=0;s>r;r++)i=g[r],l=p.createTween(i,m?a[i]:0),d[i]=a[i]||x.style(e,i),i in a||(a[i]=l.start,m&&(l.end=l.start,l.start="width"===i||"height"===i?1:0))}}function An(e,t,n,r,i){return new An.prototype.init(e,t,n,r,i)}x.Tween=An,An.prototype={constructor:An,init:function(e,t,n,r,i,o){this.elem=e,this.prop=n,this.easing=i||"swing",this.options=t,this.start=this.now=this.cur(),this.end=r,this.unit=o||(x.cssNumber[n]?"":"px")},cur:function(){var e=An.propHooks[this.prop];return e&&e.get?e.get(this):An.propHooks._default.get(this)},run:function(e){var t,n=An.propHooks[this.prop];return this.pos=t=this.options.duration?x.easing[this.easing](e,this.options.duration*e,0,1,this.options.duration):e,this.now=(this.end-this.start)*t+this.start,this.options.step&&this.options.step.call(this.elem,this.now,this),n&&n.set?n.set(this):An.propHooks._default.set(this),this}},An.prototype.init.prototype=An.prototype,An.propHooks={_default:{get:function(e){var t;return null==e.elem[e.prop]||e.elem.style&&null!=e.elem.style[e.prop]?(t=x.css(e.elem,e.prop,""),t&&"auto"!==t?t:0):e.elem[e.prop]},set:function(e){x.fx.step[e.prop]?x.fx.step[e.prop](e):e.elem.style&&(null!=e.elem.style[x.cssProps[e.prop]]||x.cssHooks[e.prop])?x.style(e.elem,e.prop,e.now+e.unit):e.elem[e.prop]=e.now}}},An.propHooks.scrollTop=An.propHooks.scrollLeft={set:function(e){e.elem.nodeType&&e.elem.parentNode&&(e.elem[e.prop]=e.now)}},x.each(["toggle","show","hide"],function(e,t){var n=x.fn[t];x.fn[t]=function(e,r,i){return null==e||"boolean"==typeof e?n.apply(this,arguments):this.animate(Ln(t,!0),e,r,i)}}),x.fn.extend({fadeTo:function(e,t,n,r){return this.filter(At).css("opacity",0).show().end().animate({opacity:t},e,n,r)},animate:function(e,t,n,r){var i=x.isEmptyObject(e),o=x.speed(t,n,r),s=function(){var t=Sn(this,x.extend({},e),o);s.finish=function(){t.stop(!0)},(i||q.get(this,"finish"))&&t.stop(!0)};return s.finish=s,i||o.queue===!1?this.each(s):this.queue(o.queue,s)},stop:function(e,t,n){var r=function(e){var t=e.stop;delete e.stop,t(n)};return"string"!=typeof e&&(n=t,t=e,e=undefined),t&&e!==!1&&this.queue(e||"fx",[]),this.each(function(){var t=!0,i=null!=e&&e+"queueHooks",o=x.timers,s=q.get(this);if(i)s[i]&&s[i].stop&&r(s[i]);else for(i in s)s[i]&&s[i].stop&&Tn.test(i)&&r(s[i]);for(i=o.length;i--;)o[i].elem!==this||null!=e&&o[i].queue!==e||(o[i].anim.stop(n),t=!1,o.splice(i,1));(t||!n)&&x.dequeue(this,e)})},finish:function(e){return e!==!1&&(e=e||"fx"),this.each(function(){var t,n=q.get(this),r=n[e+"queue"],i=n[e+"queueHooks"],o=x.timers,s=r?r.length:0;for(n.finish=!0,x.queue(this,e,[]),i&&i.cur&&i.cur.finish&&i.cur.finish.call(this),t=o.length;t--;)o[t].elem===this&&o[t].queue===e&&(o[t].anim.stop(!0),o.splice(t,1));for(t=0;s>t;t++)r[t]&&r[t].finish&&r[t].finish.call(this);delete n.finish})}});function Ln(e,t){var n,r={height:e},i=0;for(t=t?1:0;4>i;i+=2-t)n=St[i],r["margin"+n]=r["padding"+n]=e;return t&&(r.opacity=r.width=e),r}x.each({slideDown:Ln("show"),slideUp:Ln("hide"),slideToggle:Ln("toggle"),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(e,t){x.fn[e]=function(e,n,r){return this.animate(t,e,n,r)}}),x.speed=function(e,t,n){var r=e&&"object"==typeof e?x.extend({},e):{complete:n||!n&&t||x.isFunction(e)&&e,duration:e,easing:n&&t||t&&!x.isFunction(t)&&t};return r.duration=x.fx.off?0:"number"==typeof r.duration?r.duration:r.duration in x.fx.speeds?x.fx.speeds[r.duration]:x.fx.speeds._default,(null==r.queue||r.queue===!0)&&(r.queue="fx"),r.old=r.complete,r.complete=function(){x.isFunction(r.old)&&r.old.call(this),r.queue&&x.dequeue(this,r.queue)},r},x.easing={linear:function(e){return e},swing:function(e){return.5-Math.cos(e*Math.PI)/2}},x.timers=[],x.fx=An.prototype.init,x.fx.tick=function(){var e,t=x.timers,n=0;for(vn=x.now();t.length>n;n++)e=t[n],e()||t[n]!==e||t.splice(n--,1);t.length||x.fx.stop(),vn=undefined},x.fx.timer=function(e){e()&&x.timers.push(e)&&x.fx.start()},x.fx.interval=13,x.fx.start=function(){xn||(xn=setInterval(x.fx.tick,x.fx.interval))},x.fx.stop=function(){clearInterval(xn),xn=null},x.fx.speeds={slow:600,fast:200,_default:400},x.fx.step={},x.expr&&x.expr.filters&&(x.expr.filters.animated=function(e){return x.grep(x.timers,function(t){return e===t.elem}).length}),x.fn.offset=function(e){if(arguments.length)return e===undefined?this:this.each(function(t){x.offset.setOffset(this,e,t)});var t,n,i=this[0],o={top:0,left:0},s=i&&i.ownerDocument;if(s)return t=s.documentElement,x.contains(t,i)?(typeof i.getBoundingClientRect!==r&&(o=i.getBoundingClientRect()),n=qn(s),{top:o.top+n.pageYOffset-t.clientTop,left:o.left+n.pageXOffset-t.clientLeft}):o},x.offset={setOffset:function(e,t,n){var r,i,o,s,a,u,l,c=x.css(e,"position"),f=x(e),p={};"static"===c&&(e.style.position="relative"),a=f.offset(),o=x.css(e,"top"),u=x.css(e,"left"),l=("absolute"===c||"fixed"===c)&&(o+u).indexOf("auto")>-1,l?(r=f.position(),s=r.top,i=r.left):(s=parseFloat(o)||0,i=parseFloat(u)||0),x.isFunction(t)&&(t=t.call(e,n,a)),null!=t.top&&(p.top=t.top-a.top+s),null!=t.left&&(p.left=t.left-a.left+i),"using"in t?t.using.call(e,p):f.css(p)}},x.fn.extend({position:function(){if(this[0]){var e,t,n=this[0],r={top:0,left:0};return"fixed"===x.css(n,"position")?t=n.getBoundingClientRect():(e=this.offsetParent(),t=this.offset(),x.nodeName(e[0],"html")||(r=e.offset()),r.top+=x.css(e[0],"borderTopWidth",!0),r.left+=x.css(e[0],"borderLeftWidth",!0)),{top:t.top-r.top-x.css(n,"marginTop",!0),left:t.left-r.left-x.css(n,"marginLeft",!0)}}},offsetParent:function(){return this.map(function(){var e=this.offsetParent||s;while(e&&!x.nodeName(e,"html")&&"static"===x.css(e,"position"))e=e.offsetParent;return e||s})}}),x.each({scrollLeft:"pageXOffset",scrollTop:"pageYOffset"},function(t,n){var r="pageYOffset"===n;x.fn[t]=function(i){return x.access(this,function(t,i,o){var s=qn(t);return o===undefined?s?s[n]:t[i]:(s?s.scrollTo(r?e.pageXOffset:o,r?o:e.pageYOffset):t[i]=o,undefined)},t,i,arguments.length,null)}});function qn(e){return x.isWindow(e)?e:9===e.nodeType&&e.defaultView}x.each({Height:"height",Width:"width"},function(e,t){x.each({padding:"inner"+e,content:t,"":"outer"+e},function(n,r){x.fn[r]=function(r,i){var o=arguments.length&&(n||"boolean"!=typeof r),s=n||(r===!0||i===!0?"margin":"border");return x.access(this,function(t,n,r){var i;return x.isWindow(t)?t.document.documentElement["client"+e]:9===t.nodeType?(i=t.documentElement,Math.max(t.body["scroll"+e],i["scroll"+e],t.body["offset"+e],i["offset"+e],i["client"+e])):r===undefined?x.css(t,n,s):x.style(t,n,r,s)},t,o?r:undefined,o,null)}})}),x.fn.size=function(){return this.length},x.fn.andSelf=x.fn.addBack,"object"==typeof module&&"object"==typeof module.exports?module.exports=x:"function"==typeof define&&define.amd&&define("jquery",[],function(){return x}),"object"==typeof e&&"object"==typeof e.document&&(e.jQuery=e.$=x)})(window);
////////////////////////////////////////////////////////////////////////////////
//} /jquery.js
////////////////////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////////////////////////
//{ zlib.js
////////////////////////////////////////////////////////////////////////////////
/*
 * Extracted from pdf.js
 * https://github.com/andreasgal/pdf.js
 *
 * Copyright (c) 2011 Mozilla Foundation
 *
 * Contributors: Andreas Gal <gal@mozilla.com>
 *							 Chris G Jones <cjones@mozilla.com>
 *							 Shaon Barman <shaon.barman@gmail.com>
 *							 Vivien Nicolas <21@vingtetun.org>
 *							 Justin D'Arcangelo <justindarc@gmail.com>
 *							 Yury Delendik
 *
 * Permission is hereby granted, free of charge, to any person obtaining a
 * copy of this software and associated documentation files (the "Software"),
 * to deal in the Software without restriction, including without limitation
 * the rights to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE.
 */

var DecodeStream = (function() {
	function constructor() {
		this.pos = 0;
		this.bufferLength = 0;
		this.eof = false;
		this.buffer = null;
	}

	constructor.prototype = {
		ensureBuffer: function decodestream_ensureBuffer(requested) {
			var buffer = this.buffer;
			var current = buffer ? buffer.byteLength : 0;
			if (requested < current)
				return buffer;
			var size = 512;
			while (size < requested)
				size <<= 1;
			var buffer2 = new Uint8Array(size);
			for (var i = 0; i < current; ++i)
				buffer2[i] = buffer[i];
			return this.buffer = buffer2;
		},
		getByte: function decodestream_getByte() {
			var pos = this.pos;
			while (this.bufferLength <= pos) {
				if (this.eof)
					return null;
				this.readBlock();
			}
			return this.buffer[this.pos++];
		},
		getBytes: function decodestream_getBytes(length) {
			var pos = this.pos;

			if (length) {
				this.ensureBuffer(pos + length);
				var end = pos + length;

				while (!this.eof && this.bufferLength < end)
					this.readBlock();

				var bufEnd = this.bufferLength;
				if (end > bufEnd)
					end = bufEnd;
			} else {
				while (!this.eof)
					this.readBlock();

				var end = this.bufferLength;
			}

			this.pos = end;
			return this.buffer.subarray(pos, end);
		},
		lookChar: function decodestream_lookChar() {
			var pos = this.pos;
			while (this.bufferLength <= pos) {
				if (this.eof)
					return null;
				this.readBlock();
			}
			return String.fromCharCode(this.buffer[this.pos]);
		},
		getChar: function decodestream_getChar() {
			var pos = this.pos;
			while (this.bufferLength <= pos) {
				if (this.eof)
					return null;
				this.readBlock();
			}
			return String.fromCharCode(this.buffer[this.pos++]);
		},
		makeSubStream: function decodestream_makeSubstream(start, length, dict) {
			var end = start + length;
			while (this.bufferLength <= end && !this.eof)
				this.readBlock();
			return new Stream(this.buffer, start, length, dict);
		},
		skip: function decodestream_skip(n) {
			if (!n)
				n = 1;
			this.pos += n;
		},
		reset: function decodestream_reset() {
			this.pos = 0;
		}
	};

	return constructor;
})();

var FlateStream = (function() {
	var codeLenCodeMap = new Uint32Array([
		16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15
	]);

	var lengthDecode = new Uint32Array([
		0x00003, 0x00004, 0x00005, 0x00006, 0x00007, 0x00008, 0x00009, 0x0000a,
		0x1000b, 0x1000d, 0x1000f, 0x10011, 0x20013, 0x20017, 0x2001b, 0x2001f,
		0x30023, 0x3002b, 0x30033, 0x3003b, 0x40043, 0x40053, 0x40063, 0x40073,
		0x50083, 0x500a3, 0x500c3, 0x500e3, 0x00102, 0x00102, 0x00102
	]);

	var distDecode = new Uint32Array([
		0x00001, 0x00002, 0x00003, 0x00004, 0x10005, 0x10007, 0x20009, 0x2000d,
		0x30011, 0x30019, 0x40021, 0x40031, 0x50041, 0x50061, 0x60081, 0x600c1,
		0x70101, 0x70181, 0x80201, 0x80301, 0x90401, 0x90601, 0xa0801, 0xa0c01,
		0xb1001, 0xb1801, 0xc2001, 0xc3001, 0xd4001, 0xd6001
	]);

	var fixedLitCodeTab = [new Uint32Array([
		0x70100, 0x80050, 0x80010, 0x80118, 0x70110, 0x80070, 0x80030, 0x900c0,
		0x70108, 0x80060, 0x80020, 0x900a0, 0x80000, 0x80080, 0x80040, 0x900e0,
		0x70104, 0x80058, 0x80018, 0x90090, 0x70114, 0x80078, 0x80038, 0x900d0,
		0x7010c, 0x80068, 0x80028, 0x900b0, 0x80008, 0x80088, 0x80048, 0x900f0,
		0x70102, 0x80054, 0x80014, 0x8011c, 0x70112, 0x80074, 0x80034, 0x900c8,
		0x7010a, 0x80064, 0x80024, 0x900a8, 0x80004, 0x80084, 0x80044, 0x900e8,
		0x70106, 0x8005c, 0x8001c, 0x90098, 0x70116, 0x8007c, 0x8003c, 0x900d8,
		0x7010e, 0x8006c, 0x8002c, 0x900b8, 0x8000c, 0x8008c, 0x8004c, 0x900f8,
		0x70101, 0x80052, 0x80012, 0x8011a, 0x70111, 0x80072, 0x80032, 0x900c4,
		0x70109, 0x80062, 0x80022, 0x900a4, 0x80002, 0x80082, 0x80042, 0x900e4,
		0x70105, 0x8005a, 0x8001a, 0x90094, 0x70115, 0x8007a, 0x8003a, 0x900d4,
		0x7010d, 0x8006a, 0x8002a, 0x900b4, 0x8000a, 0x8008a, 0x8004a, 0x900f4,
		0x70103, 0x80056, 0x80016, 0x8011e, 0x70113, 0x80076, 0x80036, 0x900cc,
		0x7010b, 0x80066, 0x80026, 0x900ac, 0x80006, 0x80086, 0x80046, 0x900ec,
		0x70107, 0x8005e, 0x8001e, 0x9009c, 0x70117, 0x8007e, 0x8003e, 0x900dc,
		0x7010f, 0x8006e, 0x8002e, 0x900bc, 0x8000e, 0x8008e, 0x8004e, 0x900fc,
		0x70100, 0x80051, 0x80011, 0x80119, 0x70110, 0x80071, 0x80031, 0x900c2,
		0x70108, 0x80061, 0x80021, 0x900a2, 0x80001, 0x80081, 0x80041, 0x900e2,
		0x70104, 0x80059, 0x80019, 0x90092, 0x70114, 0x80079, 0x80039, 0x900d2,
		0x7010c, 0x80069, 0x80029, 0x900b2, 0x80009, 0x80089, 0x80049, 0x900f2,
		0x70102, 0x80055, 0x80015, 0x8011d, 0x70112, 0x80075, 0x80035, 0x900ca,
		0x7010a, 0x80065, 0x80025, 0x900aa, 0x80005, 0x80085, 0x80045, 0x900ea,
		0x70106, 0x8005d, 0x8001d, 0x9009a, 0x70116, 0x8007d, 0x8003d, 0x900da,
		0x7010e, 0x8006d, 0x8002d, 0x900ba, 0x8000d, 0x8008d, 0x8004d, 0x900fa,
		0x70101, 0x80053, 0x80013, 0x8011b, 0x70111, 0x80073, 0x80033, 0x900c6,
		0x70109, 0x80063, 0x80023, 0x900a6, 0x80003, 0x80083, 0x80043, 0x900e6,
		0x70105, 0x8005b, 0x8001b, 0x90096, 0x70115, 0x8007b, 0x8003b, 0x900d6,
		0x7010d, 0x8006b, 0x8002b, 0x900b6, 0x8000b, 0x8008b, 0x8004b, 0x900f6,
		0x70103, 0x80057, 0x80017, 0x8011f, 0x70113, 0x80077, 0x80037, 0x900ce,
		0x7010b, 0x80067, 0x80027, 0x900ae, 0x80007, 0x80087, 0x80047, 0x900ee,
		0x70107, 0x8005f, 0x8001f, 0x9009e, 0x70117, 0x8007f, 0x8003f, 0x900de,
		0x7010f, 0x8006f, 0x8002f, 0x900be, 0x8000f, 0x8008f, 0x8004f, 0x900fe,
		0x70100, 0x80050, 0x80010, 0x80118, 0x70110, 0x80070, 0x80030, 0x900c1,
		0x70108, 0x80060, 0x80020, 0x900a1, 0x80000, 0x80080, 0x80040, 0x900e1,
		0x70104, 0x80058, 0x80018, 0x90091, 0x70114, 0x80078, 0x80038, 0x900d1,
		0x7010c, 0x80068, 0x80028, 0x900b1, 0x80008, 0x80088, 0x80048, 0x900f1,
		0x70102, 0x80054, 0x80014, 0x8011c, 0x70112, 0x80074, 0x80034, 0x900c9,
		0x7010a, 0x80064, 0x80024, 0x900a9, 0x80004, 0x80084, 0x80044, 0x900e9,
		0x70106, 0x8005c, 0x8001c, 0x90099, 0x70116, 0x8007c, 0x8003c, 0x900d9,
		0x7010e, 0x8006c, 0x8002c, 0x900b9, 0x8000c, 0x8008c, 0x8004c, 0x900f9,
		0x70101, 0x80052, 0x80012, 0x8011a, 0x70111, 0x80072, 0x80032, 0x900c5,
		0x70109, 0x80062, 0x80022, 0x900a5, 0x80002, 0x80082, 0x80042, 0x900e5,
		0x70105, 0x8005a, 0x8001a, 0x90095, 0x70115, 0x8007a, 0x8003a, 0x900d5,
		0x7010d, 0x8006a, 0x8002a, 0x900b5, 0x8000a, 0x8008a, 0x8004a, 0x900f5,
		0x70103, 0x80056, 0x80016, 0x8011e, 0x70113, 0x80076, 0x80036, 0x900cd,
		0x7010b, 0x80066, 0x80026, 0x900ad, 0x80006, 0x80086, 0x80046, 0x900ed,
		0x70107, 0x8005e, 0x8001e, 0x9009d, 0x70117, 0x8007e, 0x8003e, 0x900dd,
		0x7010f, 0x8006e, 0x8002e, 0x900bd, 0x8000e, 0x8008e, 0x8004e, 0x900fd,
		0x70100, 0x80051, 0x80011, 0x80119, 0x70110, 0x80071, 0x80031, 0x900c3,
		0x70108, 0x80061, 0x80021, 0x900a3, 0x80001, 0x80081, 0x80041, 0x900e3,
		0x70104, 0x80059, 0x80019, 0x90093, 0x70114, 0x80079, 0x80039, 0x900d3,
		0x7010c, 0x80069, 0x80029, 0x900b3, 0x80009, 0x80089, 0x80049, 0x900f3,
		0x70102, 0x80055, 0x80015, 0x8011d, 0x70112, 0x80075, 0x80035, 0x900cb,
		0x7010a, 0x80065, 0x80025, 0x900ab, 0x80005, 0x80085, 0x80045, 0x900eb,
		0x70106, 0x8005d, 0x8001d, 0x9009b, 0x70116, 0x8007d, 0x8003d, 0x900db,
		0x7010e, 0x8006d, 0x8002d, 0x900bb, 0x8000d, 0x8008d, 0x8004d, 0x900fb,
		0x70101, 0x80053, 0x80013, 0x8011b, 0x70111, 0x80073, 0x80033, 0x900c7,
		0x70109, 0x80063, 0x80023, 0x900a7, 0x80003, 0x80083, 0x80043, 0x900e7,
		0x70105, 0x8005b, 0x8001b, 0x90097, 0x70115, 0x8007b, 0x8003b, 0x900d7,
		0x7010d, 0x8006b, 0x8002b, 0x900b7, 0x8000b, 0x8008b, 0x8004b, 0x900f7,
		0x70103, 0x80057, 0x80017, 0x8011f, 0x70113, 0x80077, 0x80037, 0x900cf,
		0x7010b, 0x80067, 0x80027, 0x900af, 0x80007, 0x80087, 0x80047, 0x900ef,
		0x70107, 0x8005f, 0x8001f, 0x9009f, 0x70117, 0x8007f, 0x8003f, 0x900df,
		0x7010f, 0x8006f, 0x8002f, 0x900bf, 0x8000f, 0x8008f, 0x8004f, 0x900ff
	]), 9];

	var fixedDistCodeTab = [new Uint32Array([
		0x50000, 0x50010, 0x50008, 0x50018, 0x50004, 0x50014, 0x5000c, 0x5001c,
		0x50002, 0x50012, 0x5000a, 0x5001a, 0x50006, 0x50016, 0x5000e, 0x00000,
		0x50001, 0x50011, 0x50009, 0x50019, 0x50005, 0x50015, 0x5000d, 0x5001d,
		0x50003, 0x50013, 0x5000b, 0x5001b, 0x50007, 0x50017, 0x5000f, 0x00000
	]), 5];

	function error(e) {
			throw new Error(e)
	}

	function constructor(bytes) {
		//var bytes = stream.getBytes();
		var bytesPos = 0;

		var cmf = bytes[bytesPos++];
		var flg = bytes[bytesPos++];
		if (cmf == -1 || flg == -1)
			error('Invalid header in flate stream');
		if ((cmf & 0x0f) != 0x08)
			error('Unknown compression method in flate stream');
		if ((((cmf << 8) + flg) % 31) != 0)
			error('Bad FCHECK in flate stream');
		if (flg & 0x20)
			error('FDICT bit set in flate stream');

		this.bytes = bytes;
		this.bytesPos = bytesPos;

		this.codeSize = 0;
		this.codeBuf = 0;

		DecodeStream.call(this);
	}

	constructor.prototype = Object.create(DecodeStream.prototype);

	constructor.prototype.getBits = function(bits) {
		var codeSize = this.codeSize;
		var codeBuf = this.codeBuf;
		var bytes = this.bytes;
		var bytesPos = this.bytesPos;

		var b;
		while (codeSize < bits) {
			if (typeof (b = bytes[bytesPos++]) == 'undefined')
				error('Bad encoding in flate stream');
			codeBuf |= b << codeSize;
			codeSize += 8;
		}
		b = codeBuf & ((1 << bits) - 1);
		this.codeBuf = codeBuf >> bits;
		this.codeSize = codeSize -= bits;
		this.bytesPos = bytesPos;
		return b;
	};

	constructor.prototype.getCode = function(table) {
		var codes = table[0];
		var maxLen = table[1];
		var codeSize = this.codeSize;
		var codeBuf = this.codeBuf;
		var bytes = this.bytes;
		var bytesPos = this.bytesPos;

		while (codeSize < maxLen) {
			var b;
			if (typeof (b = bytes[bytesPos++]) == 'undefined')
				error('Bad encoding in flate stream');
			codeBuf |= (b << codeSize);
			codeSize += 8;
		}
		var code = codes[codeBuf & ((1 << maxLen) - 1)];
		var codeLen = code >> 16;
		var codeVal = code & 0xffff;
		if (codeSize == 0 || codeSize < codeLen || codeLen == 0)
			error('Bad encoding in flate stream');
		this.codeBuf = (codeBuf >> codeLen);
		this.codeSize = (codeSize - codeLen);
		this.bytesPos = bytesPos;
		return codeVal;
	};

	constructor.prototype.generateHuffmanTable = function(lengths) {
		var n = lengths.length;

		// find max code length
		var maxLen = 0;
		for (var i = 0; i < n; ++i) {
			if (lengths[i] > maxLen)
				maxLen = lengths[i];
		}

		// build the table
		var size = 1 << maxLen;
		var codes = new Uint32Array(size);
		for (var len = 1, code = 0, skip = 2;
				 len <= maxLen;
				 ++len, code <<= 1, skip <<= 1) {
			for (var val = 0; val < n; ++val) {
				if (lengths[val] == len) {
					// bit-reverse the code
					var code2 = 0;
					var t = code;
					for (var i = 0; i < len; ++i) {
						code2 = (code2 << 1) | (t & 1);
						t >>= 1;
					}

					// fill the table entries
					for (var i = code2; i < size; i += skip)
						codes[i] = (len << 16) | val;

					++code;
				}
			}
		}

		return [codes, maxLen];
	};

	constructor.prototype.readBlock = function() {
		function repeat(stream, array, len, offset, what) {
			var repeat = stream.getBits(len) + offset;
			while (repeat-- > 0)
				array[i++] = what;
		}

		// read block header
		var hdr = this.getBits(3);
		if (hdr & 1)
			this.eof = true;
		hdr >>= 1;

		if (hdr == 0) { // uncompressed block
			var bytes = this.bytes;
			var bytesPos = this.bytesPos;
			var b;

			if (typeof (b = bytes[bytesPos++]) == 'undefined')
				error('Bad block header in flate stream');
			var blockLen = b;
			if (typeof (b = bytes[bytesPos++]) == 'undefined')
				error('Bad block header in flate stream');
			blockLen |= (b << 8);
			if (typeof (b = bytes[bytesPos++]) == 'undefined')
				error('Bad block header in flate stream');
			var check = b;
			if (typeof (b = bytes[bytesPos++]) == 'undefined')
				error('Bad block header in flate stream');
			check |= (b << 8);
			if (check != (~blockLen & 0xffff))
				error('Bad uncompressed block length in flate stream');

			this.codeBuf = 0;
			this.codeSize = 0;

			var bufferLength = this.bufferLength;
			var buffer = this.ensureBuffer(bufferLength + blockLen);
			var end = bufferLength + blockLen;
			this.bufferLength = end;
			for (var n = bufferLength; n < end; ++n) {
				if (typeof (b = bytes[bytesPos++]) == 'undefined') {
					this.eof = true;
					break;
				}
				buffer[n] = b;
			}
			this.bytesPos = bytesPos;
			return;
		}

		var litCodeTable;
		var distCodeTable;
		if (hdr == 1) { // compressed block, fixed codes
			litCodeTable = fixedLitCodeTab;
			distCodeTable = fixedDistCodeTab;
		} else if (hdr == 2) { // compressed block, dynamic codes
			var numLitCodes = this.getBits(5) + 257;
			var numDistCodes = this.getBits(5) + 1;
			var numCodeLenCodes = this.getBits(4) + 4;

			// build the code lengths code table
			var codeLenCodeLengths = Array(codeLenCodeMap.length);
			var i = 0;
			while (i < numCodeLenCodes)
				codeLenCodeLengths[codeLenCodeMap[i++]] = this.getBits(3);
			var codeLenCodeTab = this.generateHuffmanTable(codeLenCodeLengths);

			// build the literal and distance code tables
			var len = 0;
			var i = 0;
			var codes = numLitCodes + numDistCodes;
			var codeLengths = new Array(codes);
			while (i < codes) {
				var code = this.getCode(codeLenCodeTab);
				if (code == 16) {
					repeat(this, codeLengths, 2, 3, len);
				} else if (code == 17) {
					repeat(this, codeLengths, 3, 3, len = 0);
				} else if (code == 18) {
					repeat(this, codeLengths, 7, 11, len = 0);
				} else {
					codeLengths[i++] = len = code;
				}
			}

			litCodeTable =
				this.generateHuffmanTable(codeLengths.slice(0, numLitCodes));
			distCodeTable =
				this.generateHuffmanTable(codeLengths.slice(numLitCodes, codes));
		} else {
			error('Unknown block type in flate stream');
		}

		var buffer = this.buffer;
		var limit = buffer ? buffer.length : 0;
		var pos = this.bufferLength;
		while (true) {
			var code1 = this.getCode(litCodeTable);
			if (code1 < 256) {
				if (pos + 1 >= limit) {
					buffer = this.ensureBuffer(pos + 1);
					limit = buffer.length;
				}
				buffer[pos++] = code1;
				continue;
			}
			if (code1 == 256) {
				this.bufferLength = pos;
				return;
			}
			code1 -= 257;
			code1 = lengthDecode[code1];
			var code2 = code1 >> 16;
			if (code2 > 0)
				code2 = this.getBits(code2);
			var len = (code1 & 0xffff) + code2;
			code1 = this.getCode(distCodeTable);
			code1 = distDecode[code1];
			code2 = code1 >> 16;
			if (code2 > 0)
				code2 = this.getBits(code2);
			var dist = (code1 & 0xffff) + code2;
			if (pos + len >= limit) {
				buffer = this.ensureBuffer(pos + len);
				limit = buffer.length;
			}
			for (var k = 0; k < len; ++k, ++pos)
				buffer[pos] = buffer[pos - dist];
		}
	};

	return constructor;
})();


////////////////////////////////////////////////////////////////////////////////
//} /zlib.js
////////////////////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////////////////////////
//{ png.js
////////////////////////////////////////////////////////////////////////////////
// Generated by CoffeeScript 1.4.0

/*
# MIT LICENSE
# Copyright (c) 2011 Devon Govett
#
# Permission is hereby granted, free of charge, to any person obtaining a copy of this
# software and associated documentation files (the "Software"), to deal in the Software
# without restriction, including without limitation the rights to use, copy, modify, merge,
# publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons
# to whom the Software is furnished to do so, subject to the following conditions:
#
# The above copyright notice and this permission notice shall be included in all copies or
# substantial portions of the Software.
#
# THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING
# BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
# NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
# DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
# OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/


(function() {
	var PNG;

	PNG = (function() {
		var APNG_BLEND_OP_OVER, APNG_BLEND_OP_SOURCE, APNG_DISPOSE_OP_BACKGROUND, APNG_DISPOSE_OP_NONE, APNG_DISPOSE_OP_PREVIOUS, makeImage, scratchCanvas, scratchCtx;

		PNG.load = function(url, canvas, callback) {
			var xhr,
				_this = this;
			if (typeof canvas === 'function') {
				callback = canvas;
			}
			xhr = new XMLHttpRequest;
			xhr.open("GET", url, true);
			xhr.responseType = "arraybuffer";
			xhr.onload = function() {
				var data, png;
				data = new Uint8Array(xhr.response || xhr.mozResponseArrayBuffer);
				png = new PNG(data);
				if (typeof (canvas != null ? canvas.getContext : void 0) === 'function') {
					png.render(canvas);
				}
				return typeof callback === "function" ? callback(png) : void 0;
			};
			return xhr.send(null);
		};

		APNG_DISPOSE_OP_NONE = 0;

		APNG_DISPOSE_OP_BACKGROUND = 1;

		APNG_DISPOSE_OP_PREVIOUS = 2;

		APNG_BLEND_OP_SOURCE = 0;

		APNG_BLEND_OP_OVER = 1;

		function PNG(data, asynchronous, asynchronous_callback, error_callback, loop_param) {
			if (asynchronous) this.initAsynchronous(data, asynchronous_callback, error_callback, loop_param);
			else this.init(data);
		}
		PNG.prototype.init = function (data) {
			var chunkSize, colors, delayDen, delayNum, frame, i, index, key, section, short, text, _i, _j, _ref;
			this.data = data;
			this.pos = 8;
			this.palette = [];
			this.imgData = [];
			this.transparency = {};
			this.animation = null;
			this.text = {};
			frame = null;
			while (true) {
				chunkSize = this.readUInt32();
				section = ((function() {
					var _i, _results;
					_results = [];
					for (i = _i = 0; _i < 4; i = ++_i) {
						_results.push(String.fromCharCode(this.data[this.pos++]));
					}
					return _results;
				}).call(this)).join('');
				switch (section) {
					case 'IHDR':
						this.width = this.readUInt32();
						this.height = this.readUInt32();
						this.bits = this.data[this.pos++];
						this.colorType = this.data[this.pos++];
						this.compressionMethod = this.data[this.pos++];
						this.filterMethod = this.data[this.pos++];
						this.interlaceMethod = this.data[this.pos++];
						break;
					case 'acTL':
						this.animation = {
							numFrames: this.readUInt32(),
							numPlays: this.readUInt32() || Infinity,
							frames: []
						};
						break;
					case 'PLTE':
						this.palette = this.read(chunkSize);
						break;
					case 'fcTL':
						if (frame) {
							this.animation.frames.push(frame);
						}
						this.pos += 4;
						frame = {
							width: this.readUInt32(),
							height: this.readUInt32(),
							xOffset: this.readUInt32(),
							yOffset: this.readUInt32()
						};
						delayNum = this.readUInt16();
						delayDen = this.readUInt16() || 100;
						frame.delay = 1000 * delayNum / delayDen;
						frame.disposeOp = this.data[this.pos++];
						frame.blendOp = this.data[this.pos++];
						frame.data = [];
						break;
					case 'IDAT':
					case 'fdAT':
						if (section === 'fdAT') {
							this.pos += 4;
							chunkSize -= 4;
						}
						data = (frame != null ? frame.data : void 0) || this.imgData;
						for (i = _i = 0; 0 <= chunkSize ? _i < chunkSize : _i > chunkSize; i = 0 <= chunkSize ? ++_i : --_i) {
							data.push(this.data[this.pos++]);
						}
						break;
					case 'tRNS':
						this.transparency = {};
						switch (this.colorType) {
							case 3:
								this.transparency.indexed = this.read(chunkSize);
								short = 255 - this.transparency.indexed.length;
								if (short > 0) {
									for (i = _j = 0; 0 <= short ? _j < short : _j > short; i = 0 <= short ? ++_j : --_j) {
										this.transparency.indexed.push(255);
									}
								}
								break;
							case 0:
								this.transparency.grayscale = this.read(chunkSize)[0];
								break;
							case 2:
								this.transparency.rgb = this.read(chunkSize);
						}
						break;
					case 'tEXt':
						text = this.read(chunkSize);
						index = text.indexOf(0);
						key = String.fromCharCode.apply(String, text.slice(0, index));
						this.text[key] = String.fromCharCode.apply(String, text.slice(index + 1));
						break;
					case 'IEND':
						if (frame) {
							this.animation.frames.push(frame);
						}
						this.colors = (function() {
							switch (this.colorType) {
								case 0:
								case 3:
								case 4:
									return 1;
								case 2:
								case 6:
									return 3;
							}
						}).call(this);
						this.hasAlphaChannel = (_ref = this.colorType) === 4 || _ref === 6;
						colors = this.colors + (this.hasAlphaChannel ? 1 : 0);
						this.pixelBitlength = this.bits * colors;
						this.colorSpace = (function() {
							switch (this.colors) {
								case 1:
									return 'DeviceGray';
								case 3:
									return 'DeviceRGB';
							}
						}).call(this);
						this.imgData = new Uint8Array(this.imgData);
						return;
					default:
						this.pos += chunkSize;
				}
				this.pos += 4;
				if (this.pos > this.data.length) {
					throw new Error("Incomplete or corrupt PNG file");
				}
			}
			return;
		}
		PNG.prototype.initAsynchronous = function (data, asynchronous_callback, error_callback, loop_param) {
			try {
				var loop = new Loop();
				if (loop_param === undefined) {
					loop.steps = 1024 * 64;
					loop.timeout = 1;
				}
				else {
					loop.steps = loop_param.steps;
					loop.timeout = loop_param.timeout;
				}
			}
			catch (e) {
				// Error
				return this.init(data);
			}
			var chunkSize, colors, delayDen, delayNum, frame, i, index, key, section, short, text, _i, _j, _ref;
			this.data = data;
			this.pos = 8;
			this.palette = [];
			this.imgData = [];
			this.transparency = {};
			this.animation = null;
			this.text = {};
			frame = null;
			var functionType = typeof(function(){});

			var self = this;
			loop.forever(
				{},
				function (unused, data, loop) {
					try {
						chunkSize = self.readUInt32();
						section = ((function() {
							var _i, _results;
							_results = [];
							for (i = _i = 0; _i < 4; i = ++_i) {
								_results.push(String.fromCharCode(self.data[self.pos++]));
							}
							return _results;
						}).call(self)).join('');
						switch (section) {
							case 'IHDR':
								self.width = self.readUInt32();
								self.height = self.readUInt32();
								self.bits = self.data[self.pos++];
								self.colorType = self.data[self.pos++];
								self.compressionMethod = self.data[self.pos++];
								self.filterMethod = self.data[self.pos++];
								self.interlaceMethod = self.data[self.pos++];
								break;
							case 'acTL':
								self.animation = {
									numFrames: self.readUInt32(),
									numPlays: self.readUInt32() || Infinity,
									frames: []
								};
								break;
							case 'PLTE':
								self.palette = self.read(chunkSize);
								break;
							case 'fcTL':
								if (frame) {
									self.animation.frames.push(frame);
								}
								self.pos += 4;
								frame = {
									width: self.readUInt32(),
									height: self.readUInt32(),
									xOffset: self.readUInt32(),
									yOffset: self.readUInt32()
								};
								delayNum = self.readUInt16();
								delayDen = self.readUInt16() || 100;
								frame.delay = 1000 * delayNum / delayDen;
								frame.disposeOp = self.data[self.pos++];
								frame.blendOp = self.data[self.pos++];
								frame.data = [];
								break;
							case 'IDAT':
							case 'fdAT':
								if (section === 'fdAT') {
									self.pos += 4;
									chunkSize -= 4;
								}
								data = (frame != null ? frame.data : void 0) || self.imgData;
								for (i = _i = 0; 0 <= chunkSize ? _i < chunkSize : _i > chunkSize; i = 0 <= chunkSize ? ++_i : --_i) {
									data.push(self.data[self.pos++]);
								}
								break;
							case 'tRNS':
								self.transparency = {};
								switch (self.colorType) {
									case 3:
										self.transparency.indexed = self.read(chunkSize);
										short = 255 - self.transparency.indexed.length;
										if (short > 0) {
											for (i = _j = 0; 0 <= short ? _j < short : _j > short; i = 0 <= short ? ++_j : --_j) {
												self.transparency.indexed.push(255);
											}
										}
										break;
									case 0:
										self.transparency.grayscale = self.read(chunkSize)[0];
										break;
									case 2:
										self.transparency.rgb = self.read(chunkSize);
								}
								break;
							case 'tEXt':
								text = self.read(chunkSize);
								index = text.indexOf(0);
								key = String.fromCharCode.apply(String, text.slice(0, index));
								self.text[key] = String.fromCharCode.apply(String, text.slice(index + 1));
								break;
							case 'IEND':
								if (frame) {
									self.animation.frames.push(frame);
								}
								self.colors = (function() {
									switch (self.colorType) {
										case 0:
										case 3:
										case 4:
											return 1;
										case 2:
										case 6:
											return 3;
									}
								}).call(self);
								self.hasAlphaChannel = (_ref = self.colorType) === 4 || _ref === 6;
								colors = self.colors + (self.hasAlphaChannel ? 1 : 0);
								self.pixelBitlength = self.bits * colors;
								self.colorSpace = (function() {
									switch (self.colors) {
										case 1:
											return 'DeviceGray';
										case 3:
											return 'DeviceRGB';
									}
								}).call(self);
								self.imgData = new Uint8Array(self.imgData);
								return loop.Break(); // Done
							default:
								self.pos += chunkSize;
						}
						self.pos += 4;
						if (self.pos > self.data.length) {
							throw new Error("Incomplete or corrupt PNG file");
						}
					}
					catch (e) {
						if (typeof(error_callback) == functionType) {
							error_callback(self);
						}
						return loop.stop();
					}
				},
				function (unused, data, loop) {
					try {
						asynchronous_callback(self);
					}
					catch (e) {
						if (typeof(error_callback) == functionType) {
							error_callback(self);
						}
					}
				}
			);
		}

		PNG.prototype.read = function(bytes) {
			var i, _i, _results;
			_results = [];
			for (i = _i = 0; 0 <= bytes ? _i < bytes : _i > bytes; i = 0 <= bytes ? ++_i : --_i) {
				_results.push(this.data[this.pos++]);
			}
			return _results;
		};

		PNG.prototype.readUInt32 = function() {
			var b1, b2, b3, b4;
			b1 = this.data[this.pos++] << 24;
			b2 = this.data[this.pos++] << 16;
			b3 = this.data[this.pos++] << 8;
			b4 = this.data[this.pos++];
			return b1 | b2 | b3 | b4;
		};

		PNG.prototype.readUInt16 = function() {
			var b1, b2;
			b1 = this.data[this.pos++] << 8;
			b2 = this.data[this.pos++];
			return b1 | b2;
		};

		PNG.prototype.decodePixels = function(data) {
			var byte, c, col, i, left, length, p, pa, paeth, pb, pc, pixelBytes, pixels, pos, row, scanlineLength, upper, upperLeft, _i, _j, _k, _l, _m;
			if (data == null) {
				data = this.imgData;
			}
			if (data.length === 0) {
				return new Uint8Array(0);
			}
			data = new FlateStream(data);
			data = data.getBytes();
			pixelBytes = this.pixelBitlength / 8;
			scanlineLength = pixelBytes * this.width;
			pixels = new Uint8Array(scanlineLength * this.height);
			length = data.length;
			row = 0;
			pos = 0;
			c = 0;
			while (pos < length) {
				switch (data[pos++]) {
					case 0:
						for (i = _i = 0; _i < scanlineLength; i = _i += 1) {
							pixels[c++] = data[pos++];
						}
						break;
					case 1:
						for (i = _j = 0; _j < scanlineLength; i = _j += 1) {
							byte = data[pos++];
							left = i < pixelBytes ? 0 : pixels[c - pixelBytes];
							pixels[c++] = (byte + left) % 256;
						}
						break;
					case 2:
						for (i = _k = 0; _k < scanlineLength; i = _k += 1) {
							byte = data[pos++];
							col = (i - (i % pixelBytes)) / pixelBytes;
							upper = row && pixels[(row - 1) * scanlineLength + col * pixelBytes + (i % pixelBytes)];
							pixels[c++] = (upper + byte) % 256;
						}
						break;
					case 3:
						for (i = _l = 0; _l < scanlineLength; i = _l += 1) {
							byte = data[pos++];
							col = (i - (i % pixelBytes)) / pixelBytes;
							left = i < pixelBytes ? 0 : pixels[c - pixelBytes];
							upper = row && pixels[(row - 1) * scanlineLength + col * pixelBytes + (i % pixelBytes)];
							pixels[c++] = (byte + Math.floor((left + upper) / 2)) % 256;
						}
						break;
					case 4:
						for (i = _m = 0; _m < scanlineLength; i = _m += 1) {
							byte = data[pos++];
							col = (i - (i % pixelBytes)) / pixelBytes;
							left = i < pixelBytes ? 0 : pixels[c - pixelBytes];
							if (row === 0) {
								upper = upperLeft = 0;
							} else {
								upper = pixels[(row - 1) * scanlineLength + col * pixelBytes + (i % pixelBytes)];
								upperLeft = col && pixels[(row - 1) * scanlineLength + (col - 1) * pixelBytes + (i % pixelBytes)];
							}
							p = left + upper - upperLeft;
							pa = Math.abs(p - left);
							pb = Math.abs(p - upper);
							pc = Math.abs(p - upperLeft);
							if (pa <= pb && pa <= pc) {
								paeth = left;
							} else if (pb <= pc) {
								paeth = upper;
							} else {
								paeth = upperLeft;
							}
							pixels[c++] = (byte + paeth) % 256;
						}
						break;
					default:
						throw new Error("Invalid filter algorithm: " + data[pos - 1]);
				}
				row++;
			}
			return pixels;
		};
		PNG.prototype.decodePixelsAsynchronous = function(data, done_callback, error_callback, loop_param) {
			try {
				var loop = new Loop();
				if (loop_param === undefined) {
					loop.steps = 1024 * 64;
					loop.timeout = 1;
				}
				else {
					loop.steps = loop_param.steps;
					loop.timeout = loop_param.timeout;
				}
			}
			catch (e) {
				// Error
				return this.decodePixels(data);
			}

			var byte, c, col, i, left, length, p, pa, paeth, pb, pc, pixelBytes, pixels, pos, row, scanlineLength, upper, upperLeft, _i, _j, _k, _l, _m;
			if (data == null) {
				data = this.imgData;
			}
			if (data.length === 0) {
				return new Uint8Array(0);
			}
			data = new FlateStream(data);
			data = data.getBytes();
			pixelBytes = this.pixelBitlength / 8;
			scanlineLength = pixelBytes * this.width;
			pixels = new Uint8Array(scanlineLength * this.height);
			length = data.length;
			row = 0;
			pos = 0;
			c = 0;
			var functionType = typeof(function(){});

			var self = this;
			loop.for_lt(
				pos, length, 0,
				{},
				function (pos, _data, loop) {
					try {
						switch (data[pos++]) {
							case 0:
								for (i = _i = 0; _i < scanlineLength; i = _i += 1) {
									pixels[c++] = data[pos++];
								}
							break;
							case 1:
								for (i = _j = 0; _j < scanlineLength; i = _j += 1) {
									byte = data[pos++];
									left = i < pixelBytes ? 0 : pixels[c - pixelBytes];
									pixels[c++] = (byte + left) % 256;
								}
							break;
							case 2:
								for (i = _k = 0; _k < scanlineLength; i = _k += 1) {
									byte = data[pos++];
									col = (i - (i % pixelBytes)) / pixelBytes;
									upper = row && pixels[(row - 1) * scanlineLength + col * pixelBytes + (i % pixelBytes)];
									pixels[c++] = (upper + byte) % 256;
								}
							break;
							case 3:
								for (i = _l = 0; _l < scanlineLength; i = _l += 1) {
									byte = data[pos++];
									col = (i - (i % pixelBytes)) / pixelBytes;
									left = i < pixelBytes ? 0 : pixels[c - pixelBytes];
									upper = row && pixels[(row - 1) * scanlineLength + col * pixelBytes + (i % pixelBytes)];
									pixels[c++] = (byte + Math.floor((left + upper) / 2)) % 256;
								}
							break;
							case 4:
								for (i = _m = 0; _m < scanlineLength; i = _m += 1) {
									byte = data[pos++];
									col = (i - (i % pixelBytes)) / pixelBytes;
									left = i < pixelBytes ? 0 : pixels[c - pixelBytes];
									if (row === 0) {
										upper = upperLeft = 0;
									} else {
										upper = pixels[(row - 1) * scanlineLength + col * pixelBytes + (i % pixelBytes)];
										upperLeft = col && pixels[(row - 1) * scanlineLength + (col - 1) * pixelBytes + (i % pixelBytes)];
									}
									p = left + upper - upperLeft;
									pa = Math.abs(p - left);
									pb = Math.abs(p - upper);
									pc = Math.abs(p - upperLeft);
									if (pa <= pb && pa <= pc) {
										paeth = left;
									} else if (pb <= pc) {
										paeth = upper;
									} else {
										paeth = upperLeft;
									}
									pixels[c++] = (byte + paeth) % 256;
								}
							break;
							default:
								throw new Error("Invalid filter algorithm: " + data[pos - 1]);
						}
						row++;
						return pos;
					}
					catch (e) {
						if (typeof(error_callback) == functionType) {
							error_callback(self);
						}
						return loop.stop();
					}
				},
				function (pos, _data, loop) {
					try {
						done_callback(self, pixels);
					}
					catch (e) {
						if (typeof(error_callback) == functionType) {
							error_callback(self);
						}
					}
				}
			);
		};

		PNG.prototype.decodePalette = function() {
			var c, i, length, palette, pos, ret, transparency, _i, _ref, _ref1;
			palette = this.palette;
			transparency = this.transparency.indexed || [];
			ret = new Uint8Array((transparency.length || 0) + palette.length);
			pos = 0;
			length = palette.length;
			c = 0;
			for (i = _i = 0, _ref = palette.length; _i < _ref; i = _i += 3) {
				ret[pos++] = palette[i];
				ret[pos++] = palette[i + 1];
				ret[pos++] = palette[i + 2];
				ret[pos++] = (_ref1 = transparency[c++]) != null ? _ref1 : 255;
			}
			return ret;
		};

		PNG.prototype.copyToImageData = function(imageData, pixels) {
			var alpha, colors, data, i, input, j, k, length, palette, v, _ref;
			colors = this.colors;
			palette = null;
			alpha = this.hasAlphaChannel;
			if (this.palette.length) {
				palette = (_ref = this._decodedPalette) != null ? _ref : this._decodedPalette = this.decodePalette();
				colors = 4;
				alpha = true;
			}
			data = imageData.data;
			length = data.length;
			input = palette || pixels;
			i = j = 0;
			if (colors === 1) {
				while (i < length) {
					k = palette ? pixels[i / 4] * 4 : j;
					v = input[k++];
					data[i++] = v;
					data[i++] = v;
					data[i++] = v;
					data[i++] = alpha ? input[k++] : 255;
					j = k;
				}
			} else {
				while (i < length) {
					k = palette ? pixels[i / 4] * 4 : j;
					data[i++] = input[k++];
					data[i++] = input[k++];
					data[i++] = input[k++];
					data[i++] = alpha ? input[k++] : 255;
					j = k;
				}
			}
		};

		PNG.prototype.decode = function() {
			var ret;
			ret = new Uint8Array(this.width * this.height * 4);
			this.copyToImageData(ret, this.decodePixels());
			return ret;
		};

		scratchCanvas = document.createElement('canvas');

		scratchCtx = scratchCanvas.getContext('2d');

		makeImage = function(imageData) {
			var img;
			scratchCtx.width = imageData.width;
			scratchCtx.height = imageData.height;
			scratchCtx.clearRect(0, 0, imageData.width, imageData.height);
			scratchCtx.putImageData(imageData, 0, 0);
			img = new Image;
			img.src = scratchCanvas.toDataURL();
			return img;
		};

		PNG.prototype.decodeFrames = function(ctx) {
			var frame, i, imageData, pixels, _i, _len, _ref, _results;
			if (!this.animation) {
				return;
			}
			_ref = this.animation.frames;
			_results = [];
			for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
				frame = _ref[i];
				imageData = ctx.createImageData(frame.width, frame.height);
				pixels = this.decodePixels(new Uint8Array(frame.data));
				this.copyToImageData(imageData, pixels);
				frame.imageData = imageData;
				_results.push(frame.image = makeImage(imageData));
			}
			return _results;
		};

		PNG.prototype.renderFrame = function(ctx, number) {
			var frame, frames, prev;
			frames = this.animation.frames;
			frame = frames[number];
			prev = frames[number - 1];
			if (number === 0) {
				ctx.clearRect(0, 0, this.width, this.height);
			}
			if ((prev != null ? prev.disposeOp : void 0) === APNG_DISPOSE_OP_BACKGROUND) {
				ctx.clearRect(prev.xOffset, prev.yOffset, prev.width, prev.height);
			} else if ((prev != null ? prev.disposeOp : void 0) === APNG_DISPOSE_OP_PREVIOUS) {
				ctx.putImageData(prev.imageData, prev.xOffset, prev.yOffset);
			}
			if (frame.blendOp === APNG_BLEND_OP_SOURCE) {
				ctx.clearRect(frame.xOffset, frame.yOffset, frame.width, frame.height);
			}
			return ctx.drawImage(frame.image, frame.xOffset, frame.yOffset);
		};

		PNG.prototype.animate = function(ctx) {
			var doFrame, frameNumber, frames, numFrames, numPlays, _ref,
				_this = this;
			frameNumber = 0;
			_ref = this.animation, numFrames = _ref.numFrames, frames = _ref.frames, numPlays = _ref.numPlays;
			return (doFrame = function() {
				var f, frame;
				f = frameNumber++ % numFrames;
				frame = frames[f];
				_this.renderFrame(ctx, f);
				if (numFrames > 1 && frameNumber / numFrames < numPlays) {
					return _this.animation._timeout = setTimeout(doFrame, frame.delay);
				}
			})();
		};

		PNG.prototype.stopAnimation = function() {
			var _ref;
			return clearTimeout((_ref = this.animation) != null ? _ref._timeout : void 0);
		};

		PNG.prototype.render = function(canvas) {
			var ctx, data;
			if (canvas._png) {
				canvas._png.stopAnimation();
			}
			canvas._png = this;
			canvas.width = this.width;
			canvas.height = this.height;
			ctx = canvas.getContext("2d");
			if (this.animation) {
				this.decodeFrames(ctx);
				return this.animate(ctx);
			} else {
				data = ctx.createImageData(this.width, this.height);
				this.copyToImageData(data, this.decodePixels());
				return ctx.putImageData(data, 0, 0);
			}
		};

		return PNG;

	})();

	window.PNG = PNG;

}).call(this);

////////////////////////////////////////////////////////////////////////////////
//} /png.js
////////////////////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////////////////////////
//{ Loop.js
////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
// Non-freezing loops
///////////////////////////////////////////////////////////////////////////////

function Loop() {
	this.loops = new Array();
	this.timer = null;
	this.timeout = 100;
	this.steps = 100;
	this.special = 0;
}
Loop.prototype = {
	constructor: Loop,

	for_lt: function (i, limiter, incr, data, body, done) {
		// Loop
		this.loops.push(
			{
				"compare": function (i, limit) { return i < limit; },
				"step_limiter": function (i, limit) { return (i > limit ? limit : i); },
				"i": i,
				"i_incr": incr,
				"limiter": limiter,
				"data": data,
				"body": body,
				"done": done,
				"decrement": false
			}
		);
		this.loop();
	},
	for_le: function (i, limiter, incr, data, body, done) {
		// Loop
		this.loops.push(
			{
				"compare": function (i, limit) { return i <= limit; },
				"step_limiter": function (i, limit) { return (i > limit ? limit : i); },
				"i": i,
				"i_incr": incr,
				"limiter": limiter,
				"data": data,
				"body": body,
				"done": done,
				"decrement": false
			}
		);
		this.loop();
	},
	for_gt: function (i, limiter, incr, data, body, done) {
		// Loop
		this.loops.push(
			{
				"compare": function (i, limit) { return i > limit; },
				"step_limiter": function (i, limit) { return (i < limit ? limit : i); },
				"i": i,
				"i_incr": incr,
				"limiter": limiter,
				"data": data,
				"body": body,
				"done": done,
				"decrement": false
			}
		);
		this.loop();
	},
	for_ge: function (i, limiter, incr, data, body, done) {
		// Loop
		this.loops.push(
			{
				"compare": function (i, limit) { return i >= limit; },
				"step_limiter": function (i, limit) { return (i < limit ? limit : i); },
				"i": i,
				"i_incr": incr,
				"limiter": limiter,
				"data": data,
				"body": body,
				"done": done,
				"decrement": false
			}
		);
		this.loop();
	},
	forever: function (data, body, done) {
		// Loop
		this.loops.push(
			{
				"compare": function (i, limit) { return true; },
				"step_limiter": function (i, limit) { return 0; },
				"i": 0,
				"i_incr": 0,
				"limiter": 0,
				"data": data,
				"body": body,
				"done": done,
				"decrement": false
			}
		);
		this.loop();
	},

	Break: function () {
		this.special = 1;
		return undefined;
	},
	Continue: function () {
		this.special = 2;
		return undefined;
	},

	loop: function () {
		this.timer = null;

		var ll = this.loops.length;
		var loop = this.loops[ll - 1];

		// Limit
		var i_max = loop.step_limiter(loop.i + this.steps, loop.limiter);
		var j;
		var typeof_number = typeof(1.0);

		// Loop
		while (loop.compare(loop.i, i_max)) {
			// Body
			j = loop.body(loop.i, loop.data, this);
			loop.i = (typeof(j) === typeof_number ? j : loop.i) + loop.i_incr;
			// New loop was added
			if (this.loops.length > ll) {
				this.loops[this.loops.length - 1].decrement = true;
				return;
			}
			if (this.special == 1) {
				// Set to 0 later
				break;
			}
			if (this.special == 2) {
				this.special = 0;
			}
		}

		// Next
		if (loop.i < loop.limiter && this.special != 1) {
			var self = this;
			this.timer = setTimeout(function () { self.loop(); }, this.timeout);
		}
		else {
			// Done
			this.special = 0;
			loop.done(loop.i, loop.data, this);

			// Chain into any other loops
			if (this.loops.pop().decrement) {
				var self = this;
				this.timer = setTimeout(function () { self.loop(); }, this.timeout);
			}
		}
	},
	stop: function () {
		if (this.timer !== null) {
			clearTimeout(this.timer);
			this.timer = null;
		}
		this.loops = new Array();

		this.special = 1;
		return undefined;
	}
};



////////////////////////////////////////////////////////////////////////////////
//} /Loop.js
////////////////////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////////////////////////
//{ DataImage.js
////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
// Steganographic .png decoder
///////////////////////////////////////////////////////////////////////////////

function DataImage (source_location, callback_data, load_callback, error_callback, asynchronous, loop) {
	this.load_callback = load_callback;
	this.error_callback = error_callback;

	this.width = 0;
	this.height = 0;
	this.color_depth = 0;

	this.pixels = null;
	this.image = null;

	this.error = false;

	var self = this;
	try {
		if (typeof(source_location) == typeof("")) {
			PNG.load(source_location, null, function (png) {
				self.image = png;
				self.pixels = png.decodePixels();

				self.width = self.image.width;
				self.height = self.image.height;

				self.color_depth = (png.hasAlphaChannel ? 4 : 3);

				if (typeof(self.load_callback) == "function") self.load_callback(self, callback_data);
			});
		}
		else {
			if (asynchronous) {
				png = new PNG(
					source_location,
					true,
					function (png) {
						png.decodePixelsAsynchronous(
							null,
							function (png, pixels) {
								self.image = png;
								self.pixels = pixels;
								self.width = self.image.width;
								self.height = self.image.height;

								self.color_depth = (png.hasAlphaChannel ? 4 : 3);

								if (typeof(self.load_callback) == "function") self.load_callback(self, callback_data);
							},
							function () {
								// Error
								self.error = true;
								if (typeof(self.error_callback) == "function") self.error_callback(self, callback_data);
							},
							loop
						);
					},
					function () {
						// Error
						self.error = true;
						if (typeof(self.error_callback) == "function") self.error_callback(self, callback_data);
					},
					loop
				);
			}
			else {
				var png = new PNG(source_location);
				self.image = png;
				self.pixels = png.decodePixels();

				self.width = self.image.width;
				self.height = self.image.height;

				self.color_depth = (png.hasAlphaChannel ? 4 : 3);

				if (typeof(self.load_callback) == "function") self.load_callback(self, callback_data);
			}
		}
	}
	catch (e) {
		// Error
		this.error = true;
		if (typeof(this.error_callback) == "function") this.error_callback(this, callback_data);
	}
}
DataImage.prototype = {
	constructor: DataImage,
	get_pixel: function (x, y, c) {
		return this.pixels[(x + y * this.width) * this.color_depth + c];
	}
};

function DataImageReader (image) {
	this.image = image;
	this.bitmask = 0;
	this.value_mask = 0;
	this.pixel_mask = 0xFF;
	this.x = 0;
	this.y = 0;
	this.c = 0;
	this.bit_value = 0;
	this.bit_count = 0;
	this.pixel_pos = 0;
	this.scatter_pos = 0;
	this.scatter_range = 0;
	this.scatter_full_range = 0;
	this.scatter = false;
	this.channels = 0;
	this.hashmasking = false;
	this.hashmask_length = 0;
	this.hashmask_index = 0;
	this.hashmask_value = null;
}
DataImageReader.prototype = {
	constructor: DataImageReader,
	decode_title: function (title) {
		return title;
	},
	unpack: function () {
		try {
			return this.__unpack();
		}
		catch (e) {
			return "Error extracting data; image file likely doesn't contain data";
		}
	},
	unpack_asynchronous: function (callback, loop) {
		try {
			this.__unpack_asynchronous(callback, loop);
		}
		catch (e) {
			callback("Error extracting data; image file likely doesn't contain data");
		}
	},
	unpack_names: function () {
		try {
			var r = this.__unpack_start();
			this.hashmasking = false;
			this.hashmask_value = null;
			return r;
		}
		catch (e) {
			return "Error extracting data; image file likely doesn't contain data";
		}
	},
	__unpack_start: function () {
		// Init
		this.x = 0;
		this.y = 0;
		this.c = 0;
		this.bit_value = 0;
		this.bit_count = 0;
		this.pixel_pos = 0;
		this.scatter_pos = 0;
		this.scatter_range = 0;
		this.scatter_full_range = 0;
		this.scatter = false;
		this.channels = 3;
		this.hashmasking = false;
		this.hashmask_length = 0;
		this.hashmask_index = 0;
		this.hashmask_value = null;

		// Read bitmask
		this.bitmask = 1 + this.__read_pixel(0x07);
		this.value_mask = (1 << this.bitmask) - 1;
		this.pixel_mask = 0xFF - this.value_mask;

		// Flags
		var flags = this.__read_pixel(0x07);
		// Bit depth
		if ((flags & 4) != 0) this.channels = 4;

		// Exflags
		var metadata = false;
		if ((flags & 1) != 0) {
			// Flags
			var flags2 = this.__data_to_int(this.__extract_data(1));
			// Evaluate
			if ((flags2 & 2) != 0) metadata = true;
			if ((flags2 & 4) != 0) {
				this.__complete_pixel();
				this.__init_hashmask();
			}
		}

		// Scatter
		if ((flags & 2) != 0) {
			// Read
			this.scatter_range = this.__data_to_int(this.__extract_data(4));
			this.__complete_pixel();

			// Enable scatter
			if (this.scatter_range > 0) {
				this.scatter_pos = 0;
				this.scatter_full_range = ((this.image.width * this.image.height * this.channels) - this.pixel_pos - 1);
				this.scatter = true;
			}
		}

		// Metadata
		var size_limit;
		if (metadata) {
			var meta_length = this.__data_to_int(this.__extract_data(2));

			// Error checking
			size_limit = Math.ceil(((((this.image.width * (this.image.height - this.y) - this.x) * this.channels) - this.c) * this.bitmask) / 8);
			if (meta_length < 0 || meta_length > size_limit) {
				throw "Data overflow";
			}

			var meta = this.__extract_data(meta_length);
		}

		// File count
		var file_count = this.__data_to_int(this.__extract_data(2));

		// Filename lengths and file lengths
		var filename_lengths = new Array();
		var file_sizes = new Array();
		var v;
		var total_size = 0;
		for (var i = 0; i < file_count; ++i) {
			// Filename length
			v = this.__data_to_int(this.__extract_data(2));
			filename_lengths.push(v);
			total_size += v;
			if (v < 0 || total_size < 0) throw "Data overflow";
			// File length
			v = this.__data_to_int(this.__extract_data(4));
			file_sizes.push(v);
			total_size += v;
			if (v < 0 || total_size < 0) throw "Data overflow";

			// Error checking
			size_limit = Math.ceil(((((this.image.width * (this.image.height - this.y) - this.x) * this.channels) - this.c) * this.bitmask) / 8);
			if (total_size > size_limit) throw "Data overflow";
		}

		// Filenames
		var filenames = new Array();
		for (var i = 0; i < file_count; ++i) {
			// Filename
			var fn = this.__data_to_string(this.__extract_data(filename_lengths[i]));
			// TODO : Decode this to utf-8
			// Add to list
			filenames.push(this.decode_title(fn));
		}

		// Return
		return [ file_count, filenames, file_sizes ];
	},
	__unpack: function () {
		var d = this.__unpack_start();
		var file_count = d[0];
		var filenames = d[1];
		var file_sizes = d[2];

		// Sources
		var sources = new Array();
		for (var i = 0; i < file_count; ++i) {
			// Read source
			var src = this.__extract_data(file_sizes[i]);
			sources.push(src);
		}

		// Done
		this.hashmasking = false;
		this.hashmask_value = null;
		return [ filenames , sources ];
	},
	__unpack_asynchronous: function (callback, loop) {
		try {
			if (loop === undefined) {
				loop = new Loop();
				loop.steps = 1024 * 64;
				loop.timeout = 1;
			}
		}
		catch (e) {
			// Error
			return this.__unpack(callback);
		}

		var d = this.__unpack_start();
		var file_count = d[0];
		var filenames = d[1];
		var file_sizes = d[2];

		// Sources
		var self = this;
		var sources = new Array();
		loop.for_lt(
			0, file_count, 1,
			{},
			function (i, data, loop) {
				// Read source
				self.__extract_data_asynchronous(
					file_sizes[i],
					loop,
					function (src) {
						sources.push(src);
					}
				);
			},
			function (i, data, loop) {
				// Done
				self.hashmasking = false;
				self.hashmask_value = null;
				callback([ filenames , sources ]);
			}
		);
	},
	next_pixel_component: function (count) {
		while (count > 0) {
			count -= 1;

			this.c = (this.c + 1) % this.channels;
			if (this.c == 0) {
				this.x = (this.x + 1) % this.image.width;
				if (this.x == 0) {
					this.y = (this.y + 1) % this.image.height;
					if (this.y == 0) {
						throw "Pixel overflow";
					}
				}
			}
		}
	},
	__extract_data: function (byte_length) {
		var src = new Uint8Array(byte_length);
		var j = 0;
		for (var i = this.bit_count; i < byte_length * 8; i += this.bitmask) {
			this.bit_value = this.bit_value | (this.__read_pixel(this.value_mask) << this.bit_count);
			this.bit_count += this.bitmask;
			while (this.bit_count >= 8) {
				src[j] = (this.bit_value & 0xFF);
				j += 1;
				this.bit_value = this.bit_value >> 8;
				this.bit_count -= 8;
			}
		}
		if (j != byte_length) {
			throw "Length mismatch";
		}
		return src;
	},
	__extract_data_asynchronous: function (byte_length, loop, done_callback) {
		var src = new Uint8Array(byte_length);
		var j = 0;
		var self = this;
		loop.for_lt(
			this.bit_count, byte_length * 8, this.bitmask,
			{},
			function (i, data, loop) {
				self.bit_value = self.bit_value | (self.__read_pixel(self.value_mask) << self.bit_count);
				self.bit_count += self.bitmask;
				while (self.bit_count >= 8) {
					src[j] = (self.bit_value & 0xFF);
					j += 1;
					self.bit_value = self.bit_value >> 8;
					self.bit_count -= 8;
				}
			},
			function (i, data, loop) {
				if (j != byte_length) {
					throw "Length mismatch (got: " + j + "; expected: " + byte_length + ")";
				}
				done_callback(src);
			}
		);
	},
	__data_to_int: function (data) {
		var val = 0;
		for (var i = 0; i < data.length; ++i) {
			val = (val << 8) + data[i];
		}
		return val;
	},
	__data_to_string: function (data) {
		var val = "";
		for (var i = 0; i < data.length; ++i) {
			val += String.fromCharCode(data[i]);
		}
		return val;
	},
	__read_pixel: function (value_mask) {
		var value = (this.image.get_pixel(this.x, this.y, this.c) & value_mask);
		if (this.hashmasking) {
			value = this.__decode_hashmask(value, this.bitmask);
		}

		if (this.scatter) {
			this.scatter_pos += 1;
			// integer division sure is fun
			var v = ((Math.floor(this.scatter_pos * this.scatter_full_range / this.scatter_range) - Math.floor((this.scatter_pos - 1) * this.scatter_full_range / this.scatter_range)));
			this.pixel_pos += v;
			this.next_pixel_component(v);
		}
		else {
			this.pixel_pos += 1;
			this.next_pixel_component(1);
		}

		return value;
	},
	__complete_pixel: function () {
		if (this.bit_count > 0) {
			this.bit_count = 0;
			this.bit_value = 0;
		}
	},
	__init_hashmask: function () {
		this.hashmasking = true;
		this.hashmask_length = 32 * 8;
		this.hashmask_index = 0;
		this.hashmask_value = new Uint8Array(this.hashmask_length / 8);
		for (var i = 0; i < this.hashmask_length / 8; ++i) {
			this.hashmask_value[i] = (1 << ((i % 8) + 1)) - 1;
		}
		this.__calculate_hashmask();
		this.hashmask_index = 0;
	},
	__calculate_hashmask: function () {
		// Vars
		var x = 0;
		var y = 0;
		var c = 0;
		var w = this.image.width;
		var h = this.image.height;
		var cc = this.channels;

		// First 2 flag pixels
		this.__update_hashmask(this.image.get_pixel(x, y, c) >> 3, 5);
		if ((c = (c + 1) % cc) == 0 && (x = (x + 1) % w) == 0 && (y = (y + 1) % h) == 0) return;
		this.__update_hashmask(this.image.get_pixel(x, y, c) >> 3, 5);
		if ((c = (c + 1) % cc) == 0 && (x = (x + 1) % w) == 0 && (y = (y + 1) % h) == 0) return;

		// All other pixels
		if (this.bitmask != 8) {
			while (true) {
				// Update
				this.__update_hashmask(this.image.get_pixel(x, y, c) >> this.bitmask, 8 - this.bitmask);
				// Next
				if ((c = (c + 1) % cc) == 0 && (x = (x + 1) % w) == 0 && (y = (y + 1) % h) == 0) return;
			}
		}
	},
	__update_hashmask: function (value, bits) {
		// First 2 flag pixels
		var b;
		while (true) {
			// Number of bits that can be used on this index
			b = 8 - (this.hashmask_index % 8);
			if (bits <= b) {
				// Apply
				this.hashmask_value[Math.floor(this.hashmask_index / 8)] ^= (value) << (this.hashmask_index % 8);
				// Done
				this.hashmask_index = (this.hashmask_index + bits) % (this.hashmask_length);
				return;
			}
			else {
				// Partial apply
				this.hashmask_value[Math.floor(this.hashmask_index / 8)] ^= (value & ((1 << b) - 1)) << (this.hashmask_index % 8);
				// Done
				this.hashmask_index = (this.hashmask_index + b) % (this.hashmask_length);
				bits -= b;
				value >>= b;
			}
		}
	},
	__decode_hashmask: function (value, bits) {
		var b;
		var off = 0;
		while (true) {
			b = 8 - (this.hashmask_index % 8);
			if (bits <= b) {
				// Apply
				value ^= (this.hashmask_value[Math.floor(this.hashmask_index / 8)] & ((1 << bits) - 1)) << off;
				// Done
				this.hashmask_index = (this.hashmask_index + bits) % (this.hashmask_length);
				return value;
			}
			else {
				// Partial apply
				value ^= (this.hashmask_value[Math.floor(this.hashmask_index / 8)] & ((1 << b) - 1)) << off;
				// Done
				this.hashmask_index = (this.hashmask_index + b) % (this.hashmask_length);
				bits -= b;
				off += b;
			}
		}
	}
};

////////////////////////////////////////////////////////////////////////////////
//} /DataImage.js
////////////////////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////////////////////////
//{ ve_api.js
////////////////////////////////////////////////////////////////////////////////
// Ve API Script 1.0


// Videncode API
var Videncode = (function () {

	// Variables
	var signature = ".ve.snd\0";



	/**
		Constructor method.

		@return
			new Videncode object
	*/
	function ve() {
		// Initial state
		this.data_blob = null;
		this.reset();
	}

	// Private methods
	var this_private = {

		/**
			Keep a string to be less than maxLen characters when encoded as UTF-8.

			@param str
				the string to modify
			@param maxLen
				the maximum length of the string when encoded in UTF-8
			@return
				the string updated to be within maxLen's length range
		*/
		adjust_utf8_string_length: function (str, maxLen) {
			var utf8_str = unescape(encodeURIComponent(str));

			if (utf8_str.length > maxLen) {
				var loop = true;
				var newStr = "";
				while (loop && maxLen >= 0) {
					loop = false;
					try {
						newStr = decodeURIComponent(escape(utf8_str.substr(0, maxLen)));
					}
					catch (e) {
						--maxLen;
						loop = true;
					}
				}

				return newStr;
			}

			return str;
		},

		/**
			Set the error message if it is not set.

			@param message
				a string containing an error message
			@return
				this
		*/
		set_error: function (message) {
			// Set
			if (this.error_message === null) {
				this.error_message = message;
			}

			return this;
		},

		/**
			Get the number of bytes required to store a varlen int.

			@param value
				the value to be stored
			@param maxLen
				the maximum number of bytes
			@return
				the number of bytes needed
		*/
		get_varlen_int_length: function (value, maxLen) {
			var i = 0;
			for (; i < maxLen; ++i) {
				value = value >>> 7;
				if (value == 0) return i + 1;
			}
			return i;
		},

		/**
			Convert an integer to a varlen int, stored in a Uint8Array.

			@param value
				the value to be stored
			@param bytes
				a Uint8Array which will contain the result;
				it's length is used as the max length
			@return
				the number of bytes useds
		*/
		int_to_varlen_bytes: function (value, bytes) {
			var i = 0;
			for (; i < bytes.length; ++i) {
				if (i > 0) bytes[i - 1] |= 0x80;

				bytes[i] = (value & 0x7F);
				value = value >>> 7;
				if (value == 0) return i + 1;
			}
			return i;
		},

		/**
			Convert a string to a Uint8Array.
			Note that this does not do any UTF-8 conversion, that has to be
			done beforehand.

			@param str
				the string to convert
			@return
				a new Uint8Array containing the string
		*/
		string_to_bytes: function (str) {
			var bytes = new Uint8Array(new ArrayBuffer(str.length))
			for (var i = 0; i < str.length; ++i) bytes[i] = str.charCodeAt(i);
			return bytes;
		},

		/**
			Mask a single byte and return its new value.
			If masking is disabled, this does nothing and returns the input.

			@param b
				the byte to mask
			@return
				the masked byte
		*/
		mask_byte: function (b) {
			if (!this.mask_file) return b;

			this.mask_value = (this.mask_value * 102293 + 390843) & 0xFFFFFFFF;
			this.mask = this.mask_value >>> 24;
			this.mask_value += b;
			return (b ^ this.mask);
		},

		/**
			Update the mask with a sequence of bytes.

			@param bytes
				a Uint8Array of byte values
			@param length
				the number of bytes to update the mask with
		*/
		mask_modify_from_bytes: function (bytes, length) {
			if (!this.mask_file) return;

			for (var i = 0; i < length; ++i) {
				this.mask_value = (this.mask_value * 102293 + 390843) & 0xFFFFFFFF;
				this.mask = this.mask_value >>> 24;
				this.mask_value += ((bytes[i] & 0xFF) ^ this.mask);
			}
		}

	};

	// Public Methods
	ve.prototype = {

		constructor: ve,

		/**
			Reset the state of the object.

			@return
				this
		*/
		reset: function () {
			this.error_message = null;

			this.video = null;
			this.audio = null;
			this.image = null;
			this.image_mime = "";

			this.sync_offset = 0.0;

			this.video_fades = [ false , false ];
			this.audio_fades = [ false , false ];

			this.video_play_style = [ 0 , 0 ];
			this.audio_play_style = [ 0 , 0 ];

			this.output_data = null;
			if (this.data_blob != null) {
				this.data_blob = null;
				(window.webkitURL || window.URL).revokeObjectURL(this.data_blob_url);
			}
			this.data_blob_url = null;

			this.mask_file = true;
			this.mask = 0x12;
			this.mask_value = 0xABCDEF;

			return this;
		},

		/**
			Encode the given settings into a new file. To check if this succeeded,
			use has_error() after the call.

			@return
				this
		*/
		encode: function () {
			// Check
			if (this.error_message !== null || this.output_data !== null) {
				this_private.set_error.call(this, "Not reset");
				return this;
			}
			if (this.image == null) {
				this_private.set_error.call(this, "No image");
				return this;
			}
			if (this.video == null && this.audio == null) {
				this_private.set_error.call(this, "No video or audio");
				return this;
			}

			// Signature
			var signature_array = this_private.string_to_bytes.call(this, signature);

			// UTF-8 tag
			var utf8_tag = (this.tag == null ? "" : this_private.adjust_utf8_string_length.call(this, this.tag, 100));
			utf8_tag = unescape(encodeURIComponent(utf8_tag));
			var utf8_tag_array = this_private.string_to_bytes.call(this, utf8_tag);

			// Sync offset
			var sync_int = Math.floor(this.sync_offset);
			var sync_dec = this.sync_offset - sync_int;

			// Temp
			var temp = Uint8Array(new ArrayBuffer(5));
			var has_both = (this.video != null && this.audio != null);

			// Calculate size requirements
			var size = this.image.length + // image
				signature_array.length + // signature
				1 + // version
				1 + // flags1
				(has_both ? 1 : 0) + // flags2
				this_private.get_varlen_int_length.call(this, utf8_tag_array.length, 5) + // tag length
				utf8_tag_array.length + // tag
				(has_both ? this_private.get_varlen_int_length.call(this, sync_int, 5) + 2 : 0) + // sync offset
				(this.video != null ? this_private.get_varlen_int_length.call(this, this.video.length, 5) : 0) + // video length
				(this.video != null ? this.video.length : 0) + // video
				(this.audio != null ? this_private.get_varlen_int_length.call(this, this.audio.length, 5) : 0) + // audio length
				(this.audio != null ? this.audio.length : 0); // audio

			// Create new
			this.output_data = Uint8Array(new ArrayBuffer(size));

			// Copy image
			var pos = 0;
			this_private.mask_modify_from_bytes.call(this, this.image, this.image.length);
			for (; pos < this.image.length; ++pos) {
				this.output_data[pos] = this.image[pos];
			}

			// Signature
			for (var i = 0; i < signature_array.length; ++i) {
				this.output_data[pos] = this_private.mask_byte.call(this, signature_array[i]);
				++pos;
			}

			// Version
			temp[0] = 1;
			this.output_data[pos++] = this_private.mask_byte.call(this, temp[0]);

			// Flags1
			temp[0] = (
				(this.video != null ? 0x01 : 0x00) |
				(this.audio != null ? 0x02 : 0x00) |
				// 0x04 : reserved
				// 0x08 : reserved
				(has_both && this.video_fades[0] ? 0x10 : 0x00) |
				(has_both && this.video_fades[1] ? 0x20 : 0x00) |
				(has_both && this.audio_fades[0] ? 0x40 : 0x00) |
				(has_both && this.audio_fades[1] ? 0x80 : 0x00)
			);
			this.output_data[pos++] = this_private.mask_byte.call(this, temp[0]);

			// Flags2
			if (has_both) {
				temp[0] = (
					(this.video_play_style[0] & 0x03) | // 0x01 , 0x02
					((this.video_play_style[1] & 0x03) << 2) | // 0x04 , 0x08
					((this.audio_play_style[0] & 0x01) << 4) | // 0x10
					((this.audio_play_style[0] & 0x01) << 5) // 0x20
					// 0x40 : reserved
					// 0x80 : reserved
				);
				this.output_data[pos++] = this_private.mask_byte.call(this, temp[0]);
			}

			// Tag
			var len = this_private.int_to_varlen_bytes.call(this, utf8_tag_array.length, temp);
			for (var i = 0; i < len; ++i) {
				this.output_data[pos++] = this_private.mask_byte.call(this, temp[i]);
			}
			for (var i = 0; i < utf8_tag_array.length; ++i) {
				this.output_data[pos++] = this_private.mask_byte.call(this, utf8_tag_array[i]);
			}

			// Sync offset
			if (has_both) {
				len = this_private.int_to_varlen_bytes.call(this, sync_int, temp);
				for (var i = 0; i < len; ++i) {
					this.output_data[pos++] = this_private.mask_byte.call(this, temp[i]);
				}

				len = 2;
				for (var i = 0; i < len; ++i) {
					temp[i] = 0;
					for (var j = 0; j < 8; ++j) {
						if ((sync_dec *= 2) >= 1.0) {
							sync_dec -= 1.0;
							temp[i] |= (1 << j);
						}
					}
				}
				for (var i = 0; i < len; ++i) {
					this.output_data[pos++] = this_private.mask_byte.call(this, temp[i]);
				}
			}

			// Video
			if (this.video != null) {
				len = this_private.int_to_varlen_bytes.call(this, this.video.length, temp);
				for (var i = 0; i < len; ++i) {
					this.output_data[pos++] = this_private.mask_byte.call(this, temp[i]);
				}

				len = this.video.length;
				for (var i = 0; i < len; ++i) {
					this.output_data[pos++] = this_private.mask_byte.call(this, this.video[i]);
				}
			}

			// Audio
			if (this.audio != null) {
				len = this_private.int_to_varlen_bytes.call(this, this.audio.length, temp);
				for (var i = 0; i < len; ++i) {
					this.output_data[pos++] = this_private.mask_byte.call(this, temp[i]);
				}

				len = this.audio.length;
				for (var i = 0; i < len; ++i) {
					this.output_data[pos++] = this_private.mask_byte.call(this, this.audio[i]);
				}
			}

			// Done
			return this;
		},

		/**
			Get the byte array of the final image.

			@return
				null if the encoding wasn't completed
				otherwise, a Uint8Array of the data
		*/
		get_data: function () {
			return this.output_data;
		},

		/**
			Get a usable blob URL from the generated data.

			@return
				null if the encoding wasn't completed
				otherwise, a string containing a URL
		*/
		get_url: function () {
			if (this.output_data != null) {
				if (this.data_blob == null) {
					this.data_blob = new Blob([ this.output_data ], {type: this.image_mime});
					this.data_blob_url = (window.webkitURL || window.URL).createObjectURL(this.data_blob);
				}

				return this.data_blob_url;
			}

			return null;
		},

		/**
			Get the mime type of the original image.

			@return
				whatever was passed into set_image();
				presumably one of "image/jpeg", "image/png", or "image/gif"
		*/
		get_image_mime_type: function () {
			return this.image_mime;
		},

		/**
			Get the error message.

			@return
				a string containing the error message, or null if no error
		*/
		get_error: function () {
			// Get
			return (this.error_message !== null ? this.error_message : (this.output_data === null ? "Not encoded" : null));
		},

		/**
			Check if there was an error.

			@return
				true if there was an error, false otherwise
		*/
		has_error: function () {
			return (this.error_message !== null || this.output_data === null);
		},

		/**
			Set the video data for the object.

			@param video
				a Uint8Array of the video data
			@return
				this
		*/
		set_video: function (video) {
			this.video = video;

			return this;
		},

		/**
			Set the audio data for the object.

			@param audio
				a Uint8Array of the audio data
			@return
				this
		*/
		set_audio: function (audio) {
			this.audio = audio

			return this;
		},

		/**
			Set the image data for the object.

			@param image
				a Uint8Array of the image data
			@param mime_type
				a string of the mime type of the image
			@return
				this
		*/
		set_image: function (image, mime_type) {
			this.image = image;
			this.image_mime = mime_type;

			return this;
		},

		/**
			Set tag for the object.

			@param tag
				a string of the tag
			@return
				this
		*/
		set_tag: function (tag) {
			this.tag = tag;

			return this;
		},

		/**
			Set the method the video should play with.
			This is only meaningful if the video and audio are separate.
			Current values are:
				0: display blank when the video isn't playing
				1: loop the video
				2: display the video frame when the video isn't playing
				3: display the image when the video isn't playing

			@param start
				true if the method should be applied to the start of playback, false otherwise
			@param style
				one of the above values
			@return
				this
		*/
		set_video_play_style: function (start, style) {
			if (style !== 0 && style !== 1 && style !== 2 && style !== 3) style = 0;

			this.video_play_style[start ? 0 : 1] = style;

			return this;
		},

		/**
			Set the method the audio should play with.
			This is only meaningful if the video and audio are separate.
			Current values are:
				0: play nothing
				1: loop the audio

			@param start
				true if the method should be applied to the start of playback, false otherwise
			@param style
				one of the above values
			@return
				this
		*/
		set_audio_play_style: function (start, style) {
			if (style !== 0 && style !== 1) style = 0;

			this.audio_play_style[start ? 0 : 1] = style;

			return this;
		},

		/**
			Set if the video should fade in/out or not.
			This is only meaningful if the video and audio are separate.

			@param start
				true if the fade should be applied to the start of playback, false otherwise
			@param enabled
				true if a fade should occur, false otherwise
			@return
				this
		*/
		set_video_fade: function (start, enabled) {
			this.video_fades[start ? 0 : 1] = enabled;

			return this;
		},

		/**
			Set if the audio should fade in/out or not.
			This is only meaningful if the video and audio are separate.

			@param start
				true if the fade should be applied to the start of playback, false otherwise
			@param enabled
				true if a fade should occur, false otherwise
			@return
				this
		*/
		set_audio_fade: function (start, enabled) {
			this.audio_fades[start ? 0 : 1] = enabled;

			return this;
		},

		/**
			Set the sync offset of the shorter track.
			This is only meaningful if the video and audio are separate.

			@param offset
				the offset in seconds
			@return
				this
		*/
		set_sync_offset: function (offset) {
			this.sync_offset = offset;

			return this;
		}

	};

	// Return
	return ve;

})();


// Videcode API
var Videcode = (function () {

	// Variables
	var function_type = typeof(function(){});
	var object_type = typeof({});
	var signature = ".ve.snd\0";
	var signature_array = new Uint8Array(new ArrayBuffer(signature.length));
	for (i = 0; i < signature.length; ++i) signature_array[i] = signature.charCodeAt(i);



	/**
		Constructor method.

		@param source
			a Uint8Array of the full image
		@param filename
			the name of the original file
		@return
			new Videcode object
	*/
	function ve(source, filename) {
		// Set vars
		this.source = source;
		this.filename = filename;
		var ext = filename.split(".").pop().toLowerCase();
		if (ext == "png") this.mime = "image/png";
		else if (ext == "gif") this.mime = "image/gif";
		else this.mime = "image/jpeg"

		// Status
		this.async_timer = null;
		this.reset();
	}

	// Private methods
	var this_private = {

		/**
			Update the mask state with a single byte value.

			@param b
				the byte value
			@return
				the unmasked byte
		*/
		mask_update: function (b) {
			// Mask update
			this.mask_value = (this.mask_value * 102293 + 390843) & 0xFFFFFFFF;
			this.mask = this.mask_value >>> 24;
			b = (b ^ this.mask);
			this.mask_value += b;

			// Return unmasked value
			return b;
		},

		/**
			Update the mask state with a single byte value.
			A checking version which returns -1 if the end of the file
			has been reached and will modify the error message.

			@param b
				the byte value
			@return
				the unmasked byte, or -1 if at EOF
		*/
		mask_update_checked: function (b) {
			// Check for undefined
			if (b === undefined) {
				this_private.set_error.call(this, "End of file");
				return -1;
			}

			// Mask update
			this.mask_value = (this.mask_value * 102293 + 390843) & 0xFFFFFFFF;
			this.mask = this.mask_value >>> 24;
			b = (b ^ this.mask);
			this.mask_value += b;

			// Return unmasked value
			return b;
		},

		/**
			Read a variable-byte-length integer from the source.
			On failure, the error message will be modified.

			@param start
				the position of the first byte
			@param maxlen
				the maximum number of bytes that can make up the number
			@return
				null on failure,
				[ value , count ] on success, where
					value is the retrieved integer value,
					count is the number of bytes read
		*/
		read_varlen_int: function (start, maxlen) {
			var value = 0;
			var i = 0, b;

			// Read
			for (; i < maxlen; ++i) {
				value = value | ((b = this_private.mask_update_checked.call(this, this.source[start + i])) & 0x7F) << (7 * i);
				if (b < 0) {
					// End of stream
					return null;
				}
				if ((b & 0x80) == 0) break;
			}

			// Bad format
			if (i == maxlen) {
				this_private.set_error.call(this, "Bad number format");
				return null;
			}

			// Okay
			return [ value , i + 1 ];
		},

		/**
			Set the error message if it is not set.

			@param message
				a string containing an error message
			@return
				this
		*/
		set_error: function (message) {
			// Set
			if (this.error_message === null) {
				this.error_message = message;
				this.malformed = true;
			}

			return this;
		},

		/**

		*/
		decode_async_internal: function (async_settings, callback, progress, callback_data, sd) {
			// Vars
			var self = this;
			this.async_timer = null;
			var len = this.source.length, b, data;

			// Reset
			if (sd.reset === undefined) {
				this.reset();
				sd.i = 0;
				sd.j = 0;
				sd.pos = 0;
				sd.reset = true;
			}
			var i_start = sd.i;

			// Find signature
			if (sd.signature_check_done === undefined) {
				while (sd.i < len) {
					b = this_private.mask_update.call(this, this.source[sd.i]);

					if (b == signature_array[sd.pos]) {
						// Found
						if (++sd.pos >= signature_array.length) {
							++sd.i;
							this.data_offset = sd.i - signature_array.length;
							break;
						}
					}
					else {
						// Reset
						sd.pos = 0;
					}

					// Async
					if ((++sd.i) - i_start >= async_settings.steps) {
						if (progress != null) progress.call(this, {percent: (sd.i / len)}, callback_data);
						this.async_timer = setTimeout(function () { this_private.decode_async_internal.call(self, async_settings, callback, progress, callback_data, sd); }, async_settings.delay);
						return;
					}
				}
				sd.signature_check_done = true;
			}

			// No errors
			if (this.error_message === null) {
				// Signature found
				if (sd.i < len) {
					// Version
					if (sd.version === undefined) {
						this.version = this_private.mask_update_checked.call(this, this.source[sd.i++]);
						sd.version = true;
					}

					// Async
					if (sd.i - i_start >= async_settings.steps) {
						if (progress != null) progress.call(this, {percent: (sd.i / len)}, callback_data);
						this.async_timer = setTimeout(function () { this_private.decode_async_internal.call(self, async_settings, callback, progress, callback_data, sd); }, async_settings.delay);
						return;
					}

					// Flags1
					if (sd.flags1 === undefined) {
						sd.flags1 = this_private.mask_update_checked.call(this, this.source[sd.i++]);
						this.multiplexed = ((sd.flags1 & 0x04) != 0);
						this.video_fades[0] = ((sd.flags1 & 0x10) != 0);
						this.video_fades[1] = ((sd.flags1 & 0x20) != 0);
						this.audio_fades[0] = ((sd.flags1 & 0x40) != 0);
						this.audio_fades[1] = ((sd.flags1 & 0x80) != 0);
					}

					// Async
					if (sd.i - i_start >= async_settings.steps) {
						if (progress != null) progress.call(this, {percent: (sd.i / len)}, callback_data);
						this.async_timer = setTimeout(function () { this_private.decode_async_internal.call(self, async_settings, callback, progress, callback_data, sd); }, async_settings.delay);
						return;
					}

					// Flags2
					if (sd.flags2 === undefined) {
						sd.flags2 = 0;
						if ((sd.flags1 & 0x03) == 0x03) {
							sd.flags2 = this_private.mask_update_checked.call(this, this.source[sd.i++]);
							this.video_play_style[0] = (sd.flags2 & 0x03);
							this.video_play_style[1] = (sd.flags2 & 0x0C) >> 2;
							this.audio_play_style[0] = (sd.flags2 & 0x10) >> 4;
							this.audio_play_style[1] = (sd.flags2 & 0x20) >> 5;
							this.video_is_longer = ((sd.flags2 & 0x40) != 0);
						}
					}

					// Async
					if (sd.i - i_start >= async_settings.steps) {
						if (progress != null) progress.call(this, {percent: (sd.i / len)}, callback_data);
						this.async_timer = setTimeout(function () { this_private.decode_async_internal.call(self, async_settings, callback, progress, callback_data, sd); }, async_settings.delay);
						return;
					}

					// Var-length tag
					if (sd.tag_found === undefined) {
						// Length
						if (sd.tag_length === undefined) {
							data = this_private.read_varlen_int.call(this, sd.i, 5);
							if (data !== null) {
								sd.i += data[1];
								sd.tag_length = data[0];
							}
							else {
								sd.tag_length = -1;
							}

							if (sd.tag_length >= 0) {
								if (sd.tag_length + sd.i <= this.source.length) {
									sd.i_end = sd.i + sd.tag_length;
								}
								else {
									// Error
									this_private.set_error.call(this, "End of file");
								}
							}
						}

						// Async
						if (sd.i - i_start >= async_settings.steps) {
							if (progress != null) progress.call(this, {percent: (sd.i / len)}, callback_data);
							this.async_timer = setTimeout(function () { this_private.decode_async_internal.call(self, async_settings, callback, progress, callback_data, sd); }, async_settings.delay);
							return;
						}

						// No errors
						if (this.error_message === null) {
							// Tag
							while (sd.i < sd.i_end) {
								this.tag += String.fromCharCode(this_private.mask_update.call(this, this.source[sd.i]));

								// Async
								if ((++sd.i) - i_start >= async_settings.steps) {
									if (progress != null) progress.call(this, {percent: (sd.i / len)}, callback_data);
									this.async_timer = setTimeout(function () { this_private.decode_async_internal.call(self, async_settings, callback, progress, callback_data, sd); }, async_settings.delay);
									return;
								}
							}

							// Decode UTF-8
							try {
								this.tag = decodeURIComponent(escape(this.tag));
							}
							catch (e) {}
						}

						sd.tag_found = true;
					}

					// No errors
					if (this.error_message === null) {

						// Sync offsets
						if (sd.sync_offset === undefined) {
							if ((sd.flags1 & 0x03) == 0x03) {
								// Integer part
								data = this_private.read_varlen_int.call(this, sd.i, 5);
								if (data != null) {
									sd.i += data[1];
									this.sync_offset = data[0];

									// Decimal part
									var dec = [ 0 , 0 ];
									var dec_val = 0.5;
									var fraction = 0.0;
									dec[0] = this_private.mask_update_checked.call(this, this.source[sd.i++]);
									dec[1] = this_private.mask_update_checked.call(this, this.source[sd.i++]);

									for (var j = 0; j < dec.length; ++j) {
										for (var k = 0; k < 8; ++k) {
											if ((dec[j] & (1 << k)) != 0) fraction += dec_val;
											dec_val /= 2.0;
										}
									}

									this.sync_offset += fraction;
								}
							}
							sd.sync_offset = true;
						}

						// Async
						if (sd.i - i_start >= async_settings.steps) {
							if (progress != null) progress.call(this, {percent: (sd.i / len)}, callback_data);
							this.async_timer = setTimeout(function () { this_private.decode_async_internal.call(self, async_settings, callback, progress, callback_data, sd); }, async_settings.delay);
							return;
						}

						// No errors
						if (this.error_message === null) {

							// Video
							if (sd.video_found === undefined) {
								if ((sd.flags1 & 0x01) != 0) {
									// Length
									if (sd.video_length === undefined) {
										data = this_private.read_varlen_int.call(this, sd.i, 5);
										if (data !== null) {
											sd.i += data[1];
											sd.video_length = data[0];
										}
										else {
											sd.video_length = -1;
										}

										if (sd.video_length >= 0) {
											if (sd.video_length + sd.i <= this.source.length) {
												this.video = new Uint8Array(new ArrayBuffer(sd.video_length));
												sd.j = 0;
												sd.i_end = sd.i + sd.video_length;
											}
											else {
												// Error
												this_private.set_error.call(this, "End of file");
											}
										}
									}

									// Async
									if (sd.i - i_start >= async_settings.steps) {
										if (progress != null) progress.call(this, {percent: (sd.i / len)}, callback_data);
										this.async_timer = setTimeout(function () { this_private.decode_async_internal.call(self, async_settings, callback, progress, callback_data, sd); }, async_settings.delay);
										return;
									}

									// No errors
									if (this.error_message === null) {
										// Video data
										while (sd.i < sd.i_end) {
											this.video[sd.j++] = this_private.mask_update.call(this, this.source[sd.i]);

											// Async
											if ((++sd.i) - i_start >= async_settings.steps) {
												if (progress != null) progress.call(this, {percent: (sd.i / len)}, callback_data);
												this.async_timer = setTimeout(function () { this_private.decode_async_internal.call(self, async_settings, callback, progress, callback_data, sd); }, async_settings.delay);
												return;
											}
										}
									}
								}

								sd.video_found = true;
							}

							// No errors
							if (this.error_message === null) {

								// Audio
								if (sd.audio_found === undefined) {
									if ((sd.flags1 & 0x02) != 0) {
										// Length
										if (sd.audio_length === undefined) {
											data = this_private.read_varlen_int.call(this, sd.i, 5);
											if (data !== null) {
												sd.i += data[1];
												sd.audio_length = data[0];
											}
											else {
												sd.audio_length = -1;
											}

											// Checking
											if (sd.audio_length >= 0) {
												if (sd.audio_length + sd.i <= this.source.length) {
													this.audio = new Uint8Array(new ArrayBuffer(sd.audio_length));
													sd.j = 0;
													sd.i_end = sd.i + sd.audio_length;
												}
												else {
													this_private.set_error.call(this, "End of file");
												}
											}
										}

										// Async
										if (sd.i - i_start >= async_settings.steps) {
											if (progress != null) progress.call(this, {percent: (sd.i / len)}, callback_data);
											this.async_timer = setTimeout(function () { this_private.decode_async_internal.call(self, async_settings, callback, progress, callback_data, sd); }, async_settings.delay);
											return;
										}

										// No errors
										if (this.error_message === null) {

											// Video data
											while (sd.i < sd.i_end) {
												this.audio[sd.j++] = this_private.mask_update.call(this, this.source[sd.i]);

												// Async
												if ((++sd.i) - i_start >= async_settings.steps) {
													if (progress != null) progress.call(this, {percent: (sd.i / len)}, callback_data);
													this.async_timer = setTimeout(function () { this_private.decode_async_internal.call(self, async_settings, callback, progress, callback_data, sd); }, async_settings.delay);
													return;
												}
											}

										}

									}

									sd.audio_found = true;
								}

								// Image
								this.image = this.source.subarray(0, this.data_offset);

							}

						}

					}

				}
				else {
					this_private.set_error.call(this, "No data found");
					this.malformed = false;
				}
			}

			// Error
			if (this.error_message !== null) {
				this.video = null;
				this.audio = null;
				this.image = null;
			}

			// Async: done
			if (progress != null) {
				progress.call(this, {percent: 1.0}, callback_data);
			}
			if (callback != null) {
				callback.call(this, callback_data);
			}
		}

	};

	// Public Methods
	ve.prototype = {

		constructor: ve,

		/**
			Reset the state of the object.

			@return
				this
		*/
		reset: function () {
			// Decoding data
			this.version = 0;

			this.malformed = false;
			this.error_message = null;
			this.mask = 0x12;
			this.mask_value = 0xABCDEF;

			this.data_offset = 0;

			this.tag = "";
			this.sync_offset = 0;

			this.multiplexed = false;
			this.video_is_longer = false;

			this.video = null;
			this.audio = null;
			this.image = null;

			if (this.async_timer != null) {
				clearTimeout(this.async_timer);
				this.async_timer = null;
			}

			this.video_fades = [ false , false ];
			this.audio_fades = [ false , false ];

			this.video_play_style = [ 0 , 0 ];
			this.audio_play_style = [ 0 , 0 ];

			return this;
		},

		/**
			Decode the source image; image is guaranteed to be decoded on return.

			@return
				this
		*/
		decode: function () {
			// Reset
			this.reset();

			// Setup
			var pos = 0;
			var len = this.source.length;
			var b, i;

			// Find signature
			for (i = 0; i < len; ++i) {
				b = this_private.mask_update.call(this, this.source[i]);

				if (b == signature_array[pos]) {
					// Found
					if (++pos >= signature_array.length) {
						++i;
						this.data_offset = i - signature_array.length;
						break;
					}
				}
				else {
					// Reset
					pos = 0;
				}
			}

			// Signature found
			if (i < len) {
				// Version
				this.version = this_private.mask_update_checked.call(this, this.source[i++]);

				// Flags1
				var flags1 = this_private.mask_update_checked.call(this, this.source[i++]);
				this.multiplexed = ((flags1 & 0x04) != 0);
				this.video_fades[0] = ((flags1 & 0x10) != 0);
				this.video_fades[1] = ((flags1 & 0x20) != 0);
				this.audio_fades[0] = ((flags1 & 0x40) != 0);
				this.audio_fades[1] = ((flags1 & 0x80) != 0);

				// Flags2
				var flags2 = 0;
				if ((flags1 & 0x03) == 0x03) {
					flags2 = this_private.mask_update_checked.call(this, this.source[i++]);
					this.video_play_style[0] = (flags2 & 0x03);
					this.video_play_style[1] = (flags2 & 0x0C) >> 2;
					this.audio_play_style[0] = (flags2 & 0x10) >> 4;
					this.audio_play_style[1] = (flags2 & 0x20) >> 5;
					this.video_is_longer = ((flags2 & 0x40) != 0);
				}

				// Var-length tag
				var data = this_private.read_varlen_int.call(this, i, 5);
				if (data !== null) {
					i += data[1];
					var tag_length = data[0];

					// Tag
					if (tag_length + i <= this.source.length) {
						len = i + tag_length;

						for (; i < len; ++i) {
							this.tag += String.fromCharCode(this_private.mask_update.call(this, this.source[i]));
						}

						// Decode UTF-8
						try {
							this.tag = decodeURIComponent(escape(this.tag));
						}
						catch (e) {}
					}
					else {
						// Error
						this_private.set_error.call(this, "End of file");
					}
				}

				// Sync offsets
				if ((flags1 & 0x03) == 0x03 && this.error_message === null) {
					// Integer part
					var data = this_private.read_varlen_int.call(this, i, 5);
					if (data != null) {
						i += data[1];
						this.sync_offset = data[0];

						// Decimal part
						var dec = [ 0 , 0 ];
						var dec_val = 0.5;
						var fraction = 0.0;
						dec[0] = this_private.mask_update_checked.call(this, this.source[i++]);
						dec[1] = this_private.mask_update_checked.call(this, this.source[i++]);

						for (var j = 0; j < dec.length; ++j) {
							for (var k = 0; k < 8; ++k) {
								if ((dec[j] & (1 << k)) != 0) fraction += dec_val;
								dec_val /= 2.0;
							}
						}

						this.sync_offset += fraction;
					}
				}

				// Video
				if ((flags1 & 0x01) != 0 && this.error_message === null) {
					data = this_private.read_varlen_int.call(this, i, 5);
					if (data !== null) {
						i += data[1];
						var video_length = data[0];

						// Video data
						if (video_length + i <= this.source.length) {
							len = i + video_length;
							this.video = new Uint8Array(new ArrayBuffer(video_length));

							var j = 0;
							for (; i < len; ++i) {
								this.video[j++] = this_private.mask_update.call(this, this.source[i]);
							}
						}
						else {
							// Error
							this_private.set_error.call(this, "End of file");
						}
					}
				}

				// Audio
				if ((flags1 & 0x02) != 0 && this.error_message === null) {
					data = this_private.read_varlen_int.call(this, i, 5);
					if (data !== null) {
						i += data[1];
						var audio_length = data[0];

						// Video data
						if (audio_length + i <= this.source.length) {
							len = i + audio_length;
							this.audio = new Uint8Array(new ArrayBuffer(audio_length));

							var j = 0;
							for (; i < len; ++i) {
								this.audio[j++] = this_private.mask_update.call(this, this.source[i]);
							}
						}
						else {
							// Error
							this_private.set_error.call(this, "End of file");
						}
					}
				}

				// Image
				this.image = this.source.subarray(0, this.data_offset);
			}
			else {
				this_private.set_error.call(this, "No data found");
				this.malformed = false;
			}

			// Error
			if (this.error_message !== null) {
				this.video = null;
				this.audio = null;
				this.image = null;
			}

			// Done
			return this;
		},

		/**
			Decode the source image; image is guaranteed to be decoded on return.

			@param [async_settings]
				optional; object containing the asynchronous settings
			@param callback
				a callback to be executed, in the form of:
					function (callback_data) {...}
				where the this object = the videcode object
				callback_data is the last argument
			@param [progress]
				a callback to be executed on status updates, in the form of:
					function (progress_data, callback_data) {...}
				where the this object = the videcode object
				progress_data is in the form of {percent:?}
				callback_data is the next argument
			@param [callback_data]
				optional; data to be passed as the first argument into the callback function
		*/
		decode_async: function (async_settings, callback, progress, callback_data) {
			// Arguments
			if (arguments.length <= 1 || typeof(async_settings) == function_type) {
				// Shift if omitted
				callback_data = progress;
				progress = callback;
				callback = async_settings;
				async_settings = null;
			}
			if (typeof(callback) != function_type) {
				callback = null
			}
			if (typeof(progress) != function_type) {
				progress = null
			}

			// Async settings
			if (async_settings == null || typeof(async_settings) != object_type) {
				async_settings = {};
			}
			async_settings.steps = async_settings.steps || 100;
			async_settings.delay = async_settings.delay || 100;
			if (async_settings.steps < 0) async_settings.steps = 0;
			if (async_settings.delay < 1) async_settings.delay = 1;

			// Call
			this_private.decode_async_internal.call(this, async_settings, callback, progress, callback_data, {});
		},

		/**
			Get the error message.

			@return
				a string containing the error message, or null if no error
		*/
		get_error: function () {
			// Get
			return (this.error_message !== null ? this.error_message : (this.image === null ? "Not decoded" : null));
		},

		/**
			Check if there was an error.

			@return
				true if there was an error, false otherwise
		*/
		has_error: function () {
			return (this.error_message !== null || this.image === null);
		},

		/**
			Check if the decoded data was malformed.

			@return
				true if not decoded or not malformed,
				false if an error occured that wasn't "no data found"
		*/
		is_malformed: function () {
			return this.malformed;
		},

		/**
			Check if this object has video.

			@return
				true if it has video data, false otherwise
		*/
		has_video: function () {
			return (this.video != null);
		},

		/**
			Check if this object has separate audio.
			This will return false if the audio is multiplexed into the video.

			@return
				true if it has separate audio data, false otherwise
		*/
		has_audio: function () {
			return (this.multiplexed || this.audio != null);
		},

		/**
			Check if this object has audio and video multiplexed together.

			@return
				true if it has audio and video multiplexed together, false otherwise
		*/
		is_muxed: function () {
			return this.multiplexed;
		},

		/**
			Get the video data.

			@return
				null if there is no video,
				otherwise, a Uint8Array of the video file
		*/
		get_video: function () {
			return this.video;
		},

		/**
			Get the separate audio data.

			@return
				null if there is no separate audio,
				otherwise, a Uint8Array of the audio file
		*/
		get_audio: function () {
			return this.audio;
		},

		/**
			Get the image data.

			@return
				a Uint8Array of the image file
		*/
		get_image: function () {
			return this.image;
		},

		/**
			Get the source data.

			@return
				a Uint8Array of the source file
		*/
		get_source: function () {
			return this.source;
		},

		/**
			Returns the file tag.

			@return
				a string containing the tag
		*/
		get_tag: function () {
			return this.tag;
		},

		/**
			Returns the synchronization offset.

			@return
				a number in seconds of the offset
		*/
		get_sync_offset: function () {
			return this.sync_offset;
		},

		/**
			Get the mime type of the original image.

			@return
				either "image/jpeg", "image/png", or "image/gif"
		*/
		get_image_mime_type: function () {
			return this.mime;
		},

		/**
			Return if video fading is enabled for the checked value.
			This is only meaningful if the video and audio are separate.

			@param start
				true if checking when the video starts playing, false if checking at the end
			@return
				true if enabled, false otherwise
		*/
		get_video_fade: function (start) {
			return (this.video_fades[start ? 0 : 1]);
		},

		/**
			Return if audio fading is enabled for the checked value.
			This is only meaningful if the video and audio are separate.

			@param start
				true if checking when the audio starts playing, false if checking at the end
			@return
				true if enabled, false otherwise
		*/
		get_audio_fade: function (start) {
			return (this.audio_fades[start ? 0 : 1]);
		},

		/**
			Returns the method the video should play with.
			This is only meaningful if the video and audio are separate.
			Current values are:
				0: display blank when the video isn't playing
				1: loop the video
				2: display the video frame when the video isn't playing
				3: display the image when the video isn't playing

			@param start
				true if checking when the video starts playing, false if checking at the end
			@return
				one of the above values
		*/
		get_video_play_style: function (start) {
			return (this.video_play_style[start ? 0 : 1]);
		},

		/**
			Returns the method the audio should play with.
			This is only meaningful if the video and audio are separate.
			Current values are:
				0: play nothing
				1: loop the audio

			@param start
				true if checking when the audio starts playing, false if checking at the end
			@return
				one of the above values
		*/
		get_audio_play_style: function (start) {
			return (this.audio_play_style[start ? 0 : 1]);
		},

		/**
			Check if the object has both audio and video.

			@return
				true if it has both, false otherwise
		*/
		has_video_and_audio: function () {
			return (this.audio != null && this.video != null);
		}

	};

	// Return
	return ve;

})();


// Playback API
var VPlayer = (function () {

	// Variables
	var function_type = typeof(function(){});
	var DISPLAY_NOTHING = 0;
	var DISPLAY_LOOPED = 1;
	var DISPLAY_VIDEO = 2;
	var DISPLAY_IMAGE = 3;
	var PLAY_NOTHING = 0;
	var PLAY_LOOPED = 1;



	/**
		Constructor method.

		@param [videcode]
			a Videcode object which has been properly initialized
			if omitted, gen_data must be called later with a Videcode object
		@return
			new VPlayer object
	*/
	function vp(videcode) {
		// Set vars
		this.videcode = (videcode === undefined ? null : videcode);

		// Animation data
		this.video_animation_time = [ 1.0 , 1.0 ]; // seconds
		this.audio_animation_time = [ 1.0 , 1.0 ]; // seconds
		this.audio_animation_interval = 50; // ms

		this.video_desync_max = 0.25; // seconds
		this.audio_desync_max = 0.25; // seconds

		var css_styles = [ "transition" , "webkitTransition" , "MozTransition" , "OTransition" , "msTransition" ];
		var good_type = typeof("");
		var d = document.createElement("div");
		for (var i = 0; i < css_styles.length; ++i) {
			if (typeof(d.style[css_styles[i]]) == good_type || (i == css_styles.length - 1 && (i = 0) == 0)) {
				this.transition_css = css_styles[i];
				this.transition_end_event_name = this.transition_css + (i == 0 ? "end" : "End");
				break;
			}
		}

		// Playback data
		this.clear_listeners();

		// Create data
		this.sync_timer = null;
		this.video_animate_timer = null;
		this.video_loop_remove_timer = null;
		this.video_loop_stop_timer = null;
		this.audio_animate_timer = null;
		this.audio_loop_remove_timer = null;
		this.audio_loop_stop_timer = null;

		this.element_container = null;
		this.video_tag = null;
		this.audio_tag = null;
		this.image_tag = null;
		this.video_callbacks = [];
		this.audio_callbacks = [];
		this.image_callbacks = [];

		this.video_blob = null;
		this.video_blob_url = null;
		this.audio_blob = null;
		this.audio_blob_url = null;
		this.image_blob = null;
		this.image_blob_url = null;

		this.gen_data();
	}

	// Private methods
	var this_private = {

		/**
			Triggers an event.

			@param event_name
				the string name of the event
			@param data
				an object containing data to be passed to the event callbacks
		*/
		trigger: function (event_name, data) {
			var listeners = this.event_listeners[event_name];
			if (listeners && listeners.length > 0) {
				for (var i = 0; i < listeners.length; ++i) {
					listeners[i].call(this, data);
				}
			}
		},

		/**
			Clear all timers related to playback.
		*/
		clear_timers: function () {
			if (this.sync_timer != null) {
				clearTimeout(this.sync_timer);
				this.sync_timer = null;
			}

			if (this.video_animate_timer != null) {
				clearTimeout(this.video_animate_timer);
				this.video_animate_timer = null;
			}
			if (this.video_loop_remove_timer != null) {
				clearTimeout(this.video_loop_remove_timer);
				this.video_loop_remove_timer = null;

				clearTimeout(this.video_loop_stop_timer);
				this.video_loop_stop_timer = null;
			}
			else if (this.video_loop_stop_timer != null) {
				clearTimeout(this.video_loop_stop_timer);
				this.video_loop_stop_timer = null;
			}

			if (this.audio_animate_timer != null) {
				clearTimeout(this.audio_animate_timer);
				this.audio_animate_timer = null;
			}
			if (this.audio_loop_remove_timer != null) {
				clearTimeout(this.audio_loop_remove_timer);
				this.audio_loop_remove_timer = null;

				clearTimeout(this.audio_loop_stop_timer);
				this.audio_loop_stop_timer = null;
			}
			else if (this.audio_loop_stop_timer != null) {
				clearTimeout(this.audio_loop_stop_timer);
				this.audio_loop_stop_timer = null;
			}
		},

		/**
			Internal way of playing and synchronizing separate audio/video tracks.
			Handles all the methods of playback.
		*/
		play_synced: function () {
			var self = this;

			if (this.video_main) {
				// Get the current time
				var current_time = this.video_tag.currentTime;
				if (current_time >= this.max_duration) {
					// Reset
					this.video_tag.currentTime = 0.0;
					current_time = 0.0;
				}


				// Animation
				var v = this_private.get_audio_volume_at_time.call(this, current_time);
				this.audio_tag.volume = this.volume * v;
				var min_time = (this.audio_play_style[0] == PLAY_LOOPED ? 0.0 : this.sync_offset);
				var max_time = (this.audio_play_style[1] == PLAY_LOOPED ? this.max_duration : this.sync_offset + this.min_duration);

				if (current_time >= this.sync_offset) {
					if (current_time < this.sync_offset + this.min_duration) {
						// Volume fade in/out
						var b = (v == 1.0);
						if (!b && !this.audio_fades[0]) b = true; // start fade not enabled
						if (!b || this.audio_fades[1]) { // fade must be enabled
							this.audio_animate_timer = setTimeout(function() {
								this_private.on_audio_animate.call(self);
							}, (b ? (this.sync_offset + this.min_duration - this.audio_animation_time[1]) - current_time : this.audio_animation_interval));
						}
					}
				}
				else {
					if (this.audio_fades[0]) {
						// Volume fade in
						this.audio_animate_timer = setTimeout(function() {
							this_private.on_audio_animate.call(self);
						}, this.sync_offset - current_time);
					}
					else if (this.audio_fades[1]) {
						// Volume fade out
						this.audio_animate_timer = setTimeout(function() {
							this_private.on_audio_animate.call(self);
						}, (this.sync_offset + this.min_duration - this.audio_animation_time[1]) - current_time);
					}
				}


				// Playback and sync
				if (current_time >= this.sync_offset) {
					if (this.audio_play_style[1] == PLAY_LOOPED) {
						// Sync
						var t;
						if (Math.abs((t = this_private.get_audio_position_at_time.call(this, current_time)) - this.audio_tag.currentTime) > this.audio_desync_max) {
							this.audio_tag.currentTime = t;
						}

						// Play looped
						this.audio_tag.loop = true;
						this.audio_tag.play();
					}
					else {
						// Remove any looping
						this.audio_tag.loop = false;

						if (current_time < this.sync_offset + this.min_duration) {
							// Sync
							var t;
							if (Math.abs((t = this_private.get_audio_position_at_time.call(this, current_time)) - this.audio_tag.currentTime) > this.audio_desync_max) {
								this.audio_tag.currentTime = t;
							}

							// Play normally
							this.audio_tag.play();
						}
						else {
							// Sync at end
							this.audio_tag.currentTime = this.audio_duration;
						}
					}
				}
				else {
					if (this.audio_play_style[0] == PLAY_LOOPED) {
						// Sync
						var t;
						if (Math.abs((t = this_private.get_audio_position_at_time.call(this, current_time)) - this.audio_tag.currentTime) > this.audio_desync_max) {
							this.audio_tag.currentTime = t;
						}

						// Play looped
						this.audio_tag.loop = true;
						this.audio_tag.play();

						// Set timers to stop looping
						if (this.audio_play_style[1] != PLAY_LOOPED) {
							this.audio_loop_stop_timer = setTimeout(function() {
								this_private.on_timed_audio_loop_stop.call(self);
							}, (this.sync_offset + this.min_duration - current_time) * 1000);
							this.audio_loop_remove_timer = setTimeout(function() {
								this_private.on_timed_audio_loop_remove.call(self);
							}, (this.sync_offset + this.min_duration / 2.0 - current_time) * 1000);
						}
					}
					else {
						// Sync at 0
						this.audio_tag.currentTime = 0.0;

						// Set timer to activate playback at the proper time
						this.sync_timer = setTimeout(function() {
							this_private.on_timed_audio_play.call(self);
						}, (this.sync_offset - current_time) * 1000);
					}
				}


				// Play video
				this.video_tag.play();
			}
			else {
				// Get the current time
				var current_time = this.audio_tag.currentTime;
				if (current_time >= this.max_duration) {
					// Reset
					this.audio_tag.currentTime = 0.0;
					current_time = 0.0;
				}


				// Animation
				if (current_time >= this.sync_offset) {
					// During/after designated playback period
					if (this.video_play_style[1] == DISPLAY_LOOPED) {
						// Currently playing
						this.video_tag.style.opacity = "1.0";
					}
					else if (this.video_play_style[1] == DISPLAY_VIDEO) {
						// Visible
						this.video_tag.style.opacity = "1.0";
					}
					else {
						// Image opacity
						this.image_tag.style.opacity = (this.video_play_style[1] == DISPLAY_NOTHING) ? 0.0 : 1.0;

						// State check
						if (current_time < this.sync_offset + this.min_duration) {
							// Currently playing
							this.video_tag.style.opacity = "1.0";
						}
						else {
							// Video opacity
							if (this.video_fades[1]) {
								// Fade out
								var time_left = ((this.sync_offset + this.min_duration + this.video_animation_time[1]) - current_time);
								if (time_left > 0.0) {
									// Continue
									this_private.video_animate.call(this, 1, time_left);
								}
								else {
									// Completed
									this.video_tag.style.opacity = "0.0";
								}
							}
							else {
								// Vanish
								this.video_tag.style.opacity = "0.0";
							}
						}
					}
				}
				else {
					// Before designated playback period
					if (this.video_play_style[0] == DISPLAY_LOOPED) {
						// Currently playing
						this.video_tag.style.opacity = "1.0";
					}
					else if (this.video_play_style[0] == DISPLAY_VIDEO) {
						// Visible
						this.video_tag.style.opacity = "1.0";
					}
					else {
						// Image opacity
						this.image_tag.style.opacity = (this.video_play_style[0] == DISPLAY_NOTHING) ? 0.0 : 1.0;

						// Video opacity
						if (this.video_fades[0]) {
							// Fade in
							var wait_time = this.sync_offset - this.video_animation_time[0] - current_time;
							if (wait_time < 0) {
								// Continue
								this_private.video_animate.call(this, 0, this.video_animation_time[0] + wait_time);
							}
							else {
								// Not visible
								this.video_tag.style.opacity = "0.0";

								// Queue for late
								this.video_animate_timer = setTimeout(function() {
									self.video_animate_timer = null;
									this_private.video_animate.call(self, 0, self.video_animation_time[0]);
								}, wait_time * 1000);
							}
						}
						else {
							// Vanish
							this.video_tag.style.opacity = "0.0";
						}
					}
				}


				// Playback and sync
				if (current_time >= this.sync_offset) {
					if (this.video_play_style[1] == DISPLAY_LOOPED) {
						// Sync
						var t;
						if (Math.abs((t = this_private.get_video_position_at_time.call(this, current_time)) - this.video_tag.currentTime) > this.video_desync_max) {
							this.video_tag.currentTime = t;
						}

						// Play looped
						this.video_tag.loop = true;
						this.video_tag.play();
					}
					else {
						// Remove any looping
						this.video_tag.loop = false;

						if (current_time < this.sync_offset + this.min_duration) {
							// Sync
							var t;
							if (Math.abs((t = this_private.get_video_position_at_time.call(this, current_time)) - this.video_tag.currentTime) > this.video_desync_max) {
								this.video_tag.currentTime = t;
							}

							// Play normally
							this.video_tag.play();
						}
						else {
							// Sync at end
							this.video_tag.currentTime = this.video_duration;
						}
					}
				}
				else {
					if (this.video_play_style[0] == DISPLAY_LOOPED) {
						// Sync
						var t;
						if (Math.abs((t = this_private.get_video_position_at_time.call(this, current_time)) - this.video_tag.currentTime) > this.video_desync_max) {
							this.video_tag.currentTime = t;
						}

						// Play looped
						this.video_tag.loop = true;
						this.video_tag.play();

						// Set timers to stop looping
						if (this.video_play_style[1] != DISPLAY_LOOPED) {
							this.video_loop_stop_timer = setTimeout(function() {
								this_private.on_timed_video_loop_stop.call(self);
							}, (this.sync_offset + this.min_duration - current_time) * 1000);
							this.video_loop_remove_timer = setTimeout(function() {
								this_private.on_timed_video_loop_remove.call(self);
							}, (this.sync_offset + this.min_duration / 2.0 - current_time) * 1000);
						}
					}
					else {
						// Sync at 0
						this.video_tag.currentTime = 0.0;

						// Set timer to activate playback at the proper time
						this.sync_timer = setTimeout(function() {
							this_private.on_timed_video_play.call(self);
						}, (this.sync_offset - current_time) * 1000);
					}
				}

				// Play audio
				this.audio_tag.play();
			}
		},

		/**
			Internal way of seeking and synchronizing separate audio/video tracks.

			@param time
				the time to seek to
		*/
		seek_synced: function (time) {
			// Pause
			var playing = !this.paused;
			if (playing) {
				// Pause
				this.paused = true;
				this_private.clear_timers.call(this);
				if (this.video_tag != null) {
					this.video_tag.pause();
					this_private.video_animate_stop.call(this);
				}
				if (this.audio_tag != null) {
					this.audio_tag.pause();
				}
			}

			// Seek
			this.main_tag.currentTime = time;
			this_private.sync_animation_at.call(this, time);

			// Resume
			if (playing) {
				// Play
				this.paused = false;
				if (this.video_tag != null) {
					if (this.audio_tag != null) {
						// Play synchronized
						this_private.play_synced.call(this);
					}
					else {
						// Play only video
						this.video_tag.play();
					}
				}
				else {
					// Audio only
					this.audio_tag.play();
				}
			}
		},

		/**
			Sets the animation of video/audio to a current time.

			@param time
				the time to sync at
		*/
		sync_animation_at: function (time) {
			if (this.has_both) {
				if (this.video_main) {
					this.video_tag.style.opacity = "1.0";
					this.audio_tag.currentTime = this_private.get_audio_position_at_time.call(this, time);
					this.audio_tag.volume = this.volume * this_private.get_audio_volume_at_time.call(this, time);
				}
				else {
					this.video_tag.style.opacity = this_private.get_video_opacity_at_time.call(this, time);
					this.video_tag.currentTime = this_private.get_video_position_at_time.call(this, time);
				}
			}
			else {
				if (this.video_tag != null) this.video_tag.style.opacity = "1.0";
				this.main_tag.volume = this.volume;
			}
			this.image_tag.style.opacity = this_private.get_image_opacity_at_time.call(this, time);
		},


		/**
			Add a managed callback to the video tag.

			@param name
				the event name
			@param callback
				the callback function
		*/
		add_video_callback: function (name, callback) {
			this.video_callbacks.push([name,callback]);
			this.video_tag.addEventListener(name, callback);
		},

		/**
			Add a managed callback to the audio tag.

			@param name
				the event name
			@param callback
				the callback function
		*/
		add_audio_callback: function (name, callback) {
			this.audio_callbacks.push([name,callback]);
			this.audio_tag.addEventListener(name, callback);
		},

		/**
			Add a managed callback to the image tag.

			@param name
				the event name
			@param callback
				the callback function
		*/
		add_image_callback: function (name, callback) {
			this.image_callbacks.push([name,callback]);
			this.image_tag.addEventListener(name, callback);
		},


		/**
			Get how transparent the video should be at time.
			Should not be called if the video is the main track.

			@param time
				the time to check
			@return
				a number between 0.0 and 1.0 representing the opacity
		*/
		get_video_opacity_at_time: function (time) {
			if (time >= this.sync_offset) {
				if (this.video_play_style[1] == DISPLAY_IMAGE || this.video_play_style[1] == DISPLAY_NOTHING) {
					if (time <= this.sync_offset + this.min_duration) {
						return 1.0;
					}
					else if (this.video_fades[1]) {
						var t = Math.min(this.max_duration - (this.sync_offset + this.min_duration), this.video_animation_time[1]);
						return Math.max(0.0, ((this.sync_offset + this.min_duration + t) - time) / t);
					}
					else {
						return 0.0;
					}
				}
				else {
					return 1.0;
				}
			}
			else {
				if (this.video_play_style[0] == DISPLAY_IMAGE || this.video_play_style[0] == DISPLAY_NOTHING) {
					if (this.video_fades[0]) {
						var t = Math.min(this.sync_offset, this.video_animation_time[0]);
						return Math.max(0.0, (time - (this.sync_offset - t)) / t);
					}
					else {
						return 0.0;
					}
				}
				else {
					return 1.0;
				}
			}
		},

		/**
			When the audio is the main track, check where the video should be
			playing at given a certain time.
			Should not be called if the video is the main track.

			@param time
				the time to check
			@return
				the time in the video in seconds
		*/
		get_video_position_at_time: function (time) {
			if (time >= this.sync_offset) {
				if (this.video_play_style[1] == DISPLAY_LOOPED) {
					return (time - this.sync_offset) % this.video_duration;
				}
				else {
					return Math.min(this.video_duration, time - this.sync_offset);
				}
			}
			else {
				if (this.video_play_style[0] == DISPLAY_LOOPED) {
					return this.video_duration - ((this.sync_offset - time) % this.video_duration);
				}
				else {
					return 0.0;
				}
			}
		},

		/**
			Get the volume of the audio at a certain time.
			Should not be called if the audio is the main track.

			@param time
				the time to check
			@return
				a number between 0.0 and 1.0 representing the volume factor
		*/
		get_audio_volume_at_time: function (time) {
			var min_time = (this.audio_play_style[0] == PLAY_LOOPED ? 0.0 : this.sync_offset);
			var max_time = (this.audio_play_style[1] == PLAY_LOOPED ? this.max_duration : this.sync_offset + this.min_duration);

			if (time >= min_time) {
				if (this.audio_play_style[1] == PLAY_NOTHING) {
					if (time <= max_time) {
						if (this.audio_fades[0] && time < min_time + this.audio_animation_time[0]) {
							return Math.min(1.0, (time - min_time) / this.audio_animation_time[0]);
						}
						else if (this.audio_fades[1] && time > max_time - this.audio_animation_time[1]) {
							return Math.min(1.0, (max_time - time) / this.audio_animation_time[1]);
						}
						return 1.0;
					}
					else {
						return 0.0;
					}
				}
				else {
					return 1.0;
				}
			}
			else {
				return (this.audio_play_style[0] == PLAY_NOTHING) ? 0.0 : 1.0;
			}
		},

		/**
			When the video is the main track, check where the audio should be
			playing at given a certain time.
			Should not be called if the audio is the main track.

			@param time
				the time to check
			@return
				the time in the audio in seconds
		*/
		get_audio_position_at_time: function (time) {
			if (time >= this.sync_offset) {
				if (this.audio_play_style[1] == DISPLAY_LOOPED) {
					return (time - this.sync_offset) % this.audio_duration;
				}
				else {
					return Math.min(this.audio_duration, time - this.sync_offset);
				}
			}
			else {
				if (this.audio_play_style[0] == DISPLAY_LOOPED) {
					return this.audio_duration - ((this.sync_offset - time) % this.audio_duration);
				}
				else {
					return 0.0;
				}
			}
		},

		/**
			Get how transparent the image should be at a given time.

			@param time
				the time to check
			@return
				a number between 0.0 and 1.0 representing the opacity
		*/
		get_image_opacity_at_time: function (time) {
			if (this.video_tag == null) {
				return 1.0;
			}
			else if (time >= this.sync_offset + this.min_duration) {
				return (this.video_play_style[1] == DISPLAY_NOTHING ? 0.0 : 1.0);
			}
			else {
				return (this.video_play_style[0] == DISPLAY_NOTHING ? 0.0 : 1.0);
			}
		},

		/**
			Make the video fade in or out.

			@param mode
				0 for animating in
				1 for animating out
				other values are not valid
			@param time
				the duration of the animation in seconds
		*/
		video_animate: function (mode, time) {
			this_private.video_animate_stop.call(this);
			this.video_tag.style.opacity = (1 - mode);
			this.video_tag.style[this.transition_css] = "opacity " + time + "s linear";
		},

		/**
			Remove any CSS animations from the video.
		*/
		video_animate_stop: function () {
			this.video_tag.style.opacity = this_private.get_computed_style.call(this, this.video_tag).opacity;
			this.video_tag.style[this.transition_css] = "";
		},

		/**
			Get the computed style of an object.

			@return
				the computed style
		*/
		get_computed_style: function (elem) {
			return window.getComputedStyle(elem, null);
		},


		/**
			Event callback for the video tag.
			Called when the metadata is ready.
		*/
		on_video_loaded_metadata: function () {
			// Video
			this.video_dimensions.width = this.video_tag.videoWidth;
			this.video_dimensions.height = this.video_tag.videoHeight;
			this.video_duration = this.video_tag.duration;
			this.video_tag.volume = (this.audio_tag == null ? this.volume : 0.0);

			if (++this.metadata_load_count == this.metadata_load_count_required) {
				this_private.on_metadata_ready.call(this);
			}
		},

		/**
			Event callback for the video tag.
			Called when any CSS animations have completed.
		*/
		on_video_animation_end: function () {
			this.video_tag.style[this.transition_css] = "";
		},

		/**
			Event callback for the video tag.
			Called when the video ends.
		*/
		on_video_ended: function () {
			if (this.video_tag.loop) return;

			if (this.video_main) {
				// Pause all
				this.paused = true;
				this_private.clear_timers.call(this);
				if (this.audio_tag != null) {
					this.audio_tag.pause();
				}

				// Event
				this_private.trigger.call(this, "end", {
					"time": this.max_duration
				});
			}
			else {
				if (this.paused) return; // don't want this event triggering

				// Animation
				if (this.video_play_style[1] == DISPLAY_VIDEO) {
					// Nothing needs to be done
				}
				else {
					// Image opacity
					this.image_tag.style.opacity = (this.video_play_style[1] == DISPLAY_NOTHING) ? 0.0 : 1.0;

					// Video opacity
					if (this.video_fades[1]) {
						// Fade out
						//var t = Math.min(this.max_duration - (this.sync_offset + this.min_duration), this.video_animation_time[1]);
						var offset = (this.sync_offset + this.min_duration);
						var t = Math.min(this.max_duration - offset, this.video_animation_time[1] - (this.audio_tag.currentTime - offset));
						if (t > 0) {
							this_private.video_animate.call(this, 1, t);
						}
					}
					else {
						// Vanish
						this.video_tag.style.opacity = "0.0";
					}
				}
			}
		},

		/**
			Event callback for the video tag.
			Called when the video generates an error.
		*/
		on_video_error: function () {
			// Event
			this_private.trigger.call(this, "error", {
				"source": "video"
			});
		},

		/**
			Event callback for the audio tag.
			Called when the metadata is ready.
		*/
		on_audio_loaded_metadata: function () {
			// Audio
			this.audio_duration = this.audio_tag.duration;
			this.audio_tag.volume = this.volume;

			if (++this.metadata_load_count == this.metadata_load_count_required) {
				this_private.on_metadata_ready.call(this);
			}
		},

		/**
			Event callback for the audio tag.
			Called when the audio ends.
		*/
		on_audio_ended: function () {
			if (this.audio_tag.loop) return;

			if (this.video_main) {
				// Nothing to do
			}
			else {
				// Pause all
				this.paused = true;
				this_private.clear_timers.call(this);
				if (this.video_tag != null) {
					this.video_tag.pause();
					this_private.video_animate_stop.call(this);
				}

				// Event
				this_private.trigger.call(this, "end", {
					"time": this.max_duration
				});
			}
		},

		/**
			Event callback for the audio tag.
			Called when the audio generates an error.
		*/
		on_audio_error: function () {
			// Event
			this_private.trigger.call(this, "error", {
				"source": "audio"
			});
		},

		/**
			Event callback for the video/audio tag, whichever is longer.
			Called when the tag generates a timeupdate event and passes it to the VPlayer listeners.
		*/
		on_main_time_update: function () {
			// Event
			this_private.trigger.call(this, "timeupdate", {
				"time": this.main_tag.currentTime,
				"duration": this.max_duration
			});
		},

		/**
			Event callback for the image tag.
			Called when the image loads.
		*/
		on_image_load: function () {
			this.image_dimensions.width = this.image_tag.width;
			this.image_dimensions.height = this.image_tag.height;

			this.image_tag.style.display = "";
			this.image_tag.style.left = "0";
			this.image_tag.style.top = "0";
			this.image_tag.style.right = "0";
			this.image_tag.style.bottom = "0";
			this.image_tag.style.width = "100%";
			this.image_tag.style.height = "100%";

			if (++this.metadata_load_count == this.metadata_load_count_required) {
				this_private.on_metadata_ready.call(this);
			}
		},

		/**
			Event callback for the image tag.
			Called when the image generates an error.
		*/
		on_image_error: function () {
			// Event
			this_private.trigger.call(this, "error", {
				"source": "image"
			});
		},


		/**
			Callback for when all metadata is loaded.
			Called when both of the video/audio tag metadata loaded callbacks
			are fired.
		*/
		on_metadata_ready: function () {
			// Min/max time and main track
			if (this.video_duration >= this.audio_duration) {
				this.max_duration = this.video_duration;
				this.min_duration = this.audio_duration;
				this.video_main = true;
				this.main_tag = this.video_tag;
			}
			else {
				this.max_duration = this.audio_duration;
				this.min_duration = this.video_duration;
				this.video_main = false;
				this.main_tag = this.audio_tag;
			}

			// Validate
			if (this.sync_offset + this.min_duration > this.max_duration) {
				this.sync_offset = this.max_duration - this.min_duration;
			}
			else if (this.sync_offset < 0.0) {
				this.sync_offset = 0.0;
			}

			// Animation initial state
			this_private.sync_animation_at.call(this, 0.0);

			// Time callback
			var self = this;
			if (this.video_main) {
				this_private.add_video_callback.call(this, "timeupdate", function () {
					this_private.on_main_time_update.call(self);
				});
			}
			else {
				this_private.add_audio_callback.call(this, "timeupdate", function () {
					this_private.on_main_time_update.call(self);
				});
			}

			// Ready
			this.metadata_ready = true;
			this_private.trigger.call(this, "load", {
				"video_size": this.get_video_size(),
				"image_size": this.get_image_size(),
				"duration": this.max_duration
			});
		},

		/**
			Synchronization timer to play video.
		*/
		on_timed_video_play: function () {
			this.sync_timer = null;

			if (this.video_play_style[0] != DISPLAY_VIDEO && !this.video_fades[0]) {
				// Should never be called with DISPLAY_LOOPED
				this.video_tag.style.opacity = "1.0";
			}
			this.video_tag.loop = (this.video_play_style[1] == DISPLAY_LOOPED);

			// Play
			this.video_tag.play();
		},

		/**
			Timer to set the .loop attribute on the video to false.
			Cancels the "on_timed_video_loop_stop" timer when executed.
		*/
		on_timed_video_loop_remove: function () {
			// Clear timers
			this.video_loop_remove_timer = null;
			if (this.video_loop_stop_timer != null) {
				clearTimeout(this.video_loop_stop_timer);
				this.video_loop_stop_timer = null;
			}

			// Disable looping
			this.video_tag.loop = false;
		},

		/**
			Timer to set the .loop attribute on the video to false AND stop playback.
			This is the fallback of the above timer, in case there are timing issues.
		*/
		on_timed_video_loop_stop: function () {
			// Clear timers
			this.video_loop_stop_timer = null;
			if (this.video_loop_remove_timer != null) {
				clearTimeout(this.video_loop_remove_timer);
				this.video_loop_remove_timer = null;
			}

			// Stop video
			this.video_tag.loop = false;
			this.video_tag.pause();
			this.video_tag.currentTime = this.video_duration;
		},

		/**
			Synchronization timer to play audio.
		*/
		on_timed_audio_play: function () {
			this.sync_timer = null;

			this.audio_tag.loop = (this.audio_play_style[1] == PLAY_LOOPED);

			this.audio_tag.play();
		},

		/**
			Timer to set the .loop attribute on the audio to false.
			Cancels the "on_timed_video_loop_stop" timer when executed.
		*/
		on_timed_audio_loop_remove: function () {
			// Clear timers
			this.audio_loop_remove_timer = null;
			if (this.audio_loop_stop_timer != null) {
				clearTimeout(this.audio_loop_stop_timer);
				this.audio_loop_stop_timer = null;
			}

			// Disable looping
			this.audio_tag.loop = false;
		},

		/**
			Timer to set the .loop attribute on the audio to false AND stop playback.
			This is the fallback of the above timer, in case there are timing issues.
		*/
		on_timed_audio_loop_stop: function () {
			// Clear timers
			this.audio_loop_stop_timer = null;
			if (this.audio_loop_remove_timer != null) {
				clearTimeout(this.audio_loop_remove_timer);
				this.audio_loop_remove_timer = null;
			}

			// Stop video
			this.audio_tag.loop = false;
			this.audio_tag.pause();
			this.audio_tag.currentTime = this.audio_duration;
		},

		/**
			Timer to "animate" the audio tag's volume in or out.
		*/
		on_audio_animate: function () {
			this.audio_animate_timer = null;

			// Vars
			var self = this;
			var current_time = this.main_tag.currentTime;
			var min_time = (this.audio_play_style[0] == PLAY_LOOPED ? 0.0 : this.sync_offset);
			var max_time = (this.audio_play_style[1] == PLAY_LOOPED ? this.max_duration : this.sync_offset + this.min_duration);

			// Full
			if (current_time >= max_time) {
				this.audio_tag.volume = 0.0;

				// No timeout
			}
			else if (current_time >= max_time - this.audio_animation_time[1]) {
				this.audio_tag.volume = Math.max(0.0, (max_time - current_time) / this.audio_animation_time[1] * this.volume);

				// Timeout for continue
				this.audio_animate_timer = setTimeout(function() {
					this_private.on_audio_animate.call(self);
				}, this.audio_animation_interval);
			}
			else if (current_time >= min_time + this.audio_animation_time[0]) {
				this.audio_tag.volume = this.volume;

				// Timeout for outro
				this.audio_animate_timer = setTimeout(function() {
					this_private.on_audio_animate.call(self);
				}, ((max_time - this.audio_animation_time[1]) - current_time) * 1000);
			}
			else {
				this.audio_tag.volume = Math.max(0.0, (current_time - min_time) / this.audio_animation_time[0] * this.volume);

				// Timeout for continue
				this.audio_animate_timer = setTimeout(function() {
					this_private.on_audio_animate.call(self);
				}, this.audio_animation_interval);
			}
		}

	};

	// Public methods
	vp.prototype = {

		constructor: vp,

		/**
			Generate settings from the videcode object.

			@param [videcode]
				a Videcode object which has been properly initialized
				if not set in the constructor, it can be set here;
				it is the Videcode object to use
			@return
				this
		*/
		gen_data: function (videcode) {
			// Clear any old data
			this.reset();

			// Set
			if (videcode !== undefined) this.videcode = videcode;

			// On error, return
			if (this.videcode == null || this.videcode.has_error()) return;

			// Create video blob and url
			if (this.videcode.get_video() != null) {
				this.video_blob = new Blob([ this.videcode.get_video() ], {type: "video/webm"});
				this.video_blob_url = (window.webkitURL || window.URL).createObjectURL(this.video_blob);
				++this.metadata_load_count_required;
			}
			else {
				this.video_blob = null;
				this.video_blob_url = null;
			}

			// Create audio blob and url
			if (this.videcode.get_audio() != null) {
				this.audio_blob = new Blob([ this.videcode.get_audio() ], {type: "audio/ogg"});
				this.audio_blob_url = (window.webkitURL || window.URL).createObjectURL(this.audio_blob);
				++this.metadata_load_count_required;
			}
			else {
				this.audio_blob = null;
				this.audio_blob_url = null;
			}

			// Create image blob and url
			this.image_blob = new Blob([ this.videcode.get_image() ], {type: this.videcode.get_image_mime_type()});
			this.image_blob_url = (window.webkitURL || window.URL).createObjectURL(this.image_blob);
			++this.metadata_load_count_required;

			// Get other settings
			this.sync_offset = this.videcode.get_sync_offset();

			this.video_fades[0] = this.videcode.get_video_fade(true);
			this.video_fades[1] = this.videcode.get_video_fade(false);
			this.audio_fades[0] = this.videcode.get_audio_fade(true);
			this.audio_fades[1] = this.videcode.get_audio_fade(false);

			this.video_play_style[0] = this.videcode.get_video_play_style(true);
			this.video_play_style[1] = this.videcode.get_video_play_style(false);
			this.audio_play_style[0] = this.videcode.get_audio_play_style(true);
			this.audio_play_style[1] = this.videcode.get_audio_play_style(false);

			return this;
		},

		/**
			Remove all event listeners.

			@return
				this
		*/
		clear_listeners: function () {
			this.event_listeners = {
				"load": [],
				"error": [],
				"timeupdate": [],
				"volumechange": [],
				"seek": [],
				"play": [],
				"pause": [],
				"end": [],
			};

			return this;
		},

		/**
			Reset the state of the object.

			@return
				this
		*/
		reset: function () {
			// Remove HTML
			this.remove_html();

			// Clear data
			if (this.video_blob != null) {
				this.video_blob = null;
				(window.webkitURL || window.URL).revokeObjectURL(this.video_blob_url);
				this.video_blob_url = null;
			}
			if (this.audio_blob != null) {
				this.audio_blob = null;
				(window.webkitURL || window.URL).revokeObjectURL(this.audio_blob_url);
				this.audio_blob_url = null;
			}
			if (this.image_blob != null) {
				this.image_blob = null;
				(window.webkitURL || window.URL).revokeObjectURL(this.image_blob_url);
				this.image_blob_url = null;
			}

			// Other settings
			this.volume = 0.5;

			this.metadata_load_count_required = 0;

			this.sync_offset = 0.0;

			this.video_fades = [ false , false ];
			this.audio_fades = [ false , false ];

			this.video_play_style = [ DISPLAY_NOTHING , DISPLAY_NOTHING ];
			this.audio_play_style = [ PLAY_NOTHING , PLAY_NOTHING ];

			return this;
		},

		/**
			Check if the object has HTML generated or not.

			@return
				true if generated, false otherwise
		*/
		has_html: function () {
			return (this.element_container != null);
		},

		/**
			Remove all the HTML elements of the object from the document.

			@return
				this
		*/
		remove_html: function () {
			// Clear timers
			this_private.clear_timers.call(this);
			this.pause();

			// Remove HTML
			if (this.video_tag != null) {
				for (var i = 0; i < this.video_callbacks.length; ++i) {
					this.video_tag.removeEventListener(this.video_callbacks[i][0], this.video_callbacks[i][1]);
				}
				this.video_callbacks = [];

				if (this.video_tag.parentNode != null) {
					this.video_tag.parentNode.removeChild(this.video_tag);
				}
				this.video_tag = null;
			}
			if (this.audio_tag != null) {
				for (var i = 0; i < this.audio_callbacks.length; ++i) {
					this.audio_tag.removeEventListener(this.audio_callbacks[i][0], this.audio_callbacks[i][1]);
				}
				this.audio_callbacks = [];

				if (this.audio_tag.parentNode != null) {
					this.audio_tag.parentNode.removeChild(this.audio_tag);
				}
				this.audio_tag = null;
			}
			if (this.image_tag != null) {
				for (var i = 0; i < this.image_callbacks.length; ++i) {
					this.image_tag.removeEventListener(this.image_callbacks[i][0], this.image_callbacks[i][1]);
				}
				this.image_callbacks = [];

				if (this.image_tag.parentNode != null) {
					this.image_tag.parentNode.removeChild(this.image_tag);
				}
				this.image_tag = null;
			}
			if (this.element_container != null) {
				if (this.element_container.parentNode != null) {
					this.element_container.parentNode.removeChild(this.element_container);
				}
				this.element_container = null;
			}
			this.main_tag = { "currentTime": 0.0 }; // have defaults so get_time() can work without fail

			// Other settings
			this.paused = true;

			this.video_duration = 0.0;
			this.audio_duration = 0.0;
			this.max_duration = 0.0;
			this.min_duration = 0.0;
			this.video_dimensions = { width: 0, height: 0 };
			this.image_dimensions = { width: 0, height: 0 };
			this.metadata_load_count = 0;
			this.metadata_ready = false;
			this.video_main = true;
			this.has_both = false;

			return this;
		},

		/**
			Create the HTML elements for the player. The new components will be added
			in a new div tag into the specified container. The components include a
			video tag (if there is video), an audio tag (if there is audio), and an
			img tag.

			The div tag will fill the nearest relative container, as it is positioned
			absolutely.

			Events should generally be hooked before calling this.

			@param container
				the container to add the new elements to
			@return
				this
		*/
		create_html: function (container) {
			if (this.image_blob == null || (this.audio_blob == null && this.video_blob == null) || this.element_container != null) return this;

			var self = this;

			// Create container
			this.element_container = document.createElement("div");
			this.element_container.style.position = "relative";
			this.element_container.style.display = "inline-block";
			if (container != null) container.appendChild(this.element_container);

			// Create image
			this.image_tag = document.createElement("img");
			this.image_tag.style.position = "absolute";
			this.image_tag.style.display = "none";
			this.image_tag.style.margin = "0px";
			this.image_tag.style.padding = "0px";
			this.image_tag.style.border = "0px hidden";
			this.image_tag.style["float"] = "none";
			// Image events
			this_private.add_image_callback.call(this, "load", function () {
				this_private.on_image_load.call(self);
			});
			this_private.add_image_callback.call(this, "error", function () {
				this_private.on_image_error.call(self);
			});
			// Load
			this.image_tag.setAttribute("src", this.image_blob_url);
			this.element_container.appendChild(this.image_tag);

			// Create video
			if (this.video_blob_url != null) {
				this.video_tag = document.createElement("video");
				this.video_tag.style.position = "absolute";
				this.video_tag.style.left = "0";
				this.video_tag.style.top = "0";
				this.video_tag.style.right = "0";
				this.video_tag.style.bottom = "0";
				this.video_tag.style.width = "100%";
				this.video_tag.style.height = "100%";
				this.video_tag.style.opacity = "0.0";
				// Video events
				this_private.add_video_callback.call(this, "loadedmetadata", function () {
					this_private.on_video_loaded_metadata.call(self);
				});
				this_private.add_video_callback.call(this, "ended", function () {
					this_private.on_video_ended.call(self);
				});
				this_private.add_video_callback.call(this, "error", function () {
					this_private.on_video_error.call(self);
				});
				this_private.add_video_callback.call(this, this.transition_end_event_name, function () {
					this_private.on_video_animation_end.call(self);
				});
				// Load video
				this.video_tag.setAttribute("src", this.video_blob_url);
				this.element_container.appendChild(this.video_tag);
			}

			// Create audio
			if (this.audio_blob_url != null) {
				this.audio_tag = document.createElement("audio");
				this.audio_tag.style.display = "none";
				// Audio events
				this_private.add_audio_callback.call(this, "loadedmetadata", function () {
					this_private.on_audio_loaded_metadata.call(self);
				});
				this_private.add_audio_callback.call(this, "ended", function () {
					this_private.on_audio_ended.call(self);
				});
				this_private.add_audio_callback.call(this, "error", function () {
					this_private.on_audio_error.call(self);
				});
				// Load audio
				this.audio_tag.setAttribute("src", this.audio_blob_url);
				this.element_container.appendChild(this.audio_tag);
			}

			// Both/main tag
			if (this.video_tag != null) {
				if (this.audio_tag != null) {
					this.has_both = true;
					this.main_tag = (this.video_main ? this.video_tag : this.audio_tag);
				}
				else {
					this.has_both = false;
					this.main_tag = this.video_tag;
				}
			}
			else {
				this.has_both = false;
				this.main_tag = this.audio_tag;
			}

			// Done
			return this;
		},

		/**
			Get the HTML div container element created in the create_html() method.

			@return
				null if not generated yet,
				otherwise a HTML div element
		*/
		get_container: function () {
			return this.element_container;
		},

		/**
			Get the generated image URL.

			@return
				the blob URL
		*/
		get_image: function () {
			return this.image_blob_url;
		},

		/**
			Get the generated video URL.

			@return
				the blob URL, or null if no video
		*/
		get_video: function () {
			return this.video_blob_url;
		},

		/**
			Get the generated audio URL.

			@return
				the blob URL, or null if no audio
		*/
		get_audio: function () {
			return this.audio_blob_url;
		},

		/**
			Get the current volume level.

			@return
				a value between 0.0 and 1.0, 1.0 being the max
		*/
		get_volume: function () {
			return this.volume;
		},

		/**
			Set the current volume level.
			This method can be called at any time.

			@param volume
				a number between 0.0 and 1.0, 1.0 being the max
		*/
		set_volume: function (volume) {
			if (volume < 0.0) volume = 0.0;
			else if (volume > 1.0) volume = 1.0;

			this.volume = volume;
			if (this.has_both) {
				if (this.video_main) {
					this.audio_tag.volume = this.volume * this_private.get_audio_volume_at_time.call(this, this.main_tag.currentTime);
				}
				else {
					this.audio_tag.volume = this.volume;
				}
			}
			else {
				this.main_tag.volume = this.volume;
			}

			// Event
			this_private.trigger.call(this, "volumechange", {
				"volume": this.volume
			});
		},

		/**
			Play the player. Will do nothing if the object isn't ready or is already playing.
		*/
		play: function () {
			if (!this.paused || !this.metadata_ready) return;

			// Play
			this.paused = false;
			if (this.has_both) {
				// Sync'd
				this_private.play_synced.call(this);
			}
			else {
				// Video/audio only
				this.main_tag.play();
			}

			// Event
			this_private.trigger.call(this, "play", {
				"time": this.main_tag.currentTime
			});
		},

		/**
			Pause the player. Will do nothing if the object isn't ready or is already paused.
		*/
		pause: function () {
			if (this.paused || !this.metadata_ready) return;

			// Pause all
			this.paused = true;
			this_private.clear_timers.call(this);
			if (this.video_tag != null) {
				this.video_tag.pause();
				this_private.video_animate_stop.call(this);
			}
			if (this.audio_tag != null) {
				this.audio_tag.pause();
			}

			// Event
			this_private.trigger.call(this, "pause", {
				"time": this.main_tag.currentTime
			});
		},

		/**
			Seek to a specific time.

			@param time
				a value between 0.0 and get_duration()
		*/
		seek: function (time) {
			if (!this.metadata_ready) return;

			// Limit time
			if (time < 0.0) time = 0.0;
			else if (time > this.max_duration) time = this.max_duration;

			// Seek
			if (this.has_both) {
				// Play synchronized
				this_private.seek_synced.call(this, time);
			}
			else {
				// Video/audio only
				this.main_tag.currentTime = time;
			}

			// Event
			this_private.trigger.call(this, "seek", {
				"time": time,
				"duration": this.max_duration
			});
		},

		/**
			Check if the player is playing anything or not.

			@return
				true if playing, false if paused/not playing
		*/
		is_paused: function () {
			return this.paused;
		},

		/**
			Add an event callback in a jQuery-esque style.

			@param event_name
				the name of the event
			@param callback
				the function callback, in the form of: function (data)
			@return
				this
		*/
		on: function (event_name, callback) {
			if (typeof(callback) != function_type) return this;

			// Event adding
			if (event_name in this.event_listeners) {
				this.event_listeners[event_name].push(callback);
			}

			// Done
			return this;
		},

		/**
			Remove an event callback in a jQuery-esque style.

			@param event_name
				the name of the event
			@param [callback]
				if omitted, removes all callbacks on the event,
				otherwise, it is the function to remove
			@return
				this
		*/
		off: function (event_name, callback) {
			if (event_name in this.event_listeners) {
				if (typeof(callback) == function_type) {
					// Remove single
					var list = this.event_listeners[event_name];
					for (var i = 0; i < list.length; ++i) {
						if (list[i] === callback) {
							list.splice(i, 1);
							break;
						}
					}
				}
				else {
					// Remove all
					this.event_listeners[event_name] = [];
				}
			}

			// Done
			return this;
		},

		/**
			Get the size of the video. If there is no video, the values are both 0.

			@return
				an object in the form of { width:? , height:? }
		*/
		get_video_size: function () {
			return {
				"width": this.video_dimensions.width,
				"height": this.video_dimensions.height
			};
		},

		/**
			Get the size of the image.

			@return
				an object in the form of { width:? , height:? }
		*/
		get_image_size: function () {
			return {
				"width": this.image_dimensions.width,
				"height": this.image_dimensions.height
			};
		},

		/**
			Get the full duration of the object, in seconds.

			@return
				the duration
		*/
		get_duration: function () {
			return this.max_duration;
		},

		/**
			Get the minimum duration of the object; that is, if there is both audio
			and video in separate tags, returns the minimum length of the two. Otherwise,
			it returns the same as get_duration().

			@return
				the minimum duration
		*/
		get_min_duration: function () {
			return (this.has_both ? this.min_duration : this.max_duration);
		},

		/**
			Get the current time of the player.

			@return
				the time in seconds
		*/
		get_time: function () {
			return this.main_tag.currentTime;
		},

		/**
			Get the blob URL of the video object.

			@return
				a string URL, or null if there is no video
		*/
		get_video_url: function () {
			return this.video_blob_url;
		},

		/**
			Get the blob URL of the audio object.

			@return
				a string URL, or null if there is no separate audio
		*/
		get_audio_url: function () {
			return this.audio_blob_url;
		},

		/**
			Get the blob URL of the image object.

			@return
				a string URL
		*/
		get_image_url: function () {
			return this.image_blob_url;
		},

		/**
			Check if the video is the main tag; that is, if there is a video and
			audio tag, the video is longer than the audio.
			This is meaningless to call if there aren't both video and audio.

			@return
				true if the video is longer, false otherwise
		*/
		is_video_main: function () {
			return this.video_main;
		},

		/**
			Returns the synchronization offset.
			This value should always be in a valid range.

			@return
				a number in seconds of the offset
		*/
		get_sync_offset: function () {
			return this.sync_offset;
		},

		/**
			Check if the object has a video tag.

			@return
				true if it has video, false otherwise
		*/
		has_video: function () {
			return (this.video_tag != null);
		},

		/**
			Check if the object has a audio tag.

			@return
				true if it has audio, false otherwise
		*/
		has_audio: function () {
			return (this.audio_tag != null);
		},

		/**
			Check if the object has both audio and video tags.

			@return
				true if it has both, false otherwise
		*/
		has_video_and_audio: function () {
			return this.has_both;
		}

	};

	// Return
	return vp;

})();

////////////////////////////////////////////////////////////////////////////////
//} /ve_api.js
////////////////////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////////////////////////
//{ MediaPlayer.js
////////////////////////////////////////////////////////////////////////////////
/*/////////////////////////////////////////////////////////////////////////////
// Image loading callbacks:
// function (url_or_filename, load_tag, raw_ui8_data, done_callback)
// url_or_filename : the url of the file
//                 : (this is only a filename if it was a local file)
//        load_tag : the tag to search to load
//                 : this is either a string or MediaPlayer.ALL_SOUNDS
//    raw_ui8_data : an Uint8Array of the data to be loaded
//   done_callback : the function to call that simulates the return value
//                 : this is used instead of a return incase the function
//                 : doesn't immediately return back
//
// "done_callback" usage:
// 1) done_callback(null)
//    No sounds or files were found in the image
// 2) done_callback([ list_of_files , null ])
//    Files were found in the image, but no sounds
// 3) done_callback([ list_of_files , sound_list ])
//    File(s) / sound(s) found in the image
//
// list_of_files structure:
//   Simply an array of filenames:
//   [ "sound1.ogg", "file1.txt", "something" ]
//   (it is preferrable to have sounds have an .ogg extension in this list)
// sound_list structure:
//   Array of data objects, formatted as such:
//   [ { "title": ..., "flagged": ..., "index": ..., "data": ..., "position": ..., "format": ... } , ... ]
//     title : the title of the song found within the file
//   flagged : true if the load_tag didn't match the name; false otherwise
//     index : the index of the sound in the file (0 = first, 1 = second, etc.)
//      data : an Uint8Array of the sound (.ogg)
//  position : the position inside the source (in bytes) (negative for not relevant)
//    format : the type of encoding (string)
/////////////////////////////////////////////////////////////////////////////*/



///////////////////////////////////////////////////////////////////////////////
// Media Player CSS class
///////////////////////////////////////////////////////////////////////////////
function MediaPlayerCSS (preset, css_color_presets, css_size_presets) {
	// Stylesheet settings
	this.preset = preset;
	this.css_color_presets = css_color_presets;
	this.css_size_presets = css_size_presets;
	this.on_theme_change_callback = null;
	this.on_theme_change_callback_data = null;
	this.create_custom();

	// Load
	this.load_preset(preset);

	// JSON stylesheet
	this.css_suffix = "";
	this.css = {
		".MPContainerMain": {
			"border-radius": "{exp:bg_outer_border_radius,*,border_scale}px",
			"padding": "{exp:bg_outer_size,*,padding_scale}px",
			"background": "transparent",
			"font-family": "{main_font}",
			"font-size": "{exp:font_size,*,font_scale}px",
			"position": "fixed",
			"color": "{hex:color_standard}",
			"z-index": "10000"
		},
		".MPContainerMainBorders": {
			"background": "{rgba:bg_outer_color}"
		},
		".MPContainer": {
			"position": "relative"
		},

		".MPTitleBarContainer": {
			"position": "relative",
			"background": "{rgba:bg_color_dark}",
			"text-align": "center",
			"cursor": "move",
			"border-top-left-radius": "{exp:bg_inner_border_radius,*,border_scale}px",
			"border-top-right-radius": "{exp:bg_inner_border_radius,*,border_scale}px"
		},
		".MPTitleContainer": {
			"display": "block",
			"padding": "{exp:1,*,padding_scale}px 0px {exp:1,*,padding_scale}px 0px",
			"overflow": "hidden"
		},
		".MPTitle": {
			"position": "relative",
			"z-index": "1",
			"display": "inline",
			"white-space": "nowrap",
			"font-weight": "bold",
			"color": "{hex:color_special_1} !important",
			"text-shadow": "{exp:1,*,font_scale}px {exp:1,*,font_scale}px {exp:1,*,font_scale}px {hex:color_highlight_light}"
		},

		".MPMainButtonsLeft": {
			"position": "absolute",
			"z-index": "2",
			"left": "0",
			"top": "0",
			"display": "inline-block",
			"height": "100%",
			"overflow": "hidden"
		},
		".MPMainButtonsRight": {
			"position": "absolute",
			"z-index": "2",
			"right": "0",
			"top": "0",
			"display": "inline-block",
			"height": "100%",
			"overflow": "hidden"
		},
		".MPMainButtonLeft, a.MPMainButtonLeft": {
			"display": "inline-block",
			"padding": "{exp:1,*,padding_scale}px",
			"border-top-left-radius": "{exp:bg_inner_border_radius,*,border_scale}px",
			"text-decoration": "none !important",
			"cursor": "pointer",
			"height": "100%",
			"opacity": "0.0",
			"color": "{hex:color_disabled} !important",
			"background": "transparent"
		},
		".MPMainButtonLeft:hover": {
			"opacity": "1.0",
			"text-decoration": "none !important",
			"color": "{hex:color_light} !important",
			"background": "{rgba:bg_color_darker}"
		},
		".MPMainButtonLeft:active": {
			"opacity": "1.0",
			"text-decoration": "none !important",
			"color": "{hex:color_special_2} !important",
			"background": "{rgba:bg_color_darker}"
		},
		".MPMainButtonRight, a.MPMainButtonRight": {
			"display": "inline-block",
			"padding": "{exp:1,*,padding_scale}px",
			"border-top-right-radius": "{exp:bg_inner_border_radius,*,border_scale}px",
			"text-decoration": "none !important",
			"cursor": "pointer",
			"height": "100%",
			"opacity": "0.0",
			"color": "{hex:color_disabled} !important",
			"background": "transparent"
		},
		".MPMainButtonRight:hover": {
			"opacity": "1.0",
			"text-decoration": "none !important",
			"color": "{hex:color_light} !important",
			"background": "{rgba:bg_color_darker}"
		},
		".MPMainButtonRight:active": {
			"opacity": "1.0",
			"text-decoration": "none !important",
			"color": "{hex:color_special_2} !important",
			"background": "{rgba:bg_color_darker}"
		},
		".MPMainButtonGeneric, a.MPMainButtonGeneric": {
			"display": "inline-block",
			"padding": "{exp:1,*,padding_scale}px",
			"text-decoration": "none !important",
			"cursor": "pointer",
			"height": "100%",
			"opacity": "0.0",
			"color": "{hex:color_disabled} !important",
			"background": "transparent"
		},
		".MPMainButtonGeneric:hover": {
			"opacity": "1.0",
			"text-decoration": "none !important",
			"color": "{hex:color_light} !important",
			"background": "{rgba:bg_color_darker}"
		},
		".MPMainButtonGeneric:active": {
			"opacity": "1.0",
			"text-decoration": "none !important",
			"color": "{hex:color_special_2} !important",
			"background": "{rgba:bg_color_darker}"
		},

		".MPContentContainer": {
			"background": "{rgba:bg_color_light}",
			"text-align": "center",
			"position": "relative"
		},

		".MPTopContainer": {
			"position": "relative",
		},
		".MPVolumeContainer": {
			"position": "absolute",
			"left": "0",
			"top": "0",
			"height": "100%",
			"opacity": "0.0",
			"background": "transparent"
		},
		".MPVolumeContainerActive": {
			"opacity": "1.0 !important"
		},
		".MPContainerMain:hover .MPVolumeContainer": {
			"opacity": "0.5"
		},
		".MPContainerMain:hover .MPTopContainer:hover .MPVolumeContainer": {
			"opacity": "1.0"
		},
		".MPVolumeContainerActive .MPVolumeContainer": {
			"opacity": "1.0 !important"
		},
		".MPVolumeContainerActive .MPVolumeContainer:hover": {
			"opacity": "1.0 !important"
		},
		".MPVolumeBarContainer": {
			"position": "relative",
			"width": "{exp:16,*,font_scale}px",
			"height": "100%",
			"display": "inline-block",
			"vertical-align": "top",
			"cursor": "pointer",
			"background": "{rgba:bg_color_lightest}"
		},
		".MPVolumeBar": {
			"position": "absolute",
			"bottom": "0",
			"width": "100%",
			"cursor": "pointer"
		},
		".MPVolumeLabelContainer": {
			"text-align": "left",
			"display": "inline-block",
			"cursor": "default",
			"padding": "0px {exp:2,*,padding_scale}px 0px {exp:2,*,padding_scale}px",
			"text-shadow": "{exp:1,*,font_scale}px {exp:1,*,font_scale}px 1px {hex:color_highlight_light}"
		},
		".MPVolumeLabel": {
			"display": "block",
			"color": "{hex:color_standard} !important",
		},
		".MPVolumeValue": {
			"display": "block",
			"font-size": "{exp:font_size_small,*,font_scale}px",
			"color": "{hex:color_standard} !important",
		},

		".MPLoadedStatusContainer": {
			"position": "absolute",
			"right": "0",
			"top": "0",
			"cursor": "default"
		},
		".MPLoadedStatusContainer.MPLoadedStatusContainerActive > .MPPlaylistIndexContainer": {
			"opacity": "1.0 !important"
		},
		".MPLoadedStatusContainer.MPLoadedStatusContainerActive > .MPPlaylistLoadingContainer": {
			"opacity": "1.0 !important"
		},

		".MPPlaylistLoadingContainer": {
			"display": "inline-block",
			"cursor": "default",
			"opacity": "0.0",
			"padding": "{exp:2,*,padding_scale}px 0px {exp:2,*,padding_scale}px {exp:2,*,padding_scale}px",
		},
		".MPPlaylistLoadingContainerInner": {
			"padding": "{exp:2,*,padding_scale}px",
			"border-radius": "{exp:2,*,padding_scale}px",
			"background": "{rgba:bg_color_lightest}",
		},
		".MPPlaylistLoadingText1": {
			"color": "{hex:color_standard} !important",
			"display": "inline-block"
		},
		".MPPlaylistLoadingText2": {
			"color": "{hex:color_standard} !important",
			"display": "inline-block",
			"padding": "0px 0px 0px {exp:2,*,padding_scale}px"
		},
		".MPPlaylistLoadingText3": {
			"color": "{hex:color_standard} !important",
			"display": "inline-block"
		},

		".MPPlaylistIndexContainer": {
			"display": "inline-block",
			"cursor": "default",
			"opacity": "0.0",
			"padding": "{exp:2,*,padding_scale}px",
		},
		".MPPlaylistIndexContainer.MPPlaylistIndexContainerActive": {
			"opacity": "1.0 !important"
		},
		".MPContainerMain:hover .MPPlaylistIndexContainer": {
			"opacity": "0.5"
		},
		".MPContainerMain:hover .MPTopContainer:hover .MPPlaylistIndexContainer": {
			"opacity": "1.0"
		},
		".MPPlaylistIndexContainerInner": {
			"padding": "{exp:2,*,padding_scale}px",
			"border-radius": "{exp:2,*,padding_scale}px",
			"background": "{rgba:bg_color_lightest}",
		},
		".MPPlaylistIndexText1": {
			"color": "{hex:color_standard} !important",
			"display": "inline-block"
		},
		".MPPlaylistIndexText2": {
			"color": "{hex:color_standard} !important",
			"display": "inline-block",
			"padding": "0px {exp:2,*,padding_scale}px 0px {exp:2,*,padding_scale}px",
		},
		".MPPlaylistIndexText3": {
			"color": "{hex:color_standard} !important",
			"display": "inline-block"
		},

		".MPControlContainer": {
			"width": "100%",
			"padding-top": "{exp:2,*,padding_scale}px",
			"text-align": "center",
			"position": "absolute",
			"bottom": "0",
			"opacity": "0.0"
		},
		".MPContainerMain:hover .MPControlContainer": {
			"opacity": "1.0"
		},
		".MPControlContainerInner": {
			"padding": "{exp:4,*,padding_scale}px {exp:6,*,padding_scale}px {exp:2,*,padding_scale}px {exp:6,*,padding_scale}px",
			"display": "inline-block",
			"border-top-left-radius": "{exp:border_radius_normal,*,border_scale}px",
			"border-top-right-radius": "{exp:border_radius_normal,*,border_scale}px",
			"background": "{rgba:bg_color_lightest,0.5}"
		},
		".MPTopContainer:hover .MPControlContainerInner": {
			"background": "{rgba:bg_color_lightest}"
		},
		".MPControlLink, a.MPControlLink": {
			"padding": "{exp:1,*,padding_scale}px {exp:2,*,padding_scale}px {exp:1,*,padding_scale}px {exp:2,*,padding_scale}px",
			"font-family": "{controls_font} !important",
			"font-size": "{exp:font_size_controls,*,font_scale}px",
			"font-weight": "bold !important",
			"text-decoration": "none !important",
			"display": "inline-block",
			"border-radius": "{exp:border_radius_small,*,border_scale}px",
			"cursor": "pointer",
			"color": "{hex:color_standard} !important",
			"background": "transparent"
		},
		".MPControlLink:hover, a.MPControlLink:hover": {
			"text-decoration": "none !important",
			"color": "{hex:color_standard} !important",
			"background": "{rgba:bg_color_light}"
		},
		".MPControlLink:active, a.MPControlLink:active": {
			"text-decoration": "none !important",
			"color": "{hex:color_special_2} !important",
			"background": "{rgba:bg_color_dark}"
		},
		".MPControlLinkDisabled, .MPControlLinkDisabled:hover, .MPControlLinkDisabled:active": {
			"color": "{hex:color_disabled} !important",
			"background": "transparent !important",
			"cursor": "default !important"
		},
		".MPControlLinkSeparator": {
			"display": "inline-block",
			"width": "{exp:2,*,padding_scale}px"
		},

		".MPControlLinkSvgContainer": {
			"padding": "{exp:1,*,padding_scale}px {exp:2,*,padding_scale}px {exp:1,*,padding_scale}px {exp:2,*,padding_scale}px",
			"border-radius": "{exp:border_radius_small,*,border_scale}px",
			"background": "transparent",
			"display": "inline-block",
			"cursor": "pointer"
		},
		".MPControlLinkSvgContainer:hover": {
			"background": "{rgba:bg_color_light}"
		},
		".MPControlLinkSvgContainer:active": {
			"background": "{rgba:bg_color_dark}"
		},
		".MPControlLinkSvg": {
			"width": "{exp:14,*,font_scale}px",
			"height": "{exp:14,*,font_scale}px"
		},
		".MPControlLinkSvgMainGroup": {
		},
		".MPControlLinkSvgShapeColor": {
			"fill": "{rgb:color_standard}",
			"fill-opacity": "0.5",
			"stroke": "none"
		},
		".MPTopContainer:hover .MPControlLinkSvgShapeColor": {
			"fill-opacity": "1.0 !important"
		},
		".MPTopContainer:hover .MPControlLinkDisabled .MPControlLinkSvgShapeColor": {
			"fill-opacity": "0.5 !important"
		},
		".MPControlLinkSvgContainer:hover .MPControlLinkSvgShapeColor": {
			"fill": "{rgb:color_standard}",
		},
		".MPControlLinkSvgContainer:active .MPControlLinkSvgShapeColor": {
			"fill": "{rgb:color_special_2}",
		},

		".MPVideoContainer": {
			"display": "block",
			"position": "absolute",
			"left": "0",
			"top": "0",
			"width": "100%",
			"height": "100%",
			"overflow": "hidden"
		},
		".MPVideoContainerMask": {
			"display": "block",
			"position": "absolute",
			"left": "0",
			"top": "0",
			"width": "100%",
			"height": "100%",
			"cursor": "default !important",
			"border": "0px hidden !important",
		},

		".MPSeekContainerTop": {
			"position": "relative",
			"height": "{exp:1,*,border_scale}px",
			"background": "{rgba:bg_color_dark}",
			"font-size":"0px"
		},
		".MPSeekContainerBottom": {
			"height": "{exp:1,*,border_scale}px",
			"background": "{rgba:bg_color_dark}"
		},

		".MPSeekContainer": {
			"position": "relative",
			"border": "0px"
		},
		".MPSeekTimeContainer": {
			"position": "relative",
			"padding": "{exp:1,*,padding_scale}px 0px {exp:1,*,padding_scale}px 0px",
			"text-align": "center"
		},
		".MPSeekTime": {
			"color": "{hex:color_standard} !important",
			"display": "inline-block",
			"text-shadow": "{exp:1,*,font_scale}px {exp:1,*,font_scale}px 1px {hex:color_highlight_light}",
		},
		".MPSeekTimeLeft": {
			"position": "absolute",
			"left": "0",
			"padding-left": "{exp:1,*,padding_scale}px",
			"display": "inline-block",
			"color": "{hex:color_disabled} !important"
		},
		".MPSeekTimeRight": {
			"position": "absolute",
			"right": "0",
			"padding-right": "{exp:1,*,padding_scale}px",
			"display": "inline-block",
			"color": "{hex:color_disabled} !important"
		},
		".MPSeekBarContainer": {
			"position": "absolute",
			"left": "0",
			"top": "0",
			"width": "100%",
			"height": "100%",
			"text-align": "left",
			"overflow": "hidden",
			"cursor": "default"
		},
		".MPSeekBarMover": {
			"width": "0px",
			"height": "100%",
			"display": "inline-block",
			"background": "{rgba:bg_color_darkest,0.125}",
			"cursor": "default"
		},
		".MPSeekBar": {
			"width": "{exp:8,*,font_scale}px",
			"height": "100%",
			"display": "inline-block",
			"background": "{rgba:bg_color_darkest,0.75}",
			"cursor": "pointer"
		},
		".MPSeekBarActive": {
			"background": "{rgba:color_special_2,0.75} !important"
		},

		".MPLoadPercentBarContainer": {
			"position": "absolute",
			"left": "0",
			"top": "0",
			"width": "100%",
			"height": "100%",
			"text-align": "left",
			"overflow": "hidden",
			"cursor": "default",
		},
		".MPLoadPercentBarMover": {
			"width": "0px",
			"height": "100%",
			"display": "inline-block",
			"background": "transparent",
			"cursor": "default"
		},
		".MPLoadPercentBar": {
			"width": "0px",
			"height": "100%",
			"display": "inline-block",
			"background": "{rgba:bg_color_darkest,0.5}",
			"cursor": "default"
		},

		".MPImageContainerMain": {
			"padding": "0px !important",
			"width": "100%",
			"text-align": "center",
			"position": "relative"
		},
		".MPImageContainer": {
			"display": "block",
			"width": "100%",
			"overflow": "hidden",
			"position": "relative"
		},
		".MPImage": {
			"display": "inline",
			"float": "none",
			"margin": "0px",
			"border": "0px hidden",
			"padding": "0px"
		},
		".MPNoImage": {
			"display": "inline-block",
			"background": "{rgba:bg_color_lightest}",
			"color": "{hex:color_disabled}",
			"cursor": "default"
		},
		".MPNoImageText": {
			"display": "none"
		},

		".MPSeekIndicatorContainer": {
			"display": "block",
			"position": "absolute",
			"bottom": "0",
			"left": "0",
			"right": "0",
			"text-align": "left"
		},
		".MPSeekIndicatorContainer.MPSeekIndicatorContainerDisabled": {
			"display": "none"
		},
		".MPSeekIndicatorContainer.MPSeekIndicatorContainerDragging, .MPSeekIndicatorContainer.MPSeekIndicatorContainerDisabled.MPSeekIndicatorContainerDragging": {
			"display": "block"
		},
		".MPSeekIndicator": {
			"display": "inline-block",
			"padding": "{exp:2,*,padding_scale}px {exp:3,*,padding_scale}px {exp:2,*,padding_scale}px {exp:3,*,padding_scale}px",
			"border-top-left-radius": "{exp:border_radius_small,*,border_scale}px",
			"border-top-right-radius": "{exp:border_radius_small,*,border_scale}px",
			"background": "{rgba:bg_color_lightest,1.0}",
			"position": "absolute",
			"left": "0",
			"bottom": "0"
		},

		".MPPlaylistContainer": {
			"cursor": "default",
			"overflow-x": "hidden",
			"overflow-y": "auto"
		},
		".MPPlaylistItem, a.MPPlaylistItem, a.MPPlaylistItem:link, a.MPPlaylistItem:visited": {
			"position": "relative",
			"display": "block",
			"text-align": "left",
			"overflow": "hidden",
			"white-space": "nowrap",
			"cursor": "pointer",
			"text-decoration": "none !important"
		},
		".MPPlaylistItem:hover, .MPPlaylistItem:active, a.MPPlaylistItem:hover, a.MPPlaylistItem:active": {
			"background": "{rgba:bg_color_lightest}",
			"text-decoration": "none !important"
		},
		".MPPlaylistItemActive": {},
		".MPPlaylistControlsContainer": {
			"position": "absolute",
			"right": "0",
			"top": "0",
			"display": "block",
			"cursor": "default"
		},
		".MPPlaylistItemInfo": {
			"position": "absolute",
			"right": "0",
			"top": "0",
			"white-space": "nowrap",
			"color": "{hex:color_light} !important",
			"display": "block",
			"cursor": "default",
			"padding": "{exp:1,*,padding_scale}px {exp:2,*,padding_scale}px {exp:1,*,padding_scale}px 0px",
			"background": "{rgba:bg_color_light}",
		},
		".MPPlaylistItem:hover .MPPlaylistItemInfo": {
			"background": "{rgba:bg_color_lightest}",
		},
		".MPPlaylistControls": {
			"opacity": "0.0",
			"text-decoration": "none !important",
			"background": "transparent",
			"display": "inline-block",
			"color": "{hex:color_standard} !important",
			"padding": "{exp:1,*,padding_scale}px 0px {exp:1,*,padding_scale}px 0px"
		},
		".MPPlaylistItem:hover .MPPlaylistControls": {
			"background": "{rgba:bg_color_lightest}",
			"text-decoration": "none !important",
			"opacity": "0.25"
		},
		".MPPlaylistItem:hover .MPPlaylistControls:hover, .MPPlaylistControls:active": {
			"background": "{rgba:bg_color_lightest}",
			"text-decoration": "none !important",
			"opacity": "1.0"
		},
		".MPPlaylistControlLink, a.MPPlaylistControlLink, .MPPlaylistControlLink:visited, a.MPPlaylistControlLink:visited": {
			"display": "inline-block",
			"padding": "0px {exp:2,*,padding_scale}px 0px {exp:2,*,padding_scale}px",
			"width": "{exp:12,*,font_scale}px",
			"text-align": "center",
			"cursor": "pointer",
			"border-radius": "{exp:border_radius_small,*,border_scale}px",
			"text-decoration": "none",
			"color": "{hex:color_disabled} !important",
			"background": "transparent"
		},
		".MPPlaylistControls:hover .MPPlaylistControlLink, .MPPlaylistControls:hover a.MPPlaylistControlLink": {
			"text-decoration": "none !important",
			"background": "{rgba:bg_color_light} !important"
		},
		".MPPlaylistControls:hover .MPPlaylistControlLink:hover, .MPPlaylistControls:hover a.MPPlaylistControlLink:hover": {
			"text-decoration": "none !important",
			"color": "{hex:color_standard} !important",
			"background": "{rgba:bg_color_dark}"
		},
		".MPPlaylistControls:hover .MPPlaylistControlLink:active, .MPPlaylistControls:hover a.MPPlaylistControlLink:active": {
			"text-decoration": "none !important",
			"color": "{hex:color_special_2} !important",
			"background": "{rgba:bg_color_dark}"
		},
		".MPPlaylistControlLinkSeparator": {
			"display": "inline-block",
			"padding": "0px 0px 0px {exp:1,*,padding_scale}px",
			"cursor": "default"
		},
		".MPPlaylistSoundName": {
			"color": "{hex:color_standard} !important",
			"padding": "{exp:1,*,padding_scale}px 0px {exp:1,*,padding_scale}px {exp:2,*,padding_scale}px"
		},
		".MPPlaylistItemActive .MPPlaylistSoundName": {
			"color": "{hex:color_special_2} !important",
			"text-shadow": "{exp:1,*,font_scale}px {exp:1,*,font_scale}px 1px {hex:color_highlight_light}"
		},

		".MPHelpContainer": {
			"position": "absolute",
			"left": "0",
			"top": "0",
			"width": "100%",
			"height": "100%",
			"background": "{rgba:bg_color_light}"
		},
		".MPHelpContainerInner0": {
			"position": "relative",
			"width": "100%",
			"height": "100%",
		},
		".MPHelpContainerInner1": {
			"position": "absolute",
			"left": "0",
			"top": "0",
			"right": "0",
			"bottom": "0",
			"overflow-x": "hidden",
			"overflow-y": "auto",
		},
		".MPHelpLabelDiv": {
			"display": "block",
			"width": "100%",
			"text-align": "left",
			"font-weight": "bold",
			"color": "{hex:color_standard} !important",
			"padding": "{exp:4,*,padding_scale}px {exp:2,*,padding_scale}px 0px {exp:2,*,padding_scale}px"
		},
		".MPHelpTextDiv": {
			"display": "block",
			"width": "100%",
			"text-align": "left",
			"color": "{hex:color_standard} !important",
			"padding": "{exp:2,*,padding_scale}px {exp:4,*,padding_scale}px 0px {exp:4,*,padding_scale}px"
		},
		".MPHelpSectionDiv": {
			"display": "block",
			"width": "100%",
			"text-align": "left",
			"color": "{hex:color_standard} !important",
			"padding-top": "{exp:2,*,padding_scale}px"
		},
		".MPHelpLinkDiv": {
			"background": "{rgba:bg_color_light}",
			"display": "block",
			"width": "100%",
			"position": "absolute",
			"bottom": "0",
			"left": "0"
		},
		".MPHelpTextLink, a.MPHelpTextLink": {
			"display": "inline-block",
			"width": "50%",
			"text-align": "center",
			"cursor": "pointer",
			"text-decoration": "none",
			"color": "{hex:color_standard} !important"
		},
		".MPHelpTextLink:hover, a.MPHelpTextLink:hover": {
			"text-decoration": "underline",
			"color": "{hex:color_standard} !important"
		},
		".MPHelpTextLink:active, a.MPHelpTextLink:active": {
			"text-decoration": "underline",
			"color": "{hex:color_special_2} !important"
		},
		".MPHelpModeNonLink": {
			"padding-left": "{exp:4.0,*,padding_scale}px"
		},
		".MPHelpModeLink, a.MPHelpModeLink": {
			"display": "inline-block",
			"width": "100%",
			"text-align": "left",
			"cursor": "pointer",
			"text-decoration": "none",
			"color": "{hex:color_standard} !important",
			"padding-left": "{exp:4.0,*,padding_scale}px"
		},
		".MPHelpModeLink:hover, a.MPHelpModeLink:hover": {
			"text-decoration": "underline",
			"color": "{hex:color_standard} !important"
		},
		".MPHelpModeLink:active, a.MPHelpModeLink:active": {
			"text-decoration": "underline",
			"color": "{hex:color_special_2} !important"
		},
		".MPHelpColorInputDiv0": {
			"width": "28%",
			"display": "inline-block",
			"position": "relative"
		},
		".MPHelpColorLabelText": {
			"display": "block",
			"width": "100%",
			"text-align": "right",
			"font-style": "italic",
			"color": "{hex:color_standard} !important",
			"vertical-align": "middle"
		},
		".MPHelpColorLabelDisplay": {
			"display": "block",
			"width": "{exp:4,*,padding_scale}px",
			"height": "100%",
			"position": "absolute",
			"left	": "0",
			"top": "0"
		},
		".MPHelpColorInputDiv1": {
			"width": "18%",
			"display": "inline-block"
		},
		".MPHelpColorInputDiv1Full": {
			"width": "72%",
			"display": "inline-block"
		},
		".MPHelpColorInputDiv2": {
			"padding-right": "{exp:2,*,padding_scale}px"
		},
		".MPHelpColorInputDiv2b": {
			"padding-right": "{exp:2,*,padding_scale}px"
		},
		".MPHelpColorInputDiv3": {
			"border": "{exp:1,*,border_scale}px solid {hex:bg_color_dark}",
			"padding": "{exp:2,*,padding_scale}px",
			"background": "{rgba:bg_color_lightest}"
		},
		".MPHelpColorInput[type=\"text\"], .MPHelpColorInput[type=\"text\"]:hover, .MPHelpColorInput[type=\"text\"]:active, .MPHelpColorInput[type=\"text\"]:focus, input.MPHelpColorInput[type=\"text\"], input.MPHelpColorInput[type=\"text\"]:hover, input.MPHelpColorInput[type=\"text\"]:active, input.MPHelpColorInput[type=\"text\"]:focus": {
			"width": "100% !important",
			"display": "inline-block !important",
			"padding": "0px !important",
			"margin": "0px !important",
			"font-size": "{exp:font_size,*,font_scale}px !important",
			"color": "{hex:color_standard} !important",
			"background": "{rgba:bg_color_lightest} !important",
			"text-align": "left !important",
			"font-family": "{main_font} !important",
			"border": "0px hidden !important"
		},

		".MPFooterBarContainer": {
			"position": "relative",
			"background": "{rgba:bg_color_light}",
			"text-align": "center",
			"height": "{exp:bg_inner_border_radius,*,border_scale}px",
			"border-bottom-left-radius": "{exp:bg_inner_border_radius,*,border_scale}px",
			"border-bottom-right-radius": "{exp:bg_inner_border_radius,*,border_scale}px"
		},

		".MPDownloadsContainer": {
			"position": "absolute",
			"left": "0",
			"top": "0",
			"width": "100%",
			"height": "100%",
			"overflow-x": "hidden",
			"overflow-y": "auto",
			"display": "block",
			"background": "{rgba:bg_color_light}"
		},
		".MPDownloadsLabel": {
			"display": "block",
			"width": "100%",
			"text-align": "left",
			"font-weight": "bold",
			"color": "{hex:color_standard} !important",
			"padding": "{exp:4,*,padding_scale}px {exp:2,*,padding_scale}px 0px {exp:2,*,padding_scale}px"
		},
		".MPDownloadsContent": {
			"display": "block",
			"width": "100%",
			"text-align": "left",
			"color": "{hex:color_standard} !important",
			"padding": "{exp:2,*,padding_scale}px {exp:4,*,padding_scale}px 0px {exp:4,*,padding_scale}px"
		},
		".MPDownloadsContent div": {
			"color": "{hex:color_standard} !important",
		},
		".MPDownloadsLink, a.MPDownloadsLink, .MPDownloadsLink:visited, a.MPDownloadsLink:visited": {
			"cursor": "pointer",
			"text-decoration": "underline !important",
			"color": "{hex:color_standard} !important",
		},
		".MPDownloadsLink:hover, a.MPDownloadsLink:hover": {
			"color": "{hex:color_special_2} !important"
		},
		".MPDownloadsLink:active, a.MPDownloadsLink:active": {
			"color": "{hex:color_special_2} !important"
		},

		".MPDownloadsContentReady": {
			"padding-top": "{exp:6,*,padding_scale}px",
		},

		".MPAlertContainer": {
			"width": "100%",
			"height": "100%",
			"background": "{rgba:bg_color_lightest,0.75} !important",
			"position": "absolute",
			"left": "0",
			"top": "0",
			"border-radius": "{exp:bg_inner_border_radius,*,border_scale}px",
			"display": "block"
		},
		".MPAlertContentContainer": {
			"position": "relative",
			"top": "50%",
			"text-align": "center",
			"font-size": "{exp:40,*,font_scale}px !important",
			"color": "{hex:color_standard} !important",
			"margin-top": "{exp:-40,*,font_scale}px !important"
		},

		".MPResizingSizeOff": {
			"width": "{exp:bg_outer_size,*,padding_scale}px",
			"height": "{exp:bg_outer_size,*,padding_scale}px",
		},
		".MPResizingSizeAvailable": {
			"width": "{exp:bg_outer_size,*,padding_scale,*,2}px",
			"height": "{exp:bg_outer_size,*,padding_scale,*,2}px",
		},
		".MPResizingContainerFull": {
			"position": "absolute",
			"left": "-{exp:bg_outer_size,*,padding_scale}px",
			"top": "-{exp:bg_outer_size,*,padding_scale}px",
			"right": "-{exp:bg_outer_size,*,padding_scale}px",
			"bottom": "-{exp:bg_outer_size,*,padding_scale}px",
			"left":"-16px","top":"-16px","right":"-16px","bottom":"-16px",

			"border-radius": "{exp:bg_outer_border_radius,*,border_scale}px",
			"background": "{rgba:bg_outer_color}"
		},
		".MPResizingContainerInner": {
			"position": "relative",
			"width": "100%",
			"height": "100%"
		},
		".MPResizingContainerControl": {
			"overflow": "hidden",
			"position": "absolute"
		},
		".MPResizingContainerTopLeft": {
			"left": "0",
			"width": "16px",
			"top": "0",
			"height": "16px",
			"cursor": "nw-resize"
		},
		".MPResizingContainerTop": {
			"left": "16px",
			"right": "16px",
			"top": "0",
			"height": "16px",
			"cursor": "n-resize"
		},
		".MPResizingContainerTopRight": {
			"right": "0",
			"width": "16px",
			"top": "0",
			"height": "16px",
			"cursor": "ne-resize"
		},
		".MPResizingContainerLeft": {
			"left": "0",
			"width": "16px",
			"top": "16px",
			"bottom": "16px",
			"cursor": "w-resize"
		},
		".MPResizingContainerRight": {
			"right": "0",
			"width": "16px",
			"top": "16px",
			"bottom": "16px",
			"cursor": "e-resize"
		},
		".MPResizingContainerBottomLeft": {
			"left": "0",
			"width": "16px",
			"bottom": "0",
			"height": "16px",
			"cursor": "sw-resize"
		},
		".MPResizingContainerBottom": {
			"left": "16px",
			"right": "16px",
			"bottom": "0",
			"height": "16px",
			"cursor": "s-resize"
		},
		".MPResizingContainerBottomRight": {
			"right": "0",
			"width": "16px",
			"bottom": "0",
			"height": "16px",
			"cursor": "se-resize"
		},
		".MPResizingContainerTextContainerOuter": {
			"position": "relative",
			"width": "100%",
			"height": "100%"
		},
		".MPResizingContainerTextContainerInner": {
			"position": "absolute",
			"left": "0",
			"top": "50%",
			"width": "100%",
			"height": "100%",
			"margin-top": "-{exp:font_size_controls,*,font_scale,/,2}px",
		},
		".MPResizingContainerTextContainer": {
			"width": "100%",
			"height": "100%",
			"text-align": "center",
			"cursor": "inherit"
		},
		".MPResizingContainerText": {
			"font-family": "{controls_font}",
			"font-size": "{exp:font_size_controls,*,font_scale}px",
			"font-weight": "bold",
			"color": "{hex:color_standard}",
			"text-shadow": "{exp:1,*,font_scale}px {exp:1,*,font_scale}px 1px {hex:color_highlight_light}"
		},

		".MPControlsForceHide .MPControlContainer, .MPControlsForceHide .MPPlaylistIndexContainer, .MPControlsForceHide .MPVolumeContainer": {
			"display": "none !important"
		},

		".MPTheatreEnabled": {},
		".MPTheatreEnabled .MPTitleBarContainer": {
			"cursor": "default !important"
		},
		".MPTheatreDim": {
			"position": "fixed",
			"left": "0",
			"top": "0",
			"right": "0",
			"bottom": "0",
			"z-index": "1000",
			"background-color": "#000",
		},
		".MPMainButtonAboutTheatre": {
			"display": "inline-block",
			"font-size": "{exp:font_size_small,*,font_scale}px",
			"vertical-align": "middle",
			"color": "{hex:color_special_1} !important",
			"text-shadow": "{exp:1,*,font_scale,*,font_size_small,/,font_size}px {exp:1,*,font_scale,*,font_size_small,/,font_size}px {exp:1,*,font_scale,*,font_size_small,/,font_size}px {hex:color_highlight_light}"
		},
		".MPTheatreHidden": {
			"display": "none !important",
		},
		".MPContainerMain:not(.MPTheatreEnabled) .MPTheatreOnly": {
			"display": "none",
		},
	};
}
MediaPlayerCSS.prototype = {
	constructor: MediaPlayerCSS,
	create_stylesheet: function () {
		var stylesheet = "";
		var key, style, css_key, css_value;
		for (key in this.css) {
			// Add the key
			stylesheet += (this.css_suffix.length == 0 ? key : this.form_key(key)) + "{";
			// Iterate over its style elements
			style = this.css[key];
			for (css_key in style) {
				// Value
				css_value = this.parse_out_values(style[css_key]);
				// Add the style
				stylesheet += css_key + ":" + css_value + ";";
			}
			// Finish
			stylesheet += "}";
		}

		// Return
		return stylesheet;
	},
	parse_out_values: function (value) {
		var css = this;
		var a, i, v, values, indices;
		value = value.replace(/\{.+?\}/g, function (match) {
			// Remove {}
			match = match.substr(1, match.length - 2);
			// Remove formatters
			format_mode = 0;
			match = match.replace(/.+?:/g, function (match2) {
				match2 = match2.toLowerCase();
				if (match2 == "hex:") format_mode = 1;
				else if (match2 == "rgb:") format_mode = 2;
				else if (match2 == "rgba:") format_mode = 3;
				else if (match2 == "exp:") format_mode = 4;
				else if (match2 == "iexp:") format_mode = 5;
				return "";
			});
			// Split
			values = match.split(",");
			translated = new Array();
			for (v = 0; v < values.length; ++v) {
				// Array removal
				indices = new Array();
				values[v] = values[v].replace(/\[.+?\]/g, function (match2) {
					// Remove []
					match2 = match2.substr(1, match2.length - 2);
					// Add to index list
					if (match2.length > 0 && (match2[0] == "\"" || match2[0] == "'")) {
						indices.push(match2.substr(1, match2.length - 2));
					}
					else {
						indices.push(parseInt(match2));
					}
					return "";
				});
				// Check if it's a variable name, or a integer literal
				if (values[v].length > 0 && (values[v].charCodeAt(0) & 0xDF) >= "A".charCodeAt(0) && (values[v].charCodeAt(0) & 0xDF) <= "Z".charCodeAt(0)) {
					if (values[v] in css.css_color_presets[css.preset]) {
						values[v] = css.css_color_presets[css.preset][values[v]];
					}
					else if (values[v] in css.css_size_presets[css.preset]) {
						values[v] = css.css_size_presets[css.preset][values[v]];
					}
					else {
						// missing
						return "";
					}
					for (i = 0; i < indices.length; ++i) {
						values[v] = values[v][indices[i]];
					}
					translated[v] = true;
				}
				else {
					values[v] = values[v];
					translated[v] = false;
				}
			}

			// Format
			try {
				switch (format_mode) {
					case 1: // hex
					{
						v = (translated[0] ? values[0] : parseFloat(values[0]));
						v = (v[0] << 16) | (v[1] << 8) | (v[2]);
						v = v.toString(16);
						while (v.length < 6) v = "0" + v;
						v = "#" + v;
					}
					return v;
					case 2: // rgb
					case 3: // rgba
					{
						if (values.length == 2) {
							a = (translated[1] ? values[1] : parseFloat(values[1]));
						}
						else {
							a = values[0][3];
						}

						v = (translated[0] ? values[0] : parseFloat(values[0]));
						if (a >= 1.0 || format_mode == 2) {
							v = "rgb(" + v[0] + "," + v[1] + "," + v[2] + ")";
						}
						else {
							v = "rgba(" + v[0] + "," + v[1] + "," + v[2] + "," + a + ")";
						}
					}
					return v;
					case 4: // exp
					case 5: // iexp
					{
						v = 0.0;
						op = "+";
						for (i = 0; i < values.length; ++i) {
							a = (translated[i] ? values[i] : parseFloat(values[i]));
							if (op == "+") v += a;
							else if (op == "-") v -= a;
							else if (op == "*") v *= a;
							else if (op == "/") v /= a;
							else if (op == "%") v %= a;
							if (++i < values.length) op = values[i].trim();
						}

						// Round
						if (format_mode == 4) v = Math.round(v);
						else v = Math.round(v * 100.0) / 100.0;
					}
					return v;
					default:
					{
						// Single value
						v = (translated[0] ? values[0] : parseFloat(values[0]));
					}
					return v;
				}
			}
			catch (e) {
				return "";
			}
		});

		// Done
		return value;
	},
	load_preset: function (preset_name) {
		this.preset = preset_name.replace(/[^a-zA-Z_]/g, "").toLowerCase();

		if (!(this.preset in this.css_color_presets)) {
			for (var key in this.css_color_presets) {
				this.preset = key;
				break;
			}
		}

		if (typeof(this.on_theme_change_callback) == "function") this.on_theme_change_callback(this.on_theme_change_callback_data);
	},
	get_volume_colors: function () {
		return this.css_color_presets[this.preset].volume_colors;
	},
	get_value: function (is_color, name) {
		// Array indices
		var indices = new Array();
		name = name.replace(/\[.+?\]/g, function (match) {
			// Remove []
			match = match.substr(1, match.length - 2);
			// Add to index list
			if (match.length > 0 && (match[0] == "\"" || match[0] == "'")) {
				indices.push(match.substr(1, match.length - 2));
			}
			else {
				indices.push(parseInt(match));
			}
			return "";
		});

		try {
			var v = "";
			if (is_color) {
				if (name in this.css_color_presets[this.preset]) {
					v = this.css_color_presets[this.preset][name];
				}
			}
			else {
				if (name in this.css_size_presets[this.preset]) {
					v = this.css_size_presets[this.preset][name];
				}
			}
			for (var i = 0; i < indices.length; ++i) {
				v = v[indices[i]];
			}
			return v;
		}
		catch (e) {
			return "";
		}
	},
	create_custom: function () {
		// Create
		var preset = "custom";
		this.css_color_presets[preset] = {"@name": "Custom"};
		this.css_size_presets[preset] = {"@name": "Custom"};

		// Copy
		for (var key in this.css_color_presets[this.preset]) {
			if (key[0] != "@") {
				this.css_color_presets[preset][key] = this.css_color_presets[this.preset][key];
			}
		}
		for (var key in this.css_size_presets[this.preset]) {
			if (key[0] != "@") {
				this.css_size_presets[preset][key] = this.css_size_presets[this.preset][key];
			}
		}
	},
	modify_value: function (is_color, name, value, component_index) {
		if (this.preset != "custom") {
			this.create_custom();
			this.load_preset("custom");
		}

		// Array indices
		var indices = new Array();
		name = name.replace(/\[.+?\]/g, function (match) {
			// Remove []
			match = match.substr(1, match.length - 2);
			// Add to index list
			if (match.length > 0 && (match[0] == "\"" || match[0] == "'")) {
				indices.push(match.substr(1, match.length - 2));
			}
			else {
				indices.push(parseInt(match));
			}
			return "";
		});
		indices.splice(0, 0, name);
		if (is_color) indices.push(component_index);

		// Value
		var v = (is_color ? this.css_color_presets[this.preset] : this.css_size_presets[this.preset]);
		for (var i = 0; i < indices.length - 1; ++i) {
			v = v[indices[i]];
		}

		// Set
		v[indices[indices.length - 1]] = value;
	},
	save: function () {
		var data = {"key": this.preset, "color": {}, "size": {}};

		// Copy
		if ("custom" in this.css_color_presets) {
			for (var key in this.css_color_presets["custom"]) {
				data["color"][key] = this.css_color_presets["custom"][key];
			}
		}
		if ("custom" in this.css_size_presets) {
			for (var key in this.css_size_presets["custom"]) {
				data["size"][key] = this.css_size_presets["custom"][key];
			}
		}

		// Done
		return data;
	},
	load: function (data) {
		// Init
		if ("color" in data || "size" in data) {
			this.css_color_presets["custom"] = {"@name": "Custom"};
			this.css_size_presets["custom"] = {"@name": "Custom"};
		}

		// Copy
		if ("color" in data) {
			for (var key in data["color"]) {
				this.css_color_presets["custom"][key] = data["color"][key];
			}
		}
		if ("size" in data) {
			for (var key in data["size"]) {
				this.css_size_presets["custom"][key] = data["size"][key];
			}
		}

		// Load preset
		if ("key" in data) {
			this.load_preset(data["key"]);
		}

	},
	form_key: function (key) {
		return key.replace(/(\.[a-zA-Z0-9_-]+)/g, "$1" + this.css_suffix);
	},
};



///////////////////////////////////////////////////////////////////////////////
// Media Player class
///////////////////////////////////////////////////////////////////////////////
function MediaPlayer (css, load_callbacks, drag_callback, settings_callback, destruct_callback, additional_options) {
	// Not setup
	this.created = false;
	this.identifier = this.random_string(8);
	this.namespace = "mp_" + this.identifier;
	this.is_chrome = ((navigator.userAgent + "").indexOf(" Chrome/") >= 0);
	this.title_default =  "Media Player";

	// Loading
	this.set_load_callbacks(load_callbacks);
	this.drag_callback = drag_callback;
	this.settings_callback = settings_callback;
	this.destruct_callback = destruct_callback;

	this.use_load_buffer = true;
	this.load_buffer = [];
	this.load_buffer_timer = null;
	this.load_buffer_active = false;

	this.use_svg = true;
	this.doc_mouse = {x:0, y:0};

	// Dimension scaling
	this.scale_factor = 1.0;

	// Video
	this.ytvideo_player = null;
	this.ytvideo_qualities = [ "default", "small", "medium", "large", "hd720", "hd1080", "highres" ];
	this.ytvideo_quality_index = 0;
	this.ytvideo_unsafe = this.is_chrome;
	this.ytvideo_html5 = true;

	this.vimeovideo_player = null;
	this.vimeovideo_player_paused = true;
	this.vimeovideo_unsafe = this.is_chrome;

	this.soundcloud_player = null;
	this.soundcloud_player_paused = true;
	this.soundcloud_unsafe = this.is_chrome;

	this.videcode_async = true;
	this.videcode_steps = 1024 * 64;
	this.videcode_delay = 1;

	// Image
	this.image_height_min = 64;
	this.image_height_max = 225;
	this.image_height_default = this.image_height_max;
	this.image_height = this.image_height_default;

	// Size/position settings
	this.moving = false;
	this.resizing_image = false;
	this.position_offset = [ 0 , 0 ];
	this.player_width_default = 400;
	this.player_width = this.player_width_default;
	this.playlist_height_default = 34;
	this.playlist_height = this.playlist_height_default;
	this.player_width_min = 64;
	this.playlist_height_min = 0;
	this.playlist_play_on_load = 2;
	this.playlist_play_on_load_settings = [ "Don't Play" , "Play if empty playlist" , "Play if at end of playlist" , "Play if paused" , "Always play" ];

	this.mouse_offset = null;
	this.mouse_moved = false;

	// Resize settings
	this.resizing = false;
	this.resizing_sides = [];
	this.resizing_base_size = { width: 0, height: 0 };
	this.resize_sides = [ false , false , false , false ];
	this.resize_sizes = [ 0.0 , 0.0 , 0.0 ]; // off, available, full
	this.resize_side_sizes = [ 0.0 , 0.0 , 0.0 , 0.0 ]; // current: t,r,b,l
	this.resize_side_sizes_target = [ 0.0 , 0.0 , 0.0 , 0.0 ]; // current: t,r,b,l
	this.resize_side_sizes_needed = false; // true if resizing should happen, false otherwise
	this.resize_wait_times = [ 0.25 , 0.5 , 0.05 ]; // open ms, close ms
	this.resize_timers = [ null , null , null ]; // open timer, close timer, resize timer
	this.resize_distance = [ 4.0 , 4.0 ]; // distance from border, distance to expand
	this.resize_side_speed = 32.0; // ?px/sec
	this.resize_container_hovered = false;
	this.resize_container_border_hovered = false;
	this.resize_should_close = false;
	this.resize_mouse_offset = [ 0.0 , 0.0 ];

	// Volume settings (low -> high)
	this.volume = 0.5;
	this.volume_changing = false;

	// Seeking
	this.seek_was_playing = false;
	this.seek_exacting = false;
	this.seek_dragging = false;

	// Playlist
	this.playlist = [];
	this.playlist_loop = false;
	this.playlist_randomize = false;
	this.playlist_scrollto_onload = true;
	this.playlist_index_timer = null;

	// Current
	this.current_media = null;

	// html elements
	this.nullify();
	this.additional_options = additional_options;
	for (var i = 0; i < this.additional_options.length; ++i) {
		this.additional_options[i].media_player = this;
	}

	// Batch
	this.batch_download_blob = null;
	this.batch_download_blob_url = "";

	// Animation
	this.animate_open_time = 0.25;
	this.animate_close_time = 0.25;

	// Theatre mode
	this.theatre_mode = false;
	this.theatre_mode_target = false;
	this.theatre_vars = {};
	this.theatre_mode_animate_time = 0.25;
	this.theatre_animation_timer = null;
	this.theatre_position = {};
	this.theatre_animation_vars = {};
	this.theatre_offset = 16;
	this.theatre_dim = 0.5;
	this.theatre_dim_color = "#000000";
	this.theatre_hide_controls_time = 2.0;
	this.theatre_hide_controls_timer = null;
	this.theatre_hide_controls_enabled = false;

	// CSS
	this.css = css;
	//this.css.css_suffix = "_" + this.random_string(4);
	this.css.on_theme_change_callback = this.update_player_theme_name;
	this.css.on_theme_change_callback_data = {media_player: this};
	$("head").append(
		(this.head_css = this.E("style"))
		.attr("id", "MPStyleMediaPlayer") // this.random_string(16 + this.random_integer(17)))
		.html(this.css.create_stylesheet())
	);

	// Saving
	this.save_data = [
		"volume",
		"playlist_height",
		"player_width",
		"image_height",
		"image_height_max",
		"scale_factor",
		"playlist_loop",
		"playlist_randomize",
		"playlist_play_on_load",
		"playlist_scrollto_onload",
		"position_offset",
		"ytvideo_quality_index",
		"use_svg",
		"animate_open_time",
		"animate_close_time",
		"theatre_mode_animate_time",
		"theatre_offset",
		"theatre_dim",
		"theatre_dim_color",
	];
}
MediaPlayer.prototype = {
	constructor: MediaPlayer,
	destructor: function () {
		// Callback
		if (typeof(this.destruct_callback) == "function") this.destruct_callback(this);
		this.destruct_callback = null;

		// Destroy
		if (this.created) this.full_destroy();
		if (this.head_css !== null) {
			this.head_css.remove();
			this.head_css = null;
		}
	},

	save: function () {
		// Save
		var data = {};

		var array_type = typeof([]);
		for (var i = 0; i < this.save_data.length; ++i) {
			if (typeof(this[this.save_data[i]]) == array_type) {
				data[this.save_data[i]] = this[this.save_data[i]].slice(0);
			}
			else {
				data[this.save_data[i]] = this[this.save_data[i]];
			}
		}

		// Done
		return data;
	},
	load: function (data) {
		// Load
		var scope = (arguments.length > 1 ? arguments[1] : this);
		var array_type = typeof([]);

		for (var key in data) {
			if ((scope !== this && key in scope) || (scope === this && this.load_check(key))) {
				if (typeof(data[key]) == array_type) {
					this.load(data[key], scope[key]);
				}
				else {
					scope[key] = data[key];
				}
			}
		}
	},
	load_check: function (key) {
		for (var i = 0; i < this.save_data.length; ++i) {
			if (key == this.save_data[i]) return true;
		}
		return false;
	},

	create: function () {
		// Destroy if necessary
		if (this.created) this.full_destroy();


		// Events
		$(window)
		.on("resize." + this.namespace, {media_player: this}, this.on_window_resize);
		$(document)
		.on("mouseup." + this.namespace, {media_player: this}, this.on_document_mouseup)
		.on("mousemove." + this.namespace, {media_player: this}, this.on_document_mousemove);

		// Vars
		var help_custom_div = null;
		this.title_buttons = new Array();
		this.help_container = [ null , null , null ];
		this.help_container_inner1 = [ null , null , null ];
		this.help_container_footer = [ null , null , null ];
		this.player_theme_value_updaters = new Array();
		this.resizing_controls = new Array();
		this.resizing_texts = new Array();

		// Container
		$("body").append( //{ DOM Source
			(this.mp_container_main = this.D("MPContainerMain", "MPContainerMainBorders"))
			.width(this.player_width * this.scale_factor)
			.css({"right": this.position_offset[0], "bottom": this.position_offset[1], "opacity": "0"})
			.on("dragover." + this.namespace, {media_player: this}, this.on_container_dragover)
			.on("dragenter." + this.namespace, {media_player: this}, this.on_container_dragenter)
			.on("dragexit." + this.namespace, {media_player: this}, this.on_container_dragexit)
			.on("drop." + this.namespace, {media_player: this}, this.on_container_drop)
			.on("mouseover." + this.namespace, {media_player: this}, this.on_main_container_mouseover)
			.on("mouseout." + this.namespace, {media_player: this}, this.on_main_container_mouseout)
			.append(
				(this.mp_container = this.D("MPContainer"))
				.append( //{ Resizing
					(this.resizing_container = this.D("MPResizingContainerFull"))
					.css("display", "none")
					.append(
						this.D("MPResizingContainerInner")
						.append(
							(this.resizing_controls[0] = this.D("MPResizingContainerTopLeft", "MPResizingContainerControl"))
							.on("mousedown." + this.namespace, {media_player: this, sides: [0,3]}, this.on_resizer_mousedown)
							.append(
								(this.resizing_texts[0] = this.D("MPResizingContainerTextContainer", "MPResizingContainerText"))
								.html("&#x2196;")
							)
						)
						.append(
							(this.resizing_controls[1] = this.D("MPResizingContainerTop", "MPResizingContainerControl"))
							.on("mousedown." + this.namespace, {media_player: this, sides: [0,null]}, this.on_resizer_mousedown)
							.append(
								(this.resizing_texts[1] = this.D("MPResizingContainerTextContainer", "MPResizingContainerText"))
								.html("&#x2191;")
							)
						)
						.append(
							(this.resizing_controls[2] = this.D("MPResizingContainerTopRight", "MPResizingContainerControl"))
							.on("mousedown." + this.namespace, {media_player: this, sides: [0,1]}, this.on_resizer_mousedown)
							.append(
								(this.resizing_texts[2] = this.D("MPResizingContainerTextContainer", "MPResizingContainerText"))
								.html("&#x2197;")
							)
						)
						.append(
							(this.resizing_controls[3] = this.D("MPResizingContainerLeft", "MPResizingContainerControl"))
							.on("mousedown." + this.namespace, {media_player: this, sides: [null,3]}, this.on_resizer_mousedown)
							.append(
								this.D("MPResizingContainerTextContainerOuter")
								.append(
									(this.resizing_texts[3] = this.D("MPResizingContainerTextContainerInner", "MPResizingContainerTextContainer", "MPResizingContainerText"))
									.html("&#x2190;")
								)
							)
						)
						.append(
							(this.resizing_controls[4] = this.D("MPResizingContainerRight", "MPResizingContainerControl"))
							.on("mousedown." + this.namespace, {media_player: this, sides: [null,1]}, this.on_resizer_mousedown)
							.append(
								this.D("MPResizingContainerTextContainerOuter")
								.append(
									(this.resizing_texts[4] = this.D("MPResizingContainerTextContainerInner", "MPResizingContainerTextContainer", "MPResizingContainerText"))
									.html("&#x2192;")
								)
							)
						)
						.append(
							(this.resizing_controls[5] = this.D("MPResizingContainerBottomLeft", "MPResizingContainerControl"))
							.on("mousedown." + this.namespace, {media_player: this, sides: [2,3]}, this.on_resizer_mousedown)
							.append(
								(this.resizing_texts[5] = this.D("MPResizingContainerTextContainer", "MPResizingContainerText"))
								.html("&#x2199;")
							)
						)
						.append(
							(this.resizing_controls[6] = this.D("MPResizingContainerBottom", "MPResizingContainerControl"))
							.on("mousedown." + this.namespace, {media_player: this, sides: [2,null]}, this.on_resizer_mousedown)
							.append(
								(this.resizing_texts[6] = this.D("MPResizingContainerTextContainer", "MPResizingContainerText"))
								.html("&#x2193;")
							)
						)
						.append(
							(this.resizing_controls[7] = this.D("MPResizingContainerBottomRight", "MPResizingContainerControl"))
							.on("mousedown." + this.namespace, {media_player: this, sides: [2,1]}, this.on_resizer_mousedown)
							.append(
								(this.resizing_texts[7] = this.D("MPResizingContainerTextContainer", "MPResizingContainerText"))
								.html("&#x2198;")
							)
						)
					)
				) //}
				.append( //{ Title bar
					this.D("MPTitleBarContainer")
					.on("mousedown." + this.namespace, {media_player: this}, this.on_titlebar_mousedown)
					.append(
						this.D("MPTitleContainer")
						.append(
							(this.title = this.D("MPTitle"))
							.html(this.title_default)
						)
					)
					.append(
						this.D("MPMainButtonsLeft")
						.append(
							(this.title_buttons[0] = this.E("a", "MPMainButtonLeft"))
							.html("[S]")
						)
						.append(
							(this.title_buttons[1] = this.E("a", "MPMainButtonGeneric"))
							.html("[D]")
						)
					)
					.append(
						this.D("MPMainButtonsRight")
						.append(
							this.D("MPMainButtonAboutTheatre", "MPTheatreOnly")
							.html("Exit Theatre Mode &rarr;")
						)
						.append(
							(this.title_buttons[2] = this.E("a", "MPMainButtonGeneric"))
							.html("[T]")
						)
						.append(
							(this.title_buttons[3] = this.E("a", "MPMainButtonGeneric"))
							.html("[&#x2012;]")
						)
						.append(
							(this.title_buttons[4] = this.E("a", "MPMainButtonRight"))
							.html("[&times;]")
						)
					)
				) //}
				.append( //{ Content
					(this.content_container = this.D("MPContentContainer"))
					.append( //{ Top
						(this.top_container = this.D("MPTopContainer"))
						.append(
							this.D("MPImageContainerMain")
							.append( //{ Image
								(this.image_container = this.D("MPImageContainer"))
								.height(this.image_height_max * this.scale_factor)
								.append(
									(this.no_image = this.D("MPNoImage"))
									.append(
										this.D("MPNoImageText")
										.html("[no media]")
									)
								)
								.append(
									(this.image = this.E("img", "MPImage"))
									.attr("title", "")
									.attr("alt", "")
									.css("display", "none")
									.on("load." + this.namespace, {media_player: this}, this.on_image_load)
									.on("mousedown", this.cancel_event)
								)
							) //}
							.append( //{ Video
								(this.video_container = this.D("MPVideoContainer"))
							)
							.append(
								(this.video_mask = this.E("a", "MPVideoContainerMask"))
								.attr("target", "_blank")
								.on("mousedown", {media_player: this}, this.on_image_resize_mousedown)
								.on("click", {media_player: this}, this.on_image_resize_click)
							) //}
							.append( //{ Playback controls
								this.D("MPControlContainer")
								.append(
									(this.playback_control_container = this.D("MPControlContainerInner"))
								)
							) //}
							.append( //{ Seek indicator
								(this.playback_seek_indicator_container = this.D("MPSeekIndicatorContainer", "MPSeekIndicatorContainerDisabled"))
								.append(
									(this.playback_seek_indicator = this.D("MPSeekIndicator"))
								)
							) //}
						)
						.append( //{ Audio
							(this.audio = this.E("audio"))
							.css("display", "none")
							.on("play." + this.namespace, {media_player: this}, this.on_audio_play)
							.on("pause." + this.namespace, {media_player: this}, this.on_audio_pause)
							.on("ended." + this.namespace, {media_player: this}, this.on_audio_ended)
							.on("timeupdate." + this.namespace, {media_player: this}, this.on_audio_timeupdate)
							.on("durationchange." + this.namespace, {media_player: this}, this.on_audio_durationchange)
						) //}
						.append( //{ Playlist index/etc
							(this.loaded_status_container = this.D("MPLoadedStatusContainer"))
							.on("mousedown", this.cancel_event)
							.append( //{ Loading index
								(this.playlist_index_container = this.D("MPPlaylistLoadingContainer"))
								.append(
									this.D("MPPlaylistLoadingContainerInner")
									.append(
										this.D("MPPlaylistLoadingText1")
										.html("Loading:")
									)
									.append(
										(this.loaded_status_count = this.D("MPPlaylistLoadingText2"))
										.html("5")
									)
								)
								.on("click." + this.namespace, {media_player: this}, function (event) {
									event.data.media_player.queue_item_skip();
									return false;
								})
							) //}
							.append( //{ Playlist index
								(this.playlist_index_container = this.D("MPPlaylistIndexContainer"))
								.append(
									this.D("MPPlaylistIndexContainerInner")
									.append(
										(this.playlist_index_text1 = this.D("MPPlaylistIndexText1"))
										.html("-")
									)
									.append(
										this.D("MPPlaylistIndexText2")
										.html("/")
									)
									.append(
										(this.playlist_index_text2 = this.D("MPPlaylistIndexText3"))
										.html("-")
									)
								)
							) //}
						) //}
						.append( //{ Volume
							(this.volume_container = this.D("MPVolumeContainer"))
							.append(
								(this.volume_bar_container = this.D("MPVolumeBarContainer"))
								.on("mousedown." + this.namespace, {media_player: this}, this.on_volumebar_mousedown)
								.append(
									(this.volume_bar = this.D("MPVolumeBar"))
								)
							)
							.append(
								this.D("MPVolumeLabelContainer")
								.append(
									(this.D("MPVolumeLabel").html("Vol"))
								)
								.append(
									(this.volume_label = this.D("MPVolumeValue").html("100%"))
								)
							)
						) //}
					) //}
					.append( //{ Loaded
						this.D("MPSeekContainerTop")
						.append(
							(this.load_percent_bar_container = this.D("MPLoadPercentBarContainer"))
							.on("mousedown." + this.namespace, this.cancel_event)
							.append(
								(this.load_percent_bar_mover = this.D("MPLoadPercentBarMover"))
								.on("mousedown." + this.namespace, this.cancel_event)
							)
							.append(
								(this.load_percent_bar = this.D("MPLoadPercentBar"))
								.on("mousedown." + this.namespace, this.cancel_event)
							)
						)
					) //}
					.append( //{ Seek bar
						this.D("MPSeekContainer")
						.append(
							this.D("MPSeekTimeContainer")
							.append(
								(this.seek_time_start_label = this.D("MPSeekTimeLeft"))
								.html("0:00")
							)
							.append(
								(this.seek_time_end_label = this.D("MPSeekTimeRight"))
								.html("0:00")
							)
							.append(
								(this.seek_time_current_label = this.D("MPSeekTime"))
								.html("0:00")
							)
						)
						.append(
							(this.seek_bar_container = this.D("MPSeekBarContainer"))
							.on("mousedown." + this.namespace, {media_player: this}, this.on_seekbar_container_mousedown)
							.append(
								(this.seek_bar_mover = this.D("MPSeekBarMover"))
							)
							.append(
								(this.seek_bar = this.D("MPSeekBar"))
								.on("mousedown." + this.namespace, {media_player: this}, this.on_seekbar_mousedown)
							)
						)
						.on("mouseover." + this.namespace, {media_player: this}, this.on_seekbar_mouseover)
						.on("mouseout." + this.namespace, {media_player: this}, this.on_seekbar_mouseout)
						.on("mousemove." + this.namespace, {media_player: this}, this.on_seekbar_mousemove)
					) //}
					.append( //{ Resize
						this.D("MPSeekContainerBottom")
					) //}
					.append( //{ Playlist
						(this.playlist_container = this.D("MPPlaylistContainer"))
						.height(this.playlist_height * this.scale_factor)
						.on("mousedown", this.cancel_event)
					) //}

					.append( //{ Help 0
						(this.help_container[0] = this.D("MPHelpContainer"))
						.css("display", "none")
						.append(
							this.D("MPHelpContainerInner0")
							.append(
								(this.help_container_inner1[0] = this.D("MPHelpContainerInner1"))
								.append( //{ Playlist Settings
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
												this.E("a", "MPHelpModeLink")
												.html(this.playlist_randomize ? "Randomize" : (this.playlist_loop ? "Loop" : "Play Once"))
												.on("click." + this.namespace, {media_player: this}, this.on_playlist_mode_change)
												.on("mousedown", this.cancel_event)
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
												this.E("a", "MPHelpModeLink")
												.html(this.playlist_play_on_load_settings[this.playlist_play_on_load])
												.on("click." + this.namespace, {media_player: this}, this.on_playlist_onload_change)
												.on("mousedown", this.cancel_event)
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
												this.E("a", "MPHelpModeLink")
												.html(this.playlist_scrollto_onload ? "Scroll to in playlist" : "Don't scroll playlist")
												.on("click." + this.namespace, {media_player: this}, this.on_playlist_scrollto_change)
												.on("mousedown", this.cancel_event)
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
												this.E("a", "MPHelpModeLink")
												.html(this.ytvideo_qualities[this.ytvideo_quality_index])
												.on("click." + this.namespace, {media_player: this}, this.on_ytquality_change)
												.on("mousedown", this.cancel_event)
											)
										)
									)
								) //}
								.append( //{ Player Settings
									this.D("MPHelpLabelDiv")
									.html("Player Settings")
								)
								.append(
									(help_custom_div = this.D("MPHelpSectionDiv"))
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
												(this.player_theme_name = this.E("a", "MPHelpModeLink"))
												.on("click." + this.namespace, {media_player: this}, this.on_player_theme_change)
												.on("mousedown", this.cancel_event)
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
												this.E("a", "MPHelpModeLink")
												.on("click." + this.namespace, {media_player: this}, this.on_player_use_svg_update)
												.on("mousedown", this.cancel_event)
												.html(this.use_svg ? "Allowed" : "Disallowed")
											)
										)
									)
								) //}
								.append( //{ Scaling Settings
									this.D("MPHelpLabelDiv")
									.html("Animation")
								)
								.append(this.generate_value_editor("Opening", "@animate_open_time", this.animate_open_time, false, [0, null]))
								.append(this.generate_value_editor("Closing", "@animate_close_time", this.animate_close_time, false, [0, null]))
								//}
								.append( //{ Scaling Settings
									this.D("MPHelpLabelDiv")
									.html("Theatre Mode")
								)
								.append(this.generate_value_editor("Animation Time", "@theatre_mode_animate_time", this.theatre_mode_animate_time, false, [0, null]))
								.append(this.generate_value_editor("Side Offset", "@theatre_offset", this.theatre_offset, false, [0, null]))
								.append(this.generate_value_editor("Dim Factor", "@theatre_dim", this.theatre_dim, false, [ 0.0 , 1.0 ]))
								.append(this.generate_value_editor("Dim Color", "@theatre_dim_color", this.theatre_dim_color, true))
								//}
								.append( //{ Scaling Settings
									this.D("MPHelpLabelDiv")
									.html("Scaling Settings")
								)
								.append(this.generate_value_editor("Padding", "padding_scale", this.css.css_size_presets[this.css.preset].padding_scale, false))
								.append(this.generate_value_editor("Text", "font_scale", this.css.css_size_presets[this.css.preset].font_scale, false))
								.append(this.generate_value_editor("Borders", "border_scale", this.css.css_size_presets[this.css.preset].border_scale, false))
								.append(this.generate_value_editor("Window", "@scale_factor", this.scale_factor, false, [ 0.25 , 4.0 ]))
								//}
							)
							.append( //{ More
								(this.help_container_footer[0] = this.D("MPHelpLinkDiv"))
								.append(
									this.D("MPHelpLabelDiv")
									.html("More Settings")
								)
								.append(
									this.D("MPHelpSectionDiv")
									.append(
										this.E("A", "MPHelpTextLink")
										.html("Color Settings")
										.on("click." + this.namespace, {media_player: this, help_page: 1}, this.on_helppage_goto)
									)
									.append(
										this.E("A", "MPHelpTextLink")
										.html("Other Settings")
										.on("click." + this.namespace, {media_player: this, help_page: 2}, this.on_helppage_goto)
									)
								)
							) //}
						)
					) //}
					.append( //{ Help 1
						(this.help_container[1] = this.D("MPHelpContainer"))
						.css("display", "none")
						.append(
							this.D("MPHelpContainerInner0")
							.append(
								(this.help_container_inner1[1] = this.D("MPHelpContainerInner1"))
								.append(this.D("MPHelpLabelDiv").html("Background Colors"))
								.append(this.generate_color_editor("Outline", "bg_outer_color", this.css.css_color_presets[this.css.preset].bg_outer_color))
								.append(this.generate_color_editor("Lightest", "bg_color_lightest", this.css.css_color_presets[this.css.preset].bg_color_lightest))
								.append(this.generate_color_editor("Light", "bg_color_light", this.css.css_color_presets[this.css.preset].bg_color_light))
								.append(this.generate_color_editor("Medium", "bg_color_dark", this.css.css_color_presets[this.css.preset].bg_color_dark))
								.append(this.generate_color_editor("Dark", "bg_color_darker", this.css.css_color_presets[this.css.preset].bg_color_darker))
								.append(this.generate_color_editor("Darkest", "bg_color_darkest", this.css.css_color_presets[this.css.preset].bg_color_darkest))
								.append(this.D("MPHelpLabelDiv").html("Text Colors"))
								.append(this.generate_color_editor("Default", "color_standard", this.css.css_color_presets[this.css.preset].color_standard))
								.append(this.generate_color_editor("Disabled", "color_disabled", this.css.css_color_presets[this.css.preset].color_disabled))
								.append(this.generate_color_editor("Light", "color_light", this.css.css_color_presets[this.css.preset].color_light))
								.append(this.generate_color_editor("Special 1", "color_special_1", this.css.css_color_presets[this.css.preset].color_special_1))
								.append(this.generate_color_editor("Special 2", "color_special_2", this.css.css_color_presets[this.css.preset].color_special_2))
								.append(this.generate_color_editor("Highlight", "color_highlight_light", this.css.css_color_presets[this.css.preset].color_highlight_light))
								.append(this.D("MPHelpLabelDiv").html("Other Colors"))
								.append(this.generate_color_editor("Volume", "volume_colors[0]", this.css.css_color_presets[this.css.preset].volume_colors[0]))
							)
						)
					) //}
					.append( //{ Help 2
						(this.help_container[2] = this.D("MPHelpContainer"))
						.css("display", "none")
						.append(
							this.D("MPHelpContainerInner0")
							.append(
								(this.help_container_inner1[2] = this.D("MPHelpContainerInner1"))
								.append(this.D("MPHelpLabelDiv").html("Borders"))
								.append(this.generate_value_editor("Outer", "bg_outer_size", this.css.css_size_presets[this.css.preset].bg_outer_size, false))
								.append(this.D("MPHelpLabelDiv").html("Border Radii"))
								.append(this.generate_value_editor("Outer", "bg_outer_border_radius", this.css.css_size_presets[this.css.preset].bg_outer_border_radius, false))
								.append(this.generate_value_editor("Inner", "bg_inner_border_radius", this.css.css_size_presets[this.css.preset].bg_inner_border_radius, false))
								.append(this.generate_value_editor("Major", "border_radius_normal", this.css.css_size_presets[this.css.preset].border_radius_normal, false))
								.append(this.generate_value_editor("Minor", "border_radius_small", this.css.css_size_presets[this.css.preset].border_radius_small, false))
								.append(this.D("MPHelpLabelDiv").html("Fonts"))
								.append(this.generate_value_editor("Font", "main_font", this.css.css_size_presets[this.css.preset].main_font, true))
								.append(this.generate_value_editor("Controls", "controls_font", this.css.css_size_presets[this.css.preset].controls_font, true))
								.append(this.D("MPHelpLabelDiv").html("Font Sizes"))
								.append(this.generate_value_editor("Default", "font_size", this.css.css_size_presets[this.css.preset].font_size, false))
								.append(this.generate_value_editor("Small", "font_size_small", this.css.css_size_presets[this.css.preset].font_size_small, false))
								.append(this.generate_value_editor("Controls", "font_size_controls", this.css.css_size_presets[this.css.preset].font_size_controls, false))
							)
						)
					) //}

					.append( //{ Downloads
						(this.downloads_container = this.D("MPDownloadsContainer"))
						.css("display", "none")
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
										this.E("a", "MPDownloadsLink")
										.attr("href", "#")
										.html("All loaded sounds")
										.on("click." + this.namespace, {media_player: this, type: "sounds"}, this.on_downloads_generate_click)
									)
								)
								.append(
									this.D()
									.append("- ")
									.append(
										this.E("a", "MPDownloadsLink")
										.attr("href", "#")
										.html("All loaded images")
										.on("click." + this.namespace, {media_player: this, type: "images2"}, this.on_downloads_generate_click)
									)
									.append(" (using original filenames)")
								)
								.append(
									this.D()
									.append("- ")
									.append(
										this.E("a", "MPDownloadsLink")
										.attr("href", "#")
										.html("All loaded images")
										.on("click." + this.namespace, {media_player: this, type: "images"}, this.on_downloads_generate_click)
									)
									.append(" (using server filenames)")
								)
							)
							.append(
								(this.downloads_ready_container = this.D("MPDownloadsContentReady"))
								.css("display", "none")
								.append("Click ")
								.append(
									(this.downloads_link = this.E("a", "MPDownloadsLink"))
									.attr("href", "#")
									.html("here")
									.on("click." + this.namespace, {media_player: this}, this.on_downloads_link_click)
								)
								.append(
									(this.downloads_about = this.E("span"))
								)
							)
						)
					) //}
				) //}
				.append( //{ Footer
					(this.footer_container = this.D("MPFooterBarContainer"))
				) //}
				.append( //{ Alert page
					(this.alert_container = this.D("MPAlertContainer"))
					.css("display", "none")
					.append(
						(this.D("MPAlertContentContainer")
						.html("Drop Files<br />Here"))
					)
					.on("click", {}, function (event) {
						$(this).css("display", "none");
					})
				) //}
			)
		); //}

		// Playback controls
		this.create_playback_controls();

		// Custom settings
		if (this.additional_options.length > 0) {
			var section_label_references = [ help_custom_div , help_custom_div ];
			var section_default = "Other Settings";
			var sections = {};
			var default_set = false;

			// Loop over all options
			for (var i = 0; i < this.additional_options.length; ++i) {
				// Section label
				var s = ("section" in this.additional_options[i] ? this.additional_options[i]["section"] : section_default);
				var reference;
				if (!(s in sections)) {
					// Create a new label (ensure the default is always last)
					section_label_references[(s == section_default ? 0 : 1)].after(
						(reference = this.D("MPHelpLabelDiv"))
						.html(s)
					);
					reference.after(
						(sections[s] = this.D())
					);
					if (s == section_default) {
						default_set = true;
						section_label_references[0] = sections[s];
					}
					else {
						section_label_references[1] = sections[s];
						if (!default_set) section_label_references[0] = sections[s];
					}
				}
				reference = sections[s];

				// Value enumeration: find the current value/label
				var v_id = 0;
				if ("values" in this.additional_options[i] && "current" in this.additional_options[i]) {
					for (var j = 0; j < this.additional_options[i]["values"].length; ++j) {
						if (this.additional_options[i]["current"] == this.additional_options[i]["values"][j]) {
							v_id = j;
							break;
						}
					}
				}
				var content = null;
				if ("descr" in this.additional_options[i]) {
					(content = this.E("a", "MPHelpModeLink"))
					.html(this.additional_options[i]["descr"][v_id])
					.on("click." + this.namespace, {media_player: this, custom_data: this.additional_options[i]}, this.on_custom_option_click)
					.on("mousedown", this.cancel_event);
				}
				// Custom HTML
				else if ("html" in this.additional_options[i]) {
					content = this.D("MPHelpModeNonLink").html(this.additional_options[i]["html"]);
				}
				// Setup DOM
				reference.append(
					(sections[s] = this.D("MPHelpSectionDiv"))
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

		// Final settings
		for (var i = 0; i < this.title_buttons.length; ++i) {
			this.title_buttons[i].on("mousedown", this.cancel_event);
			this.title_buttons[i].on("click." + this.namespace, {media_player: this, control_id: i}, this.on_main_control_click);
		}
		for (var i = 0; i < this.resizing_texts.length; ++i) {
			this.resizing_texts[i].css("display", "none");
		}
		this.update_player_theme_name({media_player: this});
		this.set_volume(this.volume);
		this.audio[0].volume = this.volume;
		this.reposition();

		// Done
		this.created = true;

		// Animation
		if (this.animate_open_time > 0) {
			this.mp_container_main
			.stop(true)
			.animate({
				"opacity": 1.0
			},{
				duration: this.animate_open_time * 1000,
				complete: function () { $(this).css("opacity", ""); }
			});
		}
		else {
			this.mp_container_main.css("opacity", "");
		}
	},
	destroy: function (full) {
		if (this.animate_close_time > 0) {
			var self = this;
			this.mp_container_main
			.stop(true)
			.animate({
				"opacity": 0.0
			},{
				duration: this.animate_close_time * 1000,
				complete: function () {
					self.mp_container_main.css("opacity", "");
					self.full_destroy(full);
				}
			});

			this.theatre_exit({duration: this.animate_close_time});
		}
		else {
			this.mp_container_main.css("opacity", "");
			this.full_destroy(full);
		}
	},

	focus: function () {
		// Min/max
		var open = false;
		this.playlist_container.css("display", (open ? "none" : ""));
		this.top_container.css("display", (open ? "none" : ""));

		// Close overlays
		this.downloads_container.css("display", "none");
		for (var i = 0; i < this.help_container.length; ++i) {
			this.help_container[i].css("display", "none");
		}

		// On screen
		this.reposition();
	},

	play: function () {
		if (this.current_media !== null) {
			this.playback_interference_callback(1);

			if (this.current_media.type == "image-audio") {
				this.audio[0].play();
			}
			else if (this.current_media.type == "ve") {
				this.current_media.vplayer.play();
			}
			else if (this.current_media.type == "youtube-video") {
				if (this.ytvideo_player != null) {
					if (this.ytvideo_unsafe) {
						_unsafe_exec(function (data) {
							if (data.media_player.ytvideo_player.playVideo) data.media_player.ytvideo_player.playVideo();
						}, {media_player: this});
					}
					else {
						if (this.ytvideo_player.playVideo) this.ytvideo_player.playVideo();
					}
				}

				// Timer
				if (this.current_media.progress_timer === null) {
					var self = this;
					var playlist_item = this.current_media;
					this.current_media.progress_timer = setInterval(function () {
						self.on_ytvideo_time_update(playlist_item, self);
					}, 500);
				}
			}
			else if (this.current_media.type == "vimeo-video") {
				if (this.vimeovideo_player != null) {
					this.vimeovideo_player_paused = false;
					if (this.vimeovideo_unsafe) {
						_unsafe_exec(function (data) {
							data.media_player.vimeovideo_player.api_call("play");
						}, {media_player: this});
					}
					else {
						try {
							this.vimeovideo_player.api_call("play");
						}
						catch (e) {}
					}
				}
			}
			else if (this.current_media.type == "soundcloud-sound") {
				if (this.soundcloud_player != null) {
					this.soundcloud_player_paused = false;
					if (this.soundcloud_unsafe) {
						_unsafe_exec(function (data) {
							data.media_player.soundcloud_player.api_call("play");
						}, {media_player: this});
					}
					else {
						try {
							this.soundcloud_player.api_call("play");
						}
						catch (e) {}
					}
				}
			}
			else {
				console.log(this.current_media.type);
			}
		}
		this.update_playing_status();
	},
	pause: function () {
		if (this.current_media !== null) {
			this.playback_interference_callback(1);

			if (this.current_media.type == "image-audio") {
				this.audio[0].pause();
			}
			else if (this.current_media.type == "ve") {
				this.current_media.vplayer.pause();
			}
			else if (this.current_media.type == "youtube-video") {
				if (this.ytvideo_player != null) {
					if (this.ytvideo_unsafe) {
						_unsafe_exec(function (data) {
							if (data.media_player.ytvideo_player.pauseVideo) data.media_player.ytvideo_player.pauseVideo();
						}, {media_player: this});
					}
					else {
						if (this.ytvideo_player.pauseVideo) this.ytvideo_player.pauseVideo();
					}
				}

				// Timer
				if (this.current_media.progress_timer !== null) {
					clearInterval(this.current_media.progress_timer);
					this.current_media.progress_timer = null;
				}
				this.on_ytvideo_time_update(this.current_media, this);
			}
			else if (this.current_media.type == "vimeo-video") {
				if (this.vimeovideo_player != null) {
					this.vimeovideo_player_paused = true;
					if (this.vimeovideo_unsafe) {
						_unsafe_exec(function (data) {
							data.media_player.vimeovideo_player.api_call("pause");
						}, {media_player: this});
					}
					else {
						try {
							this.vimeovideo_player.api_call("pause");
						}
						catch (e) {}
					}
				}
			}
			else if (this.current_media.type == "soundcloud-sound") {
				if (this.soundcloud_player != null) {
					this.soundcloud_player_paused = true;
					if (this.soundcloud_unsafe) {
						_unsafe_exec(function (data) {
							data.media_player.soundcloud_player.api_call("pause");
						}, {media_player: this});
					}
					else {
						try {
							this.soundcloud_player.api_call("pause");
						}
						catch (e) {}
					}
				}
			}
			else {
				console.log(this.current_media.type);
			}
		}
		this.update_playing_status();
	},
	is_paused: function () {
		if (this.current_media !== null) {
			if (this.current_media.type == "image-audio") {
				return this.audio[0].paused;
			}
			else if (this.current_media.type == "ve") {
				return this.current_media.vplayer.is_paused();
			}
			else if (this.current_media.type == "youtube-video") {
				if (this.ytvideo_player != null) {
					if (this.ytvideo_unsafe) {
						return _unsafe_exec(function (data) {
							return (
								data.media_player.ytvideo_player.getPlayerState &&
								(data.media_player.ytvideo_player.getPlayerState() != window.YT.PlayerState.BUFFERING &&
								data.media_player.ytvideo_player.getPlayerState() != window.YT.PlayerState.PLAYING)
							);
						}, { media_player: this }) || false;
					}
					else {
						return (
							this.ytvideo_player.getPlayerState &&
							(this.ytvideo_player.getPlayerState() != window.YT.PlayerState.BUFFERING &&
							this.ytvideo_player.getPlayerState() != window.YT.PlayerState.PLAYING)
						);
					}
				}
			}
			else if (this.current_media.type == "vimeo-video") {
				if (this.vimeovideo_player != null) {
					// Query
					if (this.vimeovideo_unsafe) {
						_unsafe_exec(function (data) {
							data.media_player.vimeovideo_player.api_call("paused", function (value) {
								data.media_player.vimeovideo_player_paused = value;
							});
						}, {media_player: this});
					}
					else {
						var self = this;
						try {
							this.vimeovideo_player.api_call("paused", function (value) {
								self.vimeovideo_player_paused = value;
							});
						}
						catch (e) {}
					}
					// Return
					return this.vimeovideo_player_paused;
				}
			}
			else if (this.current_media.type == "soundcloud-sound") {
				if (this.soundcloud_player != null) {
					// TODO
					return this.soundcloud_player_paused;
				}
			}
			else {
				console.log(this.current_media.type);
			}
		}
		return true;
	},
	get_position: function (seconds) {
		if (this.current_media !== null) {
			return this.current_media.position;
		}
		return 0.0;
	},
	seek_to: function (seconds, dont_seek_in_media, dragging) {
		if (this.current_media !== null) {
			// HTML/adjustments
			if (seconds !== null) {
				if (seconds < 0.0) seconds = 0.0;
				else if (seconds > this.current_media.duration) seconds = this.current_media.duration;
				this.current_media.position = seconds;
			}
			if (this.current_media.duration != 0.0) {
				this.seek_time_current_label.html(this.duration_to_string(this.current_media.position));
				this.seek_bar_mover.width((this.current_media.position / this.current_media.duration) * (this.seek_bar_container.outerWidth() - this.seek_bar.outerWidth()));
			}

			if (!dont_seek_in_media) {
				this.playback_interference_callback(2);

				if (this.current_media.type == "image-audio") {
					if (seconds !== null) {
						if (seconds < 0.0) seconds = 0.0;
						else if (seconds > this.current_media.duration) seconds = this.current_media.duration;
						this.current_media.position = seconds;
					}

					this.audio[0].currentTime = this.current_media.position;
				}
				else if (this.current_media.type == "ve") {
					if (seconds !== null) {
						if (seconds < 0.0) seconds = 0.0;
						else if (seconds > this.current_media.duration) seconds = this.current_media.duration;
						this.current_media.position = seconds;
					}

					this.current_media.vplayer.seek(this.current_media.position);
				}
				else if (this.current_media.type == "youtube-video") {
					if (this.ytvideo_player != null) {
						if (this.ytvideo_unsafe) {
							_unsafe_exec(function (data) {
								if (data.media_player.ytvideo_player.seekTo) data.media_player.ytvideo_player.seekTo(data.media_player.current_media.position, data.arg2);
							}, {media_player: this, arg2: (dragging ? false : true)});
						}
						else {
							if (this.ytvideo_player.seekTo) this.ytvideo_player.seekTo(this.current_media.position, dragging ? false : true);
						}
					}
				}
				else if (this.current_media.type == "vimeo-video") {
					if (this.vimeovideo_player != null) {
						if (this.vimeovideo_unsafe) {
							_unsafe_exec(function (data) {
								data.media_player.vimeovideo_player.api_call("seekTo", data.media_player.current_media.position);
							}, {media_player: this});
						}
						else {
							try {
								this.vimeovideo_player.api_call("seekTo", this.current_media.position);
							}
							catch (e) {}
						}
					}
				}
				else if (this.current_media.type == "soundcloud-sound") {
					if (this.soundcloud_player != null) {
						this.soundcloud_player_paused = true;
						if (this.soundcloud_unsafe) {
							_unsafe_exec(function (data) {
								data.media_player.soundcloud_player.api_call("seekTo", data.media_player.current_media.position * 1000);
							}, {media_player: this});
						}
						else {
							try {
								this.soundcloud_player.api_call("seekTo", this.current_media.position * 1000);
							}
							catch (e) {}
						}
					}
				}
				else {
					console.log(this.current_media.type);
				}
			}
		}
	},
	get_volume: function () {
		// Value
		return this.volume;
	},
	set_volume: function (volume) {
		// Value
		if (volume < 0.0) volume = 0.0;
		else if (volume > 1.0) volume = 1.0;
		this.volume = volume;

		// HTML
		var vol_str, vol_col;
		vol_str = Math.round(this.volume * 100) + "%";
		vol_col = this.get_volume_color(this.volume);
		this.volume_label.html(vol_str);
		this.volume_bar.css("height", vol_str);
		this.volume_bar.css("background", "rgb(" + vol_col[0] + "," + vol_col[1] + "," + vol_col[2] + ")");

		// Media
		if (this.current_media !== null) {
			if (this.current_media.type == "image-audio") {
				// Set volume
				this.audio[0].volume = this.volume;
			}
			else if (this.current_media.type == "ve") {
				// Set volume
				this.current_media.vplayer.set_volume(this.volume);
			}
			else if (this.current_media.type == "youtube-video") {
				// Set volume
				if (this.ytvideo_player != null) {
					if (this.ytvideo_unsafe) {
						_unsafe_exec(function (data) {
							if (data.media_player.ytvideo_player.setVolume) data.media_player.ytvideo_player.setVolume(data.vol);
						}, {media_player: this, vol: this.volume * 100.0});
					}
					else {
						if (this.ytvideo_player.setVolume) this.ytvideo_player.setVolume(this.volume * 100.0);
					}
				}
			}
			else if (this.current_media.type == "vimeo-video") {
				// Set volume
				if (this.vimeovideo_player != null) {
					if (this.vimeovideo_unsafe) {
						_unsafe_exec(function (data) {
							data.media_player.vimeovideo_player.api_call("setVolume", data.media_player.volume);
						}, {media_player: this});
					}
					else {
						try {
							this.vimeovideo_player.api_call("setVolume", this.volume);
						}
						catch (e) {}
					}
				}
			}
			else if (this.current_media.type == "soundcloud-sound") {
				if (this.soundcloud_player != null) {
					this.soundcloud_player_paused = true;
					if (this.soundcloud_unsafe) {
						_unsafe_exec(function (data) {
							data.media_player.soundcloud_player.api_call("setVolume", data.media_player.volume * 100);
						}, {media_player: this});
					}
					else {
						try {
							this.soundcloud_player.api_call("setVolume", this.volume * 100);
						}
						catch (e) {}
					}
				}
			}
			else {
				console.log(this.current_media.type);
			}
		}
	},
	get_duration: function (duration) {
		if (this.current_media !== null) {
			// Update duration
			return this.current_media.duration;
		}
		return 0.0;
	},
	set_duration: function (duration) {
		var length_str = this.duration_to_string(duration);
		if (this.current_media !== null) {
			// Update duration
			this.current_media.duration = duration;
			this.current_media.info_container.html(length_str);
		}

		// html
		this.seek_time_end_label.html(length_str);
	},
	deselect: function (old_type) {
		if (this.current_media !== null) {
			this.playback_interference_callback(4);

			this.unC(this.current_media.playlist_item, "MPPlaylistItemActive");

			// Image target
			this.video_mask.removeAttr("href");

			if (this.current_media.type == "youtube-video") {
				// Timer
				if (this.current_media.progress_timer !== null) {
					clearInterval(this.current_media.progress_timer);
					this.current_media.progress_timer = null;
				}
			}
			else if (this.current_media.type == "ve") {
				this.current_media.vplayer.remove_html().clear_listeners();
				this.current_media.html_container = null;
				this.video_container.html("");
			}

			if (this.current_media.type !== old_type) {
				// Stop
				this.stop();

				this.title.html(this.title_default);

				if (this.current_media.type == "image-audio") {
					this.image.css("display", "none");
					this.image.removeAttr("src");
					this.no_image.css("display", "");
					this.current_media.image_size = [0,0];
				}
				else if (this.current_media.type == "youtube-video") {
					this.ytvideo_player = null;
					this.video_container.html("");
				}
				else if (this.current_media.type == "vimeo-video") {
					this.vimeovideo_player.destructor();
					this.vimeovideo_player = null;
					this.vimeovideo_player_paused = true;
					this.video_container.html("");
				}
				else if (this.current_media.type == "soundcloud-sound") {
					this.soundcloud_player.destructor();
					this.soundcloud_player = null;
					this.soundcloud_player_paused = true;
					this.video_container.html("");
				}
				else if (this.current_media.type == "ve") {
					// Taken care of elsewhere
				}
				else {
					console.log(this.current_media.type);
				}

				// Global
				for (var i = 0; i < this.playback_controls.length; ++i) {
					for (var j = 0; j < this.playback_controls[i].length; ++j) {
						this.C(this.playback_controls[i][j], "MPControlLinkDisabled");
					}
				}
				this.seek_time_current_label.html(this.duration_to_string(0.0));
				this.seek_time_end_label.html(this.duration_to_string(0.0));
				this.current_media = null;
				this.set_loaded();

				// Title
				this.title.html(this.title_default);

				// Index display
				this.update_index_display(-1, this.playlist.length, true);
			}
		}
	},
	stop: function () {
		if (this.current_media !== null) {
			if (!this.is_paused()) this.pause();
			this.seek_to(0.0);

			this.update_playing_status();
		}
	},
	start: function (index) {
		// Stop old sound
		this.deselect(this.playlist[index].type);

		// Controls
		for (var i = 0; i < this.playback_controls.length; ++i) {
			for (var j = 0; j < this.playback_controls[i].length; ++j) {
				this.unC(this.playback_controls[i][j], "MPControlLinkDisabled");
			}
		}

		// Select
		this.current_media = this.playlist[index];

		this.C(this.current_media.playlist_item, "MPPlaylistItemActive");
		this.seek_time_current_label.html(this.duration_to_string(this.current_media.position));
		this.seek_time_end_label.html(this.duration_to_string(this.current_media.duration));

		// Scroll to
		this.scroll_to(index);
		// Title, etc.
		this.title.html(this.current_media.title);
		this.current_media.loaded_offset = 0.0;
		this.current_media.loaded_percent = 0.0;
		// Image target
		this.video_mask.attr("href", this.current_media.mask_click_target);

		if (this.current_media.type == "image-audio") {
			// Play this sound
			this.audio.attr("src", this.current_media.audio_blob_url);
			this.audio[0].play();

			// Image
			this.no_image.css("display", "none");
			this.image.css("display", "none");
			this.image.removeAttr("src");
			this.image.attr("src", this.current_media.image_url);

			this.current_media.loaded_percent = 1.0;
		}
		else if (this.current_media.type == "ve") {
			var self = this;
			var playlist_item = this.current_media;

			// Clear temp
			if (this.current_media.temp_container != null) {
				this.current_media.vplayer.remove_html().clear_listeners();
				this.current_media.temp_container.remove();
				this.current_media.temp_container = null;
			}

			// Embed the player
			this.video_container.html("");
			this.current_media.vplayer.set_volume(this.volume);
			this.current_media.vplayer
			.on("load", function () { self.on_ve_load(playlist_item); })
			.on("error", function () { self.on_ve_error(playlist_item); })
			.on("play", function () { self.on_ve_play(playlist_item); })
			.on("pause", function () { self.on_ve_pause(playlist_item); })
			.on("end", function () { self.on_ve_end(playlist_item); })
			.on("timeupdate", function (data) { self.on_ve_timeupdate(playlist_item, data); })
			.create_html(this.video_container[0]);

			this.current_media.loaded_percent = 1.0;
		}
		else if (this.current_media.type == "youtube-video") {
			// Old player
			if (this.ytvideo_player != null && this.ytvideo_html5) {
				var params = {
					mediaContentUrl: "http://www.youtube.com/v/" + this.current_media.vid_id + "?version=3",
					startSeconds: this.current_media.start,
					//endSeconds:Number,
					suggestedQuality: this.ytvideo_qualities[this.ytvideo_quality_index]
				};

				var okay = false;
				if (this.ytvideo_unsafe) {
					okay = _unsafe_exec(function (data) {
						if (data.media_player.ytvideo_player.cueVideoByUrl) {
							data.media_player.ytvideo_player.cueVideoByUrl(data.params);
							return true;
						}
						return false;
					}, { media_player: this, "params": params });
				}
				else {
					// not using loadVideoByUrl because "this.play" resets the timer
					if (this.ytvideo_player.cueVideoByUrl) {
						okay = true;
						this.ytvideo_player.cueVideoByUrl(params);
					}
				}
				if (okay) this.play();
				else this.ytvideo_player = null;
			}
			else {
				this.ytvideo_player = null;
			}
			// Fresh player
			if (this.ytvideo_player == null) {
				var fn = function (data) {
					try {
						var events = {
							"onReady": function (event) { data.media_player.on_ytvideo_ready(event, data.media_player); },
							"onStateChange": function (event) { data.media_player.on_ytvideo_state_change(event, data.media_player); },
							"onPlaybackQualityChange": function (event) { data.media_player.on_ytvideo_playback_quality_change(event, data.media_player); },
							"onPlaybackRateChange": function (event) { data.media_player.on_ytvideo_playback_rate_change(event, data.media_player); },
							"onError": function (event) { data.media_player.on_ytvideo_error(event, data.media_player); },
							"onApiChange": function (event) { data.media_player.on_ytvideo_api_change(event, data.media_player); }
						};
						var playerVars = {
							controls: 0,
							showinfo: 0,
							modestbranding: 1,
							//wmode: "opaque",
							html5: 1,
							disablekb: 1,
							enablejsapi: 1,
							rel: 0,
							showinfo: 0,
							origin: window.location.href.toString(),
							start: data.media_player.current_media.start,
							iv_load_policy: 3,
							loop: 0
						};

						data.media_player.ytvideo_player = new data.Player(
							data.vid_container,
							{
								width: data.size[0],
								height: data.size[1],
								videoId: data.media_player.current_media.vid_id,
								"playerVars": playerVars,
								"events": events
							}
						);
						data.media_player.ytvideo_player.mp_iframe = data.media_player.video_container.find("iframe");
						data.media_player.ytvideo_player.media_player = data.media_player;
					}
					catch (e) {
						data.media_player.ytvideo_player = null;
						console.log(e);
					}
				}

				// Params
				var vid_container;
				var div_id = "MediaPlayer_LFfiowjdiofjagh8fwe";
				this.video_container.html((vid_container = this.D().attr("id", div_id)));

				var params = {
					"media_player": this,
					"size": [ this.video_container.outerWidth() , this.video_container.outerHeight() ],
					"div_id": div_id,
					"vid_container": vid_container[0],
					"Player": window.YT.Player
				};

				this.ytvideo_html5 = true;

				// Call
				if (this.ytvideo_unsafe) {
					try {
						_unsafe_exec(fn, params);
					}
					catch (e) {
						console.log("ytvideo_unsafe");
						console.log(e);
					}
				}
				else {
					fn(params);
				}
			}

			// Image target
			this.video_mask.attr("href", this.current_media.image_url);
		}
		else if (this.current_media.type == "vimeo-video") {
			// Old player
			if (this.vimeovideo_player !== null) {
				this.vimeovideo_player.destructor();
				this.vimeovideo_player = null;
			}
			// Fresh player
			if (this.vimeovideo_player == null) {
				this.vimeovideo_player_paused = true;

				// Function
				var fn = function (data) {
					var events = {
						"ready": function() { data.self.set_volume(data.self.get_volume()); },
						"loadProgress": function (event) { data.self.on_vimeovideo_load_progress(event, data.self.vimeovideo_player); },
						"playProgress": function (event) { data.self.on_vimeovideo_play_progress(event, data.self.vimeovideo_player); },
						"play": function (event) { data.self.on_vimeovideo_play({}, data.self.vimeovideo_player); },
						"pause": function (event) { data.self.on_vimeovideo_pause({}, data.self.vimeovideo_player); },
						"finish": function (event) { data.self.on_vimeovideo_finish({}, data.self.vimeovideo_player); },
						"seek": function (event) { data.self.on_vimeovideo_seek(event, data.self.vimeovideo_player); }
					};

					var iframe;
					data.self.video_container.html(
						(iframe = data.self.E("iframe"))
						.attr("frameborder", "0")
						.attr("width", data.size[0])
						.attr("height", data.size[1])
						.attr("src",
							"//player.vimeo.com/video/" + (data.self.current_media.vid_id) + "?api=1" +
							"&title=0&byline=0&portrait=0&autoplay=1" + (data.self.current_media.start == 0 ? "" : "&t=" + data.self.current_media.start)
						)
					);
					data.self.vimeovideo_player = new data.VimeoManager(iframe[0]);

					for (var e in events) {
						data.self.vimeovideo_player.add_event(e, events[e]);
					}
				};

				// Params
				var params = {
					size: [ this.video_container.outerWidth() , this.video_container.outerHeight() ],
					self: this,
					"VimeoManager": VimeoManager
				}

				// 2 types of execution
				if (this.vimeovideo_unsafe) {
					try {
						_unsafe_exec(fn, params);
					}
					catch (e) {
						console.log("vimeovideo_unsafe");
						console.log(e);
					}
				}
				else {
					fn(params);
				}
			}
		}
		else if (this.current_media.type == "soundcloud-sound") {
			this.soundcloud_player_paused = true;

			// Clear old
			if (this.soundcloud_player !== null) {
				this.soundcloud_player.destructor();
				this.soundcloud_player = null;
				//this.video_container.html("");
			}

			// Create new
			if (this.soundcloud_player === null) {
				var fn = function (data) {
					var events = {
						"ready": function () { data.self.on_soundcloud_sound_ready(data.self.soundcloud_player); },
						"loadProgres": function (event) { data.self.on_soundcloud_sound_load_progress(event, data.self.soundcloud_player); },
						"playProgress": function (event) { data.self.on_soundcloud_sound_play_progress(event, data.self.soundcloud_player); },
						"play": function (event) { data.self.on_soundcloud_sound_play(event, data.self.soundcloud_player); },
						"pause": function (event) { data.self.on_soundcloud_sound_pause(event, data.self.soundcloud_player); },
						"finish": function (event) { data.self.on_soundcloud_sound_finish(event, data.self.soundcloud_player); },
						"seek": function (event) { data.self.on_soundcloud_sound_seek(event, data.self.soundcloud_player); }
					};

					data.self.soundcloud_player = new data.SoundcloudManager(data.iframe[0]);

					for (var e in events) {
						data.self.soundcloud_player.add_event(e, events[e]);
					}
				};

				this.video_container.html(this.current_media.embed_code);
				var iframe = this.video_container.find("iframe");
				if (iframe.length > 0) {
					iframe = $(iframe[0]);
					iframe.attr("width", "100%").attr("height", "100%");

					params = {
						self: this,
						iframe: iframe,
						SoundcloudManager: SoundcloudManager
					};

					if (params.SoundcloudManager) {
						// 2 types of execution
						if (this.soundcloud_unsafe) {
							try {
								_unsafe_exec(fn, params);
							}
							catch (e) {
								console.log("soundcloud_unsafe");
								console.log(e);
							}
						}
						else {
							fn(params);
						}
					}
				}
			}
		}
		else {
			console.log(this.current_media.type);
		}

		// Current sound
		this.current_media.position = 0.0;
		this.seek_to(this.current_media.position, true);
		this.set_loaded();

		// Index display
		this.update_index_display(index, this.playlist.length, true);
	},
	scroll_to: function (index) {
		var a, b;
		if (
			(a = this.playlist[index].playlist_item.offset().top) < (b = this.playlist_container.offset().top) ||
			(a = this.playlist[index].playlist_item.offset().top + this.playlist[index].playlist_item.outerHeight()) > (b = this.playlist_container.offset().top + this.playlist_container.outerHeight())
		) {
			this.playlist_container.scrollTop(this.playlist_container.scrollTop() + (a - b));
		}
	},
	next: function (follow_policy) {
		this.playback_interference_callback(8);

		// Next
		if (this.playlist_randomize && follow_policy) {
			// Random
			var i = 0;
			if (this.playlist.length > 1) {
				i = Math.floor(Math.random() * (this.playlist.length - 1));
			}
			if (i == this.current_media.index) {
				i = (i + 1) % this.playlist.length;
			}
			this.start(i);
		}
		else if (!follow_policy || this.playlist_loop || this.current_media.index < this.playlist.length - 1) {
			// Next
			this.start((this.current_media.index + 1) % this.playlist.length);
		}
	},
	previous: function () {
		this.playback_interference_callback(8);

		// Previous
		if (this.playlist_randomize) {
			// Random
			var i = 0;
			if (this.playlist.length > 1) {
				i = Math.floor(Math.random() * (this.playlist.length - 1));
			}
			if (i == this.current_media.index) {
				i = (i + 1) % this.playlist.length;
			}
			this.start(i);
		}
		else {
			// Previous
			this.start((this.current_media.index - 1 + this.playlist.length) % this.playlist.length);
		}
	},
	set_loaded: function (offset, percent) {
		if (this.current_media !== null) {
			if (offset !== undefined) {
				if (offset < 0.0) offset = 0.0;
				else if (offset > 1.0) offset = 1.0;
				this.current_media.loaded_offset = offset;
				if (percent === undefined) percent = this.get_loaded_percent();
			}
			else {
				offset = this.get_loaded_offset();
			}
			if (percent !== undefined) {
				if (percent < 0.0) percent = 0.0;
				else if (percent > 1.0 - offset) percent = 1.0 - offset;
				this.current_media.loaded_percent = percent;
			}
			else {
				percent = this.get_loaded_percent();
			}
		}
		else {
			percent = 0.0;
			offset = 0.0;
		}

		// Update html
		this.load_percent_bar_mover.width((offset * 100) + "%");
		this.load_percent_bar.width((percent * 100) + "%");
	},
	get_loaded_offset: function () {
		if (this.current_media !== null) {
			return this.current_media.loaded_offset;
		}
		return 0.0;
	},
	get_loaded_percent: function () {
		if (this.current_media !== null) {
			return this.current_media.loaded_percent;
		}
		return 0.0;
	},
	remove: function (index) {
		// Stop
		if (this.current_media != null && this.current_media.index == index) this.deselect();

		if (this.playlist[index].type == "image-audio") {
			// Remove temp audio
			if (this.playlist[index].temp_audio) {
				this.playlist[index].temp_audio[0].pause();
				this.playlist[index].temp_audio.removeAttr("src").remove();
				this.playlist[index].temp_audio = null;
			}

			// Revoke url
			(window.webkitURL || window.URL).revokeObjectURL(this.playlist[index].audio_blob_url);
			if (this.playlist[index].image_blob_url != null) {
				(window.webkitURL || window.URL).revokeObjectURL(this.playlist[index].image_blob_url);
			}
		}
		else if (this.playlist[index].type == "ve") {
			// Remove elements
			if (this.playlist[index].temp_container != null) {
				this.playlist[index].temp_container.remove();
			}
			if (this.playlist[index].vplayer != null) {
				this.playlist[index].vplayer.reset();
			}

			// Revoke url
			if (this.playlist[index].image_blob_url != null) {
				(window.webkitURL || window.URL).revokeObjectURL(this.playlist[index].image_blob_url);
			}
		}
		else if (this.playlist[index].type == "youtube-video" || this.playlist[index].type == "vimeo-video" || this.playlist[index].type == "soundcloud-sound") {
			// Nothing to do
		}
		else {
			console.log(this.playlist[index].type);
		}

		// Remove html
		this.playlist[index].playlist_item.remove();

		// Remove from list
		this.playlist.splice(index, 1);

		// Update indices
		for (var i = 0; i < this.playlist.length; ++i) {
			this.playlist[i].index = i;
		}

		// Index display
		this.update_index_display((this.current_media != null ? this.current_media.index : -1), this.playlist.length, true);
	},
	playlist_count: function () {
		return this.playlist.length;
	},
	playlist_current: function () {
		if (this.current_media !== null) {
			return this.current_media.index;
		}
		return -1;
	},

	set_async_state: function (enabled, steps, delay) {
		this.videcode_async = enabled;
		this.videcode_steps = steps;
		this.videcode_delay = delay;
	},
	set_load_callbacks: function (load_callbacks) {
		this.load_callbacks = [];
		if (load_callbacks) {
			for (var i = 0; i < load_callbacks.length; ++i) {
				this.load_callbacks.push(load_callbacks[i]);
			}
		}
	},

	is_maximized: function () {
		return (this.playlist_container.css("display") != "none");
	},
	maximize: function () {
		// Min/max
		this.playlist_container.css("display", "");
		this.top_container.css("display", "");

		// Close overlays
		this.downloads_container.css("display", "none");
		for (var i = 0; i < this.help_container.length; ++i) {
			this.help_container[i].css("display", "none");
		}

		// HTML
		this.title_buttons[this.title_buttons.length - 2].html("[&#x2012;]");

		// On screen
		this.reposition();
		this.update_image_scale();
	},
	minimize: function () {
		// Can't be in theatre mode
		if (this.theatre_mode) return;

		// Min/max
		this.playlist_container.css("display", "none");
		this.top_container.css("display", "none");

		// Close overlays
		this.downloads_container.css("display", "none");
		for (var i = 0; i < this.help_container.length; ++i) {
			this.help_container[i].css("display", "none");
		}

		// HTML
		this.title_buttons[this.title_buttons.length - 2].html("[+]");

		// On screen
		this.reposition();
	},

	is_in_theatre: function () {
		return this.theatre_mode;
	},
	theatre_enter: function (params) {
		params = params || {};
		this.theatre_mode_target = true;
		if (!this.theatre_mode) {
			this.theatre_mode = true;

			// Collect vars
			this.theatre_position.right = this.theatre_position.init_right = this.position_offset[0];
			this.theatre_position.bottom = this.theatre_position.init_bottom = this.position_offset[1];

			this.theatre_position.width = this.theatre_position.init_width = this.player_width * this.scale_factor;
			this.theatre_position.image_height = this.image_height * this.scale_factor;
			this.theatre_position.playlist_height = this.playlist_height * this.scale_factor;
			this.theatre_position.playlist_height_target = 0;//this.playlist_height_default * this.scale_factor;
			this.theatre_position.init_image_height = [ this.theatre_position.image_height , this.theatre_position.image_height ];
			this.theatre_position.init_playlist_height = [ this.theatre_position.playlist_height , this.theatre_position.playlist_height ];

			// Maximize
			if (!this.is_maximized()) {
				this.maximize();
				this.theatre_position.init_image_height[0] = 0;
				this.theatre_position.init_playlist_height[0] = 0;
			}
			this.theatre_position.image_height_target_offset = this.mp_container_main.outerHeight() - this.theatre_position.image_height - this.theatre_position.playlist_height;

			// Animate
			var self = this;
			this.theatre_animation_vars.percent = 0.0;
			this.theatre_animation_vars.tick = new Date().getTime();
			this.theatre_animation_vars.total = ("duration" in params ? params.duration : this.theatre_mode_animate_time);
			this.theatre_animation_vars.offset = ("offset" in params ? params.offset : this.theatre_offset);
			this.theatre_animation_vars.dim = ("dim" in params ? params.dim : this.theatre_dim);
			this.theatre_animation_vars.callback_done = ("done" in params ? params.done : null);
			$("body").append(
				(this.theatre_animation_vars.dim_div = this.D("MPTheatreDim"))
				.css({
					"opacity": "0",
					"background-color": ("dim_color" in params ? params.dim_color : this.theatre_dim_color)
				})
			);
			this.theatre_reposition();

			this.theatre_animation_timer = setInterval(function () {
				self.theatre_animate();
			}, 20);

			// Other vars
			this.theatre_vars = {
				close_on_finish: params.close_on_finish || false,
				close_on_finish_interference: params.close_on_finish_interference || false
			};

			// Params
			var about = this.mp_container_main.find(".MPMainButtonAboutTheatre");
			if ("no_info" in params && params.no_info) {
				this.C(about.remove("span"), "MPTheatreHidden");
			}
			else {
				this.unC(about.remove("span"), "MPTheatreHidden");
			}
			if ("info_text" in params) {
				about.prepend(
					this.E("span").html(params.info_text)
				);
			}
			this.C(this.mp_container_main, "MPTheatreEnabled");
		}
	},
	theatre_exit: function (params) {
		params = params || {};
		if (this.theatre_mode) {
			// Exit
			this.theatre_mode_target = false;
			// Animate
			if (this.theatre_animation_timer === null) {
				var self = this;
				this.theatre_animation_vars.percent = 1.0;
				this.theatre_animation_vars.tick = new Date().getTime();
				this.theatre_animation_vars.total = ("duration" in params ? params.duration : this.theatre_mode_animate_time);
				this.theatre_animation_timer = setInterval(function () {
					self.theatre_animate();
				}, 20);
			}
		}
	},
	theatre_close: function () {
		if (this.theatre_mode) {
			this.unC(this.mp_container_main, "MPTheatreEnabled");
			this.theatre_animation_vars.dim_div.remove();
			this.theatre_hide_controls_enabled = false;
			this.theatre_reset_controls_timer();
			this.unC(this.mp_container_main, "MPControlsForceHide");
			this.theatre_mode = false;
		}
	},
	theatre_animate: function () {
		// Time
		var tick = new Date().getTime();
		var time = (tick - this.theatre_animation_vars.tick) / 1000.0;
		this.theatre_animation_vars.tick = tick;

		// Percent update
		var stop = false;
		if (this.theatre_animation_vars.total > 0) {
			if (this.theatre_mode_target) {
				this.theatre_animation_vars.percent += (time / this.theatre_animation_vars.total);
				if (this.theatre_animation_vars.percent >= 1.0) {
					this.theatre_animation_vars.percent = 1.0;
					stop = true;
				}
			}
			else {
				this.theatre_animation_vars.percent -= (time / this.theatre_animation_vars.total);
				if (this.theatre_animation_vars.percent <= 0.0) {
					this.theatre_animation_vars.percent = 0.0;
					stop = true;
				}
			}
		}
		else {
			this.theatre_animation_vars.percent = (this.theatre_mode_target ? 1.0 : 0.0);
			stop = true;
		}

		// Animate
		this.theatre_animation_vars.dim_div.css("opacity", (this.theatre_animation_vars.dim * this.theatre_animation_vars.percent).toString());
		this.theatre_reposition(this.theatre_animation_vars.percent);

		// Stop timer
		if (stop) {
			clearInterval(this.theatre_animation_timer);
			this.theatre_animation_timer = null;
			if (this.theatre_mode_target) {
				// Callback
				if (this.theatre_animation_vars.callback_done !== null) this.theatre_animation_vars.callback_done();
				this.theatre_hide_controls_enabled = true;
				this.theatre_reset_controls_timer();
			}
			else {
				this.theatre_close();
			}
		}

	},
	theatre_reposition: function (percent) {
		if (percent === undefined) percent = this.theatre_animation_vars.percent;

		// Calculate
		var direction = (this.theatre_mode_target ? 0 : 1);
		var off2 = this.theatre_animation_vars.offset * 2;
		this.theatre_position.playlist_height = this.merge_values(this.theatre_position.init_playlist_height[direction], this.theatre_position.playlist_height_target, percent);
		var h_target = $(window).height() - off2 - this.theatre_position.image_height_target_offset - this.theatre_position.playlist_height;
		if (h_target < 0) h_target = 0;
		this.theatre_position.image_height = this.merge_values(this.theatre_position.init_image_height[direction], h_target, percent)
		this.theatre_position.width = this.merge_values(this.theatre_position.init_width, $(window).width() - off2, percent);
		this.theatre_position.right = this.merge_values(this.theatre_position.init_right, this.theatre_animation_vars.offset, percent);
		this.theatre_position.bottom = this.merge_values(this.theatre_position.init_bottom, this.theatre_animation_vars.offset, percent);

		// Size
		this.image_container.outerHeight(this.theatre_position.image_height);
		this.playlist_container.outerHeight(this.theatre_position.playlist_height);
		this.mp_container_main.outerWidth(this.theatre_position.width);
		this.mp_container_main.css({
			"right": this.theatre_position.right + "px",
			"bottom": this.theatre_position.bottom + "px",
		});

		this.update_image_scale();
		this.seek_to(null, true);
	},
	theatre_reset_controls_timer: function () {
		if (this.theatre_hide_controls_timer !== null) {
			clearTimeout(this.theatre_hide_controls_timer);
			this.theatre_hide_controls_timer = null;
		}

		if (this.theatre_hide_controls_enabled) {
			var self = this;
			this.theatre_hide_controls_timer = setTimeout(function () {
				self.on_theatre_mode_hide_controls_timeout();
			}, this.theatre_hide_controls_time * 1000);
		}
	},


	full_destroy: function (full) {
		// Playlist clear
		while (this.playlist.length > 0) {
			this.remove(0);
		}

		// Remove html
		if (this.mp_container_main != null) this.mp_container_main.remove();
		this.theatre_close();

		// Events
		$(window)
		.off("resize." + this.namespace);
		$(document)
		.off("mouseup." + this.namespace)
		.off("mousemove." + this.namespace);

		// Reset attributes
		this.nullify();

		// Not created
		this.created = false;

		// Full
		if (full) this.destructor();
	},
	nullify: function () {
		this.mp_container_main = null;
		this.mp_container = null;
		this.alert_container = null;
		this.title = null;
		this.image_container = null;
		this.image = null;
		this.no_image = null;
		this.audio = null;
		this.volume_bar = null;
		this.volume_label = null;
		this.volume_container = null;
		this.volume_bar_container = null;
		this.seek_time_start_label = null;
		this.seek_time_end_label = null;
		this.seek_time_current_label = null;
		this.seek_bar_container = null;
		this.seek_bar_mover = null;
		this.seek_bar = null;
		this.playlist_container = null;
		this.playback_controls = null;
		this.playback_controls_svg = null;
		this.playback_seek_indicator = null;
		this.playback_seek_indicator_container = null;
		this.help_container = null;
		this.help_container_inner1 = null;
		this.help_container_footer = null;
		this.content_container = null;
		this.top_container = null;
		this.footer_container = null;
		this.playback_control_container = null;
		this.player_theme_name = null;
		this.video_container = null;
		this.video_mask = null;
		this.loaded_status_count = null;
		this.loaded_status_container = null;

		this.ytvideo_player = null;
		if (this.vimeovideo_player !== null) {
			this.vimeovideo_player.destructor();
			this.vimeovideo_player = null;
		}
		if (this.soundcloud_player !== null) {
			this.soundcloud_player.destructor();
			this.soundcloud_player = null;
		}

		this.load_percent_bar_container = null;
		this.load_percent_bar_mover = null;
		this.load_percent_bar = null;
		this.resizing_container = null;
		this.resizing_controls = null;
		this.resizing_texts = null;
		this.playlist_index_container = null;
		this.playlist_index_text1 = null;
		this.playlist_index_text2 = null;
		this.downloads_container = null;
		this.downloads_ready_container = null;
		this.downloads_link = null;
		this.downloads_about = null;
		this.title_buttons = null;

		if (this.load_buffer_timer !== null) {
			clearTimeout(this.load_buffer_timer);
			this.load_buffer_timer = null;
		}

		if (this.playlist_index_timer !== null) {
			clearTimeout(this.playlist_index_timer);
			this.playlist_index_timer = null;
		}

		for (var i = 0; i < this.resize_timers.length; ++i) {
			if (this.resize_timers[i] !== null) {
				if (i == 2) {
					clearInterval(this.resize_timers[i]);
				}
				else {
					clearTimeout(this.resize_timers[i]);
				}
				this.resize_timers[i] = null;
			}
		}

		if (this.theatre_animation_timer !== null) {
			clearInterval(this.theatre_animation_timer);
			this.theatre_animation_timer = null;
		}
		this.theatre_mode = false;

		this.player_theme_value_updaters = null;
	},

	playback_interference_callback: function (type) {
		if (this.theatre_mode && (type != 1)) {
			// Theatre doesn't need to close now
			if (this.theatre_vars.close_on_finish && !this.theatre_vars.close_on_finish_interference) {
				this.theatre_vars.close_on_finish = false;
			}
		}
	},

	create_playback_controls: function () {
		this.playback_control_container.html("");
		this.playback_controls = [ [null] , [null] , [null,null] , [null] , [null] ];
		this.playback_controls_svg = null;
		if (this.use_svg) {
			this.playback_controls_svg = [ [null] , [null] , [null,null] , [null] , [null] ]

			for (var i = 0; i < this.playback_controls.length; ++i) {
				// Separator
				if (i > 0) this.playback_control_container.append(this.D("MPControlLinkSeparator"));

				for (var j = 0; j < this.playback_controls[i].length; ++j) {
					// Create SVG container
					this.playback_control_container.append(
						(this.playback_controls[i][j] = this.D("MPControlLinkSvgContainer", "MPControlLinkDisabled"))
					);
					if (j > 0) this.playback_controls[i][j].css("display", "none");

					var svg_finder;
					this.playback_controls[i][j].append((svg_finder = this.D("MPControlLinkSvg")));
					var w = svg_finder.outerWidth();
					var h = svg_finder.outerHeight();

					var svg_content = '';

					if (i == 0) {
						// Back
						svg_content += '<rect x="0.125" y="0" width="0.25" height="1" class="MPControlLinkSvgShapeColor"></rect>' +
										'<polygon points="0.875,0 0.875,1 0.375,0.5" class="MPControlLinkSvgShapeColor"></polygon>';
					}
					else if (i == 1) {
						// RW
						svg_content += '<polygon points="0.5,0 0.5,1 0.125,0.5" class="MPControlLinkSvgShapeColor"></polygon>' +
										'<polygon points="0.875,0 0.875,1 0.5,0.5" class="MPControlLinkSvgShapeColor"></polygon>';
					}
					else if (i == 2) {
						// Play/pause
						if (j == 1) {
							svg_content += '<rect x="0.125" y="0" width="0.25" height="1" class="MPControlLinkSvgShapeColor"></rect>' +
											'<rect x="0.625" y="0" width="0.25" height="1" class="MPControlLinkSvgShapeColor"></rect>';
						}
						else {
							svg_content += '<polygon points="0.25,0 0.25,1 0.75,0.5" class="MPControlLinkSvgShapeColor"></polygon>';
						}
					}
					else if (i == 3) {
						// FFW
						svg_content += '<polygon points="0.125,0 0.125,1 0.5,0.5" class="MPControlLinkSvgShapeColor"></polygon>' +
										'<polygon points="0.5,0 0.5,1 0.875,0.5" class="MPControlLinkSvgShapeColor"></polygon>';
					}
					else {
						// Next
						svg_content += '<rect x="0.625" y="0" width="0.25" height="1" class="MPControlLinkSvgShapeColor"></rect>' +
										'<polygon points="0.125,0 0.125,1 0.625,0.5" class="MPControlLinkSvgShapeColor"></polygon>';
					}

					svg_finder.html((this.playback_controls_svg[i][j] = $(
						'<svg xmlns="http://www.w3.org/2000/svg" version="1.1" style="width:' + w + 'px;height:' + h + 'px;">' +
							'<g transform="scale(' + w + ',' + h + ')" class="MPControlLinkSvgMainGroup">' +
								svg_content +
							'</g>' +
						'</svg>'
					)));
				}
			}
		}
		else {
			this.playback_controls_svg = null;
			var control_texts = [ ["|&lt;"] , ["&lt;&lt"] , ["&gt;","||"] , ["&gt;&gt;"] , ["&gt;|"] ];

			for (var i = 0; i < this.playback_controls.length; ++i) {
				if (i > 0) this.playback_control_container.append(this.D("MPControlLinkSeparator"));
				for (var j = 0; j < this.playback_controls[i].length; ++j) {
					this.playback_control_container.append(
						(this.playback_controls[i][j] = this.E("a", "MPControlLink", "MPControlLinkDisabled"))
						.html(control_texts[i][j])
					);
					if (j > 0) this.playback_controls[i][j].css("display", "none");
				}
			}
		}
		for (var i = 0; i < this.playback_controls.length; ++i) {
			for (var j = 0; j < this.playback_controls[i].length; ++j) {
				this.playback_controls[i][j].on("click." + this.namespace, {control_id: i, control_id2: j, media_player: this}, this.on_playback_control_click);
				this.playback_controls[i][j].on("mousedown", this.cancel_event);
			}
		}
	},

	get_audio_duration: function (audio) {
		try {
			var d = (isFinite(audio.duration) ? audio.duration : audio.buffered.end(0));
			return isFinite(d) ? d : 0;
		}
		catch (e) {
			console.log(e);
		}
		return 0;
	},

	regen_stylesheet: function () {
		this.head_css.html(this.css.create_stylesheet());

		var vol_col = this.get_volume_color(this.volume);
		this.volume_bar.css("background", "rgb(" + vol_col[0] + "," + vol_col[1] + "," + vol_col[2] + ")");
	},

	update_index_display: function (index, count, activate) {
		this.playlist_index_text1.html(count == 0 ? "-" : (index >= 0 ? (index + 1).toString() : "-"));
		this.playlist_index_text2.html(count == 0 ? "-" : count.toString());

		if (!activate) return;

		this.C(this.playlist_index_container, "MPPlaylistIndexContainerActive");
		if (this.playlist_index_timer !== null) {
			clearTimeout(this.playlist_index_timer);
			this.playlist_index_timer = null;
		}
		var self = this;
		this.playlist_index_timer = setTimeout(function () {
			self.playlist_index_timer = null;
			self.unC(self.playlist_index_container, "MPPlaylistIndexContainerActive");
		}, 1000);
	},

	get_volume_color: function (percent) {
		if (this.css.get_volume_colors().length <= 1) return this.css.get_volume_colors()[0];

		percent *= (this.css.get_volume_colors().length - 1);
		var i = Math.min((this.css.get_volume_colors().length - 2), Math.floor(percent));
		percent -= i;
		var inv = 1.0 - percent;

		return [
			Math.round(this.css.get_volume_colors()[i][0] * inv + this.css.get_volume_colors()[i + 1][0] * percent) ,
			Math.round(this.css.get_volume_colors()[i][1] * inv + this.css.get_volume_colors()[i + 1][1] * percent) ,
			Math.round(this.css.get_volume_colors()[i][2] * inv + this.css.get_volume_colors()[i + 1][2] * percent)
		];
	},
	reposition: function (left, top) {
		if (this.theatre_mode) {
			this.theatre_reposition();
			return;
		}

		if (left != undefined) {
			this.position_offset[0] = $(window).outerWidth() - (left + this.mp_container_main.outerWidth());
		}
		if (top != undefined) {
			this.position_offset[1] = $(window).outerHeight() - (top + this.mp_container_main.outerHeight());
		}
		var v;
		if (this.position_offset[0] > (v = $(window).outerWidth() - this.mp_container_main.outerWidth())) this.position_offset[0] = v;
		if (this.position_offset[1] > (v = $(window).outerHeight() - this.mp_container_main.outerHeight())) this.position_offset[1] = v;
		if (this.position_offset[0] < 0) this.position_offset[0] = 0;
		if (this.position_offset[1] < 0) this.position_offset[1] = 0;
		this.mp_container_main.css({"right": this.position_offset[0], "bottom": this.position_offset[1]});
	},
	resize_to: function (width, height, is_left, is_top) {
		if (this.theatre_mode) {
			this.theatre_reposition();
			return;
		}

		// Current size
		var current_size = [ this.mp_container_main.outerWidth() , this.mp_container_main.outerHeight() ];

		// Height change
		if (height !== null) {
			var playlist_size = [ this.playlist_container.outerWidth() , this.playlist_container.outerHeight() ];
			var image_size = [ this.image_container.outerWidth() , this.image_container.outerHeight() ];
			var non_height = current_size[1] - playlist_size[1] - image_size[1];

			// Playlist height change
			var playlist_height_target = height - (non_height + this.image_height_max * this.scale_factor);
			if (playlist_height_target < this.playlist_height_min * this.scale_factor) {
				playlist_height_target = this.playlist_height_min * this.scale_factor;
			}
			// Image
			var image_height_target = height - (non_height);
			if (image_height_target > this.image_height_max * this.scale_factor) {
				image_height_target = this.image_height_max * this.scale_factor
			}
			if (image_height_target < this.image_height_min * this.scale_factor) {
				image_height_target = this.image_height_min * this.scale_factor;
			}

			// Update height
			this.playlist_container.outerHeight(playlist_height_target);
			this.image_container.outerHeight(image_height_target);
			this.playlist_height = playlist_height_target / this.scale_factor;
			this.image_height = image_height_target / this.scale_factor;
			if (!is_top) {
				this.position_offset[1] -= (playlist_height_target - playlist_size[1]) + (image_height_target - image_size[1]);
			}
		}

		// Width change
		if (width !== null) {
			if (width < this.player_width_min * this.scale_factor) {
				width = this.player_width_min * this.scale_factor;
			}

			// Update width
			this.player_width = width / this.scale_factor;
			this.mp_container_main.outerWidth(width);
			if (!is_left) {
				this.position_offset[0] -= (width - current_size[0]);
			}
		}

		// Update position
		this.mp_container_main.css({"right": this.position_offset[0], "bottom": this.position_offset[1]});
		this.update_image_scale();

		// Update others
		this.set_loaded();
		this.seek_to(null, true);
	},
	update_playing_status: function () {
		if (!this.seek_exacting && !this.seek_dragging) {
			if (this.is_paused()) {
				this.playback_controls[2][0].css("display", "");
				this.playback_controls[2][1].css("display", "none");
			}
			else {
				this.playback_controls[2][0].css("display", "none");
				this.playback_controls[2][1].css("display", "");
			}
		}
	},
	update_scale_factor: function (scale_factor) {
		this.scale_factor = scale_factor;

		this.mp_container_main.outerWidth(this.player_width * this.scale_factor);
		this.playlist_container.outerHeight(this.playlist_height * this.scale_factor);
		this.image_container.outerHeight(this.image_height * this.scale_factor);
		// rescale image
		this.update_image_scale();
	},
	update_image_scale: function () {
		if (this.current_media !== null) {
			if (this.current_media.type == "image-audio") {
				var hh = this.image_container.outerHeight();
				var xs = (this.image_container.outerWidth() / this.current_media.image_size[0]);
				var ys = (hh / this.current_media.image_size[1]);
				if (ys < xs) xs = ys;

				ys = this.current_media.image_size[1] * xs;
				xs = this.current_media.image_size[0] * xs;

				// Scale
				this.image.width(xs);
				this.image.height(ys);
				this.image.css("margin-top", ((hh - ys) / 2) + "px");
			}
			else if (this.current_media.type == "ve") {
				if (this.current_media.vplayer.get_container() != null) {
					var size = (this.current_media.vplayer.has_video() ? this.current_media.vplayer.get_video_size() : this.current_media.vplayer.get_image_size())
					if (size.width > 0 && size.height > 0) {
						var hh = this.video_container.outerHeight();
						var xs = (this.video_container.outerWidth() / size.width);
						var ys = (hh / size.height);
						if (ys < xs) xs = ys;

						ys = size.height * xs;
						xs = size.width * xs;

						// Scale
						$(this.current_media.vplayer.get_container()).css({
							"width": xs + "px",
							"height": ys + "px",
							"margin-top": ((hh - ys) / 2) + "px"
						});
					}
				}
			}
			else if (this.current_media.type == "youtube-video") {
				if (this.ytvideo_player != null && this.ytvideo_player.setSize) {
					this.ytvideo_player.setSize(this.video_container.outerWidth(), this.video_container.outerHeight());
				}
			}
			else if (this.current_media.type == "vimeo-video") {
				if (this.vimeovideo_player != null) {
					$(this.vimeovideo_player.iframe)
					.attr("width", this.video_container.outerWidth())
					.attr("height", this.video_container.outerHeight());
				}
			}
			else if (this.current_media.type == "soundcloud-sound") {
				if (this.soundcloud_player != null) {
					$(this.soundcloud_player.iframe)
					.attr("width", this.video_container.outerWidth())
					.attr("height", this.video_container.outerHeight());
				}
			}
			else {
				console.log(this.current_media.type);
			}
		}
	},
	resize_image_container: function (height) {
		// New heights
		var image_height_target = height / this.scale_factor;
		if (image_height_target < this.image_height_min) image_height_target = this.image_height_min;
		var playlist_height_target = this.playlist_height - (image_height_target - this.image_height);
		if (playlist_height_target < 0) {
			image_height_target += playlist_height_target;
			playlist_height_target = 0;
		}

		// Update
		var update_max = (this.image_height == this.image_height_max || image_height_target >= this.image_height_max);

		this.image_height = image_height_target;
		this.playlist_height = playlist_height_target;
		//if (update_max)
		this.image_height_max = this.image_height;

		// Update
		this.playlist_container.outerHeight(this.playlist_height * this.scale_factor);
		this.image_container.outerHeight(this.image_height * this.scale_factor);
		this.update_image_scale();
	},
	update_player_theme_name: function (data) {
		data.media_player.player_theme_name.html(data.media_player.css.css_color_presets[data.media_player.css.preset]["@name"] || data.media_player.css.preset);
	},
	update_seek_indicator: function (time) {
		if (this.current_media == null) return;

		if (time < 0.0) time = 0.0;
		else if (time > this.current_media.duration) time = this.current_media.duration;

		this.playback_seek_indicator.html(this.duration_to_string(time));
		if (time > 0.0) time /= this.current_media.duration;

		var c_width = this.playback_seek_indicator_container.width();
		var width = this.playback_seek_indicator.outerWidth();

		time = ((time * c_width) - width / 2);
		if (time < 0.0) time = 0.0;
		else if (time > c_width - width) time = c_width - width;

		this.playback_seek_indicator.css("left", time + "px");
	},

	E: function (elem) {
		// Shortcut to create an element, masked with jquery
		var e = $(document.createElement(elem));
		for (var i = 1; i < arguments.length; ++i) this.C(e, arguments[i]);
		return e;
	},
	D: function () {
		// Shortcut to create a div, masked with jquery, appended with some classes
		var e = $(document.createElement("div"));
		for (var i = 0; i < arguments.length; ++i) this.C(e, arguments[i]);
		return e;
	},
	C: function (elem, cls) {
		elem.addClass(cls + this.css.css_suffix);
	},
	CC: function (cls) {
		return cls + this.css.css_suffix;
	},
	unC: function (elem, cls) {
		elem.removeClass(cls + this.css.css_suffix);
	},

	random_integer: function (max) {
		return Math.floor(Math.random() * max);
	},
	random_string: function (len, chars) {
		var s = "";
		chars = chars || "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
		for (var i = 0; i < len; ++i) {
			s += chars[Math.floor(Math.random() * chars.length)];
		}
		return s;
	},
	text_to_html: function (str) {
		return str.replace(/&/g, "&amp;")
			.replace(/>/g, "&gt;")
			.replace(/</g, "&lt;")
			.replace(/"/g, "&quot;");
	},
	duration_to_string: function (position) {
		var seconds_in = Math.round(position);
		var minutes_in = Math.floor(seconds_in / 60);
		var hours_in = Math.floor(minutes_in / 60);
		seconds_in = Math.floor(seconds_in - minutes_in * 60);
		minutes_in = Math.floor(minutes_in - hours_in * 60);
		var s = (hours_in > 0 ? hours_in + ":" : "") +
			(hours_in > 0 ? (minutes_in >= 10 ? minutes_in : "0" + minutes_in) : minutes_in) +
			":" + (seconds_in >= 10 ? seconds_in : "0" + seconds_in);
		return s;
	},
	youtube_time_to_number: function (str) {
		var time = 0;
		while (str.length > 0) {
			var match = /([0-9]+)([smh]|$)/.exec(str);
			if (match != null) {
				if (match[2] == "h") time += parseInt(match[1]) * 60 * 60;
				else if (match[2] == "m") time += parseInt(match[1]) * 60;
				else time += parseInt(match[1]);

				str = str.substr(match.index + match[0].length, str.length - (match.index + match[0].length));
			}
			else {
				break;
			}
		}
		return time;
	},
	string_to_uint8array: function (str) {
		var array = new Uint8Array(new ArrayBuffer(str.length));
		for (var i = 0; i < str.length; ++i) {
			array[i] = str.charCodeAt(i);
		}
		return array;
	},
	arraybuffer_to_uint8array: function (buffer) {
		return new Uint8Array(buffer);
	},
	merge_value_towards: function (value, target, incr) {
		return (value < target) ?
			((target - value < incr) ? target : value + incr) :
			((value - target < incr) ? target : value - incr);
	},
	merge_values: function (value, target, percent) {
		return value + (target - value) * percent;
	},

	generate_color_editor: function (label, identifier, value) {
		var color_edit;
		var help_input = [ null , null , null , null ];

		var e = this.D("MPHelpSectionDiv") //{ DOM Generation
			.append(
				this.D("MPHelpColorInputDiv0")
				.append(
					this.D("MPHelpColorInputDiv2b")
					.append(
						(color_edit = this.D("MPHelpColorLabelDisplay"))
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
					.attr("title", "Red : [0,255]")
					.append(
						this.D("MPHelpColorInputDiv3")
						.append(
							(help_input[0] = this.E("input", "MPHelpColorInput"))
							.attr("type", "text")
						)
					)
				)
			)
			.append(
				this.D("MPHelpColorInputDiv1")
				.append(
					this.D("MPHelpColorInputDiv2")
					.attr("title", "Green : [0,255]")
					.append(
						this.D("MPHelpColorInputDiv3")
						.append(
							(help_input[1] = this.E("input", "MPHelpColorInput"))
							.attr("type", "text")
						)
					)
				)
			)
			.append(
				this.D("MPHelpColorInputDiv1")
				.append(
					this.D("MPHelpColorInputDiv2")
					.attr("title", "Blue : [0,255]")
					.append(
						this.D("MPHelpColorInputDiv3")
						.append(
							(help_input[2] = this.E("input", "MPHelpColorInput"))
							.attr("type", "text")
						)
					)
				)
			)
			.append(
				this.D("MPHelpColorInputDiv1")
				.append(
					this.D("MPHelpColorInputDiv2")
					.attr("title", "Alpha : [0.0,1.0]")
					.append(
						this.D("MPHelpColorInputDiv3")
						.append(
							(help_input[3] = this.E("input", "MPHelpColorInput"))
							.attr("type", "text")
						)
					)
				)
			) //}

		// Settings
		for (var i = 0; i < help_input.length; ++i) {
			help_input[i].val(value[i]);
			help_input[i].on("change." + this.namespace, {media_player: this, color_id: identifier, component: i, color_display: color_edit}, this.on_settings_color_change);
		}

		if (value[3] >= 1.0) {
			color_edit.css("background", "rgb(" + value[0] + "," + value[1] + "," + value[2] + ")");
		}
		else {
			color_edit.css("background", "rgba(" + value[0] + "," + value[1] + "," + value[2] + "," + value[3] + ")");
		}

		this.player_theme_value_updaters.push([
			true, identifier, help_input[0], help_input[1], help_input[2], help_input[3], color_edit
		]);

		// Done
		return e;
	},
	generate_value_editor: function (label, identifier, value, is_string, bounds) {
		var help_input;

		var  e = this.D("MPHelpSectionDiv") //{ DOM Generation
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
							(help_input = this.E("input", "MPHelpColorInput"))
							.attr("type", "text")
							.val(value)
							.on("change." + this.namespace, {media_player: this, value_id: identifier, "is_string": is_string, "bounds": bounds}, this.on_settings_value_change)
						)
					)
				)
			) //}

		// Add to auto-update list
		if (identifier[0] != "@") {
			this.player_theme_value_updaters.push([
				false, identifier, help_input
			]);
		}

		return e;
	},
	update_value_fields: function () {
		// Update all
		for (var i in this.player_theme_value_updaters) {
			if (this.player_theme_value_updaters[i][0]) {
				// Color
				for (var j = 0; j < 4; ++j) {
					this.player_theme_value_updaters[i][2 + j].val(this.css.get_value(true, this.player_theme_value_updaters[i][1])[j]);
				}
			}
			else {
				// Value
				this.player_theme_value_updaters[i][2].val(this.css.get_value(false, this.player_theme_value_updaters[i][1]));
			}
		}
	},

	xml_find_nodes_by_name: function (xml, name) {
		// Because chrome is bad
		var nodes = [], n2;

		for (var n = 0; n < xml.childNodes.length; ++n) {
			if (xml.childNodes[n].nodeName != "#text") {
				if (xml.childNodes[n].nodeName == name) nodes.push(xml.childNodes[n]);

				n2 = this.xml_find_nodes_by_name(xml.childNodes[n], name);
				if (n2.length > 0) nodes = nodes.concat(n2);
			}
		}

		return nodes;
	},
	ajax_get: function (url, return_as_string, callback_data, progress_callback, done_callback) {
		var media_player = this;
		if (this.is_chrome) {
			var xhr = new XMLHttpRequest();
			xhr.open("GET", url, true);
			if (!return_as_string) xhr.overrideMimeType("text/plain; charset=x-user-defined");
			xhr.responseType = (return_as_string ? "text" : "arraybuffer");

			xhr.onload = function (event) {
				if (typeof(done_callback) == "function") {
					if (this.status == 200) {
						done_callback(
							true,
							callback_data,
							(return_as_string ? this.response : media_player.arraybuffer_to_uint8array(this.response))
						);
					}
					else {
						done_callback(false, callback_data, {
							status: this.status,
							response: this.response,
							status_text: this.statusText
						});
					}
				}
			};
			if (typeof(progress_callback) == "function") {
				xhr.onprogress = function (event) {
					progress_callback(event, callback_data);
				};
			}
			xhr.send();
		}
		else {
			var arg = {
				method: "GET",
				url: url,
				onload: function (event) {
					if (typeof(done_callback) == "function") {
						if (event.status == 200) {
							done_callback(
								true,
								callback_data,
								(return_as_string ? event.responseText : media_player.string_to_uint8array(event.responseText))
							);
						}
						else {
							done_callback(false, callback_data, {
								status: event.status,
								response: event.responseText,
								status_text: event.statusText
							});
						}
					}
				}
			};
			if (!return_as_string) arg.overrideMimeType = "text/plain; charset=x-user-defined";
			if (typeof(progress_callback) == "function") {
				arg.onprogress = function (event) {
					progress_callback(event, callback_data);
				};
			}
			GM_xmlhttpRequest(arg);
		}
	},

	add_to_playlist: function (title, tag, flagged, url, sound_index, raw_data, image_src, playlist_data) {
		// Setup playlist settings
		var playlist_item = {
			"type": "image-audio",
			"title": title,
			"tag": tag,
			"flagged": flagged,
			"url": url,
			"sound_index": sound_index,
			"index": this.playlist.length,
			"duration": 0.0,
			"position": 0.0,
			"controls": [ null , null , null , null , null ],
			"loaded_offset": 0.0,
			"loaded_percent": 1.0,
			"image_url": null,
			"image_blob": null,
			"image_blob_url": null,
			"image_name": ((playlist_data ? playlist_data.image_name : null) || url.split("/").pop()),
			"image_size": [0, 0],
			"audio_blob": null,
			"audio_blob_url": null,
			"mask_click_target": null,
		};

		// Create ogg audio
		playlist_item.audio_blob = new Blob([raw_data], {type: "audio/ogg"});
		playlist_item.audio_blob_url = (window.webkitURL || window.URL).createObjectURL(playlist_item.audio_blob);

		// Create/get image url and related settings
		if (typeof(image_src) == typeof("")) {
			playlist_item.image_url = image_src;
			playlist_item.image_blob = null;
			playlist_item.image_blob_url = null;
		}
		else {
			var image_ext = url.split(".").pop().toLowerCase();
			var mime = "image/jpeg"
			if (image_ext == "png") mime = "image/png";
			else if (image_ext == "gif") mime = "image/gif";

			playlist_item.image_blob = new Blob([image_src], {type: mime});
			playlist_item.image_blob_url = (window.webkitURL || window.URL).createObjectURL(playlist_item.image_blob);
			playlist_item.image_url = playlist_item.image_blob_url;
		}
		playlist_item.mask_click_target = playlist_item.image_url;

		// html setup
		var image_file_name = playlist_item.image_name.split(".");
		var image_file_ext = image_file_name.pop().toLowerCase();
		image_file_name = image_file_name.join(".");

		this.playlist_container.append( //{ DOM creation
			(playlist_item.playlist_item = this.E("a", "MPPlaylistItem"))
			.attr("href", playlist_item.audio_blob_url)
			.attr("target", "_blank")
			.on("click." + this.namespace, {media_player: this, playlist_item: playlist_item}, this.on_playlist_item_click)
			.on("mousedown", this.cancel_event)
			.attr("title", tag != MediaPlayer.ALL_SOUNDS ? tag : "")
			.append(
				this.D("MPPlaylistSoundName")
				.text(playlist_item.title)
			)
			.append(
				(playlist_item.info_container = this.D("MPPlaylistItemInfo"))
				.html(this.duration_to_string(playlist_item.duration))
			)
			.append(
				this.D("MPPlaylistControlsContainer")
				.on("mousedown", this.cancel_event)
				.append(
					this.D("MPPlaylistControls")
					.on("click", this.cancel_event)
					.append(
						(playlist_item.controls[0] = this.E("a", "MPPlaylistControlLink"))
						.html("&times;")
						.attr("title", "Delete")
					)
					.append(
						this.D("MPPlaylistControlLinkSeparator")
					)
					.append(
						(playlist_item.controls[1] = this.E("a", "MPPlaylistControlLink"))
						.html("&uarr;")
						.attr("title", "Move up")
					)
					.append(
						this.D("MPPlaylistControlLinkSeparator")
					)
					.append(
						(playlist_item.controls[2] = this.E("a", "MPPlaylistControlLink"))
						.html("&darr;")
						.attr("title", "Move down")
					)
					.append(
						this.D("MPPlaylistControlLinkSeparator")
					)
					.append(
						(playlist_item.controls[3] = this.E("a", "MPPlaylistControlLink"))
						.html("S")
						.attr("title", "Save...")
						.attr("href", playlist_item.audio_blob_url)
						.attr("download", playlist_item.title + ".ogg")
						.attr("target", "_blank")
					)
					.append(
						this.D("MPPlaylistControlLinkSeparator")
					)
					.append(
						(playlist_item.controls[4] = this.E("a", "MPPlaylistControlLink"))
						.html("I")
						.attr("title", "Image...")
						.attr("href", playlist_item.image_url)
						.attr("download", image_file_name + ".[" + playlist_item.title + "]." + image_file_ext)
						.attr("target", "_blank")
					)
				)
			)
		); //}

		// Custom
		for (var i = 0; i < playlist_item.controls.length; ++i) {
			playlist_item.controls[i].on("click." + this.namespace, {control_id: i, media_player: this, playlist_item: playlist_item}, this.on_playlist_control_click);
			playlist_item.controls[i].on("mousedown", this.cancel_event);
		}

		// Automatic length detection
		playlist_item.temp_audio = this.E("audio")
			.css("display", "none")
			.attr("src", playlist_item.audio_blob_url)
			.on(
				"durationchange." + this.namespace,
				{"media_player": this, "playlist_item": playlist_item},
				this.on_temp_audio_durationchange
			)
			.on(
				"error." + this.namespace,
				{"media_player": this, "playlist_item": playlist_item},
				this.on_temp_audio_error
			);
		playlist_item.temp_audio[0].volume = 0.0;
		playlist_item.temp_audio[0].play();

		// Add
		this.playlist.push(playlist_item);

		// Scroll to?
		if (this.playlist_scrollto_onload) {
			this.scroll_to(this.playlist.length - 1);
		}

		// Index display
		this.update_index_display((this.current_media != null ? this.current_media.index : -1), this.playlist.length, true);

		// Play?
		this.on_media_add(playlist_item);

		// Done
		return playlist_item.index;
	},
	add_to_playlist_ve: function (videcode, tag, original_image_url, playlist_data) {
		// Setup playlist settings
		var playlist_item = {
			"type": "ve",
			"videcode": videcode,
			"vplayer": null,
			"title": videcode.get_tag(),
			"tag": tag,
			"flagged": false,
			"url": original_image_url,
			"index": this.playlist.length,
			"duration": 0.0,
			"position": 0.0,
			"controls": [ null , null , null , null , null ],
			"loaded_offset": 0.0,
			"loaded_percent": 1.0,
			"image_name": ((playlist_data ? playlist_data.image_name : null) || (original_image_url != null ? original_image_url.split("/").pop() : "image")),
			"image_size": [0, 0],
			"mask_click_target": null,
			"image_url": null,
			"image_blob": null,
			"image_blob_url": null,
			"temp_container": null
		};

		// Create vplayer
		playlist_item.vplayer = new VPlayer(videcode);
		// Image URL
		if (playlist_item.url == null) {
			playlist_item.image_blob = new Blob([videcode.get_source()], {type: videcode.get_image_mime_type()});
			playlist_item.image_blob_url = (window.webkitURL || window.URL).createObjectURL(playlist_item.image_blob);
			playlist_item.image_url = playlist_item.image_blob_url;
		}
		else {
			playlist_item.image_url = playlist_item.url;
		}
		playlist_item.mask_click_target = playlist_item.image_url;

		// html setup
		var final_separators = [ null , null ];
		this.playlist_container.append( //{ DOM creation
			(playlist_item.playlist_item = this.E("a", "MPPlaylistItem"))
			.attr("href", playlist_item.image_url)
			.attr("target", "_blank")
			.on("click." + this.namespace, {media_player: this, playlist_item: playlist_item}, this.on_playlist_item_click)
			.on("mousedown", this.cancel_event)
			.attr("title", tag != MediaPlayer.ALL_SOUNDS ? tag : "")
			.append(
				this.D("MPPlaylistSoundName")
				.text(playlist_item.title)
			)
			.append(
				(playlist_item.info_container = this.D("MPPlaylistItemInfo"))
				.html(this.duration_to_string(playlist_item.duration))
			)
			.append(
				this.D("MPPlaylistControlsContainer")
				.on("mousedown", this.cancel_event)
				.append(
					this.D("MPPlaylistControls")
					.on("click", this.cancel_event)
					.append(
						(playlist_item.controls[0] = this.E("a", "MPPlaylistControlLink"))
						.html("&times;")
						.attr("title", "Delete")
					)
					.append(
						this.D("MPPlaylistControlLinkSeparator")
					)
					.append(
						(playlist_item.controls[1] = this.E("a", "MPPlaylistControlLink"))
						.html("&uarr;")
						.attr("title", "Move up")
					)
					.append(
						this.D("MPPlaylistControlLinkSeparator")
					)
					.append(
						(playlist_item.controls[2] = this.E("a", "MPPlaylistControlLink"))
						.html("&darr;")
						.attr("title", "Move down")
					)
					.append(
						(final_separators[0] = this.D("MPPlaylistControlLinkSeparator"))
					)
					.append(
						(playlist_item.controls[3] = this.E("a", "MPPlaylistControlLink"))
						.html("A")
						.attr("title", "Save audio...")
						.attr("href", playlist_item.vplayer.get_audio() || "")
						.attr("download", playlist_item.title + ".ogg")
						.attr("target", "_blank")
					)
					.append(
						(final_separators[1] = this.D("MPPlaylistControlLinkSeparator"))
					)
					.append(
						(playlist_item.controls[4] = this.E("a", "MPPlaylistControlLink"))
						.html("V")
						.attr("title", "Save video...")
						.attr("href", playlist_item.vplayer.get_video() || "")
						.attr("download", playlist_item.title + ".webm")
						.attr("target", "_blank")
					)
				)
			)
		); //}

		// Custom
		if (playlist_item.vplayer.get_audio() == null) {
			final_separators[0].css("display", "none");
			playlist_item.controls[3].css("display", "none");
		}
		if (playlist_item.vplayer.get_video() == null) {
			final_separators[1].css("display", "none");
			playlist_item.controls[4].css("display", "none");
		}
		for (var i = 0; i < playlist_item.controls.length; ++i) {
			playlist_item.controls[i].on("click." + this.namespace, {control_id: i, media_player: this, playlist_item: playlist_item}, this.on_playlist_control_click);
			playlist_item.controls[i].on("mousedown", this.cancel_event);
		}

		// Automatic length detection
		var self = this;
		(playlist_item.temp_container = this.D()).css("display", "none");
		playlist_item.vplayer.on("load", function () {
			self.on_temp_ve_load(playlist_item);
		});
		playlist_item.vplayer.on("error", function () {
			self.on_temp_ve_error(playlist_item);
		});
		playlist_item.vplayer.create_html(playlist_item.temp_container[0]);

		// Add
		this.playlist.push(playlist_item);

		// Scroll to?
		if (this.playlist_scrollto_onload) {
			this.scroll_to(this.playlist.length - 1);
		}

		// Index display
		this.update_index_display((this.current_media != null ? this.current_media.index : -1), this.playlist.length, true);

		// Play?
		this.on_media_add(playlist_item);

		// Done
		return playlist_item.index;
	},
	add_to_playlist_ytvideo: function (original_url, vid_id, tag, flagged, info_xml, playlist_data) {
		// XML parsing
		var cache_key = "media_cache";
		var title = "Unknown Title";
		var duration = 0.0;
		if (cache_key in playlist_data) {
			if ("title" in playlist_data[cache_key]) title = playlist_data[cache_key]["title"];
			if ("duration" in playlist_data[cache_key]) duration = playlist_data[cache_key]["duration"];

			delete playlist_data[cache_key];
		}
		else {
			// Setup playlist settings
			var d = this.xml_find_nodes_by_name(info_xml, "yt:duration");
			if (d.length > 0) {
				duration = d[0].getAttribute("seconds");
				duration = parseFloat(duration);
				duration = (isFinite(duration) ? duration : 0.0);
			}

			try {
				title = this.text_to_html($(this.xml_find_nodes_by_name(info_xml, "title")).text());
			}
			catch (e) {
				console.log(e);
			}
		}

		// URL parsing
		var start = /[\!\#\?\&]t=[0-9smh]+/.exec(original_url);
		if (start != null) {
			start = this.youtube_time_to_number(start[0].substr(3, start[0].length - 3));
		}
		else {
			start = 0.0;
		}

		// Playlist item
		var playlist_item = {
			"type": "youtube-video",
			"title": title,
			"original_url": original_url,
			"tag": tag,
			"flagged": flagged,
			"vid_id": vid_id,
			"duration": duration,
			"start": start,
			"position": 0.0,
			"index": this.playlist.length,
			"controls": [ null , null , null , null ],
			"progress_timer": null,
			"loaded_offset": 0.0,
			"loaded_percent": 0.0,
			"mask_click_target": null,
		};
		playlist_item.mask_click_target = "//www.youtube.com/watch?v=" + playlist_item.vid_id + (playlist_item.start == 0.0 ? "" : ("&t=" + Math.floor(playlist_item.start) + "s"));

		// html setup
		this.playlist_container.append( //{ DOM creation
			(playlist_item.playlist_item = this.E("a", "MPPlaylistItem"))
			.attr("href", playlist_item.mask_click_target)
			.attr("target", "_blank")
			.on("click." + this.namespace, {media_player: this, playlist_item: playlist_item}, this.on_playlist_item_click)
			.on("mousedown", this.cancel_event)
			.append(
				this.D("MPPlaylistSoundName")
				.html(playlist_item.title)
			)
			.append(
				(playlist_item.info_container = this.D("MPPlaylistItemInfo"))
				.html(this.duration_to_string(playlist_item.duration))
			)
			.append(
				this.D("MPPlaylistControlsContainer")
				.on("mousedown", this.cancel_event)
				.append(
					this.D("MPPlaylistControls")
					.on("click", this.cancel_event)
					.append(
						(playlist_item.controls[0] = this.E("a", "MPPlaylistControlLink"))
						.html("&times;")
						.attr("title", "Delete")
					)
					.append(
						this.D("MPPlaylistControlLinkSeparator")
					)
					.append(
						(playlist_item.controls[1] = this.E("a", "MPPlaylistControlLink"))
						.html("&uarr;")
						.attr("title", "Move up")
					)
					.append(
						this.D("MPPlaylistControlLinkSeparator")
					)
					.append(
						(playlist_item.controls[2] = this.E("a", "MPPlaylistControlLink"))
						.html("&darr;")
						.attr("title", "Move down")
					)
					.append(
						this.D("MPPlaylistControlLinkSeparator")
					)
					.append(
						(playlist_item.controls[3] = this.E("a", "MPPlaylistControlLink"))
						.html("Y")
						.attr("title", "Youtube Link")
						.attr("href", playlist_item.mask_click_target)
						.attr("target", "_blank")
					)
				)
			)
		); //}

		// Custom
		for (var i = 0; i < playlist_item.controls.length; ++i) {
			playlist_item.controls[i].on("click." + this.namespace, {control_id: i, media_player: this, playlist_item: playlist_item}, this.on_playlist_control_click);
			playlist_item.controls[i].on("mousedown", this.cancel_event);
		}

		// Add
		this.playlist.push(playlist_item);

		// Scroll to?
		if (this.playlist_scrollto_onload) {
			this.scroll_to(this.playlist.length - 1);
		}

		// Index display
		this.update_index_display((this.current_media != null ? this.current_media.index : -1), this.playlist.length, true);

		// Play?
		this.on_media_add(playlist_item);

		// Done
		return playlist_item.index;
	},
	add_to_playlist_vimeovideo: function (original_url, vid_id, tag, flagged, info_xml, playlist_data) {
		// XML parsing
		var cache_key = "media_cache";
		var title = "Unknown Title";
		var duration = 0.0;
		if (cache_key in playlist_data) {
			if ("title" in playlist_data[cache_key]) title = playlist_data[cache_key]["title"];
			if ("duration" in playlist_data[cache_key]) duration = playlist_data[cache_key]["duration"];

			delete playlist_data[cache_key];
		}
		else {
			// Setup playlist settings
			var d = this.xml_find_nodes_by_name(info_xml, "duration");
			if (d.length > 0) {
				duration = $(d[0]).text();
				duration = parseFloat(duration);
				duration = isFinite(duration) ? duration : 0.0;
			}

			try {
				title = this.text_to_html($(this.xml_find_nodes_by_name(info_xml, "title")).text());
			}
			catch (e) {
				console.log(e);
			}
		}

		// URL parsing
		var start = /[\!\#\?\&]t=[0-9smh]+/.exec(original_url);
		if (start != null) {
			start = this.youtube_time_to_number(start[0].substr(3, start[0].length - 3));
		}
		else {
			start = 0.0;
		}

		// Playlist item
		var playlist_item = {
			"type": "vimeo-video",
			"title": title,
			"original_url": original_url,
			"tag": tag,
			"flagged": flagged,
			"vid_id": vid_id,
			"duration": duration,
			"start": start,
			"position": 0.0,
			"index": this.playlist.length,
			"controls": [ null , null , null , null ],
			"progress_timer": null,
			"loaded_offset": 0.0,
			"loaded_percent": 0.0,
			"mask_click_target": null,
		};
		playlist_item.mask_click_target = "//vimeo.com/" + playlist_item.vid_id + (playlist_item.start == 0.0 ? "" : ("?t=" + Math.floor(playlist_item.start)));

		// html setup
		this.playlist_container.append( //{ DOM creation
			(playlist_item.playlist_item = this.E("a", "MPPlaylistItem"))
			.attr("href", playlist_item.mask_click_target)
			.attr("target", "_blank")
			.on("click." + this.namespace, {media_player: this, playlist_item: playlist_item}, this.on_playlist_item_click)
			.on("mousedown", this.cancel_event)
			.append(
				this.D("MPPlaylistSoundName")
				.html(playlist_item.title)
			)
			.append(
				(playlist_item.info_container = this.D("MPPlaylistItemInfo"))
				.html(this.duration_to_string(playlist_item.duration))
			)
			.append(
				this.D("MPPlaylistControlsContainer")
				.on("mousedown", this.cancel_event)
				.append(
					this.D("MPPlaylistControls")
					.on("click", this.cancel_event)
					.append(
						(playlist_item.controls[0] = this.E("a", "MPPlaylistControlLink"))
						.html("&times;")
						.attr("title", "Delete")
					)
					.append(
						this.D("MPPlaylistControlLinkSeparator")
					)
					.append(
						(playlist_item.controls[1] = this.E("a", "MPPlaylistControlLink"))
						.html("&uarr;")
						.attr("title", "Move up")
					)
					.append(
						this.D("MPPlaylistControlLinkSeparator")
					)
					.append(
						(playlist_item.controls[2] = this.E("a", "MPPlaylistControlLink"))
						.html("&darr;")
						.attr("title", "Move down")
					)
					.append(
						this.D("MPPlaylistControlLinkSeparator")
					)
					.append(
						(playlist_item.controls[3] = this.E("a", "MPPlaylistControlLink"))
						.html("V")
						.attr("title", "Vimeo Link")
						.attr("href", playlist_item.mask_click_target)
						.attr("target", "_blank")
					)
				)
			)
		); //}

		// Custom
		for (var i = 0; i < playlist_item.controls.length; ++i) {
			playlist_item.controls[i].on("click." + this.namespace, {control_id: i, media_player: this, playlist_item: playlist_item}, this.on_playlist_control_click);
			playlist_item.controls[i].on("mousedown", this.cancel_event);
		}

		// Add
		this.playlist.push(playlist_item);

		// Scroll to?
		if (this.playlist_scrollto_onload) {
			this.scroll_to(this.playlist.length - 1);
		}

		// Index display
		this.update_index_display((this.current_media != null ? this.current_media.index : -1), this.playlist.length, true);

		// Play?
		this.on_media_add(playlist_item);

		// Done
		return playlist_item.index;
	},
	add_to_playlist_soundcloud_sound: function (original_url, vid_id, tag, flagged, info_json, playlist_data) {
		// XML parsing
		var cache_key = "media_cache";
		var title = "Unknown Title";
		var duration = 0.0;
		var embed_code = "";
		if (cache_key in playlist_data) {
			if ("title" in playlist_data[cache_key]) title = playlist_data[cache_key]["title"];
			if ("embed_code" in playlist_data[cache_key]) embed_code = playlist_data[cache_key]["embed_code"];

			delete playlist_data[cache_key];
		}
		else {
			title = info_json.title;
			var match = " by " + info_json.author_name;
			if (
				info_json.author_name.length > 0 &&
				title.length > match.length &&
				title.substr(title.length - match.length, match.length) == match
			) {
				title = title.substr(0, title.length - match.length);
			}
			title = this.text_to_html(title);

			embed_code = info_json.html;
		}

		// URL parsing
		var start = 0.0;

		// Playlist item
		var playlist_item = {
			"type": "soundcloud-sound",
			"title": title,
			"original_url": original_url,
			"tag": tag,
			"flagged": flagged,
			"vid_id": vid_id,
			"duration": duration,
			"start": start,
			"position": 0.0,
			"index": this.playlist.length,
			"controls": [ null , null , null , null ],
			"progress_timer": null,
			"loaded_offset": 0.0,
			"loaded_percent": 0.0,
			"embed_code": embed_code,
			"mask_click_target": "//soundcloud.com/" + vid_id,
		};

		// html setup
		this.playlist_container.append( //{ DOM creation
			(playlist_item.playlist_item = this.E("a", "MPPlaylistItem"))
			.attr("href", playlist_item.mask_click_target)
			.attr("target", "_blank")
			.on("click." + this.namespace, {media_player: this, playlist_item: playlist_item}, this.on_playlist_item_click)
			.on("mousedown", this.cancel_event)
			.append(
				this.D("MPPlaylistSoundName")
				.html(playlist_item.title)
			)
			.append(
				(playlist_item.info_container = this.D("MPPlaylistItemInfo"))
				.html(this.duration_to_string(playlist_item.duration))
			)
			.append(
				this.D("MPPlaylistControlsContainer")
				.on("mousedown", this.cancel_event)
				.append(
					this.D("MPPlaylistControls")
					.on("click", this.cancel_event)
					.append(
						(playlist_item.controls[0] = this.E("a", "MPPlaylistControlLink"))
						.html("&times;")
						.attr("title", "Delete")
					)
					.append(
						this.D("MPPlaylistControlLinkSeparator")
					)
					.append(
						(playlist_item.controls[1] = this.E("a", "MPPlaylistControlLink"))
						.html("&uarr;")
						.attr("title", "Move up")
					)
					.append(
						this.D("MPPlaylistControlLinkSeparator")
					)
					.append(
						(playlist_item.controls[2] = this.E("a", "MPPlaylistControlLink"))
						.html("&darr;")
						.attr("title", "Move down")
					)
					.append(
						this.D("MPPlaylistControlLinkSeparator")
					)
					.append(
						(playlist_item.controls[3] = this.E("a", "MPPlaylistControlLink"))
						.html("S")
						.attr("title", "Soundcloud Link")
						.attr("href", playlist_item.mask_click_target)
						.attr("target", "_blank")
					)
				)
			)
		); //}

		// Custom
		for (var i = 0; i < playlist_item.controls.length; ++i) {
			playlist_item.controls[i].on("click." + this.namespace, {control_id: i, media_player: this, playlist_item: playlist_item}, this.on_playlist_control_click);
			playlist_item.controls[i].on("mousedown", this.cancel_event);
		}

		// Add
		this.playlist.push(playlist_item);

		// Scroll to?
		if (this.playlist_scrollto_onload) {
			this.scroll_to(this.playlist.length - 1);
		}

		// Index display
		this.update_index_display((this.current_media != null ? this.current_media.index : -1), this.playlist.length, true);

		// Play?
		this.on_media_add(playlist_item);

		// Done
		return playlist_item.index;
	},

	queue_load: function (url_or_file, load_tag, playlist_data, callback_data, progress_callback, done_callback, status_callback) {
		if (this.use_load_buffer) {
			// Queue load
			this.load_buffer.push([ url_or_file, load_tag, playlist_data, callback_data, progress_callback, done_callback, status_callback ]);

			// Timer
			this.queue_item_load();
		}
		else {
			// Immediate load
			this.attempt_load(null, url_or_file, load_tag, playlist_data, callback_data, progress_callback, done_callback, status_callback);
		}
	},
	queue_item_load: function () {
		if (this.load_buffer.length > 0) {
			if (!this.load_buffer_active) {
				this.load_buffer_active = true;

				// Status
				this.C(this.loaded_status_container, "MPLoadedStatusContainerActive");

				// Item
				var item = this.load_buffer[0];

				// Load
				this.attempt_load(item, item[0], item[1], item[2], item[3], item[4], item[5], item[6]);
			}
			this.loaded_status_count.html(this.load_buffer.length);
		}
	},
	queue_item_skip: function () {
		if (this.load_buffer.length > 0) {
			if (this.load_buffer_active) {
				this.load_buffer.shift();
				this.load_buffer_active = false;
				if (this.load_buffer.length > 0) {
					this.queue_item_load();
				}
				else {
					this.unC(this.loaded_status_container, "MPLoadedStatusContainerActive");
				}
			}
		}
	},
	queue_item_done: function (buffer_item, okay) {
		// Remove
		if (buffer_item == this.load_buffer[0]) {
			this.load_buffer.shift();

			// Next
			var self = this;
			this.load_buffer_timer = setTimeout(function () {
				self.load_buffer_timer = null;
				self.load_buffer_active = false;

				// Next
				if (self.load_buffer.length > 0) {
					self.queue_item_load();
				}
				else {
					self.unC(self.loaded_status_container, "MPLoadedStatusContainerActive");
				}
			}, 1);
		}
	},
	attempt_load: function (buffer_item, url_or_file, load_tag, playlist_data, callback_data, progress_callback, done_callback, status_callback) {
		// Attempt to load from remote URL or local file
		if (typeof(url_or_file) == typeof("")) {
			// Youtube loading
			if (url_or_file.substr(0, 5) == "file:") {
				this.queue_item_done(buffer_item, false);
				return;
			}
			if (this.url_get_youtube_video_id(url_or_file)) {
				this.attempt_load_youtube_video(buffer_item, url_or_file, load_tag, playlist_data, callback_data, progress_callback, done_callback, status_callback);
				return;
			}
			if (this.url_get_vimeo_video_id(url_or_file)) {
				this.attempt_load_vimeo_video(buffer_item, url_or_file, load_tag, playlist_data, callback_data, progress_callback, done_callback, status_callback);
				return;
			}
			if (this.url_get_soundcloud_info(url_or_file)) {
				this.attempt_load_soundcloud_sound(buffer_item, url_or_file, load_tag, playlist_data, callback_data, progress_callback, done_callback, status_callback);
				return;
			}

			// Other
			var self = this;

			var dcb = function (okay, callback_data, response) {
				if (typeof(done_callback) == "function") done_callback(okay, callback_data, (okay ? null : response));

				if (okay) {
					self.attempt_load_raw(buffer_item, false, url_or_file, load_tag, playlist_data, response, 0, function (status, files) {
						if (typeof(status_callback) == "function") status_callback(status, callback_data, files);
					}, {});
				}
				else {
					self.queue_item_done(buffer_item, false);
				}
			};

			// URL
			this.ajax_get(url_or_file, false, callback_data, progress_callback, dcb);
		}
		else {
			// Local file
			var reader = new FileReader();
			var self = this;
			// Done function
			reader.onload = function () {
				// Convert and call load function
				var ui8_data = new Uint8Array(this.result);
				self.attempt_load_raw(buffer_item, true, url_or_file.name, load_tag, playlist_data, ui8_data, 0, function (status, files) {
					if (typeof(status_callback) == "function") status_callback(status, callback_data, files);
				}, {});
			}
			// Start
			reader.readAsArrayBuffer(url_or_file);
		}
	},
	attempt_load_raw: function (buffer_item, is_local, url_or_filename, load_tag, playlist_data, raw_ui8_data, callback_id, done_callback, extra_data) {
		callback_id = callback_id || 0;

		// Videncode check first if filename resembles format
		if (callback_id == 0 && this.filename_might_be_ve(url_or_filename) && !extra_data.ve_checked) {
			extra_data.ve_checked = true;
			this.attempt_load_ve(buffer_item, is_local, url_or_filename, load_tag, playlist_data, raw_ui8_data, callback_id, done_callback, extra_data);
			return;
		}

		if (callback_id >= this.load_callbacks.length) {
			// Videncode check last if not done yet
			if (!extra_data.ve_checked) {
				extra_data.ve_checked = true;
				this.attempt_load_ve(buffer_item, is_local, url_or_filename, load_tag, playlist_data, raw_ui8_data, callback_id, done_callback, extra_data);
				return;
			}

			if (typeof(done_callback) == "function") done_callback(false, null);
			this.queue_item_done(buffer_item, false);
			return;
		}

		// Attempt to load from raw data
		var self = this;
		this.load_callbacks[callback_id](url_or_filename, load_tag, raw_ui8_data, function (r) {
			if (r != null) {
				var available = r[0];
				r = r[1];
				if (r != null) {
					// Load every sound
					for (var j = 0; j < r.length; ++j) {
						self.add_to_playlist(
							r[j]["title"],
							load_tag,
							r[j]["flagged"],
							url_or_filename,
							r[j]["index"],
							r[j]["data"],
							(is_local ? raw_ui8_data : url_or_filename),
							playlist_data
						);
					}
				}
				if (typeof(done_callback) == "function") done_callback(true, available);
				self.queue_item_done(buffer_item, r != null);
			}
			else {
				// Next
				self.attempt_load_raw(buffer_item, is_local, url_or_filename, load_tag, playlist_data, raw_ui8_data, callback_id + 1, done_callback, extra_data);
			}
		});
	},
	attempt_load_ve: function (buffer_item, is_local, url_or_filename, load_tag, playlist_data, raw_ui8_data, callback_id, done_callback, extra_data) {
		var self = this;
		var videcode = new Videcode(raw_ui8_data, url_or_filename);


		var callback = function () {
			if (!videcode.has_error()) {
				// Create availability list
				var available = [ (videcode.get_tag() || "?") + ".ogg" ];

				// Add
				self.add_to_playlist_ve(
					videcode,
					load_tag,
					(is_local ? null : url_or_filename),
					playlist_data
				);

				// Callback
				if (typeof(done_callback) == "function") done_callback(true, available);
				self.queue_item_done(buffer_item, true);

				// Don't continue
				return;
			}

			// Nothing detected
			self.attempt_load_raw(buffer_item, is_local, url_or_filename, load_tag, playlist_data, raw_ui8_data, callback_id, done_callback, extra_data);
		};


		if (this.videcode_async) {
			videcode.decode_async({steps: this.videcode_steps, delay: this.videcode_delay}, callback);
		}
		else {
			videcode.decode();
			callback.call(this);
		}
	},
	attempt_load_youtube_video: function (buffer_item, url, load_tag, playlist_data, callback_data, progress_callback, done_callback, status_callback) {
		var vid_id = this.url_get_youtube_video_id(url);

		// Not found
		if (vid_id === null) {
			if (typeof(done_callback) == "function") done_callback(false, callback_data, null);
			this.queue_item_done(buffer_item, false);
			return;
		}

		// Cached info
		if ("media_cache" in playlist_data) {
			if (typeof(done_callback) == "function") done_callback(true, callback_data, null);

			var xml = null;
			var status = this.add_to_playlist_ytvideo(url, vid_id, null, false, xml, playlist_data);
			if (typeof(status_callback) == "function") status_callback(status, callback_data, xml);
			this.queue_item_done(buffer_item, true);

			return;
		}

		// Info
		var self = this;
		var info_url = "//gdata.youtube.com/feeds/api/videos/" + vid_id;
		this.ajax_get(
			info_url,
			true,
			callback_data,
			progress_callback,
			function (okay, data, response) {
				if (typeof(done_callback) == "function") done_callback(okay, callback_data, (okay ? null : response));

				if (okay) {
					var xml = $.parseXML(response);
					var status = self.add_to_playlist_ytvideo(url, vid_id, null, false, xml, playlist_data);
					if (typeof(status_callback) == "function") status_callback(status, callback_data, xml);
				}
				else {
					// Missing
				}
				self.queue_item_done(buffer_item, okay);
			}
		);
	},
	attempt_load_vimeo_video: function (buffer_item, url, load_tag, playlist_data, callback_data, progress_callback, done_callback, status_callback) {
		var vid_id = this.url_get_vimeo_video_id(url);

		// Not found
		if (vid_id === null) {
			if (typeof(done_callback) == "function") done_callback(false, callback_data, null);
			this.queue_item_done(buffer_item, false);
			return;
		}

		// Cached info
		if ("media_cache" in playlist_data) {
			if (typeof(done_callback) == "function") done_callback(true, callback_data, null);

			var xml = null;
			var status = this.add_to_playlist_vimeovideo(url, vid_id, null, false, xml, playlist_data);
			if (typeof(status_callback) == "function") status_callback(status, callback_data, xml);
			this.queue_item_done(buffer_item, true);

			return;
		}

		// Info
		var self = this;
		var info_url = "//vimeo.com/api/v2/video/" + vid_id + ".xml";
		this.ajax_get(
			info_url,
			true,
			callback_data,
			progress_callback,
			function (okay, data, response) {
				if (typeof(done_callback) == "function") done_callback(okay, callback_data, (okay ? null : response));

				if (okay) {
					var xml = $.parseXML(response);
					var status = self.add_to_playlist_vimeovideo(url, vid_id, null, false, xml, playlist_data);
					if (typeof(status_callback) == "function") status_callback(status, callback_data, xml);
				}
				else {
					// Missing
				}
				self.queue_item_done(buffer_item, okay);
			}
		);
	},
	attempt_load_soundcloud_sound: function (buffer_item, url, load_tag, playlist_data, callback_data, progress_callback, done_callback, status_callback) {
		var vid_id = this.url_get_soundcloud_info(url);

		// Not found
		if (vid_id === null) {
			if (typeof(done_callback) == "function") done_callback(false, callback_data, null);
			this.queue_item_done(buffer_item, false);
			return;
		}

		// Cached info
		if ("media_cache" in playlist_data) {
			if (typeof(done_callback) == "function") done_callback(true, callback_data, null);

			var json = null;
			var status = this.add_to_playlist_soundcloud_sound(url, vid_id, null, false, json, playlist_data);
			if (typeof(status_callback) == "function") status_callback(status, callback_data, json);
			this.queue_item_done(buffer_item, true);

			return;
		}

		// Info
		var self = this;
		var info_url = "//soundcloud.com/oembed?format=json&iframe=true&show_comments=false&show_artwork=false&show_user=false&show_playcount=false&sharing=false&download=false&liking=false&buying=false&url=" + url;
		this.ajax_get(
			info_url,
			true,
			callback_data,
			progress_callback,
			function (okay, data, response) {
				if (typeof(done_callback) == "function") done_callback(okay, callback_data, (okay ? null : response));

				if (okay) {
					var json = JSON.parse(response);
					var status = self.add_to_playlist_soundcloud_sound(url, vid_id, null, false, json, playlist_data);
					if (typeof(status_callback) == "function") status_callback(status, callback_data, json);
				}
				else {
					// Missing
				}
				self.queue_item_done(buffer_item, okay);
			}
		);
	},

	url_get_youtube_video_id: function (url) {
		var youtube_url = [
			/(?:https?:\/\/)?(?:www\.)?youtube.com\/watch\?(?:\S+?)?v=([a-zA-Z0-9_-]{11})(?:[^\s<>]*)/i,
			/(?:https?:\/\/)?(?:www\.)?y2u.be\/([a-zA-Z0-9_-]{11})(?:[^\s<]*)/i,
			/(?:https?:\/\/)?(?:www\.)?youtu.be\/([a-zA-Z0-9_-]{11})(?:[^\s<]*)/i
		];

		for (var i = 0; i < youtube_url.length; ++i) {
			var match;
			if ((match = youtube_url[i].exec(url)) !== null) {
				return match[1];
			}
		}

		return null;
	},
	url_get_vimeo_video_id: function (url) {
		var vimeo_url = [
			/(?:https?:\/\/)?(?:www\.)?(?:player\.)?vimeo.com\/(?:video\/)?([0-9]+)(?:[^\s<>]*)/i
		];

		for (var i = 0; i < vimeo_url.length; ++i) {
			var match;
			if ((match = vimeo_url[i].exec(url)) !== null) {
				return match[1];
			}
		}

		return null;
	},
	url_get_soundcloud_info: function (url) {
		var soundcloud_url = [
			/(?:https?:\/\/)?(?:www\.)?soundcloud.com\/?([^\s<>]+)(?:[\?\#](?:[^\s<>]*))?/i
		];

		for (var i = 0; i < soundcloud_url.length; ++i) {
			var match;
			if ((match = soundcloud_url[i].exec(url)) !== null) {
				return match[1];
			}
		}

		return null;
	},

	filename_might_be_ve: function (url) {
		return /\.(ve|ev)\.(png|gif|jpg|jpeg)$/i.test(url);
	},

	downloads_generate_image_list: function (files, about, gen_function, use_original, index) {
		if (index >= this.playlist.length) {
			// Done
			gen_function(files, about);
			return;
		}

		// Type
		if (this.playlist[index].type != "image-audio") {
			// Next
			this.downloads_generate_image_list(files, about, gen_function, use_original, index + 1);
			return;
		}

		// Make sure image is unique
		var image_url = this.playlist[index].image_url;
		for (var j = 0; j < files.length; ++j) {
			if (files[j][2] == image_url) {
				// Next
				this.downloads_generate_image_list(files, about, gen_function, use_original, index + 1);
				return;
			}
		}

		// Filename
		var fn = (use_original ? this.playlist[index].image_name : this.playlist[index].url.split("/").pop()).split(".");
		var ext = "." + fn.pop();
		fn = fn.join(".")
		try {
			fn = this.normalize_filename(unescape(encodeURIComponent(fn)));
		}
		catch (e) {
			console.log(e);
		}
		// Make sure it's unique
		var n = 1;
		var name = fn + ext;
		for (var j = 0; j < files.length; ++j) {
			if (name == files[j][0]) {
				name = fn + (fn.length > 0 ? " " : "") + "(" + (++n) + ")" + ext;
				j = -1;
				continue;
			}
		}
		fn = name;

		// Get file
		if (this.playlist[index].image_blob !== null) {
			// Add
			files.push([fn, this.playlist[index].image_blob, image_url]);

			// Next
			this.downloads_generate_image_list(files, about, gen_function, use_original, index + 1);
		}
		else {
			// Ajax query
			var self = this;
			this.ajax_get(this.playlist[index].image_url, false, null, null, function (okay, data, response) {
				if (okay) {
					// Add
					files.push([fn, response, image_url]);

					// Next
					self.downloads_generate_image_list(files, about, gen_function, use_original, index + 1);
				}
			});
		}
	},
	downloads_generate_link: function (files, zip_writer, about, index) {
		if (index >= files.length) {
			// Central directory + footer
			zip_writer.write_end();
			// Destroy blob
			if (this.batch_download_blob !== null) {
				(window.webkitURL || window.URL).revokeObjectURL(this.batch_download_blob_url);
			}
			this.batch_download_blob = null;
			// Create blob
			this.batch_download_blob = new Blob([zip_writer.buffer], {type: "application/zip"});
			this.batch_download_blob_url = (window.webkitURL || window.URL).createObjectURL(this.batch_download_blob);
			// Display
			this.downloads_ready_container.css("display", "");
			this.downloads_about.html(about(files));
			this.downloads_link.attr("href", this.batch_download_blob_url);
			this.downloads_link.attr("download", "batch.zip");
			this.downloads_link.attr("target", "_blank");
			// Done
			return;
		}

		if  (files[index][1] instanceof Uint8Array) {
			// Direct
			zip_writer.write_file(files[index][0], files[index][1]);
			this.downloads_generate_link(files, zip_writer, about, index + 1);
		}
		else {
			// Blob reading
			var self = this;
			var reader = new FileReader();
			// Done function
			reader.onload = function () {
				// Convert and call load function
				var ui8_data = new Uint8Array(this.result);
				zip_writer.write_file(files[index][0], ui8_data);
				self.downloads_generate_link(files, zip_writer, about, index + 1);
			};
			// Start
			reader.readAsArrayBuffer(files[index][1]);
		}
	},
	normalize_filename: function (fname) {
		var disallowed = "<>:\"/\\|?*\0";
		for (var i = 0; i < disallowed.length; ++i) {
			fname = fname.replace(new RegExp("\\" + disallowed[i], "gi"), "_");
		}

		return fname;
	},

	on_theatre_mode_hide_controls_timeout: function () {
		this.C(this.mp_container_main, "MPControlsForceHide");
		this.theatre_hide_controls_timer = null;
	},
	on_theatre_mode_mousemove: function (event) {
		event.data.media_player.unC(event.data.media_player.mp_container_main, "MPControlsForceHide");
		event.data.media_player.theatre_reset_controls_timer();
	},

	on_media_add: function (playlist_item) {
		if (
			(this.playlist_play_on_load == 1 && this.playlist.length == 1) ||
			(this.playlist_play_on_load == 2 &&
				(this.current_media == null || (
					this.current_media.index == this.playlist.length - 2 &&
					this.current_media.position >= this.current_media.duration - 1.0 &&
					this.is_paused()
				))
			) ||
			(this.playlist_play_on_load == 3 && this.is_paused()) ||
			(this.playlist_play_on_load == 4)
		) {
			this.start(playlist_item.index);
		}
	},
	on_media_end: function () {
		if (this.theatre_mode && this.theatre_vars.close_on_finish) {
			this.theatre_exit();
		}
	},

	on_ytvideo_ready: function (event, media_player) {
		// Startup settings
		event.target.unMute();
		event.target.setVolume(media_player.get_volume() * 100.0);
		event.target.setPlaybackQuality(media_player.ytvideo_qualities[media_player.ytvideo_quality_index]);

		// Auto-play
		//var vid_id = this.url_get_youtube_video_id(event.target.getVideoUrl());
		media_player.play();
	},
	on_ytvideo_time_update: function (playlist_item, media_player) {
		if (media_player.ytvideo_player != null) {
			if (media_player.ytvideo_player.getCurrentTime) {
				// Seek
				media_player.seek_to(media_player.ytvideo_player.getCurrentTime(), true);
			}
			if (media_player.ytvideo_player.getVideoLoadedFraction) {
				// Loaded
				media_player.set_loaded(media_player.get_loaded_offset(), media_player.ytvideo_player.getVideoLoadedFraction());
			}
		}
	},
	on_ytvideo_state_change: function (event, media_player) {
		switch (event.data) {
			case window.YT.PlayerState.ENDED:
				media_player.update_playing_status();
				media_player.on_media_end();
				media_player.next(true);
			break;
			case window.YT.PlayerState.PLAYING:
				media_player.update_playing_status();
			break;
			case window.YT.PlayerState.PAUSED:
				media_player.update_playing_status();
			break;
			case window.YT.PlayerState.BUFFERING:
				media_player.update_playing_status();
			break;
			case window.YT.PlayerState.CUED:
			break;
		}
	},
	on_ytvideo_playback_quality_change: function (event, media_player) {
	},
	on_ytvideo_playback_rate_change: function (event, media_player) {
	},
	on_ytvideo_error: function (event, media_player) {
		switch (event.data) {
			case 2:
				// invalid video id / param
			break;
			case 5:
				// Cannot be html5'd
				media_player.ytvideo_html5 = false;
			break;
			case 100:
				// Not found
			break;
			case 101:
			case 105:
				// Cannot embed
			break;
		}
	},
	on_ytvideo_api_change: function (event, media_player) {
	},

	on_vimeovideo_load_progress: function (data, video_player) {
		this.set_loaded(this.get_loaded_offset(), parseFloat(data.percent));
	},
	on_vimeovideo_play_progress: function (data, video_player) {
		if (!this.seek_dragging && !this.seek_exacting) {
			this.seek_to(parseFloat(data.seconds), true);
		}
	},
	on_vimeovideo_play: function (data, video_player) {
		this.vimeovideo_player_paused = false;
		this.update_playing_status();
	},
	on_vimeovideo_pause: function (data, video_player) {
		this.vimeovideo_player_paused = true;
		this.update_playing_status();
	},
	on_vimeovideo_finish: function (data, video_player) {
		this.vimeovideo_player_paused = true;
		this.update_playing_status();
		this.on_media_end();
		this.next(true);
	},
	on_vimeovideo_seek: function (data, video_player) {
		if (!this.seek_dragging && !this.seek_exacting) {
			this.seek_to(parseFloat(data.seconds), true);
		}
	},

	on_soundcloud_sound_ready: function (sound_player) {
		this.set_volume(this.get_volume());
		var params = { self: this, sound_player: sound_player };
		var fn = function (data) {
			data.sound_player.api_call("getDuration", function (len) {
				data.self.set_duration(len / 1000);
			});
		};

		if (this.soundcloud_unsafe) {
			_unsafe_exec(fn, params);
		}
		else {
			fn(params);
		}

		this.play();
	},
	on_soundcloud_sound_load_progress: function (data, sound_player) {
		this.set_loaded(this.get_loaded_offset(), data.loadedProgress);
	},
	on_soundcloud_sound_play_progress: function (data, sound_player) {
		if (!this.seek_dragging && !this.seek_exacting) {
			this.seek_to(data.currentPosition / 1000, true);
		}
	},
	on_soundcloud_sound_play: function (data, sound_player) {
		this.soundcloud_player_paused = false;
		this.update_playing_status();
	},
	on_soundcloud_sound_pause: function (data, sound_player) {
		this.soundcloud_player_paused = true;
		this.update_playing_status();
	},
	on_soundcloud_sound_finish: function (data, sound_player) {
		this.soundcloud_player_paused = true;
		this.update_playing_status();
		this.on_media_end();
		this.next(true);
	},
	on_soundcloud_sound_seek: function (data, sound_player) {
		if (!this.seek_dragging && !this.seek_exacting) {
			this.seek_to(data.currentPosition / 1000, true);
		}
	},

	on_audio_play: function (event) {
		// Update playing status
		event.data.media_player.update_playing_status();
	},
	on_audio_pause: function (event) {
		// Update playing status
		event.data.media_player.update_playing_status();
	},
	on_audio_ended: function (event) {
		if (!event.data.media_player.seek_exacting && !event.data.media_player.seek_dragging) {
			// Update playing status
			event.data.media_player.update_playing_status();
			// Next
			event.data.media_player.on_media_end();
			event.data.media_player.next(true);
		}
	},
	on_audio_timeupdate: function (event) {
		// Update seek bar
		event.data.media_player.seek_to(this.currentTime, true);
	},
	on_audio_durationchange: function (event) {
		// Update item
		var duration = event.data.media_player.get_audio_duration(event.data.media_player.audio[0]);

		// Seek
		event.data.media_player.set_duration(duration);
		event.data.media_player.seek_to(null, true);
	},
	on_temp_audio_durationchange: function (event) {
		// Get duration
		var duration = event.data.media_player.get_audio_duration(event.data.playlist_item.temp_audio[0]);
		event.data.playlist_item.duration = duration;

		// Stop, remove, and nullify
		event.data.playlist_item.temp_audio[0].pause();
		event.data.playlist_item.temp_audio.removeAttr("src").remove();
		event.data.playlist_item.temp_audio = null;

		var length_str = event.data.media_player.duration_to_string(duration);
		event.data.playlist_item.info_container.html(length_str);
	},
	on_temp_audio_error: function (event) {
		if (event.data.playlist_item.temp_audio !== null) {
			event.data.playlist_item.temp_audio.removeAttr("src").remove();
			event.data.playlist_item.temp_audio = null;

			event.data.media_player.remove(event.data.playlist_item.index);
		}
	},

	on_ve_load: function (playlist_item) {
		// Update image
		this.update_image_scale();

		// Update time
		var duration = playlist_item.vplayer.get_duration();

		// Seek
		this.set_duration(duration);
		this.seek_to(null, true);

		// Play
		playlist_item.vplayer.play();
	},
	on_ve_error: function (playlist_item) {
		// On error, remove
		if (playlist_item.temp_container != null) {
			playlist_item.vplayer.remove_html().clear_listeners();
			playlist_item.temp_container.remove();
			playlist_item.temp_container = null;

			this.remove(playlist_item.index);
		}
	},
	on_ve_play: function (playlist_item) {
		// Update playing status
		this.update_playing_status();
	},
	on_ve_pause: function (playlist_item) {
		// Update playing status
		this.update_playing_status();
	},
	on_ve_end: function (playlist_item) {
		if (!this.seek_exacting && !this.seek_dragging) {
			// Update playing status
			this.update_playing_status();
			// Next
			this.on_media_end();
			this.next(true);
		}
	},
	on_ve_timeupdate: function (playlist_item, data) {
		// Update seek bar
		this.seek_to(data.time, true);
	},
	on_temp_ve_load: function (playlist_item) {
		// On success, set the duration
		if (playlist_item.temp_container != null) {
			var duration = playlist_item.vplayer.get_duration();
			playlist_item.vplayer.remove_html().clear_listeners();
			playlist_item.temp_container.remove();
			playlist_item.temp_container = null;

			// Set
			playlist_item.duration = duration;

			var length_str = this.duration_to_string(duration);
			playlist_item.info_container.html(length_str);
		}
	},
	on_temp_ve_error: function (playlist_item) {
		// On error, remove
		if (playlist_item.temp_container != null) {
			playlist_item.vplayer.remove_html().clear_listeners();
			playlist_item.temp_container.remove();
			playlist_item.temp_container = null;

			this.remove(playlist_item.index);
		}
	},

	on_custom_option_click: function (event) {
		var v_id = 0;
		for (var j = 0; j < event.data.custom_data["values"].length; ++j) {
			if (event.data.custom_data["current"] == event.data.custom_data["values"][j]) {
				v_id = j;
				break;
			}
		}
		v_id = (v_id + 1) % event.data.custom_data["values"].length;

		$(this).html(event.data.custom_data["descr"][v_id]);

		event.data.custom_data["current"] = event.data.custom_data["values"][v_id];
		event.data.custom_data["change"](event.data.custom_data["values"][v_id]);
	},

	on_main_container_mouseover: function (event) {
		event.data.media_player.resize_container_hovered = true;
		event.data.media_player.on_resize_mouse_update(null, null);
	},
	on_main_container_mouseout: function (event) {
		event.data.media_player.resize_container_hovered = false;
		event.data.media_player.on_resize_mouse_update(null, null);
	},

	on_timer_resize_open: function () {
		this.resize_timers[0] = null;
		this.resize_should_close = false;

		// Update sizes
		var d;
		$("body").append(d = this.D("MPResizingSizeOff"));
		this.resize_sizes[0] = d.outerWidth();
		d.remove();
		$("body").append(d = this.D("MPResizingSizeAvailable"));
		this.resize_sizes[1] = d.outerWidth();
		d.remove();
		$("body").append(d = this.D("MPResizingContainerText").html("I"));
		this.resize_sizes[2] = d.outerHeight();
		d.remove();
		if (this.resize_sizes[1] > this.resize_sizes[2]) this.resize_sizes[1] = this.resize_sizes[2];

		this.resize_side_sizes_target = [ this.resize_sizes[1], this.resize_sizes[1], this.resize_sizes[1], this.resize_sizes[1] ];
		this.resize_side_sizes_needed = true;
		this.on_resize_mouse_update(null, null);

		if (this.resize_timers[2] === null) {
			// Current size
			this.resize_side_sizes = [ this.resize_sizes[0], this.resize_sizes[0], this.resize_sizes[0], this.resize_sizes[0] ];

			// CSS update
			this.unC(this.mp_container_main, "MPContainerMainBorders");
			this.resizing_container.css("display", "");

			// Size update loop
			var self = this;
			this.on_interval_resize_update();
			this.resize_timers[2] = setInterval(function () {
				self.on_interval_resize_update();
			}, Math.floor(this.resize_wait_times[2] * 1000));
		}
	},
	on_timer_resize_close: function () {
		this.resize_timers[1] = null;
		this.resize_should_close = true;
		this.resize_side_sizes_needed = true;
		this.resize_side_sizes_target = [ this.resize_sizes[0], this.resize_sizes[0], this.resize_sizes[0], this.resize_sizes[0] ];
		for (var i = 0; i < this.resizing_texts.length; ++i) {
			this.resizing_texts[i].css("display", "none");
		}
	},
	on_interval_resize_update: function () {
		// Stop condition
		if (this.resize_side_sizes_needed) {
			this.resize_side_sizes_needed = false;
			for (var i = 0; i < this.resize_side_sizes.length; ++i) {
				this.resize_side_sizes[i] = this.merge_value_towards(
					this.resize_side_sizes[i],
					this.resize_side_sizes_target[i],
					this.resize_side_speed * this.resize_wait_times[2]
				);
				this.resize_side_sizes_needed = (this.resize_side_sizes_needed || (this.resize_side_sizes[i] != this.resize_side_sizes_target[i]));
			}

			// CSS update sizes
			var css = [
				this.resize_side_sizes[0] + "px",
				this.resize_side_sizes[1] + "px",
				this.resize_side_sizes[2] + "px",
				this.resize_side_sizes[3] + "px"
			];
			this.resizing_container.css({"top": "-" + css[0], "right": "-" + css[1], "bottom": "-" + css[2], "left": "-" + css[3]});
			this.resizing_controls[0].css({"width": css[3], "height": css[0]});
			this.resizing_controls[1].css({"height": css[0], "left": css[3], "right": css[1]});
			this.resizing_controls[2].css({"width": css[1], "height": css[0]});
			this.resizing_controls[3].css({"width": css[3], "top": css[0], "bottom": css[2]});
			this.resizing_controls[4].css({"width": css[1], "top": css[0], "bottom": css[2]});
			this.resizing_controls[5].css({"width": css[3], "height": css[2]});
			this.resizing_controls[6].css({"height": css[2], "left": css[3], "right": css[1]});
			this.resizing_controls[7].css({"width": css[1], "height": css[2]});
		}
		else if (this.resize_should_close) {
			clearTimeout(this.resize_timers[2]);
			this.resize_timers[2] = null;

			this.resize_container_border_hovered = false;

			this.C(this.mp_container_main, "MPContainerMainBorders");
			this.resizing_container.css("display", "none");

			return;
		}
	},
	on_resize_mouse_update: function (rel_x, rel_y) {
		if (rel_x !== null) this.resize_mouse_offset[0] = rel_x;
		else rel_x = this.resize_mouse_offset[0];
		if (rel_y !== null) this.resize_mouse_offset[1] = rel_y;
		else rel_y = this.resize_mouse_offset[1];

		var size = [ this.mp_container.outerWidth() , this.mp_container.outerHeight() ];
		var should_open = this.resizing && !this.theatre_mode;
		if (this.resize_container_hovered && !this.resizing && !this.theatre_mode) {
			should_open = (
				rel_x <= this.resize_distance[0] ||
				rel_y <= this.resize_distance[0] ||
				rel_x >= size[0] - this.resize_distance[0] ||
				rel_y >= size[1] - this.resize_distance[0]
			);

			// What sides should be expanded
			if (this.resize_timers[2] !== null) {
				this.resize_side_sizes_needed = true;
				var open = [
					(rel_y <= this.resize_distance[1]),
					(rel_x >= size[0] - this.resize_distance[1]),
					(rel_y >= size[1] - this.resize_distance[1]),
					(rel_x <= this.resize_distance[1])
				];
				for (var i = 0; i < 4; ++i) {
					this.resize_side_sizes_target[i] = this.resize_sizes[open[i] ? 2 : 1];
				}
				this.resizing_texts[0].css("display", (open[0] && open[3]) ? "" : "none");
				this.resizing_texts[1].css("display", (open[0]) ? "" : "none");
				this.resizing_texts[2].css("display", (open[0] && open[1]) ? "" : "none");
				this.resizing_texts[3].css("display", (open[3]) ? "" : "none");
				this.resizing_texts[4].css("display", (open[1]) ? "" : "none");
				this.resizing_texts[5].css("display", (open[2] && open[3]) ? "" : "none");
				this.resizing_texts[6].css("display", (open[2]) ? "" : "none");
				this.resizing_texts[7].css("display", (open[2] && open[1]) ? "" : "none");
			}
		}

		if (should_open != this.resize_container_border_hovered) {
			this.resize_container_border_hovered = should_open;
			// Clear timers
			for (var i = 0; i < 2; ++i) {
				if (this.resize_timers[i] !== null) {
					clearTimeout(this.resize_timers[i]);
					this.resize_timers[i] = null;
				}
			}
			// Set timer to close/open
			var self = this;
			if (should_open) {
				if (this.resize_timers[2] === null) {
					this.resize_timers[0] = setTimeout(function () {
						self.on_timer_resize_open();
					}, Math.floor(this.resize_wait_times[0] * 1000));
				}
				else {
					self.on_timer_resize_open();
				}
			}
			else if (this.resize_timers[2] !== null) {
				this.resize_timers[1] = setTimeout(function () {
					self.on_timer_resize_close();
				}, Math.floor(this.resize_wait_times[1] * 1000));
			}
		}
	},

	on_resizer_mousedown: function (event) {
		if (event.which == 1) {
			// Cannot be minimized
			if (!event.data.media_player.theatre_mode) {
				if (event.data.media_player.playlist_container.css("display") != "none") {
					event.data.media_player.resizing = true;
					event.data.media_player.resizing_sides = event.data.sides;
					event.data.media_player.mouse_offset = {
						"left": (event.pageX - $(document).scrollLeft()),
						"top": (event.pageY - $(document).scrollTop())
					};
					event.data.media_player.resizing_base_size = {
						//"width": event.data.media_player.mp_container.outerWidth() + event.data.media_player.resize_sizes[0] * 2,
						//"height": event.data.media_player.mp_container.outerHeight() + event.data.media_player.resize_sizes[0] * 2
						"width": event.data.media_player.mp_container_main.outerWidth(),
						"height": event.data.media_player.mp_container_main.outerHeight()
					};
				}
			}

			// Done
			return false;
		}
		return true;
	},

	on_titlebar_mousedown: function (event) {
		if (event.which == 1) {
			if (!event.data.media_player.theatre_mode) {
				// Mouse offset
				event.data.media_player.moving = true;
				event.data.media_player.mouse_offset = event.data.media_player.mp_container_main.offset();
				event.data.media_player.mouse_offset.left -= event.pageX;
				event.data.media_player.mouse_offset.top -= event.pageY;
			}

			// Done
			return false;
		}
		return true;
	},
	on_volumebar_mousedown: function (event) {
		if (event.which == 1) {
			// Mouse offset
			event.data.media_player.volume_changing = true;
			// Visuals
			event.data.media_player.C(event.data.media_player.volume_container, "MPVolumeContainerActive");
			// Change volume
			var volume = 1.0 - ((event.pageY) - event.data.media_player.volume_bar_container.offset().top) / event.data.media_player.volume_bar_container.outerHeight();
			event.data.media_player.set_volume(volume);
			// Done
			return false;
		}
		return true;
	},
	on_seekbar_mousedown: function (event) {
		if (event.which == 1) {
			// Mouse offset
			event.data.media_player.C(event.data.media_player.seek_bar, "MPSeekBarActive");
			event.data.media_player.C(event.data.media_player.playback_seek_indicator_container, "MPSeekIndicatorContainerDragging");
			event.data.media_player.seek_dragging = true;
			if ((event.data.media_player.seek_was_playing = !event.data.media_player.is_paused())) {
				event.data.media_player.pause();
			}
			event.data.media_player.mouse_offset = event.data.media_player.seek_bar.offset();
			event.data.media_player.mouse_offset.left -= event.pageX;
			event.data.media_player.mouse_offset.top -= event.pageY;
			// Done
			return false;
		}
		return true;
	},
	on_seekbar_mouseover: function (event) {
		if (event.data.media_player.current_media != null) {
			event.data.media_player.unC(event.data.media_player.playback_seek_indicator_container, "MPSeekIndicatorContainerDisabled");
			event.data.media_player.on_seekbar_mousemove.call(this, event);
		}

		return true;
	},
	on_seekbar_mouseout: function (event) {
		event.data.media_player.C(event.data.media_player.playback_seek_indicator_container, "MPSeekIndicatorContainerDisabled");

		return true;
	},
	on_seekbar_mousemove: function (event) {
		if (!event.data.media_player.seek_dragging && !event.data.media_player.seek_exacting && event.data.media_player.current_media != null) {
			var w = $(this).width();
			if (w > 0.0) {
				var time = (event.pageX - $(this).offset().left) / w * event.data.media_player.current_media.duration;

				event.data.media_player.update_seek_indicator(time);
			}
		}

		return true;
	},
	on_seekbar_container_mousedown: function (event) {
		if (event.which == 1) {
			// Mouse offset
			event.data.media_player.C(event.data.media_player.seek_bar, "MPSeekBarActive");
			event.data.media_player.C(event.data.media_player.playback_seek_indicator_container, "MPSeekIndicatorContainerDragging");
			event.data.media_player.seek_exacting = true;
			if ((event.data.media_player.seek_was_playing = !event.data.media_player.is_paused())) {
				event.data.media_player.pause();
			}
			// Seeking
			var offset = (event.pageX - event.data.media_player.seek_bar_container.offset().left) - event.data.media_player.seek_bar.outerWidth() / 2.0;
			var max_offset = event.data.media_player.seek_bar_container.outerWidth() - event.data.media_player.seek_bar.outerWidth();
			// Seek
			if (max_offset > 0.0) offset = offset / max_offset * event.data.media_player.get_duration();
			event.data.media_player.seek_to(offset);
			// Done
			return false;
		}
		return true;
	},
	on_image_resize_mousedown: function (event) {
		if (event.which == 1) {
			if (!event.data.media_player.theatre_mode) {
				// Mouse offset
				event.data.media_player.resizing_image = true;
				event.data.media_player.mouse_offset = event.data.media_player.mp_container_main.offset();
				event.data.media_player.mouse_offset.left -= event.pageX;
				event.data.media_player.mouse_offset.top -= event.pageY - (event.data.media_player.image_height * event.data.media_player.scale_factor);

				event.data.media_player.mouse_moved = false;
			}

			// Done
			return false;
		}
		return true;
	},
	on_image_resize_click: function (event) {
		if (event.which == 1) {
			if (event.data.media_player.theatre_mode) {
				// Play/pause when in theatre
				if (event.data.media_player.is_paused()) {
					event.data.media_player.play();
				}
				else {
					event.data.media_player.pause();
				}
			}
			return false;
		}
		if (event.which == 2) {
			if (!event.data.media_player.is_paused()) event.data.media_player.pause();
		}
		return true;
	},
	on_document_mouseup: function (event) {
		// Stop all drag events
		if (event.data.media_player.moving) {
			event.data.media_player.moving = false;

			// Callback
			if (typeof(event.data.media_player.settings_callback) == "function") event.data.media_player.settings_callback(event.data.media_player);
		}
		else if (event.data.media_player.resizing) {
			event.data.media_player.resizing = false;
			event.data.media_player.on_resize_mouse_update(null, null);
			event.data.media_player.reposition();

			// Callback
			if (typeof(event.data.media_player.settings_callback) == "function") event.data.media_player.settings_callback(event.data.media_player);
		}
		else if (event.data.media_player.resizing_image) {
			event.data.media_player.resizing_image = false;

			if (event.data.media_player.mouse_moved) {
				// Callback
				if (typeof(event.data.media_player.settings_callback) == "function") event.data.media_player.settings_callback(event.data.media_player);
			}
			else {
				// Pause/play
				if (event.data.media_player.is_paused()) {
					event.data.media_player.play();
				}
				else {
					event.data.media_player.pause();
				}
			}
		}
		else if (event.data.media_player.volume_changing) {
			event.data.media_player.volume_changing = false;
			event.data.media_player.unC(event.data.media_player.volume_container, "MPVolumeContainerActive");
		}
		else if (event.data.media_player.seek_dragging) {
			event.data.media_player.seek_dragging = false;
			event.data.media_player.unC(event.data.media_player.seek_bar, "MPSeekBarActive");
			event.data.media_player.unC(event.data.media_player.playback_seek_indicator_container, "MPSeekIndicatorContainerDragging");

			event.data.media_player.seek_to(null, false, false);

			if (event.data.media_player.seek_was_playing) {
				event.data.media_player.play();
			}
		}
		else if (event.data.media_player.seek_exacting) {
			event.data.media_player.seek_exacting = false;
			event.data.media_player.unC(event.data.media_player.seek_bar, "MPSeekBarActive");
			event.data.media_player.unC(event.data.media_player.playback_seek_indicator_container, "MPSeekIndicatorContainerDragging");

			event.data.media_player.seek_to(null, false, false);

			if (event.data.media_player.seek_was_playing) {
				event.data.media_player.play();
			}
		}
		return true;
	},
	on_document_mousemove: function (event) {
		if (event.data.media_player.doc_mouse.x == event.pageX && event.data.media_player.doc_mouse.y == event.pageY) return true;
		event.data.media_player.doc_mouse.x = event.pageX;
		event.data.media_player.doc_mouse.y = event.pageY;

		if (event.data.media_player.theatre_mode) {
			event.data.media_player.on_theatre_mode_mousemove(event);
		}

		if (event.data.media_player.moving) {
			// Dragging window
			var left = (event.pageX - $(document).scrollLeft()) + event.data.media_player.mouse_offset.left;
			var top = (event.pageY - $(document).scrollTop()) + event.data.media_player.mouse_offset.top;
			event.data.media_player.reposition(left, top);
		}
		else if (event.data.media_player.resizing) {
			var size = {width: null, height: null};

			var is_top, is_left;
			if ((is_top = (event.data.media_player.resizing_sides[0] === 0))) { // top
				size.height = event.data.media_player.mouse_offset.top
					- (event.pageY - $(document).scrollTop())
					+ event.data.media_player.resizing_base_size.height;
			}
			else if (event.data.media_player.resizing_sides[0] === 2) { // bottom
				size.height = (event.pageY - $(document).scrollTop())
					- event.data.media_player.mouse_offset.top
					+ event.data.media_player.resizing_base_size.height;
			}
			if ((is_left = (event.data.media_player.resizing_sides[1] === 3))) { // left
				size.width = event.data.media_player.mouse_offset.left
					- (event.pageX - $(document).scrollLeft())
					+ event.data.media_player.resizing_base_size.width;
			}
			else if (event.data.media_player.resizing_sides[1] === 1) { // right
				size.width = (event.pageX - $(document).scrollLeft())
					- event.data.media_player.mouse_offset.left
					+ event.data.media_player.resizing_base_size.width;
			}

			event.data.media_player.resize_to(size.width, size.height, is_left, is_top);
		}
		else if (event.data.media_player.resizing_image) {
			var size = event.data.media_player.mp_container_main.offset();
			size.left = (event.pageX - size.left) + event.data.media_player.mouse_offset.left;
			size.top = (event.pageY - size.top) + event.data.media_player.mouse_offset.top;

			event.data.media_player.resize_image_container(size.top);

			event.data.media_player.mouse_moved = true;
		}
		else if (event.data.media_player.volume_changing) {
			// Changing volume
			var volume = 1.0 - ((event.pageY) - event.data.media_player.volume_bar_container.offset().top) / event.data.media_player.volume_bar_container.outerHeight();
			event.data.media_player.set_volume(volume);

			// Callback
			if (typeof(event.data.media_player.settings_callback) == "function")event.data.media_player.settings_callback(event.data.media_player);
		}
		else if (event.data.media_player.seek_dragging) {
			// Seeking
			var offset = ((event.pageX) - event.data.media_player.seek_bar_container.offset().left) + event.data.media_player.mouse_offset.left;
			var max_offset = event.data.media_player.seek_bar_container.outerWidth() - event.data.media_player.seek_bar.outerWidth();
			// Seek
			if (max_offset > 0.0) offset = offset / max_offset * event.data.media_player.get_duration();
			event.data.media_player.seek_to(offset, false, true);
			// Seek time
			event.data.media_player.update_seek_indicator(offset);
		}
		else if (event.data.media_player.seek_exacting) {
			// Seeking
			var offset = ((event.pageX) - event.data.media_player.seek_bar_container.offset().left) - event.data.media_player.seek_bar.outerWidth() / 2.0;
			var max_offset = event.data.media_player.seek_bar_container.outerWidth() - event.data.media_player.seek_bar.outerWidth();
			// Seek
			if (max_offset > 0.0) offset = offset / max_offset * event.data.media_player.get_duration();
			event.data.media_player.seek_to(offset, false, true);
			// Seek time
			event.data.media_player.update_seek_indicator(offset);
		}

		if (event.data.media_player.resize_container_hovered) {
			var rel = event.data.media_player.mp_container.offset();
			rel.left -= event.pageX;
			rel.top -= event.pageY;

			event.data.media_player.on_resize_mouse_update(-rel.left, -rel.top);
		}

		return true;
	},
	on_window_resize: function (event) {
		// Keep on screen
		event.data.media_player.reposition();
	},

	on_image_load: function (event) {
		if ($(this).attr("src") && event.data.media_player.current_media != null) {
			// Loaded; scale
			event.data.media_player.current_media.image_size[0] = this.width;
			event.data.media_player.current_media.image_size[1] = this.height;

			event.data.media_player.update_image_scale();
			$(this).css("display", "");
		}
	},

	on_playlist_mode_change: function (event) {
		// Change mode
		if (event.data.media_player.playlist_randomize) {
			event.data.media_player.playlist_randomize = false;
			event.data.media_player.playlist_loop = false;
		}
		else if (event.data.media_player.playlist_loop) {
			event.data.media_player.playlist_randomize = true;
		}
		else {
			event.data.media_player.playlist_loop = true;
		}

		// Label
		$(this).html(event.data.media_player.playlist_randomize ? "Randomize" : (event.data.media_player.playlist_loop ? "Loop" : "Play Once"));

		// Callback
		if (typeof(event.data.media_player.settings_callback) == "function") event.data.media_player.settings_callback(event.data.media_player);
	},
	on_playlist_onload_change: function (event) {
		// Change mode
		var v = (event.data.media_player.playlist_play_on_load + 1) % event.data.media_player.playlist_play_on_load_settings.length;
		event.data.media_player.playlist_play_on_load = v;

		// Label
		$(this).html(event.data.media_player.playlist_play_on_load_settings[event.data.media_player.playlist_play_on_load]);

		// Callback
		if (typeof(event.data.media_player.settings_callback) == "function") event.data.media_player.settings_callback(event.data.media_player);
	},
	on_playlist_scrollto_change: function (event) {
		// Change mode
		event.data.media_player.playlist_scrollto_onload = !event.data.media_player.playlist_scrollto_onload;

		// Label
		$(this).html(event.data.media_player.playlist_scrollto_onload ? "Scroll to in playlist" : "Don't scroll playlist");

		// Callback
		if (typeof(event.data.media_player.settings_callback) == "function") event.data.media_player.settings_callback(event.data.media_player);
	},
	on_ytquality_change: function (event) {
		// Change mode
		event.data.media_player.ytvideo_quality_index = (event.data.media_player.ytvideo_quality_index + 1) % event.data.media_player.ytvideo_qualities.length;

		if (event.data.media_player.ytvideo_player != null && event.data.media_player.ytvideo_player.setPlaybackQuality) {
			event.data.media_player.ytvideo_player.setPlaybackQuality(event.data.media_player.ytvideo_qualities[event.data.media_player.ytvideo_quality_index]);
		}

		// Label
		$(this).html(event.data.media_player.ytvideo_qualities[event.data.media_player.ytvideo_quality_index]);

		// Callback
		if (typeof(event.data.media_player.settings_callback) == "function") event.data.media_player.settings_callback(event.data.media_player);
	},
	on_player_theme_change: function (event) {
		// Change mode
		var first = null;
		var find = false;
		for (var theme in event.data.media_player.css.css_color_presets) {
			if (theme == "default") continue;
			if (first === null) first = theme;
			if (theme == event.data.media_player.css.preset && !find) find = true;
			else if (find) {
				find = null;
				event.data.media_player.css.load_preset(theme);
				break;
			}
		}
		if (find !== null) {
			event.data.media_player.css.load_preset(first);
		}

		// Update value editors
		event.data.media_player.update_value_fields();

		// Update stylesheet
		event.data.media_player.regen_stylesheet();

		// Label
		event.data.media_player.update_player_theme_name({media_player: event.data.media_player});

		// Callback
		if (typeof(event.data.media_player.settings_callback) == "function") event.data.media_player.settings_callback(event.data.media_player);
	},
	on_player_use_svg_update: function (event) {
		// Change mode
		event.data.media_player.use_svg = !event.data.media_player.use_svg;

		$(this).html(event.data.media_player.use_svg ? "Allowed" : "Disallowed");

		event.data.media_player.create_playback_controls();

		// Callback
		if (typeof(event.data.media_player.settings_callback) == "function") event.data.media_player.settings_callback(event.data.media_player);
	},

	on_playback_control_click: function (event) {
		if (event.data.media_player.current_media != null) {
			var time_offset = 5.0;
			switch (event.data.control_id) {
				case 0:
				{
					if (event.data.media_player.get_position() - time_offset < 0.0) event.data.media_player.previous();
					else event.data.media_player.seek_to(0.0);
				}
				break;
				case 1:
				{
					var t = event.data.media_player.get_position() - time_offset;
					if (t < 0.0) event.data.media_player.previous();
					else event.data.media_player.seek_to(t);
				}
				break;
				case 2:
				{
					if (event.data.media_player.is_paused()) {
						event.data.media_player.play();
					}
					else {
						event.data.media_player.pause();
					}
				}
				break;
				case 3:
				{
					event.data.media_player.seek_to(event.data.media_player.get_position() + time_offset);
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
	on_main_control_click: function (event) {
		switch (event.data.control_id) {
			case 0:
			{
				if (!event.data.media_player.is_maximized()) {
					event.data.media_player.maximize();
				}
				// Options
				var open = false;
				for (var i = 0; i < event.data.media_player.help_container.length; ++i) {
					if (event.data.media_player.help_container[i].css("display") != "none") {
						open = true;
						break;
					}
				}
				event.data.media_player.downloads_container.css("display", "none");
				if (open) {
					for (var i = 0; i < event.data.media_player.help_container.length; ++i) {
						event.data.media_player.help_container[i].css("display", "none");
					}
				}
				else {
					event.data.media_player.help_container[0].css("display", "");
					// Bottom offset (so not to be obscured by the footer)
					if (
						event.data.media_player.help_container_footer[0] &&
						event.data.media_player.help_container_inner1[0]
					) {
						event.data.media_player.help_container_inner1[0].css(
							"bottom", (event.data.media_player.help_container_footer[0].height()) + "px"
						);
					}
				}
			}
			break;
			case 1:
			{
				if (!event.data.media_player.is_maximized()) {
					event.data.media_player.maximize();
				}
				// Downloads
				var open = (event.data.media_player.downloads_container.css("display") == "none");
				for (var i = 0; i < event.data.media_player.help_container.length; ++i) {
					event.data.media_player.help_container[i].css("display", "none");
				}
				event.data.media_player.downloads_container.css("display", open ? "" : "none");
			}
			break;
			case 2:
			{
				if (event.data.media_player.is_in_theatre()) {
					event.data.media_player.theatre_exit();
				}
				else {
					event.data.media_player.theatre_enter({no_info: true});
				}
			}
			break;
			case 3:
			{
				if (event.data.media_player.is_maximized()) {
					event.data.media_player.minimize();
				}
				else {
					event.data.media_player.maximize();
				}
			}
			break;
			case 4:
			{
				// Close
				event.data.media_player.destroy(true);
			}
			break;
		}
	},
	on_helppage_goto: function (event) {
		for (var i = 0; i < event.data.media_player.help_container.length; ++i) {
			event.data.media_player.help_container[i].css("display", (event.data.help_page == i ? "" : "none"));
		}
	},

	on_playlist_item_click: function (event) {
		// Play
		if (event.which == 1) {
			event.data.media_player.start(event.data.playlist_item.index);
			return false;
		}
		return true;
	},

	on_playlist_control_click: function (event) {
		switch (event.data.control_id) {
			case 0:
			{
				// Delete
				event.data.media_player.remove(event.data.playlist_item.index);
			}
			return false;
			case 1:
			{
				// Move up
				var i = event.data.playlist_item.index;
				if (i > 0) {
					// Update html
					var i1 = event.data.media_player.playlist[i - 1];
					var i2 = event.data.media_player.playlist[i];
					i1.playlist_item.before(i2.playlist_item);

					// Update list order and indices
					event.data.media_player.playlist[i] = i1;
					event.data.media_player.playlist[i - 1] = i2;
					i1.index = i;
					i2.index = i - 1;
				}
			}
			break;
			case 2:
			{
				// Move down
				var i = event.data.playlist_item.index;
				if (i < event.data.media_player.playlist.length - 1) {
					// Update html
					var i1 = event.data.media_player.playlist[i];
					var i2 = event.data.media_player.playlist[i + 1];
					i1.playlist_item.before(i2.playlist_item);

					// Update list order and indices
					event.data.media_player.playlist[i + 1] = i1;
					event.data.media_player.playlist[i] = i2;
					i1.index = i + 1;
					i2.index = i;
				}
			}
			break;
			case 3:
			{
				// URL
				if (event.which == 1) {
					if (event.data.playlist_item.type == "image-audio") {
						event.stopPropagation();
						return true;
						/*prompt(
							"Right click and save as, or open in a new tab and save.\n" +
							"(Be sure to save as .ogg)",
							$(this).attr("href")
						);*/
					}
					else if (event.data.playlist_item.type == "youtube-video" || event.data.playlist_item.type == "vimeo-video") {
						event.stopPropagation();
						return true;
						//prompt("Right click/middle click to open. Original:", event.data.playlist_item.original_url);
					}
					else if (event.data.playlist_item.type == "ve") {
						event.stopPropagation();
						return true;
						/*prompt(
							"Right click and save as, or open in a new tab and save.\n" +
							"(Be sure to save as .ogg)",
							$(this).attr("href")
						);*/
					}
					else {
						console.log(event.data.playlist_item.type);
					}
				}
				else {
					return true;
				}
			}
			return false;
			case 4:
			{
				// URL
				if (event.which == 1) {
					if (event.data.playlist_item.type == "image-audio") {
						event.stopPropagation();
						return true;
						/*prompt(
							"Right click and save as, or open in a new tab and save.\n",
							$(this).attr("href")
						);*/
					}
					else if (event.data.playlist_item.type == "ve") {
						event.stopPropagation();
						return true;
						/*prompt(
							"Right click and save as, or open in a new tab and save.\n" +
							"(Be sure to save as .webm)",
							$(this).attr("href")
						);*/
					}
					else {
						console.log(event.data.playlist_item.type);
					}
				}
				else {
					return true;
				}
			}
			return false;
		}

		// Done
		return true;
	},

	on_settings_color_change: function (event) {
		// Parse value
		var value = 0;

		try {
			if (event.data.component < 3) {
				value = parseInt($(this).val());

				if (value != value) value = 0;
				else if (value < 0) value = 0;
				else if (value > 255) value = 255;
			}
			else {
				value = parseFloat($(this).val());

				if (value != value) value = 0.0;
				else if (value < 0.0) value = 0.0;
				else if (value > 1.0) value = 1.0;
			}
		}
		catch (e) {
			// not a number
		}

		// Update display
		$(this).val(value);

		// Set value
		event.data.media_player.css.modify_value(true, event.data.color_id, value, event.data.component);

		// Display value
		value = event.data.media_player.css.get_value(true, event.data.color_id);
		if (value[3] >= 1.0) {
			event.data.color_display.css("background", "rgb(" + value[0] + "," + value[1] + "," + value[2] + ")");
		}
		else {
			event.data.color_display.css("background", "rgba(" + value[0] + "," + value[1] + "," + value[2] + "," + value[3] + ")");
		}

		// Update stylesheet
		if (/volume_colors/.test(event.data.color_id)) {
			event.data.media_player.set_volume(event.data.media_player.volume);
		}
		else {
			event.data.media_player.regen_stylesheet();
		}

		// Callback
		if (typeof(event.data.media_player.settings_callback) == "function") event.data.media_player.settings_callback(event.data.media_player);
	},
	on_settings_value_change: function (event) {
		var value = $(this).val();
		if (!event.data.is_string) {
			value = parseFloat(value);
			if (value != value) value = 0.0;
			if (event.data.bounds) {
				if (value < event.data.bounds[0] && event.data.bounds[0] !== null) value = event.data.bounds[0];
				else if (value > event.data.bounds[1] && event.data.bounds[1] !== null) value = event.data.bounds[1];
			}
			$(this).val(value);
		}

		// Set value
		var no_style = false;
		if (event.data.value_id[0] == "@") {
			var name = event.data.value_id.substr(1, event.data.value_id.length - 1);
			if (name == "scale_factor") {
				event.data.media_player.update_scale_factor(value);
			}
			else {
				event.data.media_player[name] = value;
				no_style = true;
			}
		}
		else {
			event.data.media_player.css.modify_value(false, event.data.value_id, value);
		}

		// Update stylesheet
		if (!no_style) {
			event.data.media_player.regen_stylesheet();
			event.data.media_player.reposition();
		}

		// Callback
		if (typeof(event.data.media_player.settings_callback) == "function") event.data.media_player.settings_callback(event.data.media_player);
	},

	on_container_drop: function (event) {
		// Close overlays
		event.data.media_player.alert_container.css("display", "none");
		event.data.media_player.downloads_container.css("display", "none");
		for (var i = 0; i < event.data.media_player.help_container.length; ++i) {
			event.data.media_player.help_container[i].css("display", "none")
		}

		// Load
		if (event.originalEvent.dataTransfer.files.length > 0) {
			for (var i = 0; i < event.originalEvent.dataTransfer.files.length; ++i) {
				event.data.media_player.queue_load(
					event.originalEvent.dataTransfer.files[i],
					MediaPlayer.ALL_SOUNDS,
					null, null, null, null, null
				);
			}
		}
		else {
			// URL
			var data = {
				text: event.originalEvent.dataTransfer.getData("text/plain"),
				callback_data: null,
				progress_callback: null,
				done_callback: null,
				status_callback: null,
			};
			event.data.media_player.drag_callback(data);
			if (data.text) {
				event.data.media_player.queue_load(
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

		// Done
		return false;
	},
	on_container_dragover: function (event) {
		event.originalEvent.dataTransfer.dropEffect = "move";
		// Done
		return false;
	},
	on_container_dragenter: function (event) {
		event.data.media_player.alert_container.css("display", "");
		// Done
		return false;
	},
	on_container_dragexit: function (event) {
		event.data.media_player.alert_container.css("display", "none");
		// Done
		return false;
	},

	on_downloads_generate_click: function (event) {
		var mp = event.data.media_player;
		if (mp.batch_download_blob !== null) {
			(window.webkitURL || window.URL).revokeObjectURL(mp.batch_download_blob_url);
		}
		mp.batch_download_blob = null;
		mp.downloads_ready_container.css("display", "none");

		// Generation function
		var gen_function = function (files, about) {
			// Get required size
			var total_length = 0;
			var comment = "";
			for (var i = 0; i < files.length; ++i) {
				total_length += 30 + files[i][0].length + (files[i][1].size || files[i][1].length || 0);
				total_length += 46 + files[i][0].length;
			}
			total_length += 22 + comment.length;

			// Attempt buffer create
			var buffer = null;
			try {
				buffer = new Uint8Array(new ArrayBuffer(total_length));
			}
			catch (e) {
				console.log(e);
				return false;
			}

			// Create
			var zw = new ZipWriter(buffer, comment);
			mp.downloads_generate_link(files, zw, about, 0);
		};

		// Generate filename list
		var files = [];
		var about = "";
		if (event.data.type == "sounds") {
			for (var i = 0; i < mp.playlist.length; ++i) {
				if (mp.playlist[i].type == "image-audio") {
					// Get the filename
					var fn = mp.playlist[i].title;
					var ext = ".ogg";
					try {
						fn = mp.normalize_filename(unescape(encodeURIComponent(fn)));
					}
					catch (e) {
						console.log(e);
					}
					// Make sure it's unique
					var n = 1;
					var name = fn + ext;
					for (var j = 0; j < files.length; ++j) {
						if (name == files[j][0]) {
							name = fn + (fn.length > 0 ? " " : "") + "(" + (++n) + ")" + ext;
							j = -1;
							continue;
						}
					}
					fn = name;
					// Add
					files.push([fn, mp.playlist[i].audio_blob]);
				}
			}

			about = function (files) {
				return " to download " + files.length + " sound" + (files.length == 1 ? "" : "s") + " (save as .zip)";
			};

			gen_function(files, about);
		}
		else { // images, images2
			about = function (files) {
				return " to download " + files.length + " image" + (files.length == 1 ? "" : "s") + " (save as .zip)";
			};

			mp.downloads_generate_image_list(files, about, gen_function, (event.data.type == "images2"), 0);
		}

		// Done
		return false;
	},
	on_downloads_link_click: function (event) {
		if (event.which == 1) {
			event.stopPropagation();
			return true;
		}
		return true;
	},

	cancel_event: function (event) {
		// Done
		return false;
	}
};
MediaPlayer.ALL_SOUNDS = true;



///////////////////////////////////////////////////////////////////////////////
// .zip archive writer
///////////////////////////////////////////////////////////////////////////////
function ZipWriter (buffer, comment) {
	this.buffer = buffer;
	this.comment = comment || "";
	this.date = new Date();
	this.pos = 0;
	this.offsets = new Array();
	this.crc32s = new Array();
	this.sizes = new Array();
	this.fnames = new Array();
};
ZipWriter.prototype = {
	constructor: ZipWriter,
	date_convert: function (date) {
		var mod_time = (Math.floor(date.getSeconds() / 2) | (date.getMinutes() << 5) | (date.getHours() << 11));
		var mod_date = ((date.getDate()) | ((date.getMonth() + 1) << 5) | ((date.getFullYear() - 1980) << 9));

		return [ mod_time , mod_date ];
	},
	write_end: function () {
		var date = this.date_convert(this.date);
		var cd_pos = this.pos;

		for (var i = 0; i < this.fnames.length; ++i) {
			this.write_data(0x02014b50, 4); // Signature
			this.write_data(20, 2); // Version
			this.write_data(20, 2); // Version required
			this.write_data(0, 2); // Flags
			this.write_data(0, 2); // Compression
			this.write_data(date[0], 2); // Mod time
			this.write_data(date[1], 2); // Mod date
			this.write_data(this.crc32s[i], 4); // CRC
			this.write_data(this.sizes[i], 4); // Compressed size
			this.write_data(this.sizes[i], 4); // Uncompressed size
			this.write_data(this.fnames[i].length, 2); // File name length
			this.write_data(0, 2); // Extra field length
			this.write_data(0, 2); // Comment length
			this.write_data(0, 2); // Disk number start
			this.write_data(0, 2); // Internal attr
			this.write_data(32, 4); // External attr
			this.write_data(this.offsets[i], 4); // Offset
			this.write_data(this.fnames[i], this.fnames[i].length); // File name
		}

		// End
		var cd_end_pos = this.pos;
		this.write_data(0x06054b50, 4); // Signature
		this.write_data(0, 2); // Disk number
		this.write_data(0, 2); // Disk number with cd
		this.write_data(this.fnames.length, 2); // Disk entries
		this.write_data(this.fnames.length, 2); // Total entries
		this.write_data(cd_end_pos - cd_pos, 4); // cd size
		this.write_data(cd_pos, 4); // cd size
		this.write_data(this.comment.length, 2); // comment
		this.write_data(this.comment, this.comment.length); // comment
	},
	write_file: function (filename, filedata) {
		var crc = this.crc32(filedata);
		this.offsets.push(this.pos);
		this.crc32s.push(crc);
		this.sizes.push(filedata.length);
		this.fnames.push(filename);

		var date = this.date_convert(this.date);

		this.write_data(0x04034b50, 4); // Signature
		this.write_data(20, 2); // Version
		this.write_data(0, 2); // Flags
		this.write_data(0, 2); // Compression
		this.write_data(date[0], 2); // Mod time
		this.write_data(date[1], 2); // Mod date
		this.write_data(crc, 4); // CRC
		this.write_data(filedata.length, 4); // Compressed size
		this.write_data(filedata.length, 4); // Uncompressed size
		this.write_data(filename.length, 2); // Filename length
		this.write_data(0, 2); // Comment length
		this.write_data(filename, filename.length); // Filename
		this.write_data(filedata, filedata.length); // File data
	},
	write_data: function (data, bytes) {
		if (typeof(data) === typeof(0)) {
			data = data & 0xFFFFFFFF;
			for (var i = 0; i < bytes; ++i) {
				this.buffer[this.pos] = data & 0xFF;
				++this.pos;
				data = data >>> 8;
			}
		}
		else if (typeof(data) === typeof("")) {
			var len;
			try {
				len = data.length;
			}
			catch (e) {
				len = bytes;
			}
			for (var i = 0; i < len; ++i) {
				this.buffer[this.pos] = data.charCodeAt(i);
				++this.pos;
			}
		}
		else {
			for (var i = 0; i < data.length; ++i) {
				this.buffer[this.pos] = data[i];
				++this.pos;
			}
		}
	},
	crc32: function (value) {
		var table = "00000000 77073096 EE0E612C 990951BA 076DC419 706AF48F E963A535 9E6495A3 0EDB8832 79DCB8A4 E0D5E91E 97D2D988 09B64C2B 7EB17CBD E7B82D07 90BF1D91 1DB71064 6AB020F2 F3B97148 84BE41DE 1ADAD47D 6DDDE4EB F4D4B551 83D385C7 136C9856 646BA8C0 FD62F97A 8A65C9EC 14015C4F 63066CD9 FA0F3D63 8D080DF5 3B6E20C8 4C69105E D56041E4 A2677172 3C03E4D1 4B04D447 D20D85FD A50AB56B 35B5A8FA 42B2986C DBBBC9D6 ACBCF940 32D86CE3 45DF5C75 DCD60DCF ABD13D59 26D930AC 51DE003A C8D75180 BFD06116 21B4F4B5 56B3C423 CFBA9599 B8BDA50F 2802B89E 5F058808 C60CD9B2 B10BE924 2F6F7C87 58684C11 C1611DAB B6662D3D 76DC4190 01DB7106 98D220BC EFD5102A 71B18589 06B6B51F 9FBFE4A5 E8B8D433 7807C9A2 0F00F934 9609A88E E10E9818 7F6A0DBB 086D3D2D 91646C97 E6635C01 6B6B51F4 1C6C6162 856530D8 F262004E 6C0695ED 1B01A57B 8208F4C1 F50FC457 65B0D9C6 12B7E950 8BBEB8EA FCB9887C 62DD1DDF 15DA2D49 8CD37CF3 FBD44C65 4DB26158 3AB551CE A3BC0074 D4BB30E2 4ADFA541 3DD895D7 A4D1C46D D3D6F4FB 4369E96A 346ED9FC AD678846 DA60B8D0 44042D73 33031DE5 AA0A4C5F DD0D7CC9 5005713C 270241AA BE0B1010 C90C2086 5768B525 206F85B3 B966D409 CE61E49F 5EDEF90E 29D9C998 B0D09822 C7D7A8B4 59B33D17 2EB40D81 B7BD5C3B C0BA6CAD EDB88320 9ABFB3B6 03B6E20C 74B1D29A EAD54739 9DD277AF 04DB2615 73DC1683 E3630B12 94643B84 0D6D6A3E 7A6A5AA8 E40ECF0B 9309FF9D 0A00AE27 7D079EB1 F00F9344 8708A3D2 1E01F268 6906C2FE F762575D 806567CB 196C3671 6E6B06E7 FED41B76 89D32BE0 10DA7A5A 67DD4ACC F9B9DF6F 8EBEEFF9 17B7BE43 60B08ED5 D6D6A3E8 A1D1937E 38D8C2C4 4FDFF252 D1BB67F1 A6BC5767 3FB506DD 48B2364B D80D2BDA AF0A1B4C 36034AF6 41047A60 DF60EFC3 A867DF55 316E8EEF 4669BE79 CB61B38C BC66831A 256FD2A0 5268E236 CC0C7795 BB0B4703 220216B9 5505262F C5BA3BBE B2BD0B28 2BB45A92 5CB36A04 C2D7FFA7 B5D0CF31 2CD99E8B 5BDEAE1D 9B64C2B0 EC63F226 756AA39C 026D930A 9C0906A9 EB0E363F 72076785 05005713 95BF4A82 E2B87A14 7BB12BAE 0CB61B38 92D28E9B E5D5BE0D 7CDCEFB7 0BDBDF21 86D3D2D4 F1D4E242 68DDB3F8 1FDA836E 81BE16CD F6B9265B 6FB077E1 18B74777 88085AE6 FF0F6A70 66063BCA 11010B5C 8F659EFF F862AE69 616BFFD3 166CCF45 A00AE278 D70DD2EE 4E048354 3903B3C2 A7672661 D06016F7 4969474D 3E6E77DB AED16A4A D9D65ADC 40DF0B66 37D83BF0 A9BCAE53 DEBB9EC5 47B2CF7F 30B5FFE9 BDBDF21C CABAC28A 53B39330 24B4A3A6 BAD03605 CDD70693 54DE5729 23D967BF B3667A2E C4614AB8 5D681B02 2A6F2B94 B40BBE37 C30C8EA1 5A05DF1B 2D02EF8D";
		var crc = 0;
		var y;

		var t = [];
		for (var i = 0; i < table.length; i += 9) {
			t.push(0 ^ ("0x" + table.substr(i, 8)));
		}

		crc = crc ^ (-1);
		var iMax = value.length;
		for (var i = 0; i < iMax; ++i) {
			y = (crc ^ value[i]) & 0xFF;
			crc = (crc >>> 8) ^ t[((crc ^ value[i]) & 0xFF)];
		}

		return (crc ^ (-1)) >>> 0;
	}
};



///////////////////////////////////////////////////////////////////////////////
// Vimeo video manager
///////////////////////////////////////////////////////////////////////////////
function VimeoManager (iframe) {
	var self = this;

	this.iframe = iframe;
	this.is_ready = false;
	this.ready_called = false;

	this.url = this.iframe.getAttribute("src").split("?")[0].split("#")[0];
	if (this.url.substr(0, 2) == "//") this.url = window.location.protocol + this.url;

	var url_parts = this.url.split("/");
	this.domain = "";
	for (var i = 0; i < url_parts.length; ) {
		this.domain += url_parts[i];
		if (++i >= 3) break;
		this.domain += "/";
	}

	this.on_message_received = function (event) {
		// event
		if (event.origin != self.domain) return false;
		self.handle_event(JSON.parse(event.data));
	};
	this.events = {};
	this.callbacks = {};

	// Message listeners
	if (window.addEventListener){
		window.addEventListener("message", this.on_message_received, false);
	}
	else {
		window.attachEvent("onmessage", this.on_message_received, false);
	}
}
VimeoManager.prototype = {
	constructor: VimeoManager,
	destructor: function () {
		if (window.addEventListener){
			window.removeEventListener("message", this.on_message_received, false);
		}
		else {
			window.detachEvent("onmessage", this.on_message_received, false);
		}
	},
	api_call: function (action, value) {
		var data = { "method": action };
		if (value) {
			if (typeof(value) == typeof(function(){})) {
				this.callbacks[action] = value;
			}
			else {
				data.value = value;
			}
		}
		this.iframe.contentWindow.postMessage(JSON.stringify(data), this.url);
	},
	add_event: function (name, callback) {
		this.events[name] = callback;
		if (this.is_ready) {
			if (name == "ready" && !this.ready_called) {
				this.ready_called = true;
				this.events[name].call(this, {});
			}
			// Add as listener
			this.api_call("addEventListener", name);
		}
	},
	handle_event: function (data) {
		if (data.method) {
			// Get callback
			if (data.method in this.callbacks) {
				this.callbacks[data.method].call(this, data.value);
				delete this.callbacks[data.method];
			}
			return;
		}
		if (data.event == "ready") {
			this.is_ready = true;
			this.ready_called = (data.event in this.events);
			// Add listeners
			for (var e in this.events) {
				this.api_call("addEventListener", e);
			}
		}
		if (data.event in this.events) {
			this.events[data.event].call(this, data.data);
		}
	}
};



///////////////////////////////////////////////////////////////////////////////
// Soundcloud video manager
///////////////////////////////////////////////////////////////////////////////
function SoundcloudManager (iframe) {
	var self = this;

	this.iframe = iframe;
	this.is_ready = false;
	this.ready_called = false;

	this.url = this.iframe.getAttribute("src").split("?")[0].split("#")[0];
	if (this.url.substr(0, 2) == "//") this.url = window.location.protocol + this.url;
	this.url = this.url.replace(/^http:/, "https:");

	var url_parts = this.url.split("/");
	this.domain = "";
	for (var i = 0; i < url_parts.length; ) {
		this.domain += url_parts[i];
		if (++i >= 3) break;
		this.domain += "/";
	}
	this.domain = this.domain.replace(/^http:/, "https:");

	this.on_message_received = function (event) {
		// event
		if (event.origin != self.domain) return false;
		self.handle_event(JSON.parse(event.data));
	};
	this.events = {};
	this.callbacks = {};

	// Message listeners
	if (window.addEventListener){
		window.addEventListener("message", this.on_message_received, false);
	}
	else {
		window.attachEvent("onmessage", this.on_message_received, false);
	}
}
SoundcloudManager.prototype = {
	constructor: SoundcloudManager,
	destructor: function () {
		if (window.addEventListener){
			window.removeEventListener("message", this.on_message_received, false);
		}
		else {
			window.detachEvent("onmessage", this.on_message_received, false);
		}
	},
	api_call: function (action, value) {
		var data = { "method": action };
		if (value) {
			if (typeof(value) == typeof(function(){})) {
				this.callbacks[action] = value;
			}
			else {
				data.value = value;
			}
		}
		this.iframe.contentWindow.postMessage(JSON.stringify(data), this.url);
	},
	add_event: function (name, callback) {
		this.events[name] = callback;
		if (this.is_ready) {
			if (name == "ready" && !this.ready_called) {
				this.ready_called = true;
				this.events[name].call(this, {});
			}
			// Add as listener
			this.api_call("addEventListener", name);
		}
	},
	handle_event: function (data) {
		var event = data.method;

		// Get callback
		if (event in this.callbacks) {
			this.callbacks[event].call(this, data.value);
			delete this.callbacks[event];
			return;
		}
		if (event == "ready") {
			this.is_ready = true;
			this.ready_called = (event in this.events);
			// Add listeners
			for (var e in this.events) {
				this.api_call("addEventListener", e);
			}
		}
		if (event in this.events) {
			this.events[event].call(this, data.value);
		}
	}
};


////////////////////////////////////////////////////////////////////////////////
//} /MediaPlayer.js
////////////////////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////////////////////////
//{ Userscript
////////////////////////////////////////////////////////////////////////////////



///////////////////////////////////////////////////////////////////////////////
// Base site version comparing
///////////////////////////////////////////////////////////////////////////////
var no_load = false;
var is_homepage = false;
if (/http\:\/\/dnsev\.github\.io\/4cs\//.test(window.location.href + "")) {
	is_homepage = true;

	if (/http\:\/\/dnsev\.github\.io\/4cs\/play($|\/.*)/.test(window.location.href + "")) {
		// play
	}
	else {
		$(document).ready(function () {
			// Get the version
			var version = "";
			try {
				version = GM_info.script.version;
			}
			catch (e) {
				try {
					version = GM_getMetadata("version").toString();
				}
				catch (e) {
					version = null;
				}
			}
			if (version !== null) {
				// Perform an update check
				document.dispatchEvent(new CustomEvent("api_4cs_version_check", {
					detail: {
						version: version
					}
				}));
			}
		});
		no_load = true;
	}
}
if (/:\/\/boards\.4chan\.org\/f\//.test(window.location.href + "")) {
	no_load = true;
}



///////////////////////////////////////////////////////////////////////////////
// Bug-fixes for other userscripts and compatability
///////////////////////////////////////////////////////////////////////////////
window.$.prototype.exists = function () {
	// Bugfix for 4chan Style Script on Google Chrome in Tampermonkey
	// Somehow, their pseudo-jQuery conflicts with this legit jQuery
	return (this.length > 0);
}

if (!GM_getValue || (GM_getValue.toString && GM_getValue.toString().indexOf("not supported") >= 0)) {
	// Make sure get/set value functions exist
	GM_getValue = function (key, def) {
		return localStorage.getItem(key) || def;
	};
	GM_setValue = function (key, value) {
		return localStorage.setItem(key, value);
	};
	GM_deleteValue = function (key) {
		return localStorage.removeItem(key);
	};
}



///////////////////////////////////////////////////////////////////////////////
// Multi-use
///////////////////////////////////////////////////////////////////////////////
var is_38 = ((document.location + "").indexOf("boards.38chan.net") >= 0);
var is_archive = !is_38 && ((document.location + "").indexOf("boards.4chan.org") < 0);

function string_to_uint8array(str) {
	var array = new Uint8Array(new ArrayBuffer(str.length));
	for (var i = 0; i < str.length; ++i) {
		array[i] = str.charCodeAt(i);
	}
	return array;
}
function arraybuffer_to_uint8array(buffer) {
	return new Uint8Array(buffer);
}
function uint8array_compare(a1, a2, start1, start2, len) {
	if (a1.length < start1 + len || a2.length < start2 + len) return false;

	for (var i = 0; i < len; ++i) {
		if (a1[start1 + i] != a2[start2 + i]) return false;
	}

	return true;
}

function is_chrome() {
	return ((navigator.userAgent + "").indexOf(" Chrome/") >= 0);
}
function ajax_get(url, return_as_string, callback_data, progress_callback, done_callback) {
	if (is_chrome()) {
		var xhr = new XMLHttpRequest();
		xhr.open("GET", url, true);
		if (!return_as_string) xhr.overrideMimeType("text/plain; charset=x-user-defined");
		xhr.responseType = (return_as_string ? "text" : "arraybuffer");

		xhr.onload = function (event) {
			if (typeof(done_callback) == "function") {
				if (this.status == 200) {
					done_callback(
						true,
						callback_data,
						(return_as_string ? this.response : arraybuffer_to_uint8array(this.response))
					);
				}
				else {
					done_callback(false, callback_data, {
						status: this.status,
						response: this.response,
						status_text: this.statusText
					});
				}
			}
		};
		if (typeof(progress_callback) == "function") {
			xhr.onprogress = function (event) {
				progress_callback(event, callback_data);
			};
		}
		xhr.send();

		return xhr;
	}
	else {
		var arg = {
			method: "GET",
			url: url,
			onload: function (event) {
				if (typeof(done_callback) == "function") {
					if (event.status == 200) {
						done_callback(
							true,
							callback_data,
							(return_as_string ? event.responseText : string_to_uint8array(event.responseText))
						);
					}
					else {
						done_callback(false, callback_data, {
							status: event.status,
							response: event.responseText,
							status_text: event.statusText
						});
					}
				}
			}
		};
		if (!return_as_string) arg.overrideMimeType = "text/plain; charset=x-user-defined";
		if (typeof(progress_callback) == "function") {
			arg.onprogress = function (event) {
				progress_callback(event, callback_data);
			};
		}
		var g = GM_xmlhttpRequest(arg);
		return g;
	}
}
function ajax(data) {
	var on = data.on || {};

	if (is_chrome() || data.force_xhr) {
		// Create
		var xhr = new XMLHttpRequest();

		// Open
		xhr.open(data.method || "GET", data.url, true);
		if (data.cred) xhr.withCredentials = true;

		// Return type
		if (data.return_type == "arraybuffer") {
			xhr.overrideMimeType("text/plain; charset=x-user-defined");
			xhr.responseType = "arraybuffer";
		}
		else {
			xhr.responseType = "text";
		}

		// Load
		if (typeof(on.done) == "function") {
			xhr.onload = function (event) {
				if (this.status == 200) {
					// Convert to array buffer
					if (data.return_type == "arraybuffer") {
						this.response = arraybuffer_to_uint8array(this.response);
					}

					// Good callback
					on.done(true, data, this.response);
				}
				else {
					// Bad callback
					on.done(false, data, {
						status: this.status,
						response: this.response,
						status_text: this.statusText
					});
				}
			};
		}

		// Progress
		if (typeof(on.progress) == "function") {
			xhr.onprogress = function (event) {
				on.progress(event, data);
			};
		}

		// Error
		if (typeof(on.error) == "function") {
			xhr.onerror = function (event) {
				on.error(event, data);
			};
		}

		// Abort
		if (typeof(on.abort) == "function") {
			xhr.onabort = function (event) {
				on.abort(event, data);
			};
		}

		// Upload progress
		if (on.upload && typeof(on.upload.progress) == "function") {
			xhr.upload.onprogress = function (event) {
				on.upload.progress(event, data);
			};
		}

		// Upload error
		if (on.upload && typeof(on.upload.error) == "function") {
			xhr.upload.onerror = function (event) {
				on.upload.error(event, data);
			};
		}

		// Abort
		if (on.upload && typeof(on.upload.abort) == "function") {
			xhr.upload.onabort = function (event) {
				on.upload.abort(event, data);
			};
		}

		// Send
		if (data.post_data) xhr.send(data.post_data);
		else xhr.send();

		// Return
		return xhr;
	}
	else {
		// Args
		var arg = {
			method: (data.method || "GET"),
			url: data.url,
		};

		// Data
		if (data.post_data) {
			arg.data = data.post_data;
		}

		// Return type
		if (data.return_type == "arraybuffer") {
			arg.overrideMimeType = "text/plain; charset=x-user-defined";
		}

		// Load
		if (typeof(on.done) == "function") {
			arg.onload = function (event) {
				if (event.status == 200) {
					if (data.return_type == "arraybuffer") {
						event.responseText = arraybuffer_to_uint8array(event.responseText);
					}

					on.done(true, data, event.responseText);
				}
				else {
					on.done(false, data, {
						status: event.status,
						response: event.responseText,
						status_text: event.statusText
					});
				}
			};
		}

		// Progress
		if (typeof(on.progress) == "function") {
			arg.onprogress = function (event) {
				on.progress(event, data);
			};
		}

		// Error
		if (typeof(on.error) == "function") {
			arg.onerror = function (event) {
				on.error(event, data);
			};
		}

		// Abort
		if (typeof(on.abort) == "function") {
			arg.onabort = function (event) {
				on.abort(event, data);
			};
		}

		// Upload progress
		if (on.upload && typeof(on.upload.progress) == "function") {
			arg.upload.onprogress = function (event) {
				on.upload.progress(event, data);
			};
		}

		// Upload error
		if (on.upload && typeof(on.upload.error) == "function") {
			arg.upload.onerror = function (event) {
				on.upload.error(event, data);
			};
		}

		// Upload abort
		if (on.upload && typeof(on.upload.abort) == "function") {
			arg.upload.onabort = function (event) {
				on.upload.abort(event, data);
			};
		}

		// Send
		var g = GM_xmlhttpRequest(arg);

		// Return
		return g;
	}
}

function xml_find_nodes_by_name(xml, name) {
	// Because chrome is bad
	var nodes = [], n2;

	for (var n = 0; n < xml.childNodes.length; ++n) {
		if (xml.childNodes[n].nodeName != "#text") {
			if (xml.childNodes[n].nodeName == name) nodes.push(xml.childNodes[n]);

			n2 = xml_find_nodes_by_name(xml.childNodes[n], name);
			if (n2.length > 0) nodes = nodes.concat(n2);
		}
	}

	return nodes;
}

function E(elem) {
	return jQuery(document.createElement(elem));
}
function T(text) {
	return jQuery(document.createTextNode(text));
}

function text_to_html(str) {
	return str.replace(/&/g, "&amp;")
		.replace(/>/g, "&gt;")
		.replace(/</g, "&lt;")
		.replace(/"/g, "&quot;");
}
function html_to_text(str) {
	return str.replace(/&quot;/g, "\"")
		.replace(/&lt;/g, "<")
		.replace(/&gt;/g, ">")
		.replace(/&amp;/g, "&");
}

function string_remove_tags(str) {
	return str.replace(/<[^>]*>?/g, "");
}

function dom_replace(tag, check_callback, replace_callback) {
	var c = tag.contents();
	var sub_tags = [ new Array() ];
	var check, t;

	var f, found = false;
	var i = 0;
	for (var j = 0; j < c.length; ++j) {
		t = $(c[j]);
		check = check_callback(t, sub_tags[i]);

		// 0: Ignore tag, don't parse into
		// 1: Parse standalone
		// 2: Parse in group
		if (check <= 1 && sub_tags[i].length > 0) {
			sub_tags.push(new Array());
			++i;
		}
		if (check >= 1) {
			// Sub-scan
			f = false;
			if (
				t.prop("tagName") === undefined ||
				t.contents().length <= 0 ||
				!(f = dom_replace(t, check_callback, replace_callback))
			) {
				sub_tags[i].push(t);
			}
			else if (!found && f) {
				found = true;
			}
		}
	}

	// Replace
	for (i = 0; i < sub_tags.length && sub_tags[i].length > 0; ++i) {
		found = (replace_callback(sub_tags[i]) || found);
	}

	// Done
	return found;
}

function decode_utf8(s) {
	return decodeURIComponent(escape(s));
}
function encode_utf8(s) {
	return unescape(encodeURIComponent(s));
}

function has_4chan_pass() {
	var p = document.cookie.match(/pass_enabled=([^;]+)/);
	return (p ? true : false);
}

function random_string(len, chars) {
	var s = "";
	chars = chars || "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
	for (var i = 0; i < len; ++i) {
		s += chars[Math.floor(Math.random() * chars.length)];
	}
	return s;
}
function random_integer(max) {
	return Math.floor(Math.random() * max);
}



///////////////////////////////////////////////////////////////////////////////
// Any images
///////////////////////////////////////////////////////////////////////////////
function image_load_callback(url_or_filename, load_tag, raw_ui8_data, done_callback) {
	// Not an image
	var ext = url_or_filename.split(".").pop().toLowerCase();
	if (ext != "png" && ext != "gif" && ext != "jpg" && ext != "jpeg") {
		done_callback(null);
		return;
	}

	// Footer
	var has_footer = true;
	var footer = "4SPF";
	for (var i = 0; i < footer.length; ++i) {
		if (raw_ui8_data[raw_ui8_data.length - footer.length + i] != footer.charCodeAt(i)) {
			has_footer = false;
			break;
		}
	}

	// Search image
	var sounds = [];
	if (has_footer) {
		// Not supported
		done_callback(null);
	}
	else {
		// No footer
		var magic_strings = [ "OggS\x00\x02" , "moot\x00\x02" , "Krni\x00\x02" ];
		var magic_strings_ui8 = [ string_to_uint8array(magic_strings[0]) , string_to_uint8array(magic_strings[1]) , string_to_uint8array(magic_strings[2]) ];
		var magic_strings_ui8_length = magic_strings_ui8.length;
		var magic_strings_fix_size = 4;
		var len, s, i, j, k, found, tag, temp_tag, data, id;
		var sound_index = 0;
		var sound_start_offset = -1;
		var sound_magic_string_index = -1;
		var sound_masked_state = null;
		var sound_masked_mask = null;
		var unmask_state = 0, mask, unmask_state_temp, mask_temp, masked;
		var tag_start = 0, tag_start2 = 0, tag_state, tag_mask, tag_pos, tag_indicators = [ "[".charCodeAt(0) , "]".charCodeAt(0) ];
		var tag_max_length = 100;
		var imax = raw_ui8_data.length - magic_strings_ui8[0].length;
		var ms, t1, ms_len, bit_ord;
		for (i = 0; i < imax; ++i) {
			// Unmasking
			unmask_state = (1664525 * unmask_state + 1013904223) & 0xFFFFFFFF;
			mask = unmask_state >>> 24;
			unmask_state += (t1 = (raw_ui8_data[i] ^ mask));

			// Tag check
			if (t1 == tag_indicators[0]) {
				tag_start = i;
				tag_state = unmask_state;
				tag_mask = mask;
			}
			if (raw_ui8_data[i] == tag_indicators[0]) tag_start2 = i;

			// Match headers
			found = false;
			masked = false;
			for (s = 0; s < magic_strings_ui8_length; ++s) {
				ms = magic_strings_ui8[s];
				ms_len = ms.length;
				for (j = 0; j < ms_len; ++j) {
					if (raw_ui8_data[i + j] != ms[j]) break;
				}
				if (j == ms_len) {
					found = true;
					break;
				}
			}
			if (!found) {
				for (s = 0; s < magic_strings_ui8_length; ++s) {
					ms = magic_strings_ui8[s];
					ms_len = ms.length;
					unmask_state_temp = unmask_state;
					mask_temp = mask;
					bit_ord = (raw_ui8_data[i] ^ mask_temp);
					for (j = 0; true; ) {
						if (bit_ord != ms[j]) break;

						if (++j >= ms_len) break;
						unmask_state_temp = (1664525 * unmask_state_temp + 1013904223) & 0xFFFFFFFF;
						mask_temp = unmask_state_temp >>> 24;
						bit_ord = (raw_ui8_data[i + j] ^ mask_temp);
						unmask_state_temp += bit_ord;
					}
					if (j == ms_len) {
						found = true;
						masked = true;
						break;
					}
				}
			}
			if (found) {
				// Find the key location
				tag_pos = i;
				k = 1;
				tag = load_tag || "[Name Unknown]";
				if (masked) {
					// Get the tag
					if (i - tag_start < tag_max_length) {
						temp_tag = "";
						for (j = tag_start + 1; j < i; ++j) {
							tag_state = (1664525 * tag_state + 1013904223) & 0xFFFFFFFF;
							tag_mask = tag_state >>> 24;
							bit_ord = (raw_ui8_data[j] ^ tag_mask);
							tag_state += bit_ord;

							if (bit_ord == tag_indicators[1]) break;
							temp_tag += String.fromCharCode(bit_ord);
						}
						if (j < i) {
							tag = decode_utf8(temp_tag);
							tag_pos = tag_start;
						}
					}
				}
				else {
					if (i - tag_start2 < tag_max_length) {
						temp_tag = "";
						for (j = tag_start2 + 1; j < i; ++j) {
							if (raw_ui8_data[j] == tag_indicators[1]) break;
							temp_tag += String.fromCharCode(raw_ui8_data[j]);
						}
						if (j < i) {
							tag = decode_utf8(temp_tag);
							tag_pos = tag_start;
						}
					}
				}
				tag = (tag && tag !== true ? tag : "?");

				// If there was an old sound, complete it
				if (sounds.length > 0) {
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
				// New sound
				sounds.push({
					"title": tag,
					"flagged": (load_tag != MediaPlayer.ALL_SOUNDS && load_tag.toLowerCase() != tag.toLowerCase()),
					"index": sound_index,
					"position": i,
					"data": null,
					"format": "concat." + s + (masked ? ".masked" : "")
				});
				// Next
				sound_start_offset = i;
				sound_magic_string_index = s;
				sound_masked_state = (masked ? unmask_state : null);
				sound_masked_mask = (masked ? mask : null);
				sound_index += 1;
			}
		}
		// Complete any sounds
		if (sounds.length > 0) {
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
		// Fix sound headers
		s = 0;
		for (i = 0; i < sounds.length; ++i) {
			if (sounds[i].data.length > magic_strings_ui8[s].length) {
				for (j = 0; j < magic_strings_ui8[s].length; ++j) {
					sounds[i].data[j] = magic_strings_ui8[s][j];
				}
			}
		}
	}

	// Search
	if (sounds.length == 0) {
		done_callback(null);
		return;
	}

	// List names
	var sound_names = [];
	for (var i = 0; i < sounds.length; ++i) sound_names.push(sounds[i]["title"] + ".ogg");

	// Single sound?
	if (load_tag !== MediaPlayer.ALL_SOUNDS) {
		// Find the correct tag to use
		var found = null;
		for (var i = 0; i < sounds.length; ++i) {
			if (sounds[i]["title"] == load_tag) {
				found = i;
				break;
			}
		}
		if (found === null) {
			for (var i = 0; i < sounds.length; ++i) {
				if (sounds[i]["title"].toLowerCase() == load_tag.toLowerCase()) {
					found = i;
					break;
				}
			}
			if (found === null) {
				found = 0;
			}
		}
		// Modify sounds
		sounds = [ sounds[found] ];
	}

	// Done
	done_callback([ sound_names , sounds ]);
}
function image_load_callback_asynchronous(url_or_filename, load_tag, raw_ui8_data, done_callback) {
	try {
		var loop = new Loop();
		loop.steps = script.settings["performance"]["async_rate"];
		loop.timeout = script.settings["performance"]["async_delay"];
	}
	catch (e) {
		console.log(e);
		return image_load_callback(url_or_filename, load_tag, raw_ui8_data, done_callback);
	}

	// Not an image
	var ext = url_or_filename.split(".").pop().toLowerCase();
	if (ext != "png" && ext != "gif" && ext != "jpg" && ext != "jpeg") {
		done_callback(null);
		return;
	}

	// Footer
	var has_footer = true;
	var footer = "4SPF";
	for (var i = 0; i < footer.length; ++i) {
		if (raw_ui8_data[raw_ui8_data.length - footer.length + i] != footer.charCodeAt(i)) {
			has_footer = false;
			break;
		}
	}

	// Search image
	var sounds = [];

	var on_complete = function () {
		// Search
		if (sounds.length == 0) {
			done_callback(null);
			return;
		}

		// List names
		var sound_names = [];
		for (var i = 0; i < sounds.length; ++i) sound_names.push(sounds[i]["title"] + ".ogg");

		// Single sound?
		if (load_tag !== MediaPlayer.ALL_SOUNDS) {
			// Find the correct tag to use
			var found = null;
			for (var i = 0; i < sounds.length; ++i) {
				if (sounds[i]["title"] == load_tag) {
					found = i;
					break;
				}
			}
			if (found === null) {
				for (var i = 0; i < sounds.length; ++i) {
					if (sounds[i]["title"].toLowerCase() == load_tag.toLowerCase()) {
						found = i;
						break;
					}
				}
				if (found === null) {
					found = 0;
				}
			}
			// Modify sounds
			sounds = [ sounds[found] ];
		}

		// Done
		done_callback([ sound_names , sounds ]);
	};

	if (has_footer) {
		// Not supported
		done_callback(null);
	}
	else {
		// No footer
		var magic_strings = [ "OggS\x00\x02" , "moot\x00\x02" , "Krni\x00\x02" ];
		var magic_strings_ui8 = [ string_to_uint8array(magic_strings[0]) , string_to_uint8array(magic_strings[1]) , string_to_uint8array(magic_strings[2]) ];
		var magic_strings_fix_size = 4;
		var len, s, i, j, k, found, tag, temp_tag, data, id;
		var sound_index = 0;
		var sound_start_offset = -1;
		var sound_magic_string_index = -1;
		var sound_masked_state = null;
		var sound_masked_mask = null;
		var unmask_state = 0, mask, unmask_state_temp, mask_temp, masked;
		var tag_start = 0, tag_start2 = 0, tag_state, tag_mask, tag_pos, tag_indicators = [ "[".charCodeAt(0) , "]".charCodeAt(0) ];
		var tag_max_length = 100;
		var imax = raw_ui8_data.length - magic_strings_ui8[0].length;
		var ms, t1;

		loop.for_lt(
			0, imax, 1,
			{},
			function (i, data, loop) {
				// Unmasking
				unmask_state = (1664525 * unmask_state + 1013904223) & 0xFFFFFFFF;
				mask = unmask_state >>> 24;
				unmask_state += (t1 = (raw_ui8_data[i] ^ mask));

				// Tag check
				if (t1 == tag_indicators[0]) {
					tag_start = i;
					tag_state = unmask_state;
					tag_mask = mask;
				}
				if (raw_ui8_data[i] == tag_indicators[0]) tag_start2 = i;

				// Match headers
				found = false;
				masked = false;
				for (s = 0; s < magic_strings_ui8.length; ++s) {
					ms = magic_strings_ui8[s];
					for (j = 0; j < ms.length; ++j) {
						if (raw_ui8_data[i + j] != ms[j]) break;
					}
					if (j == ms.length) {
						found = true;
						break;
					}

					if (found) break;
				}
				if (!found) {
					for (s = 0; s < magic_strings_ui8.length; ++s) {
						ms = magic_strings_ui8[s];
						unmask_state_temp = unmask_state;
						mask_temp = mask;
						for (j = 0; true; ) {
							if ((raw_ui8_data[i + j] ^ mask_temp) != ms[j]) break;

							if (++j >= ms.length) break;
							unmask_state_temp = (1664525 * unmask_state_temp + 1013904223) & 0xFFFFFFFF;
							mask_temp = unmask_state_temp >>> 24;
							unmask_state_temp += (raw_ui8_data[i + j] ^ mask_temp);
						}
						if (j == ms.length) {
							found = true;
							masked = true;
							break;
						}
					}
				}
				if (found) {
					// Find the key location
					tag_pos = i;
					k = 1;
					tag = load_tag || "[Name Unknown]";
					if (masked) {
						// Get the tag
						if (i - tag_start < tag_max_length) {
							temp_tag = "";
							for (j = tag_start + 1; j < i; ++j) {
								tag_state = (1664525 * tag_state + 1013904223) & 0xFFFFFFFF;
								tag_mask = tag_state >>> 24;
								tag_state += (raw_ui8_data[j] ^ tag_mask);

								if ((raw_ui8_data[j] ^ tag_mask) == tag_indicators[1]) break;
								temp_tag += String.fromCharCode(raw_ui8_data[j] ^ tag_mask);
							}
							if (j < i) {
								tag = temp_tag;
								tag_pos = tag_start;
							}
						}
					}
					else {
						if (i - tag_start2 < tag_max_length) {
							temp_tag = "";
							for (j = tag_start2 + 1; j < i; ++j) {
								if (raw_ui8_data[j] == tag_indicators[1]) break;
								temp_tag += String.fromCharCode(raw_ui8_data[j]);
							}
							if (j < i) {
								tag = temp_tag;
								tag_pos = tag_start;
							}
						}
					}
					tag = (tag && tag !== true ? tag : "?");

					// If there was an old sound, complete it
					if (sounds.length > 0) {
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
					// New sound
					sounds.push({
						"title": tag,
						"flagged": (load_tag != MediaPlayer.ALL_SOUNDS && load_tag.toLowerCase() != tag.toLowerCase()),
						"index": sound_index,
						"position": i,
						"data": null,
						"format": "concat." + s + (masked ? ".masked" : "")
					});
					// Next
					sound_start_offset = i;
					sound_magic_string_index = s;
					sound_masked_state = (masked ? unmask_state : null);
					sound_masked_mask = (masked ? mask : null);
					//i += magic_strings_ui8[s].length;
				}
				return i;
			},
			function (i, data, loop) {
				// Complete any sounds
				if (sounds.length > 0) {
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
				// Fix sound headers
				s = 0;
				for (i = 0; i < sounds.length; ++i) {
					if (sounds[i].data.length > magic_strings_ui8[s].length) {
						for (j = 0; j < magic_strings_ui8[s].length; ++j) {
							sounds[i].data[j] = magic_strings_ui8[s][j];
						}
					}
				}

				on_complete();
			}
		);

	}
}

function image_check_callback(url_or_filename, raw_ui8_data, callback_data, done_callback) {
	// Not an image
	var ext = url_or_filename.split(".").pop().toLowerCase();
	if (ext != "png" && ext != "gif" && ext != "jpg" && ext != "jpeg") {
		done_callback(null);
		return;
	}

	// Footer
	var has_footer = true;
	var footer = "4SPF";
	for (var i = 0; i < footer.length; ++i) {
		if (raw_ui8_data[raw_ui8_data.length - footer.length + i] != footer.charCodeAt(i)) {
			has_footer = false;
			break;
		}
	}

	// Search image
	if (has_footer) {
		// Not supported
		done_callback(null, done_callback);
	}
	else {
		var sounds = [0, [], []];

		var magic_strings = [ "OggS\x00\x02" , "moot\x00\x02" , "Krni\x00\x02" ];
		var magic_strings_ui8 = [ string_to_uint8array(magic_strings[0]) , string_to_uint8array(magic_strings[1]) , string_to_uint8array(magic_strings[2]) ];
		var magic_strings_fix_size = 4;
		var len, s, i, j, k, found, tag, temp_tag, data, id;
		var unmask_state = 0, mask, unmask_state_temp, mask_temp, masked;
		var tag_start = 0, tag_start2 = 0, tag_state, tag_mask, tag_pos, tag_indicators = [ "[".charCodeAt(0) , "]".charCodeAt(0) ];
		var tag_max_length = 100;
		var imax = raw_ui8_data.length - magic_strings_ui8[0].length;
		var ms, t1;

		var loop = new Loop();
		loop.steps = script.settings["performance"]["async_rate"];
		loop.timeout = script.settings["performance"]["async_delay"];
		loop.for_lt(
			0, imax, 1,
			{},
			function (i, data, loop) {
				// Unmasking
				unmask_state = (1664525 * unmask_state + 1013904223) & 0xFFFFFFFF;
				mask = unmask_state >>> 24;
				unmask_state += (t1 = (raw_ui8_data[i] ^ mask));

				// Tag check
				if (t1 == tag_indicators[0]) {
					tag_start = i;
					tag_state = unmask_state;
					tag_mask = mask;
				}
				if (raw_ui8_data[i] == tag_indicators[0]) tag_start2 = i;

				// Match headers
				found = false;
				masked = false;
				for (s = 0; s < magic_strings_ui8.length; ++s) {
					ms = magic_strings_ui8[s];
					for (j = 0; j < ms.length; ++j) {
						if (raw_ui8_data[i + j] != ms[j]) break;
					}
					if (j == ms.length) {
						found = true;
						break;
					}

					if (found) break;
				}
				if (!found) {
					for (s = 0; s < magic_strings_ui8.length; ++s) {
						ms = magic_strings_ui8[s];
						unmask_state_temp = unmask_state;
						mask_temp = mask;
						for (j = 0; true; ) {
							if ((raw_ui8_data[i + j] ^ mask_temp) != ms[j]) break;

							if (++j >= ms.length) break;
							unmask_state_temp = (1664525 * unmask_state_temp + 1013904223) & 0xFFFFFFFF;
							mask_temp = unmask_state_temp >>> 24;
							unmask_state_temp += (raw_ui8_data[i + j] ^ mask_temp);
						}
						if (j == ms.length) {
							found = true;
							masked = true;
							break;
						}
					}
				}
				if (found) {
					// Find the key location
					tag_pos = i;
					k = 1;
					tag = "[Name Unknown]";
					if (masked) {
						// Get the tag
						if (i - tag_start < tag_max_length) {
							temp_tag = "";
							for (j = tag_start + 1; j < i; ++j) {
								tag_state = (1664525 * tag_state + 1013904223) & 0xFFFFFFFF;
								tag_mask = tag_state >>> 24;
								tag_state += (raw_ui8_data[j] ^ tag_mask);

								if ((raw_ui8_data[j] ^ tag_mask) == tag_indicators[1]) break;
								temp_tag += String.fromCharCode(raw_ui8_data[j] ^ tag_mask);
							}
							if (j < i) {
								tag = temp_tag;
								tag_pos = tag_start;
							}
						}
					}
					else {
						if (i - tag_start2 < tag_max_length) {
							temp_tag = "";
							for (j = tag_start2 + 1; j < i; ++j) {
								if (raw_ui8_data[j] == tag_indicators[1]) break;
								temp_tag += String.fromCharCode(raw_ui8_data[j]);
							}
							if (j < i) {
								tag = temp_tag;
								tag_pos = tag_start;
							}
						}
					}
					tag = tag || "?";

					// Old sound
					if (sounds[0] > 0) {
						sounds[2][sounds[2].length - 1] += i;
					}
					// New sound
					++sounds[0];
					sounds[1].push(tag + ".ogg");
					sounds[2].push(-i);
				}

				// Done
				return i;
			},
			function (i, data, loop) {
				// Old sound
				if (sounds[0] > 0) {
					sounds[2][sounds[2].length - 1] += raw_ui8_data.length;
				}
				else {
					sounds = null;
				}

				done_callback(sounds, callback_data);
			}
		);
	}
}

function image_load_callback_complete_sound(sounds, raw_ui8_data, sound_start_offset, sound_end_offset, sound_masked_state, sound_masked_mask, sound_magic_string_index, magic_strings_fix_size, magic_strings_ui8) {
	// Set data
	var id = sounds.length - 1;
	sounds[id].data = raw_ui8_data.subarray(sound_start_offset, sound_end_offset);
	var sound_data = sounds[id].data;
	var sound_data_len = sound_data.length;
	// Fix
	var i, j, k;
	if (sound_masked_state !== null) {
		i = 0;
		var bit_ord = (sound_data[i] ^ sound_masked_mask);
		while (true) {
			sound_data[i] = bit_ord;

			// Done/next
			if (++i >= sound_data_len) break;
			sound_masked_state = (1664525 * sound_masked_state + 1013904223) & 0xFFFFFFFF;
			sound_masked_mask = sound_masked_state >>> 24;
			bit_ord = (sound_data[i] ^ sound_masked_mask);
			sound_masked_state += bit_ord;
		}
	}
	if (sound_magic_string_index != 0) {
		var len = sound_data.length - magic_strings_fix_size;
		for (j = 0; j < len; ++j) {
			for (k = 0; k < magic_strings_fix_size; ++k) {
				if (sound_data[j + k] != magic_strings_ui8[sound_magic_string_index][k]) break;
			}
			if (k == magic_strings_fix_size) {
				// Fix it
				for (k = 0; k < magic_strings_fix_size; ++k) {
					sound_data[j + k] = magic_strings_ui8[0][k];
				}
				j += magic_strings_fix_size - 1;
			}
		}
	}
}



///////////////////////////////////////////////////////////////////////////////
// PNG images
///////////////////////////////////////////////////////////////////////////////
function png_load_callback(url_or_filename, load_tag, raw_ui8_data, done_callback) {
	// Not a PNG
	if (url_or_filename.split(".").pop().toLowerCase() != "png") {
		done_callback(null);
		return;
	}

	// Load image from data
	var img = new DataImage(raw_ui8_data);

	// Unpack files
	var reader = new DataImageReader(img);
	var r = reader.unpack();
	if (typeof(r) == typeof("")) {
		// Error
		done_callback(null);
		return;
	}

	// Done
	done_callback(png_load_callback_find_correct(r, load_tag));
}
function png_load_callback_asynchronous(url_or_filename, load_tag, raw_ui8_data, done_callback) {
	// Not a PNG
	if (url_or_filename.split(".").pop().toLowerCase() != "png") {
		done_callback(null);
		return;
	}

	// Loop for image decoding
	var i_loop = new Loop();
	i_loop.steps = script.settings["performance"]["async_rate"];
	i_loop.timeout = script.settings["performance"]["async_delay"];

	// Load image from data
	var img = new DataImage(
		raw_ui8_data,
		{},
		function (img, data) {
			// Loop
			var loop = new Loop();
			loop.steps = script.settings["performance"]["async_rate"];
			loop.timeout = script.settings["performance"]["async_delay"];

			// Unpack files
			var reader = new DataImageReader(img);
			reader.unpack_asynchronous(function (r) {
				if (typeof(r) == typeof("")) {
					// Error
					done_callback(null);
				}
				else {
					// Loaded
					done_callback(png_load_callback_find_correct(r, load_tag));
				}
			}, loop);
		},
		function (img, data) {
			// Error
			done_callback(null);
		},
		true,
		i_loop
	);
}

function png_check_callback(url_or_filename, raw_ui8_data, callback_data, done_callback) {
	// Not a PNG
	if (url_or_filename.split(".").pop().toLowerCase() != "png") {
		done_callback(null, callback_data);
		return;
	}

	try {
		// Loop for image decoding
		var i_loop = new Loop();
		i_loop.steps = script.settings["performance"]["async_rate"];
		i_loop.timeout = script.settings["performance"]["async_delay"];

		var img = new DataImage(
			raw_ui8_data,
			{},
			function (img, data) {
				// Unpack files
				var reader = new DataImageReader(img);
				var about = reader.unpack_names();
				if (typeof(about) !== typeof("") && about[0] > 0) {
					// Has images
					done_callback(about, callback_data);
				}
				else {
					done_callback(null, callback_data);
				}
			},
			function () {
				// Error
				done_callback(null, callback_data);
			},
			true,
			i_loop
		);
	}
	catch (e) {
		done_callback(null, callback_data);
	}
}

function png_load_callback_find_correct(r, load_tag) {
	if (r[0].length == 0) {
		return null;
	}

	// List names
	var sound_names = [];
	for (var i = 0; i < r[0].length; ++i) sound_names.push(r[0][i]);

	// Loaded
	var ret = [];
	var found = false;
	var earliest = -1;
	var earliest_name = "";
	for (var i = 0; i < r[0].length; ++i) {
		var filename = r[0][i].split(".");
		var ext = filename.pop();
		filename = filename.join(".");
		// Must be an ogg
		if (ext.toLowerCase() == "ogg") {
			if (load_tag === MediaPlayer.ALL_SOUNDS) {
				// Load all
				ret.push({
					"title": filename,
					"flagged": false,
					"index": i,
					"position": -1,
					"data": r[1][i],
					"format": "stego"
				});
				found = true;
			}
			else {
				// Tag match
				if (filename.toLowerCase() == load_tag.toLowerCase()) {
					ret.push({
						"title": filename,
						"flagged": false,
						"index": i,
						"position": -1,
						"data": r[1][i],
						"format": "stego"
					});
					found = true;
					break;
				}
				if (earliest < 0) {
					earliest = i;
					earliest_name = filename;
				}
			}
		}
	}
	// Nothing found
	if (!found) {
		if (earliest >= 0) {
			ret.push({
				"title": earliest_name,
				"flagged": true,
				"index": earliest,
				"position": -1,
				"data": r[1][earliest],
				"format": "stego"
			});
		}
		else {
			return [ sound_names , null ];
		}
	}

	return [ sound_names , ret ];
}



///////////////////////////////////////////////////////////////////////////////
// Thread Manager
///////////////////////////////////////////////////////////////////////////////
function ThreadManager() {
	// Manager
	this.posts = {};
	this.post_queue = [];
	this.post_queue_timeout = null;
	var self = this;

	// xch API
	if (xch) {
		xch.api.on("post_prepare", function (event) {
			self.xch_parse_post(event.post, event.post_instance);
		});
		//xch.api.on("post_unprepare", function (event) {});
		var posts = xch.api.get("posts");
		for (var i = 0, j; i < posts.length; ++i) {
			for (j = 0; j < posts[i].instances.length; ++j) {
				this.xch_parse_post(posts[i], posts[i].instances[j]);
			}
		}
	}
	else {
		// Update content
		if (is_archive) {
			$(".thread")
			.each(function (index) {
				if ($(this).attr("id")) { // needs an id
					if (index == 0) {
						self.post_queue.push($(this));
					}
				}
			});
		}
		$(is_38 ? ".post" : (is_archive ? ".post" : ".postContainer"))
		.each(function (index) {
			if (!$(this).hasClass("stub")) {
				self.post_queue.push($(this));
			}
		});

		// Mutation manager
		var MutationObserver = (window.MutationObserver || window.WebKitMutationObserver);
		if (MutationObserver) {
			try {
				var mo = new MutationObserver(function (records) {
					for (var i = 0; i < records.length; ++i) {
						if (records[i].type == "childList") {
							var nodes;
							if ((nodes = records[i].addedNodes)) {
								for (var j = 0; j < nodes.length; ++j) {
									// Check
									self.on_dom_mutation_add($(nodes[j]));
								}
								// Parse
								if (self.post_queue.length > 0) {
									self.parse_group();
								}
							}
							if ((nodes = records[i].removedNodes)) {
								for (var j = 0; j < nodes.length; ++j) {
									// Check
									self.on_dom_mutation_remove($(nodes[j]));
								}
							}
						}
					}
				});
				mo.observe(
					$("body")[0],
					{
						"childList": true,
						"subtree": true,
						"characterData": true
					}
				);
			}
			catch (e) {
				console.log(e);
				MutationObserver = null;
			}
		}
		if (!MutationObserver) {
			$("body")
			.on("DOMNodeInserted", function (event) {
				self.on_dom_mutation_add($(event.target));

				// Parse
				if (self.post_queue.length > 0) {
					self.parse_group();
				}

				return true;
			})
			.on("DOMNodeRemoved", function (event) {
				self.on_dom_mutation_remove($(event.target));
				return true;
			});
		}

		// Parse posts
		this.parse_group();
	}
}
ThreadManager.prototype = {
	constructor: ThreadManager,
	parse_group: function () {
		if (this.post_queue_timeout == null) {
			// Execute
			var len = this.post_queue.length;
			if (script.settings["performance"]["post_parse_group_size"] > 0 && len > script.settings["performance"]["post_parse_group_size"]) {
				len = script.settings["performance"]["post_parse_group_size"];
			}
			for (var i = 0; i < len; ++i) {
				var p = this.post_queue[i];
				this.post_queue[i] = null;
				if (p != null) this.parse_post(p);
			}
			this.post_queue.splice(0, len);

			// Create timer if more exist
			if (this.post_queue.length > 0) {
				var self = this;
				this.post_queue_timeout = setTimeout(function () {
					self.post_queue_timeout = null;
					self.parse_group();
				}, script.settings["performance"]["post_parse_group_delay"] * 1000);
			}
		}
	},
	post_exists: function (post_id) {
		if (post_id in this.posts) return true;
		for (var i = 0; i < this.post_queue.length; ++i) {
			if (this.post_queue[i] == null) continue;

			var id = (this.post_queue[i].attr("id") || "0").replace(/(\w+_)?[^0-9]/g, "");
			if (id == post_id) return true;
		}
		return false;
	},
	on_dom_mutation_add: function (target) {
		// Updating
		if ((target.hasClass("postContainer") || target.hasClass("post")) && target.attr("id") !== undefined && !target.hasClass("stub")) {
			this.post_queue.push(target);
		}
		else if (target.attr("id") == "qr" || target.attr("id") == "quickReply") {
			inline_manager.uploader.append_controls(target);
		}
		else if (target.attr("id") == "soundsPanel") {
			inline_manager.uploader.hide_other_panel(target);
		}
	},
	on_dom_mutation_remove: function (target) {
		// Updating
		inline_manager.uploader.removal_check(target);
	},
	parse_post: function (container) {
		// Get id
		var post_id;
		if (is_38) {
			post_id = (container.find(".intro .post_no:nth-of-type(2)").html() || "").trim();
		}
		else {
			post_id = container.attr("id");
		}
		post_id = (post_id || "0").replace(/(\w+_)?[^0-9]/g, "");
		var redo = this.post_exists(post_id);

		var image = container.find(is_38 ? ".fileinfo a" : (is_archive ? ".thread_image_link" : ".fileThumb"));
		if (is_38 && container.hasClass("op")) {
			image = container.parent().find(".fileinfo:nth-of-type(1) a");
		}
		var post = container.find(is_38 ? ".body" : (is_archive ? ".text" : ".postMessage"));

		image = (image.length > 0 ? (image.attr("href") || "") : null);
		// Redirect links from the archive
		if (is_archive && image !== null) {
			var match;
			if ((match = /\/(\w+)\/redirect\/(.+)/.exec(image)) !== null) {
				// match.index
				image = "//images.4chan.org/" + match[1] + "/src/" + match[2];
			}
		}

		// Original image name
		var image_name = null;
		if (image !== null) {
			if (is_archive) {
				// Archive method
				var ft = container.find(".post_file");
				if (ft.length > 0) {
					var c;
					if ((c = $(ft[0]).find(".post_file_filename")) && c.length > 0) {
						// Shortened filename
						image_name = c.attr("title");
					}
					else {
						c = $(ft[0]).contents();
						if (c.length > 2) {
							// Not OP
							image_name = $(c[2]).text();
							if (image_name) {
								image_name = image_name.trim();
								image_name = image_name.substr(0, image_name.length - 1);
							}
						}
						else {
							// OP
							image_name = $(c[0]).text();
							if (image_name) image_name = image_name.split(",").splice(2).join(",").trim();
						}
					}
				}
			}
			else if (is_38) {
				// TODO : fix this to get the original filename
			}
			else {
				var ft = container.find(".fileText");
				if (!(image_name = ft.attr("data-filename"))) { // 4chan x method
					// Default method
					image_name = ft.find("span");
					if (image_name.length > 0) {
						image_name = $(image_name[image_name.length - 1]).attr("title");
					}
					else if ((image_name = ft.find("a")).length > 0) {
						image_name = $(image_name[image_name.length - 1]).html().trim();
					}
					else {
						image_name = null;
					}
				}
			}
			// Deafult
			if (!image_name) {
				image_name = image.split("/").pop();
			}
		}

		// Data
		var post_data_copy = {
			"container": container,
			"image_url": image,
			"image_name": image_name,
			"post": (post.length > 0 ? $(post[0]) : null)
		};
		if (post_data_copy.post != null) {
			if (!redo) {
				this.posts[post_id] = post_data_copy;
			}

			// Auto checking images
			inline_manager.parse_post(this.posts[post_id], redo, post_data_copy);
			if (script.settings["inline"]["url_replace"]) {
				inline_manager.parse_post_for_urls(this.posts[post_id], redo, post_data_copy);
			}
		}
	},
	xch_parse_post: function (xch_post, xch_instance) {
		// Data
		var post_data = {
			container: xch_instance.container,
			image_url: (xch_post.image ? xch_post.image.url || null : null),
			image_name: (xch_post.image ? xch_post.image.filename_original || null : null),
			post: xch_instance.container.find(".post_body").first()
		};

		var redo = (xch_post.id in this.posts);
		if (!redo) {
			this.posts[xch_post.id] = post_data;
		}

		// Auto checking images
		inline_manager.parse_post(this.posts[xch_post.id], redo, post_data);
		if (script.settings["inline"]["url_replace"]) {
			inline_manager.parse_post_for_urls(this.posts[xch_post.id], redo, post_data);
		}
	},
	post: function (index) {
		index += "";
		return (index in this.posts ? this.posts[index] : null);
	}
}
var thread_manager = null;



///////////////////////////////////////////////////////////////////////////////
// Settings
///////////////////////////////////////////////////////////////////////////////
function SettingsManager(inline_manager) {
	var self = this;

	// Insert stylesheet
	$("head")
	.append( //{ Stylesheet
		E("style")
		.attr("id", "MPStyleSettings") // random_string(16 + random_integer(17)))
		.html(
			".MPMenu,.MPMenu.post.reply{display:inline-block !important;position:absolute;left:0;top:0;box-shadow:0px 0px 2px 2px rgba(0,0,0,0.25);z-index:10001;margin:0px !important;padding:2px !important;width:auto !important;height:auto !important;}\n" +
			".MPMenuClosed,.MPMenu.MPMenuClosed,.MPMenu.MPMenuClosed.post.reply{display:none !important;}\n" +
			"a.MPMenuItem,a.MPMenuItem:link,a.MPMenuItem:visited{display:block !important;padding:2px !important;text-decoration:none !important;}" +
			".MPMenuItem + .MPMenuItem{margin-top:1px;}\n" +

			".MPSettingsContainerOuter{position:fixed;left:0;top:0;right:0;bottom:0;z-index:10001;background:rgba(0,0,0,0.25);}\n" +
			".MPSettingsClosed{display:none !important;}\n" +
			".MPSettingsContainerInner{position:relative;width:100%;height:100%;}\n" +
			"div.MPSettingsBox{display:block !important;position:absolute !important;left:25%;top:15%;right:25%;bottom:15%;border:0px !important;box-shadow:0px 0px 2px 2px rgba(0,0,0,0.25);border-radius:6px !important;padding:0px !important;margin:0px !important;overflow:hidden;width:auto !important;}\n" +
			"div.MPSettingsTitleContainer{position:relative;z-index:1;padding:4px !important;}\n" +
			"div.MPSettingsTitle{position:relative;display:inline-block !important;font-size:2em !important;vertical-align:top !important;font-weight:bold;}\n" +
			"div.MPSettingsTitleVersion{padding-left:4px !important;display:inline-block !important;vertical-align:top !important;font-style:italic;}\n" +
			"a.MPSettingsTitleUpdate{position:absolute;right:4px;top:4px;vertical-align:top !important;}\n" +
			"div.MPSettingsContainer{overflow-x:hidden;overflow-y:auto;margin:4px !important;left:0;top:0;right:0;bottom:0;position:absolute;}\n" +
			".MPSettingsSingleLabel{font-size:1.25em !important;font-weight:bold;padding:2px 2px 2px 0px !important;}\n" +
			".MPSettingsSingleContainer + .MPSettingsSingleLabel{margin-top:4px;}\n" +
			".MPSettingsSingleContainer{border:1px solid rgba(0,0,0,0.125);padding:1px !important;border-radius:2px;}\n" +
			".MPSettingsSingleItem{padding:2px !important;position:relative;background:rgba(0,0,0,0.03125);}\n" +
			".MPSettingsSingleItem.MPSettingsSingleItemEven{background:rgba(0,0,0,0.0625) !important;}\n" +
			".MPSettingsSingleItem + .MPSettingsSingleItem{margin-top:1px !important;}\n" +
			".MPSettingsSingleItem:hover{z-index:1;}\n" +
			".MPSettingsSingleItemValue{float:right;}\n" +
			".MPSettingsSingleItemValueAfter{clear:both;}\n" +
			".MPSettingsSingleItemLabel{}\n" +
			".MPSettingsSingleItemDescription{font-size:0.8em !important;opacity:0.5 !important;}\n" +

			"input.MPSettingsTextbox[type=text]{padding:2px !important;margin:0px !important;background:rgba(0,0,0,0.03125) !important;border:1px solid rgba(0,0,0,0.125) !important;color:inherit !important;}\n" +
			".MPSettingsTextboxRight{text-align:right;}\n" +
			".MPSettingsTextboxContainer{position:relative;}\n" +
			".MPSettingsTextboxLinkContainer{position:absolute;right:2px;top:2px;}\n"
		)
	); //}

	// Menu
	this.menu_order = true;
	$("body").append( //{ Menu
		(this.menu_list = E("div"))
		.addClass("MPMenu MPMenuClosed MPHighlightShadow2px")
		.addClass(is_archive ? "post_wrapper" : "reply post")
		.append(
			E("a")
			.addClass("MPMenuItem")
			.attr("href", "#")
			.html("Open Player")
			.on("click", {item:0}, function (event) {
				return self.on_menu_item_click($(this), event);
			})
		)
		.append(
			E("a")
			.addClass("MPMenuItem")
			.attr("href", "#")
			.html("Settings")
			.on("click", {item:1}, function (event) {
				return self.on_menu_item_click($(this), event);
			})
		)
		.append(
			E("a")
			.addClass("MPMenuItem")
			.attr("href", "http://dnsev.github.io/4cs/")
			.attr("target", "_blank")
			.html("Homepage")
			.on("click", {item:2}, function (event) {
				return self.on_menu_item_click($(this), event);
			})
		)
		.append(
			E("a")
			.addClass("MPMenuItem")
			.attr("href", "#")
			.html("Help")
			.on("click", {item:3}, function (event) {
				return self.on_menu_item_click($(this), event);
			})
		)
	); //}

	$(document)
	.on("scroll", {}, function (event) {
		self.menu_close();
	})
	.on("click", {}, function (event) {
		self.menu_close();
	});

	var script_name = "Userscript";
	var version = "";
	try {
		script_name = GM_info.script.name;
		version = GM_info.script.version;
	}
	catch (e) {
		try {
			script_name = GM_getMetadata("name").toString();
			version = GM_getMetadata("version").toString();
		}
		catch (e) {}
	}

	$("body").append( //{ Settings
		(this.settings_container = E("div"))
		.addClass("MPSettingsContainerOuter MPSettingsClosed")
		.on("click", {}, function (event) {
			self.settings_close();
		})
		.append(
			E("div")
			.addClass("MPSettingsContainerInner")
			.append(
				E("div")
				.addClass("MPSettingsBox MPHighlightShadow2px")
				.addClass(is_archive ? "post_wrapper" : "reply post")
				.on("click", {}, function (event) {
					return false;
				})
				.append(
					(this.settings_region_title = E("div"))
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
						(this.settings_update_link = E("a"))
						.addClass("MPSettingsTitleUpdate")
						.css("display", "none")
						.attr("href", "http://dnsev.github.io/4cs/")
						.attr("target", "_blank")
						.html("An update is available!")
						.on("click", function (event) {
							if (event.which == 1) {
								script.on_update_click(event);
								return false;
							}
							return true;
						})
					)
				)
				.append(
					(this.settings_region = E("div"))
					.addClass("MPSettingsContainer")
				)
			)
		)
	); //}

	// Management
	this.section_default = "Other Settings";
	this.sections = {};
	this.settings_data = [];

	if (xch) {
		// xch menu
		xch.api.on("main_menu_open", function (event) {
			// Build option
			var option = {
				html: (
					E("a")
					.attr("href", "http://dnsev.github.io/4cs/")
					.attr("target", "_blank")
					.text("Media Player")
				),
				order: 1,
				on: {
					click: {
						callback_data: self,
						callback: function (event) {
							if (event.which != 1) return true;

							event.data.option.menu.close();


							return false;
						}
					}
				},
				options: [{
					html: (
						E("a")
						.attr("href", "http://dnsev.github.io/4cs/")
						.attr("target", "_blank")
						.text("Open Player")
					),
					on: {
						click: {
							callback_data: { self: self, item: 0 },
							callback: function (event) {
								if (event.which != 1) return true;

								event.data.option.menu.close();

								return event.data.callback_data.self.on_menu_item_click(this, event);
							}
						}
					}
				}, {
					html: (
						E("a")
						.attr("href", "http://dnsev.github.io/4cs/")
						.attr("target", "_blank")
						.text("Settings")
					),
					on: {
						click: {
							callback_data: { self: self, item: 1 },
							callback: function (event) {
								if (event.which != 1) return true;

								event.data.option.menu.close();

								return event.data.callback_data.self.on_menu_item_click(this, event);
							}
						}
					}
				}, {
					html: (
						E("a")
						.attr("href", "http://dnsev.github.io/4cs/")
						.attr("target", "_blank")
						.text("Homepage")
					),
					on: {
						click: {
							callback_data: { self: self, item: 2 },
							callback: function (event) {
								if (event.which != 1) return true;

								event.data.option.menu.close();

								return event.data.callback_data.self.on_menu_item_click(this, event);
							}
						}
					}
				}, {
					html: (
						E("a")
						.attr("href", "http://dnsev.github.io/4cs/")
						.attr("target", "_blank")
						.text("Help")
					),
					on: {
						click: {
							callback_data: { self: self, item: 3 },
							callback: function (event) {
								if (event.which != 1) return true;

								event.data.option.menu.close();

								return event.data.callback_data.self.on_menu_item_click(this, event);
							}
						}
					}
				}]
			};

			// Sub-options


			// Add
			event.menu.add_option(option);
		});
	}
	else if (inline_manager.mode == "4chanx3") {
		// 4chan-x 3
		var menu_close = function () {
			document.dispatchEvent(new CustomEvent("CloseMenu", { detail: {} }));
		};
		var sub_entries = [{
			el: (E("a"))
				.attr("href", "http://dnsev.github.io/4cs/")
				.attr("target", "_blank")
				.html("Open Player")[0],
			open: function () {
				$(this.el).off("click").on("click", {menu_close: menu_close, item: 0}, function (event) {
					return self.on_menu_item_click(this, event);
				});
				return true;
			},
			type: "header"
		},
		{
			el: (E("a"))
				.attr("href", "http://dnsev.github.io/4cs/")
				.attr("target", "_blank")
				.html("Settings")[0],
			open: function () {
				$(this.el).off("click").on("click", {menu_close: menu_close, item: 1}, function (event) {
					return self.on_menu_item_click(this, event);
				});
				return true;
			},
			type: "header"
		},
		{
			el: (E("a"))
				.attr("href", "http://dnsev.github.io/4cs/")
				.attr("target", "_blank")
				.html("Homepage")[0],
			open: function () {
				$(this.el).off("click").on("click", {menu_close: menu_close, item: 2}, function (event) {
					return self.on_menu_item_click(this, event);
				});
				return true;
			},
			type: "header"
		},
		{
			el: (E("a"))
				.attr("href", "http://dnsev.github.io/4cs/")
				.attr("target", "_blank")
				.html("Help")[0],
			open: function () {
				$(this.el).off("click").on("click", {menu_close: menu_close, item: 3}, function (event) {
					return self.on_menu_item_click(this, event);
				});
				return true;
			},
			type: "header"
		}];

		var el;
		(el = E("a"))
		.attr("href", "http://dnsev.github.io/4cs/")
		.attr("target", "_blank")
		.html("Media Player");

		document.dispatchEvent(new CustomEvent("AddMenuEntry", {
			detail: {
				el: el[0],
				open: function () {
					$(this.el).off("click").on("click", function (event) {
						if (event.which != 1) menu_close();
						return (event.which != 1);
					});
					return true;
				},
				type: "header",
				subEntries: sub_entries,
				order: 130
			}
		}));

	}
}
SettingsManager.prototype = {
	constructor: SettingsManager,
	on_menu_item_click: function (link, event) {
		var close = true;
		var menu_close = null;
		var item = -1;
		if (event.data.callback_data) {
			close = false;
			item = event.data.callback_data.item;
		}
		else if (event.data.menu_close) {
			menu_close = event.data.menu_close;
			item = event.data.item;
		}
		else {
			item = event.data.item;
		}

		if (event.which != 1) {
			if (close) {
				if (menu_close) menu_close.call(this);
				else this.menu_close();
			}
			return true;
		}

		switch (item) {
			case 0:
			{
				media_player_manager.open_player(true);
				if (close) {
					if (menu_close) menu_close.call(this);
					else this.menu_close();
				}
			}
			return false;
			case 1:
			{
				this.settings_open();
				if (close) {
					if (menu_close) menu_close.call(this);
					else this.menu_close();
				}
			}
			return false;
			case 3:
			{
				inline_manager.display_info("help");
				if (close) {
					if (menu_close) menu_close.call(this);
					else this.menu_close();
				}
			}
			return false;
			default:
			{
				if (close) {
					if (menu_close) menu_close.call(this);
					else this.menu_close();
				}
				event.stopPropagation();
			}
			return true;
		}
	},

	menu_arrange_order: function (order) {
		if (order !== this.menu_order) {
			this.menu_order = order;
			var items = this.menu_list.find(".MPMenuItem");
			for (var i = 0; i < items.length; ++i) {
				$(items[i]).parent().prepend(items[i]);
			}
		}
	},
	menu_open: function (parent) {
		this.menu_list.removeClass("MPMenuClosed");
		this.menu_arrange_order(InlineManager.prototype.position_relative(parent, this.menu_list, [0,2], [false, true])[1]);
	},
	menu_close: function () {
		this.menu_list.addClass("MPMenuClosed");
	},

	settings_open: function () {
		this.settings_container.removeClass("MPSettingsClosed");
		this.settings_region.css("top", this.settings_region_title.outerHeight() + "px");
		this.settings_region.scrollTop(0);
	},
	settings_close: function () {
		this.settings_container.addClass("MPSettingsClosed");
	},

	settings_update_all: function () {
		for (var i = 0; i < this.settings_data.length; ++i) {
			if ("values" in this.settings_data[i]) {
				// Regen
				this.settings_data[i].update_value.call(this.settings_data[i]);
				this.setting_update_link(this.settings_data[i]);
			}
		}
	},

	setting_update_link: function (data) {
		if (data.change_link) {
			var i;
			for (i = 0; i < data.values.length; ++i) {
				if (data.current == data.values[i]) break;
			}

			data.change_link
			.off("click")
			.on("click", {values: data.values, descr: data.descr, current: i % data.values.length, change: data.change}, function (event) {
				if (event.which == 1) {
					event.data.current = (event.data.current + 1) % event.data.values.length;
					$(this).html(event.data.descr[event.data.current]);
					event.data.change(event.data.values[event.data.current]);
					return false;
				}
				return true;
			})
			.html(data.descr[i % data.values.length]);
		}
	},
	setting_add: function (data) {
		this.settings_data.push(data);

		// Section label
		var section = data.section || this.section_default;
		if (!(section in this.sections)) {
			var c, s;
			(c = E("div"))
			.addClass("MPSettingsSingleLabel")
			.html(section);
			if (this.section_default in this.sections) {
				this.sections[this.section_default][0].before(c);
			}
			else {
				this.settings_region.append(c);
			}

			c.after(
				(s = E("div"))
				.addClass("MPSettingsSingleContainer")
			);

			this.sections[section] = [ c , s , 0 ];
		}

		// Setup
		var container = this.sections[section][1];

		// Value clickable
		var value = "";
		data.change_link = null;
		if ("values" in data) {
			// Re-get value
			data.update_value.call(data);
			// HTML
			(value = data.change_link = E("a"))
			.attr("href", "#");
			this.setting_update_link(data);
		}
		else if ("html" in data) {
			value = data.html;
		}

		// HTML
		var label;
		container.append(
			E("div")
			.addClass("MPSettingsSingleItem MPHighlightShadow2pxOnHover" + (this.sections[section][2] % 2 == 1 ? "" : " MPSettingsSingleItemEven"))
			.append(
				E("div")
				.addClass("MPSettingsSingleItemValue")
				.html(
					value
				)
			)
			.append(
				(label = E("div"))
				.addClass("MPSettingsSingleItemLabel")
				.html(data.label)
			)
			.append(
				E("div")
				.addClass("MPSettingsSingleItemValueAfter")
			)
		);
		if (data.description) {
			label.after(
				E("div")
				.addClass("MPSettingsSingleItemDescription")
				.html(data.description)
			);
		}
		++this.sections[section][2];

	},
};



///////////////////////////////////////////////////////////////////////////////
// Uploader
///////////////////////////////////////////////////////////////////////////////
function InlineUploader(inline_manager) {
	var self = this;

	this.mode = "";
	this.open = false;
	this.auto_opened = false;
	this.default_no_image_text = "no image selected";
	this.max_size = parseInt($("input[name=MAX_FILE_SIZE]").val() || "") || 3145728;
	this.observer = null;
	this.upload_modified = false;
	this.form_submit_button_clone = null;
	this.error_container = null;
	this.uploading = false;
	this.abortable_upload = null;
	this.good_header = string_to_uint8array("OggS\x00\x02");

	this.use_original_animation = false;

	if (script.settings["upload"]["enabled"]) {
		// Inline notice (for plebeians)
		var pf = $("#postForm");
		if (pf.length > 0) {
			$($(pf[0]).find("tbody").find(".rules")[0]).before(
				E("tr")
				.append(
					E("td")
					.html("Sounds")
				)
				.append(
					E("td")
					.html("Sound posting is only enabled in quick reply.<br />Get a real extension.")
				)
			);
		}

		if (script.settings["upload"]["block_other_scripts"]) {
			pf.find(".soundsLinkDiv").remove();
		}
	}

	this.mime_types = {
		audio: ["audio/ogg", "video/ogg"],
		image: ["image/jpeg", "image/png", "image/gif"]
	};

	// Post data
	this.post_fields = {
		"MAX_FILE_SIZE": {type:0, alt:["MAX_FILE_SIZE",function (form, container) {
			var p = $("*[name=MAX_FILE_SIZE]");
			return (p.length > 0 ? p.val() : null);
		}]},
		"mode": {type:1, value:"regist"},
		"resto": {type:0, missing:true, alt:["resto",function (form, container) {
			var t = container.find("select[title~=\"thread\"]");
			return (t.length == 1 && t.val() != "new") ? t.val() : null;
		},function (form, container) {
			var p = $("*[name=resto]");
			return (p.length > 0 ? p.val() : null);
		}]},
		"name": {type:0, alt:["name",function (form, container) {
			var x = form.find("input[data-name=\"name\"]");
			return (x.length > 0 ? x.val() : null);
		}]},
		"email": {type:0, alt:["email",function (form, container) {
			var x = form.find("input[data-name=\"email\"]");
			return (x.length > 0 ? x.val() : null);
		}]},
		"sub": {type:0, alt:["sub",function (form, container) {
			var x = form.find("input[data-name=\"sub\"]");
			return (x.length > 0 ? x.val() : null);
		}]},
		"com": {type:0, alt:["com",function (form, container) {
			var x = form.find("textarea.field");
			return (x.length > 0 ? x.val() : null);
		}]},
		"recaptcha_challenge_field": {type:0, blank:false, missing_with_pass:true, alt:["recaptcha_challenge_field",function (form, container) {
			var x = form.find((self.mode == "4chanx3" ? ".captcha-img img" :".captchaimg img"));
			return (x.length > 0 ? x.attr("src").match(/\?c=([A-Za-z0-9\-_]*)/)[1] : null);
		}]},
		"recaptcha_response_field": {type:0, blank:false, missing_with_pass:true, blank_error:"Captcha missing", alt:["recaptcha_response_field",function (form, container) {
			var c = form.find((self.mode == "4chanx3" ? ".captcha-input.field" : ".captchainput .field"));
			return (c.length == 1 ? c.val() : null);
		}]},
		"upfile": {type:3, key:"file", missing:true},
		"filetag": {type:0, alt:["filetag"], missing:true},
		"spoiler": {type:2, alt:["spoiler",function (form, container) {
			var x = form.find("#qr-file-spoiler");
			return (x.length > 0 ? x : null);
		}], value:"on", missing:true},
		"pwd": {type:0, alt:["pwd",function (form, container) {
			var p = document.cookie.match(/4chan_pass=([^;]+)/);
			return (p ? decodeURIComponent(p[1]) : null);
		},function (form, container) {
			var p = $("input[name=pwd]");
			return (p.length > 0 ? p.val() : null);
		}]},
	};

	// Stylesheet
	$("head")
	.append( //{ Stylesheet
		E("style")
		.attr("id", "MPStyleUploader") // random_string(16 + random_integer(17)))
		.html(
			".MPSoundUploaderSoundLabel{display:inline-block !important;}\n" +
			"label:not([hidden]) + .MPSoundUploaderSoundLabel{margin:0px 0px 0px 8px !important;}\n" +
			".MPSoundUploaderSoundLabel + label:not([hidden]) {margin:0px 0px 0px 8px !important;}\n" +
			"span#qrSpoiler + .MPSoundUploaderSoundLabel{margin:0px 0px 0px 8px !important;}\n" +

			".MPSoundUploaderSoundLabel input[type=checkbox]{vertical-align:middle !important;}\n" +

			".MPSoundUploader{overflow:hidden;position:relative;}\n" +

			".MPSoundUploaderSeparator{margin:4px 0px 0px 0px !important;}\n" +
			".MPSoundUploaderHeader{text-align:center !important;}\n" +

			".MPSoundUploaderFileSelectorContainer{display:block;overflow:hidden;height:0px !important;width:0px !important;opacity:0.0;}\n" +

			".MPSoundUploaderSoundList{margin:0px !important;}\n" +
			".MPSoundUploaderSoundList > div:not(.MPSoundUploaderSoundListNone) + div{margin-top:0.25em;}\n" +
			".MPSoundUploaderSoundListNone{}\n" +
			".MPSoundUploaderSoundListItem{margin-left:2em;position:relative;}\n" +
			".MPSoundUploaderSoundListItem > input[type=text]{display:inline-block !important;margin-left:0px !important;width:100%;font-style:italic;}\n" +
			".MPSoundUploaderSoundListItem > .MPSoundUploaderSoundListItemCheck:not(:checked) + input[type=text]{text-decoration:line-through !important;}\n" +
			"input[type=text].MPSoundUploaderSoundListItemBad{color:#d00 !important;text-decoration:line-through !important;}\n" +
			".MPSoundUploaderSoundListItemTagName{font-style:normal !important;width:100% !important;}\n" +
			".MPSoundUploaderSoundListItemOriginal .MPSoundUploaderSoundListItemTagName{font-weight:bold !important;}\n" +
			".MPSoundUploaderSoundListItemCheck,.MPSoundUploaderSoundListItemTagName + .MPSoundUploaderSoundListItemCheck + div.riceCheck{position:absolute;left:-1.75em;top:0px;}\n" +

			".MPSoundUploaderSoundCounter{display:inline-block !important;margin-left:0.5em !important;font-weight:bold;}\n" +
			".MPSoundUploaderSoundCounter > span{display:inline-block;}\n" +
			".MPSoundUploaderSoundCounter > span + span{margin-left:0.25em;}\n" +

			".MPSoundUploaderBytesAvailableContainer{display:inline-block !important;margin-left:0.5em !important;opacity:0.75;}\n" +
			".MPSoundUploaderBytesAvailableContainer > span{display:inline-block;}\n" +
			".MPSoundUploaderBytesAvailableContainer > span + span{margin-left:0.25em;}\n" +
			".MPSoundUploaderBytesAvailable{font-weight:bold;font-style:italic;}\n" +
			".MPSoundUploaderBytesAvailableLabel{font-style:italic;}\n" +

			".MPSoundUploaderModifiedIndicator{display:inline-block !important;margin-left:0.5em !important;font-weight:bold;}\n" +
			".MPSoundUploaderModifiedIndicator.MPSoundUploaderModifiedIndicatorOff{display:none !important;}\n" +

			".MPSoundUploaderImageFilenameContainer{margin-left:2em;position:relative !important;}\n" +
			".MPSoundUploaderImageFilename{display:inline-block !important;margin-left:0px !important;width:100% !important;}\n" +
			".MPSoundUploaderImageFilenameNotSet{font-style:italic;cursor:pointer !important;}\n" +
			"input[type=text].MPSoundUploaderImageFilenameBad{color:#d00 !important;text-decoration:line-through !important;}\n" +
			".MPSoundUploaderImageFilenameContainer > input[type=checkbox],.MPSoundUploaderImageFilename + input[type=checkbox] + div.riceCheck{position:absolute;left:-1.75em;top:0px;}\n" +

			".MPSoundUploaderSoundFilename{cursor:pointer !important;width:100% !important;}\n" +

			".MPSoundUploaderRelater{position:relative !important;width:100%;height:0px;}\n" +

			".MPSoundUploaderSpacer{height:0.25em;width:100%;}\n" +

			".MPSoundUploaderLinksContainer{margin:0.25em 0.25em 0px 0.25em !important;display:block;text-align:right !important;}\n" +
			".MPSoundUploaderHelpLink{}\n" +

			".MPSoundUploaderOriginalFileUploadHidden{opacity:0 !important;}\n" +
			"div > input[type=submit].MPSoundUploaderOriginalSubmitButtonHidden{display:none !important;width:0px !important;height:0px !important;max-width:0px !important;max-height:0px !important;opacity:0 !important;overflow:hidden !important;vertical-align:top !important;}\n" +

			".MPSoundUploaderDragDropNotifier{display:block;position:absolute;left:0;top:0;right:0;bottom:0;background:rgba(0,0,0,0.125);z-index:1;font-size:2em;font-weight:bold;text-align:center;}\n" +
			".MPSoundUploaderDragDropNotifier.MPSoundUploaderDragDropNotifierOff{display:none !important;}\n" +

			".MPSoundUploaderCustomError{color:red;cursor:pointer;padding-left:6px;}\n" +
			".MPSoundUploaderBiggerAlert{opacity:0.8;padding-top:2px;}\n" +
			".MPSoundUploaderBiggerAlertHidden{display:none !important;}\n" +

			((script.settings["upload"]["enabled"] && script.settings["upload"]["block_other_scripts"]) ? (
				"div.soundsLinkDiv{display:none !important}\n" +
				"div#soundsPanel{display:none !important}\n"
			) : "")
		)
	); //}

	// Search
	var qr = $("#qr");
	if (qr.length > 0) this.append_controls(qr);
	else if ((qr = $("#quickReply")).length > 0) this.append_controls(qr);
}
InlineUploader.prototype = {
	constructor: InlineUploader,

	nullify: function () {
		this.observer.disconnect();
		this.observer = null;
	},
	append_controls: function (target) {
		if (!script.settings["upload"]["enabled"]) return;

		// Type
		var form = target.find("form");
		if (target.attr("id") == "quickReply") this.mode = "inline";
		else if (target.attr("id") == "qr") {
			this.mode = "4chanx";
			if (target.find("input#qr-file-spoiler").length > 0) this.mode = "4chanx3";
			else if (target.find("#qrtab.move").length > 0) this.mode = "appchanx";
			else if (form.find("#spoilerLabel").find(".riceCheck").length > 0) this.mode += "+ss";
		}

		// Alias
		var self = this;

		// Hide others
		if (script.settings["upload"]["block_other_scripts"]) form.find(".soundsLinkDiv").css("display", "none");

		// Vars
		this.auto_load_file = null;
		this.reply_container = target;
		this.reply_form = form;
		this.form_file_select = form.find("input[type=file]");
		this.form_submit_button = form.find("input[type=submit]");
		this.form_submit_button_sub = null;
		this.form_file_select_parent = this.form_file_select.parent();
		var form_file_select_rice = null;

		if (this.mode == "4chanx") {
			var sp = form.find("#spoilerLabel");
			sp.find("input[type=checkbox]").css("vertical-align", "middle"); // why devs
			sp.after( //{ Sounds checkbox
				E("label")
				.addClass("MPSoundUploaderSoundLabel")
				.append(
					(this.enable_checkbox = E("input"))
					.attr("type", "checkbox")
				)
				.append(
					"Sounds"
				)
			); //}
		}
		else if (this.mode == "4chanx3") {
			var sp = form.find("#file-n-submit");
			var main_div;
 			sp.after( //{ Sounds checkbox
				(main_div = E("div"))
				.html(
					E("label")
					.addClass("MPSoundUploaderSoundLabel")
					.append(
						(this.enable_checkbox = E("input"))
						.attr("type", "checkbox")
					)
					.append(
						"Sounds"
					)
				)
				.append(
					(this.error_container = E("span"))
					.addClass("MPSoundUploaderCustomError")
					.css("display", "none")
					.on("click", function (event) {
						$(this).html("").css("display", "none");
					})
				)
			); //}

			if (!($("html").hasClass("seaweedchan") || $("html").hasClass("ihavenoface") || $("html").hasClass("zixaphir"))) {
				main_div.css({
					position: "relative",
					"margin-top": "20px"
				});
			}
		}
		else if (this.mode == "4chanx+ss") {
			var sp = form.find("#spoilerLabel");
			sp.after(
				E("label")
				.addClass("MPSoundUploaderSoundLabel")
				.append(
					(this.enable_checkbox = E("input"))
					.attr("type", "checkbox")
					.attr("hidden", "true")
				)
				.append("<div class=\"riceCheck\"></div>")
				.append(
					E("span")
					.attr("vertical-align", "middle")
					.html("Sounds")
				)
			);
			sp.css({"position": "relative", "left": "0px", "top": "0px"});
		}
		else if (this.mode == "appchanx") {
			form_file_select_rice = this.form_file_select_parent.find("#file");

			var sp = form.find("#spoilerLabel");
			var d;
			sp.before(
				(d = E("div"))
				.css("text-align", "left")
			);
			d.append(sp);
			sp.css("width", "auto");
			sp.before(
				E("label")
				.addClass("MPSoundUploaderSoundLabel")
				.append(
					(this.enable_checkbox = E("input"))
					.attr("type", "checkbox")
					.attr("hidden", "true")
				)
				.append("<div class=\"rice\"></div>")
				.append(
					E("span")
					.attr("vertical-align", "middle")
					.html("Sounds")
				)
			);
			sp.css({"position": "relative", "left": "0px", "top": "0px"});
		}
		else if (this.mode == "inline") {
			var sp = form.find("#qrSpoiler");
			if (sp.length == 0) sp = form.find("#qrFile");

			sp.parent().after(sp); // move this
			sp.nextAll("div:not([class]):not([id])").remove(); // remove the message put in the constructor

			var spc = sp.find("label").contents();
			$(spc[spc.length - 1]).after($(spc[spc.length - 1]).text().replace(/\]/, " ]")).remove(); // formatting
			sp.find("input[type=checkbox]").css("vertical-align", "middle"); // why moot
			sp.after(
				E("label")
				.addClass("MPSoundUploaderSoundLabel")
				.append("[")
				.append(
					(this.enable_checkbox = E("input"))
					.attr("type", "checkbox")
				)
				.append(
					"Sounds ]"
				)
			);
		}

		// Bigger message
		form.append(
			(this.bigger_alert = E("div"))
			.addClass("MPSoundUploaderBiggerAlert MPSoundUploaderBiggerAlertHidden")
			.append(
				"Sounds image not working? Make it "
			)
			.append(
				E("a")
				.attr("href", "http://dnsev.github.io/4cs/#bigger")
				.attr("target", "_blank")
				.html("bigger")
			)
			.append("!")
		);
		var MutationObserver = (window.MutationObserver || window.WebKitMutationObserver);
		if (MutationObserver) {
			try {
				var error_obj = $($(".MPSoundUploaderCustomError,#qrError,.warning")[0]);
				var mo = new MutationObserver(function (records) {
					if (error_obj.html().trim().length == 0 || !error_obj.is(":visible")) {
						// Disappeared
						self.bigger_alert.addClass("MPSoundUploaderBiggerAlertHidden");
					}
					else {
						// Appeared
						self.bigger_alert.removeClass("MPSoundUploaderBiggerAlertHidden");
					}
				});
				mo.observe(
					error_obj[0],
					{
						"attributes": true,
						"characterData": true,
						"subtree": true,
						"childList": true
					}
				);
			}
			catch (e) {
				console.log(e);
				MutationObserver = null;
			}
		}

		// Enabling
		this.enable_checkbox.on("click", {}, function (event) {
			self.set_panel_state($(this).is(":checked"), null);
		})

		// Relation
		if (this.use_original_animation) {
			if (this.mode == "4chanx" || this.mode == "appchanx") {
				form.find(".captchainput").after(
					(this.relater = E("div"))
					.addClass("MPSoundUploaderRelater")
					.append(
						(this.form_submit_button_sub = E("div"))
					)
				);
			}
		}

		// Controls
		form.append(
			(this.control_panel = E("div"))
			.addClass("MPSoundUploader")
			.css("display", "none")
		);

		// Separator
		if (this.mode == "4chanx" || this.mode == "4chanx+ss") {
			this.control_panel.append(
				E("hr")
				.addClass("abovePostForm MPSoundUploaderSeparator")
			);
		}
		else if (this.mode == "inline") {
			this.control_panel.append(
				E("div")
				.addClass("postblock MPSoundUploaderHeader")
				.html("Sounds")
			);
		}

		// New file select
		this.control_panel
		.append(
			E("div")
			.addClass("MPSoundUploaderFileSelectorContainer")
			.append(
				(this.form_file_select_file = E("input"))
				.attr("type", "file")
				.attr("max", (this.form_file_select.attr("max") || this.max_size.toString()))
				.attr("accept", this.mime_types.image.join(", "))
			)
			.append(
				(this.form_file_select_sound = E("input"))
				.attr("type", "file")
				.attr("max", (this.form_file_select.attr("max") || this.max_size.toString()))
				.attr("accept", this.mime_types.audio.join(", ") + ", " + this.mime_types.image.join(", "))
				.attr("multiple", "true")
			)
		);
		// Old file select
		this.form_file_select.on("change",  function (event) { self.on_file_change_old(event, $(this)); });

		// More
		this.sound_image = null;
		this.sound_list_items = [];
		this.control_panel //{
		.append(
			E("div").addClass("MPSoundUploaderSpacer")
		)
		.append( //{ Stats
			E("div")
			.html(
				"Sounds:"
			)
			.append(
				(this.sound_count_container = E("span"))
				.addClass("MPSoundUploaderSoundCounter")
				.attr("title", "0 sounds")
				.append(
					(this.sound_count = E("span"))
					.html("0")
				)
				.append(
					(this.sound_count_sep = E("span"))
					.css("display", "none")
					.html("+")
				)
				.append(
					(this.sound_count_original = E("span"))
					.css("display", "none")
					.html("0")
				)
			)
			.append(
				E("span")
				.addClass("MPSoundUploaderBytesAvailableContainer")
				.append(
					E("span")
					.html("[")
				)
				.append(
					(this.file_size_available = E("span"))
					.addClass("MPSoundUploaderBytesAvailable")
					.css("display", "none")
					.html("?")
				)
				.append(
					(this.file_size_available_sep = E("span"))
					.css("display", "none")
					.html("/")
				)
				.append(
					(this.file_size_available_full = E("span"))
					.addClass("MPSoundUploaderBytesAvailable")
					.html("?")
				)
				.append(
					E("span")
					.addClass("MPSoundUploaderBytesAvailableLabel")
					.html("available")
				)
				.append(
					E("span")
					.html("]")
				)
			)
			.append(
				(this.upload_modified_indicator = E("span"))
				.addClass("MPSoundUploaderModifiedIndicator MPSoundUploaderModifiedIndicatorOff")
				.html("*")
				.attr("title", "This indicates that your image will be re-encoded on upload")
			)
		) //}
		.append(
			E("div").addClass("MPSoundUploaderSpacer")
		)
		.append(
			E("div")
			.addClass("MPSoundUploaderImageFilenameContainer")
			.append(
				(this.sound_image_display = E("input"))
				.attr("type", "text")
				.addClass("MPSoundUploaderImageFilename MPSoundUploaderImageFilenameNotSet field")
				.attr("readonly", "true")
				.attr("value", this.default_no_image_text)
				.on("click", {"obj": this.form_file_select_file}, function (event) {
					event.data.obj.click();
					$(this).blur();
					return false;
				})
			)
			.append(
				(this.remove_sound_image = E("input"))
				.attr("type", "checkbox")
				.css("display", "none")
				.on("change", {}, function (event) { return self.on_image_checkbox(event, $(this)); })
			)
		)
		.append(
			E("div").addClass("MPSoundUploaderSpacer")
		)
		.append(
			(this.sound_list = E("div"))
			.addClass("MPSoundUploaderSoundList")
			.html(
				(this.sound_list_none = E("div"))
				.addClass("MPSoundUploaderSoundListItem MPSoundUploaderSoundListNone")
				.append(
					E("input")
					.addClass("MPSoundUploaderSoundFilename field")
					.attr("type", "text")
					.attr("readonly", "true")
					.attr("value", "add a new sound")
					.on("click", {"obj": this.form_file_select_sound}, function (event) {
						event.data.obj.click();
						$(this).blur();
						return false;
					})
				)
			)
		); //}

		// Help
		if (script.settings["upload"]["show_help"]) {
			this.control_panel.append(
				E("div")
				.addClass("MPSoundUploaderLinksContainer")
				.append("[ ")
				.append(
					E("a")
					.attr("href", "#")
					.html("Help")
					.addClass("MPSoundUploaderHelpLink")
					.on("click", function (event) {
						if (event.which == 1) {
							inline_manager.display_info("upload help");
							return false;
						}
						return true;
					})
				)
				.append(" ]")
			);
		}
		this.control_panel.append(
			E("div").addClass("MPSoundUploaderSpacer")
		);

		// Captcha reloading
		form.find(".captchaimg img,#qrCaptcha,.captcha-img img")
		.on("load", {form: form}, function (event) {
			var cv = event.data.form.find(".captchainput .field,#qrCapField,.captcha-input.field");
			if (cv.attr("placeholder_temp") !== undefined) {
				cv
				.attr("placeholder", cv.attr("placeholder_temp"))
				.removeAttr("placeholder_temp")
				.removeAttr("readonly");
			}
		});

		// Drag/drop
		this.control_panel
		.append(
			(this.drag_drop_notifier = E("div"))
			.addClass("MPSoundUploaderDragDropNotifier MPSoundUploaderDragDropNotifierOff")
			.html("Drop Images and Sounds Here")
		)
		.on("dragover", function (event) { return self.on_container_dragover(event, $(this)); })
		.on("dragenter", function (event) { return self.on_container_dragenter(event, $(this)); })
		.on("dragexit", function (event) { return self.on_container_dragexit(event, $(this)); })
		.on("drop", function (event) { return self.on_container_drop(event, $(this)); });

		// Events
		this.form_file_select_file.on("change", {sound: false}, function (event) { self.on_file_change(event, $(this)); });
		this.form_file_select_sound.on("change", {sound: true}, function (event) { self.on_file_change(event, $(this)); });

		// Make enter in the captcha field work
		form.find("input[name=recaptcha_response_field],.captchainput .field").on("keydown", function (event) {
			if (event.which == 13 && self.form_submit_button_clone) {
				self.form_submit_button_clone.click();
				$(this).blur();
				return false;
			}
			return true;
		});

		// Observer
		var MutationObserver = (window.MutationObserver || window.WebKitMutationObserver);
		if (MutationObserver) {
			try {
				this.observer = new MutationObserver(function (records) {
					for (var i = 0; i < records.length; ++i) {
						if (records[i].target.hidden) {
							// Hidden
							self.set_panel_state(false, {instant: true});
						}
					}
				});
				this.observer.observe(target[0], {"attributes": true});
			}
			catch (e) {
				console.log(e);
				this.observer = null;
			}
		}
	},

	on_container_dragover: function (event, obj) {
		event.originalEvent.dataTransfer.dropEffect = "move";
		// Done
		return false;
	},
	on_container_dragenter: function (event, obj) {
		this.drag_drop_notifier.removeClass("MPSoundUploaderDragDropNotifierOff");
		// Done
		return false;
	},
	on_container_dragexit: function (event, obj) {
		this.drag_drop_notifier.addClass("MPSoundUploaderDragDropNotifierOff");
		// Done
		return false;
	},
	on_container_drop: function (event, obj) {
		// Close overlay
		this.drag_drop_notifier.addClass("MPSoundUploaderDragDropNotifierOff");

		// Load
		if (event.originalEvent.dataTransfer.files.length > 0) {
			for (var i = 0; i < event.originalEvent.dataTransfer.files.length; ++i) {
				// Whip up a nice fake event here
				this.on_file_change({
					target: {
						files: [ event.originalEvent.dataTransfer.files[i] ]
					},
					data: { auto_detect: true }
				}, null);
			}
		}
		else {
			// not implemented
		}

		// Done
		return false;
	},

	set_panel_state: function (open, vars) {
		if (open == this.open) return;
		this.open = open;

		if (this.enable_checkbox.is(":checked") != this.open) {
			this.enable_checkbox.prop("checked", true);
			if (this.enable_checkbox.is(":checked") != this.open) {
				this.enable_checkbox.click();
			}
		}

		var ani_speed = (vars && vars.instant ? 0 : script.settings["upload"]["animation_time"] * 1000);
		var self = this;

		if (open) {
			// Open
			this.auto_opened = (vars && vars.auto_opened) || false;
			this.control_panel.css("display", "");
			this.error("");

			// Animate closed
			var h;
			if (this.use_original_animation) {
				h = this.form_file_select_parent.height();
				this.form_file_select_parent.attr("_mp_animate_height", h);
				this.form_file_select_parent.css({
					"height": this.form_file_select_parent.height() + "px",
					"overflow": "hidden"
				});
				this.form_file_select_parent.stop(true).animate({
					"height": 0
				},{
					duration: ani_speed,
					complete: function () { $(this).css({"height": "0px", "display": "none"}); }
				});
			}
			else {
				// Object list
				var objs = [this.form_file_select[0]];

				// Rice
				var o = this.reply_form.find("#file,.riceFile,#qr-file-button,#qr-no-file,#qr-filename,#qr-filerm");
				for (var i = 0; i < o.length; ++i) {
					objs.push(o[i]);
				}

				// Animate
				$(objs)
				.attr("disabled", "disabled")
				.stop(true).animate({
					"opacity": 0.0
				},{
					duration: ani_speed,
					complete: function () {
						$(this)
						.css("opacity", "0.0")
						.addClass("MPSoundUploaderOriginalFileUploadHidden");
					}
				});
			}

			// Stuff
			if (this.form_submit_button_sub == null) {
				// Clone
				this.form_submit_button.after(
					(this.form_submit_button_clone = this.form_submit_button.clone())
				);
				this.form_submit_button.attr("disabled", "disabled");
			}
			else {
				var o1 = this.relater.offset();
				var o2 = this.form_submit_button.offset();
				var s;
				this.form_submit_button.after(s = E("div"));
				this.form_submit_button_sub.replaceWith(
					(this.form_submit_button_clone = this.form_submit_button.clone())
					.css({
						"position": "absolute",
						"left": (o2.left - o1.left) + "px",
						"top": (o2.top - o1.top) + "px",
						"margin": "0px",
						"padding": "0px",
						"z-index": "1",
						"width": this.form_submit_button.outerWidth() + "px",
						"height": this.form_submit_button.outerHeight() + "px"
					})
				);
				this.form_submit_button_sub = s;
			}
			this.form_submit_button.addClass("MPSoundUploaderOriginalSubmitButtonHidden").attr("hidden", "");
			this.form_submit_button_clone.on("click", function (event) { self.on_form_submit(event, $(this)); return false; });

			// Animate open
			h = this.control_panel.height();
			this.control_panel.css("height", "0px").stop(true).animate({
				"height": h
			},{
				duration: ani_speed,
				complete: function () {
					$(this).css({"height": ""});
					if (self.auto_load_file != null && (!vars || vars.auto_load !== false)) self.change_image(self.auto_load_file);
				}
			});
		}
		else {
			// Animate open
			if (this.use_original_animation) {
				this.form_file_select_parent.css("display", "").stop(true).animate({
					"height": parseFloat(this.form_file_select_parent.attr("_mp_animate_height"))
				},{
					duration: ani_speed,
					complete: function () { $(this).css("overflow", "").removeAttr("_mp_animate_height"); }
				});
			}
			else {
				// Object list
				var objs = [this.form_file_select[0]];

				// Rice
				var o = this.reply_form.find("#file,.riceFile,#qr-file-button,#qr-no-file,#qr-filename,#qr-filerm");
				for (var i = 0; i < o.length; ++i) {
					objs.push(o[i]);
				}

				// Animate
				$(objs)
				.removeClass("MPSoundUploaderOriginalFileUploadHidden")
				.removeAttr("disabled")
				.stop(true).animate({
					"opacity": 1.0
				},{
					duration: ani_speed,
					complete: function () { $(this).css("opacity", ""); }
				});
			}

			// Animate closed
			this.control_panel.css("height", this.control_panel.height() + "px").stop(true).animate({
				"height": 0.0
			},{
				duration: ani_speed,
				complete: function () {
					$(this).css({"height": "", "display": "none"});
					// Stuff
					if (self.form_submit_button_sub == null) {
						self.form_submit_button_clone.remove();
						self.form_submit_button.removeAttr("disabled");
					}
					else {
						var s;
						self.form_submit_button_clone.after(s = E("div"));
						self.form_submit_button_clone.remove();
						self.form_submit_button_sub.remove();
						self.form_submit_button_sub = s;
					}
					this.form_submit_button_clone = null;
					self.form_submit_button.removeClass("MPSoundUploaderOriginalSubmitButtonHidden").removeAttr("hidden");
					// Reset
					self.reset();
				}
			});
		}
	},
	reset: function () {
		for (var i = 0; i < this.sound_list_items.length; ++i) {
			this.sound_list_items[i].item.remove();
		}
		this.sound_list_items = [];

		this.remove_image();

		this.upload_modified = false;
	},

	hide_other_panel: function (target) {
		if (!script.settings["upload"]["enabled"]) return;

		if (script.settings["upload"]["block_other_scripts"]) {
			this.form_submit_button.removeAttr("disabled");

			var self = this;
			setTimeout(function () {
				self.error(
					E("span")
					.append("4cs has blocked another ")
					.append(
						E("a")
						.attr("href", "#")
						.html("uploader userscript")
						.on("click", function () {
							inline_manager.display_info("uploader blocked");
							return false;
						})
					),
					true
				);
			}, 100);
		}
	},

	change_image: function (file, ext_data) {
		var self = this;

		this.sound_image = {
			original_file: file,
			file_name: file.name,
			source: null,
			size: -1,
			truncate_to: -1,
			mime_type: file.type,
		};

		this.sound_image_display.val(this.sound_image.file_name);

		this.sound_image_display
		.removeClass("MPSoundUploaderImageFilenameBad")
		.removeClass("MPSoundUploaderImageFilenameNotSet");

		// Un-original-ify
		for (var i = 0; i < this.sound_list_items.length; ++i) {
			if (this.sound_list_items[i].is_original) {
				this.sound_list_items[i].is_original = false;
				this.sound_list_items[i].item.removeClass("MPSoundUploaderSoundListItemOriginal");
			}
		}

		// Checkbox
		this.remove_sound_image
		.css("display", "")
		.prop("checked", true);
		if (!this.remove_sound_image.is(":checked")) this.remove_sound_image.click();

		// Parse callback
		var files_callback = function (data, files, type) { // TODO
			// Find starting point and load
			for (var i = 0; i < files.length; ++i) {
				if (data.truncate_to < 0 || files[i].position < data.truncate_to) {
					data.truncate_to = files[i].position;
				}
				self.add_sound(files[i], true);
			}
		};

		if (ext_data) {
			// This skips the validation
			this.sound_image.source = ext_data.source;
			this.sound_image.size = this.sound_image.source.length;

			files_callback(this.sound_image, ext_data.files);
			return;
		}

		// Image complete function
		var img_good = function () {
			// Update
			self.update_sound_count();

			// Check for stuff
			self.image_check_callback(self.sound_image, media_player_manager.callbacks, 0, files_callback);
		};

		// Read the file source
		var reader = new FileReader();
		reader.onload = function (event) {
			self.sound_image.source = new Uint8Array(event.target.result);
			self.sound_image.size = self.sound_image.source.length;

			if (self.sound_image.size > self.max_size) {
				self.remove_image();
				self.error("Image too large");
				return;
			}

			self.sound_image_display.attr("title", self.bytes_to_size(self.sound_image.size) + " (" + InlineManager.prototype.commaify_number(self.sound_image.size) + " byte" + (self.sound_image.size == 1 ? "" : "s") + ")");

			if (script.settings["upload"]["validate_files"]) {
				var blob_url = (window.webkitURL || window.URL).createObjectURL(new Blob([self.sound_image.source], {type: self.sound_image.mime_type}));

				// Validation image
				var img = new Image();
				img.onload = function() {
					(window.webkitURL || window.URL).revokeObjectURL(blob_url);
					img_good();
				};
				img.onerror = function() {
					(window.webkitURL || window.URL).revokeObjectURL(blob_url);
					self.on_bad_image();
				}
				img.src = blob_url;
			}
			else {
				img_good();
			}
		};
		reader.readAsArrayBuffer(file);
	},
	add_sound: function (file, original, pseudo_original) {
		// File can either be:
		// 1) a File() object (if original = false)
		// 2) a return value of an image-audio decoding (if original = true)
		var self = this;
		var file_tag = (original ? file.title : file.name).replace(/.og[ga]$/i, "");

		// Data
		var data = {
			file_name: file.name,
			is_original: original && !pseudo_original,
			source: null,
			size: -1,
			original_format: (original && !pseudo_original ? file.format : ""),
			original_tag: file_tag
		};

		var maxlen = 98;
		(data.item = E("div"))
		.html(
			E("div")
			.addClass("MPSoundUploaderSoundListItem")
			.append(
				(data.tag_name = E("input"))
				.addClass("field MPSoundUploaderSoundListItemTagName")
				.attr("type", "text")
				.attr("maxlength", maxlen.toString())
				.val(file_tag)
				.on("change", function () {
					// Update value
					var v = $(this).val().replace(/\[/g, "").replace(/\]/g, "");
					if (v.length > maxlen) v = v.substr(0, maxlen);
					while (v.length > 0 && encode_utf8(v).length > maxlen) v = v.substr(0, v.length - 1); // uft8 safe
					$(this).val(v);

					// Change tag
					self.update_modified_check();

					// Update size requirements
					self.update_sound_count();
				})
			)
			.append(
				(data.checkbox = E("input"))
				.addClass("MPSoundUploaderSoundListItemCheck")
				.attr("type", "checkbox")
				.prop("checked", true)
				.on("change", {data: data}, function (event) { return self.on_sound_checkbox(event, $(this)); })
			)
		);

		if (data.is_original) {
			this.sound_list.prepend(data.item);
			data.item.addClass("MPSoundUploaderSoundListItemOriginal");
		}
		else {
			this.sound_list_none.before(data.item);
		}

		// Add to list
		this.sound_list_items.push(data);

		// Mod change
		this.update_modified_check();
		this.update_sound_count();

		// Done callback
		var sound_good = function () {
			// Update
			self.update_sound_count();
		};
		// Validate callback
		var validate = function () {
			if (data.size > self.max_size) {
				self.remove_sound(data, true);
				self.error("Sound file too large");
				return;
			}
			if (!uint8array_compare(self.good_header, data.source, 0, 0, self.good_header.length)) {
				self.remove_sound(data, true);
				self.error("Invalid .ogg file");
				return;
			}

			data.item.attr("title", self.bytes_to_size(data.size) + " (" + InlineManager.prototype.commaify_number(data.size) + " byte" + (data.size == 1 ? "" : "s") + ")");

			if (script.settings["upload"]["validate_files"]) {
				var blob_url = (window.webkitURL || window.URL).createObjectURL(new Blob([data.source], {type: "audio/ogg"}));

				// Validation sound
				var audio;
				$("body").append(
					(audio = E("audio"))
					.css("display", "none")
					.on("durationchange", function() {
						(window.webkitURL || window.URL).revokeObjectURL(blob_url);
						$(this).remove();
						sound_good();
					})
					.on("error", function() {
						(window.webkitURL || window.URL).revokeObjectURL(blob_url);
						$(this).remove();
						self.on_bad_sound(data);
					})
				);
				audio.attr("src", blob_url);
			}
			else {
				sound_good();
			}
		};

		// Read the file source
		if (original) {
			data.source = file.data;
			data.size = data.source.length;
			validate();
		}
		else {
			var reader = new FileReader();
			reader.onload = function (event) {
				data.source = new Uint8Array(event.target.result);
				data.size = data.source.length;
				validate();
			};
			reader.readAsArrayBuffer(file);
		}
	},
	add_sounds_from_image: function (file) {
		// Read the file source
		var self = this;

		var reader = new FileReader();
		reader.onload = function (event) {
			var data = {
				source: new Uint8Array(event.target.result),
				file_name: file.name
			};

			self.image_check_callback(data, media_player_manager.callbacks, 0, function (data, files, type) { // TODO
				// Find starting point and load
				for (var i = 0; i < files.length; ++i) {
					self.add_sound(files[i], true, true);
				}
			});
		};
		reader.readAsArrayBuffer(file);
	},
	remove_image: function () {
		if (this.sound_image == null) return;

		this.sound_image_display
		.removeClass("MPSoundUploaderImageFilenameBad")
		.addClass("MPSoundUploaderImageFilenameNotSet")
		.removeAttr("title")
		.val(this.default_no_image_text);

		this.remove_sound_image.prop("checked", false)
		.css("display", "none");

		for (var i = 0; i < this.sound_list_items.length; ++i) {
			if (this.sound_list_items[i].is_original) {
				this.sound_list_items[i].is_original = false;
				this.sound_list_items[i].item.removeClass("MPSoundUploaderSoundListItemOriginal");
			}
		}

		this.update_modified_check();

		this.sound_image = null;
		this.update_sound_count();
	},
	remove_sound: function (data, full_remove) {
		for (var i = 0; i < this.sound_list_items.length; ++i) {
			if (data == this.sound_list_items[i]) {
				if (!this.sound_list_items[i].is_original || full_remove) {
					data.item.remove();
					this.sound_list_items.splice(i, 1);
				}
				break;
			}
		}

		// Update count
		this.update_modified_check();
		this.update_sound_count();
	},

	image_check_callback: function (data, callbacks, index, found_callback) {
		if (index >= callbacks.length) {
			return;
		}

		var self = this;

		callbacks[index](data.file_name, MediaPlayer.ALL_SOUNDS, data.source, function (files) {
			if (files == null) {
				self.image_check_callback(data, callbacks, index + 1, found_callback);
			}
			else {
				if (files[1] != null) {
					// Done
					found_callback(data, files[1]);
				}
			}
		});
	},

	removal_check: function (target) {
		// Called when the panel should be removed completely
		if (this.control_panel && $.contains(target, this.control_panel)) {
			this.set_panel_state(false, {instant: true});
			this.nullify();
		}
	},

	update_modified_check: function () {
		// Check modified state
		var modified = false;
		for (i = 0; i < this.sound_list_items.length; ++i) {
			if (
				(this.sound_list_items[i].is_original != this.sound_list_items[i].checkbox.is(":checked") && (!this.sound_list_items[i].is_original || !this.sound_list_items[i].original_format.match(/(stego)/))) || // If it's an original stego-image, this doesn't matter
				this.sound_list_items[i].original_tag != this.sound_list_items[i].tag_name.val() ||
				(this.sound_list_items[i].is_original && !this.sound_list_items[i].original_format.match(/(concat\..+\.mask|stego)/))
			) {
				modified = true;
				break;
			}
		}
		// Change
		if (modified != this.upload_modified) {
			this.upload_modified = modified;

			if (modified) this.upload_modified_indicator.removeClass("MPSoundUploaderModifiedIndicatorOff");
			else this.upload_modified_indicator.addClass("MPSoundUploaderModifiedIndicatorOff");
		}
	},
	update_sound_count: function () {
		var count = 0;
		var ocount = 0;
		var bytes = 0;
		var full_size = (this.sound_image ? (this.sound_image.truncate_to >= 0 ? this.sound_image.truncate_to : this.sound_image.size) : -1);

		// Count
		var ret = true;
		for (var b = 0; b == 0 || b == 2; ) {
			++b;

			// Check
			for (var i = 0; i < this.sound_list_items.length; ++i) {
				if (!this.sound_list_items[i].tag_name.hasClass("MPSoundUploaderSoundListItemBad") && this.sound_list_items[i].size >= 0) {
					if (this.sound_list_items[i].is_original) {
						if (this.sound_list_items[i].original_format.indexOf("stego") < 0) {
							if (this.sound_list_items[i].checkbox.is(":checked")) {
								++ocount;
								bytes += this.sound_list_items[i].size + encode_utf8(this.sound_list_items[i].tag_name.val()).length + 2;
							}
						}
						else {
							++ocount; // cannot remove stego image (presently)
						}
					}
					else {
						if (this.sound_list_items[i].checkbox.is(":checked")) {
							++count;
							bytes += this.sound_list_items[i].size + encode_utf8(this.sound_list_items[i].tag_name.val()).length + 2;
						}
					}
				}
			}

			// Validate
			if ((this.max_size - full_size) - bytes < 0) {
				ret = (ocount + count == 1);
				for (var i = 0; i < this.sound_list_items.length; ++i) {
					if (this.sound_list_items[i].checkbox.is(":checked")) {
						this.sound_list_items[i].checkbox.prop("checked", false);
						if (this.sound_list_items[i].checkbox.is(":checked")) {
							this.sound_list_items[i].checkbox.click();
						}
					}
				}
				b = 2;
				count = 0;
				ocount = 0;
				bytes = 0;
			}
		}

		// Count
		this.sound_count.html(count.toString());
		if (ocount > 0) {
			this.sound_count_sep.css("display", "");
			this.sound_count_original.html(ocount.toString()).css("display", "");
			this.sound_count_container.attr("title", (count + ocount) + " sound" + ((count + ocount) == 1 ? "" : "s") + " total; " + ocount + " embedded in the current image");
		}
		else {
			this.sound_count_container.attr("title", count + " sound" + (count == 1 ? "" : "s"));
			this.sound_count_sep.css("display", "none");
			this.sound_count_original.css("display", "none");
		}

		// Bytes
		if (full_size < 0) {
			this.file_size_available_full.html("?");
			this.file_size_available_sep.css("display", "none");
			this.file_size_available.css("display", "none");
		}
		else if (bytes == 0) {
			this.file_size_available_full.html(this.bytes_to_size(this.max_size - full_size));
			this.file_size_available_sep.css("display", "none");
			this.file_size_available.css("display", "none");
		}
		else {
			this.file_size_available_full.html(this.bytes_to_size(this.max_size - full_size));
			this.file_size_available_sep.css("display", "");
			this.file_size_available.html(this.bytes_to_size(Math.max(0, (this.max_size - full_size) - bytes))).css("display", "");
		}

		return ret;
	},

	submit: function () {
		var f_data = {file: null, file_name: null};
		var self = this;

		// Image
		if (this.sound_image != null) {
			if (this.upload_modified) {
				// 0: Get blob size
				var image_size = (this.sound_image.truncate_to >= 0 ? this.sound_image.truncate_to : this.sound_image.size);
				var array_size = image_size;
				var sounds = [];
				for (var i = 0; i < this.sound_list_items.length; ++i) {
					if (this.sound_list_items[i].checkbox.is(":checked") && !this.sound_list_items[i].tag_name.hasClass("MPSoundUploaderSoundListItemBad") && this.sound_list_items[i].size >= 0) {
						array_size += this.sound_list_items[i].size + encode_utf8(this.sound_list_items[i].tag_name.val()).length + 2;
						sounds.push(this.sound_list_items[i]);
					}
				}

				// 1: Create the array
				var array = new Uint8Array(new ArrayBuffer(array_size));

				// 2: Copy image
				var pos = 0;
				array.set(this.sound_image.source.subarray(0, image_size), pos);
				pos += image_size;

				// 3: Hash the image
				var unmask_state = 0, mask;
				for (var i = 0; i < pos; ++i) {
					unmask_state = (1664525 * unmask_state + 1013904223) & 0xFFFFFFFF;
					mask = unmask_state >>> 24;
					unmask_state += (array[i] ^ mask);
				}

				// 4: Add the sounds
				var data, ch;
				for (var s = 0; s < sounds.length; ++s) {
					// Encode the key
					data = string_to_uint8array("[" + encode_utf8(sounds[s].tag_name.val()) + "]");
					for (var key = true; true; key = false) {
						// Encode
						for (var i = 0; i < data.length; ++i) {
							unmask_state = (1664525 * unmask_state + 1013904223) & 0xFFFFFFFF;
							mask = unmask_state >>> 24;
							unmask_state += data[i];
							array[pos + i] = (data[i] ^ mask);
						}
						pos += data.length;

						// Encode the data
						if (!key) break;
						data = sounds[s].source;
					}
				}

				// 5: Create blob
				var blob = new Blob([array], {type: this.sound_image.mime_type});
				//var blob_url = (window.webkitURL || window.URL).createObjectURL(blob);

				// 6: Set data
				f_data.file = blob;
				f_data.file_name = this.sound_image.file_name;
			}
			else {
				f_data.file = this.sound_image.original_file;
				f_data.file_name = null;//this.sound_image.file_name;
			}
		}

		// 7: Build the form data
		var data = this.build_form_data(this.reply_form, this.reply_container, this.post_fields, f_data);

		// 7.5: Error
		if (data.quick_error != null) {
			this.error(data.quick_error);
			return false;
		}

		// 8: Target
		var f = $("form");
		var target_url = null
		if (f.length > 0) {
			target_url = $(f[0]).attr("action");
		}
		else {
			data.errors.push("Could not find the post target.");
		}

		// 9: Error checking
		if (data.errors.length > 0) {
			this.error("Error acquiring post data");
			inline_manager.display_info("upload error", {errors: data.errors});
			return false;
		}

		// 10: Posting
		this.uploading = true;
		if (this.form_submit_button_clone) this.form_submit_button_clone.val("...");
		this.abortable_upload = ajax({
			method: "POST",
			url: target_url,
			post_data: data.form_data,
			force_xhr: true,
			cred: true,
			on: {
				done: function (okay, data, response) {
					// Check status
					if (okay) {
						var title = /<title>([^<]*)/i.exec(response);
						title = (title ? title[1] : "");

						var error = /"errmsg"[^>]*>([^<]*)/i.exec(response);
						error = (error ? error[1] : "");

						if (error != "") {
							self.error(error);
							self.captcha_reload();
						}
						else if (title.toLowerCase().indexOf("post successful") >= 0) {
							// Okay
							self.on_successful_post();
						}
					}
					else {
						self.error("Posting error (" + response.status + " / " + response.status_text + ")");
						self.captcha_reload();
					}

					if (self.form_submit_button_clone) {
						self.form_submit_button_clone
						.val(self.form_submit_button.val());
					}

					self.uploading = false;
					self.abortable_upload = null;
				},
				upload: {
					progress: function (event, data) {
						var percent = Math.round(event.loaded / event.total * 100);

						if (self.form_submit_button_clone) {
							self.form_submit_button_clone.val(percent + "%");
						}
					},
					error: function (event, data) {
						self.error("Connection error");
						self.captcha_reload();

						if (self.form_submit_button_clone) {
							self.form_submit_button_clone
							.val(self.form_submit_button.val());
						}

						self.uploading = false;
						self.abortable_upload = null;
					},
					abort: function (event, data) {
						self.error("Upload aborted");
						self.captcha_reload();

						if (self.form_submit_button_clone) {
							self.form_submit_button_clone
							.val(self.form_submit_button.val());
						}

						self.uploading = false;
						self.abortable_upload = null;
					}
				}
			}
		});

		// Done
		return false;
	},
	build_form_data: function (form, container, fields, data) {
		var s = "";
		var str_type = typeof("");
		var form_data = new FormData();
		var errors = [];
		var quick_error = null;
		var has_pass = has_4chan_pass();

		for (var key in fields) {
			var can_be_missing = (fields[key].missing_with_pass && has_pass);

			switch (fields[key].type) {
				case 0: // Search by name
				{
					var e, v;
					var found = false;
					for (var i = 0; i < fields[key].alt.length; ++i) {
						v = null;
						if (typeof(fields[key].alt[i]) == str_type) {
							// Value
							e = form.find("[name=\"" + fields[key].alt[i] + "\"]");
							if (e.length > 0) {
								v = e.val();
								if (v === undefined) v = null;
							}
						}
						else {
							// Function call
							var v = fields[key].alt[i](form, container);
						}
						// Check
						if (v != null) {
							if (fields[key].blank === false && v.length == 0 && !can_be_missing) {
								quick_error = fields[key].blank_error;
							}
							form_data.append(key, v);
							found = true;
							break;
						}
					}

					if (!found && !fields[key].missing && !can_be_missing) {
						errors.push("Submit form key \"" + key + "\" could not be found.");
					}
				}
				break;
				case 1: // Direct value
				{
					form_data.append(key, fields[key].value);
				}
				break;
				case 2: // Checkbox
				{
					var e = form.find("[name=\"" + key + "\"]");
					if (e.length > 0) {
						if (e.is(":checked")) {
							form_data.append(key, fields[key].value);
						}
					}
					else {
						e = form.find("#" + key + "");

						if (e.length == 0) {
							for (var i = 0; i < fields[key].alt.length; ++i) {
								if (typeof(fields[key].alt[i]) == str_type) {
									// Value
									e = form.find("[name=\"" + fields[key].alt[i] + "\"]");
								}
								else {
									// Function call
									e = fields[key].alt[i](form, container);
								}
							}

							if (e != null && e.length > 0) {
								if (e.is(":checked")) {
									form_data.append(key, fields[key].value);
								}
							}
							else if (!fields[key].missing && !can_be_missing) {
								errors.push("Submit form key \"" + key + "\" could not be found.");
							}
						}
						else if (e.is(":checked")) {
							form_data.append(key, fields[key].value);
						}
					}
				}
				break;
				case 3: // From data
				{
					if (fields[key].key in data && data[fields[key].key] != null) {
						// Assumed to be the file
						if (data.file_name) {
							form_data.append(key, data[fields[key].key], data.file_name);
						}
						else {
							form_data.append(key, data[fields[key].key]);
						}
					}
					else if (!fields[key].missing && !can_be_missing) {
						errors.push("Submit form key \"" + key + "\" could not be found.");
					}
				}
				break;
			}
		}

		return {
			form_data: form_data,
			errors: errors,
			quick_error: quick_error,
		};
	},

	error: function (status, un_disable) {
		if (this.mode == "inline") {
			if (status) this.reply_container.find("#qrError").css("display", "block").html(status);
			else this.reply_container.find("#qrError").css("display", "").html("");
		}
		else if (this.mode == "4chanx3") {
			if (status) this.error_container.css("display", "").html(status);
			else this.error_container.css("display", "none").html("");
		}
		else {
			if (this.reply_container) this.reply_container.find(".warning").html(status || "");
		}
	},
	captcha_reload: function () {
		// Manual notice
		var cv = this.reply_form.find(".captchainput .field,#qrCapField,.captcha-input.field");
		cv.val("").attr("placeholder_temp", cv.attr("placeholder")).attr("placeholder", "Reload your captcha; click the image!").attr("readonly", "readonly");

		// Auto-reload (hopefully)
		if (this.reply_form) this.reply_form.find(".captchaimg img,.captchaimg,#qrCaptcha,.captcha-img img").click();
	},

	is_mime_type: function (s, type) {
		for (var i = 0; i < this.mime_types[type].length; ++i) {
			if (s == this.mime_types[type][i]) return true;
		}
		return false;
	},
	bytes_to_size: function (b) {
		if (b < 1000) return b + "B";
		b = Math.round(b / 102.4) / 10;
		if (b < 1000) return b + "KB";
		b = Math.round(b / 102.4) / 10;
		return b + "MB";
	},

	check_old_files: function (files) {
		if (files) {
			// Check
			if (files.length == 0) {
				this.auto_load_file = null;
			}
			else {
				this.auto_load_file = null;
				for (var i = 0; i < files.length; ++i) {
					if (this.is_mime_type(files[i].type, "image")) {
						this.auto_load_file = files[i];
						break;
					}
				}

				// Auto-detection?
				if (this.auto_load_file != null && script.settings["upload"]["autodetect_when_not_open"] && !this.open) {
					var self = this;

					var reader = new FileReader();
					reader.onload = function (event) {
						var data = {
							source: new Uint8Array(event.target.result),
							file_name: self.auto_load_file.name
						};

						self.image_check_callback(data, media_player_manager.callbacks, 0, function (data, files2, type) { // TODO
							// Sounds found: auto-open panel
							self.set_panel_state(true, {auto_load: false, auto_opened: true});

							// Find starting point and load
							self.change_image(self.auto_load_file, {
								source: data.source,
								files: files2
							});
						});
					};
					reader.readAsArrayBuffer(this.auto_load_file);
				}
			}
		}
		else {
			this.auto_load_file = null;
		}
	},


	on_file_change: function (event, obj) {
		if (event.target.files) {
			var files = [];
			var e_files = [];
			var image = null;
			var errors = 0;

			// Check
			for (var i = 0; i < event.target.files.length; ++i) {
				if (event.data.auto_detect) {
					// Auto-detect
					if (this.is_mime_type(event.target.files[i].type, "audio")) {
						files.push(event.target.files[i]);
					}
					else if (this.is_mime_type(event.target.files[i].type, "image")) {
						if (this.sound_image == null) {
							image = event.target.files[i];
						}
						else {
							e_files.push(event.target.files[i]);
						}
					}
					else {
						++errors;
					}
				}
				else if (!event.data.sound && this.is_mime_type(event.target.files[i].type, "image")) {
					// Image
					image = event.target.files[i];
				}
				else if (event.data.sound) {
					if (this.is_mime_type(event.target.files[i].type, "audio")) {
						files.push(event.target.files[i]);
					}
					else if (this.is_mime_type(event.target.files[i].type, "image")) {
						e_files.push(event.target.files[i]);
					}
					else {
						++errors;
					}
				}
				else {
					++errors;
				}
			}

			// Found any?
			if (files.length > 0 || e_files.length > 0 || image != null) {
				this.error("");

				if (image != null) {
					this.change_image(image);
				}
				if (files.length > 0) {
					for (var i = 0; i < files.length; ++i) {
						this.add_sound(files[i], false);
					}
				}
				if (e_files.length > 0) {
					for (var i = 0; i < e_files.length; ++i) {
						this.add_sounds_from_image(e_files[i]);
					}
				}
			}
			else if (errors > 0) {
				this.error("Bad file type");
			}

			// Clear
			if (obj) obj.val("");
		}
	},
	on_file_change_old: function (event, obj) {
		if (this.open) return; // why this would ever happen is beyond me

		if (this.mode == "4chanx3") {
			var self = this;
			document.dispatchEvent(new CustomEvent(
				"QRGetSelectedPost",
				{
					detail: function (post) {
						// Check
						self.check_old_files([post.file]);
					}
				}
			));
			return;
		}

		// Check
		this.check_old_files(event.target.files);
	},

	on_bad_image: function () {
		this.remove_image();

		this.error("Bad image format");
	},
	on_bad_sound: function (sound_data) {
		sound_data.tag_name.addClass("MPSoundUploaderSoundListItemBad");

		// Un-tick
		sound_data.checkbox.prop("checked", false);
		if (sound_data.checkbox.is(":checked")) {
			sound_data.checkbox.click();
		}

		// Update count
		this.update_modified_check();
		this.update_sound_count();
	},

	on_sound_checkbox: function (event, obj) {
		var i;
		if (!obj.is(":checked")) {
			// Remove
			this.remove_sound(event.data.data, false);
		}
		else {
			// Update count
			this.update_modified_check();
			this.update_sound_count();
		}
	},
	on_image_checkbox: function (event, obj) {
		if (!obj.is(":checked") || event.data.data.tag_name.hasClass("MPSoundUploaderSoundListItemBad")) {
			this.remove_image();
		}
	},

	on_form_submit: function (event, obj) {
		if (this.uploading) {
			// Abort
			this.abortable_upload.abort();
			this.abortable_upload = null;
			this.uploading = false;

			return false;
		}
		return (this.submit() || false);
	},
	on_successful_post: function () {
		// Reset file uploader
		if (this.auto_opened) {
			this.set_panel_state(false, null);
		}
		else {
			this.reset();
		}

		// Clear error
		this.error("");

		// Clear subject
		this.reply_form.find("[name=\"sub\"],[data-name=\"sub\"]").val("");

		// Clear comment
		this.reply_form.find("[name=\"com\"],[data-name=\"com\"]").val("");

		// De-spoiler
		var sp = this.reply_form.find("[name=spoiler],#spoiler,#qr-file-spoiler");
		if (sp.length > 0 && sp.is(":checked")) {
			sp.click();
			if (sp.is(":checked")) sp.prop("checked", false);
		}

		// Force reload captcha
		this.captcha_reload();

		// Clear file
		this.form_file_select.val("");
		this.reply_form.find("#file.field").html("");
		if (this.mode == "4chanx3") {
			var self = this;
			document.dispatchEvent(new CustomEvent(
				"QRGetSelectedPost",
				{
					detail: function (post) {
						// Check
						post.file = null;
						post.load();
					}
				}
			));
		}


		// Update thread
		if (script.settings["upload"]["autoupdate_after_post"]) {
			setTimeout(function () {
				var o = $("input[type=\"button\"][name=\"Update Now\"]");
				if (o.length == 0) o = $("input[type=\"button\"][name=\"Update\"]");
				o.click();
			}, 2000);
		}
	},

};



///////////////////////////////////////////////////////////////////////////////
// Inline text
///////////////////////////////////////////////////////////////////////////////
function InlineManager() {
    if ($("html").find("head").length == 0) {
        $("html").prepend(document.createElement("head"));
    }

	var self = this;


	// Detect other userscripts
	this.mode = "inline";
	if (is_homepage) {
		this.mode = "home";
	}
	else if (xch) {
		this.mode = "xch";
	}
	else if (is_archive) {
		this.mode = "archive";
	}
	else if (is_38) {
		this.mode = "38";
	}
	else {
		if ($("html").hasClass("fourchan-x")) this.mode = "4chanx3";
		else if ($("body").hasClass("fourchan_x")) {
			this.mode = "4chanx";
			if ($("#ch4SS").length > 0) this.mode += "+ss";
			if ($("input[type=checkbox].riced").length > 0) this.mode = "appchanx"; // probably a better way to do this
		}
		else {
			if ($("html.top").length > 0) this.mode = "appchanx2"; // v2+
		}
	}
	this.oneechan = false;
	if ($("html").hasClass("oneechan")) {
		this.oneechan = true;
	}

	// Insert stylesheet
	$("head")
	.append( //{ Stylesheet
		E("style")
		.attr("id", "MPStyleInline") // random_string(16 + random_integer(17)))
		.html(
			"a.MPNavLink,.MPNavSpan{}\n" +
			".MPHidden{display:none !important;}\n" +

			".MPControlBar{" + (this.oneechan ? "position:relative;top:-20px;" : "") + "}\n" +

			".MPThreadControls{}\n" +

			".MPSoundsAbout{font-size:0.75em !important;line-height:normal !important;margin:8px 0px 0px 0px !important;}\n" +
			".MPSoundsAbout ol{margin:0px 0px 0px 2em !important;padding:0px !important;display:inline-block !important;}" +
			".MPSoundsAbout li{margin:0px !important;padding:0px !important;line-height:normal !important;}" +

			"a.MPLoadLink,a.MPLoadLink:visited{color: inherit;}\n" +
			".MPImageSearchingTextContainer{}\n" +
			".MPImageSearchingText{}\n" +
			".MPLoadLinkTop{}\n" +
			".MPLoadLinkTopFile{}\n" +
			".MPLoadAllLink{}\n" +
			".MPReplacedURL{}\n" +
			".MPIconedURLText{vertical-align:middle;}\n" +
			".MPIconedURLTextNotFound{font-style:italic;}\n" +
			".MPURLIcon{display:inline-block;width:20px;height:16px;vertical-align:middle;background-repeat:no-repeat;background-position:top left;background-size:16px 16px;}\n" +
			".spoiler:not(:hover) .MPURLIcon,s:not(:hover) .MPURLIcon{background-image:none !important;}\n" +
			".MPURLIconVimeo{background-image:url(//vimeo.com/favicon.ico);}\n" +
			".MPURLIconYoutube{background-image:url(//youtube.com/favicon.ico);}\n" +
			".MPURLIconSoundcloud{background-image:url(//soundcloud.com/favicon.ico);}\n" +
			".MPReplacedURLContainer{display:inline;position:relative;}\n" +

			".MPVideoInfo{display:none !important;}\n" +
			".MPVideoInfoDisplay{z-index:10;text-align:center;padding:8px !important;display:block;position:absolute;left:0;top:100%;box-shadow:0px 0px 2px 2px rgba(0,0,0,0.25);border-radius:4px;width:auto !important;}\n" +
			":root div.post.reply.MPVideoInfoDisplay.MPVideoInfoDisplayHidden,:root div.post_wrapper.MPVideoInfoDisplay.MPVideoInfoDisplayHidden{display:none !important}\n" +
			".MPVideoInfoDisplayContainer{}\n" +
			".MPVideoInfoDisplayTitle{text-align:left;margin-bottom:2px;}\n" +
			".MPVideoInfoDisplayTitleStart{opacity:0.5 !important;}\n" +
			".MPVideoInfoDisplayTitleViews{float:right;}\n" +
			".MPVideoInfoDisplayTitleEnd{clear:both;}\n" +
			".MPVideoInfoDisplayRatingBg{position:relative;z-index:1;background:#f02020;height:2px;width:100%;opacity:1.0 !important;overflow:hidden;}\n" +
			".MPVideoInfoDisplayRatingGood{background:#80d820;height:2px;}\n" +
			".MPVideoInfoDisplayContent{white-space:nowrap;}\n" +
			".MPVideoInfoDisplayPreview{display:inline-block;vertical-align:top !important;}\n" +
			".MPVideoInfoDisplayThumbnailContainerOuter{border-width:0px 2px 2px 2px;border-style:solid;border-color:rgba(0,0,0,0.25);}\n" +
			".MPVideoInfoDisplayThumbnailContainerOuterTop{border-width:2px !important;}\n" +
			".MPVideoInfoDisplayThumbnailContainer{background:#000;display:block;width:100%;white-space:nowrap !important;line-height:0px;overflow:hidden;}\n" +//
			".MPVideoInfoDisplayThumbnail{display:inline-block;}\n" +
			".MPVideoInfoDisplayThumbnailFirst{display:block;}\n" +
			".MPVideoInfoDisplayDescription{display:inline-block;overflow:hidden;text-align:left;vertical-align:top !important;}\n" +
			".MPVideoInfoDisplayDescriptionInner{padding-left:2px;white-space:normal !important;}\n" +
			".MPVideoInfoDisplayDescriptionInner p{padding:0px !important;margin:0px !important;}\n" +
			".MPVideoInfoDisplayDescriptionInner p + p{margin-top:0.375em !important;}\n" +

			".MPPopupContainerOuter{position:fixed;left:0;top:0;right:0;bottom:0;z-index:10001;background:rgba(0,0,0,0.25);}\n" +
			".MPPopupClosed{display:none !important;}\n" +
			".MPPopupContainerInner{position:relative;width:100%;height:100%;}\n" +
			"div.MPPopupBox{display:block !important;position:absolute !important;left:25%;top:15%;right:25%;bottom:15%;border:0px !important;box-shadow:0px 0px 2px 2px rgba(0,0,0,0.25);border-radius:6px !important;padding:0px !important;margin:0px !important;padding:4px !important;}\n" +
			".MPPopupInfoContainer{width:100%;height:100%;overflow-x:hidden;overflow-y:auto;line-height:normal !important;}\n" +
			".MPPopupInfoContainer p{margin:0px 0px 0px 4px !important;padding:0px !important;}\n" +
			".MPPopupInfoContainer p + p{margin-top:4px !important;}\n" +
			".MPPopupInfoContainer p + p.MPPopupInfoLabel{margin-top:16px !important;}\n" +
			".MPPopupInfoContainer ul{margin:0px 0px 0px 1.25em !important;padding:0px !important;}" +
			".MPPopupInfoContainer li{margin:0px !important;padding:0px !important;line-height:normal !important;}" +
			"p.MPPopupInfoLabel{font-weight:bold;margin-left:0px !important;}\n" +
			"p.MPPopupInfoCentered{text-align:center;}\n" +
			"p.MPPopupInfoBottom{margin-bottom:16px !important;}\n"
		)
	)
	.append(
		(this.custom_styles = E("style"))
		.attr("id", "MPStyleCustomInline")// random_string(16 + random_integer(17)))
	); //}
	this.update_styles();

	// Control bars
	var brackets = [ " [" , "] " ];
	var brackets2 = [ " [" , "] " ];
	var sep = "/";
	if (this.mode == "home") {
		$("body").append("<span class=\"MPControlBar\" thread_controls=\"false\" settings=\"true\"></span>");
		brackets = [ " [ " , " ] " ];
		brackets2 = [ " [ " , " ] " ];
		sep = " / ";
	}
	else if (this.mode == "archive") {
		$(".letters").append(" <span class=\"MPControlBar\" thread_controls=\"false\" settings=\"true\"></span>");
		var o;
		if ((o = $(".thread")).length > 0) {
			o.prepend("<div><span class=\"MPControlBar\" thread_controls=\"true\" settings=\"false\"></span></div>");
		}
		brackets = [ " [ " , " ] " ];
		brackets2 = [ " [ " , " ] " ];
		sep = " / ";
	}
	else if (this.mode == "38") {
		$(".boardlist").append(" <span class=\"MPControlBar\" thread_controls=\"false\" settings=\"true\"></span>");
		var o;
		if ((o = $("form[name=\"postcontrols\"]")).length > 0) {
			$(o[0]).before("<span class=\"MPControlBar\" thread_controls=\"true\" settings=\"false\"></span>");
		}
		brackets = [ " [ " , " ] " ];
		brackets2 = [ " [ " , " ] " ];
	}
	else if (this.mode == "inline") {
		$("#navtopright,#navbotright").prepend("<span class=\"MPControlBar\" thread_controls=\"false\" settings=\"true\"></span> ");
		var o;
		if ((o = $(".thread")).length > 0) {
			o.prepend("<span class=\"MPControlBar\" thread_controls=\"true\" settings=\"false\"></span>");
		}
	}
	else if (this.mode == "4chanx") {
		$("#navtopright,#navbotright").prepend("<span class=\"MPControlBar\" thread_controls=\"false\" settings=\"true\"></span> ");
		var o;
		if ((o = $(".navLinks.desktop")).length > 0) {
			o.append("<span class=\"MPControlBar\" thread_controls=\"true\" settings=\"false\"></span>");
		}
		else if ((o = $("#imgControls")).length > 0) {
			o.append("<span class=\"MPControlBar\" thread_controls=\"true\" settings=\"false\"></span>");
		}
		else if ((o = $(".thread")).length > 0) {
			o.prepend("<div><span class=\"MPControlBar\" thread_controls=\"true\" settings=\"false\"></span></div>");
		}
	}
	else if (this.mode == "4chanx+ss") {
		$("#navtopright,#navbotright").prepend("<span class=\"MPControlBar\" thread_controls=\"false\" settings=\"true\"></span>");
		var o;
		if ((o = $(".thread")).length > 0) {
			o.prepend("<span class=\"MPControlBar\" thread_controls=\"true\" settings=\"false\"></span>");
		}
		brackets = [ "" , "" ];
	}
	else if (this.mode == "4chanx3") {
		var o;
		if ((o = $(".navLinks.mobile")).length > 0) {
			$(o[0]).after("<div><span class=\"MPControlBar\" thread_controls=\"true\" settings=\"true\"></span></div>");
		}
	}
	else if (this.mode == "appchanx") {
		var o;
		if ((o = $("#boardNavDesktop.desktop")).length > 0) {
			o.append("<span class=\"MPControlBar\" thread_controls=\"false\" settings=\"true\"></span>");
		}
		if ((o = $(".thread")).length > 0) {
			o.prepend("<span class=\"MPControlBar\" thread_controls=\"true\" settings=\"false\"></span>");
		}
	}
	else if (this.mode == "appchanx2") {
		var o;
		if ((o = $(".navLinks.mobile")).length > 0) {
			$(o[0]).after("<div><span class=\"MPControlBar\" thread_controls=\"true\" settings=\"true\"></span></div>");
		}
	}
	// Settings link
	$(".MPControlBar[settings=\"true\"]")
	.html(
		E("span")
		.addClass("MPNavSpan")
		.append(T(brackets[0]))
		.append( //{
			E("a")
			.addClass("MPNavLink")
			.html("Media Player")
			.attr("href", "http://dnsev.github.io/4cs/")
			.attr("target", "_blank")
			.on("click", function (event) {
				return self.on_menu_link_click($(this), event);
			})
		) //}
		.append(T(brackets[1]))
	);

	// Popups
	this.popup_easy_close = true;
	$("body").append( //{
		(this.popup_container = E("div"))
		.addClass("MPPopupContainerOuter MPPopupClosed")
		.on("click", {}, function (event) {
			self.popup_close();
		})
		.append(
			E("div")
			.addClass("MPPopupContainerInner")
			.append(
				E("div")
				.addClass("MPPopupBox MPHighlightShadow2px")
				.addClass(is_archive ? "post_wrapper" : "post reply")
				.on("click", {}, function (event) {
					return false;
				})
				.append(
					(this.popup_info_container = E("div"))
					.addClass("MPPopupInfoContainer")
				)
			)
		)
	); //}

	// Load all
	if (script.settings["inline"]["sound_thread_control"]) {
		$($(".MPControlBar[thread_controls=\"true\"]")[0])
		.append(
			E("span")
			.addClass("MPThreadControls")
			.append(T(brackets2[0]))
/*			.append(
				(sound_auto_checker.link = E("a"))
				.attr("href", "#")
				.html("Detect Sounds")
				.on("click", {}, this.on_detect_all_in_thread_click)
			)
			.append(T(sep))*/
			.append(
				(sound_auto_loader.link = E("a"))
				.attr("href", "#")
				.html("Load All Sounds")
				.on("click", {}, this.on_load_all_in_thread_click)
			)
			.append(T(brackets2[1]))
		);
	}

	// Settings
	this.settings_manager = new SettingsManager(this);

	// Uploader
	this.uploader = new InlineUploader(this);
}
InlineManager.prototype = {
	constructor: InlineManager,

	parse_color: function (color) {
		var m;
		var c = [ 0 , 0 , 0 , 1 ];
		// Scan
		if ((m = /^\s*\#?([0-9a-fA-F]{3})\s*$/.exec(color))) {
			for (var i = 0; i < 3; ++i) {
				c[i] = parseInt(m[1][i], 16) * 16;
			}
		}
		else if ((m = /^\s*\#?([0-9a-fA-F]{6})\s*$/.exec(color))) {
			for (var i = 0; i < 3; ++i) {
				c[i] = parseInt(m[1].substr(i * 2, 2), 16);
			}
		}
		else if ((m = /^\s*rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)\s*$/.exec(color))) {
			for (var i = 0; i < 3; ++i) {
				c[i] = parseInt(m[1 + i], 10);
			}
		}
		else if ((m = /^\s*rgba\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9\.]+)\s*\)\s*$/.exec(color))) {
			for (var i = 0; i < 3; ++i) {
				c[i] = parseInt(m[1 + i], 10);
			}
			c[3] = parseFloat(m[1 + 3]);
		}
		// Correct
		for (var i = 0; i < 3; ++i) {
			if (c[i] < 0) c[i] = 0;
			else if (c[i] > 255) c[i] = 255;
		}
		if (c[3] < 0.0) c[3] = 0.0;
		else if (c[3] > 1.0) c[3] = 1.0;
		// Return
		return c;
	},
	color_to_style: function (color, alpha) {
		var a = (alpha === undefined ? color[3] : alpha);
		return (a >= 1.0 ? "rgb(" : "rgba(") + color[0] + "," + color[1] + "," + color[2] + "," + a + ")";
	},
	update_styles: function () {
		var c = this.parse_color(script.settings["inline"]["highlight_color"]);

		this.custom_styles.html(
			".MPHighlightShadow2px{box-shadow:0px 0px 2px 2px " + this.color_to_style(c, 0.25) + " !important;}\n" +
			".MPHighlightBorderColor{border-color:" + this.color_to_style(c, 0.25) + " !important;}" +
			".MPHighlightShadow2pxOnHover:hover{box-shadow:0px 0px 2px 2px " + this.color_to_style(c, 0.25) + " !important;}"
		);
	},

	parse_post: function (post_data, redo, post_data_copy) {
		if (!post_data) return;
		if (post_data.image_url != null) {
			var self = this;

			if (redo) {
				// Re-replace
				post_data_copy.post.find(".MPLoadLink").each(function (index) {
					var tag_id = parseInt($(this).attr("mp_tag_id"));

					$(this)
					.html(post_data.sounds[tag_id])
					.off("click")
					.on("click", {"post_data": post_data, "tag_id": tag_id, "manager": self}, self.on_sound_tag_click);
				});
				post_data_copy.container.find(".MPLoadAllLink").each(function (index) {
					$(this)
					.attr("href", "#")
					.html(post_data.sounds.load_all_text)
					.on("click", {"post_data": post_data, "manager": self}, self.on_load_all_click);
				});
				post_data_copy.container.find(".MPLoadLinkTop").each(function (index) {
					$(this)
					.off("click")
					.on("click", {"post_data": post_data, "sound_id": parseInt($(this).attr("mp_sound_id"))}, self.on_link_top_click);
				});
			}
			else {
				// Sound data
				post_data.sounds = {
					"post_tags": [],
					"load_all_link": null,
					"load_all_text": "sounds",
					"sound_names": [],
					"loaded": false,
					"about_container": null,
					"about_count_label": null,
					"about_expand_label": null,
					"about_list_container": null,
					"about_list_container_inner": null,
					"auto_check": {
						"search_span": null,
						"search_status": null
					}
				};

				// Replace tags in post
				var sounds_found = script.settings["inline"]["sound_tags_replace"] &&
				dom_replace(
					post_data.post,
					function (tag, old_tags) { // check
						var name = tag.prop("tagName");
						if (name === undefined) return 2;
						name = name.toLowerCase();

						if (is_38) {
							if (
								(name == "span" && tag.hasClass("quote")) ||
								(name == "span" && tag.hasClass("spoiler"))
							) return 1;
						}
						else if (is_archive) {
							if (
								(name == "span" && tag.hasClass("greentext")) ||
								(name == "span" && tag.hasClass("spoiler"))
							) return 1;
						}
						else {
							if (
								(name == "span" && tag.hasClass("quote")) ||
								name == "s"
							) return 1;
						}

						return 0;
					},
					this.replace_tags
				);

				// Sounds links
				if (sounds_found) {
					post_data.post.find(".MPLoadLink").each(function (index) {
						var tag_id = post_data.sounds.post_tags.length;
						post_data.sounds.post_tags.push($(this).html());

						$(this)
						.attr("href", "#")
						.attr("mp_tag_id", tag_id)
						.on("click", {"post_data": post_data, "tag_id": tag_id, "manager": self}, self.on_sound_tag_click);
					});
				}

				// Load all
				if (script.settings["inline"]["sound_source"]) {
					if (xch) {
						var file_size_label;
						file_size_label = post_data.container.find(".xch.post_file_info_extra_links")
						file_size_label.append(
							(post_data.sounds.load_all_link = E("a")).addClass("MPLoadAllLink xch post_file_info_extra_link")
						);
					}
					else if (is_38) {
						var file_size_label;
						if (post_data.container.hasClass("op")) {
							file_size_label = post_data.container.parent().find(".fileinfo:nth-of-type(1) .unimportant");
						}
						else {
							file_size_label = post_data.container.find(".fileinfo .unimportant");
						}
						file_size_label = $(file_size_label[0]);
						file_size_label.after((post_data.sounds.load_all_link = E("a")).addClass("MPLoadAllLink"));
						file_size_label.after(T(" "));
					}
					else if (is_archive) {
						var file_size_label = post_data.container.find(".post_file_controls").find("a");
						file_size_label = $(file_size_label[0]);
						file_size_label.before((post_data.sounds.load_all_link = E("a")).addClass("MPLoadAllLink btnr parent"));
					}
					else {
						var file_size_label = post_data.container.find(".fileText");
						file_size_label.after((post_data.sounds.load_all_link = E("a")).addClass("MPLoadAllLink"));
						file_size_label.after(T(" "));
					}
					post_data.sounds.load_all_link
					.attr("href", "#")
					.html(post_data.sounds.load_all_text)
					.on("click", {"post_data": post_data, "manager": self}, self.on_load_all_click)
					.after(
						(post_data.sounds.auto_check.search_span = E("span"))
						.addClass("MPImageSearchingTextContainer")
						.css("display", (sound_auto_checker.enabled ? "" :"none"))
						.html("...")
						.append(
							(post_data.sounds.auto_check.search_status = E("span"))
							.addClass("MPImageSearchingText")
						)
					);
				}

				// Status
				post_data.post
				.before(
					(post_data.sounds.about_container = E("div"))
					.addClass("MPSoundsAbout")
					.css("display", "none")
					.append(
						E("div")
						.append(
							(post_data.sounds.about_count_label = E("span"))
						)
						.append(
							(post_data.sounds.about_expand_label = E("span"))
						)
					)
					.append(
						(post_data.sounds.about_list_container = E("div"))
					)
				);



				// Queue
				if (script.settings["inline"]["sound_thread_control"]) {
					sound_auto_loader.add_to_queue(post_data);
					sound_auto_checker.add_to_queue(post_data);
				}
			}
		}
	},
	parse_post_for_urls: function (post_data, redo, post_data_copy) {
		var self = this;
		if (redo) {
			// Fix the link's click events
			post_data_copy.post.find(".MPReplacedURL").each(function (index) {
				var href = $(this).attr("mp_original_url") || null;
				var media_type = $(this).attr("mp_media_type") || null;
				var media_id = $(this).attr("mp_media_id") || null;
				var media_cache = $(this).attr("mp_media_cache") || null;
				if (media_cache) media_cache = JSON.parse(media_cache);

				$(this)
				.off("click")
				.on("click", {"post_data": post_data, "media_type": media_type, "media_id": media_id, "media_cache": media_cache, "url": href}, self.on_url_click);

				if (media_type !== null) {
					// Preview
					if (script.settings["inline"]["video_preview"]) {
						var hover_data = {};
						$(this)
						.on("mouseover", hover_data, self.on_video_url_mouseover)
						.on("mouseout", hover_data, self.on_video_url_mouseout);
					}
				}
			});
		}
		else {
			// Hijack links
			var links_found = false;
			if (script.settings["inline"]["url_hijack"]) {
				post_data.post.find("a").each(function (index) {
					var href = html_to_text(string_remove_tags($(this).html()));
					if (href == $(this).attr("href")) {
						$(this).addClass("MPReplacedURL");
						links_found = true;
					}
					else if ($(this).hasClass("youtubeTitle")) {
						// Hijack from 4chan x
						href = $(this).attr("href");

						var embed_link = $(this).next();
						$(this).before(
							E("a")
							.addClass("MPReplacedURL")
							.attr("href", href)
							.html(href)
						);
						if (script.settings["inline"]["url_hijack_remove"]) {
							if (embed_link.hasClass("embed")) {
								embed_link.remove();
							}
							$(this).remove();
						}
						else {
							if (embed_link.hasClass("embed")) {
								embed_link.css("vertical-align", "middle");
							}
							$(this).addClass("MPHidden");
						}
						links_found = true;
					}
				});
			}

			// Text replace
			var links_found = dom_replace(
				post_data.post,
				function (tag, old_tags) { // check
					var name = tag.prop("tagName");
					if (name === undefined) return 2;
					name = name.toLowerCase();

					if (is_38) {
						if (
							(name == "span" && tag.hasClass("quote")) ||
							(name == "span" && tag.hasClass("spoiler"))
						) return 1;
					}
					else if (is_archive) {
						if (
							(name == "span" && tag.hasClass("greentext")) ||
							(name == "span" && tag.hasClass("spoiler"))
						) return 1;
					}
					else {
						if (
							(name == "span" && tag.hasClass("quote")) ||
							(name == "s")
						) return (script.settings["inline"]["url_replace_smart"] ? 2 : 1);
						if (name == "wbr") return 2;
					}

					return 0;
				},
				this.replace_urls
			) || links_found;

			if (links_found) {
				// Sounds links
				post_data.post.find(".MPReplacedURL").each(function (index) {
					// Wrap
					var temp = E("span").addClass("MPReplacedURLContainer");
					$(this).after(temp);
					temp.append($(this));

					// Link URL
					var href = html_to_text(string_remove_tags($(this).html())).replace(/\s/g, "");
					if (href.indexOf(":") < 0) href = "//" + href;

					// Video settings
					var media_type = null;
					var media_id = null;
					var media_not_found = "Video not found";
					var icon_class = "";
					var api_url = "";
					var temp_prefix = "";
					var response_parse = null;
					var inline_preview = true;
					var media_cache_keys = null;

					if (script.settings["inline"]["url_replace_media_links"]) {
						// Video check
						if ((media_id = MediaPlayer.prototype.url_get_youtube_video_id(href)) !== null) {
							// Youtube
							media_type = "youtube";
							temp_prefix = "Youtube: ";
							icon_class = "MPURLIconYoutube";
							api_url = "//gdata.youtube.com/feeds/api/videos/" + media_id;
							response_parse = self.parse_response_youtube;
							media_cache_keys = [ "title" , "duration" ];
						}
						else if ((media_id = MediaPlayer.prototype.url_get_vimeo_video_id(href)) !== null) {
							// Vimeo
							media_type = "vimeo";
							temp_prefix = "Vimeo: ";
							icon_class = "MPURLIconVimeo";
							api_url = "//vimeo.com/api/v2/video/" + media_id + ".xml";
							response_parse = self.parse_response_vimeo;
							media_cache_keys = [ "title" , "duration" ];
						}
						else if ((media_id = MediaPlayer.prototype.url_get_soundcloud_info(href)) !== null) {
							// Vimeo
							media_type = "soundcloud";
							temp_prefix = "Soundcloud: ";
							icon_class = "MPURLIconSoundcloud";
							api_url = "//soundcloud.com/oembed?format=json&iframe=true&show_comments=false&show_artwork=false&show_user=false&show_playcount=false&sharing=false&download=false&liking=false&buying=false&url=" + href;
							response_parse = self.parse_response_soundcloud;
							media_not_found = "Sound not found";
							inline_preview = false;
							media_cache_keys = [ "title" , "embed_code" ];
						}

						// Is a video url
						if (media_type !== null) {
							$(this)
							.attr("mp_media_type", media_type)
							.attr("mp_media_id", media_id)
							.html(
								$(document.createElement("div")).addClass("MPURLIcon " + icon_class)
							)
							.append(
								E("span").addClass("MPIconedURLText").html(temp_prefix + media_id)
							);

							// API query
							var callback_count = 0;
							var callback_count_max = 3;
							var callback_multiple_wait = 15000;
							var ajax_call = null;
							var callback = function (okay, data, response) {
								if (okay) {
									// Get XML variables
									var results = self.parse_response_init();
									response_parse(response, results);

									var media_cache = {};
									for (var i = 0; i < media_cache_keys.length; ++i) {
										media_cache[media_cache_keys[i]] = results[media_cache_keys[i]];
									}

									// Update link's text and click event
									data.link.find(".MPIconedURLText")
									.removeClass("MPIconedURLTextNotFound")
									.html(results.title);
									data.link
									.attr("mp_media_cache", JSON.stringify(media_cache))
									.off("click")
									.on("click", {
										"post_data": post_data,
										"media_type": media_type,
										"media_id": media_id,
										"media_cache": media_cache,
										"url": href
									}, self.on_url_click);

									// Preview
									if (script.settings["inline"]["video_preview"] && inline_preview) {
										results.start = /[\!\#\?\&]t=[0-9smh]+/.exec(href);
										results.start = (results.start ? MediaPlayer.prototype.youtube_time_to_number(results.start[0].substr(3, results.start[0].length - 3)) : 0.0);

										var hover_data = {};
										data.link
										.after(
											self.attributeify(
												E("span").addClass("MPVideoInfo"),
												results
											)
										)
										.on("mouseover", hover_data, self.on_video_url_mouseover)
										.on("mouseout", hover_data, self.on_video_url_mouseout);
									}
								}
								else {
									// Queue again
									if (response.status == 403 && ++callback_count < callback_count_max) {
										setTimeout(ajax_call, callback_multiple_wait * callback_count);
									}

									// Not found
									data.link.find(".MPIconedURLText")
									.addClass("MPIconedURLTextNotFound")
									.html(temp_prefix + media_not_found);
								}
							};
							var newself = $(this);
							ajax_call = function () {
								ajax_get(
									api_url,
									true,
									{"link": newself},
									null,
									callback
								);
							};
							ajax_call();
						}
					}

					// Set link settings
					$(this)
					.attr("href", href)
					.attr("target", "_blank")
					.attr("mp_original_url", href)
					.on("click", {"post_data": post_data, "media_type": media_type, "media_id": media_id, "media_cache": null, "url": href}, self.on_url_click);
				});
			}
		}
	},

	parse_response_init: function () {
		return {
			title: "Unknown Title",
			description: "",
			duration: 0.0,
			thumbnails: [],
			views: 0,
			rating: 1.0,
			raters: 0,
			embed_code: null,
		};
	},
	parse_response_youtube: function (xml, results) {
		xml = $.parseXML(xml);

		var elem = xml_find_nodes_by_name(xml, "yt:duration");
		if (elem.length > 0) {
			results.duration = elem[0].getAttribute("seconds");
			results.duration = parseFloat(results.duration);
			results.duration = (isFinite(results.duration) ? results.duration : 0.0);
		}

		elem = xml_find_nodes_by_name(xml, "title");
		if (elem.length > 0) {
			results.title = text_to_html($(elem[0]).text());
		}

		elem = xml_find_nodes_by_name(xml, "content");
		if (elem.length > 0) {
			results.description = text_to_html($(elem[0]).text());
		}

		elem = xml_find_nodes_by_name(xml, "media:thumbnail");
		for (var i = 0; i < elem.length; ++i) {
			results.thumbnails.push({
				"url": elem[i].getAttribute("url"),
				"width": parseInt(elem[i].getAttribute("width")),
				"height": parseInt(elem[i].getAttribute("height"))
			});
		}

		elem = xml_find_nodes_by_name(xml, "yt:statistics");
		if (elem.length > 0) {
			results.views = parseInt(elem[0].getAttribute("viewCount"));
		}

		elem = xml_find_nodes_by_name(xml, "gd:rating");
		if (elem.length > 0) {
			var m = parseFloat(elem[0].getAttribute("min"));
			results.raters = parseInt(elem[0].getAttribute("numRaters")) || 0;
			results.rating = ((parseFloat(elem[0].getAttribute("average")) - m) / (elem[0].getAttribute("max") - m)) || 0;
		}
	},
	parse_response_vimeo: function (xml, results) {
		xml = $.parseXML(xml);

		var elem = xml_find_nodes_by_name(xml, "duration");
		if (elem.length > 0) {
			results.duration = $(elem[0]).text();
			results.duration = parseFloat(results.duration);
			results.duration = isFinite(results.duration) ? results.duration : 0.0;
		}

		elem = xml_find_nodes_by_name(xml, "title");
		if (elem.length > 0) {
			results.title = text_to_html($(elem[0]).text());
		}

		elem = xml_find_nodes_by_name(xml, "description");
		if (elem.length > 0) {
			results.description = text_to_html($(elem[0]).text().replace(/\<br\s*\/?\>/g, "\n"));
		}

		var w = xml_find_nodes_by_name(xml, "width");
		var h = xml_find_nodes_by_name(xml, "height");
		w = (w.length > 0 ? parseInt($(w[0]).text()) : 1);
		h = (h.length > 0 ? parseInt($(h[0]).text()) : 1);
		elem = xml_find_nodes_by_name(xml, "thumbnail_large");
		if (elem.length > 0) {
			results.thumbnails.push({
				"url": $(elem[0]).text(),
				"width": w,
				"height": h
			});
		}

		elem = xml_find_nodes_by_name(xml, "stats_number_of_plays");
		if (elem.length > 0) {
			results.views = parseInt($(elem[0]).text());
		}
	},
	parse_response_soundcloud: function (json, results) {
		json = JSON.parse(json);

		results.title = json.title;
		var match = " by " + json.author_name;
		if (
			json.author_name.length > 0 &&
			results.title.length > match.length &&
			results.title.substr(results.title.length - match.length, match.length) == match
		) {
			results.title = results.title.substr(0, results.title.length - match.length);
		}
		results.title = text_to_html(results.title);
		if ("description" in json && json.description) results.description = text_to_html(json.description.replace(/\r\n/g, "\n"));

		results.thumbnails.push({
			"url": json.thumbnail_url,
			"width": 130,
			"height": 130
		});

		results.embed_code = json.html;
	},

	attributeify: function (element, attributes, prefix) {
		prefix = prefix || "";

		for (var key in attributes) {
			element.attr(key, JSON.stringify(attributes[key]));
		}

		return element;
	},
	commaify_number: function (number) {
		return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	},

	update_about_image: function (post_data) {
		// Show container
		post_data.sounds.about_container.css("display", "");
		var sound_count = 0;
		var file_count = post_data.sounds.sound_names.length;

		// Create a list of sounds (and files)
		var display_count = 0;
		var container, container_outer;
		post_data.sounds.about_list_container.html(
			(container_outer = E("div"))
			.append(
				container = E("ol")
			)
		);
		post_data.sounds.about_expand_label.html("");
		for (var sound = true; ; sound = false) {
			for (var i = 0; i < post_data.sounds.sound_names.length; ++i) {
				var is_sound = (post_data.sounds.sound_names[i].split(".").pop().toLowerCase() == "ogg");
				if (sound == is_sound) {
					// Only display 2 without expansion
					if (display_count++ == 2 && file_count > 3) {
						var label = "and " + (file_count - 2) + " more not displayed...";
						var hide = "hide " + (file_count - 2) + " files";

						// New list container
						post_data.sounds.about_list_container.append(
							(container_outer = E("div"))
							.append(
								(container = post_data.sounds.about_list_container_inner = E("ol"))
								.attr("start", display_count.toString())
							)
							.css("display", "none")
						);

						// Toggler
						post_data.sounds.about_expand_label
						.append(T(", "))
						.append(
							E("a")
							.attr("href", "#")
							.css("font-style", "italic")
							.html(label)
							.on(
								"click", {"container": container_outer, "label": label, "hide": hide}, function (event) {
									if (event.data.container.css("display") == "none") {
										event.data.container.css("display", "");
										$(this).html(event.data.hide);
									}
									else {
										event.data.container.css("display", "none");
										$(this).html(event.data.label);
									}
									return false;
								}
							)
						);
					}

					// Append to list
					if (sound) {
						++sound_count;

						container.append(
							E("li")
							.append(
								E("a")
								.attr("href", "#")
								.attr("mp_sound_id", i.toString())
								.addClass("MPLoadLinkTop")
								.html(text_to_html(post_data.sounds.sound_names[i].substr(0, post_data.sounds.sound_names[i].length - 4))) // remove extension
								.on("click", {"post_data": post_data, "sound_id": i}, this.on_link_top_click)
							)
						);
					}
					else {
						container.append(
							E("li")
							.append(
								E("span")
								.addClass("MPLoadLinkTopFile")
								.html(text_to_html(post_data.sounds.sound_names[i]))
							)
						);
					}
				}
			}

			// Done
			if (!sound) break;
		}

		// Found string
		var str = "";
		if (sound_count > 0) {
			str += sound_count + " sound" + (sound_count == 1 ? "" : "s") + " found";
		}
		if (file_count > sound_count) {
			str += (str.length == 0 ? "" : " of ") + file_count + " file" + (file_count == 1 ? "" : "s");
		}

		post_data.sounds.about_count_label.html(str);
	},
	activate_load_all_link: function (link, post_data, done_callback) {
		// Change status
		link = link || post_data.sounds.load_all_link;
		var load_str = "loading";
		if (link) link.html(load_str);

		// Load sound
		var self = this;
		post_data.sounds.loaded = true;
		media_player_manager.open_player(true);
		media_player_manager.media_player.queue_load(
			post_data.image_url,
			MediaPlayer.ALL_SOUNDS,
			{ "image_name": post_data.image_name },
			{
				"link": link,
				"post_data": post_data,
				"load_str": load_str
			},
			function (event, data) {
				var progress = Math.floor((event.loaded / event.total) * 100);
				if (data.link) data.link.html(data.load_str + " (" + progress + ")");
			},
			function (okay, data, response) {
				if (data.link) data.link.html(data.post_data.sounds.load_all_text);
				if (!okay) {
					if (data.link) {
						data.link
						.append(" (")
						.append(
							E("a")
							.attr("href", "#")
							.html("ajax&nbsp;error")
							.on("click", function (event) {
								if (event.which == 1) {
									response.url = post_data.image_url;
									inline_manager.display_info("ajax error", response);
									return false;
								}
								return true;
							})
						)
						.append(")");
					}
					if (typeof(done_callback) == "function") done_callback(false, data.post_data);
				}
			},
			function (status, data, all_files) {
				if (all_files !== null && data.post_data.sounds.sound_names.length == 0 && all_files.length > 0) {
					data.post_data.sounds.sound_names = all_files;
					self.update_about_image(data.post_data);
				}
				if (typeof(done_callback) == "function") done_callback(false, data.post_data);
			}
		);

		// Done
		return false;
	},
	replace_urls: function (tags) {
		var full_text = "";
		var in_url = false;
		var any_found = false;
		var length_add;
		var link_str = [ "<a class=\"MPReplacedURL\">" , "</a>" ];

		for (var i = 0; i < tags.length; ++i) {
			if (tags[i].prop("tagName") === undefined) {
				var text = text_to_html(tags[i].text());
				var start = 0;
				// Previous URL
				if (in_url) {
					in_url = false;
					text = text.replace(/^(?:[^\s]*)/im, function (match, offset) {
						in_url = (text.length == offset + match.length);
						return match + (in_url ? "" : link_str[1]);
					});
				}
				// New URLs
				if (!in_url) {
					length_add = 0;
					text = text.replace(/(?:(?:\w+):\/\/|www\.)(?:[^\s]+)/im, function (match, offset) {
						// Interesting note: If all groups have the prefix of "?:", then the callback parameter
						// order is "match, offset, groups". If you remove one of the "?:" (say the first one)
						// then the order is changed to "match, groups, offset". (in Nightly)
						any_found = true;
						in_url = (offset + match.length == text.length + length_add);
						length_add += (link_str[0].length + (in_url ? 0 : link_str[1].length));
						return link_str[0] + match + (in_url ? "" : link_str[1]);
					});
				}

				// Update
				full_text += text;
			}
			else {
				/*if (script.settings["inline"]["url_replace_smart"]&&0) {
					// TODO : do this later rather than using an assumption
				}
				else {*/
				full_text += $("<div>").append(tags[i].clone()).html();
				// }
			}
		}

		if (in_url) {
			in_url = false;
			full_text += link_str[1];
		}

		// DOM update
		if (any_found) {
			tags[0].before(full_text);
			for (var i = 0; i < tags.length; ++i) tags[i].remove();
		}

		return any_found;
	},
	replace_tags: function (tags) {
		var sounds_found = false;
		var new_text = text_to_html(tags[0].text()).replace(/\[.+?\]/g, function (match) {
			sounds_found = true;
			return "[<a class=\"MPLoadLink\">" + match.substr(1, match.length - 2) + "</a>]";
		});
		if (sounds_found) {
			if (tags[0].prop("tagName")) {
				tags[0].html(new_text);
			}
			else {
				tags[0].after(new_text).remove();
			}
			return true;
		}
		return false;
	},

	enable_update: function (url) {
		this.settings_manager.settings_update_link
		.css("display", "")
		.attr("href", url);
		if (!is_archive && !is_38) {
			$(".MPNavLink").addClass("quotelink");
		}
	},

	position_relative: function (parent, obj, offset, flippable) {
		offset = offset || [ 0 , 0 ];
		flippable = flippable || [ true , true ];
		var scroll = [ $(document).scrollLeft() , $(document).scrollTop() ];
		var win_size = [ $(window).width() , $(window).height() ];
		var obj_size = [ obj.outerWidth() , obj.outerHeight() ];
		var par_size = [ parent.width() , parent.height() ];
		var off = parent.offset();
		var pos = [0,0], pos_label = ["left","top"], pos2;
		var ret = [ true , true ];
		off = [off.left,off.top];

		// Top alignment
		if (
			(pos[1] = off[1] + offset[1] + par_size[1]) + obj_size[1] - scroll[1] > win_size[1] &&
			(pos2 = off[1] - offset[1] - obj_size[1]) > scroll[1] &&
			flippable[1]
		) {
			pos[1] = pos2;
			ret[1] = false;
		}

		// Left alignment
		if (
			(pos[0] = (off[0] + offset[0])) + obj_size[0] / 2 > win_size[0] / 2 &&
			flippable[0]
		) {
			obj.css("left", "auto");
			pos_label[0] = "right";
			pos[0] = win_size[0] - (off[0] + par_size[0]);
			ret[0] = false;
		}

		obj.css(pos_label[0], pos[0] + "px");
		obj.css(pos_label[1], pos[1] + "px");

		return ret;
	},

	on_content_drag: function (data) {
		var url_lower = data.text.split("#")[0];
		if (url_lower.substr(0, 2) == "//") url_lower = window.location.protocol + url_lower;
		else if (url_lower.indexOf(":") < 0) url_lower = window.location.protocol + "//" + url_lower;

		if (url_lower) {
			for (var post_id in thread_manager.posts) {
				if (thread_manager.posts[post_id].image_url) {
					var u = thread_manager.posts[post_id].image_url.split("#")[0];
					if (u.substr(0, 2) == "//") u = window.location.protocol + u;
					else if (u.indexOf(":") < 0) u = window.location.protocol + "//" + u;

					if (url_lower == u) {
						// Found; activate manual load
						this.activate_load_all_link(null, thread_manager.posts[post_id]);
						data.text = "";
						return false;
					}
				}
			}
		}
		return true;
	},
	on_url_click: function (event) {
		// Add to playlist
		if (event.which == 1) {
			if (event.data.media_type && script.settings["inline"]["url_media_links_open_in_player"]) {
				// Theatre-view activation
				var n = "link_click_theatre_" + event.data.media_type;
				var skip_to = (media_player_manager.media_player !== null && script.settings["inline"]["link_click_theatre_force_start"]);
				var tv_activate = (
					n in script.settings["inline"] &&
					script.settings["inline"][n] === true
				);

				// Theatre-view
				var tv_enable = function () {
					media_player_manager.media_player.theatre_enter({
						duration: script.settings["inline"]["link_click_theatre_animate"],
						no_info: !script.settings["inline"]["link_click_theatre_info"],
						info_text: (script.settings["inline"]["link_click_theatre_info"] && script.settings["inline"]["link_click_theatre_how_to"] ? "(more options in Global settings) " : ""),
						close_on_finish: script.settings["inline"]["link_click_theatre_close_on_finish"],
						close_on_finish_interference: script.settings["inline"]["link_click_theatre_close_on_finish_interference"],
					});
					// Disable this
					if (script.settings["inline"]["link_click_theatre_how_to"]) {
						script.settings["inline"]["link_click_theatre_how_to"] = false;
						script.settings_save();
						script.settings_update();
					}
				};

				// Open
				media_player_manager.open_player(true);

				// Custom
				var fn = media_player_manager.media_player.queue_load;

				// Generic
				var pl_data = {};
				if (event.data.media_cache) pl_data.media_cache = event.data.media_cache;
				fn.call(
					media_player_manager.media_player,
					event.data.url,
					null,
					pl_data,
					{ "post_data": event.data.post_data, "link": $(this) },
					function (event, data) {
					},
					function (okay, data) {
					},
					function (status, data, xml_info) {
						if (status >= 0 && tv_activate) {
							if (skip_to) {
								// Skip to this one
								media_player_manager.media_player.start(status);
							}
							if (media_player_manager.media_player.playlist_current() == status) {
								tv_enable();
							}
						}
					}
				);
				return false;
			}
			return (script.settings["inline"]["url_left_click_open"]);
		}
		return true;
	},
	on_sound_tag_click: function (event) {
		// Change status
		var load_str = "loading...";
		$(this).html(load_str);

		// Load sound
		var self = event.data.manager;
		event.data.post_data.sounds.loaded = true;
		media_player_manager.open_player(true);
		media_player_manager.media_player.queue_load(
			event.data.post_data.image_url,
			event.data.post_data.sounds.post_tags[event.data.tag_id],
			{ "image_name": event.data.post_data.image_name },
			{
				"object": $(this),
				"post_data": event.data.post_data,
				"tag_id": event.data.tag_id,
				"load_str": load_str
			},
			function (event, data) {
				var progress = Math.floor((event.loaded / event.total) * 100);
				data.object.html(data.load_str + " (" + progress + ")");
			},
			function (okay, data, response) {
				data.object.html(data.post_data.sounds.post_tags[data.tag_id]);
				if (!okay) {
					data.object
					.append(" (")
					.append(
						E("a")
						.attr("href", "#")
						.html("ajax&nbsp;error")
						.on("click", function (event) {
							if (event.which == 1) {
								response.url = data.post_data.image_url;
								inline_manager.display_info("ajax error", response);
								return false;
							}
							return true;
						})
					)
					.append(")");
				}
			},
			function (status, data, all_files) {
				if (all_files !== null && data.post_data.sounds.sound_names.length == 0 && all_files.length > 0) {
					data.post_data.sounds.sound_names = all_files;
					self.update_about_image(data.post_data);
				}
			}
		);

		// Done
		return false;
	},
	on_link_top_click: function (event) {
		// Change status
		var load_str = "loading...";
		$(this).html(load_str);

		var tag = event.data.post_data.sounds.sound_names[event.data.sound_id];
		if (tag.substr(tag.length - 4, 4).toLowerCase() == ".ogg") {
			tag = tag.substr(0, tag.length - 4);
		}

		// Load sound
		var self = this;
		event.data.post_data.sounds.loaded = true;
		media_player_manager.open_player(true);
		media_player_manager.media_player.queue_load(
			event.data.post_data.image_url,
			tag,
			{ "image_name": event.data.post_data.image_name },
			{
				"object": $(this),
				"post_data": event.data.post_data,
				"sound_id": event.data.sound_id,
				"load_str": load_str,
				"tag": tag
			},
			function (event, data) {
				var progress = Math.floor((event.loaded / event.total) * 100);
				data.object.html(data.load_str + " (" + progress + ")");
			},
			function (okay, data) {
				data.object.html(data.tag + (okay ? "" : " (ajax&nbsp;error)"));
			},
			function (status, data, all_files) {
				if (all_files !== null && data.post_data.sounds.sound_names.length == 0 && all_files.length > 0) {
					data.post_data.sounds.sound_names = all_files;
					self.update_about_image(data.post_data);
				}
			}
		);

		// Done
		return false;
	},
	on_load_all_click: function (event) {
		event.data.manager.activate_load_all_link($(this), event.data.post_data);

		// Done
		return false;
	},
	on_detect_all_in_thread_click: function (event) {
		if (event.which == 1) {
			if (sound_auto_checker.enabled) {
				sound_auto_checker.disable();
			}
			else {
				sound_auto_checker.enable();
			}
			return false;
		}
		return true;
	},
	on_load_all_in_thread_click: function (event) {
		if (event.which == 1) {
			if (sound_auto_loader.enabled) {
				sound_auto_loader.disable();
			}
			else {
				sound_auto_loader.enable();
			}
			return false;
		}
		return true;
	},

	on_menu_link_click: function (link, event) {
		if (event.which == 1) {
			// Position
			this.settings_manager.menu_open(link.parent());
			// Done
			return false;
		}
		return true;
	},

	on_video_url_descr_open_timeout: function (event) {
		event.data.description_timeout = null;

		var desc = event.data.display_container.find(".MPVideoInfoDisplayDescription");

		if (script.settings["inline"]["video_preview_animate_description"] > 0) {
			desc.animate({
				"width": script.settings["inline"]["video_preview_image_space"]
			},{
				duration: script.settings["inline"]["video_preview_animate_description"] * 1000,
			});
		}
		else {
			desc.css("width", script.settings["inline"]["video_preview_image_space"] + "px");
		}
	},
	on_video_url_timeout: function (event) {
		event.data.timeout = null;

		// Generate
		if (!event.data.display_container) {
			// Create
			var container;
			var max_size = script.settings["inline"]["video_preview_image_space"];
			$("body").append(
				(event.data.display_container = E("div"))
				.css("opacity", "0")
				.addClass("MPVideoInfoDisplay MPHighlightShadow2px")
				.addClass(xch ? "xch reply post" : (is_archive ? "post_wrapper" : "reply post"))
				.append(
					(container = E("div"))
					.addClass("MPVideoInfoDisplayContainer")
				)
			);

			// Info
			var info;
			if (!(info = $(this).parent().find(".MPVideoInfo")).length > 0) return;

			// Duration
			var c, value = parseInt(info.attr("duration")) || 0;
			container.append(
				(c = E("div"))
				.addClass("MPVideoInfoDisplayTitle")
				.html("Duration: " + MediaPlayer.prototype.duration_to_string(value))
			);

			// Start time
			value = parseInt(info.attr("start")) || 0;
			if (value > 0) {
				c.append(
					E("span")
					.addClass("MPVideoInfoDisplayTitleStart")
					.html(" @" + MediaPlayer.prototype.duration_to_string(value))
				);
			}

			// View count
			value = parseInt(info.attr("views"));
			c.prepend(
				E("div")
				.addClass("MPVideoInfoDisplayTitleViews")
				.html(
					InlineManager.prototype.commaify_number(value) + " view" + (value === 1 ? "" : "s")
				)
			)
			.append(E("div").addClass("MPVideoInfoDisplayTitleEnd"));

			// Content
			var content_container, preview_container;
			container.append(
				(content_container = E("div"))
				.addClass("MPVideoInfoDisplayContent")
				.append(
					(preview_container = E("div"))
					.addClass("MPVideoInfoDisplayPreview")
				)
			);

			// Rating
			var raters = parseInt(info.attr("raters")) || 0;
			var ex_class = "";
			if (raters > 0) {
				preview_container.append(
					E("div")
					.addClass("MPVideoInfoDisplayRatingBg")
					.append(
						E("div")
						.addClass("MPVideoInfoDisplayRatingGood")
						.css("width", ((parseFloat(info.attr("rating")) || 0) * 100) + "%")
					)
				);
			}
			else {
				ex_class = " MPVideoInfoDisplayThumbnailContainerOuterTop";
			}

			// Thumbnails
			var thumbs = JSON.parse(info.attr("thumbnails"));
			if (thumbs.length > 0) {
				// Calculate scale
				var w = thumbs[0].width;
				var h = thumbs[0].height;
				var scale = Math.min(max_size / w, max_size / h);
				w *= scale;
				h *= scale;
				var h_space = max_size - h;
				var thumb_container;
				preview_container.append(
					E("div")
					.addClass("MPVideoInfoDisplayThumbnailContainerOuter MPHighlightBorderColor" + ex_class)
					.append(
						(thumb_container = E("div"))
						.addClass("MPVideoInfoDisplayThumbnailContainer")
					)
				);
				// Output
				for (var i = 0; true; ) {
					thumb_container.append(
						E("div")
						.addClass("MPVideoInfoDisplayThumbnail" + (i == 0 ? "First" : ""))
						.css({
							"width": w + "px",
							"height": h + "px",
							"background-size": w + "px " + h + "px",
							"background-image": "url(" + thumbs[i].url + ")"
						})
					);
					if (++i >= thumbs.length) break;
					w = thumbs[i].width;
					h = thumbs[i].height;
					scale = h_space / h;
					w *= scale;
					h *= scale;
				}
			}

			// Description
			var height = content_container.outerHeight();
			var descr = JSON.parse(info.attr("description")).replace(/\n/g, "</p><p>");
			if (descr.length > 0) {
				content_container.append(
					E("div")
					.addClass("MPVideoInfoDisplayDescription")
					.css({
						"width": 0 + "px",
						"height": height + "px",
						"font-size": script.settings["inline"]["video_preview_description_font_size"] + "em",
						"line-height": "normal"
					})
					.append(
						E("div")
						.addClass("MPVideoInfoDisplayDescriptionInner")
						.css("width", max_size + "px")
						.html("<p>" + descr + "</p>")
					)
				);
			}

			// Viewable
			event.data.display_container.css("opacity", "");
		}
		// Display
		if (event.data.display_container) {
			// Description resize
			var desc = event.data.display_container.find(".MPVideoInfoDisplayDescription");
			if (desc.length > 0) {
				desc.css("width", "0px").stop(true, true);
			}

			// Animation
			event.data.display_container.stop(true);
			if (script.settings["inline"]["video_preview_animate_open"] > 0) {
				event.data.display_container
				.css("opacity", 0.0)
				.animate({
					"opacity": 1.0
				},{
					duration: script.settings["inline"]["video_preview_animate_open"] * 1000,
					complete: function () { $(this).css("opacity", ""); }
				});
			}
			else {
				event.data.display_container.css("opacity", "");
			}
			event.data.display_container.removeClass("MPVideoInfoDisplayHidden");

			// Description
			if (desc.length > 0 && script.settings["inline"]["video_preview_description_timeout"] >= 0) {
				var self = this;
				event.data.description_timeout = setTimeout(function () {
					InlineManager.prototype.on_video_url_descr_open_timeout.call(self, event);
				}, script.settings["inline"]["video_preview_description_timeout"] * 1000);
			}

			InlineManager.prototype.position_relative($(this), event.data.display_container, [ 0 , 2 ]);
		}
	},
	on_video_url_mouseover: function (event) {
		if (script.settings["inline"]["video_preview"]) {
			var self = this;
			if (!event.data.timeout && event.data.timeout !== 0) {
				event.data.timeout = setTimeout(function () {
					InlineManager.prototype.on_video_url_timeout.call(self, event);
				}, script.settings["inline"]["video_preview_timeout"] * 1000);
			}
		}
	},
	on_video_url_mouseout: function (event) {
		if (event.data.timeout || event.data.timeout === 0) {
			clearTimeout(event.data.timeout);
			event.data.timeout = null;
		}
		if (event.data.description_timeout || event.data.description_timeout === 0) {
			clearTimeout(event.data.description_timeout);
			event.data.description_timeout = null;
		}
		if (event.data.display_container) {
			event.data.display_container.stop(true);
			if (script.settings["inline"]["video_preview_animate_close"] > 0) {
				event.data.display_container
				.animate({
					"opacity": 0.0
				},{
					duration: script.settings["inline"]["video_preview_animate_close"] * 1000,
					complete: function () { $(this).css("opacity", "").addClass("MPVideoInfoDisplayHidden"); }
				});
			}
			else {
				event.data.display_container.addClass("MPVideoInfoDisplayHidden");
			}
		}
	},

	popup_close: function (forced) {
		if (forced || this.popup_easy_close) {
			this.popup_container.addClass("MPPopupClosed");
		}
	},
	display_info: function (index, data) {
		data = data || {};

		var self = this;
		this.popup_info_container.html("");
		this.popup_easy_close = ("easy_close" in data ? data.easy_close : true);
		switch (index) {
			case "help":
			{
				this.popup_info_container
				.append(
					E("p").addClass("MPPopupInfoLabel")
					.html("Userscript Information")
				)
				.append(
					E("p")
					.html(
						"4cs is able to play embedded sound files, Youtube videos, Vimeo videos, and Soundcloud media."
					)
				)
				.append(
					E("p")
					.html(
						"Once you've closed this message once, it won't appear automatically again; " +
						"it can be opened again from the [ Media Player ] link."
					)
				)
				.append(
					E("p")
					.html(
						"The link to close this message is at the "
					)
					.append(
						E("a")
						.attr("href", "#")
						.html("bottom")
						.on("click", {}, function (event) {
							if (event.which == 1) {
								var c = $(this).parent().parent();
								c.scrollTop((c[0].scrollHeight || 0) - c.outerHeight());
								return false;
							}
							return true;
						})
					)
					.append(".")
				)
				.append(
					E("p").addClass("MPPopupInfoLabel")
					.html("Media Player")
				)
				.append(
					E("p")
					.html(
						"The player itself can be moved around the screen and resized as desired."
					)
				)
				.append(
					E("p")
					.html(
						"Clicking and dragging the title bar will move the player, and hovering " +
						"near the edges of the player window will display the dragging handles for " +
						"resizing."
					)
				)
				.append(
					E("p")
					.html(
						"The image/video part can be resized by clicking and dragging on it as well."
					)
				)
				.append(
					E("p")
					.html(
						"Finally, most of the controls of the player are hidden when not in use. Hover over the left and right side of the title-bar to view the options."
					)
				)
				.append(
					E("p").addClass("MPPopupInfoLabel")
					.html("Playlist")
				)
				.append(
					E("p")
					.html(
						"Media can be added to the playlist in the following ways:<ul>" +
						"<li>Clicking on inline [tags] to load any sounds in the corresponding image</li>" +
						"<li>Clicking on any media links, denoted with an icon on the left side</li>" +
						"<li>Clicking and dragging a sounds-image onto the player from your browser</li>" +
						"<li>Clicking and dragging a sounds-image onto the player from your computer</li>" +
						"<li>Clicking and dragging a URL onto the player</li>" +
						"</ul>"
					)
				)
				.append(
					E("p")
					.html(
						"Once added to the playlist, there are several control buttons related to that specific media. " +
						"Hover over the right side of the playlist item to view them; hover a button for info about what it does."
					)
				)
				.append(
					E("p").addClass("MPPopupInfoLabel")
					.html("Settings")
				)
				.append(
					E("p")
					.html(
						"There are 2 main locations for settings:<ul>" +
						"<li>The [ Media Player ] link in the navigation section, for global settings</li>" +
						"<li>The [S] button in the player, for player-specific settings</li>" +
						"</ul>"
					)
				)
				.append(
					E("p").addClass("MPPopupInfoLabel")
					.html("Customization")
				)
				.append(
					E("p")
					.html(
						"The player's look can be customized on the player's 3 settings pages."
					)
				)
				.append(
					E("p")
					.html(
						"For simplicity, it comes with 4 default styles that you can easily change between and modify."
					)
				)
				.append(
					E("p").addClass("MPPopupInfoLabel")
					.html("Broken?")
				)
				.append(
					E("p")
					.html(
						"If you manage to break the player by messing with the settings, you can reset the player settings by "
					)
					.append(
						E("a")
						.attr("href", "#")
						.html("clicking this link")
						.on("click", {}, function (event) {
							if (event.which == 1) {
								// Regen
								var keep_open = false;
								if (media_player_manager.media_player !== null) {
									media_player_manager.media_player.destructor();
									keep_open = true;
								}
								media_player_manager.open_player(false);
								script.settings_save();
								if (!keep_open) {
									media_player_manager.media_player.destructor();
								}
								return false;
							}
							return true;
						})
					)
					.append(".")
				)
				.append(
					E("p")
					.html(
						"If your player has issues playing, you can report a bug on the "
					)
					.append(
						E("a")
						.html("script's homepage")
						.attr("href", "http://dnsev.github.io/4cs/")
						.attr("target", "_blank")
						.on("click", {}, function (event) {
							event.stopPropagation();
							return true;
						})
					)
					.append(".")
				)
				.append(
					E("p").addClass("MPPopupInfoLabel")
					.html("Done")
				)
				.append(
					E("p")
					.html(
						"Now that you (presumably) understand what's going on, click the link below to close this message."
					)
				)
				.append(
					E("p")
					.addClass("MPPopupInfoCentered MPPopupInfoBottom")
					.html(
						E("a")
						.attr("href", "#")
						.html("Close Message")
						.on("click", {}, function (event) {
							if (event.which == 1) {
								self.popup_close(true);
								script.settings["script"]["first_run"] = false;
								script.settings_save();
								return false;
							}
							return true;
						})
					)
				);
			}
			break;
			case "ajax error":
			{
				this.popup_info_container
				.append(
					E("p").addClass("MPPopupInfoLabel")
					.html("Ajax Error")
				)
				.append(
					E("p")
					.html("Ajax errors occur when your browser tries to fetch an image using Javascript, but for some reason it can't retrieve it.")
				)
				.append(
					E("p")
					.html("This might be due to the image being deleted/404'd, server issues, or some sort of browser issue.")
				)
				.append(
					E("p").addClass("MPPopupInfoLabel")
					.html("Error Info")
				)
				.append(
					E("p")
					.html("Error your browser encountered: <b>" + data.status + "</b> - " + data.status_text)
				)
				.append(
					E("p")
					.html("URL: <i>" + data.url + "</i>")
				);
			}
			break;
			case "upload error":
			{
				var s = "";
				for (var i = 0; i < data.errors.length; ++i) {
					s += (s.length == 0 ? "" : "<br />") + data.errors[i];
				}

				this.popup_info_container
				.append(
					E("p").addClass("MPPopupInfoLabel")
					.html("Upload Error")
				)
				.append(
					E("p")
					.html("An error occured while attempting to submit your post.")
				)
				.append(
					E("p")
					.html(
						"This may happen due to script incompatability. If you want to use this feature, " +
						"submit an <a href=\"https://github.com/dnsev/4cs/issues\" target=\"_blank\">issue request</a>, or disable " +
						"this feature and install a different upload script."
					)
				)
				.append(
					E("p")
					.html("You can try to submit your post by closing the sounds panel.")
				)
				.append(
					E("p").addClass("MPPopupInfoLabel")
					.html("Errors")
				)
				.append(
					E("p")
					.html(s)
				);
			}
			break;
			case "upload help":
			{
				this.popup_info_container
				.append(
					E("p").addClass("MPPopupInfoLabel")
					.html("Uploader Information")
				)
				.append(
					E("p")
					.html(
						"The sound uploader is able to put sounds inside of images, along with re-tagging " +
						"and/or removing sounds from currently embedded images. It also supports masking images " +
						"in the correct format."
					)
				)
				.append(
					E("p").addClass("MPPopupInfoLabel")
					.html("Basic Features")
				)
				.append(
					E("p")
					.html(
						"<ul>" +
						"<li>Currently only uses the masked format, as the stego format isn't widely used. This will be added " +
						"if necessary or desired.</li>" +
						"<li>You can re-tag any (non-stego) sound inside an image on the fly. This is particularly useful " +
						"for all the images with the [1] tag.</li>" +
						"<li>You can add sounds to your image from other images with embedded sounds by selecting them from the " +
						"sound file selection.</li>" +
						"</ol>"
					)
				)
				.append(
					E("p").addClass("MPPopupInfoLabel")
					.html("Settings")
				)
				.append(
					E("p")
					.html(
						"If there are any settings you dislike, or you don't want the sound uploader enabled at all, " +
						"just about any feature you may or may not want can be enabled/disabled in the settings."
					)
				)
				.append(
					E("p")
					.html(
						"If you have any other sound uploader(s) enabled and you want to use this uploader, it is " +
						"suggested that you turn the other one(s) off."
					)
				)
				.append(
					E("p").addClass("MPPopupInfoLabel")
					.html("Availability")
				)
				.append(
					E("p")
					.html(
						"The sound uploader is currently only available in the quick reply forms. The main reply form " +
						"at the top of the page does not currently support it. If this feature is desired, " +
						"<a href=\"https://github.com/dnsev/4cs/issues\" target=\"_blank\">open a feature request</a> on " +
						"the source site."
					)
				)
				.append(
					E("p").addClass("MPPopupInfoLabel")
					.html("Having Problems?")
				)
				.append(
					E("p")
					.html(
						"If you have problems such as \"<i>Where is my submit button?</i>\", \"<i>Clicking the boxes doesn't let me select files</i>\", " +
						"or \"<i>Why can't I submit my post?</i>\", you may want to <a href=\"https://github.com/dnsev/4cs/issues\" target=\"_blank\">open an issue</a> " +
						"on the source site."
					)
				)
				.append(
					E("p")
					.html(
						"Problems like this occur because it's difficult to add compatability for every browser + " +
						"userscript combination out there; and that's not even including the ways users might customize " +
						"the userscripts themselves."
					)
				)
			}
			break;
			case "uploader blocked":
			{
				this.popup_info_container
				.append(
					E("p").addClass("MPPopupInfoLabel")
					.html("Uploader Blocked")
				)
				.append(
					E("p")
					.html(
						"If you get this message while trying to add a file to the uploader, this means that you have another " +
						"userscript which tries to upload sounds enabled."
					)
				)
				.append(
					E("p")
					.html(
						"This message shouldn't affect uploading."
					)
				)
				.append(
					E("p").addClass("MPPopupInfoLabel")
					.html("Removing This Message")
				)
				.append(
					E("p")
					.html(
						"To make this message no longer appear, you have two options:<ul>" +
						"<li>Disable the other userscript in your browser</li>" +
						"<li>Disable the integrated uploader in the [ Media Player ] settings link</li>"
					)
				)
				.append(
					E("p")
					.html(
						"It is advised to do at least one of the above, as keeping them both enabled can slow down " +
						"your browser."
					)
				);
			}
			break;
		}
		this.popup_container.removeClass("MPPopupClosed");
		this.popup_info_container.scrollTop(0);
	},
};
var inline_manager = null;



///////////////////////////////////////////////////////////////////////////////
// Auto-loading images
///////////////////////////////////////////////////////////////////////////////
function SoundAutoLoader() {
	this.looping = false;
	this.timer = null;
	this.delay = 1;
	this.queue = new Array();
	this.serial = true;
	this.enabled = false;

	this.link = null;
}
SoundAutoLoader.prototype = {
	constructor: SoundAutoLoader,
	add_to_queue: function (post_data) {
		// Set to loaded
		post_data.loaded = true;

		// Add to queue
		this.queue.push(post_data);
		this.loop();
	},
	enable: function () {
		if (!this.enabled) {
			for (var i = 0; i < this.queue.length; ++i) {
				this.queue[i].sounds.auto_check.search_span.css("display", "");
			}

			this.link.removeAttr("href");
			this.link.html("Loading All Sounds");

			this.enabled = true;
			this.loop();
		}
	},
	disable: function () {
		if (this.enabled) {
			for (var i = 0; i < this.queue.length; ++i) {
				this.queue[i].sounds.auto_check.search_span.css("display", "none");
			}

			this.link.attr("href", "#");
			this.link.html("Load All Sounds");

			this.enabled = false;
			this.looping = false;
			if (this.timer != null) {
				clearTimeout(this.timer);
				this.timer = null;
			}
		}
	},
	loop: function () {
		if (!this.enabled || this.looping) return;

		this.looping = true;
		this.loop_next();
	},
	loop_next: function () {
		if (!this.enabled) return;

		this.looping = (this.queue.length > 0);
		if (!this.looping) {
			this.disable();
			return;
		}

		while (this.queue.length > 0) {
			var post_data = this.queue.shift();
			this.load_single(post_data);
			post_data.sounds.auto_check.search_span.css("display", "none");
			if (this.serial) break;
		}
	},
	load_single: function (post_data) {
		var self = this;
		inline_manager.activate_load_all_link(null, post_data, function (okay, post_data) {
			self.load_single_done();
		});
	},
	load_single_done: function () {
		var self = this;
		this.timer = setTimeout(function () {
			self.timer = null;
			self.loop_next();
		}, this.delay);
	}
};
var sound_auto_loader = null;



///////////////////////////////////////////////////////////////////////////////
// Auto-checking images
///////////////////////////////////////////////////////////////////////////////
function SoundAutoChecker() {
	this.looping = false;
	this.timer = null;
	this.delay = 1;
	this.queue = new Array();
	this.serial = true;
	this.enabled = false;

	this.link = null;
	this.callbacks = [ image_check_callback , png_check_callback ];
}
SoundAutoChecker.prototype = {
	constructor: SoundAutoChecker,
	add_to_queue: function (post_data) {
		// Set to loaded
		post_data.loaded = true;

		// Add to queue
		this.queue.push(post_data);
		this.loop();
	},
	enable: function () {
		if (!this.enabled) {
			for (var i = 0; i < this.queue.length; ++i) {
				this.queue[i].sounds.auto_check.search_span.css("display", "");
			}
			this.link.removeAttr("href");
			this.link.html("Detecting Sounds");

			this.enabled = true;
			this.loop();
		}
	},
	disable: function () {
		if (this.enabled) {
			for (var i = 0; i < this.queue.length; ++i) {
				this.queue[i].sounds.auto_check.search_span.css("display", "none");
			}
			this.link.attr("href", "#");
			this.link.html("Detect Sounds");

			this.enabled = false;
			this.looping = false;
			if (this.timer != null) {
				clearTimeout(this.timer);
				this.timer = null;
			}
		}
	},
	loop: function () {
		if (!this.enabled || this.looping) return;

		this.looping = true;
		this.loop_next();
	},
	loop_next: function () {
		if (!this.enabled) return;

		this.looping = (this.queue.length > 0);

		var loaded = false;
		while (this.queue.length > 0) {
			var post_data = this.queue.shift();
			post_data.sounds.auto_check.search_span.css("display", "none");
			if (post_data.sounds.sound_names.length == 0) {
				loaded = true;
				this.load_single(post_data);
				if (this.serial) break;
			}
		}

		this.looping = !loaded;
	},
	load_single: function (post_data) {
		var self = this;
		ajax_get(
			post_data.image_url,
			false,
			post_data,
			function (event, post_data) {},
			function (okay, post_data, response) {
				var callback_id = (okay ? 0 : self.callbacks.length); // this kills the loop (on error)
				self.load_single_callbacks(post_data, callback_id, response);
			}
		);
	},
	load_single_callbacks: function (post_data, callback_id, response) {
		if (callback_id >= this.callbacks.length) {
			// Not found
			post_data.sounds.auto_check.search_span.css("display", "none");
			this.load_single_done();
		}
		else {
			// Run a callback
			var self = this;
			this.callbacks[callback_id](
				post_data.image_url,
				response,
				post_data,
				function (image_data, post_data) {
					if (image_data == null || image_data[1].length <= 0) {
						// Check further
						self.load_single_callbacks(post_data, callback_id + 1, response);
					}
					else {
						// Found
						post_data.sounds.sound_names = image_data[1];

						// html update
						inline_manager.update_about_image(post_data);

						// Done
						post_data.sounds.auto_check.search_span.css("display", "none");
						self.load_single_done();
					}
				}
			);
		}
	},
	load_single_done: function () {
		var self = this;
		this.timer = setTimeout(function () {
			self.timer = null;
			self.loop_next();
		}, this.delay);
	}
};
var sound_auto_checker = null;



///////////////////////////////////////////////////////////////////////////////
// Hotkeys
///////////////////////////////////////////////////////////////////////////////
function HotkeyListener() {
	this.keycode_names = {
		8: "BACKSPACE",
		9: "TAB",
		13: "ENTER",
		18: "ESCAPE",
		20: "CAPS LOCK",
		32: "MPACE",
		33: "PAGE UP",
		34: "PAGE DOWN",
		35: "END",
		36: "HOME",
		37: "LEFT",
		38: "UP",
		39: "RIGHT",
		40: "DOWN",
		112: "F1",
		113: "F2",
		114: "F3",
		115: "F4",
		116: "F5",
		117: "F6",
		118: "F7",
		119: "F8",
		120: "F9",
		121: "F10",
		122: "F11",
		123: "F12",
		173: "-",
		192: "`",
		219: "[",
		220: "\\",
		221: "]",
		222: "'",
		188: "<",
		190: ">",
		191: "/",
	};

	this.hotkeys = [
		[ "player_open" , this.on_player_open , "Open Player" ],
		[ "player_close" , this.on_player_close , "Close Player" ],
		[ "player_minmax" , this.on_player_minmax , "Min/Max Player" ],
		[ "theatre_view_toggle" , this.theatre_view_toggle , "Toggle Theatre-View" ],
		[ "playlist_play" , this.on_playlist_play , "Play/Pause" ],
		[ "playlist_next" , this.on_playlist_next , "Next" ],
		[ "playlist_previous" , this.on_playlist_previous , "Previous" ],
		[ "volume_up" , this.on_volume_up , "Volume Up" ],
		[ "volume_down" , this.on_volume_down , "Volume Down" ],
	];

	$(window)
	.off("keydown.HotkeyListener")
	.on("keydown.HotkeyListener", {self: this}, function (event) {
		if (!(event.which >= 16 && event.which <= 18)) {
			var flags = (event.shiftKey ? 1 : 0) | (event.ctrlKey ? 2 : 0) | (event.altKey ? 4 : 0);

			// Not typing
			var t = $(document.activeElement).prop("tagName").toLowerCase();
			if (t !== "input" && t !== "textarea") {
				// Hotkey loop
				for (var i = 0; i < event.data.self.hotkeys.length; ++i) {
					var k = event.data.self.hotkeys[i][0];
					if (
						script.settings["hotkeys"][k][0] != 0 &&
						script.settings["hotkeys"][k][0] == event.which &&
						script.settings["hotkeys"][k][1] == flags
					) {
						event.data.self.hotkeys[i][1].call(event.data.self);
						return false;
					}
				}
			}
		}
		return true;
	});
}
HotkeyListener.prototype = {
	constructor: HotkeyListener,
	settings_update: function () {
		for (var i = 0; i < this.hotkeys.length; ++i) {
			script.settings["hotkeys"][this.hotkeys[i][0]] = [ 0 , 0 ];
		}
	},
	key_to_string: function (keycode, modifiers) {
		var str = "";
		if ((modifiers & 1) != 0) str += "Shift";
		if ((modifiers & 2) != 0) str += (str.length > 0 ? " + " : "") + "Ctrl";
		if ((modifiers & 4) != 0) str += (str.length > 0 ? " + " : "") + "Alt";
		if (keycode != 0) str += (str.length > 0 ? " + " : "") + (
			keycode in this.keycode_names ?
			this.keycode_names[keycode] :
			(keycode >= 127 || keycode < 32 ? keycode : String.fromCharCode(keycode))
		);
		return str;
	},
	create_hotkey_setting: function (hotkey_label, hotkey_name) {
		// Settings
		var hotkey_settings = {
			"section": "Hotkeys",
			"label": hotkey_label,
			"html": null,
			"html_input": null,
			"html_input_clear": null,
			"value": "",
			"value_code": script.settings["hotkeys"][hotkey_name][0],
			"value_modifiers": script.settings["hotkeys"][hotkey_name][1],
			"value_modifiers_current": 0, // 1 = shift, 2 = ctrl, 4 = alt
			"update_value": null,
			"listener": this
		};
		hotkey_settings.update_value = function (hotkey_settings) {
			// Update
			hotkey_settings.value = hotkey_settings.listener.key_to_string(
				hotkey_settings.value_code, hotkey_settings.value_modifiers
			);

			hotkey_settings.html_input.val(hotkey_settings.value);
		};

		// HTML
		(hotkey_settings.html = E("div"))
		.append( //{ DOM
			E("div")
			.addClass("MPSettingsTextboxContainer")
			.append(
				(hotkey_settings.html_input = E("input"))
				.addClass("MPSettingsTextbox")
				.attr("type", "text")
				.val(hotkey_settings.value)
			)
			.append(
				E("div")
				.addClass("MPSettingsTextboxLinkContainer")
				.append(
					(hotkey_settings.html_input_clear = E("a"))
					.attr("href", "#")
					.html("Clear")
				)
			)
		); //}

		// Update value
		hotkey_settings.update_value(hotkey_settings);

		// Events
		hotkey_settings.html_input_clear.on("click", {"hotkey_settings": hotkey_settings, "hotkey_name": hotkey_name}, function (event) {
			// Clear value
			event.data.hotkey_settings.value_code = 0;
			event.data.hotkey_settings.value_modifiers = 0;
			event.data.hotkey_settings.value_modifiers_current = 0;
			event.data.hotkey_settings.update_value(event.data.hotkey_settings);

			// Update
			script.settings["hotkeys"][event.data.hotkey_name][0] = event.data.hotkey_settings.value_code;
			script.settings["hotkeys"][event.data.hotkey_name][1] = event.data.hotkey_settings.value_modifiers;
			script.settings_save();

			return false;
		});
		hotkey_settings.html_input.on("keydown", {"hotkey_settings": hotkey_settings, "hotkey_name": hotkey_name}, function (event) {
			event.data.hotkey_settings.value_modifiers_current = (event.shiftKey ? 1 : 0) | (event.ctrlKey ? 2 : 0) | (event.altKey ? 4 : 0);
			event.data.hotkey_settings.value_modifiers = event.data.hotkey_settings.value_modifiers_current;

			if (event.which >= 16 && event.which <= 18) {
				event.data.hotkey_settings.value_code = 0;
			}
			else {
				event.data.hotkey_settings.value_code = event.which;
			}

			event.data.hotkey_settings.update_value(event.data.hotkey_settings);

			return false;
		})
		.on("keyup", {"hotkey_settings": hotkey_settings, "hotkey_name": hotkey_name}, function (event) {
			if (event.which >= 16 && event.which <= 18) {
				var v = 1 << (event.which - 16);
				event.data.hotkey_settings.value_modifiers_current &= ~v;

				event.data.hotkey_settings.update_value(event.data.hotkey_settings);
			}

			return false;
		})
		.on("blur", {"hotkey_settings": hotkey_settings, "hotkey_name": hotkey_name}, function (event) {
			// No key?
			if (event.data.hotkey_settings.value_code == 0) {
				event.data.hotkey_settings.value_modifiers = 0;
			}
			event.data.hotkey_settings.update_value(event.data.hotkey_settings);

			// Update
			script.settings["hotkeys"][event.data.hotkey_name][0] = event.data.hotkey_settings.value_code;
			script.settings["hotkeys"][event.data.hotkey_name][1] = event.data.hotkey_settings.value_modifiers;
			script.settings_save();
		})
		.on("focus", {"hotkey_settings": hotkey_settings, "hotkey_name": hotkey_name}, function (event) {
			// Clear modifiers
			event.data.hotkey_settings.value_modifiers_current = 0;
		});

		// Done
		return hotkey_settings;
	},
	on_player_open: function () {
		// Open the player
		media_player_manager.open_player(true);
	},
	on_player_close: function () {
		// Close the player
		if (media_player_manager.media_player !== null) {
			media_player_manager.media_player.destroy(true);
		}
	},
	on_player_minmax: function () {
		// Min/maximize the player
		if (media_player_manager.media_player !== null) {
			if (media_player_manager.media_player.is_maximized()) {
				media_player_manager.media_player.minimize();
			}
			else {
				media_player_manager.media_player.maximize();
			}
		}
	},
	theatre_view_toggle: function () {
		// Theatre-view
		if (media_player_manager.media_player !== null) {
			if (media_player_manager.media_player.is_in_theatre()) {
				media_player_manager.media_player.theatre_exit();
			}
			else {
				media_player_manager.media_player.theatre_enter({no_info: true});
			}
		}
	},
	on_playlist_play: function () {
		// Play/pause
		if (media_player_manager.media_player !== null) {
			if (media_player_manager.media_player.is_paused()) {
				media_player_manager.media_player.play();
			}
			else {
				media_player_manager.media_player.pause();
			}
		}
	},
	on_playlist_next: function () {
		// Next
		if (media_player_manager.media_player !== null) {
			media_player_manager.media_player.next(false);
		}
	},
	on_playlist_previous: function () {
		// Previous
		if (media_player_manager.media_player !== null) {
			media_player_manager.media_player.previous();
		}
	},
	on_volume_up: function () {
		// Previous
		if (media_player_manager.media_player !== null) {
			media_player_manager.media_player.set_volume(media_player_manager.media_player.get_volume() + 0.05);
		}
	},
	on_volume_down: function () {
		// Previous
		if (media_player_manager.media_player !== null) {
			media_player_manager.media_player.set_volume(media_player_manager.media_player.get_volume() - 0.05);
		}
	}
};
var hotkey_listener = null;



///////////////////////////////////////////////////////////////////////////////
// Media player manager
///////////////////////////////////////////////////////////////////////////////
function MediaPlayerManager() {
	this.media_player = null;

	this.update_callbacks();

	this.css_color_presets = {
		"yotsubab": {
			"@name": "Yotsuba B",
			"bg_outer_color": [ 0 , 0 , 0 , 0.25 ],

			"bg_color_lightest": [ 255 , 255 , 255 , 1.0 ],
			"bg_color_light": [ 238 , 242 , 255 , 1.0 ],
			"bg_color_dark": [ 214 , 218 , 240 , 1.0 ],
			"bg_color_darker": [ 183 , 197 , 217 , 1.0 ],
			"bg_color_darkest": [ 0 , 0 , 0 , 1.0 ],

			"color_special_1": [ 52 , 52 , 92 , 1.0 ],
			"color_special_2": [ 221 , 0 , 0 , 1.0 ],

			"color_standard": [ 0 , 0 , 0 , 1.0 ],
			"color_disabled": [ 120 , 124 , 128 , 1.0 ],
			"color_light": [ 120 , 124 , 128 , 1.0 ],

			"color_highlight_light": [ 255 , 255 , 255 , 1.0 ],

			"volume_colors": [ [ 52 , 52 , 92 , 1.0 ] ]
		},
		"photon": {
			"@name": "Photon",
			"bg_outer_color": [ 51 , 51 , 51 , 0.25 ],

			"bg_color_lightest": [ 255 , 255 , 255 , 1.0 ],
			"bg_color_light": [ 238 , 238 , 238 , 1.0 ],
			"bg_color_dark": [ 221 , 221 , 221 , 1.0 ],
			"bg_color_darker": [ 204 , 204 , 204 , 1.0 ],
			"bg_color_darkest": [ 0 , 0 , 0 , 1.0 ],

			"color_special_1": [ 0 , 74 , 153 , 1.0 ],
			"color_special_2": [ 255 , 102 , 0 , 1.0 ],

			"color_standard": [ 51 , 51 , 51 , 1.0 ],
			"color_disabled": [ 128 , 128 , 128 , 1.0 ],
			"color_light": [ 128 , 128 , 128 , 1.0 ],

			"color_highlight_light": [ 255 , 255 , 255 , 1.0 ],

			"volume_colors": [ [ 255 , 102 , 0 , 1.0 ] ]
		},
		"tomorrow": {
			"@name": "Tomorrow",
			"bg_outer_color": [ 197 , 200 , 198 , 0.25 ],

			"bg_color_lightest": [ 0 , 0 , 0 , 1.0 ],
			"bg_color_light": [ 29 , 31 , 33 , 1.0 ],
			"bg_color_dark": [ 40 , 42 , 46 , 1.0 ],
			"bg_color_darker": [ 54 , 56 , 60 , 1.0 ],
			"bg_color_darkest": [ 255 , 255 , 255 , 1.0 ],

			"color_special_1": [ 197 , 200 , 198 , 1.0 ],
			"color_special_2": [ 129 , 162 , 190 , 1.0 ],

			"color_standard": [ 197 , 200 , 198 , 1.0 ],
			"color_disabled": [ 125 , 128 , 126 , 1.0 ],
			"color_light": [ 125 , 128 , 126 , 1.0 ],

			"color_highlight_light": [ 0 , 0 , 0 , 1.0 ],

			"volume_colors": [ [ 129 , 162 , 190 , 1.0 ] ]
		},
		"foolz": {
			"@name": "Foolz",
			"bg_outer_color": [ 0 , 0 , 0 , 0.25 ],

			"bg_color_lightest": [ 255 , 255 , 255 , 1.0 ],
			"bg_color_light": [ 238 , 248 , 240 , 1.0 ],
			"bg_color_dark": [ 214 , 240 , 218 , 1.0 ],
			"bg_color_darker": [ 183 , 217 , 197 , 1.0 ],
			"bg_color_darkest": [ 0 , 0 , 0 , 1.0 ],

			"color_special_1": [ 17 , 119 , 67 , 1.0 ],
			"color_special_2": [ 0 , 85 , 128 , 1.0 ],

			"color_standard": [ 54 , 64 , 65 , 1.0 ],
			"color_disabled": [ 120 , 128 , 124 , 1.0 ],
			"color_light": [ 120 , 128 , 124 , 1.0 ],

			"color_highlight_light": [ 255 , 255 , 255 , 1.0 ],

			"volume_colors": [ [ 17 , 119 , 67 , 1.0 ] ]
		}
	};
	this.css_size_presets = {
		"yotsubab": {
			"@name": "Yotsuba B",

			"bg_outer_size": 2,
			"bg_outer_border_radius": 6,
			"bg_inner_border_radius": 4,
			"border_radius_normal": 4,
			"border_radius_small": 2,

			"main_font": "arial,helvetica,sans-serif",
			"controls_font": "Verdana",

			"font_size": 12,
			"font_size_small": 8,
			"font_size_controls": 12,

			"padding_scale": 1.0,
			"font_scale": 1.0,
			"border_scale": 1.0
		},
		"photon": {
			"@name": "Photon",

			"bg_outer_size": 2,
			"bg_outer_border_radius": 6,
			"bg_inner_border_radius": 4,
			"border_radius_normal": 4,
			"border_radius_small": 2,

			"main_font": "arial,helvetica,sans-serif",
			"controls_font": "Verdana",

			"font_size": 12,
			"font_size_small": 8,
			"font_size_controls": 12,

			"padding_scale": 1.0,
			"font_scale": 1.0,
			"border_scale": 1.0
		},
		"tomorrow": {
			"@name": "Tomorrow",

			"bg_outer_size": 2,
			"bg_outer_border_radius": 6,
			"bg_inner_border_radius": 4,
			"border_radius_normal": 4,
			"border_radius_small": 2,

			"main_font": "arial,helvetica,sans-serif",
			"controls_font": "Verdana",

			"font_size": 12,
			"font_size_small": 8,
			"font_size_controls": 12,

			"padding_scale": 1.0,
			"font_scale": 1.0,
			"border_scale": 1.0
		},
		"foolz": {
			"@name": "Foolz",

			"bg_outer_size": 2,
			"bg_outer_border_radius": 6,
			"bg_inner_border_radius": 4,
			"border_radius_normal": 4,
			"border_radius_small": 2,

			"main_font": "arial,helvetica,sans-serif",
			"controls_font": "Verdana",

			"font_size": 12,
			"font_size_small": 8,
			"font_size_controls": 12,

			"padding_scale": 1.0,
			"font_scale": 1.0,
			"border_scale": 1.0
		}
	};
}
MediaPlayerManager.prototype = {
	constructor: MediaPlayerManager,
	media_player_destruct_callback: function (media_player) {
		// Save settings
		script.settings_save();
		// Nullify
		this.media_player = null;
	},
	open_player: function (load_settings) {
		if (this.media_player != null) {
			// Focus player
			this.media_player.focus();
			return this.media_player;
		}

		// CSS
		var media_player_css = new MediaPlayerCSS("yotsubab", this.css_color_presets, this.css_size_presets);
		// Load CSS settings
		if (load_settings) media_player_css.load(script.settings["style"]);
		// Custom settings
		var extra_options = [];
		// Player
		var self = this;
		this.media_player = new MediaPlayer(
			media_player_css,
			this.callbacks,
			function (data) { inline_manager.on_content_drag(data); },
			function (media_player) { script.settings_save(); },
			function (media_player) { self.media_player_destruct_callback(media_player); },
			extra_options
		);
		// Load settings
		if (load_settings) this.media_player.load(script.settings["player"]);
		// Async
		this.media_player.set_async_state(script.settings["performance"]["async_videcode_load"], script.settings["performance"]["async_rate"], script.settings["performance"]["async_delay"]);
		// Display
		this.media_player.create();

		return this.media_player;
	},
	update_callbacks: function () {
		this.callbacks = [
			(script.settings["performance"]["async_image_load"] ? image_load_callback_asynchronous : image_load_callback),
			(script.settings["performance"]["async_png_load"] ? png_load_callback_asynchronous : png_load_callback)
		];

		if (this.media_player != null) {
			this.media_player.set_load_callbacks(this.callbacks);
			this.media_player.set_async_state(script.settings["performance"]["async_videcode_load"], script.settings["performance"]["async_rate"], script.settings["performance"]["async_delay"]);
		}
	},
};
var media_player_manager = null;



///////////////////////////////////////////////////////////////////////////////
// Script settings
///////////////////////////////////////////////////////////////////////////////
function Script() {
	this.settings_loaded = false;
	this.settings = {
		"player": {},
		"style": {},
		"script": {
			"last_update": 0,
			"update_found": false,
			"update_version": "",
			"current_version": "",
			"update_message": "",
			"first_run": true
		},
		"hotkeys": {}, // loaded elsewhere
		"performance": {
			"post_parse_group_size": 25,
			"post_parse_group_delay": 0.125,

			"async_image_load": true,
			"async_png_load": true,
			"async_videcode_load": true,
			"async_rate": 64000,
			"async_delay": 1
		},
		"inline": {
			"highlight_color": "000000",

			"sound_tags_replace": true,
			"sound_thread_control": false,
			"sound_source": true,

			"url_replace": true,
			"url_replace_smart": false,
			"url_hijack": true,
			"url_hijack_remove": false,
			"url_replace_media_links": true,
			"url_media_links_open_in_player": true,
			"url_left_click_open": false,

			"video_preview": true,
			"video_preview_timeout": 0.5,
			"video_preview_image_space": 240,
			"video_preview_description_font_size": 0.8,
			"video_preview_description_timeout": 0.5,
			"video_preview_animate_open": 0.375,
			"video_preview_animate_close": 0.375,
			"video_preview_animate_description": 0.375,

			"link_click_theatre_animate": 0.25,
			"link_click_theatre_info": true,
			"link_click_theatre_how_to": true,
			"link_click_theatre_youtube": true,
			"link_click_theatre_vimeo": true,
			"link_click_theatre_force_start": false,
			"link_click_theatre_close_on_finish": true,
			"link_click_theatre_close_on_finish_interference": false,
		},
		"upload": {
			"enabled": true,
			"block_other_scripts": true,
			"animation_time": 0.25,
			"validate_files": true,
			"show_splash": true,
			"show_help": true,
			"autodetect_when_not_open": true,
			"autoupdate_after_post": true,
		}
	};
	this.storage_name = "4cs";

	// Changelog URL
	this.update_version_url = "http://dnsev.github.io/4cs/changelog.txt";

	// Update URL
	this.update_url = "https://raw.github.com/dnsev/4cs/master/web/4cs.dev.user.js";
	try {
		this.update_url = GM_getMetadata("downloadURL").toString();
	}
	catch (e) {
		try {
			var m = /\/\/\s*@downloadURL\s+(.+)/.exec(GM_info.scriptMetaStr);
			if (m) {
				this.update_url = m[1].trim();
			}
		}
		catch (e) {
			this.update_url = "https://raw.github.com/dnsev/4cs/master/web/4cs.user.js";
		}
	}
}
Script.prototype = {
	constructor: Script,
	settings_save: function () {
		// Get
		if (media_player_manager.media_player != null) {
			this.settings["player"] = media_player_manager.media_player.save();
			this.settings["style"] = media_player_manager.media_player.css.save();
		}
		// Save
		try {
			GM_setValue(this.storage_name, JSON.stringify(this.settings));
		}
		catch (e) {
			console.log(e);
		}
	},
	settings_load: function () {
		// Load
		if (!this.settings_loaded) {
			this.settings_loaded = true;
			try {
				var s = GM_getValue(this.storage_name);
				if (s) {
					s = JSON.parse(s);
					// load based on keys; overwrite if empty, else load on a per-key basis
					for (var key in this.settings) {
						if (key in s) {
							var len = 0;
							for (var key2 in this.settings[key]) {
								++len;
								if (key2 in s[key]) this.settings[key][key2] = s[key][key2];
							}
							if (len == 0) {
								this.settings[key] = s[key];
							}
						}
					}
				}
			}
			catch (e) {
				console.log(e);
			}
		}
	},
	update_check_interval: function (time) {
		var time_update;
		var version = "";
		try {
			version = GM_info.script.version;
		}
		catch (e) {
			try {
				version = GM_getMetadata("version").toString();
			}
			catch (e) {
				version = null;
			}
		}
		if (
			version !== null && (
				(time_update = ((new Date()).getTime() - this.settings["script"]["last_update"] >= time)) ||
				(time_update = (version != this.settings["script"]["current_version"])) ||
				this.settings["script"]["update_found"]
			)
		) {
			this.settings["script"]["current_version"] = version;
			this.update_check(time_update);
		}
	},
	update_check: function (ajax) {
		var self = this;
		var fn = function () {
			inline_manager.enable_update(self.update_url);
		};

		if (ajax) {
			ajax_get(
				this.update_version_url,
				true,
				{},
				null,
				function (okay, data, response) {
					if (okay) {
						var version;
						try {
							version = GM_info.script.version;
						}
						catch (e) {
							try {
								version = GM_getMetadata("version").toString();
							}
							catch (e) {
								version = null;
							}
						}

						if (version !== null) {
							// Get the log
							var log = self.parse_change_log(response);
							// Settings
							self.settings["script"]["update_version"] = log[0][0].toString();
							self.settings["script"]["last_update"] = (new Date()).getTime();
							self.settings["script"]["update_message"] = "";
							// Version compare
							self.settings["script"]["update_found"] = false;
							var current_version_split = version.toString().split(".");
							var new_version_split = self.settings["script"]["update_version"].split(".");
							var len = (new_version_split.length > current_version_split.length ? new_version_split.length : current_version_split.length);
							for (var i = 0; i < len; ++i) {
								if (
									(i < new_version_split.length ? (parseInt(new_version_split[i]) || 0) : 0) >
									(i < current_version_split.length ? (parseInt(current_version_split[i]) || 0) : 0)
								) {
									// Get the update notes
									var version_count = 0;
									for (var k = 0; k < log.length; ++k) {
										new_version_split = log[k][0].split(".");
										len = (new_version_split.length > current_version_split.length ? new_version_split.length : current_version_split.length);
										for (i = 0; i < len; ++i) {
											if (
												(i < new_version_split.length ? (parseInt(new_version_split[i]) || 0) : 0) >
												(i < current_version_split.length ? (parseInt(current_version_split[i]) || 0) : 0)
											) {
												if (++version_count > 5) {
													self.settings["script"]["update_message"] += "...\n";
													i = len;
													break;
												}
												self.settings["script"]["update_message"] += log[k][0] + "\n";
												for (i = 1; i < log[k].length; ++i) {
													self.settings["script"]["update_message"] += "- " + log[k][i] + "\n";
												}
												i = -1;
												break;
											}
										}
										if (i >= len) break;
									}
									// Update alert
									fn();
									self.settings["script"]["update_found"] = true;
									break;
								}
								else if (
									(i < new_version_split.length ? (parseInt(new_version_split[i]) || 0) : 0) <
									(i < current_version_split.length ? (parseInt(current_version_split[i]) || 0) : 0)
								) {
									// Ahead
									break;
								}
							}
							// Update settings
							self.settings_save();
						}
					}
				}
			);
		}
		else {
			fn();
		}
	},
	parse_change_log: function (data) {
		// Parse change log
		data = data.replace(/\r\n/g, "\n").split("\n\n");
		var log = [];
		for (var i = 0; i < data.length; ++i) {
			data[i] = data[i].trim();
			if (data[i].length == 0) continue;

			log.push([]);
			data[i] = data[i].split("\n");
			for (var j = 0; j < data[i].length; ++j) {
				if (j == 0) {
					log[log.length - 1].push(data[i][j]);
				}
				else {
					if (data[i][j][0] == "-") {
						log[log.length - 1].push(data[i][j].substr(1).trim());
					}
					else {
						log[log.length - 1][log[log.length - 1].length - 1] += "\n" + (data[i][j].substr(1).trim());
					}
				}
			}
		}

		return log;
	},
	on_update_click: function (event) {
		if (event.which == 1) {
			var scr_name = "";
			var scr_version = "";
			try {
				scr_name = GM_info.script.name;
				scr_version = GM_info.script.version;
			}
			catch (e) {
				scr_name = "userscript.js";
				scr_version = GM_getMetadata("version").toString();
			}

			var s = "An update is available to \"" + scr_name + "\":\n\n" +
				"Current version: " + scr_version + "\n" +
				"Update Version: " + this.settings["script"]["update_version"] + "\n\n" +
				"Changes:\n" + this.settings["script"]["update_message"] + "\n\n" +
				"Middle click the link or copy and paste the following url:               ";

			prompt(s, this.update_url);
			return false;
		}
		return true;
	},

	setup_options: function (inline_manager) {
		// Custom settings
		var extra_options = [ //{
			{
				"section": "Sounds",
				"update_value": function () { this.current = script.settings["inline"]["sound_tags_replace"]; },
				"label": "Tag Replacing",
				"description": "Replace [tags] in posts with links to load sounds",
				"values": [ true , false ],
				"descr": [ "Enabled" , "Disabled" ],
				"change": function (value) {
					script.settings["inline"]["sound_tags_replace"] = value;
					script.settings_save();
				}
			},
			{
				"section": "Sounds",
				"update_value": function () { this.current = script.settings["inline"]["sound_source"]; },
				"label": "Image Link",
				"description": "Put the \"sounds\" link next to the attributes of images",
				"values": [ true , false ],
				"descr": [ "Enabled" , "Disabled" ],
				"change": function (value) {
					script.settings["inline"]["sound_source"] = value;
					script.settings_save();
				}
			},
			{
				"section": "Sounds",
				"update_value": function () { this.current = script.settings["inline"]["sound_thread_control"]; },
				"label": "Thread Control Links",
				"description": "Put the sound thread management links at the top of the thread (\"Load All\", etc.)",
				"values": [ true , false ],
				"descr": [ "Enabled" , "Disabled" ],
				"change": function (value) {
					script.settings["inline"]["sound_thread_control"] = value;
					script.settings_save();
				}
			},

			{
				"section": "Sound Uploading",
				"update_value": function () { this.current = script.settings["upload"]["enabled"]; },
				"label": "Enable Sound Uploading Controls",
				"description": "A sound embedder will be available in the quick reply box",
				"values": [ true , false ],
				"descr": [ "Enabled" , "Disabled" ],
				"change": function (value) {
					script.settings["upload"]["enabled"] = value;
					script.settings_save();
				}
			},
			{
				"section": "Sound Uploading",
				"update_value": function () { this.current = script.settings["upload"]["animation_time"]; },
				"label": "Animation Time",
				"description": "How long it takes for the upload controls region to appear",
				"values": [ 1.0 , 0.75 , 0.5 , 0.375 , 0.25 , 0.125 , 0.0 ],
				"descr": [ "1 second" , "0.75 seconds" , "0.5 seconds" , "0.375 seconds" , "0.25 seconds" , "0.125 seconds" , "instant" ],
				"change": function (value) {
					script.settings["upload"]["animation_time"] = value;
					script.settings_save();
				}
			},
			{
				"section": "Sound Uploading",
				"update_value": function () { this.current = script.settings["upload"]["validate_files"]; },
				"label": "Validate Files",
				"description": "Validate any images/audio files as well formatted before uploading",
				"values": [ true , false ],
				"descr": [ "Enabled" , "Disabled" ],
				"change": function (value) {
					script.settings["upload"]["validate_files"] = value;
					script.settings_save();
				}
			},
			{
				"section": "Sound Uploading",
				"update_value": function () { this.current = script.settings["upload"]["block_other_scripts"]; },
				"label": "Block Other Uploaders",
				"description": "Attempt to block other uploading scripts (STILL A GOOD IDEA TO DISABLE THEM)",
				"values": [ true , false ],
				"descr": [ "Enabled" , "Disabled" ],
				"change": function (value) {
					script.settings["upload"]["block_other_scripts"] = value;
					script.settings_save();
				}
			},
			{
				"section": "Sound Uploading",
				"update_value": function () { this.current = script.settings["upload"]["autodetect_when_not_open"]; },
				"label": "Always Autodetect",
				"description": "Run autodetection on every image put in the uploader, even when the panel isn't open",
				"values": [ true , false ],
				"descr": [ "Enabled" , "Disabled" ],
				"change": function (value) {
					script.settings["upload"]["autodetect_when_not_open"] = value;
					script.settings_save();
				}
			},
			{
				"section": "Sound Uploading",
				"update_value": function () { this.current = script.settings["upload"]["autoupdate_after_post"]; },
				"label": "Auto-update After Post",
				"description": "Attempt to auto-update the page after you post using the sounds panel",
				"values": [ true , false ],
				"descr": [ "Enabled" , "Disabled" ],
				"change": function (value) {
					script.settings["upload"]["autoupdate_after_post"] = value;
					script.settings_save();
				}
			},
			{
				"section": "Sound Uploading",
				"update_value": function () { this.current = script.settings["upload"]["show_help"]; },
				"label": "Help Link",
				"description": "Display the help link in the uploader form",
				"values": [ true , false ],
				"descr": [ "Enabled" , "Disabled" ],
				"change": function (value) {
					script.settings["upload"]["show_help"] = value;
					script.settings_save();
				}
			},

			{
				"section": "Performance",
				"update_value": function () { this.current = script.settings["performance"]["async_image_load"]; },
				"label": "Asynchronous Image Loading",
				"description": "When enabled, may reduce browser lag when loading an image; when disabled, the image loads as quickly as possible",
				"values": [ true , false ],
				"descr": [ "Enabled" , "Disabled" ],
				"change": function (value) {
					script.settings["performance"]["async_image_load"] = value;
					media_player_manager.update_callbacks();
					script.settings_save();
				}
			},
			{
				"section": "Performance",
				"update_value": function () { this.current = script.settings["performance"]["async_png_load"]; },
				"label": "Asynchronous Stego-Image Loading",
				"description": "When enabled, may reduce browser lag when loading an image; when disabled, the image loads as quickly as possible",
				"values": [ true , false ],
				"descr": [ "Enabled" , "Disabled" ],
				"change": function (value) {
					script.settings["performance"]["async_png_load"] = value;
					media_player_manager.update_callbacks();
					script.settings_save();
				}
			},
			{
				"section": "Performance",
				"update_value": function () { this.current = script.settings["performance"]["async_videcode_load"]; },
				"label": "Asynchronous Videcode Image Loading",
				"description": "When enabled, may reduce browser lag when loading an image; when disabled, the image loads as quickly as possible",
				"values": [ true , false ],
				"descr": [ "Enabled" , "Disabled" ],
				"change": function (value) {
					script.settings["performance"]["async_videcode_load"] = value;
					media_player_manager.update_callbacks();
					script.settings_save();
				}
			},
			{
				"section": "Performance",
				"update_value": function () { this.current = script.settings["performance"]["async_rate"]; },
				"label": "Asynchronous Step Size",
				"description": "The approximate number of loop iterations to perform at a time; larger = faster, but browser may lag; smaller = less lag, but longer",
				"values": [ 1024000 , 512000 , 256000 , 128000 , 64000 , 32000 , 16000 , 8000 , 4000 ],
				"descr": [ "1024K" , "512K" , "256K" , "128K" , "64K" , "32K" , "16K" , "8K" , "4K" ],
				"change": function (value) {
					script.settings["performance"]["async_rate"] = value;
					media_player_manager.update_callbacks();
					script.settings_save();
				}
			},
			{
				"section": "Performance",
				"update_value": function () { this.current = script.settings["performance"]["async_delay"]; },
				"label": "Asynchronous Delay",
				"description": "The delay between groups of async data parsing; higher = longer",
				"values": [ 500 , 400 , 300 , 200 , 100 , 75 , 50 , 25 , 15 , 1 ],
				"descr": [ "500ms" , "400ms" , "300ms" , "200ms" , "100ms" , "75ms" , "50ms" , "25ms" , "15ms" , "ASAP" ],
				"change": function (value) {
					script.settings["performance"]["async_delay"] = value;
					media_player_manager.update_callbacks();
					script.settings_save();
				}
			},

			{
				"section": "Post Parsing",
				"update_value": function () { this.current = script.settings["performance"]["post_parse_group_size"]; },
				"label": "Group Size",
				"description": "The number of posts to parse at one time; may decrease lag time when loading a page",
				"values": [ -1 , 100 , 75 , 50 , 40 , 30 , 25 , 20 , 15 , 10 , 5 , 2 , 1 ],
				"descr": [ "All" , "100" , "75" , "50" , "40" , "30" , "25" , "20" , "15" , "10" , "5" , "2" , "1" ],
				"change": function (value) {
					script.settings["performance"]["post_parse_group_size"] = value;
					script.settings_save();
				}
			},
			{
				"section": "Post Parsing",
				"update_value": function () { this.current = script.settings["performance"]["post_parse_group_delay"]; },
				"label": "Group Delay",
				"description": "The delay between parsing a group of posts",
				"values": [ 1.0 , 0.75 , 0.5 , 0.375 , 0.25 , 0.125 , 1.0 / 128.0 ],
				"descr": [ "1 second" , "0.75 seconds" , "0.5 seconds" , "0.375 seconds" , "0.25 seconds" , "0.125 seconds" , "ASAP" ],
				"change": function (value) {
					script.settings["performance"]["post_parse_group_delay"] = value;
					script.settings_save();
				}
			},

			{
				"section": "Link Replacement",
				"update_value": function () { this.current = script.settings["inline"]["url_replace"]; },
				"label": "URL Replacing",
				"description": "Replace URLs in posts",
				"values": [ true , false ],
				"descr": [ "Enabled" , "Disabled" ],
				"change": function (value) {
					script.settings["inline"]["url_replace"] = value;
					script.settings_save();
				}
			},
			{
				"section": "Link Replacement",
				"update_value": function () { this.current = script.settings["inline"]["url_replace_smart"]; },
				"label": "Extended URLs",
				"description": "Attempt to replace urls through spoilers",
				"values": [ true , false ],
				"descr": [ "Enabled" , "Disabled" ],
				"change": function (value) {
					script.settings["inline"]["url_replace_smart"] = value;
					script.settings_save();
				}
			},
			{
				"section": "Link Replacement",
				"update_value": function () { this.current = script.settings["inline"]["url_hijack"]; },
				"label": "URL Hijacking",
				"description": "Take over URLs replaced by other scripts",
				"values": [ true , false ],
				"descr": [ "Enabled" , "Disabled" ],
				"change": function (value) {
					script.settings["inline"]["url_hijack"] = value;
					script.settings_save();
				}
			},
			{
				"section": "Link Replacement",
				"update_value": function () { this.current = script.settings["inline"]["url_hijack_remove"]; },
				"label": "Complete URL Hijacking",
				"description": "Disabling this may leave certain useful features from the original embed, otherwise they are stripped",
				"values": [ true , false ],
				"descr": [ "Enabled" , "Disabled" ],
				"change": function (value) {
					script.settings["inline"]["url_hijack_remove"] = value;
					script.settings_save();
				}
			},
			{
				"section": "Link Replacement",
				"update_value": function () { this.current = script.settings["inline"]["url_replace_media_links"]; },
				"label": "Media URL Replacement",
				"description": "Transforms media links into titled links with some popup info",
				"values": [ true , false ],
				"descr": [ "Enabled" , "Disabled" ],
				"change": function (value) {
					script.settings["inline"]["url_replace_media_links"] = value;
					script.settings_save();
				}
			},
			{
				"section": "Link Replacement",
				"update_value": function () { this.current = script.settings["inline"]["url_media_links_open_in_player"]; },
				"label": "Media URLs Open In Player",
				"description": "Media links are opened in the player",
				"values": [ true , false ],
				"descr": [ "Enabled" , "Disabled" ],
				"change": function (value) {
					script.settings["inline"]["url_media_links_open_in_player"] = value;
					script.settings_save();
				}
			},
			{
				"section": "Link Replacement",
				"update_value": function () { this.current = script.settings["inline"]["url_left_click_open"]; },
				"label": "Left Click Open",
				"description": "Replaced links cannot be left clicked to open; middle click must be used",
				"values": [ true , false ],
				"descr": [ "Enabled" , "Disabled" ],
				"change": function (value) {
					script.settings["inline"]["url_left_click_open"] = value;
					script.settings_save();
				}
			},

			{
				"section": "Video Links",
				"update_value": function () { this.current = script.settings["inline"]["video_preview"]; },
				"label": "Hover Preview",
				"description": "When enabled, hovering a video link will display a preview image",
				"values": [ true , false ],
				"descr": [ "Enabled" , "Disabled" ],
				"change": function (value) {
					script.settings["inline"]["video_preview"] = value;
					script.settings_save();
				}
			},
			{
				"section": "Video Links",
				"update_value": function () { this.current = script.settings["inline"]["video_preview_timeout"]; },
				"label": "Hover Time",
				"description": "How long you have to hover a link for the preview to appear",
				"values": [ 2.0 , 1.5 , 1.0 , 0.75 , 0.5 , 0.25 , 0.125 , 0.0 ],
				"descr": [ "2 seconds" , "1.5 seconds" , "1 second" , "0.75 seconds" , "0.5 seconds" , "0.25 seconds" , "0.125 seconds" , "instant" ],
				"change": function (value) {
					script.settings["inline"]["video_preview_timeout"] = value;
					script.settings_save();
				}
			},
			{
				"section": "Video Links",
				"update_value": function () { this.current = script.settings["inline"]["video_preview_image_space"]; },
				"label": "Preview Size",
				"description": "Size to use for the preview image",
				"values": [ 480 , 320 , 240 , 120 ],
				"descr": [ "Huge (480px)" , "Large (320px)" , "Normal (240px)" , "Small (120px)" ],
				"change": function (value) {
					script.settings["inline"]["video_preview_image_space"] = value;
					script.settings_save();
				}
			},
			{
				"section": "Video Links",
				"update_value": function () { this.current = script.settings["inline"]["video_preview_description_timeout"]; },
				"label": "Description Display",
				"description": "Time to wait to display the video description",
				"values": [ 5.0 , 4.0 , 3.0 , 2.0 , 1.0 , 0.75 , 0.5 , 0.375 , 0.25 , 0.125 , 0.0 , -1 ],
				"descr": [ "5 seconds" , "4 seconds" , "3 seconds" , "2 seconds" , "1 second" , "0.75 seconds" , "0.5 seconds" , "0.375 seconds" , "0.25 seconds" , "0.125 seconds" , "instant" , "off" ],
				"change": function (value) {
					script.settings["inline"]["video_preview_description_timeout"] = value;
					script.settings_save();
				}
			},
			{
				"section": "Video Links",
				"update_value": function () { this.current = script.settings["inline"]["video_preview_description_font_size"]; },
				"label": "Description Font Size",
				"description": "The scaling of the description text's font size",
				"values": [ 1.0 , 0.9 , 0.8 , 0.7 , 0.6 , 0.5 ],
				"descr": [ "normal" , "90%" , "80%" , "70%" , "60%" , "50%" ],
				"change": function (value) {
					script.settings["inline"]["video_preview_description_font_size"] = value;
					script.settings_save();
				}
			},
			{
				"section": "Video Links",
				"update_value": function () { this.current = script.settings["inline"]["video_preview_animate_description"]; },
				"label": "Description Animation",
				"description": "Display the opening animation for the video description",
				"values": [ 1.0 , 0.75 , 0.5 , 0.375 , 0.25 , 0.125 , 0.0 ],
				"descr": [ "1 second" , "0.75 seconds" , "0.5 seconds" , "0.375 seconds" , "0.25 seconds" , "0.125 seconds" , "instant" ],
				"change": function (value) {
					script.settings["inline"]["video_preview_animate_description"] = value;
					script.settings_save();
				}
			},
			{
				"section": "Video Links",
				"update_value": function () { this.current = script.settings["inline"]["video_preview_animate_open"]; },
				"label": "Opening Animation",
				"description": "Fade the preview window open",
				"values": [ 1.0 , 0.75 , 0.5 , 0.375 , 0.25 , 0.125 , 0.0 ],
				"descr": [ "1 second" , "0.75 seconds" , "0.5 seconds" , "0.375 seconds" , "0.25 seconds" , "0.125 seconds" , "instant" ],
				"change": function (value) {
					script.settings["inline"]["video_preview_animate_open"] = value;
					script.settings_save();
				}
			},
			{
				"section": "Video Links",
				"update_value": function () { this.current = script.settings["inline"]["video_preview_animate_close"]; },
				"label": "Closing Animation",
				"description": "Fade the preview window closed",
				"values": [ 1.0 , 0.75 , 0.5 , 0.375 , 0.25 , 0.125 , 0.0 ],
				"descr": [ "1 second" , "0.75 seconds" , "0.5 seconds" , "0.375 seconds" , "0.25 seconds" , "0.125 seconds" , "instant" ],
				"change": function (value) {
					script.settings["inline"]["video_preview_animate_close"] = value;
					script.settings_save();
				}
			},

			{
				"section": "Theatre-View",
				"update_value": function () { this.current = script.settings["inline"]["link_click_theatre_youtube"]; },
				"label": "Youtube",
				"description": "Enable Theatre-View on Youtube video links",
				"values": [ true , false ],
				"descr": [ "Enabled" , "Disabled" ],
				"change": function (value) {
					script.settings["inline"]["link_click_theatre_youtube"] = value;
					script.settings_save();
				}
			},
			{
				"section": "Theatre-View",
				"update_value": function () { this.current = script.settings["inline"]["link_click_theatre_vimeo"]; },
				"label": "Vimeo",
				"description": "Enable Theatre-View on Vimeo video links",
				"values": [ true , false ],
				"descr": [ "Enabled" , "Disabled" ],
				"change": function (value) {
					script.settings["inline"]["link_click_theatre_vimeo"] = value;
					script.settings_save();
				}
			},
			{
				"section": "Theatre-View",
				"update_value": function () { this.current = script.settings["inline"]["link_click_theatre_animate"]; },
				"label": "Opening Time",
				"description": "Time it takes for the theatre view to open",
				"values": [ 1.0 , 0.75 , 0.5 , 0.375 , 0.25 , 0.125 , 0.0 ],
				"descr": [ "1 second" , "0.75 seconds" , "0.5 seconds" , "0.375 seconds" , "0.25 seconds" , "0.125 seconds" , "instant" ],
				"change": function (value) {
					script.settings["inline"]["link_click_theatre_animate"] = value;
					script.settings_save();
				}
			},
			{
				"section": "Theatre-View",
				"update_value": function () { this.current = script.settings["inline"]["link_click_theatre_force_start"]; },
				"label": "Force Start",
				"description": "Added media will be forced to start playing",
				"values": [ true , false ],
				"descr": [ "Enabled" , "Disabled" ],
				"change": function (value) {
					script.settings["inline"]["link_click_theatre_force_start"] = value;
					script.settings_save();
				}
			},
			{
				"section": "Theatre-View",
				"update_value": function () { this.current = script.settings["inline"]["link_click_theatre_close_on_finish"]; },
				"label": "Close On Finish",
				"description": "Theatre-View will close once the added media completes",
				"values": [ true , false ],
				"descr": [ "Enabled" , "Disabled" ],
				"change": function (value) {
					script.settings["inline"]["link_click_theatre_close_on_finish"] = value;
					script.settings_save();
				}
			},
			{
				"section": "Theatre-View",
				"update_value": function () { this.current = script.settings["inline"]["link_click_theatre_close_on_finish_interference"]; },
				"label": "Close On Finish After Interaction",
				"description": "Theatre-View will close on finish, even if playback was interacted with",
				"values": [ true , false ],
				"descr": [ "Enabled" , "Disabled" ],
				"change": function (value) {
					script.settings["inline"]["link_click_theatre_close_on_finish_interference"] = value;
					script.settings_save();
				}
			},
			{
				"section": "Theatre-View",
				"update_value": function () { this.current = script.settings["inline"]["link_click_theatre_info"]; },
				"label": "Display Information",
				"description": "Show info when entering Theatre-View from video links",
				"values": [ true , false ],
				"descr": [ "Enabled" , "Disabled" ],
				"change": function (value) {
					script.settings["inline"]["link_click_theatre_info"] = value;
					script.settings_save();
				}
			},
			{
				"section": "Theatre-View",
				"update_value": function () { this.current = script.settings["inline"]["link_click_theatre_how_to"]; },
				"label": "Settings Information",
				"description": "Show additional information about Theatre-View settings",
				"values": [ true , false ],
				"descr": [ "Enabled" , "Disabled" ],
				"change": function (value) {
					script.settings["inline"]["link_click_theatre_how_to"] = value;
					script.settings_save();
				}
			},
		]; //}

		// Stylings
		var o;
		extra_options.push(o = {
			"section": "Styling",
			"label": "Highlight Color",
			"description": "The highlight color used for video previews, settings, etc.",
			"html": null
		});
		(o.html = E("div"))
		.append( //{ DOM
			E("div")
			.addClass("MPSettingsTextboxContainer")
			.append(
				(o.html_input = E("input"))
				.addClass("MPSettingsTextbox MPSettingsTextboxRight")
				.attr("type", "text")
				.val(script.settings["inline"]["highlight_color"])
				.on("change", {}, function (event) {
					script.settings["inline"]["highlight_color"] = $(this).val();
					script.settings_save();
					inline_manager.update_styles();
				})
			)
		); //}

		// Hotkeys
		for (var i = 0; i < hotkey_listener.hotkeys.length; ++i) {
			extra_options.push(
				hotkey_listener.create_hotkey_setting(hotkey_listener.hotkeys[i][2],
				hotkey_listener.hotkeys[i][0])
			);
		}

		// Generate
		for (var i = 0; i < extra_options.length; ++i) {
			inline_manager.settings_manager.setting_add(extra_options[i]);
		}
	},
	settings_update: function () {
		inline_manager.settings_manager.settings_update_all();
	},
};
var script = null;



///////////////////////////////////////////////////////////////////////////////
// xch compatability
///////////////////////////////////////////////////////////////////////////////
function xch_acquire() {
	// xch detection
	xch = null;
	var xch_detail = {
		event: "acquire",
		return_value: undefined
	};
	document.dispatchEvent(new CustomEvent("xch_api_event", {
		detail: xch_detail
	}));
	if (xch_detail.return_value !== undefined) {
		try {
			// Found
			xch = xch_detail.return_value;
			xch.api = new xch.API();

			// Done
			return true;
		}
		catch (e) {
			xch = null;
		}
	}
	// Not found
	return false;
};
var xch = null;



///////////////////////////////////////////////////////////////////////////////
// Entry
///////////////////////////////////////////////////////////////////////////////
$(document).ready(function () {
	// Don't load
	if (no_load) return;

	// Detection
	xch_acquire();

	// Object setup
	script = new Script();
	hotkey_listener = new HotkeyListener();

	// Settings
	hotkey_listener.settings_update();
	script.settings_load();

	// More object setup
	media_player_manager = new MediaPlayerManager();
	sound_auto_loader = new SoundAutoLoader();
	sound_auto_checker = new SoundAutoChecker();
	inline_manager = new InlineManager();
	thread_manager = new ThreadManager();

	// Options
	script.setup_options(inline_manager);

	// First run
	if (script.settings["script"]["first_run"]) {
		inline_manager.display_info("help", {easy_close: false});
	}



	// Hack move the scope out of sandbox
	window._unsafe_exec = function () {
		var win_object = window;
		document.addEventListener("api_4cs_unsafe_exec", function (event) {
			event.detail.ret = event.detail.fcn.call(win_object, event.detail.data);
		}, false);
	};
	var tag = document.createElement("script");
	tag.innerHTML = "(" + window._unsafe_exec.toString() + ")();";
	document.head.appendChild(tag);

	window._unsafe_exec = function (exec_function, data) {
		var detail = {
			fcn: exec_function,
			data: data,
			ret: null
		};
		document.dispatchEvent(new CustomEvent("api_4cs_unsafe_exec", {
			detail: detail
		}));
		return detail.ret;
	}



	// Youtube API
	var onYouTubeIframeAPIReady = function () {
		document.dispatchEvent(new CustomEvent("api_4cs_youtube_ready", {
			detail: {
				YT: window.YT
			}
		}));
	};

	document.addEventListener("api_4cs_youtube_ready", function (event) {
		window.YT = event.detail.YT;
	}, false);

	tag = document.createElement("script");
	tag.innerHTML = "var onYouTubeIframeAPIReady = " + onYouTubeIframeAPIReady.toString() + ";";
	document.head.appendChild(tag);

	$.getScript("//www.youtube.com/iframe_api", function (script, status, jqXHR) {});


	// Update check once a day
	script.update_check_interval(1000 * 60 * 60 * 24);
});




////////////////////////////////////////////////////////////////////////////////
//} /Userscript
////////////////////////////////////////////////////////////////////////////////

