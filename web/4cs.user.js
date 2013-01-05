// ==UserScript==
// @name           4chan Media Player
// @version        1.1
// @namespace      dnsev
// @description    4chan Media Player
// @grant          GM_xmlhttpRequest
// @include        http://boards.4chan.org/*
// @include        https://boards.4chan.org/*
// @include        http://archive.foolz.us/*
// @include        https://archive.foolz.us/*
// @require        https://raw.github.com/dnsev/4cs/master/web/jquery.js
// @require        https://raw.github.com/dnsev/4cs/master/web/zlib.js
// @require        https://raw.github.com/dnsev/4cs/master/web/png.js
// @require        https://raw.github.com/dnsev/4cs/master/web/Loop.js
// @require        https://raw.github.com/dnsev/4cs/master/web/DataImage.js
// @require        https://raw.github.com/dnsev/4cs/master/web/SoundPlayer.js
// @updateURL      https://raw.github.com/dnsev/4cs/master/web/4cs.user.js
// @downloadURL    https://raw.github.com/dnsev/4cs/master/web/4cs.user.js
// ==/UserScript==



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

function ajax_get(url, return_as_string, callback_data, progress_callback, done_callback) {
	var sound_player = this;
	if (((navigator.userAgent + "").indexOf(" Chrome/") >= 0)) {
		var xhr = new XMLHttpRequest();
		xhr.open("GET", url, true);
		xhr.overrideMimeType("text/plain; charset=x-user-defined");
		xhr.responseType = (return_as_string ? "text" : "arraybuffer");

		xhr.onload = function (event) {
			if (typeof(done_callback) == "function") {
				if (this.status == 200) {
					done_callback(
						true,
						callback_data,
						(return_as_string ? this.response : sound_player.arraybuffer_to_uint8array(this.response))
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
			overrideMimeType: "text/plain; charset=x-user-defined",
			onload: function (event) {
				if (typeof(done_callback) == "function") {
					if (event.status == 200) {
						done_callback(
							true,
							callback_data,
							(return_as_string ? event.responseText : sound_player.string_to_uint8array(event.responseText))
						);
					}
					else {
						done_callback(false, callback_data, null);
					}
				}
			}
		};
		if (typeof(progress_callback) == "function") {
			arg.onprogress = function (event) {
				progress_callback(event, callback_data);
			};
		}
		GM_xmlhttpRequest(arg);
	}
}

function E(elem) {
	return jQuery(document.createElement(elem));
}
function T(text) {
	return jQuery(document.createTextNode(text));
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
				i += magic_strings_ui8[s].length;
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
	if (load_tag != MediaPlayer.ALL_SOUNDS) {
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
		if (load_tag != MediaPlayer.ALL_SOUNDS) {
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
					i += magic_strings_ui8[s].length;
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
					sounds[1].push(tag);
					sounds[2].push(-i);
					// Next
					i += magic_strings_ui8[s].length;
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
	if (target.hasClass("inline")) {
		this.parse_post(target);
	}
	else if (target.hasClass("postContainer")) {
		this.parse_post(target);
	}
	else if (target.hasClass("backlinkHr")) {
		// Not tested
		this.parse_post(target.parent().parent());
	}
}
ThreadManager.prototype.parse_post = function (container) {
	// Get id
	var post_id = container.attr("id").replace(/[^0-9]/, "");
	var redo = true;
	if (!(post_id in this.posts)) {
		redo = false;

		var image = container.find(is_archive ? ".thread_image_link" : ".fileThumb");
		var post = container.find(is_archive ? ".text" : ".postMessage");

		image = (image.length > 0 ? image.attr("href") : null);
		// Redirect links from the archive
		if (is_archive && image !== null) {
			var match;
			if ((match = /\/(\w+)\/redirect\/(.+)/.exec(image)) !== null) {
				// match.index
				image = "//images.4chan.org/" + match[1] + "/src/" + match[2];
			}
		}

		this.posts[post_id] = {
			"container": container,
			"image_url": image,
			"post": (post.length > 0 ? $(post[0]) : null)
		};
	}

	// Auto checking images
	inline_post_parse(this.posts[post_id], redo);
}
ThreadManager.prototype.post = function (index) {
	index += "";
	return (index in this.posts ? this.posts[index] : null);
}



///////////////////////////////////////////////////////////////////////////////
// Inline text
///////////////////////////////////////////////////////////////////////////////
function inline_setup() {
	$ = jQuery;

	// Insert navigation link
	var reload, reload_span, end;
	if (!is_archive) {
		$("#navtopright").prepend(reload = E("span"));
		$("#navtopright").prepend(E("a").html("Sound Player").attr("href", "#").on("click", function (event) { open_player(true); return false; }));
		$("#navtopright").prepend(T("["));
		end = "] ";
	}
	else {
		$(".letters").append(T(" [ "));
		$(".letters").append(E("a").html("Sound Player").attr("href", "#").on("click", function (event) { open_player(true); return false; }));
		$(".letters").append(reload = E("span"));
		end = " ]";
	}

	reload.append(reload_span = E("span").css("display", "none"));
	reload_span.append(T(" / "));
	reload_span.append(E("a").html("Reload").attr("href", "#").on("click", function (event) { sound_player_settings_save(open_player(false)); return false; }));
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
function inline_post_parse(post_data, redo) {
	if (post_data.image_url != null) {
		if (redo) {
			// Re-replace
			post_data.post.find(".SPLoadLink").each(function (index) {
				var tag_id = parseInt($(this).attr("_sp_tag_id"));

				$(this)
				.html(post_data.sounds[tag_id])
				.on("click", {"post_data": post_data, "tag_id": tag_id}, inline_link_click);
			});

			post_data.sounds.load_all_link
			.html(post_data.sounds.load_all_text)
			.on("click", {"post_data": post_data}, inline_load_all);
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
				"auto_check": {
					"search_span": null,
					"search_status": null
				}
			};

			// Replace tags in post
			var sounds_found = inline_replace_in_tag(post_data.post);

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
	sound_player_instance.attempt_load(
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

	// Load sound
	event.data.post_data.sounds.loaded = true;
	open_player(true);
	sound_player_instance.attempt_load(
		event.data.post_data.image_url,
		event.data.post_data.sounds.sound_names[event.data.sound_id],
		{
			"object": $(this),
			"post_data": event.data.post_data,
			"sound_id": event.data.sound_id,
			"load_str": load_str
		},
		function (event, data) {
			var progress = Math.floor((event.loaded / event.total) * 100);
			data.object.html(data.load_str + " (" + progress + ")");
		},
		function (okay, data) {
			data.object.html(data.post_data.sounds.sound_names[data.sound_id] + (okay ? "" : " (ajax&nbsp;error)"));
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
function inline_replace_in_tag(tag) {
	var found = false;
	var c = tag.contents();
	for (var j = 0; j < c.length; ++j) {
		var tag_name = $(c[j]).prop("tagName");
		if (tag_name == undefined) {
			found = (inline_replace_tags($(c[j])) || found);
		}
		else {
			tag_name = tag_name.toLowerCase();
			if (
				is_archive ?
				((tag_name == "span" && $(c[j]).hasClass("greentext")) || (tag_name == "span" && $(c[j]).hasClass("spoiler"))) :
				((tag_name == "span" && $(c[j]).hasClass("quote")) || tag_name == "s")
			) {
				// quote or spoiler
				found = (inline_replace_in_tag($(c[j])) || found);
			}
		}
	}
	return found;
}
function inline_replace_tags(container) {
	var sounds_found = false;
	var new_text = (container.text()/* + "[tag]"*/).replace(/\[.+?\]/g, function (match) {
		sounds_found = true;
		return "[<a class=\"SPLoadLink\">" + match.substr(1, match.length - 2) + "</a>]";
	});
	if (sounds_found) {
		container.after(new_text).remove();
		return true;
	}
	return false;
}
function inline_update_about_image(post_data) {
	post_data.sounds.about_container.css("display", "");
	var sound_count = 0;
	var file_count = post_data.sounds.sound_names.length;

	post_data.sounds.about_list_container.html("");
	for (var sound = true; ; sound = false) {
		for (var i = 0; i < post_data.sounds.sound_names.length; ++i) {
			var is_sound = (post_data.sounds.sound_names[i].split(".").pop().toLowerCase() == "ogg");
			if (sound == is_sound) {
				if (sound) {
					if (is_sound) ++sound_count;

					post_data.sounds.about_list_container
					.append(
						E("div")
						.append(T("- "))
						.append(
							E("a")
							.attr("href", "#")
							.addClass("SPLoadLinkTop")
							.html(post_data.sounds.sound_names[i].substr(0, post_data.sounds.sound_names[i].length - 4)) // remove extension
							.on("click", {"post_data": post_data, "sound_id": i}, inline_link_top_click)
						)
					);
				}
				else {
					post_data.sounds.about_list_container
					.append(
						E("div")
						.append(T("- "))
						.append(
							E("span")
							.addClass("SPLoadLinkTopFile")
							.html(post_data.sounds.sound_names[i])
						)
					);
				}
			}
		}

		// Done
		if (!sound) break;
	}

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
	sound_player_instance.attempt_load(
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
// Sound player control
///////////////////////////////////////////////////////////////////////////////
var sound_player_about = "To load sounds in the sound player, either click on links enclosed " +
	"in [square brackets,] or click and drag files (either by URL or " +
	"from a local folder) into the player."
var sound_player_instance = null;
var sound_player_css = null;
var sound_player_css_color_presets = {
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
var sound_player_css_size_presets = {
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
var sound_player_settings = {
	"player": {},
	"style": {}
};
var sound_player_settings_loaded = false;

function sound_player_settings_save(sound_player) {
	// Get settings
	sound_player_settings = {
		"player": sound_player.save(),
		"style": sound_player.css.save()
	};
	// Save
	try {
		localStorage.setItem("4cs", JSON.stringify(sound_player_settings));
	}
	catch (e) {
		console.log(e);
	}
}
function sound_player_destruct_callback(sound_player) {
	// Nullify
	sound_player_instance = null;
	sound_player_css = null;
	// Save settings
	sound_player_settings_save(sound_player);
}

function open_player(load_settings) {
	if (sound_player_instance != null) {
		// Focus player
		sound_player_instance.focus();
		return sound_player_instance;
	}

	// Settings
	if (load_settings && !sound_player_settings_loaded) {
		sound_player_settings_loaded = true;
		try {
			var s = localStorage.getItem("4cs");
			sound_player_settings = (s ? JSON.parse(s) : sound_player_settings);
		}
		catch (e) {
			console.log(e);
		}
	}

	// CSS
	sound_player_css = new MediaPlayerCSS("yotsubab", sound_player_css_color_presets, sound_player_css_size_presets);
	// Load CSS settings
	if (load_settings) sound_player_css.load(sound_player_settings["style"]);
	// Player
	sound_player_instance = new MediaPlayer(
		sound_player_css,
		[ png_load_callback , image_load_callback ],
		sound_player_settings_save,
		sound_player_destruct_callback,
		sound_player_about
	);
	// Load settings	
	if (load_settings) sound_player_instance.load(sound_player_settings["player"]);
	// Display
	sound_player_instance.create();

	// Test loading image
	sound_player_instance.attempt_load_video("https://www.youtube.com/watch?v=UnURElCzGc0");

	return sound_player_instance;
}




///////////////////////////////////////////////////////////////////////////////
// Entry
///////////////////////////////////////////////////////////////////////////////
var thread_manager = null;
jQuery(document).ready(function () {
	// Youtube API
	window.YT = null;
	$.getScript(
		"//www.youtube.com/iframe_api",
		function (script, status, jqXHR) {}
	);

	inline_setup();
	thread_manager = new ThreadManager();
});

unsafeWindow.onYouTubeIframeAPIReady = function () {
	window.YT = unsafeWindow.YT;
}



