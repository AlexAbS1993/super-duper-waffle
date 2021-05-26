const passport = require('passport')
const {Router} = require("express")
const controller = require('./controllers/taskController')

const router = Router()
router.use(passport.authenticate("jwt", {session: false}))

router.get("/getNew", controller.getNewTasks)
router.get("/getCheck", controller.getCheckTasks)
router.get("/getWorking", controller.getWorkingTasks)
router.get("/getReworking", controller.getReworkingTasks)
router.get("/getReady", controller.getReadyTasks)
router.post("/create", controller.createTask)
router.post("/change", controller.changeTaskStatus)
router.delete("/delete", controller.deleteTask)

module.exports = router