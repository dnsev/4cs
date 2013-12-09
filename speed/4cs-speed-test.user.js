// ==UserScript==
// @name           4cs Userscript Speed Test
// @version        0.1
// @namespace      dnsev
// @description    Use for testing browser Javascript speeds
// @grant          GM_info
// @include        https://github.com/dnsev/4cs/issues/45
// @icon           data:image/gif;base64,R0lGODlhEAAQAKECAAAAAGbMM////////yH5BAEKAAIALAAAAAAQABAAAAIllI+pB70KQgAPNUmroDHX7Gie95AkpCUn1ISlhKVR/MEre6dLAQA7
// @updateURL      https://raw.github.com/dnsev/4cs/master/speed/4cs-speed-test.user.js
// @downloadURL    https://raw.github.com/dnsev/4cs/master/speed/4cs-speed-test.user.js
// ==/UserScript==



// Basic loop test
var test_basic_loop = function (iterations) {
	// Start time
	var total_time = -(new Date).getTime();


	// Loop test
	var x = 0;
	for (var i = 0; i < iterations; ++i) {
		x += 1;
	}


	// Total time
	total_time += (new Date).getTime();

	// Return
	return total_time;
}



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
var execute_tests = function () {
	var iterations = 2000000;
	var repetitions = 20;

	var stat1 = statistics(test_basic_loop, iterations, repetitions);

	alert(format_stat("Basic loop", iterations, repetitions, stat1));
}



// Setup
var setup = function () {
	var elem = document.querySelector('a[href="#4cs-speed-test"]');
	if (elem) {
		// Replace

	}
};



// Test execution
var is_userscript = false;
try {
	is_userscript = (GM_info || GM_getMetadata) ? true : false;
}
catch (e) {
	is_userscript = false;
}
if (is_userscript) {
	setup();
}


