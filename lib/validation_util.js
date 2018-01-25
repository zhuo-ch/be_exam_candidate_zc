module.exports = {
  INTERNAL_ID: (id, field, i) => {
    if (id.length === 0) {
      return emptyError('INTERNAL_ID', i);
    } else if (id.length !== 8) {
      return `Line ${i}: Id must contain 8 digits.`;
    } else if (parseInt(id) !== Math.abs(id)) {
      return `Line ${i}: Id must be a positive integer.`;
    }
  },
  FIRST_NAME: (name, field, i) => {
    return validateName(name, field, i);
  },
  MIDDLE_NAME: (name, field, i) => {
    return validateMiddleName(name, field, i);
  },
  LAST_NAME: (name, field, i) => {
    return validateName(name, field, i);
  },
  PHONE_NUM: (num, field, i) => {
    if (num === undefined) {
      return emptyError(field, i);
    } else {
      const numArr = num.split('-');

      if (ensureLength3(numArr)
        || ensureLength3(numArr[0])
        || ensureLength3(numArr[1])
        || numArr[2].length !== 4) {
          return `Line ${i}: ${field} must be in the format ###-###-###.`;
      }
    }
  },
};
//
// exports.validateLine = (line, fields, keys, i) => {
//
// }
//
// exports.validateId = (id, i)=> {
//
// }
//
// exports.validatePhone = (num, field, i) => {
//
// }

validateName = (name, field, i) => {
  if (name.length === 0) {
    return emptyError(field, i);
  } else if (name.length > 15) {
    return maxStringError(field, i);
  }
}

validateMiddleName = (name, field, i) => {
  if (name.length > 15) {
    return maxStringError(field, i);
  }
}

const ensureLength3 = num => {
  return num.length !== 3;
}

const emptyError = (field, idx) => {
  return `Line ${idx}: ${field} cannot be empty.`;
}

const maxStringError = (field, idx) => {
  return `Line ${idx}: ${field} cannot exceed 15 characters.`;
}
