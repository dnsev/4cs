


function Loop() {
	this.loops = new Array();
	this.timer = null;
	this.timeout = 100;
	this.steps = 100;
}
Loop.prototype.for_lt = function (i, limiter, incr, data, body, done) {
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
}
Loop.prototype.for_le = function (i, limiter, incr, data, body, done) {
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
}
Loop.prototype.for_gt = function (i, limiter, incr, data, body, done) {
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
}
Loop.prototype.for_ge = function (i, limiter, incr, data, body, done) {
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
}
Loop.prototype.loop = function () {
	this.timer = null;

	var ll = this.loops.length;
	var loop = this.loops[ll - 1];

	// Limit
	var i_max = loop.step_limiter(loop.i + this.steps, loop.limiter);

	// Loop
	while (loop.compare(loop.i, i_max)) {
		// Body
		loop.body(loop.i, loop.data, this);
		loop.i += loop.i_incr;
		// New loop was added
		if (this.loops.length > ll) {
			this.loops[this.loops.length - 1].decrement = true;
			return;
		}
	}

	// Next
	if (loop.i < loop.limiter) {
		var self = this;
		this.timer = setTimeout(function () { self.loop(); }, this.timeout);
	}
	else {
		// Done
		loop.done(loop.i, loop.data, this);

		// Chain into any other loops
		if (this.loops.pop().decrement) {
			var self = this;
			this.timer = setTimeout(function () { self.loop(); }, this.timeout);
		}
	}
}
Loop.prototype.stop = function () {
	if (this.timer !== null) {
		clearTimeout(this.timer);
		this.timer = null;
	}
	this.loops = new Array();
}




