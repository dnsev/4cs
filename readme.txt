First run:
	Python version:
		run install.bat/install.sh
	Executable:
		If recompiling yourself, use the makefile

To run using python, the files are located in the directory "py/"
To run using the executable, the files are located in "cpp/"

Tested on Windows, using MinGW/g++ and Python 2.7. Javascript tested in Firefox/Chrome.

Makefile is currently designed for Windows. While most of it is system independent,
anyone with knowledge of makefiles should be able to adapt it for unix.

Run "embed.py", "python embed.py", or "embed.exe" to see instructions on how to embed.

Run "extract.py", "python extract.py", or "extract.exe" to see instructions on how to extract.

Examples: (using the python variants)
	embed.py test.png song.ogg
	embed.py test.png song1.ogg song2.ogg song3.ogg song4.ogg
	embed.py -o output.png test.png song.ogg

	extract.py output.png
	extract.py -p ex/ output.png
	extract.py -s -ex output.png

The python versions perform the same thing, but with a few less features/optimizations.
The executable versions can decode .jpegs and reconvert to .pngs, downscale images,
and optimize better.

