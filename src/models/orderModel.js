const mongoose = require("mongoose");
const orderSchema = new mongoose.Schema({
    products:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"products"
    }],
    payment:{},
    buyer:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    },status:{
        type:String,
        default:"Not Process",
        enum:["NOt Process","proceesing","shipped","delivered","Canceled"]
    }
},
{timestamps:true}
);
const Order = mongoose.model("order",orderSchema);
module.exports= Order;