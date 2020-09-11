import React from 'react';

import VentasLista from './componentes/Ventas/VentasLista.js'
import FacturasLista from './componentes/Facturas/FacturasLista.js'
import Factura from './componentes/Facturas/Factura.js'
import CargarFactura from './componentes/Facturas/CargarFactura.js'
import ClientesLista from './componentes/Clientes/ClientesLista.js'
import Cliente from './componentes/Clientes/Cliente.js'
import CargarCliente from './componentes/Clientes/CargarCliente.js'
import ModalBorrarVenta from './componentes/Ventas/ModalBorrarVenta'
import ModalCrearVenta from './componentes/Ventas/ModalCrearVenta'



const routes = [
  { path: '/', exact: true, name: 'Home' },

  { path: '/ventas', exact: true,  name: 'Ventas', component: VentasLista },

  { path: '/facturas', exact: true,  name: 'Facturas', component: FacturasLista },
  { path: '/facturas/:id', exact: true, name: 'Factura Detalles', component: Factura },
  { path: '/facturas/cargarFactura', exact: true, name: 'Cargar Factura', component:CargarFactura },

  { path: '/clientes', exact: true,  name: 'Clientes', component: ClientesLista },
  { path: '/clientes/:id', exact: true, name: 'Cliente Detalles', component: Cliente },
  { path: '/clientes/cargarCliente', exact: true, name: 'Cargar Cliente', component:CargarCliente },

  {path: 'ventas/:id',exact:true,name:'borrarVenta',component:ModalBorrarVenta},
  {path:'ventas/crearVenta',exact:true,name:'crearVenta',component:ModalCrearVenta}





];

export default routes;
