const readline = require('readline');
const formatUtil = require('./lib/format_util.js');
const WatchFolder = require('./lib/watch_folder.js');

const options = formatUtil.parseOptions(process.argv);
const watcher = new WatchFolder(options);
watcher.start();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.on('line', line => {
  if (line.toLowerCase() === 'exit') {
    console.log('Exiting');
    watcher.stop();
    rl.close();
  }
});
