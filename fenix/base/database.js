"use strict"

/*
  Adapters

  _mysql:
    use: mysql-actuverecord.

  _mongodb:
    use: mongoDb.
*/
module.exports = function(){
  var adapter = {
    _mysql: require('./database/mysql-engine')(),
    _mongodb: require('./database/mongodb-engine')()
  }

  return adapter;
}

