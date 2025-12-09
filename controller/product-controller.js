const Product = require('../models/product-model')
const CustomApiError = require('../errors/')

const createProduct = async(req,res)=>{
    req.body.user = req.user.userId
    const product = await Product.create(req.body)
    res.status(200).json({msg:'Success',product:product})
}


const getAllProducts = async(req,res)=>{
    const products = await Product.find({})
    res.status(200).json({msg:'Success',products:products})
}


const getProductDetails = async(req,res)=>{
    res.status(200).json({msg:'GET SINGLE PRODUCT'})
}


const updateProduct = async(req,res)=>{
    const { id } = req.params;
    const product = await Product.findOneAndUpdate({
        _id: id
    },
    req.body,
    {
        runValidators:true,
        new:true
    }
)
    if(!product){
        throw new CustomApiError.NotFound('Product with given id not found!')
    }
    res.status(200).json({ product });
}


const deleteProduct = async(req,res)=>{
res.status(200).json({msg:'DELETE PRODUCTS'})

}

module.exports={
    createProduct,
    getAllProducts,
    getProductDetails,
    updateProduct,
    deleteProduct
}