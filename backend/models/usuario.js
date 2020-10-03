"use strict";
const bcrypt = require('bcrypt');
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
      username:{
      type: DataTypes.STRING,
      allowNull: false,
      // unique: {
      //   args: true,
      //   msg: 'Usuario ya existe'
      // }
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
      // hooks: {
      //   beforeValidate: function (usuario) {
      //     if (usuario.changed('password')) {
      //       return bcrypt.hash(usuario.password, 10).then((password) => {
      //         usuario.password = password;
      //       });
      //     }
      //   }
      // }
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
  // Esto verificará si un password sin hash se puede comparar con un password con hash almacenada en la base de datos
  // Usuario.prototype.validPassword = function (password) {
  //   return bcrypt.compareSync(password, this.password);
  // };

  // Compara passwords
  // Usuario.prototype.comparePasswords = function (password, callback) {
  //   bcrypt.compare(password, this.password, (error, isMatch) => {
  //     if (error) {
  //       return callback(error);
  //     }
  //     return callback(null, isMatch);
  //   });
  // };

  // Usuario.prototype.toJSON = function () {
  //   const values = Object.assign({}, this.get());
  //   delete values.password;
  //   return values;
  // };

    

  return Usuario;
};