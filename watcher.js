const fs = require('fs');
const WatchFolder = require('./lib/watch_folder.js');

const watcher = new WatchFolder('./input-directory');
watcher.start();
