// ==UserScript==
// @name           4chan Sound Player
// @namespace      ms11
// @description    Allows to play the posted sounds on 4chan (based on Triangle's 4chan Sound Script dev).  Modified version of script at http://ms11.github.com/4chanSoundPlayer/ adding support for Cornelia format, masking of sound data, etc.
// @include        http://boards.4chan.org/*
// @include        https://boards.4chan.org/*
// @include        http://archive.foolz.us/*
// @include        https://archive.foolz.us/*
// @grant          GM_xmlhttpRequest
// @require        https://raw.github.com/dnsev/4cs/master/web/zlib.js
// @require        https://raw.github.com/dnsev/4cs/master/web/png.js
// @version        0.80c
// @updateURL      https://raw.github.com/dnsev/4cs/master/web/4cs.user.js
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
        if (this.status == 200) {
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
    if (cb === undefined) cb = function() {};
    if(isUrl){
        xmlhttp(file,function(data,link) {
            loadAllWithFooter(data,link,cb);
        },onprogress, file);
    }else{
        for(var i = 0; i < file.length;i++){
            var reader = new FileReader();
            reader.onload = function() {
                loadAllWithFooter(this.result,"",cb);
            };
            reader.readAsArrayBuffer(file[i]);
        }
    }
}

function loadAllWithFooter(raw,link,cb) {
        var data = new Uint8Array(raw);
///////////////////////////////////////////////////////////////////////////////
		if (loadAllInPng(data, link, cb, local_name)) return;
///////////////////////////////////////////////////////////////////////////////
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
    unmask(data);
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
    } else {
        loadAllCornelia(raw,link,cb);
    }
}
function findOggWithFooter(raw,tag,cb) {
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
            cb({data:raw.slice(start,end),tag:tag});
        }
        findOgg(raw,tag,cb);
    }else
        findOgg(raw,tag,cb);
}

function findOgg(raw, tag, cb)
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
    unmask(data);
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
            cb({"data":raw.slice(ptr,end),"tag":tag});
        else
            cb({"data":raw.slice(ptr),"tag":tag});
    } else {
        findOggCornelia(raw, tag, cb);
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
            findOggWithFooter(resp,data.links[0].tag, function(sound) {
                data.sounddata.push(sound.data);
                data.links = data.links.splice(1);
                realLoadSplitSounds(data,url,tag,cb,userState);
            });
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
                    findOggWithFooter(data, rlink.tag, function(sound) {
                        addMusic(sound,rlink.tag,rlink.realhref);
                    });
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
///////////////////////////////////////////////////////////////////////////////
										var png_sound = null;
										if (link.realhref.split(".").pop().toLowerCase() == "png" && (png_sound = findOggInPng(data, rlink.tag))) {
											addMusic(png_sound,rlink.tag,rlink.realhref);
										}
										else {
											findOggWithFooter(data, rlink.tag, function(sound) {
												addMusic(sound,rlink.tag,rlink.realhref);
											});
										}
///////////////////////////////////////////////////////////////////////////////
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
                }else{
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
                            xmlhttp(this.realhref, function(data, rlink) {
                                rlink.innerHTML = '[' + rlink.tag + ']';
                                showPlayer();
///////////////////////////////////////////////////////////////////////////////
								var png_sound = null;
								if (rlink.realhref.split(".").pop().toLowerCase() == "png" && (png_sound = findOggInPng(data, rlink.tag))) {
									addMusic(png_sound,rlink.tag,rlink.realhref);
								}
								else {
									findOggWithFooter(data, rlink.tag, function(sound) {
										addMusic(sound,rlink.tag,rlink.realhref);
									});
								}
///////////////////////////////////////////////////////////////////////////////
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
// I do not take credit for any of the other (sloppy) code

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
		if (typeof(cb) == "function") cb();
		return true;
	}
	return false;
}


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
DataImage.prototype.get_pixel = function (x, y, c) {
	return this.pixels[(x + y * this.image.width) * this.color_depth + c];
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
DataImageReader.prototype.unpack = function () {
	try {
		return this.__unpack();
	}
	catch (e) {
		return "Error extracting data; image file likely doesn't contain data";
	}
}
DataImageReader.prototype.__unpack = function () {
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
	if (metadata) {
		var meta_length = this.__data_to_int(this.__extract_data(2));
		var meta = this.__extract_data(meta_length);
	}

	// File count
	var file_count = this.__data_to_int(this.__extract_data(2));

	// Filename lengths and file lengths
	var filename_lengths = new Array();
	var file_sizes = new Array();
	var v;
	var total_size = 0;
	var size_limit;
	for (var i = 0; i < file_count; ++i) {
		// Filename length
		v = this.__data_to_int(this.__extract_data(2));
		filename_lengths.push(v);
		total_size += v;
		// File length
		v = this.__data_to_int(this.__extract_data(4));
		file_sizes.push(v);
		total_size += v;

		// Error checking
		size_limit = Math.ceil(((((this.image.width * (this.image.height - this.y) - this.x) * this.channels) - this.c) * this.bitmask) / 8);
		if (total_size > size_limit) {
			throw "Data overflow";
		}
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
	this.hashmasking = false;
	this.hashmask_value = null;
	return [ filenames , sources ];
}
DataImageReader.prototype.next_pixel_component = function (count) {
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
}
DataImageReader.prototype.__extract_data = function (byte_length) {
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
DataImageReader.prototype.__read_pixel = function (value_mask) {
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
}
DataImageReader.prototype.__complete_pixel = function () {
	if (this.bit_count > 0) {
		this.bit_count = 0;
		this.bit_value = 0;
	}
}
DataImageReader.prototype.__init_hashmask = function () {
	this.hashmasking = true;
	this.hashmask_length = 32 * 8;
	this.hashmask_index = 0;
	this.hashmask_value = new Uint8Array(this.hashmask_length / 8);
	for (var i = 0; i < this.hashmask_length / 8; ++i) {
		this.hashmask_value[i] = (1 << ((i % 8) + 1)) - 1;
	}
	this.__calculate_hashmask();
	this.hashmask_index = 0;
}
DataImageReader.prototype.__calculate_hashmask = function () {
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
}
DataImageReader.prototype.__update_hashmask = function (value, bits) {
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
}
DataImageReader.prototype.__decode_hashmask = function (value, bits) {
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

///////////////////////////////////////////////////////////////////////////////
// Additional content
///////////////////////////////////////////////////////////////////////////////









var lastPost = null;    // last post that was hyperlink()ed
var lastHyper = 0;      // unixtime*1000 for last hyperlink()
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
        // Workaround for Firefox bug #583444 [it's fixed in 19]
        try { playerCurrentDuration = playerPlayer.buffered.end(0); }
        catch(ex) { playerCurrentDuration = 0; }
    }
}
function documentMouseDown(e) {
    if(playerListMenu.parentNode) {
        var parent = e.target.parentNode;
        var hide = false;
        do{
            if(parent === playerListMenu) {
                hide = false;
                break;
            }else if(parent === document.body) {
                hide = true;
                break;
            }else{
                parent = parent.parentNode;
            }
        }while( true );
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
        setConf("right",playerDiv.style.right.replace("px",""));
        setConf("bottom",playerDiv.style.bottom.replace("px",""));
    }
    if(playerSettingsHeader.down) {
        e.preventDefault();
        playerSettingsHeader.down = false;
    }
    if(playerCurrentVolume.down) {
        e.preventDefault();
        playerCurrentVolume.down = false;
        setConf("volume",playerPlayer.volume);
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
function setConf(name,value) {
    playerSaveData[name] = value;
    localStorage.setItem('4chanSP', JSON.stringify(playerSaveData));
}
function loadConf() {
    playerSaveData = JSON.parse(localStorage.getItem("4chanSP")||'null');
    if(!playerSaveData) {
        playerSaveData = playerDefault;
    }else if(playerSaveData.css) {
        setConf("css",undefined);
        setConf("saveVer",undefined);
    }else if(playerSaveData.userCSS && (playerSaveData.userCSS.length)){
        setConf("userCSS",{});
    }
    if(!playerSaveData.compact){
        setConf("compact",false);
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
        playerImageDiv = create('div', playerDiv, {"id": "playerImageDiv"});
        
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
                case 0: setConf("repeat",1); playerRepeat.innerHTML = "[RA]"; playerRepeat.title = "Repeat all"; break;
                case 1: setConf("repeat",2); playerRepeat.innerHTML = "[R1]"; playerRepeat.title = "Repeat one"; break;
                case 2: setConf("repeat",0); playerRepeat.innerHTML = "[RO]"; playerRepeat.title = "Repeat off"; break;
            }
        });
        
        
        playerShuffle = create('a', playerControls2, {"href": "#"});
        playerShuffle.title = playerSaveData.shuffle ? "Shuffle" : "By order";
        playerShuffle.innerHTML = playerSaveData.shuffle ? "[SH]" : "[BO]";
        playerShuffle.addEventListener('click', function(e) {
            e.preventDefault();
            setConf("shuffle",!playerSaveData.shuffle);
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
            
            //localStorage.setItem('4chanSP', JSON.stringify(playerSaveData));
                    
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
        addCSS();
        swmode(playerSaveData.compact);
        
    }
}

function swmode(tocompact) {
    if(tocompact === undefined) {
        tocompact = !playerSaveData.compact;
        playerSaveData.compact = !playerSaveData.compact;
    }
    var s = tocompact ? "none" : "block";
    playerImageDiv.style.display = s;
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
            playerImageDiv.innerHTML = "";
            playerTitle.innerHTML = "";
            playerTime.innerHTML = "";
            playerSeekbarCurrent.style.left = "0px";
        }
        (window.webkitURL || window.URL).revokeObjectURL(this.bloburl);
        if (/^blob:/.test(this.img.src)) (window.webkitURL || window.URL).revokeObjectURL(this.img.src);
        this.parentNode.removeChild(this);
    };
    item.addEventListener('contextmenu',function(e) {
        e.preventDefault();
        if(playerListItemMenu.parentNode)
            playerListItemMenu.parentNode.removeChild(playerListItemMenu);

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
    var blob = new Blob([data],{type: 'audio/ogg'});
    item.bloburl = (window.webkitURL || window.URL).createObjectURL(blob);
    item.tag = tag;
    item.img = resp.img || create('img', null, {"id": "playerImage", "src": url});
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
            playerImageDiv.innerHTML = "";
            playerImageDiv.appendChild(e.target.parentNode.img);
            
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
            if(auto && playerSaveData.repeat == 2)
                items[i].tagelem.click(); return;
            
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
        playerUserStyle.innerHTML = "";
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
            '.playerListItemMenuLink {width: 85px; height: 14px; display:block; overflow:hidden; overflow:hidden;}'+
            '#playerListMenuAddLocalInput{-moz-transform: scale(5) translateX(-140%); opacity: 0; width: 100%;}';
    document.getElementsByTagName('head')[0].appendChild(playerStyle);
    }
    updateUserCSS();
}

// Unmasking of appended data (either Krni/moot replacement or LCG)
function unmask(data) {
    var head = [new Uint8Array(s2ab("OggS")), new Uint8Array(s2ab("Krni")), new Uint8Array(s2ab("moot"))];
    var state = 0;
    for (var i = 0; i < data.length - 4; i++) {
        state = (1664525 * state + 1013904223) & 0xFFFFFFFF;
        var mask = state >>> 24;
        state += (data[i] ^ mask);
        if (data[i] == head[0][0] || data[i] == head[1][0] || data[i] == head[2][0]) {
            for (var k = 0; k < 3; k++) {
                var matches = true;
                for (var j = 0; j < 4; j++) {
                    if (data[i+j] != head[k][j]) {
                        matches = false;
                        break;
                    }
                }
                if (matches) {
                    if (k == 0) {
                        return;
                    } else {
                        replaceHeader(data, head[k], head[0], i);
                        return;
                    }
                }
            }
        } else if ((data[i] ^ mask) == head[0][0]) {
            var state2 = state;
            var matches = true;
            for (var j = 1; j < 4; j++) {
                state2 = (1664525 * state2 + 1013904223) & 0xFFFFFFFF;
                var mask2 = state2 >>> 24;
                state2 += (data[i+j] ^ mask2);
                if ((data[i+j] ^ mask2) != head[0][j]) {
                    matches = false;
                    break;
                }
            }
            if (matches) {
                unmaskLCG(data);
                return;
            }
        }
    }
}

function replaceHeader(data, oldh, newh, i) {
    for (; i < data.length - 4; i++) {
        if (data[i] == oldh[0]) {
            var matches = true;
            for (var j = 1; j < 4; j++) {
                if (data[i+j] != oldh[j]) {
                    matches = false;
                    break;
                }
            }
            if (matches) {
                for (var j = 0; j < 4; j++) {
                    data[i+j] = newh[j];
                }
            }
        }
    }
}

function unmaskLCG(data) {
    var state = 0;
    for (var i = 0; i < data.length; i++) {
        state = (1664525 * state + 1013904223) & 0xFFFFFFFF;
        var mask = state >>> 24;
        data[i] = data[i] ^ mask;
        state += data[i];
    }
}

// Glue for Cornelia
var IMAGE_TYPES = {"gif": "image/gif", "jpg": "image/jpeg", "jpeg": "image/jpeg", "png": "image/png"};

function findAllOggCornelia(raw, cb) {
    var pngData = new Uint8Array(raw);
    var pngMagic = [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a];
    for (var i = 0; i < pngMagic.length; i++) {
        if (!(i < pngData.length && pngData[i] == pngMagic[i])) return;
    }
    extract7z(pngData, function(data, can, firstRow) {
        if (data == null) return;
        var files = [];
        try {
            parse7z(data, files);
        } catch(e) {
            return;
        }
        var imgDefault = cropCornelia(can, firstRow);
        cb(new SoundsArchive(files, imgDefault));
    });
}

function cropCornelia(can, firstRow) {
    return function() {
        var img;
        if (firstRow != 0) {
            img = document.createElement("canvas");
            img.width = can.width;
            img.height = firstRow;
            img.getContext("2d").drawImage(can, 0, 0, can.width, firstRow, 0, 0, can.width, firstRow);
        } else {
            img = can;
        }
        img.id = "playerImage";
        return img;
    };
}

function blobImage(data, type) {
    return function() {
        var blob = new Blob([data], {type: type});
        var img = new Image();
        img.id = "playerImage";
        img.src = URL.createObjectURL(blob);
        return img;
    };
}

function SoundsArchive(files, imgDefault) {
    this.files = files;
    this.imgs = {};
    this.sounds = [];
    for (var i = 0; i < files.length; i++) {
        var tagImg = files[i].Name.match(/^(.*)\.(gif|jpe?g|png)$/i);
        if (tagImg) {
            var img = blobImage(files[i].Data, IMAGE_TYPES[tagImg[2].toLowerCase()]);
            this.imgDefault = this.imgDefault || img;
            this.imgs[tagImg[1]] = img;
        }
        var tag = files[i].Name.match(/^(.*)\.og[ag]$/i);
        if (tag) {
            this.sounds.push({data: files[i].Data, tag: tag[1]});
        }
    }
    this.imgDefault = this.imgDefault || imgDefault;
}

SoundsArchive.prototype.getImg = function(tags) {
    for (var i = 0; i < tags.length; i++) {
        if (tags[i] in this.imgs) return this.imgs[tags[i]]();
    }
    if (typeof(this.imgDefault) == "function") this.imgDefault = this.imgDefault();
    return this.imgDefault;
}

SoundsArchive.prototype.getSound = function(tag) {
    for (var i = 0; i < this.sounds.length; i++) {
        if (this.sounds[i].tag == tag) {
            this.sounds[i].img = this.getImg([this.sounds[i].tag, tag]);
            return this.sounds[i];
        }
    }
    this.sounds[0].img = this.getImg([this.sounds[0].tag, tag]);
    return this.sounds[0];
}

function findOggCornelia(raw, tag, cb) {
    findAllOggCornelia(raw, function(sa) {
        if (sa.sounds.length > 0) cb(sa.getSound(tag));
    });
}

function loadAllCornelia(raw, link, cb) {
    findAllOggCornelia(raw, function(sa) {
        if (sa.sounds.length > 0) {
            showPlayer();
            for (var i = 0; i < sa.sounds.length; i++) {
                sa.sounds[i].img = sa.getImg([sa.sounds[i].tag]);
                addMusic(sa.sounds[i], sa.sounds[i].tag, link);
            }
            cb();
        }
    });
}

// Cornelia extraction code
var MAGIC_7Z = "7z\xBC\xAF\x27\x1C";

function parse7z(data, files, headers) {
    if (files == undefined) files = [];
    if (headers == undefined) headers = {};

    var kNames =
        "End Header ArchiveProperties AdditionalStreamsInfo MainStreamsInfo FilesInfo PackInfo UnPackInfo "
        + "SubStreamsInfo Size CRC Folder CodersUnPackSize NumUnPackStream EmptyStream EmptyFile "
        + "Anti Names CTime ATime MTime Attributes Comment EncodedHeader StartPos Dummy";
    kNames = kNames.split(" ");
    var k = {};
    for (var i = 0; i < kNames.length; i++) k[kNames[i]] = i;

    var pos = 0;
    var nBits = 0;
    var bits = 0;

    function ParseError(message) {
        this.name = "ParseError";
        this.message = message;
        this.pos = pos;
    }
    ParseError.prototype = new Error();
    ParseError.prototype.constructor = ParseError;

    function readN(f, n) {
        var x = [];
        for (var i = 0; i < n; i++) x.push(f());
        return x;
    }

    function nextByte() {
        if (pos >= data.length) throw new ParseError("passed end of file");
        return data[pos++];
    }

    function nextBit() {
        if (nBits == 0) {
            bits = nextByte();
            nBits = 8;
        }
        nBits -= 1;
        var b = (bits >> nBits) & 1;
        return b;
    }

    function nextInt(len) {
        var n = 0;
        var x = 1;
        for (var i = 0; i < len; i++) {
            n += nextByte() * x;
            x *= 256;
        }
        if (n > (1<<30) * (1<<23)) throw new ParseError("integer overflow");
        return n;
    }

    function nextInt7z() {
        var b0 = nextByte();
        var thresh = 128;
        var n = 0;
        var x = 1;
        while (b0 >= thresh && thresh > 0) {
            n += nextByte() * x;
            x *= 256;
            b0 -= thresh;
            thresh >>= 1;
        }
        n += b0 * x;
        if (n > (1<<30) * (1<<23)) throw new ParseError("integer overflow");
        return n;
    }

    function nextBinString(len) {
        var s = "";
        for (var i = 0; i < len; i++) {
            s += String.fromCharCode(nextByte());
        }
        return s;
    }

    function ArchiveProperties() {
        var x = {};
        while (true) {
            var ID = nextByte();
            if (ID == 0) return x;
            var n = nextInt7z();
            x["Property"+ID] = readN(nextByte, n);
        }
    }

    function Digests(NumStreams) {
        var x = [];
        var AllAreDefined = nextByte();
        if (!AllAreDefined) var Defined = readN(nextBit, NumStreams);
        for (var i = 0; i < NumStreams; i++) {
            if (AllAreDefined || Defined[i]) x[i] = nextInt(4);
        }
        return x;
    }

    function PackInfo() {
        var x = [];
        var Pos = 32 + nextInt7z();
        var NumStreams = nextInt7z();
        for (var i = 0; i < NumStreams; i++) x.push({});
        if (NumStreams >= 1) x[0].Start = Pos;

        var ID = nextByte();
        if (ID == k.Size) {
            for (var i = 0; i < NumStreams; i++) {
                x[i].Start = Pos;
                x[i].Size = nextInt7z();
                Pos += x[i].Size;
            }
            ID = nextByte();
        }
        if (ID == k.CRC) {
            for (var i = 0; i < NumStreams; i++) x[i].Digest = nextInt7z();
            ID = nextByte();
        }
        if (ID != 0) throw new ParseError("unexpected block id " + ID);

        return x;
    }

    function Folder() {
        var x = {}

        var NumCoders = nextInt7z();
        x.Coders = [];
        x.NumInStreams = 0;
        x.NumOutStreams = 0;
        for (var i = 0; i < NumCoders; i++) {
            var y = {};
            var b = nextByte();
            var CodecIdSize = b & 0xF;
            var IsComplexCoder = b & 0x10;
            var ThereAreAttributes = b & 0x20;
            var AlternativeMethods = b & 0x80;
            if (AlternativeMethods) throw new ParseError("not supported");
            y.CodecId = nextBinString(CodecIdSize);
            if (IsComplexCoder) {
                y.NumInStreams = nextInt7z();
                y.NumOutStreams = nextInt7z();
            } else {
                y.NumInStreams = 1;
                y.NumOutStreams = 1;
            }
            x.NumInStreams += y.NumInStreams;
            x.NumOutStreams += y.NumOutStreams;
            if (ThereAreAttributes) {
                var PropertiesSize = nextInt7z();
                y.Properties = readN(nextByte, PropertiesSize);
            }
            x.Coders.push(y);
        }

        var NumBindPairs = x.NumOutStreams - 1;
        x.BindInStream = []
        x.BindOutStream = []
        for (var i = 0; i < NumBindPairs; i++) {
            var InIndex = nextInt7z();
            var OutIndex = nextInt7z();
            x.BindInStream[OutIndex] = InIndex;
            x.BindOutStream[InIndex] = OutIndex;
        }
        
        var NumPackStreams = x.NumInStreams - NumBindPairs;
        if (NumPackStreams == 1) {
            for (var i = 0; i < x.NumInStreams; i++) {
                if (x.BindOutStream[i] == undefined) x.PackStreams = [i];
            }
        } else {
            x.PackStreams = readN(nextInt7z, NumPackStreams);
        }

        return x;
    }

    function CodersInfo(Folders) {
        var ID = nextByte();

        if (ID != k.Folder) throw new ParseError("unexpected block id " + ID);
        var NumFolders = nextInt7z();
        var External = nextByte();
        if (External) throw new ParseError("not supported");
        for (var i = 0; i < NumFolders; i++) {
            Folders.push(Folder());
        }
        ID = nextByte();

        if (ID != k.CodersUnPackSize) throw new ParseError("unexpected block id " + ID);
        for (var i = 0; i < NumFolders; i++) {
            Folders[i].OutSizes = readN(nextInt7z, Folders[i].NumOutStreams);
            for (var j = 0; j < Folders[i].NumOutStreams; j++) {
                if (Folders[i].BindInStream[j] == undefined) {
                    Folders[i].UnPackSize = Folders[i].OutSizes[j];
                }
            }
        }
        ID = nextByte();

        if (ID == k.CRC) {
            var UnPackDigests = Digests(NumFolders);
            for (var i = 0; i < NumFolders; i++) {
                if (i in UnPackDigests) Folders[i].UnPackDigest = UnPackDigests[i];
            }
            ID = nextByte();
        }

        if (ID != 0) throw new ParseError("unexpected block id " + ID);
    }

    function SubStreamsInfo(Folders, SubStreams, NoBlock) {
        var ID = NoBlock ? 0 : nextByte();

        if (ID == k.NumUnPackStream) {
            for (var i = 0; i < Folders.length; i++) Folders[i].NumSubStreams = nextInt7z();
            ID = nextByte();
        } else {
            for (var i = 0; i < Folders.length; i++) Folders[i].NumSubStreams = 1;
        }
        for (var i = 0; i < Folders.length; i++) {
            for (var j = 0; j < Folders[i].NumSubStreams; j++) SubStreams.push({});
        }

        if (ID == k.Size) {
            var iSubStream = 0;
            for (var i = 0; i < Folders.length; i++) {
                if (Folders[i].NumSubStreams != 0) {
                    var SumSizes = 0;
                    for (var j = 0; j < Folders[i].NumSubStreams - 1; j++) {
                        var n = nextInt7z();
                        SubStreams[iSubStream++].Size = n;
                        SumSizes += n;
                    }
                    SubStreams[iSubStream++].Size = Folders[i].UnPackSize - SumSizes;
                }
            }
            ID = nextByte();
        } else {
            var iSubStream = 0;
            for (var i = 0; i < Folders.length; i++) {
                if (Folders[i].NumSubStreams == 1) {
                    SubStreams[iSubStream].Size = Folders[i].UnPackSize;
                }
                iSubStream += Folders[i].NumSubStreams;
            }
        }

        if (ID == k.CRC) {
            var NumUnknownDigests = 0;
            for (var i = 0; i < Folders.length; i++) {
                if (!(Folders[i].NumSubStreams == 1 && Folders[i].UnPackDigest != undefined)) {
                    NumUnknownDigests += Folders[i].NumSubStreams;
                }
            }
            var UnknownDigests = Digests(NumUnknownDigests);
            var iDigest = 0;
            iSubStream = 0;
            for (var i = 0; i < Folders.length; i++) {
                if (Folders[i].NumSubStreams == 1 && Folders[i].UnPackDigest != undefined) {
                    SubStreams[iSubStream++].Digest = Folders[i].UnPackDigest;
                } else {
                    for (var j = 0; j < Folders[i].NumSubStreams; j++) {
                        if (iDigest in UnknownDigests) {
                            SubStreams[iSubStream++].Digest = UnknownDigests[iDigest++];
                        }
                    }
                }
            }
            ID = nextByte();
        }

        if (ID != 0) throw new ParseError("unexpected block id " + ID);
    }

    function StreamsInfo(x, NoBlock) {
        var ID = NoBlock ? 0 : nextByte();

        if (ID == k.PackInfo) {
            x.PackStreams = PackInfo();
            ID = nextByte();
        } else {
            x.PackStreams = [];
        }

        x.Folders = [];
        if (ID == k.UnPackInfo) {
            CodersInfo(x.Folders);
            ID = nextByte();
        }

        x.SubStreams = [];
        if (ID == k.SubStreamsInfo) {
            SubStreamsInfo(x.Folders, x.SubStreams);
            ID = nextByte();
        } else {
            SubStreamsInfo(x.Folders, x.SubStreams, true);
        }

        if (ID != 0) throw new ParseError("unexpected block id " + ID);
    }

    function FilesInfo() {
        var x = {};
        x.NumFiles = nextInt7z();
        x.Names = [];
        x.EmptyStream = [];
        while (true) {
            var ID = nextByte();
            if (ID == 0) return x;
            var PropertySize = nextInt7z();
            if (ID == k.Names && PropertySize > 1) {
                var External = nextByte();
                if (External) throw new ParseError("not supported");
                for (var i = 0; i < x.NumFiles; i++) {
                    var s = "";
                    while (true) {
                        var c = nextInt(2);
                        if (c == 0) break;
                        s += String.fromCharCode(c);
                    }
                    x.Names.push(s);
                }
            } else if (ID == k.EmptyStream) {
                x.EmptyStream = readN(nextBit, x.NumFiles);
            } else {
                x[kNames[ID] || ("Property"+ID)] = readN(nextByte, PropertySize);
            }
        }
    }

    if (nextBinString(6) != MAGIC_7Z) throw new Error ("not a 7z file");
    headers.MajorVersion = nextByte();
    headers.MinorVersion = nextByte();
    headers.StartHeaderCRC = nextInt(4);
    headers.NextHeaderOffset = nextInt(8);
    headers.NextHeaderSize = nextInt(8);
    headers.NextHeaderCRC = nextInt(4);
    headers.FullSize = 32 + headers.NextHeaderOffset + headers.NextHeaderSize;
    headers.SplitArchive = (data.length < headers.FullSize);
    if (headers.SplitArchive) return;

    pos = 32 + headers.NextHeaderOffset;
    var ID = nextByte();
    if (ID == k.EncodedHeader) throw new ParseError("not supported");
    if (ID != k.Header) throw new ParseError("unexpected block id " + ID);

    ID = nextByte();
    if (ID == k.ArchiveProperties) {
        headers.ArchiveProperties = ArchiveProperties();
        ID = nextByte();
    }
    if (ID == k.AdditionalStreamsInfo) {
        headers.AdditionalStreamsInfo = {};
        StreamsInfo(headers.AdditionalStreamsInfo);
        ID = nextByte();
    }
    if (ID == k.MainStreamsInfo) {
        StreamsInfo(headers);
        ID = nextByte();
    } else {
        StreamsInfo(headers, true);
    }
    if (ID == k.FilesInfo) {
        headers.FilesInfo = FilesInfo();
        ID = nextByte();
    }
    if (ID != 0) throw new ParseError("unexpected block id " + ID);

    var iPackStream = 0;
    var iSubStream = 0;
    for (var i = 0; i < headers.Folders.length; i++) {
        if (
            headers.Folders[i].Coders.length == 1
            && headers.Folders[i].Coders[0].CodecId == "\x00"
            && headers.Folders[i].NumInStreams == 1
            && headers.Folders[i].NumOutStreams == 1
        ) {
            var Pos = headers.PackStreams[iPackStream].Start;
            for (var j = 0; j < headers.Folders[i].NumSubStreams; j++) {
                if (Pos != undefined) {
                    headers.SubStreams[iSubStream].Start = Pos;
                    if (headers.SubStreams[iSubStream].Size != undefined) {
                        Pos += headers.SubStreams[iSubStream].Size;
                    } else {
                        Pos = undefined;
                    }
                }
                iSubStream++;
            }
        }
        iPackStream += headers.Folders[i].PackStreams.length;
    }

    if (headers.FilesInfo != undefined) {
        var iSubStream = 0;
        for (var i = 0; i < headers.FilesInfo.NumFiles; i++) {
            files[i] = {};
            files[i].Name = headers.FilesInfo.Names[i];
            files[i].Empty = headers.FilesInfo.EmptyStream[i];
            if (!files[i].Empty) {
                files[i].Start = headers.SubStreams[iSubStream].Start;
                files[i].Size = headers.SubStreams[iSubStream].Size;
                files[i].Digest = headers.SubStreams[iSubStream].Digest;
                if (files[i].Start != undefined && files[i].Size != undefined) {
                    files[i].Data = data.subarray(files[i].Start, files[i].Start + files[i].Size);
                }
                iSubStream++;
            }
        }
    }
}

function BMPdata(ctx) {
    this.data = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height).data;
    this.width = ctx.canvas.width;
    this.height = ctx.canvas.height;
    this.rowSize = Math.ceil(ctx.canvas.width * 3 / 4) * 4;
}

BMPdata.prototype.slice = function(istart, iend) {
    var row = this.height - 1 - Math.floor(istart / this.rowSize);
    var col = Math.floor((istart % this.rowSize) / 3);
    var ch = (istart % this.rowSize) % 3;
    var a = new Uint8Array(iend - istart);
    var i = 0;
    while (row >= 0) {
        while (3*col + ch < this.rowSize) {
            a[i++] = (col < this.width) ? this.data[4*this.width*row + 4*col + 2 - ch] : 0;
            if (i >= iend - istart) return a;
            ch++;
            if (ch >= 3) {
                ch = 0;
                col++;
            }
        }
        col = 0;
        ch = 0;
        row--;
    }
    return a;
}

BMPdata.prototype.indexOf = function(s) {
    var row = this.height - 1;
    var col = 0;
    var ch = 0;
    var x = "";
    var offset = 0;
    while (row >= 0) {
        offset += x.length;
        x = x.substring(x.length - s.length + 1);
        offset -= x.length;
        while (3*col + ch < this.rowSize) {
            x += String.fromCharCode((col < this.width) ? this.data[4*this.width*row + 4*col + 2 - ch] : 0);
            ch++;
            if (ch >= 3) {
                ch = 0;
                col++;
            }
        }
        var i = x.indexOf(s);
        if (i != -1) return offset + i;
        col = 0;
        ch = 0;
        row--;
    }
    return -1;
}

BMPdata.prototype.readByte = function(pos) {
    var row = this.height - 1 - Math.floor(pos / this.rowSize);
    if (row < 0) throw new Error("end of file");
    var col = Math.floor((pos % this.rowSize) / 3);
    var ch = (pos % this.rowSize) % 3;
    return (col < this.width) ? this.data[4*this.width*row + 4*col + 2 - ch] : 0;
}

BMPdata.prototype.readInt = function(pos, len) {
    var n = 0;
    var x = 1;
    for (var i = 0; i < len; i++) {
        n += this.readByte(pos + i) * x;
        x *= 256;
    }
    if (n > (1<<30) * (1<<23)) throw new Error("integer overflow");
    return n;
}

function extract7z(data, callback) {
    var img = new Image();
    img.onload = function() {
        var can = document.createElement("canvas");
        can.width = img.width;
        can.height = img.height;
        var ctx = can.getContext("2d");
        ctx.drawImage(img, 0, 0);
        URL.revokeObjectURL(blob);
        var data = new BMPdata(ctx);
        var start = data.indexOf(MAGIC_7Z);
        if (start != -1) {
            var size = 32 + data.readInt(start + 12, 8) + data.readInt(start + 20, 8);
            var data7z = data.slice(start, start + size);
            var firstRow = data.height - 1 - Math.floor((start + size - 1) / data.rowSize);
            callback(data7z, can, firstRow);
        } else {
            callback(null);
        }
    }
    img.onerror = function() {
        URL.revokeObjectURL(blob);
        callback(null);
    };
    var blob = new Blob([data], {type: "image/png"});
    img.src = URL.createObjectURL(blob);
}
// end of Cornelia extraction code

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