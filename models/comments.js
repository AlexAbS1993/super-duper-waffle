const {Schema, model} = require("mongoose")

const Commentary = new Schema({
    author: {type: Schema.Types.ObjectId, ref: "User", required: true},
    task: {type: Schema.Types.ObjectId, ref: "Task", required: true},
    text: {type: String, required: [true, "Текст не может быть пустым"], min: [1, "Текст должен быть длиннее 1 символа"]},
    checkedBy: [{type: Schema.Types.ObjectId, ref: "User"}],
    isReworking: {type: Boolean, default: false}
})

module.exports = model("Commentary", Commentary)