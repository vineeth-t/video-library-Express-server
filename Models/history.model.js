const mongoose= require('mongoose');
const {Schema} = mongoose
const HistoryVideosSchema= new mongoose.Schema({
  userId:{type:Schema.Types.ObjectId,ref:'user'},
  videos:[{video:{type:Schema.Types.ObjectId,ref:'video'}}]
})

const HistoryVideosModel = mongoose.model('historyVideo',HistoryVideosSchema)

module.exports={HistoryVideosModel}