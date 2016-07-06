/**
 * A task runner used to organize http request steps.
 */
function TaskRunner(tasks) {
	this.tasks = tasks;
	this.context = {
		start: false,
		index: 0,
		results: [],
		error: null
	};
}

TaskRunner.prototype.run = function (callback) {
	if (this.tasks.length === 0) {
		callback(null, null);
		return;
	}
	
	this.context.start = true;
	
	var self = this;
	var next = function (err, result) {
		if (err) {
			self.context.error = err;
			self.context.start = false;
			callback(err, null);
			return;
		}
		
		self.context.results[self.context.index] = result;
		if (self.context.index + 1 === self.tasks.length || self.context.requestResult) {
			self.context.start = false;
			callback(null, self.context.requestResult);
			return;
		}
		
		self.context.index += 1;
		self.tasks[self.context.index](self.context, next);
	}
	
	this.tasks[this.context.index](this.context, next);
}

module.exports = TaskRunner;
