var fenix = require('../fenix/fenix');
var browserify = require('browserify-middleware');

  server = fenix.server;
  app    = server.express();
  routes = fenix.routes;
  util   = fenix.util
  auth   = fenix.auth;

  server.config(undefined, function($self, app, express){
    app.use(express.static(__dirname + '/public'));
    app.use('/api' , auth.googleJWT);
    app.all('/api/*' , auth.googleJWT);
  });

  app.get('/main.js', browserify('./client/index.js'));

  app.get('/api/messages', function (req, res) {
    res.json([
      { subject: 'Your invoice',  sender: 'Robert'},
      { subject: 'hello foobar',  sender: 'Bob'}
    ]);
  });

  server.listen();