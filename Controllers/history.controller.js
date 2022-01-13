const addOrDeleteHistory = async (req, res) => {
  try {
    let historyVideos;
    const { history } = req;
    console.log(history)
    const { videoId, flag } = req.body;
    console.log(videoId, flag)
    if (flag === 'DELETE') {
      //video prop is Id of actual video stored as object
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
}

const getHistory = async (req, res) => {
  try {
    const { history } = req
    let { videos } = await history.populate('videos.video')
    res.json({ response: true, historyVideos: videos })
  } catch (error) {
    res.json({ response: false, message: error.message })
  }
}
module.exports = { addOrDeleteHistory, getHistory }