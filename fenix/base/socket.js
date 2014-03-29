"use strict"
/*
  Socket io Adapter for fenix use.
*/
module.exports = function(server){
  var io = require('socket.io');

  io.set('match origin protocol', true);
  io.set('origins', '*.*');
  io.set('transports', ['websocket', 'flashsocket', 'htmlfile','xhr-polling', 'jsonp-polling']);

  socket = io.listen(server);

  return socket;
}