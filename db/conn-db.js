const mongoose = require("mongoose");


const connectDB = async(URL)=>{
    try {
        await mongoose.connect(URL);
        console.log('DATABASE CONNECTED')
        
    } catch (error) {
        console.log(error);
    }
}


module.exports = connectDB;