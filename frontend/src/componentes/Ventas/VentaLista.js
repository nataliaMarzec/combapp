import React from 'react';
import RowVenta from './RowVenta';
import Modificar from './Modificar';


class VentaLista extends React.Component {

    constructor(props) {
      super(props);
      this.state = { ventas: [], selected:{}}
      this.select = this.select.bind(this);
      this.ventaChange = this.ventaChange.bind(this);
      this.actualizarList = this.actualizarList.bind(this);
      this.listado = this.listado.bind(this);
      
    }

    componentWillMount() {
      fetch(`http://localhost:8888/ventas`)
        .then( res => res.json())
        .then( ventas => this.setState({ventas:ventas}));
    }

    render() {
      
        return(
          <div className="ventasCSS">
              <h2>{this.props.titulo}</h2>
          <Modificar 
          venta={this.state.selected} 
          ventaChange={this.ventaChange} 
          listado = {this.listado}
          />
          <table className="table">
            <thead>
              <tr>
                 <th>NroVenta</th>
                 <th>SaldoCobrado</th>
                 <th>Fecha</th>
              </tr>
            </thead>
            <tbody>
              {this.renderRows()}
            </tbody>
          </table>
          
        </div>)
    
    }

    renderHeaders(columns) {
      return columns.map((col, index) => {
        return (
            <th>{col}</th>
        );
      })
    }
    select(unaVenta) {
      this.setState({selected:unaVenta})
    }
    ventaChange(unaVenta) {
      var nuevaLista = this.state.ventas.map((item) => (unaVenta.id !== item.id) ? item : unaVenta )
      this.setState({ventas: nuevaLista, selected:unaVenta})
    }
    actualizarList(unaVenta) {
      var venta = this.state.ventas.filter(
        item => unaVenta.id !== item.id
      );
      this.setState({ ventas: venta });
    }

    renderRows() {
      return this.state.ventas.map((unaVenta, index) => {
        return (
          <RowVenta
          venta={unaVenta} 
          selector={this.select} 
          actualizarList={this.actualizarList}
          />
        );
      })
    }
    listado(){
      this.componentWillMount();
    }
  }



  export default VentaLista