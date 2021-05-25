const Invite = require('../models/invites')
const errorResponse = require('../functions/errorResponse')

const statuses = {
    "Evgeniy": "admin",
    "AlexAbS": "user",
    "Master": "master"
}

async function inviteCheck(req, res, next){
    try{
        if (!req.body.invite){
            throw new Error("Нужен инвайт")
        }
        const invite = await Invite.findOne({identify: req.body.invite})
        if (!invite){
            throw new Error("Недействительный инвайт")
        }
        if (invite && invite.isUsed === true){
            throw new Error("Инвайт уже использован")
        }
        req.inviteCheck = {identify: invite.identify, status: statuses[invite.identify]}
        next()
    }
    catch(e){
        errorResponse(res, e)
    }
}

module.exports = inviteCheck