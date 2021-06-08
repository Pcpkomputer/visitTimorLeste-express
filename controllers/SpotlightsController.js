const express = require("express");
const multer = require('multer');
const path = require("path");
const promisify = require("util").promisify
const fs = require("fs");

const {getConnection} = require("../connection/db");


const SpotlightsControllers = express.Router();


SpotlightsControllers.get("/api/spotlights", async(req,res)=>{
    try {
        let connection = await getConnection();
        let [spotlights] = await connection.query("SELECT spotlights.*,tours.name AS toursname FROM spotlights INNER JOIN tours ON spotlights.id_tours=tours.id_tours");
        connection.release();
        res.json(spotlights);
    } catch (error) {
        res.status(400).json({
            success:false,
            error:err.message
        })
    }

})

SpotlightsControllers.get("/api/spotlights/:id", async (req,res)=>{
    try {
        let connection = await getConnection();
        let [spotlights] = await connection.query("SELECT spotlights.*,tours.name AS toursname FROM spotlights INNER JOIN tours ON spotlights.id_tours=tours.id_tours WHERE spotlights.id_spotlights=?",[req.params.id]);
        connection.release();
        res.json(spotlights);
    } catch (error) {
        res.status(400).json({
            success:false,
            error:err.message
        })
    }
});


SpotlightsControllers.post("/api/spotlights/create", async (req,res)=>{
    try {
       let {
           title,
           relatedtours,
           content
       } = req.body;

       const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
       let filename = req.files.image.name + '-' + uniqueSuffix + "." + req.files.image.name.match(/[^\.]+$/)[0];
       req.files.image.mv(path.join(__dirname, `../static/image/spotlights/${filename}`));

       let connection = await getConnection();
       let result = await connection.query("INSERT INTO spotlights VALUES (NULL,?,?,NOW(),?,?)",[
          title,
          relatedtours,
          content,
          filename,
       ]);
       await connection.release();

       req.flash("message", ["Success creating spotlights...","success"]);
       res.redirect("/spotlights");

    } catch (err) {
        res.status(400).json({
            success:false,
            error:err.message
        })
    }
});

SpotlightsControllers.post("/api/spotlights/delete/:id",async(req,res)=>{
    let connection = await getConnection();
    let result = await connection.query("DELETE FROM spotlights WHERE id_spotlights=?",[req.params.id]);
    req.flash("message", ["Success deleting spotlights...","success"]);
    res.redirect("/spotlights");
});

SpotlightsControllers.post("/api/spotlights/update/:id",async(req,res)=>{
    if(req.files){
        
        let conn = await getConnection();
        let previous = await conn.query("SELECT * FROM spotlights WHERE id_spotlights=?",[req.params.id]);
        if(fs.existsSync(path.join(__dirname, `../static/image/spotlights/${previous[0][0].image}`))){
            await promisify(fs.unlink)(path.join(__dirname, `../static/image/spotlights/${previous[0][0].image}`))
        }

        let {
            title,
            relatedtours,
            content
        } = req.body;


        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        let filename = req.files.image.name + '-' + uniqueSuffix + "." + req.files.image.name.match(/[^\.]+$/)[0];
        req.files.image.mv(path.join(__dirname, `../static/image/spotlights/${filename}`));    


        let result = await conn.query("UPDATE spotlights SET ? WHERE id_spotlights=?",[
          {
              spotlights_title:title,
              id_tours:relatedtours,
              spotlights_content:content,
              image:filename
          },
          req.params.id
         ]);


        await conn.release();
        req.flash("message", ["Success updating spotlights...","success"]);
        res.redirect("/spotlights");

    }
    else{
        let conn = await getConnection();
        let {
            title,
            relatedtours,
            content
        } = req.body;
        let result = await conn.query("UPDATE spotlights SET ? WHERE id_spotlights=?",[
            {
                spotlights_title:title,
                id_tours:relatedtours,
                spotlights_content:content,
            },
            req.params.id
           ]);
           
        await conn.release();
        req.flash("message", ["Success updating spotlights...","success"]);
        res.redirect("/spotlights");
    }
})

module.exports = SpotlightsControllers;