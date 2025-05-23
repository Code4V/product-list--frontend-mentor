const fs = require("node:fs");

const jsonToConvert = require('./data');


jsonToConvert.forEach((e, i) => {
  const newName = e.name.replaceAll(/ +/g, "_").toLowerCase();
  
  const writer = (objectToWrite) => {
    Object.entries(objectToWrite).forEach(([key, value]) => {
      if (typeof value === 'object') {
        writer(value);
      } else if (typeof value === 'number') {
        mdFile.write(`${key}: ${value.toFixed(2).toString()}\n`);
      } else if (typeof value !== 'string') {
        mdFile.write(`${key}: ${value}\n`);
      } else {
        mdFile.write(`${key}: ${value.replace(".", "")}\n`);
      }
    })
  }

  const mdFile = fs.createWriteStream(`src/products/p_${newName}_${i}.md`, { flags: 'a'});

  mdFile.write('---\n');
  mdFile.write(`id: ${i}\n`);
  writer(e, i);
  mdFile.write('---\n');
  mdFile.end()
});
