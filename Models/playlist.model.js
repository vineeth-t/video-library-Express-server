const mongoose=require('mongoose');
const{Schema}=mongoose

const PlaylistSchema= mongoose.Schema({
    userId:{type:Schema.Types.ObjectId,ref:'user'},
    playListName: String,
    listOfVideos:[{video:{type:Schema.Types.ObjectId,ref:'video'}}]
  })

const PlaylistModel=mongoose.model('playlist',PlaylistSchema)

module.exports={PlaylistModel}