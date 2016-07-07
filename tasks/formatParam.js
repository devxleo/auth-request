function format(options, callback) {
	var requestOptions = {
		hostname: options.hostname || 'localhost',
		port: options.port || (options.scheme === 'https' ? 443 : 80),
		path: options.path || '/',
		method: options.method || 'GET',
		headers: options.headers || {}
	};
	if (options.data) {
		requestOptions.headers['Content-Type'] = 'application/json';
		requestOptions.headers['Content-Length'] = JSON.stringify(options.data).length;
	}
	callback(null, requestOptions);
}

module.exports = format;
