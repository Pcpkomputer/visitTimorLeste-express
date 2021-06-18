const express = require("express");
const multer = require('multer');
const path = require("path");
const promisify = require("util").promisify
const fs = require("fs");

const {getConnection} = require("../connection/db");


const PromotionsControllers = express.Router();


PromotionsControllers.get("/api/promotions", async(req,res)=>{
    try{
        let connection = await getConnection();
        let [row,fields] = await connection.execute("SELECT * FROM promotions");
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

PromotionsControllers.get("/api/promotions/:id", async (req,res)=>{
    try{
        let connection = await getConnection();
        let [row,fields] = await connection.execute("SELECT * FROM promotions WHERE id_promotions=?",[req.params.id]);
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


PromotionsControllers.post("/api/promotions/create", async (req,res)=>{
   try {

        let {
            name,
            relatedtours,
            fromdate,
            todate,
            description,
            redemptioninstruction,
            termsandconditions,
            disclaimer
        } = req.body;
    
        let connection = await getConnection();

        let query = await connection.query("INSERT INTO promotions SET ?",[{
            promotions_name:name,
            id_tours:relatedtours,
            from_time:fromdate,
            to_time:todate,
            description:description,
            redemptioninstruction:redemptioninstruction,
            termsandconditions:termsandconditions,
            disclaimer:disclaimer

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

PromotionsControllers.post("/api/promotions/delete/:id",async(req,res)=>{
    try {
       

        let connection = await getConnection();


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

PromotionsControllers.post("/api/promotions/update/:id",async(req,res)=>{
    try {
    
        let {
            name,
            relatedtours,
            fromdate,
            todate,
            description,
            redemptioninstruction,
            termsandconditions,
            disclaimer
        } = req.body;

        let connection = await getConnection();

        let query = connection.query("UPDATE promotions SET ? WHERE id_promotions=?",[{
            promotions_name:name,
            id_tours:relatedtours,
            from_time:fromdate,
            to_time:todate,
            description:description,
            redemptioninstruction:redemptioninstruction,
            termsandconditions:termsandconditions,
            disclaimer:disclaimer
        },req.params.id])

        res.send({
            success:true
        });
        
    } catch (err) {
        res.status(400).json({
            success:false,
            error:err.message
        })
    }
    
})

module.exports = PromotionsControllers;