var fenix = require('../fenix/fenix');
var browserify = require('browserify-middleware');

  server   = fenix.server;
  resource = fenix.resource;
  app      = server.app
  routes   = fenix.routes;
  util     = fenix.util
  auth     = fenix.auth;

  server.config(undefined, function($self, app, express){
    app.use(express.static(__dirname + '/public'));
    app.use('/api' , auth.googleJWT);
    app.all('/api/*' , auth.googleJWT);
  });

  app.get('/main.js', browserify('./client/index.js'));

  // GET: /
  resource.root.get(function(req, res){
    res.send('Hi Root');
  });

  // GET: /api/messages
  resource.api.messages.get(function (req, res) {
    res.json([
      { subject: 'Your invoice',  sender: 'Robert'},
      { subject: 'hello foobar',  sender: 'Bob'}
    ]);
  });

  // GET: /api/users
  resource.api.users.get(function(req, res){
    res.json([
      { name: 'Robert',  email: 'robert@fenix.com'},
      { name: 'Jonth',  autor: 'jonth@fenix.com'}
    ]);
  });

  // GET: /api/users/:id
  resource.api.user.get(function(req, res){
    res.json({ id: req.params.id, name: 'Robert',  email: 'robert@fenix.com'});
  });

  server.listen();