const fs = require('fs');

class WatchFolder {
  constructor(folder) {
    this.folder = folder;
    this.processedFiles = {};
  }

  readFolder() {
    return fs.readdirSync(this.folder);
  }

  checkExtension(file) {
    const fileName = file.split('.');

    return fileName[fileName.length - 1] === 'csv';
  }

  checkNotProcessed(file) {
    return !this.processedFiles.hasOwnProperty(file);
  }

  shouldProcessFile(file) {
    return this.checkExtension(file) && this.checkNotProcessed(file);
  }

  processFile(file) {
    this.processedFiles[file] = true;
  }

  checkFolder() {
    const files = this.readFolder();

    files.forEach(file => {
      if (this.shouldProcessFile(file)) {
        this.processFile(file);
      } else {
        console.log(file);
      }
    });
  }

  startTimer() {
    return setInterval(() => this.checkFolder(), 2000);
  }

  stop() {
    clearInterval(this.timer);
  }

  start() {
      this.timer = this.startTimer();
  }
}

module.exports = WatchFolder;
