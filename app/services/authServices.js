require('dotenv').config()
const { compare , hash , hashSync} = require('bcrypt');
const { sign , verify } = require('jsonwebtoken');
const passport = require('passport');

const JWT_SECRET = process.env.SECRET_KEY;

const compareUserPassword = (password, plainText) => {
    try{
        const passwordChecked = compare(password , plainText)
        return passwordChecked ;
    }catch(error){
        return error;
    }
}

const encryptUserPassword = (password) => {
    try{
        const passwordChecked = hash( password, 10 );
        return passwordChecked ;
    }catch(error){
        return error;
    }
}

const encryptUserPasswordSync = (password) => {
    try{
        const passwordChecked = hashSync( password, 10 );
        return passwordChecked ;
    }catch(error){
        return error;
    }
}

const getToken = (data) => {
    try{
        return sign( data , JWT_SECRET , { expiresIn : '1h' } );
    }catch(error){
        return error;
    }
}

const getNewToken = (data) => {
    try {
        return sign({...data, exp: now + 60 * 60}, JWT_SECRET)
    } catch (error) {
        
    }
}

const decodeToken = (token) => {
    try{
        return verify(token, JWT_SECRET);
    }catch(error){
        return error;
    }
}

const setSession = (session , authenticated  , token) => {
    session.authenticated = authenticated ;
    session.token = token;
    return session;
} 

const googleAuth = passport.authenticate('google', { scope: ['email','profile'] });

const googleAuthCallback = passport.authenticate('google', { failureRedirect: '/' })

const facebookAuth = passport.authenticate('facebook', { scope: ['email','public_profile'] });

const facebookAuthCallback = passport.authenticate('facebook', { failureRedirect: '/' })

module.exports = {
    compareUserPassword,
    compareUserPassword,
    encryptUserPassword,
    encryptUserPasswordSync,
    getToken,
    getNewToken,
    decodeToken,
    setSession,
    googleAuth,
    googleAuthCallback,
    facebookAuth,
    facebookAuthCallback,
}