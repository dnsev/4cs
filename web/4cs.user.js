// ==UserScript==
// @name           4chan Sound Player
// @version        1.0
// @namespace      dnsev
// @description    4chan Sound Player
// @grant          GM_xmlhttpRequest
// @include        http://boards.4chan.org/*
// @include        https://boards.4chan.org/*
// @include        http://archive.foolz.us/*
// @include        https://archive.foolz.us/*
// @require        https://raw.github.com/dnsev/4cs/master/web/jquery.js
// @require        https://raw.github.com/dnsev/4cs/master/web/zlib.js
// @require        https://raw.github.com/dnsev/4cs/master/web/png.js
// @require        https://raw.github.com/dnsev/4cs/master/web/SoundPlayer.js
// @updateURL      https://raw.github.com/dnsev/4cs/master/web/4cs.user.js
// @downloadURL    https://raw.github.com/dnsev/4cs/master/web/4cs.user.js
// ==/UserScript==



///////////////////////////////////////////////////////////////////////////////
// Any images
///////////////////////////////////////////////////////////////////////////////
function string_to_uint8array(str) {
	var array = new Uint8Array(new ArrayBuffer(str.length));
	for (var i = 0; i < str.length; ++i) {
		array[i] = str.charCodeAt(i);
	}
	return array;
}

function image_load_callback(url_or_filename, load_tag, raw_ui8_data) {
	// Not an image
	var ext = url_or_filename.split(".").pop().toLowerCase();
	if (ext != "png" && ext != "gif" && ext != "jpg" && ext != "jpeg") return null;

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
					"flagged": (load_tag != SoundPlayer.ALL_SOUNDS && load_tag.toLowerCase() != tag.toLowerCase()),
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
	if (sounds.length == 0) return null;
	// Single sound?
	if (load_tag != SoundPlayer.ALL_SOUNDS) {
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
	return sounds;
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
function DataImage (source_location, load_callback) {
	if (load_callback === undefined) load_callback = function () {};

	this.load_callback = load_callback;

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
				self.pixels = png.decodePixels();111

				self.width = self.image.width;
				self.height = self.image.height;

				self.color_depth = (png.hasAlphaChannel ? 4 : 3);

				self.load_callback(self);
			});1
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
	catch (e) {
		this.error = true;
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

function png_load_callback(url_or_filename, load_tag, raw_ui8_data) {
	// Not a PNG
	if (url_or_filename.split(".").pop().toLowerCase() != "png") return null;

	// Load image from data
	var img = new DataImage(raw_ui8_data);

	// Unpack files
	var reader = new DataImageReader(img);
	var r = reader.unpack();
	if (typeof(r) == typeof("")) {
		// Error
		return null;
	}

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
			if (load_tag === SoundPlayer.ALL_SOUNDS) {
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
			return null;
		}
	}

	// Done
	return ret;
}



///////////////////////////////////////////////////////////////////////////////
// Inline text
///////////////////////////////////////////////////////////////////////////////
var is_archive = ((document.location + "").indexOf("boards.4chan.org") < 0);
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

	// Update content
	$(is_archive ? ".post,.thread" : ".postContainer").each(function (index) { inline_post_parse($(this), false); });

	// Content updating
	var MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
	if (MutationObserver) {
		try {
			var mo = new MutationObserver(function (records) {
				for (var i = 0; i < records.length; ++i) {
					if (records[i].type == "childList" && records[i].addedNodes){
						for (var j = 0; j < records[i].addedNodes.length; ++j) {
							// Check
							inline_dom_mutation($(records[i].addedNodes[j]));
						}
					}
				}
			});
			mo.observe(
				$(".board")[0],
				{
					"childList": true,
					"subtree": true,
					"characterData": true
				}
			);
		}
		catch (e) {
			MutationObserver = null;
		}
	}
	if (!MutationObserver) {
		$($(".board")[0]).on("DOMNodeInserted", function (event) {
			inline_dom_mutation($(event.target));
			return true;
		});
	}
}
function inline_post_parse(container, redo) {
	var image, post;
	if ((image = container.find(is_archive ? ".thread_image_link" : ".fileThumb")).length > 0 && (post = container.find(is_archive ? ".text" : ".postMessage")).length > 0) {
		var load_all_text = "sounds";
		var image_url = image.attr("href");
		if (!(/http\:/.test(image_url))) image_url = "http:" + image_url;

		if (redo) {
			post.find(".SPLoadLink").each(function (index) {
				var tag = $(this).attr("_sp_link");
				$(this).html(tag).on("click", {"image_url": image_url, "tag": tag}, inline_link_click);
			});
			container.find(".SPLoadAllLink").html(load_all_text).on("click", {"image_url": image_url, "text": load_all_text}, inline_load_all);
		}
		else {
			// Replace tags in post
			var sounds_found = inline_replace_in_tag(post);

			// Replacements
			if (sounds_found) {
				//post.html(post_html);

				post.find(".SPLoadLink").each(function (index) {
					$(this).attr("href", "#").attr("_sp_link", $(this).html()).on("click", {"image_url": image_url, "tag": $(this).html()}, inline_link_click);
				});

				if (is_archive) {
					var file_size_label = container.find(".post_file_controls").find("a");
					file_size_label = $(file_size_label[file_size_label.length - 1]);
					file_size_label.after(E("a").addClass("SPLoadAllLink btnr parent").attr("href", "#").html(load_all_text).on("click", {"image_url": image_url, "text": load_all_text}, inline_load_all));
				}
				else {
					var file_size_label = container.find(".fileText");
					file_size_label.after(E("a").addClass("SPLoadAllLink").attr("href", "#").html(load_all_text).on("click", {"image_url": image_url, "text": load_all_text}, inline_load_all));
					file_size_label.after(T(" "));
				}
			}
		}
	}
}
function inline_link_click(event) {
	// Change status
	var load_str = "loading...";
	$(this).html(load_str);

	// Load sound
	open_player(true);
	sound_player_instance.attempt_load(
		event.data.image_url,
		event.data.tag,
		{
			"object": $(this),
			"image_url": event.data.image_url,
			"tag": event.data.tag,
			"load_str": load_str
		},
		function (event, data) {
			var progress = Math.floor((event.loaded / event.total) * 100);
			data.object.html(data.load_str + " (" + progress + ")");
		},
		function (okay, data) {
			data.object.html(data.tag + (okay ? "" : " (ajax&nbsp;error)"));
		},
		function (status, data) {
		}
	);

	// Done
	return false;
}
function inline_load_all(event) {
	// Change status
	var load_str = "loading...";
	$(this).html(load_str);

	// Load sound
	open_player(true);
	sound_player_instance.attempt_load(
		event.data.image_url,
		SoundPlayer.ALL_SOUNDS,
		{
			"object": $(this),
			"image_url": event.data.image_url,
			"text": event.data.text,
			"load_str": load_str
		},
		function (event, data) {
			var progress = Math.floor((event.loaded / event.total) * 100);
			data.object.html(data.load_str + " (" + progress + ")");
		},
		function (okay, data) {
			data.object.html(data.text + (okay ? "" : " (ajax&nbsp;error)"));
		},
		function (status, data) {
		}
	);

	// Done
	return false;
}
function inline_dom_mutation(target) {
	// Updating
	if (target.hasClass("inline")) {
		inline_post_parse(target, true);
	}
	else if (target.hasClass("postContainer")) {
		inline_post_parse(target, false);
	}
	else if (target.hasClass("backlinkHr")) {
		inline_post_parse(target.parent().parent(), true);
	}
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
			if ((tag_name == "span" && $(c[j]).hasClass("quote")) || tag_name == "s") {
				// quote or spoiler
				found = (inline_replace_in_tag($(c[j])) || found);
			}
		}
	}
	return found;
}
function inline_replace_tags(container) {
	var sounds_found = false;
	var new_text = container.text().replace(/\[.+?\]/g, function (match) {
		sounds_found = true;
		return "[<a class=\"SPLoadLink\">" + match.substr(1, match.length - 2) + "</a>]";
	});
	if (sounds_found) {
		container.after(new_text).remove();
		return true;
	}
	return false;
}



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
	catch (e) {}
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
		catch (e) {}
	}

	// CSS
	sound_player_css = new SoundPlayerCSS("yotsubab", sound_player_css_color_presets, sound_player_css_size_presets);
	// Load CSS settings
	if (load_settings) sound_player_css.load(sound_player_settings["style"]);
	// Player
	sound_player_instance = new SoundPlayer(
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

	return sound_player_instance;
}



///////////////////////////////////////////////////////////////////////////////
// Helpers
///////////////////////////////////////////////////////////////////////////////
function j2s(j,t){var s="{",i=!!0,k,t2=t=(t||"");t+="\t";for(k in j){s+=(i?",\n":"\n")+t+k+": ";if(typeof(j[k])===typeof({})){s+=j2s(j[k],t);}else{s+="\""+j[k]+"\"";}i=true;}return s+(i?"\n"+t2:"")+"}";}
function E(elem) {
	return jQuery(document.createElement(elem));
}
function T(text) {
	return jQuery(document.createTextNode(text));
}



///////////////////////////////////////////////////////////////////////////////
// Entry
///////////////////////////////////////////////////////////////////////////////
jQuery(document).ready(function () { inline_setup(); });





