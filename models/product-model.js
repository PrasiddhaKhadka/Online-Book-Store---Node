const mongoose = require("mongoose");


const ProductSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 200,
    },
    slug:{
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim:true
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
    image: [{
        type: String,
        required: true
    }],
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

ProductSchema.index({ name : 1 });
ProductSchema.index({ slug : 1 });
ProductSchema.index({ category : 1 });

module.exports = mongoose.model("Product", ProductSchema);

