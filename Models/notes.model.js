const mongoose= require('mongoose');
const {Schema} = mongoose
const NotesSchema= new mongoose.Schema({
  userId:{type:Schema.Types.ObjectId,ref:'user'},
  Notes:[{video:{type:Schema.Types.ObjectId,ref:'video'}}]
})

const LikedVideoModel = mongoose.model('likedvideo',LikedVideosSchema)

module.exports={LikedVideoModel}