var GoogleSpreadsheet = require("google-spreadsheet");
var signature = "\n______________________________________\nLPM - Live Performers Meeting\nliveperformersmeeting.net\nVia del Verano 39 - 00185 Rome\nTel. +39 06 78147301 Fax +39 06 78390805";


exports.get = function get(req, res) {
    res.render('index', {title:"Google Spreadsheet Tools",post:[],results:[],failed:[[],[]], success:[[],[]] });
};
exports.post = function get(req, res) {
    var fields = {
        "displayname": "",
		"name": "",
		"surname": "",
		"email": "",
		"ccname": "",
		"ccsurname": "",
		"ccemail": "",
        "lang": ""
    };
	// console.log(res);
	// without auth -- read only
	// # is worksheet id - IDs start at 1
	// console.log( req.body);
    if (req.body.spreadsheet_key && req.body.email && req.body.password) {
        var my_sheet = new GoogleSpreadsheet(req.body.spreadsheet_key);
        if (req.body.associate) {
            my_sheet.setAuth(req.body.email,req.body.password, function(err){
                my_sheet.getInfo( function( err, sheet_info ){
                    //console.log( sheet_info.title + ' is loaded' );
                    // use worksheet object if you want to forget about ids
                    sheet_info.worksheets[0].getRows( function( err, rows ){
                        var msg = {};
                        if (!req.body.associate.displayname || req.body.associate.displayname == "Please select"){
                            if (!msg.e) msg.e = [];
                            msg.e.push({m:"Please associate display name to a spreadsheet column"})
                        }
                        if (!req.body.associate.name || req.body.associate.name == "Please select"){
                            if (!msg.e) msg.e = [];
                            msg.e.push({m:"Please associate name to a spreadsheet column"})
                        }
                        if (!req.body.associate.surname || req.body.associate.surname == "Please select"){
                            if (!msg.e) msg.e = [];
                            msg.e.push({m:"Please associate surname to a spreadsheet column"})
                        }
                        if (!req.body.associate.email || req.body.associate.email == "Please select"){
                            if (!msg.e) msg.e = [];
                            msg.e.push({m:"Please associate email to a spreadsheet column"})
                        }
                        if (msg.e) {
                            res.render('index', {msg:msg,title:"Google Spreadsheet Tools",post:req.body,associate:{fields:Object.keys(fields),values:Object.keys( rows[0] )},results:[],failed:[[],[]], success:[[],[]] });
                        } else {
                            // console.log( err);
                            // console.log( rows);
                            var to = [];
                            var exclude = req.body.exclude.toLowerCase().split(",");
							console.log(rows.length);
                            for (var a = 0; a < rows.length; a++) {
                                if (rows[a][req.body.associate.email] && exclude.indexOf(rows[a][req.body.associate.email].toLowerCase()) == -1) {
                                    //rows[a].from = rows[a].person+" <"+emails[rows[a].person]+">";
									var fields = {
										"displayname": "",
										"name": "",
										"surname": "",
										"email": "",
										"ccname": "",
										"ccsurname": "",
										"ccemail": "",
										"lang": ""
									};
									for (var item in fields) {
										console.log(item);
										fields[item] = rows[a][req.body.associate[item]];
									}
                                    fields.lang = (req.body.associate.lang && rows[a][req.body.associate.lang] ? rows[a][req.body.associate.lang] : "en");
                                    to.push(fields);
                                }
                            }
							console.log(to);
                            res.render('index', {title:"Google Spreadsheet Tools", post: req.body, associate: {fields: Object.keys(fields), values: Object.keys(rows[0])}, results: to, failed: [
                                [],
                                []
                            ], success: [
                                [],
                                []
                            ] });
                            //rows[0].colname = 'new val';
                            //rows[0].save();
                            //rows[0].del();
                        }
                    });
                });
            });
        } else {
            my_sheet.setAuth(req.body.email,req.body.password, function(err){
                my_sheet.getInfo( function( err, sheet_info ){
                    //console.log( sheet_info.title + ' is loadedaaaaa' );
                    // use worksheet object if you want to forget about ids
                    sheet_info.worksheets[0].getRows( function( err, rows ){
                        //console.log( Object.keys(fields));
                        //console.log( Object.keys( rows[0] ));
                        res.render('index', {title:"Google Spreadsheet Tools",post:req.body,associate:{fields:Object.keys(fields),values:Object.keys( rows[0] )},results:[],failed:[[],[]], success:[[],[]] });
                        //rows[0].colname = 'new val';
                        //rows[0].save();
                        //rows[0].del();
                    });
                });
            });
        }
    } else {
	    res.render('index', {title:"Google Spreadsheet Tools",post:req.body,results:[],failed:[[],[]], success:[[],[]] });
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
