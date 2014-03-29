// TODO: Crear migraciones para mongoDb.
"use strict"

var mongo = require('mongodb'),
    config = require('configure');

module.exports = function(){

  var Server = mongo.Server,
      MongoDb = mongo.Db,
      BSON = mongo.BSONPure;

  var server = new Server(config.mongodb.host, config.mongodb.port, {auto_reconnect: true});
  var mongoDb = new MongoDb(config.mongodb.database, server);

  mongoDb.open(function(err, mongoDb) {
    if(!err) {
      console.log("Connected to " + config.mongodb.database + " database");
      mongoDb.collection('user_sessions', {strict:true}, function(err, collection) {
        if (err) {
          console.log("The 'users' collection doesn't exist. Creating it with sample data...");
          initialData();
        }
      });
    }
  });

  return mongoDb;
}

var initialData = function() {

  var user_sessions = [
      {
        _id: 1,
        user_id: 0,
        session_token: '111111111111',
        due_date: '2013-10-12'
      }
  ];

  var presentation_sessions = [
    {
      _id: 0,
      user_id: 0,
      current_page: 0,
      presentation_id: 0,
    }
  ]

  mongoDb.collection('user_sessions', function(err, collection) {
      collection.insert(user_sessions, {safe:true}, function(err, result) {});
  });

  mongoDb.collection('presentation_sessions', function(err, collection){
    collection.insert(presentation_sessions, {safe:true}, function(err, result) {
      console.log(result);
    })
  });
};
