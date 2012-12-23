#! /usr/bin/env python
import os, sys;

header = """@echo off
set IMAGE_FILE=d0.png
set DATA_FILE=d0.png
set EMBEDDED_FILE=d1.png
set EXTRACT_PREFIX=e-
set EMBEDER=embed.exe
set EXTRACTER=extract.exe

del /q %EMBEDDED_FILE% 2> NUL
del /q %EXTRACT_PREFIX%%DATA_FILE% 2> NUL

goto A

"""

body=""":::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::;:::::::::
set EMBED={0}
echo Testing with EMBED=%EMBED%

%EMBEDER% -s 0 -o %EMBEDDED_FILE% %IMAGE_FILE% %DATA_FILE% %EMBED% > NUL
%EXTRACTER% -p %EXTRACT_PREFIX% %EMBEDDED_FILE% > NUL
python diff.py %DATA_FILE% %EXTRACT_PREFIX%%DATA_FILE%

del /q %EMBEDDED_FILE% 2> NUL
del /q %EXTRACT_PREFIX%%DATA_FILE% 2> NUL

"""

# Generate a test file
sys.stdout.write(header);

i = 0;
labels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
for S in (0,1):
	for r in (0,1):
		for a in (0,1):
			sys.stdout.write(":" + labels[i] + "\r\n");
			i += 1;
			for b in range(1,8+1):
				sys.stdout.write(body.format("-r {0} -a {1} -S {2} -b {3}".format(r,a,S,b)));
			sys.stdout.write("\r\n\r\n");

# Done
