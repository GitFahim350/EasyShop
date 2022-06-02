const mongoose=require('mongoose');
const Orderschema=new mongoose.Schema({
    userId: {type:String, required:true},
    products:[{
        id:{
            type:String,
        },
        title:{
            type:String,
        },
        price:{
            type:Number,
        },
        rating:{
            type: Number,
        },
        image:{
            type:String,
        }
    }]
},
{timestamps:true}
);
module.exports=mongoose.model("orders",Orderschema);

