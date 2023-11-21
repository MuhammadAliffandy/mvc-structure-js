'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.cars, { foreignKey: 'createdBy', as: 'createdCars', sourceKey : 'id' });
      User.hasMany(models.cars, { foreignKey: 'updatedBy', as: 'updatedCars', sourceKey : 'id' });
      User.hasMany(models.cars, { foreignKey: 'deletedBy', as: 'deletedCars', sourceKey : 'id'});
    }
  }
  User.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
    },
    name: DataTypes.STRING,
    phone: DataTypes.STRING,
    address: DataTypes.STRING,
    role: DataTypes.ENUM('member', 'admin', 'superadmin'),
    email: {
      type : DataTypes.STRING,
      unique: true
    },
    password: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'users',
  });

  
  return User;
};