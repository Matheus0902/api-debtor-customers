const { Router } = require("express")

const UsersController = require("../controllers/UsersController")
const ensureAuthenticated = require("../middlewares/ensureAuthenticated")

const usersRoutes = Router()

const usersController = new UsersController()

usersRoutes.post("/", usersController.create)
usersRoutes.delete("/", ensureAuthenticated, usersController.checkPassword)
usersRoutes.put("/", ensureAuthenticated, usersController.update)

module.exports = usersRoutes