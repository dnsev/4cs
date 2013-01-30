function is_chrome() {
	return ((navigator.userAgent + "").indexOf(" Chrome/") >= 0);
}
function is_firefox() {
	return $.browser.mozilla;
}

function change_developer_display(on) {
	if (on) {
		$(".Developer").css("display", "block");
		$(".NonDeveloper").css("display", "none");
	}
	else {
		$(".NonDeveloper").css("display", "block");
		$(".Developer").css("display", "none");
	}
}
function change_browser_display(show_all) {
	if (!show_all && is_chrome()) {
		$(".SpecificBrowser").css("display", "block");
		$(".Firefox").css("display", "none");
		$(".UniversalBrowser").css("display", "none");
		$(".Chrome").css("display", "block");
	}
	else if (!show_all && is_firefox()) {
		$(".SpecificBrowser").css("display", "block");
		$(".Chrome").css("display", "none");
		$(".UniversalBrowser").css("display", "none");
		$(".Firefox").css("display", "block");
	}
	else {
		$(".Firefox").css("display", "block");
		$(".Chrome").css("display", "block");
		$(".SpecificBrowser").css("display", "none");
		$(".UniversalBrowser").css("display", "block");
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
WindowHash.prototype.on_change = function (event) {
	if (this.hash == window.location.hash) return;

	// Get the new hash
//	this.hash = decodeURIComponent(window.location.href).split("#");
//	this.hash = this.hash.splice(1, this.hash.length - 1).join("#");
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
};
WindowHash.prototype.goto_page = function (page, vars) {
	page = page || "";
	vars = vars || {};

	var i = 0;
	for (var v in vars) {
		page += (i == 0 ? "?" : "&") + v + "=" + vars[v];
		i += 1;
	}

	window.location.hash = page;
};
WindowHash.prototype.has_previous = function () {
	return (this.history_index > 0);
};
WindowHash.prototype.goto_previous = function () {
	if (this.history_index > 0) {
		this.history_mode = -1;
		window.location.hash = this.history[this.history_index - 1][0];
		this.on_change();
		this.history_mode = 0;

		return true;
	}
	return false;
};
WindowHash.prototype.has_next = function () {
	return (this.history_index < this.history.length - 1);
};
WindowHash.prototype.goto_next = function () {
	if (this.history_index < this.history.length - 1) {
		this.history_mode = 1;
		window.location.hash = this.history[this.history_index + 1][0];
		this.on_change();
		this.history_mode = 0;

		return true;
	}
	return false;
};
var window_hash = new WindowHash();

// Pages
function PageBrowser() {

}
PageBrowser.prototype.open = function (page, vars, refresh) {
	// Which page
	$(".Content").removeClass("ContentActive");
	$(".NavigationLink").removeClass("NavigationLinkCurrent");
	if (page != "about" && page != "issues" && page != "source" && page != "wiki") page = "install";
	$("#content_" + page).addClass("ContentActive");
	$("#navigation_" + page).addClass("NavigationLinkCurrent");
};
var page_browser = new PageBrowser();

// Entry
$(document).ready(function () {
	change_browser_display(false);
	change_developer_display(false);

	$("#show_all_browser").on("click", {}, function (event) {
		if (event.which == 1) {
			change_browser_display(true);
			return false;
		}
		return true;
	});
	$(".NavigationLink").on("click", {}, function (event) {
		if (event.which == 1 && $(this).attr("href")[0] != "#") {
			window.location.hash = "#" + $(this).attr("id").substr("navigation_".length);
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

	var hashchange = function (event) {
		window_hash.on_change(event);
		page_browser.open(window_hash.page, window_hash.vars, event===null);
	};
	$(window).on("hashchange", {}, hashchange);
	hashchange(null);
});


