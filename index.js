/*!
 * resolve-path
 * Copyright(c) 2014 Jonathan Ong
 * MIT Licensed
 */

/**
 * Module dependencies.
 * @private
 */

var createError = require('http-errors')
var normalize = require('path').normalize
var resolve = require('path').resolve
var sep = require('path').sep

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

  // containing NULL bytes is malicious
  if (path.indexOf('\0') !== -1) {
    throw createError(400, 'Malicious Path')
  }

  // path should never be absolute
  if (resolve(path) === path) {
    throw createError(400, 'Malicious Path')
  }

  // resolve & normalize the root path
  root = normalize(resolve(root) + sep)

  // resolve the path
  path = resolve(root, path)

  // path outside root
  if ((path + sep).substr(0, root.length) !== root) {
    throw createError(400, 'Malicious Path')
  }

  return path
}
