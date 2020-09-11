import React, { Component } from "react";
import {
  Col,
  Form,
  FormGroup,
  Button,
  Label,
  Input,
  ModalBody,
  ModalFooter,
} from "reactstrap";

class EditarFactura extends Component {
  constructor(props) {
    super(props);
    this.state = { factura: props.factura != null ? this.props.factura : {} };
    this.changeHandler = this.changeHandler.bind(this);
    this.estadoInicial = this.estadoInicial.bind(this);
    this.sendHandler = this.sendHandler.bind(this);
  }

  componentWillMount() {
    fetch(`http://localhost:8888/facturas`)
      .then((res) => res.json())
      .then((factura) => this.setState({ factura: factura }))
      .then((facturas) => this.setState({ facturas: facturas }));
  }

  estadoInicial() {
    this.setState({
      factura: {
        nroComprobante: "",
        fechaEmision: "",
        tipoComprobante: "",
        ptoVenta: "",
      },
    });
  }

  componentWillReceiveProps(props) {
    this.setState({ props });
    this.setState({ factura: props.factura });
    this.setState({ facturas: props.facturas });
  }

  changeHandler(event) {
    var nuevaFactura = Object.assign({}, this.state.factura);
    nuevaFactura[event.target.name] = event.target.value;
    this.setState({ facturas: this.props.facturas, factura: nuevaFactura });
  }

  sendHandler(event) {
    fetch("http://localhost:8888/facturas", {
      method: "put",
      body: JSON.stringify(this.state.factura),
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
    })
      .then((res) => this.props.facturaChange(this.state.factura))
      .then((res) => this.estadoInicial())

      .then(event.preventDefault());
  }

  render() {
    return (
      <Col xs="12" md="12">
        <ModalBody>
          <Form className="form-horizontal">
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
            onClick={this.sendHandler}
          >
            <i className="fa fa-dot-circle-o"></i> Guardar Cambios
          </Button>
        </ModalFooter>
      </Col>
    );
  }
}

export default EditarFactura;
