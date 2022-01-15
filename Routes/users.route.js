const express = require('express')
const router = express.Router();
const { UserModel } = require('../Models/user.model');
const bodyParser=require('body-parser')

router.use(bodyParser.json())

const bcrypt = require('bcryptjs');
const extend = require('lodash')

router.route('/')

  .get(async (req, res) => {
    const userId = req.userId;
    const { firstname, lastname, username } = await UserModel.findById(userId)
    res.json({ response: true, firstname, lastname, username })
  })

  .post(async (req, res) => {
    const userId = req.userId;
    console.log(req.body)
    const { currentPassword, newPassword } = req.body
    
    const findUser = await UserModel.findById(userId);
    if (await bcrypt.compare(currentPassword, findUser.password)) {
      findUser.password = newPassword
      const salts = 10
      findUser.password = await bcrypt.hash(findUser.password, salts)
       user = await findUser.save();
       res.json({ response: true,message:'password changed Successfully'})
    }else{
      res.json({ response: true,message:'In-Correct Current password'})
    }



  })
module.exports = router
