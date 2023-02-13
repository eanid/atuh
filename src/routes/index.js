const express = require('express')
const router = express.Router()
const AuthRouter = require('./auth')
const UsersRouter = require('./users')

router
.use(AuthRouter)

module.exports = router