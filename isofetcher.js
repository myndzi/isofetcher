'use strict';

module.exports = function (fetch, RestUrlify) {
  function RestResource(options) {
    var fqBaseUrl = options.fqBaseUrl || '';
    var resource = options.resource || '';

    var urlTools = RestUrlify(fqBaseUrl);

    var request = function(options, method) {
      options = options || {};
      options.resource = resource;
      options.method = method;

      var url = urlTools.buildUrl(options);
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

  function IsoFetcher(options) {
    var api = {};
    options.resources.forEach( function (resource) {
      api[resource] = RestResource( {resource: resource, fqBaseUrl: options.fqBaseUrl} );
    });
    return api;
  };

  return IsoFetcher;
};
