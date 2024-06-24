const router = require('express').Router();

const boardController = require('../controllers/boardController');

router.get('/', boardController.getAllBoards); // get all boards

router.get('/:id', boardController.getBoardById); // get board by id

router.post('/', boardController.createBoard); // create a new board

router.post('/:id/members', boardController.addMember); // add a member to a board

router.put('/:id', boardController.updateBoard); // update board by id

router.delete('/:id', boardController.deleteBoard); // delete board by id

router.get('/:id/members', boardController.getAllMembers); // get all members of a board

// router.post('/:id/members', boardController.addMember);

router.delete('/:id/members/:memberId', boardController.deleteMember); // delete a member from a board
module.exports = router;    