var request = require('../index');

var options = {
	hostname: 'localhost',
	port: '8080',
	path: '/test',
	method: 'POST',
	data: { message: 'hello world' }
};

request(options, function (err, result) {
	if (err) {
		console.log('oops..........');
		console.log(err);
		return;
	}
	
	console.log(result);
});
