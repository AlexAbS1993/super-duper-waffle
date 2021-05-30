const errorResponse = require('../../functions/errorResponse')
const Task = require('../../models/task')

const statuses = ["new", "working", "check", "reworking"]

const countController = {
    getCountTasks: async(req, res) => {
        try{
            let countsArray = []
            for (let i = 0; i < statuses.length; i++){

                const tasks = await Task.find({status: statuses[i]}).select({isCheckedBy: 1})
                countsArray[i] = {}
                countsArray[i][statuses[i]] = 0
                tasks.forEach((e, index) => {
                    if (!e.isCheckedBy.some(k => String(k)===String(req.user._id))){
                        countsArray[i][statuses[i]]++
                    }
                })
            }
            res.status(200).json({
                message:"Данные получены",
                countsArray
            })
        }
        catch(e){
            errorResponse(res, e)
        }
    },
    getCountCommentary: async(req, res) => {
        try{
            const tasks = await Task.find({status: req.params.status}).select({commentary: 1}).populate({path: "commentary", populate: {path: "checkedBy"}})
            let count = {}
            tasks.forEach((e, i) => {
                count[e._id] = 0
                e.commentary.forEach((k) => {
                   if (!k.checkedBy.some( x => String(x._id) === String(req.user._id))){
                        count[e._id]++
                   }
                    }
                    )
                    
                })
            res.status(200).json({
                message:"Данные получены",
                count
            })
        }
        catch(e){
            errorResponse(res, e)
        } 
    }
}

module.exports = countController