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
You can now execute fetch request with the following syntax: fetcher.<resource>.<http-method>(options);
##### GET
```javascript
fetcher.foo.get();
```

