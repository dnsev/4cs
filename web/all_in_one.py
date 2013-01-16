#! /usr/bin/env python
import re, os, sys;


def main():
	# Usage
	if (len(sys.argv) < 3):
		print "Usage:"
		print "  " + sys.argv[0] + " input_userscript.js output_filename.js";
		return -1;

	# Input/output files
	input = sys.argv[1];
	output = sys.argv[2];
	shrink = (len(sys.argv) >= 4 && sys.argv[3] == "-min");
	if (input.lower() == output.lower()):
		print "Error: input and output scripts cannot be the same";
		return -1;

	# Read input
	f = open(input, "rb");
	source = f.read().splitlines();
	f.close();
	for i in range(len(source)): source[i] = source[i].rstrip();

	# Find headers
	metadata_labels = [ "UserScript" , "Meta" ];
	metadata = [];
	i = 0;
	for label in range(len(metadata_labels)):
		metadata.append([]);
		in_header = False;
		while (i < len(source)):
			s = re.split(r"\s", source[i]);
			if (s[0][:2] == "//"):
				# Comment line
				pos = source[i].find("//");
				data = source[i][pos + 2 : ].strip();
				if (in_header):
					if (data == ("==/" + metadata_labels[label] + "==")):
						i += 1;
						break;
					elif (data[0] == "@"):
						# Parse the option
						s = re.split(r"\s", data);
						param = s[0][1:];
						value = data[1 + len(param) : ].strip();
						metadata[label].append((param , value));
				elif (data == ("==" + metadata_labels[label] + "==")): in_header = True;
				else: break;
			else: break;
			i += 1;
	source_line_first = i;


	# Setup
	out = open(output, "wb"); # sys.stdout;
	padding = 0;
	newline = "\n";
	for i in range(len(metadata[0])): padding = max(padding, len(metadata[0][i][0]));
	for i in range(len(metadata[1])): padding = max(padding, len(metadata[1][i][0]));
	padding = padding + 1;
	requires = [];

	# Metadata
	out.write("// ==" + metadata_labels[0] + "==" + newline);
	for i in range(len(metadata[0])):
		if (metadata[0][i][0] != "require"):
			out.write("// @" + metadata[0][i][0] + (" " * (padding - len(metadata[0][i][0]))) + metadata[0][i][1] + newline);
		else:
			requires.append(metadata[0][i][1].rsplit("/", 1)[-1]);
	for i in range(len(metadata[1])):
		out.write("// @" + metadata[1][i][0] + (" " * (padding - len(metadata[1][i][0]))) + metadata[1][i][1].replace("{{target}}", output) + newline);
	out.write("// ==/" + metadata_labels[0] + "==" + newline + newline + newline);

	# Include requirements
	for i in range(len(requires)):
		out.write(("/" * 80) + newline);
		out.write("//{ " + requires[i] + newline);
		out.write(("/" * 80) + newline);

		f = open(requires[i], "rb");
		require_source = f.read().splitlines();
		f.close();
		for j in range(len(require_source)):
			out.write(require_source[j].rstrip() + newline);

		out.write(("/" * 80) + newline);
		out.write("//} /" + requires[i] + newline);
		out.write(("/" * 80) + newline + newline + newline);

	# Main source
	out.write(("/" * 80) + newline);
	out.write("//{ Userscript" + newline);
	out.write(("/" * 80) + newline);

	for i in range(source_line_first, len(source)):
		out.write(source[i].rstrip() + newline);

	out.write(("/" * 80) + newline);
	out.write("//} /Userscript" + newline);
	out.write(("/" * 80) + newline + newline);

	# Done
	out.close();
	return 0;


# Run
if (__name__ == "__main__"): sys.exit(main());

