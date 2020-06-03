const handleLogin = (req, res, db, bcrypt) => {
    const {email, password } = req.body;

    if(!email || !password) {return res.status(400).json('One or more fields is empty')}

    db.select('email', 'hash').from('login').where('email', '=', email)
    .then(data => {
        const correctPassword = bcrypt.compareSync(password, data[0].hash)

        if(correctPassword){
            return db.select('*').from('users')
            .where('email','=',email)
            .then( user => res.json({status:'Login Successful', payload:user[0]}))
            .catch(err => res.status(400).json('Unable to get user'))
        } else {
            res.status(400).json('Wrong Credentials')
        }
    })
    .catch(err => res.status(400).json('User not on system'))
}

module.exports = {
    handleLogin, 
}