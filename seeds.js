var mongoose=require("mongoose");
var Campground=require("./models/campground");
var Comment=require("./models/comment");
var data=[
    {name:"yellostone1",
     image:"http://kids.nationalgeographic.com/content/dam/kids/photos/articles/History/M-Z/YELLOWSTONE%20LAKE.jpg.adapt.945.1.jpg",
     description:"The Ruby’s Inn Campground has eight available! Each tipi can sleep up to eight adults comfortably.The tipi offers no electricity, plumbing or beds, so guests will need their sleeping gear and possibly some camping chairs."
    },
     {name:"yellostone2",
     image:"https://www.nationalparks.org/sites/default/files/styles/wide_2x/public/shutterstock_156538823%20%281%29.jpg?itok=mkEp3peA&timestamp=1471552678",
     description:"Guided ATV rides are a fun and exciting way to explore areas in the lesser known parts of the region. We offer a one-half hour ride, one hour ride and a special sunset ride through the Dixie National Forest to the rim of Bryce Canyon National Park. Call Ruby’s ATV Tours at 435-834-5231 for information and reservations. "
    },
     {name:"yellostone3",
     image:"http://d1njyp8tsu122i.cloudfront.net/wp-content/uploads/Yellowstone-Wildlife-Buffalo-79.jpg",
     description:"Short, yet exciting experience, our one-half hour, one hour and sunset ATV rides wind through ponderosa pine forests to the rim of Bryce Canyon National Park. This guided tour will get your adrenaline pumping, but will also provide you with views of a pristine alpine landscape, Bryce Canyon Rim and fresh clean air."
    }
    
    
    ]
function seedDB(){
 //remove all campgrounds
Campground.remove({},function(err){
    if(err){
      console.log(err);
    }
    console.log("removed campgrounds");
    data.forEach(function(seed){
        Campground.create(seed,function(err,campground){
           if(err) console.log(err)
           else{
            console.log("added a campground");
            //create a comment
            Comment.create(
                           {
                            text:"this place is great, internet, parking",
                            author:"Homer"
                            },function(err,comment){
                               if(err){
                                   console.log(err);
                               }
                               else{
                                   campground.comments.push(comment);
                                   campground.save();
                                   console.log("craete new comment");
                               }
                              
                            })
               }
    })
});

})
}

module.exports=seedDB;
