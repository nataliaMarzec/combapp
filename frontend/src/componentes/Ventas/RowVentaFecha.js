import React from 'react';

class RowVentaFecha extends React.Component {

    constructor(props) {
        super(props);
        this.selectVenta = this.selectVenta.bind(this);
    }
    
    selectVenta() {
        this.props.selector(this.props.venta)
    }

  

    render() {      
        return(
            <tr key={this.props.venta.id}>
              <td>{this.props.venta.nroVenta}</td>
              <td>{this.props.venta.saldoCobrado}</td>
              <td>
             </td>

          </tr>)
       }
 
}

  export default RowVentaFecha