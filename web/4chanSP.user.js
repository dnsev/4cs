// ==UserScript==
// @name           4chan Sound Player
// @namespace      ms11
// @description    Allows to play the posted sounds on 4chan (based on Triangle's 4chan Sound Script dev)
// @include        http://boards.4chan.org/*
// @include        https://boards.4chan.org/*
// @include        http://archive.foolz.us/*
// @include        https://archive.foolz.us/*
// @version        0.80a
// @updateURL      https://raw.github.com/dnsev/4cs/master/web/4chanSP.user.js
// ==/UserScript==

var chrome = (navigator.userAgent+'').indexOf(' Chrome/') != -1;
var archive = (document.location+'').indexOf('boards.4chan.org') == -1;

function insertAfter(referenceNode, newNode)
{
	referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}
function byClass(items, cl)
{
	for (var i = 0; i < items.length; i++)
	{
		if (items[i].classList.contains(cl))
		{
			return items[i];
		}
	}
	return null;
}

function s2ab(text)
{
	var foo = new ArrayBuffer(text.length);
	var bar = new Uint8Array(foo);
	for (var a = 0; a < text.length; a++)
	{
		bar[a] = text.charCodeAt(a);
	}
	return foo;
}

function getPostID(o)
{
	var o = o.getAttribute('id');
	if (!archive)
	{
		o = o.substr(1);
	}
	var ret = Number(o);
	if(!ret){
		ret = Number(o.split('_')[1].substr(1));
	}
	return ret;
}
function create(type, parent, attributes)
{
    var element = document.createElement(type);
    for (var attr in attributes) {
        element.setAttribute(attr, attributes[attr]);
    }
    if (parent) {
        parent.appendChild(element);
    }
    return element;
}
function sectos(sec) {
	var m = Math.floor(sec/60);
	var s = +(sec-m*60);
	return m+(s<10?":0":":")+s;
}
String.prototype.replaceAll = function(replaceTo,replaceWith) {
	return this.replace(new RegExp(replaceTo,'g'),replaceWith);
};

function toUInt32(data,offset){
	return (data[offset] | data[offset + 1] << 8 | data[offset + 2] << 16 | data[offset + 3] << 24);
}
function toUInt16(data,offset){
	return data[offset] | data[offset + 1] << 8;
}
function get_chrome(url, callback, progressCb, userState)
{
	var xhr = new XMLHttpRequest();
	xhr.open('GET', url, true);
	xhr.overrideMimeType('text/plain; charset=x-user-defined');
	xhr.responseType = 'arraybuffer';
	if(progressCb)
		xhr.onprogress = function(e){progressCb(e,userState);};
	xhr.onload = function(e) {
		if (this.status == 200)	{
			callback(this.response,userState);
		}
	};
	xhr.send();
}

function get_grease(url, callback, progressCb, userState) {
	var arg = {
		method: "GET",
		url: url,
		overrideMimeType: 'text/plain; charset=x-user-defined',
		onload: function(e)
		{
			if (e.status == 200)
			{
				var text = e.responseText;
				var foo = s2ab(text);
				callback(foo,userState);
			}
		}
	};
	if(progressCb)
		arg.onprogress = function(e){progressCb(e,userState);};
	GM_xmlhttpRequest(arg);
}
var xmlhttp = chrome ? get_chrome:get_grease;
function loadAll(file,isUrl,cb) {
	if(isUrl){
		xmlhttp(file,function(data,link) {
			loadAllWithFooter(data,link,cb,"");
		},onprogress, file);
	}else{
		for(var i = 0; i < file.length;i++){
			var reader = new FileReader();
			reader.fname = file[i].name;
			reader.onload = function() {
				loadAllWithFooter(this.result,"",cb,this.fname);
			};
			reader.readAsArrayBuffer(file[i]);
		}
	}
}

function loadAllWithFooter(raw,link,cb,local_name) {
		var data = new Uint8Array(raw);
		if (loadAllInPng(data, link, cb, local_name)) return;

		var footU = s2ab('4SPF');
		var foot8 = new Uint8Array(footU);
		var match = true;
		for(var i = 0; i < 4 ;i++){
			if(foot8[i] != data[data.length-4+i])
				match = false;
		}
		if(match) {
			var tags=[];
			var fstart = data.length - 6 - toUInt16(data,data.length-6);
			for(var i = fstart;i < data.length-6;){
				var taglen = data[i];
				i++;
				var tag = ""
				for(var j = 0; j < taglen;j++){
					tag += String.fromCharCode(data[i+j]);
				}
				i+=taglen;
				var start = toUInt32(data,i);
				i+=4;
				var end = toUInt32(data,i);
				i+=4;
				tags.push({tag:tag,start:start,end:end});
			}
			showPlayer();
			for(var i = 0; i < tags.length;i++){
				addMusic({data:raw.slice(tags[i].start,tags[i].end),tag:tags[i].tag},tags[i].tag,link);
			}
			cb();
		}else{
			loadAllFromData(raw,link,cb);
		}
}
function loadAllFromData(raw,link,cb) {
	var oggU = s2ab('OggSxx');
	var ogg8 = new Uint8Array(oggU);
	ogg8[4] = 0;
	ogg8[5] = 2;
	var data = new Uint8Array(raw);
	var sounds = [];
	var cont = true;
	var oldptr = 0;
	do{
		var ptr = 0;
		for (var i = oldptr; i < data.byteLength - 10; i++)
		{
			var match = true;
			for (var j = 0; j < ogg8.byteLength; j++)
			{
				if (data[i+j] != ogg8[j])
				{
					match = false;
					break;
				}
			}
			if (match)
			{
				ptr = i;
				break;
			}
		}
		if (ptr > oldptr)
		{
			var ofs = [-1,-1];
			var find = s2ab('[]');
			var fin8 = new Uint8Array(find);
			for (var j = ptr; j > ptr - 100; j--)
			{
				if (data[j] == fin8[0] && ofs[1] > 0)
				{
					ofs[0] = j+1;
					break;
				}
				else if (data[j] == fin8[1] && ofs[0] < 0)
				{
					ofs[1] = j-1;
				}
			}
			if (ofs[0] > 0 && ofs[1] > 0)
			{
				var tag = '';
				for (var j = ofs[0]; j <= ofs[1]; j++)
				{
					tag += String.fromCharCode(data[j]);
				}
				sounds.push({data: null,start:ptr,tag: tag});
				if(sounds.length > 1) {
					var id = sounds.length-2;
					sounds[id].data = raw.slice(sounds[id].start,ptr - sounds[id].tag.length);
				}
			}
			oldptr = ptr + 1;
		}else{
			cont = false;
		}
	}while(cont);
	if(sounds.length > 0) {
		var id = sounds.length-1;
		sounds[id].data = raw.slice(sounds[id].start);
		showPlayer();		
		for(var i = 0; i < sounds.length;i++){
			var tag = sounds[i].tag;
			addMusic({data:sounds[i].data,tag:tag},tag,link);
		}
		cb();
	}
}
function findOggWithFooter(raw,tag) {
	var tagU = s2ab(tag);
	var tag8 = new Uint8Array(tagU);
	var data = new Uint8Array(raw);
	var footU = s2ab('4SPF');
	var foot8 = new Uint8Array(footU);
	var match = true;
	for(var i = 0; i < 4 ;i++){
		if(foot8[i] != data[data.length-4+i])
			match = false;
	}
	//x y 4 S P F
	//6 5 4 3 2 1
	if(match){
		var fstart = data.length - 6 - toUInt16(data,data.length-6);
		//alert(fstart);
		for(var i = fstart; i < data.length; i++){
			var tagmatch = true;
			for (var j = 0; j < tag8.byteLength; j++)
			{
				if (data[i+j] != tag8[j])
				{
					tagmatch = false;
					break;
				}
			}
			if (!tagmatch)
			{
				continue;
			}
			i += tagU.byteLength;
			var start = toUInt32(data,i);
			i += 4;
			var end = toUInt32(data,i);
			return {data:raw.slice(start,end),tag:tag};
		}
		return findOgg(raw,tag);
	}else
		return findOgg(raw,tag);
}
function findOgg(raw, tag)
{
	var tagU = s2ab('[' + tag + ']');
	var skip = s2ab(' "\r\n');
	var oggU = s2ab('OggSxx');
	var tag8 = new Uint8Array(tagU);
	var skp8 = new Uint8Array(skip);
	var ogg8 = new Uint8Array(oggU);
ogg8[4] = 0;
ogg8[5] = 2;
var data = new Uint8Array(raw);

//... beg ..
//Change all Krni -> OggS
//Shit, i know
//Shit, i know
var ogg_header_p = new Uint8Array(s2ab('Krni'));
var ogg_header_n = new Uint8Array(s2ab('OggS'));
for (var i = 0; i < data.byteLength - 4;)
{
if (data[i++] != ogg_header_p[0])
continue;

if (data[i] != ogg_header_p[1])
continue;
++i;
if (data[i] != ogg_header_p[2])
continue;
++i;
if (data[i] != ogg_header_p[3])
continue;
++i;

data[i-4] = ogg_header_n[0];
data[i-3] = ogg_header_n[1];
data[i-2] = ogg_header_n[2];
data[i-1] = ogg_header_n[3];
}


//Repeating the above section, only checking for moot rather than Krni. 
//Being lazy, I know.

var ogg_header_p = new Uint8Array(s2ab('moot'));
var ogg_header_n = new Uint8Array(s2ab('OggS'));
for (var i = 0; i < data.byteLength - 4;)
{
if (data[i++] != ogg_header_p[0])
continue;

if (data[i] != ogg_header_p[1])
continue;
++i;
if (data[i] != ogg_header_p[2])
continue;
++i;
if (data[i] != ogg_header_p[3])
continue;
++i;

data[i-4] = ogg_header_n[0];
data[i-3] = ogg_header_n[1];
data[i-2] = ogg_header_n[2];
data[i-1] = ogg_header_n[3];
}

// ... end of Krni/moot modifications ...
var eof = skp8.byteLength + 12;
var ptr = -1;
	
	// keep comparing data to [tag] until match
	for (var i = 0; i < data.byteLength - eof; i++)
	{
		var match = true;
		// match the tag and brackets
		for (var j = 0; j < tag8.byteLength; j++)
		{
			if (data[i+j] != tag8[j])
			{
				match = false;
				break;
			}
		}
		if (!match)
		{
			continue;
		}
		i += tagU.byteLength;
		// skip whitespace and newline
		for (var j = 0; j < skp8.byteLength; j++)
		{
			if (data[i] == skp8[j])
			{
				j = -1;
				i++;
			}
		}
		// match against ogg header
		for (var j = 0; j < ogg8.byteLength; j++)
		{
			if (data[i+j] != ogg8[j])
			{
				match = false;
				break;
			}
		}
		if (!match)
		{
			continue;
		}
		ptr = i;
		break;
	}
	if (ptr < 0)
	{
		// matching against tag failed, try just the ogg header
		for (var i = 0; i < data.byteLength - eof; i++)
		{
			var match = true;
			for (var j = 0; j < ogg8.byteLength; j++)
			{
				if (data[i+j] != ogg8[j])
				{
					match = false;
					break;
				}
			}
			if (match)
			{
				ptr = i;
				break;
			}
		}
		if (ptr > 0)
		{
			var ofs = [-1,-1];
			var find = s2ab('[]');
			var fin8 = new Uint8Array(find);
			for (var j = ptr; j > ptr - 100; j--)
			{
				if (data[j] == fin8[0] && ofs[1] > 0)
				{
					ofs[0] = j+1;
					break;
				}
				else if (data[j] == fin8[1] && ofs[0] < 0)
				{
					ofs[1] = j-1;
				}
			}
			if (ofs[0] > 0 && ofs[1] > 0)
			{
				var newtag = '';
				for (var j = ofs[0]; j <= ofs[1]; j++)
				{
					newtag += String.fromCharCode(data[j]);
				}
				tag = newtag;
			}
		}
	}
	if (ptr > 0)
	{
		//find next ogg header
		//ogg8
		var end = -1;
		for (var i = (ptr+1); i < data.byteLength - eof; i++)
		{
			var match = true;
			for (var j = 0; j < ogg8.byteLength; j++)
			{
				if (data[i+j] != ogg8[j])
				{
					match = false;
					break;
				}
			}
			if (match) //find the tag before
			{
				var ofs = [-1,-1];
				var find = s2ab('[]');
				var fin8 = new Uint8Array(find);
				for (var j = i; j > i - 100; j--)
				{
					if (data[j] == fin8[0] && ofs[1] > 0)
					{
						ofs[0] = j + 1;
						break;
					}
					else if (data[j] == fin8[1] && ofs[0] < 0)
					{
						ofs[1] = j - 1;
					}
				}
				if(ofs[0] > 0) {
					i = ofs[0];
				}
				
				
				end = i;
				break;
			}
		}
		if(end>0)
			return {"data":raw.slice(ptr,end),"tag":tag};
		else
			return {"data":raw.slice(ptr),"tag":tag};
	}
}
function loadSplitSounds(arr,cb,userState){
	var data = {links:arr.slice(),sounddata:[]};
	realLoadSplitSounds(data,arr[0].realhref,arr[0].splittag,cb,userState);
}
function realLoadSplitSounds(data,url,tag,cb,userState){
	if(data.links.length < 1){
		var len = 0;
		for(var i = 0; i < data.sounddata.length;i++){
			len += data.sounddata[i].byteLength;
		}
		var raw = new ArrayBuffer(len);
		var rawa = new Uint8Array(raw);
		var offs = 0;
		for(var i = 0; i < data.sounddata.length;i++){
			var sa = new Uint8Array(data.sounddata[i]);
			rawa.set(sa,offs);
			offs+=sa.length;
		}
		showPlayer();
		if(cb)
			cb(userState);
		addMusic({data:raw,tag:tag},tag,url);
	}else{
		xmlhttp(data.links[0].realhref,function(resp){
			var sound = findOggWithFooter(resp,data.links[0].tag)
			data.sounddata.push(sound.data);
			data.links = data.links.splice(1);
			realLoadSplitSounds(data,url,tag,cb,userState);
		});
	}
}
function rehyperlink(target,second) {
	var list = target.getElementsByClassName('playerLoadAllLink');
	for(var i = 0; i < list.length;i++){
		if(list[i].rehypered) continue;
		list[i].rehypered = true;
		list[i].addEventListener('click',function(e) {
			e.preventDefault();
			e.target.innerHTML = " loading...";
			if(this.splittag){
				var arr = playerSplitImages[this.splittag];
				loadSplitSounds(arr,function(rlink){
					rlink.innerHTML = " Load all sounds";
				},this);
			}else{
				var a = null;
				if(!archive){
					var a = e.target.parentNode.parentNode.getElementsByClassName('fileThumb')[0];
				}else{
					a = byClass(e.target.parentNode.parentNode.parentNode.parentNode.getElementsByTagName('a'), 'thread_image_link');
				}
				if(a) {
					loadAll(a.href,true,function(){e.target.innerHTML = " Load all sounds"},
						function(pe){
							e.target.innerHTML = ' loading';
							if(pe.lengthComputable){
								e.target.innerHTML += '(' + ~~((pe.loaded/pe.total)*100) + '%)';
							}
					});
				}
			}
		});
	}
	var links = target.getElementsByClassName('soundlink');
	if(links.length < 1) {
		if(second) return;
		else
		setTimeout(function() {rehyperlink(target, true); },200);
	}
	var post = target.getElementsByTagName(archive ? 'article':'blockquote')[0];
	var a = null;
	var p = null;
	if (!archive) {
		p = post;
		a = byClass(target.getElementsByTagName('a'), 'fileThumb');
		if (!a) return;
	}else{
		a = byClass(post.getElementsByTagName('a'), 'thread_image_link');
		p = byClass(post.getElementsByTagName('div'), 'text');		
		if (!a || !p) return;
	}
	for(var i = 0;i < links.length;i++){
	
		var link = links[i];

		
		if(link.rehypered) continue;
		link.rehypered = true;
		
		var sp = null;
		if(sp = link.innerHTML.match(/(.*?)\.([0-9].*)/)){

			link.splittag = sp[1];
			link.splitid = sp[2];
			p.splittag = sp[1];
		}

		link.realhref = a.href;
		link.tag = link.innerHTML.replace("[","").replace("]","");
		link.addEventListener('click', function(e) {
			e.preventDefault();
			if(this.splittag){
				var arr = playerSplitImages[this.splittag];
				loadSplitSounds(arr);
			}else{
				this.innerHTML = '[loading]';
				xmlhttp(this.realhref, function(data,rlink) {
					rlink.innerHTML = '[' + rlink.tag + ']';
					showPlayer();
					addMusic(findOggWithFooter(data, rlink.tag),rlink.tag,rlink.realhref);
				},function(e,rlink){
					rlink.innerHTML = '[loading';
					if(e.lengthComputable){
						rlink.innerHTML += '(' + ~~((e.loaded/e.total)*100) + '%)';
					}
					rlink.innerHTML += ']';
				},this);
			}
		});
	}
}
function hyperlinkone(target) {
	var postname = archive ? 'article':'blockquote';
	if(target.nodeName.toLowerCase() != postname) {
		var elems = target.getElementsByTagName(postname);
		for(var i = 0; i < elems.length; i++) {
			hyperlinkone(elems[i]);
		}
	}else{
		var repeat = true;
		while (repeat) {
			repeat = false;
			var a = null;
			var p = null;
			if (!archive) {
				p = target;
				a = byClass(target.parentNode.getElementsByTagName('a'), 'fileThumb');
				if (!a) continue;
			}else{
				a = byClass(target.getElementsByTagName('a'), 'thread_image_link');
				p = byClass(target.getElementsByTagName('div'), 'text');
				
				if (!a || !p) continue;
			}
			for (var j = 0; j < p.childNodes.length; j++) {
				var match = null;
				var node = p.childNodes[j];
				if (node.nodeType != 3) {
					if(node.className != "spoiler" && node.className != 'quote') {
						continue;
					}else{
						for(var k = 0; k < node.childNodes.length; k++) {
							
							var subnode = node.childNodes[k];
							if(subnode.nodeType != 3) {continue;}
							if (!(match = subnode.nodeValue.match(/(.*)\[([^\]]+)\](.*)/))) {
								continue;
							}
							repeat = true;
							var href = a.href;
							var code = match[2];
							var link = document.createElement('a');
							link.innerHTML = '[' + code + ']';
							link.className = 'soundlink';
							//link.href = href;
							link.href = "#";
							link.realhref = href;
							link.tag = code;
							var sp = null;
							if(sp = code.match(/(.*?)\.([0-9].*)/)){
								if(!playerSplitImages.hasOwnProperty(sp[1])){
									playerSplitImages[sp[1]] = [];
								}
								
								link.splittag = sp[1];
								link.splitid = sp[2];
								playerSplitImages[sp[1]].push(link);
								p.splittag = sp[1];
							}
							
							
							addLoadAllLink(p);
							link.addEventListener('click', function(e) {
								
								e.preventDefault();

								if(link.splittag){
									var arr = playerSplitImages[link.splittag];
									loadSplitSounds(arr);
								}else{
									this.innerHTML = '[loading]';
									xmlhttp(link.realhref, function(data, rlink) {  
										rlink.innerHTML = '[' + rlink.tag + ']';
										showPlayer();
										// TODO : modify this
										//addMusic(findOggWithFooter(data, rlink.tag),rlink.tag,rlink.realhref);
										if (link.realhref.split(".").pop().toLowerCase() == "png") {
											addMusic(findOggInPng(data, rlink.tag),rlink.tag,rlink.realhref);
										}
									},function(e,rlink){
										rlink.innerHTML = '[loading';
										if(e.lengthComputable){
											rlink.innerHTML += '(' + ~~((e.loaded/e.total)*100) + '%)';
										}
										rlink.innerHTML += ']';
									},this);
								}
							});
							subnode.nodeValue = match[1];
							insertAfter(subnode, link);
							var text = document.createTextNode(match[3]);
							insertAfter(link, text);
						}
					}
				}
				else{
					if (!(match = node.nodeValue.match(/(.*)\[([^\]]+)\](.*)/))) {
						continue;
					}
					repeat = true;
					
					
					var href = a.href;
					var code = match[2];
					var link = document.createElement('a');
					link.innerHTML = '[' + code + ']';
					link.className = 'soundlink';
	
					link.href = "#";
					link.realhref = href;
					link.tag = code;
					var sp = null;
					if(sp = code.match(/(.*?)\.([0-9].*)/)){
						if(!playerSplitImages.hasOwnProperty(sp[1])){
							playerSplitImages[sp[1]] = [];
						}
						
						link.splittag = sp[1];
						link.splitid = sp[2];
						playerSplitImages[sp[1]].push(link);
						p.splittag = sp[1];
					}
					addLoadAllLink(p);
					
					link.addEventListener('click', function(e) {
						e.preventDefault();
						if(link.splittag){
							var arr = playerSplitImages[link.splittag];
							loadSplitSounds(arr);
						}else{
							this.innerHTML = '[loading]';
							var realhref = this.realhref;
							xmlhttp(this.realhref, function(data, rlink) {
								rlink.innerHTML = '[' + rlink.tag + ']';
								showPlayer();
								// TODO : Modify this
								//addMusic(findOggWithFooter(data, rlink.tag),rlink.tag,rlink.realhref);
								//addMusic(findOggInPng(data, rlink.tag),rlink.tag,rlink.realhref);
								if (realhref.split(".").pop().toLowerCase() == "png") {
									addMusic(findOggInPng(data, rlink.tag),rlink.tag,rlink.realhref);
								}
							},function(e,rlink){
								rlink.innerHTML = '[loading';
								if(e.lengthComputable){
									rlink.innerHTML += '(' + ~~((e.loaded/e.total)*100) + '%)';
								}
								rlink.innerHTML += ']';
							},this);
						}
						
					});
					node.nodeValue = match[1];
					insertAfter(node, link);
					var text = document.createTextNode(match[3]);
					insertAfter(link, text);
				}
			}
		}
	}
}


function hyperlink() {
	var posts = archive? 'article':'blockquote';
	posts = document.getElementsByTagName(posts);
	for (var i = 0; i < posts.length; i++) {
		hyperlinkone(posts[i]);
	}
}

function addLoadAllLink(post) {
	if(!post.hasAllLink){
		var to = null;
		if(!archive) {
			var id = getPostID(post);
			
			var pi = document.getElementById('f'+id);
			if(!pi && post.id.indexOf('_') > -1) {
				pi = document.getElementById(post.id.split('_')[0] + '_f'+id);
			}
			to = pi.getElementsByClassName('fileInfo')[0];
		}else{
			var head = post.parentNode.getElementsByTagName('header')[0];
			head = head.getElementsByClassName('post_data')[0];
			to = head.getElementsByClassName('post_controls')[0];
		}
		var loadAllLink = create('a',to, {"href":"#","class":"playerLoadAllLink"});
		loadAllLink.innerHTML = " Load all sounds";
		if(archive){
			loadAllLink.classList.add('btnr');
			loadAllLink.classList.add('parent');
		}
		loadAllLink.splittag = post.splittag;
		loadAllLink.addEventListener('click',function(e) {
			e.preventDefault();
			e.target.innerHTML = " loading";
			if(this.splittag){
				var arr = playerSplitImages[this.splittag];
				loadSplitSounds(arr,function(rlink){
					rlink.innerHTML = " Load all sounds";
				},this);
			}else{
				var a = null;
				if(!archive){
					var a = e.target.parentNode.parentNode.getElementsByClassName('fileThumb')[0];
				}else{
					a = byClass(e.target.parentNode.parentNode.parentNode.parentNode.getElementsByTagName('a'), 'thread_image_link');
				}
				if(a) {
					loadAll(a.href,true,function(){e.target.innerHTML = " Load all sounds"},
					function(pe){
						e.target.innerHTML = ' loading';
						if(pe.lengthComputable){
							e.target.innerHTML += '(' + ~~((pe.loaded/pe.total)*100) + '%)';
						}
					});
				}
			}
		});
		post.hasAllLink = true;
	}
}







///////////////////////////////////////////////////////////////////////////////
// Additional content
///////////////////////////////////////////////////////////////////////////////
function findOggInPng(raw, tag) {
	var ret = null;
	new DataImage(new Uint8Array(raw), function (img) {
		var reader = new DataImageReader(img);
		var r = reader.unpack();
		if (typeof(r) == typeof("")) {
			// Error
			ret = null;
		}
		else {
			// Loaded
			var found = false;
			var earliest = -1;
			var earliest_name = "";
			for (var i = 0; i < r[0].length; ++i) {
				var filename = r[0][i].split(".");
				var ext = filename.pop();
				filename = filename.join(".");
				if (ext.toLowerCase() == "ogg") {
					if (earliest < 0) {
						earliest = i;
						earliest_name = filename;
					}
					if (filename.toLowerCase() == tag.toLowerCase()) {
						found = true;
						ret = {"data":r[1][i], "tag":filename};
						break;
					}
				}
			}
			if (!found) {
				if (earliest >= 0) {
					ret = {"data":r[1][earliest], "tag":earliest_name};
				}
				else {
					ret = null;
				}
			}
		}
	});
	return ret;
}
function loadAllInPng(raw, link, cb, local_name) {
	if (link.split(".").pop().toLowerCase() != "png" && local_name.split(".").pop().toLowerCase() != "png") {
		return false;
	}
	var loadcount = 0;
	new DataImage(new Uint8Array(raw), function (img) {
		var reader = new DataImageReader(img);
		var r = reader.unpack();
		if (typeof(r) == typeof("")) {
			// Error
			loadcount = 0;
		}
		else {
			// Loaded
			var found = false;
			for (var i = 0; i < r[0].length; ++i) {
				var filename = r[0][i].split(".");
				var ext = filename.pop();
				filename = filename.join(".");
				if (ext.toLowerCase() == "ogg") {
					if (loadcount == 0) {
						showPlayer();
					}
					loadcount += 1;

					addMusic({"data":r[1][i], "tag":filename},filename,link);
				}
			}
		}
	});
	if (loadcount > 0) {
		cb();
		return true;
	}
	return false;
}



/*
 * Extracted from pdf.js
 * https://github.com/andreasgal/pdf.js
 *
 * Copyright (c) 2011 Mozilla Foundation
 *
 * Contributors: Andreas Gal <gal@mozilla.com>
 *               Chris G Jones <cjones@mozilla.com>
 *               Shaon Barman <shaon.barman@gmail.com>
 *               Vivien Nicolas <21@vingtetun.org>
 *               Justin D'Arcangelo <justindarc@gmail.com>
 *               Yury Delendik
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


  var PNG = (function() {
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

    function PNG(data) {
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





function DataImage (source_location, load_callback) {
	this.load_callback = load_callback;

	this.width = 0;
	this.height = 0;
	this.color_depth = 0;

	this.pixels = null;
	this.image = null;

	var self = this;

	if (typeof(source_location) == typeof("")) {
		PNG.load(source_location, null, function (png) {
			self.image = png;
			self.pixels = png.decodePixels();

			self.width = self.image.width;
			self.height = self.image.height;

			self.color_depth = (png.hasAlphaChannel ? 4 : 3);

			self.load_callback(self);
		});
	}
	else {
		png = new PNG(source_location);
		self.image = png;
		self.pixels = png.decodePixels();

		self.width = self.image.width;
		self.height = self.image.height;

		self.color_depth = (png.hasAlphaChannel ? 4 : 3);

		self.load_callback(self);
	}
}
DataImage.prototype.get_pixel = function (x, y) {
	x = (x + y * this.image.width) * this.color_depth;
	if (this.color_depth == 4) {
		return [ this.pixels[x] , this.pixels[x + 1] , this.pixels[x + 2] , this.pixels[x + 3] ];
	}
	else {
		return [ this.pixels[x] , this.pixels[x + 1] , this.pixels[x + 2] ];
	}
}

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
	this.pixel = null;
	this.pixel_skip = 1;
}
DataImageReader.prototype.unpack = function () {
	try {
		return this.__unpack();
	}
	catch (e) {
		return "Error extracting data; image file likely doesn't contain data";
	}
}
DataImageReader.prototype.__unpack = function () {
	//Uint8Array

	// Init
	this.x = 0;
	this.y = 0;
	this.c = 0;
	this.bit_value = 0;
	this.bit_count = 0;
	this.pixel = this.image.get_pixel(this.x, this.y);

	// Read bitmask
	this.bitmask = 1 + (this.pixel[this.c] & 0x07);
	this.value_mask = (1 << this.bitmask) - 1;
	this.pixel_mask = 0xFF - this.value_mask;
	this.next_pixel_component(1);

	// Metadata length
	var meta_length = this.__data_to_int(this.__extract_data(2));
	var meta = this.__extract_data(meta_length);

	// File count
	var file_count = this.__data_to_int(this.__extract_data(2));

	// Filename lengths and file lengths
	var filename_lengths = new Array();
	var file_sizes = new Array();
	for (var i = 0; i < file_count; ++i) {
		// Filename length
		filename_lengths.push(this.__data_to_int(this.__extract_data(2)));
		// File length
		file_sizes.push(this.__data_to_int(this.__extract_data(4)));
	}

	// Filenames
	var filenames = new Array();
	for (var i = 0; i < file_count; ++i) {
		// Filename
		var fn = this.__data_to_string(this.__extract_data(filename_lengths[i]));
		// TODO : Decode this to utf-8
		// Add to list
		filenames.push(fn);
	}

	// Sources
	var sources = new Array();
	for (var i = 0; i < file_count; ++i) {
		// Read source
		var src = this.__extract_data(file_sizes[i]);
		sources.push(src);
	}

	
	// Done
	return [ filenames , sources ];
}
DataImageReader.prototype.next_pixel_component = function (count) {
	while (count > 0) {
		count -= 1;

		this.c = (this.c + 1) % this.image.color_depth;
		if (this.c == 0) {
			this.x = (this.x + 1) % this.image.width;
			if (this.x == 0) {
				this.y = (this.y + 1) % this.image.height;
				if (this.y == 0) {
					throw "Pixel overflow";
				}
			}
			this.pixel = this.image.get_pixel(this.x, this.y);
		}
	}
}
DataImageReader.prototype.__extract_data = function (byte_length) {
	var src = new Uint8Array(byte_length);
	var j = 0;
	for (var i = this.bit_count; i < byte_length * 8; i += this.bitmask) {
		this.bit_value = this.bit_value | ((this.pixel[this.c] & this.value_mask) << this.bit_count);
		this.next_pixel_component(this.pixel_skip);
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
}
DataImageReader.prototype.__data_to_int = function (data) {
	var val = 0;
	for (var i = 0; i < data.length; ++i) {
		val = (val << 8) + data[i];
	}
	return val;
}
DataImageReader.prototype.__data_to_string = function (data) {
	var val = "";
	for (var i = 0; i < data.length; ++i) {
		val += String.fromCharCode(data[i]);
	}
	return val;
}

///////////////////////////////////////////////////////////////////////////////
// Additional content
///////////////////////////////////////////////////////////////////////////////







var lastPost = null;	// last post that was hyperlink()ed
var lastHyper = 0;		// unixtime*1000 for last hyperlink()
var isPlayer = false;
var playerDiv = null;
var playerList = null;
var playerTitle = null;
var playerTime = null;
var playerPlayer = null;
var newWindow = null;
var playerCurrentDuration = 0;
var playerMovingListItem = null;
var playerSaveData = null;
var playerSettings = null;
var playerStyle = null;

var playerListItemMenu = null;
var playerVolume = null;
var playerCurrentVolume = null;
var playerSeekbar = null;
var playerSeekbarCurrent = null;

var playerUserStyle = null;
var playerSplitImages = {};
var playerDefault = {right:0,bottom:0,shuffle:0,repeat:0,volume:1,compact:false,userCSS:{}};
var playerSettingsHeader = null;
function fixFFbug() {
	if (!chrome && !playerPlayer.paused) { 
		// Workaround for Firefox bug #583444
		try { playerCurrentDuration = playerPlayer.buffered.end(0); }
		catch(ex) { playerCurrentDuration = 0; }
	}
}
function documentMouseDown(e) {
	if(playerListMenu.parentNode) {
		var parent = e.target.parentNode;
		var hide = false;
		do{
			if(parent == playerListMenu) {
				hide = false;
				break;
			}else if(parent == document.body) {
				hide = true;
				break;
			}else{
				parent = parent.parentNode;
			}
		}while(true);
		if(hide){
			playerListMenu.parentNode.removeChild(playerListMenu);
		}
	}
	if(playerListItemMenu.parentNode) {
		var parent = e.target.parentNode;
		var hide = false;
		do{
			if(parent == playerListItemMenu) {
				hide = false;
				break;
			}else if(parent == document.body) {
				hide = true;
				break;
			}else{
				parent = parent.parentNode;
			}
		}while(true);
		if(hide){
			playerListItemMenu.parentNode.removeChild(playerListItemMenu);
		}
	}
	if(e.target == playerTitle || e.target==playerTime || e.target==playerHeader){
		e.preventDefault();
		playerHeader.down = true;
		playerHeader.oldx = e.clientX;
		playerHeader.oldy = e.clientY;
	}else if(e.target == playerSettingsHeader){
		e.preventDefault();
		playerSettingsHeader.down = true;
		playerSettingsHeader.oldx = e.clientX;
		playerSettingsHeader.oldy = e.clientY;
	}else if(e.target == playerCurrentVolume && !playerPlayer.error) {
		e.preventDefault();
		playerCurrentVolume.down = true;
		playerCurrentVolume.oldx = e.clientX;
	}else if(e.target == playerSeekbarCurrent && !playerPlayer.error) {
		e.preventDefault();
		playerSeekbarCurrent.down = true;
		playerSeekbarCurrent.oldx = e.clientX;
	}
}
function documentMouseUp(e) {
	if(playerHeader.down){
		e.preventDefault();
		playerHeader.down = false;
		putInsidePage();
	}
	if(playerSettingsHeader.down) {
		e.preventDefault();
		playerSettingsHeader.down = false;
	}
	if(playerCurrentVolume.down) {
		e.preventDefault();
		playerCurrentVolume.down = false;
	}
	if(playerSeekbarCurrent.down) {
		e.preventDefault();
		playerSeekbarCurrent.down = false;
		var cl = Number(playerSeekbarCurrent.style.left.replace("px",""));
		var max = Number(window.getComputedStyle(playerSeekbar).width.replace("px",""));
		var width = Number(window.getComputedStyle(playerSeekbarCurrent).width.replace("px",""));
		var n = cl/(max-width);
		if ((chrome?playerPlayer.duration:playerCurrentDuration) !== 0) {
					playerPlayer.currentTime = (chrome?playerPlayer.duration:playerCurrentDuration) * n;
		}		
	}
}
function documentMouseMove(e) {
	if(e.target == playerHeader || e.target == playerSettingsHeader){
		e.preventDefault();
	}
	if(playerHeader.down) {
		var cr = Number(playerDiv.style.right.replace("px",""));
		var cb = Number(playerDiv.style.bottom.replace("px",""));
		playerDiv.style.right = (cr + playerHeader.oldx - e.clientX) + "px";
		playerDiv.style.bottom = (cb + playerHeader.oldy - e.clientY) + "px";
		playerHeader.oldx = e.clientX;
		playerHeader.oldy = e.clientY;
	}
	if(playerSettingsHeader.down){
		var cr = Number(playerSettings.style.right.replace("px",""));
		var ct = Number(playerSettings.style.top.replace("px",""));
		playerSettings.style.right = (cr + (playerSettingsHeader.oldx - e.clientX)) + "px";
		playerSettings.style.top = (ct - (playerSettingsHeader.oldy - e.clientY)) + "px";
		playerSettingsHeader.oldx = e.clientX;
		playerSettingsHeader.oldy = e.clientY;
	}
	if(playerCurrentVolume.down) {
		var cl = Number(playerCurrentVolume.style.left.replace("px",""));
		var nl = (cl - (playerCurrentVolume.oldx - e.clientX));
		
		var max = Number(window.getComputedStyle(playerVolume).width.replace("px",""));
		var width = Number(window.getComputedStyle(playerCurrentVolume).width.replace("px",""));
		if(nl < 0 || nl > max-width) return;
		playerPlayer.volume = nl/(max-width);
		playerCurrentVolume.style.left = nl + "px";
		playerCurrentVolume.oldx = e.clientX;
	}
	
	if(playerSeekbarCurrent.down) {
		var cl = Number(playerSeekbarCurrent.style.left.replace("px",""));
		var nl = (cl - (playerSeekbarCurrent.oldx - e.clientX));
		
		var max = Number(window.getComputedStyle(playerSeekbar).width.replace("px",""));
		var width = Number(window.getComputedStyle(playerSeekbarCurrent).width.replace("px",""));
		if(nl < 0 || nl > max-width) return;
		playerSeekbarCurrent.style.left = nl + "px";
		playerSeekbarCurrent.oldx = e.clientX;
	}
}

function putInsidePage() {
	if(playerDiv.clientHeight + Number(playerDiv.style.bottom.replace("px","")) > window.innerHeight) {
		playerDiv.style.bottom = (window.innerHeight - playerDiv.clientHeight) + "px";
	}else if(Number(playerDiv.style.bottom.replace("px","")) < 0) {
		playerDiv.style.bottom = "0px";
	}
	if(playerDiv.clientWidth + Number(playerDiv.style.right.replace("px","")) > window.innerWidth) {
		playerDiv.style.right = (window.innerWidth - playerDiv.clientWidth) + "px";
	}else if(Number(playerDiv.style.right.replace("px","")) < 0) {
		playerDiv.style.right = "0px";
	}
}
function loadConf() {
	playerSaveData = JSON.parse(localStorage.getItem("4chanSP"));
	if(!playerSaveData) {
		playerSaveData = playerDefault;
	}else if(playerSaveData.css) {
		playerSaveData.css = undefined;
		playerSaveData.saveVer = undefined;
	}else if(playerSaveData.userCSS && (playerSaveData.userCSS.length)){
		playerSaveData.userCSS = {};
	}
	if(!playerSaveData.compact){
		playerSaveData.compact = false;
	}
}


function showPlayer() {
	if(!isPlayer) {
		
		loadConf();
		playerDiv = create('div', undefined, {"id":"playerDiv","class":"playerWindow"});
		
		playerDiv.style.right = playerSaveData.right+'px';
		playerDiv.style.bottom = playerSaveData.bottom+'px';
		
		
		playerHeader = create('div', playerDiv, {"id": "playerHeader"});
		playerTitle = create('div', playerHeader, {"id": "playerTitle"});
		playerTime = create('div', playerHeader, {"id": "playerTime"});
		playerImage = create('img', playerDiv, {"id": "playerImage"});
		
		playerControls = create('div', playerDiv, {"id": "playerControls"});
		playerVolumeSeekHeader = create('div', playerDiv, {"id": "playerVolumeSeekHeader"});
		playerVolume = create('div', playerVolumeSeekHeader, {"id": "playerVolume"});
		playerCurrentVolume = create('div',playerVolume, {"id": "playerCurrentVolume"});
	
		var scrollfunc = function(e) {
			e.preventDefault();
			var n = Number(playerCurrentVolume.style.left.replace("px",""));
			if(e.detail < 0 || e.wheelDelta > 0) {
				n+=1;
			}else if(e.detail > 0 || e.wheelDelta < 0) {
				n-=1;
			}
			
			
			var max = Number(window.getComputedStyle(playerVolume).width.replace("px",""));
			var width = Number(window.getComputedStyle(playerCurrentVolume).width.replace("px",""));
			
			if(n < 0 || n > max-width)return;
			playerCurrentVolume.style.left = n +"px";
			playerPlayer.volume=n/(max-width);
		};
		
		
		playerVolume.addEventListener("DOMMouseScroll",scrollfunc);
		playerVolume.addEventListener("mousewheel",scrollfunc);
		
		playerSeekbar = create('div', playerVolumeSeekHeader, {"id":"playerSeekbar"});
		playerSeekbarCurrent = create('div', playerSeekbar, {"id":"playerSeekbarCurrent"});
		
		//
		playerList = create('div', playerDiv, {"id":"playerList"});
		playerControls2 = create('div',playerDiv, {"id": "playerControls2"});
		playerList.addEventListener('dragover', function(e){
			e.preventDefault();
			e.dataTransfer.dropEffect = "move";
			return false;    
		});  
		playerList.addEventListener('drop', function(e) {
			e.stopPropagation();
			e.preventDefault();
			if(e.dataTransfer.files.length > 0) {
				loadAll(e.dataTransfer.files,false);
			}else{
				loadAll(e.dataTransfer.getData("text/plain"),true);
			}
		});
		playerControls2.addEventListener('dragover', function(e){
			e.preventDefault();
			e.dataTransfer.dropEffect = "move";
			return false;    
		});  
		playerControls2.addEventListener('drop', function(e) {
			e.stopPropagation();
			e.preventDefault();
			if(e.dataTransfer.files.length > 0) {
				loadAll(e.dataTransfer.files,false);
			}else{
				loadAll(e.dataTransfer.getData("text/plain"),true);
			}
		});
		playerPlayer = create('audio', playerDiv, {"id": "playerPlayer"});
		//playerCurrentVolume.style.left = (playerPlayer.volume*170) + "px";
		playerPlayer.addEventListener('ended', function() {playerPlayPause.innerHTML = ">"; nextMusic(true);});
		playerPlayer.volume = playerSaveData.volume;
		//copy from Triangle's script
		playerPlayer.addEventListener('play', function(e) {
			fixFFbug();
		});
		//end
		fixFFbug();
		playerPlayer.addEventListener('timeupdate', function(e) {
			if(!playerSeekbarCurrent.down){
			if(this.currentTime > 0){
				var max = Number(window.getComputedStyle(playerSeekbar).width.replace("px",""));
				var width = Number(window.getComputedStyle(playerSeekbarCurrent).width.replace("px",""));
				
				var x = (this.currentTime/(chrome?this.duration:playerCurrentDuration)) * (max-width);
				if(x > max-width) {
					fixFFbug();
					playerSeekbarCurrent.style.left = "0px";
					return;
				}
				playerSeekbarCurrent.style.left = x + "px";
				playerTime.innerHTML = sectos(Math.round(this.currentTime)) + "/" + sectos(Math.round(chrome?this.duration:playerCurrentDuration)) || "[unknown]";
			}
			}
		});
		
		playerPlayer.addEventListener('play', function() {playerPlayPause.innerHTML="| |";});
		playerPlayer.addEventListener('pause', function() {playerPlayPause.innerHTML=">";});
		playerRepeat = create('a', playerControls2, {"href": "#"});
		switch(playerSaveData.repeat){
			case 1: playerRepeat.innerHTML = "[RA]"; playerRepeat.title = "Repeat all"; break;
			case 2: playerRepeat.innerHTML = "[R1]"; playerRepeat.title = "Repeat one"; break;
			case 0: playerRepeat.innerHTML = "[RO]"; playerRepeat.title = "Repeat off"; break;
		}
		playerRepeat.addEventListener('click', function(e) {
			e.preventDefault();
			switch(playerSaveData.repeat){
				case 0: playerSaveData.repeat=1; playerRepeat.innerHTML = "[RA]"; playerRepeat.title = "Repeat all"; break;
				case 1: playerSaveData.repeat=2; playerRepeat.innerHTML = "[R1]"; playerRepeat.title = "Repeat one"; break;
				case 2: playerSaveData.repeat=0; playerRepeat.innerHTML = "[RO]"; playerRepeat.title = "Repeat off"; break;
			}
		});
		
		
		playerShuffle = create('a', playerControls2, {"href": "#"});
		playerShuffle.title = playerSaveData.shuffle ? "Shuffle" : "By order";
		playerShuffle.innerHTML = playerSaveData.shuffle ? "[SH]" : "[BO]";
		playerShuffle.addEventListener('click', function(e) {
			e.preventDefault();
			playerSaveData.shuffle = !playerSaveData.shuffle;
			if(playerSaveData.shuffle) {
				playerShuffle.title = "Shuffle";
				playerShuffle.innerHTML = "[SH]";
			}else{
				playerShuffle.title = "By order";
				playerShuffle.innerHTML = "[BO]";
			}
		});
		
		
		playerClose = create('a', playerDiv, {"id":"playerClose","href":"#"});
		playerClose.innerHTML="[X]";
		playerClose.addEventListener('click', function(e) {
			e.preventDefault();
			playerSaveData.right = playerDiv.style.right.replace("px","");
			playerSaveData.bottom = playerDiv.style.bottom.replace("px","");
			playerSaveData.volume = playerPlayer.volume;
			
			localStorage.setItem('4chanSP', JSON.stringify(playerSaveData));
					
			document.body.removeChild(playerDiv);
			playerDiv = null;
			isPlayer = false;
		});
		
		
	
		
		playerChangeMode = create('a', playerControls2, {"id": "playerChangeMode", "href": "#"});
		playerChangeMode.innerHTML = "[M]";
		playerChangeMode.title = "Change view";
		playerChangeMode.addEventListener('click', function(e) {e.preventDefault(); swmode();});

		
		
		playerPrev = create('a', playerControls, {"href": "#", "class":"playerControlLink"});
		playerPrev.innerHTML = "|<<";
		playerPrev.addEventListener('click', function(e) {
			e.preventDefault();
			prevMusic();
		});
		playerBackward = create('a', playerControls, {"href": "#", "class":"playerControlLink"});
		playerBackward.innerHTML = "<<";
		playerBackward.addEventListener('click', function(e) {
			e.preventDefault();
			playerPlayer.currentTime -= 5;
		}); 
		playerPlayPause = create('a', playerControls, {"href": "#", "class":"playerControlLink"});
		playerPlayPause.innerHTML = ">";
		playerPlayPause.addEventListener('click', function(e) {
			e.preventDefault();
			if(playerPlayer.paused)
				playerPlayer.play();
			else
				playerPlayer.pause();
		});
		playerForward = create('a', playerControls, {"href": "#", "class":"playerControlLink"});
		playerForward.innerHTML = ">>";
		playerForward.addEventListener('click', function(e) {
			e.preventDefault();
			playerPlayer.currentTime += 5;
		}); 
		playerNext = create('a', playerControls, {"href": "#", "class":"playerControlLink"});
		playerNext.innerHTML = ">>|";
		playerNext.addEventListener('click', function(e) {
			e.preventDefault();
			nextMusic(false);
		});
		
		playerStyleSettingsButton = create('a', playerDiv, {"id":"playerStyleSettingsButton","href":"#"});
		playerStyleSettingsButton.innerHTML="[S]";
		playerStyleSettingsButton.addEventListener('click', function(e) {
			e.preventDefault();
			if(playerSettings.style.display == "none")
				playerSettings.style.display = "block";
			else{
				playerSettings.style.display = "none";
				localStorage.setItem('4chanSP', JSON.stringify(playerSaveData));
			}
		});
		playerSettings = create('table', playerDiv, {"id":"playerSettings","class":"playerWindow"});
		playerSettings.style.right = "210px";
		playerSettings.style.top = "0px";
		playerSettings.style.display = "none";
		var tbody = create('tbody', playerSettings);
		var headerrow = create('tr', tbody);
		playerSettingsHeader = create('td', headerrow,{"colspan":2});
		playerSettingsHeader.innerHTML = "4chan Sounds Player Style Settings";
		playerSettingsHeader.style.textAlign="center";
		playerSettingsHeader.style.cursor = "move";

		var data = [{name:"Text color",format:"CSS color value",id:"LinkColor",sets:"#playerCurrentVolume, #playerSeekbarCurrent {background-color:%1} .playerWindow > * > * {color:%1 !important;} .playerWindow > * {color:%1 !important;} .playerWindow a {color:%1 !important;} .playerWindow a:visited {color:%1 !important;}"},
					{name:"Control hover color",format:"CSS color value",id:"HoverColor",sets:".playerWindow a:hover, .playerListItemTag:hover{color:%1 !important;} #playerCurrentVolume:hover, #playerSeekbarCurrent:hover {background: %1;}"},
					{name:"Background color",format: "CSS color value",id:"BGColor",sets:".playerWindow {background-color:%1 !important}"},
					{name:"Playlist size",format:"Width x Height",id:"PlaylistSize",func: function(value) {var data=value.split('x'); data[0]=data[0].trim(); data[1]=data[1].trim(); return '#playerList {'+(data[0]?'width:'+data[0]+'px;':'') + (data[1]?' height:'+data[1]+'px;}':'}');}},
					{name:"Playlist margins",format:"left,right,top,bottom", id:"PlaylistMargins", func: function(value) {var data=value.split(','); return '#playerList {'+(data[0]?'margin-left:'+data[0]+'px;':'') + (data[1]?'margin-right:'+data[1]+'px;':'') + (data[2]?'margin-top:'+data[2]+'px;':'') + (data[3]?'margin-bottom:'+data[3]+'px;':'')+'}';}},
					{name:"List item background color", format:"CSS color value", id:"ListItemBGColor",sets:".playerListItem{background-color:%1}"},
					{name:"Played list item bg color", format:"CSS color value", id:"PlayedListItemBGColor",sets:".playerListItem[playing=true]{background-color:%1}"},
					{name:"Volume slider width", id:"VolumeSliderWidth", sets:"#playerCurrentVolume{width:%1px}"},
					{name:"Seekbar slider width", id:"SeekbarCurrentWidth", sets:"#playerSeekbarCurrent{width:%1px}"}];
		for(var i = 0; i < data.length;i++){
			var tr = create('tr',tbody);
			var td = create('td', tr,{"class":"playerSettingLabel"});
			td.innerHTML = data[i].name;
			if(!data[i].sets && !data[i].func) continue;
			if(data[i].format) {
				td.style.cursor = "help";
				td.title = data[i].format;
			}
			td = create('td',tr);
			var input = create('input', td);
			input.classList.add('playerSettingsInput');
			input.id = "playerSettings"+data[i].id;
			input.realid = data[i].id;
			if(playerSaveData.userCSS && playerSaveData.userCSS[input.realid]){
				input.value = playerSaveData.userCSS[input.realid];
			}
			input.sets = data[i].sets;
			input.func = data[i].func;
			input.addEventListener('change',function(){
				updateUserCSS(this);
			});
		}
		
		
		playerListMenu = create('div', null, {"id": "playerListMenu","class":"playerWindow"});
		playerListMenuDelete = create('a', playerListMenu, {"href":"#","class":"playerListItemMenuLink"});
		playerListMenuDelete.innerHTML = "Remove all...";
		playerListMenuDelete.addEventListener('click', function(e) {
			e.preventDefault();
			if(confirm('Are you sure?')){
				var items = playerList.getElementsByTagName('li');
				while(items.length > 0){
					items[items.length-1].remove();
				}
			}
			playerListMenu.parentNode.removeChild(playerListMenu);
		});
		playerListMenuAddLocal = create('a', playerListMenu, {"class":"playerListItemMenuLink"});
		playerListMenuAddLocal.innerHTML = "Add local files...";
		playerListMenuAddLocalInput = create('input', playerListMenuAddLocal, {"type":"file","id":"playerListMenuAddLocalInput","multiple":"true"});
		playerListMenuAddLocalInput.addEventListener('change', function(e) {
			loadAll(e.target.files,false);
			playerListMenu.parentNode.removeChild(playerListMenu);
		});
		playerList.addEventListener('contextmenu', function(e) {
			if(e.target == playerList){
				e.preventDefault();
				if(playerListMenu.parentNode) playerListMenu.parentNode.removeChild(playerListMenu);
				document.body.appendChild(playerListMenu);
				playerListMenu.style.left = e.clientX + 5 + "px";
				playerListMenu.style.top = e.clientY + 5 + "px";
			}
		});
		
		playerControls2.addEventListener('contextmenu', function(e) {
			if(e.target == playerControls2){
				e.preventDefault();
				if(playerListMenu.parentNode) playerListMenu.parentNode.removeChild(playerListMenu);
				document.body.appendChild(playerListMenu);
				playerListMenu.style.left = e.clientX + 5 + "px";
				playerListMenu.style.top = e.clientY + 5 + "px";
			}
		});
		playerListItemMenu = create('div', null, {"id": "playerListItemMenu","class":"playerWindow"});
		playerListItemMenuDelete = create('a', playerListItemMenu, {"href":"#","class":"playerListItemMenuLink"});

		playerListItemMenuDelete.innerHTML = "Delete";
		playerListItemMenuDelete.addEventListener('click',function(e) {
			e.preventDefault();
			playerListItemMenu.item.remove();
			playerListItemMenu.parentNode.removeChild(playerListItemMenu);
		});

		playerListItemMenuMove = create('a', playerListItemMenu, {"href":"#","class":"playerListItemMenuLink"});
		playerListItemMenuMove.innerHTML = "Move";
		playerListItemMenuMove.addEventListener('click',function(e) {
			e.preventDefault();
			playerListItemMenu.item.move();
			playerListItemMenu.parentNode.removeChild(playerListItemMenu);
		});
		
		playerListItemMenu.save = create('a', playerListItemMenu, {"href":"#","class":"playerListItemMenuLink"});
		playerListItemMenu.save.innerHTML = "Save...";
		playerListItemMenu.save.addEventListener('click',function(e) {
			if(!chrome){
			e.preventDefault();
			window.open(this.href);
			}
		});
		
		
		
		playerHeader.down = false;
		playerSettingsHeader.down = false;
		document.addEventListener('mousedown',documentMouseDown);
		document.addEventListener('mouseup',documentMouseUp);
		document.addEventListener('mousemove',documentMouseMove);
		
		
		isPlayer = true;
		document.body.appendChild(playerDiv);
		swmode(playerSaveData.compact);
		addCSS();
		
	}
}

function swmode(tocompact) {
	if(tocompact === undefined) {
		tocompact = !playerSaveData.compact;
		playerSaveData.compact = !playerSaveData.compact;
	}
	var s = tocompact ? "none" : "block";
	playerImage.style.display = s;
	playerList.style.display = s;
	playerControls2.style.marginTop = tocompact ? "15px" : "0px";
	putInsidePage();
}
function showMoverTargets(show) {
	if(show === undefined) {
		show = true;
	}
	var mvs = document.getElementsByClassName('playerListItemMoveTarget');
	for(var i = 0; i < mvs.length;i++) {
		if(show && mvs[i].parentNode == playerMovingListItem) continue;
		mvs[i].style.display = (show ? "block" : "none");
	}
}

function addMusic(resp,tag,url) {
    data = resp.data;
	var list = playerList;
	var item = create('li',list, {"class":"playerListItem"});
	//item.innerHTML = tag;
	var tagelem = create('span',item,{"class":"playerListItemTag"});
	tagelem.innerHTML = tag;
	tagelem.title = tag;
	if(resp.tag) {
		var realtag = tag.replace(' ','');
		if(resp.tag != realtag && resp.tag != tag){
		tagelem.innerHTML = "(!) " + tag;
		tagelem.title = "'" + tag + "' was not found, playing '" + resp.tag + "' instead.";
		}
	}
	item.move = function() {
		playerMovingListItem = this;
		showMoverTargets(false);
		showMoverTargets();
	};
	item.remove = function() {
		if(this.getAttribute('playing') == "true") {
			playerPlayer.pause();
			playerPlayer.src = "";
			playerImage.src = "";
			playerTitle.innerHTML = "";
			playerTime.innerHTML = "";
			playerSeekbarCurrent.style.left = "0px";
		}
		(window.webkitURL || window.URL).revokeObjectURL(this.bloburl);
		this.parentNode.removeChild(this);
	};
	item.addEventListener('contextmenu',function(e) {
		e.preventDefault();
		if(playerListItemMenu.parentNode) playerListItemMenu.parentNode.removeChild(playerListItemMenu);
		document.body.appendChild(playerListItemMenu);
		playerListItemMenu.style.left = e.clientX + 5 + "px";
		playerListItemMenu.style.top = e.clientY + 5 + "px";
		playerListItemMenu.item = this;
		playerListItemMenu.save.href = this.bloburl;
		playerListItemMenu.save.setAttribute("download",this.tag + ".ogg");
	});
	var mover = create('div', item, {"class":"playerListItemMoveTarget"});
	mover.style.display = "none";
	var mvl = create('a', mover, {"href":"#"});
	mvl.addEventListener('click',function(e) {
		e.preventDefault();
		var li = e.target.parentNode.parentNode;
		playerMovingListItem.parentNode.removeChild(playerMovingListItem);
		insertAfter(li,playerMovingListItem);
		showMoverTargets(false);
	});
	mvl.innerHTML = "[here]";
	var blob = new Blob([data], {type: 'audio/ogg'});
	item.bloburl = (window.webkitURL || window.URL).createObjectURL(blob);
	item.tag = tag;
	item.uri = url;
	item.tagelem = tagelem;
	tagelem.addEventListener('click', function(e) {
		if(e.target.parentNode.bloburl){
			var items = list.getElementsByTagName('li');
			for(var i in items) {
				if(items[i].setAttribute)
				items[i].setAttribute("playing",false);
			}
			e.target.parentNode.setAttribute("playing",true);
			
            playerPlayer.src = e.target.parentNode.bloburl;
			playerTitle.innerHTML = e.target.parentNode.tag;
			playerTitle.title = e.target.parentNode.tag;
			playerPlayer.play();
			playerCurrentVolume.style.left = (playerPlayer.volume * 55)+"px";
			playerImage.src = e.target.parentNode.uri;
			
		}
	});
	if(playerPlayer.paused) { tagelem.click(); }
}
	
function prevMusic() {
	var items = playerList.getElementsByTagName('li');
	for(var i = 0; i < items.length;i++)
	{
		if(items[i].getAttribute("playing") == "true")
		{
			if(playerPlayer.currentTime < 3) {
				if(i === 0)
					items[items.length-1].tagelem.click();
				else
					items[i-1].tagelem.click();
				return;
			}else{
				items[i].tagelem.click();
				return;
			}
		}
	}
	if(items.length > 0) items[0].tagelem.click();
}

function nextMusic(auto) {
	var items = playerList.getElementsByTagName('li');
	for(var i = 0; i < items.length;i++)
	{
		if(items[i].getAttribute("playing") == "true")
		{
			if(auto && playerSaveData.repeat == 2){ items[i].tagelem.click(); return;}
			
			if(playerSaveData.shuffle && items.length > 1) {
			var rnd = Math.floor(Math.random()*items.length);
			while(rnd == i) {
				rnd = Math.floor(Math.random()*items.length);
			}
			items[rnd].tagelem.click(); return;
			}
			if(i == (items.length - 1)) {
				if(auto && playerSaveData.repeat === 0){ return;}
				items[0].tagelem.click();
			}
			else
				items[i+1].tagelem.click();
			return;
		}
	}
	if(items.length > 0) items[0].tagelem.click();
}
function updateUserCSS(input) {
	if(input){
		if(!playerSaveData.userCSS) {
			playerSaveData.userCSS = {};
		}
		playerSaveData.userCSS[input.realid] = input.value;
	}
	if(!playerUserStyle && playerSaveData.userCSS) {
		playerUserStyle = document.createElement('style');
		playerUserStyle.setAttribute('type', 'text/css');
		document.getElementsByTagName('head')[0].appendChild(playerUserStyle);
	}
	if(playerUserStyle){
		playerUserStyle.innerHTML = ""
		var table = document.getElementById('playerSettings');
		var elems = table.getElementsByTagName('input');
		for(var i = 0; i < elems.length;i++){
			if(elems[i].value){
				if(elems[i].sets && playerSaveData.userCSS[elems[i].realid]){
					var add = (playerSaveData.userCSS.length<1?"":" ")+elems[i].sets.replaceAll('%1',playerSaveData.userCSS[elems[i].realid]);
					playerUserStyle.innerHTML += add;
				}
				else if(elems[i].func && playerSaveData.userCSS[elems[i].realid]){
					playerUserStyle.innerHTML += (playerSaveData.userCSS.length<1?"":" ")+ elems[i].func(playerSaveData.userCSS[elems[i].realid]);
				}
			}
		}
	}
}

function addCSS() {
	if(!playerStyle){
	playerStyle = document.createElement('style');
	playerStyle.setAttribute('type', 'text/css');
	playerStyle.innerHTML ='#playerList {margin-top: 15px; width: 180px; height: 200px; overflow: auto; margin-left:10px; margin-right:10px;}'+
			'.playerWindow {font-size: 12px; line-height:15px; color: darkgrey; background: #e7e7e7; position: fixed; z-index: 20;}'+
			'#playerHeader {height: 30px; cursor: move; text-align:center; position: relative; right: 0px; top: 0px;}'+
			'#playerControls {display: block; text-align: center;}'+
			'.playerListItem {cursor:pointer;, padding-top: 1px; list-style: none;}'+
			'.playerListItemMoveTarget {width:180px; height: 10px; font-size: 10px !important; text-align: center; margin-top: -2px;}'+
			'#playerImage {max-height: 120px; max-width: 180px; display: block; margin-left: auto; margin-right: auto;}'+
			'#playerClose {top: 0px; right: 0px; position: absolute; font-size: 10px; display: block; text-align: right; z-index: 10;}'+
			'#playerStyleSettingsButton {top: 0px; left: 0px; position: absolute; font-size: 10px; display: block; text-align: right; z-index: 10;}'+
			'#playerToggleSet {top: 0px; left: 0px; position: absolute; font-size: 10px; display: block; text-align: right; z-index: 10;}'+
			'#playerChangeMode, .playerListItemDelete, .playerListItemMove {float:right;}'+
			'.playerWindow a {color: darkgray !important; text-decoration: none !important;} .playerWindow a:visited {color: darkgray !important;} .playerWindow a:hover {color: black !important;}'+
			'#playerVolume {padding-top: 7px; height: 14px; width: 60px; display:inline-block;}'+
			'#playerVolumeSeekHeader {margin-left: auto; margin-right:auto; width:180px; background:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAALQAAAAHCAYAAAChk2fpAAAAAXNSR0IArs4c6QAAAJpJREFUWMPtV0kKACEMq4N/7Bv7SudUKOKCjo5UkpvWrTGGGkQkERExc6BFEJFk18vb2lfatzR25blW53oCmkeei+0fjWl7J/9/cBJPbe6dwJMX1+JrNnbLXTw7FmXmoC8GggXcCxrYBzWLvISwLjsbu8F4IiTiU9Q1EX4pR1ByDHxeAMC1Q7devK2xS/HaLx7oc9OK9+be4NIvFNCOIPRVVS4AAAAASUVORK5CYII="); background-repeat: no-repeat;}'+
			'#playerCurrentVolume {height: 14px; width: 5px; position:relative; display:block; background: darkgrey;}'+
			'#playerSeekbar {padding-top: 7px; height: 14px; width: 120px; display:inline-block;}'+
			'#playerSeekbarCurrent {height: 14px; width: 5px; position:relative; display:block; background: darkgrey;}'+
			'#playerCurrentVolume:hover, #playerSeekbarCurrent:hover {background: black;}'+
			'.playerControlLink {margin-left: 2px; margin-right:2px;}'+	
			'.playerListItemTag:hover {color: black}'+
			'.playerListItemTag {margin-left: 4px; margin-right: 4px; display:block;}'+
			'#playerTitle {width: 160px; height:15px; overflow:hidden; margin-left:auto; margin-right:auto;}'+
			'#playerTime {width:160px; height:15px; overflow:hidden; margin-left:auto; margin-right:auto;}'+
			'#playerSettings {background: #e7e7e7; position: absolute; max-width:none;}'+
			'#playerSettings > tbody {display:block; padding: 0 10px 10px;}'+
			'#playerListMenu, #playerListItemMenu {padding: 2px 3px; position: fixed; background: #e7e7e7;}'+
			'.playerListItemMenuLink {width: 85px; height: 14px; display:block; oveflow:hidden; overflow:hidden;}'+
			'#playerListMenuAddLocalInput{-moz-transform: scale(5) translateX(-140%); opacity: 0; width: 100%;}';
	document.getElementsByTagName('head')[0].appendChild(playerStyle);
	}
	updateUserCSS();
}
hyperlink();
if(!archive){
	var MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
	if(MutationObserver) {
		var postobs = new MutationObserver(function(records) {
			for(var i = 0; i < records.length; i++) {
				var e = records[i];
				if(e.type == "childList"){
					if(e.addedNodes){
						for(var j = 0; j < e.addedNodes.length;j++) {
							var target = e.addedNodes[j];
							if(target.classList){
								if(target.classList.contains('inline')) {
									rehyperlink(target);
								}else if(target.classList.contains('postContainer')) {
									hyperlinkone(target);
								}else if(target.classList.contains('backlinkHr')) {
									rehyperlink(target.parentNode.parentNode);
								}
							}
						}
					}
				}
			}
		});
		postobs.observe(document.getElementsByClassName('board')[0],{childList:true,subtree:true,characterData:true});

	}else{
		document.getElementsByClassName('board')[0].addEventListener('DOMNodeInserted', function(e)
		{
			if(!e.target.classList) return;
			if(e.target.classList.contains('inline')){
				rehyperlink(e.target);
			}else if(e.target.classList.contains('postContainer')){
				hyperlinkone(e.target);
			}
		});
	}
	var relNode = document.getElementById('settingsWindowLink').nextSibling;
	var playerShowLink = create('a',null,{'class':"settingsWindowLinkBot"});
	var bracket = document.createTextNode('] [');
	var elem = document.getElementById('navtopright');
	elem.insertBefore(playerShowLink,relNode);
	elem.insertBefore(bracket,playerShowLink);
	playerShowLink.innerHTML = "Show player";
	playerShowLink.href = "#";
	playerShowLink.addEventListener('click',function(e) {
		e.preventDefault();
		showPlayer();
	});

}



