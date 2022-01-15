const express = require('express');

const router = express.Router();

const bcrypt= require('bcryptjs')

const bodyParser = require('body-parser');

const { UserModel } = require('../Models/user.model')

router.use(bodyParser.json())

router.route('/')
  .get((req, res) => {
    res.json({ success: true })
  })

  .post(async (req, res) => {
    try {
      const body = req.body;
      console.log(body)
      const { username } = req.body
      const findUserbyId = await UserModel.findOne({username });
      console.log(findUserbyId)
      if (findUserbyId) {
        res.json({ response: false, message: 'UserId already Exists' })
      } else {
        let user = await UserModel(body);
        const salts=10
        user.password= await bcrypt.hash(user.password,salts)
        user = await user.save();
        res.json({ response: true,name:user.firstname,token:'abcdefghi'})
      }

    } catch (error) {
      res.json({ response: false, message: `${error}` })
    }
  })

module.exports = router