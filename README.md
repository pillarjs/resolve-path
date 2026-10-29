# resolve-path

[![NPM Version][npm-version-image]][npm-url]
[![NPM Downloads][npm-downloads-image]][npm-url]
[![Node.js Version][node-version-image]][node-version-url]
[![Build Status][github-actions-ci-image]][github-actions-ci-url]
[![Windows Build][appveyor-image]][appveyor-url]
[![Test Coverage][coveralls-image]][coveralls-url]

Resolve a relative path against a root path with validation.

This module would protect against commons attacks like `GET /../file.js`
which reaches outside the root folder.

## Installation

This is a [Node.js](https://nodejs.org/en/) module available through the
[npm registry](https://www.npmjs.com/). Installation is done using the
[`npm install` command](https://docs.npmjs.com/getting-started/installing-npm-packages-locally):

```sh
$ npm install resolve-path
```

## API

```
var resolvePath = require('resolve-path')
```

### resolvePath(relativePath)

Resolve a relative path against `process.cwd()` (the process's current working
directory) and return an absolute path. *This will throw* if the resulting resolution
seems malicious. The following are malicious:

  - The relative path is an absolute path
  - The relative path contains a NULL byte
  - The relative path resolves to a path outside of `process.cwd()`
  - The relative path traverses above `process.cwd()` and back down

### resolvePath(rootPath, relativePath)

Resolve a relative path against the provided root path and return an absolute path.
*This will throw* if the resulting resolution seems malicious. The following are
malicious:

  - The relative path is an absolute path
  - The relative path contains a NULL byte
  - The relative path resolves to a path outside of the root path
  - The relative path traverses above the root and back down

## Example

### Safely resolve paths in a public directory

```js
var http = require('http')
var parseUrl = require('parseurl')
var path = require('path')
var resolvePath = require('resolve-path')

// the public directory
var publicDir = path.join(__dirname, 'public')

// the server
var server = http.createServer(function onRequest (req, res) {
  try {
    // get the pathname from the URL (decoded)
    var pathname = decodeURIComponent(parseUrl(req).pathname)

    if (!pathname) {
      res.statusCode = 400
      res.end('path required')
      return
    }

    // remove leading slash
    var filename = pathname.substr(1)

    // resolve the full path
    var fullpath = resolvePath(publicDir, filename)

    // echo the resolved path
    res.statusCode = 200
    res.end('resolved to ' + fullpath)
  } catch (err) {
    res.statusCode = err.status || 500
    res.end(err.message)
  }
})

server.listen(3000)
```

## License

[MIT](LICENSE)

[coveralls-image]: https://badgen.net/coveralls/c/github/jshttp/accepts/master
[coveralls-url]: https://coveralls.io/r/jshttp/accepts?branch=master
[github-actions-ci-image]: https://badgen.net/github/checks/jshttp/accepts/master?label=ci
[github-actions-ci-url]: https://github.com/jshttp/accepts/actions/workflows/ci.yml
[node-version-image]: https://badgen.net/npm/node/accepts
[node-version-url]: https://nodejs.org/en/download
[npm-downloads-image]: https://badgen.net/npm/dm/accepts
[npm-url]: https://npmjs.org/package/accepts
[npm-version-image]: https://badgen.net/npm/v/accepts
[appveyor-image]: https://img.shields.io/appveyor/ci/dougwilson/resolve-path/master.svg?label=windows
[appveyor-url]: https://ci.appveyor.com/project/dougwilson/resolve-path
