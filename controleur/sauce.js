const Sauce = require('../models/sauce.js');
const fs = require('fs');

exports.creerSauce = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce);
    delete sauceObject._id; 
    const sauce = new Sauce({
        ...sauceObject,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        likes: '0',
        dislikes: '0',
        usersLiked: [],
        usersDisliked: []
    });
    sauce.save()
    .then(() => res.status(201).json({ message: 'Sauce crée'}))
    .catch(error => res.status(400).json({error}));
};

exports.modifierSauce = (req, res, next) => {
  const sauceObject = req.file ?
    {
      ...JSON.parse(req.body.sauce),
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };
    Sauce.updateOne({ _id: req.params.id}, { ...sauceObject, _id: req.params.id})
      .then(() => res.status(200).json({message: 'Sauce modifié !'}))
      .catch(error => res.status(400).json({error}));
};

exports.supprimerUneSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
  .then(sauce => {
      const filename = sauce.imageUrl.split('/images/')[1];
      fs.unlink(`images/${filename}`, () =>{
          Sauce.deleteOne({ _id: req.params.id})
          .then(() => res.status(200).json({message: 'Sauce supprimé !'}))
          .catch(error => res.status(400).json({error}));
      })
  })
  .catch(error => res.status(500).json({error}));
};

exports.trouverUneSauce = (req, res, next) => {
    Sauce.findOne({ _id : req.params.id})
    .then(sauce => res.status(200).json(sauce))
    .catch(error => res.status(404).json({error}));
};

exports.trouverTouteLesSauces = (req, res, next) => {
    Sauce.find()
    .then(sauce => res.status(200).json(sauce))
    .catch(error => res.status(404).json({error}));
};

exports.likeSauce = (req, res, next) => {
    let uid = req.body.userId;
    let like = req.body.like;
    
    Sauce.findOne({ _id: req.params.id }).exec(function (error, sauce){
      let msg = "";
      let uiL = sauce.usersLiked.indexOf(uid);
      let uiD = sauce.usersDisliked.indexOf(uid);
      
      if(like == 0 && uiL >-1){
        sauce.likes--;
        sauce.usersLiked.splice(uiL,1);
        msg = "Unliked !";
      }
      else if(like == 0 && uiD >-1){
        sauce.dislikes--;
        sauce.usersDisliked.splice(uiD,1);
        msg = "Undisliked !";
      };
      if(like == 1){
        sauce.likes++;
        sauce.usersLiked.push(uid);
        msg = "Like pris en compte !";
      };
      if(like == -1){
        sauce.dislikes++;
        sauce.usersDisliked.push(uid);
        msg = "Disike pris en compte !";
      };
      sauce.save()
        .then(() => res.status(201).json({ message: msg}))
        .catch(error => res.status(400).json({ error }));
    });
  };
