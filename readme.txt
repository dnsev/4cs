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


Web Plugin / User End:

	Designed to be a bit better looking, and have some selectable stylesheets to choose
	from. It's also more clear about draging and dropping files into the player, and
	properly displays the image when doing so.

	The player is also a bit more customizable.


Web Plugin / Dev End:

	On the developer side, the plugin is designed to be much more modular than its
	counterpart. The sound player is designed to be stand-alone and non-site-specific.
	Additionally, it's designed such that it is able to have multiple instances,
	possibly even using different stylesheets. While this is ultimately useless in
	most applications, it's better designed without global variables anyway.

	Adding a new extraction format is as simple as adding a function
	callback and adding it to a list in one place. Descriptions of parameters
	passed into and out of the callbacks are located in SoundPlayer.js. Everything
	else is taken care of automatically.

	The inline post code and site-specific sound_player code are all sectioned off
	a bit better too.
