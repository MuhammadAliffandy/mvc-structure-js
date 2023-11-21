const fire = require('../../lib/firebase/init')
const{ getStorage, ref, uploadBytes ,getDownloadURL } =  require("firebase/storage");
const CarsRepository = require('../repository/carsRepository');

const getListCars = () => {
    try {
        return CarsRepository.getListCars();
    } catch (error) {
        return error;
    }
}

const getCars = (id) => {
    try {
        return CarsRepository.getCars(id);
    } catch (error) {
        return error;
    }
}

const createCars = (payload, image ,userId) => {
    try {
        return CarsRepository.createCars(payload, image , userId);
    } catch (error) {
        return error;
    }
}

const updateCars = (id, payload) => {
    try {
        return CarsRepository.updateCars(id, payload);
    } catch (error) {
        return error;
    }
}

const deleteCars = (id,deletedById ) => {
    try {
        return CarsRepository.deleteCars(id,deletedById );
    } catch (error) {
        return error;
    }
}

const uploadImage = async (image) => {
    const storage = getStorage(fire);
    const storageRef = ref(storage, `car-seed-${Date.now()}.jpg`);

    try {
        const snapshot = await uploadBytes(storageRef, image);
        try {
            const url = await getDownloadURL(storageRef);
            return url;
        } catch (error) {
            return error;
        }
    } catch (error_1) {
        return error_1;
    }
}

module.exports = {
    getListCars,
    getCars,
    createCars,
    updateCars,
    deleteCars,
    uploadImage,
}