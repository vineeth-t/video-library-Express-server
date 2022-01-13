const { PlaylistModel } = require('../Models/playlist.model')

const getPlaylistById = async (req, res) => {
  try {
    const { playlists } = req
    const { playlistId } = req.params
    const findPlaylistById = playlists.find(({ _id }) => _id.equals(playlistId))
    res.json({ response: true, playlist: findPlaylistById })
  } catch (error) {
    res.json({ response: false, message: error.message })
  }
}

const createNewPlaylist = async (req, res) => {
  try {
    const  userId  = req.userId;
    const { name, videoId } = req.body;
    let newPlaylist = await PlaylistModel({
      userId: userId,
      playListName: name,
      listOfVideos: [{ video: videoId }]
    })
    newPlaylist = await newPlaylist.save();
    const findPlaylists = await PlaylistModel.find({ userId }).populate('listOfVideos.video');
    res.json({ response: true, message: 'Playlist Created', playlists: findPlaylists })
  }
  catch (error) {
    console.log(error);
    res.json({ response: false, message: 'Something went Wrong' })
  }
}

const deletePlaylist = async (req, res) => {
  try {
    const { playlistId } = req.params;
    const  userId  = req.userId;
    let findPlaylists = await PlaylistModel.deleteOne({_id: playlistId })
    findPlaylists = await PlaylistModel.find({ userId }).populate('listOfVideos.video')
    res.json({ response: true, message: 'Playlist deleted', playlists: findPlaylists })
  }
  catch (error) {
    console.log(error);
    res.json({ response: false, message: 'Something went Wrong' })
  }
}

const addOrRemoveFromPlaylist = async (req, res) => {
  try {
    const  userId  = req.userId;
    const { name, videoId, flag } = req.body;
    let message;
    let playlists = await PlaylistModel.find({ userId })
    let findPlaylistByName = playlists.find(({ playListName }) => playListName === name);
    if (flag === 'DELETE') {
      findPlaylistByName.listOfVideos = await findPlaylistByName.listOfVideos.filter((video) => !video.video.equals(videoId));
      message = 'Video Deleted'
    } else if (flag === 'ADD') {
      await findPlaylistByName.listOfVideos.push({ video: videoId })
      message = 'Video Added'
    }
    findPlaylistByName = await findPlaylistByName.save();
    playlists = await PlaylistModel.find({ userId }).populate('listOfVideos.video');
    res.json({ response: true, playlists: playlists, message: message })

  } catch (error) {
    console.log(error)
  }

}


const findPlaylistsOfUser = async (req, res, next) => {
  try {
    const  userId  = req.userId;
    const findPlaylists = await PlaylistModel.find({ userId }).populate('listOfVideos.video');
    if (findPlaylists.length === 0) {
      let createNewPlaylist = await PlaylistModel({
        userId: userId,
        playListName: "WatchLater",
        listOfVideos: []
      })
      createNewPlaylist = await createNewPlaylist.save()
      req.playlists = [createNewPlaylist];
    } else {
      req.playlists = findPlaylists;
    }
    req.userId = userId;
    next()
  } catch (error) {
    console.log(error)
  }
}


module.exports = { addOrRemoveFromPlaylist, findPlaylistsOfUser, getPlaylistById, createNewPlaylist, deletePlaylist }