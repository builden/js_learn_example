/*
 * @Author: builden
 * @Date:   2015-01-12 23:49:22
 * @Last Modified by:   builden
 * @Last Modified time: 2015-01-12 23:49:25
 */

'use strict';

var util = require('util')

var AbstractError = function (msg, constr) {
  Error.captureStackTrace(this, constr || this)
  this.message = msg || 'Error'
}
util.inherits(AbstractError, Error)
AbstractError.prototype.name = 'Abstract Error'

var DatabaseError = function (msg) {
  DatabaseError.super_.call(this, msg, this.constructor)
}
util.inherits(DatabaseError, AbstractError)
DatabaseError.prototype.name = 'Database Error'

module.exports = {
  Database: DatabaseError
}
