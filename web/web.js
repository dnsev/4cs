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
		self.image = new PNG(source_location);
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


function imageOnLoad(img) {
	var reader = new DataImageReader(img);
	var r = reader.unpack();
	if (typeof(r) == typeof("")) {
		// TODO : Error
		//alert("Error unpacking: " + r);
	}
	else {
		// Loaded
		alert(r[0][0]);
	}
}


function loadTest() {
	image_url = "test-embed.png";

	// Load image
	image = new DataImage(image_url, imageOnLoad);
}




