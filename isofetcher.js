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
      function err(msg, status, text) {
        var err = new Error(msg);
        err.source = 'isofetcher';
        err.details = {
          status: status || 500,
          statusText: text || 'Unknown',
          method: method,
          url: url,
          options: options
        };
        return err;
      }
      return fetch(url, options)
        .then(function(res){
          var status = res.status + ' ' + res.statusText;
          // 400 = client error, 500 = server error; we do the same thing either way
          if (res.status >= 400) {
            throw err('HTTP ' + status, res.status, res.statusText);
          }
          // 300 = redirect, this should probably be followed, but is it our job? most likely
          // we are making a request to the wrong place to begin with and should fix it
          if (res.status >= 300) {
            throw err('Unexpected redirect: ' + status + ': ' +
                      res.headers.get('location'),
                      res.status, res.statusText);
          }
          // 100 = informational, it's not what we were expecting either
          if (res.status < 200) {
            throw err('Unexpected status code: ' + status, res.status, res.statusText);
          }
          
          // we are assuming json in this library, so any other content type is a problem
          var contentType = res.headers.get('content-type');
          if (contentType !== 'application/json') {
            throw err('Expected Content-Type: application/json, got ' +
                      res.headers.get('content-type'),
                      400, 'Bad response Content-Type');
          }
          
          try {
            return res.json();
          } catch (e) {
            throw err('Unable to decode json: ' + e.message, 500, 'Internal server error');
          }
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
