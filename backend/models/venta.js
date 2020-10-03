"use strict";
const { Sequelize, Op, Model } = require("sequelize");
const { Cliente, Factura } = require("./sequelizeConnection");
module.exports = function (sequelize, DataTypes) {
  const Venta = sequelize.define(
    "Venta",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      nroVenta: DataTypes.BIGINT.UNSIGNED,
      fecha: DataTypes.DATE,
      facturado: DataTypes.BOOLEAN,
      saldoCobrado: DataTypes.BIGINT.UNSIGNED,
      montoSinCobrar: DataTypes.BIGINT.UNSIGNED,
      tipoDePago: DataTypes.STRING,
      importeTotal:DataTypes.BIGINT.UNSIGNED,
      // factura_id: {
      //   type: DataTypes.BIGINT,
      //   allowNull: false,
      //   references: {
      //     model: Factura,
      //     key: 'id'
      //   },
      //   comment: 'facturada'
      // },
      fechas: {
        type: DataTypes.DATE,
        
      //   get() {
      //     return this.getDataValue("fechas").split(";");
      //   },
      //   set(val) {
      //     this.setDataValue("fechas", val.join(";"));
      //   },
      },
    },

    // fechas,pagosDeCliente,articulos
    //       Factura.hasMany(Ventas, {
    // 	  foreignKey: 'factura_id'
    // }),

    // },

    {
      tableName: "Ventas",
      modelName: "Venta",
    }
    
  );
  // (Venta.associate = (models) => {
  //   Venta.belongTo(Cliente)
		
  // });

  return Venta;
};
