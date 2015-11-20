'use strict';

require('babel/register')({
  sourceMaps: 'inline'
});

var application = require('./application.js');
application.run();
