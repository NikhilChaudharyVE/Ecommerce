const mongoose = require("mongoose");
const productschema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  // createdAt: {
  //   type: Date,
  //   default: Date.now(),
  // },
  desciption: {
    type: String,
  },
  category:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "category",
  },
  price: {
    type: Number,
  },
photo:{
    data:Buffer,contentType:String
},
shipping:{
    type:Boolean
},
  slug: {
    type: String,
    lowecase: true,
  },
  // updatedAt: {
  //   type: Date,
  
  // },
  quantity:{
    type:Number
  }
},{timestamps:true});
const products = new mongoose.model("products", productschema);
module.exports = products;
