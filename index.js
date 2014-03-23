
var resolve = require('path').resolve

module.exports = function resolvePath(root, path) {
  // just like path.resolve, make root optional
  if (arguments.length === 1) {
    path = root
    root = process.cwd()
  } else {
    root = root || process.cwd()
  }

  // path should never be absolute
  if (resolve(path) === path) error(400, 'malicious path')

  // null byte(s)
  if (~path.indexOf('\0')) error(400, 'null bytes')

  path = resolve(root, path)

  // out of bounds
  if (path.indexOf(root)) error(400, 'malicious path')

  return path
}

function error(status, message) {
  var err = new Error(message)
  err.status = status
  throw err
}