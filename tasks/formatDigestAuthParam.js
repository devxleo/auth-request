var crypto = require('crypto');

function format(options, param, data, callback) {
	
	if (!options.username || !options.password) {
		return callback(new Error('Need digest auth info.'));
	}
	
	var realm = data.realm;
	var qop = data.qop;
	var nonce = data.nonce;
	var username = options.username;
	var password = options.password;
	var method = param.method;
	var path = param.path;
	
	// HA1=MD5(username:realm:password)
	var ha1 = md5(`${username}:${realm}:${password}`);
	
	// HA2=MD5(method:digestURI)
	var ha2 = md5(`${method}:${path}`);
	
	// response=MD5(HA1:nonce:nonceCount:cnonce:qop:HA2)
	var nonceCount = '00000001';
	var cnonce = '0a4f113b';
	var response = md5(`${ha1}:${nonce}:${nonceCount}:${cnonce}:${qop}:${ha2}`);
	var authHeader = `Digest username="${username}", realm="${realm}", nonce="${nonce}", uri="${path}", qop=${qop}, nc=${nonceCount}, cnonce="${cnonce}", response="${response}"`;
	
	param.headers['Authorization'] = authHeader;
	callback(null, param);
}

function md5(str) {
	var hash = crypto.createHash('md5');
	hash.update(str);
	return hash.digest('hex');
}

module.exports = format;
