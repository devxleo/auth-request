function format(options) {
	return function (ctx, next) {
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
		ctx.requestOptions = requestOptions;
		next(null, requestOptions);
	};
}

module.exports = format;
