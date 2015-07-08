'use strict';


var RestResource = function(options) {
  var fqBaseUrl = options.fqBaseUrl || '';
  var resource = options.resource || '';

  if (typeof module !== 'undefined' && module.exports) {
    var fetch = require('node-fetch');
    var RestUrlify = require('resturlify');
  } else {
    var RestUrlify = window.RestUrlify;
    var fetch = window.fetch;
  }

  var request = function(options, method) {
    options = options || {};
    options.resource = resource;
    options.baseUrl = fqBaseUrl;
    options.method = method;

    var url = RestUrlify.url(options);
    return fetch(url, options)
      .then(function(res){
        return res.json();
      });
  };

  return {
    get: function(options) {
      return request(options, 'GET');
    },
    put: function(options) {
      return request(options, 'PUT');
    },
    post: function(options) {
      return request(options, 'POST');
    },
    patch: function(options) {
      return request(options, 'PATCH');
    },
    delete: function(options) {
      return request(options, 'DELETE');
    }
  };
};

var IsoFetcher = function(options) {
  var api = {};
  options.resources.forEach( function (resource) {
    api[resource + ''] = new RestResource( {resource: resource, fqBaseUrl: options.fqBaseUrl} );
  });
  return api;
};


if (typeof module === 'object' && module.exports) {
  module.exports = IsoFetcher;
} else {
  window.IsoFetcher = IsoFetcher;
}
