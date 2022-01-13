const express = require('express')
const router = express.Router();
const bodyParser = require('body-parser')
router.use(bodyParser.json())
const { addOrRemoveFromPlaylist, findPlaylistsOfUser, getPlaylistById, createNewPlaylist, deletePlaylist } = require('../Controllers/playlists.controller')

router.route('/')

  .get(findPlaylistsOfUser, async (req, res) => {
    //getting all playlists
    try {
      const { playlists } = req
      res.json({ response: true, playlists: playlists })
    } catch (error) {
      console.log(error);
      res.json({ response: false, message: error.message })
    }
  })
  .post(findPlaylistsOfUser, createNewPlaylist)


router.route('/:playlistId')

  .get(findPlaylistsOfUser, getPlaylistById)
  .post(findPlaylistsOfUser, addOrRemoveFromPlaylist)
  .delete(findPlaylistsOfUser, deletePlaylist)

module.exports = router