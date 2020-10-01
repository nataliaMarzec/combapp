"use strict";
// var bcrypt = require("bcryptjs");
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
      // password: Sequelize.VIRTUAL,
      // password_hash: Sequelize.STRING,
      dni: DataTypes.BIGINT.UNSIGNED,
      esAdministrador:DataTypes.BOOLEAN,
    },

    {
      tableName: "Usuarios",
      modelName: "Usuario",
            //   instanceMethods: {
      //     generateHash(password) {
      //         return bcrypt.hash(password, bcrypt.genSaltSync(8));
      //     },
      //     validPassword(password) {
      //         return bcrypt.compare(password, this.password);
      //     }
      // }
    }
  );

  Usuario.associate = (models) => {
   

  

  };
    

  return Usuario;
};