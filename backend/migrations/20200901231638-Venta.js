'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Ventas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nroVenta: {
        type:Sequelize.INTEGER
      },
      fecha: {
        type: Sequelize.DATE
      },
      facturado: {
        type: Sequelize.BOOLEAN
      },
      saldoCobrado: {
        type: Sequelize.BIGINT.UNSIGNED
      },
      montoSinCobrar: {
        type: Sequelize.BIGINT.UNSIGNED
      },
      tipoDePago: {
        type: Sequelize.STRING
      },
      importeTotal:DataTypes.BIGINT.UNSIGNED,
      fechas:{
        type:Sequelize.DataTypes.DATE
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
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Ventas');
  }
};