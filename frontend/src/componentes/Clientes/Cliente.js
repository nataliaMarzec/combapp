import React from "react";
import { Button } from "reactstrap";

class Cliente extends React.Component {
  constructor(props) {
    super(props);
    this.state = { cliente: props.cliente };
    this.seleccionarCliente = this.seleccionarCliente.bind(this);
    this.deleteHandler = this.deleteHandler.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.deleteCliente = this.deleteCliente.bind(this);
  }

  seleccionarCliente() {
    this.props.selector(this.props.cliente);
  }

  deleteCliente(id) {
    var answer = window.confirm(
      "¿ELIMINAR  " + this.state.cliente.nombre + " ?"
    );
    if (answer) {
      this.deleteHandler(id);
    }
  }

  onDelete() {
    this.props.updateLista(this.props.cliente);
  }

  deleteHandler(id) {
    fetch("http://localhost:8888/clientes/" + id, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }).then(this.onDelete);
  }

  //
  estadoInicial() {
    this.setState({ cliente: { nombre: "",apellido:"",cuit:"",cuit: "",razonSocial:"",telefono:"", email: "" } });
  }
  
  componentWillReceiveProps(props) {
    this.setState({ cliente: props.cliente });
  }

  onEdit(unCliente) {
    this.seleccionarCliente();
    this.sendHandler();
  }
  sendHandler(event) {
    fetch("http://localhost:8888/clientes", {
      method: "put",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(this.state.cliente),
    })
      .then((res) => this.props.clienteChanged(this.state.cliente))
      .then((res) => this.estadoInicial)
      .then((res)=> this.setState(this.state.cliente));
    event.preventDefault();
  }

  render() {
    return (
      <tr>
        <td>{this.props.cliente.id}</td>
        <td>{this.props.cliente.nombre}</td>
        <td>{this.props.cliente.apellido}</td>
        <td>{this.props.cliente.cuit}</td>
        <td>{this.props.cliente.razonSocial}</td>
        <td>{this.props.cliente.telefono}</td>
        <td>{this.props.cliente.email}</td>
  
        &nbsp;&nbsp;
        <Button onClick={this.seleccionarCliente} outline color="primary">
          {" "}
          seleccionar
        </Button>
        &nbsp;&nbsp;
        <Button
          color="danger"
          size="sm"
          onClick={() => this.deleteCliente(this.props.cliente.id)}
        >
          <i className="fa fa-ban"></i>Borrar
        </Button>{" "}
      </tr>
    );
  }
}

export default Cliente;
