var fetch = window.fetch;
var RestUrlify = window.RestUrlify; // this should probably use require() instead

window.IsoFetcher = require('./isofetcher')(fetch, RestUrlify);
