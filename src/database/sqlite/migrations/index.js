const sqliteConnection = require("../../sqlite")
const createClients = require("./createClients")

async function migrationsRun(){
  /*const schemas = []
    createClients
  ].join('')*/

  sqliteConnection()
  //.then(db => db.exec(schemas))
  //.catch( error => console.error(error))
}

module.exports = migrationsRun