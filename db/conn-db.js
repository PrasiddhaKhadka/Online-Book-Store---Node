const mongoose = require("mongoose");


const connectDB = async(URL)=>{
    try {
        await mongoose.connect(URL);
        
    } catch (error) {
        console.log(error);
    }
}


module.exports = connectDB;