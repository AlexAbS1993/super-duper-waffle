const getCurrentTask = async(Model, status) => {
    let data = await Model.find({status: status}).populate({path: "commentary"}).populate({path: 'isCheckedBy'}).populate({path: "commentary", populate: {path: "author", select: "-password"}})
    for (let i = 0; i < data.length; i++){
        data[i].commentary = [...data[i].commentary.reverse()]
    }
    return data.sort((a, b) => b.statusDetails.addedAt - a.statusDetails.addedAt)
}

module.exports = getCurrentTask