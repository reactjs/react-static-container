'use strict';

var babel = require('babel');
var babelPluginModules = require('fbjs/scripts/babel/rewrite-modules');
var objectAssign = require('object-assign');

var babelOpts = {
  nonStandard: true,
  stage: 1,
  plugins: [babelPluginModules],
  _moduleMap: {
    'React': 'react',
    'ReactDOM': 'react-dom',
  }
};

module.exports = {
  process: function(src, path) {
    return babel.transform(src, objectAssign({filename: path}, babelOpts)).code;
  }
};
