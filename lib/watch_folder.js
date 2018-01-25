const fs = require('fs');

class WatchFolder {
  constructor(folder) {
    this.folder = folder;
    this.processedFiles = {};
  }

  checkFolder() {
    const files = fs.readdirSync(this.folder);
console.log(files);
    // files.forEach(file => {
    //   this.checkExtension()
    // });
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
