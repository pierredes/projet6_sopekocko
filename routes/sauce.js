const express = require('express');

const router = express.Router();

const authentification = require('../middleware/auth.js');
const controlleurSauce = require('../controleur/sauce.js');


router.post('/', authentification, controlleurSauce.creerSauce);
router.put('/:id', authentification, controlleurSauce.modifierSauce);
router.delete('/:id', authentification, controlleurSauce.supprimerUneSauce);
router.get('/:id', authentification, controlleurSauce.trouverUneSauce);
router.get('/', authentification, controlleurSauce.trouverTouteLesSauces);

module.exports = router;