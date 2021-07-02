const express = require("express");
const multer = require('multer');
const path = require("path");
const promisify = require("util").promisify
const fs = require("fs");

const {getConnection} = require("../connection/db");

const HandyTipsControllers = express.Router();


HandyTipsControllers.get("/api/handytips", async(req,res)=>{
    try {
        let connection = await getConnection();

        let [tips] = await connection.query("SELECT * FROM handytips");

        await connection.release();
        res.json({
            success:true,
            data:tips
        })
    } catch (error) {
        res.json({
            success:false,
            msg:error.message
        })
    }
})

HandyTipsControllers.get("/api/handytips/:id", async (req,res)=>{
    try {
        let connection = await getConnection();

        let [tips] = await connection.query("SELECT * FROM handytips WHERE id_handytips=?",[req.params.id]);

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


HandyTipsControllers.post("/api/handytips/create", async (req,res)=>{
    try {

        let {
            name,
            content
        } = req.body;

        let connection = await getConnection();

        let insert = connection.query("INSERT INTO handytips SET ?",[{
            tips_name:name,
            content:content
        }])
        
        await connection.release()
        res.json({
            success:true
        })
    } catch (error) {
        res.json({
            success:false,
            msg:error.message
        })
    }

});

HandyTipsControllers.post("/api/handytips/delete/:id",async(req,res)=>{
    try {

        let connection = await getConnection();

        await connection.query("DELETE FROM handytips WHERE id_handytips=?",[req.params.id]);
        
        await connection.release();
        res.json({
            success:true
        });
    } catch (error) {
        res.json({
            success:false,
            msg:error.message
        })
    }
});

HandyTipsControllers.post("/api/handytips/update/:id",async(req,res)=>{
    try {

        let {
            id,
            name,
            content
        } = req.body;

        let connection = await getConnection();

        let update = await connection.query("UPDATE handytips SET ? WHERE id_handytips=?",[{
            tips_name:name,
            content:content
        },req.params.id])
        
        await connection.release()
        res.json({
            success:true
        })
    } catch (error) {
        res.json({
            success:false,
            msg:error.message
        })
    }
})

module.exports = HandyTipsControllers;