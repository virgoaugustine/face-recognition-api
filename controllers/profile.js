const handleProfile = (req, res) => {
    const { id } = req.params;
    
    db.select('*').from('users').where({id})
    .then(user => {
        user.length ? res.json(user[0]) : res.status(400).json('Error fetching user')
    })
    
}

module.exports = {handleProfile: handleProfile}