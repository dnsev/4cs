-------------------------------------------------------------------------------
Wiki
-------------------------------------------------------------------------------
	For instructions on how to use the web plugin, check out this page:
	https://github.com/dnsev/4cs/wiki/Userscript

	For other information about the project, check out the main wiki page:
	https://github.com/dnsev/4cs/wiki


-------------------------------------------------------------------------------
Sound Encoding/Decoding:
-------------------------------------------------------------------------------
	To encode/decode your own files, use the 2 executables in "/cpp".

	To batch decode old files, get the executable from "/batch" and PUT IT IN
	THE SAME FOLDER AS THE DECODER.

	Drag and drop files onto the decoder executables to decode them.

	If you consider yourself an "advanced" user, embed.exe has many command
	line flags, explained if you simply run "embed.exe". "extract.exe" also
	has a few minor flags.

	Otherwise, to embed a file in an image (using default settings):
	1) Create a blank file called "_" (note: no .txt or similar extension)
	2) Select 3+ files in your explorer: "_", your image, and any .ogg sounds
	3) Drag these 3 files (at the same time) onto "embed.exe" and wait


-------------------------------------------------------------------------------
Testing Platform:
-------------------------------------------------------------------------------
	C++:
		Windows, using MinGW/g++
		(mostly cross platform, with a few exceptions in the makefile)
	Python (deprecated):
		Python 2.7.3
	Javascript:
		Nightly/Firefox + Greasemonkey / Chrome + Tampermonkey


-------------------------------------------------------------------------------
Web Plugin / User End:
-------------------------------------------------------------------------------
	Install Version: https://raw.github.com/dnsev/4cs/master/web/4cs.user.js


	Version 1.8:

	Versioning can now include more sub-version numbers.
	More hotkeys for player/playback control.
	URLs can now be replaced if a url contains a spoiler. (might be buggy)
	Fixed the ability to view settings while minimized.


	Version 1.7:

	Batch downloading. All images/sounds loaded in the player can now be
	downloaded in a zip archive.


	Version 1.6:

	Inline file display now only shows the first 2 or 3 files of a long list of files.
	Added hotkey to open the sound player.
	Fixed a titling issue when loading all sounds and there is no tag.
	Fixed the first page of settings's scrollbar.


	Version 1.5:

	Various bugfixes.


	Version 1.4:

	Auto-updating is MUCH less of a hassle.


	Version 1.3:

	Various bugfixes


	Version 1.2:

	Includes auto-update notification.


	Version 1.1:

	Bugfixes for the previous sound embeds.

	Added functionality to convert inline URLs and play Youtube videos in the
	player.


	Version 1.0:

	Designed to be a bit better looking, and have some selectable stylesheets
	to choose from. It's also more clear about draging and dropping files into
	the player, and properly displays the image when doing so.

	The player is also a bit more customizable.


-------------------------------------------------------------------------------
Web Plugin / Dev End:
-------------------------------------------------------------------------------
	Version 1.4:

	The main script now has all dependencies compiled into 1 script, thus
	eliminating the need to reinstall each time. There are still the other
	versions available:
	1)	https://raw.github.com/dnsev/4cs/master/web/4cs.user.js
		Basic installation; does not include any comments
	2)	https://raw.github.com/dnsev/4cs/master/web/4cs.full.user.js
		Similar to above, but has no comments removed
	3)	https://raw.github.com/dnsev/4cs/master/web/4cs.dev.user.js
		Maintains file separation. Development version


	Version 1.3:

	Various small bugfixes / feature additions.


	Version 1.2:

	Auto-update notifications via a daily ajax query.


	Version 1.1:

	Youtube playback feature has been added, using the iframe API. Works well
	in Firefox and Chrome (although it was much more difficult to get it
	working in Chrome due to userscript sandbox settings.)


	Version 1.0:

	On the developer side, the plugin is designed to be much more modular than
	its counterpart. The sound player is designed to be stand-alone and mostly
	non-site-specific. Additionally, it's designed such that it is able to have
	multiple instances, possibly even using different stylesheets. While this
	is ultimately useless in most applications, it's better designed with less
	global variables anyway.

	Adding a new extraction format is as simple as adding a function callback
	and adding it to a list in one place. Descriptions of parameters passed
	into and out of the callbacks are located in "MediaPlayer.js". Everything
	else is taken care of automatically.

	The inline post code and site-specific sound_player code are all sectioned
	off a bit better too.

