import React from "react";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Col,
  ModalBody,
  ModalFooter,
} from "reactstrap";

class CargarFactura extends React.Component {
  constructor(props) {
    super(props);
    this.state = { factura: props.factura, modal: false };
    this.changeHandler = this.changeHandler.bind(this);
    this.estadoInicial = this.estadoInicial.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal,
    });
  }

  estadoInicial() {
    this.setState({factura: {fechaEmision: "",tipoComprobante: "",nroComprobante: "",ptoVenta:"" } });
  }
  componentWillReceiveProps(props) {
    this.setState({ factura: props.factura });
    this.setState({ facturas: props.facturas});
  }

  changeHandler(event) {
    var nuevaFactura = Object.assign({}, this.state.factura);
    nuevaFactura[event.target.name] =
      event.target.type === "checkbox"
        ? event.target.checked
        : event.target.value;
    this.setState({ factura: nuevaFactura });
  }

  addHandler(event) {
    fetch("http://localhost:8888/facturas", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(this.state.factura),
    })
      .then((res) => this.props.listadoFacturas())
      .then((res) => this.estadoInicial());
    event.preventDefault();
  }

  render() {
    return (
      <Col xs="12" md="12">
        <ModalBody>
          <Form className="form-horizontal">
          <FormGroup row>
              <Col md="3">
                <Label for="nroComprobante">Nro de comprobante</Label>
              </Col>
              <Col xs="12" md="9">
                <Input
                  type="number"
                  id="nroComprobante"
                  name="nroComprobante"
                  placeholder="Completa nroComprobante.."
                  required={true}
                  value={this.state.factura.nroComprobante}
                  onChange={this.changeHandler}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col md="3">
                <Label for="fechaEmision">fecha Emision</Label>
              </Col>
              <Col xs="12" md="9">
                <Input
                  type="text"
                  id="fechaEmision"
                  name="fechaEmision"
                  placeholder="Completa Fecha..."
                  required
                  value={this.state.factura.fechaEmision}
                  onChange={this.changeHandler}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col md="3">
                <Label for="tipoComprobante">Tipo</Label>
              </Col>
              <Col xs="12" md="9">
                <Input
                  type="text"
                  id="tipoComprobante"
                  name="tipoComprobante"
                  placeholder="Completa Tipo Comprobante..."
                  required={true}
                  value={this.state.factura.tipoComprobante}
                  onChange={this.changeHandler}
                />
              </Col>
            </FormGroup>
         
            <FormGroup row>
              <Col md="3">
                <Label for="ptoVenta">Punto de venta</Label>
              </Col>
              <Col xs="12" md="9">
                <Input
                  type="text"
                  id="ptoVenta"
                  name="ptoVenta"
                  placeholder="Completa ptoVenta.."
                  required={true}
                  value={this.state.factura.ptoVenta}
                  onChange={this.changeHandler}
                />
              </Col>
            </FormGroup>
          </Form>
        </ModalBody>

        <ModalFooter>
          <Button
            type="<submit></submit>"
            color="success"
            onClick={this.addHandler.bind(this)}
          >
            <i className="fa fa-dot-circle-o"></i> Guardar
          </Button>
        </ModalFooter>
      </Col>
    );
  }
}

export default CargarFactura;
