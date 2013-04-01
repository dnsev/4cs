/*/////////////////////////////////////////////////////////////////////////////
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
//   [ { "title": ..., "flagged": ..., "index": ..., "data": ..., "position": ..., "format": ... } , ... ]
//     title : the title of the song found within the file
//   flagged : true if the load_tag didn't match the name; false otherwise
//     index : the index of the sound in the file (0 = first, 1 = second, etc.)
//      data : an Uint8Array of the sound (.ogg)
//  position : the position inside the source (in bytes) (negative for not relevant)
//    format : the type of encoding (string)
/////////////////////////////////////////////////////////////////////////////*/



///////////////////////////////////////////////////////////////////////////////
// Media Player CSS class
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
		".MPContainerMain": {
			"border-radius": "{exp:bg_outer_border_radius,*,border_scale}px",
			"padding": "{exp:bg_outer_size,*,padding_scale}px",
			"background": "transparent",
			"font-family": "{main_font}",
			"font-size": "{exp:font_size,*,font_scale}px",
			"position": "fixed",
			"color": "{hex:color_standard}",
			"z-index": "10000"
		},
		".MPContainerMainBorders": {
			"background": "{rgba:bg_outer_color}"
		},
		".MPContainer": {
			"position": "relative"
		},

		".MPTitleBarContainer": {
			"position": "relative",
			"background": "{rgba:bg_color_dark}",
			"text-align": "center",
			"cursor": "move",
			"border-top-left-radius": "{exp:bg_inner_border_radius,*,border_scale}px",
			"border-top-right-radius": "{exp:bg_inner_border_radius,*,border_scale}px"
		},
		".MPTitleContainer": {
			"display": "block",
			"padding": "{exp:1,*,padding_scale}px 0px {exp:1,*,padding_scale}px 0px",
			"overflow": "hidden"
		},
		".MPTitle": {
			"position": "relative",
			"z-index": "1",
			"display": "inline",
			"white-space": "nowrap",
			"font-weight": "bold",
			"color": "{hex:color_special_1} !important",
			"text-shadow": "{exp:1,*,font_scale}px {exp:1,*,font_scale}px {exp:1,*,font_scale}px {hex:color_highlight_light}"
		},

		".MPMainButtonsLeft": {
			"position": "absolute",
			"z-index": "2",
			"left": "0",
			"top": "0",
			"display": "inline-block",
			"height": "100%",
			"overflow": "hidden"
		},
		".MPMainButtonsRight": {
			"position": "absolute",
			"z-index": "2",
			"right": "0",
			"top": "0",
			"display": "inline-block",
			"height": "100%",
			"overflow": "hidden"
		},
		".MPMainButtonLeft, a.MPMainButtonLeft": {
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
		".MPMainButtonLeft:hover": {
			"opacity": "1.0",
			"text-decoration": "none !important",
			"color": "{hex:color_light} !important",
			"background": "{rgba:bg_color_darker}"
		},
		".MPMainButtonLeft:active": {
			"opacity": "1.0",
			"text-decoration": "none !important",
			"color": "{hex:color_special_2} !important",
			"background": "{rgba:bg_color_darker}"
		},
		".MPMainButtonRight, a.MPMainButtonRight": {
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
		".MPMainButtonRight:hover": {
			"opacity": "1.0",
			"text-decoration": "none !important",
			"color": "{hex:color_light} !important",
			"background": "{rgba:bg_color_darker}"
		},
		".MPMainButtonRight:active": {
			"opacity": "1.0",
			"text-decoration": "none !important",
			"color": "{hex:color_special_2} !important",
			"background": "{rgba:bg_color_darker}"
		},
		".MPMainButtonGeneric, a.MPMainButtonGeneric": {
			"display": "inline-block",
			"padding": "{exp:1,*,padding_scale}px",
			"text-decoration": "none !important",
			"cursor": "pointer",
			"height": "100%",
			"opacity": "0.0",
			"color": "{hex:color_disabled} !important",
			"background": "transparent"
		},
		".MPMainButtonGeneric:hover": {
			"opacity": "1.0",
			"text-decoration": "none !important",
			"color": "{hex:color_light} !important",
			"background": "{rgba:bg_color_darker}"
		},
		".MPMainButtonGeneric:active": {
			"opacity": "1.0",
			"text-decoration": "none !important",
			"color": "{hex:color_special_2} !important",
			"background": "{rgba:bg_color_darker}"
		},

		".MPContentContainer": {
			"background": "{rgba:bg_color_light}",
			"text-align": "center",
			"position": "relative"
		},

		".MPTopContainer": {
			"position": "relative",
		},
		".MPVolumeContainer": {
			"position": "absolute",
			"left": "0",
			"top": "0",
			"height": "100%",
			"opacity": "0.0",
			"background": "transparent"
		},
		".MPVolumeContainerActive": {
			"opacity": "1.0 !important"
		},
		".MPContainerMain:hover .MPVolumeContainer": {
			"opacity": "0.5"
		},
		".MPContainerMain:hover .MPTopContainer:hover .MPVolumeContainer": {
			"opacity": "1.0"
		},
		".MPVolumeContainerActive .MPVolumeContainer": {
			"opacity": "1.0 !important"
		},
		".MPVolumeContainerActive .MPVolumeContainer:hover": {
			"opacity": "1.0 !important"
		},
		".MPVolumeBarContainer": {
			"position": "relative",
			"width": "{exp:16,*,font_scale}px",
			"height": "100%",
			"display": "inline-block",
			"vertical-align": "top",
			"cursor": "pointer",
			"background": "{rgba:bg_color_lightest}"
		},
		".MPVolumeBar": {
			"position": "absolute",
			"bottom": "0",
			"width": "100%",
			"cursor": "pointer"
		},
		".MPVolumeLabelContainer": {
			"text-align": "left",
			"display": "inline-block",
			"cursor": "default",
			"padding": "0px {exp:2,*,padding_scale}px 0px {exp:2,*,padding_scale}px",
			"text-shadow": "{exp:1,*,font_scale}px {exp:1,*,font_scale}px 1px {hex:color_highlight_light}"
		},
		".MPVolumeLabel": {
			"display": "block",
			"color": "{hex:color_standard} !important",
		},
		".MPVolumeValue": {
			"display": "block",
			"font-size": "{exp:font_size_small,*,font_scale}px",
			"color": "{hex:color_standard} !important",
		},

		".MPLoadedStatusContainer": {
			"position": "absolute",
			"right": "0",
			"top": "0",
			"cursor": "default"
		},
		".MPLoadedStatusContainer.MPLoadedStatusContainerActive > .MPPlaylistIndexContainer": {
			"opacity": "1.0 !important"
		},
		".MPLoadedStatusContainer.MPLoadedStatusContainerActive > .MPPlaylistLoadingContainer": {
			"opacity": "1.0 !important"
		},

		".MPPlaylistLoadingContainer": {
			"display": "inline-block",
			"cursor": "default",
			"opacity": "0.0",
			"padding": "{exp:2,*,padding_scale}px 0px {exp:2,*,padding_scale}px {exp:2,*,padding_scale}px",
		},
		".MPPlaylistLoadingContainerInner": {
			"padding": "{exp:2,*,padding_scale}px",
			"border-radius": "{exp:2,*,padding_scale}px",
			"background": "{rgba:bg_color_lightest}",
		},
		".MPPlaylistLoadingText1": {
			"color": "{hex:color_standard} !important",
			"display": "inline-block"
		},
		".MPPlaylistLoadingText2": {
			"color": "{hex:color_standard} !important",
			"display": "inline-block",
			"padding": "0px 0px 0px {exp:2,*,padding_scale}px"
		},
		".MPPlaylistLoadingText3": {
			"color": "{hex:color_standard} !important",
			"display": "inline-block"
		},

		".MPPlaylistIndexContainer": {
			"display": "inline-block",
			"cursor": "default",
			"opacity": "0.0",
			"padding": "{exp:2,*,padding_scale}px",
		},
		".MPPlaylistIndexContainer.MPPlaylistIndexContainerActive": {
			"opacity": "1.0 !important"
		},
		".MPContainerMain:hover .MPPlaylistIndexContainer": {
			"opacity": "0.5"
		},
		".MPContainerMain:hover .MPTopContainer:hover .MPPlaylistIndexContainer": {
			"opacity": "1.0"
		},
		".MPPlaylistIndexContainerInner": {
			"padding": "{exp:2,*,padding_scale}px",
			"border-radius": "{exp:2,*,padding_scale}px",
			"background": "{rgba:bg_color_lightest}",
		},
		".MPPlaylistIndexText1": {
			"color": "{hex:color_standard} !important",
			"display": "inline-block"
		},
		".MPPlaylistIndexText2": {
			"color": "{hex:color_standard} !important",
			"display": "inline-block",
			"padding": "0px {exp:2,*,padding_scale}px 0px {exp:2,*,padding_scale}px",
		},
		".MPPlaylistIndexText3": {
			"color": "{hex:color_standard} !important",
			"display": "inline-block"
		},

		".MPControlContainer": {
			"width": "100%",
			"padding-top": "{exp:2,*,padding_scale}px",
			"text-align": "center",
			"position": "absolute",
			"bottom": "0",
			"opacity": "0.0"
		},
		".MPContainerMain:hover .MPControlContainer": {
			"opacity": "1.0"
		},
		".MPControlContainerInner": {
			"padding": "{exp:4,*,padding_scale}px {exp:6,*,padding_scale}px {exp:2,*,padding_scale}px {exp:6,*,padding_scale}px",
			"display": "inline-block",
			"border-top-left-radius": "{exp:border_radius_normal,*,border_scale}px",
			"border-top-right-radius": "{exp:border_radius_normal,*,border_scale}px",
			"background": "{rgba:bg_color_lightest,0.5}"
		},
		".MPTopContainer:hover .MPControlContainerInner": {
			"background": "{rgba:bg_color_lightest}"
		},
		".MPControlLink, a.MPControlLink": {
			"padding": "{exp:1,*,padding_scale}px {exp:2,*,padding_scale}px {exp:1,*,padding_scale}px {exp:2,*,padding_scale}px",
			"font-family": "{controls_font} !important",
			"font-size": "{exp:font_size_controls,*,font_scale}px",
			"font-weight": "bold !important",
			"text-decoration": "none !important",
			"display": "inline-block",
			"border-radius": "{exp:border_radius_small,*,border_scale}px",
			"cursor": "pointer",
			"color": "{hex:color_standard} !important",
			"background": "transparent"
		},
		".MPControlLink:hover, a.MPControlLink:hover": {
			"text-decoration": "none !important",
			"color": "{hex:color_standard} !important",
			"background": "{rgba:bg_color_light}"
		},
		".MPControlLink:active, a.MPControlLink:active": {
			"text-decoration": "none !important",
			"color": "{hex:color_special_2} !important",
			"background": "{rgba:bg_color_dark}"
		},
		".MPControlLinkDisabled, .MPControlLinkDisabled:hover, .MPControlLinkDisabled:active": {
			"color": "{hex:color_disabled} !important",
			"background": "transparent !important",
			"cursor": "default !important"
		},
		".MPControlLinkSeparator": {
			"display": "inline-block",
			"width": "{exp:2,*,padding_scale}px"
		},

		".MPControlLinkSvgContainer": {
			"padding": "{exp:1,*,padding_scale}px {exp:2,*,padding_scale}px {exp:1,*,padding_scale}px {exp:2,*,padding_scale}px",
			"border-radius": "{exp:border_radius_small,*,border_scale}px",
			"background": "transparent",
			"display": "inline-block",
			"cursor": "pointer"
		},
		".MPControlLinkSvgContainer:hover": {
			"background": "{rgba:bg_color_light}"
		},
		".MPControlLinkSvgContainer:active": {
			"background": "{rgba:bg_color_dark}"
		},
		".MPControlLinkSvg": {
			"width": "{exp:14,*,font_scale}px",
			"height": "{exp:14,*,font_scale}px"
		},
		".MPControlLinkSvgMainGroup": {
		},
		".MPControlLinkSvgShapeColor": {
			"fill": "{rgb:color_standard}",
			"fill-opacity": "0.5",
			"stroke": "none"
		},
		".MPTopContainer:hover .MPControlLinkSvgShapeColor": {
			"fill-opacity": "1.0 !important"
		},
		".MPTopContainer:hover .MPControlLinkDisabled .MPControlLinkSvgShapeColor": {
			"fill-opacity": "0.5 !important"
		},
		".MPControlLinkSvgContainer:hover .MPControlLinkSvgShapeColor": {
			"fill": "{rgb:color_standard}",
		},
		".MPControlLinkSvgContainer:active .MPControlLinkSvgShapeColor": {
			"fill": "{rgb:color_special_2}",
		},

		".MPVideoContainer": {
			"display": "block",
			"position": "absolute",
			"left": "0",
			"top": "0",
			"width": "100%",
			"height": "100%",
			"overflow": "hidden"
		},
		".MPVideoContainerMask": {
			"display": "block",
			"position": "absolute",
			"left": "0",
			"top": "0",
			"width": "100%",
			"height": "100%",
			"cursor": "default !important",
			"border": "0px hidden !important",
		},

		".MPSeekContainerTop": {
			"position": "relative",
			"height": "{exp:1,*,border_scale}px",
			"background": "{rgba:bg_color_dark}",
			"font-size":"0px"
		},
		".MPSeekContainerBottom": {
			"height": "{exp:1,*,border_scale}px",
			"background": "{rgba:bg_color_dark}"
		},

		".MPSeekContainer": {
			"position": "relative",
			"border": "0px"
		},
		".MPSeekTimeContainer": {
			"position": "relative",
			"padding": "{exp:1,*,padding_scale}px 0px {exp:1,*,padding_scale}px 0px",
			"text-align": "center"
		},
		".MPSeekTime": {
			"color": "{hex:color_standard} !important",
			"display": "inline-block",
			"text-shadow": "{exp:1,*,font_scale}px {exp:1,*,font_scale}px 1px {hex:color_highlight_light}",
		},
		".MPSeekTimeLeft": {
			"position": "absolute",
			"left": "0",
			"padding-left": "{exp:1,*,padding_scale}px",
			"display": "inline-block",
			"color": "{hex:color_disabled} !important"
		},
		".MPSeekTimeRight": {
			"position": "absolute",
			"right": "0",
			"padding-right": "{exp:1,*,padding_scale}px",
			"display": "inline-block",
			"color": "{hex:color_disabled} !important"
		},
		".MPSeekBarContainer": {
			"position": "absolute",
			"left": "0",
			"top": "0",
			"width": "100%",
			"height": "100%",
			"text-align": "left",
			"overflow": "hidden",
			"cursor": "default"
		},
		".MPSeekBarMover": {
			"width": "0px",
			"height": "100%",
			"display": "inline-block",
			"background": "{rgba:bg_color_darkest,0.125}",
			"cursor": "default"
		},
		".MPSeekBar": {
			"width": "{exp:8,*,font_scale}px",
			"height": "100%",
			"display": "inline-block",
			"background": "{rgba:bg_color_darkest,0.75}",
			"cursor": "pointer"
		},
		".MPSeekBarActive": {
			"background": "{rgba:color_special_2,0.75} !important"
		},

		".MPLoadPercentBarContainer": {
			"position": "absolute",
			"left": "0",
			"top": "0",
			"width": "100%",
			"height": "100%",
			"text-align": "left",
			"overflow": "hidden",
			"cursor": "default",
		},
		".MPLoadPercentBarMover": {
			"width": "0px",
			"height": "100%",
			"display": "inline-block",
			"background": "transparent",
			"cursor": "default"
		},
		".MPLoadPercentBar": {
			"width": "0px",
			"height": "100%",
			"display": "inline-block",
			"background": "{rgba:bg_color_darkest,0.5}",
			"cursor": "default"
		},

		".MPImageContainerMain": {
			"padding": "0px !important",
			"width": "100%",
			"text-align": "center",
			"position": "relative"
		},
		".MPImageContainer": {
			"display": "block",
			"width": "100%",
			"overflow": "hidden",
			"position": "relative"
		},
		".MPImage": {},
		".MPNoImage": {
			"display": "inline-block",
			"background": "{rgba:bg_color_lightest}",
			"color": "{hex:color_disabled}",
			"cursor": "default"
		},
		".MPNoImageText": {
			"display": "none"
		},

		".MPSeekIndicatorContainer": {
			"display": "block",
			"position": "absolute",
			"bottom": "0",
			"left": "0",
			"right": "0",
			"text-align": "left"
		},
		".MPSeekIndicatorContainer.MPSeekIndicatorContainerDisabled": {
			"display": "none"
		},
		".MPSeekIndicatorContainer.MPSeekIndicatorContainerDragging, .MPSeekIndicatorContainer.MPSeekIndicatorContainerDisabled.MPSeekIndicatorContainerDragging": {
			"display": "block"
		},
		".MPSeekIndicator": {
			"display": "inline-block",
			"padding": "{exp:2,*,padding_scale}px {exp:3,*,padding_scale}px {exp:2,*,padding_scale}px {exp:3,*,padding_scale}px",
			"border-top-left-radius": "{exp:border_radius_small,*,border_scale}px",
			"border-top-right-radius": "{exp:border_radius_small,*,border_scale}px",
			"background": "{rgba:bg_color_lightest,1.0}",
			"position": "absolute",
			"left": "0",
			"bottom": "0"
		},

		".MPPlaylistContainer": {
			"cursor": "default",
			"overflow-x": "hidden",
			"overflow-y": "auto"
		},
		".MPPlaylistItem, a.MPPlaylistItem, a.MPPlaylistItem:link, a.MPPlaylistItem:visited": {
			"position": "relative",
			"display": "block",
			"text-align": "left",
			"overflow": "hidden",
			"white-space": "nowrap",
			"cursor": "pointer",
			"text-decoration": "none !important"
		},
		".MPPlaylistItem:hover, .MPPlaylistItem:active, a.MPPlaylistItem:hover, a.MPPlaylistItem:active": {
			"background": "{rgba:bg_color_lightest}",
			"text-decoration": "none !important"
		},
		".MPPlaylistItemActive": {},
		".MPPlaylistControlsContainer": {
			"position": "absolute",
			"right": "0",
			"top": "0",
			"display": "block",
			"cursor": "default"
		},
		".MPPlaylistItemInfo": {
			"position": "absolute",
			"right": "0",
			"top": "0",
			"white-space": "nowrap",
			"color": "{hex:color_light} !important",
			"display": "block",
			"cursor": "default",
			"padding": "{exp:1,*,padding_scale}px {exp:2,*,padding_scale}px {exp:1,*,padding_scale}px 0px",
			"background": "{rgba:bg_color_light}",
		},
		".MPPlaylistItem:hover .MPPlaylistItemInfo": {
			"background": "{rgba:bg_color_lightest}",
		},
		".MPPlaylistControls": {
			"opacity": "0.0",
			"text-decoration": "none !important",
			"background": "transparent",
			"display": "inline-block",
			"color": "{hex:color_standard} !important",
			"padding": "{exp:1,*,padding_scale}px 0px {exp:1,*,padding_scale}px 0px"
		},
		".MPPlaylistItem:hover .MPPlaylistControls": {
			"background": "{rgba:bg_color_lightest}",
			"text-decoration": "none !important",
			"opacity": "0.25"
		},
		".MPPlaylistItem:hover .MPPlaylistControls:hover, .MPPlaylistControls:active": {
			"background": "{rgba:bg_color_lightest}",
			"text-decoration": "none !important",
			"opacity": "1.0"
		},
		".MPPlaylistControlLink, a.MPPlaylistControlLink, .MPPlaylistControlLink:visited, a.MPPlaylistControlLink:visited": {
			"display": "inline-block",
			"padding": "0px {exp:2,*,padding_scale}px 0px {exp:2,*,padding_scale}px",
			"width": "{exp:12,*,font_scale}px",
			"text-align": "center",
			"cursor": "pointer",
			"border-radius": "{exp:border_radius_small,*,border_scale}px",
			"text-decoration": "none",
			"color": "{hex:color_disabled} !important",
			"background": "transparent"
		},
		".MPPlaylistControls:hover .MPPlaylistControlLink, .MPPlaylistControls:hover a.MPPlaylistControlLink": {
			"text-decoration": "none !important",
			"background": "{rgba:bg_color_light} !important"
		},
		".MPPlaylistControls:hover .MPPlaylistControlLink:hover, .MPPlaylistControls:hover a.MPPlaylistControlLink:hover": {
			"text-decoration": "none !important",
			"color": "{hex:color_standard} !important",
			"background": "{rgba:bg_color_dark}"
		},
		".MPPlaylistControls:hover .MPPlaylistControlLink:active, .MPPlaylistControls:hover a.MPPlaylistControlLink:active": {
			"text-decoration": "none !important",
			"color": "{hex:color_special_2} !important",
			"background": "{rgba:bg_color_dark}"
		},
		".MPPlaylistControlLinkSeparator": {
			"display": "inline-block",
			"padding": "0px 0px 0px {exp:1,*,padding_scale}px",
			"cursor": "default"
		},
		".MPPlaylistSoundName": {
			"color": "{hex:color_standard} !important",
			"padding": "{exp:1,*,padding_scale}px 0px {exp:1,*,padding_scale}px {exp:2,*,padding_scale}px"
		},
		".MPPlaylistItemActive .MPPlaylistSoundName": {
			"color": "{hex:color_special_2} !important",
			"text-shadow": "{exp:1,*,font_scale}px {exp:1,*,font_scale}px 1px {hex:color_highlight_light}"
		},

		".MPHelpContainer": {
			"position": "absolute",
			"left": "0",
			"top": "0",
			"width": "100%",
			"height": "100%",
			"background": "{rgba:bg_color_light}"
		},
		".MPHelpContainerInner0": {
			"position": "relative",
			"width": "100%",
			"height": "100%",
		},
		".MPHelpContainerInner1": {
			"position": "absolute",
			"left": "0",
			"top": "0",
			"right": "0",
			"bottom": "0",
			"overflow-x": "hidden",
			"overflow-y": "auto",
		},
		".MPHelpLabelDiv": {
			"display": "block",
			"width": "100%",
			"text-align": "left",
			"font-weight": "bold",
			"color": "{hex:color_standard} !important",
			"padding": "{exp:4,*,padding_scale}px {exp:2,*,padding_scale}px 0px {exp:2,*,padding_scale}px"
		},
		".MPHelpTextDiv": {
			"display": "block",
			"width": "100%",
			"text-align": "left",
			"color": "{hex:color_standard} !important",
			"padding": "{exp:2,*,padding_scale}px {exp:4,*,padding_scale}px 0px {exp:4,*,padding_scale}px"
		},
		".MPHelpSectionDiv": {
			"display": "block",
			"width": "100%",
			"text-align": "left",
			"color": "{hex:color_standard} !important",
			"padding-top": "{exp:2,*,padding_scale}px"
		},
		".MPHelpLinkDiv": {
			"background": "{rgba:bg_color_light}",
			"display": "block",
			"width": "100%",
			"position": "absolute",
			"bottom": "0",
			"left": "0"
		},
		".MPHelpTextLink, a.MPHelpTextLink": {
			"display": "inline-block",
			"width": "50%",
			"text-align": "center",
			"cursor": "pointer",
			"text-decoration": "none",
			"color": "{hex:color_standard} !important"
		},
		".MPHelpTextLink:hover, a.MPHelpTextLink:hover": {
			"text-decoration": "underline",
			"color": "{hex:color_standard} !important"
		},
		".MPHelpTextLink:active, a.MPHelpTextLink:active": {
			"text-decoration": "underline",
			"color": "{hex:color_special_2} !important"
		},
		".MPHelpModeNonLink": {
			"padding-left": "{exp:4.0,*,padding_scale}px"
		},
		".MPHelpModeLink, a.MPHelpModeLink": {
			"display": "inline-block",
			"width": "100%",
			"text-align": "left",
			"cursor": "pointer",
			"text-decoration": "none",
			"color": "{hex:color_standard} !important",
			"padding-left": "{exp:4.0,*,padding_scale}px"
		},
		".MPHelpModeLink:hover, a.MPHelpModeLink:hover": {
			"text-decoration": "underline",
			"color": "{hex:color_standard} !important"
		},
		".MPHelpModeLink:active, a.MPHelpModeLink:active": {
			"text-decoration": "underline",
			"color": "{hex:color_special_2} !important"
		},
		".MPHelpColorInputDiv0": {
			"width": "28%",
			"display": "inline-block",
			"position": "relative"
		},
		".MPHelpColorLabelText": {
			"display": "block",
			"width": "100%",
			"text-align": "right",
			"font-style": "italic",
			"color": "{hex:color_standard} !important",
			"vertical-align": "middle"
		},
		".MPHelpColorLabelDisplay": {
			"display": "block",
			"width": "{exp:4,*,padding_scale}px",
			"height": "100%",
			"position": "absolute",
			"left	": "0",
			"top": "0"
		},
		".MPHelpColorInputDiv1": {
			"width": "18%",
			"display": "inline-block"
		},
		".MPHelpColorInputDiv1Full": {
			"width": "72%",
			"display": "inline-block"
		},
		".MPHelpColorInputDiv2": {
			"padding-right": "{exp:2,*,padding_scale}px"
		},
		".MPHelpColorInputDiv2b": {
			"padding-right": "{exp:2,*,padding_scale}px"
		},
		".MPHelpColorInputDiv3": {
			"border": "{exp:1,*,border_scale}px solid {hex:bg_color_dark}",
			"padding": "{exp:2,*,padding_scale}px",
			"background": "{rgba:bg_color_lightest}"
		},
		".MPHelpColorInput[type=\"text\"], .MPHelpColorInput[type=\"text\"]:hover, .MPHelpColorInput[type=\"text\"]:active, .MPHelpColorInput[type=\"text\"]:focus, input.MPHelpColorInput[type=\"text\"], input.MPHelpColorInput[type=\"text\"]:hover, input.MPHelpColorInput[type=\"text\"]:active, input.MPHelpColorInput[type=\"text\"]:focus": {
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

		".MPFooterBarContainer": {
			"position": "relative",
			"background": "{rgba:bg_color_light}",
			"text-align": "center",
			"height": "{exp:bg_inner_border_radius,*,border_scale}px",
			"border-bottom-left-radius": "{exp:bg_inner_border_radius,*,border_scale}px",
			"border-bottom-right-radius": "{exp:bg_inner_border_radius,*,border_scale}px"
		},

		".MPDownloadsContainer": {
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
		".MPDownloadsLabel": {
			"display": "block",
			"width": "100%",
			"text-align": "left",
			"font-weight": "bold",
			"color": "{hex:color_standard} !important",
			"padding": "{exp:4,*,padding_scale}px {exp:2,*,padding_scale}px 0px {exp:2,*,padding_scale}px"
		},
		".MPDownloadsContent": {
			"display": "block",
			"width": "100%",
			"text-align": "left",
			"color": "{hex:color_standard} !important",
			"padding": "{exp:2,*,padding_scale}px {exp:4,*,padding_scale}px 0px {exp:4,*,padding_scale}px"
		},
		".MPDownloadsContent div": {
			"color": "{hex:color_standard} !important",
		},
		".MPDownloadsLink, a.MPDownloadsLink, .MPDownloadsLink:visited, a.MPDownloadsLink:visited": {
			"cursor": "pointer",
			"text-decoration": "underline !important",
			"color": "{hex:color_standard} !important",
		},
		".MPDownloadsLink:hover, a.MPDownloadsLink:hover": {
			"color": "{hex:color_special_2} !important"
		},
		".MPDownloadsLink:active, a.MPDownloadsLink:active": {
			"color": "{hex:color_special_2} !important"
		},

		".MPDownloadsContentReady": {
			"padding-top": "{exp:6,*,padding_scale}px",
		},

		".MPAlertContainer": {
			"width": "100%",
			"height": "100%",
			"background": "{rgba:bg_color_lightest,0.75} !important",
			"position": "absolute",
			"left": "0",
			"top": "0",
			"border-radius": "{exp:bg_inner_border_radius,*,border_scale}px",
			"display": "block"
		},
		".MPAlertContentContainer": {
			"position": "relative",
			"top": "50%",
			"text-align": "center",
			"font-size": "{exp:40,*,font_scale}px !important",
			"color": "{hex:color_standard} !important",
			"margin-top": "{exp:-40,*,font_scale}px !important"
		},

		".MPResizingSizeOff": {
			"width": "{exp:bg_outer_size,*,padding_scale}px",
			"height": "{exp:bg_outer_size,*,padding_scale}px",
		},
		".MPResizingSizeAvailable": {
			"width": "{exp:bg_outer_size,*,padding_scale,*,2}px",
			"height": "{exp:bg_outer_size,*,padding_scale,*,2}px",
		},
		".MPResizingContainerFull": {
			"position": "absolute",
			"left": "-{exp:bg_outer_size,*,padding_scale}px",
			"top": "-{exp:bg_outer_size,*,padding_scale}px",
			"right": "-{exp:bg_outer_size,*,padding_scale}px",
			"bottom": "-{exp:bg_outer_size,*,padding_scale}px",
			"left":"-16px","top":"-16px","right":"-16px","bottom":"-16px",

			"border-radius": "{exp:bg_outer_border_radius,*,border_scale}px",
			"background": "{rgba:bg_outer_color}"
		},
		".MPResizingContainerInner": {
			"position": "relative",
			"width": "100%",
			"height": "100%"
		},
		".MPResizingContainerControl": {
			"overflow": "hidden",
			"position": "absolute"
		},
		".MPResizingContainerTopLeft": {
			"left": "0",
			"width": "16px",
			"top": "0",
			"height": "16px",
			"cursor": "nw-resize"
		},
		".MPResizingContainerTop": {
			"left": "16px",
			"right": "16px",
			"top": "0",
			"height": "16px",
			"cursor": "n-resize"
		},
		".MPResizingContainerTopRight": {
			"right": "0",
			"width": "16px",
			"top": "0",
			"height": "16px",
			"cursor": "ne-resize"
		},
		".MPResizingContainerLeft": {
			"left": "0",
			"width": "16px",
			"top": "16px",
			"bottom": "16px",
			"cursor": "w-resize"
		},
		".MPResizingContainerRight": {
			"right": "0",
			"width": "16px",
			"top": "16px",
			"bottom": "16px",
			"cursor": "e-resize"
		},
		".MPResizingContainerBottomLeft": {
			"left": "0",
			"width": "16px",
			"bottom": "0",
			"height": "16px",
			"cursor": "sw-resize"
		},
		".MPResizingContainerBottom": {
			"left": "16px",
			"right": "16px",
			"bottom": "0",
			"height": "16px",
			"cursor": "s-resize"
		},
		".MPResizingContainerBottomRight": {
			"right": "0",
			"width": "16px",
			"bottom": "0",
			"height": "16px",
			"cursor": "se-resize"
		},
		".MPResizingContainerTextContainerOuter": {
			"position": "relative",
			"width": "100%",
			"height": "100%"
		},
		".MPResizingContainerTextContainerInner": {
			"position": "absolute",
			"left": "0",
			"top": "50%",
			"width": "100%",
			"height": "100%",
			"margin-top": "-{exp:font_size_controls,*,font_scale,/,2}px",
		},
		".MPResizingContainerTextContainer": {
			"width": "100%",
			"height": "100%",
			"text-align": "center",
			"cursor": "inherit"
		},
		".MPResizingContainerText": {
			"font-family": "{controls_font}",
			"font-size": "{exp:font_size_controls,*,font_scale}px",
			"font-weight": "bold",
			"color": "{hex:color_standard}",
			"text-shadow": "{exp:1,*,font_scale}px {exp:1,*,font_scale}px 1px {hex:color_highlight_light}"
		},

		".MPControlsForceHide .MPControlContainer, .MPControlsForceHide .MPPlaylistIndexContainer, .MPControlsForceHide .MPVolumeContainer": {
			"display": "none !important"
		},

		".MPTheatreEnabled": {},
		".MPTheatreEnabled .MPTitleBarContainer": {
			"cursor": "default !important"
		},
		".MPTheatreDim": {
			"position": "fixed",
			"left": "0",
			"top": "0",
			"right": "0",
			"bottom": "0",
			"z-index": "1000",
			"background-color": "#000",
		},
		".MPMainButtonAboutTheatre": {
			"display": "inline-block",
			"font-size": "{exp:font_size_small,*,font_scale}px",
			"vertical-align": "middle",
			"color": "{hex:color_special_1} !important",
			"text-shadow": "{exp:1,*,font_scale,*,font_size_small,/,font_size}px {exp:1,*,font_scale,*,font_size_small,/,font_size}px {exp:1,*,font_scale,*,font_size_small,/,font_size}px {hex:color_highlight_light}"
		},
		".MPTheatreHidden": {
			"display": "none !important",
		},
		".MPContainerMain:not(.MPTheatreEnabled) .MPTheatreOnly": {
			"display": "none",
		},
	};
}
MediaPlayerCSS.prototype = {
	constructor: MediaPlayerCSS,
	create_stylesheet: function () {
		var stylesheet = "";
		var key, style, css_key, css_value;
		for (key in this.css) {
			// Add the key
			stylesheet += (this.css_suffix.length == 0 ? key : this.form_key(key)) + "{";
			// Iterate over its style elements
			style = this.css[key];
			for (css_key in style) {
				// Value
				css_value = this.parse_out_values(style[css_key]);
				// Add the style
				stylesheet += css_key + ":" + css_value + ";";
			}
			// Finish
			stylesheet += "}";
		}

		// Return
		return stylesheet;
	},
	parse_out_values: function (value) {
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
				else if (match2 == "rgb:") format_mode = 2;
				else if (match2 == "rgba:") format_mode = 3;
				else if (match2 == "exp:") format_mode = 4;
				else if (match2 == "iexp:") format_mode = 5;
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
					if (match2.length > 0 && (match2[0] == "\"" || match2[0] == "'")) {
						indices.push(match2.substr(1, match2.length - 2));
					}
					else {
						indices.push(parseInt(match2));
					}
					return "";
				});
				// Check if it's a variable name, or a integer literal
				if (values[v].length > 0 && (values[v].charCodeAt(0) & 0xDF) >= "A".charCodeAt(0) && (values[v].charCodeAt(0) & 0xDF) <= "Z".charCodeAt(0)) {
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
					case 2: // rgb
					case 3: // rgba
					{
						if (values.length == 2) {
							a = (translated[1] ? values[1] : parseFloat(values[1]));
						}
						else {
							a = values[0][3];
						}

						v = (translated[0] ? values[0] : parseFloat(values[0]));
						if (a >= 1.0 || format_mode == 2) {
							v = "rgb(" + v[0] + "," + v[1] + "," + v[2] + ")";
						}
						else {
							v = "rgba(" + v[0] + "," + v[1] + "," + v[2] + "," + a + ")";
						}
					}
					return v;
					case 4: // exp
					case 5: // iexp
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
	},
	load_preset: function (preset_name) {
		this.preset = preset_name.replace(/[^a-zA-Z_]/g, "").toLowerCase();

		if (!(this.preset in this.css_color_presets)) {
			for (var key in this.css_color_presets) {
				this.preset = key;
				break;
			}
		}

		if (typeof(this.on_theme_change_callback) == "function") this.on_theme_change_callback(this.on_theme_change_callback_data);
	},
	get_volume_colors: function () {
		return this.css_color_presets[this.preset].volume_colors;
	},
	get_value: function (is_color, name) {
		// Array indices
		var indices = new Array();
		name = name.replace(/\[.+?\]/g, function (match) {
			// Remove []
			match = match.substr(1, match.length - 2);
			// Add to index list
			if (match.length > 0 && (match[0] == "\"" || match[0] == "'")) {
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
	},
	create_custom: function () {
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
	},
	modify_value: function (is_color, name, value, component_index) {
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
			if (match.length > 0 && (match[0] == "\"" || match[0] == "'")) {
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
	},
	save: function () {
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
	},
	load: function (data) {
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

	},
	form_key: function (key) {
		return key.replace(/(\.[a-zA-Z0-9_-]+)/g, "$1" + this.css_suffix);
	},
};



///////////////////////////////////////////////////////////////////////////////
// Media Player class
///////////////////////////////////////////////////////////////////////////////
function MediaPlayer (css, load_callbacks, drag_callback, settings_callback, destruct_callback, additional_options) {
	// Not setup
	this.created = false;
	this.identifier = this.random_string(8);
	this.namespace = "mp_" + this.identifier;
	this.is_chrome = ((navigator.userAgent + "").indexOf(" Chrome/") >= 0);
	this.title_default =  "Media Player";

	// Loading
	this.set_load_callbacks(load_callbacks);
	this.drag_callback = drag_callback;
	this.settings_callback = settings_callback;
	this.destruct_callback = destruct_callback;

	this.use_load_buffer = true;
	this.load_buffer = [];
	this.load_buffer_timer = null;
	this.load_buffer_active = false;

	this.use_svg = true;
	this.doc_mouse = {x:0, y:0};

	// Dimension scaling
	this.scale_factor = 1.0;

	// Video
	this.ytvideo_player = null;
	this.ytvideo_qualities = [ "default", "small", "medium", "large", "hd720", "hd1080", "highres" ];
	this.ytvideo_quality_index = 0;
	this.ytvideo_unsafe = this.is_chrome;
	this.ytvideo_html5 = true;

	this.vimeovideo_player = null;
	this.vimeovideo_player_paused = true;
	this.vimeovideo_unsafe = this.is_chrome;

	this.soundcloud_player = null;
	this.soundcloud_player_paused = true;
	this.soundcloud_unsafe = this.is_chrome;

	this.videcode_async = true;
	this.videcode_steps = 1024 * 64;
	this.videcode_delay = 1;

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
	this.playlist_play_on_load = 2;
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
	this.playlist_loop = false;
	this.playlist_randomize = false;
	this.playlist_scrollto_onload = true;
	this.playlist_index_timer = null;

	// Current
	this.current_media = null;

	// html elements
	this.nullify();
	this.additional_options = additional_options;
	for (var i = 0; i < this.additional_options.length; ++i) {
		this.additional_options[i].media_player = this;
	}

	// Batch
	this.batch_download_blob = null;
	this.batch_download_blob_url = "";

	// Animation
	this.animate_open_time = 0.25;
	this.animate_close_time = 0.25;

	// Theatre mode
	this.theatre_mode = false;
	this.theatre_mode_target = false;
	this.theatre_vars = {};
	this.theatre_mode_animate_time = 0.25;
	this.theatre_animation_timer = null;
	this.theatre_position = {};
	this.theatre_animation_vars = {};
	this.theatre_offset = 16;
	this.theatre_dim = 0.5;
	this.theatre_dim_color = "#000000";
	this.theatre_hide_controls_time = 2.0;
	this.theatre_hide_controls_timer = null;
	this.theatre_hide_controls_enabled = false;

	// CSS
	this.css = css;
	//this.css.css_suffix = "_" + this.random_string(4);
	this.css.on_theme_change_callback = this.update_player_theme_name;
	this.css.on_theme_change_callback_data = {media_player: this};
	$("head").append(
		(this.head_css = this.E("style"))
		.attr("id", "MPStyleMediaPlayer") // this.random_string(16 + this.random_integer(17)))
		.html(this.css.create_stylesheet())
	);

	// Saving
	this.save_data = [
		"volume",
		"playlist_height",
		"player_width",
		"image_height",
		"image_height_max",
		"scale_factor",
		"playlist_loop",
		"playlist_randomize",
		"playlist_play_on_load",
		"playlist_scrollto_onload",
		"position_offset",
		"ytvideo_quality_index",
		"use_svg",
		"animate_open_time",
		"animate_close_time",
		"theatre_mode_animate_time",
		"theatre_offset",
		"theatre_dim",
		"theatre_dim_color",
	];
}
MediaPlayer.prototype = {
	constructor: MediaPlayer,
	destructor: function () {
		// Callback
		if (typeof(this.destruct_callback) == "function") this.destruct_callback(this);
		this.destruct_callback = null;

		// Destroy
		if (this.created) this.full_destroy();
		if (this.head_css !== null) {
			this.head_css.remove();
			this.head_css = null;
		}
	},

	save: function () {
		// Save
		var data = {};

		var array_type = typeof([]);
		for (var i = 0; i < this.save_data.length; ++i) {
			if (typeof(this[this.save_data[i]]) == array_type) {
				data[this.save_data[i]] = this[this.save_data[i]].slice(0);
			}
			else {
				data[this.save_data[i]] = this[this.save_data[i]];
			}
		}

		// Done
		return data;
	},
	load: function (data) {
		// Load
		var scope = (arguments.length > 1 ? arguments[1] : this);
		var array_type = typeof([]);

		for (var key in data) {
			if ((scope !== this && key in scope) || (scope === this && this.load_check(key))) {
				if (typeof(data[key]) == array_type) {
					this.load(data[key], scope[key]);
				}
				else {
					scope[key] = data[key];
				}
			}
		}
	},
	load_check: function (key) {
		for (var i = 0; i < this.save_data.length; ++i) {
			if (key == this.save_data[i]) return true;
		}
		return false;
	},

	create: function () {
		// Destroy if necessary
		if (this.created) this.full_destroy();


		// Events
		$(window)
		.on("resize." + this.namespace, {media_player: this}, this.on_window_resize);
		$(document)
		.on("mouseup." + this.namespace, {media_player: this}, this.on_document_mouseup)
		.on("mousemove." + this.namespace, {media_player: this}, this.on_document_mousemove);

		// Vars
		var help_custom_div = null;
		this.title_buttons = new Array();
		this.help_container = [ null , null , null ];
		this.help_container_inner1 = [ null , null , null ];
		this.help_container_footer = [ null , null , null ];
		this.player_theme_value_updaters = new Array();
		this.resizing_controls = new Array();
		this.resizing_texts = new Array();

		// Container
		$("body").append( //{ DOM Source
			(this.mp_container_main = this.D("MPContainerMain", "MPContainerMainBorders"))
			.width(this.player_width * this.scale_factor)
			.css({"right": this.position_offset[0], "bottom": this.position_offset[1], "opacity": "0"})
			.on("dragover." + this.namespace, {media_player: this}, this.on_container_dragover)
			.on("dragenter." + this.namespace, {media_player: this}, this.on_container_dragenter)
			.on("dragexit." + this.namespace, {media_player: this}, this.on_container_dragexit)
			.on("drop." + this.namespace, {media_player: this}, this.on_container_drop)
			.on("mouseover." + this.namespace, {media_player: this}, this.on_main_container_mouseover)
			.on("mouseout." + this.namespace, {media_player: this}, this.on_main_container_mouseout)
			.append(
				(this.mp_container = this.D("MPContainer"))
				.append( //{ Resizing
					(this.resizing_container = this.D("MPResizingContainerFull"))
					.css("display", "none")
					.append(
						this.D("MPResizingContainerInner")
						.append(
							(this.resizing_controls[0] = this.D("MPResizingContainerTopLeft", "MPResizingContainerControl"))
							.on("mousedown." + this.namespace, {media_player: this, sides: [0,3]}, this.on_resizer_mousedown)
							.append(
								(this.resizing_texts[0] = this.D("MPResizingContainerTextContainer", "MPResizingContainerText"))
								.html("&#x2196;")
							)
						)
						.append(
							(this.resizing_controls[1] = this.D("MPResizingContainerTop", "MPResizingContainerControl"))
							.on("mousedown." + this.namespace, {media_player: this, sides: [0,null]}, this.on_resizer_mousedown)
							.append(
								(this.resizing_texts[1] = this.D("MPResizingContainerTextContainer", "MPResizingContainerText"))
								.html("&#x2191;")
							)
						)
						.append(
							(this.resizing_controls[2] = this.D("MPResizingContainerTopRight", "MPResizingContainerControl"))
							.on("mousedown." + this.namespace, {media_player: this, sides: [0,1]}, this.on_resizer_mousedown)
							.append(
								(this.resizing_texts[2] = this.D("MPResizingContainerTextContainer", "MPResizingContainerText"))
								.html("&#x2197;")
							)
						)
						.append(
							(this.resizing_controls[3] = this.D("MPResizingContainerLeft", "MPResizingContainerControl"))
							.on("mousedown." + this.namespace, {media_player: this, sides: [null,3]}, this.on_resizer_mousedown)
							.append(
								this.D("MPResizingContainerTextContainerOuter")
								.append(
									(this.resizing_texts[3] = this.D("MPResizingContainerTextContainerInner", "MPResizingContainerTextContainer", "MPResizingContainerText"))
									.html("&#x2190;")
								)
							)
						)
						.append(
							(this.resizing_controls[4] = this.D("MPResizingContainerRight", "MPResizingContainerControl"))
							.on("mousedown." + this.namespace, {media_player: this, sides: [null,1]}, this.on_resizer_mousedown)
							.append(
								this.D("MPResizingContainerTextContainerOuter")
								.append(
									(this.resizing_texts[4] = this.D("MPResizingContainerTextContainerInner", "MPResizingContainerTextContainer", "MPResizingContainerText"))
									.html("&#x2192;")
								)
							)
						)
						.append(
							(this.resizing_controls[5] = this.D("MPResizingContainerBottomLeft", "MPResizingContainerControl"))
							.on("mousedown." + this.namespace, {media_player: this, sides: [2,3]}, this.on_resizer_mousedown)
							.append(
								(this.resizing_texts[5] = this.D("MPResizingContainerTextContainer", "MPResizingContainerText"))
								.html("&#x2199;")
							)
						)
						.append(
							(this.resizing_controls[6] = this.D("MPResizingContainerBottom", "MPResizingContainerControl"))
							.on("mousedown." + this.namespace, {media_player: this, sides: [2,null]}, this.on_resizer_mousedown)
							.append(
								(this.resizing_texts[6] = this.D("MPResizingContainerTextContainer", "MPResizingContainerText"))
								.html("&#x2193;")
							)
						)
						.append(
							(this.resizing_controls[7] = this.D("MPResizingContainerBottomRight", "MPResizingContainerControl"))
							.on("mousedown." + this.namespace, {media_player: this, sides: [2,1]}, this.on_resizer_mousedown)
							.append(
								(this.resizing_texts[7] = this.D("MPResizingContainerTextContainer", "MPResizingContainerText"))
								.html("&#x2198;")
							)
						)
					)
				) //}
				.append( //{ Title bar
					this.D("MPTitleBarContainer")
					.on("mousedown." + this.namespace, {media_player: this}, this.on_titlebar_mousedown)
					.append(
						this.D("MPTitleContainer")
						.append(
							(this.title = this.D("MPTitle"))
							.html(this.title_default)
						)
					)
					.append(
						this.D("MPMainButtonsLeft")
						.append(
							(this.title_buttons[0] = this.E("a", "MPMainButtonLeft"))
							.html("[S]")
						)
						.append(
							(this.title_buttons[1] = this.E("a", "MPMainButtonGeneric"))
							.html("[D]")
						)
					)
					.append(
						this.D("MPMainButtonsRight")
						.append(
							this.D("MPMainButtonAboutTheatre", "MPTheatreOnly")
							.html("Exit Theatre Mode &rarr;")
						)
						.append(
							(this.title_buttons[2] = this.E("a", "MPMainButtonGeneric"))
							.html("[T]")
						)
						.append(
							(this.title_buttons[3] = this.E("a", "MPMainButtonGeneric"))
							.html("[&#x2012;]")
						)
						.append(
							(this.title_buttons[4] = this.E("a", "MPMainButtonRight"))
							.html("[&times;]")
						)
					)
				) //}
				.append( //{ Content
					(this.content_container = this.D("MPContentContainer"))
					.append( //{ Top
						(this.top_container = this.D("MPTopContainer"))
						.append(
							this.D("MPImageContainerMain")
							.append( //{ Image
								(this.image_container = this.D("MPImageContainer"))
								.height(this.image_height_max * this.scale_factor)
								.append(
									(this.no_image = this.D("MPNoImage"))
									.append(
										this.D("MPNoImageText")
										.html("[no media]")
									)
								)
								.append(
									(this.image = this.E("img", "MPImage"))
									.attr("title", "")
									.attr("alt", "")
									.css("display", "none")
									.on("load." + this.namespace, {media_player: this}, this.on_image_load)
									.on("mousedown", this.cancel_event)
								)
							) //}
							.append( //{ Video
								(this.video_container = this.D("MPVideoContainer"))
							)
							.append(
								(this.video_mask = this.E("a", "MPVideoContainerMask"))
								.attr("target", "_blank")
								.on("mousedown", {media_player: this}, this.on_image_resize_mousedown)
								.on("click", {media_player: this}, this.on_image_resize_click)
							) //}
							.append( //{ Playback controls
								this.D("MPControlContainer")
								.append(
									(this.playback_control_container = this.D("MPControlContainerInner"))
								)
							) //}
							.append( //{ Seek indicator
								(this.playback_seek_indicator_container = this.D("MPSeekIndicatorContainer", "MPSeekIndicatorContainerDisabled"))
								.append(
									(this.playback_seek_indicator = this.D("MPSeekIndicator"))
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
						.append( //{ Playlist index/etc
							(this.loaded_status_container = this.D("MPLoadedStatusContainer"))
							.on("mousedown", this.cancel_event)
							.append( //{ Playlist index
								(this.playlist_index_container = this.D("MPPlaylistLoadingContainer"))
								.append(
									this.D("MPPlaylistLoadingContainerInner")
									.append(
										this.D("MPPlaylistLoadingText1")
										.html("Loading:")
									)
									.append(
										(this.loaded_status_count = this.D("MPPlaylistLoadingText2"))
										.html("5")
									)
								)
							) //}
							.append( //{ Playlist index
								(this.playlist_index_container = this.D("MPPlaylistIndexContainer"))
								.append(
									this.D("MPPlaylistIndexContainerInner")
									.append(
										(this.playlist_index_text1 = this.D("MPPlaylistIndexText1"))
										.html("-")
									)
									.append(
										this.D("MPPlaylistIndexText2")
										.html("/")
									)
									.append(
										(this.playlist_index_text2 = this.D("MPPlaylistIndexText3"))
										.html("-")
									)
								)
							) //}
						) //}
						.append( //{ Volume
							(this.volume_container = this.D("MPVolumeContainer"))
							.append(
								(this.volume_bar_container = this.D("MPVolumeBarContainer"))
								.on("mousedown." + this.namespace, {media_player: this}, this.on_volumebar_mousedown)
								.append(
									(this.volume_bar = this.D("MPVolumeBar"))
								)
							)
							.append(
								this.D("MPVolumeLabelContainer")
								.append(
									(this.D("MPVolumeLabel").html("Vol"))
								)
								.append(
									(this.volume_label = this.D("MPVolumeValue").html("100%"))
								)
							)
						) //}
					) //}
					.append( //{ Loaded
						this.D("MPSeekContainerTop")
						.append(
							(this.load_percent_bar_container = this.D("MPLoadPercentBarContainer"))
							.on("mousedown." + this.namespace, this.cancel_event)
							.append(
								(this.load_percent_bar_mover = this.D("MPLoadPercentBarMover"))
								.on("mousedown." + this.namespace, this.cancel_event)
							)
							.append(
								(this.load_percent_bar = this.D("MPLoadPercentBar"))
								.on("mousedown." + this.namespace, this.cancel_event)
							)
						)
					) //}
					.append( //{ Seek bar
						this.D("MPSeekContainer")
						.append(
							this.D("MPSeekTimeContainer")
							.append(
								(this.seek_time_start_label = this.D("MPSeekTimeLeft"))
								.html("0:00")
							)
							.append(
								(this.seek_time_end_label = this.D("MPSeekTimeRight"))
								.html("0:00")
							)
							.append(
								(this.seek_time_current_label = this.D("MPSeekTime"))
								.html("0:00")
							)
						)
						.append(
							(this.seek_bar_container = this.D("MPSeekBarContainer"))
							.on("mousedown." + this.namespace, {media_player: this}, this.on_seekbar_container_mousedown)
							.append(
								(this.seek_bar_mover = this.D("MPSeekBarMover"))
							)
							.append(
								(this.seek_bar = this.D("MPSeekBar"))
								.on("mousedown." + this.namespace, {media_player: this}, this.on_seekbar_mousedown)
							)
						)
						.on("mouseover." + this.namespace, {media_player: this}, this.on_seekbar_mouseover)
						.on("mouseout." + this.namespace, {media_player: this}, this.on_seekbar_mouseout)
						.on("mousemove." + this.namespace, {media_player: this}, this.on_seekbar_mousemove)
					) //}
					.append( //{ Resize
						this.D("MPSeekContainerBottom")
					) //}
					.append( //{ Playlist
						(this.playlist_container = this.D("MPPlaylistContainer"))
						.height(this.playlist_height * this.scale_factor)
						.on("mousedown", this.cancel_event)
					) //}

					.append( //{ Help 0
						(this.help_container[0] = this.D("MPHelpContainer"))
						.css("display", "none")
						.append(
							this.D("MPHelpContainerInner0")
							.append(
								(this.help_container_inner1[0] = this.D("MPHelpContainerInner1"))
								.append( //{ Playlist Settings
									this.D("MPHelpLabelDiv")
									.html("Playlist Settings")
								)
								.append(
									this.D("MPHelpSectionDiv")
									.append(
										this.D("MPHelpColorInputDiv0")
										.append(
											this.D("MPHelpColorInputDiv2b")
											.append(
												this.D("MPHelpColorLabelText")
												.html("Mode")
											)
										)
									)
									.append(
										this.D("MPHelpColorInputDiv1Full")
										.append(
											this.D("MPHelpColorInputDiv2")
											.append(
												this.E("a", "MPHelpModeLink")
												.html(this.playlist_randomize ? "Randomize" : (this.playlist_loop ? "Loop" : "Play Once"))
												.on("click." + this.namespace, {media_player: this}, this.on_playlist_mode_change)
												.on("mousedown", this.cancel_event)
											)
										)
									)
								)
								.append(
									this.D("MPHelpSectionDiv")
									.append(
										this.D("MPHelpColorInputDiv0")
										.append(
											this.D("MPHelpColorInputDiv2b")
											.append(
												this.D("MPHelpColorLabelText")
												.html("On Load")
											)
										)
									)
									.append(
										this.D("MPHelpColorInputDiv1Full")
										.append(
											this.D("MPHelpColorInputDiv2")
											.append(
												this.E("a", "MPHelpModeLink")
												.html(this.playlist_play_on_load_settings[this.playlist_play_on_load])
												.on("click." + this.namespace, {media_player: this}, this.on_playlist_onload_change)
												.on("mousedown", this.cancel_event)
											)
										)
									)
								)
								.append(
									this.D("MPHelpSectionDiv")
									.append(
										this.D("MPHelpColorInputDiv0")
										.append(
											this.D("MPHelpColorInputDiv2b")
											.append(
												this.D("MPHelpColorLabelText")
											)
										)
									)
									.append(
										this.D("MPHelpColorInputDiv1Full")
										.append(
											this.D("MPHelpColorInputDiv2")
											.append(
												this.E("a", "MPHelpModeLink")
												.html(this.playlist_scrollto_onload ? "Scroll to in playlist" : "Don't scroll playlist")
												.on("click." + this.namespace, {media_player: this}, this.on_playlist_scrollto_change)
												.on("mousedown", this.cancel_event)
											)
										)
									)
								)
								.append(
									this.D("MPHelpSectionDiv")
									.append(
										this.D("MPHelpColorInputDiv0")
										.append(
											this.D("MPHelpColorInputDiv2b")
											.append(
												this.D("MPHelpColorLabelText")
												.html("YT Quality")
											)
										)
									)
									.append(
										this.D("MPHelpColorInputDiv1Full")
										.append(
											this.D("MPHelpColorInputDiv2")
											.append(
												this.E("a", "MPHelpModeLink")
												.html(this.ytvideo_qualities[this.ytvideo_quality_index])
												.on("click." + this.namespace, {media_player: this}, this.on_ytquality_change)
												.on("mousedown", this.cancel_event)
											)
										)
									)
								) //}
								.append( //{ Player Settings
									this.D("MPHelpLabelDiv")
									.html("Player Settings")
								)
								.append(
									(help_custom_div = this.D("MPHelpSectionDiv"))
									.append(
										this.D("MPHelpColorInputDiv0")
										.append(
											this.D("MPHelpColorInputDiv2b")
											.append(
												this.D("MPHelpColorLabelText")
												.html("Theme")
											)
										)
									)
									.append(
										this.D("MPHelpColorInputDiv1Full")
										.append(
											this.D("MPHelpColorInputDiv2")
											.append(
												(this.player_theme_name = this.E("a", "MPHelpModeLink"))
												.on("click." + this.namespace, {media_player: this}, this.on_player_theme_change)
												.on("mousedown", this.cancel_event)
											)
										)
									)
									.append(
										this.D("MPHelpColorInputDiv0")
										.append(
											this.D("MPHelpColorInputDiv2b")
											.append(
												this.D("MPHelpColorLabelText")
												.html("Player Graphics")
											)
										)
									)
									.append(
										this.D("MPHelpColorInputDiv1Full")
										.append(
											this.D("MPHelpColorInputDiv2")
											.append(
												this.E("a", "MPHelpModeLink")
												.on("click." + this.namespace, {media_player: this}, this.on_player_use_svg_update)
												.on("mousedown", this.cancel_event)
												.html(this.use_svg ? "Allowed" : "Disallowed")
											)
										)
									)
								) //}
								.append( //{ Scaling Settings
									this.D("MPHelpLabelDiv")
									.html("Animation")
								)
								.append(this.generate_value_editor("Opening", "@animate_open_time", this.animate_open_time, false, [0, null]))
								.append(this.generate_value_editor("Closing", "@animate_close_time", this.animate_close_time, false, [0, null]))
								//}
								.append( //{ Scaling Settings
									this.D("MPHelpLabelDiv")
									.html("Theatre Mode")
								)
								.append(this.generate_value_editor("Animation Time", "@theatre_mode_animate_time", this.theatre_mode_animate_time, false, [0, null]))
								.append(this.generate_value_editor("Side Offset", "@theatre_offset", this.theatre_offset, false, [0, null]))
								.append(this.generate_value_editor("Dim Factor", "@theatre_dim", this.theatre_dim, false, [ 0.0 , 1.0 ]))
								.append(this.generate_value_editor("Dim Color", "@theatre_dim_color", this.theatre_dim_color, true))
								//}
								.append( //{ Scaling Settings
									this.D("MPHelpLabelDiv")
									.html("Scaling Settings")
								)
								.append(this.generate_value_editor("Padding", "padding_scale", this.css.css_size_presets[this.css.preset].padding_scale, false))
								.append(this.generate_value_editor("Text", "font_scale", this.css.css_size_presets[this.css.preset].font_scale, false))
								.append(this.generate_value_editor("Borders", "border_scale", this.css.css_size_presets[this.css.preset].border_scale, false))
								.append(this.generate_value_editor("Window", "@scale_factor", this.scale_factor, false, [ 0.25 , 4.0 ]))
								//}
							)
							.append( //{ More
								(this.help_container_footer[0] = this.D("MPHelpLinkDiv"))
								.append(
									this.D("MPHelpLabelDiv")
									.html("More Settings")
								)
								.append(
									this.D("MPHelpSectionDiv")
									.append(
										this.E("A", "MPHelpTextLink")
										.html("Color Settings")
										.on("click." + this.namespace, {media_player: this, help_page: 1}, this.on_helppage_goto)
									)
									.append(
										this.E("A", "MPHelpTextLink")
										.html("Other Settings")
										.on("click." + this.namespace, {media_player: this, help_page: 2}, this.on_helppage_goto)
									)
								)
							) //}
						)
					) //}
					.append( //{ Help 1
						(this.help_container[1] = this.D("MPHelpContainer"))
						.css("display", "none")
						.append(
							this.D("MPHelpContainerInner0")
							.append(
								(this.help_container_inner1[1] = this.D("MPHelpContainerInner1"))
								.append(this.D("MPHelpLabelDiv").html("Background Colors"))
								.append(this.generate_color_editor("Outline", "bg_outer_color", this.css.css_color_presets[this.css.preset].bg_outer_color))
								.append(this.generate_color_editor("Lightest", "bg_color_lightest", this.css.css_color_presets[this.css.preset].bg_color_lightest))
								.append(this.generate_color_editor("Light", "bg_color_light", this.css.css_color_presets[this.css.preset].bg_color_light))
								.append(this.generate_color_editor("Medium", "bg_color_dark", this.css.css_color_presets[this.css.preset].bg_color_dark))
								.append(this.generate_color_editor("Dark", "bg_color_darker", this.css.css_color_presets[this.css.preset].bg_color_darker))
								.append(this.generate_color_editor("Darkest", "bg_color_darkest", this.css.css_color_presets[this.css.preset].bg_color_darkest))
								.append(this.D("MPHelpLabelDiv").html("Text Colors"))
								.append(this.generate_color_editor("Default", "color_standard", this.css.css_color_presets[this.css.preset].color_standard))
								.append(this.generate_color_editor("Disabled", "color_disabled", this.css.css_color_presets[this.css.preset].color_disabled))
								.append(this.generate_color_editor("Light", "color_light", this.css.css_color_presets[this.css.preset].color_light))
								.append(this.generate_color_editor("Special 1", "color_special_1", this.css.css_color_presets[this.css.preset].color_special_1))
								.append(this.generate_color_editor("Special 2", "color_special_2", this.css.css_color_presets[this.css.preset].color_special_2))
								.append(this.generate_color_editor("Highlight", "color_highlight_light", this.css.css_color_presets[this.css.preset].color_highlight_light))
								.append(this.D("MPHelpLabelDiv").html("Other Colors"))
								.append(this.generate_color_editor("Volume", "volume_colors[0]", this.css.css_color_presets[this.css.preset].volume_colors[0]))
							)
						)
					) //}
					.append( //{ Help 2
						(this.help_container[2] = this.D("MPHelpContainer"))
						.css("display", "none")
						.append(
							this.D("MPHelpContainerInner0")
							.append(
								(this.help_container_inner1[2] = this.D("MPHelpContainerInner1"))
								.append(this.D("MPHelpLabelDiv").html("Borders"))
								.append(this.generate_value_editor("Outer", "bg_outer_size", this.css.css_size_presets[this.css.preset].bg_outer_size, false))
								.append(this.D("MPHelpLabelDiv").html("Border Radii"))
								.append(this.generate_value_editor("Outer", "bg_outer_border_radius", this.css.css_size_presets[this.css.preset].bg_outer_border_radius, false))
								.append(this.generate_value_editor("Inner", "bg_inner_border_radius", this.css.css_size_presets[this.css.preset].bg_inner_border_radius, false))
								.append(this.generate_value_editor("Major", "border_radius_normal", this.css.css_size_presets[this.css.preset].border_radius_normal, false))
								.append(this.generate_value_editor("Minor", "border_radius_small", this.css.css_size_presets[this.css.preset].border_radius_small, false))
								.append(this.D("MPHelpLabelDiv").html("Fonts"))
								.append(this.generate_value_editor("Font", "main_font", this.css.css_size_presets[this.css.preset].main_font, true))
								.append(this.generate_value_editor("Controls", "controls_font", this.css.css_size_presets[this.css.preset].controls_font, true))
								.append(this.D("MPHelpLabelDiv").html("Font Sizes"))
								.append(this.generate_value_editor("Default", "font_size", this.css.css_size_presets[this.css.preset].font_size, false))
								.append(this.generate_value_editor("Small", "font_size_small", this.css.css_size_presets[this.css.preset].font_size_small, false))
								.append(this.generate_value_editor("Controls", "font_size_controls", this.css.css_size_presets[this.css.preset].font_size_controls, false))
							)
						)
					) //}

					.append( //{ Downloads
						(this.downloads_container = this.D("MPDownloadsContainer"))
						.css("display", "none")
						.append(
							this.D("MPDownloadsLabel")
							.html("Download Content")
						)
						.append(
							this.D("MPDownloadsContent")
							.append(
								this.D()
								.append(
									this.D()
									.html("Generate download link for:")
								)
								.append(
									this.D()
									.append("- ")
									.append(
										this.E("a", "MPDownloadsLink")
										.attr("href", "#")
										.html("All loaded sounds")
										.on("click." + this.namespace, {media_player: this, type: "sounds"}, this.on_downloads_generate_click)
									)
								)
								.append(
									this.D()
									.append("- ")
									.append(
										this.E("a", "MPDownloadsLink")
										.attr("href", "#")
										.html("All loaded images")
										.on("click." + this.namespace, {media_player: this, type: "images2"}, this.on_downloads_generate_click)
									)
									.append(" (using original filenames)")
								)
								.append(
									this.D()
									.append("- ")
									.append(
										this.E("a", "MPDownloadsLink")
										.attr("href", "#")
										.html("All loaded images")
										.on("click." + this.namespace, {media_player: this, type: "images"}, this.on_downloads_generate_click)
									)
									.append(" (using server filenames)")
								)
							)
							.append(
								(this.downloads_ready_container = this.D("MPDownloadsContentReady"))
								.css("display", "none")
								.append("Click ")
								.append(
									(this.downloads_link = this.E("a", "MPDownloadsLink"))
									.attr("href", "#")
									.html("here")
									.on("click." + this.namespace, {media_player: this}, this.on_downloads_link_click)
								)
								.append(
									(this.downloads_about = this.E("span"))
								)
							)
						)
					) //}
				) //}
				.append( //{ Footer
					(this.footer_container = this.D("MPFooterBarContainer"))
				) //}
				.append( //{ Alert page
					(this.alert_container = this.D("MPAlertContainer"))
					.css("display", "none")
					.append(
						(this.D("MPAlertContentContainer")
						.html("Drop Files<br />Here"))
					)
					.on("click", {}, function (event) {
						$(this).css("display", "none");
					})
				) //}
			)
		); //}

		// Playback controls
		this.create_playback_controls();

		// Custom settings
		if (this.additional_options.length > 0) {
			var section_label_references = [ help_custom_div , help_custom_div ];
			var section_default = "Other Settings";
			var sections = {};
			var default_set = false;

			// Loop over all options
			for (var i = 0; i < this.additional_options.length; ++i) {
				// Section label
				var s = ("section" in this.additional_options[i] ? this.additional_options[i]["section"] : section_default);
				var reference;
				if (!(s in sections)) {
					// Create a new label (ensure the default is always last)
					section_label_references[(s == section_default ? 0 : 1)].after(
						(reference = this.D("MPHelpLabelDiv"))
						.html(s)
					);
					reference.after(
						(sections[s] = this.D())
					);
					if (s == section_default) {
						default_set = true;
						section_label_references[0] = sections[s];
					}
					else {
						section_label_references[1] = sections[s];
						if (!default_set) section_label_references[0] = sections[s];
					}
				}
				reference = sections[s];

				// Value enumeration: find the current value/label
				var v_id = 0;
				if ("values" in this.additional_options[i] && "current" in this.additional_options[i]) {
					for (var j = 0; j < this.additional_options[i]["values"].length; ++j) {
						if (this.additional_options[i]["current"] == this.additional_options[i]["values"][j]) {
							v_id = j;
							break;
						}
					}
				}
				var content = null;
				if ("descr" in this.additional_options[i]) {
					(content = this.E("a", "MPHelpModeLink"))
					.html(this.additional_options[i]["descr"][v_id])
					.on("click." + this.namespace, {media_player: this, custom_data: this.additional_options[i]}, this.on_custom_option_click)
					.on("mousedown", this.cancel_event);
				}
				// Custom HTML
				else if ("html" in this.additional_options[i]) {
					content = this.D("MPHelpModeNonLink").html(this.additional_options[i]["html"]);
				}
				// Setup DOM
				reference.append(
					(sections[s] = this.D("MPHelpSectionDiv"))
					.append(
						this.D("MPHelpColorInputDiv0")
						.append(
							this.D("MPHelpColorInputDiv2b")
							.append(
								this.D("MPHelpColorLabelText")
								.html(this.additional_options[i]["label"])
							)
						)
					)
					.append(
						this.D("MPHelpColorInputDiv1Full")
						.append(
							this.D("MPHelpColorInputDiv2")
							.append(content)
						)
					)
				);
			}
		}

		// Final settings
		for (var i = 0; i < this.title_buttons.length; ++i) {
			this.title_buttons[i].on("mousedown", this.cancel_event);
			this.title_buttons[i].on("click." + this.namespace, {media_player: this, control_id: i}, this.on_main_control_click);
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

		// Animation
		if (this.animate_open_time > 0) {
			this.mp_container_main
			.stop(true)
			.animate({
				"opacity": 1.0
			},{
				duration: this.animate_open_time * 1000,
				complete: function () { $(this).css("opacity", ""); }
			});
		}
		else {
			this.mp_container_main.css("opacity", "");
		}
	},
	destroy: function (full) {
		if (this.animate_close_time > 0) {
			var self = this;
			this.mp_container_main
			.stop(true)
			.animate({
				"opacity": 0.0
			},{
				duration: this.animate_close_time * 1000,
				complete: function () {
					self.mp_container_main.css("opacity", "");
					self.full_destroy(full);
				}
			});

			this.theatre_exit({duration: this.animate_close_time});
		}
		else {
			this.mp_container_main.css("opacity", "");
			this.full_destroy(full);
		}
	},

	focus: function () {
		// Min/max
		var open = false;
		this.playlist_container.css("display", (open ? "none" : ""));
		this.top_container.css("display", (open ? "none" : ""));

		// Close overlays
		this.downloads_container.css("display", "none");
		for (var i = 0; i < this.help_container.length; ++i) {
			this.help_container[i].css("display", "none");
		}

		// On screen
		this.reposition();
	},

	play: function () {
		if (this.current_media !== null) {
			this.playback_interference_callback(1);

			if (this.current_media.type == "image-audio") {
				this.audio[0].play();
			}
			else if (this.current_media.type == "ve") {
				this.current_media.vplayer.play();
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
			else if (this.current_media.type == "vimeo-video") {
				if (this.vimeovideo_player != null) {
					this.vimeovideo_player_paused = false;
					if (this.vimeovideo_unsafe) {
						_unsafe_exec(function (data) {
							data.media_player.vimeovideo_player.api_call("play");
						}, {media_player: this});
					}
					else {
						try {
							this.vimeovideo_player.api_call("play");
						}
						catch (e) {}
					}
				}
			}
			else if (this.current_media.type == "soundcloud-sound") {
				if (this.soundcloud_player != null) {
					this.soundcloud_player_paused = false;
					if (this.soundcloud_unsafe) {
						_unsafe_exec(function (data) {
							data.media_player.soundcloud_player.api_call("play");
						}, {media_player: this});
					}
					else {
						try {
							this.soundcloud_player.api_call("play");
						}
						catch (e) {}
					}
				}
			}
			else {
				console.log(this.current_media.type);
			}
		}
		this.update_playing_status();
	},
	pause: function () {
		if (this.current_media !== null) {
			this.playback_interference_callback(1);

			if (this.current_media.type == "image-audio") {
				this.audio[0].pause();
			}
			else if (this.current_media.type == "ve") {
				this.current_media.vplayer.pause();
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
			else if (this.current_media.type == "vimeo-video") {
				if (this.vimeovideo_player != null) {
					this.vimeovideo_player_paused = true;
					if (this.vimeovideo_unsafe) {
						_unsafe_exec(function (data) {
							data.media_player.vimeovideo_player.api_call("pause");
						}, {media_player: this});
					}
					else {
						try {
							this.vimeovideo_player.api_call("pause");
						}
						catch (e) {}
					}
				}
			}
			else if (this.current_media.type == "soundcloud-sound") {
				if (this.soundcloud_player != null) {
					this.soundcloud_player_paused = true;
					if (this.soundcloud_unsafe) {
						_unsafe_exec(function (data) {
							data.media_player.soundcloud_player.api_call("pause");
						}, {media_player: this});
					}
					else {
						try {
							this.soundcloud_player.api_call("pause");
						}
						catch (e) {}
					}
				}
			}
			else {
				console.log(this.current_media.type);
			}
		}
		this.update_playing_status();
	},
	is_paused: function () {
		if (this.current_media !== null) {
			if (this.current_media.type == "image-audio") {
				return this.audio[0].paused;
			}
			else if (this.current_media.type == "ve") {
				return this.current_media.vplayer.is_paused();
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
			else if (this.current_media.type == "vimeo-video") {
				if (this.vimeovideo_player != null) {
					// Query
					if (this.vimeovideo_unsafe) {
						_unsafe_exec(function (data) {
							data.media_player.vimeovideo_player.api_call("paused", function (value) {
								data.media_player.vimeovideo_player_paused = value;
							});
						}, {media_player: this});
					}
					else {
						var self = this;
						try {
							this.vimeovideo_player.api_call("paused", function (value) {
								self.vimeovideo_player_paused = value;
							});
						}
						catch (e) {}
					}
					// Return
					return this.vimeovideo_player_paused;
				}
			}
			else if (this.current_media.type == "soundcloud-sound") {
				if (this.soundcloud_player != null) {
					// TODO
					return this.soundcloud_player_paused;
				}
			}
			else {
				console.log(this.current_media.type);
			}
		}
		return true;
	},
	get_position: function (seconds) {
		if (this.current_media !== null) {
			return this.current_media.position;
		}
		return 0.0;
	},
	seek_to: function (seconds, dont_seek_in_media, dragging) {
		if (this.current_media !== null) {
			// HTML/adjustments
			if (seconds !== null) {
				if (seconds < 0.0) seconds = 0.0;
				else if (seconds > this.current_media.duration) seconds = this.current_media.duration;
				this.current_media.position = seconds;
			}
			if (this.current_media.duration != 0.0) {
				this.seek_time_current_label.html(this.duration_to_string(this.current_media.position));
				this.seek_bar_mover.width((this.current_media.position / this.current_media.duration) * (this.seek_bar_container.outerWidth() - this.seek_bar.outerWidth()));
			}

			if (!dont_seek_in_media) {
				this.playback_interference_callback(2);

				if (this.current_media.type == "image-audio") {
					if (seconds !== null) {
						if (seconds < 0.0) seconds = 0.0;
						else if (seconds > this.current_media.duration) seconds = this.current_media.duration;
						this.current_media.position = seconds;
					}

					this.audio[0].currentTime = this.current_media.position;
				}
				else if (this.current_media.type == "ve") {
					if (seconds !== null) {
						if (seconds < 0.0) seconds = 0.0;
						else if (seconds > this.current_media.duration) seconds = this.current_media.duration;
						this.current_media.position = seconds;
					}

					this.current_media.vplayer.seek(this.current_media.position);
				}
				else if (this.current_media.type == "youtube-video") {
					if (this.ytvideo_player != null) {
						if (this.ytvideo_unsafe) {
							_unsafe_exec(function (data) {
								if (data.media_player.ytvideo_player.seekTo) data.media_player.ytvideo_player.seekTo(data.media_player.current_media.position, data.arg2);
							}, {media_player: this, arg2: (dragging ? false : true)});
						}
						else {
							if (this.ytvideo_player.seekTo) this.ytvideo_player.seekTo(this.current_media.position, dragging ? false : true);
						}
					}
				}
				else if (this.current_media.type == "vimeo-video") {
					if (this.vimeovideo_player != null) {
						if (this.vimeovideo_unsafe) {
							_unsafe_exec(function (data) {
								data.media_player.vimeovideo_player.api_call("seekTo", data.media_player.current_media.position);
							}, {media_player: this});
						}
						else {
							try {
								this.vimeovideo_player.api_call("seekTo", this.current_media.position);
							}
							catch (e) {}
						}
					}
				}
				else if (this.current_media.type == "soundcloud-sound") {
					if (this.soundcloud_player != null) {
						this.soundcloud_player_paused = true;
						if (this.soundcloud_unsafe) {
							_unsafe_exec(function (data) {
								data.media_player.soundcloud_player.api_call("seekTo", data.media_player.current_media.position * 1000);
							}, {media_player: this});
						}
						else {
							try {
								this.soundcloud_player.api_call("seekTo", this.current_media.position * 1000);
							}
							catch (e) {}
						}
					}
				}
				else {
					console.log(this.current_media.type);
				}
			}
		}
	},
	get_volume: function () {
		// Value
		return this.volume;
	},
	set_volume: function (volume) {
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
			else if (this.current_media.type == "ve") {
				// Set volume
				this.current_media.vplayer.set_volume(this.volume);
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
			else if (this.current_media.type == "vimeo-video") {
				// Set volume
				if (this.vimeovideo_player != null) {
					if (this.vimeovideo_unsafe) {
						_unsafe_exec(function (data) {
							data.media_player.vimeovideo_player.api_call("setVolume", data.media_player.volume);
						}, {media_player: this});
					}
					else {
						try {
							this.vimeovideo_player.api_call("setVolume", this.volume);
						}
						catch (e) {}
					}
				}
			}
			else if (this.current_media.type == "soundcloud-sound") {
				if (this.soundcloud_player != null) {
					this.soundcloud_player_paused = true;
					if (this.soundcloud_unsafe) {
						_unsafe_exec(function (data) {
							data.media_player.soundcloud_player.api_call("setVolume", data.media_player.volume * 100);
						}, {media_player: this});
					}
					else {
						try {
							this.soundcloud_player.api_call("setVolume", this.volume * 100);
						}
						catch (e) {}
					}
				}
			}
			else {
				console.log(this.current_media.type);
			}
		}
	},
	get_duration: function (duration) {
		if (this.current_media !== null) {
			// Update duration
			return this.current_media.duration;
		}
		return 0.0;
	},
	set_duration: function (duration) {
		var length_str = this.duration_to_string(duration);
		if (this.current_media !== null) {
			// Update duration
			this.current_media.duration = duration;
			this.current_media.info_container.html(length_str);
		}

		// html
		this.seek_time_end_label.html(length_str);
	},
	deselect: function (old_type) {
		if (this.current_media !== null) {
			this.playback_interference_callback(4);

			this.unC(this.current_media.playlist_item, "MPPlaylistItemActive");

			// Image target
			this.video_mask.removeAttr("href");

			if (this.current_media.type == "youtube-video") {
				// Timer
				if (this.current_media.progress_timer !== null) {
					clearInterval(this.current_media.progress_timer);
					this.current_media.progress_timer = null;
				}
			}
			else if (this.current_media.type == "ve") {
				this.current_media.vplayer.remove_html().clear_listeners();
				this.current_media.html_container = null;
				this.video_container.html("");
			}

			if (this.current_media.type !== old_type) {
				// Stop
				this.stop();

				this.title.html(this.title_default);

				if (this.current_media.type == "image-audio") {
					this.image.css("display", "none");
					this.image.removeAttr("src");
					this.no_image.css("display", "");
					this.current_media.image_size = [0,0];
				}
				else if (this.current_media.type == "youtube-video") {
					this.ytvideo_player = null;
					this.video_container.html("");
				}
				else if (this.current_media.type == "vimeo-video") {
					this.vimeovideo_player.destructor();
					this.vimeovideo_player = null;
					this.vimeovideo_player_paused = true;
					this.video_container.html("");
				}
				else if (this.current_media.type == "soundcloud-sound") {
					this.soundcloud_player.destructor();
					this.soundcloud_player = null;
					this.soundcloud_player_paused = true;
					this.video_container.html("");
				}
				else if (this.current_media.type == "ve") {
					// Taken care of elsewhere
				}
				else {
					console.log(this.current_media.type);
				}

				// Global
				for (var i = 0; i < this.playback_controls.length; ++i) {
					for (var j = 0; j < this.playback_controls[i].length; ++j) {
						this.C(this.playback_controls[i][j], "MPControlLinkDisabled");
					}
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
	},
	stop: function () {
		if (this.current_media !== null) {
			if (!this.is_paused()) this.pause();
			this.seek_to(0.0);

			this.update_playing_status();
		}
	},
	start: function (index) {
		// Stop old sound
		this.deselect(this.playlist[index].type);

		// Controls
		for (var i = 0; i < this.playback_controls.length; ++i) {
			for (var j = 0; j < this.playback_controls[i].length; ++j) {
				this.unC(this.playback_controls[i][j], "MPControlLinkDisabled");
			}
		}

		// Select
		this.current_media = this.playlist[index];

		this.C(this.current_media.playlist_item, "MPPlaylistItemActive");
		this.seek_time_current_label.html(this.duration_to_string(this.current_media.position));
		this.seek_time_end_label.html(this.duration_to_string(this.current_media.duration));

		// Scroll to
		this.scroll_to(index);
		// Title, etc.
		this.title.html(this.current_media.title);
		this.current_media.loaded_offset = 0.0;
		this.current_media.loaded_percent = 0.0;
		// Image target
		this.video_mask.attr("href", this.current_media.mask_click_target);

		if (this.current_media.type == "image-audio") {
			// Play this sound
			this.audio.attr("src", this.current_media.audio_blob_url);
			this.audio[0].play();

			// Image
			this.no_image.css("display", "none");
			this.image.css("display", "none");
			this.image.removeAttr("src");
			this.image.attr("src", this.current_media.image_url);

			this.current_media.loaded_percent = 1.0;
		}
		else if (this.current_media.type == "ve") {
			var self = this;
			var playlist_item = this.current_media;

			// Clear temp
			if (this.current_media.temp_container != null) {
				this.current_media.vplayer.remove_html().clear_listeners();
				this.current_media.temp_container.remove();
				this.current_media.temp_container = null;
			}

			// Embed the player
			this.video_container.html("");
			this.current_media.vplayer.set_volume(this.volume);
			this.current_media.vplayer
			.on("load", function () { self.on_ve_load(playlist_item); })
			.on("error", function () { self.on_ve_error(playlist_item); })
			.on("play", function () { self.on_ve_play(playlist_item); })
			.on("pause", function () { self.on_ve_pause(playlist_item); })
			.on("end", function () { self.on_ve_end(playlist_item); })
			.on("timeupdate", function (data) { self.on_ve_timeupdate(playlist_item, data); })
			.create_html(this.video_container[0]);

			this.current_media.loaded_percent = 1.0;
		}
		else if (this.current_media.type == "youtube-video") {
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
						data.media_player.ytvideo_player.mp_iframe = data.media_player.video_container.find("iframe");
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

			// Image target
			this.video_mask.attr("href", this.current_media.image_url);
		}
		else if (this.current_media.type == "vimeo-video") {
			// Old player
			if (this.vimeovideo_player !== null) {
				this.vimeovideo_player.destructor();
				this.vimeovideo_player = null;
			}
			// Fresh player
			if (this.vimeovideo_player == null) {
				this.vimeovideo_player_paused = true;

				// Function
				var fn = function (data) {
					var events = {
						"ready": function() { data.self.set_volume(data.self.get_volume()); },
						"loadProgress": function (event) { data.self.on_vimeovideo_load_progress(event, data.self.vimeovideo_player); },
						"playProgress": function (event) { data.self.on_vimeovideo_play_progress(event, data.self.vimeovideo_player); },
						"play": function (event) { data.self.on_vimeovideo_play({}, data.self.vimeovideo_player); },
						"pause": function (event) { data.self.on_vimeovideo_pause({}, data.self.vimeovideo_player); },
						"finish": function (event) { data.self.on_vimeovideo_finish({}, data.self.vimeovideo_player); },
						"seek": function (event) { data.self.on_vimeovideo_seek(event, data.self.vimeovideo_player); }
					};

					var iframe;
					data.self.video_container.html(
						(iframe = data.self.E("iframe"))
						.attr("frameborder", "0")
						.attr("width", data.size[0])
						.attr("height", data.size[1])
						.attr("src",
							"//player.vimeo.com/video/" + (data.self.current_media.vid_id) + "?api=1" +
							"&title=0&byline=0&portrait=0&autoplay=1" + (data.self.current_media.start == 0 ? "" : "&t=" + data.self.current_media.start)
						)
					);
					data.self.vimeovideo_player = new data.VimeoManager(iframe[0]);

					for (var e in events) {
						data.self.vimeovideo_player.add_event(e, events[e]);
					}
				};

				// Params
				var params = {
					size: [ this.video_container.outerWidth() , this.video_container.outerHeight() ],
					self: this,
					"VimeoManager": VimeoManager
				}

				// 2 types of execution
				if (this.vimeovideo_unsafe) {
					try {
						_unsafe_exec(fn, params);
					}
					catch (e) {
						console.log("vimeovideo_unsafe");
						console.log(e);
					}
				}
				else {
					fn(params);
				}
			}
		}
		else if (this.current_media.type == "soundcloud-sound") {
			this.soundcloud_player_paused = true;

			// Clear old
			if (this.soundcloud_player !== null) {
				this.soundcloud_player.destructor();
				this.soundcloud_player = null;
				//this.video_container.html("");
			}

			// Create new
			if (this.soundcloud_player === null) {
				var fn = function (data) {
					var events = {
						"ready": function () { data.self.on_soundcloud_sound_ready(data.self.soundcloud_player); },
						"loadProgres": function (event) { data.self.on_soundcloud_sound_load_progress(event, data.self.soundcloud_player); },
						"playProgress": function (event) { data.self.on_soundcloud_sound_play_progress(event, data.self.soundcloud_player); },
						"play": function (event) { data.self.on_soundcloud_sound_play(event, data.self.soundcloud_player); },
						"pause": function (event) { data.self.on_soundcloud_sound_pause(event, data.self.soundcloud_player); },
						"finish": function (event) { data.self.on_soundcloud_sound_finish(event, data.self.soundcloud_player); },
						"seek": function (event) { data.self.on_soundcloud_sound_seek(event, data.self.soundcloud_player); }
					};

					data.self.soundcloud_player = new data.SoundcloudManager(data.iframe[0]);

					for (var e in events) {
						data.self.soundcloud_player.add_event(e, events[e]);
					}
				};

				this.video_container.html(this.current_media.embed_code);
				var iframe = this.video_container.find("iframe");
				if (iframe.length > 0) {
					iframe = $(iframe[0]);
					iframe.attr("width", "100%").attr("height", "100%");

					params = {
						self: this,
						iframe: iframe,
						SoundcloudManager: SoundcloudManager
					};

					if (params.SoundcloudManager) {
						// 2 types of execution
						if (this.soundcloud_unsafe) {
							try {
								_unsafe_exec(fn, params);
							}
							catch (e) {
								console.log("soundcloud_unsafe");
								console.log(e);
							}
						}
						else {
							fn(params);
						}
					}
				}
			}
		}
		else {
			console.log(this.current_media.type);
		}

		// Current sound
		this.current_media.position = 0.0;
		this.seek_to(this.current_media.position, true);
		this.set_loaded();

		// Index display
		this.update_index_display(index, this.playlist.length, true);
	},
	scroll_to: function (index) {
		var a, b;
		if (
			(a = this.playlist[index].playlist_item.offset().top) < (b = this.playlist_container.offset().top) ||
			(a = this.playlist[index].playlist_item.offset().top + this.playlist[index].playlist_item.outerHeight()) > (b = this.playlist_container.offset().top + this.playlist_container.outerHeight())
		) {
			this.playlist_container.scrollTop(this.playlist_container.scrollTop() + (a - b));
		}
	},
	next: function (follow_policy) {
		this.playback_interference_callback(8);

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
	},
	previous: function () {
		this.playback_interference_callback(8);

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
	},
	set_loaded: function (offset, percent) {
		if (this.current_media !== null) {
			if (offset !== undefined) {
				if (offset < 0.0) offset = 0.0;
				else if (offset > 1.0) offset = 1.0;
				this.current_media.loaded_offset = offset;
				if (percent === undefined) percent = this.get_loaded_percent();
			}
			else {
				offset = this.get_loaded_offset();
			}
			if (percent !== undefined) {
				if (percent < 0.0) percent = 0.0;
				else if (percent > 1.0 - offset) percent = 1.0 - offset;
				this.current_media.loaded_percent = percent;
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
		this.load_percent_bar_mover.width((offset * 100) + "%");
		this.load_percent_bar.width((percent * 100) + "%");
	},
	get_loaded_offset: function () {
		if (this.current_media !== null) {
			return this.current_media.loaded_offset;
		}
		return 0.0;
	},
	get_loaded_percent: function () {
		if (this.current_media !== null) {
			return this.current_media.loaded_percent;
		}
		return 0.0;
	},
	remove: function (index) {
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
			if (this.playlist[index].image_blob_url != null) {
				(window.webkitURL || window.URL).revokeObjectURL(this.playlist[index].image_blob_url);
			}
		}
		else if (this.playlist[index].type == "ve") {
			// Remove elements
			if (this.playlist[index].temp_container != null) {
				this.playlist[index].temp_container.remove();
			}
			if (this.playlist[index].vplayer != null) {
				this.playlist[index].vplayer.reset();
			}

			// Revoke url
			if (this.playlist[index].image_blob_url != null) {
				(window.webkitURL || window.URL).revokeObjectURL(this.playlist[index].image_blob_url);
			}
		}
		else if (this.playlist[index].type == "youtube-video" || this.playlist[index].type == "vimeo-video" || this.playlist[index].type == "soundcloud-sound") {
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
	},
	playlist_count: function () {
		return this.playlist.length;
	},
	playlist_current: function () {
		if (this.current_media !== null) {
			return this.current_media.index;
		}
		return -1;
	},

	set_async_state: function (enabled, steps, delay) {
		this.videcode_async = enabled;
		this.videcode_steps = steps;
		this.videcode_delay = delay;
	},
	set_load_callbacks: function (load_callbacks) {
		this.load_callbacks = [];
		if (load_callbacks) {
			for (var i = 0; i < load_callbacks.length; ++i) {
				this.load_callbacks.push(load_callbacks[i]);
			}
		}
	},

	is_maximized: function () {
		return (this.playlist_container.css("display") != "none");
	},
	maximize: function () {
		// Min/max
		this.playlist_container.css("display", "");
		this.top_container.css("display", "");

		// Close overlays
		this.downloads_container.css("display", "none");
		for (var i = 0; i < this.help_container.length; ++i) {
			this.help_container[i].css("display", "none");
		}

		// HTML
		this.title_buttons[this.title_buttons.length - 2].html("[&#x2012;]");

		// On screen
		this.reposition();
		this.update_image_scale();
	},
	minimize: function () {
		// Can't be in theatre mode
		if (this.theatre_mode) return;

		// Min/max
		this.playlist_container.css("display", "none");
		this.top_container.css("display", "none");

		// Close overlays
		this.downloads_container.css("display", "none");
		for (var i = 0; i < this.help_container.length; ++i) {
			this.help_container[i].css("display", "none");
		}

		// HTML
		this.title_buttons[this.title_buttons.length - 2].html("[+]");

		// On screen
		this.reposition();
	},

	is_in_theatre: function () {
		return this.theatre_mode;
	},
	theatre_enter: function (params) {
		params = params || {};
		this.theatre_mode_target = true;
		if (!this.theatre_mode) {
			this.theatre_mode = true;

			// Collect vars
			this.theatre_position.right = this.theatre_position.init_right = this.position_offset[0];
			this.theatre_position.bottom = this.theatre_position.init_bottom = this.position_offset[1];

			this.theatre_position.width = this.theatre_position.init_width = this.player_width * this.scale_factor;
			this.theatre_position.image_height = this.image_height * this.scale_factor;
			this.theatre_position.playlist_height = this.playlist_height * this.scale_factor;
			this.theatre_position.playlist_height_target = 0;//this.playlist_height_default * this.scale_factor;
			this.theatre_position.init_image_height = [ this.theatre_position.image_height , this.theatre_position.image_height ];
			this.theatre_position.init_playlist_height = [ this.theatre_position.playlist_height , this.theatre_position.playlist_height ];

			// Maximize
			if (!this.is_maximized()) {
				this.maximize();
				this.theatre_position.init_image_height[0] = 0;
				this.theatre_position.init_playlist_height[0] = 0;
			}
			this.theatre_position.image_height_target_offset = this.mp_container_main.outerHeight() - this.theatre_position.image_height - this.theatre_position.playlist_height;

			// Animate
			var self = this;
			this.theatre_animation_vars.percent = 0.0;
			this.theatre_animation_vars.tick = new Date().getTime();
			this.theatre_animation_vars.total = ("duration" in params ? params.duration : this.theatre_mode_animate_time);
			this.theatre_animation_vars.offset = ("offset" in params ? params.offset : this.theatre_offset);
			this.theatre_animation_vars.dim = ("dim" in params ? params.dim : this.theatre_dim);
			this.theatre_animation_vars.callback_done = ("done" in params ? params.done : null);
			$("body").append(
				(this.theatre_animation_vars.dim_div = this.D("MPTheatreDim"))
				.css({
					"opacity": "0",
					"background-color": ("dim_color" in params ? params.dim_color : this.theatre_dim_color)
				})
			);
			this.theatre_reposition();

			this.theatre_animation_timer = setInterval(function () {
				self.theatre_animate();
			}, 20);

			// Other vars
			this.theatre_vars = {
				close_on_finish: params.close_on_finish || false,
				close_on_finish_interference: params.close_on_finish_interference || false
			};

			// Params
			var about = this.mp_container_main.find(".MPMainButtonAboutTheatre");
			if ("no_info" in params && params.no_info) {
				this.C(about.remove("span"), "MPTheatreHidden");
			}
			else {
				this.unC(about.remove("span"), "MPTheatreHidden");
			}
			if ("info_text" in params) {
				about.prepend(
					this.E("span").html(params.info_text)
				);
			}
			this.C(this.mp_container_main, "MPTheatreEnabled");
		}
	},
	theatre_exit: function (params) {
		params = params || {};
		if (this.theatre_mode) {
			// Exit
			this.theatre_mode_target = false;
			// Animate
			if (this.theatre_animation_timer === null) {
				var self = this;
				this.theatre_animation_vars.percent = 1.0;
				this.theatre_animation_vars.tick = new Date().getTime();
				this.theatre_animation_vars.total = ("duration" in params ? params.duration : this.theatre_mode_animate_time);
				this.theatre_animation_timer = setInterval(function () {
					self.theatre_animate();
				}, 20);
			}
		}
	},
	theatre_close: function () {
		if (this.theatre_mode) {
			this.unC(this.mp_container_main, "MPTheatreEnabled");
			this.theatre_animation_vars.dim_div.remove();
			this.theatre_hide_controls_enabled = false;
			this.theatre_reset_controls_timer();
			this.unC(this.mp_container_main, "MPControlsForceHide");
			this.theatre_mode = false;
		}
	},
	theatre_animate: function () {
		// Time
		var tick = new Date().getTime();
		var time = (tick - this.theatre_animation_vars.tick) / 1000.0;
		this.theatre_animation_vars.tick = tick;

		// Percent update
		var stop = false;
		if (this.theatre_animation_vars.total > 0) {
			if (this.theatre_mode_target) {
				this.theatre_animation_vars.percent += (time / this.theatre_animation_vars.total);
				if (this.theatre_animation_vars.percent >= 1.0) {
					this.theatre_animation_vars.percent = 1.0;
					stop = true;
				}
			}
			else {
				this.theatre_animation_vars.percent -= (time / this.theatre_animation_vars.total);
				if (this.theatre_animation_vars.percent <= 0.0) {
					this.theatre_animation_vars.percent = 0.0;
					stop = true;
				}
			}
		}
		else {
			this.theatre_animation_vars.percent = (this.theatre_mode_target ? 1.0 : 0.0);
			stop = true;
		}

		// Animate
		this.theatre_animation_vars.dim_div.css("opacity", (this.theatre_animation_vars.dim * this.theatre_animation_vars.percent).toString());
		this.theatre_reposition(this.theatre_animation_vars.percent);

		// Stop timer
		if (stop) {
			clearInterval(this.theatre_animation_timer);
			this.theatre_animation_timer = null;
			if (this.theatre_mode_target) {
				// Callback
				if (this.theatre_animation_vars.callback_done !== null) this.theatre_animation_vars.callback_done();
				this.theatre_hide_controls_enabled = true;
				this.theatre_reset_controls_timer();
			}
			else {
				this.theatre_close();
			}
		}

	},
	theatre_reposition: function (percent) {
		if (percent === undefined) percent = this.theatre_animation_vars.percent;

		// Calculate
		var direction = (this.theatre_mode_target ? 0 : 1);
		var off2 = this.theatre_animation_vars.offset * 2;
		this.theatre_position.playlist_height = this.merge_values(this.theatre_position.init_playlist_height[direction], this.theatre_position.playlist_height_target, percent);
		var h_target = $(window).height() - off2 - this.theatre_position.image_height_target_offset - this.theatre_position.playlist_height;
		if (h_target < 0) h_target = 0;
		this.theatre_position.image_height = this.merge_values(this.theatre_position.init_image_height[direction], h_target, percent)
		this.theatre_position.width = this.merge_values(this.theatre_position.init_width, $(window).width() - off2, percent);
		this.theatre_position.right = this.merge_values(this.theatre_position.init_right, this.theatre_animation_vars.offset, percent);
		this.theatre_position.bottom = this.merge_values(this.theatre_position.init_bottom, this.theatre_animation_vars.offset, percent);

		// Size
		this.image_container.outerHeight(this.theatre_position.image_height);
		this.playlist_container.outerHeight(this.theatre_position.playlist_height);
		this.mp_container_main.outerWidth(this.theatre_position.width);
		this.mp_container_main.css({
			"right": this.theatre_position.right + "px",
			"bottom": this.theatre_position.bottom + "px",
		});

		this.update_image_scale();
		this.seek_to(null, true);
	},
	theatre_reset_controls_timer: function () {
		if (this.theatre_hide_controls_timer !== null) {
			clearTimeout(this.theatre_hide_controls_timer);
			this.theatre_hide_controls_timer = null;
		}

		if (this.theatre_hide_controls_enabled) {
			var self = this;
			this.theatre_hide_controls_timer = setTimeout(function () {
				self.on_theatre_mode_hide_controls_timeout();
			}, this.theatre_hide_controls_time * 1000);
		}
	},


	full_destroy: function (full) {
		// Playlist clear
		while (this.playlist.length > 0) {
			this.remove(0);
		}

		// Remove html
		if (this.mp_container_main != null) this.mp_container_main.remove();
		this.theatre_close();

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

		// Full
		if (full) this.destructor();
	},
	nullify: function () {
		this.mp_container_main = null;
		this.mp_container = null;
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
		this.playback_controls_svg = null;
		this.playback_seek_indicator = null;
		this.playback_seek_indicator_container = null;
		this.help_container = null;
		this.help_container_inner1 = null;
		this.help_container_footer = null;
		this.content_container = null;
		this.top_container = null;
		this.footer_container = null;
		this.playback_control_container = null;
		this.player_theme_name = null;
		this.video_container = null;
		this.video_mask = null;
		this.loaded_status_count = null;
		this.loaded_status_container = null;

		this.ytvideo_player = null;
		if (this.vimeovideo_player !== null) {
			this.vimeovideo_player.destructor();
			this.vimeovideo_player = null;
		}
		if (this.soundcloud_player !== null) {
			this.soundcloud_player.destructor();
			this.soundcloud_player = null;
		}

		this.load_percent_bar_container = null;
		this.load_percent_bar_mover = null;
		this.load_percent_bar = null;
		this.resizing_container = null;
		this.resizing_controls = null;
		this.resizing_texts = null;
		this.playlist_index_container = null;
		this.playlist_index_text1 = null;
		this.playlist_index_text2 = null;
		this.downloads_container = null;
		this.downloads_ready_container = null;
		this.downloads_link = null;
		this.downloads_about = null;
		this.title_buttons = null;

		if (this.load_buffer_timer !== null) {
			clearTimeout(this.load_buffer_timer);
			this.load_buffer_timer = null;
		}

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

		if (this.theatre_animation_timer !== null) {
			clearInterval(this.theatre_animation_timer);
			this.theatre_animation_timer = null;
		}
		this.theatre_mode = false;

		this.player_theme_value_updaters = null;
	},

	playback_interference_callback: function (type) {
		if (this.theatre_mode && (type != 1)) {
			// Theatre doesn't need to close now
			if (this.theatre_vars.close_on_finish && !this.theatre_vars.close_on_finish_interference) {
				this.theatre_vars.close_on_finish = false;
			}
		}
	},

	create_playback_controls: function () {
		this.playback_control_container.html("");
		this.playback_controls = [ [null] , [null] , [null,null] , [null] , [null] ];
		this.playback_controls_svg = null;
		if (this.use_svg) {
			this.playback_controls_svg = [ [null] , [null] , [null,null] , [null] , [null] ]

			for (var i = 0; i < this.playback_controls.length; ++i) {
				// Separator
				if (i > 0) this.playback_control_container.append(this.D("MPControlLinkSeparator"));

				for (var j = 0; j < this.playback_controls[i].length; ++j) {
					// Create SVG container
					this.playback_control_container.append(
						(this.playback_controls[i][j] = this.D("MPControlLinkSvgContainer", "MPControlLinkDisabled"))
					);
					if (j > 0) this.playback_controls[i][j].css("display", "none");

					var svg_finder;
					this.playback_controls[i][j].append((svg_finder = this.D("MPControlLinkSvg")));
					var w = svg_finder.outerWidth();
					var h = svg_finder.outerHeight();

					svg_finder.svg();
					this.playback_controls_svg[i][j] = svg_finder.svg("get");
					var html_svg = $(svg_finder.contents()[0]);

					html_svg.attr("width", w);
					html_svg.attr("height", h);

					// Create contents
					var g = this.playback_controls_svg[i][j].group({
						"class": "MPControlLinkSvgMainGroup",
						"transform": "scale(" + w + "," + h + ")"
					});

					if (i == 0) {
						// Back
						this.playback_controls_svg[i][j].rect(g,
							0.125, 0.0, 0.25, 1.0,
							{"class": this.CC("MPControlLinkSvgShapeColor")}
						);
						this.playback_controls_svg[i][j].polygon(g,
							[ [0.875 , 0.0] , [0.875 , 1.0] , [0.375 , 0.5] ],
							{"class": this.CC("MPControlLinkSvgShapeColor")}
						);
					}
					else if (i == 1) {
						// RW
						this.playback_controls_svg[i][j].polygon(g,
							[ [0.5 , 0.0] , [0.5 , 1.0] , [0.125 , 0.5] ],
							{"class": this.CC("MPControlLinkSvgShapeColor")}
						);
						this.playback_controls_svg[i][j].polygon(g,
							[ [0.875 , 0.0] , [0.875 , 1.0] , [0.5 , 0.5] ],
							{"class": this.CC("MPControlLinkSvgShapeColor")}
						);
					}
					else if (i == 2) {
						// Play/pause
						if (j == 1) {
							this.playback_controls_svg[i][j].rect(g,
								0.125, 0.0, 0.25, 1.0,
								{"class": this.CC("MPControlLinkSvgShapeColor")}
							);
							this.playback_controls_svg[i][j].rect(g,
								0.625, 0.0, 0.25, 1.0,
								{"class": this.CC("MPControlLinkSvgShapeColor")}
							);
						}
						else {
							this.playback_controls_svg[i][j].polygon(g,
								[ [0.25 , 0.0] , [0.25 , 1.0] , [0.75 , 0.5] ],
								{"class": this.CC("MPControlLinkSvgShapeColor")}
							);
						}
					}
					else if (i == 3) {
						// FFW
						this.playback_controls_svg[i][j].polygon(g,
							[ [0.125 , 0.0] , [0.125 , 1.0] , [0.5 , 0.5] ],
							{"class": this.CC("MPControlLinkSvgShapeColor")}
						);
						this.playback_controls_svg[i][j].polygon(g,
							[ [0.5 , 0.0] , [0.5 , 1.0] , [0.875 , 0.5] ],
							{"class": this.CC("MPControlLinkSvgShapeColor")}
						);
					}
					else {
						// Next
						this.playback_controls_svg[i][j].rect(g,
							0.625, 0.0, 0.25, 1.0,
							{"class": this.CC("MPControlLinkSvgShapeColor")}
						);
						this.playback_controls_svg[i][j].polygon(g,
							[ [0.125 , 0.0] , [0.125 , 1.0] , [0.625 , 0.5] ],
							{"class": this.CC("MPControlLinkSvgShapeColor")}
						);
					}
				}
			}
		}
		else {
			this.playback_controls_svg = null;
			var control_texts = [ ["|&lt;"] , ["&lt;&lt"] , ["&gt;","||"] , ["&gt;&gt;"] , ["&gt;|"] ];

			for (var i = 0; i < this.playback_controls.length; ++i) {
				if (i > 0) this.playback_control_container.append(this.D("MPControlLinkSeparator"));
				for (var j = 0; j < this.playback_controls[i].length; ++j) {
					this.playback_control_container.append(
						(this.playback_controls[i][j] = this.E("a", "MPControlLink", "MPControlLinkDisabled"))
						.html(control_texts[i][j])
					);
					if (j > 0) this.playback_controls[i][j].css("display", "none");
				}
			}
		}
		for (var i = 0; i < this.playback_controls.length; ++i) {
			for (var j = 0; j < this.playback_controls[i].length; ++j) {
				this.playback_controls[i][j].on("click." + this.namespace, {control_id: i, control_id2: j, media_player: this}, this.on_playback_control_click);
				this.playback_controls[i][j].on("mousedown", this.cancel_event);
			}
		}
	},

	get_audio_duration: function (audio) {
		try {
			var d = (isFinite(audio.duration) ? audio.duration : audio.buffered.end(0));
			return isFinite(d) ? d : 0;
		}
		catch (e) {
			console.log(e);
		}
		return 0;
	},

	regen_stylesheet: function () {
		this.head_css.html(this.css.create_stylesheet());

		var vol_col = this.get_volume_color(this.volume);
		this.volume_bar.css("background", "rgb(" + vol_col[0] + "," + vol_col[1] + "," + vol_col[2] + ")");
	},

	update_index_display: function (index, count, activate) {
		this.playlist_index_text1.html(count == 0 ? "-" : (index >= 0 ? (index + 1).toString() : "-"));
		this.playlist_index_text2.html(count == 0 ? "-" : count.toString());

		if (!activate) return;

		this.C(this.playlist_index_container, "MPPlaylistIndexContainerActive");
		if (this.playlist_index_timer !== null) {
			clearTimeout(this.playlist_index_timer);
			this.playlist_index_timer = null;
		}
		var self = this;
		this.playlist_index_timer = setTimeout(function () {
			self.playlist_index_timer = null;
			self.unC(self.playlist_index_container, "MPPlaylistIndexContainerActive");
		}, 1000);
	},

	get_volume_color: function (percent) {
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
	},
	reposition: function (left, top) {
		if (this.theatre_mode) {
			this.theatre_reposition();
			return;
		}

		if (left != undefined) {
			this.position_offset[0] = $(window).outerWidth() - (left + this.mp_container_main.outerWidth());
		}
		if (top != undefined) {
			this.position_offset[1] = $(window).outerHeight() - (top + this.mp_container_main.outerHeight());
		}
		var v;
		if (this.position_offset[0] > (v = $(window).outerWidth() - this.mp_container_main.outerWidth())) this.position_offset[0] = v;
		if (this.position_offset[1] > (v = $(window).outerHeight() - this.mp_container_main.outerHeight())) this.position_offset[1] = v;
		if (this.position_offset[0] < 0) this.position_offset[0] = 0;
		if (this.position_offset[1] < 0) this.position_offset[1] = 0;
		this.mp_container_main.css({"right": this.position_offset[0], "bottom": this.position_offset[1]});
	},
	resize_to: function (width, height, is_left, is_top) {
		if (this.theatre_mode) {
			this.theatre_reposition();
			return;
		}

		// Current size
		var current_size = [ this.mp_container_main.outerWidth() , this.mp_container_main.outerHeight() ];

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
			this.mp_container_main.outerWidth(width);
			if (!is_left) {
				this.position_offset[0] -= (width - current_size[0]);
			}
		}

		// Update position
		this.mp_container_main.css({"right": this.position_offset[0], "bottom": this.position_offset[1]});
		this.update_image_scale();

		// Update others
		this.set_loaded();
		this.seek_to(null, true);
	},
	update_playing_status: function () {
		if (!this.seek_exacting && !this.seek_dragging) {
			if (this.is_paused()) {
				this.playback_controls[2][0].css("display", "");
				this.playback_controls[2][1].css("display", "none");
			}
			else {
				this.playback_controls[2][0].css("display", "none");
				this.playback_controls[2][1].css("display", "");
			}
		}
	},
	update_scale_factor: function (scale_factor) {
		this.scale_factor = scale_factor;

		this.mp_container_main.outerWidth(this.player_width * this.scale_factor);
		this.playlist_container.outerHeight(this.playlist_height * this.scale_factor);
		this.image_container.outerHeight(this.image_height * this.scale_factor);
		// rescale image
		this.update_image_scale();
	},
	update_image_scale: function () {
		if (this.current_media !== null) {
			if (this.current_media.type == "image-audio") {
				var hh = this.image_container.outerHeight();
				var xs = (this.image_container.outerWidth() / this.current_media.image_size[0]);
				var ys = (hh / this.current_media.image_size[1]);
				if (ys < xs) xs = ys;

				ys = this.current_media.image_size[1] * xs;
				xs = this.current_media.image_size[0] * xs;

				// Scale
				this.image.width(xs);
				this.image.height(ys);
				this.image.css("margin-top", ((hh - ys) / 2) + "px");
			}
			else if (this.current_media.type == "ve") {
				if (this.current_media.vplayer.get_container() != null) {
					var size = (this.current_media.vplayer.has_video() ? this.current_media.vplayer.get_video_size() : this.current_media.vplayer.get_image_size())
					if (size.width > 0 && size.height > 0) {
						var hh = this.video_container.outerHeight();
						var xs = (this.video_container.outerWidth() / size.width);
						var ys = (hh / size.height);
						if (ys < xs) xs = ys;

						ys = size.height * xs;
						xs = size.width * xs;

						// Scale
						$(this.current_media.vplayer.get_container()).css({
							"width": xs + "px",
							"height": ys + "px",
							"margin-top": ((hh - ys) / 2) + "px"
						});
					}
				}
			}
			else if (this.current_media.type == "youtube-video") {
				if (this.ytvideo_player != null && this.ytvideo_player.setSize) {
					this.ytvideo_player.setSize(this.video_container.outerWidth(), this.video_container.outerHeight());
				}
			}
			else if (this.current_media.type == "vimeo-video") {
				if (this.vimeovideo_player != null) {
					$(this.vimeovideo_player.iframe)
					.attr("width", this.video_container.outerWidth())
					.attr("height", this.video_container.outerHeight());
				}
			}
			else if (this.current_media.type == "soundcloud-sound") {
				if (this.soundcloud_player != null) {
					$(this.soundcloud_player.iframe)
					.attr("width", this.video_container.outerWidth())
					.attr("height", this.video_container.outerHeight());
				}
			}
			else {
				console.log(this.current_media.type);
			}
		}
	},
	resize_image_container: function (height) {
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
	},
	update_player_theme_name: function (data) {
		data.media_player.player_theme_name.html(data.media_player.css.css_color_presets[data.media_player.css.preset]["@name"] || data.media_player.css.preset);
	},
	update_seek_indicator: function (time) {
		if (this.current_media == null) return;

		if (time < 0.0) time = 0.0;
		else if (time > this.current_media.duration) time = this.current_media.duration;

		this.playback_seek_indicator.html(this.duration_to_string(time));
		if (time > 0.0) time /= this.current_media.duration;

		var c_width = this.playback_seek_indicator_container.width();
		var width = this.playback_seek_indicator.outerWidth();

		time = ((time * c_width) - width / 2);
		if (time < 0.0) time = 0.0;
		else if (time > c_width - width) time = c_width - width;

		this.playback_seek_indicator.css("left", time + "px");
	},

	E: function (elem) {
		// Shortcut to create an element, masked with jquery
		var e = $(document.createElement(elem));
		for (var i = 1; i < arguments.length; ++i) this.C(e, arguments[i]);
		return e;
	},
	D: function () {
		// Shortcut to create a div, masked with jquery, appended with some classes
		var e = $(document.createElement("div"));
		for (var i = 0; i < arguments.length; ++i) this.C(e, arguments[i]);
		return e;
	},
	C: function (elem, cls) {
		elem.addClass(cls + this.css.css_suffix);
	},
	CC: function (cls) {
		return cls + this.css.css_suffix;
	},
	unC: function (elem, cls) {
		elem.removeClass(cls + this.css.css_suffix);
	},

	random_integer: function (max) {
		return Math.floor(Math.random() * max);
	},
	random_string: function (len, chars) {
		var s = "";
		chars = chars || "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
		for (var i = 0; i < len; ++i) {
			s += chars[Math.floor(Math.random() * chars.length)];
		}
		return s;
	},
	text_to_html: function (str) {
		return str.replace(/&/g, "&amp;")
			.replace(/>/g, "&gt;")
			.replace(/</g, "&lt;")
			.replace(/"/g, "&quot;");
	},
	duration_to_string: function (position) {
		var seconds_in = Math.round(position);
		var minutes_in = Math.floor(seconds_in / 60);
		var hours_in = Math.floor(minutes_in / 60);
		seconds_in = Math.floor(seconds_in - minutes_in * 60);
		minutes_in = Math.floor(minutes_in - hours_in * 60);
		var s = (hours_in > 0 ? hours_in + ":" : "") +
			(hours_in > 0 ? (minutes_in >= 10 ? minutes_in : "0" + minutes_in) : minutes_in) +
			":" + (seconds_in >= 10 ? seconds_in : "0" + seconds_in);
		return s;
	},
	youtube_time_to_number: function (str) {
		var time = 0;
		while (str.length > 0) {
			var match = /([0-9]+)([smh]|$)/.exec(str);
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
	},
	string_to_uint8array: function (str) {
		var array = new Uint8Array(new ArrayBuffer(str.length));
		for (var i = 0; i < str.length; ++i) {
			array[i] = str.charCodeAt(i);
		}
		return array;
	},
	arraybuffer_to_uint8array: function (buffer) {
		return new Uint8Array(buffer);
	},
	merge_value_towards: function (value, target, incr) {
		return (value < target) ?
			((target - value < incr) ? target : value + incr) :
			((value - target < incr) ? target : value - incr);
	},
	merge_values: function (value, target, percent) {
		return value + (target - value) * percent;
	},

	generate_color_editor: function (label, identifier, value) {
		var color_edit;
		var help_input = [ null , null , null , null ];

		var e = this.D("MPHelpSectionDiv") //{ DOM Generation
			.append(
				this.D("MPHelpColorInputDiv0")
				.append(
					this.D("MPHelpColorInputDiv2b")
					.append(
						(color_edit = this.D("MPHelpColorLabelDisplay"))
					)
					.append(
						this.D("MPHelpColorLabelText")
						.html(label)
					)
				)
			)
			.append(
				this.D("MPHelpColorInputDiv1")
				.append(
					this.D("MPHelpColorInputDiv2")
					.attr("title", "Red : [0,255]")
					.append(
						this.D("MPHelpColorInputDiv3")
						.append(
							(help_input[0] = this.E("input", "MPHelpColorInput"))
							.attr("type", "text")
						)
					)
				)
			)
			.append(
				this.D("MPHelpColorInputDiv1")
				.append(
					this.D("MPHelpColorInputDiv2")
					.attr("title", "Green : [0,255]")
					.append(
						this.D("MPHelpColorInputDiv3")
						.append(
							(help_input[1] = this.E("input", "MPHelpColorInput"))
							.attr("type", "text")
						)
					)
				)
			)
			.append(
				this.D("MPHelpColorInputDiv1")
				.append(
					this.D("MPHelpColorInputDiv2")
					.attr("title", "Blue : [0,255]")
					.append(
						this.D("MPHelpColorInputDiv3")
						.append(
							(help_input[2] = this.E("input", "MPHelpColorInput"))
							.attr("type", "text")
						)
					)
				)
			)
			.append(
				this.D("MPHelpColorInputDiv1")
				.append(
					this.D("MPHelpColorInputDiv2")
					.attr("title", "Alpha : [0.0,1.0]")
					.append(
						this.D("MPHelpColorInputDiv3")
						.append(
							(help_input[3] = this.E("input", "MPHelpColorInput"))
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
	},
	generate_value_editor: function (label, identifier, value, is_string, bounds) {
		var help_input;

		var  e = this.D("MPHelpSectionDiv") //{ DOM Generation
			.append(
				this.D("MPHelpColorInputDiv0")
				.append(
					this.D("MPHelpColorInputDiv2b")
					.append(
						this.D("MPHelpColorLabelText")
						.html(label)
					)
				)
			)
			.append(
				this.D("MPHelpColorInputDiv1Full")
				.append(
					this.D("MPHelpColorInputDiv2")
					.append(
						this.D("MPHelpColorInputDiv3")
						.append(
							(help_input = this.E("input", "MPHelpColorInput"))
							.attr("type", "text")
							.val(value)
							.on("change." + this.namespace, {media_player: this, value_id: identifier, "is_string": is_string, "bounds": bounds}, this.on_settings_value_change)
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
	},
	update_value_fields: function () {
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
	},

	xml_find_nodes_by_name: function (xml, name) {
		// Because chrome is bad
		var nodes = [], n2;

		for (var n = 0; n < xml.childNodes.length; ++n) {
			if (xml.childNodes[n].nodeName != "#text") {
				if (xml.childNodes[n].nodeName == name) nodes.push(xml.childNodes[n]);

				n2 = this.xml_find_nodes_by_name(xml.childNodes[n], name);
				if (n2.length > 0) nodes = nodes.concat(n2);
			}
		}

		return nodes;
	},
	ajax_get: function (url, return_as_string, callback_data, progress_callback, done_callback) {
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
						done_callback(false, callback_data, {
							status: this.status,
							response: this.response,
							status_text: this.statusText
						});
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
							done_callback(false, callback_data, {
								status: event.status,
								response: event.responseText,
								status_text: event.statusText
							});
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
	},

	add_to_playlist: function (title, tag, flagged, url, sound_index, raw_data, image_src, playlist_data) {
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
			"controls": [ null , null , null , null , null ],
			"loaded_offset": 0.0,
			"loaded_percent": 1.0,
			"image_url": null,
			"image_blob": null,
			"image_blob_url": null,
			"image_name": ((playlist_data ? playlist_data.image_name : null) || url.split("/").pop()),
			"image_size": [0, 0],
			"audio_blob": null,
			"audio_blob_url": null,
			"mask_click_target": null,
		};

		// Create ogg audio
		playlist_item.audio_blob = new Blob([raw_data], {type: "audio/ogg"});
		playlist_item.audio_blob_url = (window.webkitURL || window.URL).createObjectURL(playlist_item.audio_blob);

		// Create/get image url and related settings
		if (typeof(image_src) == typeof("")) {
			playlist_item.image_url = image_src;
			playlist_item.image_blob = null;
			playlist_item.image_blob_url = null;
		}
		else {
			var image_ext = url.split(".").pop().toLowerCase();
			var mime = "image/jpeg"
			if (image_ext == "png") mime = "image/png";
			else if (image_ext == "gif") mime = "image/gif";

			playlist_item.image_blob = new Blob([image_src], {type: mime});
			playlist_item.image_blob_url = (window.webkitURL || window.URL).createObjectURL(playlist_item.image_blob);
			playlist_item.image_url = playlist_item.image_blob_url;
		}
		playlist_item.mask_click_target = playlist_item.image_url;

		// html setup
		var image_file_name = playlist_item.image_name.split(".");
		var image_file_ext = image_file_name.pop().toLowerCase();
		image_file_name = image_file_name.join(".");

		this.playlist_container.append( //{ DOM creation
			(playlist_item.playlist_item = this.E("a", "MPPlaylistItem"))
			.attr("href", playlist_item.audio_blob_url)
			.attr("target", "_blank")
			.on("click." + this.namespace, {media_player: this, playlist_item: playlist_item}, this.on_playlist_item_click)
			.on("mousedown", this.cancel_event)
			.attr("title", tag != MediaPlayer.ALL_SOUNDS ? tag : "")
			.append(
				this.D("MPPlaylistSoundName")
				.text(playlist_item.title)
			)
			.append(
				(playlist_item.info_container = this.D("MPPlaylistItemInfo"))
				.html(this.duration_to_string(playlist_item.duration))
			)
			.append(
				this.D("MPPlaylistControlsContainer")
				.on("mousedown", this.cancel_event)
				.append(
					this.D("MPPlaylistControls")
					.on("click", this.cancel_event)
					.append(
						(playlist_item.controls[0] = this.E("a", "MPPlaylistControlLink"))
						.html("&times;")
						.attr("title", "Delete")
					)
					.append(
						this.D("MPPlaylistControlLinkSeparator")
					)
					.append(
						(playlist_item.controls[1] = this.E("a", "MPPlaylistControlLink"))
						.html("&uarr;")
						.attr("title", "Move up")
					)
					.append(
						this.D("MPPlaylistControlLinkSeparator")
					)
					.append(
						(playlist_item.controls[2] = this.E("a", "MPPlaylistControlLink"))
						.html("&darr;")
						.attr("title", "Move down")
					)
					.append(
						this.D("MPPlaylistControlLinkSeparator")
					)
					.append(
						(playlist_item.controls[3] = this.E("a", "MPPlaylistControlLink"))
						.html("S")
						.attr("title", "Save...")
						.attr("href", playlist_item.audio_blob_url)
						.attr("download", playlist_item.title + ".ogg")
						.attr("target", "_blank")
					)
					.append(
						this.D("MPPlaylistControlLinkSeparator")
					)
					.append(
						(playlist_item.controls[4] = this.E("a", "MPPlaylistControlLink"))
						.html("I")
						.attr("title", "Image...")
						.attr("href", playlist_item.image_url)
						.attr("download", image_file_name + ".[" + playlist_item.title + "]." + image_file_ext)
						.attr("target", "_blank")
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
			)
			.on(
				"error." + this.namespace,
				{"media_player": this, "playlist_item": playlist_item},
				this.on_temp_audio_error
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
		this.on_media_add(playlist_item);

		// Done
		return playlist_item.index;
	},
	add_to_playlist_ve: function (videcode, tag, original_image_url, playlist_data) {
		// Setup playlist settings
		var playlist_item = {
			"type": "ve",
			"videcode": videcode,
			"vplayer": null,
			"title": videcode.get_tag(),
			"tag": tag,
			"flagged": false,
			"url": original_image_url,
			"index": this.playlist.length,
			"duration": 0.0,
			"position": 0.0,
			"controls": [ null , null , null , null , null ],
			"loaded_offset": 0.0,
			"loaded_percent": 1.0,
			"image_name": ((playlist_data ? playlist_data.image_name : null) || (original_image_url != null ? original_image_url.split("/").pop() : "image")),
			"image_size": [0, 0],
			"mask_click_target": null,
			"image_url": null,
			"image_blob": null,
			"image_blob_url": null,
			"temp_container": null
		};

		// Create vplayer
		playlist_item.vplayer = new VPlayer(videcode);
		// Image URL
		if (playlist_item.url == null) {
			playlist_item.image_blob = new Blob([videcode.get_source()], {type: videcode.get_image_mime_type()});
			playlist_item.image_blob_url = (window.webkitURL || window.URL).createObjectURL(playlist_item.image_blob);
			playlist_item.image_url = playlist_item.image_blob_url;
		}
		else {
			playlist_item.image_url = playlist_item.url;
		}
		playlist_item.mask_click_target = playlist_item.image_url;

		// html setup
		var final_separators = [ null , null ];
		this.playlist_container.append( //{ DOM creation
			(playlist_item.playlist_item = this.E("a", "MPPlaylistItem"))
			.attr("href", playlist_item.image_url)
			.attr("target", "_blank")
			.on("click." + this.namespace, {media_player: this, playlist_item: playlist_item}, this.on_playlist_item_click)
			.on("mousedown", this.cancel_event)
			.attr("title", tag != MediaPlayer.ALL_SOUNDS ? tag : "")
			.append(
				this.D("MPPlaylistSoundName")
				.text(playlist_item.title)
			)
			.append(
				(playlist_item.info_container = this.D("MPPlaylistItemInfo"))
				.html(this.duration_to_string(playlist_item.duration))
			)
			.append(
				this.D("MPPlaylistControlsContainer")
				.on("mousedown", this.cancel_event)
				.append(
					this.D("MPPlaylistControls")
					.on("click", this.cancel_event)
					.append(
						(playlist_item.controls[0] = this.E("a", "MPPlaylistControlLink"))
						.html("&times;")
						.attr("title", "Delete")
					)
					.append(
						this.D("MPPlaylistControlLinkSeparator")
					)
					.append(
						(playlist_item.controls[1] = this.E("a", "MPPlaylistControlLink"))
						.html("&uarr;")
						.attr("title", "Move up")
					)
					.append(
						this.D("MPPlaylistControlLinkSeparator")
					)
					.append(
						(playlist_item.controls[2] = this.E("a", "MPPlaylistControlLink"))
						.html("&darr;")
						.attr("title", "Move down")
					)
					.append(
						(final_separators[0] = this.D("MPPlaylistControlLinkSeparator"))
					)
					.append(
						(playlist_item.controls[3] = this.E("a", "MPPlaylistControlLink"))
						.html("A")
						.attr("title", "Save audio...")
						.attr("href", playlist_item.vplayer.get_audio() || "")
						.attr("download", playlist_item.title + ".ogg")
						.attr("target", "_blank")
					)
					.append(
						(final_separators[1] = this.D("MPPlaylistControlLinkSeparator"))
					)
					.append(
						(playlist_item.controls[4] = this.E("a", "MPPlaylistControlLink"))
						.html("V")
						.attr("title", "Save video...")
						.attr("href", playlist_item.vplayer.get_video() || "")
						.attr("download", playlist_item.title + ".webm")
						.attr("target", "_blank")
					)
				)
			)
		); //}

		// Custom
		if (playlist_item.vplayer.get_audio() == null) {
			final_separators[0].css("display", "none");
			playlist_item.controls[3].css("display", "none");
		}
		if (playlist_item.vplayer.get_video() == null) {
			final_separators[1].css("display", "none");
			playlist_item.controls[4].css("display", "none");
		}
		for (var i = 0; i < playlist_item.controls.length; ++i) {
			playlist_item.controls[i].on("click." + this.namespace, {control_id: i, media_player: this, playlist_item: playlist_item}, this.on_playlist_control_click);
			playlist_item.controls[i].on("mousedown", this.cancel_event);
		}

		// Automatic length detection
		var self = this;
		(playlist_item.temp_container = this.D()).css("display", "none");
		playlist_item.vplayer.on("load", function () {
			self.on_temp_ve_load(playlist_item);
		});
		playlist_item.vplayer.on("error", function () {
			self.on_temp_ve_error(playlist_item);
		});
		playlist_item.vplayer.create_html(playlist_item.temp_container[0]);

		// Add
		this.playlist.push(playlist_item);

		// Scroll to?
		if (this.playlist_scrollto_onload) {
			this.scroll_to(this.playlist.length - 1);
		}

		// Index display
		this.update_index_display((this.current_media != null ? this.current_media.index : -1), this.playlist.length, true);

		// Play?
		this.on_media_add(playlist_item);

		// Done
		return playlist_item.index;
	},
	add_to_playlist_ytvideo: function (original_url, vid_id, tag, flagged, info_xml, playlist_data) {
		// XML parsing
		var cache_key = "media_cache";
		var title = "Unknown Title";
		var duration = 0.0;
		if (cache_key in playlist_data) {
			if ("title" in playlist_data[cache_key]) title = playlist_data[cache_key]["title"];
			if ("duration" in playlist_data[cache_key]) duration = playlist_data[cache_key]["duration"];

			delete playlist_data[cache_key];
		}
		else {
			// Setup playlist settings
			var d = this.xml_find_nodes_by_name(info_xml, "yt:duration");
			if (d.length > 0) {
				duration = d[0].getAttribute("seconds");
				duration = parseFloat(duration);
				duration = (isFinite(duration) ? duration : 0.0);
			}

			try {
				title = this.text_to_html($(this.xml_find_nodes_by_name(info_xml, "title")).text());
			}
			catch (e) {
				console.log(e);
			}
		}

		// URL parsing
		var start = /[\!\#\?\&]t=[0-9smh]+/.exec(original_url);
		if (start != null) {
			start = this.youtube_time_to_number(start[0].substr(3, start[0].length - 3));
		}
		else {
			start = 0.0;
		}

		// Playlist item
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
			"loaded_percent": 0.0,
			"mask_click_target": null,
		};
		playlist_item.mask_click_target = "//www.youtube.com/watch?v=" + playlist_item.vid_id + (playlist_item.start == 0.0 ? "" : ("&t=" + Math.floor(playlist_item.start) + "s"));

		// html setup
		this.playlist_container.append( //{ DOM creation
			(playlist_item.playlist_item = this.E("a", "MPPlaylistItem"))
			.attr("href", playlist_item.mask_click_target)
			.attr("target", "_blank")
			.on("click." + this.namespace, {media_player: this, playlist_item: playlist_item}, this.on_playlist_item_click)
			.on("mousedown", this.cancel_event)
			.append(
				this.D("MPPlaylistSoundName")
				.html(playlist_item.title)
			)
			.append(
				(playlist_item.info_container = this.D("MPPlaylistItemInfo"))
				.html(this.duration_to_string(playlist_item.duration))
			)
			.append(
				this.D("MPPlaylistControlsContainer")
				.on("mousedown", this.cancel_event)
				.append(
					this.D("MPPlaylistControls")
					.on("click", this.cancel_event)
					.append(
						(playlist_item.controls[0] = this.E("a", "MPPlaylistControlLink"))
						.html("&times;")
						.attr("title", "Delete")
					)
					.append(
						this.D("MPPlaylistControlLinkSeparator")
					)
					.append(
						(playlist_item.controls[1] = this.E("a", "MPPlaylistControlLink"))
						.html("&uarr;")
						.attr("title", "Move up")
					)
					.append(
						this.D("MPPlaylistControlLinkSeparator")
					)
					.append(
						(playlist_item.controls[2] = this.E("a", "MPPlaylistControlLink"))
						.html("&darr;")
						.attr("title", "Move down")
					)
					.append(
						this.D("MPPlaylistControlLinkSeparator")
					)
					.append(
						(playlist_item.controls[3] = this.E("a", "MPPlaylistControlLink"))
						.html("Y")
						.attr("title", "Youtube Link")
						.attr("href", playlist_item.mask_click_target)
						.attr("target", "_blank")
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
		this.on_media_add(playlist_item);

		// Done
		return playlist_item.index;
	},
	add_to_playlist_vimeovideo: function (original_url, vid_id, tag, flagged, info_xml, playlist_data) {
		// XML parsing
		var cache_key = "media_cache";
		var title = "Unknown Title";
		var duration = 0.0;
		if (cache_key in playlist_data) {
			if ("title" in playlist_data[cache_key]) title = playlist_data[cache_key]["title"];
			if ("duration" in playlist_data[cache_key]) duration = playlist_data[cache_key]["duration"];

			delete playlist_data[cache_key];
		}
		else {
			// Setup playlist settings
			var d = this.xml_find_nodes_by_name(info_xml, "duration");
			if (d.length > 0) {
				duration = $(d[0]).text();
				duration = parseFloat(duration);
				duration = isFinite(duration) ? duration : 0.0;
			}

			try {
				title = this.text_to_html($(this.xml_find_nodes_by_name(info_xml, "title")).text());
			}
			catch (e) {
				console.log(e);
			}
		}

		// URL parsing
		var start = /[\!\#\?\&]t=[0-9smh]+/.exec(original_url);
		if (start != null) {
			start = this.youtube_time_to_number(start[0].substr(3, start[0].length - 3));
		}
		else {
			start = 0.0;
		}

		// Playlist item
		var playlist_item = {
			"type": "vimeo-video",
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
			"loaded_percent": 0.0,
			"mask_click_target": null,
		};
		playlist_item.mask_click_target = "//vimeo.com/" + playlist_item.vid_id + (playlist_item.start == 0.0 ? "" : ("?t=" + Math.floor(playlist_item.start)));

		// html setup
		this.playlist_container.append( //{ DOM creation
			(playlist_item.playlist_item = this.E("a", "MPPlaylistItem"))
			.attr("href", playlist_item.mask_click_target)
			.attr("target", "_blank")
			.on("click." + this.namespace, {media_player: this, playlist_item: playlist_item}, this.on_playlist_item_click)
			.on("mousedown", this.cancel_event)
			.append(
				this.D("MPPlaylistSoundName")
				.html(playlist_item.title)
			)
			.append(
				(playlist_item.info_container = this.D("MPPlaylistItemInfo"))
				.html(this.duration_to_string(playlist_item.duration))
			)
			.append(
				this.D("MPPlaylistControlsContainer")
				.on("mousedown", this.cancel_event)
				.append(
					this.D("MPPlaylistControls")
					.on("click", this.cancel_event)
					.append(
						(playlist_item.controls[0] = this.E("a", "MPPlaylistControlLink"))
						.html("&times;")
						.attr("title", "Delete")
					)
					.append(
						this.D("MPPlaylistControlLinkSeparator")
					)
					.append(
						(playlist_item.controls[1] = this.E("a", "MPPlaylistControlLink"))
						.html("&uarr;")
						.attr("title", "Move up")
					)
					.append(
						this.D("MPPlaylistControlLinkSeparator")
					)
					.append(
						(playlist_item.controls[2] = this.E("a", "MPPlaylistControlLink"))
						.html("&darr;")
						.attr("title", "Move down")
					)
					.append(
						this.D("MPPlaylistControlLinkSeparator")
					)
					.append(
						(playlist_item.controls[3] = this.E("a", "MPPlaylistControlLink"))
						.html("V")
						.attr("title", "Vimeo Link")
						.attr("href", playlist_item.mask_click_target)
						.attr("target", "_blank")
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
		this.on_media_add(playlist_item);

		// Done
		return playlist_item.index;
	},
	add_to_playlist_soundcloud_sound: function (original_url, vid_id, tag, flagged, info_json, playlist_data) {
		// XML parsing
		var cache_key = "media_cache";
		var title = "Unknown Title";
		var duration = 0.0;
		var embed_code = "";
		if (cache_key in playlist_data) {
			if ("title" in playlist_data[cache_key]) title = playlist_data[cache_key]["title"];
			if ("embed_code" in playlist_data[cache_key]) embed_code = playlist_data[cache_key]["embed_code"];

			delete playlist_data[cache_key];
		}
		else {
			title = info_json.title;
			var match = " by " + info_json.author_name;
			if (
				info_json.author_name.length > 0 &&
				title.length > match.length &&
				title.substr(title.length - match.length, match.length) == match
			) {
				title = title.substr(0, title.length - match.length);
			}
			title = this.text_to_html(title);

			embed_code = info_json.html;
		}

		// URL parsing
		var start = 0.0;

		// Playlist item
		var playlist_item = {
			"type": "soundcloud-sound",
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
			"loaded_percent": 0.0,
			"embed_code": embed_code,
			"mask_click_target": "//soundcloud.com/" + vid_id,
		};

		// html setup
		this.playlist_container.append( //{ DOM creation
			(playlist_item.playlist_item = this.E("a", "MPPlaylistItem"))
			.attr("href", playlist_item.mask_click_target)
			.attr("target", "_blank")
			.on("click." + this.namespace, {media_player: this, playlist_item: playlist_item}, this.on_playlist_item_click)
			.on("mousedown", this.cancel_event)
			.append(
				this.D("MPPlaylistSoundName")
				.html(playlist_item.title)
			)
			.append(
				(playlist_item.info_container = this.D("MPPlaylistItemInfo"))
				.html(this.duration_to_string(playlist_item.duration))
			)
			.append(
				this.D("MPPlaylistControlsContainer")
				.on("mousedown", this.cancel_event)
				.append(
					this.D("MPPlaylistControls")
					.on("click", this.cancel_event)
					.append(
						(playlist_item.controls[0] = this.E("a", "MPPlaylistControlLink"))
						.html("&times;")
						.attr("title", "Delete")
					)
					.append(
						this.D("MPPlaylistControlLinkSeparator")
					)
					.append(
						(playlist_item.controls[1] = this.E("a", "MPPlaylistControlLink"))
						.html("&uarr;")
						.attr("title", "Move up")
					)
					.append(
						this.D("MPPlaylistControlLinkSeparator")
					)
					.append(
						(playlist_item.controls[2] = this.E("a", "MPPlaylistControlLink"))
						.html("&darr;")
						.attr("title", "Move down")
					)
					.append(
						this.D("MPPlaylistControlLinkSeparator")
					)
					.append(
						(playlist_item.controls[3] = this.E("a", "MPPlaylistControlLink"))
						.html("S")
						.attr("title", "Soundcloud Link")
						.attr("href", playlist_item.mask_click_target)
						.attr("target", "_blank")
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
		this.on_media_add(playlist_item);

		// Done
		return playlist_item.index;
	},

	queue_load: function (url_or_file, load_tag, playlist_data, callback_data, progress_callback, done_callback, status_callback) {
		if (this.use_load_buffer) {
			// Queue load
			this.load_buffer.push([ url_or_file, load_tag, playlist_data, callback_data, progress_callback, done_callback, status_callback ]);

			// Timer
			this.queue_item_load();
		}
		else {
			// Immediate load
			this.attempt_load(url_or_file, load_tag, playlist_data, callback_data, progress_callback, done_callback, status_callback);
		}
	},
	queue_item_load: function () {
		if (this.load_buffer.length > 0) {
			if (!this.load_buffer_active) {
				this.load_buffer_active = true;

				// Status
				this.C(this.loaded_status_container, "MPLoadedStatusContainerActive");

				// Item
				var item = this.load_buffer[0];

				// Load
				this.attempt_load(item[0], item[1], item[2], item[3], item[4], item[5], item[6]);
			}
			this.loaded_status_count.html(this.load_buffer.length);
		}
	},
	queue_item_done: function (okay) {
		// Remove
		this.load_buffer.shift();

		// Next
		var self = this;
		this.load_buffer_timer = setTimeout(function () {
			self.load_buffer_timer = null;
			self.load_buffer_active = false;

			// Next
			if (self.load_buffer.length > 0) {
				self.queue_item_load();
			}
			else {
				self.unC(self.loaded_status_container, "MPLoadedStatusContainerActive");
			}
		}, 1);
	},
	attempt_load: function (url_or_file, load_tag, playlist_data, callback_data, progress_callback, done_callback, status_callback) {
		// Attempt to load from remote URL or local file
		if (typeof(url_or_file) == typeof("")) {
			// Youtube loading
			if (url_or_file.substr(0, 5) == "file:") {
				this.queue_item_done(false);
				return;
			}
			if (this.url_get_youtube_video_id(url_or_file)) {
				this.attempt_load_youtube_video(url_or_file, load_tag, playlist_data, callback_data, progress_callback, done_callback, status_callback);
				return;
			}
			if (this.url_get_vimeo_video_id(url_or_file)) {
				this.attempt_load_vimeo_video(url_or_file, load_tag, playlist_data, callback_data, progress_callback, done_callback, status_callback);
				return;
			}
			if (this.url_get_soundcloud_info(url_or_file)) {
				this.attempt_load_soundcloud_sound(url_or_file, load_tag, playlist_data, callback_data, progress_callback, done_callback, status_callback);
				return;
			}

			// Other
			var self = this;

			var dcb = function (okay, callback_data, response) {
				if (typeof(done_callback) == "function") done_callback(okay, callback_data, (okay ? null : response));

				if (okay) {
					self.attempt_load_raw(false, url_or_file, load_tag, playlist_data, response, 0, function (status, files) {
						if (typeof(status_callback) == "function") status_callback(status, callback_data, files);
					}, {});
				}
				else {
					self.queue_item_done(false);
				}
			};

			// URL
			this.ajax_get(url_or_file, false, callback_data, progress_callback, dcb);
		}
		else {
			// Local file
			var reader = new FileReader();
			var self = this;
			// Done function
			reader.onload = function () {
				// Convert and call load function
				var ui8_data = new Uint8Array(this.result);
				self.attempt_load_raw(true, url_or_file.name, load_tag, playlist_data, ui8_data, 0, function (status, files) {
					if (typeof(status_callback) == "function") status_callback(status, callback_data, files);
				}, {});
			}
			// Start
			reader.readAsArrayBuffer(url_or_file);
		}
	},
	attempt_load_raw: function (is_local, url_or_filename, load_tag, playlist_data, raw_ui8_data, callback_id, done_callback, extra_data) {
		callback_id = callback_id || 0;

		// Videncode check first if filename resembles format
		if (callback_id == 0 && this.filename_might_be_ve(url_or_filename) && !extra_data.ve_checked) {
			extra_data.ve_checked = true;
			this.attempt_load_ve(is_local, url_or_filename, load_tag, playlist_data, raw_ui8_data, callback_id, done_callback, extra_data);
			return;
		}

		if (callback_id >= this.load_callbacks.length) {
			// Videncode check last if not done yet
			if (!extra_data.ve_checked) {
				extra_data.ve_checked = true;
				this.attempt_load_ve(is_local, url_or_filename, load_tag, playlist_data, raw_ui8_data, callback_id, done_callback, extra_data);
				return;
			}

			if (typeof(done_callback) == "function") done_callback(false, null);
			this.queue_item_done(false);
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
						self.add_to_playlist(
							r[j]["title"],
							load_tag,
							r[j]["flagged"],
							url_or_filename,
							r[j]["index"],
							r[j]["data"],
							(is_local ? raw_ui8_data : url_or_filename),
							playlist_data
						);
					}
				}
				if (typeof(done_callback) == "function") done_callback(true, available);
				self.queue_item_done(r != null);
			}
			else {
				// Next
				self.attempt_load_raw(is_local, url_or_filename, load_tag, playlist_data, raw_ui8_data, callback_id + 1, done_callback, extra_data);
			}
		});
	},
	attempt_load_ve: function (is_local, url_or_filename, load_tag, playlist_data, raw_ui8_data, callback_id, done_callback, extra_data) {
		var self = this;
		var videcode = new Videcode(raw_ui8_data, url_or_filename);


		var callback = function () {
			if (!videcode.has_error()) {
				// Create availability list
				var available = [ (videcode.get_tag() || "?") + ".ogg" ];

				// Add
				self.add_to_playlist_ve(
					videcode,
					load_tag,
					(is_local ? null : url_or_filename),
					playlist_data
				);

				// Callback
				if (typeof(done_callback) == "function") done_callback(true, available);
				self.queue_item_done(true);

				// Don't continue
				return;
			}

			// Nothing detected
			self.attempt_load_raw(is_local, url_or_filename, load_tag, playlist_data, raw_ui8_data, callback_id, done_callback, extra_data);
		};


		if (this.videcode_async) {
			videcode.decode_async({steps: this.videcode_steps, delay: this.videcode_delay}, callback);
		}
		else {
			videcode.decode();
			callback.call(this);
		}
	},
	attempt_load_youtube_video: function (url, load_tag, playlist_data, callback_data, progress_callback, done_callback, status_callback) {
		var vid_id = this.url_get_youtube_video_id(url);

		// Not found
		if (vid_id === null) {
			if (typeof(done_callback) == "function") done_callback(false, callback_data, null);
			this.queue_item_done(false);
			return;
		}

		// Cached info
		if ("media_cache" in playlist_data) {
			if (typeof(done_callback) == "function") done_callback(true, callback_data, null);

			var xml = null;
			var status = this.add_to_playlist_ytvideo(url, vid_id, null, false, xml, playlist_data);
			if (typeof(status_callback) == "function") status_callback(status, callback_data, xml);
			this.queue_item_done(true);

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
				if (typeof(done_callback) == "function") done_callback(okay, callback_data, (okay ? null : response));

				if (okay) {
					var xml = $.parseXML(response);
					var status = self.add_to_playlist_ytvideo(url, vid_id, null, false, xml, playlist_data);
					if (typeof(status_callback) == "function") status_callback(status, callback_data, xml);
				}
				else {
					// Missing
				}
				self.queue_item_done(okay);
			}
		);
	},
	attempt_load_vimeo_video: function (url, load_tag, playlist_data, callback_data, progress_callback, done_callback, status_callback) {
		var vid_id = this.url_get_vimeo_video_id(url);

		// Not found
		if (vid_id === null) {
			if (typeof(done_callback) == "function") done_callback(false, callback_data, null);
			this.queue_item_done(false);
			return;
		}

		// Cached info
		if ("media_cache" in playlist_data) {
			if (typeof(done_callback) == "function") done_callback(true, callback_data, null);

			var xml = null;
			var status = this.add_to_playlist_vimeovideo(url, vid_id, null, false, xml, playlist_data);
			if (typeof(status_callback) == "function") status_callback(status, callback_data, xml);
			this.queue_item_done(true);

			return;
		}

		// Info
		var self = this;
		var info_url = "//vimeo.com/api/v2/video/" + vid_id + ".xml";
		this.ajax_get(
			info_url,
			true,
			callback_data,
			progress_callback,
			function (okay, data, response) {
				if (typeof(done_callback) == "function") done_callback(okay, callback_data, (okay ? null : response));

				if (okay) {
					var xml = $.parseXML(response);
					var status = self.add_to_playlist_vimeovideo(url, vid_id, null, false, xml, playlist_data);
					if (typeof(status_callback) == "function") status_callback(status, callback_data, xml);
				}
				else {
					// Missing
				}
				self.queue_item_done(okay);
			}
		);
	},
	attempt_load_soundcloud_sound: function (url, load_tag, playlist_data, callback_data, progress_callback, done_callback, status_callback) {
		var vid_id = this.url_get_soundcloud_info(url);

		// Not found
		if (vid_id === null) {
			if (typeof(done_callback) == "function") done_callback(false, callback_data, null);
			this.queue_item_done(false);
			return;
		}

		// Cached info
		if ("media_cache" in playlist_data) {
			if (typeof(done_callback) == "function") done_callback(true, callback_data, null);

			var json = null;
			var status = this.add_to_playlist_soundcloud_sound(url, vid_id, null, false, json, playlist_data);
			if (typeof(status_callback) == "function") status_callback(status, callback_data, json);
			this.queue_item_done(true);

			return;
		}

		// Info
		var self = this;
		var info_url = "//soundcloud.com/oembed?format=json&iframe=true&show_comments=false&show_artwork=false&show_user=false&show_playcount=false&sharing=false&download=false&liking=false&buying=false&url=" + url;
		this.ajax_get(
			info_url,
			true,
			callback_data,
			progress_callback,
			function (okay, data, response) {
				if (typeof(done_callback) == "function") done_callback(okay, callback_data, (okay ? null : response));

				if (okay) {
					var json = JSON.parse(response);
					var status = self.add_to_playlist_soundcloud_sound(url, vid_id, null, false, json, playlist_data);
					if (typeof(status_callback) == "function") status_callback(status, callback_data, json);
				}
				else {
					// Missing
				}
				self.queue_item_done(okay);
			}
		);
	},

	url_get_youtube_video_id: function (url) {
		var youtube_url = [
			/(?:https?:\/\/)?(?:www\.)?youtube.com\/watch\?(?:\S+?)?v=([a-zA-Z0-9_-]{11})(?:[^\s<>]*)/i,
			/(?:https?:\/\/)?(?:www\.)?y2u.be\/([a-zA-Z0-9_-]{11})(?:[^\s<]*)/i,
			/(?:https?:\/\/)?(?:www\.)?youtu.be\/([a-zA-Z0-9_-]{11})(?:[^\s<]*)/i
		];

		for (var i = 0; i < youtube_url.length; ++i) {
			var match;
			if ((match = youtube_url[i].exec(url)) !== null) {
				return match[1];
			}
		}

		return null;
	},
	url_get_vimeo_video_id: function (url) {
		var vimeo_url = [
			/(?:https?:\/\/)?(?:www\.)?(?:player\.)?vimeo.com\/(?:video\/)?([0-9]+)(?:[^\s<>]*)/i
		];

		for (var i = 0; i < vimeo_url.length; ++i) {
			var match;
			if ((match = vimeo_url[i].exec(url)) !== null) {
				return match[1];
			}
		}

		return null;
	},
	url_get_soundcloud_info: function (url) {
		var soundcloud_url = [
			/(?:https?:\/\/)?(?:www\.)?soundcloud.com\/?([^\s<>]+)(?:[\?\#](?:[^\s<>]*))?/i
		];

		for (var i = 0; i < soundcloud_url.length; ++i) {
			var match;
			if ((match = soundcloud_url[i].exec(url)) !== null) {
				return match[1];
			}
		}

		return null;
	},

	filename_might_be_ve: function (url) {
		return /\.(ve|ev)\.(png|gif|jpg|jpeg)$/i.test(url);
	},

	downloads_generate_image_list: function (files, about, gen_function, use_original, index) {
		if (index >= this.playlist.length) {
			// Done
			gen_function(files, about);
			return;
		}

		// Type
		if (this.playlist[index].type != "image-audio") {
			// Next
			this.downloads_generate_image_list(files, about, gen_function, use_original, index + 1);
			return;
		}

		// Make sure image is unique
		var image_url = this.playlist[index].image_url;
		for (var j = 0; j < files.length; ++j) {
			if (files[j][2] == image_url) {
				// Next
				this.downloads_generate_image_list(files, about, gen_function, use_original, index + 1);
				return;
			}
		}

		// Filename
		var fn = (use_original ? this.playlist[index].image_name : this.playlist[index].url.split("/").pop()).split(".");
		var ext = "." + fn.pop();
		fn = fn.join(".")
		try {
			fn = this.normalize_filename(unescape(encodeURIComponent(fn)));
		}
		catch (e) {
			console.log(e);
		}
		// Make sure it's unique
		var n = 1;
		var name = fn + ext;
		for (var j = 0; j < files.length; ++j) {
			if (name == files[j][0]) {
				name = fn + (fn.length > 0 ? " " : "") + "(" + (++n) + ")" + ext;
				j = -1;
				continue;
			}
		}
		fn = name;

		// Get file
		if (this.playlist[index].image_blob !== null) {
			// Add
			files.push([fn, this.playlist[index].image_blob, image_url]);

			// Next
			this.downloads_generate_image_list(files, about, gen_function, use_original, index + 1);
		}
		else {
			// Ajax query
			var self = this;
			this.ajax_get(this.playlist[index].image_url, false, null, null, function (okay, data, response) {
				if (okay) {
					// Add
					files.push([fn, response, image_url]);

					// Next
					self.downloads_generate_image_list(files, about, gen_function, use_original, index + 1);
				}
			});
		}
	},
	downloads_generate_link: function (files, zip_writer, about, index) {
		if (index >= files.length) {
			// Central directory + footer
			zip_writer.write_end();
			// Destroy blob
			if (this.batch_download_blob !== null) {
				(window.webkitURL || window.URL).revokeObjectURL(this.batch_download_blob_url);
			}
			this.batch_download_blob = null;
			// Create blob
			this.batch_download_blob = new Blob([zip_writer.buffer], {type: "application/zip"});
			this.batch_download_blob_url = (window.webkitURL || window.URL).createObjectURL(this.batch_download_blob);
			// Display
			this.downloads_ready_container.css("display", "");
			this.downloads_about.html(about(files));
			this.downloads_link.attr("href", this.batch_download_blob_url);
			this.downloads_link.attr("download", "batch.zip");
			this.downloads_link.attr("target", "_blank");
			// Done
			return;
		}

		if  (files[index][1] instanceof Uint8Array) {
			// Direct
			zip_writer.write_file(files[index][0], files[index][1]);
			this.downloads_generate_link(files, zip_writer, about, index + 1);
		}
		else {
			// Blob reading
			var self = this;
			var reader = new FileReader();
			// Done function
			reader.onload = function () {
				// Convert and call load function
				var ui8_data = new Uint8Array(this.result);
				zip_writer.write_file(files[index][0], ui8_data);
				self.downloads_generate_link(files, zip_writer, about, index + 1);
			};
			// Start
			reader.readAsArrayBuffer(files[index][1]);
		}
	},
	normalize_filename: function (fname) {
		var disallowed = "<>:\"/\\|?*\0";
		for (var i = 0; i < disallowed.length; ++i) {
			fname = fname.replace(new RegExp("\\" + disallowed[i], "gi"), "_");
		}

		return fname;
	},

	on_theatre_mode_hide_controls_timeout: function () {
		this.C(this.mp_container_main, "MPControlsForceHide");
		this.theatre_hide_controls_timer = null;
	},
	on_theatre_mode_mousemove: function (event) {
		event.data.media_player.unC(event.data.media_player.mp_container_main, "MPControlsForceHide");
		event.data.media_player.theatre_reset_controls_timer();
	},

	on_media_add: function (playlist_item) {
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
			this.start(playlist_item.index);
		}
	},
	on_media_end: function () {
		if (this.theatre_mode && this.theatre_vars.close_on_finish) {
			this.theatre_exit();
		}
	},

	on_ytvideo_ready: function (event, media_player) {
		// Startup settings
		event.target.unMute();
		event.target.setVolume(media_player.get_volume() * 100.0);
		event.target.setPlaybackQuality(media_player.ytvideo_qualities[media_player.ytvideo_quality_index]);

		// Auto-play
		//var vid_id = this.url_get_youtube_video_id(event.target.getVideoUrl());
		media_player.play();
	},
	on_ytvideo_time_update: function (playlist_item, media_player) {
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
	},
	on_ytvideo_state_change: function (event, media_player) {
		switch (event.data) {
			case unsafeWindow.YT.PlayerState.ENDED:
				media_player.update_playing_status();
				media_player.on_media_end();
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
	},
	on_ytvideo_playback_quality_change: function (event, media_player) {
	},
	on_ytvideo_playback_rate_change: function (event, media_player) {
	},
	on_ytvideo_error: function (event, media_player) {
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
	},
	on_ytvideo_api_change: function (event, media_player) {
	},

	on_vimeovideo_load_progress: function (data, video_player) {
		this.set_loaded(this.get_loaded_offset(), parseFloat(data.percent));
	},
	on_vimeovideo_play_progress: function (data, video_player) {
		if (!this.seek_dragging && !this.seek_exacting) {
			this.seek_to(parseFloat(data.seconds), true);
		}
	},
	on_vimeovideo_play: function (data, video_player) {
		this.vimeovideo_player_paused = false;
		this.update_playing_status();
	},
	on_vimeovideo_pause: function (data, video_player) {
		this.vimeovideo_player_paused = true;
		this.update_playing_status();
	},
	on_vimeovideo_finish: function (data, video_player) {
		this.vimeovideo_player_paused = true;
		this.update_playing_status();
		this.on_media_end();
		this.next(true);
	},
	on_vimeovideo_seek: function (data, video_player) {
		if (!this.seek_dragging && !this.seek_exacting) {
			this.seek_to(parseFloat(data.seconds), true);
		}
	},

	on_soundcloud_sound_ready: function (sound_player) {
		this.set_volume(this.get_volume());
		var params = { self: this, sound_player: sound_player };
		var fn = function (data) {
			data.sound_player.api_call("getDuration", function (len) {
				data.self.set_duration(len / 1000);
			});
		};

		if (this.soundcloud_unsafe) {
			_unsafe_exec(fn, params);
		}
		else {
			fn(params);
		}

		this.play();
	},
	on_soundcloud_sound_load_progress: function (data, sound_player) {
		this.set_loaded(this.get_loaded_offset(), data.loadedProgress);
	},
	on_soundcloud_sound_play_progress: function (data, sound_player) {
		if (!this.seek_dragging && !this.seek_exacting) {
			this.seek_to(data.currentPosition / 1000, true);
		}
	},
	on_soundcloud_sound_play: function (data, sound_player) {
		this.soundcloud_player_paused = false;
		this.update_playing_status();
	},
	on_soundcloud_sound_pause: function (data, sound_player) {
		this.soundcloud_player_paused = true;
		this.update_playing_status();
	},
	on_soundcloud_sound_finish: function (data, sound_player) {
		this.soundcloud_player_paused = true;
		this.update_playing_status();
		this.on_media_end();
		this.next(true);
	},
	on_soundcloud_sound_seek: function (data, sound_player) {
		if (!this.seek_dragging && !this.seek_exacting) {
			this.seek_to(data.currentPosition / 1000, true);
		}
	},

	on_audio_play: function (event) {
		// Update playing status
		event.data.media_player.update_playing_status();
	},
	on_audio_pause: function (event) {
		// Update playing status
		event.data.media_player.update_playing_status();
	},
	on_audio_ended: function (event) {
		if (!event.data.media_player.seek_exacting && !event.data.media_player.seek_dragging) {
			// Update playing status
			event.data.media_player.update_playing_status();
			// Next
			event.data.media_player.on_media_end();
			event.data.media_player.next(true);
		}
	},
	on_audio_timeupdate: function (event) {
		// Update seek bar
		event.data.media_player.seek_to(this.currentTime, true);
	},
	on_audio_durationchange: function (event) {
		// Update item
		var duration = event.data.media_player.get_audio_duration(event.data.media_player.audio[0]);

		// Seek
		event.data.media_player.set_duration(duration);
		event.data.media_player.seek_to(null, true);
	},
	on_temp_audio_durationchange: function (event) {
		// Get duration
		var duration = event.data.media_player.get_audio_duration(event.data.playlist_item.temp_audio[0]);
		event.data.playlist_item.duration = duration;

		// Stop, remove, and nullify
		event.data.playlist_item.temp_audio[0].pause();
		event.data.playlist_item.temp_audio.removeAttr("src").remove();
		event.data.playlist_item.temp_audio = null;

		var length_str = event.data.media_player.duration_to_string(duration);
		event.data.playlist_item.info_container.html(length_str);
	},
	on_temp_audio_error: function (event) {
		if (event.data.playlist_item.temp_audio !== null) {
			event.data.playlist_item.temp_audio.removeAttr("src").remove();
			event.data.playlist_item.temp_audio = null;

			event.data.media_player.remove(event.data.playlist_item.index);
		}
	},

	on_ve_load: function (playlist_item) {
		// Update image
		this.update_image_scale();

		// Update time
		var duration = playlist_item.vplayer.get_duration();

		// Seek
		this.set_duration(duration);
		this.seek_to(null, true);

		// Play
		playlist_item.vplayer.play();
	},
	on_ve_error: function (playlist_item) {
		// On error, remove
		if (playlist_item.temp_container != null) {
			playlist_item.vplayer.remove_html().clear_listeners();
			playlist_item.temp_container.remove();
			playlist_item.temp_container = null;

			this.remove(playlist_item.index);
		}
	},
	on_ve_play: function (playlist_item) {
		// Update playing status
		this.update_playing_status();
	},
	on_ve_pause: function (playlist_item) {
		// Update playing status
		this.update_playing_status();
	},
	on_ve_end: function (playlist_item) {
		if (!this.seek_exacting && !this.seek_dragging) {
			// Update playing status
			this.update_playing_status();
			// Next
			this.on_media_end();
			this.next(true);
		}
	},
	on_ve_timeupdate: function (playlist_item, data) {
		// Update seek bar
		this.seek_to(data.time, true);
	},
	on_temp_ve_load: function (playlist_item) {
		// On success, set the duration
		if (playlist_item.temp_container != null) {
			var duration = playlist_item.vplayer.get_duration();
			playlist_item.vplayer.remove_html().clear_listeners();
			playlist_item.temp_container.remove();
			playlist_item.temp_container = null;

			// Set
			playlist_item.duration = duration;

			var length_str = this.duration_to_string(duration);
			playlist_item.info_container.html(length_str);
		}
	},
	on_temp_ve_error: function (playlist_item) {
		// On error, remove
		if (playlist_item.temp_container != null) {
			playlist_item.vplayer.remove_html().clear_listeners();
			playlist_item.temp_container.remove();
			playlist_item.temp_container = null;

			this.remove(playlist_item.index);
		}
	},

	on_custom_option_click: function (event) {
		var v_id = 0;
		for (var j = 0; j < event.data.custom_data["values"].length; ++j) {
			if (event.data.custom_data["current"] == event.data.custom_data["values"][j]) {
				v_id = j;
				break;
			}
		}
		v_id = (v_id + 1) % event.data.custom_data["values"].length;

		$(this).html(event.data.custom_data["descr"][v_id]);

		event.data.custom_data["current"] = event.data.custom_data["values"][v_id];
		event.data.custom_data["change"](event.data.custom_data["values"][v_id]);
	},

	on_main_container_mouseover: function (event) {
		event.data.media_player.resize_container_hovered = true;
		event.data.media_player.on_resize_mouse_update(null, null);
	},
	on_main_container_mouseout: function (event) {
		event.data.media_player.resize_container_hovered = false;
		event.data.media_player.on_resize_mouse_update(null, null);
	},

	on_timer_resize_open: function () {
		this.resize_timers[0] = null;
		this.resize_should_close = false;

		// Update sizes
		var d;
		$("body").append(d = this.D("MPResizingSizeOff"));
		this.resize_sizes[0] = d.outerWidth();
		d.remove();
		$("body").append(d = this.D("MPResizingSizeAvailable"));
		this.resize_sizes[1] = d.outerWidth();
		d.remove();
		$("body").append(d = this.D("MPResizingContainerText").html("I"));
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
			this.unC(this.mp_container_main, "MPContainerMainBorders");
			this.resizing_container.css("display", "");

			// Size update loop
			var self = this;
			this.on_interval_resize_update();
			this.resize_timers[2] = setInterval(function () {
				self.on_interval_resize_update();
			}, Math.floor(this.resize_wait_times[2] * 1000));
		}
	},
	on_timer_resize_close: function () {
		this.resize_timers[1] = null;
		this.resize_should_close = true;
		this.resize_side_sizes_needed = true;
		this.resize_side_sizes_target = [ this.resize_sizes[0], this.resize_sizes[0], this.resize_sizes[0], this.resize_sizes[0] ];
		for (var i = 0; i < this.resizing_texts.length; ++i) {
			this.resizing_texts[i].css("display", "none");
		}
	},
	on_interval_resize_update: function () {
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

			this.C(this.mp_container_main, "MPContainerMainBorders");
			this.resizing_container.css("display", "none");

			return;
		}
	},
	on_resize_mouse_update: function (rel_x, rel_y) {
		if (rel_x !== null) this.resize_mouse_offset[0] = rel_x;
		else rel_x = this.resize_mouse_offset[0];
		if (rel_y !== null) this.resize_mouse_offset[1] = rel_y;
		else rel_y = this.resize_mouse_offset[1];

		var size = [ this.mp_container.outerWidth() , this.mp_container.outerHeight() ];
		var should_open = this.resizing && !this.theatre_mode;
		if (this.resize_container_hovered && !this.resizing && !this.theatre_mode) {
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
	},

	on_resizer_mousedown: function (event) {
		if (event.which == 1) {
			// Cannot be minimized
			if (!event.data.media_player.theatre_mode) {
				if (event.data.media_player.playlist_container.css("display") != "none") {
					event.data.media_player.resizing = true;
					event.data.media_player.resizing_sides = event.data.sides;
					event.data.media_player.mouse_offset = {
						"left": (event.pageX - $(document).scrollLeft()),
						"top": (event.pageY - $(document).scrollTop())
					};
					event.data.media_player.resizing_base_size = {
						//"width": event.data.media_player.mp_container.outerWidth() + event.data.media_player.resize_sizes[0] * 2,
						//"height": event.data.media_player.mp_container.outerHeight() + event.data.media_player.resize_sizes[0] * 2
						"width": event.data.media_player.mp_container_main.outerWidth(),
						"height": event.data.media_player.mp_container_main.outerHeight()
					};
				}
			}

			// Done
			return false;
		}
		return true;
	},

	on_titlebar_mousedown: function (event) {
		if (event.which == 1) {
			if (!event.data.media_player.theatre_mode) {
				// Mouse offset
				event.data.media_player.moving = true;
				event.data.media_player.mouse_offset = event.data.media_player.mp_container_main.offset();
				event.data.media_player.mouse_offset.left -= event.pageX;
				event.data.media_player.mouse_offset.top -= event.pageY;
			}

			// Done
			return false;
		}
		return true;
	},
	on_volumebar_mousedown: function (event) {
		if (event.which == 1) {
			// Mouse offset
			event.data.media_player.volume_changing = true;
			// Visuals
			event.data.media_player.C(event.data.media_player.volume_container, "MPVolumeContainerActive");
			// Change volume
			var volume = 1.0 - ((event.pageY) - event.data.media_player.volume_bar_container.offset().top) / event.data.media_player.volume_bar_container.outerHeight();
			event.data.media_player.set_volume(volume);
			// Done
			return false;
		}
		return true;
	},
	on_seekbar_mousedown: function (event) {
		if (event.which == 1) {
			// Mouse offset
			event.data.media_player.C(event.data.media_player.seek_bar, "MPSeekBarActive");
			event.data.media_player.C(event.data.media_player.playback_seek_indicator_container, "MPSeekIndicatorContainerDragging");
			event.data.media_player.seek_dragging = true;
			if ((event.data.media_player.seek_was_playing = !event.data.media_player.is_paused())) {
				event.data.media_player.pause();
			}
			event.data.media_player.mouse_offset = event.data.media_player.seek_bar.offset();
			event.data.media_player.mouse_offset.left -= event.pageX;
			event.data.media_player.mouse_offset.top -= event.pageY;
			// Done
			return false;
		}
		return true;
	},
	on_seekbar_mouseover: function (event) {
		if (event.data.media_player.current_media != null) {
			event.data.media_player.unC(event.data.media_player.playback_seek_indicator_container, "MPSeekIndicatorContainerDisabled");
			event.data.media_player.on_seekbar_mousemove.call(this, event);
		}

		return true;
	},
	on_seekbar_mouseout: function (event) {
		event.data.media_player.C(event.data.media_player.playback_seek_indicator_container, "MPSeekIndicatorContainerDisabled");

		return true;
	},
	on_seekbar_mousemove: function (event) {
		if (!event.data.media_player.seek_dragging && !event.data.media_player.seek_exacting && event.data.media_player.current_media != null) {
			var w = $(this).width();
			if (w > 0.0) {
				var time = (event.pageX - $(this).offset().left) / w * event.data.media_player.current_media.duration;

				event.data.media_player.update_seek_indicator(time);
			}
		}

		return true;
	},
	on_seekbar_container_mousedown: function (event) {
		if (event.which == 1) {
			// Mouse offset
			event.data.media_player.C(event.data.media_player.seek_bar, "MPSeekBarActive");
			event.data.media_player.C(event.data.media_player.playback_seek_indicator_container, "MPSeekIndicatorContainerDragging");
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
			return false;
		}
		return true;
	},
	on_image_resize_mousedown: function (event) {
		if (event.which == 1) {
			if (!event.data.media_player.theatre_mode) {
				// Mouse offset
				event.data.media_player.resizing_image = true;
				event.data.media_player.mouse_offset = event.data.media_player.mp_container_main.offset();
				event.data.media_player.mouse_offset.left -= event.pageX;
				event.data.media_player.mouse_offset.top -= event.pageY - (event.data.media_player.image_height * event.data.media_player.scale_factor);

				event.data.media_player.mouse_moved = false;
			}

			// Done
			return false;
		}
		return true;
	},
	on_image_resize_click: function (event) {
		if (event.which == 1) {
			if (event.data.media_player.theatre_mode) {
				// Play/pause when in theatre
				if (event.data.media_player.is_paused()) {
					event.data.media_player.play();
				}
				else {
					event.data.media_player.pause();
				}
			}
			return false;
		}
		if (event.which == 2) {
			if (!event.data.media_player.is_paused()) event.data.media_player.pause();
		}
		return true;
	},
	on_document_mouseup: function (event) {
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
			event.data.media_player.unC(event.data.media_player.volume_container, "MPVolumeContainerActive");
		}
		else if (event.data.media_player.seek_dragging) {
			event.data.media_player.seek_dragging = false;
			event.data.media_player.unC(event.data.media_player.seek_bar, "MPSeekBarActive");
			event.data.media_player.unC(event.data.media_player.playback_seek_indicator_container, "MPSeekIndicatorContainerDragging");

			event.data.media_player.seek_to(null, false, false);

			if (event.data.media_player.seek_was_playing) {
				event.data.media_player.play();
			}
		}
		else if (event.data.media_player.seek_exacting) {
			event.data.media_player.seek_exacting = false;
			event.data.media_player.unC(event.data.media_player.seek_bar, "MPSeekBarActive");
			event.data.media_player.unC(event.data.media_player.playback_seek_indicator_container, "MPSeekIndicatorContainerDragging");

			event.data.media_player.seek_to(null, false, false);

			if (event.data.media_player.seek_was_playing) {
				event.data.media_player.play();
			}
		}
		return true;
	},
	on_document_mousemove: function (event) {
		if (event.data.media_player.doc_mouse.x == event.pageX && event.data.media_player.doc_mouse.y == event.pageY) return true;
		event.data.media_player.doc_mouse.x = event.pageX;
		event.data.media_player.doc_mouse.y = event.pageY;

		if (event.data.media_player.theatre_mode) {
			event.data.media_player.on_theatre_mode_mousemove(event);
		}

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
			var size = event.data.media_player.mp_container_main.offset();
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
			// Seek time
			event.data.media_player.update_seek_indicator(offset);
		}
		else if (event.data.media_player.seek_exacting) {
			// Seeking
			var offset = ((event.pageX) - event.data.media_player.seek_bar_container.offset().left) - event.data.media_player.seek_bar.outerWidth() / 2.0;
			var max_offset = event.data.media_player.seek_bar_container.outerWidth() - event.data.media_player.seek_bar.outerWidth();
			// Seek
			if (max_offset > 0.0) offset = offset / max_offset * event.data.media_player.get_duration();
			event.data.media_player.seek_to(offset, false, true);
			// Seek time
			event.data.media_player.update_seek_indicator(offset);
		}

		if (event.data.media_player.resize_container_hovered) {
			var rel = event.data.media_player.mp_container.offset();
			rel.left -= event.pageX;
			rel.top -= event.pageY;

			event.data.media_player.on_resize_mouse_update(-rel.left, -rel.top);
		}

		return true;
	},
	on_window_resize: function (event) {
		// Keep on screen
		event.data.media_player.reposition();
	},

	on_image_load: function (event) {
		if ($(this).attr("src") && event.data.media_player.current_media != null) {
			// Loaded; scale
			event.data.media_player.current_media.image_size[0] = this.width;
			event.data.media_player.current_media.image_size[1] = this.height;

			event.data.media_player.update_image_scale();
			$(this).css("display", "");
		}
	},

	on_playlist_mode_change: function (event) {
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
	},
	on_playlist_onload_change: function (event) {
		// Change mode
		var v = (event.data.media_player.playlist_play_on_load + 1) % event.data.media_player.playlist_play_on_load_settings.length;
		event.data.media_player.playlist_play_on_load = v;

		// Label
		$(this).html(event.data.media_player.playlist_play_on_load_settings[event.data.media_player.playlist_play_on_load]);

		// Callback
		if (typeof(event.data.media_player.settings_callback) == "function") event.data.media_player.settings_callback(event.data.media_player);
	},
	on_playlist_scrollto_change: function (event) {
		// Change mode
		event.data.media_player.playlist_scrollto_onload = !event.data.media_player.playlist_scrollto_onload;

		// Label
		$(this).html(event.data.media_player.playlist_scrollto_onload ? "Scroll to in playlist" : "Don't scroll playlist");

		// Callback
		if (typeof(event.data.media_player.settings_callback) == "function") event.data.media_player.settings_callback(event.data.media_player);
	},
	on_ytquality_change: function (event) {
		// Change mode
		event.data.media_player.ytvideo_quality_index = (event.data.media_player.ytvideo_quality_index + 1) % event.data.media_player.ytvideo_qualities.length;

		if (event.data.media_player.ytvideo_player != null && event.data.media_player.ytvideo_player.setPlaybackQuality) {
			event.data.media_player.ytvideo_player.setPlaybackQuality(event.data.media_player.ytvideo_qualities[event.data.media_player.ytvideo_quality_index]);
		}

		// Label
		$(this).html(event.data.media_player.ytvideo_qualities[event.data.media_player.ytvideo_quality_index]);

		// Callback
		if (typeof(event.data.media_player.settings_callback) == "function") event.data.media_player.settings_callback(event.data.media_player);
	},
	on_player_theme_change: function (event) {
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
	},
	on_player_use_svg_update: function (event) {
		// Change mode
		event.data.media_player.use_svg = !event.data.media_player.use_svg;

		$(this).html(event.data.media_player.use_svg ? "Allowed" : "Disallowed");

		event.data.media_player.create_playback_controls();

		// Callback
		if (typeof(event.data.media_player.settings_callback) == "function") event.data.media_player.settings_callback(event.data.media_player);
	},

	on_playback_control_click: function (event) {
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
	},
	on_main_control_click: function (event) {
		switch (event.data.control_id) {
			case 0:
			{
				if (!event.data.media_player.is_maximized()) {
					event.data.media_player.maximize();
				}
				// Options
				var open = false;
				for (var i = 0; i < event.data.media_player.help_container.length; ++i) {
					if (event.data.media_player.help_container[i].css("display") != "none") {
						open = true;
						break;
					}
				}
				event.data.media_player.downloads_container.css("display", "none");
				if (open) {
					for (var i = 0; i < event.data.media_player.help_container.length; ++i) {
						event.data.media_player.help_container[i].css("display", "none");
					}
				}
				else {
					event.data.media_player.help_container[0].css("display", "");
					// Bottom offset (so not to be obscured by the footer)
					if (
						event.data.media_player.help_container_footer[0] &&
						event.data.media_player.help_container_inner1[0]
					) {
						event.data.media_player.help_container_inner1[0].css(
							"bottom", (event.data.media_player.help_container_footer[0].height()) + "px"
						);
					}
				}
			}
			break;
			case 1:
			{
				if (!event.data.media_player.is_maximized()) {
					event.data.media_player.maximize();
				}
				// Downloads
				var open = (event.data.media_player.downloads_container.css("display") == "none");
				for (var i = 0; i < event.data.media_player.help_container.length; ++i) {
					event.data.media_player.help_container[i].css("display", "none");
				}
				event.data.media_player.downloads_container.css("display", open ? "" : "none");
			}
			break;
			case 2:
			{
				if (event.data.media_player.is_in_theatre()) {
					event.data.media_player.theatre_exit();
				}
				else {
					event.data.media_player.theatre_enter({no_info: true});
				}
			}
			break;
			case 3:
			{
				if (event.data.media_player.is_maximized()) {
					event.data.media_player.minimize();
				}
				else {
					event.data.media_player.maximize();
				}
			}
			break;
			case 4:
			{
				// Close
				event.data.media_player.destroy(true);
			}
			break;
		}
	},
	on_helppage_goto: function (event) {
		for (var i = 0; i < event.data.media_player.help_container.length; ++i) {
			event.data.media_player.help_container[i].css("display", (event.data.help_page == i ? "" : "none"));
		}
	},

	on_playlist_item_click: function (event) {
		// Play
		if (event.which == 1) {
			event.data.media_player.start(event.data.playlist_item.index);
			return false;
		}
		return true;
	},

	on_playlist_control_click: function (event) {
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
				if (event.which == 1) {
					if (event.data.playlist_item.type == "image-audio") {
						event.stopPropagation();
						return true;
						/*prompt(
							"Right click and save as, or open in a new tab and save.\n" +
							"(Be sure to save as .ogg)",
							$(this).attr("href")
						);*/
					}
					else if (event.data.playlist_item.type == "youtube-video" || event.data.playlist_item.type == "vimeo-video") {
						event.stopPropagation();
						return true;
						//prompt("Right click/middle click to open. Original:", event.data.playlist_item.original_url);
					}
					else if (event.data.playlist_item.type == "ve") {
						event.stopPropagation();
						return true;
						/*prompt(
							"Right click and save as, or open in a new tab and save.\n" +
							"(Be sure to save as .ogg)",
							$(this).attr("href")
						);*/
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
			case 4:
			{
				// URL
				if (event.which == 1) {
					if (event.data.playlist_item.type == "image-audio") {
						event.stopPropagation();
						return true;
						/*prompt(
							"Right click and save as, or open in a new tab and save.\n",
							$(this).attr("href")
						);*/
					}
					else if (event.data.playlist_item.type == "ve") {
						event.stopPropagation();
						return true;
						/*prompt(
							"Right click and save as, or open in a new tab and save.\n" +
							"(Be sure to save as .webm)",
							$(this).attr("href")
						);*/
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
	},

	on_settings_color_change: function (event) {
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
	},
	on_settings_value_change: function (event) {
		var value = $(this).val();
		if (!event.data.is_string) {
			value = parseFloat(value);
			if (value != value) value = 0.0;
			if (event.data.bounds) {
				if (value < event.data.bounds[0] && event.data.bounds[0] !== null) value = event.data.bounds[0];
				else if (value > event.data.bounds[1] && event.data.bounds[1] !== null) value = event.data.bounds[1];
			}
			$(this).val(value);
		}

		// Set value
		var no_style = false;
		if (event.data.value_id[0] == "@") {
			var name = event.data.value_id.substr(1, event.data.value_id.length - 1);
			if (name == "scale_factor") {
				event.data.media_player.update_scale_factor(value);
			}
			else {
				event.data.media_player[name] = value;
				no_style = true;
			}
		}
		else {
			event.data.media_player.css.modify_value(false, event.data.value_id, value);
		}

		// Update stylesheet
		if (!no_style) {
			event.data.media_player.regen_stylesheet();
			event.data.media_player.reposition();
		}

		// Callback
		if (typeof(event.data.media_player.settings_callback) == "function") event.data.media_player.settings_callback(event.data.media_player);
	},

	on_container_drop: function (event) {
		// Close overlays
		event.data.media_player.alert_container.css("display", "none");
		event.data.media_player.downloads_container.css("display", "none");
		for (var i = 0; i < event.data.media_player.help_container.length; ++i) {
			event.data.media_player.help_container[i].css("display", "none")
		}

		// Load
		if (event.originalEvent.dataTransfer.files.length > 0) {
			for (var i = 0; i < event.originalEvent.dataTransfer.files.length; ++i) {
				event.data.media_player.queue_load(
					event.originalEvent.dataTransfer.files[i],
					MediaPlayer.ALL_SOUNDS,
					null, null, null, null, null
				);
			}
		}
		else {
			// URL
			var data = {
				text: event.originalEvent.dataTransfer.getData("text/plain"),
				callback_data: null,
				progress_callback: null,
				done_callback: null,
				status_callback: null,
			};
			event.data.media_player.drag_callback(data);
			if (data.text) {
				event.data.media_player.queue_load(
					data.text,
					MediaPlayer.ALL_SOUNDS,
					{},
					data.callback_data,
					data.progress_callback,
					data.done_callback,
					data.status_callback
				);
			}
		}

		// Done
		return false;
	},
	on_container_dragover: function (event) {
		event.originalEvent.dataTransfer.dropEffect = "move";
		// Done
		return false;
	},
	on_container_dragenter: function (event) {
		event.data.media_player.alert_container.css("display", "");
		// Done
		return false;
	},
	on_container_dragexit: function (event) {
		event.data.media_player.alert_container.css("display", "none");
		// Done
		return false;
	},

	on_downloads_generate_click: function (event) {
		var mp = event.data.media_player;
		if (mp.batch_download_blob !== null) {
			(window.webkitURL || window.URL).revokeObjectURL(mp.batch_download_blob_url);
		}
		mp.batch_download_blob = null;
		mp.downloads_ready_container.css("display", "none");

		// Generation function
		var gen_function = function (files, about) {
			// Get required size
			var total_length = 0;
			var comment = "";
			for (var i = 0; i < files.length; ++i) {
				total_length += 30 + files[i][0].length + (files[i][1].size || files[i][1].length || 0);
				total_length += 46 + files[i][0].length;
			}
			total_length += 22 + comment.length;

			// Attempt buffer create
			var buffer = null;
			try {
				buffer = new Uint8Array(new ArrayBuffer(total_length));
			}
			catch (e) {
				console.log(e);
				return false;
			}

			// Create
			var zw = new ZipWriter(buffer, comment);
			mp.downloads_generate_link(files, zw, about, 0);
		};

		// Generate filename list
		var files = [];
		var about = "";
		if (event.data.type == "sounds") {
			for (var i = 0; i < mp.playlist.length; ++i) {
				if (mp.playlist[i].type == "image-audio") {
					// Get the filename
					var fn = mp.playlist[i].title;
					var ext = ".ogg";
					try {
						fn = mp.normalize_filename(unescape(encodeURIComponent(fn)));
					}
					catch (e) {
						console.log(e);
					}
					// Make sure it's unique
					var n = 1;
					var name = fn + ext;
					for (var j = 0; j < files.length; ++j) {
						if (name == files[j][0]) {
							name = fn + (fn.length > 0 ? " " : "") + "(" + (++n) + ")" + ext;
							j = -1;
							continue;
						}
					}
					fn = name;
					// Add
					files.push([fn, mp.playlist[i].audio_blob]);
				}
			}

			about = function (files) {
				return " to download " + files.length + " sound" + (files.length == 1 ? "" : "s") + " (save as .zip)";
			};

			gen_function(files, about);
		}
		else { // images, images2
			about = function (files) {
				return " to download " + files.length + " image" + (files.length == 1 ? "" : "s") + " (save as .zip)";
			};

			mp.downloads_generate_image_list(files, about, gen_function, (event.data.type == "images2"), 0);
		}

		// Done
		return false;
	},
	on_downloads_link_click: function (event) {
		if (event.which == 1) {
			event.stopPropagation();
			return true;
		}
		return true;
	},

	cancel_event: function (event) {
		// Done
		return false;
	}
};
MediaPlayer.ALL_SOUNDS = true;



///////////////////////////////////////////////////////////////////////////////
// .zip archive writer
///////////////////////////////////////////////////////////////////////////////
function ZipWriter (buffer, comment) {
	this.buffer = buffer;
	this.comment = comment || "";
	this.date = new Date();
	this.pos = 0;
	this.offsets = new Array();
	this.crc32s = new Array();
	this.sizes = new Array();
	this.fnames = new Array();
};
ZipWriter.prototype = {
	constructor: ZipWriter,
	date_convert: function (date) {
		var mod_time = (Math.floor(date.getSeconds() / 2) | (date.getMinutes() << 5) | (date.getHours() << 11));
		var mod_date = ((date.getDate()) | ((date.getMonth() + 1) << 5) | ((date.getFullYear() - 1980) << 9));

		return [ mod_time , mod_date ];
	},
	write_end: function () {
		var date = this.date_convert(this.date);
		var cd_pos = this.pos;

		for (var i = 0; i < this.fnames.length; ++i) {
			this.write_data(0x02014b50, 4); // Signature
			this.write_data(20, 2); // Version
			this.write_data(20, 2); // Version required
			this.write_data(0, 2); // Flags
			this.write_data(0, 2); // Compression
			this.write_data(date[0], 2); // Mod time
			this.write_data(date[1], 2); // Mod date
			this.write_data(this.crc32s[i], 4); // CRC
			this.write_data(this.sizes[i], 4); // Compressed size
			this.write_data(this.sizes[i], 4); // Uncompressed size
			this.write_data(this.fnames[i].length, 2); // File name length
			this.write_data(0, 2); // Extra field length
			this.write_data(0, 2); // Comment length
			this.write_data(0, 2); // Disk number start
			this.write_data(0, 2); // Internal attr
			this.write_data(32, 4); // External attr
			this.write_data(this.offsets[i], 4); // Offset
			this.write_data(this.fnames[i]); // File name
		}

		// End
		var cd_end_pos = this.pos;
		this.write_data(0x06054b50, 4); // Signature
		this.write_data(0, 2); // Disk number
		this.write_data(0, 2); // Disk number with cd
		this.write_data(this.fnames.length, 2); // Disk entries
		this.write_data(this.fnames.length, 2); // Total entries
		this.write_data(cd_end_pos - cd_pos, 4); // cd size
		this.write_data(cd_pos, 4); // cd size
		this.write_data(this.comment.length, 2); // comment
		this.write_data(this.comment); // comment
	},
	write_file: function (filename, filedata) {
		var crc = this.crc32(filedata);
		this.offsets.push(this.pos);
		this.crc32s.push(crc);
		this.sizes.push(filedata.length);
		this.fnames.push(filename);

		var date = this.date_convert(this.date);

		this.write_data(0x04034b50, 4); // Signature
		this.write_data(20, 2); // Version
		this.write_data(0, 2); // Flags
		this.write_data(0, 2); // Compression
		this.write_data(date[0], 2); // Mod time
		this.write_data(date[1], 2); // Mod date
		this.write_data(crc, 4); // CRC
		this.write_data(filedata.length, 4); // Compressed size
		this.write_data(filedata.length, 4); // Uncompressed size
		this.write_data(filename.length, 2); // Filename length
		this.write_data(0, 2); // Comment length
		this.write_data(filename); // Filename
		this.write_data(filedata); // File data
	},
	write_data: function (data, bytes) {
		if (typeof(data) === typeof(0)) {
			data = data & 0xFFFFFFFF;
			for (var i = 0; i < bytes; ++i) {
				this.buffer[this.pos] = data & 0xFF;
				++this.pos;
				data = data >>> 8;
			}
		}
		else if (typeof(data) === typeof("")) {
			for (var i = 0; i < data.length; ++i) {
				this.buffer[this.pos] = data.charCodeAt(i);
				++this.pos;
			}
		}
		else {
			for (var i = 0; i < data.length; ++i) {
				this.buffer[this.pos] = data[i];
				++this.pos;
			}
		}
	},
	crc32: function (value) {
		var table = "00000000 77073096 EE0E612C 990951BA 076DC419 706AF48F E963A535 9E6495A3 0EDB8832 79DCB8A4 E0D5E91E 97D2D988 09B64C2B 7EB17CBD E7B82D07 90BF1D91 1DB71064 6AB020F2 F3B97148 84BE41DE 1ADAD47D 6DDDE4EB F4D4B551 83D385C7 136C9856 646BA8C0 FD62F97A 8A65C9EC 14015C4F 63066CD9 FA0F3D63 8D080DF5 3B6E20C8 4C69105E D56041E4 A2677172 3C03E4D1 4B04D447 D20D85FD A50AB56B 35B5A8FA 42B2986C DBBBC9D6 ACBCF940 32D86CE3 45DF5C75 DCD60DCF ABD13D59 26D930AC 51DE003A C8D75180 BFD06116 21B4F4B5 56B3C423 CFBA9599 B8BDA50F 2802B89E 5F058808 C60CD9B2 B10BE924 2F6F7C87 58684C11 C1611DAB B6662D3D 76DC4190 01DB7106 98D220BC EFD5102A 71B18589 06B6B51F 9FBFE4A5 E8B8D433 7807C9A2 0F00F934 9609A88E E10E9818 7F6A0DBB 086D3D2D 91646C97 E6635C01 6B6B51F4 1C6C6162 856530D8 F262004E 6C0695ED 1B01A57B 8208F4C1 F50FC457 65B0D9C6 12B7E950 8BBEB8EA FCB9887C 62DD1DDF 15DA2D49 8CD37CF3 FBD44C65 4DB26158 3AB551CE A3BC0074 D4BB30E2 4ADFA541 3DD895D7 A4D1C46D D3D6F4FB 4369E96A 346ED9FC AD678846 DA60B8D0 44042D73 33031DE5 AA0A4C5F DD0D7CC9 5005713C 270241AA BE0B1010 C90C2086 5768B525 206F85B3 B966D409 CE61E49F 5EDEF90E 29D9C998 B0D09822 C7D7A8B4 59B33D17 2EB40D81 B7BD5C3B C0BA6CAD EDB88320 9ABFB3B6 03B6E20C 74B1D29A EAD54739 9DD277AF 04DB2615 73DC1683 E3630B12 94643B84 0D6D6A3E 7A6A5AA8 E40ECF0B 9309FF9D 0A00AE27 7D079EB1 F00F9344 8708A3D2 1E01F268 6906C2FE F762575D 806567CB 196C3671 6E6B06E7 FED41B76 89D32BE0 10DA7A5A 67DD4ACC F9B9DF6F 8EBEEFF9 17B7BE43 60B08ED5 D6D6A3E8 A1D1937E 38D8C2C4 4FDFF252 D1BB67F1 A6BC5767 3FB506DD 48B2364B D80D2BDA AF0A1B4C 36034AF6 41047A60 DF60EFC3 A867DF55 316E8EEF 4669BE79 CB61B38C BC66831A 256FD2A0 5268E236 CC0C7795 BB0B4703 220216B9 5505262F C5BA3BBE B2BD0B28 2BB45A92 5CB36A04 C2D7FFA7 B5D0CF31 2CD99E8B 5BDEAE1D 9B64C2B0 EC63F226 756AA39C 026D930A 9C0906A9 EB0E363F 72076785 05005713 95BF4A82 E2B87A14 7BB12BAE 0CB61B38 92D28E9B E5D5BE0D 7CDCEFB7 0BDBDF21 86D3D2D4 F1D4E242 68DDB3F8 1FDA836E 81BE16CD F6B9265B 6FB077E1 18B74777 88085AE6 FF0F6A70 66063BCA 11010B5C 8F659EFF F862AE69 616BFFD3 166CCF45 A00AE278 D70DD2EE 4E048354 3903B3C2 A7672661 D06016F7 4969474D 3E6E77DB AED16A4A D9D65ADC 40DF0B66 37D83BF0 A9BCAE53 DEBB9EC5 47B2CF7F 30B5FFE9 BDBDF21C CABAC28A 53B39330 24B4A3A6 BAD03605 CDD70693 54DE5729 23D967BF B3667A2E C4614AB8 5D681B02 2A6F2B94 B40BBE37 C30C8EA1 5A05DF1B 2D02EF8D";
		var crc = 0;
		var y;

		var t = [];
		for (var i = 0; i < table.length; i += 9) {
			t.push(0 ^ ("0x" + table.substr(i, 8)));
		}

		crc = crc ^ (-1);
		var iMax = value.length;
		for (var i = 0; i < iMax; ++i) {
			y = (crc ^ value[i]) & 0xFF;
			crc = (crc >>> 8) ^ t[((crc ^ value[i]) & 0xFF)];
		}

		return (crc ^ (-1)) >>> 0;
	}
};



///////////////////////////////////////////////////////////////////////////////
// Vimeo video manager
///////////////////////////////////////////////////////////////////////////////
function VimeoManager (iframe) {
	var self = this;

	this.iframe = iframe;
	this.is_ready = false;
	this.ready_called = false;

	this.url = this.iframe.getAttribute("src").split("?")[0].split("#")[0];
	if (this.url.substr(0, 2) == "//") this.url = window.location.protocol + this.url;

	var url_parts = this.url.split("/");
	this.domain = "";
	for (var i = 0; i < url_parts.length; ) {
		this.domain += url_parts[i];
		if (++i >= 3) break;
		this.domain += "/";
	}

	this.on_message_received = function (event) {
		// event
		if (event.origin != self.domain) return false;
		self.handle_event(JSON.parse(event.data));
	};
	this.events = {};
	this.callbacks = {};

	// Message listeners
	if (window.addEventListener){
		window.addEventListener("message", this.on_message_received, false);
	}
	else {
		window.attachEvent("onmessage", this.on_message_received, false);
	}
}
VimeoManager.prototype = {
	constructor: VimeoManager,
	destructor: function () {
		if (window.addEventListener){
			window.removeEventListener("message", this.on_message_received, false);
		}
		else {
			window.detachEvent("onmessage", this.on_message_received, false);
		}
	},
	api_call: function (action, value) {
		var data = { "method": action };
		if (value) {
			if (typeof(value) == typeof(function(){})) {
				this.callbacks[action] = value;
			}
			else {
				data.value = value;
			}
		}
		this.iframe.contentWindow.postMessage(JSON.stringify(data), this.url);
	},
	add_event: function (name, callback) {
		this.events[name] = callback;
		if (this.is_ready) {
			if (name == "ready" && !this.ready_called) {
				this.ready_called = true;
				this.events[name].call(this, {});
			}
			// Add as listener
			this.api_call("addEventListener", name);
		}
	},
	handle_event: function (data) {
		if (data.method) {
			// Get callback
			if (data.method in this.callbacks) {
				this.callbacks[data.method].call(this, data.value);
				delete this.callbacks[data.method];
			}
			return;
		}
		if (data.event == "ready") {
			this.is_ready = true;
			this.ready_called = (data.event in this.events);
			// Add listeners
			for (var e in this.events) {
				this.api_call("addEventListener", e);
			}
		}
		if (data.event in this.events) {
			this.events[data.event].call(this, data.data);
		}
	}
};



///////////////////////////////////////////////////////////////////////////////
// Soundcloud video manager
///////////////////////////////////////////////////////////////////////////////
function SoundcloudManager (iframe) {
	var self = this;

	this.iframe = iframe;
	this.is_ready = false;
	this.ready_called = false;

	this.url = this.iframe.getAttribute("src").split("?")[0].split("#")[0];
	if (this.url.substr(0, 2) == "//") this.url = window.location.protocol + this.url;
	this.url = this.url.replace(/^http:/, "https:");

	var url_parts = this.url.split("/");
	this.domain = "";
	for (var i = 0; i < url_parts.length; ) {
		this.domain += url_parts[i];
		if (++i >= 3) break;
		this.domain += "/";
	}
	this.domain = this.domain.replace(/^http:/, "https:");

	this.on_message_received = function (event) {
		// event
		if (event.origin != self.domain) return false;
		self.handle_event(JSON.parse(event.data));
	};
	this.events = {};
	this.callbacks = {};

	// Message listeners
	if (window.addEventListener){
		window.addEventListener("message", this.on_message_received, false);
	}
	else {
		window.attachEvent("onmessage", this.on_message_received, false);
	}
}
SoundcloudManager.prototype = {
	constructor: SoundcloudManager,
	destructor: function () {
		if (window.addEventListener){
			window.removeEventListener("message", this.on_message_received, false);
		}
		else {
			window.detachEvent("onmessage", this.on_message_received, false);
		}
	},
	api_call: function (action, value) {
		var data = { "method": action };
		if (value) {
			if (typeof(value) == typeof(function(){})) {
				this.callbacks[action] = value;
			}
			else {
				data.value = value;
			}
		}
		this.iframe.contentWindow.postMessage(JSON.stringify(data), this.url);
	},
	add_event: function (name, callback) {
		this.events[name] = callback;
		if (this.is_ready) {
			if (name == "ready" && !this.ready_called) {
				this.ready_called = true;
				this.events[name].call(this, {});
			}
			// Add as listener
			this.api_call("addEventListener", name);
		}
	},
	handle_event: function (data) {
		var event = data.method;

		// Get callback
		if (event in this.callbacks) {
			this.callbacks[event].call(this, data.value);
			delete this.callbacks[event];
			return;
		}
		if (event == "ready") {
			this.is_ready = true;
			this.ready_called = (event in this.events);
			// Add listeners
			for (var e in this.events) {
				this.api_call("addEventListener", e);
			}
		}
		if (event in this.events) {
			this.events[event].call(this, data.value);
		}
	}
};


