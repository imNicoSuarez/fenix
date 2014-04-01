"use strict"
var googleJWT = require('./auth/googleJWT');
var config = require('configure');

var auth = {
  googleJWT: function(req, res, next){
    console.log(req, res);
      googleJWT(req, res, next);
    }
}

module.exports = auth;
