module.exports = app => {
    app.post('/signup', app.api.user.save)
    app.post('/signin', app.api.auth.signin)

    app.route('/hosts')
        .all(app.config.passport.authenticate())
        .get(app.api.host.getHosts)
        .post(app.api.host.saveHosts)

    app.route('/hosts/:id')
        .all(app.config.passport.authenticate())
        .delete(app.api.host.removeHosts)

}