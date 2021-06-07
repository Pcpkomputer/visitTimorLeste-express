const express = require("express");
const multer = require('multer');
const path = require("path");
const promisify = require("util").promisify
const fs = require("fs");

const {getConnection} = require("../connection/db");


const SpotlightsControllers = express.Router();


SpotlightsControllers.get("/api/precinct", async(req,res)=>{
    res.send("get all tours");
})

SpotlightsControllers.get("/api/precinct/:id", async (req,res)=>{
    res.send("get single tours");
});

SpotlightsControllers.post("/api/precinct/:id/tours/update", async (req,res)=>{
    res.send("update schedule");
})


SpotlightsControllers.get("/api/precinct/:id/tours", async (req,res)=>{
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

SpotlightsControllers.post("/api/precinct/create", async (req,res)=>{
    res.send("create")

});

SpotlightsControllers.post("/api/precinct/delete/:id",async(req,res)=>{
    console.log(req.params.id);
    res.send("delete");
});

SpotlightsControllers.post("/api/precinct/update/:id",async(req,res)=>{
    if(req.files){
        console.log(req.params.id);
        res.send("update with new image");
    }
    else{
        console.log(req.params.id);
        res.send("update without new image");
    }
})

module.exports = SpotlightsControllers;