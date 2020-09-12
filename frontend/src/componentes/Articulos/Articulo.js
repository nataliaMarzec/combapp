import React from "react";
import { Button } from "reactstrap";

class Articulo extends React.Component {
  constructor(props) {
    super(props);
    this.state = { articulo: props.articulo };
    this.seleccionarArticulo = this.seleccionarArticulo.bind(this);
    this.deleteHandler = this.deleteHandler.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.deleteArticulo = this.deleteArticulo.bind(this);
  }

  seleccionarArticulo() {
    this.props.selector(this.props.articulo);
  }

  deleteArticulo(id) {
    var answer = window.confirm(
      "¿ELIMINAR  " + this.state.articulo.nombre + " ?"
    );
    if (answer) {
      this.deleteHandler(id);
    }
  }

  onDelete() {
    this.props.updateLista(this.props.articulo);
  }

  deleteHandler(id) {
    fetch("http://localhost:8888/articulos/" + id, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }).then(this.onDelete);
  }

  estadoInicial() {
    this.setState({
      articulo: { nombre: "", codigo: "", descripcion: "", precio: "" },
    });
  }

  componentWillReceiveProps(props) {
    this.setState({ articulo: props.articulo });
  }

  sendHandler(event) {
    let { id } = this.state;
    fetch("http://localhost:8888/articulo" + id, {
      method: "put",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(this.state.articulo),
    })
      .then((res) => this.props.articuloChanged(this.state.articulo))
      .then((res) => this.estadoInicial());
    event.preventDefault();
  }

  render() {
    return (
      <tr>
        <td>{this.props.articulo.id}</td>
        <td>{this.props.articulo.nombre}</td>
        <td>{this.props.articulo.codigo}</td>
        <td>{this.props.articulo.descripcion}</td>
        <td>{this.props.articulo.precio}</td>
        &nbsp;&nbsp;
        <Button onClick={this.seleccionarArticulo} outline color="primary">
          {" "}
          seleccionar
        </Button>
        &nbsp;&nbsp;
        <Button
          color="danger"
          size="sm"
          onClick={() => this.deleteArticulo(this.props.articulo.id)}
        >
          <i className="fa fa-ban"></i>Borrar
        </Button>{" "}
      </tr>
    );
  }
}

export default Articulo;
