const fs = require('fs');
const readline = require('readline');
const WatchFolder = require('./lib/watch_folder.js');

const options = {};
const dataIn = process.argv;

for (let i = 2; i < dataIn.length; i++) {
  if (dataIn[i][0] === '-') {
    options[dataIn[i].slice(1)] = dataIn[i + 1];
    i ++
  }
}

const watcher = new WatchFolder(options);
watcher.start();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.log(`Watching...`)

rl.on('line', line => {
  if (line.toLowerCase() === 'exit') {
    console.log('Exiting');
    watcher.stop();
    rl.close();
  }
});
