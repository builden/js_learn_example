/*
 * @Author: builden
 * @Date:   2015-01-12 22:59:24
 * @Last Modified by:   builden
 * @Last Modified time: 2015-01-12 23:50:53
 */

'use strict';

var ApplicationError = require('./ApplicationErrors')

function getUserById(id, callback) {
  if (!id) {
    return callback(new Error('Id is required'))
  }

  if (id > 10) {
    return callback(new ApplicationError.Database('Id cant ↵ be higher than 10'))
  }

  callback(null, { name: 'Harry Goldfarb' })
}

function onGetUserById(err, resp) {
  if (err) {
    return console.log(err.toString())
  }
  console.log('Success:', resp.name)
}

getUserById(1, onGetUserById) // Harry Goldfarb
getUserById(null, onGetUserById) // Error: Id is required
getUserById(53, onGetUserById)
