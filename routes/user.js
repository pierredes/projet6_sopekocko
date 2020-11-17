const express = require('express');
const router = express.Router();

const userControlleur = require('../controleur/user.js');

router.post('/signup', userControlleur.creationCompte);
router.post('/login', userControlleur.authentification);

module.exports = router;