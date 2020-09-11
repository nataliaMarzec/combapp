const express = require('express')
const router = new express.Router;
const controllerCliente = require('../controllers/ClienteController');
const controllerVenta = require('../controllers/VentaController');
const controllerFactura = require('../controllers/FacturaController');




router.post('/clientes',(controllerCliente.create))
router.post('/clientes/dos',(controllerCliente.createCliente))
router.get('/clientes/:id',(controllerCliente.getClienteId))
router.get('/clientes',(controllerCliente.getClientes))
router.delete('/clientes/:id',(controllerCliente.deleteClienteById))
// router.put('/clientes/cliente/:id',controllerCliente.updateClienteByID)
router.put('/clientes',controllerCliente.updateCliente)
// router.put('/clientes/',controllerCliente.update)



router.post('/ventas',(controllerVenta.createVenta))
router.get('/ventas/:id',(controllerVenta.getVentaId))
router.get('/ventas',(controllerVenta.getVentas))
router.delete('/ventas/:id',(controllerVenta.deleteVentaById))
router.put('/ventas',controllerVenta.updateVentaById)




router.post('/facturas',(controllerFactura.create))
router.get('/facturas/:id',(controllerFactura.getFacturaId))
router.get('/facturas',(controllerFactura.getFacturas))
router.delete('/facturas/:id',(controllerFactura.deleteFacturaById))
router.put('/facturas',controllerFactura.updateFacturaById)



















































module.exports =router
