exports.up = knex => knex.schema.createTable("clients", table => {
    table.increments("id")
    table.text("name").collate("NOCASE")
    table.text("email")
    table.integer("contact")
    table.text("avatar")
    table.integer("user_id").references("id").inTable("users")
  
    table.timestamp("created_at").default(knex.fn.now())
    table.timestamp("updated_at").default(knex.fn.now())
  })
  
  exports.down = knex => knex.schema.dropTable("clients")