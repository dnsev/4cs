Requires python, developed using 2.7 on Windows.

First run: run install.bat/install.sh

Run "embed.py" or "python embed.py" to see instructions on how to embed.

Run "extract.py" or "python extract.py" to see instructions on how to extract.

Examples:
	embed.py test.png song.ogg
	embed.py test.png song1.ogg song2.ogg song3.ogg song4.ogg
	embed.py -o output.png test.png song.ogg

	extract.py output.png
	extract.py -p ex/ output.png
	extract.py -s -ex output.png

