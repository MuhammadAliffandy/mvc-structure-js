const { cars } = require('../models/models');
const CarsServices = require('../services/carsServices');

const getListCars = async (req , res) => {
    try {
        const data = await CarsServices.getListCars();
        return res.status(200).json(data);
    } catch (error) {
        return res.status(404).json({
            status: 'FAIL',
            message : error.message
        })
    }
}

const getCars = async (req , res) => {
    
    try {
        const id = req.params['id'];
        const data = await CarsServices.getCars(id);
        return res.status(200).json(data);
    } catch (error) {
        return res.status(404).json({
            status: 'FAIL',
            message : error.message
        })
    }
}

const createCars = async (req , res) => {
    try {
        const payload = req.data;
        const image = req.fileImage;
        const userId = req.user.id;
        const data = await CarsServices.createCars(payload,image,userId);
        return res.status(201).json({
            status : 'OK',
            message : 'cars data has been created',
            data : data,
        });
    } catch (error) {
        return res.status(404).json({
            status: 'FAIL',
            message : error.message
        })
    }
}

const updateCars = async (req , res) => {
    try {
        const payload = req.data;
        const id = req.params['id'];
        
        const data =  await CarsServices.updateCars(id , payload);
    

        return res.status(201).json({
            status : 'OK',
            message : 'cars data has been updated', 
            data : data[1][0].dataValues,
        });
    } catch (error) {
        return res.status(404).json({
            status: 'FAIL',
            message : error.message
        })
    }
}

const deleteCars = async (req , res) => {
    try {
        const deletedById  = req.user.id;
        const id = req.params['id'];
        const data = await CarsServices.deleteCars(id , deletedById );
        return res.status(201).json({
            status : 'OK',
            message : 'cars data has been deleted', 
        });
    } catch (error) {
        return res.status(404).json({
            status: 'FAIL',
            message : error.message
        })
    }
}

const createCarsValidation = async(req , res , next) => {

    if( req.body == null ){
        return res.status(400).json({
            status : "FAIL",
            message : `req body is Undefined , Please check your input ! `
        });
    }

    const body = JSON.parse((req.body.data));

    if( req.file == null ){
        return res.status(400).json({
            status : "FAIL",
            message : `Image is Undefined , Please check your input ! `
        });
    }
    
    const image = req.file.buffer;
    const imageUrl  = await CarsServices.uploadImage(image);

    const requireData = [ 'name' , 'rentPerDay' , 'size'];

    if(Array.isArray(body)){
        const isCheckedData = body.map((car)=> { 
            const currentData = Object.keys(car);
                return currentData.every((key , i)=>{
                    return key === requireData[i];
                })
        })
        if(isCheckedData.indexOf(false) > -1){
            return res.status(400).json({
                status : "FAIL",
                message : `Invalid data structure. Please check your input and must to be ${requireData} `
            });
        }
    }else{

        if(Object.keys(body).length < 3 || Object.keys(body).length > 3  ){

            return res.status(400).json({
                status : "FAIL",
                message : `Invalid data structure. Please check your input  `
            });
        }
        const isChecked = Object.keys(body).every((key , i)=>{
            return key === requireData[i];
        });
        if(!isChecked){
            return res.status(400).json({
                status : "FAIL",
                message : `Invalid data structure. Please check your input and must to be ${requireData} `
            });
        }
    }

    req.data = body ;
    req.fileImage = imageUrl; 

    next();

}

const updateCarsValidation = async(req , res , next) => {

    const id = req.params['id'];
    let body = req.body.data;

    const imageUrl = req.file;

    const requireData = [ 'name' , 'rentPerDay' , 'size'  ];

    const isExisting = await CarsServices.getCars(id);

    if(isExisting === null){
        return res.status(400).json({
            status : "FAIL",
            message : "car not found"
        });
    }
    
    if(body != null){

        body = JSON.parse(req.body.data);
    
        const isChecked = Object.keys(body).map((key)=>{
            return requireData.indexOf(key) ;
        })
    
        if( isChecked.indexOf(-1) > -1 ){
            return res.status(400).json({
                status : "FAIL",
                message : 'Invalid data structure. Please check your input '
            });
        }
    }

    if(imageUrl != null && body != null  ){
        req.data = {...body , image: await CarsServices.uploadImage(imageUrl.buffer) };
    }else if(imageUrl != null && body == null){
        req.data = { image : await CarsServices.uploadImage(imageUrl.buffer) };
    }else if(imageUrl == null && body != null){
        req.data = body;
    }else if(imageUrl == null && body != null){
        req.data = body;
    }

    next();

}

module.exports = {
    getListCars,
    getCars,
    createCars,
    updateCars,
    deleteCars,
    createCarsValidation,
    updateCarsValidation,
}
