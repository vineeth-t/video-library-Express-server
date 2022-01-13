const express = require('express')
const router = express.Router()
const { HistoryVideosModel } = require('../Models/history.model')

const{addOrDeleteHistory,getHistory}=require('../Controllers/history.controller')

const bodyParser = require('body-parser')
router.use(bodyParser.json());
const historyMiddleWare= async (req, res, next) => {
  try {
    const {userId}=req
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

}

router.route("/")
.get(historyMiddleWare,getHistory)
.post(historyMiddleWare,addOrDeleteHistory)

module.exports = router