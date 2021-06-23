const express = require("express");
const multer = require('multer');
const path = require("path");
const promisify = require("util").promisify
const fs = require("fs");

var jwt = require('jwt-simple');

const {getConnection} = require("../connection/db");

const ExtraControllers = express.Router();

const {secret_key} = require("../env");

ExtraControllers.post("/api/loginaccount", async(req,res)=>{
    try {

        let {
            email:emailbody,
            password:passwordbody
        } = req.body;

        let connection = await getConnection();

        let [exist] = await connection.query("SELECT * FROM account WHERE email=?",[emailbody]);

        if(exist.length>0){

            let {
                email,
                password
            } = exist[0];
            
            if(email===emailbody && password===passwordbody){
                await connection.release();

                let payload = {
                    ...exist[0]
                };

                let token = jwt.encode(payload,secret_key);

                res.json({
                    success:true,
                    token:token,
                    data:payload
                });
            }
            else{
                await connection.release();
                res.json({
                    success:false,
                    msg:"Login failed"
                });
            }
          
        }
        else{
            await connection.release();
            res.json({
                success:false,
                msg:"Account not found"
            });
        }

    } catch (error) {
        res.json({
            success:false,
            msg:error.message
        })
    }
})


ExtraControllers.post("/api/registeraccount", async(req,res)=>{
    try {
        let {
            firstname,
            lastname,
            email,
            password
        } = req.body;
    
        let connection = await getConnection();
    
        let [exist] = await connection.query("SELECT * FROM account WHERE email=?",[email]);
        if(exist.length>0){
            await connection.release();
            res.json({
                success:false,
                msg:"Email already exist"
            })
        }
        else{
    
            let insert = await connection.query("INSERT INTO account SET ?",[{
                first_name:firstname,
                last_name:lastname,
                email:email,
                password:password,
                birthday:null
            }])
    
            await connection.release();
            res.json({
                success:true,
                data:{
                    first_name:firstname,
                    last_name:lastname,
                    email:email,
                    password:password,
                    birthday:null
                }
            })
        }   
        
    } catch (error) {
        res.json({
            success:false,
            msg:error.message
        })
    }
})


ExtraControllers.get("/api/getpromotions/:idcategory",async (req,res)=>{
    let connection = await getConnection();
    
    let [promotions] = await connection.query(`
    SELECT promotions.*, tours.image AS imagetours, tours.*,category.category_name FROM promotions 
    INNER JOIN tours ON tours.id_tours=promotions.id_tours
    INNER JOIN category ON tours.id_category=category.id_category
    WHERE tours.id_category=?
    ;`,[req.params.idcategory])

    await connection.release();
    res.json(promotions);
})

ExtraControllers.get("/api/gettoursprecinct/:idprecinct",async (req,res)=>{
    let connection = await getConnection();

    let [tours] = await connection.query(`SELECT precinct_tours.*,
    tours.*,
    category.category_name
    FROM precinct_tours INNER JOIN tours ON 
    tours.id_tours=precinct_tours.id_tours
    INNER JOIN category ON tours.id_category=category.id_category
    WHERE precinct_tours.id_precinct=?`,[req.params.idprecinct]);

    await connection.release();
    res.json(tours);
})

ExtraControllers.get("/api/getrecommendationbyiduser/:iduser", async(req,res)=>{
    let connection = await getConnection();

    let [recommendation] = await connection.query(`SELECT localreview.*, tours.name AS toursname, 
    tours.image AS toursimage,
    category.category_name, category.id_category,
    user.*
    FROM localreview 
    INNER JOIN tours ON tours.id_tours=localreview.id_tours 
    INNER JOIN category ON category.id_category=tours.id_category
    INNER JOIN user ON user.id_user=localreview.id_user
    WHERE localreview.id_user=?`,[req.params.iduser]);


    await connection.release();
    res.json(recommendation);
})

ExtraControllers.get("/api/getdetailtours/:idtours", async(req,res)=>{
    let connection = await getConnection();

    let [tours] = await connection.query(`
    SELECT tours.*, tours.image as imagetours ,category.* FROM tours INNER JOIN category ON
    category.id_category=tours.id_category WHERE tours.id_tours=?
    `,[req.params.idtours]);

    let [schedule] = await connection.query("SELECT * FROM schedule WHERE id_tours=?",
    [req.params.idtours])

    await connection.release();
    res.send({
        tours:(tours.length>0) ? tours[0]:{},
        schedule:(schedule.length>0) ? schedule:{}
    });
})

module.exports = ExtraControllers;