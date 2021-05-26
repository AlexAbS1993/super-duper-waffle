module.exports = (candidate, req) => {
    for (let j = 0; j < candidate.length; j++){
        for (let i = 0; i < candidate[j].commentary.length; i++){
            if (candidate[j].commentary[i].checkedBy.some((e) => e === req.user._id)){
                candidate[j].commentary[i].isNewMessage = false
            }
            else {
                candidate[j].commentary[i].isNewMessage = true
            }
        }
            if (candidate[j].isCheckedBy.some((e) => e === req.user._id)){
                candidate[j].isNewTask = false
            }
            else {
                candidate[j].isNewTask = true
            }
    }   
}