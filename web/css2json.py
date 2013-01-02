#! /usr/bin/env python
import os, re, sys;


def main():
	if (len(sys.argv) <= 1): return -1;
	f = open(sys.argv[1]);
	css = f.read();
	f.close();

	# Parse css
	json_css = [];
	start = 0;
	end = 0;
	while (end < len(css)):
		# Open
		if (css[end] == "{"):
			# Get key
			key = css[start:end].strip();
			end += 1;
			start = end;
			# Add
			json_css.append([ key , [] ]);
			key = "";
			# Parse content
			while (end < len(css)):
				# Close
				if (css[end] == "}"):
					end += 1;
					start = end;
					break;
				# Key indicator
				elif (css[end] == ":"):
					key = css[start:end].strip();
					end += 1;
					start = end;
				# End endicator
				elif (css[end] == ";"):
					value = css[start:end].strip();
					end += 1;
					start = end;
					json_css[-1][1].append([ key , value ]);
				else:
					end += 1;
		else:
			end += 1;

	# Format as json
	j = 0;
	for key in json_css:
		if (j > 0): sys.stdout.write(',\n');
		sys.stdout.write('"' + key[0] + '": {');
		i = 0;
		for (key2, value2) in key[1]:
			if (i > 0): sys.stdout.write(',');
			sys.stdout.write('\n\t"' + key2 + '": "' + value2 + '"');
			i += 1;
		if (i > 0): sys.stdout.write('\n');
		sys.stdout.write('}');
		j += 1;


if (__name__ == "__main__"): sys.exit(main());


