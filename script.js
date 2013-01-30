function is_chrome() {
	return ((navigator.userAgent + "").indexOf(" Chrome/") >= 0);
}
function is_firefox() {
	return $.browser.mozilla;
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
		if (page != "about" && page != "issues" && page != "source" && page != "wiki") page = "install";
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

// Entry
$(document).ready(function () {
	$("#show_all_browser").on("click", {}, function (event) {
		if (event.which == 1) {
			change_browser_display(true);
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

	var hashchange = function (event) {
		window_hash.on_change(event);
		page_browser.open(window_hash.page, window_hash.vars, event===null);
	};
	$(window).on("hashchange", {}, hashchange);
	hashchange(null);
});


