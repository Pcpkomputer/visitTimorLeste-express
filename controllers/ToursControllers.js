const express = require("express");
const multer = require('multer');
const path = require("path");

const ToursControllers = express.Router();

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname,'../static/image/tours'))
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix + "." + file.mimetype.split("/")[1])
    }
  })
  
const upload = multer({storage:storage});


ToursControllers.get("/api/tours", async(req,res)=>{
    res.send("get all tours");
})

ToursControllers.get("/api/tours/:id", async (req,res)=>{
    res.send("get single tours");
});

ToursControllers.post("/api/tours/create", upload.single("image"), async (req,res)=>{
    let {
        category,
        name,
        address,
        website,
        phone,
        description
    } = req.body;
    let imagefilename = req.file.filename;
    req.flash("message", ["Success Creating New Tours...","success"]);
    res.redirect("/tours");
});

ToursControllers.post("/api/tours/delete/:id",async(req,res)=>{
    req.flash("message", ["Success Deleting Tours...","success"]);
    res.redirect("/tours");
});

ToursControllers.post("/api/tours/update/:id",async(req,res)=>{
    req.flash("message", ["Success Updating Tours...","success"]);
    res.redirect("/tours");
})

module.exports = ToursControllers;