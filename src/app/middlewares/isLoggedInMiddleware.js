module.exports = (req, res, next) => {
    if (req.session) next()
    else res.redirect('/login')
}