const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const post = require('../models/post.js')
const user = require('../models/user.js')
const authLogin = require("../middlewares/authLogin.js");
var user_id
// to get user profile
router.get("/user/:id", (req, res) => {
    
    // post.findOne({_id:req.params.id}).populate("postedBy", "_id").then((result)=>{
    //     user_id=JSON.stringify(result.postedBy._id)
    //     // console.log(typeof(user_id))
    //     // res.json({"message":"allright"})
    // })
    
    user.findOne({ _id: req.params.id})
        .select("-password")
        .then(user => {
            post.find({ postedBy: req.params.id })
                .populate("postedBy", "_id")
                // .exec((err, post) => {
                //     if (err) {
                //         return res.status(422).json({ error: err })
                //     }
                //     res.status(200).json({ user, post })
                // })
                .catch((err)=>{
                    return res.status(422).json({ error: err })
                })
                .then((post)=>{
                    res.status(200).json({ user, post })
                })
        }).catch(err => {
            return res.status(404).json({ error: "User not found" })
        })
})

// to follow user
// router.put("/follow", authLogin, (req, res) => {
//     user.findByIdAndUpdate(req.body.followId, {
//         $push: { followers: req.user._id }
//     }, {
//         new: true
//     }, (err, result) => {
//         if (err) {
//             return res.status(422).json({ error: err })
//         }
//         user.findByIdAndUpdate(req.user._id, {
//             $push: { following: req.body.followId }
//         }, {
//             new: true
//         }).then(result => {
//             res.json(result)

//         })
//             .catch(err => { return res.status(422).json({ error: err }) })
//     }
//     )
// })

// to follow user
router.put("/follow", authLogin, (req, res) => {
    user.findByIdAndUpdate(req.body.followId, {
        $push: { followers: req.user._id }
    }, {
        new: true
    }).catch((err)=>{
        return res.status(422).json({ error: err })
    }).then((result)=>{
        user.findByIdAndUpdate(req.user._id, {
            $push: { following: req.body.followId }
        }, {
            new: true
        }).then(result => res.json(result))
            .catch(err => { return res.status(422).json({ error: err }) })
    })
}) 

// To unfollow user
router.put("/unfollow", authLogin, (req, res) => {
    user.findByIdAndUpdate(req.body.followId, {
        $pull: { followers: req.user._id }
    }, {
        new: true
    }).catch((err) => {
        return res.status(422).json({ error: err })
    }).then((result) => {
        user.findByIdAndUpdate(req.user._id, {
            $pull: { following: req.body.followId }
        }, {
            new: true
        }).then(result => res.json(result))
            .catch(err => { return res.status(422).json({ error: err }) })
    })
}) 
    
//     (err, result) => {
//         if (err) {
//             return res.status(422).json({ error: err })
//         }
//         user.findByIdAndUpdate(req.user._id, {
//             $pull: { following: req.body.followId }
//         }, {
//             new: true
//         }).then(result => res.json(result))
//             .catch(err => { return res.status(422).json({ error: err }) })
//     }
//     )
// })

// to upload profile pic
router.put("/uploadProfilePic", authLogin, (req, res) => {
    user.findByIdAndUpdate(req.user._id, {
        $set: { Photo: req.body.pic }
    }, {
        new: true
    }).catch((err)=>{
        return res.status(422).json({ error: er })
    }).then((result)=>{
        res.json(result)
    })
    // .exec((err, result) => {
    //     if (err) {
    //         return res.status(422).json({ error: er })
    //     } else {
    //         res.json(result)
    //     }
    // })
})

module.exports = router;