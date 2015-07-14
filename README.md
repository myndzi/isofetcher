# isofetcher
Fetch-based REST API requests for the browser and Node.js. 

## Use Anywhere
This library works in the client and on the server.  

## Install
````
bower install isofetcher
````
Note: This requires, at a minimum, [resturlify link](https://github.com/ZeroMcMuffin/resturlify). Older browsers require es6-promises.

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
Generates GET https://www.web.com/api

##### PUT
```javascript
fetcher.foo.put({id:1});
```
Generates PUT https://www.web.com/api/1

##### POST
```javascript
fetcher.foo.post({body: {payload:1});
```
Generates POST https://www.web.com/api

##### PATCH
```javascript
fetcher.foo.get({id: 1});
```
Generates PATCH https://www.web.com/api/1

##### DELETE
```javascript
fetcher.foo.get({id:1});
```
Generates DELETE https://www.web.com/api/1

