const User = require('../models/user');
const Board = require('../models/board');
const { get } = require('mongoose');
const Column = require('../models/column');
const Card = require('../models/card');
const boardController = {
    getAllBoards: async (req, res) => {
        try {
            const boards = await Board.find();
            return res.status(200).json(boards);
        } catch (err) {
            return res.status(500).json(err);
        }
    },

    getBoardById : async (req, res) => {
        try {
            const boardId = req.params.id;
    
            const board = await Board.findById(boardId)
            .populate({
                path: 'columnIds',
                populate: {
                    path: 'cardIds',
                    model: 'Card'
                }
            })
            .exec();
    
            if (!board) {
                return res.status(404).json({ message: 'Board not found' });
            }
    
            // Ensure cards are nested within their respective columns
            
            console.log(board.columnIds)
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
    },
    moveCardToDifferentColumn : async (reqBody) => {
        try {
          // B1: Cập nhật mảng cardOrderIds của Column ban đầu chứa nó (Hiểu bản chất là xóa cái _id của Card ra khỏi mảng)
          await columnModel.update(reqBody.prevColumnId, {
            cardOrderIds: reqBody.prevCardOrderIds,
            updatedAt: Date.now()
          })
          // B2: Cập nhật mảng cardOrderIds của Column tiếp theo (Hiểu bản chất là thêm _id của Card vào mảng)
          await columnModel.update(reqBody.nextColumnId, {
            cardOrderIds: reqBody.nextCardOrderIds,
            updatedAt: Date.now()
          })
          // B3: Cập nhật lại trường columnId mới của cái Card đã kéo
          await cardModel.update(reqBody.currentCardId, {
            columnId: reqBody.nextColumnId
          })
      
          return { updateResult: 'Successfully!' }
        } catch (error) { throw error }
      }
    }

module.exports = boardController;


// const { slugify } = require('../utils/formatters')
// const ApiError = require('../utils/ApiError')
// const { cloneDeep } = require('lodash')
// const Board = require('../models/boardModel')
// const Column = require('../models/columnModel')
// const Card = require('../models/cardModel')


// const createNew = async (req, res, next) => {
//   try {
//     const newBoardData = {
//       ...req.body,
//       slug: slugify(req.body.title)
//     }

//     const createdBoard = await Board.create(newBoardData)
//     const getNewBoard = await Board.findById(createdBoard._id)

//     res.status(201).json(getNewBoard)
//   } catch (error) {
//     next(error)
//   }
// }

// const getDetails = async (req, res, next) => {
//   try {
//     const boardId = req.params.id
//     const board = await Board.findById(boardId).populate('columns').populate('cards')
    
//     if (!board) {
//       throw new ApiError(StatusCodes.NOT_FOUND, 'Board not found!')
//     }

//     const resBoard = cloneDeep(board)
//     resBoard.columns.forEach(column => {
//       column.cards = resBoard.cards.filter(card => card.columnId.equals(column._id))
//     })
//     delete resBoard.cards

//     res.status(200).json(resBoard)
//   } catch (error) {
//     next(error)
//   }
// }

// const update = async (req, res, next) => {
//   try {
//     const boardId = req.params.id
//     const updateData = {
//       ...req.body,
//       updatedAt: Date.now()
//     }
//     const updatedBoard = await Board.findByIdAndUpdate(boardId, updateData, { new: true })

//     res.status(200).json(updatedBoard)
//   } catch (error) {
//     next(error)
//   }
// }



// module.exports = boardController

