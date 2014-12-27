
# Resolve Path

Resolve a path against a root path with validation against common malicious attacks.

This module would protect against commons attacks like `GET /../file.js` which reaches outside the root folder.

## API

### absolutePath = resolve(rootPath, relativePath)

```js
var resolve = require('resolve-path')

var filename = resolve(process.cwd(), 'public/favicon.ico')
// => ~/public/favicon.ico
```

`relativePath` is generally a path given by a server. For example, in Express, it's probably `req.path.slice(1)`, removing the leading `/` to make the path relative.

`rootPath` defaults to `process.cwd()`.

`absolutePath` is the resolved path.

This function __throws__.
