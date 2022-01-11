const express = require('express');

const router = express.Router();

const bodyParser = require('body-parser');

const { UserModel } = require('../Models/user.model')

router.use(bodyParser.json())

router.route('/')

.post(async(req,res)=>{
  try{
  const {username,password}= req.body;
  console.log(username,password)
  const findUser=await UserModel.findOne({username});
  if(findUser){
    if(findUser.password===password){
        res.json({response:true,fname:findUser.firstname,userId:findUser._id})
    }else{
        res.json({response:false,message:'Incorrect Password'})
    }
   
  }else{
    res.json({response:false,message:'Invalid Username'})
  }

  }catch(error){
    console.log(error)
    res.json({success:false,message:error})
  }

})

module.exports=router