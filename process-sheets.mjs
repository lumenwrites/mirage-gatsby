/*
   node ./process-sheets.mjs
 */

import fs from 'fs'

/* Powers are stored in google sheet:
   https://docs.google.com/spreadsheets/d/1NavEaDLO-hIivw5tVXV-_dLA8G_FXkqv_DWqxudT9sE/
   Exporting google sheet to json:
   http://blog.pamelafox.org/2013/06/exporting-google-spreadsheet-as-json.html
   Export JSON for All Sheets, save it as powers.json
 */
var data = fs.readFileSync(`./powers/powers.json`)
data = JSON.parse(data)

var powersJson = {} // contain the final list of all powers
/* Loop through each power type (traits, talents, skills, spells, magicItems, equipment) */
for (var powerType in data) {
  /* Process powers */
  var powers = data[powerType]
  /* Remove  powers without title/description (drafts in google sheets) */
  powers = powers.filter(p => p.title && p.description)
  /* Edit fields */
  powers = powers.map(p => {
    /* Remove accidental spaces */
    for (var key in p) {
      if (typeof p[key] === "string") p[key] = p[key].trim()
    }

    /* In which field to put it into character sheet. traits, talents, skills, spells, magicItems, equipment */
    p.powerType = powerType    
    return p
  })

  /* Create list of categories */
  const categorySet = new Set()
  powers.map(p => categorySet.add(p.category))
  /* Add powers to each category */
  var categoriesJson = []
  categorySet.forEach(categoryTitle => {
    var categoryJson = {
      title: categoryTitle,
      powers: powers.filter(p => p.category == categoryTitle)
    }
    categoriesJson.push(categoryJson)
  })

  powersJson[powerType] = categoriesJson
}
//œœœconsole.log(powersJson, JSON.stringify(powersJson, null, 2))
var outputText = JSON.stringify(powersJson, null, 2)

fs.writeFile(`./json/powers/powers.json`, outputText, 'utf8', ()=>{})

