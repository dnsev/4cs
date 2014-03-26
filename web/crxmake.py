#! /usr/bin/env python
import re, os, sys, json, shutil, base64, all_in_one;


def get_metadata(metadata, name, as_array):
	if (as_array):
		array = [];

		for metadata_type in metadata:
			for m in metadata_type:
				if (m[0] == name):
					array.append(m[1]);

		return array;
	else:
		for metadata_type in metadata:
			for m in metadata_type:
				if (m[0] == name):
					return m[1];

		return None;


def manifest_replace(data, m):
	path = m.group(2).split(".");
	modifier = m.group(1);

	value = data;
	for p in path:
		value = value[p];

	if (modifier is not None):
		modifier = modifier.lower();
		if (modifier == "json"):
			value = json.dumps(value);

	return str(value);


def main():
	# Usage
	if (len(sys.argv) < 5):
		print "Usage:"
		print "  " + sys.argv[0] + " crx_dir input_userscript.js target_userscript_name.js manifest.json";
		return -1;

	crxdir = sys.argv[1];
	input = sys.argv[2];
	target_input = sys.argv[3];
	manifest = sys.argv[4];

	# Read input
	f = open(input, "rb");
	source = f.read().splitlines();
	f.close();
	for i in range(len(source)): source[i] = source[i].rstrip();

	# Get metadata
	metadata = all_in_one.get_meta(source)[0];

	# Get manifest
	f = open(manifest, "rb");
	manifest_source = f.read();
	f.close();


	# Write icon
	icon_pattern = re.compile(r"^data\:.+?\/(.+?)\;base64,(.*)$");
	m = icon_pattern.match(get_metadata(metadata, "icon", False));
	ext_replacements = {
		"jpeg": "jpg"
	};
	icon_ext = m.group(1).lower();
	if (icon_ext in ext_replacements): icon_ext = ext_replacements[icon_ext];
	icon_filename = "icon16." + icon_ext;

	f = open(os.path.join(os.path.abspath(crxdir), icon_filename), "wb");
	f.write(base64.b64decode(m.group(2)));
	f.close();


	# Write script
	shutil.copy(input, os.path.join(os.path.abspath(crxdir), os.path.split(target_input)[1]));


	# Manifest data
	data = {
		"name": get_metadata(metadata, "name", False),
		"version": get_metadata(metadata, "version", False),
		"description": get_metadata(metadata, "description", False),
		"icon_file": icon_filename,
		"script": os.path.split(target_input)[1],
		"homepage": "https://dnsev.github.io/4cs/",
		"urls": get_metadata(metadata, "include", True)
	};


	# Write manifest
	replace_pattern = re.compile(r"\<\<(?:(.+?)\:)?([^\>]+)\>\>");
	manifest_source = replace_pattern.sub(lambda m: manifest_replace(data, m), manifest_source);
	f = open(os.path.join(os.path.abspath(crxdir), "manifest.json"), "wb");
	f.write(manifest_source);
	f.close();

	# Done
	return 0;



# Run
if (__name__ == "__main__"): sys.exit(main());

