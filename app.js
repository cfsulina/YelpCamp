var express=require("express"),
    app=express(),
    bodyparser=require("body-parser"),
    mongoose=require("mongoose"),
    flash=require("connect-flash"),
    passport=require("passport"),
    LocalStrategy=require("passport-local"),
    methodOverride=require("method-override"),
    Campground=require("./models/campground"),
    Comment=require("./models/comment"),
    geocoder=require("geocoder"),
    User=require("./models/user"),
    seedDB=require("./seeds")

var commentRoutes=require("./routes/comments"),
    campgroundRoutes=require("./routes/campgrounds"),
    indexRoutes=require("./routes/index");
    
mongoose.connect("mongodb://localhost/yelpcamp");
app.use(bodyparser.urlencoded({extended:true}));
app.set("view engine","ejs");
app.use(express.static(__dirname+"/public"));

app.use(methodOverride("_method"));
app.use(flash());

//seed the database
// seedDB();

//schema setup
//when add new description, remeber to use db.campgrounds.drop() and setup again

// Campground.create(
//     {
//       name:"Granite Hill",
//       image:"http://fwf.punjab.gov.pk/sites/fwf.punjab.gov.pk/files/Camping-Sites.jpg",
//       description:"this is a huge grnite hill, no bathrooms, no water"
        
//     },function(err,campground){
//         if(err){
//             console.log(err);
//         }
//         else{
//             console.log("newly careted campground:");
//             console.log(campground);
//         }
//     });



// var campgrounds=[
//         {name:"12",image:"http://www.nationalparks.nsw.gov.au/~/media/DF58734103EF43669F1005AF8B668209.ashx"},
//         {name:"ad",image:"http://fwf.punjab.gov.pk/sites/fwf.punjab.gov.pk/files/Camping-Sites.jpg"},
//         {name:"df",image:"https://www.eqgroup.com/wp-content/uploads/2016/10/Campground1.jpg"}
//         ]

//passport configuration
app.use(require("express-session")({
    secret:"Once Again Rusty wins cutest dog!",
    resave:false,
    saveUninitialized:false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req,res,next){
   res.locals.currentUser=req.user;
   res.locals.error=req.flash("error");
   res.locals.success=req.flash("success");
   next();
});
app.use(indexRoutes);
app.use(campgroundRoutes);
app.use(commentRoutes);

app.listen(process.env.PORT,process.env.IP,function(){
    console.log("yelp camp has started");
})