'use strict'

const Sequelize = require('sequelize');
const ClienteModel=require('./cliente');
const VentaModel=require('./venta');
const FacturaModel = require('./factura');
const ArticuloModel=require('./articulo');









const DBURL='mysql://nat:Combapp_20@localhost:3306/combapp'
let sequelize=new Sequelize(DBURL,{
   operatorsAliases:'false',
    pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

var models={}
models=sequelize
models=Sequelize

const Cliente= ClienteModel(sequelize,Sequelize);
const Venta= VentaModel(sequelize,Sequelize);
const Factura= FacturaModel(sequelize,Sequelize);
const Articulo= ArticuloModel(sequelize,Sequelize)










sequelize.authenticate()
 .then(() => {
   console.log('BD_CONECTADA!!');
 })
 .catch(err => {
   console.error('ERROR,_BD_NO_CONECTADA:', err);
 });



// sequelize.sync({force:true})
sequelize.sync()
  .then(() => {
    console.log(`Base de datos y tablas creadas, modelos sincronizados!`)
    


  
  })





module.exports = {
  sequelize,
  Cliente,
  Venta,
  Factura,
  Articulo


  
};


