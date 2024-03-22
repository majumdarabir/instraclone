const mongoose = require('mongoose')
const { use } = require('../Routes/signup')
const {ObjectId}= mongoose.Schema.Types

const userSchema = mongoose.Schema({
    username:{
        type:"string",
        reqired:true
    },
    email:{
        type:"string",
        reqired: true
    },
    password:{
        type:"string",
        reqired: true
    },
    Photo:{
        type:String
    },
    followers: [{ type: ObjectId, ref: "user" }],
    following: [{ type: ObjectId, ref: "user" }]
})

module.exports = mongoose.model("user",userSchema)



