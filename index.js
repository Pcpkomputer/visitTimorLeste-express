const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const nunjucks = require("nunjucks");
var flash = require('connect-flash');
const cookieParser = require("cookie-parser");
const session = require("express-session");

const ToursControllers = require("./controllers/ToursControllers");

const app = express();

app.use(cookieParser('keyboard cat'));
app.use(session({ cookie: { maxAge: 60000 }}));
app.use(flash());

app.set('views', __dirname + '/views');
app.set('view engine', 'jsx');
app.engine('jsx', require('express-react-views').createEngine());

app.use('/static', express.static(path.join(__dirname, 'static')))

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json());




///// ROUTE TOURS //////
app.use(ToursControllers);
///////////////////////

app.get("/",async (req,res)=>{
    res.render("Dashboard");
})


app.get("/tours", async(req,res)=>{

    let message = req.flash("message");
    res.render("Tours", {message:message[0], class:message[1]});
})


const server = app.listen(8000,()=>{
    console.log("listen to 8000");
})
