const mongoose= require('mongoose');
const {Schema} = mongoose
const LikedVideosSchema= new mongoose.Schema({
  userId:{type:Schema.Types.ObjectId,ref:'user'},
  videos:[{video:{type:Schema.Types.ObjectId,ref:'video'}}]
})

const LikedVideoModel = mongoose.model('likedvideo',LikedVideosSchema)

module.exports={LikedVideoModel}