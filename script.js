function is_chrome() {
	return ((navigator.userAgent + "").indexOf(" Chrome/") >= 0);
}
function is_firefox() {
	return ((navigator.userAgent + "").indexOf("Mozilla/") >= 0);
}

function text_to_html(str) {
	return str.replace(/&/g, "&amp;")
		.replace(/>/g, "&gt;")
		.replace(/</g, "&lt;")
		.replace(/"/g, "&quot;");
}

function change_developer_display(on) {
	if (on) {
		$(".Developer").removeClass("DeveloperDisplayOff").addClass("DeveloperDisplayOn");
		$(".NonDeveloper").removeClass("DeveloperDisplayOn").addClass("DeveloperDisplayOff");
	}
	else {
		$(".NonDeveloper").removeClass("DeveloperDisplayOff").addClass("DeveloperDisplayOn");
		$(".Developer").removeClass("DeveloperDisplayOn").addClass("DeveloperDisplayOff");
	}
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
		this.vars = {};
		h = h.splice(1, h.length - 1).join("?").split("&");
		for (var i = 0; i < h.length; ++i) {
			if (h[i].length == 0) continue;
			var p = h[i].split("=");
			this.vars[p[0]] = (p.length == 1) ? null : p.splice(1, p.length - 1).join("=");
		}

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
	}
};
var window_hash = new WindowHash();

// Pages
function PageBrowser() {

}
PageBrowser.prototype = {
	constructor: PageBrowser,
	open: function (page, vars, refresh) {
		// Which page
		$(".Content").removeClass("ContentActive");
		$(".NavigationLink").removeClass("NavigationLinkCurrent");
		if (page != "about" && page != "issues" && page != "source" && page != "wiki" && page != "changes") page = "install";
		$("#content_" + page).addClass("ContentActive");
		$("#navigation_" + page).addClass("NavigationLinkCurrent");

		change_developer_display(("dev" in vars));
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
	}
};
var page_browser = new PageBrowser();

// Change log
function get_change_log() {
	var log_url = "changelog.txt";

	$.ajax({
		type: "GET",
		url: log_url,
		dataType: "text",
		success: function (data, status, jqXHR) {
			parse_change_log(data);
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

	// Output version
	$(".Version").html(text_to_html(log[0][0]));

	// Output changelog
	var cl = $("#change_log");
	cl.css("display", "");
	cl.html("");
	for (var i = 0; i < log.length; ++i) {
		var list;
		cl.append(
			$(document.createElement("div"))
			.addClass("ChangeLogLabel")
			.html(text_to_html(log[i][0]) + (i == 0 ? "<span class=\"ChangeLogLabelCurrent\"> (current)</span>" : ""))
		);
		cl.append(
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
}


// Entry
$(document).ready(function () {
	$("#show_all_browser").on("click", {}, function (event) {
		if (event.which == 1) {
			change_browser_display(true);
			return false;
		}
		return true;
	});
	$("#developer_change").on("click", {}, function (event) {
		if (event.which == 1) {
			change_developer_display(true);
			return false;
		}
		return true;
	});
	$("#hardlink_enable_all,#hardlink_enable_dev").on("click", {}, function (event) {
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
			window_hash.goto_page(
				$(this).attr("href")[0] == "#" ? $(this).attr("href").substr(1) : $(this).attr("id").substr("navigation_".length),
				window_hash.vars
			);
			return false;
		}
		return true;
	});

	// Change log
	get_change_log();

	// Page display
	var hashchange = function (event) {
		window_hash.on_change(event);
		page_browser.open(window_hash.page, window_hash.vars, event===null);
	};
	$(window).on("hashchange", {}, hashchange);
	hashchange(null);
});


