const express = require('express');
const app = express(); 
const cors = require('cors');
const ejs = require('ejs');
const path = require('path')
require('./model/mongoose');
const stateRouter = require('./router/stateRouter');
const cityRouter = require('./router/cityRouter');
const movieRouter = require('./router/movieRouter');
const userRouter = require('./router/userRouter');
const groupRouter = require('./router/groupRouter');
const authService = require('./router/authService');
const screenRouter = require('./router/screenRouter');
const moviereviewRouter = require('./router/moviereviewRouter');
const theaterscreenRouter = require('./router/theaterRouter');
const fileUpload = require('express-fileupload')
app.use(fileUpload())
        app.use(express.json());
        app.use(express.static('./public'));
        app.use(express.static(path.join(__dirname, 'public')));
        console.log(path.join(__dirname));
        app.use(stateRouter);
        app.use(cityRouter);
        app.use(userRouter);
        app.use(movieRouter);
        app.use(groupRouter);
        app.use(authService);
        app.use(screenRouter);
        app.use(moviereviewRouter);
        app.use(theaterscreenRouter);
        app.use(cors());

    app.set('view engine','ejs');
    app.get('/',(req,res)=>{
        res.render('index');
        });

app.listen(3001,() =>{
    console.log("Server is running 3001 !!");
});