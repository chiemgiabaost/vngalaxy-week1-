const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const columnSchema = new Schema({
  boardId: { type: Schema.Types.ObjectId, ref: 'Board', required: true },
  name: { type: String, required: true },
  position: { type: Number },
  cardIds: [
    { type: Schema.Types.ObjectId, ref: 'Card' } // trên mỗi column sẽ có index, đánh dấu theo tăng dần, khi tạo mới thì index sẽ tăng dần
  ],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  _destroy: { type: Boolean, default: false }
});

const Column = mongoose.model('Column', columnSchema);
module.exports = Column;
