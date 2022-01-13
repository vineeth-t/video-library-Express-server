const mySecret = process.env['dataBasePassword']
const express = require('express');
const cors = require('cors')

const app = express();
app.use(cors())
const { routeNotFound } = require('./Middlewares/routeNotFound')

const{authValidator}=require('./Middlewares/authValidator')
const {errorHandler} =require('./Middlewares/errorHandler')

const { InitaliseDataBaseConnection } = require('./DataBase/db.connect')

const { VideoList } = require('./Models/videoList.model')


const videoListRoute = require('./Routes/videoList.route')

const historyRoute = require('./Routes/history.route')

const playlistsRoute = require('./Routes/playlist.route')

const likedVideosRoute = require('./Routes/likedVideo.route')

const notesRoute = require('./Routes/notes.route')

const signUp=require('./Routes/signUp.route.js');

const logIn=require('./Routes/login.route.js');

app.use('/videos', videoListRoute)
app.use('/signUp',signUp)
app.use('/login',logIn)
/*Private Routes*/
app.use(authValidator)
app.use('/history', historyRoute)
app.use('/playlists', playlistsRoute)
app.use('/likedVideos', likedVideosRoute)
app.use('/notes', notesRoute);

InitaliseDataBaseConnection();

app.get('/', async (req, res) => {
  try {
    const videoList = await VideoList.find({});
    res.json({ response: videoList })
  } catch (error) {
    console.log(error)
  }
});

/* location specific.
  should be the last route
*/
app.use(routeNotFound)
app.use(errorHandler)
app.listen(3000, () => {
  console.log('server started');
});
