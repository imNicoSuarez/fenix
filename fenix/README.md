fenix
=====

Api Framework

## Install

~~~
  $ npm install fenix
~~~

## Create new server.

server.js
~~~javascript
  var fenix = require('fenix');

  var server = fenix.server,
      resource = server.resource,

  // GET /api/users
  resource.api.users.get(function(req, res){
    res.json([
      { name: 'John',  last_name: 'Smith'},
      { name: 'Tito',  last_name: 'Perez'}
    ]);
  });

  // GET /
  resource.root.get(function(req, res){
    res.send('Root');
  });

  server.config();
  server.listen();
~~~

## Config

Create config.json.
~~~json
  {
    "server": {
      "port": 4000,
      "host": "localhost"
    },

    "database": {
      "server": "localhost",
      "username": "<username>",
      "password": "<password>",
      "name": "<database>"
    },

    "mongodb": {
      "host": "localhost",
      "port": 27017,
      "database": "<database>"
    },

    "routes": {
      "file" : "routes.yml"
      "scopes": {
        "api" : "/api"
      }
    },

  }
~~~

Add settings in package.json

package.json
~~~json
  {
    ...
    "scripts": {
      "start": "node server.js --config config.json"
    },
    ...
  }
~~~

## Routes

routes.yml
~~~yaml
  root: '/'
  api:
    users '/users'
~~~

## License

The MIT License (MIT)

Copyright (c) 2014 AUTH10 LLC

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
