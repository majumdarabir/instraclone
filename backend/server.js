const express = require('express')
const Route = require('./Routes/signup')
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const cors = require("cors")
const app = express();
const path = require("path")
const PORT = 5000

//for using dotenv
dotenv.config()


// app.get('/',(req,res)=>{
//     res.send("server is running properly");
// })

// how to connect mongoose ?..

mongoose.connect(process.env.MONGO_URI)

//check that mongo connected or not ..

mongoose.connection.on("connected",()=>{console.log("mongo connected")})
mongoose.connection.on("error",()=>{console.log("mongo not connnected")})

// app.use(express.static(path.join(__dirname, "./frontent/build")))

// app.get("*", (req, res) => {
//     res.sendFile(
//         path.join(__dirname, "./frontent/build/index.html"),
//         function (error) {
//             res.status(500).send(error)
//         }
//     )
// })
//convert data in json before routing
app.use(express.json())

//prevent the cors error..

app.use(cors())

app.use('/',Route)
app.use(require('./Routes/createPost'))
app.use(require("./Routes/user"))

app.listen(PORT,()=>{
    console.log("server is starting");
})