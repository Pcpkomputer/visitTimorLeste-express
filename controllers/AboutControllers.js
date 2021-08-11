const express = require("express");
const multer = require('multer');
const path = require("path");
const promisify = require("util").promisify
const fs = require("fs");

const {getConnection} = require("../connection/db");

const AboutControllers = express.Router();


AboutControllers.get("/api/about", async(req,res)=>{
    try {
        let connection = await getConnection();

        let [tips] = await connection.query("SELECT * FROM about");

        await connection.release();
        res.json({
            succes:true,
            data:tips
        })
    } catch (error) {
        res.json({
            success:false,
            msg:error.message
        })
    }
})

AboutControllers.get("/api/about/:id", async (req,res)=>{
    try {
        let connection = await getConnection();

        let [tips] = await connection.query("SELECT * FROM about WHERE id_about=?",[req.params.id]);

        await connection.release();
        res.json({
            succes:true,
            data:tips
        })
    } catch (error) {
        res.json({
            success:false,
            msg:error.message
        })
    }
});


AboutControllers.post("/api/about/create", async (req,res)=>{
    try {

        let {
            name,
            content
        } = req.body;

        let connection = await getConnection();

        let insert = connection.query("INSERT INTO about SET ?",[{
            about_title:name,
            content:content
        }])
        
        await connection.release()
        req.flash("message", ["Success creating about...","success"]);
        res.redirect("/about");
    } catch (error) {
        res.json({
            success:false,
            msg:error.message
        })
    }

});

AboutControllers.post("/api/about/delete/:id",async(req,res)=>{
    try {

        let connection = await getConnection();

        await connection.query("DELETE FROM about WHERE id_about=?",[req.params.id]);
        
        await connection.release();
        req.flash("message", ["Success deleting about...","success"]);
        res.redirect("/about");
    } catch (error) {
        res.json({
            success:false,
            msg:error.message
        })
    }
});

AboutControllers.post("/api/about/update/:id",async(req,res)=>{
    try {

        let {
            id,
            name,
            content
        } = req.body;

        let connection = await getConnection();

        let update = await connection.query("UPDATE about SET ? WHERE id_about=?",[{
            about_title:name,
            content:content
        },req.params.id])
        
        await connection.release()
        req.flash("message", ["Success updating about...","success"]);
        res.redirect("/about");
    } catch (error) {
        res.json({
            success:false,
            msg:error.message
        })
    }
})

module.exports = AboutControllers;