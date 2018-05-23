const TextToSVG = require('text-to-svg');
const fs = require("fs");

const options = { x: 0, y: 0, fontSize: 14, anchor: 'left baseline' };

const generateFont = (text, fontName) => {
  let path = '';
  if (fontName.indexOf('.ttf') >= 0) {
    path = `./fonts/${fontName}`;
  } else if (fontName.indexOf('.otf') >= 0) {
    path = `./fonts/${fontName}`;
  } else {
    if (fs.existsSync(`./fonts/${fontName}.ttf`)) {
      path = `./fonts/${fontName}.ttf`;
    } else if (fs.existsSync(`./fonts/${fontName}.otf`)) {
      path = `./fonts/${fontName}.otf`;
    }
  }

  const textToSVG = TextToSVG.loadSync(path);
  return `<svg class="font-svg-class" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 300 300"><g>${textToSVG.getPath(text)}</g></svg>`;
};

module.exports = {
  generateFont,
};