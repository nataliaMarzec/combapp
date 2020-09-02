"use strict";
const { Sequelize, Op, Model } = require("sequelize");
const {Venta}   = require("./sequelizeConnection")
module.exports = function (sequelize, DataTypes) {
  const Cliente = sequelize.define(
    "Cliente",
    {
      nombre: DataTypes.STRING,


      apellido: DataTypes.STRING,


      cuit: DataTypes.BIGINT.UNSIGNED,


      razonSocial: DataTypes.STRING,


      telefono: DataTypes.STRING,


      email: DataTypes.STRING,
    },

    {
      tableName: "Clientes",
      modelName: "Cliente",
    }
  );

  Cliente.associate = (models) => {
   


    //Asociaciones
  

  },
    console.log("SOY CLIENTE:", Cliente === sequelize.models.Cliente);

  return Cliente;
};
