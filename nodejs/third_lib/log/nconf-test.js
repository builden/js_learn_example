var nconf = require('nconf');
var bunyan = require('bunyan');
var log = bunyan.createLogger({
  name: 'nconf-test',
  streams: nconf.get('streams')
});

log.error(new Error('error test'));
log.info('hi', 'nconf-test');
