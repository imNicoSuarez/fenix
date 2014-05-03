var $ = require('jquery');
var qs = require('querystring');
var jwt_decode = require('jwt-decode');

var token_store = require('./token_store');

var login = $('#login');
var user_area = $('#user-area');

function validate_token(decoded) {
  if (decoded.exp < (new Date().getTime() / 1000)) {
    console.log('Token is expired');
    return false;
  }

  if (decoded.aud !== "795343245353-tjkggvshqesge5f3m71a0ortv9hlv7o8.apps.googleusercontent.com" ) {
    console.log('Token is not for us.');
    return false;
  }

  return true;
}

function show_profile (decoded) {
  login.hide();
  $('.bio-name').html(decoded.email);
  user_area.show();
}

function show_login () {
  $('.bio-name').html('');
  user_area.hide();
  login.show();
}

function set_api_token(token) {
  $.ajaxSetup({
    beforeSend: function (xhr) {
      if (this.crossDomain) return;
      xhr.setRequestHeader('Authorization', 'Bearer ' + token);
    }
  });
}

function get_messages() {
  var target = $('#messages');

  $.ajax({
    url: '/api/messages',
    cache: false
  }).done(function (messages) {
    messages.forEach(function (msg) {
      $('<li>')
        .text(msg.subject + ' by ' + msg.sender)
        .appendTo(target);
    });
  });
}

function coso() {
  var token = token_store.get();
  $.ajax({
    url: 'https://accounts.google.com/o/oauth2/token',

    cache: false
  }).done(function (data) {
      console.log(data)
  });
}



$(function () {
  var token;

  //has google redirected to our page?
  if (window.location.hash.match(/#id_token/)) {
    //parse the hash (as a querystring) and get the id_token (jwt).
    token = qs.parse(window.location.hash.substr(1)).id_token;
    //clear the hash.
    window.location.hash='';
  } else {
    token = token_store.get();
  }

  if (token) {
    var decoded = jwt_decode(token);
    console.log(decoded);

    //quick check if it is not expired and for us
    if (validate_token(decoded)) {
      show_profile(decoded);
      token_store.save(token);
      set_api_token(token);
    } else {
      token_store.clear();
      token = null;
      show_login();
    }
  } else {
    show_login();
  }

});

$('#logout').click(function (e) {
  e.preventDefault();
  token_store.clear();
  window.location.hash='';
  login.show();
  user_area.hide();
});

$('#call-api').click(function (e) {
  e.preventDefault();
  get_messages();
});

$('.auth-link').attr('href', require('./auth_link'));