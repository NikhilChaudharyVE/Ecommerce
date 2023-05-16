const mongoose = require("mongoose");
const categoryschema = new mongoose.Schema({
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  name: {
    type: String,
    require: true,
  },
  slug: {
    type: String,
    lowecase: true,
  },updatedAt: {
    type: Date,
    // default: Date.now(),
  }
});
const category = new mongoose.model("category", categoryschema);
module.exports = category;
