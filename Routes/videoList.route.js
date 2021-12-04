const express= require('express')

const bodyParser=require('body-parser')

const {VideoList}=require('../Models/videoList.model')

const router= express.Router();

router.use(bodyParser.json())

const {videoList}=require('../dataBase')

router.route('/')
.get(async (req,res)=>{
  try{
  const response=await VideoList.find({});
    res.status(200).json({ response: response });
  }catch(error){
    res.status(503).json({ response: 'Server not responding' });
  }

})
//many at a time
.post(async (req,res)=>{
  try{
    const response= await VideoList.insertMany(videoList);
   res.json({success:true,response})
  }catch(error){
    console.log(error)
  }
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