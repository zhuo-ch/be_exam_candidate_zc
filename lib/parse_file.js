const fileUtil = require('./file_util.js');
const formatUtil = require('./format_util.js');
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
    this.getIdx = this.getIdx.bind(this);
  }

  setup() {
    this.fileText = this.getFileText();
    this.keys = formatUtil.getKeys(this.fileText[0]);
    this.writeStream = fileUtil.openStream(this.options.outputDirectory + '/' + this.fileName + '.json');
    fileUtil.writeToStream(this.writeStream, '[' + '\n');
  }

  handleFileDone(err) {
    if (err) throw err;
    console.log(`Saved ${this.options.outputDirectory}/${this.fileName}.json`);
  }

  getFileText() {
    return fileUtil.readFile(this.options.inputDirectory, this.fileName).trim().split('\n');
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
      fileUtil.writeToStream(
        this.writeStream,
        formatUtil.dataToString(formatUtil.textToJSON(textArr, this.getIdx)) + '\n'
      );
    }
  }

  parseFile() {
    for (let i = 1; i < this.fileText.length; i++) {
      this.parseLine(this.fileText[i], i);
    }
  }

  writeErrors() {
    const errorStream = fileUtil.openStream(this.options.errorDirectory + '/' + this.fileName);
    fileUtil.writeToStream(errorStream, JSON.stringify(this.errorLines));
    fileUtil.closeStream(errorStream);
    console.log(`Errors found: Saved ${this.options.errorDirectory}/${this.fileName}`);
  }

  checkErrors() {
    if (this.errorLines.length > 0) {
      this.writeErrors();
    }
  }

  closeStream() {
    fileUtil.writeToStream(this.writeStream, ']');
    fileUtil.closeStream(this.writeStream);
    this.handleFileDone();
  }

  parse() {
    this.setup();
    this.parseFile();
    this.checkErrors();
    this.closeStream();
  }
}

module.exports = ParseFile;
