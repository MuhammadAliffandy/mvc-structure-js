const UserServices = require('../services/userServices');
const AuthServices = require('../services/authServices');

const getListUsers = async (req , res) => {
    try {
        const data = await UserServices.getListUsers();
        return res.status(200).json(data);
    } catch (error) {
        return res.json({
            status: 'FAIL',
            message : error.message
        })
    }
}

const login = async (req,res) => {
    try{
        const user = req.user;
        const session = req.session;

        const token = await AuthServices.getToken({id : user.id});

        AuthServices.setSession(
            session,
            true,
            token);

        return res.status(200).json({
            status : 'OK',
            message : 'Authentication is successfull',
            token: token,
        });

    }catch(error){
        return res.status(404).json({
                status: 'FAIL',
                message: error.message,
        })      
    }
    
}

const registrationAdmin = async ( req , res ) => {
    try {
        const payload = req.user;
        const  user = await UserServices.createUser(payload);
        
        return res.status(201).json({
            status : 'OK',
            message: 'registration is successfull',
            data: user,
        });
    } catch (error) {
        return res.status(404).json({
            status: 'FAIL',
            message: error.message,
        })
    }
}

const registrationMember = async ( req , res ) => {
    try {
        const payload = req.user;
        const  user = await UserServices.createUserMember(payload);
        
        return res.status(201).json({
            status : 'OK',
            message: 'registration is successfull',
            data: user,
        });
    } catch (error) {
        return res.status(404).json({
            status: 'FAIL',
            message: error.message,
        })
    }
}

const logout = (req,res) => {
    try {
        res.clearCookie('connect.sid');  
        req.logout(function(err) {
            req.session = null
            res.redirect('/')
        });
    } catch (error) {
        return res.status(404).json({
            status: 'FAIL',
            message: error.message,
        })
    }
}

const loginOAuth = async (req, res) => {

    try {
        const user = req.user;

        const token = await AuthServices.getToken({ user : { ...user , role : 'member'}});

        return res.status(200).json({
            status : 'OK',
            message : "Authentication OAuth is successfull",
            token: token,
        })


    } catch (error) {
        return res.status(404).json({
            status: 'FAIL',
            message: error.message,
        })
    }
}

const registrationValidation = async (req, res , next ) => {
    try {
        const {  name, phone , address , email , password  } = req.body;
        
        if(!name || !email || !password ){
            return res.status(400).json({
                status : 'FAIL',
                message : 'Please check your input '
            })
        }
        
        const emailExist = await UserServices.findUserByEmail(email);

        if(emailExist){
            return res.status(400).json({
                status : 'FAIL',
                message : 'Email is Exist, please repeat your input'
            })
        }

        const hashedPass = await AuthServices.encryptUserPassword(password);

        req.user = {
            name : name,
            phone : phone,
            address : address,
            email : email ,
            password : hashedPass, 
        };

        next();

    } catch (error) {
        return res.status(404).json({
            status: 'FAIL',
            message: error.message,
        })
    }
}

const loginValidation = async (req,res,next) => {

    try{
        const user = req.body;

        if(!user.email || !user.password){
            return res.status(400).json({
                status : 'FAIL',
                message: 'please input email & pasword' 
            });
        }
    
        const emailExist = await UserServices.findUserByEmail(user.email);
    
        if(!emailExist){
            return res.status(400).json({
                status : 'FAIL',
                message: 'email is not exist or not correct' 
            });
        }
    
        const checkedPass = await AuthServices.compareUserPassword(user.password , emailExist.password );
    
        if(!checkedPass){
            return res.status(400).json({
                status: 'FAIL',
                message:'password is wrong, please check your input !!'
            })
        }

        const session = req.session;

        if(session.authenticated){

            const tokenChecked = await AuthServices.decodeToken(session.token);
            const userData = await UserServices.findUserById(tokenChecked.id);

            if(user.email == userData.email){
                return res.status(200).json({
                    status : 'OK',
                    message : 'Your account has been authenticated',
                    token: session.token,
                })
            }else{
                session.authenticated = null
                session.token = null
            }
        }

        req.user = emailExist.dataValues;
        
        next()
            
    }catch(error){
        return res.status(404).json({
                status: 'FAIL',
                message: error.message,
        })
    }

}

module.exports = {
    getListUsers,
    login,
    loginOAuth,
    loginValidation,
    registrationAdmin,
    registrationMember,
    registrationValidation,
    logout,
}






