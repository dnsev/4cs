///////////////////////////////////////////////////////////////////////////////
// Callback parameters are:
//
// (url_or_filename, load_tag, raw_ui8_data)
//
// url_or_filename: the url or local filename of the source
//        load_tag: the image tag to search for
//    raw_ui8_data: the source data to load from
//
//
// Callbacks returns are either null on failure, or an array structured like:
//
// [ { "title": ... , "flagged": ... , "index": ... , "data": ... } , ... ]
//
//   title: a string of the sound title
// flagged: true or false; true indicates the load_tag didn't match
//   index: the sound number inside the file (0 = first sound, 1 = second, ...)
//    data: a Uint8Array of the raw sound data
///////////////////////////////////////////////////////////////////////////////




///////////////////////////////////////////////////////////////////////////////
// Sound Player class
///////////////////////////////////////////////////////////////////////////////
function SoundPlayerCSS (preset, css_color_presets, css_size_presets) {
	// Stylesheet settings
	this.css_color_presets = css_color_presets;
	this.css_size_presets = css_size_presets;
	this.on_theme_change_callback = null;
	this.on_theme_change_callback_data = null;

	// Load
	this.load_preset(preset);

	// JSON stylesheet
	this.css_suffix = "";
	this.css = {
		".SPContainerMain": {
			"border-radius": "{exp:bg_outer_border_radius,*,border_scale}px",
			"padding": "{exp:bg_outer_size,*,padding_scale}px",
			"background": "{rgba:bg_outer_color}",
			"font-family": "{main_font}",
			"font-size": "{exp:font_size,*,font_scale}px",
			"position": "fixed",
			"color": "{hex:color_standard}",
			"z-index": "1000000"
		},
		".SPContainer": {
			"border-radius": "{exp:bg_inner_border_radius,*,border_scale}px",
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
		".SPMainButtonInfo": {
			"display": "inline-block",
			"padding": "{exp:1,*,padding_scale}px",
			"border-top-left-radius": "{exp:bg_inner_border_radius,*,border_scale}px",
			"text-decoration": "none",
			"cursor": "pointer",
			"height": "100%",
			"opacity": "0.0",
			"color": "{hex:color_disabled} !important",
			"background": "transparent"
		},
		".SPMainButtonInfo:hover": {
			"opacity": "1.0",
			"color": "{hex:color_light} !important",
			"background": "{rgba:bg_color_darker}"
		},
		".SPMainButtonInfo:active": {
			"opacity": "1.0",
			"color": "{hex:color_special_2} !important",
			"background": "{rgba:bg_color_darker}"
		},
		".SPMainButtonClose": {
			"display": "inline-block",
			"padding": "{exp:1,*,padding_scale}px",
			"border-top-right-radius": "{exp:bg_inner_border_radius,*,border_scale}px",
			"text-decoration": "none",
			"cursor": "pointer",
			"height": "100%",
			"opacity": "0.0",
			"color": "{hex:color_disabled} !important",
			"background": "transparent"
		},
		".SPMainButtonClose:hover": {
			"opacity": "1.0",
			"color": "{hex:color_light} !important",
			"background": "{rgba:bg_color_darker}"
		},
		".SPMainButtonClose:active": {
			"opacity": "1.0",
			"color": "{hex:color_special_2} !important",
			"background": "{rgba:bg_color_darker}"
		},
		".SPMainButtonMinMax": {
			"display": "inline-block",
			"padding": "{exp:1,*,padding_scale}px",
			"text-decoration": "none",
			"cursor": "pointer",
			"height": "100%",
			"opacity": "0.0",
			"color": "{hex:color_disabled} !important",
			"background": "transparent"
		},
		".SPMainButtonMinMax:hover": {
			"opacity": "1.0",
			"color": "{hex:color_light} !important",
			"background": "{rgba:bg_color_darker}"
		},
		".SPMainButtonMinMax:active": {
			"opacity": "1.0",
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
			"text-decoration": "none",
			"display": "inline-block",
			"border-radius": "{exp:border_radius_small,*,border_scale}px",
			"cursor": "pointer",
			"color": "{hex:color_standard}",
			"background": "transparent"
		},
		".SPControlLink:hover": {
			"color": "{hex:color_standard}",
			"background": "{rgba:bg_color_light}"
		},
		".SPControlLink:active": {
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

		".SPSeekContainer": {
			"position": "relative",
			"border-top": "{exp:1,*,border_scale}px solid {hex:bg_color_dark}",
			"border-bottom": "{exp:1,*,border_scale}px solid {hex:bg_color_dark}"
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
		".SPPlaylistControls": {
			"opacity": "0.0",
			"background": "transparent",
			"display": "inline-block",
			"color": "{hex:color_standard} !important",
			"padding": "{exp:1,*,padding_scale}px 0px {exp:1,*,padding_scale}px 0px"
		},
		".SPPlaylistItem:hover .SPPlaylistControls": {
			"opacity": "0.25"
		},
		".SPPlaylistItem:hover .SPPlaylistControls:hover, .SPPlaylistControls:active": {
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
			"background": "{rgba:bg_color_light} !important"
		},
		".SPPlaylistControls:hover .SPPlaylistControlLink:hover": {
			"color": "{hex:color_standard} !important",
			"background": "{rgba:bg_color_dark}"
		},
		".SPPlaylistControls:hover .SPPlaylistControlLink:active": {
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
			"padding": "{exp:1,*,padding_scale}px 0px {exp:1,*,padding_scale}px 0px"
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
		".SPHelpColorInput": {
			"width": "100% !important",
			"display": "inline-block !important",
			"padding": "0px !important",
			"margin": "0px !important",
			"font-size": "{exp:font_size,*,font_scale}px !important",
			"color": "{hex:color_standard} !important",
			"background": "{rgba:bg_color_lightest} !important",
			"text-align": "left !important",
			"font-family": "{main_font} !important",
			"border-style": "hidden !important",
			"border-width": "0px !important"
		},
		".SPHelpColorInput:hover .SPHelpColorInput:active": {
			"padding": "0px !important",
			"margin": "0px !important",
			"border-style": "hidden !important",
			"border-width": "0px !important"
		},

		".SPFooterBarContainer": {
			"position": "relative",
			"background": "{rgba:bg_color_light}",
			"text-align": "center",
			"height": "{exp:bg_inner_border_radius,*,border_scale}px",
			"border-bottom-left-radius": "{exp:bg_inner_border_radius,*,border_scale}px",
			"border-bottom-right-radius": "{exp:bg_inner_border_radius,*,border_scale}px",
			"cursor": "se-resize"
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
		}
	};
}
SoundPlayerCSS.prototype.create_stylesheet = function () {
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
SoundPlayerCSS.prototype.parse_out_values = function (value) {
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
SoundPlayerCSS.prototype.load_preset = function (preset_name) {
	this.preset = preset_name.replace(/[^a-zA-Z_]/g, "").toLowerCase();

	if (!(this.preset in this.css_color_presets)) {
		for (var key in this.css_color_presets) {
			this.preset = key;
			break;
		}
	}

	try {
		this.on_theme_change_callback(this.on_theme_change_callback_data);
	}
	catch (e) {}
}
SoundPlayerCSS.prototype.get_volume_colors = function () {
	return this.css_color_presets[this.preset].volume_colors;
}
SoundPlayerCSS.prototype.get_value = function (is_color, name) {
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
SoundPlayerCSS.prototype.create_custom = function () {
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

	// Load
	this.load_preset(preset);
}
SoundPlayerCSS.prototype.modify_value = function (is_color, name, value, component_index) {
	if (this.preset != "custom") this.create_custom();

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
SoundPlayerCSS.prototype.save = function () {
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
SoundPlayerCSS.prototype.load = function (data) {
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




function SoundPlayer (css, load_callbacks, settings_callback, destruct_callback, help_text) {
	// Not setup
	this.created = false;
	this.namespace = "sound_player";
	this.is_chrome = ((navigator.userAgent + "").indexOf(" Chrome/") >= 0);
	this.title_default =  "Sound Player"

	// Loading
	this.load_callbacks = [];
	if (load_callbacks) {
		for (var i = 0; i < load_callbacks.length; ++i) {
			this.load_callbacks.push(load_callbacks[i]);
		}
	}
	this.settings_callback = settings_callback;
	this.destruct_callback = destruct_callback;
	this.help_text = help_text || "";

	// html elements
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

	this.player_theme_value_updaters = null;

	// Dimension scaling
	this.scale_factor = 1.0;

	// Image
	this.image_height_min = 64;
	this.image_height_max = 128;
	this.image_height_default = this.image_height_max;
	this.image_height = this.image_height_default;

	// Size/position settings
	this.moving = false;
	this.resizing = false;
	this.position_offset = [ 0 , 0 ];
	this.player_width_default = 240;
	this.player_width = this.player_width_default;
	this.playlist_height_default = 200;
	this.playlist_height = this.playlist_height_default;
	this.player_width_min = 64;
	this.playlist_height_min = 0;
	this.playlist_play_on_load = 0; // 0 = no, 1 = if paused, 2 = always

	this.mouse_offset = null;

	// Volume settings (low -> high)
	this.volume = 0.5;
	this.volume_changing = false;

	// Seeking
	this.seek_exacting = false;
	this.seek_dragging = false;

	// Playlist
	this.playlist = [];
	this.playlist_loop = true;
	this.playlist_randomize = false;

	// Current
	this.current_image_width = 0;
	this.current_image_height = 0;
	this.current_sound = null;
	this.current_sound_length = 0;
	this.current_sound_duration = 0.0;
	this.current_sound_position = 0.0;

	// CSS
	this.css = css;
	this.css.on_theme_change_callback = this.update_player_theme_name;
	this.css.on_theme_change_callback_data = {sound_player: this};
	$("head").append((this.head_css = this.E("style").html(this.css.create_stylesheet())));
}
SoundPlayer.prototype.destructor = function () {
	// Callback
	try {
		this.destruct_callback(this);
	}
	catch (e) {}
	this.destruct_callback = null;

	// Destroy
	this.destroy();
	try {
		this.head_css.remove();
	}
	catch (e) {}
	this.head_css = null;
}

SoundPlayer.ALL_SOUNDS = true;

SoundPlayer.prototype.save = function () {
	// Save
	var data = {
		"volume": this.volume,
		"playlist_height": this.playlist_height,
		"player_width": this.player_width,
		"image_height": this.image_height,
		"scale_factor": this.scale_factor,
		"playlist_loop": this.playlist_loop,
		"playlist_randomize": this.playlist_randomize,
		"playlist_play_on_load": this.playlist_play_on_load,
		"position_offset": [ this.position_offset[0] , this.position_offset[1] ]
	};

	// Done
	return data;
}
SoundPlayer.prototype.load = function (data) {
	// Load
	if ("volume" in data) this.volume = data["volume"];
	if ("playlist_loop" in data) this.playlist_loop = data["playlist_loop"];
	if ("playlist_randomize" in data) this.playlist_randomize = data["playlist_randomize"];
	if ("playlist_play_on_load" in data) this.playlist_play_on_load = data["playlist_play_on_load"];

	if ("scale_factor" in data) this.scale_factor = data["scale_factor"];
	if ("player_width" in data) this.player_width = data["player_width"];
	if ("image_height" in data) this.image_height = data["image_height"];
	if ("playlist_height" in data) this.playlist_height = data["playlist_height"];	

	if ("position_offset" in data) {
		this.position_offset[0] = data["position_offset"][0];
		this.position_offset[1] = data["position_offset"][1];
	}
}

SoundPlayer.prototype.create = function () {
	// Destroy if necessary
	if (this.created) this.destroy();


	// Events
	$(window).on("resize." + this.namespace, {sound_player: this}, this.on_window_resize);
	$(document).on("mouseup." + this.namespace, {sound_player: this}, this.on_document_mouseup);
	$(document).on("mousemove." + this.namespace, {sound_player: this}, this.on_document_mousemove);


	// Container
	$("body").append((this.sp_container_main = this.D("SPContainerMain")));
	this.sp_container_main.width(this.player_width * this.scale_factor);
	this.sp_container_main.css({"right": this.position_offset[0], "bottom": this.position_offset[1]});
	this.sp_container_main.on("dragover." + this.namespace, {sound_player: this}, this.on_container_dragover);
	this.sp_container_main.on("dragenter." + this.namespace, {sound_player: this}, this.on_container_dragenter);
	this.sp_container_main.on("dragexit." + this.namespace, {sound_player: this}, this.on_container_dragexit);
	this.sp_container_main.on("drop." + this.namespace, {sound_player: this}, this.on_container_drop);
	this.sp_container_main.append((this.sp_container = this.D("SPContainer")));


	// Title bar
	var title_bar_container, title_container, title_buttons_left, title_buttons_right, title_buttons;
	this.sp_container.append((title_bar_container = this.D("SPTitleBarContainer")));
	title_buttons = [ null , null , null ];
	title_bar_container.append((title_container = this.D("SPTitleContainer")));
	title_container.append((this.title = this.D("SPTitle").html(this.title_default)));
	title_bar_container.append((title_buttons_left = this.D("SPMainButtonsLeft")));
	title_bar_container.append((title_buttons_right = this.D("SPMainButtonsRight")));
	title_buttons_left.append((title_buttons[0] = this.E("a", "SPMainButtonInfo").html("[?]")));
	title_buttons_right.append((title_buttons[1] = this.E("a", "SPMainButtonMinMax").html("[&#x2012;]")));
	title_buttons_right.append((title_buttons[2] = this.E("a", "SPMainButtonClose").html("[&times;]")));
	title_bar_container.on("mousedown." + this.namespace, {sound_player: this}, this.on_titlebar_mousedown);
	for (var i = 0; i < title_buttons.length; ++i) {
		title_buttons[i].on("mousedown", this.cancel_event);
		title_buttons[i].on("click." + this.namespace, {sound_player: this, control_id: i}, this.on_main_control_click);
	}

	// Content
	this.sp_container.append((this.content_container = this.D("SPContentContainer")));
	this.content_container.append((this.top_container = this.D("SPTopContainer")));

	// Image
	var image_container_main;
	this.top_container.append((image_container_main = this.D("SPImageContainerMain")));
	image_container_main.append((this.image_container = this.D("SPImageContainer")));
	this.image_container.append((this.no_image = this.D("SPNoImage")));
	this.image_container.append((this.image = this.E("img", "SPImage").attr("title", "").attr("alt", "").css("display", "none")));
	this.no_image.append((this.D("SPNoImageText").html("[no sound]")));
	this.image_container.height(this.image_height_max * this.scale_factor);
	this.image.on("load." + this.namespace, {sound_player: this}, this.on_image_load);
	this.image.on("mousedown", this.cancel_event);

	// Audio
	this.top_container.append((this.audio = this.E("audio").css("display", "none")));
	this.audio.attr("playing", false);
	this.audio.on("play." + this.namespace, {sound_player: this}, this.on_audio_play);
	this.audio.on("pause." + this.namespace, {sound_player: this}, this.on_audio_pause);
	this.audio.on("ended." + this.namespace, {sound_player: this}, this.on_audio_ended);
	this.audio.on("timeupdate." + this.namespace, {sound_player: this}, this.on_audio_timeupdate);
	this.audio.on("durationchange." + this.namespace, {sound_player: this}, this.on_audio_durationchange);

	// Controls
	var control_container;
	this.playback_controls = [ null , null , null , null , null ];
	image_container_main.append((control_container = this.D("SPControlContainer")));
	control_container.append((this.playback_control_container = this.D("SPControlContainerInner")));
	this.playback_control_container.append((this.playback_controls[0] = this.E("a", "SPControlLink", "SPControlLinkDisabled").html("|&lt;")));
	this.playback_control_container.append((this.D("SPControlLinkSeparator")));
	this.playback_control_container.append((this.playback_controls[1] = this.E("a", "SPControlLink", "SPControlLinkDisabled").html("&lt;&lt;")));
	this.playback_control_container.append((this.D("SPControlLinkSeparator")));
	this.playback_control_container.append((this.playback_controls[2] = this.E("a", "SPControlLink", "SPControlLinkDisabled").html("&gt;")));
	this.playback_control_container.append((this.D("SPControlLinkSeparator")));
	this.playback_control_container.append((this.playback_controls[3] = this.E("a", "SPControlLink", "SPControlLinkDisabled").html("&gt;&gt;")));
	this.playback_control_container.append((this.D("SPControlLinkSeparator")));
	this.playback_control_container.append((this.playback_controls[4] = this.E("a", "SPControlLink", "SPControlLinkDisabled").html("&gt;|")));
	for (var i = 0; i < this.playback_controls.length; ++i) {
		this.playback_controls[i].on("click." + this.namespace, {control_id: i, sound_player: this}, this.on_playback_control_click);
		this.playback_controls[i].on("mousedown", this.cancel_event);
	}

	// Volume bar
	var volume_label_container;
	this.top_container.append((this.volume_container = this.D("SPVolumeContainer")));
	this.volume_container.append((this.volume_bar_container = this.D("SPVolumeBarContainer")));
	this.volume_bar_container.append((this.volume_bar = this.D("SPVolumeBar")));
	this.volume_container.append((volume_label_container = this.D("SPVolumeLabelContainer")));
	volume_label_container.append((this.D("SPVolumeLabel").html("Vol")));
	volume_label_container.append((this.volume_label = this.D("SPVolumeValue").html("100%")));
	this.set_volume(this.volume);
	this.volume_bar_container.on("mousedown." + this.namespace, {sound_player: this}, this.on_volumebar_mousedown);

	// Seek bar
	var seek_container, time_container;
	this.content_container.append((seek_container = this.D("SPSeekContainer")));
	seek_container.append((time_container = this.D("SPSeekTimeContainer")));
	time_container.append((this.seek_time_start_label = this.D("SPSeekTimeLeft").html("0:00")));
	time_container.append((this.seek_time_end_label = this.D("SPSeekTimeRight").html("0:00")));
	time_container.append((this.seek_time_current_label = this.D("SPSeekTime").html("0:00")));
	seek_container.append((this.seek_bar_container = this.D("SPSeekBarContainer")));
	this.seek_bar_container.append((this.seek_bar_mover = this.D("SPSeekBarMover")));
	this.seek_bar_container.append((this.seek_bar = this.D("SPSeekBar")));
	this.seek_bar.on("mousedown." + this.namespace, {sound_player: this}, this.on_seekbar_mousedown);
	this.seek_bar_container.on("mousedown." + this.namespace, {sound_player: this}, this.on_seekbar_container_mousedown);

	// Playlist
	this.content_container.append((this.playlist_container = this.D("SPPlaylistContainer")));
	this.playlist_container.height(this.playlist_height * this.scale_factor);
	this.playlist_container.on("mousedown", this.cancel_event);


	// Help
	var help_div0, help_div1, help_div2, help_div3, help_div4;
	this.help_container = [ null , null , null ];


	// Help 0
	this.player_theme_value_updaters = new Array();

	this.content_container.append((this.help_container[0] = this.D("SPHelpContainer")));
	this.help_container[0].css("display", "none");
	if (this.help_text.length > 0) {
		this.help_container[0].append((this.D("SPHelpLabelDiv").html("About")));
		this.help_container[0].append((this.D("SPHelpTextDiv").html(this.help_text)));
	}
	this.help_container[0].append((help_div0 = this.D("SPHelpLinkDiv")));

	help_div0.append((help_div1 = this.D("SPHelpLabelDiv").html("Playlist Settings")));
	help_div0.append((help_div1 = this.D("SPHelpSectionDiv")));
	help_div1.append((help_div2 = this.D("SPHelpColorInputDiv0")));
	help_div2.append((help_div3 = this.D("SPHelpColorInputDiv2b")));
	help_div3.append((this.D("SPHelpColorLabelText").html("Mode")));
	help_div1.append((help_div2 = this.D("SPHelpColorInputDiv1Full")));
	help_div2.append((help_div3 = this.D("SPHelpColorInputDiv2")));
	help_div3.append((help_div4 = this.E("a", "SPHelpModeLink").html(this.playlist_randomize ? "Randomize" : (this.playlist_loop ? "Loop" : "Play Once"))));
	help_div4.on("click." + this.namespace, {sound_player: this}, this.on_playlist_mode_change);
	help_div4.on("mousedown", this.cancel_event);

	help_div0.append((help_div1 = this.D("SPHelpSectionDiv")));
	help_div1.append((help_div2 = this.D("SPHelpColorInputDiv0")));
	help_div2.append((help_div3 = this.D("SPHelpColorInputDiv2b")));
	help_div3.append((this.D("SPHelpColorLabelText").html("On Load")));
	help_div1.append((help_div2 = this.D("SPHelpColorInputDiv1Full")));
	help_div2.append((help_div3 = this.D("SPHelpColorInputDiv2")));
	help_div3.append((help_div4 = this.E("a", "SPHelpModeLink").html(this.playlist_play_on_load == 0 ? "Don't play" : (this.playlist_play_on_load == 1 ? "Play if paused" : "Always play"))));
	help_div4.on("click." + this.namespace, {sound_player: this}, this.on_playlist_onload_change);
	help_div4.on("mousedown", this.cancel_event);

	help_div0.append((help_div1 = this.D("SPHelpLabelDiv").html("Player Settings")));
	help_div0.append((help_div1 = this.D("SPHelpSectionDiv")));
	help_div1.append((help_div2 = this.D("SPHelpColorInputDiv0")));
	help_div2.append((help_div3 = this.D("SPHelpColorInputDiv2b")));
	help_div3.append((this.D("SPHelpColorLabelText").html("Theme")));
	help_div1.append((help_div2 = this.D("SPHelpColorInputDiv1Full")));
	help_div2.append((help_div3 = this.D("SPHelpColorInputDiv2")));
	help_div3.append((this.player_theme_name = this.E("a", "SPHelpModeLink")));
	this.player_theme_name.on("click." + this.namespace, {sound_player: this}, this.on_player_theme_change);
	this.player_theme_name.on("mousedown", this.cancel_event);
	this.update_player_theme_name({sound_player: this});

	help_div0.append((help_div1 = this.D("SPHelpLabelDiv").html("Scaling Settings")));
	this.generate_value_editor(help_div0, "Padding", "padding_scale", this.css.css_size_presets[this.css.preset].padding_scale, false);
	this.generate_value_editor(help_div0, "Text", "font_scale", this.css.css_size_presets[this.css.preset].font_scale, false);
	this.generate_value_editor(help_div0, "Borders", "border_scale", this.css.css_size_presets[this.css.preset].border_scale, false);
	this.generate_value_editor(help_div0, "Window", "@scale_factor", this.scale_factor, false);
	help_div0.append((help_div1 = this.D("SPHelpLabelDiv").html("More Settings")));
	help_div0.append((help_div1 = this.D("SPHelpSectionDiv")));
	help_div1.append((help_div2 = this.E("A", "SPHelpTextLink").html("Color Settings")));
	help_div2.on("click." + this.namespace, {sound_player: this, help_page: 1}, this.on_helppage_goto);
	help_div1.append((help_div2 = this.E("A", "SPHelpTextLink").html("Other Settings")));
	help_div2.on("click." + this.namespace, {sound_player: this, help_page: 2}, this.on_helppage_goto);

	// Help 1
	this.content_container.append((this.help_container[1] = this.D("SPHelpContainer")));
	this.help_container[1].css("display", "none");
	this.help_container[1].append((help_div1 = this.D("SPHelpLabelDiv").html("Background Colors")));
	this.generate_color_editor(this.help_container[1], "Outline", "bg_outer_color", this.css.css_color_presets[this.css.preset].bg_outer_color);
	this.generate_color_editor(this.help_container[1], "Lightest", "bg_color_lightest", this.css.css_color_presets[this.css.preset].bg_color_lightest);
	this.generate_color_editor(this.help_container[1], "Light", "bg_color_light", this.css.css_color_presets[this.css.preset].bg_color_light);
	this.generate_color_editor(this.help_container[1], "Medium", "bg_color_dark", this.css.css_color_presets[this.css.preset].bg_color_dark);
	this.generate_color_editor(this.help_container[1], "Dark", "bg_color_darker", this.css.css_color_presets[this.css.preset].bg_color_darker);
	this.generate_color_editor(this.help_container[1], "Darkest", "bg_color_darkest", this.css.css_color_presets[this.css.preset].bg_color_darkest);
	this.help_container[1].append((help_div1 = this.D("SPHelpLabelDiv").html("Text Colors")));
	this.generate_color_editor(this.help_container[1], "Default", "color_standard", this.css.css_color_presets[this.css.preset].color_standard);
	this.generate_color_editor(this.help_container[1], "Disabled", "color_disabled", this.css.css_color_presets[this.css.preset].color_disabled);
	this.generate_color_editor(this.help_container[1], "Light", "color_light", this.css.css_color_presets[this.css.preset].color_light);
	this.generate_color_editor(this.help_container[1], "Special 1", "color_special_1", this.css.css_color_presets[this.css.preset].color_special_1);
	this.generate_color_editor(this.help_container[1], "Special 2", "color_special_2", this.css.css_color_presets[this.css.preset].color_special_2);
	this.generate_color_editor(this.help_container[1], "Highlight", "color_highlight_light", this.css.css_color_presets[this.css.preset].color_highlight_light);
	this.help_container[1].append((help_div1 = this.D("SPHelpLabelDiv").html("Other Colors")));
	this.generate_color_editor(this.help_container[1], "Volume", "volume_colors[0]", this.css.css_color_presets[this.css.preset].volume_colors[0]);

	// Help 2
	this.content_container.append((this.help_container[2] = this.D("SPHelpContainer")));
	this.help_container[2].css("display", "none");
	this.help_container[2].append((help_div1 = this.D("SPHelpLabelDiv").html("Borders")));
	this.generate_value_editor(this.help_container[2], "Outer", "bg_outer_size", this.css.css_size_presets[this.css.preset].bg_outer_size, false);
	this.help_container[2].append((help_div1 = this.D("SPHelpLabelDiv").html("Border Radii")));
	this.generate_value_editor(this.help_container[2], "Outer", "bg_outer_border_radius", this.css.css_size_presets[this.css.preset].bg_outer_border_radius, false);
	this.generate_value_editor(this.help_container[2], "Inner", "bg_inner_border_radius", this.css.css_size_presets[this.css.preset].bg_inner_border_radius, false);
	this.generate_value_editor(this.help_container[2], "Major", "border_radius_normal", this.css.css_size_presets[this.css.preset].border_radius_normal, false);
	this.generate_value_editor(this.help_container[2], "Minor", "border_radius_small", this.css.css_size_presets[this.css.preset].border_radius_small, false);
	this.help_container[2].append((help_div1 = this.D("SPHelpLabelDiv").html("Fonts")));
	this.generate_value_editor(this.help_container[2], "Font", "main_font", this.css.css_size_presets[this.css.preset].main_font, true);
	this.generate_value_editor(this.help_container[2], "Controls", "controls_font", this.css.css_size_presets[this.css.preset].controls_font, true);
	this.help_container[2].append((help_div1 = this.D("SPHelpLabelDiv").html("Font Sizes")));
	this.generate_value_editor(this.help_container[2], "Default", "font_size", this.css.css_size_presets[this.css.preset].font_size, false);
	this.generate_value_editor(this.help_container[2], "Small", "font_size_small", this.css.css_size_presets[this.css.preset].font_size_small, false);
	this.generate_value_editor(this.help_container[2], "Controls", "font_size_controls", this.css.css_size_presets[this.css.preset].font_size_controls, false);


	// Footer bar
	this.sp_container.append((this.footer_container = this.D("SPFooterBarContainer")));
	this.footer_container.on("mousedown." + this.namespace, {sound_player: this}, this.on_footerbar_mousedown);


	// Alert screen
	this.sp_container.append((this.alert_container = this.D("SPAlertContainer")));
	this.alert_container.append((this.D("SPAlertContentContainer").html("Drop Files<br />Here")));
	this.alert_container.css("display", "none");


	// Done
	this.created = true;
}
SoundPlayer.prototype.destroy = function () {
	// Remove html
	if (this.sp_container_main != null) this.sp_container_main.remove();

	// Playlist clear
	while (this.playlist.length > 0) {
		this.remove_from_playlist(0);
	}

	// Events
	$(window).off("resize." + this.namespace);
	$(document).off("mouseup." + this.namespace);
	$(document).off("mousemove." + this.namespace);

	// Reset attributes
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

	this.player_theme_value_updaters = null;

	// Not created
	this.created = false;
}

SoundPlayer.prototype.focus = function () {
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


SoundPlayer.prototype.get_audio_duration = function () {
	try {
		if (this.is_chrome) {
			return (this.audio[0].duration == this.audio[0].duration ? this.audio[0].duration : 0);
		}
		return this.audio[0].buffered.end(0);
	}
	catch (e) {
		return 0;
	}
}

SoundPlayer.prototype.regen_stylesheet = function () {
	this.head_css.html(this.css.create_stylesheet());
	var vol_col = this.get_volume_color(this.volume);
	this.volume_bar.css("background", "rgb(" + vol_col[0] + "," + vol_col[1] + "," + vol_col[2] + ")");
}

SoundPlayer.prototype.get_volume_color = function (percent) {
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
SoundPlayer.prototype.reposition = function (left, top) {
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
SoundPlayer.prototype.resize_to = function (width, height) {
	// Current size
	var current_size = [ this.sp_container_main.outerWidth() , this.sp_container_main.outerHeight() ];
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
	this.update_image_scale();
	this.position_offset[1] -= (playlist_height_target - playlist_size[1]) + (image_height_target - image_size[1]);


	// Width change
	if (width < this.player_width_min * this.scale_factor) {
		width = this.player_width_min * this.scale_factor;
	}

	// Update width
	this.player_width = width / this.scale_factor;
	this.sp_container_main.outerWidth(width);
	this.position_offset[0] -= (width - current_size[0]);

	// Update position
	this.sp_container_main.css({"right": this.position_offset[0], "bottom": this.position_offset[1]});
}
SoundPlayer.prototype.set_volume = function (volume) {
	if (volume < 0.0) volume = 0.0;
	else if (volume > 1.0) volume = 1.0;
	this.volume = volume;

	var vol_str, vol_col;
	vol_str = Math.round(this.volume * 100) + "%";
	vol_col = this.get_volume_color(this.volume);
	this.volume_label.html(vol_str);
	this.volume_bar.css("height", vol_str);
	this.volume_bar.css("background", "rgb(" + vol_col[0] + "," + vol_col[1] + "," + vol_col[2] + ")");

	// Set volume
	this.audio[0].volume = this.volume;
}
SoundPlayer.prototype.seek = function (position, seek_in_sound) {
	// Adjust
	if (position < 0.0) position = 0.0;
	else if (position > 1.0) position = 1.0;

	// Seek bar
	this.seek_bar_mover.width(position * (this.seek_bar_container.outerWidth() - this.seek_bar.outerWidth()));

	// Current
	this.seek_time_current_label.html(this.duration_to_string(position * this.current_sound_length));

	// Seek in song
	if (seek_in_sound) {
		this.current_sound_position = this.current_sound_duration * position;
		try {
			this.audio[0].currentTime = this.current_sound_position;
		}
		catch (e) {}
	}
}
SoundPlayer.prototype.update_playing_status = function () {
	if (this.audio[0].paused) {
		this.playback_controls[2].html("&gt;");
	}
	else {
		this.playback_controls[2].html("||");	
	}
}
SoundPlayer.prototype.update_scale_factor = function (scale_factor) {
	this.scale_factor = scale_factor;

	this.sp_container_main.outerWidth(this.player_width * this.scale_factor);
	this.playlist_container.outerHeight(this.playlist_height * this.scale_factor);
	this.image_container.outerHeight(this.image_height * this.scale_factor);
	// rescale image
	this.update_image_scale();
}
SoundPlayer.prototype.update_image_scale = function () {
	var xs = (this.image_container.outerWidth() / this.current_image_width);
	var ys = (this.image_height * this.scale_factor / this.current_image_height);
	if (ys < xs) xs = ys;
	if (xs > 1.0) xs = 1.0;
	// Scale
	this.image.width(Math.floor(this.current_image_width * xs));
	this.image.height(Math.floor(this.current_image_height * xs));
}
SoundPlayer.prototype.update_player_theme_name = function (data) {
	data.sound_player.player_theme_name.html(data.sound_player.css.css_color_presets[data.sound_player.css.preset]["@name"] || data.sound_player.css.preset);
}

SoundPlayer.prototype.E = function (elem) {
	// Shortcut to create an element, masked with jquery
	var e = $(document.createElement(elem));
	for (var i = 1; i < arguments.length; ++i) this.C(e, arguments[i]);
	return e;
}
SoundPlayer.prototype.D = function () {
	// Shortcut to create a div, masked with jquery, appended with some classes
	var e = $(document.createElement("div"));
	for (var i = 0; i < arguments.length; ++i) this.C(e, arguments[i]);
	return e;
}
SoundPlayer.prototype.C = function (elem, cls) {
	elem.addClass(cls + this.css.css_suffix);
}
SoundPlayer.prototype.unC = function (elem, cls) {
	elem.removeClass(cls + this.css.css_suffix);
}

SoundPlayer.prototype.duration_to_string = function (position) {
	var seconds_in = position;
	var minutes_in = Math.floor(seconds_in / 60);
	seconds_in = Math.floor(seconds_in - minutes_in * 60);
	var s = minutes_in + ":" + (seconds_in >= 10 ? seconds_in : "0" + seconds_in);
	return s;
}
SoundPlayer.prototype.string_to_uint8array = function (str) {
	var array = new Uint8Array(new ArrayBuffer(str.length));
	for (var i = 0; i < str.length; ++i) {
		array[i] = str.charCodeAt(i);
	}
	return array;
}
SoundPlayer.prototype.generate_color_editor = function (container, label, identifier, value) {
	var help_div1, help_div2, help_div3, help_div4;
	var color_edit;
	var help_input = [ null , null , null , null ];

	container.append((help_div1 = this.D("SPHelpSectionDiv")));
	help_div1.append((help_div2 = this.D("SPHelpColorInputDiv0")));
	help_div2.append((help_div3 = this.D("SPHelpColorInputDiv2b")));
	help_div3.append((color_edit = this.D("SPHelpColorLabelDisplay")));
	help_div3.append((this.D("SPHelpColorLabelText").html(label)));

	help_div1.append((help_div2 = this.D("SPHelpColorInputDiv1")));
	help_div2.append((help_div3 = this.D("SPHelpColorInputDiv2").attr("title", "Red : [0,255]")));
	help_div3.append((help_div4 = this.D("SPHelpColorInputDiv3")));
	help_div4.append((help_input[0] = this.E("input", "SPHelpColorInput").attr("type", "text")));
	help_div1.append((help_div2 = this.D("SPHelpColorInputDiv1")));
	help_div2.append((help_div3 = this.D("SPHelpColorInputDiv2").attr("title", "Green : [0,255]")));
	help_div3.append((help_div4 = this.D("SPHelpColorInputDiv3")));
	help_div4.append((help_input[1] = this.E("input", "SPHelpColorInput").attr("type", "text")));
	help_div1.append((help_div2 = this.D("SPHelpColorInputDiv1")));
	help_div2.append((help_div3 = this.D("SPHelpColorInputDiv2").attr("title", "Blue : [0,255]")));
	help_div3.append((help_div4 = this.D("SPHelpColorInputDiv3")));
	help_div4.append((help_input[2] = this.E("input", "SPHelpColorInput").attr("type", "text")));
	help_div1.append((help_div2 = this.D("SPHelpColorInputDiv1")));
	help_div2.append((help_div3 = this.D("SPHelpColorInputDiv2").attr("title", "Alpha : [0.0,1.0]")));
	help_div3.append((help_div4 = this.D("SPHelpColorInputDiv3")));
	help_div4.append((help_input[3] = this.E("input", "SPHelpColorInput").attr("type", "text")));

	for (var i = 0; i < help_input.length; ++i) {
		help_input[i].val(value[i]);
		help_input[i].on("change." + this.namespace, {sound_player: this, color_id: identifier, component: i, color_display: color_edit}, this.on_settings_color_change);
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
}
SoundPlayer.prototype.generate_value_editor = function (container, label, identifier, value, is_string) {
	var help_div1, help_div2, help_div3, help_div4;
	var help_input;

	container.append((help_div1 = this.D("SPHelpSectionDiv")));
	help_div1.append((help_div2 = this.D("SPHelpColorInputDiv0")));
	help_div2.append((help_div3 = this.D("SPHelpColorInputDiv2b")));
	help_div3.append((this.D("SPHelpColorLabelText").html(label)));

	help_div1.append((help_div2 = this.D("SPHelpColorInputDiv1Full")));
	help_div2.append((help_div3 = this.D("SPHelpColorInputDiv2")));
	help_div3.append((help_div4 = this.D("SPHelpColorInputDiv3")));
	help_div4.append((help_input = this.E("input", "SPHelpColorInput").attr("type", "text")));

	help_input.val(value);
	help_input.on("change." + this.namespace, {sound_player: this, value_id: identifier, "is_string": is_string}, this.on_settings_value_change);

	if (identifier[0] != "@") {
		this.player_theme_value_updaters.push([
			false, identifier, help_input
		]);
	}
}
SoundPlayer.prototype.update_value_fields = function () {
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

SoundPlayer.prototype.remove_from_playlist = function (index) {
	// Stop
	if (this.current_sound != null && this.current_sound.index == index) this.deselect_sound();

	// Revoke url
	(window.webkitURL || window.URL).revokeObjectURL(this.playlist[index].audio_blob_url);
	if (this.playlist[index].image_url_blob != null) {
		(window.webkitURL || window.URL).revokeObjectURL(this.playlist[index].image_url_blob);
	}

	// Remove html
	this.playlist[index].playlist_item.remove();

	// Remove from list
	this.playlist.splice(index, 1);

	// Update indices
	for (var i = 0; i < this.playlist.length; ++i) {
		this.playlist[i].index = i;
	}
}
SoundPlayer.prototype.add_to_playlist = function (title, tag, flagged, url, sound_index, raw_data, image_src) {
	// Setup playlist settings
	var playlist_item = {};

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

	// Other settings
	playlist_item.title = title;
	playlist_item.tag = tag;
	playlist_item.flagged = flagged;
	playlist_item.url = url;
	playlist_item.sound_index = sound_index;

	// Index
	playlist_item.index = this.playlist.length;

	// html setup
	var control_container, controls;
	this.playlist_container.append((playlist_item.playlist_item = this.D("SPPlaylistItem")));
	playlist_item.playlist_item.append((this.D("SPPlaylistSoundName").html(title)));
	playlist_item.playlist_item.append((control_container = this.D("SPPlaylistControlsContainer")));
	control_container.append((controls = this.D("SPPlaylistControls")));
	controls.on("click", this.cancel_event);
	playlist_item.playlist_item.on("click." + this.namespace, {sound_player: this, playlist_item: playlist_item}, this.on_playlist_item_click);
	if (tag != SoundPlayer.ALL_SOUNDS) playlist_item.playlist_item.attr("title", tag);
	playlist_item.playlist_item.on("mousedown", this.cancel_event);
	control_container.on("mousedown", this.cancel_event);

	// Controls
	playlist_item.controls = [ null , null , null , null ];
	controls.append((playlist_item.controls[0] = this.E("a", "SPPlaylistControlLink").html("&times;").attr("title", "Delete")));
	controls.append((this.D("SPPlaylistControlLinkSeparator")));
	controls.append((playlist_item.controls[1] = this.E("a", "SPPlaylistControlLink").html("&uarr;").attr("title", "Move up")));
	controls.append((this.D("SPPlaylistControlLinkSeparator")));
	controls.append((playlist_item.controls[2] = this.E("a", "SPPlaylistControlLink").html("&darr;").attr("title", "Move down")));
	controls.append((this.D("SPPlaylistControlLinkSeparator")));
	controls.append((playlist_item.controls[3] = this.E("a", "SPPlaylistControlLink").html("S").attr("title", "Save...")));
	playlist_item.controls[3].attr("href", playlist_item.audio_blob_url);
	for (var i = 0; i < playlist_item.controls.length; ++i) {
		playlist_item.controls[i].on("click." + this.namespace, {control_id: i, sound_player: this, playlist_item: playlist_item}, this.on_playlist_control_click);
		playlist_item.controls[i].on("mousedown", this.cancel_event);
	}

	// Add
	this.playlist.push(playlist_item);

	// Play?
	if (this.playlist_play_on_load == 2 || (this.playlist_play_on_load == 1 && this.audio[0].paused)) {
		this.play_sound(this.playlist.length - 1);
	}
}
SoundPlayer.prototype.deselect_sound = function () {
	if (this.current_sound != null) {
		this.stop_sound();
		this.unC(this.current_sound.playlist_item, "SPPlaylistItemActive");
		this.current_sound = null;

		this.current_sound_length = 0;
		this.current_sound_duration = 0.0;

		// Controls
		for (var i = 0; i < this.playback_controls.length; ++i) {
			this.C(this.playback_controls[i], "SPControlLinkDisabled");
		}

		this.image.css("display", "none");
		this.image.removeAttr("src");
		this.no_image.css("display", "");
		this.current_image_width = 0;
		this.current_image_height = 0;

		this.title.html(this.title_default);

		this.seek_time_end_label.html(this.duration_to_string(this.current_sound_length));
	}
}
SoundPlayer.prototype.stop_sound = function () {
	if (!this.audio[0].paused) {
		this.audio[0].pause();
	}
	this.seek(0, true);
	this.update_playing_status();
}
SoundPlayer.prototype.play_sound = function (index) {
	// Stop old sound
	this.deselect_sound();

	// Title
	this.title.html(this.playlist[index].title);

	// Controls
	for (var i = 0; i < this.playback_controls.length; ++i) {
		this.unC(this.playback_controls[i], "SPControlLinkDisabled");
	}

	// Play this sound
	this.audio.attr("src", this.playlist[index].audio_blob_url);
	this.audio[0].play();

	// Current sound
	this.current_sound = this.playlist[index];
	this.C(this.current_sound.playlist_item, "SPPlaylistItemActive");

	// Image
	this.no_image.css("display", "none");
	this.image.css("display", "none");
	this.image.attr("src", this.playlist[index].image_url);
}

SoundPlayer.prototype.attempt_load = function (url_or_file, load_tag, callback_data, progress_callback, done_callback, status_callback) {
	// Attempt to load from remote URL or local file
	if (typeof(url_or_file) == typeof("")) {
		// URL
		var sound_player = this;
		try {
			$.ajax({
				url: url_or_file,
				method: "get",
				dataType: "text",
				beforeSend: function (jqXHR, settings) {
					jqXHR.overrideMimeType("text/plain; charset=x-user-defined");
					jqXHR.responseType = "arraybuffer";
					jqXHR.progress = function (event) { progress_callback(event, callback_data); };
					this.url = url_or_file;
					this.load_tag = load_tag;
					this.sound_player = sound_player;
				},
				success: function (data, success_code, jqXHR) {
					try { done_callback(true, callback_data); }
					catch (e) {};

					// Convert and call load function
					var ui8_data = this.sound_player.string_to_uint8array(data);
					var status = this.sound_player.attempt_load_raw(false, this.url, this.load_tag, ui8_data);

					try { status_callback(status, callback_data); }
					catch (e) {};
				},
				error: function (jqXHR, error_type) {
					// Errors
					try { done_callback(false, callback_data); }
					catch (e) {};
				}
			});
		}
		catch (e) {}
	}
	else {
		// Local file
		var reader = new FileReader();
		reader.file = url_or_file;
		reader.load_tag = load_tag;
		reader.sound_player = this;
		// Done function
		reader.onload = function () {
			// Convert and call load function
			var ui8_data = new Uint8Array(this.result);
			this.sound_player.attempt_load_raw(true, this.file.name, this.load_tag, ui8_data);
		}
		// Start
		reader.readAsArrayBuffer(url_or_file);
	}
	// Okay
	return true;
}
SoundPlayer.prototype.attempt_load_raw = function (is_local, url_or_filename, load_tag, raw_ui8_data) {
	// Attempt to load from raw data
	var r;
	for (var i = 0; i < this.load_callbacks.length; ++i) {
		r = this.load_callbacks[i](url_or_filename, load_tag, raw_ui8_data);
		if (r != null) {
			// Try/catch'd just incase something breaks due to bad return value
			try {
				// Load every sound
				for (var j = 0; j < r.length; ++j) {
					this.add_to_playlist(r[j]["title"], load_tag, r[j]["flagged"], url_or_filename, r[j]["index"], r[j]["data"], (is_local ? raw_ui8_data : url_or_filename));
				}
			}
			catch (e) {}
			// Done
			return true;
		}
	}
	// Done
	return false
}

SoundPlayer.prototype.on_titlebar_mousedown = function (event) {
	// Mouse offset
	event.data.sound_player.moving = true;
	event.data.sound_player.mouse_offset = event.data.sound_player.sp_container_main.offset();
	event.data.sound_player.mouse_offset.left -= event.pageX;
	event.data.sound_player.mouse_offset.top -= event.pageY;

	// Done
	event.preventDefault();
	return false;
}
SoundPlayer.prototype.on_footerbar_mousedown = function (event) {
	// Mouse offset
	event.data.sound_player.resizing = true;
	event.data.sound_player.mouse_offset = event.data.sound_player.sp_container_main.offset();
	event.data.sound_player.mouse_offset.left -= (event.pageX - $(document).scrollLeft()) - event.data.sound_player.sp_container_main.outerWidth();
	event.data.sound_player.mouse_offset.top -= (event.pageY - $(document).scrollTop()) - event.data.sound_player.sp_container_main.outerHeight();

	// Done
	event.preventDefault();
	return false;
}
SoundPlayer.prototype.on_volumebar_mousedown = function (event) {
	// Mouse offset
	event.data.sound_player.volume_changing = true;
	// Visuals
	event.data.sound_player.C(event.data.sound_player.volume_container, "SPVolumeContainerActive");
	// Change volume
	var volume = 1.0 - ((event.pageY) - event.data.sound_player.volume_bar_container.offset().top) / event.data.sound_player.volume_bar_container.outerHeight();
	event.data.sound_player.set_volume(volume);
	// Done
	event.preventDefault();
	return false;
}
SoundPlayer.prototype.on_seekbar_mousedown = function (event) {
	// Mouse offset
	event.data.sound_player.C(event.data.sound_player.seek_bar, "SPSeekBarActive");
	event.data.sound_player.seek_dragging = true;
	event.data.sound_player.mouse_offset = event.data.sound_player.seek_bar.offset();
	event.data.sound_player.mouse_offset.left -= event.pageX;
	event.data.sound_player.mouse_offset.top -= event.pageY;
	// Done
	event.preventDefault();
	return false;
}
SoundPlayer.prototype.on_seekbar_container_mousedown = function (event) {
	// Mouse offset
	event.data.sound_player.C(event.data.sound_player.seek_bar, "SPSeekBarActive");
	event.data.sound_player.seek_exacting = true;
	// Seeking
	var offset = (event.pageX - event.data.sound_player.seek_bar_container.offset().left) - event.data.sound_player.seek_bar.outerWidth() / 2.0;
	var max_offset = event.data.sound_player.seek_bar_container.outerWidth() - event.data.sound_player.seek_bar.outerWidth();
	// Seek
	if (max_offset > 0.0) offset /= max_offset;
	event.data.sound_player.seek(offset, true);
	// Done
	event.preventDefault();
	return false;
}
SoundPlayer.prototype.on_document_mouseup = function (event) {
	// Stop all drag events
	if (event.data.sound_player.moving) {
		event.data.sound_player.moving = false;
	}
	else if (event.data.sound_player.resizing) {
		event.data.sound_player.resizing = false;
		event.data.sound_player.reposition();
	}
	else if (event.data.sound_player.volume_changing) {
		event.data.sound_player.volume_changing = false;
		event.data.sound_player.unC(event.data.sound_player.volume_container, "SPVolumeContainerActive");
	}
	else if (event.data.sound_player.seek_dragging) {
		event.data.sound_player.seek_dragging = false;
		event.data.sound_player.unC(event.data.sound_player.seek_bar, "SPSeekBarActive");
	}
	else if (event.data.sound_player.seek_exacting) {
		event.data.sound_player.seek_exacting = false;
		event.data.sound_player.unC(event.data.sound_player.seek_bar, "SPSeekBarActive");
	}
	return true;
}
SoundPlayer.prototype.on_document_mousemove = function (event) {
	if (event.data.sound_player.moving) {
		// Dragging window
		var left = (event.pageX - $(document).scrollLeft()) + event.data.sound_player.mouse_offset.left;
		var top = (event.pageY - $(document).scrollTop()) + event.data.sound_player.mouse_offset.top;
		event.data.sound_player.reposition(left, top);

		// Callback
		try { event.data.sound_player.settings_callback(event.data.sound_player); }
		catch (e) {}
	}
	else if (event.data.sound_player.resizing) {
		var size = event.data.sound_player.sp_container_main.offset();
		size.left = ((event.pageX - $(document).scrollLeft()) - size.left) + event.data.sound_player.mouse_offset.left;
		size.top = ((event.pageY - $(document).scrollTop()) - size.top) + event.data.sound_player.mouse_offset.top;

		event.data.sound_player.resize_to(size.left, size.top);

		// Callback
		try { event.data.sound_player.settings_callback(event.data.sound_player); }
		catch (e) {}
	}
	else if (event.data.sound_player.volume_changing) {
		// Changing volume
		var volume = 1.0 - ((event.pageY) - event.data.sound_player.volume_bar_container.offset().top) / event.data.sound_player.volume_bar_container.outerHeight();
		event.data.sound_player.set_volume(volume);

		// Callback
		try { event.data.sound_player.settings_callback(event.data.sound_player); }
		catch (e) {}
	}
	else if (event.data.sound_player.seek_dragging) {
		// Seeking
		var offset = ((event.pageX) - event.data.sound_player.seek_bar_container.offset().left) + event.data.sound_player.mouse_offset.left;
		var max_offset = event.data.sound_player.seek_bar_container.outerWidth() - event.data.sound_player.seek_bar.outerWidth();
		// Seek
		if (max_offset > 0.0) offset /= max_offset;
		event.data.sound_player.seek(offset, true);
	}
	else if (event.data.sound_player.seek_exacting) {
		// Seeking
		var offset = ((event.pageX) - event.data.sound_player.seek_bar_container.offset().left) - event.data.sound_player.seek_bar.outerWidth() / 2.0;
		var max_offset = event.data.sound_player.seek_bar_container.outerWidth() - event.data.sound_player.seek_bar.outerWidth();
		// Seek
		if (max_offset > 0.0) offset /= max_offset;
		event.data.sound_player.seek(offset, true);
	}
	return true;
}
SoundPlayer.prototype.on_window_resize = function (event) {
	// Keep on screen
	event.data.sound_player.reposition();
}

SoundPlayer.prototype.on_audio_play = function (event) {
	// Update playing status
	event.data.sound_player.update_playing_status();
}
SoundPlayer.prototype.on_audio_pause = function (event) {
	// Update playing status
	event.data.sound_player.update_playing_status();
}
SoundPlayer.prototype.on_audio_ended = function (event) {
	// Update playing status
	event.data.sound_player.update_playing_status();

	// Next
	if (event.data.sound_player.playlist_randomize) {
		// Random
		var i = 0;
		if (event.data.sound_player.playlist.length > 1) {
			i = Math.floor(Math.random() * (event.data.sound_player.playlist.length - 1));
		}
		if (i == event.data.sound_player.current_sound.index) {
			i = (i + 1) % event.data.sound_player.playlist.length;
		}
		event.data.sound_player.play_sound(i);
	}
	else if (event.data.sound_player.playlist_loop || event.data.sound_player.current_sound.index < event.data.sound_player.playlist.length - 1) {
		// Next
		event.data.sound_player.play_sound((event.data.sound_player.current_sound.index + 1) % event.data.sound_player.playlist.length);
	}
}
SoundPlayer.prototype.on_audio_timeupdate = function (event) {
	// Update seek bar
	event.data.sound_player.current_sound_position = this.currentTime;

	// Update seek bar
	if (event.data.sound_player.current_sound_duration > 0 && event.data.sound_player.current_sound_duration == event.data.sound_player.current_sound_duration) {
		event.data.sound_player.seek(event.data.sound_player.current_sound_position / event.data.sound_player.current_sound_duration, false);
	}
	else {
		event.data.sound_player.seek(0.0, false);
	}
}
SoundPlayer.prototype.on_audio_durationchange = function (event) {
	// Update durations
	event.data.sound_player.current_sound_duration = event.data.sound_player.get_audio_duration();
	event.data.sound_player.current_sound_length = Math.round(event.data.sound_player.current_sound_duration);

	// Update seek bar
	event.data.sound_player.seek_time_end_label.html(event.data.sound_player.duration_to_string(event.data.sound_player.current_sound_length));
	if (event.data.sound_player.current_sound_duration > 0 && event.data.sound_player.current_sound_duration == event.data.sound_player.current_sound_duration) {
		event.data.sound_player.seek(event.data.sound_player.current_sound_position / event.data.sound_player.current_sound_duration, false);
	}
	else {
		event.data.sound_player.seek(0.0, false);
	}
}

SoundPlayer.prototype.on_image_load = function (event) {
	var attr = $(this).attr("src");
	if (typeof(attr) !== "undefined" && attr !== false) {
		// Loaded; scale
		event.data.sound_player.current_image_width = this.width;
		event.data.sound_player.current_image_height = this.height;

		event.data.sound_player.update_image_scale();
		$(this).css("display", "");
	}
}

SoundPlayer.prototype.on_playlist_mode_change = function (event) {
	// Change mode
	if (event.data.sound_player.playlist_randomize) {
		event.data.sound_player.playlist_randomize = false;
		event.data.sound_player.playlist_loop = false;
	}
	else if (event.data.sound_player.playlist_loop) {
		event.data.sound_player.playlist_randomize = true;
	}
	else {
		event.data.sound_player.playlist_loop = true;
	}

	// Label
	$(this).html(event.data.sound_player.playlist_randomize ? "Randomize" : (event.data.sound_player.playlist_loop ? "Loop" : "Play Once"));

	// Callback
	try { event.data.sound_player.settings_callback(event.data.sound_player); }
	catch (e) {}
}
SoundPlayer.prototype.on_playlist_onload_change = function (event) {
	// Change mode
	var v = (event.data.sound_player.playlist_play_on_load + 1) % 3;
	event.data.sound_player.playlist_play_on_load = v;

	// Label
	$(this).html(v == 0 ? "Don't play" : (v == 1 ? "Play if paused" : "Always play"));

	// Callback
	try { event.data.sound_player.settings_callback(event.data.sound_player); }
	catch (e) {}
}
SoundPlayer.prototype.on_player_theme_change = function (event) {
	// Change mode
	var first = null;
	var find = false;
	for (var theme in event.data.sound_player.css.css_color_presets) {
		if (theme == "default") continue;
		if (first === null) first = theme;
		if (theme == event.data.sound_player.css.preset && !find) find = true;
		else if (find) {
			find = null;
			event.data.sound_player.css.load_preset(theme);
			break;
		}
	}
	if (find !== null) {
		event.data.sound_player.css.load_preset(first);
	}

	// Update value editors
	event.data.sound_player.update_value_fields();

	// Update stylesheet
	event.data.sound_player.regen_stylesheet();

	// Label
	event.data.sound_player.update_player_theme_name({sound_player: event.data.sound_player});

	// Callback
	try { event.data.sound_player.settings_callback(event.data.sound_player); }
	catch (e) {}
}

SoundPlayer.prototype.on_playback_control_click = function (event) {
	if (!$(this).hasClass("SPControlLinkDisabled")) {
		switch (event.data.control_id) {
			case 0:
			{
				event.data.sound_player.seek(0, true);
			}
			break;
			case 1:
			{
				event.data.sound_player.seek((event.data.sound_player.current_sound_position - 5.0) / event.data.sound_player.current_sound_duration, true);
			}
			break;
			case 2:
			{
				if (event.data.sound_player.audio[0].paused) {
					event.data.sound_player.audio[0].play();
				}
				else {
					event.data.sound_player.audio[0].pause();
				}
				event.data.sound_player.update_playing_status();
			}
			break;
			case 3:
			{
				event.data.sound_player.seek((event.data.sound_player.current_sound_position + 5.0) / event.data.sound_player.current_sound_duration, true);
			}
			break;
			case 4:
			{
				event.data.sound_player.seek(1.0, true);
			}
			break;
		}
	}
}
SoundPlayer.prototype.on_main_control_click = function (event) {
	switch (event.data.control_id) {
		case 0:
		{
			// Options
			var open = false;
			for (var i = 0; i < event.data.sound_player.help_container.length; ++i) {
				if (event.data.sound_player.help_container[i].css("display") != "none") {
					open = true;
					break;
				}
			}
			if (open) {
				for (var i = 0; i < event.data.sound_player.help_container.length; ++i) {
					event.data.sound_player.help_container[i].css("display", "none");
				}
			}
			else {
				event.data.sound_player.help_container[0].css("display", "");
			}
		}
		break;
		case 1:
		{
			// Min/max
			var open = (event.data.sound_player.playlist_container.css("display") != "none");
			event.data.sound_player.playlist_container.css("display", (open ? "none" : ""));
			event.data.sound_player.top_container.css("display", (open ? "none" : ""));

			// Close overlays
			for (var i = 0; i < event.data.sound_player.help_container.length; ++i) {
				event.data.sound_player.help_container[i].css("display", "none");
			}

			// On screen
			event.data.sound_player.reposition();
		}
		break;
		case 2:
		{
			// Close
			event.data.sound_player.destructor();
		}
		break;
	}
}
SoundPlayer.prototype.on_helppage_goto = function (event) {
	for (var i = 0; i < event.data.sound_player.help_container.length; ++i) {
		event.data.sound_player.help_container[i].css("display", (event.data.help_page == i ? "" : "none"));
	}
}

SoundPlayer.prototype.on_playlist_item_click = function (event) {
	// Play
	event.data.sound_player.play_sound(event.data.playlist_item.index);
}

SoundPlayer.prototype.on_playlist_control_click = function (event) {
	switch (event.data.control_id) {
		case 0:
		{
			// Delete
			event.data.sound_player.remove_from_playlist(event.data.playlist_item.index);
		}
		return false;
		case 1:
		{
			// Move up
			var i = event.data.playlist_item.index;
			if (i > 0) {
				// Update html
				var i1 = event.data.sound_player.playlist[i - 1];
				var i2 = event.data.sound_player.playlist[i];
				i1.playlist_item.before(i2.playlist_item);

				// Update list order and indices
				event.data.sound_player.playlist[i] = i1;
				event.data.sound_player.playlist[i - 1] = i2;
				i1.index = i;
				i2.index = i - 1;
			}
		}
		break;
		case 2:
		{
			// Move down
			var i = event.data.playlist_item.index;
			if (i < event.data.sound_player.playlist.length - 1) {
				// Update html
				var i1 = event.data.sound_player.playlist[i];
				var i2 = event.data.sound_player.playlist[i + 1];
				i1.playlist_item.before(i2.playlist_item);

				// Update list order and indices
				event.data.sound_player.playlist[i + 1] = i1;
				event.data.sound_player.playlist[i] = i2;
				i1.index = i + 1;
				i2.index = i;
			}
		}
		break;
		case 3:
		{
			// URL
			alert("Right click and save as, or open in a new tab.");
		}
		return false;
	}

	// Done
	return true;
}

SoundPlayer.prototype.on_settings_color_change = function (event) {
	// Parse value
	var value = 0;

	try {
		if (event.data.component < 3) {
			value = parseInt($(this).val());

			if (value < 0) value = 0;
			else if (value > 255) value = 255;
		}
		else {
			value = parseFloat($(this).val());

			if (value < 0.0) value = 0.0;
			else if (value > 1.0) value = 1.0;
		}
	}
	catch (e) {}

	// Update display
	$(this).val(value);

	// Set value
	event.data.sound_player.css.modify_value(true, event.data.color_id, value, event.data.component);

	// Display value
	value = event.data.sound_player.css.get_value(true, event.data.color_id);
	if (value[3] >= 1.0) {
		event.data.color_display.css("background", "rgb(" + value[0] + "," + value[1] + "," + value[2] + ")");
	}
	else {
		event.data.color_display.css("background", "rgba(" + value[0] + "," + value[1] + "," + value[2] + "," + value[3] + ")");	
	}

	// Update stylesheet
	if (/volume_colors/.test(event.data.color_id)) {
		event.data.sound_player.set_volume(event.data.sound_player.volume);
	}
	else {
		event.data.sound_player.regen_stylesheet();
	}

	// Callback
	try { event.data.sound_player.settings_callback(event.data.sound_player); }
	catch (e) {}
}
SoundPlayer.prototype.on_settings_value_change = function (event) {
	var value = $(this).val();
	if (!event.data.is_string) {
		value = parseFloat(value);
		$(this).val(value);
	}

	// Set value
	if (event.data.value_id[0] == "@") {
		var name = event.data.value_id.substr(1, event.data.value_id.length - 1);
		if (name == "scale_factor") {
			if (value <= 0.25) value = 0.25;
			if (value >= 4.0) value = 4.0;
			$(this).val(value);
			event.data.sound_player.update_scale_factor(value);
		}
	}
	else {
		event.data.sound_player.css.modify_value(false, event.data.value_id, value);
	}

	// Update stylesheet
	event.data.sound_player.regen_stylesheet();
	event.data.sound_player.reposition();

	// Callback
	try { event.data.sound_player.settings_callback(event.data.sound_player); }
	catch (e) {}
}

SoundPlayer.prototype.on_container_drop = function (event) {
	// Close overlays
	event.data.sound_player.alert_container.css("display", "none");
	for (var i = 0; i < event.data.sound_player.help_container.length; ++i) {
		event.data.sound_player.help_container[i].css("display", "none")
	}

	// Load
	if (event.originalEvent.dataTransfer.files.length > 0) {
		for (var i = 0; i < event.originalEvent.dataTransfer.files.length; ++i) {
			event.data.sound_player.attempt_load(event.originalEvent.dataTransfer.files[i], SoundPlayer.ALL_SOUNDS);
		}
	}
	else {
		// URL
		event.data.sound_player.attempt_load(event.originalEvent.dataTransfer.getData("text/plain"), SoundPlayer.ALL_SOUNDS);
	}

	// Done
	event.preventDefault();
	event.stopPropagation();
	return false;
}
SoundPlayer.prototype.on_container_dragover = function (event) {
	event.originalEvent.dataTransfer.dropEffect = "move";
	// Done
	event.preventDefault();
	event.stopPropagation();
	return false;
}
SoundPlayer.prototype.on_container_dragenter = function (event) {
	event.data.sound_player.alert_container.css("display", "");
	// Done
	event.preventDefault();
	event.stopPropagation();
	return false;
}
SoundPlayer.prototype.on_container_dragexit = function (event) {
	event.data.sound_player.alert_container.css("display", "none");
	// Done
	event.preventDefault();
	event.stopPropagation();
	return false;
}

SoundPlayer.prototype.cancel_event = function (event) {
	// Done
	event.preventDefault();
	event.stopPropagation();
	return false;
}







