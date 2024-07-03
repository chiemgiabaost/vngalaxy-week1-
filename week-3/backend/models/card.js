const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cardSchema = new Schema({
    columnId: { type: Schema.Types.ObjectId, ref: 'Column', required: true },
    boardId: { type: Schema.Types.ObjectId, ref: 'Board' },
    name: { type: String, required: true },
    description: { type: String },
    
    labels: [String],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    _destroy: { type: Boolean, default: false }
  });
  
  const Card = mongoose.model('Card', cardSchema);
  module.exports = Card;
  