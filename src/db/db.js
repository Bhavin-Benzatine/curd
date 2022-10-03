const mongoose = require('mongoose')

// mongoose.connect("mongodb://localhost:27017/userSchema")
mongoose.connect("mongodb+srv://Bhavin:benzatine123@cluster0.cnfcxjm.mongodb.net/userSchema")
.then(() => {
    console.log("database connected");
}).catch((err) => {
    console.log("err==>",err);
})