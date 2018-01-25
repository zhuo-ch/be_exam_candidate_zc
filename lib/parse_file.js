const fs = require('fs');

class ParseFile {
  constructor(file) {
    this.file = file;
  }

  getFileText() {
    this.fileText = fs.readFileSync('./input-directory/' + this.file, 'utf8');
    console.log(this.fileText);
  }

  setup() {
    this.getFileText();
    // this.getKeys();
  }

  parse() {
    this.setup();
  }
}

module.exports = ParseFile;
