const AppError = require("../utils/AppError")
const knex = require("../database/knex")

class NewEntriesController {
  async create(request, response){
    const { client_name, description, total_value } = request.body

    const client = await knex("clients").where('name', client_name).first()

    if(!client) {
      throw new AppError(`Cliente não encontrado`)
    }

    const client_id = client.id 

    console.log(client_name, description, total_value)

    await knex("new_entries").insert({
      client_name: client_name, 
      description: description, 
      total_value: total_value, 
      client_id
    })

    return response.json()
  }

  async show(request, response) {
    const { client_id } = request.query

    const client = await knex("new_entries").where('client_id', client_id)

    return response.json({client})
  }

  async delete(request, response) {

    const { client_id } = request.query

    const [tableRowsCount] = await knex("new_entries").where("client_id", client_id).count('* as count')
    const [lastRow] = await knex("new_entries").where("client_id", client_id).select("id").orderBy('id', 'desc').limit(1)

    if(tableRowsCount.count == 0){
      throw new AppError("Não exite nenhuma entrada para ser deletada")
    }

    await knex("new_entries").where('id', lastRow.id).del()

    return response.json()
  }

  async index(request, response) {
    const { client_id } = request.query

    const entries = await knex("new_entries").select("description", "total_value", "created_at")
    .where({ client_id })
    .orderBy("id")

    return response.json(entries)
    
  }
}

module.exports = NewEntriesController