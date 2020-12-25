const mongoose = require("mongoose");

const group_scheme = new mongoose.Schema({
    group_name:{
        type:String,
        require:true
    }
})

const group = mongoose.model("group",group_scheme)
module.exports=group;