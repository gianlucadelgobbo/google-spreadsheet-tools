var EM = {};
var server;
var oldserver;
/*
var email   = require("emailjs");
EM.sendMail = function(s, e, callback) {
    if (!server || oldserver.user!= s.user) {
		server = email.server.connect(s);
		console.log("mi connetto");
		console.log(s);
	}
	oldserver = s;
	console.log(server);
	server.send(e, function(err, message) {
		console.log(err || message);
		callback(err, message);
	});
}
*/
var email = require('nodemailer');
EM.sendMail = function(s, e, callback) {
    if (!server || (oldserver && oldserver.user && oldserver.user!= s.user)) {
		server = email.createTransport({
		    service: 'gmail',
		    auth: {
		        user: s.user,
		        pass: s.password
		    }
		});
		console.log("mi connetto");
		console.log(s);
	}
	// NB! No need to recreate the server object. You can use
	// the same server object for all e-mails
	
	// setup e-mail data with unicode symbols
	var mailOptions = {
	    from: 'Fred Foo ✔ <foo@blurdybloop.com>', // sender address
	    to: 'bar@blurdybloop.com, baz@blurdybloop.com', // list of receivers
	    subject: 'Hello ✔', // Subject line
	    text: 'Hello world ✔', // plaintext body
	    html: '<b>Hello world ✔</b>' // html body
	};
	
	// send mail with defined transport object
	server.sendMail(e, function(err, message){
	    if(err){
	        return console.log(err);
	    }
	    console.log('Message sent: ' + message.response);
		callback(err, message);
	});
}
module.exports = EM;
