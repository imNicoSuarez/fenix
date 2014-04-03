var Server = require('../fenix/bin/server-new');

var server = new Server();

var routes = server.routes();

routes.api.get(function(req, res){
  res.writeHead(200, {"Content-Type": "application/json"});

  res.writeHead(200,{'Content-Type':'application/json'});
  res.end(JSON.stringify([{name: 'Nicolas', last_name: 'Suarez'},
                          {name: 'Juansito', last_name: 'Rodrigez'}]));
});

server.start();

