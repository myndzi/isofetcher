var fetch = require('node-fetch');
var RestUrlify = require('resturlify');

module.exports = require('./isofetcher')(fetch, RestUrlify);
