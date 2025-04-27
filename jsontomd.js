const fs = require("node:fs");

const jsonToConvert = require('./data');

jsonToConvert.forEach((e, i) => {
  
  const newName = e.name.replaceAll(/ +/g, "_").toLowerCase();
  const toWrite = `---
id: ${i}
name: ${e.name}
category: ${e.category}
price: ${e.price}
thumbnail: ${e.image.thumbnail.replace(".", "")}
mobile: ${e.image.mobile.replace(".", "")}
tablet: ${e.image.tablet.replace(".", "")}
desktop: ${e.image.desktop.replace(".", "")}
---
  `
  fs.appendFile(`src/products/p_${newName}_${i}.md`, toWrite, function (err) {
    if (err) throw err;
  })
});

