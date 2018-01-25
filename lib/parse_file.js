const fs = require('fs');
const validate = require('./validation_util.js');

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
    this.errorLines = [];
    this.handleFileDone = this.handleFileDone.bind(this);
    this.validateLine = this.validateLine.bind(this);
  }

  handleFileDone(err) {
    if (err) throw err;
    console.log('File Saved!');
  }

  getFileText() {
    return fs.readFileSync('./input-directory/' + this.file, 'utf8')
      .trim()
      .split('\n');
  }

  getKeys() {
    const keys = {};
    this.fileText[0].split(',').forEach((key, idx) => keys[key] = idx);

    return keys;
  }

  validateLine(line, idx) {
    const errors = [];

    for (let prop in this.keys) {
      const error = validate[prop](line[this.keys[prop]], prop, idx)
      if (!(error === undefined)) {
        errors.push(error);
      }
    }

    this.errorLines = this.errorLines.concat(errors);

    return errors.length > 0 ? true : false;
  }

  getIdx(field) {
    return this.keys[this.fields[field]];
  }

  parseLine(string, i) {
    const textArr = string.split(',');
    if (this.validateLine(textArr, i)) {
      this.parsedLines.push(this.textToJSON(textArr));
    }
  }

  textToJSON(textArr) {
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

  dataToString(data) {
    return JSON.stringify(data);
  }

  setup() {
    this.fileText = this.getFileText();
    this.keys = this.getKeys();
  }

  parse() {
    this.setup();

    for (let i = 1; i < this.fileText.length; i++) {
      this.parseLine(this.fileText[i], i);
    }

    fs.writeFile(
      './output-directory/' + this.file + '.json',
      this.dataToString(this.parsedLines),
      'utf8',
      this.handleFileDone
    );

    if (this.errorLines.length > 0) {
      fs.writeFile('./error-directory/' + this.file + '.json',
      this.dataToString(this.errorLines),
      'utf8',
      this.handleFileDone
    );
    }
  }
}

module.exports = ParseFile;
