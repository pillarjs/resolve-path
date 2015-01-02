/*!
 * resolve-path
 * Copyright(c) 2014 Jonathan Ong
 * MIT Licensed
 */

/**
 * Module dependencies.
 * @private
 */

var assert = require('http-assert')
var resolve = require('path').resolve

/**
 * Module exports.
 */

module.exports = resolvePath

/**
 * Resolve relative path against a root path
 *
 * @param {string} rootPath
 * @param {string} relativePath
 * @return {string}
 * @public
 */
function resolvePath(rootPath, relativePath) {
  var path = relativePath
  var root = rootPath

  // root is optional, similar to root.resolve
  if (arguments.length === 1) {
    path = rootPath
    root = process.cwd()
  }

  if (root == null) {
    throw new TypeError('argument rootPath is required')
  }

  if (typeof root !== 'string') {
    throw new TypeError('argument rootPath must be a string')
  }

  if (path == null) {
    throw new TypeError('argument relativePath is required')
  }

  if (typeof path !== 'string') {
    throw new TypeError('argument relativePath must be a string')
  }

  // resolve the root path
  root = resolve(root)

  // path should never be absolute
  assert(resolve(path) !== path, 400, 'malicious path')

  // null byte(s)
  assert(!~path.indexOf('\0'), 400, 'malicious path')

  path = resolve(root, path)

  // out of bounds
  assert(!path.indexOf(root), 400, 'malicious path')

  return path
}
