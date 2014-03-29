"use strict"

var express = require('express'),
    http = require('http'),
    configure = require('configure');


module.exports = function(){
  var app, serverCore;
  app = express();

  serverCore = {
    express: function(){
      return app;
    },

    _create: function(){
      return http.createServer(app);
    },

    listen: function(port){
      if (port == undefined && configure.server.port == undefined) {
        port = 2525
      } else if (port == undefined) {
        port = configure.server.port
      }
      var server = this._create();
      server.listen(port);
      console.log('Listening on port ' + port + '...');
    },

    config: function(env, callback){
      if (env == undefined) {
        env = app.get('env');
      }

      switch (env) {
        case 'development':
          developmentConfig(app, env, callback);
          break;
        case 'test':
          testConfig(app, env, callback);
          break;
        case 'production':
          productionConfig(app, env, callback);
          break;
      }
    },
  };

  return  serverCore;

};

//  Config env functions
function developmentConfig(app, env, callback){
  app.configure('development', function(){
    app.use(express.logger());
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);
    app.use(allowCrossDomain);
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
    app.use(express.logger(':method :url - :referrer'));
    if ( callback != undefined && typeof callback === 'function') { callback(app);}
  });
};

function productionConfig(app, env, callback){
  app.configure('production', function(){
    app.use(express.logger());
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);
    app.use(allowCrossDomain);
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
    app.use(express.logger(':method :url - :referrer'));
    if ( callback != undefined && typeof callback === 'function') { callback(app);}
  });
};

function testConfig(app, env, callback){
  app.configure('test', function(){
    app.use(express.logger());
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);
    app.use(allowCrossDomain);
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
    app.use(express.logger(':method :url - :referrer'));
    if ( callback != undefined && typeof callback === 'function') { callback(app);}
  });
};


// Midderware function
function allowCrossDomain(req, res, next) {
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
