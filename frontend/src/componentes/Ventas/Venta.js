import React from "react";
import { Button } from "reactstrap";

class Venta extends React.Component {
  constructor(props) {
    super(props);
    this.state = { venta: props.venta };
    this.seleccionarVenta = this.seleccionarVenta.bind(this);
    this.deleteHandler = this.deleteHandler.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.deleteVenta = this.deleteVenta.bind(this);

  }

  seleccionarVenta() {
    this.props.selector(this.props.venta);
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
      },
    });
  }
  
  componentWillReceiveProps(props) {
    this.setState({ venta: props.venta });
  }

  
  sendHandler(event) {
    fetch("http://localhost:8888/ventas", {
      method: "put",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(this.state.venta),
    })
      .then((res) => this.props.ventaChanged(this.state.venta))
      .then((res) => this.estadoInicial)
      .then((res)=> this.setState(this.state.venta));
    event.preventDefault();
  }

  render() {
    return (
      <tr>
        <td>{this.props.venta.id}</td>
        <td>{this.props.venta.nroVenta}</td>
        <td>{this.props.venta.facturado}</td>
        <td>{this.props.venta.saldoCobrado}</td>
        <td>{this.props.venta.montoSinCobrar}</td>
        <td>{this.props.venta.tipoDePago}</td>
        &nbsp;&nbsp;
        <Button onClick={this.seleccionarVenta} outline color="primary">
          {" "}
          seleccionar
        </Button>
        &nbsp;&nbsp;
        <Button
          color="danger"
          size="sm"
          onClick={() => this.deleteVenta(this.props.venta.id)}
        >
          <i className="fa fa-ban"></i>Borrar
        </Button>{" "}
      </tr>
    );
  }
}

export default Venta;
