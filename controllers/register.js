
const handleRegister = (req, res, db, bcrypt) =>{
    const {name, email, password} = req.body

    if(!name|| !email || !password ){
        return res.status(400).json('One or more of these fields is empty.')
    }

    const hashpw = bcrypt.hashSync(password)
    db.transaction(trx => {
        trx.insert({
            email: email,
            hash: hashpw
        })
        .into('login')
        .returning('email')
        .then(loginEmail => {
            trx('users')
            .returning('*')
            .insert({
                name: name,
                email: loginEmail[0],
                joined: new Date()
            })
            .then( user => res.json(user[0]))
        })
        .then(trx.commit)
        .catch(trx.rollback)
    })
    .catch(err => res.status(400).json('Could not register user.'))
    
    const newUser = {
        name: name,
        email: email,
        joined: new Date(),
    }

    db('users')
    .returning('*')
    .insert(newUser)
    .then( user => res.json(user[0]))
    .catch(err => res.status(400).json(err.detail))
}

module.exports = {
    handleRegister
}