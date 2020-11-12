const Sauce = require('../models/sauce.js');

exports.creerSauce = (req, res, next) => {
    delete req.body._id; 
    const sauce = new Sauce({
        ...req.body
    });
    sauce.save()
    .then(() => res.status(201).json({ message: 'Sauce crée'}))
    .catch(error => res.status(400).json({error}));
    next();
};

exports.modifierSauce = (req, res, next) => {
    Sauce.updateOne({ _id: req.params.id}, { ...req.body, _id: req.params.id})
    .then(() => res.status(200).json({message: 'Sauce modifié !'}))
    .catch(error => res.status(400).json({error}));
    next();
};

exports.supprimerUneSauce = (req, res, next) => {
    Sauce.deleteOne({ _id: req.params.id})
    .then(() => res.status(200).json({message: 'Sauce supprimé !'}))
    .catch(error => res.status(400).json({error}));
    next();
};

exports.trouverUneSauce = (req, res, next) => {
    Sauce.findOne({ _id : req.params.id})
    .then(sauce => res.status(200).json(sauce))
    .catch(error => res.status(404).json({error}));
    next();
};

exports.trouverTouteLesSauces = (req, res, next) => {
    Sauce.find()
    .then(sauce => res.status(200).json(sauce))
    .catch(error => res.status(404).json({error}));
    next();
};

