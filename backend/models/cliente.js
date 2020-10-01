"use strict";
const { Sequelize, Op, Model } = require("sequelize");
const {Venta}   = require("./sequelizeConnection")
module.exports = function (sequelize, DataTypes) {
  const Cliente = sequelize.define(
    "Cliente",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      nombre: {
		    type:DataTypes.STRING,
		    allowNull:false,
	     validate: {
		     notNull: {
	     		msg: 'Por favor completa tu nombre'
       }
      }
		},
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
   

  

  };
    

  return Cliente;
};
