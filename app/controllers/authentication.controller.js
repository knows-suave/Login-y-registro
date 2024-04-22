const bcryptjs = require('bcryptjs')
const jsonwebtoken = require('jsonwebtoken')

// process.env.
// const dotenv = require('dotenv')
// dotenv.config()
require(`dotenv`).config()

const usuarios = [{
    user: "a",
    email: "a@a.com",
    password: "$2a$05$VTHr7uBOMiINmAfEmsWuS.e56rRdFIb8rEQ4eySSvIAc7oNaGwKia"
}]

async function login(req, res) {
    console.log(req.body)
    const user = req.body.user
    const password = req.body.password
    //email
    if (!user || !password) {
        return res.status(400).send({ status: "Error", message: "Datos incompletos" })
    }
    const usuarioARevisar = usuarios.find(usuario => usuario.user === user)
    if (!usuarioARevisar) {
        return res.status(400).send({ status: "Error", message: "Error durante login" })
    }
    const loginCorrecto = await bcryptjs.compare(password, usuarioARevisar.password)
    // console.log(loginCorrecto) //booleano

    if (!loginCorrecto) {
        return res.status(400).send({ status: "Error", message: "Error durante login" })
    }

    const token = jsonwebtoken.sign(
        { user: usuarioARevisar.user },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRATION }
    )

    const cookieOption = {
        expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000),
        path: "/"
    }
    res.cookie("jwt", token, cookieOption)
    // res.status(200)
    res.send({ status: "ok", message: "Usuario loggeado", redirect: "./admin" })
}

async function register(req, res) {
    console.log(req.body)
    const user = req.body.user
    const password = req.body.password
    const email = req.body.email
    if (!user || !password || !email) {
        return res.status(400).send({ status: "Error", message: "Datos incompletos" })
    }

    const usuarioARevisar = usuarios.find(usuario => usuario.user === user)
    if (usuarioARevisar) {
        return res.status(400).send({ status: "Error", message: "Este usuario ya existe" })
    }

    const salt = await bcryptjs.genSalt(5)
    const hashPassword = await bcryptjs.hash(password, salt)
    const nuevoUsuario = {
        user, email, password: hashPassword
    }
    // console.log(nuevoUsuario)
    usuarios.push(nuevoUsuario)
    console.log(usuarios)
    return res.status(201).send({ status: "ok", message: `Usuario ${nuevoUsuario.user} agregado`, redirect: "/" }) //en esta wea afecto al archivo css
}

// export const methods = {
module.exports = {
    login,
    register
}