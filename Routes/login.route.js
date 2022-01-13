const express = require('express');

const router = express.Router();

const bodyParser = require('body-parser');

const { UserModel } = require('../Models/user.model')

const{createAuthToken} =require('../Middlewares/authValidator')

router.use(bodyParser.json())

router.route('/')

.post(async(req,res)=>{
  try{
  const {username,password}= req.body;
  console.log(username,password)
  const findUser=await UserModel.findOne({username});
  if(findUser){
    if(findUser.password===password){
        const token=createAuthToken(findUser._id)
        console.log({token1:token})
        res.json({response:true,name:findUser.firstname,token:token})
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