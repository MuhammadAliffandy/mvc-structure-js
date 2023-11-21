const UserRepository = require('../repository/userRepository');

const getListUsers = () => {
    try{
        return UserRepository.getListUsers();
    }catch(error){
        return error;
    }
}


const createUser = (payload) => {
    try{
        return UserRepository.createUser(payload); 
    }catch(error){
        return error;
    }
}

const createUserMember = (payload) => {
    try{
        return UserRepository.createUserMember(payload); 
    }catch(error){
        return error;
    }
}

const findUserByEmail = (email) => {
    try{
        return UserRepository.findUserByEmail(email); 
    }catch(error){
        return error;
    }
}

const findUserById = (id) => {
    try{
        return UserRepository.findUserById(id); 
    }catch(error){
        return error;
    }
}

module.exports = {
    getListUsers,
    createUser,
    createUserMember,
    findUserByEmail,
    findUserById,
}


