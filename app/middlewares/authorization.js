function soloAdmin(req, res, next) {
    console.log("soloAdmin ", req.headers.cookie)
    next()
}

function soloPublico(req, res, next) {
    console.log("soloPublico", req.headers.cookie)
    next()
}

module.exports = {
    soloAdmin,
    soloPublico
}

// exports.add = soloAdmin
// exports.add = soloPublico