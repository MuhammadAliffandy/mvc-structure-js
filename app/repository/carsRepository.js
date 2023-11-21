const  { users, cars }  = require('../models/models');
const { v4: uuidv4 } = require('uuid');
const { sequelize } = require('../../db/libs/dbStatus');

const getListCars =  () => {
    return cars.findAll();
}

const getCars = (id ) => {
    return cars.findOne({
        where : {
            id : id,
        },include : [
            { model: users, as: 'createdByUser' , attributes: ['id', 'name' , 'phone', 'address' ,'role'] },
            { model: users, as: 'updatedByUser' , attributes: ['id', 'name' , 'phone', 'address' ,'role'] },
            { model: users, as: 'deletedByUser' , attributes: ['id', 'name' , 'phone', 'address' ,'role'] },
        ],
        attributes: { exclude: ['createdBy,updatedBy,deletedBy'] }
    });
}

const createCars = (payload , image , userId) => {
    const { name, size , rentPerDay } = payload;
    return cars.create({
        id : uuidv4(),
        name : name,
        image : image,
        size : size,
        rentPerDay : rentPerDay, 
        createdAt : new Date(),
        updatedAt : new Date(),
        deletedAt : null,
        createdBy: userId , 
        updatedBy: userId,
        deletedBy: null,
    });

}

const updateCars = (id , payload ) => {
    return cars.update({
        ...payload
    },{
        where : {
            id : id
        },
        returning : true,
    })
};


const deleteCars =  (id ,deletedById ) => {

    sequelize.transaction(async (t) => {
        await cars.update(
            { deletedBy: deletedById },
            {
                where: {
                    id: id,
                },
                transaction: t
            }
        );

        await cars.destroy({
            where: {
                id: id,
            },
            transaction: t
        });

    });



}

module.exports = {
    getListCars,
    getCars,
    createCars,
    updateCars,
    deleteCars
}
