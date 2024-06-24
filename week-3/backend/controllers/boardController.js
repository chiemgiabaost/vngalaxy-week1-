const User = require('../models/user');
const Board = require('../models/board');
const { get } = require('mongoose');

const boardController = {
    getAllBoards: async (req, res) => {
        try {
            const boards = await Board.find();
            return res.status(200).json(boards);
        } catch (err) {
            return res.status(500).json(err);
        }
    },

    getBoardById: async (req, res) => {
        try {
            const boardId = req.params.id;
            const board = await Board.findById(boardId);
            if (!board) {
                return res.status(404).json({ message: 'Board not found' });
            }
            return res.status(200).json(board);
        } catch (err) {
            return res.status(500).json(err.message);
        }
    },

    createBoard: async (req, res) => {
        try {
            const board = new Board(req.body);
            await board.save();
            res.status(201).json({ success: true, data: { board } });
          } catch (err) {
            res.status(400).json({ success: false, error: err.message });
          }
    },

    updateBoard: async (req, res) => {
        try {
            const boardId = req.params.id;
            const board = await Board.findByIdAndUpdate(boardId, req.body, { new: true });
            res.status(201).json({ success: true, data: { board } });

        } catch (err) {
            return res.status(500).json(err);
        }
    },

    getAllMembers: async (req, res) => {
        try {
            const board = await Board.findById(req.params.id);
            if (!board) return res.status(404).json({ success: false, message: 'Board not found' });
            res.json({ success: true, data: { members: board.members } });
          } catch (err) {
            res.status(400).json({ success: false, error: err.message });
    }
},

    addMember: async (req, res) => {
        try {
            const board = await Board.findById(req.params.id);
            if (!board) return res.status(404).json({ success: false, message: 'Board not found' });
            board.members.push(req.body);
            await board.save();
            res.json({ success: true, data: { board } });
          } catch (err) {
            res.status(400).json({ success: false, error: err.message });
          }
    },

    deleteMember: async (req, res) => {
        try {
            const board = await Board.findById(req.params.id);
            if (!board) return res.status(404).json({ success: false, message: 'Board not found' });
            board.members = board.members.filter(member => member.userId.toString() !== req.params.memberId);
            await board.save();
            res.json({ success: true, message: 'Member removed successfully' });
          } catch (err) {
            res.status(500).json({ success: false, error: err.message });
          }
    },

    deleteBoard: async (req, res) => {
        try {
            const boardId = req.params.id;
            const deletedBoard = await Board.findByIdAndDelete(boardId);
            if (!deletedBoard) {
                return res.status(404).json({ message: 'Board not found' });
            }
            return res.status(200).json({ message: 'Board deleted successfully' });
        } catch (err) {
            return res.status(500).json(err);
        }
    },
    getPosition: async (req, res) => {
        try {
            const board = await Board.findById(req.params.id);
            if (!board) {
                return res.status(404).json({ message: 'Board not found' });
            }
            return res.status(200).json({ position: board.position });
        } catch (err) {
            return res.status(500).json(err);
        }
    }
}

module.exports = boardController;