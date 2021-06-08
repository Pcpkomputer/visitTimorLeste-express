const express = require("express");
const multer = require('multer');
const path = require("path");
const promisify = require("util").promisify
const fs = require("fs");

const {getConnection} = require("../connection/db");


const UserControllers = express.Router();


UserControllers.get("/api/user", async(req,res)=>{
    try{
        let connection = await getConnection();
        let [row,fields] = await connection.execute("SELECT * FROM user");
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

UserControllers.get("/api/user/:id", async (req,res)=>{
    try{
        let connection = await getConnection();
        let [row,fields] = await connection.execute("SELECT * FROM user WHERE id_user=?",[req.params.id]);
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


UserControllers.post("/api/user/create", async (req,res)=>{
   try {
        let {
            name,
            type,
            minitype,
            aboutme,
            locals
        } = req.body;
        minitype = JSON.parse(minitype).join(" | ");
        
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        let filename = req.files.image.name + '-' + uniqueSuffix + "." + req.files.image.name.match(/[^\.]+$/)[0];
        req.files.image.mv(path.join(__dirname, `../static/image/user/${filename}`));    

        let connection = await getConnection();
        let result = connection.query("INSERT INTO user SET ?",[{
            name:name,
            type:type,
            minitype:minitype,
            aboutme:aboutme,
            locals:locals,
            avatar:filename
        }])

        await connection.release();
        res.send({
            success:true
        });
   } catch (err) {
        res.status(400).json({
            success:false,
            error:err.message
        })
   }
});

UserControllers.post("/api/user/delete/:id",async(req,res)=>{
    try {
        let connection = await getConnection();
        let result = connection.query("DELETE FROM user WHERE id_user=?",[req.params.id]);

        await connection.release();

        res.json({
            success:true
        })

    } catch (err) {
        res.status(400).json({
            success:false,
            error:err.message
        })
    }
});

UserControllers.post("/api/user/update/:id",async(req,res)=>{
    try {
        if(req.files){
        
            let conn = await getConnection();
            let previous = await conn.query("SELECT * FROM user WHERE id_user=?",[req.params.id]);
            if(fs.existsSync(path.join(__dirname, `../static/image/user/${previous[0][0].image}`))){
                await promisify(fs.unlink)(path.join(__dirname, `../static/image/user/${previous[0][0].image}`))
            }
    
            let {
                name,
                type,
                minitype,
                aboutme,
                locals
            } = req.body;
    
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
            let filename = req.files.image.name + '-' + uniqueSuffix + "." + req.files.image.name.match(/[^\.]+$/)[0];
            req.files.image.mv(path.join(__dirname, `../static/image/user/${filename}`));    
    
            minitype = JSON.parse(minitype).join(" | ");
    
            let result = await conn.query("UPDATE user SET ? WHERE id_user=?",[{
                name:name,
                type:type,
                minitype:minitype,
                aboutme:aboutme,
                locals:locals,
                avatar:filename
            },req.params.id]);
            
            await conn.release();
            res.send({
                success:true
            });
        }
        else{
    
            let conn = await getConnection();
            
            let {
                name,
                type,
                minitype,
                aboutme,
                locals
            } = req.body;
    
            minitype = JSON.parse(minitype).join(" | ");
    
            let result = await conn.query("UPDATE user SET ? WHERE id_user=?",[{
                name:name,
                type:type,
                minitype:minitype,
                aboutme:aboutme,
                locals:locals,
            },req.params.id]);
    
            await conn.release();
            res.send({
                success:true
            });
        }
    } catch (err) {
        res.status(400).json({
            success:false,
            error:err.message
        })
    }
    
})

module.exports = UserControllers;