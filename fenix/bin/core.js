"use strict"

var server   = require('./server');

var fenix = {
  server: server(),
  resource: server().resource,
  db: require('./database')(),
  auth: require('./auth'),
  routes: require('./routes'),
  util: require('./utilities'),
  socket: require('./socket')
}

module.exports = fenix;