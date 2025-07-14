'use strict';

export default {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable("suppliers", { 
      id: {
        type: Sequelize.INTEGER,
        allowNull: false, 
        primaryKey: true, 
        autoIncrement: true
      },
      cnpj: {
        type: Sequelize.STRING(18),
        unique: true,
        allowNull: false
      },
      name: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      phone: {
        type: Sequelize.STRING(18),
        allowNull: false
      },
      status: {
        type: "enum_companies_status", 
        allowNull: false,
        defaultValue: "active",
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      address_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        Reference: {models: "addresses", key: "id"},  
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
      }
      });
    },

  async down (queryInterface) {
    await queryInterface.dropTable('suppliers');
  }
};