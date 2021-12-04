const mongoose=require('mongoose')

const VideoListSchema=mongoose.Schema({
  id:String,
  channelName:String,
  name:String,
  img:String,
  views:String, 
  UploadedDate:String,
  likes:Number
})

const VideoList= mongoose.model('video',VideoListSchema)
module.exports={VideoList}


