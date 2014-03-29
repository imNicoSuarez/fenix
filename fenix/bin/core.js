"use strict"

var server   = require('./server');
var database = require('./database');
var routes   = require('./routes');
var socket   = require('./socket');
var util     = require('./utilities');

var fenix = {
  server: server(),
  db: database(),
  auth: 'Not Implement',
  routes: routes(),
  util: util,
  socket: socket
}

module.exports = fenix