const { hash, compare } = require('bcryptjs')
const AppError = require("../utils/AppError")
const knex = require("../database/knex")

class UsersController {
  async create(request, response) {
    const { name, email, password } = request.body

    const [clientWithUpdateEmail] = await knex("users").where('email', email)

    if(clientWithUpdateEmail){
      throw new AppError("Este email já esta sendo utilizado", 400)
    }

    // Gerando o hash da senha
    const hashedPassword = await hash(password, 8)

    await knex("users").insert({name, email, password: hashedPassword})

    return response.status(201).json({ message: "Usuário criado com sucesso!"})
  }

  async update(request, response) {
    const { name, email, password, old_password} = request.body
    const user_id = request.user.id

    const [user] = await knex("users").where("id", user_id)

    if(!user) {
      throw new AppError("Usuário não encontrado")
    }

    const [userWithUpdateEmail] = await knex("users").where('email', email)

    if(userWithUpdateEmail && userWithUpdateEmail.id !== user.id){
      throw new AppError("Este email já esta sendo utilizado")
    }

    user.name = name ?? user.name
    user.email = email ?? user.email

    if(password && !old_password) {
      throw new AppError("Você precisa informar sua antiga senha.", 400)
     }

     if(password && old_password) {
      const checkOldPassword = await compare(old_password, user.password)

      if(!checkOldPassword) {
        throw new AppError('A senha antiga não confere.')
      }

      user.password = await hash(password, 8)
      user.updated_at = knex.fn.now()
     }

     await knex("users").where("id", user_id).update(user)

     return response.status(200).json({ message: "Usuário atualizado com sucesso!"})

  }

  async checkPassword(request, response) {
   try {
    const user_id = request.user.id

    const { password } = request.body

    const [user] = await knex('users').where('id', user_id)

    if (!user) {
      return response.status(404).json({ message: 'Usuário não encontrado.' });
    }

    if(password) {
      const checkPassword = await compare(password, user.password)

      if(!checkPassword) {
        throw new AppError('A senha não confere')
      }

      return response.status(200).json({ message: 'Senha verificada com sucesso.' });
    }

   } catch(error) {
     console.log(error)
     return response.status(500).json({ message: 'Erro ao verificar senha.'})
   }
  }
}

module.exports = UsersController