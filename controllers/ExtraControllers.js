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
    SELECT promotions.*, tours.image AS imagetours, tours.*,category.category_name FROM promotions 
    INNER JOIN tours ON tours.id_tours=promotions.id_tours
    INNER JOIN category ON tours.id_category=category.id_category
    WHERE tours.id_category=?
    ;`,[req.params.idcategory])

    await connection.release();
    res.json(promotions);
})

ExtraControllers.get("/api/gettoursprecinct/:idprecinct",async (req,res)=>{
    let connection = await getConnection();

    let [tours] = await connection.query(`SELECT precinct_tours.*,
    tours.*,
    category.category_name
    FROM precinct_tours INNER JOIN tours ON 
    tours.id_tours=precinct_tours.id_tours
    INNER JOIN category ON tours.id_category=category.id_category
    WHERE precinct_tours.id_precinct=?`,[req.params.idprecinct]);

    await connection.release();
    res.json(tours);
})

ExtraControllers.get("/api/getrecommendationbyiduser/:iduser", async(req,res)=>{
    let connection = await getConnection();

    let [recommendation] = await connection.query(`SELECT localreview.*, tours.name AS toursname, 
    tours.image AS toursimage,
    category.category_name, category.id_category,
    user.*
    FROM localreview 
    INNER JOIN tours ON tours.id_tours=localreview.id_tours 
    INNER JOIN category ON category.id_category=tours.id_category
    INNER JOIN user ON user.id_user=localreview.id_user
    WHERE localreview.id_user=?`,[req.params.iduser]);


    await connection.release();
    res.json(recommendation);
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