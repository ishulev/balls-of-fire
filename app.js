var express = require('express');
var app = express();

//Needed for the livereload. Could be avoided by using a browser plugin
//Further note: The following line is supposed to only inject the necessary js for the livereload.
//	The actual call from the server to the browser is done from the gulp file, through that js code.
//	If the js is not inserted, make sure that the main html file has a body tag.
app.use(require('connect-livereload')());
app.use(express.static('app'));

var server = app.listen(3000, function () {
	var host = server.address().address;
	var port = server.address().port;
	console.log('Example app listening at http://%s:%s', host, port);
});