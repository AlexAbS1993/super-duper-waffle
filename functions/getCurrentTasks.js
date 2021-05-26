const getCurrentTask = async(Model, status) => {
    let data = await Model.find({status: status}).populate({path: "commentary"}).populate({path: 'isCheckedBy'}).populate({path: "commentary", populate: {path: "author", select: "-password"}})
    return data
}

module.exports = getCurrentTask