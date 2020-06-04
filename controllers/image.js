const Clarifai = require('clarifai');

const app = new Clarifai.App({
    apiKey: proccess.env.API_KEY,
  });

const handleEntryCount = (req, res, db) =>{
    const { id } = req.body;

    db('users').where({id: id})
    .increment('entries',1)
    .returning('entries')
    .then(entries =>{
        entries.length ? res.json(entries[0]) : res.json('Could not fetch entries from user')
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