const express = require('express')
const path = require('path')

// servidor
const app = express()
app.set('port', 4000)
app.listen(app.get('port'))
console.log("http://localhost:" + app.get('port'))

// configuracion
// para css y otros archivos estaticos
app.use(express.static(__dirname + '/public'))

// rutas
app.get("/", (req, res) => res.sendFile(path.join(__dirname, `/pages/login.html`)))
app.get("/register", (req, res) => res.sendFile(path.join(__dirname, `/pages/register.html`)))