const fs = require('mz/fs')
const db = require('database')

const dump = () => {
  return fs.writeFile('src/database/dump.json', JSON.stringify(db))
    .catch(e => {
      console.log(e)
    })
}

const load = () => {
  return fs.readFile('src/database/dump.json')
    .then(data => {
    Object.assign(db, JSON.parse(data))
  })
  .catch(e => {
    console.log(e)
  })
}

module.exports = { dump, load }
