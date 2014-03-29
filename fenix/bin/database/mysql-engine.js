"use strict"
var Db = require('mysql-activerecord'),
    config = require('configure');

module.exports = function(){
  database = new Db.Adapter({
    server: config.database.server,
    username: config.database.username,
    password: config.database.password,
    database: config.database.name
  })
  return database;
}