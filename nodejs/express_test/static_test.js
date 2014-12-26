/**
 * @Author: Bill
 * @Date:   2014-12-26 11:42:21
 * @Last Modified by:   Bill
 * @Last Modified time: 2014-12-26 14:39:51
 *
 * https://github.com/troygoode/node-cors
 */

'use strict';

var express = require('express'),
    cors = require('cors'),
    path = require('path'),
    opener = require('opener'),
    url = require('url'),
    fs = require('fs'),
    app = express();

var PORT = 9001;

var staticDir = path.join(__dirname, '..', 'image_src');
console.log('staticDir: ' + staticDir);

var corsOptions = {
  origin: 'http://127.0.0.1:9000'
};

var whitelist = ['http://example1.com', 'http://example2.com', 'http://127.0.0.1:8080'];
var corsOptionsDelegate = function(req, callback) {
    console.log('Origin ' + req.header('Origin'));
    var corsOptions;
    if (whitelist.indexOf(req.header('Origin')) !== -1) {
        corsOptions = {
            origin: true
        }; // reflect (enable) the requested origin in the CORS response
    } else {
        corsOptions = {
            origin: false
        }; // disable CORS for this request
    }
    callback(null, corsOptions); // callback expects two parameters: error and options
};
// app.use(cors());
app.use('/static', cors(corsOptionsDelegate), express.static(staticDir));


/*
app.get('/*.(html|css|js|jpg|png){1}', cors(), function(req, res, next){
    //var static_file_formats = ['.html','.css','.js','.jpg','.png'];
    //console.log(path.extname(req.url));
    var realpath = staticDir + url.parse(req.url).pathname;
    console.log(realpath);
    if(fs.existsSync(realpath)){
        console.log('file exist');
        res.end(fs.readFileSync(realpath));
    }else{
        res.end('Cannot find request url: '+req.url);
    }
});*/

app.all('/', function(req, res) {
    res.send('hello world');
});

app.listen(PORT, function() {
    console.log('CORS-enabled web server listening on port ' + PORT);
});

opener("http://127.0.0.1:" + PORT);