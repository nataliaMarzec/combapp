'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
  
    await queryInterface.bulkInsert('Ventas', [{
      nroVenta:1,
      fecha:new Date(),
      facturado:true,
      saldoCobrado:'100',
      montoSinCobrar:'100',
      tipoDePago:'efectivo',


      
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});
    
  },

  down: async (queryInterface, Sequelize) => {
    
    
     await queryInterface.bulkDelete('Ventas', null, {});
     
  }
};
