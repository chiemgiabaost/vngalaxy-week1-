const router = require('express').Router();

const cardController = require('../controllers/cardController');

router.get('/', cardController.getAllCards); // get all cards

router.get('/:id', cardController.getCardById); // get card by id

router.post('/', cardController.createCard); // create a new card

router.put('/:id', cardController.updateCard); // update card by id

// router.delete('/:id', cardController.deleteCard); // delete card by id


module.exports = router;