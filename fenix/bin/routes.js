"use strict"

require('js-yaml');

var fs = require('fs'),
    config = require('configure');

module.exports = function(){
  path = fs.realpathSync(config.routes.file, {'/config': './config/'});
  return require(path);
}
