


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



