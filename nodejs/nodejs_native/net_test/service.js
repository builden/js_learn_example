/*
 * @Author: dengtao
 * @Date:   2014-12-24 23:23:38
 * @Last Modified by:   dengtao
 * @Last Modified time: 2014-12-24 23:48:56
 */

'use strict';

console.log('========== app start ===========');
var net = require('net');

var PORT = 9000;

var chatServer = net.createServer();
var clientList = [];

chatServer.on('connect', function(client) {
    client.name = client.remoteAddress + ':' + client.remotePort;
    client.write('Hi ' + client.name + '!\n');

    clientList.push(client);

    client.on('data', function(data) {
        broadcast(data, client);
    });

    client.on('end', function() {
        clientList.splice(clientList.indexOf(client), 1);
    });

    client.on('error', function(e) {
        console.log(e);
    })

    // client.end();  断开连接
});

function broadcast(message, client) {
    var cleanup = [];
    for (var i = 0; i < clientList.length; i++) {
        if (client !== clientList[i]) {
            if (clientList[i].writable) {
                clientList[i].write(client.name + " says " + message)
            } else {
                cleanup.push(clientList[i]);
                clientList[i].destory();
            }
        }
    }

    for (var i = 0; i < cleanup.length; i++) {
        clientList.splice(clientList.indexOf(cleanup[i]), 1);
    }
}

chatServer.listen(PORT);
console.log('listen on ' + PORT);
