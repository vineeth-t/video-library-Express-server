const express = require('express')

const bodyParser = require('body-parser');

const { extend } = require('lodash')

const { VideoList } = require('../Models/videoList.model')

const router = express.Router();

router.use(bodyParser.json())

router.route('/')
  .get(async (req, res) => {
    try {
      const listOfVideos = await VideoList.find({});
      res.status(200).json({ response: true, videos: listOfVideos });
    } catch (error) {
      res.status(503).json({ response: false, message: 'Server not responding' });
    }

  })
  //post many at a time
  .post(async (req, res) => {
    try {
      const videosAdded = await VideoList.insertMany(videoList);
      res.json({ response: true, videos: videosAdded })
    } catch (error) {
      console.log(error)
      res.json({ response: false, message: 'Refresh the page' })
    }
  })
router.route('/:videoId')
  .get(async (req, res) => {
    try {
      const { videoId } = req.params
      const videoPlaying = await VideoList.findOne({ id: videoId })
      if (videoPlaying) {
        res.json({ response: true, videoPlaying })
      } else {
        res.json({ response: false, message: 'video not available' })
      }

    } catch (error) {
      res.json({ response: false, message: 'video not available' })
    }

  })

module.exports = router