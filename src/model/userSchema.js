const mongoose = require("mongoose")
const validator = require("validator")

const userData = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : [true , "Email is already exists"],
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Enter valide email")
            }
        }
    },
    password : {
        type : String,
        required : true
    },
    username : {
        type : String,
        required : true,
        unique : [true, "username already exists"]
    },
    gender : {
        type : String,
        required : true,
        enum : ["male" , "female" , "other"]
    },
    dob : {
        type : String,
        required : true,
    },
    token : {
        type : String
    }
})

const userSchema = new mongoose.model("userDetails" , userData)

module.exports = userSchema