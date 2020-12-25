const mongoose = require("mongoose");
const user = require("./user");
const Screen_Schema = new mongoose.Schema({
    screen_name: {
        type: String,
        require: true
    },
    rows: {
        type: String,
        require: true
    },
    cols: {
        type: String,
        require: true
    },
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    }

})

const screen = mongoose.model("screen", Screen_Schema)
module.exports = screen;