#! /usr/bin/env python
import os, png, random;


class Image:
	def __init__(self, file, color_depth=None):
		# Read source
		f = open(file, "rb");
		image = png.Reader(file = f);
		image.read();

		try:
			src = image.asRGB8();
			self.color_depth = 3;
		except:
			src = image.asRGBA8();
			self.color_depth = 4;
		self.width = src[0];
		self.height = src[1];
		self.total_pixels = self.width * self.height * self.color_depth;
		self.pixels = list();

		self.alpha_override = False;

		if (color_depth == None or color_depth == self.color_depth):
			for row in src[2]:
				self.pixels.append(row);
		elif (color_depth == 3):
			self.alpha_override = True;
			self.color_depth = 3;
			for row in src[2]:
				r = list();
				for i in range(len(row)):
					if ((i % 4) < 3): r.append(row[i]);
				self.pixels.append(r);
		else:
			self.alpha_override = True;
			self.color_depth = 4;
			for row in src[2]:
				r = list();
				for i in range(len(row)):
					r.append(row[i]);
					if ((i % 3) == 2): r.append(255);
				self.pixels.append(r);
		f.close();

	def get_pixel(self, x, y):
		return self.pixels[y][x * self.color_depth : (x + 1) * self.color_depth];

	def set_pixel(self, x, y, color):
		i = 0;
		while (i < self.color_depth):
			self.pixels[y][x * self.color_depth + i] = color[i];
			i += 1;

	def write(self, file, comp = None):
		f = open(file, "wb");
		w = png.Writer(width = self.width, height = self.height, alpha = (self.color_depth == 4), compression = comp);
		w.write(f, self.pixels);
		f.close();

	def stats(self):
		src = "Width={0}; Height={1}; Channels={2}\n".format(self.width, self.height, self.color_depth);

		for i in range(1, 8 + 1):
			s = float(self.color_depth * self.width * self.height * i / 8);
			label = "B";
			if (s >= 1024):
				s /= 1024;
				label = "KB";
			if (s >= 1024):
				s /= 1024;
				label = "MB";
			src += "~{0:.1f}{1} storable @ bitmask={2}\n".format(s, label, i);

		return src;


class ImageWriter:
	class Exception(Exception):
		def __init__(self, msg):
			self.msg = msg;
		def __str__(self):
			return str(self.msg);
		def __repr__(self):
			return repr(self.msg);

	def __init__(self, image):
		self.image = image;
		self.bitmask = 1;
		self.value_mask = (1 << self.bitmask) - 1;
		self.pixel_mask = 0xFF - self.value_mask;
		self.x = 0;
		self.y = 0;
		self.c = 0;
		self.bit_value = 0;
		self.bit_count = 0;
		self.pixel = None;
		self.randomize_all = True;
		self.channels = self.image.color_depth;
		self.pixel_pos = 0;
		self.scatter_pos = 0;
		self.scatter_range = 0;
		self.scatter_full_range = 0;
		self.scatter = False;

	def get_bit_requirement(self, sources):
		# Filesize bounds
		total_bits = 0;
		file_sizes = list();
		for i in range(len(sources)):
			#                                  16 = length for int16 of filename length
			#                                  32 = length for int32 of file size
			#                   file_sizes[i] * 8 = 8 bits per byte
			# len(sources[i].encode("utf-8")) * 8 = length of filename
			file_sizes.append(os.path.getsize(sources[i]));
			total_bits += 16 + 32 + file_sizes[i] * 8 + len(sources[i].encode("utf-8")) * 8;

		return ( total_bits , file_sizes );

	def get_bit_availability(self, bitmask, metadata_length, scatter):
		metadata_bits = 16;
		if (metadata_length > 0): metadata_bits += 16 + metadata_length * 8;
		if (scatter): metadata_bits += (32 - 1) / bitmask * bitmask + bitmask;
		return (self.image.width * self.image.height * self.channels - 1 - 1 - 1) * bitmask - metadata_bits;

	def pack(self, sources, bitmask, scatter):
		if (bitmask < 1 or bitmask > 8): bitmask = 1;

		# Metadata
		metadata = "";

		# Filesize bounds
		total_bits, file_sizes = self.get_bit_requirement(sources);
		if (total_bits > self.get_bit_availability(bitmask, len(metadata), scatter)):
			raise ImageWriter.Exception("Data overflow; needed " + str(total_bits) + "; has " + str(self.get_bit_availability(bitmask)));

		# Init
		self.bitmask = bitmask;
		self.value_mask = (1 << self.bitmask) - 1;
		self.pixel_mask = 0xFF - self.value_mask;
		self.x = 0;
		self.y = 0;
		self.c = 0;
		self.bit_value = 0;
		self.bit_count = 0;
		self.pixel = self.image.get_pixel(self.x, self.y);
		self.channels = self.image.color_depth;
		self.pixelPos = 0;
		self.scatter = False;
		self.scatterPos = 0;
		self.scatterRange = 0;
		self.scatterFullRange = 0;

		# Super-meta
		self.__write_pixel(self.bitmask - 1, 0xF8, 0x07);
		flags = 0;
		if (len(metadata) > 0): flags = flags | 1;
		if (scatter): flags = flags | 2;
		if (self.channels == 4): flags = flags | 4;
		self.__write_pixel(flags, 0xF8, 0x07);

		# Scatter
		if (scatter):
			# Calculate
			self.scatter_range = self.get_bit_requirement(sources)[0];
			self.scatter_range += 2 * 8; # meta
			if (len(metadata) > 0): self.scatter_range += (2 + len(metadata)) * 8; # extra metadata length
			self.scatter_range += (self.bitmask - 1);v=self.scatter_range;
			self.scatter_range /= self.bitmask;

			# Write
			self.__embed_str(self.__int32_to_str(self.scatter_range));
			self.__complete_pixel();

			# Enable scatter
			self.scatter_pos = 0;
			self.scatter_full_range = ((self.image.width * self.image.height * self.channels) - self.pixel_pos - 1); # Total amount of pixel components used
			self.scatter = True;

		# Metadata
		if (len(metadata) > 0):
			self.__embed_str(self.__int16_to_str(len(metadata)));
			self.__embed_str(metadata);

		# File count
		self.__embed_str(self.__int16_to_str(len(sources)));

		# Filename lengths and file lengths
		for i in range(len(sources)):
			# Filename length
			self.__embed_str(self.__int16_to_str(len(sources[i].encode("utf-8"))));
			# File length
			self.__embed_str(self.__int32_to_str(file_sizes[i]));

		# Filenames
		for i in range(len(sources)):
			self.__embed_str(sources[i].encode("utf-8"));

		# Sources
		for i in range(len(sources)):
			f = open(sources[i], "rb");
			src = f.read();
			f.close();
			if (len(src) != file_sizes[i]):
				raise ImageWriter.Exception("File size was changed before embedding");
			# Embed source
			self.__embed_str(src);

		# Done
		self.__complete();
		return True;

	def next_pixel_component(self, count):
		while (count > 0):
			count -= 1;

			self.c = (self.c + 1) % self.channels;
			if (self.c == 0):
				self.image.set_pixel(self.x, self.y, self.pixel);

				self.x = (self.x + 1) % self.image.width;
				if (self.x == 0):
					self.y = (self.y + 1) % self.image.height;
					if (self.y == 0):
						raise ImageWriter.Exception("Pixel overflow");

				self.pixel = self.image.get_pixel(self.x, self.y);

	def __int16_to_str(self, value):
		return chr((value & 0xFF00) >> 8) + chr((value & 0xFF));
	def __int32_to_str(self, value):
		return chr((value & 0xFF000000) >> 24) + chr((value & 0xFF0000) >> 16) + chr((value & 0xFF00) >> 8) + chr((value & 0xFF));

	def __embed_str(self, str):
		i = 0;
		while (i < len(str)):
			self.bit_value |= (ord(str[i])) << self.bit_count;
			self.bit_count += 8;
			while (self.bit_count >= self.bitmask):
				# Embed
				self.__write_pixel(self.bit_value, self.pixel_mask, self.value_mask);
				# Update
				self.bit_value = self.bit_value >> self.bitmask;
				self.bit_count -= self.bitmask;
			i += 1;

	def __complete_pixel(self):
		if (self.bit_count > 0):
			self.__write_pixel(self.bit_value, self.pixel_mask, self.value_mask);
			self.bit_count = 0;
			self.bit_value = 0;

	def __complete(self):
		self.__complete_pixel();

		if (self.randomize_all and not self.scatter):
			random.seed(None);
			while (True):
				try:
					val = random.randint(0, self.value_mask * 2);
					self.__write_pixel(val, self.pixel_mask, self.value_mask)
				except:
					break;

	def __write_pixel(self, value, pixel_mask, value_mask):
		self.pixel[self.c] = (self.pixel[self.c] & pixel_mask) | (value & value_mask);

		if (self.scatter):
			self.scatter_pos += 1;
			v = (((self.scatter_pos * self.scatter_full_range / self.scatter_range) - ((self.scatter_pos - 1) * self.scatter_full_range / self.scatter_range)));
			self.pixel_pos += v;
			self.next_pixel_component(v);
		else:
			self.pixel_pos += 1;
			self.next_pixel_component(1);


class ImageReader:
	class Exception(Exception):
		def __init__(self, msg):
			self.msg = msg;
		def __str__(self):
			return str(self.msg);
		def __repr__(self):
			return repr(self.msg);

	def __init__(self, image):
		self.image = image;
		self.bitmask = 0;
		self.value_mask = 0;
		self.pixel_mask = 0xFF;
		self.x = 0;
		self.y = 0;
		self.c = 0;
		self.bit_value = 0;
		self.bit_count = 0;
		self.pixel = None;
		self.channels = 0;
		self.pixel_pos = 0;
		self.scatter_pos = 0;
		self.scatter_range = 0;
		self.scatter_full_range = 0;
		self.scatter = False;

	def unpack(self, prefix, suffix):
		try:
			return self.__unpack(prefix, suffix);
		except ImageReader.Exception as e:
			return "Error extracting data; image file likely doesn't contain data";
		except Exception as e:
			return "Error extracting data; image file likely doesn't contain data, or file error";

	def __unpack(self, prefix, suffix):
		# Init
		self.x = 0;
		self.y = 0;
		self.c = 0;
		self.bit_value = 0;
		self.bit_count = 0;
		self.pixel = self.image.get_pixel(self.x, self.y);
		self.pixel_pos = 0;
		self.scatter_pos = 0;
		self.scatter_range = 0;
		self.scatter_full_range = 0;
		self.scatter = False;
		self.channels = 3;

		# Read bitmask
		self.bitmask = 1 + self.__read_pixel(0x07);
		self.value_mask = (1 << self.bitmask) - 1;
		self.pixel_mask = 0xFF - self.value_mask;

		# Flags
		flags = self.__read_pixel(0x07);

		# Bit depth
		if ((flags & 4) != 0): self.channels = 4;

		# Scatter
		if ((flags & 2) != 0):
			# Read
			self.scatter_range = self.__str_to_int(self.__extract_str(4));
			self.__complete_pixel();

			# Enable scatter
			if (self.scatter_range > 0):
				self.scatter_pos = 0;
				self.scatter_full_range = ((self.image.width * self.image.height * self.channels) - self.pixel_pos - 1);
				self.scatter = True;

		# Metadata
		if ((flags & 1) != 0):
			meta_length = self.__str_to_int(self.__extract_str(2));
			meta = self.__extract_str(meta_length);

		# File count
		file_count = self.__str_to_int(self.__extract_str(2));

		# Filename lengths and file lengths
		filename_lengths = list();
		file_sizes = list();
		full_len = 0;
		for i in range(file_count):
			# Filename length
			val = self.__str_to_int(self.__extract_str(2))
			filename_lengths.append(val);
			full_len += val;
			# File length
			val = self.__str_to_int(self.__extract_str(4));
			file_sizes.append(val);
			full_len += val;


		# Error checking
		if (full_len * 8 > (((self.image.width * (self.image.height - self.y) - self.x) * self.channels) - self.c) * self.bitmask):
			# Data overflow
			raise ImageReader.Exception("Data overflow; image likely doesn't contain data");

		# Filenames
		filenames = list();
		filenames_alt = list();
		for i in range(file_count):
			# Filename
			filenames.append(self.__extract_str(filename_lengths[i]).decode("utf-8"));
			# Extract filename
			p = os.path.splitext(os.path.basename(filenames[-1]));
			p = os.path.abspath(os.path.normpath(prefix + p[0] + suffix + p[1]));
			filenames_alt.append(p);
			p = os.path.dirname(p);
			try: os.makedirs(p);
			except: pass;

		# Sources
		for i in range(file_count):
			# Read source
			src = self.__extract_str(file_sizes[i]);

			# Write
			f = open(filenames_alt[i], "wb");
			f.write(src);
			f.close();

		# Done
		return True;

	def next_pixel_component(self, count):
		while (count > 0):
			count -= 1;

			self.c = (self.c + 1) % self.channels;
			if (self.c == 0):
				self.x = (self.x + 1) % self.image.width;
				if (self.x == 0):
					self.y = (self.y + 1) % self.image.height;
					if (self.y == 0):
						raise ImageReader.Exception("Pixel overflow");

				self.pixel = self.image.get_pixel(self.x, self.y);

	def __extract_str(self, byte_length):
		src = "";
		i = self.bit_count;
		while (i < byte_length * 8):
			self.bit_value = self.bit_value | (self.__read_pixel(self.value_mask) << self.bit_count);
			self.bit_count += self.bitmask;
			while (self.bit_count >= 8):
				src += chr(self.bit_value & 0xFF);
				self.bit_value = self.bit_value >> 8;
				self.bit_count -= 8;
			i += self.bitmask;
		if (len(src) != byte_length):
			raise ImageReader.Exception("Length mismatch");
		return src;

	def __str_to_int(self, value):
		val = 0;
		for i in range(len(value)):
			val = (val << 8) + ord(value[i]);
		return val;

	def __complete_pixel(self):
		if (self.bit_count > 0):
			self.bit_count = 0;
			self.bit_value = 0;

	def __read_pixel(self, value_mask):
		value = (self.pixel[self.c] & value_mask);

		if (self.scatter):
			self.scatter_pos += 1;
			v = (((self.scatter_pos * self.scatter_full_range / self.scatter_range) - ((self.scatter_pos - 1) * self.scatter_full_range / self.scatter_range)));
			self.pixel_pos += v;
			self.next_pixel_component(v);
		else:
			self.pixel_pos += 1;
			self.next_pixel_component(1);
		return value;


