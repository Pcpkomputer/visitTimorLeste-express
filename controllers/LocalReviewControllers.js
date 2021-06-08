const express = require("express");
const multer = require('multer');
const path = require("path");
const promisify = require("util").promisify
const fs = require("fs");

const {getConnection} = require("../connection/db");

const LocalReviewControllers = express.Router();


LocalReviewControllers.get("/api/localreview", async(req,res)=>{
    try{
        let connection = await getConnection();
        let [row,fields] = await connection.execute("SELECT * FROM localreview");
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

LocalReviewControllers.get("/api/localreview/:id", async (req,res)=>{
    try{
        let connection = await getConnection();
        let [row,fields] = await connection.execute("SELECT * FROM localreview WHERE id_localreview=?",[req.params.id]);
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


LocalReviewControllers.post("/api/localreview/create", async (req,res)=>{

    // {
    //     relatedtours: '1',
    //     relateduser: '1',
    //     quote: 'asdsad',
    //     whyshouldvisit: 'sadasdsadasd',
    //     specialtip: 'ddd'
    // }
      
    try {
        let {
            relatedtours,
            relateduser,
            quote,
            whyshouldvisit,
            specialtip
        } = req.body;

        let connection = await getConnection();

        let result = await connection.query("INSERT INTO localreview SET ?",[{
            id_tours:relatedtours,
            id_user:relateduser,
            quote:quote,
            whyshouldvisit:whyshouldvisit,
            specialtip:specialtip
        }]);

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

LocalReviewControllers.post("/api/localreview/delete/:id",async(req,res)=>{
    try {
        let connection = await getConnection();
        let result = await connection.query("DELETE FROM localreview WHERE id_localreview=?",[req.params.id]);

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

LocalReviewControllers.post("/api/localreview/update/:id",async(req,res)=>{
    try {
        let {
            relatedtours,
            relateduser,
            quote,
            whyshouldvisit,
            specialtip
        } = req.body;


        let connection = await getConnection();

        let result = await connection.query("UPDATE localreview SET ? WHERE id_localreview=?",[{
            id_tours:relatedtours,
            id_user:relateduser,
            quote:quote,
            whyshouldvisit:whyshouldvisit,
            specialtip:specialtip
        },req.params.id]);

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
})

module.exports = LocalReviewControllers;