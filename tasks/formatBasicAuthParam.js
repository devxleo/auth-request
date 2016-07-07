function format(options, param, data, callback) {
		param.auth = options.username + options.password;
		callback(null, param);
}

module.exports = format;
