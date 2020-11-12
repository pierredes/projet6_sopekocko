const express = require('express');

const router = express.Router();

const controlleurSauce = require('../controleur/sauce.js');


router.post('/', controlleurSauce.creerSauce);
router.put('/:id', controlleurSauce.modifierSauce);
router.delete('/:id', controlleurSauce.supprimerUneSauce);
router.get('/:id', controlleurSauce.trouverUneSauce);
router.get('/', controlleurSauce.trouverTouteLesSauces);

module.exports = router;