const User = require('../models/user');
const Board = require('../models/board');
const { get } = require('mongoose');
const Column = require('../models/column');
const Card = require('../models/card');

const columnController = {
    getAllColumns: async (req, res) => {
        try {
            const columns = await Column.find();
            return res.status(200).json(columns);
        } catch (err) {
            return res.status(500).json(err);
        }
    },
    getColumnById: async (req, res) => {
        try {
            const columnId = req.params.id;
            const column = await Column.findById(columnId);
            if (!column) {
                return res.status(404).json({ message: 'Column not found' });
            }
            return res.status(200).json(column);
        } catch (err) {
            return res.status(500).json(err.message);
        }
    },
    createColumn: async (req, res) => {
        try {
            const column = new Column(req.body);
            await column.save();

            // Update the board to include the new column
            await Board.findByIdAndUpdate(column.boardId, { $push: { columnIds: column._id } });

            res.status(201).json({ success: true, data: { column } });
        } catch (err) {
            res.status(400).json({ success: false, error: err.message });
        }
    },
    updateColumn: async (req, res) => {
        try {
            const columnId = req.params.id;
            const column = await Column.findByIdAndUpdate(columnId, req.body, { new: true });
            if (!column) {
                return res.status(404).json({ success: false, message: 'Column not found' });
            }
            res.status(200).json({ success: true, data: { column } });
        } catch (err) {
            return res.status(500).json(err);
        }
    },
    getAllCardIds: async (req, res) => {
        try {
            const column = await Column.findById(req.params.id);
            if (!column) return res.status(404).json({ success: false, message: 'Column not found' });
            res.json({ success: true, data: { cardIds: column.cardIds } });
        } catch (err) {
            res.status(400).json({ success: false, error: err.message });
        }
    },
    addCard: async (req, res) => {
        try {
            const column = await Column.findById(req.params.id);
            if (!column) return res.status(404).json({ success: false, message: 'Column not found' });
            column.cardIds.push(req.body.cardId);
            await column.save();
            res.json({ success: true, data: { column } });
        } catch (err) {
            res.status(400).json({ success: false, error: err.message });
        }
    },
    deleteCard: async (req, res) => {
        try {
            const column = await Column.findById(req.params.id);
            if (!column) return res.status(404).json({ success: false, message: 'Column not found' });
            column.cardIds = column.cardIds.filter(cardId => cardId !== req.body.cardId);
            await column.save();
            res.json({ success: true, data: { column } });
        } catch (err) {
            res.status(400).json({ success: false, error: err.message });
        }
    },
    deleteColumn: async (req, res) => {
        try {
            const column = await Column.findByIdAndDelete(req.params.id);
            if (!column) return res.status(404).json({ success: false, message: 'Column not found' });
            res.json({ success: true, data: null });
        } catch (err) {
            res.status(400).json({ success: false, error: err.message });
        }
    },
    getBoard: async (req, res) => {
        try {
            const board = await Board.findById(req.params.id);
            if (!board) return res.status(404).json({ success: false, message: 'Board not found' });
            res.json({ success: true, data: { board } });
        } catch (err) {
            res.status(400).json({ success: false, error: err.message });
        }
    },
};

module.exports = columnController;
