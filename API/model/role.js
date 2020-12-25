const mongoose = require("mongoose");
const role = require("./role");
const role_scheme = new mongoose.Schema({
    role_name:{
        type:String,
        require:true
    }    
})

const role = mongoose.model("role",role_scheme)
module.exports=role;