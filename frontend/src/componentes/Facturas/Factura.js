import React from "react";
import { Button,Modal,ModalHeader } from "reactstrap";
import EditarFactura from "./EditarFactura"
class Factura extends React.Component {
  constructor(props) {
    super(props);
    this.state = {factura: props.factura,seleccionado:{} };
    this.seleccionarFactura = this.seleccionarFactura.bind(this);
    this.deleteHandler = this.deleteHandler.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.deleteFactura= this.deleteFactura.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.seleccionarFactura();
    this.setState({
      modal: !this.state.modal,
    });
  }


  seleccionarFactura() {
    this.props.selector(this.props.factura);
  }

  deleteFactura(id) {
    var answer = window.confirm(
      "¿ELIMINAR  " + this.state.factura.nroComprobante + " ?"
    );
    if (answer) {
      this.deleteHandler(id);
    }
  }

  onDelete() {
    this.props.updateLista(this.props.factura);
  }

  deleteHandler(id) {
    fetch("http://localhost:8888/facturas/" + id, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }).then(this.onDelete);
  }

 estadoInicial() {
    this.setState({factura: {nroComprobante: "",fechaEmision: "",tipoComprobante: "",ptoVenta:"" } });
  }
  componentWillReceiveProps(props) {
    this.setState({factura: props.factura });
  }


  render() {
    return (
      <tr>
        <td>{this.props.factura.id}</td>
        <td>{this.props.factura.nroComprobante}</td>
        <td>{this.props.factura.fechaEmision}</td>
        <td>{this.props.factura.tipoComprobante}</td>
        <td>{this.props.factura.ptoVenta}</td>
        &nbsp;&nbsp;
        <Button color="success" onClick={this.toggle}>
          {" "}
          seleccionar/Editar
        </Button>
     
          {/* <Modal
            isOpen={this.state.modal}
            toggle={this.toggle}
            className={this.props.className}
          >
            <ModalHeader toggle={this.toggle}>
              <strong>Editar</strong>Factura
            </ModalHeader>

          <EditarFactura
            factura={this.state.seleccionado}
            facturaChange={this.props.facturaChangeHandler}
            listadoFactura={this.props.listadoFactura}
            updateLista={this.props.updateLista}
            onSubmit={this.props.handleSubmit}
          />
          </Modal> */}

     
        &nbsp;&nbsp;
        
        <Button
          color="danger"
          size="sm"
          onClick={() => this.deleteFactura(this.props.factura.id)}
        >
          <i className="fa fa-ban"></i>Borrar
        </Button>{" "}
      </tr>
    );
  }
}

export default Factura;
