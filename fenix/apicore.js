"use strict"

var server   = require('./base/server');
var database = require('./base/database');
var routes   = require('./base/routes');
var socket   = require('./base/socket');
var util     = require('./base/utilities');

var fenix = {
  server: server(),
  db: database(),
  auth: 'Not Implement',
  routes: routes(),
  util: util,
  socket: socket
}

module.exports = fenix