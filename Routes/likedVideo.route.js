const express=require('express')
const router=express.Router()
let {videoList}=require('../dataBase')
let likedVideos=[];
const bodyParser=require('body-parser')
router.use(bodyParser.json());
router.route("/")
.get((req,res)=>{
  res.json({response:likedVideos})
})
router.route("/:id")
.post((req,res)=>{
  const{id}=req.params;
  const video=videoList.find((video)=>video.id===id)
  if(likedVideos.some((video)=>video.id===id)){
      likedVideos=likedVideos.filter((video)=>video.id!==id)
  }else{
    likedVideos=[...likedVideos,video]
  }
 
  res.json({response:likedVideos})
})
module.exports=router