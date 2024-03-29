var signatures = {
  "fotonicafestival.com": "\n______________________________________\nFOTONICA Festival\nfotonicafestival.com\nVia del Verano 39 - 00185 Rome\nTel. +39 06 78147301 Fax +39 06 78390805",
  "livecinemafestival.com": "\n______________________________________\nLive Cinema Festival\nlivecinemafestival.com\nVia del Verano 39 - 00185 Rome\nTel. +39 06 78147301 Fax +39 06 78390805",
  "liveperformersmeeting.net": "\n______________________________________\nLPM - Live Performers Meeting\nliveperformersmeeting.net\nVia del Verano 39 - 00185 Rome\nTel. +39 06 78147301 Fax +39 06 78390805",
  "flyer.it": "\n______________________________________\nFlyer new media\nflyer.it\nVia del Verano 39 - 00185 Rome\nTel. +39 06 78147301 Fax +39 06 78390805",
  "avnode.org": "\n______________________________________\nStichting AVnode\nArondeusstraat 7, 1063GB Amsterdam\navnode.org - avnode.net"
};

exports.get = function get(req, res) {
	res.render('composer', {title:"Google Spreadsheet Tools",post:[],results:[],failed:[[],[]], success:[[],[]] });
};
exports.post = function get(req, res) {
	// console.log(res);
	console.log( req.body);
	if (req.body.to && (req.body.message_it || req.body.message_en)) {
		var rows = {};
		var items = JSON.parse(req.body.to);
		for(var a=0;a<items.length;a++){
			var i = a;
			if (typeof(rows[i])=="undefined") rows[i] = {};
			var signature = signatures[req.body.from_email.split("@")[1]];
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
			console.log( rows[i].lang);
			rows[i].text = req.body["message_"+items[a][0]];
			if (rows[i].text.indexOf('[org_name]') 	&& items[a][1]) rows[i].text = rows[i].text.replace('[org_name]',items[a][1]);
			if (rows[i].text.indexOf('[name]') 		&& items[a][2]) rows[i].text = rows[i].text.replace('[name]',items[a][2]);
			if (rows[i].text.indexOf('[name]') 		&& items[a][2]) rows[i].text = rows[i].text.replace('[name]',items[a][2]);
			if (rows[i].text.indexOf('[name]') 		&& items[a][2]) rows[i].text = rows[i].text.replace('[email]',items[a][4]);
			if (rows[i].text.indexOf('[name]') 		&& items[a][2]) rows[i].text = rows[i].text.replace('[surname]',items[a][3]);
			if (rows[i].text.indexOf('[name]') 		&& items[a][2]) rows[i].text = rows[i].text.replace('[id]',items[a][items[a].length-2]);
			if (rows[i].text.indexOf('[name]') 		&& items[a][2]) rows[i].text = rows[i].text.replace('[login]',items[a][items[a].length-1]);
			if (rows[i].text.indexOf('[name]') 		&& items[a][2]) rows[i].text = rows[i].text.replace('[signature]',req.body.from_name);
			if (rows[i].text.indexOf('[name]') 		&& items[a][2]) rows[i].text = rows[i].text+signature;
			//rows[i].text = req.body["message_"+items[a][0]].replace('[org_name]',items[a][1]).replace('[name]',items[a][2]).replace('[name]',items[a][2]).replace('[surname]',items[a][3]).replace('[id]',items[a][items[a].length-2]).replace('[login]',items[a][items[a].length-1]).replace('[signature]',req.body.from_name)+signature;
		}
		var rowsA = [];
		for(var b in rows) rowsA.push(rows[b]);
		res.render('composer', {title:"Google Spreadsheet Tools",post:req.body,results:rowsA,failed:[[],[]], success:[[],[]] });
	} else {
		res.render('composer', {title:"Google Spreadsheet Tools",post:req.body,results:[],failed:[[],[]], success:[[],[]] });
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
