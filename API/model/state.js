const mongoose = require("mongoose");

const state_scheme = new mongoose.Schema({
    state_name:{
        type:String,
        require:true
    }
})

const state = mongoose.model("state",state_scheme)
module.exports=state;