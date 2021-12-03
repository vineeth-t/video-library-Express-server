const express= require('express')

const router= express.Router()
const {videoList}=require('../dataBase')
router.route('/')
.get((req,res)=>{
  res.status(200).json({ response: videoList });
})
function getvideoById(id,videoList){
  return videoList.find((video)=>video.id===id)
}
router.route('/:id')
.get((req,res)=>{
  const {id}=req.params;
  const video=getvideoById(id,videoList)
  res.status(200).json({ response: video })
})

module.exports=router