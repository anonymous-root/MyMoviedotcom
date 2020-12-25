const mongoose = require('mongoose');

const theaterscreenschema = new mongoose.Schema({
    user_id:
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    movie_id:
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:'movietb'
    },
    screen_id:
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:'screen'
    },
    screen_time:
    {
        type:String,
        require:true
    },
    start_date:
    {
        type:String,
        require:true
    },
    end_date:
    {
        type:String,
        require:true
    },
    end_time:
    {
        type:String,
        require:true
    }
})

const theaterscreen = mongoose.model("theaterscreen",theaterscreenschema);
module.exports = theaterscreen;