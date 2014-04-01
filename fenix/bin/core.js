"use strict"

var server   = require('./server');
var database = require('./database');
var routes   = require('./routes');
var socket   = require('./socket');
var util     = require('./utilities');
var auth     = require('./auth');

var fenix = {
  server: server(),
  db: database(),
  auth: auth,
  routes: routes(),
  util: util,
  socket: socket
}

module.exports = fenix;