const { Router } = require("express")

const ClientsController = require("../controllers/ClientsController")
const ensureAuthenticated = require("../middlewares/ensureAuthenticated")

const clientsRoutes = Router()

const clientsController = new ClientsController()

clientsRoutes.post("/", ensureAuthenticated, clientsController.create)
clientsRoutes.put("/", ensureAuthenticated, clientsController.update)
clientsRoutes.get("/", ensureAuthenticated, clientsController.index)

module.exports = clientsRoutes