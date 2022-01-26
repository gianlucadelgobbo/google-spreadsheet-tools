const creds = require('../../../config/mindful-syntax-327517-3a18d7e11d1c.json'); // the file saved above
const { GoogleSpreadsheet } = require('google-spreadsheet');
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
    if (req.body.spreadsheet_key) {
        var my_sheet = new GoogleSpreadsheet(req.body.spreadsheet_key);
        console.log("stocazzo");
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

        (async function() {
          console.log("stocazzo1");
          try {
            await my_sheet.useServiceAccountAuth(creds); // loads document properties and worksheets
          } catch (e) {
            console.log("The caller does not have permission");
            var msg = {};
            if (!msg.e) msg.e = [];
            msg.e.push({m:"The caller does not have permission"})
            res.render('index', {msg:msg,title:"Google Spreadsheet Tools",post:req.body,associate:{fields:Object.keys(fields),values:Object.keys( rows[0] )},results:[],failed:[[],[]], success:[[],[]] });
          }
          //await my_sheet.useServiceAccountAuth(creds).catch((err) => { console.error(err.config); console.log("err2");});
          console.log("stocazzo1 end");
          (async function() {
            console.log("stocazzo2");
            try {
              await my_sheet.loadInfo(); // loads document properties and worksheets
              (async function() {
                console.log("stocazzo3");
                console.log(my_sheet.title); 
                console.log(my_sheet); 
                const rows = await my_sheet.sheetsByIndex[0].getRows();
                console.log(rows); 
                if (req.body.associate) {
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
                      console.log(msg.e);
                      console.log(fields);
                      res.render('index', {msg:msg,title:"Google Spreadsheet Tools",post:req.body,associate:{fields:Object.keys(fields),values:Object.keys( rows[0] )},results:[],failed:[[],[]], success:[[],[]] });
                  } else {
                    // console.log( err);
                    // console.log( rows);
                    var to = [];
                    var exclude = req.body.exclude.toLowerCase().split(",");
                    console.log(rows.length);
                    for (var a = 0; a < rows.length; a++) {
                      console.log(rows[a]._rowNumber);
                      if (rows[a][req.body.associate.email] && exclude.indexOf(rows[a][req.body.associate.email].toLowerCase()) == -1) {
                        var tmp = {}
                        //rows[a].from = rows[a].person+" <"+emails[rows[a].person]+">";
                        for (var item in fields) {
                          console.log(item);
                          tmp[item] = rows[a][req.body.associate[item]];
                        }
                        tmp.lang = (req.body.associate.lang && rows[a][req.body.associate.lang] ? rows[a][req.body.associate.lang] : "en");
                        console.log(tmp);
                        to.push(tmp);
                      }
                    }
                    console.log(to);
                    //console.log(to);
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
                } else {
                  res.render('index', {title:"Google Spreadsheet Tools",post:req.body,associate:{fields:Object.keys(fields),values:Object.keys( rows[0] )},results:[],failed:[[],[]], success:[[],[]] });
                }
                console.log("stocazzo3 end");
              }());
            } catch (e) {
              console.log("The caller does not have permission");
              var msg = {};
              if (!msg.e) msg.e = [];
              msg.e.push({m:"The caller does not have permission"})
              res.render('index', {msg:msg,title:"Google Spreadsheet Tools",post:req.body,results:[],failed:[[],[]], success:[[],[]] });
            }
      
            console.log("stocazzo2 end");
          }());
        }());
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
