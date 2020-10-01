'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Usuarios', [{
      username:'b_adam@gmail.com',
      password:'badam123',
      dni:'38111324',
      esAdministrador:true,
      createdAt: new Date(),
      updatedAt: new Date(),

     }], {});
      
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Usuarios', null, {});


  }
};
