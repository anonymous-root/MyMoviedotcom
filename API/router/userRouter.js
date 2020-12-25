const express = require('express');
const app = express();
const auth = require("../middleware/auth");
const multer = require('multer');
const user = require('../model/user');
const state = require('../model/state');
const city = require('../model/city');
const movies = require('../model/movietb');
const bodyparser = require('body-parser');
var path = require('path');
const bcrypt = require("bcryptjs")
app.use(bodyparser.urlencoded({ extended: true }));
const router = express.Router();

router.post('/adduser', async (req, res) => {
    console.log(req.files);
    const { photo1 } = req.files;
    console.log(photo1.name)
    req.body.password = bcrypt.hashSync(req.body.password, 10);
    try {
        // const imagepath = path.join(__dirname, '..', '..','public','images');
        const datenow = Date.now();
        photo1.mv('./public/images/' + datenow + photo1.name)
        req.body.photo = "/images/" + datenow + photo1.name;
        const movies = new user(req.body);
        movies.save();
        res.send(movies)
    }
    catch (err) {
        console.log(err.message)
        return res.send("err")
    }
});

router.get('/getAllUser', async (req, res) => {
    try {
        const movies = await user.find({ group_id: "5fcc4220e862ea35384c7c8e" }).populate("group_id").populate("state_id").populate('city_id');
        res.send(movies)
    }
    catch (err) {
        console.log(err.message)
        return res.send("err")
    }
});

router.get('/getAllTheater', async (req, res) => {
    try {
        const movies = await user.find({ group_id: "5fcc4230e862ea35384c7c8f" }).populate("group_id").populate("state_id").populate('city_id');
        res.send(movies)
    }
    catch (err) {
        return res.send("err")
    }
});

router.put('/updateProfile/:_id', async (req, res) => {
    try {
        console.log(req.body);
        const Users = await user.findOneAndUpdate({ _id: req.params._id }, req.body, { new: true }).populate('state_id').populate("city_id").populate("group_id");
        res.send(Users);
    } catch (err) {
        console.log(err.message);
        res.send(err.message)
    }
});

router.get('/fetchProfile/:id', async (req, res) => {
    try {
        const Users = await user.findById({ _id: req.params.id }).populate('state_id').populate("city_id").populate("group_id");
        res.send(Users);
    } catch (err) {
        console.log(err.message);
        res.send(err.message)
    }
});

router.get('/fetchProfileToken', auth, async (req, res) => {
    try {
        res.send(req.user);
    } catch (err) {
        res.send(err.message);
    }
});


router.get('/fetchDashboradRecord', async (req, res) => {
    try {
        let Users = await user.find({ "group_id": "5fcc4230e862ea35384c7c8f" }).populate('group_id').count();
        let States = await state.find().count();
        let Citys = await city.find().count();
        let Movies = await movies.find().count();
        res.send({ "Theaters": Users, "States": States, "Movies": Movies, "Citys": Citys });
    } catch (err) {
        res.send(err.message)
    }
});

module.exports = router;