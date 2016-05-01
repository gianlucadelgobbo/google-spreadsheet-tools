var EM = {};
var async = require("async");
var http = require("http");
var nodemailer = require("nodemailer");
// This will store emails needed to send.
// We can fetch it from DB (MySQL,Mongo) and store here.

var transporter;
var oldtransporter;
/*
var email   = require("emailjs");
EM.sendMail = function(s, e, callback) {
    if (!transporter || oldtransporter.user!= s.user) {
		transporter = email.transporter.connect(s);
		console.log("mi connetto");
		console.log(s);
	}
	oldtransporter = s;
	console.log(transporter);
	transporter.send(e, function(err, message) {
		console.log(err || message);
		callback(err, message);
	});
}
*/
EM.sendMail = function(s, e, callback) {

	var listofemails = ["rwtc66@gmail.com","shahid@codeforgeek.com"];
// Will store email sent successfully.
	var success_email = [];
// Will store email whose sending is failed.
	var failure_email = [];

	if (!transporter || (oldtransporter && oldtransporter.user && oldtransporter.user!= s.user)) {
		var self = this;
		transporter = nodemailer.createTransport({
			service: 'gmail',
			auth: {
				user: s.user,
				pass: s.password
			}
		});
		console.log("NEW transporter:");
		console.log(transporter);
		// Fetch all the emails from database and push it in listofemails
		// Will do it later.
		//invokeOperation();
	};

	/* Invoking email sending operation at once */

	/*
	massMailer.prototype.invokeOperation = function() {
		var self = this;
		async.each(listofemails,SendEmail,function(){
			console.log(success_email);
			console.log(failure_email);
		});
	}
	*/

	/* 
	 * This function will be called by multiple instance.
	 * Each instance will contain one email ID
	 * After successfull email operation, it will be pushed in failed or success array.
	 */

	//function SendEmail(Email,callback) {
		console.log("Sending email to " + e.to);
		var self = this;
		self.status = false;
		// waterfall will go one after another
		// So first email will be sent
		// Callback will jump us to next function
		// in that we will update DB
		// Once done that instance is done.
		// Once every instance is done final callback will be called.
		async.waterfall([
			function(callback) {
				/*var mailOptions = {
					from: 'shahid@codeforgeek.com',
					to: Email,
					subject: 'Hi ! This is from Async Script',
					text: "Hello World !"
				};
				delete e.cc;
				 */
				console.log(e);
				transporter.sendMail(e, function(error, info) {
					if(error) {
						console.log(error)
						failure_email.push(e.to);
					} else {
						self.status = true;
						success_email.push(e.to);
					}
					callback(null,self.status,e.to);
				});
			},
			function(statusCode,Email,callback) {
				console.log("Sending to: " + Email + "  Status: " + statusCode);
				callback();
			}
		],function(){
			//When everything is done return back to caller.
			console.log("SENDING END");
			callback(success_email,failure_email);
		});
	//}

	/*
    if (!transporter || (oldtransporter && oldtransporter.user && oldtransporter.user!= s.user)) {
		transporter = email.createTransport({
		    service: 'gmail',
		    auth: {
		        user: s.user,
		        pass: s.password
		    }
		});
		console.log("mi connetto");
		console.log(s);
	}
	// NB! No need to recreate the transporter object. You can use
	// the same transporter object for all e-mails
	
	// setup e-mail data with unicode symbols
	var mailOptions = {
	    from: 'Fred Foo ✔ <foo@blurdybloop.com>', // sender address
	    to: 'bar@blurdybloop.com, baz@blurdybloop.com', // list of receivers
	    subject: 'Hello ✔', // Subject line
	    text: 'Hello world ✔', // plaintext body
	    html: '<b>Hello world ✔</b>' // html body
	};
	
	// send mail with defined transport object
	transporter.sendMail(e, function(err, message){
	    if(err){
	        return console.log(err);
	    }
	    console.log('Message sent: ' + message.response);
		callback(err, message);
	});
	*/
}
module.exports = EM;
