const express= require('express')
const bodyParser=require('body-parser');

const router= express.Router()
let history=[];
router.use(bodyParser.json())

router.route('/')
.get((req,res)=>{
  res.status(200).json({response:history})
})
router.route('/:id')
.post((req,res)=>{
  const videoToBeAdded=req.body
  if(history.some(      (video=>video.id===videoToBeAdded.id))){
                history=[...history]
              }else{
  history=[...history,videoToBeAdded]
              }

 res.status(201).json({response:history})
})
.delete((req,res)=>{
  const {id}=req.params;
  history=[...history.filter((video)=>video.id!==id)]

   res.status(200).json({response:history})
})
 module.exports=router