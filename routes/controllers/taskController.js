const getCurrentTask = require('../../functions/getCurrentTasks')
const errorResponse = require('../../functions/errorResponse')
const Task = require('../../models/task')
const Commentary = require('../../models/comments')
const checkFields = require('../../functions/addCheckField')

const taskController = {
    getNewTasks: async (req, res) => {
        try{
            let tasks = await getCurrentTask(Task, "new") 
            res.status(200).json({
                message: "Задачи получены",
                tasks
            })
        }
        catch(e){
            errorResponse(res, e)
        }
    },
    getCheckTasks: async (req, res) => {
        try{
            let tasks = await getCurrentTask(Task, "check")
            res.status(200).json({
                message: "Задачи получены",
                tasks
            })
        }
        catch(e){
            errorResponse(res, e)
        }
    },
    getWorkingTasks: async (req, res) => {
        try{
            let tasks = await getCurrentTask(Task, "working")
            res.status(200).json({
                message: "Задачи получены",
                tasks
            })
        }
        catch(e){
            errorResponse(res, e)
        }
    },
    getReworkingTasks: async (req, res) => {
        try{
            let tasks = await getCurrentTask(Task, "reworking")
            res.status(200).json({
                message: "Задачи получены",
                tasks
            })
        }
        catch(e){
            errorResponse(res, e)
        }
    },
    getReadyTasks: async (req, res) => {
        try{
            let tasks = await getCurrentTask(Task, "ready")
            res.status(200).json({
                message: "Задачи получены",
                tasks
            })
        }
        catch(e){
            errorResponse(res, e)
        }
    },
    createTask: async (req, res) => {
        try{
            if (req.user.status !== "admin"){
                throw new Error("Доступ запрещён")
            }
            const task = new Task({
                name: req.body.name,
                priority: req.body.priority,
                isCheckedBy: [req.user._id],
                statusDetails: {
                    history: [
                        {
                            addedAt: Date.now(),
                            status: "new",
                            addedBy: req.user._id
                        }
                    ]
                }
            })
            await task.save()
            res.status(200).json({
                message: "Запись создана",
                task
            })
        }
        catch(e){
            errorResponse(res, e) 
        }
    },
    changeTaskStatus: async (req, res) => {
        try{
            const candidate = await Task.findOne({_id: req.body._id})
            if (!candidate){
                throw new Error("Такой записи нет")
            }
            if (!req.body.commentary && req.body.status === "reworking"){
                throw new Error("Требуется комментарий к изменению")
            }
            if (req.body.status === "reworking" && req.user.status !== "admin"){
                throw new Error("Доступ закрыт")
            }
            const newOldHistory = {
                addedAt: candidate.statusDetails.history[candidate.statusDetails.history.length - 1].addedAt,
                status: candidate.statusDetails.history[candidate.statusDetails.history.length - 1].status,
                addedBy: candidate.statusDetails.history[candidate.statusDetails.history.length - 1].addedBy,
                changeBy: req.user._id,
                changedAt: Date.now()
            }
            candidate.statusDetails.history.pop()
            candidate.statusDetails.history.push(newOldHistory)
            candidate.statusDetails.history.push({
                addedAt: Date.now(),
                status: req.body.status,
                addedBy: req.user._id
            })
            candidate.status = req.body.status
            if (req.body.priority){
                candidate.priority = req.body.priority
            }
            if (req.body.status === "reworking"){
                let comment = new Commentary({
                    author: req.user._id,
                    task: candidate._id,
                    text: req.body.commentary,
                    isReworking: true,
                    checkedBy: [req.user._id]
                })
                await comment.save()
                candidate.commentary.push(comment)
            }
            candidate.isCheckedBy = [req.user._id]
            await candidate.save()            
            res.status(200).json({
                message: "Задача изменена",
                task: candidate
            })
        }
        catch(e){
            errorResponse(res, e) 
        }
    }, 
    deleteTask: async(req, res) => {
        try{
            const candidate = await Task.findOneAndDelete({_id: req.body._id})
            if (!candidate){
                throw new Error("Такой записи нет")
            }
            if (req.user.status !== "admin"){
                throw new Error("Доступ запрещен")
            }
            res.status(200).json({
                message: "Задача удалена"
            })
        }
        catch(e){
            errorResponse(res, e) 
        }
    },
    createCommentary: async(req, res) => {
        try{
            let comment = new Commentary({
                author: req.user._id,
                task: req.body._id,
                text: req.body.commentary,
                isReworking: false,
                checkedBy: [req.user._id]
            })
            let task = await Task.findOne({_id: req.body._id})
            task.commentary.push(comment)
            await comment.save()
            res.status(200).json({
                message: "Комментарий опубликован",
                comment
            })
        }
        catch(e){
            errorResponse(res, e) 
        }
    },
    commentaryCheck: async (req, res) => {
        try{
            let comment = await Commentary.findOne({
                _id: req.body._id
            })
            if (!comment){
                throw new Error("Такого комментария не существует")
            }
            if (comment.checkedBy.some((e) => e === req.user._id)){
                throw new Error("Уже было проверено")
            }
            comment.checkedBy.push(req.user._id)
            await comment.save()
            res.status(200).json({
                message: "Проверено",
                comment
            })
        }
        catch(e){
            errorResponse(res, e) 
        }
    },
    taskCheck: async (req, res) => {
        try{
            let candidate = await Task.findOne({_id: req.body._id})
            if (!candidate){
                throw new Error("Такой задачи не существует")
            }
            if (candidate.isCheckedBy.some(e => e === req.user._id)){
                throw new Error("Уже было проверено")
            }
            candidate.isCheckedBy.push(req.user._id)
            await candidate.save()
            res.status(200).json({
                message: "Проверено"
            })
        }
        catch(e){
            errorResponse(res, e)      
        }
    }
}

module.exports = taskController