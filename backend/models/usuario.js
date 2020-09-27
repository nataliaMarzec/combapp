"use strict";
const { Sequelize, Op, Model } = require("sequelize");
const {Cliente}   = require("./sequelizeConnection")
module.exports = function (sequelize, DataTypes) {
  const Usuario = sequelize.define(
    "Usuario",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      username: {
		    type:DataTypes.STRING,
		    allowNull:false,
		},
      password:{
          type:DataTypes.STRING,
          allowNull:false,
      },
      dni: DataTypes.BIGINT.UNSIGNED,
      
    },

    {
      tableName: "Usuarios",
      modelName: "Usuario",
    }
  );

  Usuario.associate = (models) => {
   

  

  };
    

  return Usuario;
};