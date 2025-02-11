const AppError = require("../utils/AppError")
const knex = require("../database/knex")

class ClientsController {
  async create(request, response) {
    const { name, email, contact } = request.body
    const user_id = request.user.id

    const userIdExists = await knex("users").where('id', user_id).first()

    if(!userIdExists) {
      throw new AppError("Usuário não encontrado")
    }

    const clientNameExists = await knex("clients").where('user_id', user_id).where('name', name).first()

    if(clientNameExists) {
      console.log(clientNameExists)
      throw new AppError("Já existe um cliente cadastrado com este nome")
    }

    const [clientWithUpdateEmail] = await knex("clients").where('user_id', user_id).where('email', email)

    if(clientWithUpdateEmail){
      throw new AppError("Este email já esta sendo utilizado")
    }

    await knex("clients").insert({
      name: name, 
      email: email,
      contact: contact, 
      user_id: user_id
    })

    return response.json()
  }

  async update(request, response) {
    const { name, email, contact } = request.body

    const [checkClientName] = await knex("clients").where("name", name)
    const [checkClientEmail] = await knex("clients").where('email', email)

    const checkClientExists = checkClientName && checkClientEmail

    if(!checkClientExists) {
      throw new AppError("Cliente não encontrado")
    }

    if(clientWithUpdateEmail){
      throw new AppError("Este email já esta sendo utilizado")
    }

  }

  async index(request, response) {
    const { name } = request.query  

    const user_id = request.user.id

    console.log('nome?:', name)

    const clients = await knex('clients').where({user_id: user_id}).andWhere('name', 'like', `%${name}%`)

    console.log(user_id, name , clients)

    return response.json(clients)
  }
}

module.exports = ClientsController