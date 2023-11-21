const express = require('express');
const router = express.Router();
const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({storage})

const CarsController = require('../carsController');
const UsersAuthController = require('../authController');

router.get('/',UsersAuthController.authorizationToAllUsers, CarsController.getListCars)
.get('/:id', UsersAuthController.authorizationToAllUsers , CarsController.getCars)
.post('/' ,  UsersAuthController.authorizationToResource , upload.single('car-image'), CarsController.createCarsValidation , CarsController.createCars)
.put('/:id', UsersAuthController.authorizationToResource , upload.single('car-image') , CarsController.updateCarsValidation , CarsController.updateCars)
.delete('/:id',UsersAuthController.authorizationToResource, CarsController.deleteCars )

module.exports = router;