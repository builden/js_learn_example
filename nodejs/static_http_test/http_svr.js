/**
 * 注意如果端口号小于1024在mac下需要使用管理员权限启动
 * sudo node http_svr.js
 */

var http = require('http');
var url = require('url');
var fs = require('fs-extra');
var path = require('path');
var mime = require('./mime.js');
var config = require('./config.js');

console.log('=============== process begin ====================');
var port = process.env.PORT || 80;

var server = http.createServer(function(request, response) {
    response.setHeader("Server", "Node/V5");
    response.setHeader('Accept-Ranges', 'bytes');
    var pathname = url.parse(request.url).pathname;
    if (pathname.slice(-1) === "/") {
        pathname = pathname + config.Welcome.file;
    }
    var realPath = path.join("assets", path.normalize(pathname.replace(/\.\./g, "")));

    var pathHandle = function(realPath) {
        fs.stat(realPath, function(err, stats) {
            if (err) {
                response.writeHead(404, "Not Found", {
                    'Content-Type': 'text/plain'
                });
                response.write("This request URL " + pathname + " was not found on this server.");
                response.end();
            } else {
                if (stats.isDirectory()) {
                    realPath = path.join(realPath, "/", config.Welcome.file);
                    pathHandle(realPath);
                } else {
                    var ext = path.extname(realPath);
                    ext = ext ? ext.slice(1) : 'unknown';
                    var contentType = mime[ext] || "text/plain";
                    response.setHeader("Content-Type", contentType);
                    response.setHeader('Content-Length', stats.size);

                    var lastModified = stats.mtime.toUTCString();
                    var ifModifiedSince = "If-Modified-Since".toLowerCase();
                    response.setHeader("Last-Modified", lastModified);

                    if (ext.match(config.Expires.fileMatch)) {
                        var expires = new Date();
                        expires.setTime(expires.getTime() + config.Expires.maxAge * 1000);
                        response.setHeader("Expires", expires.toUTCString());
                        response.setHeader("Cache-Control", "max-age=" + config.Expires.maxAge);
                    }

                    if (request.headers[ifModifiedSince] && lastModified == request.headers[ifModifiedSince]) {
                        response.writeHead(304, "Not Modified");
                        response.end();
                    } else {
                        var compressHandle = function(raw, statusCode, reasonPhrase) {
                            var stream = raw;
                            var acceptEncoding = request.headers['accept-encoding'] || "";
                            var matched = ext.match(config.Compress.match);

                            if (matched && acceptEncoding.match(/\bgzip\b/)) {
                                response.setHeader("Content-Encoding", "gzip");
                                stream = raw.pipe(zlib.createGzip());
                            } else if (matched && acceptEncoding.match(/\bdeflate\b/)) {
                                response.setHeader("Content-Encoding", "deflate");
                                stream = raw.pipe(zlib.createDeflate());
                            }
                            response.writeHead(statusCode, reasonPhrase);
                            stream.pipe(response);
                        };

                        if (request.headers["range"]) {
                            var range = utils.parseRange(request.headers["range"], stats.size);
                            if (range) {
                                response.setHeader("Content-Range", "bytes " + range.start + "-" + range.end + "/" + stats.size);
                                response.setHeader("Content-Length", (range.end - range.start + 1));
                                var raw = fs.createReadStream(realPath, {
                                    "start": range.start,
                                    "end": range.end
                                });
                                compressHandle(raw, 206, "Partial Content");
                            } else {
                                response.removeHeader("Content-Length");
                                response.writeHead(416, "Request Range Not Satisfiable");
                                response.end();
                            }
                        } else {
                            var raw = fs.createReadStream(realPath);
                            compressHandle(raw, 200, "OK");
                        }
                    }
                }
            }
        });
    };

    pathHandle(realPath);
});

server.listen(port);
console.log("Server runing at port: " + port + ".");

/**
 * 获取客户端ip
 * @param req
 * @returns {*}
 */
function getClientIP(req) {
    return req.headers['x-forwarded-for'] || // 判断是否有反向代理
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress;
}