"use strict";
const { Sequelize, Op, Model } = require("sequelize");
const {Venta,Cliente}    = require("./sequelizeConnection")

module.exports = function (sequelize, DataTypes) {
  const Factura = sequelize.define(
    "Factura",
    {
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


  //asociaciones








    console.log("SOY Factura:", Factura === sequelize.models.Factura);

  return Factura;
};






   
