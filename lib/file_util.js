const fs = require('fs');

module.exports = {
  readFolder: directory => fs.readdirSync(directory),
  readFile: (directory, fileName) => fs.readFileSync(directory + '/' + fileName, 'utf8'),
  deleteFile: (directory, fileName) => fs.unlinkSync(directory + '/' + fileName),
  openStream: fileName => fs.createWriteStream(fileName),
  writeToStream: (fileStream, text) => fileStream.write(text, 'utf8'),
  closeStream: fileStream => fileStream.end(),
}
