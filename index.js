var Runner = require('./runner');
var makeRequest = require('./tasks/makeRequest');
var formatRequestOption = require('./tasks/formatRequestOption');
var formatBasicAuthOption = require('./tasks/formatBasicAuthOption');
var formatDigestAuthOption = require('./tasks/formatDigestAuthOption');

/**
 * @param {object} options
 * @param {string} options.scheme - http or https, defaults to http
 * @param {string} options.hostname - hostname, defaults to localhost
 * @param {string} options.port - port, defaults to 80 for http, 443 for https
 * @param {string} options.path - request path, defaults to '/'
 * @param {string} options.method - request method, defaults to 'GET'
 * @param {object} options.headers - custom request headers
 * @param {object} options.data - request data 
 * @param {string} options.username
 * @param {string} options.password
 */
function request(options, callback) {
	var runner = new Runner([
		formatRequestOption(options),
		makeRequest(options),
		formatBasicAuthOption(options),
		formatDigestAuthOption(options),
		makeRequest(options)
	]);
	
	runner.run(function (err, result) {
		if (err) return callback(err);
		callback (null, result);
	});
}

module.exports = request;
