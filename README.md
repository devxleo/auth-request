# auth-request
Node request util that supports request with basic or digest authentication.

## Installation

```bash
$ npm install auth-request
```

## Features

* Support normal request, basic auth request, and digest auth request.
* Support both http and https

## Quick Start

```js
var request = require('auth-request');
var options = {
	scheme: 'http',
	hostname: 'localhost',
	port: 8080,
	path: '/path/to/resource',
	method: 'POST',
	data: { message: 'hello world' },
	username: 'leo',
	password: 'xxx'
};
request(options, function (err, result) {
	if (err) return console.log(err);
	console.log(result);
});
```

## API

```js
var request = require('auth-request');
```

### request(options, callback)

This is the main function used to make http request, accepts an option and a callback.

#### options

A json object that may contain following fields.

##### scheme

URL resource scheme, support http or https, defaults to http.

##### hostname

Request host, defaults to 'localhost'.

##### port

Request port, defaults to 80 when http, or 443 when https.

##### path

Request path, defaults to '/'.

##### method

Request method, defaults to 'GET'.

##### headers

Custom headers, optional, which will be appended to request headers.

##### data

Request data, if provided, data will be JSON-stringified to the request body, and content type will be set to 'application/json'.

##### username

Basic auth or digest auth username

##### password

Basic auth or digest auth password

#### callback(err, result)

Request callback function, called with error and result. The result object is of this structure `{ status: 200, data: ... }`.

## Test

There is a test server which you can use to test the correctness of an auth implementation.

## TODO

- Support digest auth with full coverage.
- Refine code structure to support extension.
- Refine test cases.
