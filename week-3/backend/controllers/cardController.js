const User = require('../models/user');
const Board = require('../models/board');
const Card = require('../models/card'); // Assuming the model is named 'Card'
const Column = require('../models/column');

const cardController = {
    getAllCards: async (req, res) => {
        try {
            const cards = await Card.find();
            return res.status(200).json(cards);
        } catch (err) {
            return res.status(500).json(err);
        }
    },
    getCardById: async (req, res) => {
        try {
            const cardId = req.params.id;
            const card = await Card.findById(cardId);
            if (!card) {
                return res.status(404).json({ message: 'Card not found' });
            }
            return res.status(200).json(card);
        } catch (err) {
            return res.status(500).json(err.message);
        }
    },
     createCard : async (req, res) => {
        try {
            const card = new Card(req.body);
            await card.save();
    
            // Update the column to include the new card
            await Column.findByIdAndUpdate(card.columnId, { $push: { cardIds: card._id } });
    
            res.status(201).json({ success: true, data: { card } });
        } catch (err) {
            res.status(400).json({ success: false, error: err.message });
        }
    },
    updateCard: async (req, res) => {
        try {
            const cardId = req.params.id;
            const card = await Card.findByIdAndUpdate(cardId, req.body, { new: true });
            if (!card) {
                return res.status(404).json({ message: 'Card not found' });
            }
            res.status(200).json({ success: true, data: { card } });
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
    addCardToColumn: async (req, res) => {
        try {
            const column = await Column.findById(req.params.id);
            if (!column) return res.status(404).json({ success: false, message: 'column not found' });
            column.cardIds.push(req.body.cardId);
            await column.save();
            res.json({ success: true, data: { column } });
        } catch (err) {
            res.status(400).json({ success: false, error: err.message });
        }
    }
};

module.exports = cardController;
