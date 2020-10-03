"use strict";
const { Sequelize, Op, Model } = require("sequelize");
const {Venta,Cliente,Articulo}    = require("./sequelizeConnection");
const usuario = require("./usuario");

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
    ptoVenta: DataTypes.STRING,
    importePago:DataTypes.BIGINT.UNSIGNED,
    // articulo_id: {
    //   type:DataTypes.INTEGER,
    //   allowNull: false,
    //   references: {
    //     model: Articulo,
    //     key: 'id'
    //   },
    
    // }
  
    },

    {
      tableName: "Facturas",
      modelName: "Factura",
    }
  );

  // (Factura.associate = (models) => {
  //   Factura.hasMany(Articulo, {
  //     foreignKey: 'id',
  //     as: 'articulo'
  //   });
  //   Factura.belongsTo(Cliente);
		
  // });
  

  return Factura;
};







   
