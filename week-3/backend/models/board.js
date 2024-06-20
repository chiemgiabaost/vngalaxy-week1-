const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const boardSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  ownerId: { type: Schema.Types.ObjectId, ref: 'User' },
  members: [
    {
      userId: { type: Schema.Types.ObjectId, ref: 'User' },
      role: { type: String, default: 'member'}
    }
  ],
  listIds: [
    { type: Schema.Types.ObjectId, ref: 'List' }
  ],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const Board = mongoose.model('Board', boardSchema);
module.exports = Board;
