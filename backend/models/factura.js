"use strict";
const { Sequelize, Op, Model } = require("sequelize");
const {Venta,Cliente}    = require("./sequelizeConnection")

module.exports = function (sequelize, DataTypes) {
  const Factura = sequelize.define(
    "Factura",
    {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
    fechaEmision: DataTypes.DATE,
    tipoComprobante: DataTypes.STRING,
    nroComprobante: DataTypes.STRING,
    ptoVenta: DataTypes.STRING
    },

    {
      tableName: "Facturas",
      modelName: "Factura",
    }
  );

  (Factura.associate = (models) => {
  

  });
  

  return Factura;
};






   
