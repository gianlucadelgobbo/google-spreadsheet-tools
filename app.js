
/**forever start -l forever.log -o out.log -e err.log  --debug -a app.js
 * Node.js Mongo invoices
 * Author : Gianluca Del Gobbo, Fabrizio Chivoloni as Flyer new media, FLxER, Free Hardware Foundation and Linux Club
 * More Info : https://github.com/gianlucadelgobbo/mongo-invoices
 */

var express = require('express');
//var app = exp.createServer();
var app = express();
var port = 8004;

app.root = __dirname;
global.host = 'localhost';

require('./app/setup')(app, express);
require('./app/server/router')(app);

app.listen(port, function(){
	console.log("Express server listening on port %d in %s mode: http://localhost:%d", port, app.settings.env, port);
});
