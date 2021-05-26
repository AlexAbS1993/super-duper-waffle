const {Router} = require('express')
const controller = require('./controllers/userController')
const passport = require('passport')
const inviteCheck = require('../middleware/inviteCheck')

let router = Router()


router.post("/login", controller.login)
router.get("/login", passport.authenticate("jwt", {session: false}), controller.loginIn)
router.post("/registration", inviteCheck, controller.registration)

module.exports = router