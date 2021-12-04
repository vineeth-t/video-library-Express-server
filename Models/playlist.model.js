const mongoose=require('mongoose')

const PlaylistSchema= mongoose.Schema({
                   playListName:String,
                   playListId:String,
                   listOfVideos:Array
  })

const PlaylistModel=mongoose.model('playlist',PlaylistSchema)

module.exports={PlaylistModel}