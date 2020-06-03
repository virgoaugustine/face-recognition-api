const Clarifai = require('clarifai');

const app = new Clarifai.App({
    apiKey: '45df30049c0142f2b21d0ff0c5bf1139',
  });

const handleEntryCount = (req, res, db) =>{
    const { id } = req.body;
    // let found = false

    db('users').where({id: id})
    .increment('entries',1)
    .returning('entries')
    .then(entries =>{
        entries.length ? res.json(entries) : res.json('Could not fetch entries from user')
    })
    .catch(err => res.json('Error accessing database'))
}

const handleApiCall = (req, res) => {
    app.models
    .predict(Clarifai.FACE_DETECT_MODEL, req.body.url)
    .then(data => res.json(data))
    .catch(err => res.json('Cannot fetch data from API'))

}

module.exports = {
    handleEntryCount,
    handleApiCall,
};