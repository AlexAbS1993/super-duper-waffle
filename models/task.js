const {Schema, model} = require('mongoose')

const Task = new Schema({
    name: {type: String, required: [true, "Поле имени обязательно"]},
    priority: {type: String, enum: ["high", "middle", "low"], required: [true, "Приоритет должен быть задан"]},
    status: {type: String, default: 'new', enum: ['new', 'working', 'reworking', 'check', 'ready'], required: [true, "Статус задачи должен быть установлен"]},
    isCheckedBy: [{type: Schema.Types.ObjectId, ref: "User"}],
    statusDetails: {
        addedAt: {type: Date, default: Date.now, required: [true, "Дата добавления должна присутствовать"]},
        history: [{
            addedAt: {type: Date},
            status: {type: String, enum: ['new', 'working', 'reworking', 'check', 'ready'],
            changedAt: {type: Date}}
    }]
    },
    commentary: [{type: Schema.Types.ObjectId, ref: "Commentary"}]
})

module.exports = model("Task", Task)