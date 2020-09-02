'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {


      await queryInterface.bulkInsert('Clientes', [{
      nombre: 'Brandon',
      apellido: 'Adam',
      cuit:'27350268263',
      razonSocial:'developer',
      telefono:'2478302010',
      email:'b_adam@gmail.com',
      createdAt: new Date(),
      updatedAt: new Date(),

     }], {});
      
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Clientes', null, {});


  }
};
