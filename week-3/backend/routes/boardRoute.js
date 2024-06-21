const router = require('express').Router();

const boardController = require('../controllers/boardController');

router.get('/', boardController.getAllBoards);

router.get('/:id', boardController.getBoardById);

router.post('/', boardController.createBoard);

router.put('/:id', boardController.updateBoard);

router.delete('/:id', boardController.deleteBoard);

router.get('/:id/members', boardController.getAllMembers);

// router.post('/:id/members', boardController.addMember);

router.delete('/:id/members/:memberId', boardController.deleteMember);
module.exports = router;    