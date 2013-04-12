///////////////////////////////////////////////////////////////////////////////
// Non-freezing loops
///////////////////////////////////////////////////////////////////////////////

function Loop() {
	this.loops = new Array();
	this.timer = null;
	this.timeout = 100;
	this.steps = 100;
	this.special = 0;
}
Loop.prototype = {
	constructor: Loop,

	for_lt: function (i, limiter, incr, data, body, done) {
		// Loop
		this.loops.push(
			{
				"compare": function (i, limit) { return i < limit; },
				"step_limiter": function (i, limit) { return (i > limit ? limit : i); },
				"i": i,
				"i_incr": incr,
				"limiter": limiter,
				"data": data,
				"body": body,
				"done": done,
				"decrement": false
			}
		);
		this.loop();
	},
	for_le: function (i, limiter, incr, data, body, done) {
		// Loop
		this.loops.push(
			{
				"compare": function (i, limit) { return i <= limit; },
				"step_limiter": function (i, limit) { return (i > limit ? limit : i); },
				"i": i,
				"i_incr": incr,
				"limiter": limiter,
				"data": data,
				"body": body,
				"done": done,
				"decrement": false
			}
		);
		this.loop();
	},
	for_gt: function (i, limiter, incr, data, body, done) {
		// Loop
		this.loops.push(
			{
				"compare": function (i, limit) { return i > limit; },
				"step_limiter": function (i, limit) { return (i < limit ? limit : i); },
				"i": i,
				"i_incr": incr,
				"limiter": limiter,
				"data": data,
				"body": body,
				"done": done,
				"decrement": false
			}
		);
		this.loop();
	},
	for_ge: function (i, limiter, incr, data, body, done) {
		// Loop
		this.loops.push(
			{
				"compare": function (i, limit) { return i >= limit; },
				"step_limiter": function (i, limit) { return (i < limit ? limit : i); },
				"i": i,
				"i_incr": incr,
				"limiter": limiter,
				"data": data,
				"body": body,
				"done": done,
				"decrement": false
			}
		);
		this.loop();
	},
	forever: function (data, body, done) {
		// Loop
		this.loops.push(
			{
				"compare": function (i, limit) { return true; },
				"step_limiter": function (i, limit) { return 0; },
				"i": 0,
				"i_incr": 0,
				"limiter": 0,
				"data": data,
				"body": body,
				"done": done,
				"decrement": false
			}
		);
		this.loop();
	},

	Break: function () {
		this.special = 1;
		return undefined;
	},
	Continue: function () {
		this.special = 2;
		return undefined;
	},

	loop: function () {
		this.timer = null;

		var ll = this.loops.length;
		var loop = this.loops[ll - 1];

		// Limit
		var i_max = loop.step_limiter(loop.i + this.steps, loop.limiter);
		var j;
		var typeof_number = typeof(1.0);

		// Loop
		while (loop.compare(loop.i, i_max)) {
			// Body
			j = loop.body(loop.i, loop.data, this);
			loop.i = (typeof(j) === typeof_number ? j : loop.i) + loop.i_incr;
			// New loop was added
			if (this.loops.length > ll) {
				this.loops[this.loops.length - 1].decrement = true;
				return;
			}
			if (this.special == 1) {
				// Set to 0 later
				break;
			}
			if (this.special == 2) {
				this.special = 0;
			}
		}

		// Next
		if (loop.i < loop.limiter && this.special != 1) {
			var self = this;
			this.timer = setTimeout(function () { self.loop(); }, this.timeout);
		}
		else {
			// Done
			this.special = 0;
			loop.done(loop.i, loop.data, this);

			// Chain into any other loops
			if (this.loops.pop().decrement) {
				var self = this;
				this.timer = setTimeout(function () { self.loop(); }, this.timeout);
			}
		}
	},
	stop: function () {
		if (this.timer !== null) {
			clearTimeout(this.timer);
			this.timer = null;
		}
		this.loops = new Array();

		this.special = 1;
		return undefined;
	}
};



