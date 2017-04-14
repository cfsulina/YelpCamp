var express=require("express");
var router=express.Router();
var Campground=require("../models/campground");
var middleware=require("../middleware");
var geocoder=require("geocoder");

router.get("/campgrounds",function(req,res){
    
    Campground.find({},function(err,allcampgrounds){
        if(err){
            console.log(err);
        }
        else{
         res.render("campgrounds/index",{campgrounds:allcampgrounds,currentUser:req.user});  
        }
    })
})

router.post("/campgrounds",middleware.isLoggedIn,function(req,res){
   
    //get data from form and add to campgrounds array
    
    // res.send("you hit the post route")
    var name=req.body.name;
    var price=req.body.price;
    var image=req.body.image;
     var desc=req.body.description;
     var author={
         id:req.user._id,
         username:req.user.username
     };
     geocoder.geocode(req.body.location,function(err,data){
         var lat = data.results[0].geometry.location.lat;
         var lng = data.results[0].geometry.location.lng;
         var location = data.results[0].formatted_address;
         var newcampgrounds={name:name,price:price,image:image,description:desc,author:author,location:location,lat:lat,lng:lng};
     
    // create a new campground and save to DB
    Campground.create(newcampgrounds,function(err,newlycreated){
        if(err){
            console.log(err);
        }
        else{
            res.redirect("/campgrounds");
        }
    })
    //this is originally use in campgrounds array;
    // campgrounds.push(newcampgrounds);
    
    //redirect back to campgrounds page
     })
})

//get--new--post
router.get("/campgrounds/new",middleware.isLoggedIn,function(req,res){
    res.render("campgrounds/new");
})

//show-shows more information
router.get("/campgrounds/:id",function(req,res){
    //find the campground with provided ID
    // Campground.findById(req.params.id).populate("comments").exec(function(err,foundcampground){
    Campground.findById(req.params.id).populate("comments").exec(function(err,foundcampground){
        if(err){
            console.log(err);
        }
        else{
            console.log(foundcampground);
             res.render("campgrounds/show",{campground:foundcampground});
        }
    });
//   res.send("show page");
})

//edit campground route
router.get("/campgrounds/:id/edit",middleware.checkCampgroundOwnership,function(req,res){
    //is user logged in ?
      Campground.findById(req.params.id,function(err,foundCampground){
      res.render("campgrounds/edit",{campground:foundCampground});
    });
});

//update campground route
router.put("/campgrounds/:id",middleware.checkCampgroundOwnership,function(req,res){
    //find and update the corret campground and redirect to somewhere
    geocoder.geocode(req.body.location,function(err,data){
        var lat = data.results[0].geometry.location.lat;
        var lng = data.results[0].geometry.location.lng;
        var location = data.results[0].formatted_address;
        var newData = {name: req.body.name, image: req.body.image, description: req.body.description,location: location, lat: lat, lng: lng};
    Campground.findByIdAndUpdate(req.params.id,req.body.campground,function(err,updatedCampground){
        if(err){
            res.redirect("/campgrounds");
        }else{
            res.redirect("/campgrounds/"+req.params.id);
        }
    })
})
})

//destroy campground route
router.delete("/campgrounds/:id",middleware.checkCampgroundOwnership,function(req,res){
    Campground.findByIdAndRemove(req.params.id,function(err){
        if(err){
            res.redirect("/campgrounds");
        }else{
            res.redirect("/campgrounds");
        }
    })
})

module.exports=router;


