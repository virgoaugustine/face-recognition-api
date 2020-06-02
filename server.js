const express = require('express')
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt-nodejs')
const app = express();
const cors = require('cors')

const register = require('./controllers/register')
const login = require('./controllers/login')
const image = require('./controllers/image')
const profile = require('./controllers/profile')


const db = require('knex')({
    client: 'pg',
    connection: {
        connectionString: process.env.DATABASE_URL,
        ssl: true
       
    }
});

app.use(cors())
app.use(bodyParser.json())


app.get('/', (req, res) => res.send('API is working...'))
app.post('/register', (req, res) => register.handleRegister(req, res, db, bcrypt));
app.post('/login', (req, res) => login.handleLogin(req,res,db,bcrypt));
app.put('/entry', (req, res) => image.handleEntryCount(req, res, db))
app.post('/imageurl', (req, res) => image.handleApiCall(req, res));
app.get('/profile/:id', (req, res) => profile.handleProfile(req, res, db))


app.listen(process.env.PORT || 3000, () => {
    console.log(`The server is running on port ${process.env.PORT}`)
})