function format(options) {
	return function (ctx, next) {
		if (!ctx.authInfo || ctx.authInfo.authType !== 'Basic') {
			return next(null);
		}
		ctx.requestOptions.auth = options.username + options.password;
		next(null);
	};
}

module.exports = format;
