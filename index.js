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
 * @param {string} root
 * @param {string} path
 * @return {string}
 * @public
 */
function resolvePath(root, path) {
  // just like path.resolve, make root optional
  if (arguments.length === 1) {
    path = root
    root = process.cwd()
  } else {
    root = resolve(root)
  }

  // path should never be absolute
  assert(resolve(path) !== path, 400, 'malicious path')

  // null byte(s)
  assert(!~path.indexOf('\0'), 400, 'malicious path')

  path = resolve(root, path)

  // out of bounds
  assert(!path.indexOf(root), 400, 'malicious path')

  return path
}
