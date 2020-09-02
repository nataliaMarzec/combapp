'use strict';


module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.bulkInsert('Facturas', [{
    fechaEmision:new Date(),
    tipoComprobante:'Cf',
    nroComprobante:'1234',
    ptoVenta:'Buenos Aires',


    
    createdAt: new Date(),
    updatedAt: new Date(),
    
     }], {});
    
  },

  down: async (queryInterface, Sequelize) => {
  
    
    await queryInterface.bulkDelete('Facturas', null, {});
     
  }
};
