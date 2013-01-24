#! /usr/bin/env python
import os, sys, datetime, binascii;


class Reader:
	def __init__(self, src):
		self.src = src;
		self.pos = 0;

	def read_data(self, length):
		s = self.src[self.pos : self.pos + length];
		self.pos += length;
		return s;

	def data_to_int(self, data):
		r = 0;
		for i in range(len(data)):
			r = r | (ord(data[i]) << (i * 8));
		return r;

	def eof(self):
		return self.pos >= len(self.src);


class ZipReader:
	class Exception(Exception):
		def __init__(self, msg):
			self.msg = msg;

		def __str__(self):
			return self.msg;

	def __init__(self, src):
		self.zip = Reader(src);
		self.files = [];
		self.central_directory = [];

	def read(self):
		while (not self.zip.eof()):
			signature = self.zip.data_to_int(self.zip.read_data(4));
			if (signature == 0x04034b50):
				self.read_local_file();
			elif (signature == 0x02014b50):
				self.read_cdfh();
			elif (signature == 0x06054b50):
				self.read_cd_end();
				break;
			else:
				raise ZipReader.Exception("Invalid ZIP signature (" + str(hex(signature)) + ")");

	def read_local_file(self):
		f = {};
		f["version"] = self.zip.data_to_int(self.zip.read_data(2));
		f["bitflag"] = self.zip.data_to_int(self.zip.read_data(2));
		f["compression"] = self.zip.data_to_int(self.zip.read_data(2));
		modify_time = self.zip.data_to_int(self.zip.read_data(2));
		modify_date = self.zip.data_to_int(self.zip.read_data(2));
		f["crc32"] = self.zip.data_to_int(self.zip.read_data(4));
		f["compressed_size"] = self.zip.data_to_int(self.zip.read_data(4));
		f["uncompressed_size"] = self.zip.data_to_int(self.zip.read_data(4));
		filename_len = self.zip.data_to_int(self.zip.read_data(2));
		extra_len = self.zip.data_to_int(self.zip.read_data(2));
		f["filename"] = self.zip.read_data(filename_len);
		f["extra"] = self.zip.read_data(extra_len);

		f["modify_time"] = self.get_mod_time(modify_time, modify_date);

		f["data"] = self.zip.read_data(f["compressed_size"]);

		if (f["bitflag"] & (1 << 3)):
			print "TODO";

		self.files.append(f);

		return f;

	def read_cdfh(self):
		cdfh = {};
		cdfh["version"] = self.zip.data_to_int(self.zip.read_data(2));
		cdfh["version_needed"] = self.zip.data_to_int(self.zip.read_data(2));
		cdfh["bitflag"] = self.zip.data_to_int(self.zip.read_data(2));
		cdfh["compression"] = self.zip.data_to_int(self.zip.read_data(2));
		modify_time = self.zip.data_to_int(self.zip.read_data(2));
		modify_date = self.zip.data_to_int(self.zip.read_data(2));
		cdfh["modify_time"] = self.get_mod_time(modify_time, modify_date);
		cdfh["crc32"] = self.zip.data_to_int(self.zip.read_data(4));
		cdfh["compressed_size"] = self.zip.data_to_int(self.zip.read_data(4));
		cdfh["uncompressed_size"] = self.zip.data_to_int(self.zip.read_data(4));
		filename_len = self.zip.data_to_int(self.zip.read_data(2));
		extra_len = self.zip.data_to_int(self.zip.read_data(2));
		comment_len = self.zip.data_to_int(self.zip.read_data(2));
		cdfh["disk_number_start"] = self.zip.data_to_int(self.zip.read_data(2));
		cdfh["interal_attr"] = self.zip.data_to_int(self.zip.read_data(2));
		cdfh["exteral_attr"] = self.zip.data_to_int(self.zip.read_data(4));
		cdfh["local_header_offset"] = self.zip.data_to_int(self.zip.read_data(4));


		cdfh["filename"] = self.zip.read_data(filename_len);
		cdfh["extra"] = self.zip.read_data(extra_len);
		cdfh["comment"] = self.zip.read_data(comment_len);

		self.central_directory.append(cdfh);
		return cdfh;

	def read_cd_end(self):
		disk_number = self.zip.data_to_int(self.zip.read_data(2));
		disk_number_with_cd = self.zip.data_to_int(self.zip.read_data(2));
		disk_entries = self.zip.data_to_int(self.zip.read_data(2));
		total_entries = self.zip.data_to_int(self.zip.read_data(2));
		cd_size = self.zip.data_to_int(self.zip.read_data(4));
		cd_offset = self.zip.data_to_int(self.zip.read_data(4));
		comment_len = self.zip.data_to_int(self.zip.read_data(2));
		comment = self.zip.read_data(comment_len);

		print "disk_number:", disk_number;
		print "disk_number_with_cd:", disk_number_with_cd;
		print "disk_entries:", disk_entries;
		print "total_entries:", total_entries;
		print "cd_size:", cd_size;
		print "cd_offset:", cd_offset;
		print "comment:", comment;
		print "\n";

	def get_mod_time(self, modify_time, modify_date):
		return (
			((modify_date >> 9) & ((1 << 7) - 1)) + 1980,
			((modify_date >> 5) & ((1 << 4) - 1)),
			((modify_date) & ((1 << 5) - 1)),
			((modify_time >> 11) & ((1 << 5) - 1)),
			((modify_time >> 5) & ((1 << 6) - 1)),
			((modify_time) & ((1 << 5) - 1)) * 2
		);


class ZipWriter:
	def __init__(self):
		self.file = open("test.zip", "wb");

	def close(self):
		self.file.close();

	def write(self, files):
		offsets = [];
		crc32s = [];
		mod_time, mod_date = self.current_date();
		for f in files:
			crc = binascii.crc32(f[1]);
			offsets.append(self.file.tell());
			crc32s.append(crc);

			self.write_data(0x04034b50, 4); # Signature
			self.write_data(20, 2); # Version
			self.write_data(0, 2); # Flags
			self.write_data(0, 2); # Compression
			self.write_data(mod_time, 2); # Mod time
			self.write_data(mod_date, 2); # Mod date
			self.write_data(crc, 4);
			self.write_data(len(f[1]), 4);
			self.write_data(len(f[1]), 4);
			self.write_data(len(f[0]), 2);
			self.write_data(0, 2);
			self.write_data(f[0]);
			self.write_data(f[1]);

		# Central directory
		cd_pos = self.file.tell();
		for i in range(len(files)):
			f = files[i];

			self.write_data(0x02014b50, 4); # Signature
			self.write_data(20, 2); # Version
			self.write_data(20, 2); # Version required
			self.write_data(0, 2); # Flags
			self.write_data(0, 2); # Compression
			self.write_data(mod_time, 2); # Mod time
			self.write_data(mod_date, 2); # Mod date
			self.write_data(crc32s[i], 4); # CRC
			self.write_data(len(f[1]), 4); # Compressed size
			self.write_data(len(f[1]), 4); # Uncompressed size
			self.write_data(len(f[0]), 2); # File name length
			self.write_data(0, 2); # Extra field length
			self.write_data(0, 2); # Comment length
			self.write_data(0, 2); # Disk number start
			self.write_data(0, 2); # Internal attr
			self.write_data(32, 4); # External attr
			self.write_data(offsets[i], 4); # Offset
			self.write_data(f[0]); # File name

		# End
		cd_end_pos = self.file.tell();
		comment = "";
		self.write_data(0x06054b50, 4); # Signature
		self.write_data(0, 2); # Disk number
		self.write_data(0, 2); # Disk number with cd
		self.write_data(len(files), 2); # Disk entries
		self.write_data(len(files), 2); # Total entries
		self.write_data(cd_end_pos - cd_pos, 4); # cd size
		self.write_data(cd_pos, 4); # cd size
		self.write_data(len(comment), 2); # comment
		self.write_data(comment); # comment


	def write_data(self, data, bytes=0):
		if (type(data) is type("")):
			self.file.write(data);
		else:
			data = data & 0xFFFFFFFF;
			for b in range(bytes):
				self.file.write(chr(data & 0xFF));
				data = data >> 8;

	def current_date(self):
		d = datetime.datetime.now();
		mod_time = ((d.second / 2) | (d.minute << 5) | (d.hour << 11));
		mod_date = (d.day | (d.month << 5) | ((d.year - 1980) << 9));

		return ( mod_time , mod_date );


def main():
	f = open("1.zip", "rb");
	src = f.read();
	f.close();
	zip = ZipReader(src);
	zip.read();

	for r in zip.files:
		print "-" * 80;
		print "version:", r["version"];
		print "bitflag:", r["bitflag"];
		print "compression:", r["compression"];
		print "time:", r["modify_time"][0], "/", r["modify_time"][1], "/", r["modify_time"][2], "@", r["modify_time"][3], ":", r["modify_time"][4], ":", r["modify_time"][5];
		print "crc32:", r["crc32"];
		print "compressed_size:", r["compressed_size"];
		print "uncompressed_size:", r["uncompressed_size"];
		print "filename:", r["filename"];
		print "extra:", r["extra"];
		print "-" * 80;
		print "\n";

	for r in zip.central_directory:
		print "-" * 80;
		print "version:", r["version"];
		print "version_needed:", r["version_needed"];
		print "bitflag:", r["bitflag"];
		print "compression:", r["compression"];
		print "time:", r["modify_time"][0], "/", r["modify_time"][1], "/", r["modify_time"][2], "@", r["modify_time"][3], ":", r["modify_time"][4], ":", r["modify_time"][5];
		print "crc32:", r["crc32"];
		print "compressed_size:", r["compressed_size"];
		print "uncompressed_size:", r["uncompressed_size"];
		print "disk_number_start:", r["disk_number_start"];
		print "interal_attr:", r["interal_attr"];
		print "exteral_attr:", r["exteral_attr"];
		print "local_header_offset:", r["local_header_offset"];
		print "filename:", r["filename"];
		print "extra:", r["extra"];
		print "-" * 80;
		print "\n";


	ZipWriter().write([["test.txt", "content goes here"]]);


	# Done
	return 0;


# Run
if (__name__ == "__main__"): sys.exit(main());

