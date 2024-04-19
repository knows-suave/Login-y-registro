const express = require('express')
const path = require('path')

// import { methods as authentication } from "./controllers/authentication.controller.js"
const authentication = require('./controllers/authentication.controller.js')

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

// rutas
app.get("/", (req, res) => res.sendFile(path.join(__dirname, `/pages/login.html`)))
app.get("/register", (req, res) => res.sendFile(path.join(__dirname, `/pages/register.html`)))
app.get("/admin", (req, res) => res.sendFile(path.join(__dirname, `/pages/admin.html`)))

app.post("/api/login", authentication.login)
app.post("/api/register", authentication.register)