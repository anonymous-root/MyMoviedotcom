const mongoose = require("mongoose");

const state = require("./state");
const city = require("./city");
const group = require("./group");
const user_scheme = new mongoose.Schema({
    user_name:{
        type:String,
        require:true
    },
    cinema_name:{
        type:String
    },
    password:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    gender:{
        type:String,
        require:true
    },
    photo1:{
        type:String,
        require:true
    },
    state_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:state
    },
    city_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:city
    },
    group_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:group
    },
    is_active:{
        type:String,
        require:true
    }
})

const user = mongoose.model("user",user_scheme)
module.exports=user;