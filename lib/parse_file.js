const fileUtil = require('./file_util.js');
const validate = require('./validation_util.js');

class ParseFile {
  constructor(fileName, options) {
    this.fileName = fileName;
    this.options = options;
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
  }

  setup() {
    this.fileText = this.getFileText();
    this.keys = this.getKeys();
    this.writeStream = fileUtil.openStream(this.options.outputDirectory + '/' + this.fileName + '.json');
    fileUtil.writeToStream(this.writeStream, '[' + '\n');
  }

  handleFileDone(err) {
    if (err) throw err;
    console.log('File Saved!');
  }

  getFileText() {
    return fileUtil.readFile(this.options.inputDirectory, this.fileName).trim().split('\n');
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
      if (error !== undefined) {
        errors.push(error);
      }
    }

    this.errorLines = this.errorLines.concat(errors);

    return errors.length < 1 ? true : false;
  }

  getIdx(field) {
    return this.keys[this.fields[field]];
  }

  parseLine(string, i) {
    const textArr = string.split(',');
    if (this.validateLine(textArr, i)) {
      fileUtil.writeToStream(this.writeStream, this.dataToString(this.textToJSON(textArr)) + '\n');
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
    return JSON.stringify(data, null, 4);
  }

  parseFile() {
    for (let i = 1; i < this.fileText.length; i++) {
      this.parseLine(this.fileText[i], i);
    }
  }

  writeErrors() {
    const errorStream = fileUtil.openStream(this.options.errorDirectory + '/' + this.fileName);
    fileUtil.writeToStream(errorStream, this.errorLines);
    fileUtil.closeStream(errorStream);
  }

  checkErrors() {
    if (this.errorLines.length > 0) {
      this.writeErrors();
    }
  }

  closeStream() {
    fileUtil.writeToStream(this.writeStream, ']');
    fileUtil.closeStream(this.writeStream);
  }

  parse() {
    this.setup();
    this.parseFile();
    this.checkErrors();
    this.closeStream();
  }
}

module.exports = ParseFile;
