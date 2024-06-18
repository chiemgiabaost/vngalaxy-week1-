const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const listSchema = new Schema({
    boardId: { type: Schema.Types.ObjectId, ref: 'Board', required: true },
    name: { type: String, required: true },
    position: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  });
  
  const List = mongoose.model('List', listSchema);
  module.exports = List;
  