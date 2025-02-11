import { Router } from "./router.js"

const router = new Router()

router.add("/", "/pages/home.html")
router.add("/client-account", "/pages/client-account.html")
router.add("/clients-list", "/pages/clients-list.html")
router.add("/new-client", "/pages/new-client.html")
router.add("/new-entry", "/pages/new-entry.html")
router.add(404, "/pages/404.html")

router.handle()

window.onpopstate = () => router.handle()
window.route = () => router.route()