const express = require("express");
const multer = require('multer');
const path = require("path");
const promisify = require("util").promisify
const fs = require("fs");

const {getConnection} = require("../connection/db");
const isAuthenticate = require("../utils/isAuthenticate");

const CategoryControllers = express.Router();

CategoryControllers.get("/api/category", async(req,res)=>{
    try{
        let connection = await getConnection();
        let [row,fields] = await connection.execute("SELECT * FROM category");
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

CategoryControllers.get("/api/category/:id", async (req,res)=>{
    try{
        let connection = await getConnection();
        let [row,fields] = await connection.execute("SELECT * FROM category WHERE id_category=?",[req.params.id]);
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



CategoryControllers.post("/api/category/create", isAuthenticate, async (req,res)=>{
    try{

        let {
            name
        } = req.body;

        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        let filename = req.files.image.name + '-' + uniqueSuffix + "." + req.files.image.name.match(/[^\.]+$/)[0];
        req.files.image.mv(path.join(__dirname, `../static/image/category/${filename}`));

        let connection = await getConnection();
        let result = await connection.execute("INSERT INTO category VALUES (NULL,?,?)",[name,filename]);
        await connection.release();
        
        req.flash("message", ["Success creating category...","success"]);
        res.redirect("/category");
    }
    catch(err){
        res.status(400).json({
            success:false,
            error:err.message
        })
    }
    
});

CategoryControllers.post("/api/category/delete/:id", isAuthenticate,async(req,res)=>{
    try{

        let connection = await getConnection();
        let result = await connection.execute("DELETE FROM category WHERE id_category=?",[req.params.id]);
        await connection.release();
        
        req.flash("message", ["Success deleting category...","success"]);
        res.redirect("/category");
    }
    catch(err){
        res.status(400).json({
            success:false,
            error:err.message
        })
    }
});

CategoryControllers.post("/api/category/update/:id", isAuthenticate,async(req,res)=>{
    try{
        if(req.files){
            let conn = await getConnection();
            let previous = await conn.query("SELECT * FROM category WHERE id_category=?",[req.params.id]);
            if(fs.existsSync(path.join(__dirname, `../static/image/category/${previous[0][0].image}`))){
                await promisify(fs.unlink)(path.join(__dirname, `../static/image/category/${previous[0][0].image}`))
            }

            let {
                name
            } = req.body;
    
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
            let filename = req.files.image.name + '-' + uniqueSuffix + "." + req.files.image.name.match(/[^\.]+$/)[0];
            req.files.image.mv(path.join(__dirname, `../static/image/category/${filename}`));    

            let result = await conn.query("UPDATE category SET ? WHERE id_category=?",[{category_name:name,image:filename},req.params.id]);
            await conn.release();
            
            req.flash("message", ["Success updating category...","success"]);
            res.redirect("/category");
        }
        else{
            let conn = await getConnection();

            let {
                name
            } = req.body;
    
            let result = await conn.query("UPDATE category SET ? WHERE id_category=?",[{category_name:name},req.params.id]);

            await conn.release();
            
            req.flash("message", ["Success updating category...","success"]);
            res.redirect("/category");
        }
    }
    catch(err){
        res.status(400).json({
            success:false,
            error:err.message
        })
    }
})

module.exports = CategoryControllers;