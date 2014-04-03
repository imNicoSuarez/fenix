var http = require("http");
var url = require("url");
var util         = require("util");
var EventEmitter = require("events").EventEmitter;
var port = 4000;

// function start(handle) {
//   function onRequest(request, response) {
//     var pathname = url.parse(request.url).pathname;
//     console.log("Peticion para " + pathname + " recibida.");

//     request.setEncoding("utf8");

//     request.on("data", function(trozoPosteado) {
//       dataPosteada += trozoPosteado;
//       console.log("Recibido trozo POST '" + trozoPosteado + "'.");
//     });

//     request.on("end", function() {
//       var events = new EventEmitter();
//       events.emitt(pathname, request, response);
//     });

//   }

//   http.createServer(onRequest).listen(port);
//   console.log('Listening on port ' + port + '...');
// }

var objectKey = function (obj){
  var keys = [];

  for (var name in obj) {
    keys.push(name);
  }

  return keys;
}


function Server () {
  EventEmitter.call(this);

  self = this;


  this.routes = function() {


    routes = { "api": "/api",
               "api_messages": "/api/messages"
              }

    routeTemplate = function(key){
      var pathEmit = routes[key].replace(/\//g,'-');
      console.log(pathEmit);
      return {
        get: function(callback){
          self.on(pathEmit, function(req, res){
            console.log(req.method);
            if (req.method == 'GET') {
              callback(req, res);
            } else {
              self.emit('error', req, res, {cod: 500, desc: 'Error not method ' + req.method});
            }
          });
        },
        post: function(callback){
          self.on(pathEmit, function(req, res){
            if (req.method == 'POST') {
              callback(req, res);
            } else {
              self.emit('error', req, res, {cod: 500, desc: 'Error not method ' + req.method});
            }
          });
        },
        put: function(callback){
          self.on(pathEmit, function(req, res){
            if (req.method == 'PUT') {
              callback(req, res);
            } else {
              self.emit('error', req, res, {cod: 500, desc: 'Error not method ' + req.method});
            }
          });
        },
        delete: function(callback){
          self.on(pathEmit, function(req, res){
            if (req.method == 'DELETE') {
              callback(req, res);
            } else {
              self.emit('error', req, res, {cod: 500, desc: 'Error not method ' + req.method});
            }
          });
        }
      }

    }

    var routesKey = objectKey(routes);
    object = {}

    for (var i = 0; i < routesKey.length; i++) {
      object[routesKey[i]] = routeTemplate(routesKey[i]);
    };

    return object;
  }

  this.start = function() {
    self = this;

    self.on('error', function(req, res, options){
      res.writeHead(options.cod, {"Content-Type": "text/html"});
      res.write(options.desc);
      res.end();
    });

    function onRequest(request, response) {
      var pathname = url.parse(request.url).pathname;
      console.log("Peticion para " + pathname + " recibida.");

       var pathEmit = pathname.replace(/\//g,'-');

       console.log(pathEmit);

       if(!self.emit(pathEmit, request, response)){
          self.emit('error', request, response, {cod: 404, desc: 'Not Found'});
       }
    }

    http.createServer(onRequest).listen(port);
    console.log('Listening on port ' + port + '...');
  }
}


util.inherits(Server, EventEmitter);


module.exports = Server;


