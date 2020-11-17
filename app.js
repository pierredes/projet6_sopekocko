const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const sauceRoute = require('./routes/sauce.js');
const userRoute = require('./routes/user.js');

mongoose.connect('mongodb+srv://nomUtilisateur:MotdePasse@Nomdelabase.hdytj.mongodb.net/Nomdelabase?retryWrites=true&w=majority',
{ useNewUrlParser: true,
  useUnifiedTopology: true })
.then(() => console.log('Connexion à MongoDB réussie !'))
.catch(() => console.log('Connexion à MongoDB échouée !'));

const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(bodyParser.json());

app.use('/api/sauces', sauceRoute);
app.use('/api/auth', userRoute);

module.exports = app;