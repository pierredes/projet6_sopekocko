const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Sauce = require('./models/sauce.js');
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

app.post('/api/sauces', (req, res, next) => {
    const sauce = new Sauce({
        ...req.body
    });
    sauce.save()
    .then(() => {
        res.status(201).json({ message: 'Sauce crée'});
    })
    .catch(error => res.status(400).json({error}));
    next();
});

app.put('/api/sauces/:id', (req, res, next) => {
    Sauce.updateOne({ _id: req.params.id}, { ...req.body, _id: req.params.id})
    .then(() => res.status(200).json({message: 'Sauce modifié !'}))
    .catch(error => res.status(400).json({error}));
    next();
});

app.delete('/api/sauces/:id', (req, res, next) => {
    Sauce.deleteOne({ _id: req.params.id})
    .then(() => res.status(200).json({message: 'Sauce supprimé !'}))
    .catch(error => res.status(400).json({error}));
    next();
});

app.get('/api/sauces/:id', (req, res, next) => {
    Sauce.findOne({ _id : req.params.id})
    .then(sauce => res.status(200).json(sauce))
    .catch(error => res.status(404).json({error}));
    next();
});

app.get('/api/sauces', (req, res, next) => {
    Sauce.find()
    .then(sauce => res.status(200).json(sauce))
    .catch(error => res.status(404).json({error}));
    next();
});

module.exports = app;