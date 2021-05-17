/*
   node ./process-powers.mjs talents
 */

import fs from 'fs'
 
var powersJson = {
  talents: processPowerType("talents"),
  skills: processPowerType("skills"),
  spells: processPowerType("spells"),
  items: processPowerType("items")
}

function processPowerType(powerType) {
  const fileData = fs.readFileSync(`./powers/${powerType}.md`).toString()
  const categories = fileData.split('---')
  return categories.map((category) => processCategory(category, powerType))
}

function processCategory(category, powerType) {
  var [title, powers] = getFirstLine(category.trim())
  title = title.substring(2) // remove hashtags
  powers = powers.split('\n\n').map(s => s.trim())

  var categoryJson = { title, powers: powers.map((power) => processPower(power, title, powerType))}

  return categoryJson
}

function processPower(power, category, powerType) {
  var [title, description] = getFirstLine(power)
  title = title.substring(3) // remove hashtags
  // console.log(powerType)
  var powerJson = {title, description, category, powerType}
  return powerJson
}

function getFirstLine(text) {
  var lines = text.split("\n");   // split all lines into array
  var firstline = lines.shift();   // read and remove first line
  var rest = lines.join("\n");     // re-join the remaining lines
  return [firstline, rest]
}

var outputText = JSON.stringify(powersJson,null, 2)
fs.writeFile(`./json/powers/powers.json`, outputText, 'utf8', ()=>{})
  