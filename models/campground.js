var mongoose=require("mongoose");
var campgoundschema=new mongoose.Schema({
    name:String,
    price:String,
    image:String,
    description:String,
    location:String,
    lat:Number,
    lng:Number,
    // pay attention to the author, originally it has no author, no comment association yet
    author:{
        id:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        },
        username:String
    },
    comments:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Comment"
        }
        ]
});

module.exports=mongoose.model("Campground",campgoundschema);

