# resolve-path

[![NPM Version][npm-image]][npm-url]
[![NPM Downloads][downloads-image]][downloads-url]
[![Node.js Version][node-image]][node-url]
[![Build Status][travis-image]][travis-url]
[![Test Coverage][coveralls-image]][coveralls-url]

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

[npm-image]: https://img.shields.io/npm/v/resolve-path.svg?style=flat
[npm-url]: https://npmjs.org/package/resolve-path
[node-image]: https://img.shields.io/node/v/resolve-path.svg?style=flat
[node-url]: http://nodejs.org/download/
[travis-image]: https://img.shields.io/travis/pillarjs/resolve-path.svg?style=flat
[travis-url]: https://travis-ci.org/pillarjs/resolve-path
[coveralls-image]: https://img.shields.io/coveralls/pillarjs/resolve-path.svg?style=flat
[coveralls-url]: https://coveralls.io/r/pillarjs/resolve-path?branch=master
[downloads-image]: https://img.shields.io/npm/dm/resolve-path.svg?style=flat
[downloads-url]: https://npmjs.org/package/resolve-path
