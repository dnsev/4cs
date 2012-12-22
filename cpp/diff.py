#! /usr/bin/env python
import os, sys;


def main():
	if (len(sys.argv) != 3): return 0;
	try:
		f1 = open(sys.argv[1]);
	except:
		print "Error opening " + sys.argv[1];
		return -1;
	try:
		f2 = open(sys.argv[2]);
	except:
		print "Error opening " + sys.argv[2];
		return -1;

	s1 = f1.read();
	s2 = f2.read();

	f1.close();
	f2.close();

	if (s1 != s2):
		print "Files do not match";
		return -1;

	return 0;


if (__name__ == "__main__"): sys.exit(main());