const express = require("express");
const multer = require('multer');
const path = require("path");
const promisify = require("util").promisify
const fs = require("fs");

const {getConnection} = require("../connection/db");
const isAuthenticate = require("../utils/isAuthenticate");

const UsefulContactControllers = express.Router();


UsefulContactControllers.get("/api/usefulcontact", async(req,res)=>{
    try {
        let connection = await getConnection();

        let [tips] = await connection.query("SELECT * FROM usefulcontact");

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

UsefulContactControllers.get("/api/usefulcontact/:id", async (req,res)=>{
    try {
        let connection = await getConnection();

        let [tips] = await connection.query("SELECT * FROM usefulcontact WHERE id_usefulcontact=?",[req.params.id]);

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


UsefulContactControllers.post("/api/usefulcontact/create", isAuthenticate, async (req,res)=>{
    try {

        let {
            name,
            content
        } = req.body;

        let connection = await getConnection();

        let insert = connection.query("INSERT INTO usefulcontact SET ?",[{
            usefulcontact_name:name,
            content:content
        }])
        
        await connection.release()
        req.flash("message", ["Success creating useful contact...","success"]);
        res.redirect("/usefulcontact");
    } catch (error) {
        res.json({
            success:false,
            msg:error.message
        })
    }

});

UsefulContactControllers.post("/api/usefulcontact/delete/:id", isAuthenticate,async(req,res)=>{
    try {

        let connection = await getConnection();

        await connection.query("DELETE FROM usefulcontact WHERE id_usefulcontact=?",[req.params.id]);
        
        await connection.release();
        req.flash("message", ["Success deleting useful contact...","success"]);
        res.redirect("/usefulcontact");
    } catch (error) {
        res.json({
            success:false,
            msg:error.message
        })
    }
});

UsefulContactControllers.post("/api/usefulcontact/update/:id", isAuthenticate,async(req,res)=>{
    try {

        let {
            id,
            name,
            content
        } = req.body;

        let connection = await getConnection();

        let update = await connection.query("UPDATE usefulcontact SET ? WHERE id_usefulcontact=?",[{
            usefulcontact_name:name,
            content:content
        },req.params.id])
        
        await connection.release()
        req.flash("message", ["Success updating useful contact...","success"]);
        res.redirect("/usefulcontact");
    } catch (error) {
        res.json({
            success:false,
            msg:error.message
        })
    }
})

module.exports = UsefulContactControllers;