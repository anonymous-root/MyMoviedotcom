const express = require('express');
const app = express();
const city = require('../model/city');
const state = require('../model/state');
const bodyparser = require('body-parser');
const router = new express.Router();
app.use(bodyparser.urlencoded({entended:false}));

router.get('/getcities',async(req,res)=>{
    try{
        const Cities =await city.find().populate('state_id')
        res.send(Cities);
    }
    catch(error){
        console.log("error");
    }
})

router.post('/addcities',async(req,res)=>{
    try{
        if(!req.body){
            console.log(req.body);
            res.status(400).send({message:"Content Can not be empty"});
        }
        const Cities =await new city(req.body);
        Cities.save();
        res.send(Cities);
    }
    catch(error)
    {
        console.log('error'+error);
    }
})

router.delete('/deletecities/:id',async(req,res) => {
    try{
        console.log(req.params.id);
        const Cities = await city.findByIdAndDelete({_id:req.params.id});
        res.send(Cities);
    }catch(error){
        console.log("Deleted error !!");
    }
});

router.get('/singlecities/:id',async(req,res) => {
    try{
        const Cities = await city.findById({_id:req.params.id});
        res.send(Cities);
    }catch(error){
        console.log("fetch error !!");
    }
});

router.get('/fetchAllStatesBystate_id/:id',async(req,res) => {
    try{
        const Cities = await city.find({state_id:req.params.id});
        res.send(Cities);
    }catch(error){
        console.log("fetch error !!");
    }
});

router.put('/updatecities/:id',async(req,res) => {
    try{
        const Cities = await city.findByIdAndUpdate({_id:req.params.id},req.body,{new:true}).populate('state_id');
        res.send(Cities);
    }catch(error){
        console.log("updated error !!"+error);
    }
});

module.exports = router;