const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const User = require('../models/user.js');

require('dotenv').config();

exports.creationCompte = (req, res, next) => {
    var cipher = crypto.createCipher(process.env.algorithme, process.env.cleCryptage);
    var crypted = cipher.update(req.body.email,'utf8','hex');
    crypted += cipher.final('hex');
    bcrypt.hash(req.body.password, 10)
    .then(hash => {
        const user = new User({
            email: crypted,
            password: hash
        });
        user.save()
        .then(() => res.status(201).json({ message : 'utilisateur crée !'}))
        .catch(error => res.status(400).json({ error}));
    })
    .catch(error => res.status(500).json({ error }));
};

exports.authentification = (req, res, next) => {
    var cipher = crypto.createCipher(process.env.algorithme, process.env.cleCryptage);
    var crypted = cipher.update(req.body.email,'utf8','hex');
    crypted += cipher.final('hex');
    User.findOne({ email: crypted})
    .then(user => {
        if(!user){
            return res.status(401).json({ error: 'utilisateur non trouvé !'});
        }
        bcrypt.compare(req.body.password, user.password)
        .then(valide => {
            if(!valide) {
                return res.status(401).json({ error: 'Mot de passe incorrect !'});
            }
            else {
                res.status(200).json({
                    userId: user._id,
                    token: jwt.sign(
                        { userId: user._id },
                        'RANDOM_TOKEN_SECRET',
                        { expiresIn: '24h' }
                    )
                });
            }
        })
        .catch(error => res.status(500).json({ error: 'test2' }));
    })
    .catch(error => res.status(500).json({ error: 'test3' }));
};