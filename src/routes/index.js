const { Router } = require("express")

const usersRoutes = require("./users.routes")
const clientsRoutes = require("./clients.routes")
const newEntriesRoutes = require("./newEntries.routes")
const sessionsRoutes = require("./sessions.routes")

const routes = Router()

routes.use("/users", usersRoutes)
routes.use("/clients", clientsRoutes)
routes.use("/new-entries", newEntriesRoutes)
routes.use("/sessions", sessionsRoutes)

module.exports = routes