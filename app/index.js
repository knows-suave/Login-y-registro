const express = require('express')
const path = require('path')

// para que express lea las cookie
const cookieParser = require('cookie-parser')

const authentication = require('./controllers/authentication.controller.js')
const authorization = require('./middlewares/authorization.js')

// servidor
const app = express()
app.set('port', 4000)
app.listen(app.get('port'))
console.log("http://localhost:" + app.get('port'))

// configuracion
// para css y otros archivos estaticos
app.use(express.static(__dirname + '/public'))
// para leer json
app.use(express.json())
// para leer cookies
app.use(cookieParser())

// // rutas
app.get("/", (req, res) => res.sendFile(path.join(__dirname, `/pages/login.html`)))
app.get("/register", (req, res) => res.sendFile(path.join(__dirname, `/pages/register.html`)))
app.get("/admin", (req, res) => res.sendFile(path.join(__dirname, `/pages/admin/admin.html`)))

// app.get("/", (req, res) => res.sendFile(path.join(__dirname, `/pages/login.html`)), () => authorization.soloPublico(req, res, next))
// app.get("/register", (req, res) => res.sendFile(path.join(__dirname, `/pages/register.html`)), () => authorization.soloPublico(req, res, next))
// app.get("/admin", (req, res) => res.sendFile(path.join(__dirname, `/pages/admin/admin.html`)), () => authorization.soloAdmin(req, res, next))

// app.use(authorization.soloPublico)
// app.use(authorization.soloAdmin)

const adminRouter = express.Router()
adminRouter.get("/", () => authorization.soloPublico)
// app.use("/admin", authorization.soloAdmin, adminRouter)
// adminRouter.get("/admin", (req, res) => res.sendFile(path.join(__dirname, `/pages/admin/admin.html`)))



app.post("/api/login", authentication.login)
app.post("/api/register", authentication.register)