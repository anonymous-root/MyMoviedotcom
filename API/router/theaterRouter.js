const express = require('express');
const app = express();
const tscreen = require('../model/theaterscreen');
const bodyparser = require('body-parser');
const router = new express.Router();
app.use(bodyparser.urlencoded({extended:false}));

router.get('/gettscreen',async(req,res)=>{
    try{
        const Tscreen =await tscreen.find({}).populate('user_id').populate('movie_id').populate('screen_id');
        console.log(Tscreen)
        res.send(Tscreen);
    }
    catch(error){
        res.setHeader('content-type', 'application/json');
        res.statusCode = 400;
        res.end(JSON.stringify({ message: error.message }));
    }
})

router.post('/addtscreen',async(req,res)=>{

    try{
        console.log(req.body);
        if(!req.body){
            console.log(req.body);
            res.status(400).send({message:"Content Can not be empty"});
        }
        const Tscreens =await new tscreen(req.body);
        Tscreens.save();
        res.send(Tscreens);
    }
    catch(error)
    {
        console.log('error'+error);
    }
})

router.delete('/deletetscreen/:id',async(req,res) => {
    try{
        const Tscreens = await tscreen.findByIdAndDelete({_id:req.params.id});
        await res.send(Tscreens);
    }catch(error){
        res.setHeader('Content-type', 'application/json');
        res.statusCode = 400;
        res.end(JSON.stringify({ message: error.message }));
    }
});

router.get('/singletscreen/:id',async(req,res) => {
    try{
        const Tscreens = await tscreen.findById({_id:req.params.id});
        res.send(Tscreens);
    }catch(error){
        console.log("fetch error !!");
    }
});

router.put('/updatetscreen/:id',async(req,res) => {
    try{
        const Tscreen = await tscreen.findByIdAndUpdate({_id:req.params.id},req.body,{new:true});
        res.send(Tscreen);
    }catch(error){
        console.log("updated error !!"+error);
    }
});

module.exports = router;