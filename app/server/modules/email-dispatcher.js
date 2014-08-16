var email   = require("emailjs");
var EM = {};
EM.sendMail = function(s, e, callback) {
    var server = email.server.connect(s);
    console.log("mi connetto");
	server.send(e, function(err, message) {
		console.log(err || message);
		callback(err, message);
	});
}
module.exports = EM;
