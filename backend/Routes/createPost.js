const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const authLogin = require("../middlewares/authLogin");
const post = require('../models/post.js')

// Route
router.get("/allposts", authLogin, (req, res) => {
    post.find()
        .populate("postedBy")
        .populate("comments.postedBy", "_id username photo")
        .sort("-createdAt")
        .then(posts => res.json(posts))
        .catch(err => console.log(err))
})

router.post("/createPost", authLogin, (req, res) => {
    const { body, pic } = req.body;
    console.log(pic)
    if (!body || !pic) {
        return res.status(422).json({ error: "Please add all the fields" })
    }
    console.log(req.user)
    const Post = new post({
        body: body,
        photo: pic,
        postedBy: req.user
    })
    Post.save().then((result) => {
        return res.json({ post: result })
    }).catch(err => console.log(err))
})

router.get("/myposts", authLogin, (req, res) => {
    // res.send(req.user._id)
    post.find({ postedBy: req.user._id })
        .populate("postedBy", "_id username")
        .populate("comments.postedBy", "_id username")
        .sort("-createdAt")
        .then(myposts => {
            res.json(myposts)
        })
})

router.put("/like", authLogin, (req, res) => {
    post.findByIdAndUpdate(req.body.postId, {
        $push: { likes: req.user._id }
    },{new:true}).populate("postedBy" ,"_id username photo").then((result) => {
        res.send(result)
    })
})

router.put("/unlike", authLogin, (req, res) => {
    post.findByIdAndUpdate(req.body.postId, {
        $pull: { likes: req.user._id }
    },{new: true}).populate("postedBy", "_id username photo").then((result) => {
        res.send(result)
    })
})

//my thinking..

// router.put("/unlike", authLogin, (req, res) => {
//     // res.send(req.user._id)
//     post.find({ _id: req.body.postId }).then((result) => {
//         // let likeArray = result.likes
//         // likeArray = likeArray.filter(item=> item !== req.user._id)
//         res.json(result.likes)
//     })
// })

// router.put("/unlike", authLogin, (req, res) => {
//     post.findByIdAndUpdate(req.body.postId, {
//         $pull: { likes: req.user._id }
//     }, {
//         new: true
//     }).populate("postedBy", "_id name Photo").then(
//         (res) => {
//             res.json(result)
//         }
//     ).catch((err) => {
//         return res.status(422).json({ error: err })
//     })
//         // .exec((err, result) => {
//         //     if (err) {
//         //         return res.status(422).json({ error: err })
//         //     } else {
//         //         res.json(result)
//         //     }
//         // })
// })
router.put("/comment", authLogin, (req, res) => {
    const comment = {
        comment: req.body.text,
        postedBy: req.user._id
    }
    post.findByIdAndUpdate(req.body.postId, {
        $push: { comments: comment }
    }, {
        new: true
    })
        .populate("comments.postedBy", "_id username photo")
        .populate("postedBy", "_id name Photo").then((result) => {
            res.send(result)
        })

})

// Api to delete post
router.delete("/deletePost/:postId", authLogin, (req, res) => {
    post.findOne({ _id: req.params.postId })
        .populate("postedBy", "_id").catch((err) => {
            return res.status(422).json({ error: err })
        }).then((post) => {
            if (!post) {
                return res.status(422).json({ error: err })
            }
            if (post.postedBy._id.toString() === req.user._id.toString()) {

                post.remove()
                    .then(result => {
                        return res.json({ message: "Successfully deleted" })
                    }).catch((err) => {
                        console.log(err)
                    })
            }
        })
    // .exec((err, post) => {
    //     if (err || !post) {
    //         return res.status(422).json({ error: err })
    //     }

    //     if (post.postedBy._id.toString() == req.user._id.toString()) {

    //         post.remove()
    //             .then(result => {
    //                 return res.json({ message: "Successfully deleted" })
    //             }).catch((err) => {
    //                 console.log(err)
    //             })
    //     }
    // })
})

router.get("/myfollowingpost", authLogin, (req, res) => {
    post.find({ postedBy: { $in: req.user.following } })
        .populate("postedBy", "_id username photo")
        .populate("comments.postedBy", "_id name")
        .then(posts => {
            res.json(posts)
        })
        .catch(err => { console.log(err) })
})

module.exports = router