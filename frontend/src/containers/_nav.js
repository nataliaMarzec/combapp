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
        to: '/ventas/',
        badge: {
          color: 'info',
          text: 'lista',
        }
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'listado',
        to: '/ventas/lista',
        badge: {
          color: 'info',
          text: 'fecha',
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
        to: '/clientesLista',
        badge: {
          color: 'info',
          text: 'lista',
        }
      },
      

      
    ],
  },
    {
      _tag: 'CSidebarNavDropdown',
      name: 'Articulos',
      route: '/articulos',
      icon: 'cil-puzzle',
  
      _children: [
        {
          _tag: 'CSidebarNavItem',
          name: 'listado',
          to: '/articulos',
          badge: {
            color: 'info',
            text: 'lista',
          }
        },
  
        
      ],
  },


 




 ]

