#! /usr/bin/env python
import os, sys, math;

width = 1000;
height = 1001;
channels = 3;


def get_bit_requirement(sources, file_sizes):
	# Filesize bounds
	total_bits = 0;
	for i in range(len(sources)):
		#                                  16 = length for int16 of filename length
		#                                  32 = length for int32 of file size
		#                   file_sizes[i] * 8 = 8 bits per byte
		# len(sources[i].encode("utf-8")) * 8 = length of filename
		total_bits += 16 + 32 + file_sizes[i] * 8 + len(sources[i].encode("utf-8")) * 8;

	return ( total_bits , file_sizes );

def get_bit_availability(bitmask, metadata_length, scatter):
	metadata_bits = 16;
	if (metadata_length > 0): metadata_bits += 16 + metadata_length * 8;
	if (scatter): metadata_bits += (32 - 1) / bitmask * bitmask + bitmask;
	return (width * height * channels - 1 - 1 - 1) * bitmask - metadata_bits;

def main():
	global width, height, channels;

	sources = ["asdf.txt"];
	file_sizes = [835464];
	bitmask = 0;
	meta = "";
	scatter = False;

	avail = 0;
	req = get_bit_requirement(sources, file_sizes)[0];
	while (req > avail and bitmask <= 8):
		bitmask += 1;
		avail = get_bit_availability(bitmask, len(meta), scatter);

	if (bitmask > 8):
		print "Size error";
		return -1;

	# Check min size fit
	print "Fit at bitmask = " + str(bitmask);
	print "Required = " + str(req);
	print "Available = " + str(avail);
	print "";

	# Best size
	# Brute force method
	if (width >= height):
		best_w = width;
		best_h = height;

		w = width;
		h = height;

		scale = float(width) / height;
		offset = 0;

		while (width - offset > 0):
			width = w - offset;
			height = int(math.ceil(h - offset * scale));

			avail = get_bit_availability(bitmask, len(meta), scatter);
			if (req > avail): break;

			best_w = width;
			best_h = height;
			offset += 1;

		print "Optimal size:",width,"x",height;

	else:
		best_w = width;
		best_h = height;

		w = width;
		h = height;

		scale = float(height) / width;
		offset = 0;

		while (height - offset > 0):
			height = h - offset;
			width = int(math.ceil(w - offset * scale));

			avail = get_bit_availability(bitmask, len(meta), scatter);
			if (req > avail): break;

			best_w = width;
			best_h = height;
			offset += 1;

		print "Optimal size:",width,"x",height;


# Execute
if (__name__ == "__main__"): sys.exit(main());


