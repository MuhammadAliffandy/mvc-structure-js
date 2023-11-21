const { v4: uuidv4 } = require('uuid');

'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize){
    return queryInterface.bulkInsert('cars', [{
      id : uuidv4(),
      name : 'Mobil VW',
      image : 'https://firebasestorage.googleapis.com/v0/b/binar-car-402108.appspot.com/o/car-seed-1697616543758.jpg?alt=media&token=fbd8f719-7387-4415-b852-9da385cb99ad',
      size : 'Large',
      rentPerDay : 400000, 
      createdAt : new Date(),
      updatedAt : new Date(),
      deletedAt:null,
      createdBy: 'superadmin',
      updatedBy: 'superadmin',
      deletedBy: 'superadmin',
    }]);
  },
  async down(queryInterface, Sequelize){
    return queryInterface.bulkDelete('cars', null, {});
  }
};
