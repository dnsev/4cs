To run using the executable, the files are located in "cpp/"

Tested on Windows, using MinGW/g++ and Python 2.7. Javascript tested in Firefox + Greasemonkey / Chrome + Tampermonkey.

Makefile is currently designed for Windows. While most of it is system independent,
anyone with knowledge of makefiles should be able to adapt it for unix.

Run "embed.exe" to see instructions on how to embed.

Run "extract.exe" to see instructions on how to extract.


Examples:

	embed.exe test.png song.ogg
	embed.exe test.png song1.ogg song2.ogg song3.ogg song4.ogg
	embed.exe -x output.png test.png song.ogg

	extract.exe output.png
	extract.exe -p ex/ output.png
	extract.exe -s -ex output.png



(Python version is now deprecated)
