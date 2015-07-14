# isofetcher
Fetch-based REST API requests for the browser and Node.js. 

## Use Anywhere
This library works in the client and on the server.  

## Install
````
bower install isofetcher
````
Note: This requires, at a minimum, [resturlify](https://github.com/ZeroMcMuffin/resturlify). Older browsers require es6-promises.

Or

````
npm install isofetcher
````

### Examples
#### Constructor
```javascript
var fetcher = require('isofetcher')({resources: ['foo','bar'], fqBaseUrl: 'https://www.web.com/api'});
```
or
```javascript
var fetcher = isofetcher({resources: ['foo','bar'], fqBaseUrl: 'https://www.web.com/api'});
```

#### Basic Usage
##### GET
```javascript
fetcher.foo.get();
```
Generates GET https://www.web.com/api/foo

##### Custom Methods
```javascript
fetcher.bar.get({customMethod: 'children');
```
Generates GET https://www.web.com/api/bar/children

```javascript
fetcher.foo.get({customMethod: 'children', id: 1);
```
Generates GET https://www.web.com/api/foo/1/children

##### PUT
```javascript
fetcher.foo.put({id: 1});
```
Generates PUT https://www.web.com/api/foo/1

##### POST
```javascript
fetcher.bar.post({body: {payload: 1});
```
Generates POST https://www.web.com/api/bar/1

##### PATCH
```javascript
fetcher.foo.get({id: 1});
```
Generates PATCH https://www.web.com/api/foo/1

##### DELETE
```javascript
fetcher.foo.get({id: 1});
```
Generates DELETE https://www.web.com/api/foo/1

#### Headers
```javascript
fetcher.foo.post({headers: {
  'Content-Type' : 'application/json'
});
```

#### Cookies
Cookies are not sent by default.  Send the credential option to send cookies.
```javascript
fetch.foo.get({credentials: 'same-origin'});
```

