///////////////////////////////////////////////////////////////////////////////
// Image loading callbacks:
// function (url_or_filename, load_tag, raw_ui8_data, done_callback)
// url_or_filename : the url of the file
//                 : (this is only a filename if it was a local file)
//        load_tag : the tag to search to load
//                 : this is either a string or MediaPlayer.ALL_SOUNDS
//    raw_ui8_data : an Uint8Array of the data to be loaded
//   done_callback : the function to call that simulates the return value
//                 : this is used instead of a return incase the function
//                 : doesn't immediately return back
//
// "done_callback" usage:
// 1) done_callback(null)
//    No sounds or files were found in the image
// 2) done_callback([ list_of_files , null ])
//    Files were found in the image, but no sounds
// 3) done_callback([ list_of_files , sound_list ])
//    File(s) / sound(s) found in the image
//
// list_of_files structure:
//   Simply an array of filenames:
//   [ "sound1.ogg", "file1.txt", "something" ]
//   (it is preferrable to have sounds have an .ogg extension in this list)
// sound_list structure:
//   Array of data objects, formatted as such:
//   [ { "title": ..., "flagged": ..., "index": ..., "data": ... } , ... ]
//     title : the title of the song found within the file
//   flagged : true if the load_tag didn't match the name; false otherwise
//     index : the index of the sound in the file (0 = first, 1 = second, etc.)
//      data : an Uint8Array of the sound (.ogg)
///////////////////////////////////////////////////////////////////////////////




///////////////////////////////////////////////////////////////////////////////
// Media Player class
///////////////////////////////////////////////////////////////////////////////
function MediaPlayerCSS (preset, css_color_presets, css_size_presets) {
	// Stylesheet settings
	this.preset = preset;
	this.css_color_presets = css_color_presets;
	this.css_size_presets = css_size_presets;
	this.on_theme_change_callback = null;
	this.on_theme_change_callback_data = null;
	this.create_custom();

	// Load
	this.load_preset(preset);

	// JSON stylesheet
	this.css_suffix = "";
	this.css = {
		".SPContainerMain": {
			"border-radius": "{exp:bg_outer_border_radius,*,border_scale}px",
			"padding": "{exp:bg_outer_size,*,padding_scale}px",
			"background": "transparent",
			"font-family": "{main_font}",
			"font-size": "{exp:font_size,*,font_scale}px",
			"position": "fixed",
			"color": "{hex:color_standard}",
			"z-index": "1000000"
		},
		".SPContainerMainBorders": {
			"background": "{rgba:bg_outer_color}"
		},
		".SPContainer": {
			"position": "relative"
		},

		".SPTitleBarContainer": {
			"position": "relative",
			"background": "{rgba:bg_color_dark}",
			"text-align": "center",
			"cursor": "move",
			"border-top-left-radius": "{exp:bg_inner_border_radius,*,border_scale}px",
			"border-top-right-radius": "{exp:bg_inner_border_radius,*,border_scale}px"
		},
		".SPTitleContainer": {
			"display": "block",
			"padding": "{exp:1,*,padding_scale}px 0px {exp:1,*,padding_scale}px 0px",
			"overflow": "hidden"
		},
		".SPTitle": {
			"display": "inline",
			"white-space": "nowrap",
			"font-weight": "bold",
			"color": "{hex:color_special_1}",
			"text-shadow": "{exp:1,*,font_scale}px {exp:1,*,font_scale}px 1px {hex:color_highlight_light}"
		},

		".SPMainButtonsLeft": {
			"position": "absolute",
			"left": "0",
			"top": "0",
			"display": "inline-block",
			"height": "100%",
			"overflow": "hidden"
		},
		".SPMainButtonsRight": {
			"position": "absolute",
			"right": "0",
			"top": "0",
			"display": "inline-block",
			"height": "100%",
			"overflow": "hidden"
		},
		".SPMainButtonLeft": {
			"display": "inline-block",
			"padding": "{exp:1,*,padding_scale}px",
			"border-top-left-radius": "{exp:bg_inner_border_radius,*,border_scale}px",
			"text-decoration": "none !important",
			"cursor": "pointer",
			"height": "100%",
			"opacity": "0.0",
			"color": "{hex:color_disabled} !important",
			"background": "transparent"
		},
		".SPMainButtonLeft:hover": {
			"opacity": "1.0",
			"text-decoration": "none !important",
			"color": "{hex:color_light} !important",
			"background": "{rgba:bg_color_darker}"
		},
		".SPMainButtonLeft:active": {
			"opacity": "1.0",
			"text-decoration": "none !important",
			"color": "{hex:color_special_2} !important",
			"background": "{rgba:bg_color_darker}"
		},
		".SPMainButtonRight": {
			"display": "inline-block",
			"padding": "{exp:1,*,padding_scale}px",
			"border-top-right-radius": "{exp:bg_inner_border_radius,*,border_scale}px",
			"text-decoration": "none !important",
			"cursor": "pointer",
			"height": "100%",
			"opacity": "0.0",
			"color": "{hex:color_disabled} !important",
			"background": "transparent"
		},
		".SPMainButtonRight:hover": {
			"opacity": "1.0",
			"text-decoration": "none !important",
			"color": "{hex:color_light} !important",
			"background": "{rgba:bg_color_darker}"
		},
		".SPMainButtonRight:active": {
			"opacity": "1.0",
			"text-decoration": "none !important",
			"color": "{hex:color_special_2} !important",
			"background": "{rgba:bg_color_darker}"
		},
		".SPMainButtonGeneric": {
			"display": "inline-block",
			"padding": "{exp:1,*,padding_scale}px",
			"text-decoration": "none !important",
			"cursor": "pointer",
			"height": "100%",
			"opacity": "0.0",
			"color": "{hex:color_disabled} !important",
			"background": "transparent"
		},
		".SPMainButtonGeneric:hover": {
			"opacity": "1.0",
			"text-decoration": "none !important",
			"color": "{hex:color_light} !important",
			"background": "{rgba:bg_color_darker}"
		},
		".SPMainButtonGeneric:active": {
			"opacity": "1.0",
			"text-decoration": "none !important",
			"color": "{hex:color_special_2} !important",
			"background": "{rgba:bg_color_darker}"
		},


		".SPContentContainer": {
			"background": "{rgba:bg_color_light}",
			"text-align": "center",
			"position": "relative"
		},

		".SPTopContainer": {
			"position": "relative"
		},
		".SPVolumeContainer": {
			"position": "absolute",
			"left": "0",
			"top": "0",
			"height": "100%",
			"opacity": "0.0",
			"background": "transparent"
		},
		".SPVolumeContainerActive": {
			"opacity": "1.0 !important"
		},
		".SPContainerMain:hover .SPVolumeContainer": {
			"opacity": "0.5"
		},
		".SPContainerMain:hover .SPTopContainer:hover .SPVolumeContainer": {
			"opacity": "1.0"
		},
		".SPVolumeContainerActive .SPVolumeContainer": {
			"opacity": "1.0 !important"
		},
		".SPVolumeContainerActive .SPVolumeContainer:hover": {
			"opacity": "1.0 !important"
		},
		".SPVolumeBarContainer": {
			"position": "relative",
			"width": "{exp:16,*,font_scale}px",
			"height": "100%",
			"display": "inline-block",
			"vertical-align": "top",
			"cursor": "pointer",
			"background": "{rgba:bg_color_lightest}"
		},
		".SPVolumeBar": {
			"position": "absolute",
			"bottom": "0",
			"width": "100%",
			"cursor": "pointer"
		},
		".SPVolumeLabelContainer": {
			"text-align": "left",
			"display": "inline-block",
			"cursor": "default",
			"padding": "0px {exp:2,*,padding_scale}px 0px {exp:2,*,padding_scale}px",
			"text-shadow": "{exp:1,*,font_scale}px {exp:1,*,font_scale}px 1px {hex:color_highlight_light}"
		},
		".SPVolumeLabel": {
			"display": "block"
		},
		".SPVolumeValue": {
			"display": "block",
			"font-size": "{exp:font_size_small,*,font_scale}px"
		},

		".SPPlaylistIndexContainer": {
			"position": "absolute",
			"right": "0",
			"top": "0",
			"cursor": "default",
			"opacity": "0.0",
			"padding": "{exp:2,*,padding_scale}px"
		},
		".SPPlaylistIndexContainerActive": {
			"opacity": "1.0 !important"
		},
		".SPContainerMain:hover .SPPlaylistIndexContainer": {
			"opacity": "0.5"
		},
		".SPContainerMain:hover .SPTopContainer:hover .SPPlaylistIndexContainer": {
			"opacity": "1.0"
		},
		".SPPlaylistIndexContainerInner": {
			"padding": "{exp:2,*,padding_scale}px",
			"border-radius": "{exp:2,*,padding_scale}px",
			"background": "{rgba:bg_color_lightest}"
		},
		".SPPlaylistIndexText1": {
			"display": "inline-block"
		},
		".SPPlaylistIndexText2": {
			"display": "inline-block",
			"padding": "0px {exp:2,*,padding_scale}px 0px {exp:2,*,padding_scale}px",
		},
		".SPPlaylistIndexText3": {
			"display": "inline-block"
		},

		".SPControlContainer": {
			"width": "100%",
			"padding-top": "{exp:2,*,padding_scale}px",
			"text-align": "center",
			"position": "absolute",
			"bottom": "0",
			"opacity": "0.0"
		},
		".SPContainerMain:hover .SPControlContainer": {
			"opacity": "1.0"
		},
		".SPControlContainerInner": {
			"padding": "{exp:4,*,padding_scale}px {exp:6,*,padding_scale}px {exp:2,*,padding_scale}px {exp:6,*,padding_scale}px",
			"display": "inline-block",
			"border-top-left-radius": "{exp:border_radius_normal,*,border_scale}px",
			"border-top-right-radius": "{exp:border_radius_normal,*,border_scale}px",
			"background": "{rgba:bg_color_lightest,0.5}"
		},
		".SPTopContainer:hover .SPControlContainerInner": {
			"background": "{rgba:bg_color_lightest}"
		},
		".SPControlLink": {
			"padding": "{exp:1,*,padding_scale}px {exp:2,*,padding_scale}px {exp:1,*,padding_scale}px {exp:2,*,padding_scale}px",
			"font-family": "{controls_font}",
			"font-size": "{exp:font_size_controls,*,font_scale}px",
			"font-weight": "bold",
			"text-decoration": "none !important",
			"display": "inline-block",
			"border-radius": "{exp:border_radius_small,*,border_scale}px",
			"cursor": "pointer",
			"color": "{hex:color_standard}",
			"background": "transparent"
		},
		".SPControlLink:hover": {
			"text-decoration": "none !important",
			"color": "{hex:color_standard}",
			"background": "{rgba:bg_color_light}"
		},
		".SPControlLink:active": {
			"text-decoration": "none !important",
			"color": "{hex:color_special_2}",
			"background": "{rgba:bg_color_dark}"
		},
		".SPControlLinkDisabled, .SPControlLinkDisabled:hover, .SPControlLinkDisabled:active": {
			"color": "{hex:color_disabled} !important",
			"background": "transparent !important",
			"cursor": "default !important"
		},
		".SPControlLinkSeparator": {
			"display": "inline-block",
			"width": "{exp:2,*,padding_scale}px"
		},

		".SPVideoContainer": {
			"display": "block",
			"position": "absolute",
			"left": "0",
			"top": "0",
			"width": "100%",
			"height": "100%",
			"overflow": "hidden"
		},
		".SPVideoContainerMask": {
			"display": "block",
			"position": "absolute",
			"left": "0",
			"top": "0",
			"width": "100%",
			"height": "100%"
		},

		".SPSeekContainerTop": {
			"position": "relative",
			"height": "{exp:1,*,border_scale}px",
			"background": "{rgba:bg_color_dark}",
			"font-size":"0px"
		},
		".SPSeekContainerBottom": {
			"height": "{exp:1,*,border_scale}px",
			"background": "{rgba:bg_color_dark}"
		},

		".SPSeekContainer": {
			"position": "relative",
			"border": "0px"
		},
		".SPSeekTimeContainer": {
			"position": "relative",
			"padding": "{exp:1,*,padding_scale}px 0px {exp:1,*,padding_scale}px 0px",
			"text-align": "center"
		},
		".SPSeekTime": {
			"color": "{hex:color_standard}",
			"display": "inline-block",
			"text-shadow": "{exp:1,*,font_scale}px {exp:1,*,font_scale}px 1px {hex:color_highlight_light}",
		},
		".SPSeekTimeLeft": {
			"position": "absolute",
			"left": "0",
			"padding-left": "{exp:1,*,padding_scale}px",
			"display": "inline-block",
			"color": "{hex:color_disabled}"
		},
		".SPSeekTimeRight": {
			"position": "absolute",
			"right": "0",
			"padding-right": "{exp:1,*,padding_scale}px",
			"display": "inline-block",
			"color": "{hex:color_disabled}"
		},
		".SPSeekBarContainer": {
			"position": "absolute",
			"left": "0",
			"top": "0",
			"width": "100%",
			"height": "100%",
			"text-align": "left",
			"overflow": "hidden",
			"cursor": "default"
		},
		".SPSeekBarMover": {
			"width": "0px",
			"height": "100%",
			"display": "inline-block",
			"background": "{rgba:bg_color_darkest,0.125}",
			"cursor": "default"
		},
		".SPSeekBar": {
			"width": "{exp:8,*,font_scale}px",
			"height": "100%",
			"display": "inline-block",
			"background": "{rgba:bg_color_darkest,0.75}",
			"cursor": "pointer"
		},
		".SPSeekBarActive": {
			"background": "{rgba:color_special_2,0.75} !important"
		},

		".SPLoadPercentBarContainer": {
			"position": "absolute",
			"left": "0",
			"top": "0",
			"width": "100%",
			"height": "100%",
			"text-align": "left",
			"overflow": "hidden",
			"cursor": "default",
		},
		".SPLoadPercentBarMover": {
			"width": "0px",
			"height": "100%",
			"display": "inline-block",
			"background": "transparent",
			"cursor": "default"
		},
		".SPLoadPercentBar": {
			"width": "0px",
			"height": "100%",
			"display": "inline-block",
			"background": "{rgba:bg_color_darkest,0.5}",
			"cursor": "default"
		},

		".SPImageContainerMain": {
			"padding": "{exp:2,*,padding_scale}px 0px {exp:2,*,padding_scale}px 0px",
			"width": "100%",
			"text-align": "center",
			"position": "relative"
		},
		".SPImageContainer": {
			"display": "block",
			"width": "100%",
			"overflow": "hidden",
			"position": "relative"
		},
		".SPImage": {},
		".SPNoImage": {
			"display": "inline-block",
			"background": "{rgba:bg_color_lightest}",
			"color": "{hex:color_disabled}",
			"cursor": "default"
		},
		".SPNoImageText": {
			"display": "none"
		},

		".SPPlaylistContainer": {
			"cursor": "default",
			"overflow-x": "hidden",
			"overflow-y": "auto"
		},
		".SPPlaylistItem": {
			"position": "relative",
			"display": "block",
			"text-align": "left",
			"overflow": "hidden",
			"white-space": "nowrap",
			"cursor": "pointer"
		},
		".SPPlaylistItem:hover, .SPPlaylistItem:active": {
			"background": "{rgba:bg_color_lightest}"
		},
		".SPPlaylistItemActive": {},
		".SPPlaylistControlsContainer": {
			"position": "absolute",
			"right": "0",
			"top": "0",
			"display": "block",
			"cursor": "default"
		},
		".SPPlaylistItemInfo": {
			"position": "absolute",
			"right": "0",
			"top": "0",
			"white-space": "nowrap",
			"color": "{hex:color_light}",
			"display": "block",
			"cursor": "default",
			"padding": "{exp:1,*,padding_scale}px {exp:2,*,padding_scale}px {exp:1,*,padding_scale}px 0px",
			"background": "{rgba:bg_color_light}",
		},
		".SPPlaylistItem:hover .SPPlaylistItemInfo": {
			"background": "{rgba:bg_color_lightest}",
		},
		".SPPlaylistControls": {
			"opacity": "0.0",
			"text-decoration": "none !important",
			"background": "transparent",
			"display": "inline-block",
			"color": "{hex:color_standard} !important",
			"padding": "{exp:1,*,padding_scale}px 0px {exp:1,*,padding_scale}px 0px"
		},
		".SPPlaylistItem:hover .SPPlaylistControls": {
			"background": "{rgba:bg_color_lightest}",
			"text-decoration": "none !important",
			"opacity": "0.25"
		},
		".SPPlaylistItem:hover .SPPlaylistControls:hover, .SPPlaylistControls:active": {
			"background": "{rgba:bg_color_lightest}",
			"text-decoration": "none !important",
			"opacity": "1.0"
		},
		".SPPlaylistControlLink": {
			"display": "inline-block",
			"padding": "0px {exp:2,*,padding_scale}px 0px {exp:2,*,padding_scale}px",
			"width": "{exp:12,*,font_scale}px",
			"text-align": "center",
			"cursor": "pointer",
			"border-radius": "{exp:border_radius_small,*,border_scale}px",
			"text-decoration": "none",
			"color": "{hex:color_disabled}",
			"background": "transparent"
		},
		".SPPlaylistControls:hover .SPPlaylistControlLink, .SPPlaylistControlLink:visited": {
			"text-decoration": "none !important",
			"background": "{rgba:bg_color_light} !important"
		},
		".SPPlaylistControls:hover .SPPlaylistControlLink:hover": {
			"text-decoration": "none !important",
			"color": "{hex:color_standard} !important",
			"background": "{rgba:bg_color_dark}"
		},
		".SPPlaylistControls:hover .SPPlaylistControlLink:active": {
			"text-decoration": "none !important",
			"color": "{hex:color_special_2} !important",
			"background": "{rgba:bg_color_dark}"
		},
		".SPPlaylistControlLinkSeparator": {
			"display": "inline-block",
			"padding": "0px 0px 0px {exp:1,*,padding_scale}px",
			"cursor": "default"
		},
		".SPPlaylistSoundName": {
			"color": "{hex:color_standard}",
			"padding": "{exp:1,*,padding_scale}px 0px {exp:1,*,padding_scale}px {exp:2,*,padding_scale}px"
		},
		".SPPlaylistItemActive .SPPlaylistSoundName": {
			"color": "{hex:color_special_2} !important",
			"text-shadow": "{exp:1,*,font_scale}px {exp:1,*,font_scale}px 1px {hex:color_highlight_light}"
		},

		".SPHelpContainer": {
			"position": "absolute",
			"left": "0",
			"top": "0",
			"width": "100%",
			"height": "100%",
			"overflow-x": "hidden",
			"overflow-y": "auto",
			"background": "{rgba:bg_color_light}"
		},
		".SPHelpLabelDiv": {
			"display": "block",
			"width": "100%",
			"text-align": "left",
			"font-weight": "bold",
			"padding": "{exp:4,*,padding_scale}px {exp:2,*,padding_scale}px 0px {exp:2,*,padding_scale}px"
		},
		".SPHelpTextDiv": {
			"display": "block",
			"width": "100%",
			"text-align": "left",
			"padding": "{exp:2,*,padding_scale}px {exp:4,*,padding_scale}px 0px {exp:4,*,padding_scale}px"
		},
		".SPHelpSectionDiv": {
			"display": "block",
			"width": "100%",
			"text-align": "left",
			"padding-top": "{exp:2,*,padding_scale}px"
		},
		".SPHelpLinkDiv": {
			"background": "{rgba:bg_color_light}",
			"display": "block",
			"width": "100%",
			"position": "absolute",
			"bottom": "0",
			"left": "0"
		},
		".SPHelpTextLink": {
			"display": "inline-block",
			"width": "50%",
			"text-align": "center",
			"cursor": "pointer",
			"text-decoration": "none",
			"color": "{hex:color_standard} !important"
		},
		".SPHelpTextLink:hover": {
			"text-decoration": "underline",
			"color": "{hex:color_standard} !important"
		},
		".SPHelpTextLink:active": {
			"text-decoration": "underline",
			"color": "{hex:color_special_2} !important"
		},
		".SPHelpModeLink": {
			"display": "inline-block",
			"width": "100%",
			"text-align": "left",
			"cursor": "pointer",
			"text-decoration": "none",
			"color": "{hex:color_standard} !important",
			"padding-left": "{exp:4.0,*,padding_scale}px"
		},
		".SPHelpModeLink:hover": {
			"text-decoration": "underline",
			"color": "{hex:color_standard} !important"
		},
		".SPHelpModeLink:active": {
			"text-decoration": "underline",
			"color": "{hex:color_special_2} !important"
		},
		".SPHelpColorInputDiv0": {
			"width": "28%",
			"display": "inline-block",
			"position": "relative"
		},
		".SPHelpColorLabelText": {
			"display": "block",
			"width": "100%",
			"text-align": "right",
			"font-style": "italic",
			"vertical-align": "middle"
		},
		".SPHelpColorLabelDisplay": {
			"display": "block",
			"width": "{exp:4,*,padding_scale}px",
			"height": "100%",
			"position": "absolute",
			"left	": "0",
			"top": "0"
		},
		".SPHelpColorInputDiv1": {
			"width": "18%",
			"display": "inline-block"
		},
		".SPHelpColorInputDiv1Full": {
			"width": "72%",
			"display": "inline-block"
		},
		".SPHelpColorInputDiv2": {
			"padding-right": "{exp:2,*,padding_scale}px"
		},
		".SPHelpColorInputDiv2b": {
			"padding-right": "{exp:2,*,padding_scale}px"
		},
		".SPHelpColorInputDiv3": {
			"border": "{exp:1,*,border_scale}px solid {hex:bg_color_dark}",
			"padding": "{exp:2,*,padding_scale}px",
			"background": "{rgba:bg_color_lightest}"
		},
		".SPHelpColorInput, .SPHelpColorInput:hover, .SPHelpColorInput:active, .SPHelpColorInput:focus, input.SPHelpColorInput[type=\"text\"], input.SPHelpColorInput[type=\"text\"]:focus": {
			"width": "100% !important",
			"display": "inline-block !important",
			"padding": "0px !important",
			"margin": "0px !important",
			"font-size": "{exp:font_size,*,font_scale}px !important",
			"color": "{hex:color_standard} !important",
			"background": "{rgba:bg_color_lightest} !important",
			"text-align": "left !important",
			"font-family": "{main_font} !important",
			"border": "0px hidden !important"
		},

		".SPFooterBarContainer": {
			"position": "relative",
			"background": "{rgba:bg_color_light}",
			"text-align": "center",
			"height": "{exp:bg_inner_border_radius,*,border_scale}px",
			"border-bottom-left-radius": "{exp:bg_inner_border_radius,*,border_scale}px",
			"border-bottom-right-radius": "{exp:bg_inner_border_radius,*,border_scale}px"
		},


		".SPAlertContainer": {
			"width": "100%",
			"height": "100%",
			"background": "{rgba:bg_color_lightest,0.75}",
			"position": "absolute",
			"left": "0",
			"top": "0",
			"border-radius": "{exp:bg_inner_border_radius,*,border_scale}px",
			"display": "block"
		},
		".SPAlertContentContainer": {
			"position": "relative",
			"top": "50%",
			"text-align": "center",
			"font-size": "{exp:40,*,font_scale}px",
			"margin-top": "{exp:-40,*,font_scale}px"
		},

		".SPFirstRunContainer": {
			"position": "absolute",
			"left": "0",
			"top": "0",
			"width": "100%",
			"height": "100%",
			"overflow-x": "hidden",
			"overflow-y": "auto",
			"display": "block",
			"background": "{rgba:bg_color_light}"
		},
		".SPFirstRunLabel": {
			"display": "block",
			"text-align": "left",
			"font-weight": "bold",
			"padding": "{exp:4,*,padding_scale}px {exp:2,*,padding_scale}px 0px {exp:2,*,padding_scale}px"
		},
		".SPFirstRunTextContainer": {
			"display": "block",
			"text-align": "left",
			"padding": "{exp:4,*,padding_scale}px {exp:2,*,padding_scale}px 0px {exp:4,*,padding_scale}px"
		},
		".SPFirstRunExitLink": {
			"display": "block",
			"text-align": "center",
			"padding": "{exp:4,*,padding_scale}px {exp:2,*,padding_scale}px 0px {exp:2,*,padding_scale}px"
		},

		".SPResizingSizeOff": {
			"width": "{exp:bg_outer_size,*,padding_scale}px",
			"height": "{exp:bg_outer_size,*,padding_scale}px",
		},
		".SPResizingSizeAvailable": {
			"width": "{exp:bg_outer_size,*,padding_scale,*,2}px",
			"height": "{exp:bg_outer_size,*,padding_scale,*,2}px",
		},
		".SPResizingContainerFull": {
			"position": "absolute",
			"left": "-{exp:bg_outer_size,*,padding_scale}px",
			"top": "-{exp:bg_outer_size,*,padding_scale}px",
			"right": "-{exp:bg_outer_size,*,padding_scale}px",
			"bottom": "-{exp:bg_outer_size,*,padding_scale}px",
			"left":"-16px","top":"-16px","right":"-16px","bottom":"-16px",

			"border-radius": "{exp:bg_outer_border_radius,*,border_scale}px",
			"background": "{rgba:bg_outer_color}"
		},
		".SPResizingContainerInner": {
			"position": "relative",
			"width": "100%",
			"height": "100%"
		},
		".SPResizingContainerControl": {
			"overflow": "hidden",
			"position": "absolute"
		},
		".SPResizingContainerTopLeft": {
			"left": "0",
			"width": "16px",
			"top": "0",
			"height": "16px",
			"cursor": "nw-resize"
		},
		".SPResizingContainerTop": {
			"left": "16px",
			"right": "16px",
			"top": "0",
			"height": "16px",
			"cursor": "n-resize"
		},
		".SPResizingContainerTopRight": {
			"right": "0",
			"width": "16px",
			"top": "0",
			"height": "16px",
			"cursor": "ne-resize"
		},
		".SPResizingContainerLeft": {
			"left": "0",
			"width": "16px",
			"top": "16px",
			"bottom": "16px",
			"cursor": "w-resize"
		},
		".SPResizingContainerRight": {
			"right": "0",
			"width": "16px",
			"top": "16px",
			"bottom": "16px",
			"cursor": "e-resize"
		},
		".SPResizingContainerBottomLeft": {
			"left": "0",
			"width": "16px",
			"bottom": "0",
			"height": "16px",
			"cursor": "sw-resize"
		},
		".SPResizingContainerBottom": {
			"left": "16px",
			"right": "16px",
			"bottom": "0",
			"height": "16px",
			"cursor": "s-resize"
		},
		".SPResizingContainerBottomRight": {
			"right": "0",
			"width": "16px",
			"bottom": "0",
			"height": "16px",
			"cursor": "se-resize"
		},
		".SPResizingContainerTextContainerOuter": {
			"position": "relative",
			"width": "100%",
			"height": "100%"
		},
		".SPResizingContainerTextContainerInner": {
			"position": "absolute",
			"left": "0",
			"top": "50%",
			"width": "100%",
			"height": "100%",
			"margin-top": "-{exp:font_size_controls,*,font_scale,/,2}px",
		},
		".SPResizingContainerTextContainer": {
			"width": "100%",
			"height": "100%",
			"text-align": "center",
			"cursor": "inherit"
		},
		".SPResizingContainerText": {
			"font-family": "{controls_font}",
			"font-size": "{exp:font_size_controls,*,font_scale}px",
			"font-weight": "bold",
			"color": "{hex:color_standard}",
			"text-shadow": "{exp:1,*,font_scale}px {exp:1,*,font_scale}px 1px {hex:color_highlight_light}"
		}
	};
}
MediaPlayerCSS.prototype.create_stylesheet = function () {
	var stylesheet = "";
	var key, style, css_key, css_value;
	for (key in this.css) {
		// Add the key
		stylesheet += key + "{";
		// Iterate over its style elements
		style = this.css[key];
		for (css_key in style) {
			// Value
			css_value = this.parse_out_values(style[css_key]);
			// Add the style
			stylesheet += css_key + this.css_suffix + ":" + css_value + ";";
		}
		// Finish
		stylesheet += "}";
	}

	// Return
	return stylesheet;
}
MediaPlayerCSS.prototype.parse_out_values = function (value) {
	var css = this;
	var a, i, v, values, indices;
	value = value.replace(/\{.+?\}/g, function (match) {
		// Remove {}
		match = match.substr(1, match.length - 2);
		// Remove formatters
		format_mode = 0;
		match = match.replace(/.+?:/g, function (match2) {
			match2 = match2.toLowerCase();
			if (match2 == "hex:") format_mode = 1;
			else if (match2 == "rgba:") format_mode = 2;
			else if (match2 == "exp:") format_mode = 3;
			else if (match2 == "iexp:") format_mode = 4;
			return "";
		});
		// Split
		values = match.split(",");
		translated = new Array();
		for (v = 0; v < values.length; ++v) {
			// Array removal
			indices = new Array();
			values[v] = values[v].replace(/\[.+?\]/g, function (match2) {
				// Remove []
				match2 = match2.substr(1, match2.length - 2);
				// Add to index list
				if (match2.length > 0 && (match2[0] == '"' || match2[0] == "'")) {
					indices.push(match2.substr(1, match2.length - 2));
				}
				else {
					indices.push(parseInt(match2));
				}
				return "";
			});
			// Check if it's a variable name, or a integer literal
			if (values[v].length > 0 && (values[v].charCodeAt(0) & 0xDF) >= 'A'.charCodeAt(0) && (values[v].charCodeAt(0) & 0xDF) <= 'Z'.charCodeAt(0)) {
				if (values[v] in css.css_color_presets[css.preset]) {
					values[v] = css.css_color_presets[css.preset][values[v]];
				}
				else if (values[v] in css.css_size_presets[css.preset]) {
					values[v] = css.css_size_presets[css.preset][values[v]];
				}
				else {
					// missing
					return "";
				}
				for (i = 0; i < indices.length; ++i) {
					values[v] = values[v][indices[i]];
				}
				translated[v] = true;
			}
			else {
				values[v] = values[v];
				translated[v] = false;
			}
		}

		// Format
		try {
			switch (format_mode) {
				case 1: // hex
				{
					v = (translated[0] ? values[0] : parseFloat(values[0]));
					v = (v[0] << 16) | (v[1] << 8) | (v[2]);
					v = v.toString(16);
					while (v.length < 6) v = "0" + v;
					v = "#" + v;
				}
				return v;
				case 2: // rgba
				{
					if (values.length == 2) {
						a = (translated[1] ? values[1] : parseFloat(values[1]));
					}
					else {
						a = values[0][3];
					}

					v = (translated[0] ? values[0] : parseFloat(values[0]));
					if (a >= 1.0) {
						v = "rgb(" + v[0] + "," + v[1] + "," + v[2] + ")";
					}
					else {
						v = "rgba(" + v[0] + "," + v[1] + "," + v[2] + "," + a + ")";
					}
				}
				return v;
				case 3: // exp
				case 4: // iexp
				{
					v = 0.0;
					op = "+";
					for (i = 0; i < values.length; ++i) {
						a = (translated[i] ? values[i] : parseFloat(values[i]));
						if (op == "+") v += a;
						else if (op == "-") v -= a;
						else if (op == "*") v *= a;
						else if (op == "/") v /= a;
						else if (op == "%") v %= a;
						if (++i < values.length) op = values[i].trim();
					}

					// Round
					if (format_mode == 4) v = Math.round(v);
					else v = Math.round(v * 100.0) / 100.0;
				}
				return v;
				default:
				{
					// Single value
					v = (translated[0] ? values[0] : parseFloat(values[0]));
				}
				return v;
			}
		}
		catch (e) {
			return "";
		}
	});

	// Done
	return value;
}
MediaPlayerCSS.prototype.load_preset = function (preset_name) {
	this.preset = preset_name.replace(/[^a-zA-Z_]/g, "").toLowerCase();

	if (!(this.preset in this.css_color_presets)) {
		for (var key in this.css_color_presets) {
			this.preset = key;
			break;
		}
	}

	if (typeof(this.on_theme_change_callback) == "function") this.on_theme_change_callback(this.on_theme_change_callback_data);
}
MediaPlayerCSS.prototype.get_volume_colors = function () {
	return this.css_color_presets[this.preset].volume_colors;
}
MediaPlayerCSS.prototype.get_value = function (is_color, name) {
	// Array indices
	var indices = new Array();
	name = name.replace(/\[.+?\]/g, function (match) {
		// Remove []
		match = match.substr(1, match.length - 2);
		// Add to index list
		if (match.length > 0 && (match[0] == '"' || match[0] == "'")) {
			indices.push(match.substr(1, match.length - 2));
		}
		else {
			indices.push(parseInt(match));
		}
		return "";
	});

	try {
		var v = "";
		if (is_color) {
			if (name in this.css_color_presets[this.preset]) {
				v = this.css_color_presets[this.preset][name];
			}
		}
		else {
			if (name in this.css_size_presets[this.preset]) {
				v = this.css_size_presets[this.preset][name];
			}
		}
		for (var i = 0; i < indices.length; ++i) {
			v = v[indices[i]];
		}
		return v;
	}
	catch (e) {
		return "";
	}
}
MediaPlayerCSS.prototype.create_custom = function () {
	// Create
	var preset = "custom";
	this.css_color_presets[preset] = {"@name": "Custom"};
	this.css_size_presets[preset] = {"@name": "Custom"};

	// Copy
	for (var key in this.css_color_presets[this.preset]) {
		if (key[0] != "@") {
			this.css_color_presets[preset][key] = this.css_color_presets[this.preset][key];
		}
	}
	for (var key in this.css_size_presets[this.preset]) {
		if (key[0] != "@") {
			this.css_size_presets[preset][key] = this.css_size_presets[this.preset][key];
		}
	}
}
MediaPlayerCSS.prototype.modify_value = function (is_color, name, value, component_index) {
	if (this.preset != "custom") {
		this.create_custom();
		this.load_preset("custom");
	}

	// Array indices
	var indices = new Array();
	name = name.replace(/\[.+?\]/g, function (match) {
		// Remove []
		match = match.substr(1, match.length - 2);
		// Add to index list
		if (match.length > 0 && (match[0] == '"' || match[0] == "'")) {
			indices.push(match.substr(1, match.length - 2));
		}
		else {
			indices.push(parseInt(match));
		}
		return "";
	});
	indices.splice(0, 0, name);
	if (is_color) indices.push(component_index);

	// Value
	var v = (is_color ? this.css_color_presets[this.preset] : this.css_size_presets[this.preset]);
	for (var i = 0; i < indices.length - 1; ++i) {
		v = v[indices[i]];
	}

	// Set
	v[indices[indices.length - 1]] = value;
}
MediaPlayerCSS.prototype.save = function () {
	var data = {"key": this.preset, "color": {}, "size": {}};

	// Copy
	if ("custom" in this.css_color_presets) {
		for (var key in this.css_color_presets["custom"]) {
			data["color"][key] = this.css_color_presets["custom"][key];
		}
	}
	if ("custom" in this.css_size_presets) {
		for (var key in this.css_size_presets["custom"]) {
			data["size"][key] = this.css_size_presets["custom"][key];
		}
	}

	// Done
	return data;
}
MediaPlayerCSS.prototype.load = function (data) {
	// Init
	if ("color" in data || "size" in data) {
		this.css_color_presets["custom"] = {"@name": "Custom"};
		this.css_size_presets["custom"] = {"@name": "Custom"};
	}

	// Copy
	if ("color" in data) {
		for (var key in data["color"]) {
			this.css_color_presets["custom"][key] = data["color"][key];
		}
	}
	if ("size" in data) {
		for (var key in data["size"]) {
			this.css_size_presets["custom"][key] = data["size"][key];
		}
	}

	// Load preset
	if ("key" in data) {
		this.load_preset(data["key"]);
	}

}




function MediaPlayer (css, load_callbacks, settings_callback, destruct_callback) {
	// Not setup
	this.created = false;
	this.namespace = "media_player";
	this.identifier = ""; // make this dynamic
	this.is_chrome = ((navigator.userAgent + "").indexOf(" Chrome/") >= 0);
	this.title_default =  "Media Player";
	this.first_run = true;

	// Loading
	this.load_callbacks = [];
	if (load_callbacks) {
		for (var i = 0; i < load_callbacks.length; ++i) {
			this.load_callbacks.push(load_callbacks[i]);
		}
	}
	this.settings_callback = settings_callback;
	this.destruct_callback = destruct_callback;

	// Dimension scaling
	this.scale_factor = 1.0;

	// Video
	this.ytvideo_player = null;
	this.ytvideo_qualities = [ "default", "small", "medium", "large", "hd720", "hd1080", "highres" ];
	this.ytvideo_quality_index = 0;
	this.ytvideo_unsafe = this.is_chrome;
	this.ytvideo_html5 = true;

	// Image
	this.image_height_min = 64;
	this.image_height_max = 225;
	this.image_height_default = this.image_height_max;
	this.image_height = this.image_height_default;

	// Size/position settings
	this.moving = false;
	this.resizing_image = false;
	this.position_offset = [ 0 , 0 ];
	this.player_width_default = 400;
	this.player_width = this.player_width_default;
	this.playlist_height_default = 34;
	this.playlist_height = this.playlist_height_default;
	this.player_width_min = 64;
	this.playlist_height_min = 0;
	this.playlist_play_on_load = 1; // 0 = no, 1 = if empty, 2 = if paused, 3 = always
	this.playlist_play_on_load_settings = [ "Don't Play" , "Play if empty playlist" , "Play if at end of playlist" , "Play if paused" , "Always play" ];

	this.mouse_offset = null;
	this.mouse_moved = false;

	// Resize settings
	this.resizing = false;
	this.resizing_sides = [];
	this.resizing_base_size = { width: 0, height: 0 };
	this.resize_sides = [ false , false , false , false ];
	this.resize_sizes = [ 0.0 , 0.0 , 0.0 ]; // off, available, full
	this.resize_side_sizes = [ 0.0 , 0.0 , 0.0 , 0.0 ]; // current: t,r,b,l
	this.resize_side_sizes_target = [ 0.0 , 0.0 , 0.0 , 0.0 ]; // current: t,r,b,l
	this.resize_side_sizes_needed = false; // true if resizing should happen, false otherwise
	this.resize_wait_times = [ 0.25 , 0.5 , 0.05 ]; // open ms, close ms
	this.resize_timers = [ null , null , null ]; // open timer, close timer, resize timer
	this.resize_distance = [ 4.0 , 4.0 ]; // distance from border, distance to expand
	this.resize_side_speed = 32.0; // ?px/sec
	this.resize_container_hovered = false;
	this.resize_container_border_hovered = false;
	this.resize_should_close = false;
	this.resize_mouse_offset = [ 0.0 , 0.0 ];

	// Volume settings (low -> high)
	this.volume = 0.5;
	this.volume_changing = false;

	// Seeking
	this.seek_was_playing = false;
	this.seek_exacting = false;
	this.seek_dragging = false;

	// Playlist
	this.playlist = [];
	this.playlist_loop = true;
	this.playlist_randomize = false;
	this.playlist_scrollto_onload = true;
	this.playlist_index_timer = null;

	// Current
	this.current_image_width = 0;
	this.current_image_height = 0;
	this.current_media = null;

	// html elements
	this.nullify();

	// CSS
	this.css = css;
	this.css.on_theme_change_callback = this.update_player_theme_name;
	this.css.on_theme_change_callback_data = {media_player: this};
	$("head").append((this.head_css = this.E("style").html(this.css.create_stylesheet())));
}
MediaPlayer.prototype.destructor = function () {
	// Callback
	if (typeof(this.destruct_callback) == "function") this.destruct_callback(this);
	this.destruct_callback = null;

	// Destroy
	this.destroy();
	if (this.head_css !== null) this.head_css.remove();
	this.head_css = null;
}

MediaPlayer.ALL_SOUNDS = true;

MediaPlayer.prototype.save = function () {
	// Save
	var data = {
		"volume": this.volume,
		"playlist_height": this.playlist_height,
		"player_width": this.player_width,
		"image_height": this.image_height,
		"image_height_max": this.image_height_max,
		"scale_factor": this.scale_factor,
		"playlist_loop": this.playlist_loop,
		"playlist_randomize": this.playlist_randomize,
		"playlist_play_on_load": this.playlist_play_on_load,
		"playlist_scrollto_onload": this.playlist_scrollto_onload,
		"position_offset": [ this.position_offset[0] , this.position_offset[1] ],
		"ytvideo_quality_index": this.ytvideo_quality_index,
		"first_run": this.first_run
	};

	// Done
	return data;
}
MediaPlayer.prototype.load = function (data) {
	// Load
	if ("volume" in data) this.volume = data["volume"];
	if ("playlist_loop" in data) this.playlist_loop = data["playlist_loop"];
	if ("playlist_randomize" in data) this.playlist_randomize = data["playlist_randomize"];
	if ("playlist_play_on_load" in data) this.playlist_play_on_load = data["playlist_play_on_load"];

	if ("scale_factor" in data) this.scale_factor = data["scale_factor"];
	if ("player_width" in data) this.player_width = data["player_width"];
	if ("image_height" in data) this.image_height = data["image_height"];
	if ("playlist_height" in data) this.playlist_height = data["playlist_height"];
	if ("image_height_max" in data) this.image_height_max = data["image_height_max"];
	if ("ytvideo_quality_index" in data) this.ytvideo_quality_index = data["ytvideo_quality_index"];
	if ("first_run" in data) this.first_run = data["first_run"];

	if ("playlist_scrollto_onload" in data) this.playlist_scrollto_onload = data["playlist_scrollto_onload"];

	if ("position_offset" in data) {
		this.position_offset[0] = data["position_offset"][0];
		this.position_offset[1] = data["position_offset"][1];
	}
}

MediaPlayer.prototype.create = function () {
	// Destroy if necessary
	if (this.created) this.destroy();


	// Events
	$(window)
	.on("resize." + this.namespace, {media_player: this}, this.on_window_resize);
	$(document)
	.on("mouseup." + this.namespace, {media_player: this}, this.on_document_mouseup)
	.on("mousemove." + this.namespace, {media_player: this}, this.on_document_mousemove);

	// Vars
	var title_buttons = new Array();
	this.playback_controls = [ null , null , null , null , null ];
	this.help_container = [ null , null , null ];
	this.player_theme_value_updaters = new Array();
	this.resizing_controls = new Array();
	this.resizing_texts = new Array();

	// Container
	$("body").append( //{ DOM Source
		(this.sp_container_main = this.D("SPContainerMain", "SPContainerMainBorders"))
		.width(this.player_width * this.scale_factor)
		.css({"right": this.position_offset[0], "bottom": this.position_offset[1]})
		.on("dragover." + this.namespace, {media_player: this}, this.on_container_dragover)
		.on("dragenter." + this.namespace, {media_player: this}, this.on_container_dragenter)
		.on("dragexit." + this.namespace, {media_player: this}, this.on_container_dragexit)
		.on("drop." + this.namespace, {media_player: this}, this.on_container_drop)
		.on("mouseover." + this.namespace, {media_player: this}, this.on_main_container_mouseover)
		.on("mouseout." + this.namespace, {media_player: this}, this.on_main_container_mouseout)
		.append(
			(this.sp_container = this.D("SPContainer"))
			.append( //{ Resizing
				(this.resizing_container = this.D("SPResizingContainerFull"))
				.css("display", "none")
				.append(
					this.D("SPResizingContainerInner")
					.append(
						(this.resizing_controls[0] = this.D("SPResizingContainerTopLeft", "SPResizingContainerControl"))
						.on("mousedown." + this.namespace, {media_player: this, sides: [0,3]}, this.on_resizer_mousedown)
						.append(
							(this.resizing_texts[0] = this.D("SPResizingContainerTextContainer", "SPResizingContainerText"))
							.html("&#x2196;")
						)
					)
					.append(
						(this.resizing_controls[1] = this.D("SPResizingContainerTop", "SPResizingContainerControl"))
						.on("mousedown." + this.namespace, {media_player: this, sides: [0,null]}, this.on_resizer_mousedown)
						.append(
							(this.resizing_texts[1] = this.D("SPResizingContainerTextContainer", "SPResizingContainerText"))
							.html("&#x2191;")
						)
					)
					.append(
						(this.resizing_controls[2] = this.D("SPResizingContainerTopRight", "SPResizingContainerControl"))
						.on("mousedown." + this.namespace, {media_player: this, sides: [0,1]}, this.on_resizer_mousedown)
						.append(
							(this.resizing_texts[2] = this.D("SPResizingContainerTextContainer", "SPResizingContainerText"))
							.html("&#x2197;")
						)
					)
					.append(
						(this.resizing_controls[3] = this.D("SPResizingContainerLeft", "SPResizingContainerControl"))
						.on("mousedown." + this.namespace, {media_player: this, sides: [null,3]}, this.on_resizer_mousedown)
						.append(
							this.D("SPResizingContainerTextContainerOuter")
							.append(
								(this.resizing_texts[3] = this.D("SPResizingContainerTextContainerInner", "SPResizingContainerTextContainer", "SPResizingContainerText"))
								.html("&#x2190;")
							)
						)
					)
					.append(
						(this.resizing_controls[4] = this.D("SPResizingContainerRight", "SPResizingContainerControl"))
						.on("mousedown." + this.namespace, {media_player: this, sides: [null,1]}, this.on_resizer_mousedown)
						.append(
							this.D("SPResizingContainerTextContainerOuter")
							.append(
								(this.resizing_texts[4] = this.D("SPResizingContainerTextContainerInner", "SPResizingContainerTextContainer", "SPResizingContainerText"))
								.html("&#x2192;")
							)
						)
					)
					.append(
						(this.resizing_controls[5] = this.D("SPResizingContainerBottomLeft", "SPResizingContainerControl"))
						.on("mousedown." + this.namespace, {media_player: this, sides: [2,3]}, this.on_resizer_mousedown)
						.append(
							(this.resizing_texts[5] = this.D("SPResizingContainerTextContainer", "SPResizingContainerText"))
							.html("&#x2199;")
						)
					)
					.append(
						(this.resizing_controls[6] = this.D("SPResizingContainerBottom", "SPResizingContainerControl"))
						.on("mousedown." + this.namespace, {media_player: this, sides: [2,null]}, this.on_resizer_mousedown)
						.append(
							(this.resizing_texts[6] = this.D("SPResizingContainerTextContainer", "SPResizingContainerText"))
							.html("&#x2193;")
						)
					)
					.append(
						(this.resizing_controls[7] = this.D("SPResizingContainerBottomRight", "SPResizingContainerControl"))
						.on("mousedown." + this.namespace, {media_player: this, sides: [2,1]}, this.on_resizer_mousedown)
						.append(
							(this.resizing_texts[7] = this.D("SPResizingContainerTextContainer", "SPResizingContainerText"))
							.html("&#x2198;")
						)
					)
				)
			) //}
			.append( //{ Title bar
				this.D("SPTitleBarContainer")
				.on("mousedown." + this.namespace, {media_player: this}, this.on_titlebar_mousedown)
				.append(
					this.D("SPTitleContainer")
					.append(
						(this.title = this.D("SPTitle"))
						.html(this.title_default)
					)
				)
				.append(
					this.D("SPMainButtonsLeft")
					.append(
						(title_buttons[0] = this.E("a", "SPMainButtonLeft"))
						.html("[S]")
					)
					.append(
						(title_buttons[1] = this.E("a", "SPMainButtonGeneric"))
						.html("[?]")
					)
				)
				.append(
					this.D("SPMainButtonsRight")
					.append(
						(title_buttons[2] = this.E("a", "SPMainButtonGeneric"))
						.html("[&#x2012;]")
					)
					.append(
						(title_buttons[3] = this.E("a", "SPMainButtonRight"))
						.html("[&times;]")
					)
				)
			) //}
			.append( //{ Content
				(this.content_container = this.D("SPContentContainer"))
				.append( //{ Top
					(this.top_container = this.D("SPTopContainer"))
					.append(
						this.D("SPImageContainerMain")
						.append( //{ Image
							(this.image_container = this.D("SPImageContainer"))
							.height(this.image_height_max * this.scale_factor)
							.append(
								(this.no_image = this.D("SPNoImage"))
								.append(
									this.D("SPNoImageText")
									.html("[no media]")
								)
							)
							.append(
								(this.image = this.E("img", "SPImage"))
								.attr("title", "")
								.attr("alt", "")
								.css("display", "none")
								.on("load." + this.namespace, {media_player: this}, this.on_image_load)
								.on("mousedown", this.cancel_event)
							)
						) //}
						.append( //{ Video
							(this.video_container = this.D("SPVideoContainer"))
						)
						.append(
							(this.video_mask = this.D("SPVideoContainerMask"))
							.on("mousedown", {media_player: this}, this.on_image_resize_mousedown)
						) //}
						.append( //{ Playback controls
							this.D("SPControlContainer")
							.append(
								(this.playback_control_container = this.D("SPControlContainerInner"))
								.append(
									(this.playback_controls[0] = this.E("a", "SPControlLink", "SPControlLinkDisabled"))
									.html("|&lt;")
								)
								.append(
									this.D("SPControlLinkSeparator")
								)
								.append(
									(this.playback_controls[1] = this.E("a", "SPControlLink", "SPControlLinkDisabled"))
									.html("&lt;&lt;")
								)
								.append(
									this.D("SPControlLinkSeparator")
								)
								.append(
									(this.playback_controls[2] = this.E("a", "SPControlLink", "SPControlLinkDisabled"))
									.html("&gt;")
								)
								.append(
									this.D("SPControlLinkSeparator")
								)
								.append(
									(this.playback_controls[3] = this.E("a", "SPControlLink", "SPControlLinkDisabled"))
									.html("&gt;&gt;")
								)
								.append(
									this.D("SPControlLinkSeparator")
								)
								.append(
									(this.playback_controls[4] = this.E("a", "SPControlLink", "SPControlLinkDisabled"))
									.html("&gt;|")
								)
							)
						) //}
					)
					.append( //{ Audio
						(this.audio = this.E("audio"))
						.css("display", "none")
						.on("play." + this.namespace, {media_player: this}, this.on_audio_play)
						.on("pause." + this.namespace, {media_player: this}, this.on_audio_pause)
						.on("ended." + this.namespace, {media_player: this}, this.on_audio_ended)
						.on("timeupdate." + this.namespace, {media_player: this}, this.on_audio_timeupdate)
						.on("durationchange." + this.namespace, {media_player: this}, this.on_audio_durationchange)
					) //}
					.append( //{ Playlist index
						(this.playlist_index_container = this.D("SPPlaylistIndexContainer"))
						.on("mousedown", this.cancel_event)
						.append(
							this.D("SPPlaylistIndexContainerInner")
							.append(
								(this.playlist_index_text1 = this.D("SPPlaylistIndexText1"))
								.html("-")
							)
							.append(
								this.D("SPPlaylistIndexText2")
								.html("/")
							)
							.append(
								(this.playlist_index_text2 = this.D("SPPlaylistIndexText3"))
								.html("-")
							)
						)
					) //}
					.append( //{ Volume
						(this.volume_container = this.D("SPVolumeContainer"))
						.append(
							(this.volume_bar_container = this.D("SPVolumeBarContainer"))
							.on("mousedown." + this.namespace, {media_player: this}, this.on_volumebar_mousedown)
							.append(
								(this.volume_bar = this.D("SPVolumeBar"))
							)
						)
						.append(
							this.D("SPVolumeLabelContainer")
							.append(
								(this.D("SPVolumeLabel").html("Vol"))
							)
							.append(
								(this.volume_label = this.D("SPVolumeValue").html("100%"))
							)
						)
					) //}
				) //}
				.append( //{ Loaded
					this.D("SPSeekContainerTop")
					.append(
						(this.load_percent_bar_container = this.D("SPLoadPercentBarContainer"))
						.on("mousedown." + this.namespace, this.cancel_event)
						.append(
							(this.load_percent_bar_mover = this.D("SPLoadPercentBarMover"))
							.on("mousedown." + this.namespace, this.cancel_event)
						)
						.append(
							(this.load_percent_bar = this.D("SPLoadPercentBar"))
							.on("mousedown." + this.namespace, this.cancel_event)
						)
					)
				) //}
				.append( //{ Seek bar
					this.D("SPSeekContainer")
					.append(
						this.D("SPSeekTimeContainer")
						.append(
							(this.seek_time_start_label = this.D("SPSeekTimeLeft"))
							.html("0:00")
						)
						.append(
							(this.seek_time_end_label = this.D("SPSeekTimeRight"))
							.html("0:00")
						)
						.append(
							(this.seek_time_current_label = this.D("SPSeekTime"))
							.html("0:00")
						)
					)
					.append(
						(this.seek_bar_container = this.D("SPSeekBarContainer"))
						.on("mousedown." + this.namespace, {media_player: this}, this.on_seekbar_container_mousedown)
						.append(
							(this.seek_bar_mover = this.D("SPSeekBarMover"))
						)
						.append(
							(this.seek_bar = this.D("SPSeekBar"))
							.on("mousedown." + this.namespace, {media_player: this}, this.on_seekbar_mousedown)
						)
					)
				) //}
				.append( //{ Resize
					this.D("SPSeekContainerBottom")
				) //}
				.append( //{ Playlist
					(this.playlist_container = this.D("SPPlaylistContainer"))
					.height(this.playlist_height * this.scale_factor)
					.on("mousedown", this.cancel_event)
				) //}

				.append( //{ Help 0
					(this.help_container[0] = this.D("SPHelpContainer"))
					.css("display", "none")
					.append( //{ Playlist Settings
						this.D("SPHelpLabelDiv")
						.html("Playlist Settings")
					)
					.append(
						this.D("SPHelpSectionDiv")
						.append(
							this.D("SPHelpColorInputDiv0")
							.append(
								this.D("SPHelpColorInputDiv2b")
								.append(
									this.D("SPHelpColorLabelText")
									.html("Mode")
								)
							)
						)
						.append(
							this.D("SPHelpColorInputDiv1Full")
							.append(
								this.D("SPHelpColorInputDiv2")
								.append(
									this.E("a", "SPHelpModeLink")
									.html(this.playlist_randomize ? "Randomize" : (this.playlist_loop ? "Loop" : "Play Once"))
									.on("click." + this.namespace, {media_player: this}, this.on_playlist_mode_change)
									.on("mousedown", this.cancel_event)
								)
							)
						)
					)
					.append(
						this.D("SPHelpSectionDiv")
						.append(
							this.D("SPHelpColorInputDiv0")
							.append(
								this.D("SPHelpColorInputDiv2b")
								.append(
									this.D("SPHelpColorLabelText")
									.html("On Load")
								)
							)
						)
						.append(
							this.D("SPHelpColorInputDiv1Full")
							.append(
								this.D("SPHelpColorInputDiv2")
								.append(
									this.E("a", "SPHelpModeLink")
									.html(this.playlist_play_on_load_settings[this.playlist_play_on_load])
									.on("click." + this.namespace, {media_player: this}, this.on_playlist_onload_change)
									.on("mousedown", this.cancel_event)
								)
							)
						)
					)
					.append(
						this.D("SPHelpSectionDiv")
						.append(
							this.D("SPHelpColorInputDiv0")
							.append(
								this.D("SPHelpColorInputDiv2b")
								.append(
									this.D("SPHelpColorLabelText")
								)
							)
						)
						.append(
							this.D("SPHelpColorInputDiv1Full")
							.append(
								this.D("SPHelpColorInputDiv2")
								.append(
									this.E("a", "SPHelpModeLink")
									.html(this.playlist_scrollto_onload ? "Scroll to in playlist" : "Don't scroll playlist")
									.on("click." + this.namespace, {media_player: this}, this.on_playlist_scrollto_change)
									.on("mousedown", this.cancel_event)
								)
							)
						)
					)
					.append(
						this.D("SPHelpSectionDiv")
						.append(
							this.D("SPHelpColorInputDiv0")
							.append(
								this.D("SPHelpColorInputDiv2b")
								.append(
									this.D("SPHelpColorLabelText")
									.html("YT Quality")
								)
							)
						)
						.append(
							this.D("SPHelpColorInputDiv1Full")
							.append(
								this.D("SPHelpColorInputDiv2")
								.append(
									this.E("a", "SPHelpModeLink")
									.html(this.ytvideo_qualities[this.ytvideo_quality_index])
									.on("click." + this.namespace, {media_player: this}, this.on_ytquality_change)
									.on("mousedown", this.cancel_event)
								)
							)
						)
					) //}
					.append( //{ Player Settings
						this.D("SPHelpLabelDiv")
						.html("Player Settings")
					)
					.append(
						this.D("SPHelpSectionDiv")
						.append(
							this.D("SPHelpColorInputDiv0")
							.append(
								this.D("SPHelpColorInputDiv2b")
								.append(
									this.D("SPHelpColorLabelText")
									.html("Theme")
								)
							)
						)
						.append(
							this.D("SPHelpColorInputDiv1Full")
							.append(
								this.D("SPHelpColorInputDiv2")
								.append(
									(this.player_theme_name = this.E("a", "SPHelpModeLink"))
									.on("click." + this.namespace, {media_player: this}, this.on_player_theme_change)
									.on("mousedown", this.cancel_event)
								)
							)
						)
					) //}
					.append( //{ Scaling Settings
						this.D("SPHelpLabelDiv")
						.html("Scaling Settings")
					)
					.append(this.generate_value_editor("Padding", "padding_scale", this.css.css_size_presets[this.css.preset].padding_scale, false))
					.append(this.generate_value_editor("Text", "font_scale", this.css.css_size_presets[this.css.preset].font_scale, false))
					.append(this.generate_value_editor("Borders", "border_scale", this.css.css_size_presets[this.css.preset].border_scale, false))
					.append(this.generate_value_editor("Window", "@scale_factor", this.scale_factor, false))
					//}
					.append( //{ More
						this.D("SPHelpLinkDiv")
						.append(
							this.D("SPHelpLabelDiv")
							.html("More Settings")
						) 
						.append(
							this.D("SPHelpSectionDiv")
							.append(
								this.E("A", "SPHelpTextLink")
								.html("Color Settings")
								.on("click." + this.namespace, {media_player: this, help_page: 1}, this.on_helppage_goto)
							)
							.append(
								this.E("A", "SPHelpTextLink")
								.html("Other Settings")
								.on("click." + this.namespace, {media_player: this, help_page: 2}, this.on_helppage_goto)
							)
						)
					) //}
				) //}
				.append( //{ Help 1
					(this.help_container[1] = this.D("SPHelpContainer"))
					.css("display", "none")
					.append(this.D("SPHelpLabelDiv").html("Background Colors"))
					.append(this.generate_color_editor("Outline", "bg_outer_color", this.css.css_color_presets[this.css.preset].bg_outer_color))
					.append(this.generate_color_editor("Lightest", "bg_color_lightest", this.css.css_color_presets[this.css.preset].bg_color_lightest))
					.append(this.generate_color_editor("Light", "bg_color_light", this.css.css_color_presets[this.css.preset].bg_color_light))
					.append(this.generate_color_editor("Medium", "bg_color_dark", this.css.css_color_presets[this.css.preset].bg_color_dark))
					.append(this.generate_color_editor("Dark", "bg_color_darker", this.css.css_color_presets[this.css.preset].bg_color_darker))
					.append(this.generate_color_editor("Darkest", "bg_color_darkest", this.css.css_color_presets[this.css.preset].bg_color_darkest))
					.append(this.D("SPHelpLabelDiv").html("Text Colors"))
					.append(this.generate_color_editor("Default", "color_standard", this.css.css_color_presets[this.css.preset].color_standard))
					.append(this.generate_color_editor("Disabled", "color_disabled", this.css.css_color_presets[this.css.preset].color_disabled))
					.append(this.generate_color_editor("Light", "color_light", this.css.css_color_presets[this.css.preset].color_light))
					.append(this.generate_color_editor("Special 1", "color_special_1", this.css.css_color_presets[this.css.preset].color_special_1))
					.append(this.generate_color_editor("Special 2", "color_special_2", this.css.css_color_presets[this.css.preset].color_special_2))
					.append(this.generate_color_editor("Highlight", "color_highlight_light", this.css.css_color_presets[this.css.preset].color_highlight_light))
					.append(this.D("SPHelpLabelDiv").html("Other Colors"))
					.append(this.generate_color_editor("Volume", "volume_colors[0]", this.css.css_color_presets[this.css.preset].volume_colors[0]))
				) //}
				.append( //{ Help 2
					(this.help_container[2] = this.D("SPHelpContainer"))
					.css("display", "none")
					.append(this.D("SPHelpLabelDiv").html("Borders"))
					.append(this.generate_value_editor("Outer", "bg_outer_size", this.css.css_size_presets[this.css.preset].bg_outer_size, false))
					.append(this.D("SPHelpLabelDiv").html("Border Radii"))
					.append(this.generate_value_editor("Outer", "bg_outer_border_radius", this.css.css_size_presets[this.css.preset].bg_outer_border_radius, false))
					.append(this.generate_value_editor("Inner", "bg_inner_border_radius", this.css.css_size_presets[this.css.preset].bg_inner_border_radius, false))
					.append(this.generate_value_editor("Major", "border_radius_normal", this.css.css_size_presets[this.css.preset].border_radius_normal, false))
					.append(this.generate_value_editor("Minor", "border_radius_small", this.css.css_size_presets[this.css.preset].border_radius_small, false))
					.append(this.D("SPHelpLabelDiv").html("Fonts"))
					.append(this.generate_value_editor("Font", "main_font", this.css.css_size_presets[this.css.preset].main_font, true))
					.append(this.generate_value_editor("Controls", "controls_font", this.css.css_size_presets[this.css.preset].controls_font, true))
					.append(this.D("SPHelpLabelDiv").html("Font Sizes"))
					.append(this.generate_value_editor("Default", "font_size", this.css.css_size_presets[this.css.preset].font_size, false))
					.append(this.generate_value_editor("Small", "font_size_small", this.css.css_size_presets[this.css.preset].font_size_small, false))
					.append(this.generate_value_editor("Controls", "font_size_controls", this.css.css_size_presets[this.css.preset].font_size_controls, false))
				) //}

				.append( //{ First run
					(this.first_run_container = this.D("SPFirstRunContainer"))
					.append(
						this.D("SPFirstRunLabel")
						.html("Info")
					)
					.append(
						this.D("SPFirstRunTextContainer")
						.append(
							"This player can play embedded sound files in images " +
							"as well as Youtube videos. Scroll to the "
						)
						.append(
							this.E("a")
							.attr("href", "#")
							.html("bottom")
						)
						.on("click." + this.namespace, {media_player: this}, function (event) {
							event.data.media_player.first_run_container.scrollTop(
								event.data.media_player.first_run_container.outerHeight()
								- (event.data.media_player.first_run_container.attr("scrollHeight") || 0)
							);
							return false;
						})
						.append(
							" for a link to exit this page."
						)
					)
					.append(
						this.D("SPFirstRunLabel")
						.html("Player")
					)
					.append(
						this.D("SPFirstRunTextContainer")
						.append(
							this.D()
							.css("padding-bottom", "0.5em")
							.html("To move, click and drag on the title bar.")
						)
						.append(
							this.D()
							.css("padding-bottom", "0.5em")
							.html("To resize, click and drag any edge.")
						)
						.append(
							this.D()
							.css("padding-bottom", "0.5em")
							.html("To resize the image/video, click and drag it.")
						)
						.append(
							this.D()
							.html("There are additional (hidden) buttons on the right " +
							"and left sides of the title bar.")
						)
					)
					.append(
						this.D("SPFirstRunLabel")
						.html("Playlist")
					)
					.append(
						this.D("SPFirstRunTextContainer")
						.append(
							this.D()
							.css("padding-bottom", "0.5em")
							.html(
								"You can add media to the player by either " +
								"clicking on inline media URLs/[tags], or " +
								"clicking and dragging images/urls into the player " +
								"from your browser or computer."
							)
						)
						.append(
							this.D()
							.html(
								"Once the media has been loaded, it will appear in " +
								"the playlist. To remove, change order, or save the source, " +
								"hover over the right side of the playlist item for controls."
							)
						)
					)
					.append(
						this.D("SPFirstRunLabel")
						.html("Customization")
					)
					.append(
						this.D("SPFirstRunTextContainer")
						.append(
							this.D()
							.css("padding-bottom", "0.5em")
							.html(
								"There are 3 settings tabs available for customizing the " +
								"player. Access them by clicking [S] in the top left."
							)
						)
						.append(
							this.D()
							.html(
								"For simplicity, there are 4 preset stylesheets that you " +
								"can switch between. If you edit the settings, it will be " +
								"saved as a new custom stylesheet."
							)
						)
					)
					.append(
						this.D("SPFirstRunLabel")
						.html("Broken?")
					)
					.append(
						this.D("SPFirstRunTextContainer")
						.append(
							this.D()
							.css("padding-bottom", "0.5em")
							.html(
								"If you mess up some customization settings such that " +
								"your player isn't properly useable anymore, close the player, " +
								"then click the \"Reload\" link next to the [ Media Player ] " +
								"link at the top of the page."
							)
						)
						.append(
							this.D()
							.html(
								"(By default this option is hidden; hover over the right bracket " +
								"to make it appear.)"
							)
						)
					)
					.append(
						this.D("SPFirstRunLabel")
						.html("Done")
					)
					.append(
						this.E("a", "SPFirstRunExitLink")
						.attr("href", "#")
						.on("click." + this.namespace, {media_player: this}, this.on_firstrun_page_exit_click)
						.html("Exit Page")
					)
				) //}
			) //}
			.append( //{ Footer
				(this.footer_container = this.D("SPFooterBarContainer"))
			) //}
			.append( //{ Alert page
				(this.alert_container = this.D("SPAlertContainer"))
				.css("display", "none")
				.append(
					(this.D("SPAlertContentContainer")
					.html("Drop Files<br />Here"))
				)
			) //}
		)
	); //}


	// Final settings
	if (!this.first_run) {
		this.first_run_container.css("display", "none");
	}
	for (var i = 0; i < title_buttons.length; ++i) {
		title_buttons[i].on("mousedown", this.cancel_event);
		title_buttons[i].on("click." + this.namespace, {media_player: this, control_id: i}, this.on_main_control_click);
	}
	for (var i = 0; i < this.playback_controls.length; ++i) {
		this.playback_controls[i].on("click." + this.namespace, {control_id: i, media_player: this}, this.on_playback_control_click);
		this.playback_controls[i].on("mousedown", this.cancel_event);
	}
	for (var i = 0; i < this.resizing_texts.length; ++i) {
		this.resizing_texts[i].css("display", "none");
	}
	this.update_player_theme_name({media_player: this});
	this.set_volume(this.volume);
	this.audio[0].volume = this.volume;
	this.reposition();

	// Done
	this.created = true;
}
MediaPlayer.prototype.destroy = function () {
	// Playlist clear
	while (this.playlist.length > 0) {
		this.remove(0);
	}

	// Remove html
	if (this.sp_container_main != null) this.sp_container_main.remove();

	// Events
	$(window)
	.off("resize." + this.namespace);
	$(document)
	.off("mouseup." + this.namespace)
	.off("mousemove." + this.namespace);

	// Reset attributes
	this.nullify();

	// Not created
	this.created = false;
}

MediaPlayer.prototype.focus = function () {
	// Min/max
	var open = false;
	this.playlist_container.css("display", (open ? "none" : ""));
	this.top_container.css("display", (open ? "none" : ""));

	// Close overlays
	for (var i = 0; i < this.help_container.length; ++i) {
		this.help_container[i].css("display", "none");
	}

	// On screen
	this.reposition();
}

MediaPlayer.prototype.play = function () {
	if (this.current_media !== null) {
		if (this.current_media.type == "image-audio") {
			this.audio[0].play();
		}
		else if (this.current_media.type == "youtube-video") {
			if (this.ytvideo_player != null) {
				if (this.ytvideo_unsafe) {
					_unsafe_exec(function (data) {
						if (data.media_player.ytvideo_player.playVideo) data.media_player.ytvideo_player.playVideo();
					}, {media_player: this});
				}
				else {
					if (this.ytvideo_player.playVideo) this.ytvideo_player.playVideo();
				}
			}

			// Timer
			if (this.current_media.progress_timer === null) {
				var self = this;
				var playlist_item = this.current_media;
				this.current_media.progress_timer = setInterval(function () {
					self.on_ytvideo_time_update(playlist_item, self);
				}, 500);
			}
		}
		else {
			console.log(this.current_media.type);
		}
	}
	this.update_playing_status();
}
MediaPlayer.prototype.pause = function () {
	if (this.current_media !== null) {
		if (this.current_media.type == "image-audio") {
			this.audio[0].pause();
		}
		else if (this.current_media.type == "youtube-video") {
			if (this.ytvideo_player != null) {
				if (this.ytvideo_unsafe) {
					_unsafe_exec(function (data) {
						if (data.media_player.ytvideo_player.pauseVideo) data.media_player.ytvideo_player.pauseVideo();
					}, {media_player: this});
				}
				else {
					if (this.ytvideo_player.pauseVideo) this.ytvideo_player.pauseVideo();
				}
			}

			// Timer
			if (this.current_media.progress_timer !== null) {
				clearInterval(this.current_media.progress_timer);
				this.current_media.progress_timer = null;
			}
			this.on_ytvideo_time_update(this.current_media, this);
		}
		else {
			console.log(this.current_media.type);
		}
	}
	this.update_playing_status();
}
MediaPlayer.prototype.is_paused = function () {
	if (this.current_media !== null) {
		if (this.current_media.type == "image-audio") {
			return this.audio[0].paused;
		}
		else if (this.current_media.type == "youtube-video") {
			if (this.ytvideo_player != null) {
				if (this.ytvideo_unsafe) {
					return _unsafe_exec(function (data) {
						return (
							data.media_player.ytvideo_player.getPlayerState &&
							(data.media_player.ytvideo_player.getPlayerState() != window.YT.PlayerState.BUFFERING &&
							data.media_player.ytvideo_player.getPlayerState() != window.YT.PlayerState.PLAYING)
						);
					}, { media_player: this }) || false;
				}
				else {
					return (
						this.ytvideo_player.getPlayerState &&
						(this.ytvideo_player.getPlayerState() != unsafeWindow.YT.PlayerState.BUFFERING &&
						this.ytvideo_player.getPlayerState() != unsafeWindow.YT.PlayerState.PLAYING)
					);
				}
			}
		}
		else {
			console.log(this.current_media.type);
		}
	}
	return true;
}
MediaPlayer.prototype.get_position = function (seconds) {
	if (this.current_media !== null) {
		if (this.current_media.type == "image-audio" || this.current_media.type == "youtube-video") {
			return this.current_media.position;
		}
		else {
			console.log(this.current_media.type);
		}
	}
	return 0.0;
}
MediaPlayer.prototype.seek_to = function (seconds, dont_seek_in_media, dragging) {
	if (this.current_media !== null) {
		if (this.current_media.type == "image-audio") {
			if (seconds !== null) {
				if (seconds < 0.0) seconds = 0.0;
				else if (seconds > this.current_media.duration) seconds = this.current_media.duration;
				this.current_media.position = seconds;
			}

			if (!dont_seek_in_media) {
				this.audio[0].currentTime = this.current_media.position;
			}

			// HTML
			if (this.current_media.duration != 0.0) {
				this.seek_time_current_label.html(this.duration_to_string(this.current_media.position));
				this.seek_bar_mover.width((this.current_media.position / this.current_media.duration) * (this.seek_bar_container.outerWidth() - this.seek_bar.outerWidth()));
			}
		}
		else if (this.current_media.type == "youtube-video") {
			if (seconds !== null) {
				if (seconds < 0.0) seconds = 0.0;
				else if (seconds > this.current_media.duration) seconds = this.current_media.duration;
				this.current_media.position = seconds;
			}

			if (!dont_seek_in_media && this.ytvideo_player != null) {
				if (this.ytvideo_unsafe) {
					_unsafe_exec(function (data) {
						if (data.media_player.ytvideo_player.seekTo) data.media_player.ytvideo_player.seekTo(data.media_player.current_media.position, data.arg2);
					}, {media_player: this, arg2: (dragging ? false : true)});
				}
				else {
					if (this.ytvideo_player.seekTo) this.ytvideo_player.seekTo(this.current_media.position, dragging ? false : true);
				}
			}

			// HTML
			if (this.current_media.duration != 0.0) {
				this.seek_time_current_label.html(this.duration_to_string(this.current_media.position));
				this.seek_bar_mover.width((this.current_media.position / this.current_media.duration) * (this.seek_bar_container.outerWidth() - this.seek_bar.outerWidth()));
			}
		}
		else {
			console.log(this.current_media.type);
		}
	}
}
MediaPlayer.prototype.get_volume = function () {
	// Value
	return this.volume;
}
MediaPlayer.prototype.set_volume = function (volume) {
	// Value
	if (volume < 0.0) volume = 0.0;
	else if (volume > 1.0) volume = 1.0;
	this.volume = volume;

	// HTML
	var vol_str, vol_col;
	vol_str = Math.round(this.volume * 100) + "%";
	vol_col = this.get_volume_color(this.volume);
	this.volume_label.html(vol_str);
	this.volume_bar.css("height", vol_str);
	this.volume_bar.css("background", "rgb(" + vol_col[0] + "," + vol_col[1] + "," + vol_col[2] + ")");

	// Media
	if (this.current_media !== null) {
		if (this.current_media.type == "image-audio") {
			// Set volume
			this.audio[0].volume = this.volume;
		}
		else if (this.current_media.type == "youtube-video") {
			// Set volume
			if (this.ytvideo_player != null) {
				if (this.ytvideo_unsafe) {
					_unsafe_exec(function (data) {
						if (data.media_player.ytvideo_player.setVolume) data.media_player.ytvideo_player.setVolume(data.vol);
					}, {media_player: this, vol: this.volume * 100.0});
				}
				else {
					if (this.ytvideo_player.setVolume) this.ytvideo_player.setVolume(this.volume * 100.0);
				}
			}
		}
		else {
			console.log(this.current_media.type);
		}
	}
}
MediaPlayer.prototype.get_duration = function (duration) {
	if (this.current_media !== null) {
		if (this.current_media.type == "image-audio" || this.current_media.type == "youtube-video") {
			// Update duration
			return this.current_media.duration;
		}
		else {
			console.log(this.current_media.type);
		}
	}
}
MediaPlayer.prototype.set_duration = function (duration) {
	var length_str = this.duration_to_string(duration);
	if (this.current_media !== null) {
		if (this.current_media.type == "image-audio" || this.current_media.type == "youtube-video") {
			// Update duration
			this.current_media.duration = duration;
			this.current_media.info_container.html(length_str);
		}
		else {
			console.log(this.current_media.type);
		}
	}

	// html
	this.seek_time_end_label.html(length_str);
}
MediaPlayer.prototype.deselect = function (old_type) {
	if (this.current_media !== null) {
		this.unC(this.current_media.playlist_item, "SPPlaylistItemActive");

		if (this.current_media.type == "youtube-video") {
			// Timer
			if (this.current_media.progress_timer !== null) {
				clearInterval(this.current_media.progress_timer);
				this.current_media.progress_timer = null;
			}
		}

		if (this.current_media.type !== old_type) {
			// Stop
			this.stop();

			if (this.current_media.type == "image-audio") {
				this.image.css("display", "none");
				this.image.removeAttr("src");
				this.no_image.css("display", "");
				this.current_image_width = 0;
				this.current_image_height = 0;

				this.title.html(this.title_default);
			}
			else if (this.current_media.type == "youtube-video") {
				this.video_container.html("");
				this.ytvideo_player = null;
			}
			else {
				console.log(this.current_media.type);
			}

			// Global
			for (var i = 0; i < this.playback_controls.length; ++i) {
				this.C(this.playback_controls[i], "SPControlLinkDisabled");
			}
			this.seek_time_current_label.html(this.duration_to_string(0.0));
			this.seek_time_end_label.html(this.duration_to_string(0.0));
			this.current_media = null;
			this.set_loaded();
			
			// Title
			this.title.html(this.title_default);

			// Index display
			this.update_index_display(-1, this.playlist.length, true);
		}
	}
}
MediaPlayer.prototype.stop = function () {
	if (this.current_media !== null) {
		if (this.current_media.type == "image-audio" || this.current_media.type == "youtube-video") {
			if (!this.is_paused()) this.pause();
			this.seek_to(0.0);
		}
		else {
			console.log(this.current_media.type);
		}
		this.update_playing_status();
	}
}
MediaPlayer.prototype.start = function (index) {
	// Stop old sound
	this.deselect(this.playlist[index].type);

	// Controls
	for (var i = 0; i < this.playback_controls.length; ++i) {
		this.unC(this.playback_controls[i], "SPControlLinkDisabled");
	}

	// Select
	this.current_media = this.playlist[index];

	this.C(this.current_media.playlist_item, "SPPlaylistItemActive");
	this.seek_time_current_label.html(this.duration_to_string(this.current_media.position));
	this.seek_time_end_label.html(this.duration_to_string(this.current_media.duration));

	// Scroll to
	this.scroll_to(index);

	if (this.current_media.type == "image-audio") {
		// Title
		this.title.html(this.current_media.title);

		// Play this sound
		this.audio.attr("src", this.current_media.audio_blob_url);
		this.audio[0].play();

		// Current sound
		this.current_media.position = 0.0;
		this.seek_to(this.current_media.position, true);
		this.set_loaded();

		// Image
		this.no_image.css("display", "none");
		this.image.css("display", "none");
		this.image.removeAttr("src");
		this.image.attr("src", this.current_media.image_url);
	}
	else if (this.current_media.type == "youtube-video") {
		// Title
		this.title.html(this.current_media.title);

		// Old player
		if (this.ytvideo_player != null && this.ytvideo_html5) {
			var params = {
				mediaContentUrl: "http://www.youtube.com/v/" + this.current_media.vid_id + "?version=3",
				startSeconds: this.current_media.start,
				//endSeconds:Number,
				suggestedQuality: this.ytvideo_qualities[this.ytvideo_quality_index]
			};

			var okay = false;
			if (this.ytvideo_unsafe) {
				okay = _unsafe_exec(function (data) {
					if (data.media_player.ytvideo_player.cueVideoByUrl) {
						data.media_player.ytvideo_player.cueVideoByUrl(data.params);
						return true;
					}
					return false;
				}, { media_player: this, "params": params });
			}
			else {
				// not using loadVideoByUrl because "this.play" resets the timer
				if (this.ytvideo_player.cueVideoByUrl) {
					okay = true;
					this.ytvideo_player.cueVideoByUrl(params);
				}
			}
			if (okay) this.play();
			else this.ytvideo_player = null;
		}
		else {
			this.ytvideo_player = null;
		}
		// Fresh player
		if (this.ytvideo_player == null) {
			var fn = function (data) {
				try {
					var events = {
						"onReady": function (event) { data.media_player.on_ytvideo_ready(event, data.media_player); },
						"onStateChange": function (event) { data.media_player.on_ytvideo_state_change(event, data.media_player); },
						"onPlaybackQualityChange": function (event) { data.media_player.on_ytvideo_playback_quality_change(event, data.media_player); },
						"onPlaybackRateChange": function (event) { data.media_player.on_ytvideo_playback_rate_change(event, data.media_player); },
						"onError": function (event) { data.media_player.on_ytvideo_error(event, data.media_player); },
						"onApiChange": function (event) { data.media_player.on_ytvideo_api_change(event, data.media_player); }
					};
					var playerVars = {
						controls: 0,
						showinfo: 0,
						modestbranding: 1,
						//wmode: "opaque",
						html5: 1,
						disablekb: 1,
						enablejsapi: 1,
						rel: 0,
						showinfo: 0,
						origin: window.location.href.toString(),
						start: data.media_player.current_media.start,
						iv_load_policy: 3,
						loop: 0
					};

					data.media_player.ytvideo_player = new data.Player(
						data.vid_container,
						{
							width: data.size[0],
							height: data.size[1],
							videoId: data.media_player.current_media.vid_id,
							"playerVars": playerVars,
							"events": events
						}
					);
					data.media_player.ytvideo_player.media_player = data.media_player;
				}
				catch (e) {
					data.media_player.ytvideo_player = null;
					console.log(e);
				}
			}

			// Params
			var vid_container;
			var div_id = "MediaPlayer_LFfiowjdiofjagh8fwe";
			this.video_container.html((vid_container = this.D().attr("id", div_id)));

			var params = {
				"media_player": this,
				"size": [ this.video_container.outerWidth() , this.video_container.outerHeight() ],
				"div_id": div_id,
				"vid_container": vid_container[0],
				"Player": unsafeWindow.YT.Player
			};

			this.ytvideo_html5 = true;

			// Call
			if (this.ytvideo_unsafe) {
				try {
					_unsafe_exec(fn, params);
				}
				catch (e) {
					console.log("ytvideo_unsafe");
					console.log(e);
				}
			}
			else {
				fn(params);
			}
		}
		// Current sound
		this.current_media.position = 0.0;//this.current_media.start;
		this.seek_to(this.current_media.position, true);
		this.set_loaded(0.0, 0.0);
	}
	else {
		console.log(this.current_media.type);
	}

	// Index display
	this.update_index_display(index, this.playlist.length, true);
}
MediaPlayer.prototype.scroll_to = function (index) {
	var a, b;
	if (
		(a = this.playlist[index].playlist_item.offset().top) < (b = this.playlist_container.offset().top) ||
		(a = this.playlist[index].playlist_item.offset().top + this.playlist[index].playlist_item.outerHeight()) > (b = this.playlist_container.offset().top + this.playlist_container.outerHeight())
	) {
		this.playlist_container.scrollTop(this.playlist_container.scrollTop() + (a - b));
	}
}
MediaPlayer.prototype.next = function (follow_policy) {
	// Next
	if (this.playlist_randomize && follow_policy) {
		// Random
		var i = 0;
		if (this.playlist.length > 1) {
			i = Math.floor(Math.random() * (this.playlist.length - 1));
		}
		if (i == this.current_media.index) {
			i = (i + 1) % this.playlist.length;
		}
		this.start(i);
	}
	else if (!follow_policy || this.playlist_loop || this.current_media.index < this.playlist.length - 1) {
		// Next
		this.start((this.current_media.index + 1) % this.playlist.length);
	}
}
MediaPlayer.prototype.previous = function () {
	// Previous
	if (this.playlist_randomize) {
		// Random
		var i = 0;
		if (this.playlist.length > 1) {
			i = Math.floor(Math.random() * (this.playlist.length - 1));
		}
		if (i == this.current_media.index) {
			i = (i + 1) % this.playlist.length;
		}
		this.start(i);
	}
	else {
		// Previous
		this.start((this.current_media.index - 1 + this.playlist.length) % this.playlist.length);
	}
}
MediaPlayer.prototype.set_loaded = function (offset, percent) {
	if (this.current_media !== null) {
		if (offset !== undefined) {
			if (offset < 0.0) offset = 0.0;
			else if (offset > 1.0) offset = 1.0;
			if (this.current_media.type == "image-audio" || this.current_media.type == "youtube-video") {
				this.current_media.loaded_offset = offset;
			}
			else {
				console.log(this.current_media);
			}
			if (percent === undefined) percent = this.get_loaded_percent();
		}
		else {
			offset = this.get_loaded_offset();
		}
		if (percent !== undefined) {
			if (percent < 0.0) percent = 0.0;
			else if (percent > 1.0 - offset) percent = 1.0 - offset;
			if (this.current_media.type == "image-audio" || this.current_media.type == "youtube-video") {
				this.current_media.loaded_percent = percent;
			}
			else {
				console.log(this.current_media);
			}
		}
		else {
			percent = this.get_loaded_percent();
		}
	}
	else {
		percent = 0.0;
		offset = 0.0;
	}
	// Update html
	var w = this.load_percent_bar_container.outerWidth();
	this.load_percent_bar_mover.width(offset * w);
	this.load_percent_bar.width(percent * w);
}
MediaPlayer.prototype.get_loaded_offset = function () {
	if (this.current_media !== null) {
		if (this.current_media.type == "image-audio" || this.current_media.type == "youtube-video") {
			return this.current_media.loaded_offset;
		}
		else {
			console.log(this.current_media);
		}
	}
	return 0.0;
}
MediaPlayer.prototype.get_loaded_percent = function () {
	if (this.current_media !== null) {
		if (this.current_media.type == "image-audio" || this.current_media.type == "youtube-video") {
			return this.current_media.loaded_percent;
		}
		else {
			console.log(this.current_media);
		}
	}
	return 0.0;
}
MediaPlayer.prototype.remove = function (index) {
	// Stop
	if (this.current_media != null && this.current_media.index == index) this.deselect();

	if (this.playlist[index].type == "image-audio") {
		// Remove temp audio
		if (this.playlist[index].temp_audio) {
			this.playlist[index].temp_audio[0].pause();
			this.playlist[index].temp_audio.removeAttr("src").remove();
			this.playlist[index].temp_audio = null;
		}

		// Revoke url
		(window.webkitURL || window.URL).revokeObjectURL(this.playlist[index].audio_blob_url);
		if (this.playlist[index].image_url_blob != null) {
			(window.webkitURL || window.URL).revokeObjectURL(this.playlist[index].image_url_blob);
		}
	}
	else if (this.playlist[index].type == "youtube-video") {
		// Nothing to do
	}
	else {
		console.log(this.playlist[index].type);
	}

	// Remove html
	this.playlist[index].playlist_item.remove();

	// Remove from list
	this.playlist.splice(index, 1);

	// Update indices
	for (var i = 0; i < this.playlist.length; ++i) {
		this.playlist[i].index = i;
	}

	// Index display
	this.update_index_display((this.current_media != null ? this.current_media.index : -1), this.playlist.length, true);
}


MediaPlayer.prototype.nullify = function () {
	this.sp_container_main = null;
	this.sp_container = null;
	this.alert_container = null;
	this.title = null;
	this.image_container = null;
	this.image = null;
	this.no_image = null;
	this.audio = null;
	this.volume_bar = null;
	this.volume_label = null;
	this.volume_container = null;
	this.volume_bar_container = null;
	this.seek_time_start_label = null;
	this.seek_time_end_label = null;
	this.seek_time_current_label = null;
	this.seek_bar_container = null;
	this.seek_bar_mover = null;
	this.seek_bar = null;
	this.playlist_container = null;
	this.playback_controls = null;
	this.help_container = null;
	this.content_container = null;
	this.top_container = null;
	this.footer_container = null;
	this.playback_control_container = null;
	this.player_theme_name = null;
	this.video_container = null;
	this.video_mask = null;
	this.ytvideo_player = null;
	this.load_percent_bar_container = null;
	this.load_percent_bar_mover = null;
	this.load_percent_bar = null;
	this.resizing_container = null;
	this.resizing_controls = null;
	this.resizing_texts = null;
	this.first_run_container = null;
	this.playlist_index_container = null;
	this.playlist_index_text1 = null;
	this.playlist_index_text2 = null;
	if (this.playlist_index_timer !== null) {
		clearTimeout(this.playlist_index_timer);
		this.playlist_index_timer = null;
	}

	for (var i = 0; i < this.resize_timers.length; ++i) {
		if (this.resize_timers[i] !== null) {
			if (i == 2) {
				clearInterval(this.resize_timers[i]);
			}
			else {
				clearTimeout(this.resize_timers[i]);
			}
			this.resize_timers[i] = null;
		}
	}

	this.player_theme_value_updaters = null;
}

MediaPlayer.prototype.get_audio_duration = function (audio) {
	try {
		var d = (isFinite(audio.duration) ? audio.duration : audio.buffered.end(0));
		return isFinite(d) ? d : 0;
	}
	catch (e) {
		console.log(e);
	}
	return 0;
}

MediaPlayer.prototype.regen_stylesheet = function () {
	this.head_css.html(this.css.create_stylesheet());

	var vol_col = this.get_volume_color(this.volume);
	this.volume_bar.css("background", "rgb(" + vol_col[0] + "," + vol_col[1] + "," + vol_col[2] + ")");
}

MediaPlayer.prototype.update_index_display = function (index, count, activate) {
	this.playlist_index_text1.html(count == 0 ? "-" : (index >= 0 ? (index + 1).toString() : "-"));
	this.playlist_index_text2.html(count == 0 ? "-" : count.toString());

	if (!activate) return;

	this.playlist_index_container.addClass("SPPlaylistIndexContainerActive");
	if (this.playlist_index_timer !== null) {
		clearTimeout(this.playlist_index_timer);
		this.playlist_index_timer = null;
	}
	var self = this;
	this.playlist_index_timer = setTimeout(function () {
		self.playlist_index_timer = null;
		self.playlist_index_container.removeClass("SPPlaylistIndexContainerActive");
	}, 1000);
}

MediaPlayer.prototype.get_volume_color = function (percent) {
	if (this.css.get_volume_colors().length <= 1) return this.css.get_volume_colors()[0];

	percent *= (this.css.get_volume_colors().length - 1);
	var i = Math.min((this.css.get_volume_colors().length - 2), Math.floor(percent));
	percent -= i;
	var inv = 1.0 - percent;

	return [
		Math.round(this.css.get_volume_colors()[i][0] * inv + this.css.get_volume_colors()[i + 1][0] * percent) ,
		Math.round(this.css.get_volume_colors()[i][1] * inv + this.css.get_volume_colors()[i + 1][1] * percent) ,
		Math.round(this.css.get_volume_colors()[i][2] * inv + this.css.get_volume_colors()[i + 1][2] * percent)
	];
}
MediaPlayer.prototype.reposition = function (left, top) {
	if (left != undefined) {
		this.position_offset[0] = $(window).outerWidth() - (left + this.sp_container_main.outerWidth());
	}
	if (top != undefined) {
		this.position_offset[1] = $(window).outerHeight() - (top + this.sp_container_main.outerHeight());
	}
	var v;
	if (this.position_offset[0] > (v = $(window).outerWidth() - this.sp_container_main.outerWidth())) this.position_offset[0] = v;
	if (this.position_offset[1] > (v = $(window).outerHeight() - this.sp_container_main.outerHeight())) this.position_offset[1] = v;
	if (this.position_offset[0] < 0) this.position_offset[0] = 0;
	if (this.position_offset[1] < 0) this.position_offset[1] = 0;
	this.sp_container_main.css({"right": this.position_offset[0], "bottom": this.position_offset[1]});
}
MediaPlayer.prototype.resize_to = function (width, height, is_left, is_top) {
	// Current size
	var current_size = [ this.sp_container_main.outerWidth() , this.sp_container_main.outerHeight() ];

	// Height change
	if (height !== null) {
		var playlist_size = [ this.playlist_container.outerWidth() , this.playlist_container.outerHeight() ];
		var image_size = [ this.image_container.outerWidth() , this.image_container.outerHeight() ];
		var non_height = current_size[1] - playlist_size[1] - image_size[1];

		// Playlist height change
		var playlist_height_target = height - (non_height + this.image_height_max * this.scale_factor);
		if (playlist_height_target < this.playlist_height_min * this.scale_factor) {
			playlist_height_target = this.playlist_height_min * this.scale_factor;
		}
		// Image
		var image_height_target = height - (non_height);
		if (image_height_target > this.image_height_max * this.scale_factor) {
			image_height_target = this.image_height_max * this.scale_factor
		}
		if (image_height_target < this.image_height_min * this.scale_factor) {
			image_height_target = this.image_height_min * this.scale_factor;
		}

		// Update height
		this.playlist_container.outerHeight(playlist_height_target);
		this.image_container.outerHeight(image_height_target);
		this.playlist_height = playlist_height_target / this.scale_factor;
		this.image_height = image_height_target / this.scale_factor;
		if (!is_top) {
			this.position_offset[1] -= (playlist_height_target - playlist_size[1]) + (image_height_target - image_size[1]);
		}
	}

	// Width change
	if (width !== null) {
		if (width < this.player_width_min * this.scale_factor) {
			width = this.player_width_min * this.scale_factor;
		}

		// Update width
		this.player_width = width / this.scale_factor;
		this.sp_container_main.outerWidth(width);
		if (!is_left) {
			this.position_offset[0] -= (width - current_size[0]);
		}
	}

	// Update position
	this.sp_container_main.css({"right": this.position_offset[0], "bottom": this.position_offset[1]});
	this.update_image_scale();

	// Update others
	this.set_loaded();
	this.seek_to(null, true);
}
MediaPlayer.prototype.update_playing_status = function () {
	if (!this.seek_exacting && !this.seek_dragging) {
		if (this.is_paused()) {
			this.playback_controls[2].html("&gt;");
		}
		else {
			this.playback_controls[2].html("||");
		}
	}
}
MediaPlayer.prototype.update_scale_factor = function (scale_factor) {
	this.scale_factor = scale_factor;

	this.sp_container_main.outerWidth(this.player_width * this.scale_factor);
	this.playlist_container.outerHeight(this.playlist_height * this.scale_factor);
	this.image_container.outerHeight(this.image_height * this.scale_factor);
	// rescale image
	this.update_image_scale();
}
MediaPlayer.prototype.update_image_scale = function () {
	var xs = (this.image_container.outerWidth() / this.current_image_width);
	var ys = (this.image_height * this.scale_factor / this.current_image_height);
	if (ys < xs) xs = ys;
	//if (xs > 1.0) xs = 1.0;

	ys = Math.floor(this.current_image_height * xs);
	xs = Math.floor(this.current_image_width * xs);

	// Scale
	this.image.width(xs);
	this.image.height(ys);

	// Video
	if (this.ytvideo_player != null && this.ytvideo_player.setSize) {
		var size = [ this.video_container.outerWidth() , this.video_container.outerHeight() ];
		this.ytvideo_player.setSize(size[0], size[1]);
	}
}
MediaPlayer.prototype.resize_image_container = function (height) {
	// New heights
	var image_height_target = height / this.scale_factor;
	if (image_height_target < this.image_height_min) image_height_target = this.image_height_min;
	var playlist_height_target = this.playlist_height - (image_height_target - this.image_height);
	if (playlist_height_target < 0) {
		image_height_target += playlist_height_target;
		playlist_height_target = 0;
	}

	// Update
	var update_max = (this.image_height == this.image_height_max || image_height_target >= this.image_height_max);

	this.image_height = image_height_target;
	this.playlist_height = playlist_height_target;
	//if (update_max) 
	this.image_height_max = this.image_height;

	// Update
	this.playlist_container.outerHeight(this.playlist_height * this.scale_factor);
	this.image_container.outerHeight(this.image_height * this.scale_factor);
	this.update_image_scale();
}
MediaPlayer.prototype.update_player_theme_name = function (data) {
	data.media_player.player_theme_name.html(data.media_player.css.css_color_presets[data.media_player.css.preset]["@name"] || data.media_player.css.preset);
}

MediaPlayer.prototype.E = function (elem) {
	// Shortcut to create an element, masked with jquery
	var e = $(document.createElement(elem));
	for (var i = 1; i < arguments.length; ++i) this.C(e, arguments[i]);
	return e;
}
MediaPlayer.prototype.D = function () {
	// Shortcut to create a div, masked with jquery, appended with some classes
	var e = $(document.createElement("div"));
	for (var i = 0; i < arguments.length; ++i) this.C(e, arguments[i]);
	return e;
}
MediaPlayer.prototype.C = function (elem, cls) {
	elem.addClass(cls + this.css.css_suffix);
}
MediaPlayer.prototype.unC = function (elem, cls) {
	elem.removeClass(cls + this.css.css_suffix);
}

MediaPlayer.prototype.duration_to_string = function (position) {
	var seconds_in = Math.round(position);
	var minutes_in = Math.floor(seconds_in / 60);
	seconds_in = Math.floor(seconds_in - minutes_in * 60);
	var s = minutes_in + ":" + (seconds_in >= 10 ? seconds_in : "0" + seconds_in);
	return s;
}
MediaPlayer.prototype.youtube_time_to_number = function (str) {
	var time = 0;
	while (str.length > 0) {
		var match = /([0-9]+)([smh$])/.exec(str);
		if (match != null) {
			if (match[2] == "h") time += parseInt(match[1]) * 60 * 60;
			else if (match[2] == "m") time += parseInt(match[1]) * 60;
			else time += parseInt(match[1]);

			str = str.substr(match.index + match[0].length, str.length - (match.index + match[0].length));
		}
		else {
			break;
		}
	}
	return time;
}
MediaPlayer.prototype.string_to_uint8array = function (str) {
	var array = new Uint8Array(new ArrayBuffer(str.length));
	for (var i = 0; i < str.length; ++i) {
		array[i] = str.charCodeAt(i);
	}
	return array;
}
MediaPlayer.prototype.arraybuffer_to_uint8array = function (buffer) {
	return new Uint8Array(buffer);
}
MediaPlayer.prototype.generate_color_editor = function (label, identifier, value) {
	var color_edit;
	var help_input = [ null , null , null , null ];

	var e = this.D("SPHelpSectionDiv") //{ DOM Generation
		.append(
			this.D("SPHelpColorInputDiv0")
			.append(
				this.D("SPHelpColorInputDiv2b")
				.append(
					(color_edit = this.D("SPHelpColorLabelDisplay"))
				)
				.append(
					this.D("SPHelpColorLabelText")
					.html(label)
				)
			)
		)
		.append(
			this.D("SPHelpColorInputDiv1")
			.append(
				this.D("SPHelpColorInputDiv2")
				.attr("title", "Red : [0,255]")
				.append(
					this.D("SPHelpColorInputDiv3")
					.append(
						(help_input[0] = this.E("input", "SPHelpColorInput"))
						.attr("type", "text")
					)
				)
			)
		)
		.append(
			this.D("SPHelpColorInputDiv1")
			.append(
				this.D("SPHelpColorInputDiv2")
				.attr("title", "Green : [0,255]")
				.append(
					this.D("SPHelpColorInputDiv3")
					.append(
						(help_input[1] = this.E("input", "SPHelpColorInput"))
						.attr("type", "text")
					)
				)
			)
		)
		.append(
			this.D("SPHelpColorInputDiv1")
			.append(
				this.D("SPHelpColorInputDiv2")
				.attr("title", "Blue : [0,255]")
				.append(
					this.D("SPHelpColorInputDiv3")
					.append(
						(help_input[2] = this.E("input", "SPHelpColorInput"))
						.attr("type", "text")
					)
				)
			)
		)
		.append(
			this.D("SPHelpColorInputDiv1")
			.append(
				this.D("SPHelpColorInputDiv2")
				.attr("title", "Alpha : [0.0,1.0]")
				.append(
					this.D("SPHelpColorInputDiv3")
					.append(
						(help_input[3] = this.E("input", "SPHelpColorInput"))
						.attr("type", "text")
					)
				)
			)
		) //}

	// Settings
	for (var i = 0; i < help_input.length; ++i) {
		help_input[i].val(value[i]);
		help_input[i].on("change." + this.namespace, {media_player: this, color_id: identifier, component: i, color_display: color_edit}, this.on_settings_color_change);
	}

	if (value[3] >= 1.0) {
		color_edit.css("background", "rgb(" + value[0] + "," + value[1] + "," + value[2] + ")");
	}
	else {
		color_edit.css("background", "rgba(" + value[0] + "," + value[1] + "," + value[2] + "," + value[3] + ")");	
	}

	this.player_theme_value_updaters.push([
		true, identifier, help_input[0], help_input[1], help_input[2], help_input[3], color_edit
	]);

	// Done
	return e;
}
MediaPlayer.prototype.generate_value_editor = function (label, identifier, value, is_string) {
	var help_input;

	var  e = this.D("SPHelpSectionDiv") //{ DOM Generation
		.append(
			this.D("SPHelpColorInputDiv0")
			.append(
				this.D("SPHelpColorInputDiv2b")
				.append(
					this.D("SPHelpColorLabelText")
					.html(label)
				)
			)
		)
		.append(
			this.D("SPHelpColorInputDiv1Full")
			.append(
				this.D("SPHelpColorInputDiv2")
				.append(
					this.D("SPHelpColorInputDiv3")
					.append(
						(help_input = this.E("input", "SPHelpColorInput"))
						.attr("type", "text")
						.val(value)
						.on("change." + this.namespace, {media_player: this, value_id: identifier, "is_string": is_string}, this.on_settings_value_change)
					)
				)
			)
		) //}

	// Add to auto-update list
	if (identifier[0] != "@") {
		this.player_theme_value_updaters.push([
			false, identifier, help_input
		]);
	}

	return e;
}
MediaPlayer.prototype.update_value_fields = function () {
	// Update all
	for (var i in this.player_theme_value_updaters) {
		if (this.player_theme_value_updaters[i][0]) {
			// Color
			for (var j = 0; j < 4; ++j) {
				this.player_theme_value_updaters[i][2 + j].val(this.css.get_value(true, this.player_theme_value_updaters[i][1])[j]);
			}
		}
		else {
			// Value
			this.player_theme_value_updaters[i][2].val(this.css.get_value(false, this.player_theme_value_updaters[i][1]));
		}
	}
}

MediaPlayer.prototype.add_to_playlist = function (title, tag, flagged, url, sound_index, raw_data, image_src) {
	// Setup playlist settings
	var playlist_item = {
		"type": "image-audio",
		"title": title,
		"tag": tag,
		"flagged": flagged,
		"url": url,
		"sound_index": sound_index,
		"index": this.playlist.length,
		"duration": 0.0,
		"position": 0.0,
		"controls": [ null , null , null , null ],
		"loaded_offset": 0.0,
		"loaded_percent": 1.0
	};

	// Create ogg audio
	var blob = new Blob([raw_data], {type: "audio/ogg"});
	playlist_item.audio_blob_url = (window.webkitURL || window.URL).createObjectURL(blob);

	// Create/get image url
	if (typeof(image_src) == typeof("")) {
		playlist_item.image_url = image_src;
		playlist_item.image_url_blob = null;
	}
	else {
		var ext = url.split(".").pop().toLowerCase();
		var mime = "image/jpeg"
		if (ext == "png") mime = "image/png";
		else if (ext == "gif") mime = "image/gif";

		blob = new Blob([image_src], {type: mime});
		playlist_item.image_url_blob = (window.webkitURL || window.URL).createObjectURL(blob);
		playlist_item.image_url = playlist_item.image_url_blob;
	}

	// html setup
	this.playlist_container.append( //{ DOM creation
		(playlist_item.playlist_item = this.D("SPPlaylistItem"))
		.on("click." + this.namespace, {media_player: this, playlist_item: playlist_item}, this.on_playlist_item_click)
		.on("mousedown", this.cancel_event)
		.attr("title", tag != MediaPlayer.ALL_SOUNDS ? tag : "")
		.append(
			this.D("SPPlaylistSoundName")
			.text(playlist_item.title)
		)
		.append(
			(playlist_item.info_container = this.D("SPPlaylistItemInfo"))
			.html(this.duration_to_string(playlist_item.duration))
		)
		.append(
			this.D("SPPlaylistControlsContainer")
			.on("mousedown", this.cancel_event)
			.append(
				this.D("SPPlaylistControls")
				.on("click", this.cancel_event)
				.append(
					(playlist_item.controls[0] = this.E("a", "SPPlaylistControlLink"))
					.html("&times;")
					.attr("title", "Delete")
				)
				.append(
					this.D("SPPlaylistControlLinkSeparator")
				)
				.append(
					(playlist_item.controls[1] = this.E("a", "SPPlaylistControlLink"))
					.html("&uarr;")
					.attr("title", "Move up")
				)
				.append(
					this.D("SPPlaylistControlLinkSeparator")
				)
				.append(
					(playlist_item.controls[2] = this.E("a", "SPPlaylistControlLink"))
					.html("&darr;")
					.attr("title", "Move down")
				)
				.append(
					this.D("SPPlaylistControlLinkSeparator")
				)
				.append(
					(playlist_item.controls[3] = this.E("a", "SPPlaylistControlLink"))
					.html("S")
					.attr("title", "Save...")
					.attr("href", playlist_item.audio_blob_url)
				)
			)
		)
	); //}

	// Custom
	for (var i = 0; i < playlist_item.controls.length; ++i) {
		playlist_item.controls[i].on("click." + this.namespace, {control_id: i, media_player: this, playlist_item: playlist_item}, this.on_playlist_control_click);
		playlist_item.controls[i].on("mousedown", this.cancel_event);
	}

	// Automatic length detection
	playlist_item.temp_audio = this.E("audio")
		.css("display", "none")
		.attr("src", playlist_item.audio_blob_url)
		.on(
			"durationchange." + this.namespace,
			{"media_player": this, "playlist_item": playlist_item},
			this.on_temp_audio_durationchange
		);
	playlist_item.temp_audio[0].volume = 0.0;
	playlist_item.temp_audio[0].play();

	// Add
	this.playlist.push(playlist_item);

	// Scroll to?
	if (this.playlist_scrollto_onload) {
		this.scroll_to(this.playlist.length - 1);
	}

	// Index display
	this.update_index_display((this.current_media != null ? this.current_media.index : -1), this.playlist.length, true);

	// Play?
	if (!this.first_run) {
		if (
			(this.playlist_play_on_load == 1 && this.playlist.length == 1) ||
			(this.playlist_play_on_load == 2 &&
				(this.current_media == null || (
					this.current_media.index == this.playlist.length - 2 &&
					this.current_media.position >= this.current_media.duration - 1.0 &&
					this.is_paused()
				))
			) ||
			(this.playlist_play_on_load == 3 && this.is_paused()) ||
			(this.playlist_play_on_load == 4)
		) {
			this.start(this.playlist.length - 1);
		}
	}
}
MediaPlayer.prototype.add_to_playlist_ytvideo = function (original_url, vid_id, tag, flagged, info_xml) {
	// Setup playlist settings
	var duration = xml_find_nodes_by_name(info_xml, "yt:duration");
	if (duration.length > 0) {
		duration = duration[0].getAttribute("seconds");
		duration = parseFloat(duration);
		duration = isFinite(duration) ? duration : 0.0;
	}
	else {
		duration = 0.0;
	}

	var start = /[\!\#\?\&]t=[0-9smh]+/.exec(original_url);
	if (start != null) {
		start = this.youtube_time_to_number(start[0].substr(3, start[0].length - 3));
	}
	else {
		start = 0.0;
	}

	var title;
	try {
		title = $(xml_find_nodes_by_name(info_xml, "title")).text();
	}
	catch (e) {
		console.log(e);
		title = "Unknown Title";
	}

	var playlist_item = {
		"type": "youtube-video",
		"title": title,
		"original_url": original_url,
		"tag": tag,
		"flagged": flagged,
		"vid_id": vid_id,
		"duration": duration,
		"start": start,
		"position": 0.0,
		"index": this.playlist.length,
		"controls": [ null , null , null , null ],
		"progress_timer": null,
		"loaded_offset": 0.0,
		"loaded_percent": 0.0
	};

	// html setup
	this.playlist_container.append( //{ DOM creation
		(playlist_item.playlist_item = this.D("SPPlaylistItem"))
		.on("click." + this.namespace, {media_player: this, playlist_item: playlist_item}, this.on_playlist_item_click)
		.on("mousedown", this.cancel_event)
		.append(
			this.D("SPPlaylistSoundName")
			.text(playlist_item.title)
		)
		.append(
			(playlist_item.info_container = this.D("SPPlaylistItemInfo"))
			.html(this.duration_to_string(playlist_item.duration))
		)
		.append(
			this.D("SPPlaylistControlsContainer")
			.on("mousedown", this.cancel_event)
			.append(
				this.D("SPPlaylistControls")
				.on("click", this.cancel_event)
				.append(
					(playlist_item.controls[0] = this.E("a", "SPPlaylistControlLink"))
					.html("&times;")
					.attr("title", "Delete")
				)
				.append(
					this.D("SPPlaylistControlLinkSeparator")
				)
				.append(
					(playlist_item.controls[1] = this.E("a", "SPPlaylistControlLink"))
					.html("&uarr;")
					.attr("title", "Move up")
				)
				.append(
					this.D("SPPlaylistControlLinkSeparator")
				)
				.append(
					(playlist_item.controls[2] = this.E("a", "SPPlaylistControlLink"))
					.html("&darr;")
					.attr("title", "Move down")
				)
				.append(
					this.D("SPPlaylistControlLinkSeparator")
				)
				.append(
					(playlist_item.controls[3] = this.E("a", "SPPlaylistControlLink"))
					.html("Y")
					.attr("title", "Youtube Link")
					.attr("href", "//www.youtube.com/watch?v=" + playlist_item.vid_id + (playlist_item.start == 0.0 ? "" : ("&t=" + Math.floor(playlist_item.start) + "s")))
				)
			)
		)
	); //}

	// Custom
	for (var i = 0; i < playlist_item.controls.length; ++i) {
		playlist_item.controls[i].on("click." + this.namespace, {control_id: i, media_player: this, playlist_item: playlist_item}, this.on_playlist_control_click);
		playlist_item.controls[i].on("mousedown", this.cancel_event);
	}

	// Add
	this.playlist.push(playlist_item);

	// Scroll to?
	if (this.playlist_scrollto_onload) {
		this.scroll_to(this.playlist.length - 1);
	}

	// Index display
	this.update_index_display((this.current_media != null ? this.current_media.index : -1), this.playlist.length, true);

	// Play?
	if (!this.first_run) {
		if (
			(this.playlist_play_on_load == 1 && this.playlist.length == 1) ||
			(this.playlist_play_on_load == 2 &&
				(this.current_media == null || (
					this.current_media.index == this.playlist.length - 2 &&
					this.current_media.position >= this.current_media.duration - 1.0 &&
					this.is_paused()
				))
			) ||
			(this.playlist_play_on_load == 3 && this.is_paused()) ||
			(this.playlist_play_on_load == 4)
		) {
			this.start(this.playlist.length - 1);
		}
	}
}

MediaPlayer.prototype.ajax_get = function (url, return_as_string, callback_data, progress_callback, done_callback) {
	var media_player = this;
	if (this.is_chrome) {
		var xhr = new XMLHttpRequest();
		xhr.open("GET", url, true);
		if (!return_as_string) xhr.overrideMimeType("text/plain; charset=x-user-defined");
		xhr.responseType = (return_as_string ? "text" : "arraybuffer");

		xhr.onload = function (event) {
			if (typeof(done_callback) == "function") {
				if (this.status == 200) {
					done_callback(
						true,
						callback_data,
						(return_as_string ? this.response : media_player.arraybuffer_to_uint8array(this.response))
					);
				}
				else {
					done_callback(false, callback_data, null);
				}
			}
		};
		if (typeof(progress_callback) == "function") {
			xhr.onprogress = function (event) {
				progress_callback(event, callback_data);
			};
		}
		xhr.send();
	}
	else {
		var arg = {
			method: "GET",
			url: url,
			onload: function (event) {
				if (typeof(done_callback) == "function") {
					if (event.status == 200) {
						done_callback(
							true,
							callback_data,
							(return_as_string ? event.responseText : media_player.string_to_uint8array(event.responseText))
						);
					}
					else {
						done_callback(false, callback_data, null);
					}
				}
			}
		};
		if (!return_as_string) arg.overrideMimeType = "text/plain; charset=x-user-defined";
		if (typeof(progress_callback) == "function") {
			arg.onprogress = function (event) {
				progress_callback(event, callback_data);
			};
		}
		GM_xmlhttpRequest(arg);
	}
}

MediaPlayer.prototype.attempt_load = function (url_or_file, load_tag, callback_data, progress_callback, done_callback, status_callback) {
	// Attempt to load from remote URL or local file
	if (typeof(url_or_file) == typeof("")) {
		// Youtube loading
		if (this.url_get_youtube_video_id(url_or_file)) {
			this.attempt_load_video(url_or_file, load_tag, callback_data, progress_callback, done_callback, status_callback);
			return;
		}

		// Other
		var media_player = this;

		var dcb = function (okay, callback_data, response) {
			if (typeof(done_callback) == "function") done_callback(okay, callback_data);

			if (okay) {
				media_player.attempt_load_raw(false, url_or_file, load_tag, response, 0, function (status, files) {
					if (typeof(status_callback) == "function") status_callback(status, callback_data, files);
				});
			}
		};

		// URL
		this.ajax_get(url_or_file, false, callback_data, progress_callback, dcb);
	}
	else {
		// Local file
		var reader = new FileReader();
		reader.file = url_or_file;
		reader.load_tag = load_tag;
		reader.media_player = this;
		// Done function
		reader.onload = function () {
			// Convert and call load function
			var ui8_data = new Uint8Array(this.result);
			this.media_player.attempt_load_raw(true, this.file.name, this.load_tag, ui8_data, 0, function (status, files) {
				if (typeof(status_callback) == "function") status_callback(status, callback_data, files);
			});
		}
		// Start
		reader.readAsArrayBuffer(url_or_file);
	}
}
MediaPlayer.prototype.attempt_load_raw = function (is_local, url_or_filename, load_tag, raw_ui8_data, callback_id, done_callback) {
	callback_id = callback_id || 0;
	if (callback_id >= this.load_callbacks.length) {
		if (typeof(done_callback) == "function") done_callback(false, null);
		return;
	}

	// Attempt to load from raw data
	var self = this;
	this.load_callbacks[callback_id](url_or_filename, load_tag, raw_ui8_data, function (r) {
		if (r != null) {
			var available = r[0];
			r = r[1];
			if (r != null) {
				// Load every sound
				for (var j = 0; j < r.length; ++j) {
					self.add_to_playlist(r[j]["title"], load_tag, r[j]["flagged"], url_or_filename, r[j]["index"], r[j]["data"], (is_local ? raw_ui8_data : url_or_filename));
				}
			}
			if (typeof(done_callback) == "function") done_callback(true, available);
		}
		else {
			// Next
			self.attempt_load_raw(is_local, url_or_filename, load_tag, raw_ui8_data, callback_id + 1, done_callback);
		}
	});
}

MediaPlayer.prototype.attempt_load_video = function (url, load_tag, callback_data, progress_callback, done_callback, status_callback) {
	var vid_id = this.url_get_youtube_video_id(url);

	// Not found
	if (vid_id === null) {
		if (typeof(done_callback) == "function") done_callback(false, callback_data);
		return;
	}
	// Info
	var self = this;
	var info_url = "//gdata.youtube.com/feeds/api/videos/" + vid_id;
	this.ajax_get(
		info_url,
		true,
		callback_data,
		progress_callback,
		function (okay, data, response) {
			if (typeof(done_callback) == "function") done_callback(okay, callback_data);

			if (okay) {
				var xml = $.parseXML(response);
				var status = self.add_to_playlist_ytvideo(url, vid_id, null, false, xml);
				if (typeof(status_callback) == "function") status_callback(status, callback_data, xml);
			}
			else {
				// Missing
				
			}
		}
	);
}
MediaPlayer.prototype.url_get_youtube_video_id = function (url) {
	var youtube_url = new Array();
	youtube_url[0] = /(?:https?:\/\/)?(?:www\.)?youtube.com\/watch\?(?:\S+?)?v=([a-zA-Z0-9_-]{11})(?:[^\s<>]*)/i;
	youtube_url[1] = /(?:https?:\/\/)?(?:www\.)?y2u.be\/([a-zA-Z0-9_-]{11})(?:[^\s<]*)/i;
	youtube_url[2] = /(?:https?:\/\/)?(?:www\.)?youtu.be\/([a-zA-Z0-9_-]{11})(?:[^\s<]*)/i;

	var vid_id = null;
	for (var i = 0; i < youtube_url.length; ++i) {
		var match;
		if ((match = youtube_url[i].exec(url)) !== null) {
			vid_id = match[1];
			break;
		}
	}

	return vid_id;
}

MediaPlayer.prototype.on_ytvideo_time_update = function (playlist_item, media_player) {
	if (media_player.ytvideo_player != null) {
		if (media_player.ytvideo_player.getCurrentTime) {
			// Seek
			media_player.seek_to(media_player.ytvideo_player.getCurrentTime(), true);
		}
		if (media_player.ytvideo_player.getVideoLoadedFraction) {
			// Loaded
			media_player.set_loaded(media_player.get_loaded_offset(), media_player.ytvideo_player.getVideoLoadedFraction());
		}
	}
}
MediaPlayer.prototype.on_ytvideo_ready = function (event, media_player) {
	// Startup settings
	event.target.unMute();
	event.target.setVolume(media_player.get_volume() * 100.0);
	event.target.setPlaybackQuality(media_player.ytvideo_qualities[media_player.ytvideo_quality_index]);

	// Auto-play
	//var vid_id = this.url_get_youtube_video_id(event.target.getVideoUrl());
	media_player.play();
};
MediaPlayer.prototype.on_ytvideo_state_change = function (event, media_player) {
	switch (event.data) {
		case unsafeWindow.YT.PlayerState.ENDED:
			media_player.update_playing_status();
			media_player.next(true);
		break;
		case unsafeWindow.YT.PlayerState.PLAYING:
			media_player.update_playing_status();
		break;
		case unsafeWindow.YT.PlayerState.PAUSED:
			media_player.update_playing_status();
		break;
		case unsafeWindow.YT.PlayerState.BUFFERING:
			media_player.update_playing_status();
		break;
		case unsafeWindow.YT.PlayerState.CUED:
		break;
	}
};
MediaPlayer.prototype.on_ytvideo_playback_quality_change = function (event, media_player) {
};
MediaPlayer.prototype.on_ytvideo_playback_rate_change = function (event, media_player) {
};
MediaPlayer.prototype.on_ytvideo_error = function (event, media_player) {
	switch (event.data) {
		case 2:
			// invalid video id / param
		break;
		case 5:
			// Cannot be html5'd
			media_player.ytvideo_html5 = false;
		break;
		case 100:
			// Not found
		break;
		case 101:
		case 105:
			// Cannot embed
		break;
	}
};
MediaPlayer.prototype.on_ytvideo_api_change = function (event, media_player) {
};

MediaPlayer.prototype.on_main_container_mouseover = function (event) {
	event.data.media_player.resize_container_hovered = true;
	event.data.media_player.on_resize_mouse_update(null, null);
}
MediaPlayer.prototype.on_main_container_mouseout = function (event) {
	event.data.media_player.resize_container_hovered = false;
	event.data.media_player.on_resize_mouse_update(null, null);
}

MediaPlayer.prototype.on_timer_resize_open = function () {
	this.resize_timers[0] = null;
	this.resize_should_close = false;

	// Update sizes
	var d;
	$("body").append(d = this.D("SPResizingSizeOff"));
	this.resize_sizes[0] = d.outerWidth();
	d.remove();
	$("body").append(d = this.D("SPResizingSizeAvailable"));
	this.resize_sizes[1] = d.outerWidth();
	d.remove();
	$("body").append(d = this.D("SPResizingContainerText").html("I"));
	this.resize_sizes[2] = d.outerHeight();
	d.remove();
	if (this.resize_sizes[1] > this.resize_sizes[2]) this.resize_sizes[1] = this.resize_sizes[2];

	this.resize_side_sizes_target = [ this.resize_sizes[1], this.resize_sizes[1], this.resize_sizes[1], this.resize_sizes[1] ];
	this.resize_side_sizes_needed = true;
	this.on_resize_mouse_update(null, null);

	if (this.resize_timers[2] === null) {
		// Current size
		this.resize_side_sizes = [ this.resize_sizes[0], this.resize_sizes[0], this.resize_sizes[0], this.resize_sizes[0] ];

		// CSS update
		this.sp_container_main.removeClass("SPContainerMainBorders");
		this.resizing_container.css("display", "");

		// Size update loop
		var self = this;
		this.on_interval_resize_update();
		this.resize_timers[2] = setInterval(function () {
			self.on_interval_resize_update();
		}, Math.floor(this.resize_wait_times[2] * 1000));
	}
}
MediaPlayer.prototype.on_timer_resize_close = function () {
	this.resize_timers[1] = null;
	this.resize_should_close = true;
	this.resize_side_sizes_needed = true;
	this.resize_side_sizes_target = [ this.resize_sizes[0], this.resize_sizes[0], this.resize_sizes[0], this.resize_sizes[0] ];
	for (var i = 0; i < this.resizing_texts.length; ++i) {
		this.resizing_texts[i].css("display", "none");
	}
}
MediaPlayer.prototype.on_interval_resize_update = function () {
	// Stop condition
	if (this.resize_side_sizes_needed) {
		this.resize_side_sizes_needed = false;
		for (var i = 0; i < this.resize_side_sizes.length; ++i) {
			this.resize_side_sizes[i] = this.merge_value_towards(
				this.resize_side_sizes[i],
				this.resize_side_sizes_target[i],
				this.resize_side_speed * this.resize_wait_times[2]
			);
			this.resize_side_sizes_needed = (this.resize_side_sizes_needed || (this.resize_side_sizes[i] != this.resize_side_sizes_target[i]));
		}

		// CSS update sizes
		var css = [
			this.resize_side_sizes[0] + "px",
			this.resize_side_sizes[1] + "px",
			this.resize_side_sizes[2] + "px",
			this.resize_side_sizes[3] + "px"
		];
		this.resizing_container.css({"top": "-" + css[0], "right": "-" + css[1], "bottom": "-" + css[2], "left": "-" + css[3]});
		this.resizing_controls[0].css({"width": css[3], "height": css[0]});
		this.resizing_controls[1].css({"height": css[0], "left": css[3], "right": css[1]});
		this.resizing_controls[2].css({"width": css[1], "height": css[0]});
		this.resizing_controls[3].css({"width": css[3], "top": css[0], "bottom": css[2]});
		this.resizing_controls[4].css({"width": css[1], "top": css[0], "bottom": css[2]});
		this.resizing_controls[5].css({"width": css[3], "height": css[2]});
		this.resizing_controls[6].css({"height": css[2], "left": css[3], "right": css[1]});
		this.resizing_controls[7].css({"width": css[1], "height": css[2]});
	}
	else if (this.resize_should_close) {
		clearTimeout(this.resize_timers[2]);
		this.resize_timers[2] = null;

		this.resize_container_border_hovered = false;

		this.sp_container_main.addClass("SPContainerMainBorders");
		this.resizing_container.css("display", "none");

		return;
	}
}
MediaPlayer.prototype.on_resize_mouse_update = function (rel_x, rel_y) {
	if (rel_x !== null) this.resize_mouse_offset[0] = rel_x;
	else rel_x = this.resize_mouse_offset[0];
	if (rel_y !== null) this.resize_mouse_offset[1] = rel_y;
	else rel_y = this.resize_mouse_offset[1];

	var size = [ this.sp_container.outerWidth() , this.sp_container.outerHeight() ];
	var should_open = this.resizing;
	if (this.resize_container_hovered && !this.resizing) {
		should_open = (
			rel_x <= this.resize_distance[0] ||
			rel_y <= this.resize_distance[0] ||
			rel_x >= size[0] - this.resize_distance[0] ||
			rel_y >= size[1] - this.resize_distance[0]
		);

		// What sides should be expanded
		if (this.resize_timers[2] !== null) {
			this.resize_side_sizes_needed = true;
			var open = [
				(rel_y <= this.resize_distance[1]),
				(rel_x >= size[0] - this.resize_distance[1]),
				(rel_y >= size[1] - this.resize_distance[1]),
				(rel_x <= this.resize_distance[1])
			];
			for (var i = 0; i < 4; ++i) {
				this.resize_side_sizes_target[i] = this.resize_sizes[open[i] ? 2 : 1];
			}
			this.resizing_texts[0].css("display", (open[0] && open[3]) ? "" : "none");
			this.resizing_texts[1].css("display", (open[0]) ? "" : "none");
			this.resizing_texts[2].css("display", (open[0] && open[1]) ? "" : "none");
			this.resizing_texts[3].css("display", (open[3]) ? "" : "none");
			this.resizing_texts[4].css("display", (open[1]) ? "" : "none");
			this.resizing_texts[5].css("display", (open[2] && open[3]) ? "" : "none");
			this.resizing_texts[6].css("display", (open[2]) ? "" : "none");
			this.resizing_texts[7].css("display", (open[2] && open[1]) ? "" : "none");
		}
	}

	if (should_open != this.resize_container_border_hovered) {
		this.resize_container_border_hovered = should_open;
		// Clear timers
		for (var i = 0; i < 2; ++i) {
			if (this.resize_timers[i] !== null) {
				clearTimeout(this.resize_timers[i]);
				this.resize_timers[i] = null;
			}
		}
		// Set timer to close/open
		var self = this;
		if (should_open) {
			if (this.resize_timers[2] === null) {
				this.resize_timers[0] = setTimeout(function () {
					self.on_timer_resize_open();
				}, Math.floor(this.resize_wait_times[0] * 1000));
			}
			else {
				self.on_timer_resize_open();
			}
		}
		else if (this.resize_timers[2] !== null) {
			this.resize_timers[1] = setTimeout(function () {
				self.on_timer_resize_close();
			}, Math.floor(this.resize_wait_times[1] * 1000));
		}
	}
}

MediaPlayer.prototype.on_resizer_mousedown = function (event) {
	// Cannot be minimized
	if (event.data.media_player.playlist_container.css("display") != "none") {
		event.data.media_player.resizing = true;
		event.data.media_player.resizing_sides = event.data.sides;
		event.data.media_player.mouse_offset = {
			"left": (event.pageX - $(document).scrollLeft()),
			"top": (event.pageY - $(document).scrollTop())
		};
		event.data.media_player.resizing_base_size = {
			//"width": event.data.media_player.sp_container.outerWidth() + event.data.media_player.resize_sizes[0] * 2,
			//"height": event.data.media_player.sp_container.outerHeight() + event.data.media_player.resize_sizes[0] * 2
			"width": event.data.media_player.sp_container_main.outerWidth(),
			"height": event.data.media_player.sp_container_main.outerHeight()
		};
	}

	// Done
	return false;
}

MediaPlayer.prototype.merge_value_towards = function (value, target, incr) {
	return (value < target) ?
		((target - value < incr) ? target : value + incr) :
		((value - target < incr) ? target : value - incr);
}

MediaPlayer.prototype.on_titlebar_mousedown = function (event) {
	// Mouse offset
	event.data.media_player.moving = true;
	event.data.media_player.mouse_offset = event.data.media_player.sp_container_main.offset();
	event.data.media_player.mouse_offset.left -= event.pageX;
	event.data.media_player.mouse_offset.top -= event.pageY;

	// Done
	event.preventDefault();
	return false;
}
MediaPlayer.prototype.on_volumebar_mousedown = function (event) {
	// Mouse offset
	event.data.media_player.volume_changing = true;
	// Visuals
	event.data.media_player.C(event.data.media_player.volume_container, "SPVolumeContainerActive");
	// Change volume
	var volume = 1.0 - ((event.pageY) - event.data.media_player.volume_bar_container.offset().top) / event.data.media_player.volume_bar_container.outerHeight();
	event.data.media_player.set_volume(volume);
	// Done
	event.preventDefault();
	return false;
}
MediaPlayer.prototype.on_seekbar_mousedown = function (event) {
	// Mouse offset
	event.data.media_player.C(event.data.media_player.seek_bar, "SPSeekBarActive");
	event.data.media_player.seek_dragging = true;
	if ((event.data.media_player.seek_was_playing = !event.data.media_player.is_paused())) {
		event.data.media_player.pause();
	}
	event.data.media_player.mouse_offset = event.data.media_player.seek_bar.offset();
	event.data.media_player.mouse_offset.left -= event.pageX;
	event.data.media_player.mouse_offset.top -= event.pageY;
	// Done
	event.preventDefault();
	return false;
}
MediaPlayer.prototype.on_seekbar_container_mousedown = function (event) {
	// Mouse offset
	event.data.media_player.C(event.data.media_player.seek_bar, "SPSeekBarActive");
	event.data.media_player.seek_exacting = true;
	if ((event.data.media_player.seek_was_playing = !event.data.media_player.is_paused())) {
		event.data.media_player.pause();
	}
	// Seeking
	var offset = (event.pageX - event.data.media_player.seek_bar_container.offset().left) - event.data.media_player.seek_bar.outerWidth() / 2.0;
	var max_offset = event.data.media_player.seek_bar_container.outerWidth() - event.data.media_player.seek_bar.outerWidth();
	// Seek
	if (max_offset > 0.0) offset = offset / max_offset * event.data.media_player.get_duration();
	event.data.media_player.seek_to(offset);
	// Done
	event.preventDefault();
	return false;
}
MediaPlayer.prototype.on_image_resize_mousedown = function (event) {
	// Mouse offset
	event.data.media_player.resizing_image = true;
	event.data.media_player.mouse_offset = event.data.media_player.sp_container_main.offset();
	event.data.media_player.mouse_offset.left -= event.pageX;
	event.data.media_player.mouse_offset.top -= event.pageY - (event.data.media_player.image_height * event.data.media_player.scale_factor);

	event.data.media_player.mouse_moved = false;

	// Done
	event.preventDefault();
	return false;
}
MediaPlayer.prototype.on_document_mouseup = function (event) {
	// Stop all drag events
	if (event.data.media_player.moving) {
		event.data.media_player.moving = false;

		// Callback
		if (typeof(event.data.media_player.settings_callback) == "function") event.data.media_player.settings_callback(event.data.media_player);
	}
	else if (event.data.media_player.resizing) {
		event.data.media_player.resizing = false;
		event.data.media_player.on_resize_mouse_update(null, null);
		event.data.media_player.reposition();

		// Callback
		if (typeof(event.data.media_player.settings_callback) == "function") event.data.media_player.settings_callback(event.data.media_player);
	}
	else if (event.data.media_player.resizing_image) {
		event.data.media_player.resizing_image = false;

		if (event.data.media_player.mouse_moved) {
			// Callback
			if (typeof(event.data.media_player.settings_callback) == "function") event.data.media_player.settings_callback(event.data.media_player);
		}
		else {
			// Pause/play
			if (event.data.media_player.is_paused()) {
				event.data.media_player.play();
			}
			else {
				event.data.media_player.pause();
			}
		}
	}
	else if (event.data.media_player.volume_changing) {
		event.data.media_player.volume_changing = false;
		event.data.media_player.unC(event.data.media_player.volume_container, "SPVolumeContainerActive");
	}
	else if (event.data.media_player.seek_dragging) {
		event.data.media_player.seek_dragging = false;
		event.data.media_player.unC(event.data.media_player.seek_bar, "SPSeekBarActive");

		event.data.media_player.seek_to(null, false, false);

		if (event.data.media_player.seek_was_playing) {
			event.data.media_player.play();
		}
	}
	else if (event.data.media_player.seek_exacting) {
		event.data.media_player.seek_exacting = false;
		event.data.media_player.unC(event.data.media_player.seek_bar, "SPSeekBarActive");

		event.data.media_player.seek_to(null, false, false);

		if (event.data.media_player.seek_was_playing) {
			event.data.media_player.play();
		}
	}
	return true;
}
MediaPlayer.prototype.on_document_mousemove = function (event) {
	if (event.data.media_player.moving) {
		// Dragging window
		var left = (event.pageX - $(document).scrollLeft()) + event.data.media_player.mouse_offset.left;
		var top = (event.pageY - $(document).scrollTop()) + event.data.media_player.mouse_offset.top;
		event.data.media_player.reposition(left, top);
	}
	else if (event.data.media_player.resizing) {
		var size = {width: null, height: null};

		var is_top, is_left;
		if ((is_top = (event.data.media_player.resizing_sides[0] === 0))) { // top
			size.height = event.data.media_player.mouse_offset.top
				- (event.pageY - $(document).scrollTop())
				+ event.data.media_player.resizing_base_size.height;
		}
		else if (event.data.media_player.resizing_sides[0] === 2) { // bottom
			size.height = (event.pageY - $(document).scrollTop())
				- event.data.media_player.mouse_offset.top
				+ event.data.media_player.resizing_base_size.height;
		}
		if ((is_left = (event.data.media_player.resizing_sides[1] === 3))) { // left
			size.width = event.data.media_player.mouse_offset.left
				- (event.pageX - $(document).scrollLeft())
				+ event.data.media_player.resizing_base_size.width;
		}
		else if (event.data.media_player.resizing_sides[1] === 1) { // right
			size.width = (event.pageX - $(document).scrollLeft())
				- event.data.media_player.mouse_offset.left
				+ event.data.media_player.resizing_base_size.width;
		}

		event.data.media_player.resize_to(size.width, size.height, is_left, is_top);
	}
	else if (event.data.media_player.resizing_image) {
		var size = event.data.media_player.sp_container_main.offset();
		size.left = (event.pageX - size.left) + event.data.media_player.mouse_offset.left;
		size.top = (event.pageY - size.top) + event.data.media_player.mouse_offset.top;

		event.data.media_player.resize_image_container(size.top);

		event.data.media_player.mouse_moved = true;
	}
	else if (event.data.media_player.volume_changing) {
		// Changing volume
		var volume = 1.0 - ((event.pageY) - event.data.media_player.volume_bar_container.offset().top) / event.data.media_player.volume_bar_container.outerHeight();
		event.data.media_player.set_volume(volume);

		// Callback
		if (typeof(event.data.media_player.settings_callback) == "function")event.data.media_player.settings_callback(event.data.media_player);
	}
	else if (event.data.media_player.seek_dragging) {
		// Seeking
		var offset = ((event.pageX) - event.data.media_player.seek_bar_container.offset().left) + event.data.media_player.mouse_offset.left;
		var max_offset = event.data.media_player.seek_bar_container.outerWidth() - event.data.media_player.seek_bar.outerWidth();
		// Seek
		if (max_offset > 0.0) offset = offset / max_offset * event.data.media_player.get_duration();
		event.data.media_player.seek_to(offset, false, true);
	}
	else if (event.data.media_player.seek_exacting) {
		// Seeking
		var offset = ((event.pageX) - event.data.media_player.seek_bar_container.offset().left) - event.data.media_player.seek_bar.outerWidth() / 2.0;
		var max_offset = event.data.media_player.seek_bar_container.outerWidth() - event.data.media_player.seek_bar.outerWidth();
		// Seek
		if (max_offset > 0.0) offset = offset / max_offset * event.data.media_player.get_duration();
		event.data.media_player.seek_to(offset, false, true);
	}

	if (event.data.media_player.resize_container_hovered) {
		var rel = event.data.media_player.sp_container.offset();
		rel.left -= event.pageX;
		rel.top -= event.pageY;

		event.data.media_player.on_resize_mouse_update(-rel.left, -rel.top);
	}

	return true;
}
MediaPlayer.prototype.on_window_resize = function (event) {
	// Keep on screen
	event.data.media_player.reposition();
}

MediaPlayer.prototype.on_audio_play = function (event) {
	// Update playing status
	event.data.media_player.update_playing_status();
}
MediaPlayer.prototype.on_audio_pause = function (event) {
	// Update playing status
	event.data.media_player.update_playing_status();
}
MediaPlayer.prototype.on_audio_ended = function (event) {
	if (!event.data.media_player.seek_exacting && !event.data.media_player.seek_dragging) {
		// Update playing status
		event.data.media_player.update_playing_status();
		// Next
		event.data.media_player.next(true);
	}
}
MediaPlayer.prototype.on_audio_timeupdate = function (event) {
	// Update seek bar
	event.data.media_player.seek_to(this.currentTime, true);
}
MediaPlayer.prototype.on_audio_durationchange = function (event) {
	// Update item
	var duration = event.data.media_player.get_audio_duration(event.data.media_player.audio[0]);

	// Seek
	event.data.media_player.set_duration(duration);
	event.data.media_player.seek_to(null, true);
}
MediaPlayer.prototype.on_temp_audio_durationchange = function (event) {
	// Get duration
	var duration = event.data.media_player.get_audio_duration(event.data.playlist_item.temp_audio[0]);
	event.data.playlist_item.duration = duration;

	// Stop, remove, and nullify
	event.data.playlist_item.temp_audio[0].pause();
	event.data.playlist_item.temp_audio.removeAttr("src").remove();
	event.data.playlist_item.temp_audio = null;

	var length_str = event.data.media_player.duration_to_string(duration);
	event.data.playlist_item.info_container.html(length_str);
}

MediaPlayer.prototype.on_image_load = function (event) {
	var attr = $(this).attr("src");
	if (typeof(attr) !== "undefined" && attr !== false) {
		// Loaded; scale
		event.data.media_player.current_image_width = this.width;
		event.data.media_player.current_image_height = this.height;

		event.data.media_player.update_image_scale();
		$(this).css("display", "");
	}
}

MediaPlayer.prototype.on_playlist_mode_change = function (event) {
	// Change mode
	if (event.data.media_player.playlist_randomize) {
		event.data.media_player.playlist_randomize = false;
		event.data.media_player.playlist_loop = false;
	}
	else if (event.data.media_player.playlist_loop) {
		event.data.media_player.playlist_randomize = true;
	}
	else {
		event.data.media_player.playlist_loop = true;
	}

	// Label
	$(this).html(event.data.media_player.playlist_randomize ? "Randomize" : (event.data.media_player.playlist_loop ? "Loop" : "Play Once"));

	// Callback
	if (typeof(event.data.media_player.settings_callback) == "function") event.data.media_player.settings_callback(event.data.media_player);
}
MediaPlayer.prototype.on_playlist_onload_change = function (event) {
	// Change mode
	var v = (event.data.media_player.playlist_play_on_load + 1) % event.data.media_player.playlist_play_on_load_settings.length;
	event.data.media_player.playlist_play_on_load = v;

	// Label
	$(this).html(event.data.media_player.playlist_play_on_load_settings[event.data.media_player.playlist_play_on_load]);

	// Callback
	if (typeof(event.data.media_player.settings_callback) == "function") event.data.media_player.settings_callback(event.data.media_player);
}
MediaPlayer.prototype.on_playlist_scrollto_change = function (event) {
	// Change mode
	event.data.media_player.playlist_scrollto_onload = !event.data.media_player.playlist_scrollto_onload;

	// Label
	$(this).html(event.data.media_player.playlist_scrollto_onload ? "Scroll to in playlist" : "Don't scroll playlist");

	// Callback
	if (typeof(event.data.media_player.settings_callback) == "function") event.data.media_player.settings_callback(event.data.media_player);
}

MediaPlayer.prototype.on_ytquality_change = function (event) {
	// Change mode
	event.data.media_player.ytvideo_quality_index = (event.data.media_player.ytvideo_quality_index + 1) % event.data.media_player.ytvideo_qualities.length;

	if (event.data.media_player.ytvideo_player != null && event.data.media_player.ytvideo_player.setPlaybackQuality) {
		event.data.media_player.ytvideo_player.setPlaybackQuality(event.data.media_player.ytvideo_qualities[event.data.media_player.ytvideo_quality_index]);
	}

	// Label
	$(this).html(event.data.media_player.ytvideo_qualities[event.data.media_player.ytvideo_quality_index]);

	// Callback
	if (typeof(event.data.media_player.settings_callback) == "function") event.data.media_player.settings_callback(event.data.media_player);
}
MediaPlayer.prototype.on_player_theme_change = function (event) {
	// Change mode
	var first = null;
	var find = false;
	for (var theme in event.data.media_player.css.css_color_presets) {
		if (theme == "default") continue;
		if (first === null) first = theme;
		if (theme == event.data.media_player.css.preset && !find) find = true;
		else if (find) {
			find = null;
			event.data.media_player.css.load_preset(theme);
			break;
		}
	}
	if (find !== null) {
		event.data.media_player.css.load_preset(first);
	}

	// Update value editors
	event.data.media_player.update_value_fields();

	// Update stylesheet
	event.data.media_player.regen_stylesheet();

	// Label
	event.data.media_player.update_player_theme_name({media_player: event.data.media_player});

	// Callback
	if (typeof(event.data.media_player.settings_callback) == "function") event.data.media_player.settings_callback(event.data.media_player);
}

MediaPlayer.prototype.on_playback_control_click = function (event) {
	if (event.data.media_player.current_media != null) {
		var time_offset = 5.0;
		switch (event.data.control_id) {
			case 0:
			{
				if (event.data.media_player.get_position() - time_offset < 0.0) event.data.media_player.previous();
				else event.data.media_player.seek_to(0.0);
			}
			break;
			case 1:
			{
				var t = event.data.media_player.get_position() - time_offset;
				if (t < 0.0) event.data.media_player.previous();
				else event.data.media_player.seek_to(t);
			}
			break;
			case 2:
			{
				if (event.data.media_player.is_paused()) {
					event.data.media_player.play();
				}
				else {
					event.data.media_player.pause();
				}
			}
			break;
			case 3:
			{
				event.data.media_player.seek_to(event.data.media_player.get_position() + time_offset);
			}
			break;
			case 4:
			{
				event.data.media_player.next();
			}
			break;
		}
	}
}
MediaPlayer.prototype.on_main_control_click = function (event) {
	switch (event.data.control_id) {
		case 1:
		{
			// Info
			event.data.media_player.first_run_container.css("display", "");
			for (var i = 0; i < event.data.media_player.help_container.length; ++i) {
				event.data.media_player.help_container[i].css("display", "none");
			}
		}
		break;
		case 0:
		{
			// Options
			if (event.data.media_player.first_run_container.css("display") == "none") {
				var open = false;
				for (var i = 0; i < event.data.media_player.help_container.length; ++i) {
					if (event.data.media_player.help_container[i].css("display") != "none") {
						open = true;
						break;
					}
				}
				if (open) {
					for (var i = 0; i < event.data.media_player.help_container.length; ++i) {
						event.data.media_player.help_container[i].css("display", "none");
					}
				}
				else {
					event.data.media_player.help_container[0].css("display", "");
				}
			}
		}
		break;
		case 2:
		{
			// Min/max
			var open = (event.data.media_player.playlist_container.css("display") != "none");
			event.data.media_player.playlist_container.css("display", (open ? "none" : ""));
			event.data.media_player.top_container.css("display", (open ? "none" : ""));

			// Close overlays
			for (var i = 0; i < event.data.media_player.help_container.length; ++i) {
				event.data.media_player.help_container[i].css("display", "none");
			}

			// HTML
			$(this).html(open ? "[+]" : "[&#x2012;]");

			// On screen
			event.data.media_player.reposition();
		}
		break;
		case 3:
		{
			// Close
			event.data.media_player.destructor();
		}
		break;
	}
}
MediaPlayer.prototype.on_helppage_goto = function (event) {
	for (var i = 0; i < event.data.media_player.help_container.length; ++i) {
		event.data.media_player.help_container[i].css("display", (event.data.help_page == i ? "" : "none"));
	}
}
MediaPlayer.prototype.on_firstrun_page_exit_click = function (event) {
	event.data.media_player.first_run_container.css("display", "none");
	event.data.media_player.first_run = false;

	// Callback
	if (typeof(event.data.media_player.settings_callback) == "function") event.data.media_player.settings_callback(event.data.media_player);

	return false;
}

MediaPlayer.prototype.on_playlist_item_click = function (event) {
	// Play
	event.data.media_player.start(event.data.playlist_item.index);
}

MediaPlayer.prototype.on_playlist_control_click = function (event) {
	switch (event.data.control_id) {
		case 0:
		{
			// Delete
			event.data.media_player.remove(event.data.playlist_item.index);
		}
		return false;
		case 1:
		{
			// Move up
			var i = event.data.playlist_item.index;
			if (i > 0) {
				// Update html
				var i1 = event.data.media_player.playlist[i - 1];
				var i2 = event.data.media_player.playlist[i];
				i1.playlist_item.before(i2.playlist_item);

				// Update list order and indices
				event.data.media_player.playlist[i] = i1;
				event.data.media_player.playlist[i - 1] = i2;
				i1.index = i;
				i2.index = i - 1;
			}
		}
		break;
		case 2:
		{
			// Move down
			var i = event.data.playlist_item.index;
			if (i < event.data.media_player.playlist.length - 1) {
				// Update html
				var i1 = event.data.media_player.playlist[i];
				var i2 = event.data.media_player.playlist[i + 1];
				i1.playlist_item.before(i2.playlist_item);

				// Update list order and indices
				event.data.media_player.playlist[i + 1] = i1;
				event.data.media_player.playlist[i] = i2;
				i1.index = i + 1;
				i2.index = i;
			}
		}
		break;
		case 3:
		{
			// URL
			if (!event.originalEvent.which || event.originalEvent.which == 1) {
				if (event.data.playlist_item.type == "image-audio") {
					alert("Right click and save as, or open in a new tab.");
				}
				else if (event.data.playlist_item.type == "youtube-video") {
					prompt("Right click/middle click to open. Original:", event.data.playlist_item.original_url);
				}
				else {
					console.log(event.data.playlist_item.type);
				}
			}
			else {
				return true;
			}
		}
		return false;
	}

	// Done
	return true;
}

MediaPlayer.prototype.on_settings_color_change = function (event) {
	// Parse value
	var value = 0;

	try {
		if (event.data.component < 3) {
			value = parseInt($(this).val());

			if (value != value) value = 0;
			else if (value < 0) value = 0;
			else if (value > 255) value = 255;
		}
		else {
			value = parseFloat($(this).val());

			if (value != value) value = 0.0;
			else if (value < 0.0) value = 0.0;
			else if (value > 1.0) value = 1.0;
		}
	}
	catch (e) {
		// not a number
	}

	// Update display
	$(this).val(value);

	// Set value
	event.data.media_player.css.modify_value(true, event.data.color_id, value, event.data.component);

	// Display value
	value = event.data.media_player.css.get_value(true, event.data.color_id);
	if (value[3] >= 1.0) {
		event.data.color_display.css("background", "rgb(" + value[0] + "," + value[1] + "," + value[2] + ")");
	}
	else {
		event.data.color_display.css("background", "rgba(" + value[0] + "," + value[1] + "," + value[2] + "," + value[3] + ")");	
	}

	// Update stylesheet
	if (/volume_colors/.test(event.data.color_id)) {
		event.data.media_player.set_volume(event.data.media_player.volume);
	}
	else {
		event.data.media_player.regen_stylesheet();
	}

	// Callback
	if (typeof(event.data.media_player.settings_callback) == "function") event.data.media_player.settings_callback(event.data.media_player);
}
MediaPlayer.prototype.on_settings_value_change = function (event) {
	var value = $(this).val();
	if (!event.data.is_string) {
		value = parseFloat(value);
		if (value != value) value = 0.0;
		$(this).val(value);
	}

	// Set value
	if (event.data.value_id[0] == "@") {
		var name = event.data.value_id.substr(1, event.data.value_id.length - 1);
		if (name == "scale_factor") {
			if (value <= 0.25) value = 0.25;
			if (value >= 4.0) value = 4.0;
			$(this).val(value);
			event.data.media_player.update_scale_factor(value);
		}
	}
	else {
		event.data.media_player.css.modify_value(false, event.data.value_id, value);
	}

	// Update stylesheet
	event.data.media_player.regen_stylesheet();
	event.data.media_player.reposition();

	// Callback
	if (typeof(event.data.media_player.settings_callback) == "function") event.data.media_player.settings_callback(event.data.media_player);
}

MediaPlayer.prototype.on_container_drop = function (event) {
	// Close overlays
	event.data.media_player.alert_container.css("display", "none");
	for (var i = 0; i < event.data.media_player.help_container.length; ++i) {
		event.data.media_player.help_container[i].css("display", "none")
	}

	// Load
	if (event.originalEvent.dataTransfer.files.length > 0) {
		for (var i = 0; i < event.originalEvent.dataTransfer.files.length; ++i) {
			event.data.media_player.attempt_load(event.originalEvent.dataTransfer.files[i], MediaPlayer.ALL_SOUNDS);
		}
	}
	else {
		// URL
		event.data.media_player.attempt_load(event.originalEvent.dataTransfer.getData("text/plain"), MediaPlayer.ALL_SOUNDS);
	}

	// Done
	event.preventDefault();
	event.stopPropagation();
	return false;
}
MediaPlayer.prototype.on_container_dragover = function (event) {
	event.originalEvent.dataTransfer.dropEffect = "move";
	// Done
	event.preventDefault();
	event.stopPropagation();
	return false;
}
MediaPlayer.prototype.on_container_dragenter = function (event) {
	event.data.media_player.alert_container.css("display", "");
	// Done
	event.preventDefault();
	event.stopPropagation();
	return false;
}
MediaPlayer.prototype.on_container_dragexit = function (event) {
	event.data.media_player.alert_container.css("display", "none");
	// Done
	event.preventDefault();
	event.stopPropagation();
	return false;
}

MediaPlayer.prototype.cancel_event = function (event) {
	// Done
	event.preventDefault();
	event.stopPropagation();
	return false;
}




