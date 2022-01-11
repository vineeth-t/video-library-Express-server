const express = require('express')
const router = express.Router()
const { LikedVideoModel } = require('../Models/likedVideo.model')
const { likeUnlikeVideo } = require('../Controllers/likeVideos.controller')
const bodyParser = require('body-parser')
router.use(bodyParser.json());


router.param('userId', async (req, res, next, userId) => {
  //find whether there is likedVideo array is present if not create a new one and add videos to it.
  try{
  const likedVideosList = await LikedVideoModel.findOne({ userId })
  if (!likedVideosList) {
    let likedVideosObject = await LikedVideoModel({ userId: userId, videos: [] })
    likedVideosObject = await likedVideosObject.save()
    req.likedVideosList = likedVideosObject
  } else {
    req.likedVideosList = likedVideosList
  }
  next();
  }catch(error){
    console.log(error)
  }

})

router.route("/:userId")
  .get(async (req, res) => {
    try {
      const { likedVideosList } = req
      let { videos } = await likedVideosList.populate('videos.video')
      res.json({ response: true, liked: videos })
    } catch (error) {
      res.json({ response: false, message: error.message })
    }

  })
  .post(async (req, res) => {
    try {
      const { likedVideosList } = req
      const { videoId } = req.body;
      likeUnlikeVideo(videoId, likedVideosList, res)
    } catch (error) {
      console.log(error)
      res.json({ response: false, message: error })
    }
  })
module.exports = router