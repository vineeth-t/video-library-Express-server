const express = require('express')
const router = express.Router()
const { HistoryVideosModel } = require('../Models/history.model')

const bodyParser = require('body-parser')
router.use(bodyParser.json());


router.param('userId', async (req, res, next, userId) => {
  try {
    const findHistory = await HistoryVideosModel.findOne({ userId })
    if (!findHistory) {
      let historyObject = await HistoryVideosModel({ userId: userId, videos: [] })
      historyObject = await historyObject.save()
      req.history = historyObject
    } else {
      req.history = findHistory
    }
    next();
  } catch (error) {
    console.log(error)
  }

})

router.route("/:userId")
  .get(async (req, res) => {
    try {
      const { history } = req
      let { videos } = await history.populate('videos.video')
      res.json({ response: true, historyVideos: videos })
    } catch (error) {
      res.json({ response: false, message: error.message })
    }

  })
  .post(async (req, res) => {
    try {
      let historyVideos
      const { history } = req;
      const { videoId, flag } = req.body;
      console.log(videoId,flag)
      if (flag === 'DELETE') {
        //video is Id stored as object
        history.videos = await history.videos.filter(({ video }) => !video.equals(videoId));
        console.log(history.videos)
      } else if (!history.videos.some(({ video }) => video.equals(videoId))) {
        historyVideos = await history.videos.push({ video: videoId })

      }
      historyVideos = await history.save();
      let { videos } = await history.populate('videos.video')
      res.json({ response: true, historyVideos: videos })
    } catch (error) {
      console.log(error)
      res.json({ response: false, message: error })
    }
  })

module.exports = router