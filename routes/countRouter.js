const passport = require('passport')
const {Router} = require("express")
const controller = require('./controllers/countController')

const router = Router()
router.use(passport.authenticate("jwt", {session: false}))

router.get("/tasks/:status", controller.getCountTasks)
router.get("/comments/:status", controller.getCountCommentary)

module.exports = router