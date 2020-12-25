const secret = "movieSystemToken";
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs")
const User = require("../model/user");

const auth = async (req,res,next) => {
    try {
        
        const header= req.headers.authorization
        const errorObj = {
            statusCode: 401
        }
        if(!header){
            errorObj.message = "Authorization required!";
            throw errorObj.message;
        }
        const token = header.replace('Bearer ' ,'');
        const decode = jwt.verify(token, secret);
        console.log("te"+decode.id);
        const user = await User.find({
                _id: decode.id
        }).populate('group_id');
        if(!user) {
            errorObj.message = "Authorization required!";
            throw errorObj;
        }
        console.log(user[0]);
        req.user = user[0];        
        next();
    } catch(error) {
        console.log("Error");
        let errorObj = { statusCode: 401 }
        if(error.name == "JsonWebTokenError") {
            errorObj.message = "Token Malformed";
            return next(errorObj);
        }
        next({ statusCode: 401, message: "Authorization required!" });
    }
}

module.exports = auth