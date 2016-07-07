var Runner = require('./runner');
var makeRequest = require('./tasks/makeRequest');
var formatParam = require('./tasks/formatParam');
var formatBasicAuthParam = require('./tasks/formatBasicAuthParam');
var formatDigestAuthParam = require('./tasks/formatDigestAuthParam');

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
	var runner = new Runner({
		makeRequest: makeRequest,
		formatParam: formatParam,
		formatBasicAuthParam: formatBasicAuthParam,
		formatDigestAuthParam: formatDigestAuthParam
	});
	
	runner.run(options, callback);
}

module.exports = request;
