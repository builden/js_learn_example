var glob = require('glob');
var path = require('path');
var argv = require('optimist').argv;

function main() {
  if (argv.h || argv.help) {
    console.log([
      'usage: particle [options] file',
      '  -e --extra    just extra embed texture to file, filename from tag',
      '  -p --pick     pick texture file and remove tag',
      '  -e --embed    embed texture file',
      '  -f --find     find particle files to dest dir',
      '  -h --help     print the help list'
    ].join('\n'));
    return;
  }
}

main();