const express = require('express');
const multer = require('multer');

const storagSetting = require('../util/imageSave');
const authController = require('../controller/authController');

const imageController = require('../controller/imageController');


// Set up storage location for file start from 'backend/view/public/images'
const storage = storagSetting("/userImages");
const router = express.Router();
/// Authorization routes 

router.post('/signup', authController.signup);

router.post('/signin', authController.signin);

router.get('/logout', authController.logout);

router.post('/uploadImage', multer({storage: storage}).single("image"), imageController.uploadImage);

/// Image Work

module.exports = router;