var debug = require('debug');
var moment = require('moment');
debug.formatArgs = function() {
  var args = arguments;
  var useColors = this.useColors;
  var name = this.namespace;

  if (useColors) {
    var c = this.color;

    args[0] = '  \u001b[3' + c + ';1m' + name + ' '
      + '\u001b[0m'
      + args[0] + '\u001b[3' + c + 'm'
      + ' +' + exports.humanize(this.diff) + '\u001b[0m';
  } else {
    args[0] = moment().format('YY-MM-DD HH-mm-ss.SSS')
      + ' [' + name + '] ' + args[0];
  }
  return args;
}

var log = debug('debug_test');
var error = debug('debug_test:error');

log('debug start');

setTimeout(function() {
  log('setTimeout 1s');
  error('haha');
  // debug.disable();
}, 1000);


setTimeout(function() {
  log('setTImeout 1500ms');
  error('haha2');
}, 1500);

/*
var a = require('debug')('worker:a')
  , b = require('debug')('worker:b');

function work() {
  a('doing lots of uninteresting work');
  setTimeout(work, Math.random() * 1000);
}

work();

function workb() {
  b('doing some work');
  setTimeout(workb, Math.random() * 2000);
}

workb();

setTimeout(function(){
  b(new Error('fail'));
}, 5000);
//*/
/*
var debug = require('debug');
var error = debug('app:error');

// by default stderr is used
error('goes to stderr!');

var log = debug('app:log');
// set this namespace to log via console.log
log.log = console.log.bind(console); // don't forget to bind to console!
log('goes to stdout');
error('still goes to stderr!');

// set all output to go via console.info
// overrides all per-namespace log settings
debug.log = console.info.bind(console);
error('now goes to stdout via console.info');
log('still goes to stdout, but via console.info now');
*/
