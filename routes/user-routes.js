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
router.get('/:id',getUserDetails)
router.patch('/updateuser',updateUser)
router.patch('/updateuserpassword',updateUserPassword)
router.delete('/deleteUserAccount',deleteUserAccount)        

module.exports = router