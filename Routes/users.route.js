const express = require('express')
const router = express.Router();
const { UserModel } = require('../Models/user.model');
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt');
router.use(bodyParser.json())



router.route('/')
  .get(async (req, res) => {
    try {
      console.log('hello')
      const userId = req.userId;
      const { firstname, lastname, username } = await UserModel.findById(userId)
      res.json({ response: true, firstname, lastname, username })
    } catch (error) {
      console.log(error)
      res.json({ response: false, message: error.message })
    }

  })

  .post(async (req, res) => {
    try {
      const userId = req.userId;
      const { currentPassword, newPassword } = req.body

      const findUser = await UserModel.findById(userId);
      if (await bcrypt.compare(currentPassword, findUser.password)) {
        findUser.password = newPassword
        const salts = 10
        findUser.password = await bcrypt.hash(findUser.password, salts)
        user = await findUser.save();
        res.json({ response: true, message: 'password changed Successfully' })
      } else {
        res.json({ response: true, message: 'In-Correct Current password' })
      }
    }
    catch (error) {
      console.log(error);
      res.json({ response: false })
    }
  })
module.exports = router
