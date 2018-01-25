const fs = require('fs');

class ParseFile {
  constructor(file) {
    this.file = file;
    this.fields = {
      id: 'INTERNAL_ID',
      first: 'FIRST_NAME',
      middle: 'MIDDLE_NAME',
      last: 'LAST_NAME',
      phone: 'PHONE_NUM',
    }
    this.parsedLines = [];
    this.handleFileDone = this.handleFileDone.bind(this);
  }

  handleFileDone(err) {
    if (err) throw err;
    console.log('File Saved!');
  }

  getFileText() {
    return fs.readFileSync('./input-directory/' + this.file, 'utf8').trim().split('\n');
  }

  getKeys() {
    const keys = {};
    this.fileText[0].split(',').forEach((key, idx) => keys[key] = idx);

    return keys;
  }

  getIdx(field) {
    return this.keys[this.fields[field]];
  }

  textToJSON(string) {
    const textArr = string.split(',');

    return {
      id: textArr[this.getIdx('id')],
      name: {
        first: textArr[this.getIdx('first')],
        middle: textArr[this.getIdx('middle')],
        last: textArr[this.getIdx('last')],
      },
      phone: textArr[this.getIdx('phone')],
    }
  }

  dataToString() {
    return JSON.stringify(this.parsedLines);
  }

  setup() {
    this.fileText = this.getFileText();
    this.keys = this.getKeys();
  }

  parse() {
    this.setup();

    for (let i = 1; i < this.fileText.length; i++) {
      this.parsedLines.push(this.textToJSON(this.fileText[i]));
    }

    fs.writeFile('./output-directory/' + this.file + '.json', this.dataToString(), 'utf8', this.handleFileDone);
  }
}

module.exports = ParseFile;
