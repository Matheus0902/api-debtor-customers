const sqlite3 = require("sqlite3")
const sqlite = require("sqlite")
const path = require("path")

/*async function sqliteConnection() {
  const database = await sqlite.open({
    filename: path.resolve(__dirname, "..", "database.db"),
    driver: sqlite3.Database
  })

  return database
}*/

async function sqliteConnection() {
  // Usa a variável de ambiente DATABASE_PATH, com fallback para caminho local
  const databasePath = process.env.DATABASE_PATH || path.resolve(__dirname, "..", "database.db");

  // Abre a conexão com o banco de dados SQLite
  const database = await sqlite.open({
    filename: databasePath, // Agora usa o caminho configurado pela variável de ambiente
    driver: sqlite3.Database
  })

  return database
}

module.exports = sqliteConnection