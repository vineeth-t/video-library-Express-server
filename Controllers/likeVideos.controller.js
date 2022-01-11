const { extend } = require('lodash')
const { VideoList } = require('../Models/videoList.model')

async function likeUnlikeVideo(videoId, likedVideosList, res) {
  let videosLikedByUser, message;
  if (likedVideosList.videos.find(({ video }) => video.equals(videoId))) {
    likedVideosList.videos = await likedVideosList.videos.filter(({ video }) => !video.equals(videoId));
    message = 'Video Unliked'
    likeCounter(videoId, 'DEC')
  } else {
    videosLikedByUser = await likedVideosList.videos.push({ video: videoId })
    message = 'Video Liked'
    likeCounter(videoId, 'INC')
  }
  videosLikedByUser = await likedVideosList.save();

  let { videos } = await likedVideosList.populate('videos.video')
  res.json({ response: true, liked: videos, message })
}
async function likeCounter(videoId, flag) {
  let findVideo = await VideoList.findOne({ _id: videoId })
  if (findVideo && flag === 'DEC') {
    findVideo = extend(findVideo, findVideo.likes--)
    findVideo = await findVideo.save()
  } else if (findVideo && flag === 'INC') {
    findVideo = extend(findVideo, findVideo.likes++)
    findVideo = await findVideo.save()
  }
}
module.exports = { likeUnlikeVideo }