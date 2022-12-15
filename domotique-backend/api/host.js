
module.exports = app => {
    const getHosts = (req, res) => {
        app.db('hosts')
            .where({ userId: req.user.id })
            .orderBy('name')
            .then(hosts => res.json(hosts))
            .catch(err => res.status(400).json(err))
    }

    const saveHosts = (req, res) => {
        if (!req.body.name.trim()) {
            return res.status(400).send('O nome é um campo obrigatório!')
        }

        if (!req.body.ip) {
            return res.status(400).send('O número ip é um campo obrigatório!')
        }

        if(!req.body.ifON){
            return res.status(400).send('O sinal de infravermelho é obrigatório!')
        }

        if(!req.body.ifOFF){
            return res.status(400).send('O sinal de infravermelho é obrigatório!')
        }

        req.body.done = 'false'
        req.body.userId = req.user.id

        app.db('hosts')
            .insert(req.body)
            .then(_ => res.status(204).send())
            .catch(err => res.status(400).json(err))
    }

    const removeHosts = (req, res) => {
        app.db('hosts')
            .where({ id: req.params.id, userId: req.user.id })
            .del()
            .then(rowsDeleted => {
                if (rowsDeleted > 0) {
                    res.status(204).send()
                } else {
                    const msg = `Não foi encontrado esse host ${req.params.id}.`
                    res.status(400).send(msg)
                }
            })
            .catch(err => res.status(400).json(err))
    }

    return {getHosts, saveHosts, removeHosts}
}
