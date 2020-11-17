const bcrypt = require('bcrypt');

const User = require('../models/user.js');

exports.creationCompte = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
    .then(hash => {
        const user = new User({
            email: req.body.email,
            password: hash
        });
        user.save()
        .then(() => res.status(201).json({ message : 'utilisateur crée !'}))
        .catch(error => res.status(400).json({ error: 'test' }));
    })
    .catch(error => res.status(500).json({ error: 'test1' }));
};

exports.authentification = (req, res, next) => {
    User.findOne({ email: req.body.email})
    .then(user => {
        if(!user){
            return res.status(401).json({ error: 'utilisateur non trouvé !'});
        }
        bcrypt.compare(req.body.password, user.password)
        .then(valide => {
            if(!valide) {
                return res.status(401).json({ error: 'Mot de passe incorrect !'});
            }
            res.statut(200).json({
                userId: user._id,
                token: 'TOKEN'
            });
        })
        .catch(error => res.status(500).json({ error: 'test2' }));
    })
    .catch(error => res.status(500).json({ error: 'test3' }));
};