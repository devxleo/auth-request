var express = require('express');
var bodyParser = require('body-parser');
var auth = require('http-auth');

var basic = auth.basic({
	realm: 'auth-request',
	file: __dirname + '/basic.htpasswd'
});

var digest = auth.digest({
	realm: 'auth-request',
	file: __dirname + '/digest.htdigest'
});

var app = express();
app.use(bodyParser.json());

app.post('/test', function (req, res) {
	res.status(200).json(req.body);
});

app.post('/testBasicAuth', auth.connect(basic), function (req, res) {
	res.status(200).json(req.body);
});

app.post('/testDigestAuth', auth.connect(digest), function (req, res) {
	res.status(200).json(req.body);
});

app.listen(8080, function () {
	console.log('The server is listening on port 8080...');
});
