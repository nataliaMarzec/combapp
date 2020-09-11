const express = require('express')
const routes = new express.Router;
const controllerCliente = require('../controllers/ClienteController');
const controllerVenta = require('../controllers/VentaController');
const controllerFactura = require('../controllers/FacturaController');
const controllerArticulo = require('../controllers/ArticuloController')



routes.post('/clientes',(controllerCliente.create))
routes.get('/clientes/:id',(controllerCliente.getClienteId))
routes.get('/clientes',(controllerCliente.getClientes))
routes.delete('/clientes/:id',(controllerCliente.deleteClienteById))
routes.put('/clientes/:id',controllerCliente.update)



routes.post('/ventas',(controllerVenta.createVenta))
routes.get('/ventas/:id',(controllerVenta.getVentaId))
routes.get('/ventas',(controllerVenta.getVentas))
routes.delete('/ventas/:id',(controllerVenta.deleteVentaById))
routes.put('/ventas/:id',controllerVenta.update)


routes.post('/facturas',(controllerFactura.create))
routes.get('/facturas/:id',(controllerFactura.getFacturaId))
routes.get('/facturas',(controllerFactura.getFacturas))
routes.delete('/facturas/:id',(controllerFactura.deleteFacturaById))
routes.put('/facturas/:id',controllerFactura.update)


routes.post('/articulos',(controllerArticulo.create))
routes.post('/articulos/dos',(controllerArticulo.createArticulo))
routes.get('/articulos/:id',(controllerArticulo.getArticuloId))
routes.get('/articulos',(controllerArticulo.getArticulos))
routes.delete('/articulos/:id',(controllerArticulo.deleteArticuloById))
routes.put('/articulos/:id',controllerArticulo.update)

















































module.exports =routes
