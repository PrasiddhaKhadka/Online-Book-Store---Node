const express = require('express')
const router = express.Router()

const {   createReviews,
    getAllReviews,
    getSingleReview,
    updateReview,
    deleteReview } = require('../controller/review-controller')



router.post('/',createReviews)
router.get('/',getAllReviews)
router.get('/:id',getSingleReview)
router.patch('/:id',updateReview)
router.delete('/:id',deleteReview)


module.exports = router
