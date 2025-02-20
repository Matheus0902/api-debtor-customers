const AppError = require("../utils/AppError")
const knex = require("../database/knex")
const { compare } = require('bcryptjs')

class NewEntriesController {
  async create(request, response){
    const { client_name, description, total_value } = request.body

    const client = await knex("clients").where('name', client_name).first()

    if(!client) {
      throw new AppError(`Cliente não encontrado, digite um nome válido`)
    }

    const client_id = client.id 

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

    const result = await knex("new_entries")
    .where("client_id", client_id)
    .select(knex.raw('count(*) as count, max(id) as last_id'))
    .first()

    if(result.count == 0){
      throw new AppError("Não exite nenhuma entrada para ser deletada")
    }

    await knex("new_entries").where('id', result.last_id).del()

    return response.json()
  }

  async index(request, response) {
    const { client_id, startDate, endDate } = request.query

    let entries

    if(startDate == '' || endDate == '') {

      entries = await knex("new_entries")
      .where("client_id", client_id)  
      .select("description", "total_value", "created_at")
      .orderBy("id");
      
      
    } else {
      
      entries = await knex("new_entries")
      .whereRaw("strftime('%Y-%m-%d', created_at) BETWEEN ? AND ?", [startDate, endDate]) 
      .andWhere("client_id", client_id)  
      .select("description", "total_value", "created_at")
      .orderBy("id")
      
    }

    
    return response.json(entries)
    
  }
}

module.exports = NewEntriesController