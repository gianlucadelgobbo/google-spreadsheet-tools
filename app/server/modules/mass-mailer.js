/*
 * File Name : Server.js
 * Task : Run Server and fetch multiple emails from DB to send reminder
 * Invoke all the email task at once and update DB once the email is sent
 */
/*
 * Load all the required modules
 */

var async = require("async");
var nodemailer = require("nodemailer");
// This will store emails needed to send.
// We can fetch it from DB (MySQL,Mongo) and store here.
var listofemails;
// Will store email sent successfully.
var success_email = [];
// Will store email whose sending is failed.
var failure_email = [];

var transporter;

var req;

var finalCallback;

/* Loading modules done. */
module.exports = massMailer;

function massMailer(r,l,auth,c) {
    req = r;
    listofemails = l;
    finalCallback = c;
    var self = this;
    console.log(auth);
    transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: auth,
        debug:true
    });
    // Fetch all the emails from database and push it in listofemails
    // Will do it later.
    self.invokeOperation();
};

/* Invoking email sending operation at once */

massMailer.prototype.invokeOperation = function() {
    var self = this;
    async.each(listofemails,self.SendEmail,function(){
        console.log(success_email);
        console.log(failure_email);
    });
}

/*
 * This function will be called by multiple instance.
 * Each instance will contain one email ID
 * After successfull email operation, it will be pushed in failed or success array.
 */

massMailer.prototype.SendEmail = function(Email,callback) {
    console.log("Sending email to " + Email.to);
    var self = this;
    self.status = false;
    // waterfall will go one after another
    // So first email will be sent
    // Callback will jump us to next function
    // in that we will update DB
    // Once done that instance is done.
    // Once every instance is done final callback will be called.
    //[["en","MARNIK","Marina","Nikonov","g.delgobbo@flyer.it"],["en","Shan Shan","Shanshan","Wang","g.delgobbo@avnode.org"]]
    async.waterfall([
        function(callback) {
            transporter.sendMail(Email, function(error, info) {
                if(error) {
                    console.log(error)
                    failure_email.push(Email);
                } else {
                    self.status = true;
                    success_email.push(Email);
                }
                callback(null,self.status,Email);
            });
        },
        function(statusCode,Email,callback) {
            console.log("Will update DB here for " + Email.to + " With " + statusCode);
            callback();
        }
    ],function(){
        //When everything is done return back to caller.
        if (failure_email.length+success_email.length == listofemails.length) return finalCallback(req,listofemails,failure_email, success_email);
    });
}
