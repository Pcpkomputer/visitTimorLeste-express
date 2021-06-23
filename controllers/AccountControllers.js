const express = require("express");
const multer = require('multer');
const path = require("path");
const promisify = require("util").promisify
const fs = require("fs");

const {getConnection} = require("../connection/db");


const AccountControllers = express.Router();

AccountControllers.get("/api/account", async(req,res)=>{
    try{
        let connection = await getConnection();
        let [row,fields] = await connection.execute("SELECT * FROM account");
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

AccountControllers.get("/api/account/:id", async (req,res)=>{
    try{
        let connection = await getConnection();
        let [row,fields] = await connection.execute("SELECT * FROM account WHERE id_account=?",[req.params.id]);
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


AccountControllers.post("/api/account/create", async (req,res)=>{
   try {
        let {
            firstname,
            lastname,
            email,
            password
        } = req.body;

        let connection = await getConnection();

        let [matched] = await connection.query("SELECT * FROM account WHERE email=?",[email]);

        if(matched.length>0){
            await connection.release();
            req.flash("message", ["Duplicate email...","danger"]);
            res.redirect("/account");
        }
        else{
            let query = await connection.query("INSERT INTO account SET ?",[{
                first_name:firstname,
                last_name:lastname,
                email:email,
                password:password,
                birthday:null
            }]);
    
            await connection.release();
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
});

AccountControllers.post("/api/account/delete/:id",async(req,res)=>{
    try {
        let connection = await getConnection();
        let result = connection.query("DELETE FROM account WHERE id_account=?",[req.params.id]);

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

AccountControllers.post("/api/account/update/:id",async(req,res)=>{
    try {
    
        let {
            firstname,
            lastname,
            email,
            password
        } = req.body;

        let connection = await getConnection();

        connection.query("UPDATE account SET ? WHERE id_account=?",[{
            first_name:firstname,
            last_name:lastname,
            email:email,
            password:password
        },req.params.id])
        
        await connection.release();
        res.send({
            success:true
        })

    } catch (err) {
        res.status(400).json({
            success:false,
            error:err.message
        })
    }
    
})

module.exports = AccountControllers;