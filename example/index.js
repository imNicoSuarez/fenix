var fenix = require('../apicore');

  server = fenix.server;
  app = server.express();


  app.get('/', function(res, req){
    req.json({user: 'tit'});
  });


  server.config();
  server.listen();
