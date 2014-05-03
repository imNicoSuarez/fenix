var url = require('url');

module.exports =   url.format({
  protocol: 'https',
  host:     'accounts.google.com',
  pathname: '/o/oauth2/auth',
  query: {
    client_id:     "795343245353-tjkggvshqesge5f3m71a0ortv9hlv7o8.apps.googleusercontent.com",
    redirect_uri:  "http://localhost:4000/",
    response_type: 'id_token',
    scope:         'openid email profile'
  }
});