node-tuleap
===========

[![Build Status (Travis)](https://travis-ci.org/vipex/node-tuleap-api.svg?branch=master)](https://travis-ci.org/vipex/node-tuleap-api)
[![Dependency Status](https://david-dm.org/vipex/node-tuleap-api.png?theme=shields.io)](https://david-dm.org/vipex/node-tuleap-api)
[![Code Climate](https://codeclimate.com/github/vipex/node-tuleap-api/badges/gpa.svg)](https://codeclimate.com/github/vipex/node-tuleap-api)

[![NPM Badge](https://nodei.co/npm/tuleap-api.png?downloads=true&stars=true)](https://npmjs.org/package/tuleap-api)
---

[Tuleap](https://www.tuleap.org/) API Nodejs library.
It wraps the HTTP api library described [here](https://tuleap.net/api/explorer/).


Install
=======

```bash
# Install from npm
npm install tuleap-api
```

Usage
=====

URL to your Tuleap instance should not include `/api` path.

Javascript
----------
```javascript
// Connection
var tuleap = require('tuleap')({
  server:   'https://example.com',
  strictSSL: true
});

// Authentication (generate token)
tuleap.token.login(username, password, function(err, data) {
  if (!err) {
  	console.log(data); // Token and user_id
  }
});

// Listing projects
tuleap.projects.all(function(err, projects) {
  for (var i = 0; i < projects.length; i++) {
    console.log('#' + projects[i].id + ': ' + projects[i].shortname + '\nuri: ' + projects[i].uri + '\nresources: ' + projects[i].resources + '\n\n');
  }
});
```

License
-------

MIT
