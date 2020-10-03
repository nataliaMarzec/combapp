import React from "react";
import { Button } from "reactstrap";
import { CButton } from '@coreui/react'
class Venta extends React.Component {
  constructor(props) {
    super(props);
    this.state = { venta: props.venta,activado:false };
    this.seleccionarVenta = this.seleccionarVenta.bind(this);
    this.deleteHandler = this.deleteHandler.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.deleteVenta = this.deleteVenta.bind(this);
    this.toggleEditar=this.toggleEditar.bind(this);
  }

  seleccionarVenta() {
    this.props.selector(this.props.venta);
  }
  toggleEditar() {
    this.setState({
      activado: !this.state.activado,
    });
  }

  deleteVenta(id) {
    var answer = window.confirm(
      "¿ELIMINAR  " + this.state.venta.nroVenta + " ?"
    );
    if (answer) {
      this.deleteHandler(id);
    }
  }

  onDelete() {
    this.props.updateLista(this.props.venta);
  }

  deleteHandler(id) {
    fetch("http://localhost:8888/ventas/" + id, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }).then(this.onDelete);
  }

  editarVenta() {
    this.props.editarVenta(this.props.venta);
  }

  estadoInicial() {
    this.setState({
      venta: {
        nroVenta: "",
        fecha: "",
        facturado: false,
        saldoCobrado: "",
        montoSinCobrar: "",
        tipoDePago: "",
        fechas: [],
        selectedOption: "",
        options: null,
        todos: [],
        listaFecha: [],
        estaActivado: this.props.estaActivado,
        editarActivado: this.props.editarActivado,
        borrarActivado: this.props.borrarActivado,
      },
    });
  }
  
  componentWillReceiveProps(props) {
    this.setState({ venta: props.venta });
  }

  render() {
    return (
      <tr>
        <td>{this.props.venta.id}</td>
        <td>{this.props.venta.nroVenta}</td>
        <td>{this.props.venta.fecha}</td>
        <td>{this.props.venta.facturado ? true : false}</td>
        <td>{this.props.venta.saldoCobrado}</td>
        <td>{this.props.venta.montoSinCobrar}</td>
        <td>{this.props.venta.tipoDePago}</td>
        &nbsp;&nbsp;
            <CButton onClick={this.seleccionarVenta} outline color="primary">
          {" "}
          seleccionar
        </CButton>
        &nbsp;&nbsp;
        <CButton
          color="danger"
          size="sm"
          onClick={() => this.deleteVenta(this.props.venta.id)}
        >
          <i className="fa fa-ban"></i>Borrar
        </CButton>{" "}
        <CButton onClick={this.editarVenta} toogle={this.toggleEditar} isOpen={this.state.activado}
            className={this.props.className} outline color="info">Editar</CButton>
      </tr>
    );

  }
}

export default Venta;
