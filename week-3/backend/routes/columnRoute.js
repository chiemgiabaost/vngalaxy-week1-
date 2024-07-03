const router = require('express').Router();

const ColumnController = require('../controllers/columnController');

router.get('/', ColumnController.getAllColumns); // get all Columns

router.get('/:id', ColumnController.getColumnById); // get Column by id

router.post('/', ColumnController.createColumn); // create a new Column

router.put('/:id', ColumnController.updateColumn); // update Column by id

router.get('/:id/cardIds', ColumnController.getAllCardIds); // get all card ids of a Column

router.post('/:id/cards', ColumnController.addCard); // add a card to a Column

router.delete('/:id', ColumnController.deleteColumn); // delete Column by id

router.delete('/:id/cards/:cardId', ColumnController.deleteCard); // delete a card from a Column

module.exports = router;