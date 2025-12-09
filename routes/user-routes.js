const express = require('express')
const router = express.Router()
const { getAllUsers,
    getUserDetails,
    showMe,
    updateUser,
    updateUserPassword } = require('../controller/user-controller')

const { authorizationMiddleware, authorizePermission} = require('../middlewares/authorization-middleware')


router.get('/',authorizationMiddleware,authorizePermission('admin'), getAllUsers)
router.get('/showme',authorizationMiddleware, showMe)
router.get('/:id',authorizationMiddleware, getUserDetails)
router.patch('/updateuser',authorizationMiddleware,updateUser)
router.patch('/updateuserpassword',authorizationMiddleware,updateUserPassword)


module.exports = router