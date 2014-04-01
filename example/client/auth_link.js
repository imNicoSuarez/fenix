var url = require('url');

module.exports =   url.format({
  protocol: 'https',
  host:     'accounts.google.com',
  pathname: '/o/oauth2/auth',
  query: {
    client_id:     "859899350109-0fnmks5mik7ipd289n2o249vkvl9eu34.apps.googleusercontent.com",
    redirect_uri:  "http://localhost:4000/",
    response_type: 'id_token',
    scope:         'openid email'
  }
});