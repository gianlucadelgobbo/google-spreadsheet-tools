var indexRoutes = require('./routes/index');
var mailerRoutes = require('./routes/mailer');
var composerRoutes = require('./routes/composer');
var senderRoutes = require('./routes/sender');
var docbuilderRoutes = require('./routes/docbuilder');

module.exports = function(app) {

  // Log In //
  app.get('/', indexRoutes.get);
  app.post('/', indexRoutes.post);

  // mailer //
  app.get('/mailer', mailerRoutes.get);

  // composer //
  app.get('/composer', composerRoutes.get);
  app.post('/composer', composerRoutes.post);

    // sender //
    app.get('/sender', senderRoutes.get);
    app.post('/sender', senderRoutes.post);

    // sender //
    app.get('/docbuilder', docbuilderRoutes.get);
    app.post('/docbuilder', docbuilderRoutes.post);

    // all other routes 404
  app.get('*', function(req, res) { res.render('404', { title: "Page Not Found"}); });
};
