const mongoose = require("mongoose");


const categorySchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    slug:{
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    description: {
        type: String
    },
    parent:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        default: null
    },
     isDeleted: {
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

module.exports = mongoose.model("Category", categorySchema);