const express = require('express')
const router = express.Router()
const { 
    createProduct,
    getAllProducts,
    getProductDetails,
    updateProduct,
    deleteProduct} = require('../controller/product-controller')

const { authorizationMiddleware, authorizePermission} = require('../middlewares/authorization-middleware')


router.get('/',getAllProducts)
router.post('/',authorizationMiddleware,authorizePermission('admin'), createProduct)
router.get('/:id',getProductDetails)
router.patch('/:id',updateProduct)
router.delete('/:id',deleteProduct)


module.exports = router