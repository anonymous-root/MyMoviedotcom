const express = require('express');
const app = express();
const group = require('../model/group');
const bodyparser = require('body-parser');
const router = new express.Router();
app.use(bodyparser.urlencoded({extended:false}));

router.get('/getgroup',async(req,res)=>{
    try{
        const Group =await group.find({});
        res.send(Group);
    }
    catch(error){
        console.log("error");
    }
})

router.post('/addgroup',async(req,res)=>{
    try{
        if(!req.body){
            console.log(req.body);
            res.status(400).send({message:"Content Can not be empty"});
        }
        console.log(req.body);
        const Groups = await new group(req.body);
        Groups.save();
        res.send(Groups);
    }
    catch(error)
    {
        console.log('error'+error);
    }
})

router.delete('/deletegroup/:id',async(req,res) => {
    try{
        const Groups = await group.findByIdAndDelete({_id:req.params.id});
        res.send(Groups);
    }catch(error){
        console.log("Deleted error !!");
    }
});

module.exports = router;