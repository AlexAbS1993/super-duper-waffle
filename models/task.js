const {Schema, model} = require('mongoose')

const Task = new Schema({
    name: {type: String, required: [true, "Поле имени обязательно"], max: [36, "Не длиннее 36 символов"]},
    discription: {type: String, default: "Задача в заголовке"},
    priority: {type: String, enum: ["high", "middle", "low"], required: [true, "Приоритет должен быть задан"]},
    status: {type: String, default: 'new', enum: ['new', 'working', 'reworking', 'check', 'ready'], required: [true, "Статус задачи должен быть установлен"]},
    isCheckedBy: [{type: Schema.Types.ObjectId, ref: "User"}],
    link: {type: String},
    usersMark: {type: String},
    statusDetails: {
        addedAt: {type: Date, default: Date.now, required: [true, "Дата добавления должна присутствовать"]},
        history: [{
            addedAt: {type: Date},
            status: {type: String, enum: ['new', 'working', 'reworking', 'check', 'ready']},
            changedAt: {type: Date},
            changeBy: {type: Schema.Types.ObjectId, ref: "User"},
            addedBy: {type: Schema.Types.ObjectId, ref: "User"}
    }]
    },
    commentary: [{type: Schema.Types.ObjectId, ref: "Commentary"}]
})

module.exports = model("Task", Task)