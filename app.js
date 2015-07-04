var express = require('express');
var app = express();

//Needed for the livereload. Could be avoided by using a browser plugin
app.use(require('connect-livereload')());
app.use(express.static('app'));

var server = app.listen(3000, function () {
	var host = server.address().address;
	var port = server.address().port;
	console.log('Example app listening at http://%s:%s', host, port);
});