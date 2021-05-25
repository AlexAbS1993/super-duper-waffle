const {Schema, model} = require("mongoose")

const Invite = new Schema({
    identify: {type: String, unique: true},
    isUsed: {type: Boolean}
})