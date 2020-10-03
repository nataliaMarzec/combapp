"use strict";
const { Sequelize, Op, Model } = require("sequelize");
const { Venta } = require("./sequelizeConnection");
module.exports = function (sequelize, DataTypes) {
  const Cliente = sequelize.define(
    "Cliente",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      nombre: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Por favor completa tu nombre",
          },
        },
      },
      apellido: DataTypes.STRING,
      cuit: DataTypes.BIGINT.UNSIGNED,
      razonSocial: DataTypes.STRING,
      telefono: DataTypes.STRING,
      email: DataTypes.STRING,
      // ventas: {
      //   type: DataTypes.INTEGER,
      //   allowNull: false,
      //   references: {
      //     model: Venta,
      //     key: "id",
      //   },
      // },
    },

    {
      tableName: "Clientes",
      modelName: "Cliente",
    }
  );

  // Cliente.associate = (models) => {
  //   Cliente.hasMany(Venta, {
  //     foreignKey: "id",
  //     as: "venta",
  //   });
  // };

  return Cliente;
};
