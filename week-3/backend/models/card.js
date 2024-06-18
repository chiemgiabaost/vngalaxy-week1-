const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cardSchema = new Schema({
    listId: { type: Schema.Types.ObjectId, ref: 'List', required: true },
    name: { type: String, required: true },
    description: { type: String },
    position: { type: Number, required: true },
    dueDate: { type: Date },
    members: [
      {
        userId: { type: Schema.Types.ObjectId, ref: 'User' }
      }
    ],
    labels: [String],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  });
  
  const Card = mongoose.model('Card', cardSchema);
  module.exports = Card;
  