const fs = require('fs');
const { encode, decode } = require('./base64');

const buffer = fs.readFileSync('img.png');

const { data } = buffer.toJSON();

fs.writeFileSync('base64.txt', encode(data))