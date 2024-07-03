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
  columnIds: [ // list order id
    { type: Schema.Types.ObjectId, ref: 'Column' }
  ],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  _destroy: { type: Boolean, default: false }
});

const Board = mongoose.model('Board', boardSchema);
module.exports = Board;
