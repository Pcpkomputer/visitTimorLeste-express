const express = require("express");
const multer = require('multer');
const path = require("path");

const PrecinctControllers = express.Router();


PrecinctControllers.get("/api/precinct", async(req,res)=>{
    res.send("get all tours");
})

PrecinctControllers.get("/api/precinct/:id", async (req,res)=>{
    res.send("get single tours");
});

PrecinctControllers.post("/api/precinct/:id/tours/update", async (req,res)=>{
    res.send("update schedule");
})


PrecinctControllers.get("/api/precinct/:id/tours", async (req,res)=>{
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

PrecinctControllers.post("/api/precinct/create", async (req,res)=>{
    res.send("create")

});

PrecinctControllers.post("/api/precinct/delete/:id",async(req,res)=>{
    console.log(req.params.id);
    res.send("delete");
});

PrecinctControllers.post("/api/precinct/update/:id",async(req,res)=>{
    if(req.files){
        console.log(req.params.id);
        res.send("update with new image");
    }
    else{
        console.log(req.params.id);
        res.send("update without new image");
    }
})

module.exports = PrecinctControllers;