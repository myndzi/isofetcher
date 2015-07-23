var fetch = window.fetch;
var RestUrlify = require('resturlify');

module.exports = require('./isofetcher')(fetch, RestUrlify);
