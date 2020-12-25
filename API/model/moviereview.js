const mongoose = require("mongoose");
const user = require("./user");
const movie = require("./movietb");
const movieReview_Schema = new mongoose.Schema({
    user_id: {
        type:mongoose.Schema.Types.ObjectId,
        ref:user
    },
    movie_id: {
        type:mongoose.Schema.Types.ObjectId,
        ref:movie
    },
    rate: {
        type: String,
        require: true
    },
    description:{
        type:String,
        require:true
    }
})

const moviereview = mongoose.model("moviereview", movieReview_Schema)
module.exports = moviereview;