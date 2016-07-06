var crypto = require('crypto');

function format(options) {
	return function (ctx, next) {
		if (!ctx.authInfo || ctx.authInfo.authType !== 'Digest') {
			return next(null);
		}
		
		var auth = ctx.authInfo;
		var realm = auth.realm;
		var qop = auth.qop;
		var nonce = auth.nonce;
		var username = options.username;
		var password = options.password;
		
		// HA1=MD5(username:realm:password)
		var ha1 = md5(`${username}:${realm}:${password}`);
		
		// HA2=MD5(method:digestURI)
		var ha2 = md5(`${method}:${path}`);
		
		// response=MD5(HA1:nonce:nonceCount:cnonce:qop:HA2)
		var nonceCount = '00000001';
		var cnonce = '0a4f113b';
		var response = md5(`${ha1}:${nonce}:${nonceCount}:${cnonce}:${qop}:${ha2}`);
		var authHeader = `Digest username="${username}", realm="${realm}", nonce="${nonce}", uri="${path}", qop=${qop}, nc=${nonceCount}, cnonce="${cnonce}", response="${response}"`;
		
		ctx.requestOptions.headers['Authorization'] = authHeader;
		next(null);
	};
}

function md5(str) {
	var hash = crypto.createHash('md5');
	hash.update(str);
	return hash.digest('hex');
}

module.exports = format;
