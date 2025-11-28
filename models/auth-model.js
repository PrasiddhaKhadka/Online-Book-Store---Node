const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken')


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
    role:{
        type:String,
        enum:['admin','user'],
        default:'user',
    },
    isVerified:{
        type:Boolean,
        default:false
    }

},{
    timestamps: true
})

AuthSchema.pre('save',async function(){
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt)
})




module.exports = mongoose.model("Auth", AuthSchema);