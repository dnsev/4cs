#! /usr/bin/env python
import os, sys, lib.imglib as imglib;


def main():
	# Settings
	output_prefix = "";
	output_suffix = "-extracted";
	self_set = False;

	# Read params
	errors = list();
	can_flag = True;
	file = None;
	i = 1;
	while (i < len(sys.argv)):
		# Flags
		if (can_flag and len(sys.argv[i]) >= 1 and sys.argv[i][0] == '-'):
			if (sys.argv[i] == "--"):
				can_flag = False;
			elif (sys.argv[i] in ( "-p" , "-pre" , "-prefix" )):
				i += 1;
				if (i >= len(sys.argv)): break;
				output_prefix = sys.argv[i];
				if (not self_set):
					self_set = True;
					output_suffix = "";
			elif (sys.argv[i] in ( "-s" , "-suf" , "-suffix" )):
				i += 1;
				if (i >= len(sys.argv)): break;
				output_suffix = sys.argv[i];
				if (not self_set):
					self_set = True;
					output_prefix = "";

		# Non-flags
		else:
			if (file == None):
				file = sys.argv[i];

		# Next
		i += 1;

	# Usage
	if (file == None):
		print "Usage:";
		print "    " + os.path.basename(sys.argv[0]) + " [-p ...] [-s ...] image.png";
		print "";
		print "    -p prefix : set the prefix of the filenames to be extracted";
		print "              : default prefix is \"\"";
		print "";
		print "    -s suffix : set the suffix of the filenames to be extracted";
		print "              : default suffix is \"-extracted\"";
		print "";
		print "    image.png : the file to extract data from";
		print "";
		print "";
		print "    Also note, placing a \"--\" parameter causes any remaining parameters to be treated as files";

		return -1;

	# Load image
	print "Loading image...";
	try:
		image = imglib.Image(file);
		#print repr(image.get_pixel(0,0));
	except:
		print "Error loading image file \"" + file + "\"";
		return -1;

	# Extract data
	print "Extracting...";
	ir = imglib.ImageReader(image);
	result = ir.unpack(output_prefix, output_suffix);
	if (result != True):
		print "Error: " + str(result);
		return -1;

	# Done
	print "Done";
	return 0;


# Execute
if (__name__ == "__main__"): sys.exit(main());


