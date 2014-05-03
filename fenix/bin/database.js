"use strict"
var config = require('configure');

/*
  Adapters

  _mysql:
    use: mysql-actuverecord.

  _mongodb:
    use: mongoDb.
*/
module.exports = function(){
  var adapter = {};

  if (config.database){
   adapter._mysql = require('./database/mysql-engine')();
  }

  if (config.mongodb){
   adapter._mongodb = require('./database/mongodb-engine')();
  }

  return adapter;
}

