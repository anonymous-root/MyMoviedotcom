const express = require('express');
const app = express();
const auth = require("../middleware/auth");
const screen = require('../model/screen');
const theaterscreen = require('../model/theaterscreen')
const bodyparser = require('body-parser');
const router = new express.Router();
app.use(bodyparser.urlencoded({ extended: false }));

router.get('/getscreen', auth, async (req, res) => {
    try {
        const Screens = await screen.find({ user_id: req.user._id }).populate('user_id');
        if (!Screens) {
            throw new Error("No Record Found !!");
        }
        res.send(Screens);
    }
    catch (err) {
        res.setHeader('content-type', 'application/json');
        res.statusCode = 400;
        res.end(JSON.stringify({ message: err.message }));
    }
})

router.post('/addscreen', async (req, res) => {
    try {
        console.log(req.body);
        const Screens = await new screen(req.body).populate('user_id');
        if (!Screens) {
            throw new Error("Content Is Not Found !!");
        }
        Screens.save();
        res.send(Screens);
    }
    catch (err) {
        res.setHeader('Content-type', 'application/json');
        res.statusCode = 400;
        res.end(JSON.stringify({ message: err.message }));
    }
})

router.delete('/deletescreen/:id', async (req, res) => {
    try {
        const theaters = await theaterscreen.deleteMany({screen_id:req.params.id});
        const Screens = await screen.findByIdAndDelete({ _id: req.params.id }).populate('user_id');
        if (!Screens) {
            throw new Error("No Record Found !!");
        }
        
        res.send(Screens);
    } catch (err) {
        res.setHeader('Content-type', 'application/json');
        res.statusCode = 400;
        res.end(JSON.stringify({ message: err.message }));
    }
});

router.get('/singlescreen/:id', async (req, res) => {
    try {
        const Screens = await screen.findOne({ _id: req.params.id }).populate('user_id');
        if (!Screens) {
            throw new Error("No Record Found !!");
        }
        res.send(Screens);
    }
    catch (err) {
        res.setHeader('content-type', 'application/json');
        res.statusCode = 400;
        res.end(JSON.stringify({ message: err.message }));
    }
})

router.put('/updatescreen/:id', async (req, res) => {
    try {
        const Screens = await screen.findByIdAndUpdate({ _id: req.params.id }, req.body, { new: true }).populate('user_id');
        res.send(Screens);
    } catch (err) {
        console.log(err.message);
        res.setHeader('Content-type', 'application/json');
        res.statusCode = 400;
        res.end(JSON.stringify({ message: err.message }));
    }
});

module.exports = router;