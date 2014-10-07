
var assert = require('assert')
var path = require('path')

var resolve = require('..')

describe('Resolve Path', function () {
  it('should default to process.cwd()', function () {
    resolve('index.js').should.equal(path.resolve('index.js'))
  })

  it('should work with a root', function () {
    resolve(__dirname, 'resolve.js').should.equal(path.resolve(__dirname, 'resolve.js'))
  })

  it('should not out of bounds', function () {
    resolve(__dirname + '/../', 'index.js').should.equal(path.resolve(__dirname, '../index.js'))
  })

  describe('should throw if path', function () {
    it('is absolute', function () {
      assert.throws(function () {
        resolve('/home')
      })
    })

    it('contains a null byte', function () {
      assert.throws(function () {
        resolve('klajsdkfjasdf\0lkjalksjdfklasf')
      })
    })

    it('is out of bounds', function () {
      assert.throws(function () {
        resolve(__dirname, '../index.js')
      })
    })
  })
})
