const mongoose = require('mongoose');
const connectDB = async ()=>{

try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log(`MongoDB connected : ${process.env.MONGO_URL}`);
} catch (error) {
    console.log(`mongoose connection with bckend error are : `,error);
}
} 
module.exports = connectDB