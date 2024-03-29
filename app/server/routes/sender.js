var massMailer = require('../modules/mass-mailer');
var signatures = {
  "fotonicafestival.com": "\n______________________________________\nFOTONICA Festival\nfotonicafestival.com\nVia del Verano 39 - 00185 Rome\nTel. +39 06 78147301 Fax +39 06 78390805",
	"livecinemafestival.com": "\n______________________________________\nLive Cinema Festival\nlivecinemafestival.com\nVia del Verano 39 - 00185 Rome\nTel. +39 06 78147301 Fax +39 06 78390805",
	"liveperformersmeeting.net": "\n______________________________________\nLPM - Live Performers Meeting\nliveperformersmeeting.net\nVia del Verano 39 - 00185 Rome\nTel. +39 06 78147301 Fax +39 06 78390805",
	"flyer.it": "\n______________________________________\nFlyer new media\nflyer.it\nVia del Verano 39 - 00185 Rome\nTel. +39 06 78147301 Fax +39 06 78390805",
	"avnode.org": "\n______________________________________\nAVnode\navnode.org - avnode.net"
}

exports.get = function get(req, res) {
	res.render('sender', {title:"Google Spreadsheet Tools",post:[],results:[],failed:[[],[]], success:[[],[]] });
};
exports.post = function get(req, res) {
	// console.log(res);
	//console.log( req.body);
	if (req.body.to && (req.body.message_it || req.body.message_en)) {
		var rows = {};
		var items = JSON.parse(req.body.to);
		for(var a=0;a<items.length;a++){
			var i = a;
			if (typeof(rows[i])=="undefined") rows[i] = {};
			var signature = signatures[req.body.from_email.split("@")[1]];
			rows[i].item = items[a];
			rows[i].from = req.body.from_name+" <"+req.body.from_email+">";
            rows[i].from_html = req.body.from_name+" &lt;"+req.body.from_email+"&gt;";
			rows[i].to = items[a][2]+" "+items[a][3]+" <"+items[a][4]+">";
			rows[i].to_html = items[a][2]+" "+items[a][3]+" &lt;"+items[a][4]+"&gt;";
            if (items[a].length>=8) {
                rows[i].cc = items[a][5]+" "+items[a][6]+" <"+items[a][7]+">";
                rows[i].cc_html = items[a][5]+" "+items[a][6]+" &lt;"+items[a][7]+"&gt;";
            }
			rows[i].subject = req.body.subject.replace('[org_name]',items[a][1]);
			rows[i].lang = items[a][0];
			rows[i].text = req.body["message_"+items[a][0]];
			if (rows[i].text.indexOf('[org_name]') 	&& items[a][1]) rows[i].text = rows[i].text.replace('[org_name]',items[a][1]);
			if (rows[i].text.indexOf('[name]') 		&& items[a][2]) rows[i].text = rows[i].text.replace('[name]',items[a][2]);
			if (rows[i].text.indexOf('[name]') 		&& items[a][2]) rows[i].text = rows[i].text.replace('[name]',items[a][2]);
			if (rows[i].text.indexOf('[name]') 		&& items[a][2]) rows[i].text = rows[i].text.replace('[surname]',items[a][3]);
			if (rows[i].text.indexOf('[name]') 		&& items[a][2]) rows[i].text = rows[i].text.replace('[id]',items[a][items[a].length-2]);
			if (rows[i].text.indexOf('[name]') 		&& items[a][2]) rows[i].text = rows[i].text.replace('[login]',items[a][items[a].length-1]);
			if (rows[i].text.indexOf('[name]') 		&& items[a][2]) rows[i].text = rows[i].text.replace('[signature]',req.body.from_name);
			if (rows[i].text.indexOf('[name]') 		&& items[a][2]) rows[i].text = rows[i].text+signature;
			//rows[i].text = req.body["message_"+items[a][0]].replace('[org_name]',items[a][1]).replace('[name]',items[a][2]).replace('[name]',items[a][2]).replace('[surname]',items[a][3]).replace('[id]',items[a][items[a].length-2]).replace('[login]',items[a][items[a].length-1]).replace('[signature]',req.body.from_name)+signature;
		}
		var rowsA = [];
		for(var b in rows) rowsA.push(rows[b]);
		var auth = {
			user:   req.body.user_email,
			pass:	req.body.user_password,
		}
		var m = new massMailer(req,rowsA,auth,function (req,rowsA,failed, success){
			console.log("ESITOOOOOOOO");
			var failedA = [];
			for(var c in failed) failedA.push('["'+failed[c].item.join('","')+'"]');
			//for(var c in failed) failedA.push(failed[c].item);
			var successA = [];
			for(var c in success) successA.push('["'+success[c].item.join('","')+'"]');
			//for(var c in success) successA.push(success[c].item);
			console.log(failedA);
			console.log("["+successA.join(",")+"]");
			return res.render('sender', {title:"Google Spreadsheet Tools",post:req.body,results:rowsA,failed:failedA, success:successA});
		});
    	console.log("STO INVIANDO!!!");
    	/*var failed = [[],[]];
    	var success = [[],[]];
		rowsA.forEach(function(item, index, theArray) {
			if (item) {
				EM.sendMail(item.server, {
                    text:    item.message,
                    from:    item.from,
                    //to:      ,
                    to:      (req.body.realsend==1 ? item.to : item.from),
                    cc:      (req.body.realsend==1 ? item.cc : item.from),
                    subject: item.subject
				}, function(err, message) {
					console.log(items[index]);
					rowsA[index].msg = err ? "Message NOT sent" : "Message sent";
					if (err) {
						//failed[0].push(item.name+" "+item.surname+" <"+item['e-mail']+">");
						//failed[1].push(item.name+" "+item.surname+"	"+item.name+"	"+item.surname+"	"+item['e-mail']+"");
						failed[0].push('["'+items[index].join('","')+'"]');
						failed[1].push(item.to);
					} else {
						success[0].push('["'+items[index].join('","')+'"]');
						success[1].push(item.to);
					}
					if (index==rowsA.length-1) {
						res.render('sender', {title:"Google Spreadsheet Tools",post:req.body,results:rowsA,failed:failed, success:success});
					}
				});
			} 
		});
		 */
	} else {
		res.render('sender', {title:"Google Spreadsheet Tools",post:req.body,results:[],failed:[[],[]], success:[[],[]] });
	}

	/*
	my_sheet.getRows( 1, function(err, row_data){
	    console.log( err)
	    console.log( row_data)
	    console.log( 'pulled in '+row_data + ' rows ')
	})
	    // column names are set by google based on the first row of your sheet
	    my_sheet.addRow( 2, { colname: 'col value'} );
	
	    my_sheet.getRows( 2, {
	        start: 0,            // start index
	        num: 100            // number of rows to pull
	    }, function(err, row_data){
	        // do something...
	    });
	*/
};
