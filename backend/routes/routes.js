const express = require('express')
const router = new express.Router;
const controllerCliente = require('../controllers/ClienteController');
const controllerVenta = require('../controllers/VentaController');
const controllerFactura = require('../controllers/FacturaController');
const controllerArticulo = require('../controllers/ArticuloController')
const controllerUsuario= require('../controllers/UsuarioController')
// const UserController=require('../controllers/UserController')
router.get('/hola',(req,res)=>res.send('ok'));
router.post('/clientes',(controllerCliente.create))
router.get('/clientes/:id',(controllerCliente.getClienteId))
router.get('/clientes',(controllerCliente.getClientes))
router.delete('/clientes/:id',(controllerCliente.deleteClienteById))
router.put('/clientes',controllerCliente.update)



router.post('/ventas',(controllerVenta.create))
router.get('/ventas/:id',(controllerVenta.getVentaId))
router.get('/ventas',(controllerVenta.getVentas))
router.delete('/ventas/:id',(controllerVenta.deleteVentaById))
router.put('/ventas/',controllerVenta.update)
router.get('/ventas/facturadas',controllerVenta.getVentasFacturadas)
// router.get('/ventas/fecha',controllerVenta.getVentasFecha)
// router.get('ventas/fechas',controllerVenta.getFechas)

router.post('/facturas',(controllerFactura.create))
router.get('/facturas/:id',(controllerFactura.getFacturaId))
router.get('/facturas',(controllerFactura.getFacturas))
router.delete('/facturas/:id',(controllerFactura.deleteFacturaById))
router.put('/facturas/:id',controllerFactura.update)


router.post('/articulos',(controllerArticulo.create))
router.get('/articulos/:id',(controllerArticulo.getArticuloId))
router.get('/articulos',(controllerArticulo.getArticulos))
router.delete('/articulos/:id',(controllerArticulo.deleteArticuloById))
router.put('/articulos/:id',controllerArticulo.update)



router.post('/usuario',(controllerUsuario.create))
router.get('/usuario/:id',(controllerUsuario.getUsuarioId))
router.get('/usuario',(controllerUsuario.getUsuarios))
router.delete('/usuario/:id',(controllerUsuario.deleteUsuarioById))
router.put('/usuario',controllerUsuario.update)



// routes.put('/users/:id', validateUserUpdate, UserController.update);
// router.get('/users/', UserController.index);
// router.get('/user/:id', UserController.index);
// router.delete('/users/:id', UserController.delete);











































module.exports =router
