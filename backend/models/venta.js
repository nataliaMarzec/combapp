"use strict";
const { Sequelize, Op, Model } = require("sequelize");
const {Cliente}    = require("./sequelizeConnection")
module.exports = function (sequelize, DataTypes) {
  const Venta = sequelize.define(
    "Venta",
    {
      fecha: DataTypes.DATE,


      facturado: DataTypes.BOOLEAN,


      saldoCobrado: DataTypes.BIGINT.UNSIGNED,


      montoSinCobrar: DataTypes.BIGINT.UNSIGNED,


      tipoDePago: DataTypes.STRING,


    },

    {
      tableName: "Ventas",
      modelName: "Venta",
    }
  );


  //asociaciones








    console.log("SOY VENTA:", Venta === sequelize.models.Venta);

  return Venta;
};
