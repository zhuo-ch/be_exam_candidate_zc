const fileUtil = require('./file_util.js');
const formatUtil = require('./format_util.js');
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

  checkNotProcessed(file) {
    return !this.processedFiles.hasOwnProperty(file);
  }

  shouldProcessFile(file) {
    return formatUtil.checkExtension(file) && this.checkNotProcessed(file);
  }

  processFile(file) {
    this.processedFiles[file] = true;
    new ParseFile(file, this.options).parse();
  }

  checkFolder() {
    const files = fileUtil.readFolder(this.options.inputDirectory);

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
    console.log(`Watching ${this.options.inputDirectory}`);
  }
}

module.exports = WatchFolder;
