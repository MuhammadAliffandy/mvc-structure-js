const AuthServices = require('../services/authServices');
const UserServices = require('../services/userServices');

const authorization = (handler) => {
    return async (req,res,next) => {

        const authorizationHeader = req.headers['authorization'];
    
        if ( !authorizationHeader ) {
            return res.status(401).json({ 
                status: 'FAIL',
                message: 'Authorization header is missing '
            });
        }
    
        const token = authorizationHeader.replace('Bearer ', '');
    
        try{
            const decoded = await AuthServices.decodeToken(token);
    
            const now = Math.floor(Date.now() / 1000);
    
            const expTime = decoded.exp;
    
            if ( expTime - now < 60 * 30 ) {
                const newToken = AuthServices.getNewToken(decoded) ;
                res.setHeader('Authorization', `Bearer ${newToken}`);
            }
    
            if( req.user != null ){
                if(req.user.provider === 'google' && req.user.provider === 'facebook'){
                    req.user = req.user._json
                }
            }else{
                const userId = decoded.id;
    
                const user = await UserServices.findUserById(userId);
    
                if(!user){
                    return res.status(403).json({ 
                        status: 'FAIL',
                        message: 'You do not have permission to access this resource.'
                    });            
                }
                req.user = user;
            }
            
            return handler(req , res ,next )
                
        }catch( error ){
            return res.status(401).json({ 
                status:'FAIL',
                message: error.message
            });
        }
        
    }

}

const authorizationToAllUsers = authorization(
    async (req,res,next) =>{
    
            const user = req.user;

            if(user.role != 'admin'  && user.role != 'superadmin' && user.role != 'member'){
                return res.status(403).json({ 
                    status: 'FAIL',
                    message: 'You dont has been permission for this action'
                });    
            }

            next();
        }
    );

const authorizationToResource = authorization(
    async (req,res,next) =>{
    
            const user = req.user;

            if(user.role != 'admin'  && user.role != 'superadmin'){
                return res.status(403).json({ 
                    status: 'FAIL',
                    message: 'You dont has been permission for this action'
                });    
            }

            next();
        }
    );

const authorizationToAdmin = authorization(
    async (req,res,next) =>{
    
            const user = req.user;

            if(user.role != 'superadmin'){
                return res.status(403).json({ 
                    status: 'FAIL',
                    message: 'You dont has been permission for this action'
                });    
            }

            next();
        }
    );

const getCurrentUser = authorization(
        async (req,res)=>{
    
            const userId = req.user.id;
        
            const currentUser = await UserServices.findUserById(userId);
        
            return res.status(200).json({
                status : 'OK',
                message : 'current user data is successfull',
                data : currentUser,    
            })
        }
    );
    
module.exports = {
    authorizationToAdmin,
    authorizationToResource,
    authorizationToAllUsers,
    getCurrentUser,
    
}