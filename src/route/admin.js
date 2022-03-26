import express from 'express'
import adminController from '../controllers/adminController'
import multer from 'multer'
import path from 'path'
let appRoot = require('app-root-path')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, appRoot + "/src/public/image/")
    },

    // By default, multer removes file extensions so let's add them back
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})

const imageFilter = function (req, file, cb) {
    // Accept images only
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
        req.fileValidationError = 'Only image files are allowed!'
        return cb(new Error('Only image files are allowed!'), false)
    }
    cb(null, true)
}

let upload = multer({ storage: storage, fileFilter: imageFilter })


const router = express.Router()
router.post('/upload-profile-pic', upload.single('profile_pic'), adminController.handleUploadFile)
router.get('/upload', adminController.getUploadFile)
router.post('/upload', adminController.handleUploadFile)

router.post('/create-user', adminController.createUser)
router.post('/delete-user/:id', adminController.deleteUser)
router.post('/update-user/:id', adminController.UpdateUser)
router.get('/update-user/:id', adminController.getUpdateUserPage)




export default router