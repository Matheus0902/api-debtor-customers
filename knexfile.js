const path = require('path')

module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: path.resolve(__dirname, 'src', 'database', 'database.db')
    },

    migrations: {
      directory: path.resolve(__dirname, 'src', 'database', 'knex', 'migrations')  // Caminho das migrações
    },

    useNullAsDefault: true
  },

  /*production: {
    client: 'sqlite3',
    connection: {
      filename: process.env.DATABASE_PATH || '/mnt/data/database.db'  // Caminho específico no Render
    },

    pool: {
      afterCreate: (conn, cb) => conn.run("PRAGMA foreign_keys = ON", cb)
    },

    migrations: {
      directory: path.resolve(__dirname, 'src', 'database', 'knex', 'migrations')
    },

    useNullAsDefault: true
  }*/
}
