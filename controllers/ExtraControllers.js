const express = require("express");
const multer = require('multer');
const path = require("path");
const promisify = require("util").promisify
const fs = require("fs");

const {getConnection} = require("../connection/db");

const ExtraControllers = express.Router();

ExtraControllers.get("/api/getpromotions/:idcategory",async (req,res)=>{
    let connection = await getConnection();
    
    let [promotions] = await connection.query(`
    SELECT promotions.*, tours.* FROM promotions 
    INNER JOIN tours ON tours.id_tours=promotions.id_tours
    WHERE tours.id_category=?
    ;`,[req.params.idcategory])

    await connection.release();
    res.json(promotions);
})

ExtraControllers.get("/api/gettoursprecinct/:idprecinct",async (req,res)=>{
    let connection = await getConnection();

    let [tours] = await connection.query(`SELECT precinct_tours.*,
    tours.* 
    FROM precinct_tours INNER JOIN tours ON 
    tours.id_tours=precinct_tours.id_tours
    WHERE precinct_tours.id_precinct=?`,[req.params.idprecinct]);

    await connection.release();
    res.json(tours);
})

ExtraControllers.get("/api/getdetailtours/:idtours", async(req,res)=>{
    let connection = await getConnection();

    let [tours] = await connection.query(`
    SELECT tours.*, tours.image as imagetours ,category.* FROM tours INNER JOIN category ON
    category.id_category=tours.id_category WHERE tours.id_tours=?
    `,[req.params.idtours]);

    let [schedule] = await connection.query("SELECT * FROM schedule WHERE id_tours=?",
    [req.params.idtours])

    await connection.release();
    res.send({
        tours:(tours.length>0) ? tours[0]:{},
        schedule:(schedule.length>0) ? schedule:{}
    });
})

module.exports = ExtraControllers;