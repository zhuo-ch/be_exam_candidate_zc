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
  }

  getFileText() {
    return fs.readFileSync('./input-directory/' + this.file, 'utf8').trim().split('\n');
  }

  getKeys() {
    const keys = {};
    this.fileText[0].split(',').forEach((key, idx) => keys[key] = idx);

    return keys;
  }

  textToJSON(string) {
    const textArr = string.split(',');

    return {
      id: textArr[this.keys[this.fields['id']]],
      name: {
        first: textArr[this.keys[this.fields['first']]],
        middle: textArr[this.keys[this.fields['middle']]],
        last: textArr[this.keys[this.fields['last']]],
      },
      phone: textArr[this.keys[this.fields['phone']]],
    }
  }

  setup() {
    this.fileText = this.getFileText();
    this.keys = this.getKeys();
  }

  parse() {
    this.setup();
    for (let i = 1; i < this.fileText.length; i++) {
      console.log(this.textToJSON(this.fileText[i]));
    }
  }
}

module.exports = ParseFile;
