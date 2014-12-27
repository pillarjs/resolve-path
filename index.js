
var resolve = require('path').resolve
var assert = require('http-assert')

module.exports = function resolvePath(root, path) {
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
  assert(!~path.indexOf('\0'), 400, 'null bytes')

  path = resolve(root, path)

  // out of bounds
  assert(!path.indexOf(root), 400, 'malicious path')

  return path
}
