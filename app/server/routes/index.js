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
			var creds_json = {
				client_email: 'yourserviceaccountemailhere@google.com',
				private_key: 'your long private key stuff here'
			}
            my_sheet.useServiceAccountAuth({
					"type": "service_account",
					"project_id": "animated-verve-136223",
					"private_key_id": "5bab3da2dd41bda4bf2e212d07a9f632959bc642",
					"private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDK5bZx5ua8NJ6E\n0P3JsDxkIr6sPLBdVnWaZXyORZooF5AzSdt/yCkNuvrFC5sLL+LJOLTShCDU0cJI\nO/S30lgaF9Q8MV/HJzyp/o2v+6Gp7AIixB2pDWO/xr8nVdCPOtlOnn5jN31hsi8l\nVyNSjxTKQkqQNvcxC+MGLvF8iTWB/tr7Oeue/2O6nOVDCKENmZR8+Vyw82kdMOyH\nvTsOO2xxqcoN4fmUxbMn+Fgo82o9cUbkLqQOd9uXOsw2//wcRZ+liKwk2xJOE3Fp\nuWDrZc83zILv3ESrpNZ2W8ML3Dqet6WOTNmm7jyBJgIwpLodB1kF6D/I5mr2cRab\nl14RPvK1AgMBAAECggEAc/0X7EtckjDegfzbaGY4T+JQ8DONev5HIqlrqAWAF/VI\neRl6wrTRS0kdvHFjA+UvF2s0a7ge8KqtDxA/WKqFtPz0Vii/oSD8HA4qP3VxOKtz\nmR5V+mNuJ57dfgYfwRGaUshmZh+9rJDpRMZoqfSjpPB6obDaZQ5vjQRfBpuFnDbo\neP6HF1BDW1bXi1t+w5gdpNFYrg9Pd2jDq9AuUZ9bdvvjGASvY2t8f8Pc6sEFCKUb\nSZjBzU5BG/4H4J37sCCHmO9er/cP9x7q3qfixYicmIC4FmjLERdroglVlq+lgtYo\nnUirUCbtaA5hKS8V13KnjgPtxTSXvgSRQd3hmvnADQKBgQD7H7yL+/5O5remc1uv\nwjQU8KkXnz6/bi/7xmwaZv0PiNLxUYwDWylDVoOcldC++p9E3PD0X7Er3QLSBFpv\nkw5W+NQrg7vPm8vBqgM1phwiaSYyI0Kwwtwd653E3Db2NaljZTi8TM3WRCSF05x4\nEs2Y7VnqcR3isrgwGeYqLpke6wKBgQDO1kFwu+3Cf8QEXel0hcPhpouxgb2JDQgY\nFsre+bT9pdF+7fx3dusCsVhUdbu3itN0/UxvotvhNCyDKypamy90gWQBRBeIZ+c0\nOVkpWsLtL/h3HHjg3uSwvgm9YaJv3z/GQPxG5C/DWHEi4X734JTldhVZVR2voCMX\nQ6Wvjr4M3wKBgQDnHkJNI1LeEwEatDjB/Z4pV4SINQtu615F/kwn0Hk+/tIFPuP5\ngsDrNIhUaJ2B5u8GVcF9Z0SL9hBOcas53MHp0YCTu93yKJTSXEIv8f0avmNk6YbL\nX8ttzheZwoLi/mgzDkm1I4qdlIF4mVT8PXHzOR7z4b97kLhrrKpkUBakmQKBgFgM\n16DhL6776vsc63QiOagG2TMAkyoTtR1kHorbbFQKUeuh7jcBFbx4uKyDzhytaaVE\n61Qe1VHCfyx7pLUbmREUv/jV/tqfuMn/m9hB/fcw06oJIeBAosQmski/loHfXOvN\n4Fdhbn/PV6JMsltdbKVeJmp4FIIePrH5pz/cGUWrAoGAL3BJjhEGdh8sZ5QG1aLJ\nWr2aBVdlpV3UWGAAaxBhQRiCSOGjLAfYOkye7pB7hxBlGclhlLFzRD92nI/LKrkF\nE027z9UfrtlO9d36yQdVUMHoOU+6MaHIdsRZvjperMjFl2lJzQ8ryLO5krUb9Eib\nLc1hXtR7ZnWSJ7tBHW1na3U=\n-----END PRIVATE KEY-----\n",
					"client_email": "g-delgobbo@animated-verve-136223.iam.gserviceaccount.com",
					"client_id": "111064460024550016105",
					"auth_uri": "https://accounts.google.com/o/oauth2/auth",
					"token_uri": "https://accounts.google.com/o/oauth2/token",
					"auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
					"client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/g-delgobbo%40animated-verve-136223.iam.gserviceaccount.com"
				}, function(err){
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
            my_sheet.useServiceAccountAuth({
				"type": "service_account",
				"project_id": "animated-verve-136223",
				"private_key_id": "5bab3da2dd41bda4bf2e212d07a9f632959bc642",
				"private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDK5bZx5ua8NJ6E\n0P3JsDxkIr6sPLBdVnWaZXyORZooF5AzSdt/yCkNuvrFC5sLL+LJOLTShCDU0cJI\nO/S30lgaF9Q8MV/HJzyp/o2v+6Gp7AIixB2pDWO/xr8nVdCPOtlOnn5jN31hsi8l\nVyNSjxTKQkqQNvcxC+MGLvF8iTWB/tr7Oeue/2O6nOVDCKENmZR8+Vyw82kdMOyH\nvTsOO2xxqcoN4fmUxbMn+Fgo82o9cUbkLqQOd9uXOsw2//wcRZ+liKwk2xJOE3Fp\nuWDrZc83zILv3ESrpNZ2W8ML3Dqet6WOTNmm7jyBJgIwpLodB1kF6D/I5mr2cRab\nl14RPvK1AgMBAAECggEAc/0X7EtckjDegfzbaGY4T+JQ8DONev5HIqlrqAWAF/VI\neRl6wrTRS0kdvHFjA+UvF2s0a7ge8KqtDxA/WKqFtPz0Vii/oSD8HA4qP3VxOKtz\nmR5V+mNuJ57dfgYfwRGaUshmZh+9rJDpRMZoqfSjpPB6obDaZQ5vjQRfBpuFnDbo\neP6HF1BDW1bXi1t+w5gdpNFYrg9Pd2jDq9AuUZ9bdvvjGASvY2t8f8Pc6sEFCKUb\nSZjBzU5BG/4H4J37sCCHmO9er/cP9x7q3qfixYicmIC4FmjLERdroglVlq+lgtYo\nnUirUCbtaA5hKS8V13KnjgPtxTSXvgSRQd3hmvnADQKBgQD7H7yL+/5O5remc1uv\nwjQU8KkXnz6/bi/7xmwaZv0PiNLxUYwDWylDVoOcldC++p9E3PD0X7Er3QLSBFpv\nkw5W+NQrg7vPm8vBqgM1phwiaSYyI0Kwwtwd653E3Db2NaljZTi8TM3WRCSF05x4\nEs2Y7VnqcR3isrgwGeYqLpke6wKBgQDO1kFwu+3Cf8QEXel0hcPhpouxgb2JDQgY\nFsre+bT9pdF+7fx3dusCsVhUdbu3itN0/UxvotvhNCyDKypamy90gWQBRBeIZ+c0\nOVkpWsLtL/h3HHjg3uSwvgm9YaJv3z/GQPxG5C/DWHEi4X734JTldhVZVR2voCMX\nQ6Wvjr4M3wKBgQDnHkJNI1LeEwEatDjB/Z4pV4SINQtu615F/kwn0Hk+/tIFPuP5\ngsDrNIhUaJ2B5u8GVcF9Z0SL9hBOcas53MHp0YCTu93yKJTSXEIv8f0avmNk6YbL\nX8ttzheZwoLi/mgzDkm1I4qdlIF4mVT8PXHzOR7z4b97kLhrrKpkUBakmQKBgFgM\n16DhL6776vsc63QiOagG2TMAkyoTtR1kHorbbFQKUeuh7jcBFbx4uKyDzhytaaVE\n61Qe1VHCfyx7pLUbmREUv/jV/tqfuMn/m9hB/fcw06oJIeBAosQmski/loHfXOvN\n4Fdhbn/PV6JMsltdbKVeJmp4FIIePrH5pz/cGUWrAoGAL3BJjhEGdh8sZ5QG1aLJ\nWr2aBVdlpV3UWGAAaxBhQRiCSOGjLAfYOkye7pB7hxBlGclhlLFzRD92nI/LKrkF\nE027z9UfrtlO9d36yQdVUMHoOU+6MaHIdsRZvjperMjFl2lJzQ8ryLO5krUb9Eib\nLc1hXtR7ZnWSJ7tBHW1na3U=\n-----END PRIVATE KEY-----\n",
				"client_email": "g-delgobbo@animated-verve-136223.iam.gserviceaccount.com",
				"client_id": "111064460024550016105",
				"auth_uri": "https://accounts.google.com/o/oauth2/auth",
				"token_uri": "https://accounts.google.com/o/oauth2/token",
				"auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
				"client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/g-delgobbo%40animated-verve-136223.iam.gserviceaccount.com"
			}, function(err){
                console.log( err );
              console.log( my_sheet );
              my_sheet.getInfo( function( err, sheet_info ){
                  console.log( sheet_info );
                  console.log( err );
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
