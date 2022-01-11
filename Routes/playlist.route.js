const express = require('express')
const router = express.Router();
const bodyParser = require('body-parser')
router.use(bodyParser.json())

const { PlaylistModel } = require('../Models/playlist.model')

const { addOrRemoveFromPlaylist, findPlaylistsOfUser, getPlaylistById,createNewPlaylist,deletePlaylist } = require('../Controllers/playlists.controller')

router.param('userId', findPlaylistsOfUser)

router.route('/:userId')

  .get(async (req, res) => {
    //getting all playlists
    try {
      const { playlists } = req
      res.json({ response: true, playlists: playlists })
    } catch (error) {
      console.log(error);
      res.json({ response: false, message: error.message })
    }
  })
  .post(createNewPlaylist)
  

router.route('/:userId/:playlistId')

  .get(getPlaylistById)
  .post(addOrRemoveFromPlaylist)
  .delete(deletePlaylist)

module.exports = router