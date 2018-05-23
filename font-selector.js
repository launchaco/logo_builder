const fs = require("fs");
let KDTree = require('kd-tree-javascript/kdTree').kdTree;

// Euclidian distance is used
const distance = function(a, b){
  return Math.pow(a.era - b.era, 2) + Math.pow(a.maturity - b.maturity, 2) +
    Math.pow(a.weight - b.weight, 2) + Math.pow(a.personality - b.personality, 2) +
    Math.pow(a.definition - b.definition, 2) + Math.pow(a.concept - b.concept, 2);
};


const getCol = (matrix, col) => {
  var column = [];
  for (var i = 0; i < matrix.length; i++){
    column.push(matrix[i][col]);
  }
  return column;
}

const getRecommendedFont = (payload, amountNear) => {
  const fonts = JSON.parse(fs.readFileSync(`./dataset/OFL/${payload.type}.json`));

  const tree = new KDTree(fonts, distance, ["era", "maturity", "weight", "personality", "definition", "concept"]);

  const nearest = tree.nearest(payload, amountNear);

  return getCol(nearest, 0);
};


module.exports = {
  getRecommendedFont,
};