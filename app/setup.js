global._config = require('./common/config.js')._config;
var bodyParser = require('body-parser');
//var methodOverride = require('method-override');

module.exports = function(app, exp) {
    app.set('views', app.root + '/app/server/views');
    app.set('view engine', 'jade');
    app.set('view options', { doctype : 'html', layout: app.root + '/app/server/views/layout.jade', pretty : true });
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    //app.use(exp.cookieParser());
    //app.use(exp.session({ secret: 'super-duper-secret-secret' }));
    //app.use(methodOverride());
    app.use(require('stylus').middleware({ src: app.root + '/app/public' }));
    app.use(exp.static(app.root + '/app/common'));
    app.use(exp.static(app.root + '/app/public'));
};