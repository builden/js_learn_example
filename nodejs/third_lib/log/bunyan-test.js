var bunyan = require('bunyan');

var nconf = require('nconf');
nconf.argv()
  .env()
  .file({
    file: '~/test.json'
  })

nconf.set('streams', [{
  level: 'info',
  stream: process.stdout
}, {
  level: 'warn',
  path: 'test.log'
}]);

var log = bunyan.createLogger({
  name: 'myapp',
  streams: nconf.get('streams')
});
var nt = require('./nconf-test.js');
var _ = require('lodash');

// setInterval(function() {
//   var rand = _.random(0, 100);
//   if (rand % 2 === 0) {
//     log.info('random ', _.random(0, 100));
//   } else {
//     log.error('random ', _.random(0, 100));
//   }
// }, 3000);

log.info('hi');
log.warn({
  lang: 'fr'
}, 'au revoir');
