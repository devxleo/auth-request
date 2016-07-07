function format(options, param, data, callback) {
		if (!options.username || !options.password) {
			return callback(new Error('Need basic auth info.'));
		}
		param.auth = options.username + ':' + options.password;
		callback(null, param);
}

module.exports = format;
