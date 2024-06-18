const express = require('express');
const router = express.Router();
const userController = require('./../controller/user.controller');
const multer = require('multer');
const fs = require('fs');
const validateService = require('../service/validate-service')


const storage = multer.diskStorage({
   destination: function (req, file, cb) {
      cb(null, 'uploads/');
   },
   filename: function (req, file, cb) {
      cb(null, `${Date.now()}-${file.originalname}`);
   }
});

const upload = multer({ storage: storage });

router.post('/users', upload.single('file'), validateService.validateUserData, userController.registerUser);
router.get('/users', validateService.validatePagination, userController.getUsers);
router.get('/users/:id', validateService.validateUserId, userController.getUser);
router.get('/positions', userController.getPositions);
router.get('/token', userController.getToken);
router.post('/seeder', userController.generateInitialUsers);



module.exports = router; 