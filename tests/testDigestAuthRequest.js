var request = require('../index');

var options = {
	hostname: 'localhost',
	port: 8080,
	path: '/testDigestAuth',
	method: 'POST',
	data: { message: 'hello digest auth' },
	username: 'leo',
	password: 'nju'
};

request(options, function (err, result) {
	if (err) return console.log(err);
	console.log(result);
});
