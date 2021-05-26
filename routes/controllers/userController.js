const errorResponse = require('../../functions/errorResponse')
const User = require('../../models/user')
const Invite = require('../../models/invites')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const config = require('config')

const userController = {
    login: async(req, res) => {
        try{
            const candidate = await User.findOne({login: req.body.login})
            if (!candidate){
                throw new Error("Такого пользователя не существует")
            }
            const isValidPassword = await bcrypt.compare(req.body.password, candidate.password)
            if (!isValidPassword){
                throw new Error("Неверный пароль")
            }
            const token = await jwt.sign({_id: candidate._id, login: candidate.login, status: candidate.status}, config.get("secret"))
            res.status(200).json({
                message: "Добро пожаловать на сайт. Аутентификация прошла успешно",
                user: {
                    token: `Bearer ${token}`,
                    login: candidate.login,
                    status: candidate.status
                }
            })
        }
        catch(e){
            errorResponse(res, e)
            return
        }
    },
    loginIn: async(req, res) => {
        try{
            const candidate = await User.findOne({_id: req.user._id}).select({password: 0})
            if (!candidate){
                throw new Error("Такого пользователя не существует")
            }
            res.status(200).json({
                message: "Добро пожаловать",
                data: candidate
            })
        }
        catch(e){
            errorResponse(res, e)
            return
        }
    },
    registration: async(req, res) => {
        try{
            const candidate = await User.findOne({login: req.body.login})
            if (candidate){
                throw new Error("Такой пользователь уже существует")
            }
            let salt = await bcrypt.genSalt(6)
            let password = await bcrypt.hash(req.body.password, salt)
            const newUser = new User({
                login: req.body.login,
                password,
                status: req.inviteCheck.status
            })
            await newUser.save()
            const invite = await Invite.findOne({identify: req.inviteCheck.identify})
            console.log(invite)
            invite.isUsed = true
            await invite.save()
            res.status(201).json({
                message: "Пользователь создан",
                newUser
            })
        }
        catch(e){
            errorResponse(res, e)
            return
        }
    },
    getCountUser: async (req, res) => {
        try{
            const counts = await User.find().countDocuments()
            res.status(200).json({
                howMany: counts
            })
        }
        catch(e){
            errorResponse(res, e)
            return
        }
    }
}

module.exports = userController