'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('cars', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false
      },
      name: {
          type: Sequelize.STRING,
          allowNull: false
      },
      image: {
          type: Sequelize.STRING,
          allowNull: false
      },
      size: {
          type: Sequelize.STRING,
          allowNull: false
      },
      rentPerDay: {
          type: Sequelize.INTEGER,
          allowNull: false
      },
      createdAt: {
          type: Sequelize.DATE,
          allowNull: false
      },
      updatedAt: {
          type: Sequelize.DATE,
          allowNull: false
      },
      deletedAt: {
          type: Sequelize.DATE,
      },
      createdBy: {
          type: Sequelize.UUID,
          allowNull: false,
          references: {
            model: 'users',
            key: 'id',
            as: 'createdByUser',
          }
      },
      updatedBy: {
          type: Sequelize.UUID,
          allowNull: false,
          references: {
            model: 'users',
            key: 'id',
            as: 'updatedByUser',
          }
      },
      deletedBy: {
          type: Sequelize.UUID,
          references: {
            model: 'users',
            key: 'id',
            as: 'deletedByUser',
          }
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('cars');
  }
};

