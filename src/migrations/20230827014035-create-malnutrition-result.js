'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('MalnutritionResults', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      name: {
        type: Sequelize.STRING,
        allowNull: true
      },
      gender: {
        type: Sequelize.BOOLEAN,
        allowNull: false
      },
      agePerMonth: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      birthWeight: {
        type: Sequelize.DOUBLE,
        allowNull: false
      },
      bodyWeight: {
        type: Sequelize.DOUBLE,
        allowNull: false
      },
      birthHeight: {
        type: Sequelize.DOUBLE,
        allowNull: false
      },
      bodyHeight: {
        type: Sequelize.DOUBLE,
        allowNull: false
      },
      isMalnutrition: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      isSaved: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  // eslint-disable-next-line no-unused-vars
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('MalnutritionResults');
  }
};