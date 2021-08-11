const express = require("express");
const multer = require('multer');
const path = require("path");
const { getConnection } = require("../connection/db");
const fs = require("fs");
const promisify = require("util").promisify;
const isAuthenticate = require("../utils/isAuthenticate");

const PrecinctControllers = express.Router();


PrecinctControllers.get("/api/precinct", async(req,res)=>{
    try{
        let connection = await getConnection();
        let [row,fields] = await connection.execute("SELECT * FROM precinct");
        await connection.release();
        res.json({
            success:true,
            data:row
        });
    }
    catch(err){
        res.status(400).json({
            success:false,
            error:err.message
        })
    }
})

PrecinctControllers.get("/api/precinct/:id", async (req,res)=>{
    try{
        let connection = await getConnection();
        let [row,fields] = await connection.execute("SELECT * FROM precinct WHERE id_precinct=?",[req.params.id]);
        await connection.release();
        res.json({
            success:true,
            data:row
        });
    }
    catch(err){
        res.status(400).json({
            success:false,
            error:err.message
        })
    }
});

PrecinctControllers.post("/api/precinct/:id/tours/update", isAuthenticate, async (req,res)=>{
    let {
        json
    } = req.body;
    let parsed = JSON.parse(json);

    parsed = parsed.map((val)=>{
        return [
            val.id_precinct,
            val.id_tours
        ]
    })

    let connection = await getConnection();
    let query = await connection.query("DELETE FROM precinct_tours WHERE id_precinct=?",[req.params.id]);
    let query2 = await connection.query("INSERT INTO precinct_tours VALUES ?",[parsed]);

    await connection.release();
    
    req.flash("message", ["Success updating tours...","success"]);
    res.redirect("/precinct");
})


PrecinctControllers.get("/api/precinct/:id/tours", async (req,res)=>{
    if(!req.params.id){
        res.status(200).send("Required ID");
    }else{
        let connection = await getConnection();
        let [list] = await connection.query("SELECT precinct_tours.*,tours.name FROM precinct_tours INNER JOIN tours ON tours.id_tours=precinct_tours.id_tours WHERE id_precinct=?",[req.params.id]);

        await connection.release();
        res.json(list);
    }
   
});

PrecinctControllers.post("/api/precinct/create", isAuthenticate, async (req,res)=>{
    let {   
        name,
        minidescription,
        description,
        relatedtours,
        listtours
    } = req.body;

    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    let filename = req.files.image.name + '-' + uniqueSuffix + "." + req.files.image.name.match(/[^\.]+$/)[0];
    req.files.image.mv(path.join(__dirname, `../static/image/precinct/${filename}`));

    let connection = await getConnection();
    let query = await connection.query("INSERT INTO precinct SET ?",{
        precinct_name:name,
        mini_description:minidescription,
        description:description,
        image:filename
    })


    let insertedid = query[0].insertId;

    let preprocessedlisttours = JSON.parse(listtours).map((item,index)=>{
        return [insertedid,item];
    })

    let insertlisttours = await connection.query("INSERT INTO precinct_tours VALUES ?",[preprocessedlisttours]);

    await connection.release();
    
    req.flash("message", ["Success creating precinct...","success"]);
    res.redirect("/precinct");

});

PrecinctControllers.post("/api/precinct/delete/:id", isAuthenticate,async(req,res)=>{
    let connection = await getConnection();

    let query = connection.query("DELETE FROM precinct WHERE id_precinct=?",[req.params.id]);

    await connection.release();
    
    req.flash("message", ["Success delete precinct...","success"]);
    res.redirect("/precinct");
});

PrecinctControllers.post("/api/precinct/update/:id", isAuthenticate,async(req,res)=>{
    if(req.files){
        let {   
            id,
            name,
            minidescription,
            description,
        } = req.body;

        let connection = await getConnection();

        let previous = await connection.query("SELECT * FROM precinct WHERE id_precinct=?",[req.params.id]);
        if(fs.existsSync(path.join(__dirname, `../static/image/precinct/${previous[0][0].image}`))){
            await promisify(fs.unlink)(path.join(__dirname, `../static/image/precinct/${previous[0][0].image}`))
        }
        
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        let filename = req.files.image.name + '-' + uniqueSuffix + "." + req.files.image.name.match(/[^\.]+$/)[0];
        req.files.image.mv(path.join(__dirname, `../static/image/precinct/${filename}`));    
        

        let query = await connection.query("UPDATE precinct SET ? WHERE id_precinct=?",[{
            precinct_name:name,
            mini_description:minidescription,
            description:description,
            image:filename
        },req.params.id]);

        await connection.release();
        req.flash("message", ["Success update precinct...","success"]);
        res.redirect("/precinct");
    }
    else{
        let {   
            id,
            name,
            minidescription,
            description,
        } = req.body;

        let connection = await getConnection();

        let query = await connection.query("UPDATE precinct SET ? WHERE id_precinct=?",[{
            precinct_name:name,
            mini_description:minidescription,
            description:description
        },req.params.id]);

        await connection.release();
        req.flash("message", ["Success update precinct...","success"]);
        res.redirect("/precinct");
    }
})

module.exports = PrecinctControllers;