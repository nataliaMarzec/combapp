import React from 'react';


import FacturasLista from './componentes/Facturas/FacturasLista.js'
import Factura from './componentes/Facturas/Factura.js'
import CargarFactura from './componentes/Facturas/CargarFactura.js'
import ClientesLista from './componentes/Clientes/ClientesLista.js'
import Cliente from './componentes/Clientes/Cliente.js'
import CargarCliente from './componentes/Clientes/CargarCliente.js'
import ModalBorrarVenta from './componentes/Ventas/ModalBorrarVenta'
import ModalCrearVenta from './componentes/Ventas/ModalCrearVenta'
import ArticulosLista from './componentes/Articulos/ArticulosLista'
import Articulo from './componentes/Articulos/Articulo'
import CargarArticulo from './componentes/Articulos/CargarArticulo'
import EditarArticulo from './componentes/Articulos/EditarArticulo'
import VentasLista from './componentes/Ventas/VentasLista.js'
import EditarVenta from './componentes/Ventas/EditarVenta.js';
import Venta from './componentes/Ventas/Venta'
// import CargarVenta from './componentes/Ventas/CargarVenta'
// import Fecha from './componentes/Ventas/Fecha'
// import VentaFecha from './componentes/Ventas/VentaFecha'

const routes = [
  { path: '/', exact: true, name: 'Home' },

  { path: '/ventas', exact: true,  name: 'ventas', component: VentasLista },
  {path:'/ventas/venta', exact: true,  name: 'venta', component: Venta },
  {path: '/ventas/editarVenta',exact:false,name:'editarVenta',component:EditarVenta},
  // {path: '/ventas/cargarVenta',exact:true,name:'cargarVenta',component:CargarVenta},
  // {path: '/ventas/fecha',exact:true,name:'fecha',component:Fecha},


  { path: '/facturas', exact: true,  name: 'Facturas', component: FacturasLista },
  { path: '/facturas/:id', exact: true, name: 'Factura Detalles', component: Factura },
  { path: '/facturas/cargarFactura', exact: true, name: 'Cargar Factura', component:CargarFactura },


  { path: '/clientes', exact: true,  name: 'Clientes', component: ClientesLista },
  { path: '/clientes/:id', exact: true, name: 'Cliente Detalles', component: Cliente },
  { path: '/clientes/cargarCliente', exact: true, name: 'Cargar Cliente', component:CargarCliente },


  {path: '/articulos', exact: true,  name: 'articulos', component: ArticulosLista },
  {path: '/articulos/editarArticulo',exact:true,name:'editarArticulo',component:EditarArticulo},
  {path: '/articulo/:id', exact:false, name: 'articulo', component: Articulo },
  {path: '/articulos/cargarArticulo', exact:true, name: 'Cargar Articulo', component:CargarArticulo },




];

export default routes;
