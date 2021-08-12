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
const SpotlightsControllers = require("./controllers/SpotlightsControllers");
const UserControllers = require("./controllers/UsersControllers");
const LocalReviewControllers = require("./controllers/LocalReviewControllers");
const PromotionsControllers = require("./controllers/PromotionsControllers");
const ExtraControllers = require("./controllers/ExtraControllers");
const AccountControllers = require("./controllers/AccountControllers");
const HandyTipsControllers = require("./controllers/HandyTipsControllers");
const UsefulContactControllers = require("./controllers/UsefulContactControllers");
const AboutControllers = require("./controllers/AboutControllers");

const {getConnection} = require("./connection/db");

const app = express();

app.use(cookieParser('keyboard cat'));
app.use(session());
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
///// ROUTE SPOTLIGHTS //////
app.use(SpotlightsControllers);
///////////////////////
///// ROUTE USER //////
app.use(UserControllers);
///////////////////////
///// ROUTE LOCAL REVIEW //////
app.use(LocalReviewControllers);
///////////////////////
///// ROUTE PROMOTIONS //////
app.use(PromotionsControllers);
///////////////////////
///// ROUTE ACCOUNT //////
app.use(AccountControllers);
///////////////////////
///// ROUTE HANDY TIPS //////
app.use(HandyTipsControllers);
///////////////////////
///// ROUTE USEFUL CONTACT //////
app.use(UsefulContactControllers);
///////////////////////
///// ROUTE ABOUT //////
app.use(AboutControllers);
///////////////////////
///// ROUTE EXTRA //////
app.use(ExtraControllers);
///////////////////////

const isAuthenticate = require("./utils/isAuthenticate");

app.post("/login", async(req,res)=>{

    let {
        email,
        password
    } = req.body;

    let connection = await getConnection();

    let [user] = await connection.query("SELECT * FROM admin WHERE email=?",[email]);

    await connection.release();

    if(user.length===0){
        res.render("Login",{msg:"Account not found"});
    }
    else{
        let credentials = user[0];
        if(credentials.email===email && credentials.password===password){
            req.session.credentials=user[0];
            res.redirect("/");
        }
        else{
            res.render("Login",{msg:"Login failed"})
        }
    }
})

app.get("/logout", async(req,res)=>{
    delete req.session.credentials;
    res.redirect("/login");
})

app.get("/login", async(req,res)=>{
    if(req.session.credentials){
        res.redirect("/");
    }else{
        res.render("Login");
    }
   
})

app.get("/",isAuthenticate,async (req,res)=>{

    let connection = await getConnection();

    let [totaltours] = await connection.query("SELECT COUNT(*) AS totaltours FROM tours;");
    let [totalcategory] = await connection.query("SELECT COUNT(*) AS totalcategory FROM category;");
    let [totalspotlights] = await connection.query("SELECT COUNT(*) AS totalspotlights FROM spotlights;");
    let [totalpromotions] = await connection.query("SELECT COUNT(*) AS totalpromotions FROM promotions;")
    let [totaluser] = await connection.query("SELECT COUNT(*) AS totaluser FROM user;");
    let [totalreview] = await connection.query("SELECT COUNT(*) AS totalreview FROM localreview;")

    await connection.release();

    res.render("Dashboard", {
        totaltours:totaltours[0].totaltours,
        totalcategory:totalcategory[0].totalcategory,
        totalspotlights:totalspotlights[0].totalspotlights,
        totalpromotions:totalpromotions[0].totalpromotions,
        totaluser:totaluser[0].totaluser,
        totalreview:totalreview[0].totalreview
    });
})


app.get("/tours", isAuthenticate, async(req,res)=>{

    let connection = await getConnection();
    let [category] = await connection.execute("SELECT * FROM category");
    let [tours] = await connection.execute("SELECT tours.*,category.id_category,category.category_name FROM tours INNER JOIN category ON category.id_category=tours.id_category");
    await connection.release();

    let message = req.flash("message");
    res.render("Tours", {message:message[0], class:message[1],category:category,tours:tours});
})

app.get("/category", isAuthenticate, async(req,res)=>{

    let connection = await getConnection();
    let [category] = await connection.execute("SELECT * FROM category");
    await connection.release();

    let message = req.flash("message");
    res.render("Category", {message:message[0], class:message[1],category:category});
})

app.get("/spotlights", isAuthenticate, async(req,res)=>{

    let connection = await getConnection();
    let [spotlights] = await connection.execute("SELECT spotlights.*,tours.name AS toursname,tours.id_tours AS id_tours FROM spotlights INNER JOIN tours ON spotlights.id_tours=tours.id_tours");
    let [tours] = await connection.execute("SELECT tours.id_tours,tours.name FROM tours");
    await connection.release();

    let message = req.flash("message");
    res.render("Spotlights", {message:message[0], class:message[1],tours:tours,spotlights:spotlights});
})

app.get("/localreview", isAuthenticate, async(req,res)=>{

    let connection = await getConnection();
    let [tours] = await connection.execute("SELECT tours.id_tours,tours.name FROM tours");
    let [user] = await connection.execute("SELECT user.id_user, user.name FROM user");
    let [localreview] = await connection.execute("SELECT localreview.*,tours.id_tours, tours.name AS toursname,user.id_user, user.name AS username FROM localreview INNER JOIN tours ON tours.id_tours=localreview.id_tours INNER JOIN user ON user.id_user=localreview.id_user;")
   
    await connection.release();

    let message = req.flash("message");
    res.render("LocalReview", {message:message[0], class:message[1],tours:tours,user:user,localreview:localreview});
})

app.get("/precinct", isAuthenticate, async(req,res)=>{

    let connection = await getConnection();
    let [precinct] = await connection.query("SELECT * FROM precinct");
    let [tours] = await connection.query("SELECT * FROM tours");

    await connection.release();

    let message = req.flash("message");
    res.render("Precinct", {message:message[0], class:message[1], tours:tours, precinct:precinct});
})

app.get("/promotions", isAuthenticate, async(req,res)=>{

    let connection = await getConnection();

    let [tours] = await connection.query("SELECT * FROM tours");
    let [promotions] = await connection.query("SELECT promotions.*,tours.name as toursname FROM promotions INNER JOIN tours ON tours.id_tours=promotions.id_tours");

    await connection.release();
    let message = req.flash("message");
    res.render("Promotions", {message:message[0], class:message[1],tours:tours, promotions:promotions});
})

app.get("/account", isAuthenticate,async (req,res)=>{
    let connection = await getConnection();

    let [account] = await connection.query("SELECT * FROM account;");

    await connection.release();
    res.render("Account",{account:account});
})

app.get("/user", isAuthenticate, async(req,res)=>{

    let connection = await getConnection();
    await connection.release();
    
    let [user] = await connection.query("SELECT * FROM user");

    let userpreprocessed = user.map((item,index)=>{

        let splitted = item.minitype.split("|");

        return {
            ...item,
            minitype:splitted
        }
    })

    let message = req.flash("message");
    res.render("User", {message:message[0], class:message[1], user:userpreprocessed});
})

app.get("/handytips",isAuthenticate, async(req,res)=>{

    let connection = await getConnection()

    let [handytips] = await connection.query("SELECT * FROM handytips");

    await connection.release()

    let message = req.flash("message");
    res.render("HandyTips", {message:message[0], class:message[1], handytips:handytips})
})

app.get("/usefulcontact",isAuthenticate, async(req,res)=>{

    let connection = await getConnection()

    let [contact] = await connection.query("SELECT * FROM usefulcontact");

    await connection.release()
    let message = req.flash("message");
    res.render("UsefulContact",{message:message[0], class:message[1], contact:contact})
})

app.get("/about",isAuthenticate,async (req,res)=>{

    let connection = await getConnection();

    let [about] = await connection.query("SELECT * FROM about");

    await connection.release();
    let message = req.flash("message");
    res.render("About",{message:message[0], class:message[1], about:about})
})

const server = app.listen(8000,()=>{
    console.log("listen to 8000");
})

server.on("error",()=>{
    console.log("error happen");
})
