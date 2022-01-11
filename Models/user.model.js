const mongoose = require('mongoose')
const UserSchema = new mongoose.Schema({
  firstname: { type: String, required: "first name required" },
  lastname: { type: String, required: "last name required" },
  username: {
    type: String,
    unique: "Email id already enrolled",
    required: "Email id is required",
    validate: {
      validator: function(value) {
        return /^.+@.+\.com$/.test(value);
      },
      message: props => `${props.value} is not a valid username!`
    }
  },
  password: {
    type: String,
    required: "Password is required",
    validate: {
      validator: function(value) {
        return /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/g.test(value);
      },
      message: props => `Password should contain 8 letters(atleast one number, one smallcase and uppercase alphabets)`
    }
  }
})
const UserModel = mongoose.model('user',UserSchema)
module.exports= {UserModel}
