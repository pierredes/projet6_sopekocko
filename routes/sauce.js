const express = require('express');

const router = express.Router();

const authentification = require('../middleware/auth.js');
const multer = require('../middleware/multer-config.js');
const controlleurSauce = require('../controleur/sauce.js');


router.post('/', authentification, multer, controlleurSauce.creerSauce);
router.post('/:id/like', authentification, controlleurSauce.likeSauce);
router.put('/:id', authentification, multer, controlleurSauce.modifierSauce);
router.delete('/:id', authentification, controlleurSauce.supprimerUneSauce);
router.get('/:id', authentification, controlleurSauce.trouverUneSauce);
router.get('/', authentification, controlleurSauce.trouverTouteLesSauces);

module.exports = router;