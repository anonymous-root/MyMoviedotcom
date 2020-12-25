const express = require('express');
const app = express();
const jwt = require("jsonwebtoken")
const User = require('../model/user');
const bcrypt = require("bcryptjs")
const secret = "movieSystemToken";
const bodyparser = require('body-parser');
const router = new express.Router();
const auth = require("../middleware/auth");
app.use(bodyparser.urlencoded({ extended: false }));

router.get('/login/:email/:password', async (req, res, next) => {
    try {
        let user = await User.findOne({ email: req.params.email, is_active: "1" }).populate("group_id").populate("state_id").populate("city_id");
        // console.log(user)
        const isValid = bcrypt.compareSync(req.params.password, user.password);
        console.log(isValid);
        if (!isValid) {
            throw new Error('BROKEN')
        } else {
            let token = jwt.sign({ id: user._id }, secret);
            res.send({ token: "Bearer " + token, user })
        }
    } catch (err) {
        next(err)
    }
})

router.get('/changepassword/:pass/:newpass', auth, async (req, res) => {
    try {
            const user = await User.findOne({
                _id: req.user._id
            }).populate("group_id").populate("state_id").populate("city_id");

            console.log("userPassword:-"+user.password);
            const isValid = bcrypt.compareSync(req.params.pass, user.password);
            console.log(isValid + req.params.pass);
            if(!isValid){
                throw new Error("Change Password is not found");
            }
                req.body.password = bcrypt.hashSync(req.params.newpass, 10);
                console.log(req.body.password);
                const user1 = await User.findByIdAndUpdate({ _id: req.user._id }, req.body, { new: true }).populate('state_id').populate("city_id").populate("group_id");
                console.log(user1);
                if (!user1) {
                    errorObj.message = "Authorization required!";
                    throw errorObj;
                }
                res.send(user1);
    } catch (err) {
        console.log(err.message);
        res.setHeader('Content-type', 'application/json');
        res.statusCode = 400;
        res.end(JSON.stringify({message: err.message}));
    }
});


module.exports = router;