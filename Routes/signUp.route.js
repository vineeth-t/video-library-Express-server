const express = require('express');

const router = express.Router();

const bcrypt= require('bcryptjs')

const bodyParser = require('body-parser');

const { UserModel } = require('../Models/user.model')

const{createAuthToken} =require('../Middlewares/authValidator')

router.use(bodyParser.json())

router.route('/')
  .get((req, res) => {
    res.json({ success: true })
  })

  .post(async (req, res) => {
    try {
      const body = req.body;
      const { username } = req.body
      const findUserbyId = await UserModel.findOne({username });
      if (findUserbyId) {
        res.json({ response: false, message: 'UserId already Exists' })
      } else {
        let user = await UserModel(body);
        const token=createAuthToken(user._id)
        const salts=10
        user.password= await bcrypt.hash(user.password,salts)
        user = await user.save();
        res.json({ response: true,name:user.firstname,token:token})
      }

    } catch (error) {
      res.json({ response: false, message: `${error}` })
    }
  })

module.exports = router