const express = require('express');

const router = express.Router();

const bodyParser = require('body-parser');

const bcrypt= require('bcrypt')

const { UserModel } = require('../Models/user.model')

const{createAuthToken} =require('../Middlewares/authValidator')

router.use(bodyParser.json())

router.route('/')

.post(async(req,res)=>{
  try{
  const {username,password}= req.body;
  const findUser=await UserModel.findOne({username});
  console.log(findUser)
  if(findUser){
    const confirmPassword=await bcrypt.compare(password,findUser.password)
    if(confirmPassword){
        const token=createAuthToken(findUser._id)
        res.json({response:true,token:token})
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