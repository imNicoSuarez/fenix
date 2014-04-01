"use strict"

var expressJwt  = require('express-jwt'),
    request     = require('request'),
    config      = require('configure'),
    fenixConfig = require('../../config/fenix-config');

var validators = {};

function reload_validators (options) {
  request.get({
    url: fenixConfig.auth.JWT.google.url,
    json: true
  }, function (err, resp, certs) {
    Object.keys(certs).forEach(function (kid) {
      validators[kid] = expressJwt({
        audience: options.client_id,
        secret: certs[kid]
      });
    });
  });
}

function googeJWT(req, res, next) {
  console.log(req, res);
  var options = { client_id: config.google.client_id };

  setTimeout(function () {
    reload_validators(options);
  }, 24 * 60 * 60);

  reload_validators(options);

  return validatorHeader(req, res, next)
};

function validatorHeader(req, res, next) {
  console.log(req, res);
  var auth_header = req.get('Authorization');

  if (!auth_header || !auth_header.match(/^Bearer\s/)) {
    return res.send(401, 'Missing authorization header');
  }

  var token = auth_header.replace(/^Bearer\s/, '');
  var header, kid;

  try {
    header = JSON.parse(Buffer(token.split('.')[0], 'base64').toString());
  }catch(err) {
    return res.send(401, "Can't parse the JWT's header");
  }

  kid = header.kid;

  if (!kid) {
    return res.send(401, "Missing kid in JWT's header");
  }

  validators[kid](req, res, next);
};


module.exports = googeJWT;