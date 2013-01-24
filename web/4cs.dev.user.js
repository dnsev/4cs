// ==UserScript==
// @name           4chan Media Player
// @version        1.7
// @namespace      dnsev
// @description    4chan Media Player
// @grant          GM_xmlhttpRequest
// @grant          GM_info
// @include        http://boards.4chan.org/*
// @include        https://boards.4chan.org/*
// @include        http://archive.foolz.us/*
// @include        https://archive.foolz.us/*
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



///////////////////////////////////////////////////////////////////////////////
// Bug-fixes for other userscripts
///////////////////////////////////////////////////////////////////////////////
window.$.prototype.exists = function () {
	// Bugfix for 4chan Style Script on Google Chrome in Tampermonkey
	// Somehow, their pseudo-jQuery conflicts with this legit jQuery
	return (this.length > 0);
}



///////////////////////////////////////////////////////////////////////////////
// Multi-use
///////////////////////////////////////////////////////////////////////////////
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
					done_callback(false, callback_data, null);
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
						done_callback(false, callback_data, null);
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
				s = 0;
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
					s = 0;
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
					s = 0;
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

					// Old sound
					if (sounds[0] > 0) {
						sounds[2][sounds[2].length - 1] += i;
					}
					// New sound
					++sounds[0];
					sounds[1].push(tag);
					sounds[2].push(-i);
					// Next
					//i += magic_strings_ui8[s].length;
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
	else if (sound_magic_string_index != 0) {
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
var is_archive = ((document.location + "").indexOf("boards.4chan.org") < 0);
var thread_manager = null;
function ThreadManager () {
	// Manager
	this.posts = {};
	var self = this;

	// Update content
	if (is_archive) {
		$(".thread")
		.each(function (index) {
			if (index == 0) {
				self.parse_post($(this));
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
ThreadManager.prototype.on_dom_mutation = function (target) {
	// Updating
	if (target.hasClass("inline") || target.hasClass("postContainer")) {
		this.parse_post(target);
	}
	else if (target.hasClass("backlinkHr")) {
		// Not tested
		this.parse_post(target.parent().parent());
	}
}
ThreadManager.prototype.parse_post = function (container) {
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

	var post_data_copy = {
		"container": container,
		"image_url": image,
		"post": (post.length > 0 ? $(post[0]) : null)
	};

	if (!redo) {
		this.posts[post_id] = post_data_copy;
	}

	// Auto checking images
	inline_post_parse(this.posts[post_id], redo, post_data_copy);
	if (script_settings["inline"]["url_replace"]) inline_post_parse_for_urls(this.posts[post_id], redo, post_data_copy);
}
ThreadManager.prototype.post = function (index) {
	index += "";
	return (index in this.posts ? this.posts[index] : null);
}



///////////////////////////////////////////////////////////////////////////////
// Inline text
///////////////////////////////////////////////////////////////////////////////
var inline_update_span = null;
var inline_update_link = null;
function inline_setup() {
	$ = jQuery;

	// Insert navigation link
	var reload, reload_span, end;
	if (!is_archive) {
		$("#navtopright").prepend(reload = E("span"));
		$("#navtopright").prepend(E("a").html("Media Player").attr("href", "#").on("click", function (event) { open_player(true); return false; }));
		$("#navtopright").prepend(T("["));
		end = "] ";
	}
	else {
		$(".letters").append(T(" [ "));
		$(".letters").append(E("a").html("Media Player").attr("href", "#").on("click", function (event) { open_player(true); return false; }));
		$(".letters").append(reload = E("span"));
		end = " ]";
	}

	reload.before(inline_update_span = E("span").css("display", "none"));
	inline_update_span.append(T(" / "));
	inline_update_span.append(
		(inline_update_link = E("a"))
		.html("Update")
		.attr("href", "#")
		.on("click", function (event) { return script_update(event); })
	);

	reload.append(reload_span = E("span").css("display", "none"));
	reload_span.append(T(" / "));
	reload_span.append(E("a").html("Reload").attr("href", "#").on("click", function (event) { open_player(false); settings_save(); return false; }));
	reload.append(T(end));
	reload.on("mouseover", {"reload_span": reload_span}, function (event) {
		reload_span.css("display", "");
	});
	reload.on("mouseout", {"reload_span": reload_span}, function (event) {
		reload_span.css("display", "none");
	});

	// Load all
	var threads = $(".thread");
	if (threads.length > 0) {
		$(threads[0]).before(
			E("div")
			.append(T("[ "))
			.append(
				(sound_auto_checker.link = E("a"))
				.attr("href", "#")
				.html("Detect Sounds")
				.on("click", {}, inline_detect_all_in_thread)
			)
			.append(T(" / "))
			.append(
				(sound_auto_loader.link = E("a"))
				.attr("href", "#")
				.html("Load All Sounds")
				.on("click", {}, inline_load_all_in_thread)
			)
			.append(T(" ]"))
		);
	}
}
function inline_post_parse(post_data, redo, post_data_copy) {
	if (post_data.image_url != null) {
		if (redo) {
			// Re-replace
			post_data_copy.post.find(".SPLoadLink").each(function (index) {
				var tag_id = parseInt($(this).attr("_sp_tag_id"));

				$(this)
				.html(post_data.sounds[tag_id])
				.off("click")
				.on("click", {"post_data": post_data, "tag_id": tag_id}, inline_link_click);
			});
			post_data_copy.container.find(".SPLoadAllLink").each(function (index) {
				var tag_id = parseInt($(this).attr("_sp_tag_id"));

				$(this)
				.attr("href", "#")
				.html(post_data.sounds.load_all_text)
				.on("click", {"post_data": post_data}, inline_load_all);
			});

/*
			post_data_copy.sounds.load_all_link
			.html(post_data.sounds.load_all_text)
			.on("click", {"post_data": post_data}, inline_load_all);*/
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
				"about_list_container": null,
				"about_list_container_inner": null,
				"about_list_container_toggler": null,
				"auto_check": {
					"search_span": null,
					"search_status": null
				}
			};

			// Replace tags in post
			var sounds_found = dom_replace(
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
				inline_replace_tags
			);

			// Sounds links
			post_data.post.find(".SPLoadLink").each(function (index) {
				var tag_id = post_data.sounds.post_tags.length;
				post_data.sounds.post_tags.push($(this).html());

				$(this)
				.attr("href", "#")
				.attr("_sp_tag_id", tag_id)
				.on("click", {"post_data": post_data, "tag_id": tag_id}, inline_link_click);
			});

			// Load all
			if (is_archive) {
				var file_size_label = post_data.container.find(".post_file_controls").find("a");
				file_size_label = $(file_size_label[0]);
				file_size_label.before((post_data.sounds.load_all_link = E("a")).addClass("SPLoadAllLink btnr parent"));
			}
			else {
				var file_size_label = post_data.container.find(".fileText");
				file_size_label.after((post_data.sounds.load_all_link = E("a")).addClass("SPLoadAllLink"));
				file_size_label.after(T(" "));
			}
			post_data.sounds.load_all_link
			.attr("href", "#")
			.html(post_data.sounds.load_all_text)
			.on("click", {"post_data": post_data}, inline_load_all);

			// Status
			post_data.post
			.before(
				(post_data.sounds.about_container = E("div"))
				.css("font-size", "10px")
				.css("padding-top", "10px")
				.css("display", "none")
				.append(
					(post_data.sounds.about_count_label = E("div"))
				)
				.append(
					(post_data.sounds.about_list_container = E("div"))
				)
			);

			// DOM update
			post_data.sounds.load_all_link
			.after(
				(post_data.sounds.auto_check.search_span = E("span"))
				.addClass("SPImageSearchingTextContainer")
				.css("display", (sound_auto_checker.enabled ? "" :"none"))
				.html("...")
				.append(
					(post_data.sounds.auto_check.search_status = E("span"))
					.addClass("SPImageSearchingText")
				)
			);

			// Queue
			sound_auto_loader.add_to_queue(post_data);
			sound_auto_checker.add_to_queue(post_data);
		}
	}
}
function inline_link_click(event) {
	// Change status
	var load_str = "loading...";
	$(this).html(load_str);

	// Load sound
	event.data.post_data.sounds.loaded = true;
	open_player(true);
	media_player_instance.attempt_load(
		event.data.post_data.image_url,
		event.data.post_data.sounds.post_tags[event.data.tag_id],
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
		function (okay, data) {
			data.object.html(data.post_data.sounds.post_tags[data.tag_id] + (okay ? "" : " (ajax&nbsp;error)"));
		},
		function (status, data, all_files) {
			if (all_files !== null && data.post_data.sounds.sound_names.length == 0 && all_files.length > 0) {
				data.post_data.sounds.sound_names = all_files;
				inline_update_about_image(data.post_data);
			}
		}
	);

	// Done
	return false;
}
function inline_link_top_click(event) {
	// Change status
	var load_str = "loading...";
	$(this).html(load_str);

	var tag = event.data.post_data.sounds.sound_names[event.data.sound_id];
	if (tag.substr(tag.length - 4, 4).toLowerCase() == ".ogg") {
		tag = tag.substr(0, tag.length - 4);
	}

	// Load sound
	event.data.post_data.sounds.loaded = true;
	open_player(true);
	media_player_instance.attempt_load(
		event.data.post_data.image_url,
		tag,
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
				inline_update_about_image(data.post_data);
			}
		}
	);

	// Done
	return false;
}
function inline_load_all(event) {
	inline_activate_load_all_link(event.data.post_data);

	// Done
	return false;
}
function inline_detect_all_in_thread(event) {
	if (sound_auto_checker.enabled) {
		sound_auto_checker.disable();
	}
	else {
		sound_auto_checker.enable();
	}

	return false;
}
function inline_load_all_in_thread(event) {
	if (sound_auto_loader.enabled) {
		sound_auto_loader.disable();
	}
	else {
		sound_auto_loader.enable();
	}

	return false;
}
function inline_replace_tags(tags) {
	var sounds_found = false;
	var new_text = text_to_html(tags[0].text()).replace(/\[.+?\]/g, function (match) {
		sounds_found = true;
		return "[<a class=\"SPLoadLink\">" + match.substr(1, match.length - 2) + "</a>]";
	});
	if (sounds_found) {
		tags[0].after(new_text).remove();
		return true;
	}
	return false;
}

function inline_update_about_image(post_data) {
	// Show container
	post_data.sounds.about_container.css("display", "");
	var sound_count = 0;
	var file_count = post_data.sounds.sound_names.length;

	// Create a list of sounds (and files)
	var display_count = 0;
	var container = post_data.sounds.about_list_container;
	container.html("");
	for (var sound = true; ; sound = false) {
		for (var i = 0; i < post_data.sounds.sound_names.length; ++i) {
			var is_sound = (post_data.sounds.sound_names[i].split(".").pop().toLowerCase() == "ogg");
			if (sound == is_sound) {	
				// Only display 2 without expansion
				if (display_count++ == 2 && file_count > 3) {
					container.append(
						(container = post_data.sounds.about_list_container_inner = E("div"))
						.css("display", "none")
					)
					.append(
						(post_data.sounds.about_list_container_toggler = E("a"))
						.attr("href", "#")
						.css("font-style", "italic")
					);
					var label = "And " + file_count + " more...";
					var hide = "Hide " + file_count + " files";
					post_data.sounds.about_list_container_toggler
					.html(label)
					.on(
						"click", {"container": container, "label": label, "hide": hide}, function (event) {
							if (container.css("display") == "none") {
								container.css("display", "");
								$(this).html(hide);
							}
							else {
								container.css("display", "none");
								$(this).html(label);
							}
							return false;
						}
					);
				}

				if (sound) {
					if (is_sound) ++sound_count;

					container.append(
						E("div")
						.append(T("- "))
						.append(
							E("a")
							.attr("href", "#")
							.addClass("SPLoadLinkTop")
							.html(text_to_html(post_data.sounds.sound_names[i].substr(0, post_data.sounds.sound_names[i].length - 4))) // remove extension
							.on("click", {"post_data": post_data, "sound_id": i}, inline_link_top_click)
						)
					);
				}
				else {
					container.append(
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

		// Done
		if (!sound) break;
	}

	// Found string
	var str = "";
	if (sound_count > 0) {
		str += sound_count + " Sound" + (sound_count == 1 ? "" : "s") + " Found";
	}
	if (file_count > sound_count) {
		str += (str.length == 0 ? "" : " / ") + file_count + " File" + (file_count == 1 ? "" : "s") + " Found";
	}

	post_data.sounds.about_count_label.html(str);
}

function inline_activate_load_all_link(post_data, done_callback) {
	// Change status
	var load_str = "loading";
	post_data.sounds.load_all_link.html(load_str);

	// Load sound
	post_data.sounds.loaded = true;
	open_player(true);
	media_player_instance.attempt_load(
		post_data.image_url,
		MediaPlayer.ALL_SOUNDS,
		{
			"object": post_data.sounds.load_all_link,
			"post_data": post_data,
			"load_str": load_str
		},
		function (event, data) {
			var progress = Math.floor((event.loaded / event.total) * 100);
			data.object.html(data.load_str + " (" + progress + ")");
		},
		function (okay, data) {
			data.object.html(
				data.post_data.sounds.load_all_text + (okay ? "" : " (ajax&nbsp;error)")
			);
			if (!okay) {
				if (typeof(done_callback) == "function") done_callback(false, data.post_data);
			}
		},
		function (status, data, all_files) {
			if (all_files !== null && data.post_data.sounds.sound_names.length == 0 && all_files.length > 0) {
				data.post_data.sounds.sound_names = all_files;
				inline_update_about_image(data.post_data);
			}
			if (typeof(done_callback) == "function") done_callback(false, data.post_data);
		}
	);

	// Done
	return false;
}

function inline_on_image_drag(data) {
	var url_lower = data.text.toLowerCase();
	for (var post_id in thread_manager.posts) {
		if (
			thread_manager.posts[post_id].image_url !== null &&
			url_lower.indexOf(thread_manager.posts[post_id].image_url.toLowerCase()) >= 0
		) {
			// Found; activate manual load
			inline_activate_load_all_link(thread_manager.posts[post_id]);
			data.text = "";
			return false;
		}
	}
	return true;
}

function inline_post_parse_for_urls(post_data, redo, post_data_copy) {
	if (redo) {
		post_data_copy.post.find(".MPReplacedURL").each(function (index) {
			var vid_id = $(this).attr("_mp_vid_id");
			vid_id = vid_id || null;
			var href = $(this).attr("_mp_original_url");

			$(this)
			.off("click")
			.on("click", {"post_data": post_data, "vid_id": vid_id, "url": href}, on_inline_url_click);
		});
	}
	else {
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
						name == "s"
					) return 1;
					if (name == "wbr") return 2;
				}
				
				return 0;
			},
			inline_replace_urls
		);

		if (links_found) {
			// Sounds links
			post_data.post.find(".MPReplacedURL").each(function (index) {
				var href = html_to_text(string_remove_tags($(this).html()));
				if (href.indexOf(":") < 0) href = "//" + href;

				var vid_id = MediaPlayer.prototype.url_get_youtube_video_id(href);

				$(this)
				.attr("href", href)
				.attr("_mp_original_url", href)
				.on("click", {"post_data": post_data, "vid_id": vid_id, "url": href}, on_inline_url_click);

				if (vid_id !== null) {
					$(this)
					.attr("_mp_vid_id", vid_id)
					.html(
						$(document.createElement("img"))
						.attr("src", "//youtube.com/favicon.ico")
						.attr("alt", "")
						.attr("title", "")
						.css({"vertical-align": "middle"})
					)
					.append(
						E("span")
						.css({"padding-left": "8px"})
						.html("Youtube: " + vid_id)
					);
					ajax_get(
						"//gdata.youtube.com/feeds/api/videos/" + vid_id, true, {a: $(this)}, null,
						function (okay, data, response) {
							if (okay) {
								var xml = $.parseXML(response);
								var title;
								try {
									title = $(xml_find_nodes_by_name(xml, "title")).text();
								}
								catch (e) {
									console.log(e);
									title = "Unknown Title";
								}

								data.a.find("span").html(title);
							}
							else {
								data.a.find("span").html("Video not found").css("font-style", "italic");
							}
						}
					);
				}
			});
		}
	}
}
function inline_replace_urls(tags) {
	var full_text = "";
	var in_url = false;
	var any_found = true;
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
			full_text += $('<div>').append(tags[i].clone()).html();
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
}

function on_inline_url_click(event) {
	// Add to playlist
	if (!event.originalEvent.which || event.originalEvent.which == 1) {
		if (event.data.vid_id !== null) {
			open_player(true);
			media_player_instance.attempt_load_video(
				event.data.url,
				null,
				{"post_data": event.data.post_data, "link": $(this)},
				function (event, data) {
					//var progress = Math.floor((event.loaded / event.total) * 100);
					//data.object.html(data.load_str + " (" + progress + ")");
				},
				function (okay, data) {
					//data.object.html(data.post_data.sounds.post_tags[data.tag_id] + (okay ? "" : " (ajax&nbsp;error)"));
				},
				function (status, data, xml_info) {
				}
			);
		}
		return false;
	}
	return true;
}


function string_remove_tags(str) {
	return str.replace(/<[^>]*>?/g, "");
}
function dom_replace(tag, check_callback, replace_callback) {
	var c = tag.contents();
	var sub_tags = [ new Array() ];
	var check, t;

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
			sub_tags[i].push(t);
			// Sub-scan
			if (t.prop("tagName") !== undefined && t.contents().length > 0) {
				dom_replace(t, check_callback, replace_callback);
			}
		}
	}

	// Replace
	var found = false;
	for (i = 0; i < sub_tags.length && sub_tags[i].length > 0; ++i) {
		found = (replace_callback(sub_tags[i]) || found);
	}

	// Done
	return found;
}



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
SoundAutoLoader.prototype.add_to_queue = function (post_data) {
	// Set to loaded
	post_data.loaded = true;

	// Add to queue
	this.queue.push(post_data);
	this.loop();
}
SoundAutoLoader.prototype.enable = function () {
	if (!this.enabled) {
		this.link.removeAttr("href");
		this.link.html("Loading All Sounds");

		this.enabled = true;
		this.loop();
	}
}
SoundAutoLoader.prototype.disable = function () {
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
}
SoundAutoLoader.prototype.loop = function () {
	if (!this.enabled || this.looping) return;

	this.looping = true;
	this.loop_next();
}
SoundAutoLoader.prototype.loop_next = function () {
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
}
SoundAutoLoader.prototype.load_single = function (post_data) {
	var self = this;
	inline_activate_load_all_link(post_data, function (okay, post_data) {
		self.load_single_done();
	});
}
SoundAutoLoader.prototype.load_single_done = function () {
	var self = this;
	this.timer = setTimeout(function () {
		self.timer = null;
		self.loop_next();
	}, this.delay);
}
var sound_auto_loader = new SoundAutoLoader();



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
SoundAutoChecker.prototype.add_to_queue = function (post_data) {
	// Set to loaded
	post_data.loaded = true;

	// Add to queue
	this.queue.push(post_data);
	this.loop();
}
SoundAutoChecker.prototype.enable = function () {
	if (!this.enabled) {
		for (var i = 0; i < this.queue.length; ++i) {
			this.queue[i].sounds.auto_check.search_span.css("display", "");
		}
		this.link.removeAttr("href");
		this.link.html("Detecting Sounds");

		this.enabled = true;
		this.loop();
	}
}
SoundAutoChecker.prototype.disable = function () {
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
}
SoundAutoChecker.prototype.loop = function () {
	if (!this.enabled || this.looping) return;

	this.looping = true;
	this.loop_next();
}
SoundAutoChecker.prototype.loop_next = function () {
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
}
SoundAutoChecker.prototype.load_single = function (post_data) {
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
}
SoundAutoChecker.prototype.load_single_callbacks = function (post_data, callback_id, response) {
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
					inline_update_about_image(post_data);

					// Done
					post_data.sounds.auto_check.search_span.css("display", "none");
					self.load_single_done();
				}
			}
		);
	}
}
SoundAutoChecker.prototype.load_single_done = function () {
	var self = this;
	this.timer = setTimeout(function () {
		self.timer = null;
		self.loop_next();
	}, this.delay);
}
var sound_auto_checker = new SoundAutoChecker();



///////////////////////////////////////////////////////////////////////////////
// Hotkeys
///////////////////////////////////////////////////////////////////////////////
function HotkeyListener() {
	this.flags = 0;

	$(document)
	.off("keydown.HotkeyListener keyup.HotkeyListener")
	.on("keydown.HotkeyListener", {self: this}, function (event) {
		if (event.which >= 16 && event.which <= 17) { // changing 17 to 18 enables "alt" support, but is buggy
			event.data.self.flags |= (1 << (event.which - 16));
		}
		else if (
			script_settings["hotkeys"]["open_player"][0] != 0 &&
			script_settings["hotkeys"]["open_player"][0] == event.which &&
			script_settings["hotkeys"]["open_player"][1] == event.data.self.flags
		) {
			// Not typing
			var t = $(document.activeElement).prop("tagName").toLowerCase();
			if (t !== "input" && t !== "textarea") {
				// Open the player
				open_player(true);

				event.stopPropagation();
				event.preventDefault();
				return false;
			}
		}
		return true;
	})
	.on("keyup.HotkeyListener", {self: this}, function (event) {
		if (event.which >= 16 && event.which <= 17) {
			event.data.self.flags &= ~(1 << (event.which - 16));
		}
	});
}
var hotkey_listener = null;



///////////////////////////////////////////////////////////////////////////////
// Sound player control
///////////////////////////////////////////////////////////////////////////////
var media_player_instance = null;
var media_player_css = null;
var media_player_css_color_presets = {
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
var media_player_css_size_presets = {
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

function media_player_destruct_callback(sound_player) {
	// Save settings
	settings_save();
	// Nullify
	media_player_instance = null;
	media_player_css = null;
}

function open_player(load_settings) {
	if (media_player_instance != null) {
		// Focus player
		media_player_instance.focus();
		return media_player_instance;
	}

	// CSS
	media_player_css = new MediaPlayerCSS("yotsubab", media_player_css_color_presets, media_player_css_size_presets);
	// Load CSS settings
	if (load_settings) media_player_css.load(script_settings["style"]);
	//{ Hotkey settings
	var hotkey_settings = {
		"section": "Hotkeys",
		"label": "Open Player",
		"html": null,
		"html_input": null,
		"html_input_clear": null,
		"value": "",
		"value_code": script_settings["hotkeys"]["open_player"][0],
		"value_modifiers": script_settings["hotkeys"]["open_player"][1],
		"value_modifiers_current": 0, // 1 = shift, 2 = ctrl, 4 = alt
		"update_value": null
	};
	hotkey_settings.update_value = function (hotkey_settings) {
		// Update
		var v = hotkey_settings.value_modifiers;
		var str = "";
		if ((v & 1) != 0) str += "Shift";
		if ((v & 2) != 0) str += (str.length > 0 ? " + " : "") + "Ctrl";
		if ((v & 4) != 0) str += (str.length > 0 ? " + " : "") + "Alt";
		v = hotkey_settings.value_code;
		if (v != 0) str += (str.length > 0 ? " + " : "") + String.fromCharCode(v);
		
		hotkey_settings.value = str;

		hotkey_settings.html_input.val(hotkey_settings.value);
	};

	// HTML
	(hotkey_settings.html = E("div"))
	.append( //{ DOM
		E("div")
		.addClass("SPHelpColorInputDiv2")
		.append(
			E("div")
			.addClass("SPHelpColorInputDiv3")
			.css({
				"position": "relative",
			})
			.append(
				(hotkey_settings.html_input = E("input"))
				.addClass("SPHelpColorInput")
				.attr("type", "text")
				.val(hotkey_settings.value)
			)
			.append(
				E("div")
				.css({
					"position": "absolute",
					"right": "0",
					"top": "0",
					"bottom": "0",
				})
				.append(
					(hotkey_settings.html_input_clear = E("a"))
					.attr("href", "#")
					.html("Clear")
				)
			)
		)
	); //}

	// Update value
	hotkey_settings.update_value(hotkey_settings);

	// Events
	hotkey_settings.html_input_clear.on("click", {"hotkey_settings": hotkey_settings}, function (event) {
		// Clear value
		event.data.hotkey_settings.value_code = 0;
		event.data.hotkey_settings.value_modifiers = 0;
		event.data.hotkey_settings.value_modifiers_current = 0;
		event.data.hotkey_settings.update_value(event.data.hotkey_settings);

		// Update
		script_settings["hotkeys"]["open_player"][0] = event.data.hotkey_settings.value_code;
		script_settings["hotkeys"]["open_player"][1] = event.data.hotkey_settings.value_modifiers;
		settings_save();

		return false;
	});
	hotkey_settings.html_input.on("keydown", {"hotkey_settings": hotkey_settings}, function (event) {
		if (event.which >= 16 && event.which <= 17) {
			var v = 1 << (event.which - 16);
			event.data.hotkey_settings.value_modifiers_current |= v;

			event.data.hotkey_settings.value_modifiers = event.data.hotkey_settings.value_modifiers_current;
			event.data.hotkey_settings.value_code = 0;
		}
		else {
			// Key
			event.data.hotkey_settings.value_modifiers = event.data.hotkey_settings.value_modifiers_current;
			event.data.hotkey_settings.value_code = event.which;
		}

		event.data.hotkey_settings.update_value(event.data.hotkey_settings);

		event.stopPropagation();
		event.preventDefault();
		return false;
	})
	.on("keyup", {"hotkey_settings": hotkey_settings}, function (event) {
		if (event.which >= 16 && event.which <= 17) {
			var v = 1 << (event.which - 16);
			event.data.hotkey_settings.value_modifiers_current &= ~v;

			event.data.hotkey_settings.update_value(event.data.hotkey_settings);
		}

		event.stopPropagation();
		event.preventDefault();
		return false;
	})
	.on("blur", {"hotkey_settings": hotkey_settings}, function (event) {
		// No key?
		if (event.data.hotkey_settings.value_code == 0) {
			event.data.hotkey_settings.value_modifiers = 0;
		}
		event.data.hotkey_settings.update_value(event.data.hotkey_settings);

		// Update
		script_settings["hotkeys"]["open_player"][0] = event.data.hotkey_settings.value_code;
		script_settings["hotkeys"]["open_player"][1] = event.data.hotkey_settings.value_modifiers;
		settings_save();
	});
	//}
	// Custom settings
	var extra_options = [
		{
			"current": script_settings["inline"]["url_replace"],
			"label": "URL Replacing",
			"values": [ true , false ],
			"descr": [ "Enabled" , "Disabled" ],
			"change": function (value) {
				script_settings["inline"]["url_replace"] = value;
				settings_save();
			}
		},
		hotkey_settings
	];
	// Player
	media_player_instance = new MediaPlayer(
		media_player_css,
		[ png_load_callback , image_load_callback ],
		inline_on_image_drag,
		function (media_player) { settings_save(); },
		media_player_destruct_callback,
		extra_options
	);
	// Load settings	
	if (load_settings) media_player_instance.load(script_settings["player"]);
	// Display
	media_player_instance.create();

	return media_player_instance;
}



///////////////////////////////////////////////////////////////////////////////
// Entry
///////////////////////////////////////////////////////////////////////////////
var script_settings_loaded = false;
var script_settings = {
	"player": {},
	"style": {},
	"script": {
		"sub_version": 0,
		"last_update": 0,
		"update_found": false,
		"update_url": "",
		"update_version": "",
		"current_version": "",
		"update_message": ""
	},
	"hotkeys": {
		"open_player": [0, 0]
	},
	"inline": {
		"url_replace": true
	}
};
function settings_save() {
	// Get
	if (media_player_instance != null) {
		script_settings["player"] = media_player_instance.save();
		script_settings["style"] = media_player_instance.css.save();
	}
	// Save
	try {
		localStorage.setItem("4cs", JSON.stringify(script_settings));
	}
	catch (e) {
		console.log(e);
	}
}
function settings_load() {
	// Load
	if (!script_settings_loaded) {
		script_settings_loaded = true;
		try {
			var s = localStorage.getItem("4cs");
			if (s) {
				s = JSON.parse(s);
				for (var key in script_settings) {
					if (key in s) script_settings[key] = s[key];
				}
			}
		}
		catch (e) {
			console.log(e);
		}
	}
}

var script_update_version_url = "https://raw.github.com/dnsev/4cs/master/web/version.txt";
function script_update(event) {
	if (!event.originalEvent.which || event.originalEvent.which == 1) {
		var scr = {};
		try {
			scr = GM_info.script;
		}
		catch (e) {
			console.log(e);
		}

		var s = "An update is available to \"" + scr.name + "\".\n\n" +
			"Current version: " + scr.version + "\n" +
			"Update Version: " + script_settings["script"]["update_version"] + "\n\n" +
			"About: " + script_settings["script"]["update_message"] + "\n\n" +
			"Middle click the link or copy and paste the following url:               ";
		
		prompt(s, script_settings["script"]["update_url"]);
		return false;
	}
	return true;
}
function script_update_check(ajax) {
	var fn = function () {
		inline_update_span.css("display", "");
		inline_update_link.html("UPDATE");
		inline_update_link.attr("href", script_settings["script"]["update_url"]);
	};

	if (ajax) {
		ajax_get(
			"https://raw.github.com/dnsev/4cs/master/web/version.txt",
			true,
			{},
			null,
			function (okay, data, response) {
				if (okay) {
					try {
						var s = JSON.parse(response);
						// Settings
						script_settings["script"]["update_url"] = s[is_chrome() ? "update_url_gc" : "update_url_ff"];
						script_settings["script"]["update_version"] = s["version"].toString();
						script_settings["script"]["last_update"] = (new Date()).getTime();
						script_settings["script"]["update_message"] = (s["message"] || "").toString();
						// Check
						if (script_settings["script"]["update_version"] !== GM_info.script.version) {
							// Okay
							fn();
							script_settings["script"]["update_found"] = true;
						}
						else {
							script_settings["script"]["update_found"] = false;
						}
						// Update settings
						settings_save();
					}
					catch (e) {
						console.log(e);
					}
				}
			}
		);
	}
	else {
		fn();
	}
}

jQuery(document).ready(function () {
	// Settings
	settings_load();

	// Hack move the scope out of sandbox
	window._unsafe_exec = function () {
		if (window._unsafe !== undefined) {
			window._unsafe_return = window[window._unsafe.func].call(window, window._unsafe.data);
			window._unsafe.tag.parentNode.removeChild(window._unsafe.tag);
			window[window._unsafe.func] = undefined;
			window._unsafe = undefined;
		}
	}
	tag = document.createElement('script');
	tag.innerHTML = "window._unsafe_exec = " + window._unsafe_exec.toString() + ";";
	document.body.appendChild(tag);
	window._unsafe_exec = function (exec_function, data) {
		// Create script tag
		var tag = document.createElement('script');

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

	// Setup
	inline_setup();
	thread_manager = new ThreadManager();
	hotkey_listener = new HotkeyListener();

	// Update check once a day
	var time_update;
	var version = "";
	try {
		version = GM_info.script.version;
	}
	catch (e) {
		console.log(e);
	}
	if (
		(time_update = ((new Date()).getTime() - script_settings["script"]["last_update"] >= 1000 * 60 * 60 * 24)) ||
		(time_update = (version != script_settings["script"]["current_version"])) ||
		script_settings["script"]["update_found"]
	) {	
		script_settings["script"]["current_version"] = version;
		script_update_check(time_update);
	}
});

/*unsafeWindow.onYouTubeIframeAPIReady = function () {
//	window.YT = unsafeWindow.YT;
}*/



