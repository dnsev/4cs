// ==UserScript==
// @name           4cs Userscript Speed Test
// @version        0.1
// @namespace      dnsev
// @description    Use for testing browser Javascript speeds
// @grant          GM_info
// @include        https://github.com/dnsev/4cs/issues/45*
// @icon           data:image/gif;base64,R0lGODlhEAAQAKECAAAAAGbMM////////yH5BAEKAAIALAAAAAAQABAAAAIllI+pB70KQgAPNUmroDHX7Gie95AkpCUn1ISlhKVR/MEre6dLAQA7
// @require        https://raw.github.com/dnsev/4cs/master/speed/4cs-speed-test-extra.user.js
// @updateURL      https://raw.github.com/dnsev/4cs/master/speed/4cs-speed-test.user.js
// @downloadURL    https://raw.github.com/dnsev/4cs/master/speed/4cs-speed-test.user.js
// ==/UserScript==



(function () {
	"use strict";


	// Settings
	//{
	var is_userscript = !window.is_4cs_speed_test_native;
	var update_url = "https://raw.github.com/dnsev/4cs/master/speed/4cs-speed-test.user.js";
	try {
		// Greasemonkey
		var m = /\/\/\s*@downloadURL\s+(\S+)/.exec(GM_info.scriptMetaStr);
		if (m) {
			update_url = m[1];
		}
	}
	catch (e) {
		try {
			// Tampermonkey
			update_url = GM_getMetadata("downloadURL").toString().trim();
		}
		catch (e) {
		}
	}
	//}



	// On ready execution
	var execute_asap = (function () {

		var check = function () {
			return (document.readyState == "complete" || document.readyState == "interactive") && document.querySelector("head") != null;
		};

		var asap_queue = [];
		var window_loaded = false, window_loaded_event;

		window.addEventListener("load", window_loaded_event = function () {
			// Exec asap_queue
			for (var i = 0; i < asap_queue.length; ++i) {
				asap_queue[i].callback.call(asap_queue[i].self);
			}
			asap_queue = null;
			// Loaded
			window_loaded = true;
			window.removeEventListener("load", window_loaded_event, false);
		}, false);

		var execute_asap = function (callback, ex_data) {
			if (window_loaded || check.call(this)) {
				if (ex_data) {
					// Remove
					if (asap_queue) {
						callback.call(this);
						for (var i = 0; i < asap_queue.length; ++i) {
							if (asap_queue[i] === ex_data) {
								asap_queue.splice(i, 1);
								break;
							}
						}
					}
				}
				else {
					callback.call(this);
				}
			}
			else {
				if (!ex_data) {
					ex_data = {
						timeout: null,
						callback: callback,
						self: this
					};
					if (asap_queue) {
						asap_queue.push(ex_data);
					}
				}
				ex_data.timeout = setTimeout(function () {
					ex_data.timeout = null;
					execute_asap.call(this, callback, ex_data);
				}, 10);
			}
		};

		return execute_asap;

	})();



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



	// Basic loop test
	var tests = {
		basic_loop: function (iterations) {
			// Start time
			var total_time = -time_now();


			// Loop test
			var x = 0;
			for (var i = 0; i < iterations; ++i) {
				x += 1;
			}


			// Total time
			total_time += time_now();

			// Return
			return total_time;
		},
		file_read_loop: function (iterations) {
			// Convert
			var src = window.atob(/,(.+)$/.exec(image_url)[1]);
			var array = new Uint8Array(new ArrayBuffer(src.length));
			for (var i = 0; i < src.length; ++i) {
				array[i] = src.charCodeAt(i);
			}

			// Start time
			var total_time = -time_now();


			// Source
			var x = 0;
			for (var i = 0; i < array.length; ++i) {
				x += array[i];
			}


			// Total time
			total_time += time_now();

			// Return
			return total_time;
		}
	};



	// Statistics
	var statistics = function (fcn, iterations, repetitions) {
		var time;
		var data = null;

		// Repeat
		for (var i = 0; i < repetitions; ++i) {
			// Call
			time = fcn.call(null, iterations);

			// Assign
			if (data) {
				if (time < data.min) data.min = time;
				else if (time > data.max) data.max = time;

				data.average += time;
			}
			else {
				data = {
					min: time,
					max: time,
					average: time
				};
			}
		}

		// Average
		data.average /= repetitions;

		// Done
		return data;
	}



	// Execute all
	var format_number = function (number) {
		number = number.toString();
		var pos = number.indexOf(".");
		if (pos < 0) pos = number.length;
		while ((pos -= 3) > 0) {
			number = number.substr(0, pos) + "," + number.substr(pos, number.length - pos);
		}
		return number;
	}
	var format_stat = function (label, iterations, repetitions, stats) {
		return label +
			"\n  Iterations: " + format_number(iterations) +
			"\n  Repetitions: " + format_number(repetitions) +
			"\n  Minimum time: " + stats.min + "ms" +
			"\n  Maximum time: " + stats.max + "ms" +
			"\n  Average time: " + stats.average + "ms" +
			"\n  Average iterations/second: " + format_number(Math.round(iterations / (stats.average / 1000.0)));
	}
	var execute_tests = function (target) {
		// Status
		if (target) {
			var padding = target.offsetHeight - target.clientHeight;
			target.style.height = "1px";
			target.value = "Executing tests...";
			target.style.height = (target.scrollHeight + padding) + "px";
		}

		// Timeout to make status change visible
		setTimeout(function () {
			var iterations = 2000000;
			var repetitions = 20;

			// Test
			var results = message.send("execute", true, {
				test: "basic_loop",
				iterations: iterations,
				repetitions: repetitions
			});
			results += "\n\n" + message.send("execute", true, {
				test: "file_read_loop",
				iterations: 1,
				repetitions: repetitions
			});

			// Target
			if (target) {
				var padding = target.offsetHeight - target.clientHeight;
				target.style.height = "1px";
				target.value = results;
				target.style.height = (target.scrollHeight + padding) + "px";
			}
			else {
				alert(results);
			}
		}.bind(this), 10);
	}



	// Setup
	var setup = function () {
		var elem = document.querySelector('a[href="#4cs-speed-test"]');
		if (elem) {
			// Replace
			var par = elem.parentNode;
			par.innerHTML = '<hr></hr>' +
				'<div id="4cs-speed-test"><b>Userscript test area</b> | <a href="#4cs-speed-test">Run tests</a></div>' +
				'<textarea style="width: 100%; resize: vertical; font-family: Courier New;" placeholder="test results" readonly="readonly"></textarea>';

			var textarea = par.querySelector("textarea");
			var e = par.querySelector("a");
			if (textarea && e) {
				// Click event
				e.addEventListener("click", function (event) {
					// Run tests
					execute_tests(textarea);

					// Stop event
					event.preventDefault();
					event.stopPropagation();
					return false;
				}, false);
			}
		}
	};



	// Message passing
	var message = (function () {

		// Message passing API
		var API = (function () {

			var API = function () {
				this.prefix = "api_4cs_speed_test_";
				this.event_listen_function = null;

				this.events = {};
			};

			var this_private = {

				receive: function (data) {
					var receiver_id = data.receiver_count || 0;

					// Callbacks
					var ret = undefined;
					var event_name = data.event;
					if (event_name in this.events) {

						// Trigger an event
						var ret_callback = (data.return_filter instanceof Function);
						var e = this.events[event_name];
						e.triggering = true;

						for (var i = 0, j = e.callbacks.length; i < j; ++i) {
							// Trigger
							ret = e.callbacks[i][0].call(this, data.data, e.callbacks[i][1], event_name);
							// Return callback
							if (ret_callback) {
								data.return_filter.call(this, ret, receiver_id, i);
							}
						}

						e.triggering = false;

						// Remove anything if necessary
						if (e.removals != null) {
							for (var i = 0; i < e.removals.length; ++i) {
								this.off(event_name, e.removals[i]);
							}
							e.removals = null;
						}

					}

					// Next receiver
					data.receiver_count = receiver_id + 1;

					// Return
					data.return_value = ret || data.return_value;
				}

			};

			API.prototype = {

				constructor: API,

				signal: function (event, data, return_filter) {
					// return_filter format: function (return_value, receiver_id, callback_id) with (this instanceof xch.API)
					var detail = {
						event: event,
						data: data,
						return_filter: return_filter,
						receiver_count: 0,
						return_value: undefined
					};
					document.dispatchEvent(new CustomEvent(this.prefix + "event", {
						detail: detail
					}));
					return detail.return_value;
				},
				on: function (event, callback, callback_data) {
					// callback format: function (event_data, callback_data, event_name) with (this instanceof xch.API)
					if (this.event_listen_function === null) {
						// API watching
						var self = this;
						document.addEventListener(this.prefix + "event", this.event_listen_function = (function (event) {
							this_private.receive.call(self, event.detail);
						}), false);
					}

					// Add event listener
					if (!(event in this.events)) {
						this.events[event] = {
							triggering: false,
							callbacks: [],
							removals: null
						};
					}

					// Add
					this.events[event].callbacks.push([callback, callback_data]);
				},
				off: function (event, callback) {
					if (event in this.events) {
						var e = this.events[event];
						if (e.triggering) {
							// Queue for removal
							if (e.removals == null) e.removals = [];
							e.removals.push(callback);
						}
						else {
							// Remove any callbacks
							e = e.callbacks;
							for (var i = 0; i < e.length; ++i) {
								if (e[i][0] == callback) {
									e.splice(i, 1);
									--i;
								}
							}
							// Remove if empty
							if (e.length == 0) {
								delete this.events[event];
							}
						}
					}
				},

				remove: function () {
					if (this.event_listen_function) {
						// Remove API listener
						document.removeEventListener(this.prefix + "event", this.event_listen_function, false);
						this.event_listen_function = null;
					}
				}

			};

			return API;

		})();
		var api = new API();

		// Functions
		var functions = {
			send: function (message_type, is_userscript, data) {
				return api.signal(message_type, {
					is_userscript: is_userscript,
					data: data
				});
			},
			on: function (message_type, callback) {
				return api.on(message_type, function (event, data) {
					var ret_val = undefined;
					if (event.is_userscript == is_userscript) {
						// Call
						ret_val = callback.call(this, event.data, data);
					}
					return ret_val;
				});
			}
		};

		// Done
		return functions;

	})();
	// Message hooks
	message.on("execute", function (event) {
		var results = "";

		// Find test
		if (event.test in tests) {
			var test_function = tests[event.test];

			// Stats
			var stats = statistics(test_function, event.iterations, event.repetitions);

			// Create results
			results = format_stat(event.test, event.iterations, event.repetitions, stats);
		}

		return results;
	});



	// Immediate setup
	execute_asap(function () {
		setup();
	});


})();
