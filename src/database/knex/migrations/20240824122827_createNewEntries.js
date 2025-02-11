
exports.up = knex => knex.schema.createTable("new_entries", table => {
  table.increments("id")
  table.text("client_name")
  table.text("description")
  table.integer("total_value")
  table.integer("client_id").references("id").inTable("clients")

  table.timestamp("created_at").default(knex.fn.now())
  table.timestamp("updated_at").default(knex.fn.now())
})

exports.down = knex => knex.schema.dropTable("new_entries")
