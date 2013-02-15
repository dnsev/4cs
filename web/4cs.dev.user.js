// ==UserScript==
// @name           4chan Media Player
// @version        2.1.4.1
// @namespace      dnsev
// @description    4chan Media Player :: Youtube, Vimeo, Soundcloud, and Sounds playback
// @grant          GM_xmlhttpRequest
// @grant          GM_info
// @grant          GM_getValue
// @grant          GM_setValue
// @include        http://boards.4chan.org/*
// @include        https://boards.4chan.org/*
// @include        http://archive.foolz.us/*
// @include        https://archive.foolz.us/*
// @include        http://dnsev.github.com/4cs/*
// @icon           data:image/gif;base64,R0lGODlhEAAQAKECAAAAAGbMM////////yH5BAEKAAIALAAAAAAQABAAAAIllI+pB70KQgAPNUmroDHX7Gie95AkpCUn1ISlhKVR/MEre6dLAQA7
// @require        https://raw.github.com/dnsev/4cs/master/web/jquery.js
// @require        https://raw.github.com/dnsev/4cs/master/web/jquery.svg.pack.js
// @require        https://raw.github.com/dnsev/4cs/master/web/zlib.js
// @require        https://raw.github.com/dnsev/4cs/master/web/png.js
// @require        https://raw.github.com/dnsev/4cs/master/web/Loop.js
// @require        https://raw.github.com/dnsev/4cs/master/web/DataImage.js
// @require        https://raw.github.com/dnsev/4cs/master/web/MediaPlayer.js
// ==/UserScript==
// ==Meta==
// @updateURL      https://raw.github.com/dnsev/4cs/master/web/{{target}}
// @downloadURL    https://raw.github.com/dnsev/4cs/master/web/{{target}}
// ==/Meta==



// ==Ordered==
// @after jquery.js
if (/http\:\/\/dnsev\.github\.com\/4cs\//.exec(window.location.href + "")) {
	$(document).ready(function () {
		if (unsafeWindow && unsafeWindow.version_check) {
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
				unsafeWindow.version_check(version);
			}
		}
	});
	return;
}
// ==/Ordered==



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
var is_archive = ((document.location + "").indexOf("boards.4chan.org") < 0);

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
		GM_xmlhttpRequest(arg);
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
	return str.replace(/&amp;/g, "&")
		.replace(/&gt;/g, ">")
		.replace(/&lt;/g, "<")
		.replace(/&quot;/g, "\"");
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
		// TODO
		alert("Footer sound");
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
					"data": null
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
function image_load_callback_slow(url_or_filename, load_tag, raw_ui8_data, done_callback) {
	try {
		var loop = new Loop();
		loop.steps = 1024 * 64;
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
		// TODO
		alert("Footer sound");
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
					tag = tag || "?";

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
						"data": null
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
		// TODO
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
		loop.steps = 1024 * 64;
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
	// Fix
	var i, j, k;
	if (sound_masked_state !== null) {
		for (i = 0; true; ) {
			sounds[id].data[i] = (sounds[id].data[i] ^ sound_masked_mask);

			// Done/next
			if (++i >= sounds[id].data.length) break;
			sound_masked_state = (1664525 * sound_masked_state + 1013904223) & 0xFFFFFFFF;
			sound_masked_mask = sound_masked_state >>> 24;
			sound_masked_state += (sounds[id].data[i] ^ sound_masked_mask);
		}
	}
	if (sound_magic_string_index != 0) {
		var len = sounds[id].data.length - magic_strings_fix_size;
		for (j = 0; j < len; ++j) {
			for (k = 0; k < magic_strings_fix_size; ++k) {
				if (sounds[id].data[j + k] != magic_strings_ui8[sound_magic_string_index][k]) break;
			}
			if (k == magic_strings_fix_size) {
				// Fix it
				for (k = 0; k < magic_strings_fix_size; ++k) {
					sounds[id].data[j + k] = magic_strings_ui8[0][k];
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
function png_load_callback_slow(url_or_filename, load_tag, raw_ui8_data, done_callback) {
	// Not a PNG
	if (url_or_filename.split(".").pop().toLowerCase() != "png") {
		done_callback(null);
		return;
	}

	// Load image from data
	var img = new DataImage(
		raw_ui8_data,
		{},
		function (img, data) {
			// Unpack files
			var reader = new DataImageReader(img);
			reader.unpack_slow(function (r) {
				if (typeof(r) == typeof("")) {
					// Error
					done_callback(null);
				}
				else {
					// Loaded
					done_callback(png_load_callback_find_correct(r, load_tag));
				}
			});
		},
		true
	);
}

function png_check_callback(url_or_filename, raw_ui8_data, callback_data, done_callback) {
	// Not a PNG
	if (url_or_filename.split(".").pop().toLowerCase() != "png") {
		done_callback(null, callback_data);
		return;
	}

	try {
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
			true
		);
	}
	catch (e) {
		console.log(e);
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
					"data": r[1][i]
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
						"data": r[1][i]
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
				"data": r[1][earliest]
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
	var self = this;

	// Update content
	if (is_archive) {
		$(".thread")
		.each(function (index) {
			if ($(this).attr("id")) { // needs an id
				if (index == 0) {
					self.parse_post($(this));
				}
			}
		});
	}
	$(is_archive ? ".post" : ".postContainer")
	.each(function (index) {
		self.parse_post($(this));
	});

	// Mutation manager
	var MutationObserver = (window.MutationObserver || window.WebKitMutationObserver);
	if (MutationObserver) {
		try {
			var mo = new MutationObserver(function (records) {
				for (var i = 0; i < records.length; ++i) {
					if (records[i].type == "childList" && records[i].addedNodes){
						for (var j = 0; j < records[i].addedNodes.length; ++j) {
							// Check
							self.on_dom_mutation($(records[i].addedNodes[j]));
						}
					}
				}
			});
			mo.observe(
				$(is_archive ? "#main" : ".board")[0],
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
		$($(is_archive ? "#main" : ".board")[0]).on("DOMNodeInserted", function (event) {
			self.on_dom_mutation($(event.target));
			return true;
		});
	}
}
ThreadManager.prototype = {
	constructor: ThreadManager,
	on_dom_mutation: function (target) {
		// Updating
		if (target.hasClass("postContainer") || target.hasClass("post")) {
			this.parse_post(target);
		}
	},
	parse_post: function (container) {
		// Get id
		var post_id = (container.attr("id") || "0").replace(/(\w+_)?[^0-9]/g, "");
		var redo = (post_id in this.posts);

		var image = container.find(is_archive ? ".thread_image_link" : ".fileThumb");
		var post = container.find(is_archive ? ".text" : ".postMessage");

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
			else {
				var ft = container.find(".fileText");
				if (!(image_name = ft.attr("data-filename"))) { // 4chan x method
					// Default method
					image_name = ft.find("span");
					if (image_name.length > 0) {
						image_name = $(image_name[image_name.length - 1]).attr("title");
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
		if (!redo) {
			this.posts[post_id] = post_data_copy;
		}

		// Auto checking images
		inline_manager.parse_post(this.posts[post_id], redo, post_data_copy);
		if (script.settings["inline"]["url_replace"]) {
			inline_manager.parse_post_for_urls(this.posts[post_id], redo, post_data_copy);
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
function SettingsManager() {
	var self = this;

	// Insert stylesheet
	$("head")
	.append( //{ Stylesheet
		E("style")
		.html(
			".MPMenu{display:block !important;position:absolute;left:0;top:0;box-shadow:0px 0px 2px 2px rgba(0,0,0,0.25);z-index:10001;margin:0px !important;padding:2px !important;}\n" +
			".MPMenuClosed{display:none !important;}\n" +
			"a.MPMenuItem,a.MPMenuItem:link,a.MPMenuItem:visited{display:block !important;padding:2px !important;text-decoration:none !important;}" +
			".MPMenuItem + .MPMenuItem{margin-top:1px;}\n" +

			".MPSettingsContainerOuter{position:fixed;left:0;top:0;right:0;bottom:0;z-index:10001;background:rgba(0,0,0,0.25);}\n" +
			".MPSettingsClosed{display:none !important;}\n" +
			".MPSettingsContainerInner{position:relative;width:100%;height:100%;}\n" +
			"div.MPSettingsBox{display:block !important;position:absolute !important;left:25%;top:15%;right:25%;bottom:15%;border:0px !important;box-shadow:0px 0px 2px 2px rgba(0,0,0,0.25);border-radius:6px !important;padding:0px !important;margin:0px !important;overflow:hidden;}\n" +
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
		.addClass(is_archive ? "post_wrapper" : "reply")
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
			.attr("href", "http://dnsev.github.com/4cs/")
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
				.addClass(is_archive ? "post_wrapper" : "reply")
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
						.attr("href", "http://dnsev.github.com/4cs/")
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
}
SettingsManager.prototype = {
	constructor: SettingsManager,
	on_menu_item_click: function (link, event) {
		if (event.which != 1) return true;

		switch (event.data.item) {
			case 0:
			{
				media_player_manager.open_player(true);
				this.menu_close();
			}
			return false;
			case 1:
			{
				this.settings_open();
				this.menu_close();
			}
			return false;
			case 3:
			{
				inline_manager.display_info("help");
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
			.addClass("MPSettingsSingleItem" + (this.sections[section][2] % 2 == 1 ? "" : " MPSettingsSingleItemEven"))
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
// Inline text
///////////////////////////////////////////////////////////////////////////////
function InlineManager() {
	// Insert stylesheet
	$("head")
	.append( //{ Stylesheet
		E("style")
		.html(
			"a.MPNavLink,.MPNavSpan{}\n" +

			".MPSoundsAbout{font-size:0.75em !important;line-height:normal !important;;margin:8px 0px 0px 0px !important;}\n" +
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
			".MPVideoInfoDisplay{z-index:1;text-align:center;padding:8px !important;display:block;position:absolute;left:0;top:100%;box-shadow:0px 0px 2px 2px rgba(0,0,0,0.25);border-radius:4px;}\n" +
			".MPVideoInfoDisplayHidden{display:none !important}\n" +
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
	); //}
	this.update_styles();

	// Insert navigation link
	var self = this;
	var around0, around1;
	if (is_archive) {
		$(".letters").append("<span class=\"MPNavSpan\"></span>");
		around0 = [ " " , "" ];
		around1 = [ "[ " , " ]" ];
	}
	else {
		$("#navtopright,#navbotright").prepend("<span class=\"MPNavSpan\"></span>");
		around0 = [ "" , " " ];
		around1 = [ "[" , "]" ];
	}

	// Settings
	this.settings_manager = new SettingsManager();

	// Settings link
	var s;
	(s = $(".MPNavSpan"))
	.append(T(around1[0]))
	.append( //{
		E("a")
		.addClass("MPNavLink")
		.html("Media Player")
		.attr("href", "http://dnsev.github.com/4cs/")
		.attr("target", "_blank")
		.on("click", function (event) {
			return self.on_menu_link_click($(this), event);
		})
	) //}
	.append(T(around1[1]));
	if (around0[0]) s.before(T(around0[0]));
	if (around0[1]) s.after(T(around0[1]));

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
				.addClass(is_archive ? "post_wrapper" : "reply")
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
	var threads = $(".thread");
	if (threads.length > 0 && script.settings["inline"]["sound_thread_control"]) {
		$(threads[0]).before(
			E("div")
			.append(T("[ "))
			.append(
				(sound_auto_checker.link = E("a"))
				.attr("href", "#")
				.html("Detect Sounds")
				.on("click", {}, this.on_detect_all_in_thread_click)
			)
			.append(T(" / "))
			.append(
				(sound_auto_loader.link = E("a"))
				.attr("href", "#")
				.html("Load All Sounds")
				.on("click", {}, this.on_load_all_in_thread_click)
			)
			.append(T(" ]"))
		);
	}
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
			".MPHighlightBorderColor{border-color:" + this.color_to_style(c, 0.25) + " !important;}"
		);
	},

	parse_post: function (post_data, redo, post_data_copy) {
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

						if (is_archive) {
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
					if (is_archive) {
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
				});
			}

			// Text replace
			var links_found = dom_replace(
				post_data.post,
				function (tag, old_tags) { // check
					var name = tag.prop("tagName");
					if (name === undefined) return 2;
					name = name.toLowerCase();

					if (is_archive) {
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
		media_player_manager.media_player.attempt_load(
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
		this.settings_update_link
		.css("display", "")
		.attr("href", url);
		if (!is_archive) {
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
			if (event.data.media_type) {
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
				var fn;
				if (event.data.media_type === "youtube") {
					fn = media_player_manager.media_player.attempt_load_youtube_video;
				}
				else if (event.data.media_type === "vimeo") {
					fn = media_player_manager.media_player.attempt_load_vimeo_video;
				}
				else { // if (event.data.media_type === "soundcloud") {
					fn = media_player_manager.media_player.attempt_load_soundcloud_sound;
				}

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
		media_player_manager.media_player.attempt_load(
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
		media_player_manager.media_player.attempt_load(
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
		if (sound_auto_checker.enabled) {
			sound_auto_checker.disable();
		}
		else {
			sound_auto_checker.enable();
		}

		return false;
	},
	on_load_all_in_thread_click: function (event) {
		if (sound_auto_loader.enabled) {
			sound_auto_loader.disable();
		}
		else {
			sound_auto_loader.enable();
		}

		return false;
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
				.addClass(is_archive ? "post_wrapper" : "reply")
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
						.attr("href", "http://dnsev.github.com/4cs/")
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
					E("p")
					.html("Ajax errors occur when your browser tries to fetch an image using Javascript, but for some reason it can't retrieve it.")
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
	this.delay = 500;
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
			this.link.removeAttr("href");
			this.link.html("Loading All Sounds");

			this.enabled = true;
			this.loop();
		}
	},
	disable: function () {
		if (this.enabled) {
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
			this.load_single(this.queue.shift());
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
	this.delay = 500;
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
			if (post_data.sounds.sound_names.length == 0) {
				loaded = true;
				this.load_single(post_data);
				if (this.serial) break;
			}
			else {
				post_data.sounds.auto_check.search_span.css("display", "none");
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
			[ png_load_callback , image_load_callback ],
			function (data) { inline_manager.on_content_drag(data); },
			function (media_player) { script.settings_save(); },
			function (media_player) { self.media_player_destruct_callback(media_player); },
			extra_options
		);
		// Load settings
		if (load_settings) this.media_player.load(script.settings["player"]);
		// Display
		this.media_player.create();

		return this.media_player;
	}
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
		"inline": {
			"highlight_color": "000000",

			"sound_tags_replace": true,
			"sound_thread_control": false,
			"sound_source": true,

			"url_replace": true,
			"url_replace_smart": false,
			"url_hijack": true,
			"url_replace_media_links": true,
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
		}
	};
	this.storage_name = "4cs";

	// Changelog URL
	this.update_version_url = "http://dnsev.github.com/4cs/changelog.txt";

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
				"description": "Put the sound thread management links at the top of the thread",
				"values": [ true , false ],
				"descr": [ "Enabled" , "Disabled" ],
				"change": function (value) {
					script.settings["inline"]["sound_thread_control"] = value;
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
				"update_value": function () { this.current = script.settings["inline"]["url_replace_media_links"]; },
				"label": "Media URL Replacement",
				"description": "Transforms media links into links that open in the player",
				"values": [ true , false ],
				"descr": [ "Enabled" , "Disabled" ],
				"change": function (value) {
					script.settings["inline"]["url_replace_media_links"] = value;
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
// Entry
///////////////////////////////////////////////////////////////////////////////
$(document).ready(function () {
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
		if (window._unsafe !== undefined) {
			window._unsafe_return = window[window._unsafe.func].call(window, window._unsafe.data);
			window._unsafe.tag.parentNode.removeChild(window._unsafe.tag);
			window[window._unsafe.func] = undefined;
			window._unsafe = undefined;
		}
	}
	var tag = document.createElement("script");
	tag.innerHTML = "window._unsafe_exec = " + window._unsafe_exec.toString() + ";";
	document.body.appendChild(tag);
	window._unsafe_exec = function (exec_function, data) {
		// Create script tag
		var tag = document.createElement("script");

		// Set data to be passed
		var _unsafe = {
			"tag": tag,
			"func": "_unsafe_f049fwjef0rghr09", // TODO : maybe make this change
			"data": data
		};

		// Apply script source and run it
		tag.innerHTML = "window." + _unsafe.func + " = " + exec_function.toString() + "; window._unsafe_exec();";

		// Run script
		unsafeWindow._unsafe = _unsafe;
		document.body.appendChild(tag);

		// Assuming that runs instantly...
		var r = unsafeWindow._unsafe_return;
		unsafeWindow._unsafe_return = undefined;
		return r;
	}

	// Youtube API
	$.getScript("//www.youtube.com/iframe_api", function (script, status, jqXHR) {});

	// Update check once a day
	script.update_check_interval(1000 * 60 * 60 * 24);
});


