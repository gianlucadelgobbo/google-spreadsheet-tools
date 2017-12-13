var GoogleSpreadsheet = require("google-spreadsheet");
var signature = "\n______________________________________\nLPM - Live Performers Meeting\nliveperformersmeeting.net\nVia del Verano 39 - 00185 Rome\nTel. +39 06 78147301 Fax +39 06 78390805";
var shortcode2 = require('mpm.shortcode');

exports.get = function get(req, res) {
    res.render('docbuilder', {title:"Google Spreadsheet Tools",post:[],results:[]});
};
exports.post = function get(req, res) {
    /*var fields = {
        "wpcforganisationlegalrepresentativesurname": "",
        "wpcforganisationlegalrepresentativename": "",
        "surname": "",
        "email": "",
        "lang": ""
    };*/
    // console.log(res);
    // without auth -- read only
    // # is worksheet id - IDs start at 1
    // console.log( req.body);
    if (req.body.spreadsheet_key && req.body.email && req.body.password) {
        var my_sheet = new GoogleSpreadsheet(req.body.spreadsheet_key);
        if (req.body.mytext) {
            my_sheet.setAuth(req.body.email,req.body.password, function(err){
                my_sheet.getInfo( function( err, sheet_info ){
                    console.log( sheet_info.title + ' is loaded' );
                    // you can pass a context to the shortcode,
                    // which will be avaiable to each shortcode.
                    // let's define our first shortcode , that yields a video tag

                    // use worksheet object if you want to forget about ids
                    sheet_info.worksheets[0].getRows( function( err, rows ){
                        var shortCodesList = Object.keys( rows[0] );
                        var results = [];
                        for (var a = 0; a < rows.length; a++) {
                            context = { name:'foo'};
                            var string = req.body.mytext;
                            var myShortCodes =  shortcode2.create(context);
                            for (var b = 0; b < shortCodesList.length; b++) {
                                //console.log("AA "+shortCodesList[b]);
                                myShortCodes.add(shortCodesList[b], function (attributes, content, context) {
                                    return rows[a][shortCodesList[b]];
                                });
                                string = myShortCodes.parse(string);
                            }
                            console.log(string);
                            results.push(string);
                        }
                        console.log(results);
                        var msg = {};
                        /*
                        if (!req.body.associate.display_name || req.body.associate.display_name == "Please select"){
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
                        */
                        if (msg.e) {
                            res.render('docbuilder', {msg:msg,title:"Google Spreadsheet Tools",post:req.body,fields:Object.keys( rows[0] ),results:[]});
                        } else {
                            res.render('docbuilder', {title:"Google Spreadsheet Tools", post: req.body,fields:Object.keys( rows[0] ), results: results });
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
                    console.log( sheet_info.title + ' is loadedaaaaa' );
                    // use worksheet object if you want to forget about ids
                    sheet_info.worksheets[0].getRows( function( err, rows ){
                        console.log( Object.keys(fields));
                        console.log( Object.keys( rows[0] ));
                        res.render('docbuilder', {title:"Google Spreadsheet Tools",post:req.body,fields:Object.keys( rows[0] ),results:[]});
                        //rows[0].colname = 'new val';
                        //rows[0].save();
                        //rows[0].del();
                    });
                });
            });
        }
    } else {
        res.render('docbuilder', {title:"Google Spreadsheet Tools",post:req.body,results:[],failed:[[],[]], success:[[],[]] });
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
