
  var path = require('path'),
      Db = require('mysql-activerecord'),
      express = require('express'),
      md5 = require('MD5'),
      passport = require('passport')
      config = require(application_root + "/config/config.yml"),
      routes = require(application_root + "/config/routes.yml"),
      auth = require(application_root + '/lib/business/auth')
      http = require('http'),
      gravatar = require('gravatar');

  var self = this;

  var SECRET_TOKE = 'eltodoesmenteyeluniversoesmentalelkybalion';


  var app = express();

  self.routes = routes;
  self.express =  app;

  server = http.createServer(app)

  self.listen =  function(){
    server.listen(config.server.port);
    console.log('Listening on port ' + config.server.port + '...');
  }

  self.io = require('socket.io').listen(server);

  self.path = function(path){
    var rootPath = config.api.default_path;
    var version =  config.api.version;
    var path = rootPath + version + '/' + path;
    return  path;
  }

  self.auth = auth;

  self.passport = passport;

  var allowCrossDomain = function(req, res, next) {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
      res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

      // intercept OPTIONS method
      if ('OPTIONS' == req.method) {
        res.send(200);
      }
      else {
        next();
      }
  };

  self.applicationRoot = application_root;

  self.config = function(){
    var staticPath = path.join(application_root, config.static);
    app.configure(function () {

      app.set('views', application_root + '/app/views');
      app.set('view engine', 'ejs');
      app.use(express.logger());
      app.use(express.cookieParser());
      app.use(express.bodyParser());
      app.use(express.methodOverride());
      app.use(express.session({ secret: 'keyboard cat'}));
      app.use(passport.initialize());
      app.use(passport.session());
      app.use(app.router);
      app.use(allowCrossDomain);
      app.use(express.static(staticPath));
      app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
      app.use(express.logger(':method :url - :referrer'));
    });
  }

  self.jsonFormat = function(err){
    var format = {}
    if (err) {
      format = { status: 'error' };
    } else {
      format = { status: 'success' };
    }

    return format;
  }

  self.server = config.server;

  self.db =  new Db.Adapter({
                  server: config.database.server,
                  username: config.database.username,
                  password: config.database.password,
                  database: config.database.name
                });

  self.md5 = function(text){
    return md5(text);
  }

  self.ensureAuthenticated = function(req, res, next) {
    if (req.isAuthenticated()) { return next(); }
    res.redirect('/login')
  }

  self.apiAuthenticated = function(req, res, next) {
    var sessionToken = req.header('X-TokenHash');
    console.log(sessionToken);
    auth.getSession(sessionToken, function(err, item) {
      console.log(item);
      if (item.length != 0) { return next(); }
      data = {}
      res.writeHead(401, {'Content-Type': 'applicationjson'});
      data.status = 'error';
      data.code = 'Unauthorized';
      body = JSON.stringify(data);
      res.end(body);
    });
  }

  self.getDateTime = function() {
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    month = (month < 10 ? "0" : "") + month;
    var day  = date.getDate();
    day = (day < 10 ? "0" : "") + day;
    return year + "-" + month + "-" + day ;
  }

  self.gravatarRequest = function(email){
    var url = gravatar.url (email, {});
    return url;
  }
