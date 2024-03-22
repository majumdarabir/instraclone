const express = require('express')
const userSchema = require('../models/user.js')
const Route = express.Router()
const mongoose = require('mongoose')
const user = require('../models/user.js')
const jwt = require("jsonwebtoken")
const Jwt_secret =require('../keys.js')
const authLogin = require('../middlewares/authLogin.js')

Route.post('/signup',(req,res)=>{
    const {username,email,password}= req.body
    if(!username || !email || !password){
        return res.status(422).json({error:"please fill all the fields"})
    }
    user.findOne({$or:[{email:email},{username:username}]}).then((savedUser)=>{
        if(savedUser){
            return res.status(422).json({error:"user already exist"})
        }
        const User = new user({
            username,
            email,
            password
        })
        User.save().then((User) => {
            res.status(200).json({ mesasage: "user saved" })
        }).catch((error) => {
            res.status(400).json({ mesasage: "user not saved" })
        })

    })
    
})

Route.post('/signin',(req,res)=>{
    const {email,password} = req.body

    if(!email || ! password){
        return res.status(422).json({ error:"please fill all the fields"})
    }
    user.findOne({$and:[{email:email},{password:password}]}).then((savedUser)=>{
        if(savedUser){
            const token = jwt.sign({ _id: savedUser.id }, Jwt_secret)
            const { _id, username,email,password} = savedUser

            res.json({ token, user: { _id,username, email,password} })

            console.log({ token, user: { _id,username, email,password} })
        }
        else{
            res.status(400).json({error:"user does not exist"})
        }
    })
})



module.exports = Route

