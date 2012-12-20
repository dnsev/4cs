#! /usr/bin/env python
import os, sys, lib.imglib as imglib;


def main():
	# Settings
	filesize_limit = 1024 * 1024 * 3;
	bitmask = None;
	output_file = None;
	randomize_all = True;
	alpha_channel = None;

	# Read params
	errors = list();
	file_list = list();
	can_flag = True;
	i = 1;
	while (i < len(sys.argv)):
		# Flags
		if (can_flag and len(sys.argv[i]) >= 1 and sys.argv[i][0] == '-'):
			if (sys.argv[i] == "--"):
				can_flag = False;
			elif (sys.argv[i] in ( "-b" , "-bitmask" )):
				i += 1;
				if (i >= len(sys.argv)): break;
				if (sys.argv[i].lower() == "auto"):
					bitmask = None;
				else:
					try:
						bitmask = int(sys.argv[i]);
					except:
						errors.append("Invalid bitmask \"" + sys.argv[i] + "\"");
						bitmask = None;
					if (bitmask < 1 or bitmask > 8):
						errors.append("Invalid bitmask value \"" + sys.argv[i] + "\"");
						bitmask = None;
			elif (sys.argv[i] in ( "-s" , "-size" , "-size_limit" )):
				i += 1;
				if (i >= len(sys.argv)): break;
				v = sys.argv[i].lower();
				try:
					scale = 1;
					if (v[-1] == "k"):
						scale = 1024;
						v = v[:-1];
					elif (v[-1] == "m"):
						scale = 1024 * 1024;
						v = v[:-1];
					filesize_limit = int(float(v) * scale);
					if (filesize_limit < 0):
						errors.append("Invalid filesize limit \"" + sys.argv[i] + "\"");
				except:
					errors.append("Invalid filesize limit \"" + sys.argv[i] + "\"");
			elif (sys.argv[i] in ( "-o" , "-out" , "-output" )):
				i += 1;
				if (i >= len(sys.argv)): break;
				output_file = sys.argv[i];
				if (output_file[-4:].lower() != ".png"):
					output_file += ".png";
			elif (sys.argv[i] in ( "-r" , "-rand" , "-randomize" )):
				i += 1;
				if (i >= len(sys.argv)): break;
				if (sys.argv[i].lower() in ( "on" , "all" , "yes" , "true" , "1" , "enable" , "enabled" )):
					randomize_all = True;
				elif (sys.argv[i].lower() in ( "off" , "no" , "none" , "false" , "0" , "disable" , "disabled" )):
					randomize_all = False;
				else:
					errors.append("Invalid randomizer setting \"" + sys.argv[i] + "\"");
			elif (sys.argv[i] in ( "-a" , "-alpha" )):
				i += 1;
				if (i >= len(sys.argv)): break;
				if (sys.argv[i].lower() in ( "on" , "all" , "yes" , "true" , "1" , "enable" , "enabled" )):
					alpha_channel = 4;
				elif (sys.argv[i].lower() in ( "off" , "no" , "none" , "false" , "0" , "disable" , "disabled" )):
					alpha_channel = 3;
				else:
					errors.append("Invalid alpha setting \"" + sys.argv[i] + "\"");

		# Non-flags
		else:
			file_list.append(sys.argv[i]);

		# Next
		i += 1;

	# Errors
	for e in errors:
		print "Flag error: " + str(e);

	# Usage
	if (len(file_list) == 0):
		print "Usage:";
		print "    " + os.path.basename(sys.argv[0]) + " [-b ...] [-s ...] [-o ...] [-r ...] [-a ...] image.png file1.txt file2.txt ...";
		print "";
		print "    -b bitmask : set the amount of bits per color component to be used to store data";
		print "               : valid values are 1, 2, 3, 4, 5, 6, 7, and 8";
		print "               : smaller values cause a smaller impact on the image, but need more space";
		print "";
		print "    -s size : set the amount of bits per color component to be used to store data";
		print "            : valid values are positive numbers, with a possible suffix of \"k\" or \"m\"";
		print "            : value of 0 indicates no size limit";
		print "            : example:  -s 3m";
		print "";
		print "    -o output : set the filename to output to";
		print "              : if the extension is not \".png\", a \".png\" will be appended";
		print "";
		print "    -r randomize : randomize pixels after data is stored";
		print "                 : when enabled, it maintains the \"fuzzy\" look of the image";
		print "                 : (i.e. no band of clean pixels as the end)";
		print "                 : values are \"1\", \"0\", \"on\", \"off\", \"yes\", \"no\", etc.";
		print "";
		print "    -a alpha : force alpha channel to be on or off";
		print "             : potentially adds or removes the alpha layer";
		print "             : values are \"1\", \"0\", \"on\", \"off\", \"yes\", \"no\", etc.";
		print "";
		print "    image.png : the file to embed data in";
		print "";
		print "    embed_file?.png : a list of files to store";
		print "";
		print "";
		print "    Also note, placing a \"--\" parameter causes any remaining parameters to be treated as files";

		return -1;

	# Sources
	sources = list();
	if (len(file_list) >= 2):
		# Filenames
		sources = file_list[1:];
		if (output_file == None):
			# Get the filename
			prefix = "";
			suffix = "-embed";
			p = os.path.splitext(os.path.basename(file_list[0]));
			p = os.path.abspath(os.path.normpath(prefix + p[0] + suffix + p[1]));
			output_file = p;
			p = os.path.dirname(p);
			try: os.makedirs(p);
			except: pass;


	# Filesize loop
	min_filesize = None;
	filesize_loop = True;
	while (filesize_loop):
		filesize_loop = False;

		# Load image
		print "Loading image...";
		try:
			image = imglib.Image(file_list[0], alpha_channel);
			if (image.alpha_override):
				print "Image alpha channel settings changed to \"" + ("on" if alpha_channel == 4 else "off") + "\"";
		except:
			print "Error loading image file \"" + file_list[0] + "\"";
			return -1;

		# Info
		if (len(file_list) == 1):
			# Print info about the file
			pad = "    ";
			print "Image stats for \"" + file_list[0] + "\":";
			print pad + image.stats().replace("\n", "\n" + pad).strip();

			# Done
			return 0;

		# Create image writer
		iw = imglib.ImageWriter(image);
		iw.randomize_all = randomize_all;

		# Bitmask checking
		bitmask_defined = True;
		if (bitmask == None):
			bitmask_defined = False;
			bitmask = 1;
		bitmask_changed = False;
		while (bitmask < 8):
			if (iw.get_bit_requirement(sources)[0] > iw.get_bit_availability(bitmask)):
				bitmask += 1;
				bitmask_changed = True;
			else:
				break;
		if (not bitmask_defined):
			print "Using bitmask of " + str(bitmask) + " to be able to fit data";
		elif (bitmask_changed):
			print "Warning: Changed bitmask to " + str(bitmask) + " to be able to fit data";


		# Embed files
		print "Embedding...";
		iw.pack(sources, bitmask);

		# Write
		print "Writing...";
		image.write(output_file);


		# Filesize check
		fs = os.path.getsize(output_file);
		if (min_filesize == None): min_filesize = fs;
		else: min_filesize = min(min_filesize, fs);
		if (filesize_limit != 0 and fs > filesize_limit):
			try:
				os.remove(output_file);
			except:
				pass;
			if (randomize_all):
				filesize_loop = True;
				randomize_all = False;
				print "Warning: Changed randomization setting to \"off\" to attempt satisfy the filesize";
				print " limit of {0:,} bytes. (filesize achieved = {1:,} bytes)".format(filesize_limit, fs);
				print " (to bypass the filesize limit checker, use \"-s 0\")";
			elif (bitmask < 8):
				filesize_loop = True;
				bitmask += 1;
				print "Warning: Changed bitmask to " + str(bitmask) + " to attempt to satisfy the filesize";
				print " limit of {0:,} bytes. (filesize achieved = {1:,} bytes)".format(filesize_limit, fs);
				print " (to bypass the filesize limit checker, use \"-s 0\")";
			else:
				print "Error: Data could not be stored in {0:,} bytes.".format(filesize_limit);
				print " Filesize achieved was {0:,} bytes.".format(fs);
				print " Minimum filesize achieved was {0:,} bytes.".format(min_filesize);
				print " (to bypass the filesize limit checker, use \"-s 0\")";
				return -1;

	# Done
	print "Done";
	return 0;


# Execute
if (__name__ == "__main__"): sys.exit(main());


