const router = require('express').Router();

const listController = require('../controllers/listController');

router.get('/', listController.getAllLists); // get all lists

router.get('/:id', listController.getListById); // get list by id

router.post('/', listController.createList); // create a new list

router.put('/:id', listController.updateList); // update list by id

router.get('/:id/cardIds', listController.getAllCardIds); // get all card ids of a list

router.post('/:id/cards', listController.addCard); // add a card to a list

router.delete('/:id', listController.deleteList); // delete list by id

router.delete('/:id/cards/:cardId', listController.deleteCard); // delete a card from a list

module.exports = router;