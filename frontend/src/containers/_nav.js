import React from 'react'
import CIcon from '@coreui/icons-react'

export default [
 
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Ventas',
    route: '/ventas',
    icon: 'cil-puzzle',

    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'listado',
        to: '/ventas',
        badge: {
          color: 'info',
          text: 'lista',
        }
      },

      {
        _tag: 'CSidebarNavItem',
        name: 'crearVenta',
        to: '/ventas/crearVenta',
        badge: {
          color: 'info',
          text: 'new',
        }
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'borrarVenta',
        to: '/ventas/:id',
        badge: {
          color: 'info',
          text: 'details',
        }
      },
      
    ],
  },


  {
    _tag: 'CSidebarNavDropdown',
    name: 'Facturas',
    route: '/facturas',
    icon: 'cil-puzzle',
    icon: <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon"/>,
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'listado',
        to: '/facturas',
        badge: {
          color: 'info',
          text: 'lista',
        }
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Registrar Venta',
        to: '/facturas/cargarFactura',
        badge: {
          color: 'info',
          text: 'new',
        }
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Detalle de Factura',
        to: '/facturas/:id',
        badge: {
          color: 'info',
          text: 'details',
        }
      },
      
    ],
  },

  {
    _tag: 'CSidebarNavDropdown',
    name: 'Clientes',
    route: '/clientes',
    icon: 'cil-puzzle',

    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'listado',
        to: '/clientes',
        badge: {
          color: 'info',
          text: 'lista',
        }
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Registrar Cliente',
        to: '/clientes/cargarCliente',
        badge: {
          color: 'info',
          text: 'new',
        }
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Detalle de Cliente',
        to: '/clientes/:id',
        badge: {
          color: 'info',
          text: 'details',
        }
      },
      
    ],
  },


 




 ]

