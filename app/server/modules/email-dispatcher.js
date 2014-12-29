var email   = require("emailjs");
var EM = {};
var server;
var oldserver;
EM.sendMail = function(s, e, callback) {
    if (!server || oldserver.user!= s.user) {
		server = email.server.connect(s);
		console.log("mi connetto");
	}
	oldserver = s;
	//console.log(server);
	server.send(e, function(err, message) {
		console.log(err || message);
		callback(err, message);
	});
}
module.exports = EM;
