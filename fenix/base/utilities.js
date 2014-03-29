"use strict"

var config = require('configure');

var util = {
  merge: function(obj1, obj2){ merge(obj1, obj2) },
  getDateTime: getDateTime(),
  jsonFormat: function(err){ jsonFormat(err); },
  md5: function(str) { md5(str); },
  path: function(path) { apiPath(path); },
  gravatarRequest: function(email, options) { gravatarRequest(email, options) }
}

module.exports = util;


/*
  Overwrites obj1's values with obj2's and adds obj2's if non existent in obj1

  @param {Object} obj1
  @param {Object} obj2

  @returns obj3 a new object based on obj1 and obj2
*/
function merge(obj1,obj2){
  var obj3 = {};
  for (var attrname in obj1) { obj3[attrname] = obj1[attrname]; }
  for (var attrname in obj2) { obj3[attrname] = obj2[attrname]; }
  return obj3;
}

// TODO: Documentar
function jsonFormat(err){
  var format = {}
  if (err) {
    format = { status: 'error' };
  } else {
    format = { status: 'success' };
  }

  return format;
}

// TODO: Documentar
function md5(text){
  var md5 = require('MD5');
  return md5(text);
}

// TODO: Documentar
function apiPath(path){
  var rootPath = config.api.default_path;
  var version =  config.api.version;
  var path = rootPath + version + '/' + path;
  return  path;
}

// TODO: Documentar
function gravatarRequest(email, options){
  var gravatar = require('gravatar');
  var options = (options != undefined)? {} : options;

  var url = gravatar.url (email, options);
  return url;
}


// TODO: Documentar
function getDateTime() {
  var date = new Date();
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  month = (month < 10 ? "0" : "") + month;
  var day  = date.getDate();
  day = (day < 10 ? "0" : "") + day;
  return year + "-" + month + "-" + day ;
}



