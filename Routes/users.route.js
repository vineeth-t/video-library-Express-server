const express=require('express')
const router=express.Router();
const { UserModel } = require('../Models/user.model')

router.route('/')

.get(async(req,res)=>{
  const userId=req.userId;
  const {firstname,lastname,username}=await UserModel.findById(userId)
  res.json({response:true,firstname,lastname,username})
})
module.exports=router
