const express = require("express");
const multer = require('multer');
const path = require("path");
const promisify = require("util").promisify
const fs = require("fs");

const {getConnection} = require("../connection/db");
const isAuthenticate = require("../utils/isAuthenticate");

const ToursControllers = express.Router();


ToursControllers.get("/api/tours", async(req,res)=>{
    try{
        let connection = await getConnection();
        let [row,fields] = await connection.execute(`SELECT tours.*, category.category_name 
        FROM tours INNER JOIN category ON category.id_category=tours.id_category`);
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

ToursControllers.get("/api/tours/:id", async (req,res)=>{
    try{
        let connection = await getConnection();
        let [row,fields] = await connection.execute("SELECT * FROM tours WHERE id_tours=?",[req.params.id]);
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

ToursControllers.post("/api/tours/:id/schedule/update", isAuthenticate, async (req,res)=>{
    let {
        time
    } = req.body;

    if(JSON.parse(time).length===0){
        res.redirect("/tours");
    }
    else{
        let connection = await getConnection();
        let q1 = await connection.execute("DELETE FROM schedule WHERE id_tours=?",[req.params.id]);
        
        let payload = JSON.parse(time).map((item,index)=>{
            return [item.days,item.from_time,item.to_time,req.params.id];
        })
    
        let q2 = await connection.query("INSERT INTO schedule VALUES ?",[payload]);
        await connection.release();
    
        req.flash("message", ["Success updating schedule...","success"]);
        res.redirect("/tours");
    }

   
})


ToursControllers.get("/api/tours/:id/schedule", isAuthenticate, async (req,res)=>{
    if(!req.params.id){
        res.status(200).send("Required ID");
    }else{
      try{
        let koneksi = await getConnection();

        let [schedule] = await koneksi.query("SELECT * FROM schedule WHERE id_tours=?",[req.params.id]);
  
        res.json(schedule);
      }
      catch(err){
        res.status(400).json({
            success:false,
            error:err.message
        })
      }
    
      
    }
   
});

ToursControllers.post("/api/tours/create", isAuthenticate, async (req,res)=>{

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
     
        req.files.image.mv(path.join(__dirname, `../static/image/tours/${filename}`),async (err)=>{
            if(err){
                res.status(200).send("There's problem save your image");
            }
            else{
                let connection = await getConnection();
                let [q1] = await connection.query("INSERT INTO tours SET ?",{
                    id_tours:null,
                    id_category:category,
                    name:name,
                    address:address,
                    website:website,
                    phone:phone,
                    description:description,
                    image:filename
                })

                let payloadq2 = JSON.parse(schedule).map((item,_)=>{
                    return [
                        item.days,
                        item.from,
                        item.to,
                        q1.insertId
                    ]
                })

                let [q2] = await connection.query("INSERT INTO schedule (days,from_time,to_time,id_tours) VALUES ?",[payloadq2]);
                await connection.release();
                req.flash("message", ["Success creating tours...","success"]);
                res.redirect("/tours");
            }
        })
      
    }
    else{
        req.flash("message", ["File required...","danger"]);
        res.redirect("/tours");
    }

});

ToursControllers.post("/api/tours/delete/:id", isAuthenticate,async(req,res)=>{
    try{
        let koneksi = await getConnection();

        let result = await koneksi.query("DELETE FROM tours WHERE id_tours=?",[req.params.id]);
  
        req.flash("message", ["Success delete tours...","success"]);
        res.redirect("/tours");
      }
      catch(err){
        res.status(400).json({
            success:false,
            error:err.message
        })
      }
});

ToursControllers.post("/api/tours/update/:id", isAuthenticate,async(req,res)=>{
    if(req.files){
        let {
            category,
            name,
            address,
            website,
            phone,
            description,
        } = req.body;
        let imagefilename = req.files.image.name;


        let conn = await getConnection();
        let previous = await conn.query("SELECT * FROM tours WHERE id_tours=?",[req.params.id]);
        if(fs.existsSync(path.join(__dirname, `../static/image/tours/${previous[0][0].image}`))){
            await promisify(fs.unlink)(path.join(__dirname, `../static/image/tours/${previous[0][0].image}`))
        }


        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        let filename = req.files.image.name + '-' + uniqueSuffix + "." + req.files.image.name.match(/[^\.]+$/)[0];
        req.files.image.mv(path.join(__dirname, `../static/image/tours/${filename}`));    

        let result = await conn.query("UPDATE tours SET ? WHERE id_tours=?",[{
            id_category:category,
            name:name,
            address:address,
            website:website,
            phone:phone,
            description:description,
            image:filename
        },req.params.id]);
        await conn.release();

        req.flash("message", ["Success updating tours...","success"]);
        res.redirect("/tours");
        
    }
    else{
        let {
            category,
            name,
            address,
            website,
            phone,
            description,
        } = req.body;
        
        let conn = await getConnection();
        let result = await conn.query("UPDATE tours SET ? WHERE id_tours=?",[{
            id_category:category,
            name:name,
            address:address,
            website:website,
            phone:phone,
            description:description,
        },req.params.id]);
        await conn.release();
        
        req.flash("message", ["Success updating tours...","success"]);
        res.redirect("/tours");
    }
})

module.exports = ToursControllers;