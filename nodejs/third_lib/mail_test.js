/**
 * 邮箱测试
 * @Author: Bill
 * @Date:   2014-11-03 10:36:22
 * @Last Modified by:   Bill
 * @Last Modified time: 2015-02-06 11:46:54
 *
 * http://www.nodemailer.com/
 */

'use strict'

var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');

// create reusable transporter object using SMTP transport
// https://github.com/andris9/nodemailer-smtp-transport#usage
var transport = nodemailer.createTransport(
  smtpTransport({
    host: "smtp.qq.com", // 主机
    secure: true, // 使用 SSL
    port: 465, // SMTP 端口
    auth: {
      user: 'xiaotao_tt@qq.com',
      pass: 'xiaotao1'
    }
  })
);

// setup e-mail data with unicode symbols
var mailOptions = {
  from: 'xiaotao ✔ <xiaotao_tt@qq.com>', // sender address
  to: 'billdeng@qq.com', // list of receivers， 逗号隔开
  subject: 'Hello ✔', // Subject line
  text: 'Hello world ✔', // plaintext body
  html: '<b>Hello world ✔</b>' // html body
};

// send mail with defined transport object
transport.sendMail(mailOptions, function(error, info) {
  if (error) {
    console.log(error);
  } else {
    console.log('Message sent: ' + info.response);
  }
  transport.close();
});