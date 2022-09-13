const mongoose = require("mongoose")

const blogData = new mongoose.Schema({
    title : {
        type : String,
        required : true
    },
    author : {
        type : String,
        required : true,
        ref : "userDetails"
    },
    date : {
        type : String,
        required : true,
    },
    post : {
        type : String,
        required : true,
    }
})


const blogSchema = new mongoose.model("blogDetails" , blogData)

module.exports = blogSchema