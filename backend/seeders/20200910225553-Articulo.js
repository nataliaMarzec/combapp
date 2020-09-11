"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Articulos",
      [
        {
          nombre: "remera",
          codigo: 123,
          descripcion: "color rojo",
          precio: 232,

          

          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Articulos", null, {});
  },
};
