const fs = require('fs');
const ParseFile = require('./parse_file.js');

class WatchFolder {
  constructor(props) {
    this.options = {
      inputDirectory: props.inputDirectory || './input-directory',
      outputDirectory: props.outputDirectory || './output-directory',
      errorDirectory: props.errorDirectory || './error-directory',
      }
    this.interval = props.interval || 2000;
    this.processedFiles = {};
  }

  readFolder() {
    return fs.readdirSync(this.options.inputDirectory);
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
    new ParseFile(file, this.options).parse();
  }

  checkFolder() {
    const files = this.readFolder();

    files.forEach(file => {
      if (this.shouldProcessFile(file)) {
        this.processFile(file);
      }
    });
  }

  startTimer() {
    return setInterval(() => this.checkFolder(), this.interval);
  }

  stop() {
    clearInterval(this.timer);
  }

  start() {
    this.timer = this.startTimer();
  }
}

module.exports = WatchFolder;
