const mongoose = require("mongoose");
const state = require("./state");
const city_scheme = new mongoose.Schema({
    city_name:{
        type:String,
        require:true
    },
    state_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'state'
    }
    
})

const city = mongoose.model("city",city_scheme)
module.exports=city;