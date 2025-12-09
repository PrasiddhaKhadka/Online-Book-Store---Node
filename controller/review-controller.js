const Review = require('../models/review-model')
const Product = require('../models/product-model')

const createReviews= async(req,res)=>{
res.status(200).json({msg:'success'})

}

const getAllReviews = async(req,res)=>{
    const review = await Review.find({})
    res.status(200).json({msg:'success'})
}


const getSingleReview = async(req,res)=>{
res.status(200).json({msg:'success'})

}

const updateReview = async(req,res)=>{
res.status(200).json({msg:'success'})

}

const deleteReview = async(req,res)=>{
res.status(200).json({msg:'success'})

}


module.exports = {
    createReviews,
    getAllReviews,
    getSingleReview,
    updateReview,
    deleteReview
}