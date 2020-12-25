const express = require('express');
const app = express();
const state = require('../model/state');
const city = require('../model/city');
const bodyparser = require('body-parser');
const router = new express.Router();
app.use(bodyparser.urlencoded({extended:false}));

router.get('/getstate',async(req,res)=>{
    try{
        const State =await state.find({});
        res.send(State);
    }
    catch(error){
        console.log("error");
    }
})

router.post('/addstate',async(req,res)=>{
    try{
        if(!req.body){
            console.log(req.body);
            res.status(400).send({message:"Content Can not be empty"});
        }
        const States =await new state(req.body);
        States.save();
        res.send(States);
    }
    catch(error)
    {
        console.log('error'+error);
    }
})

router.delete('/deletestate/:id',async(req,res) => {
    try{
        const City = await city.deleteMany({state_id:req.params.id});
        const States = await state.findByIdAndDelete({_id:req.params.id});
        res.send(States);
    }catch(error){
        console.log("Deleted error !!");
    }
});

router.get('/singlestate/:id',async(req,res) => {
    try{
        const States = await state.findById({_id:req.params.id});
        res.send(States);
    }catch(error){
        console.log("fetch error !!");
    }
});

router.put('/updatestate/:id',async(req,res) => {
    try{
        const States = await state.findByIdAndUpdate({_id:req.params.id},req.body,{new:true});
        res.send(States);
    }catch(error){
        console.log("updated error !!"+error);
    }
});

module.exports = router;