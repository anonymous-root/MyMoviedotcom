const express = require('express');
const app = express();
const moviereview = require('../model/moviereview');
const bodyparser = require('body-parser');
const router = new express.Router();
app.use(bodyparser.urlencoded({ extended: false }));

router.get('/getmoviereview', async (req, res) => {
    try {
        const MovieReviews = await moviereview.find({});
        if (!MovieReviews) {
            throw new Error("No Record Found !!");
        }
        res.send(MovieReviews);
    }
    catch (err) {
        res.setHeader('content-type', 'application/json');
        res.statusCode = 400;
        res.end(JSON.stringify({ message: err.message }));
    }
})

router.post('/addmoviereview', async (req, res) => {
    try {
        const MovieReviews = await new moviereview(req.body);
        if (!MovieReviews) {
            throw new Error("Content Is Not Found !!");
        }
        MovieReviews.save();
        res.send(MovieReviews);
    }
    catch (err) {
        res.setHeader('Content-type', 'application/json');
        res.statusCode = 400;
        res.end(JSON.stringify({ message: err.message }));
    }
})

router.delete('/deletemoviereview/:id', async (req, res) => {
    try {
        const MovieReviews = await moviereview.findByIdAndDelete({ _id: req.params.id });
        if (!MovieReviews) {
            throw new Error("No Record Found !!");
        }
        res.send(MovieReviews);
    } catch (err) {
        res.setHeader('Content-type', 'application/json');
        res.statusCode = 400;
        res.end(JSON.stringify({ message: err.message }));
    }
});

router.get('/singlemoviereview/:id', async (req, res) => {
    try {
        const MovieReviews = await moviereview.findOne({ _id: req.params.id });
        if (!MovieReviews) {
            throw new Error("No Record Found !!");
        }
        res.send(MovieReviews);
    }
    catch (err) {
        res.setHeader('content-type', 'application/json');
        res.statusCode = 400;
        res.end(JSON.stringify({ message: err.message }));
    }
})

router.put('/updatemoviereview/:id', async (req, res) => {
    try {
        const MovieReviews = await moviereview.findByIdAndUpdate({ _id: req.params.id }, req.body, { new: true });
        res.send(MovieReviews);
    } catch (err) {
        console.log(err.message);
        res.setHeader('Content-type', 'application/json');
        res.statusCode = 400;
        res.end(JSON.stringify({ message: err.message }));
    }
});

module.exports = router;