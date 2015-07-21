var moment = require('moment');
var bunyan = require('bunyan');
var logStreamsList = [];
var log = bunyan.createLogger({
    name: 'foo',
    streams: [{
        path: getNow() + '.log',
        // `type: 'file'` is implied
    }]
});
logStreamsList.push(log.streams[0]);

log.info('test');

logStreamsList[0].path = getNow() + '.log';
console.log(log.streams[0].path);
// log.streams[0].path = getNow() + '.log';
log.reopenFileStreams();
log.warn('ch file');

function getNow() {
  return moment().format('YYYY_MM_DD_HH_mm_ss.SSS');
}

var log2 = bunyan.createLogger({
  name: 'bar'
});

log2.info('log2 test');