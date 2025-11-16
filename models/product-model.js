const mongoose = require("mongoose");


const ProductSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 10,
        maxlength: 200,
    },
    quantity: {
        type: Number,
        required: true,
        min: 0
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true
    },
    description: {
        type: String,
        required: true,
        minlength: 10,
        maxlength: 2000
    },
    image: {
        type: String,
        required: true
    },
    isDeleted:{
        type: Boolean,
        default: false
    },
    date: {
        type: Date,
        default: Date.now
    }
},
    {
        timestamps: true
    }
)

module.exports = mongoose.model("Product", ProductSchema);

