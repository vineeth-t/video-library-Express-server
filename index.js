const express = require('express');
const cors =require('cors')

const app = express();
const{videoList}=require('./dataBase')
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
app.use('/notes',notesRoute)
app.get('/', (req, res) => {
  res.json({response:videoList})
});

app.listen(3000, () => {
  console.log('server started');
});
