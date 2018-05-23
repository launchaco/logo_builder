const express = require("express");
const fontSelector = require('./font-selector');
const fontGenerator = require('./font-generator');

const app = express();
 
app.get('/getRecommendedFont', (req, res) => {
  const query = req.query;
  const response = {};
  const fonts = fontSelector.getRecommendedFont(JSON.parse(query.payload), query.amountNear);

  for (var i = 0; i < fonts.length; i++) {
    fonts[i].svg = fontGenerator.generateFont('hello', fonts[i].name);
  }
  response.fonts = fonts;
  res.status(200).json(response);
}); 

app.use(express.static('frontend'));

app.listen(1234);
