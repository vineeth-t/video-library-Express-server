const express = require('express');
const cors =require('cors')

const app = express();

const{InitaliseDataBaseConnection}=require('./DataBase/db.connect')

const {VideoList}=require('./Models/videoList.model')

app.use(cors())

const videoListRoute= require('./Routes/videoList.route')

const historyRoute=require('./Routes/history.route')

const playlistsRoute= require('./Routes/playlist.route')

const likedVideosRoute=require('./Routes/likedVideo.route')

const notesRoute=require('./Routes/notes.route')

app.use('/videos',videoListRoute)
app.use('/history',historyRoute)
app.use('/playlists',playlistsRoute)
app.use('/likedVideos',likedVideosRoute)
app.use('/notes',notesRoute);

InitaliseDataBaseConnection();

app.get('/', async(req, res) => {
   try{
    const videoList=await VideoList.find({});
     res.json({response:videoList})
  }catch(error){
    console.log(error)
  }
});

app.listen(3000, () => {
  console.log('server started');
});
