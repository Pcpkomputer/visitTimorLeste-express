const express = require("express");
const multer = require('multer');
const path = require("path");

const ToursControllers = express.Router();


ToursControllers.get("/api/tours", async(req,res)=>{
    res.send("get all tours");
})

ToursControllers.get("/api/tours/:id", async (req,res)=>{
    res.send("get single tours");
});

ToursControllers.post("/api/tours/:id/schedule/update", async (req,res)=>{
    res.send("update schedule");
})


ToursControllers.get("/api/tours/:id/schedule", async (req,res)=>{
    if(!req.params.id){
        res.status(200).send("Required ID");
    }else{
        res.json([
            // {
            //     days:"Sunday",
            //     from:"08:00",
            //     to:"17:00"
            // },
            // {
            //     days:"Monday",
            //     from:"08:00",
            //     to:"17:00"
            // }
        ])
    }
   
});

ToursControllers.post("/api/tours/create", async (req,res)=>{

    if(req.files.image){    
        let {
            category,
            name,
            address,
            website,
            phone,
            description,
            schedule
        } = req.body;
        let imagefilename = req.files.image.name;

        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        let filename = req.files.image.name + '-' + uniqueSuffix + "." + req.files.image.name.match(/[^\.]+$/)[0];
     
        req.files.image.mv(path.join(__dirname, `../static/image/tours/${filename}`),(err)=>{
            if(err){
                res.status(200).send("There's problem save your image");
            }
            else{
                res.send(schedule);
            }
        })
      
    }
    else{
        req.flash("message", ["File required...","danger"]);
        res.redirect("/tours");
    }



});

ToursControllers.post("/api/tours/delete/:id",async(req,res)=>{
    console.log(req.params.id);
    res.send("delete");
});

ToursControllers.post("/api/tours/update/:id",async(req,res)=>{
    if(req.files){
        console.log(req.params.id);
        let {
            category,
            name,
            address,
            website,
            phone,
            description,
            schedule
        } = req.body;
        let imagefilename = req.files.image.name;
        res.send("update with new image");
    }
    else{
        console.log(req.params.id);
        let {
            category,
            name,
            address,
            website,
            phone,
            description,
            schedule
        } = req.body;
        res.send("update without new image");
    }
})

module.exports = ToursControllers;