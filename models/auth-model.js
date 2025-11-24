const mongoose = require("mongoose");


const AuthSchema = mongoose.Schema({
    username:{
        type: String,
        required: [true, "Please provide a username"],
        minlength: 3,
        maxlength: 20,
    },
    email:{
        type: String,
        required: [true, "Please provide an email"],
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            "Please provide a valid email",
        ],
        unique: true,
    },
    password:{
        type: String,
        required: [true, "Please provide a password"],
        minlength: 8,
    },
    isVerified:{
        type:Boolean,
        default:false
    }

},{
    timestamps: true
})


 

module.exports = mongoose.model("Auth", AuthSchema);