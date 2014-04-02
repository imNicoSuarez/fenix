var server = require('../fenix/bin/server-new');

var querystring = require("querystring");


var handle = {
                '/api': api,
                '/site': site
             }


server.start(handle);

//  handler
function api(response, dataPosteada) {
  console.log("Manipulador de api");
  var body = '<html>'+
  '<head>'+
  '<meta http-equiv="Content-Type" content="text/html;charset=UTF-8" />'+
  '</head>'+
  '<body>'+
  '<form action="/site" method="post">'+
  '<textarea name="text" rows="20" cols="60"></textarea>'+
  '<input type="submit" value="Submit text" />'+
  '</form>'+
  '</body>'+
  '</html>';

  response.writeHead(200, {"Content-Type": "text/html"});
  response.write(body);
  response.end();
}

function site(response, dataPosteada) {
  console.log("Manipulador de sitio");
  response.writeHead(200, {"Content-Type": "text/html"});
  response.write("Tu enviaste el texto: : " + querystring.parse(dataPosteada)["text"]);
  response.end();
}