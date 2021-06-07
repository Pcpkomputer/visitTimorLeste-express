const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const nunjucks = require("nunjucks");
var flash = require('connect-flash');
const cookieParser = require("cookie-parser");
const session = require("express-session");
const fileUpload = require('express-fileupload');

const ToursControllers = require("./controllers/ToursControllers");
const PrecinctControllers = require("./controllers/PrecinctControllers");
const CategoryControllers = require("./controllers/CategoryControllers");


const {getConnection} = require("./connection/db");

const app = express();


app.use(cookieParser('keyboard cat'));
app.use(session({ cookie: { maxAge: 60000 }}));
app.use(flash());

app.use(fileUpload());

app.set('views', __dirname + '/views');
app.set('view engine', 'jsx');
app.engine('jsx', require('express-react-views').createEngine());

app.use('/static', express.static(path.join(__dirname, 'static')))

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json());




///// ROUTE TOURS //////
app.use(ToursControllers);
///////////////////////
///// ROUTE PRECINCT //////
app.use(PrecinctControllers);
///////////////////////
///// ROUTE CATEGORY //////
app.use(CategoryControllers);
///////////////////////

app.get("/",async (req,res)=>{
    res.render("Dashboard");
})


app.get("/tours", async(req,res)=>{

    let connection = await getConnection();
    let [category] = await connection.execute("SELECT * FROM category");
    let [tours] = await connection.execute("SELECT tours.*,category.id_category,category.category_name FROM tours INNER JOIN category ON category.id_category=tours.id_category");
    await connection.release();

    console.log(tours);

    let message = req.flash("message");
    res.render("Tours", {message:message[0], class:message[1],category:category,tours:tours});
})

app.get("/category", async(req,res)=>{

    let connection = await getConnection();
    let [category] = await connection.execute("SELECT * FROM category");
    await connection.release();


    let message = req.flash("message");
    res.render("Category", {message:message[0], class:message[1],category:category});
})

app.get("/spotlights", async(req,res)=>{
    let message = req.flash("message");
    res.render("Spotlights", {message:message[0], class:message[1]});
})

app.get("/localreview", async(req,res)=>{
    let message = req.flash("message");
    res.render("LocalReview", {message:message[0], class:message[1]});
})

app.get("/precinct", async(req,res)=>{
    let message = req.flash("message");
    res.render("Precinct", {message:message[0], class:message[1]});
})

app.get("/promotions", async(req,res)=>{
    let message = req.flash("message");
    res.render("Promotions", {message:message[0], class:message[1]});
})

app.get("/user", async(req,res)=>{
    let message = req.flash("message");
    res.render("User", {message:message[0], class:message[1]});
})

const server = app.listen(8000,()=>{
    console.log("listen to 8000");
})
