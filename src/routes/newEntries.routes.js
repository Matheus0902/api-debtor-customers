const { Router } = require("express")

const NewEntriesController= require("../controllers/NewEntriesController")
const ensureAuthenticated = require("../middlewares/ensureAuthenticated")

const newEntriesRoutes = Router()

const newEntriesController = new NewEntriesController()

newEntriesRoutes.use(ensureAuthenticated)

newEntriesRoutes.get("/", newEntriesController.index)
newEntriesRoutes.post("/", newEntriesController.create)
newEntriesRoutes.get("/", newEntriesController.show)
newEntriesRoutes.delete("/", newEntriesController.delete)

module.exports = newEntriesRoutes