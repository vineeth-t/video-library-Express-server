const mongoose = require('mongoose');
const { Schema } = mongoose
const NotesSchema = new mongoose.Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'user' },
  videoId: { type: String, required:true},
  notes: [{
    type:String,
    required:true
  }]
})

const NotesModel = mongoose.model('notes', NotesSchema)

module.exports = { NotesModel }