const jwt = require('jsonwebtoken')

const secret = 'avdfgh'

const authValidator = (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const decoded = jwt.verify(token, secret)
    req.userId = decoded.userId
    next()
  }
  catch (error) {
    res.status(401).json({ response: false, message: 'Authentication Failed' })
  }

}

const createAuthToken = (userId) => {
  const token = jwt.sign({ userId: userId }, secret, { expiresIn: '24h' })
  return token
}

module.exports = { authValidator, createAuthToken }