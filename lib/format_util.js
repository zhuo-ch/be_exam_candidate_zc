module.exports = {
  parseOptions: data => {
    const options = {};

    for (let i = 2; i < data.length; i++) {
      if (data[i][0] === '-') {
        options[data[i].slice(1)] = data[i + 1];
        i ++
      }
    }

    return options;
  },
  checkExtension: file => {
    const fileName = file.split('.');

    return fileName[fileName.length - 1] === 'csv';
  },
  getKeys: text => {
    const keys = {};
    text.split(',').forEach((key, idx) => keys[key] = idx);

    return keys;
  },
  textToJSON: (textArr, getIdx) => {
    return {
      id: textArr[getIdx('id')],
      name: {
        first: textArr[getIdx('first')],
        middle: textArr[getIdx('middle')],
        last: textArr[getIdx('last')],
      },
      phone: textArr[getIdx('phone')],
    }
  },
  dataToString: data => {
    return JSON.stringify(data, null, 4);
  },
  checkMiddleName: obj => {
    if (obj.name.middle === '') {
      delete obj.name.middle;
    }

    return obj;
  }
}
