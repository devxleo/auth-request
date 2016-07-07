/**
 * A task runner used to organize http request steps.
 *
 * @param {object} tasks
 * @param {function} tasks.formatParam
 * @param {function} tasks.makeRequest
 * @param {function} tasks.formatBasicAuthParam
 * @param {function} tasks.formatDigestAuthParam
 */
function Runner(tasks) {
	this.formatParam = tasks.formatParam;
	this.formatBasicAuthParam = tasks.formatBasicAuthParam;
	this.formatDigestAuthParam = tasks.formatDigestAuthParam;
	this.makeRequest = tasks.makeRequest;
}

Runner.prototype.run = function (options, callback) {
	var self = this;
	this.formatParam(options, function (err, param) {
		if (err) return callback(err);
		self.makeRequest(options, param, function (err, result) {
			if (err) return callback(err);
			if (result.status !== 401) return callback(null, result);
			if (result.data.authType === 'Basic') {
				return self.formatBasicAuthParam(options, param, result.data, function (err, param) {
					if (err) return callback(err);
					self.makeRequest(options, param, callback);
				});
			}
			if (result.data.authType === 'Digest') {
				return self.formatDigestAuthParam(options, param, result.data, function (err, param) {
					if (err) return callback(err);
					self.makeRequest(options, param, callback);
				});
			}
			callback(null, result);
		});
	});
}

module.exports = Runner;
