const {Schema, model} = require('mongoose')

const User = new Schema({
    login: {type: String, required: [true, "Логин обязателен"]},
    password: {type: String, required: [true, "Пароль обязателен"]},
    status: {type: String, enum: ["admin", "user", "master"], required: [true, "Статус пользователя обязателен"]},
})

module.exports = model("User", User)