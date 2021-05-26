const errorResponse = require('../../functions/errorResponse')
const Task = require('../../models/task')

const countController = {
    getCountTasks: async(req, res) => {
        try{
            const tasks = await Task.find({status: req.params.status}).select({isCheckedBy: 1})
            let count = 0
            tasks.forEach((e,i) => {
                if (String(e.isCheckedBy) !== String(req.user._id)){
                    count++
                }
            })
            res.status(200).json({
                message:"Данные получены",
                count
            })
        }
        catch(e){
            errorResponse(res, e)
        }
    },
    getCountCommentary: async(req, res) => {
        try{
            const tasks = await Task.find({status: req.params.status}).select({commentary: 1}).populate({path: "commentary", populate: {path: "checkedBy"}})
            let count = 0
            tasks.forEach((e, i) => {
                e.commentary.forEach((k) => {
                    k.checkedBy.forEach( x => {
                        console.log(x)
                        if (String(x._id) !== String(req.user._id)){
                            count++
                        }
                    }
                    )
                    
                })
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