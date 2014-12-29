var EM = require('../modules/email-dispatcher');
var signature = "\n______________________________________\nLPM - Live Performers Meeting\nliveperformersmeeting.net\nVia del Verano 39 - 00185 Rome\nTel. +39 06 78147301 Fax +39 06 78390805";


exports.get = function get(req, res) {
	res.render('sender', {title:"Google Spreadsheet Tools",post:[],results:[],failed:[[],[]], success:[[],[]] });
};
exports.post = function get(req, res) {
	// console.log(res);
	// without auth -- read only
	// # is worksheet id - IDs start at 1
	//console.log( req.body);
	if (req.body.to && (req.body.message_it || req.body.message_en)) {
		var rows = {};
		var items = JSON.parse(req.body.to);
		for(var a=0;a<items.length;a++){
			var i = a;
			if (typeof(rows[i])=="undefined") rows[i] = {};
			rows[i].from = req.body.from_name+" <"+req.body.from_email+">";
            rows[i].from_html = req.body.from_name+" &lt;"+req.body.from_email+"&gt;";
			rows[i].to = items[a][2]+" "+items[a][3]+" <"+items[a][4]+">";
			rows[i].to_html = items[a][2]+" "+items[a][3]+" &lt;"+items[a][4]+"&gt;";
            if (items[a].length==8) {
                rows[i].cc = items[a][5]+" "+items[a][6]+" <"+items[a][7]+">";
                rows[i].cc_html = items[a][5]+" "+items[a][6]+" &lt;"+items[a][7]+"&gt;";
            }
			rows[i].subject = req.body.subject.replace('[org_name]',items[a][1]);
			rows[i].lang = items[a][0];
			rows[i].message = req.body["message_"+items[a][0]].replace('[name]',items[a][2]).replace('[signature]',req.body.from_name)+signature;
			rows[i].server = {
				user:    req.body.from_email, 
				password:req.body.from_password, 
				host:    "smtp.gmail.com", 
				ssl:     true
				
			}
		}
		var rowsA = [];
		for(var b in rows) rowsA.push(rows[b]);
    	console.log("STO INVIANDO!!!");
    	var failed = [[],[]];
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
