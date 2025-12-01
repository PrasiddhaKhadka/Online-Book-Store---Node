const express = require('express')
const router = express.Router()
const { getAllUsers,
    getUserDetails,
    showMe,
    updateUser,
    updateUserPassword,
    deleteUserAccount} = require('../controller/user-controller')

const { authenticactionMiddleware, authorizePermissions } = require('../middlewares/authentication')


router.get('/', authenticactionMiddleware, authorizePermissions('admin','owner'), getAllUsers)
router.get('/showme',authenticactionMiddleware,showMe)
router.get('/:id',authenticactionMiddleware, getUserDetails)
router.patch('/updateuser',authenticactionMiddleware,updateUser)
router.patch('/updateuserpassword',authenticactionMiddleware, updateUserPassword)
router.delete('/deleteUserAccount',authenticactionMiddleware,deleteUserAccount)        

module.exports = router