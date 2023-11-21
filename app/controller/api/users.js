const express = require('express');
const router = express.Router();
const UsersController = require('../userController');
const UsersAuthController = require('../authController');
const AuthServices = require('../../services/authServices');

router
.get('/',UsersAuthController.authorizationToAdmin , UsersController.getListUsers)
.get('/current-user',UsersAuthController.getCurrentUser)
.post('/register', UsersController.registrationValidation ,UsersController.registrationMember)
.post('/register-admin', UsersAuthController.authorizationToAdmin , UsersController.registrationValidation ,UsersController.registrationAdmin)
.post('/auth',UsersController.loginValidation ,UsersController.login)
.get('/auth/google',AuthServices.googleAuth)
.get('/auth/google/callback',AuthServices.googleAuthCallback, UsersController.loginOAuth)
.get('/auth/facebook',AuthServices.facebookAuth)
.get('/auth/facebook/callback',AuthServices.facebookAuthCallback, UsersController.loginOAuth)
.post('/logout',UsersController.logout)

module.exports = router;