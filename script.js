// Title management
var default_title = "";

// Basic functions
var E = function (type) {
	var e = document.createElement(type);
	if (arguments.length > 1) {
		e.className = arguments[1];
	}
	return $(e);
};

function is_chrome() {
	return ((navigator.userAgent + "").indexOf(" Chrome/") >= 0);
}
function is_firefox() {
	var ua = navigator.userAgent + "";
	return (ua.indexOf("Mozilla/") >= 0 && ua.indexOf("MSIE") < 0);
}

function text_to_html(str) {
	return str.replace(/&/g, "&amp;")
		.replace(/>/g, "&gt;")
		.replace(/</g, "&lt;")
		.replace(/"/g, "&quot;");
}

function change_style_display(class_names, display_prefix, on) {
	on = on ? 1 : 0;
	$("." + class_names[on]).removeClass(display_prefix + "DisplayOff").addClass(display_prefix + "DisplayOn");
	$("." + class_names[1 - on]).removeClass(display_prefix + "DisplayOn").addClass(display_prefix + "DisplayOff");
}
function change_browser_display(show_all) {
	if (!show_all && is_chrome()) {
		$(".SpecificBrowser").removeClass("BrowserDisplayOff").addClass("BrowserDisplayOn");
		$(".Firefox").removeClass("BrowserDisplayOn").addClass("BrowserDisplayOff");
		$(".UniversalBrowser").removeClass("BrowserDisplayOn").addClass("BrowserDisplayOff");
		$(".Chrome").removeClass("BrowserDisplayOff").addClass("BrowserDisplayOn");
	}
	else if (!show_all && is_firefox()) {
		$(".SpecificBrowser").removeClass("BrowserDisplayOff").addClass("BrowserDisplayOn");
		$(".Chrome").removeClass("BrowserDisplayOn").addClass("BrowserDisplayOff");
		$(".UniversalBrowser").removeClass("BrowserDisplayOn").addClass("BrowserDisplayOff");
		$(".Firefox").removeClass("BrowserDisplayOff").addClass("BrowserDisplayOn");
	}
	else {
		$(".Firefox").removeClass("BrowserDisplayOff").addClass("BrowserDisplayOn");
		$(".Chrome").removeClass("BrowserDisplayOff").addClass("BrowserDisplayOn");
		$(".SpecificBrowser").removeClass("BrowserDisplayOn").addClass("BrowserDisplayOff");
		$(".UniversalBrowser").removeClass("BrowserDisplayOff").addClass("BrowserDisplayOn");
	}
}

// Window url hash management
function WindowHash() {
	this.hash = "";
	this.page = "";
	this.vars = {};
	this.history_mode = 0;

	this.history = [];
	this.history_index = -1;
};
WindowHash.prototype = {
	constructor: WindowHash,
	on_change: function (event) {
		if (this.hash == window.location.hash) return;

		// Get the new hash
		this.hash = window.location.hash;
		if (this.hash.length > 0) this.hash = this.hash.substr(1);

		// Get the page
		var h = this.hash.split("?");
		this.page = h[0];

		// Get any variables
		this.vars = this.parse_vars(h.splice(1, h.length - 1).join("?"));

		// History update
		if (this.history_mode == 0) {
			if (this.history_index < this.history.length - 1) {
				this.history.splice(this.history_index, this.history.length - 1 - this.history_index);
			}
			this.history.push([this.hash , this.page , this.vars]);
			++this.history_index;
		}
		else {
			this.history_index += this.history_mode;
			alert(this.history[this.history_index][0] + "\n" + this.hash);
		}
	},
	goto_page: function (page, vars) {
		page = page || "";

		var i = 0;
		for (var a = 1; a < arguments.length; ++a) {
			for (var v in arguments[a]) {
				page += (i == 0 ? "?" : "&") + v + (arguments[a][v] === null ? "" : "=" + arguments[a][v]);
				++i;
			}
		}

		window.location.hash = page;
	},
	has_previous: function () {
		return (this.history_index > 0);
	},
	goto_previous: function () {
		if (this.history_index > 0) {
			this.history_mode = -1;
			window.location.hash = this.history[this.history_index - 1][0];
			this.on_change();
			this.history_mode = 0;

			return true;
		}
		return false;
	},
	has_next: function () {
		return (this.history_index < this.history.length - 1);
	},
	goto_next: function () {
		if (this.history_index < this.history.length - 1) {
			this.history_mode = 1;
			window.location.hash = this.history[this.history_index + 1][0];
			this.on_change();
			this.history_mode = 0;

			return true;
		}
		return false;
	},
	parse_vars: function (str) {
		var vars = {};
		var h = str.split("&");
		for (var i = 0; i < h.length; ++i) {
			if (h[i].length == 0) continue;
			var p = h[i].split("=");
			vars[p[0]] = (p.length == 1) ? null : p.splice(1, p.length - 1).join("=");
		}

		return vars;
	},
	modify_href: function (href) {
		if (href == ".") href = this.page;
		else if (href == "..") {
			href = this.page.split("/");
			href = href.slice(0, href.length - 1).join("/");
		}
		return href;
		// TODO
	},

	on_hashchange: function (event) {
		window_hash.on_change(event);
		page_browser.open(window_hash.page, window_hash.vars, event===null);
	}
};
var window_hash = new WindowHash();

// Pages
function maintain_vars(vars, maintain) {
	var v = {};

	for (var k in vars) {
		for (var i = 0; i < maintain.length; ++i) {
			if (maintain[i] == k) {
				v[k] = vars[k];
				break;
			}
		}
	}

	return v;
}
function remove_vars(vars, remove) {
	var v = {};

	for (var k in vars) {
		for (var i = 0; i < remove.length; ++i) {
			if (remove[i] == k) {
				k = null;
				break;
			}
		}
		if (k !== null) v[k] = vars[k];
	}

	return v;
}
var page_list = {
	"about": {
		"userscript": null,
		"development": null,
		"codecs": {
			"embed.exe": null,
			"extract.exe": null,
			"batch-*.exe": null
		},
		"acknowledgements": null
	},
	"issues": {
		"audio": null
	},
	"source": null,
	"wiki": null,
	"changes": null,
	"ogglify": null,
	"guide": null,
	"bigger": null,
	"qa": null,
	"readme": null
};
function PageBrowser() {
	this.page_previous = null;
	this.on_view_changes = {
		"readme": this.readme_init
	};
	this.on_leave_changes = {
		"readme": this.readme_deinit
	};
	this.readme = null;
}
PageBrowser.prototype = {
	constructor: PageBrowser,
	open: function (page, vars, refresh) {
		if (this.page_previous !== null) this.update_page_functions(this.page_previous, this.on_leave_changes, { pre: this.page_previous, page: page });

		// Which page
		var title = "";
		var p = page.split("/");
		var s = page_list;
		var nav_page = page;
		for (var i = 0; i < p.length; ++i) {
			if (s !== null && p[i] in s) {
				s = s[p[i]];
				title += (title.length == 0 ? "" : " / ") + p[i];
				if (i == 0) nav_page = p[i];
			}
			else {
				title = "4chan Media Player";
				nav_page = page = "install";
			}
		}

		$(".Content").removeClass("ContentActive");
		$(".NavigationLink").removeClass("NavigationLinkCurrent");
		$("#content_" + page.replace(/\W/g, "_")).addClass("ContentActive");
		$("#navigation_" + nav_page).addClass("NavigationLinkCurrent");

		$("title").html(default_title + (title.length == 0 ? "" : " / " + title));
		change_style_display(["NonDeveloper","Developer"], "Developer", ("dev" in vars));
		change_style_display(["NoHelp","Help"], "Help", ("help" in vars));
		change_browser_display(("all" in vars));

		$(".PageVariableDisplay").each(function () {
			$(this)
			.removeClass("PageVariableDisplayOn PageVariableDisplayOff")
			.addClass("PageVariableDisplay" + (($(this).attr("pvar") in vars) ? "Off" : "On"));
		});
		$(".PageVariableDisplayInv").each(function () {
			$(this)
			.removeClass("PageVariableDisplayOn PageVariableDisplayOff")
			.addClass("PageVariableDisplay" + (($(this).attr("pvar") in vars) ? "On" : "Off"));
		});

		image_preview_close();

		// Scroll
		update_page_actions();
		this.update_page_functions(page, this.on_view_changes, { pre: this.page_previous || "", page: page });
		this.page_previous = page;

	},
	update_page_functions: function (page, check, data) {
		var p = page.split("/");

		var fcn = null;
		for (var i = 0; i < p.length; ++i) {
			if (p[i] in check) {
				check = check[p[i]];
				if (check instanceof Function) {
					if (i + 1 >= p.length) {
						// Okay
						fcn = check;
					}
					// Else, bad
					break;
				}
			}
			else {
				break;
			}
		}

		if (fcn) {
			// Call it
			fcn.call(this, data);
		}
	},

	readme_init: function (data) {
		this.readme = new Readme(data.pre);
	},
	readme_deinit: function (data) {
		if (this.readme !== null) {
			this.readme.done();
			this.readme = null;
		}
	}

};
var page_browser = new PageBrowser();
var page_vars_maintain = ["all","dev","help"];
function update_page_actions() {
	var vars = window_hash.vars;

	var scrolled = false;
	if ("scroll" in vars) {
		var scroll_to = $("[multi_id=" + vars["scroll"].replace(/\W/g, "\\$&") + "]:visible");
		if (scroll_to.length > 0) {
			try {
				$(document).scrollTop(scroll_to.offset().top);
				scrolled = true;
			}
			catch (e) {}
		}
	}

	$(".Highlighted").removeClass("Highlighted");
	if ("highlight" in vars) {
		var hl = $("[multi_id=" + vars["highlight"].replace(/\W/g, "\\$&") + "]:visible");
		if (hl.length > 0) {
			hl.addClass("Highlighted");
		}
	}

	if ("activate" in vars) {
		var activate = $("[multi_id=" + vars["activate"].replace(/\W/g, "\\$&") + "]:visible");
		if (activate.length > 0) {
			$(activate[0]).trigger("click");
		}
	}

	if ("info" in vars) {
		// Create and/or show
		var o = $(".NavigationImportantLinks");
		o.removeClass("NavigationImportantLinksHidden");
		if (!o.hasClass("NavigationImportantLinksReady")) {
			o.addClass("NavigationImportantLinksReady").prepend(
				E("div", "NavigationImportantLinksShow")
				.append(
					E("div", "NavigationImportantLinksShowTop NavigationImportantLinksShowShade")
				)
				.append(
					E("div", "NavigationImportantLinksShowLeft NavigationImportantLinksShowShade")
					.append(
						E("div", "NavigationImportantLinksShowText")
						.html("<b>Such obscure placement<br />for informational links</b><br /><br />Sure was hard to find")
					)
				)
				.append(
					E("div", "NavigationImportantLinksShowBottom NavigationImportantLinksShowShade")
				)
				.append(
					E("div", "NavigationImportantLinksShowRight NavigationImportantLinksShowShade")
				)
			);
		}

		// Scroll to top
		try {
			$(document).scrollTop(0);
		}
		catch (e) {}
	}
	else {
		// Hide
		$(".NavigationImportantLinks").addClass("NavigationImportantLinksHidden");
	}
}

// Change log
var change_log_version = null;
function get_change_log() {
	var log_url = "changelog.txt";

	$.ajax({
		type: "GET",
		url: log_url,
		dataType: "text",
		success: function (data, status, jqXHR) {
			display_change_log(parse_change_log(data));
		},
		error: function (jqXHR, status, error) {
			$("#change_log").css("display", "");
		}
	});
}
function parse_change_log(data) {
	// Parse change log
	data = data.replace(/\r\n/g, "\n").split("\n\n");
	var log = [];
	for (var i = 0; i < data.length; ++i) {
		data[i] = data[i].trim();
		if (data[i].length == 0) continue;

		log.push([]);
		data[i] = data[i].split("\n");
		for (var j = 0; j < data[i].length; ++j) {
			if (j == 0) {
				log[log.length - 1].push(data[i][j]);
			}
			else {
				if (data[i][j][0] == "-") {
					log[log.length - 1].push(data[i][j].substr(1).trim());
				}
				else {
					log[log.length - 1][log[log.length - 1].length - 1] += "\n" + (data[i][j].substr(1).trim());
				}
			}
		}
	}

	return log;
}
function display_change_log(log) {
	// Output version
	change_log_version = log[0][0];
	$(".Version").html(text_to_html(change_log_version));

	// Output changelog
	var cl = $("#change_log");
	cl.css("display", "");
	cl.html("");
	for (var i = 0; i < log.length; ++i) {
		var container, list;
		cl.append(container = $(document.createElement("p")));
		container.attr("multi_id", log[i][0].replace(/\W/gi, "_"));
		container.append(
			$(document.createElement("div"))
			.addClass("ChangeLogLabel")
			.html(
				$(document.createElement("a"))
				.attr("href", "#changes?highlight=" + container.attr("multi_id") + "&scroll=" + container.attr("multi_id"))
				.html(text_to_html(log[i][0]))
			)
			.append(
				(i == 0 ? "<span class=\"ChangeLogLabelCurrent\"> (current)</span>" : "")
			)
		);
		container.append(
			(list = $(document.createElement("ul")))
			.addClass("ChangeLogList")
		);
		for (var j = 1; j < log[i].length; ++j) {
			list.append(
				$(document.createElement("li"))
				.html(text_to_html(log[i][j]).replace("\n", "<br />"))
			);
		}
	}

	// Compare
	version_compare();

	// Update
	if ($("#change_log:visible").length > 0) update_page_actions();
}

// Image previewing
function image_preview(obj) {
	// Only open if necessary
	if ($(".ImagePreviewBoxInner2").length > 0) {
		return;
	}

	var descr = (obj.next().length > 0 ? (obj.next().hasClass && obj.next().hasClass("ImageDescription") ? obj.next().html() : "") : "");
	var descr_container, img_append, offset, offset2;

	// Create new
	$("body").append(
		(offset = $(document.createElement("div")))
		.addClass("ImagePreviewBoxInner2")
		.append(
			(offset2 = $(document.createElement("div")))
			.append(
				(img_append = $(document.createElement("a")))
				.addClass("ImagePreviewImageContainer")
				.attr("href", obj.attr("href"))
				.attr("target", "_blank")
				.on("click", function () { return true; })
			)
			.append(
				(descr_container = $(document.createElement("div")))
				.addClass("ImagePreviewDescriptionContainer")
				.html(descr)
			)
		)
		.on("click", {}, function (event) {
			if (event.which == 1) {
				event.preventDefault();
				event.stopPropagation();
				return false;
			}
			return true;
		})
		.css({"left": "0", "top": "0", "opacity": "0"})
	);

	// Setup
	descr_container.find("a").on("click", function (event) {
		if (event.which == 1) {
			event.stopPropagation();
			return true;
		}
		return false;
	});

	// Click to close
	$(".ImagePreviewOverlay")
	.on("click", {href: "#" + window_hash.page}, function (event) {
		if (event.which == 1) {
			image_preview_close();
			// Change URL
			window_hash.goto_page(
				event.data.href,
				remove_vars(window_hash.vars, ["activate", "scroll"])
			);
			return false;
		}
		return true;
	});

	// Image
	img_append.append(
		$(document.createElement("img"))
		.attr("src", obj.attr("href"))
		.on("load", {}, function (event) {
			// Image loaded; open
			descr_container.css({
				"width": descr_container.outerWidth(),
			});
			offset.css({
				"left": (-offset.outerWidth() / 2) + "px",
				"top": (-offset.outerHeight() / 2) + "px",
			});
			$(".ImagePreviewOverlayInner").html(
				$(document.createElement("div"))
				.addClass("ImagePreviewBox")
				.append(
					$(document.createElement("div"))
					.addClass("ImagePreviewBoxInner1")
					.append(
						offset
						.css("opacity", "")
					)
				)
			);
			$(".ImagePreviewOverlay").css("display", "block");
		})
	);
}
function image_preview_close() {
	$(".ImagePreviewBoxInner2").remove();
	$(".ImagePreviewOverlay")
	.off("click")
	.css("display", "");
}

// Version check
var current_version = null;
var current_version_received = false;
function version_compare() {
	// Don't fix links unless installed
	if (!current_version_received) return;

	// Installed, hide readme
	Readme.fix_links();

	// Only compare if both versions are available
	if (current_version === null || change_log_version === null) return;

	// Compare
	var current_version_split = current_version.toString().split(".");
	var new_version_split = change_log_version.split(".");
	var len = (new_version_split.length > current_version_split.length ? new_version_split.length : current_version_split.length);
	for (var i = 0; i < len; ++i) {
		if (
			(i < new_version_split.length ? (parseInt(new_version_split[i]) || 0) : 0) >
			(i < current_version_split.length ? (parseInt(current_version_split[i]) || 0) : 0)
		) {
			// Behind
			$(".Version")
			.addClass("VersionBehind")
			.attr("title", "Your version is behind (at " + current_version + ")")
			.html(text_to_html(change_log_version));
			break;
		}
		else if (
			(i < new_version_split.length ? (parseInt(new_version_split[i]) || 0) : 0) <
			(i < current_version_split.length ? (parseInt(current_version_split[i]) || 0) : 0)
		) {
			// Ahead
			$(".Version")
			.addClass("VersionAhead")
			.attr("title", "Your version is ahead (of " + change_log_version + ")")
			.html("*" + text_to_html(current_version));
			break;
		}
	}
	if (i == len) { // Same
		$(".Version")
		.addClass("VersionSame")
		.attr("title", "Your version is up to date")
		.html(text_to_html(change_log_version));
	}
}

// Audio testing
var audio_test = null;
function get_audio_duration(audio) {
	try {
		var d = (isFinite(audio.duration) ? audio.duration : audio.buffered.end(0));
		return isFinite(d) ? d : 0;
	}
	catch (e) {
		audio_log("Exception: ", e);
	}
	return 0;
}
function audio_control_event(link, event) {
	var event_name = link.attr("href").substr(1);
	audio_log("Interactive event: ", event_name);
	switch (event_name) {
		case "generate":
		{
			$("#audio_generate_p").css("display", "none");
			$("#audio_controls_p").css("display", "");
			$(".AudioTestContainer")
			.append(
				(audio_test = jQuery(document.createElement("audio")))
				.attr("src", "sample.ogg")
				.css("display", "none")
				.on("play pause ended timeupdate durationchange", {}, audio_event)
			);

			try {
				audio_log("Initial volume: ", audio_test[0].volume);
				audio_test[0].volume = 0.5;
			}
			catch (e) {
				audio_log("Exception: ", e);
			}
		}
		break;
		case "play":
		{
			var paused = true;
			try {
				audio_log("Paused status: ", audio_test[0].paused);
				paused = audio_test[0].paused;
			}
			catch (e) {
				audio_log("Exception: ", e);
			}

			if (paused) {
				try {
					audio_test[0].play();
				}
				catch (e) {
					audio_log("Exception: ", e);
				}
			}
			else {
				try {
					audio_test[0].pause();
				}
				catch (e) {
					audio_log("Exception: ", e);
				}
			}

			link.html(paused ? "pause" : "play");
		}
		break;
		default:
		{
			audio_log("Unknown event type: ", event_name);
		}
		break;
	}
}
function audio_event(event) {
	var audio;

	switch (event.type) {
		case "play":
		{
			audio_log("Audio event: ", event.type);
		}
		break;
		case "pause":
		{
			audio_log("Audio event: ", event.type);
		}
		break;
		case "ended":
		{
			audio_log("Audio event: ", event.type);
			$(".AudioTestLink[href=#play]").html("play");
		}
		break;
		case "timeupdate":
		{
			var t = audio_test[0].currentTime || 0;
			$("#audio_time_span").html(t);
		}
		break;
		case "durationchange":
		{
			audio_log("Audio event: ", event.type);
			$("#audio_duration_span").html(get_audio_duration(audio_test[0]));
		}
		break;
		default:
		{
			audio_log("Unknown audio event: ", event.type);
		}
		break;
	}
}
function audio_log(label, value) {
	var str = label;
	try {
		str += value;
	}
	catch (e) {}

	var c = $(".AudioLogContainer");
	c.append(
		$(document.createElement("div"))
		.addClass("AudioTestLog")
		.html("&gt; " + text_to_html(str))
	);

	try {
		c.scrollTop((c[0].scrollHeight || 0) - c.outerHeight());
	}
	catch (e) {}
}

// Readme
var Readme = (function () {

	var Typewriter = (function () {

		// Performance timing
		var time_now = (function () {
			// Get the function
			var fcn = window.performance ? (
				window.performance.now ||
				window.performance.mozNow ||
				window.performance.msNow ||
				window.performance.oNow ||
				window.performance.webkitNow
			) : null;

			if (fcn) {
				// Bind it
				fcn = fcn.bind(window.performance);
			}
			else {
				// Default
				fcn = function() {
					return new Date().getTime();
				};
			}

			return fcn;
		})();

		var init = function () {
			var e = document.createElement("style");
			e.innerHTML = ".typewrite-text:not(.typewrite-ignore) { display: inline !important; }" +
				".typewrite-text:not(.typewrite-ignore):after { content: attr(data-typewrite-text-after); visibility: hidden; }" +
				".typewrite-hidden:not(.typewrite-retain-size):not(.typewrite-ignore) { display: none !important; }" +
				".typewrite-hidden.typewrite-retain-size:not(.typewrite-ignore) { visibility: hidden; }";

			var h = document.head || document.body;
			if (h) h.appendChild(e);
		};

		// Constants
		var TEXT_STYLE_NORMAL = 0;
		var TEXT_STYLE_PRESERVE = 1;
		var TEXT_STYLE_PRESERVE_LINES = 2;

		var Typewriter = function (container) {
			// Init
			if (init) {
				init.call(this);
				init = null;
			}

			// Set container
			this.container = container;

			// Other vars
			this.active = false;
			this.looping = false;
			this.event_stop = false;

			this.active_node = null;
			this.text = null;
			this.text_pos = 0;
			this.text_style = TEXT_STYLE_NORMAL;
			this.text_style_stack = [];
			this.full_appear = false;
			this.full_appear_stack = [];
			this.has_events = false;
			this.has_events_stack = [];
			this.can_event = true;
			this.last_was_whitespace = false;
			this.last_was_newline = false;

			this.tick_time_default = 0.0325 * 1000;
			this.characters_per_tick_default = 1;

			this.tick_time = this.tick_time_default;
			this.tick_time_per_character = this.tick_time / this.characters_per_dick_default;

			this.loop_time_last = 0.0;
			this.loop_function = this.loop.bind(this);
			this.loop_timeout = null;
			this.loop_timeout_time = 0;

			// Waiting
			this.is_pausing_before = false;
			this.is_pausing_after = false;
			this.is_pausing_after_no_children = false;

			// Setup container
			this.setup();
		};

		Typewriter.prototype = {
			constructor: Typewriter,

			change: function (container) {
				if (this.active || this.looping) return; // Do nothing

				// Change container
				this.container = container;

				// Setup container
				this.setup();
			},

			setup: function () {
				if (this.container.getAttribute("data-typewrite-setup") != "true") {
					// Setup
					this.setup_container(this.container);
					this.container.setAttribute("data-typewrite-setup", "true");
				}
			},
			setup_container: function (container) {
				// Vars
				var c = container.firstChild, c_next, n;

				// Check the contents
				while (c != null) {
					c_next = c.nextSibling;

					// Check
					if (c.nodeType == 3) { // text
						// Set this up
						n = document.createElement("span");
						n.className = "typewrite-text";
						c.parentNode.insertBefore(n, c);

						// Move text node
						n.appendChild(c);
						n.setAttribute("data-typewrite-text-node", "true");
						n.setAttribute("data-typewrite-text", c.nodeValue);
						n.setAttribute("data-typewrite-text-after", "");
					}
					else {
						// Ignore this?
						if (c.getAttribute("data-typewrite-ignore") != "true" && c.getAttribute("data-typewrite-no-children") != "true") {
							// Scan this also
							this.setup_container(c);
						}
					}

					// Next
					c = c_next;
				}
			},
			clear_container: function (container) {
				// Vars
				var c = container.firstChild;

				// Check the contents
				while (c != null) {
					// Check
					if (c.getAttribute("data-typewrite-text-node") == "true") { // text
						// Set this up
						c.firstChild.nodeValue = "";
						c.setAttribute("data-typewrite-text-after", c.getAttribute("data-typewrite-text"));

						// Hide
						c.className += " typewrite-hidden";
					}
					else {
						// Ignore this?
						if (c.getAttribute("data-typewrite-ignore") != "true") {
							if (c.getAttribute("data-typewrite-no-children") != "true") {
								// Scan this also
								this.clear_container(c);
							}

							// Hide
							c.className += " typewrite-hidden";
						}
					}

					// Next
					c = c.nextSibling;
				}
			},

			start: function () {
				if (this.active || this.looping) return; // do nothing

				// Clear all contents
				this.clear_container(this.container);

				// Begin
				this.active = true;

				this.active_node = this.container;
				this.text = null;
				this.text_pos = 0;
				this.text_style_stack = [ (this.text_style = this.get_text_style(this.container)) ];
				this.full_appear_stack = [ (this.full_appear = this.get_full_appear(this.container)) ];
				this.has_events_stack = [ (this.has_events = false) ];
				this.can_event = true;
				this.last_was_whitespace = false;
				this.last_was_newline = false;

				this.tick_time = 0;
				this.tick_time_per_character = this.tick_time;

				// Waiting
				this.is_pausing_before = false;
				this.is_pausing_after = false;
				this.is_pausing_after_no_children = false;

				// Begin looping
				this.loop_time_last = time_now();
				this.loop_timeout_time = 0;
				this.loop();
			},
			stop: function () {
				if (!this.active) return; // do nothing

				this.active = false;
				this.active_node = null;
				this.event_stop = true;

				if (!this.looping && this.loop_timeout !== null) {
					clearTimeout(this.loop_timeout);
					this.loop_timeout = null;
				}
			},
			pause: function () {
				if (!this.active) return; // do nothing

				this.event_stop = true;

				if (!this.looping && this.loop_timeout !== null) {
					clearTimeout(this.loop_timeout);
					this.loop_timeout = null;
				}
			},
			resume: function () {
				if (!this.active || this.active_node === null) return; // do nothing

				this.event_stop = false;

				if (!this.looping && this.loop_timeout === null) {
					// Loop
					this.loop_time_last = time_now();
					this.loop_timeout_time = 0;
					this.loop();
				}
			},
			wait: function (time) {
				if (!this.active || this.active_node === null || time <= 0.0) return; // do nothing

				this.event_stop = true;
				time = time * 1000; // normalize time to milliseconds

				if (this.looping || this.loop_timeout === null) {
					// Timeout
					this.loop_time_last = time_now() + time;

					// Set a new timeout
					this.loop_timeout = setTimeout(this.loop_function, (this.loop_timeout_time = time));
				}
				else {
					// Change timeout
					clearTimeout(this.loop_timeout);

					// Timeout
					var now = time_now();
					this.loop_time_last = now + time;
					this.loop_timeout_time = Math.max(0, this.loop_timeout_time - (now - this.loop_time_last)) + time;

					// Set a new timeout
					this.loop_timeout = setTimeout(this.loop_function, this.loop_timeout_time);
				}
			},

			loop: function () {
				this.loop_timeout = null;
				this.looping = true;

				// Timing
				var t = time_now();
				var t_epsilon = 1.0e-5;
				var t_diff = (t - this.loop_time_last) + t_epsilon;
				this.loop_time_last = t;

				var is_first_action = true;
				var next, c, cc, c_time, c_space, c_newline, pause_time;
				while (true) {
					// Check
					if (!this.is_pausing_after) {
						if (this.active_node.getAttribute("data-typewrite-text-node") == "true") { // text
							while (true) {
								// Get text
								if (this.text === null) {
									// Set text
									this.text = this.active_node.getAttribute("data-typewrite-text");
									this.text_pos = 0;

									// Set character settings
									this.tick_time = this.tick_time_default;
									this.tick_time_per_character = this.tick_time / this.characters_per_tick_default;

									// Un-hide
									this.remove_class(this.active_node, "typewrite-hidden");

									// No text?
									if (this.text_pos >= this.text.length) {
										// Don't do any loop
										this.text = null;
										break;
									}

									// Force all to appear?
									if (this.full_appear) {
										// Skip
										this.active_node.firstChild.nodeValue = this.text;
										this.active_node.setAttribute("data-typewrite-text-after", "");

										// Update character settings
										cc = this.text.charCodeAt(this.text.length - 1);
										this.last_was_whitespace = (cc <= 32);
										this.last_was_newline = (cc == 10); // "\n"

										// No loop
										this.text = null;
										break;
									}

									// If this is a continuation and there isn't enough time, pause
									if (!is_first_action && t_diff < this.tick_time_per_character) {
										// Timeout
										this.looping = false;
										this.loop_timeout = setTimeout(this.loop_function, (this.loop_timeout_time = this.tick_time));
										return;
									}
									// Force a certain amount of characters to appear
									t_diff = Math.max(t_diff, (this.tick_time + t_epsilon));
								}

								// Add characters
								c = this.text[this.text_pos];
								cc = c.charCodeAt(0);
								c_time = this.get_character_time(c);
								c_space = (cc <= 32);
								c_newline = (cc == 10); // "\n"
								while (true) {
									// Update text
									this.active_node.firstChild.nodeValue += c;

									// Update after text
									++this.text_pos;
									this.active_node.setAttribute("data-typewrite-text-after", this.text.substr(this.text_pos, this.text.length - this.text_pos));

									// Time updating
									if (this.text_style == TEXT_STYLE_NORMAL) {
										// Only subtract time for un-collapsed whitespaces
										if (!c_space || !this.last_was_whitespace) {
											t_diff -= this.tick_time_per_character;
										}
									}
									else if (this.text_style == TEXT_STYLE_PRESERVE) {
										// Always
										t_diff -= this.tick_time_per_character;
									}
									else { // if (this.text_style == TEXT_STYLE_PRESERVE_LINES) {
										// Only subtract time for un-collapsed whitespaces / newlines
										if (!c_space || !this.last_was_whitespace || c_newline) {
											t_diff -= this.tick_time_per_character;
										}
									}
									this.last_was_whitespace = c_space;
									this.last_was_newline = c_newline;

									// Termination condition
									if (this.text_pos >= this.text.length) {
										// Done
										this.text = null;

										// Continue execution to find the next node
										break;
									}

									// Done condition
									c = this.text[this.text_pos];
									cc = c.charCodeAt(0);
									c_time = this.get_character_time(c);
									c_space = (cc <= 32);
									c_newline = (cc == 10); // "\n"
									if (t_diff - c_time < 0) {
										// Timeout
										this.looping = false;
										this.loop_timeout = setTimeout(this.loop_function, (this.loop_timeout_time = this.tick_time));
										return;
									}
								}

								// Not actually a loop
								break;
							}
						}
						else {
							// Ignore this?
							if (this.active_node.getAttribute("data-typewrite-ignore") != "true") {
								if (!this.is_pausing_after_no_children) {
									// Pause before
									if (!this.is_pausing_before && ((pause_time = this.get_pause_time(this.active_node, true)) > 0.0)) {
										// Events
										if (this.has_events && this.can_event && this.signal_event(this.active_node, "pause-before", {})) {
											this.can_event = false;
											this.looping = false;
											return;
										}
										this.can_event = true;

										// Loop timeout
										this.is_pausing_before = true;
										this.loop_time_last += 1000 * pause_time;
										this.looping = false;
										this.loop_timeout = setTimeout(this.loop_function, (this.loop_timeout_time = 1000 * pause_time));
										return;
									}
									this.is_pausing_before = false;

									// Un-hide
									this.remove_class(this.active_node, "typewrite-hidden");

									// Events
									if (this.has_events && this.can_event && this.signal_event(this.active_node, "show", {})) {
										this.can_event = false;
										this.looping = false;
										return;
									}
									this.can_event = true;
								}

								// Scan into
								if (this.active_node.firstChild !== null && this.active_node.getAttribute("data-typewrite-no-children") != "true") {
									// Get settings
									this.text_style_stack.push((this.text_style = this.get_text_style(this.active_node)));
									this.full_appear_stack.push((this.full_appear = this.get_full_appear(this.active_node)));
									this.active_node = this.active_node.firstChild;

									this.has_events_stack.push((this.has_events = this.get_has_events(this.active_node)));

									// Continue
									continue;
								}
								else {
									// Pause after
									if (!this.is_pausing_after_no_children && ((pause_time = this.get_pause_time(this.active_node, false)) > 0.0)) {
										// Events
										if (this.has_events && this.can_event && this.signal_event(this.active_node, "pause-after", {})) {
											this.can_event = false;
											this.looping = false;
											return;
										}
										this.can_event = true;

										// Loop timeout
										this.is_pausing_after_no_children = true;
										this.loop_time_last += 1000 * pause_time;
										this.looping = false;
										this.loop_timeout = setTimeout(this.loop_function, (this.loop_timeout_time = 1000 * pause_time));
										return;
									}
									this.is_pausing_after_no_children = false;

									// Events
									if (this.has_events && this.can_event && this.signal_event(this.active_node, "done", {})) {
										this.can_event = false;
										this.looping = false;
										return;
									}
									this.can_event = true;
								}
							}
						}
					}

					// Continue to next
					while (true) {
						next = this.active_node.nextSibling;
						if (next === null) {
							// Pause after
							if (!this.is_pausing_after && ((pause_time = this.get_pause_time(this.active_node.parentNode, false)) > 0.0)) {
								// Events
								if (
									this.has_events_stack[this.has_events_stack.length - 2] &&
									this.can_event &&
									this.signal_event(this.active_node.parentNode, "pause-after", {})
								) {
									this.can_event = false;
									this.looping = false;
									return;
								}
								this.can_event = true;

								// Loop timeout
								this.is_pausing_after = true;
								this.loop_time_last += 1000 * pause_time;
								this.looping = false;
								this.loop_timeout = setTimeout(this.loop_function, (this.loop_timeout_time = 1000 * pause_time));
								return;
							}
							this.is_pausing_after = false;

							// Events
							if (
								this.has_events_stack[this.has_events_stack.length - 2] &&
								this.can_event &&
								this.signal_event(this.active_node.parentNode, "done", {})
							) {
								this.can_event = false;
								this.looping = false;
								return;
							}
							this.can_event = true;

							// Return to parent
							this.active_node = this.active_node.parentNode;
							this.text_style_stack.pop();
							this.full_appear_stack.pop();
							this.has_events_stack.pop();

							if (this.text_style_stack.length == 1) {
								// Completely done
								this.active_node = null;
								this.looping = false;
								return;
							}

							this.text_style = this.text_style_stack[this.text_style_stack.length - 1];
							this.full_appear = this.full_appear_stack[this.full_appear_stack.length - 1];
							this.has_events = this.has_events_stack[this.has_events_stack.length - 1];
						}
						else {
							// Done
							break;
						}
					}
					this.active_node = next;
					this.has_events_stack[this.has_events_stack.length - 1] = (this.has_events = this.get_has_events(this.active_node));
					is_first_action = false;
				}
			},

			get_character_time: function (c) {
				return this.tick_time_per_character;
			},
			get_text_style: function (element) {
				var st = this.get_style(element, "white-space");
				if (st == "pre" || st == "pre-wrap") {
					return TEXT_STYLE_PRESERVE;
				}
				else if (st == "pre-line") {
					return TEXT_STYLE_PRESERVE_LINES;
				}
				else {
					return TEXT_STYLE_NORMAL;
				}
			},
			get_full_appear: function (element) {
				var v = element.getAttribute("data-typewrite-full");

				if (v === "true") return true;
				if (v === "false") return false;

				return (this.full_appear_stack.length > 0 ? this.full_appear_stack[this.full_appear_stack.length - 1] : false);
			},
			get_pause_time: function (element, before) {
				var v = element.getAttribute(before ? "data-typewrite-wait-before" : "data-typewrite-wait-after");
				if (v) {
					v = parseFloat(v);
					return isFinite(v) && v > 0.0 ? v : 0.0;
				}
				return 0.0;
			},
			get_has_events: function (element) {
				var v = element.getAttribute("data-typewrite-events");
				return (v === "true");
			},

			signal_event: function (element, event, data) {
				// Send event
				this.event_stop = false;
				element.dispatchEvent(new CustomEvent("typewrite-event", { detail: {
					typewriter: this,
					type: event,
					data: data
				} }));

				// If this returns true, it means looping should be stopped
				return this.event_stop;
			},

			remove_class: function (element, cls) {
				$(element).removeClass(cls); // jQuery is the easiest way
			},
			get_style: function (el, prop) {
				// Not robust, but whatever
				return getComputedStyle(el, null).getPropertyValue(prop);
			}

		};

		return Typewriter;

	})();

	var Readme = function (return_location) {
		var self = this;
		this.rm = $(".ReadMe");
		this.fast = false;

		// Attention timer
		this.attention = this.rm.find(".ReadMeAttention");
		this.attention.removeClass("ReadMeAttentionAlt");
		this.attention_on = false;
		this.attention_timer_time = 0.5 * 1000;
		this.attention_timer = null;

		// Get sections
		this.sections = this.rm.find(".ReadMeSection");
		this.sections.addClass("ReadMeSectionHidden");
		this.section_current_id = -1;
		this.section_current = null;
		this.typewriter = null;

		// Events
		this.event_catchers = this.rm.find(".ReadMeEventCatcher");
		this.fcns_on_event_catchers_tw = [];
		var e = this.event_catchers.each(function (i) {
			var f;
			this.addEventListener("typewrite-event", f = function (event) {
				return self.on_typewrite_event_capture.call(self, this, event.detail, i);
			}, false);
			self.fcns_on_event_catchers_tw.push(f);
		});

		// Buttons
		this.confirm_buttons = this.rm.find(".ReadMeConfirmButton");
		this.confirm_buttons.on("click", this.fcn_on_confirm_buttons_click = function (event) {
			return self.on_confirm_button_click.call(self, $(this), event)
		});

		// Inputs
		this.inputs = this.rm.find(".ReadMeRadioBoxInput");
		this.inputs.on("change", this.fcn_on_inputs_change = function (event) {
			return self.on_input_change.call(self, $(this), event)
		});

		// Countdown
		this.countdown_timer = null;
		this.countdown_time = 0;
		this.countdown_time_length = 0;
		this.countdown_element = null;

		// Return location
		this.return_location = return_location || "install";

		// Hider
		this.hider = $(".ReadMeHeaderBlocker");
		this.hider.addClass("ReadMeHeaderBlockerEnabled");

		// Start
		this.show_section(0);
	};

	var links_setup_state = 0;
	Readme.setup_links = function () {
		if (links_setup_state != 0) return;
		links_setup_state = 1;

		var links = $(".ReadMeModifyLink");
		var modify_attributes = { "href": "#readme" , "target": null, "download": null };
		for (var i = 0; i < links.length; ++i) {
			var a_id = 0;
			var o = $(links[i]);

			for (var attr_name in modify_attributes) {
				var a = o.attr(attr_name);

				if (a != null) {
					// Save
					o.attr("data-readme-modified-attribute-name-" + a_id, attr_name);
					o.attr("data-readme-modified-attribute-value-" + a_id, a);

					// Change
					if (modify_attributes[attr_name] === null) {
						// Remove
						o.removeAttr(attr_name);
					}
					else {
						// Change
						o.attr(attr_name, modify_attributes[attr_name]);
					}

					// Increase id
					++a_id;
				}
			}

			// Set count
			o.attr("data-readme-modified-attribute-count", a_id);
		}
	};
	Readme.fix_links = function () {
		if (links_setup_state != 1) return;
		links_setup_state = 2;

		var links = $(".ReadMeModifyLink");
		for (var i = 0; i < links.length; ++i) {
			var o = $(links[i]);
			var a_count = parseInt(o.attr("data-readme-modified-attribute-count"));
			o.removeAttr("data-readme-modified-attribute-count");

			for (var a_id = 0; a_id < a_count; ++a_id) {
				var a1, a2;
				var attr_name = o.attr(a1 = ("data-readme-modified-attribute-name-" + a_id));
				var attr_value = o.attr(a2 = ("data-readme-modified-attribute-value-" + a_id));

				o.removeAttr(a1).removeAttr(a2).attr(attr_name, attr_value)
			}
		}
	};

	Readme.prototype = {
		constructor: Readme,

		done: function () {
			// Clear timeout
			if (this.attention_timer !== null) {
				clearInterval(this.attention_timer);
				this.attention_timer = null;
			}

			// Stop tw
			this.typewriter.stop();

			// Remove events
			for (var i = 0; i < this.event_catchers.length; ++i) {
				this.event_catchers[i].removeEventListener("typewrite-event", this.fcns_on_event_catchers_tw[i], false);
			}
			this.confirm_buttons.off("click", this.fcn_on_confirm_buttons_click);
			this.inputs.off("change", this.fcn_on_inputs_change);

			// Remove hider
			this.hider.removeClass("ReadMeHeaderBlockerEnabled");

			// Hide old
			if (this.section_current !== null) {
				this.section_current.addClass("ReadMeSectionHidden");
			}

			// Fix the links
			Readme.fix_links();

			// Go to a different location
			window_hash.goto_page(this.return_location, {});
		},

		attention_loop: function () {
			this.attention_on = !this.attention_on;
			if (this.attention_on) {
				this.attention.addClass("ReadMeAttentionAlt");
			}
			else {
				this.attention.removeClass("ReadMeAttentionAlt");
			}
		},

		show_section: function (id) {
			// Hide old
			if (this.section_current !== null) {
				this.section_current.addClass("ReadMeSectionHidden");
			}

			// Change section
			if (id >= 0 && id < this.sections.length) {
				this.section_current_id = id;
				this.section_current = $(this.sections[this.section_current_id]);
				this.section_current.removeClass("ReadMeSectionHidden");
			}

			// Typewrite
			if (this.typewriter == null) {
				this.typewriter = new Typewriter(this.section_current[0]);
			}
			else {
				this.typewriter.stop();
				this.typewriter.change(this.section_current[0]);
			}
			if (!this.fast) {
				this.typewriter.start();
			}

			// Timers
			this.section_current.find(".ReadMeCountDownTime").each(function () {
				this.textContent = this.getAttribute("data-readme-countdown-time");
			});


			// What to do
			if (id == 0) {
				// Set timer
				if (this.attention_timer !== null) clearTimeout(this.attention_timer);
				this.attention_timer = setInterval(this.attention_loop.bind(this), this.attention_timer_time);
			}
			else {
				// Remove timer
				if (this.attention_timer !== null) {
					clearTimeout(this.attention_timer);
					this.attention_timer = null;
				}

				// Id check
				if (id == 1) {
					// Reset inputs
					this.section_current.find("input").prop("checked", false);
				}
			}
		},

		on_confirm_button_click: function (obj, event) {
			var id = parseInt(obj.attr("data-readme-button-id"));

			if (id == 0) {
				// Show
				this.show_section(1);
			}
			else if (id == 1) {
				// Show
				var v = this.section_current.find(".ReadMeForm").find('[name="readme-answer"]:checked').val();
				this.show_section((v === "yes") ? 2 : 3);
			}
			else if (id == 2 || id == 3) {
				// Show
				this.show_section(4);
			}
			else if (id == 4) {
				// Show
				this.show_section(5);
			}
			else if (id == 5) {
				// Show
				this.show_section(6);
			}
			else if (id == 6) {
				// Done
				this.done();
			}
		},
		on_typewrite_event_capture: function (obj, event, id) {
			if (id == 0) {
				if (event.type == "show") {
					// Pause and wait
					event.typewriter.pause();
				}
			}
			else if (id == 1 || id == 2 || id == 3) {
				if (event.type == "show") {
					// Pause and wait
					event.typewriter.pause();

					// Activate timer
					this.countdown_element = obj.previousSibling;
					this.countdown_time = parseInt(this.countdown_element.getAttribute("data-readme-countdown-time")) || 0;
					this.countdown_time_length = this.countdown_time.toString().length;

					if (this.countdown_timer !== null) clearInterval(this.countdown_timer);
					this.countdown_timer = setInterval(this.on_countdown_timer.bind(this), 1000);
				}
			}
		},
		on_input_change: function (obj, event) {
			// Resume
			this.typewriter.resume();
		},

		on_countdown_timer: function () {
			// Decrease
			--this.countdown_time;

			// End
			if (this.countdown_time <= 0) {
				// Clear
				this.countdown_time = 0;
				clearInterval(this.countdown_timer);
				this.countdown_timer = null;

				// Resume
				this.typewriter.resume();
			}

			// Set value
			var s = this.countdown_time.toString();
			while (s.length < this.countdown_time_length) s = "0" + s;
			this.countdown_element.textContent = s;
		},

	};

	return Readme;

})();

// Entry
document.addEventListener("api_4cs_version_check", function (event) {
	current_version = event.detail.version;
	current_version_received = true;
	version_compare();
}, false);
$(document).ready(function () {
	// Events
	//Readme.setup_links();
	$("#show_all_browser").on("click", {}, function (event) {
		if (event.which == 1) {
			change_browser_display(true);
			return false;
		}
		return true;
	});
	$("#developer_change").on("click", {}, function (event) {
		if (event.which == 1) {
			change_style_display(["NonDeveloper","Developer"], "Developer", true);
			return false;
		}
		return true;
	});
	$("#help_change").on("click", {}, function (event) {
		if (event.which == 1) {
			change_style_display(["NoHelp","Help"], "Help", true);
			return false;
		}
		return true;
	});
	$(".Link").on("click", {}, function (event) {
		if (event.which == 1) {
			event.stopPropagation();
			return true;
		}
		return true;
	});
	$(".Hardlink").on("click", {}, function (event) {
		if (event.which == 1) {
			var ex = {};
			var v = $(this).attr("id").substr("hardlink_enable_".length);
			if (!(v in window_hash.vars)) ex[v] = null;
			window_hash.goto_page(
				window_hash.page,
				window_hash.vars,
				ex
			);
			return false;
		}
		return true;
	});
	$(".NavigationLink").on("click", {}, function (event) {
		if (event.which == 1) {
			var v = $(this).attr("maintain");
			v = (v === undefined ? page_vars_maintain : page_vars_maintain.concat(v.split(",")));
			window_hash.goto_page(
				$(this).attr("href")[0] == "#" ? $(this).attr("href").substr(1) : $(this).attr("id").substr("navigation_".length),
				maintain_vars(window_hash.vars, v)
			);
			return false;
		}
		return true;
	});
	$(".ImageLink").on("click", {}, function (event) {
		if (event.which == 1 || event.which === undefined) {
			var href = $(this).attr("href_update").substr(1).split("?");
			var v = $(this).attr("maintain");
			v = (v === undefined ? page_vars_maintain : page_vars_maintain.concat(v.split(","))).concat(["scroll"]);
			window_hash.goto_page(
				window_hash.modify_href(href[0]),
				maintain_vars(window_hash.vars, v),
				(href[1] ? window_hash.parse_vars(href[1]) : undefined)
			);

			image_preview($(this));
			return false;
		}
		return true;
	});
	$(".InternalLink").on("click", {}, function (event) {
		if (event.which == 1 && $(this).attr("href")[0] == "#") {
			var href = $(this).attr("href").substr(1).split("?");
			var v = $(this).attr("maintain");
			v = (v === undefined ? page_vars_maintain : page_vars_maintain.concat(v.split(",")));
			window_hash.goto_page(
				window_hash.modify_href(href[0]),
				maintain_vars(window_hash.vars, v),
				(href[1] ? window_hash.parse_vars(href[1]) : undefined)
			);
			return false;
		}
		return true;
	});
	$(".AudioTestLink").on("click", {}, function (event) {
		if (event.which == 1) {
			audio_control_event($(this), event);
			return false;
		}
		return true;
	});
	$(".GuideLink").on("click", {}, function (event) {
		if (event.which == 1 && $(this).attr("href")[0] == "#") {
			var href = $(this).attr("href").substr(1).split("?");
			var v = $(this).attr("maintain");
			v = (v === undefined ? page_vars_maintain : page_vars_maintain.concat(v.split(",")));
			window_hash.goto_page(
				window_hash.modify_href(href[0]),
				maintain_vars(window_hash.vars, v),
				(href[1] ? window_hash.parse_vars(href[1]) : undefined)
			);
			return false;
		}
		return true;
	});
	$(".QA .InternalLink,.QA .ExternalLink").on("click", {}, function (event) {
		if (event.which == 1) {
			event.stopPropagation();
			return true;
		}
		return true;
	});

	// Change log
	get_change_log();

	// Title
	default_title = "dnsev / 4cs";

	// Page display
	$(window).on("hashchange", {}, window_hash.on_hashchange);
	window_hash.on_hashchange(null);
});


