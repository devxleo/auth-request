var http = require('http');
var https = require('https');

function makeRequest(options, param, callback) {
	var r = options.scheme === 'https' ? https : http;
	
	var req = r.request(param, function (res) {
		var statusCode = req.statusCode;
		
		if (statusCode === 401) {
			var wwwAuth = res.headers['www-authenticate'];
			var authInfo = parseAuthHeader(wwwAuth);
			if (authInfo.authType !== 'Basic' && authInfo.authType !== 'Digest') {
				return callback(new Error('Unknow auth type'));
			}
			return callback(null, authInfo);
		}	
		
		var result = '';
		res.setEncoding('utf8');
		res.on('data', function (chunk) {
			result += chunk;
		});
		res.on('end', function () {
			callback(null, {
				status: statusCode,
				data: result
			});
		});
	});
	
	req.on('error', callback);
	
	if (options.data) {
		req.write(JSON.stringify(options.data));
	}
	
	req.end();
}

function parseAuthHeader(str) {
	var regex = /(?:(\w+)="(.+?)")|(\w+)/g;
	var result = {};
	var match = null;
	while ((match = regex.exec(str)) !== null) {
		if (match[3]) {
			result.authType = match[3];
		} else {
			result[match[1]] = match[2];
		}
	}
}

module.exports = makeRequest;
